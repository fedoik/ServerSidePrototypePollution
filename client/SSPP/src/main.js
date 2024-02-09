import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'; 
import "primevue/resources/themes/saga-green/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import router from './router';


createApp(App).use(router).use(PrimeVue).mount('#app')