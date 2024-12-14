import { createRouter,createWebHistory } from "vue-router";

import MainPage from "./components/MainPage.vue";
import NotesPage from "./components/NotesPage.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainPage, alias: '/'},
        {path: '/notes', component: NotesPage},
    ]
});