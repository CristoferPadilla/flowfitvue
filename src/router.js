// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/Contratos/contratos.vue';
import MembershipView from './views/Contratos/ContratosLista.vue';
import MembersViev from './views/Contratos/NuevoContrato.vue';

const routes = [
  {
    path: '/contratos',
    component: ContratosView,
    children: [
      {
        path: '',
        component: MembershipView,
      },
      {
        path: 'nuevo',
        component: MembersViev,
      },
    ],
  },
  // Otras rutas...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;