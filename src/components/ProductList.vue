<template>
  <h2 class="title">Productos</h2>
  <div class="controls">
    <div class="search-bar">
      <input v-model="searchTerm" placeholder="Buscar producto" />
    </div>
  </div>
  <div class="product-list">
    <div class="product-card" v-for="product in filteredProducts" :key="product.ID">
      <img :src="product.Imagen" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3 class="product-Nombre">{{ product.Nombre }}</h3>
        <p class="product-Precio">{{ product.Precio }} MX</p>
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
export default {
  Nombre: "ProductList",
  data() {
    return {
      products: [
        {
          ID: 2,
          Nombre: "Proteina",
          Precio: 200,
          Imagen: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&wIDth=&format=jpeg",
        },

        {
          ID: 3,
          Nombre: "Guantes Gym",
          Precio: 150,
          Imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_875091-MLM72146633751_102023-F.webp",
        },   
        
        {
          ID: 4,
          Nombre: "Calcetines",
          Precio: 10,
          Imagen: "https://down-mx.img.susercontent.com/file/4eb85f6d31a197b9f8deba558f9b849f",
        },

        {
          ID: 5,
          Nombre: "Muñequeras",
          Precio: 300,
          Imagen: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&wIDth=&format=jpeg",
        },

        {
          ID: 6,
          Nombre: "Paquete de proteina",
          Precio: 800,
          Imagen: "https://gnc.com.mx/media/catalog/product/1/4/141603410-on-gold-standard-100-isolate-van-2-91-lbs.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&wIDth=&format=jpeg",
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
        product.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  wIDth: 100%;
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
  border: 1px solID #ccc;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  wIDth: 200px;
}

.product-details {
  text-align: center;
}

.product-image {
  wIDth: 100%;
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
  wIDth: auto;
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
