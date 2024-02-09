<template>
    <!--  using toast for statuses of updated created show etc (from primevue)  -->
    <div class="notes">
        <div class="circle" v-if="error === 'start'">
            <ProgressSpinner aria-label="Loading" />
        </div>
        <div class="success" v-else-if="error === 'null'">
            
            <Notes :items="notes"/>
            <!-- <p v-if="notes.length > 0">Список элементов:</p>
            <ul v-if="notes.length > 0">
            <li v-for="item in notes" :key="item.TestObject">{{ item.TestObject }}</li>
            </ul>
            <p v-else>Список элементов пуст</p> -->

        </div>
        <div class="error" v-else>
            <!-- <Toast class="p-toast"/>
            <div @click="showError" id="b">s</div> -->
            {{ showError()  }}
            <div class="error-image">
                <img src="../assets/error5.svg" alt="error">
            </div>

        </div>
        
    </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';
import Notes from './Notes.vue'
// import Toast from 'primevue/toast';
import axios from "axios";


export default {
    name: "NotesPage",
    components: {
        // Toast,
        ProgressSpinner,
        Notes,
    },
    data() {
        return {
            notes: [],
            error: "start",
            count: 0,
        }
    },
    methods: {
        async getNotes() {
        try {
            const { data } = await axios.get("http://127.0.0.1:8080/api/notes");
            this.error = data.error;
            this.notes = data.notes;
        } catch(e) {
            this.error = "Backend не отвечает"
        }
        },
        showError() {
            if (this.count === 0) {
                this.$toast.add({ severity: 'error', summary: 'Упс! Ошибка!', detail: this.error, life: 2000 });
                this.count+=1;
            }
        }
        
    },
    beforeMount() {
        this.getNotes();
    }

    
}
</script>

<style scoped>
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%; 
    padding-top: 10%;    
}

.error-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10%; 
  /* height: 100vh; */
}
.error-image img {
    padding-top: 2%;
    width: 40%;
}


</style>