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
    component: ()=> import(/* webpackChunk*/'./view/menu.vue'),

  },
  {
    path: '/members',
    name: 'MembersView',
    component: ()=> import(/* webpackChunk*/'./view/members.vue'),
  },
  {
    path: '/membership',
    name: 'MembershipsView',
    component: ()=> import(/* webpackChunk*/ './view/membership.vue'),

  },
  {
    path: '/shop',
    name: 'shopView',
    component: ()=> import(/* webpackChunk*/ './view/products.vue'),

  },
  {
    path: '/inventory',
    name: 'inventoryView',
    component: ()=> import(/* webpackChunk*/ './view/inventory.vue'),

  },
  {
    path: '/punto-de-venta',
    name: 'Tienda',
    component: ()=> import(/* webpackChunk*/ './view/products.vue'),

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
