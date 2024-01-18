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
      meta: {requiresAuth: true}

    },
    {
      path: '/membership',
      name: 'MembershipsView',
      component: ()=> import(/* webpackChunk*/ './view/membership.vue'),
      meta: {requiresAuth: true}


    },
    {
      path: '/shop',
      name: 'shopView',
      component: ()=> import(/* webpackChunk*/ './view/shop.vue'),
      meta: {requiresAuth: true}


    },
    {
      path: '/inventory',
      name: 'inventoryView',
      component: ()=> import(/* webpackChunk*/ './view/inventory.vue'),
      meta: {requiresAuth: true}


    },
    {
      path: '/products',
      name: 'productsView',
      component: ()=> import(/* webpackChunk*/ './view/products.vue'),
      meta: {requiresAuth: true}


    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: ()=> import(/* webpackChunk*/ './view/checkout.vue'), //AQUI VA EL NOMBRE DE TU pantalla
      meta: {requiresAuth: true}


    },
    {
      path: '/provider',
      name: 'providerView',
      component: ()=> import(/* webpackChunk*/ './view/provider.vue'), //AQUI VA EL NOMBRE DE TU pantalla
      meta: {requiresAuth: true}


    },
   
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        next();
      } else {
        next({ name: 'LoginApp' });
      }
    } else {
      next();
    }
  });
  

  export default router;
