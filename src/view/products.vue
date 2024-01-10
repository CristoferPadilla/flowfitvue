<!-- membersView.vue -->

<template>
  <div id="app">
    <div class="app">
      <Navbar :cartItems="cartItems" />
    </div>
    <div id="content">
      <Header />
      <h2 class="title">Productos</h2>
      <div class="controls">
        <div class="search-bar">
          <input v-model="searchTerm" placeholder="Buscar producto" />
        </div>
      </div>
      <ProductList :products="filteredProducts" @addToCart="addToCart" />
      <router-link to="/shopcar" class="checkout-link">Ir al Carrito</router-link>
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
        // Agrega más productos si es necesario
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
    // ... otros métodos ...
  },
};
</script>

<style scoped>
/* Estilos específicos si es necesario */
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: baseline;
}

.controls input {
  width: 100%;
}

.button {
  background-color: #ff0000;
  color: #fff;
  padding: 5px 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
}

.checkout-link {
  text-decoration: none;
  color: #007bff;
  font-size: 14px;
  margin-left: 10px;
}
.search-bar {
  width: 300px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
.search-bar input {
  border:none; 
  outline:none; 
  background:none; 
  width:auto; 
  color:black; 
  font-size :18px; 
  line-height :40px; 
  padding :0 10px ;
}
.search-icon{
  padding-left :10px ;
}
</style>
