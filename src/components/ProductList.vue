<template>
  <h2 class="title">Productos</h2>
  <div class="controls">
    <div class="search-bar">
      <input v-model="searchTerm" placeholder="Buscar producto" />
    </div>
  </div>
  <div class="product-list">
    <div class="product-card" v-for="product in filteredProducts" :key="product.ID">
      <div class="product-details">
        <h3 class="product-Nombre">{{ product.Nombre }}</h3>
        <p class="product-Precio">{{ formatCurrency(product.Precio) }} MX</p>
        <button @click="openModal(product)" class="btn">Comprar</button>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <h2>{{ selectedProduct.Nombre }}</h2>
      <p>Precio: {{ formatCurrency(selectedProduct.Precio) }} MX</p>
      <div class="modal-buttons">
        <button @click="closeModal">Cancelar</button>
        <button @click="checkout">Confirmar pago</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      searchTerm: "",
      isModalOpen: false,
      selectedProduct: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedProduct = null;
      this.isModalOpen = false;
    },
    checkout() {
      alert("Pago exitoso. Gracias por su compra.");
      this.closeModal();
    },
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    fetchProducts() {
      axios
        .get("https://api-5iey.onrender.com/products")
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.close {
  float: right;
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  background-color: #55a5ff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  width: 200px;
}

.product-details {
  text-align: center;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.modal-buttons button:hover {
  background-color: #0008fe;
}

button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.search-bar input {
  border: none;
  outline: none;
  background: none;
  width: auto;
  color: black;
  font-size: 18px;
  line-height: 40px;
  padding: 0 10px;
}

.search-icon {
  padding-left: 10px;
}

.btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.product-Nombre {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #ffffff;
}

.product-Precio {
  font-size: 1em;
  color: #01ae3b;
}
</style>
