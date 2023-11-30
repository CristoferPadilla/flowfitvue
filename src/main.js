import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js'; // Asegúrate de que estás importando tu configuración de rutas

createApp(App)
  .use(router) // Asegúrate de que estás utilizando vue-router en tu aplicación
  .mount('#app');
