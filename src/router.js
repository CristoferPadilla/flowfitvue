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
      component: ()=> import(/* webpackChunk*/ './view/shop.vue'),

    },
    {
      path: '/inventory',
      name: 'inventoryView',
      component: ()=> import(/* webpackChunk*/ './view/inventory.vue'),

    },
    {
      path: '/products',
      name: 'productsView',
      component: ()=> import(/* webpackChunk*/ './view/products.vue'),

    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: ()=> import(/* webpackChunk*/ './view/checkout.vue'), //AQUI VA EL NOMBRE DE TU pantalla

    },
    {
      path: '/addMember',
      name: 'addMember',
      component: ()=> import(/* webpackChunk*/ './view/addMember.vue'), //AQUI VA EL NOMBRE DE TU pantalla

    },
    {
      path: '/addProduct',
      name: 'addProductView',
      component: ()=> import(/* webpackChunk*/ './view/addProduct.vue'), //AQUI VA EL NOMBRE DE TU pantalla

    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;
