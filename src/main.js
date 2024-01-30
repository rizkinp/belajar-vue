import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// main.js atau file komponen lainnya
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./assets/css/main.css";
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';


createApp(App).use(router).use(ToastPlugin).mount('#app')
