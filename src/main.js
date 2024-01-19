import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// main.js atau file komponen lainnya
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./assets/css/main.css";


createApp(App).use(router).mount('#app')
