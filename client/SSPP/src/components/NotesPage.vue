<template>
    <!--  using toast for statuses of updated created show etc (from primevue)  -->
    <div class="card">
        <p v-if="notes.length > 0">Список элементов:</p>
        <ul v-if="notes.length > 0">
        <li v-for="item in notes" :key="item.TestObject">{{ item.TestObject }}</li>
        </ul>
        <p v-else>Список элементов пуст</p>
        </div>
</template>

<script>
import Card from 'primevue/card';
import axios from "axios";

export default {
    name: "NotesPage",
    components: {
        Card,
    },
    data() {
        return {
            notes: []
        }
    },
    methods: {
        async getAnswer() {
        const { data } = await axios.get("http://127.0.0.1:8080/test");
        this.notes = data;
        },
    },
    beforeMount() {
        this.getAnswer();
    },
    
}
</script>

<style>

</style>