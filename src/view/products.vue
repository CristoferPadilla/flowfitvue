<template>
    <div id="app">
      <div class="app">
        <Navbar :cartItems="cartItems" />
      </div>
      <div id="content">
        <Header />
        <router-link to="/checkout">
          <h2 class="title">Carrito de Compras</h2>
        </router-link>
        <div class="controls">
          <div class="search-bar">
            <div class="search-icon">🔍</div>
            <input v-model="searchTerm" placeholder="Buscar producto">
          </div>
          <button @click="clearCart">Limpiar Carrito</button>
        </div>
        <ProductList :productsItems="filteredProducts" @addToCart="addToCart" />
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/CustomNav.vue";
  import Header from "@/components/header.vue";
  import ProductList from "@/components/ProductList.vue";
  import "@/css/style.css";
  
  export default {
    name: "ProductsItem",
    components: {
      Navbar,
      Header,
      ProductList,
    },
    data() {
      return {
        productsItems: [
          // ... tus productos
        ],
        cartItems: [],
        searchTerm: "",
        total: 0,
      };
    },
    computed: {
      filteredProducts() {
        return this.productsItems.filter((product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      addToCart(product) {
        this.cartItems.push(product);
        this.calculateTotal();
      },
      removeFromCart(index) {
        this.cartItems.splice(index, 1);
        this.calculateTotal();
      },
      clearCart() {
        this.cartItems = [];
        this.calculateTotal();
      },
      calculateTotal() {
        this.total = this.cartItems.reduce((total, item) => total + item.price, 0);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  