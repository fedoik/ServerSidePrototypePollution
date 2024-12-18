import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'; 
import "primevue/resources/themes/aura-light-purple/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import ToastService from 'primevue/toastservice';
import router from './router';
import axios from "axios";
import VueAxios from 'vue-axios'


createApp(App).use(router).use(VueAxios, axios).use(ToastService).use(PrimeVue).mount('#app')
