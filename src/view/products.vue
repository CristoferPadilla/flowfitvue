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
      <router-link to="/shopcar" class="checkout-link" @click="openModal">Ir al Carrito</router-link>

      <!-- Modal -->
      <div class="modal" v-if="isModalOpen">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Resumen del Carrito</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartItems" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>
                  <button @click="removeFromCart(index)" class="button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>Total a pagar: {{ formatCurrency(cartTotal) }}</div>
          <div>
            <button @click="clearCart" class="button">Vaciar Carrito</button>
            <button @click="checkout" class="button">Pagar Carrito</button>
          </div>
        </div>
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
        // Agrega más productos si es necesario
      ],
      cartItems: [],
      searchTerm: "",
      isModalOpen: false,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
  methods: {
    addToCart(product) {
      this.cartItems.push(product);
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartItems = [];
      this.closeModal();
    },
    checkout() {
      // Lógica de pago, aquí puedes realizar acciones como procesar el pago, actualizar inventario, etc.
      // Después de realizar el pago, puedes cerrar la ventana modal y limpiar el carrito.
      alert("Pago exitoso. Gracias por su compra.");
      this.clearCart();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    formatCurrency(value) {
      // Función para formatear el precio como moneda
      return `$${value.toFixed(2)}`;
    },
    // ... (otros métodos)
  },
};
</script>

<style scoped>
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

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #ff7575;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* ... (resto de estilos) ... */
</style>
