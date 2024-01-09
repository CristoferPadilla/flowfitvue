<template>
    <div id="app">
      <div class="app">
        <Navbar />
      </div>
      <div id="content">
        <Header />
        <h2 class="title">Carrito de Compras</h2>
        <br>
        <div class="controls">
          <div class="search-bar">
            <div class="search-icon">🔍</div> 
            <input v-model="searchTerm" placeholder="Buscar producto">
        </div>
          <button @click="clearCart">Limpiar Carrito</button>
        </div>
        <ProductList :products="filteredProducts" @addToCart="addToCart" />
        <div class="cart">
          <h2>Carrito de Compras</h2>
          <ul>
            <li v-for="(item, index) in cartItems" :key="index">
              {{ item.name }} - {{ item.price }} MX
              <button @click="removeFromCart(index)">Eliminar</button>
            </li>
          </ul>
          <p>Total: {{ total }} MX</p>
          <button @click="pagar">Pagar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/CustomNav.vue";
  import Header from "@/components/header.vue";
  import ProductList from "@/components/ProductList.vue";
  import "@/css/style.css";
  
  export default {
    name: "membersView",
    components: {
      Navbar,
      Header,
      ProductList,
    },
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Conjunto deportivo",
            price: 100,
            image: "https://down-mx.img.susercontent.com/file/4eb85f6d31a197b9f8deba558f9b849f",
          },
          {
            id: 2,
            name: "Proteina",
            price: 200,
            image: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&format=jpeg",
          },
          {
            id: 3,
            name: "Guantes Gym",
            price: 150,
            image: "https://http2.mlstatic.com/D_NQ_NP_2X_875091-MLM72146633751_102023-F.webp",
          },
        ],
        cartItems: [],
        searchTerm: "",
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      addToCart(product) {
        this.cartItems.push(product);
      },
      clearCart() {
        this.cartItems = [];
        this.calculateTotal();
      },
      calculateTotal() {
        this.total = this.cartItems.reduce(
          (total, item) => total + item.price,
          0
        );
      },
      pagar() {
        alert(`Total a pagar: ${this.total} MXN. Gracias por tu compra.`);
        this.clearCart();
      },
      toggleForm() {
        this.showForm = !this.showForm;
      },
      addNewProduct() {
        if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.image) {
          alert("Completa todos los campos para agregar un producto.");
          return;
        }
  
        this.products.push({
          id: this.products.length + 1,
          name: this.newProduct.name,
          price: parseFloat(this.newProduct.price),
          image: this.newProduct.image,
        });
  
        this.newProduct = {
          name: "",
          price: null,
          image: "",
        };
  
        this.toggleForm(); // Oculta el formulario después de agregar un producto
  
        alert("Producto agregado exitosamente.");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos específicos si es necesario */
  .controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: baseline;
  }
  
  .controls input {
    width: 100%;
  }
  
  ul {
    list-style: circle;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #ff0000;
    color: #fff;
    padding: 5px 8px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 10px;
  }
  </style>
  