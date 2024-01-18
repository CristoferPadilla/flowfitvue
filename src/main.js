import { createApp } from 'vue';
import App from './App.vue';
import store from './index'; // Import your Vuex store
import router from './router.js'; // Asegúrate de que estás importando tu configuración de rutas

createApp(App)
  .use(router) // Asegúrate de que estás utilizando vue-router en tu aplicación
  .use(store) // Use the store
  .mount('#app');
