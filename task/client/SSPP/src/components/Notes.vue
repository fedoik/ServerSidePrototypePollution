<template>
    <div class="card">
        <div class="flex flex-column md:flex-row gap-5">
            <div class="flex-auto">
                <!-- В блоке лежат заметки -->
                <div class="panel">
                    <ScrollPanel
                    style="width: 100%; height: 500px"
                    :pt="{
                        wrapper: {
                            style: { 'border-right': '10px solid var(--surface-ground)' }
                        },
                        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                    }"
                    class="top">
                    <div v-if="notes.length === 0" class="zero-elems">
                        <div >
                            <InlineMessage severity="contrast" icon="pi pi-bell" class="error">У вас пока нет заметок</InlineMessage>
                        </div>
                    </div>
                    <div v-else>
                        <Accordion :activeIndex="0">
                            <AccordionTab v-for="note in notes" :key="note.id" :header="note.title">
                                <p class="m-0">{{ note.body }}</p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </ScrollPanel>
                </div>
                <!-- Кнопки справа от блока заметок -->
                <div>
                    <!-- <Button label="Success" rounded /> -->
                    <div class="buttns">
                        <div class="button">
                            <div>
                                <Button label="Создать заметку"  size="large" @click="visible = true" />
                                <Dialog v-model:visible="visible" header="Создать заметку" :style="{ width: '50rem' }">
                                    <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
                                    <div class="flex align-items-center gap-3 mb-3">
                                        <!-- <label for="title" class="font-semibold w-6rem">Title</label> -->
                                        <InputText  id="title" placeholder="Заголовок" class="flex-auto" v-model="title" autocomplete="off" :style="{ width: '47rem' }"/>
                                    </div>
                                    <div class="flex align-items-center gap-3 mb-5" id="sec-note">
                                        <!-- <label for="body" class="font-semibold w-6rem">Body</label> -->
                                        <InputText id="body" placeholder="Тело" class="flex-auto" v-model="body" autocomplete="off" :style="{ width: '47rem' }"/>
                                    </div>
                                    <div class="justify-content-end">
                                        <Button type="button" label="Cancel" severity="secondary" @click="cancelNote"></Button>
                                    </div>
                                    <Button type="button" id="save-but" label="Save" @click="createNote"></Button>
                                </Dialog>
                            </div>
                        </div>
                        <div class="button">
                            <div class="edit" >
                                <Button label="Редактировать заметку" size="large" disabled/>
                            </div>
                        </div>
                    </div>
        
                    <!-- <Button label="Success" outlined /> -->
                    
                </div>

                <!-- Поле редактирования заметок снизу -->
            </div>
        </div>
    </div>
</template>
<script>
import ScrollPanel from 'primevue/scrollpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InlineMessage from 'primevue/inlinemessage';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import axios from 'axios';


export default {
    name: "Notes",
    components: {
        ScrollPanel,
        AccordionTab,
        Accordion,
        InlineMessage,
        Button,
        Dialog,
        InputText,

    },
    props: {
        items: [],
    },
    data() {
        return {
            notes: this.items,
            visible: false,
            title: '',
            body: '',

        }
    },
    methods: {
        createNote() {
            axios.post(VITE_BACKEND_URL[0]+"/api/note/create",{
                "title": this.title,
                "body": this.body
            },{
                headers: {
                    'Authorization': document.cookie.split("session")[1].slice(1),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    if (response.data.error !== null) {
                        this.$toast.add({ severity: 'error', summary: 'Упс! Ошибка!', detail: response.data.error, life: 2000 });
                    } else {
                        this.$toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заметка была добавлена', life: 2000 });
                        this.updateNotesList(response.data.uuid);
                    }
                    this.title = null;
                    this.body = null;
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Упс! Ошибка!', detail: "Что-то не так", life: 2000 });
                });
            this.visible= false;
        },
        cancelNote() {
            this.title = null;
            this.body = null;
            this.visible = false;
        },
        updateNotesList(uuid) {
            axios.get(VITE_BACKEND_URL[0]+`/api/note/${uuid}`,{
                    headers: {
                        'Authorization': document.cookie.split("session")[1].slice(1)
                    }
                }).then(response => {
                        if (response.data.error !== null) {
                            // this.$toast.add({ severity: 'error', summary: 'Упс! Ошибка!', detail: response.data.error, life: 2000 });
                        } else {
                            this.notes.push({
                                "id": response.data.id,
                                "title": response.data.note.title,
                                "body": response.data.note.body
                            });
                            // this.$toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заметка была добавлена', life: 2000 });
                        }

                    })
                    .catch(error => {
                        console.error(error);
                        // this.$toast.add({ severity: 'error', summary: 'Упс! Ошибка!', detail: "Что-то не так", life: 2000 });
                    });
        }
    }

}
</script>

<style scoped>
.error {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.buttns {
    display: flex;
    align-items: left;
    justify-content: left;
}
.edit {
    padding-left: 10px;
}
.panel {
 background-color: #F8F8F8;
}
.justify-content-end  {
    padding-top: 2%;
    display: inline-block;
    margin-right: 10px;
    
}
.button {
    /* display: flex;
    align-items: left;
    justify-content: left; */
}
#sec-note {
    padding-top: 10px;
}

</style>