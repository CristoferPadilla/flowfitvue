import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'LoginApp',
    component: ()=> import(/* webpackChunk*/'./view/Login.vue')
  },
  {
    path: '/menu',
    name: 'MenuApp',
    component: ()=> import(/* webpackChunk*/'./view/menu.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
