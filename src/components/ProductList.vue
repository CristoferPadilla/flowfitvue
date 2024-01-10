<template>
  <h2 class="title">Productos</h2>
  <div class="controls">
    <div class="search-bar">
      <input v-model="searchTerm" placeholder="Buscar producto" />
    </div>
  </div>
  <div class="product-list">
    <div class="product-card" v-for="product in filteredProducts" :key="product.id">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }} MX</p>
        <button @click="openModal(product)" class="btn">Comprar</button>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <h2>{{ selectedProduct.name }}</h2>
      <p>Precio: {{ formatCurrency(selectedProduct.price) }} MX</p>
      <div class="modal-buttons">
        <button @click="closeModal">Cancelar</button>
        <button @click="checkout">Confirmar pago</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
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
        },   {
          id: 4,
          name: "Calcetines",
          price: 10,
          image: "https://down-mx.img.susercontent.com/file/4eb85f6d31a197b9f8deba558f9b849f",
        },
        {
          id: 5,
          name: "Muñequeras",
          price: 300,
          image: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&format=jpeg",
        },
        {
          id: 6,
          name: "Paquete de proteina",
          price: 800,
          image: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&format=jpeg",
        },
      ],
      searchTerm: "",
      isModalOpen: false,
      selectedProduct: null,   
     };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
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
  }
};
</script>

<style scoped>.modal {
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
  padding: 10px;
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
.btn{
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.product-name {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #ffffff;
}

.product-price {
  font-size: 1em;
  color: #01ae3b;
}
</style>
