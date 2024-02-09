<template>
    <div class="card">
        <div class="flex flex-column md:flex-row gap-5">
            <div class="flex-auto">
                <ScrollPanel
                    style="width: 80%; height: 300px"
                    :pt="{
                        wrapper: {
                            style: { 'border-right': '10px solid var(--surface-ground)' }
                        },
                        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                    }"
                >
                    <div v-if="notes.length === 0" class="zero-elems">
                        
                    </div>
                    <div v-else>
                        <Accordion :activeIndex="0">
                            <AccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
                                <p class="m-0">{{ tab.content }}</p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </ScrollPanel>
            </div>
        </div>
    </div>
</template>
<script>
import ScrollPanel from 'primevue/scrollpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';


export default {
    name: "Notes",
    components: {
        ScrollPanel,
        AccordionTab,
        Accordion,

    },
    props: {
        items: [],
    },
    data() {
        return {
            notes: this.items,
            tabs: []
        }
    },
    methods: {
        parseNote() {
            
        }
    },
    beforeMount() {
        this.parseNote();
    }

}
</script>

<style>

</style>