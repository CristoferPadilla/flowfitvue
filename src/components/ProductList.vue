<template>
  <div class="container-pt-fixed">
    <h2 class="title">Productos</h2>
    
    <div class="controls">
      <div class="search-bar">
        <div class="search-icon">🔍</div>
        <input v-model="searchTerm" placeholder="Buscar producto" />
      </div>
      <button @click="prevPage" :disabled="currentPage === 1" class="btn-light">Anterior</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * pageSize >= filteredProducts.length" class="btn-light">Siguiente</button>
    </div>
      <div class="pagination">
    </div>
  </div>
  
  <div class="product-list">
    <div class="product-card" v-for="product in paginatedProducts" :key="product.ID">
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

  <!-- paginación -->
 
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
      token: localStorage.getItem('token') || '',
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
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
  if (this.selectedProduct && this.selectedProduct.Cantidad > 0) {
    const updatedProduct = {
      ...this.selectedProduct,
      Cantidad: this.selectedProduct.Cantidad - 1
    };

    axios
      .put(
        `https://api-5iey.onrender.com/products/${this.selectedProduct.ID}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        const saleData = {
          id_producto: this.selectedProduct.ID,
          cantidad: 1, 
          precio_venta: this.selectedProduct.Precio,
          id_usuario: null};

        axios.post('https://api-5iey.onrender.com/sales_history', saleData, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(saleResponse => {
          console.log(saleResponse.data);
          alert("Pago exitoso. Gracias por su compra.");
          this.closeModal();
        })
        .catch(saleError => {
          console.error(saleError);
          alert("Hubo un error al registrar la compra. Por favor, inténtelo de nuevo.");
        });
      })
      .catch(error => {
        console.error(error);
        alert("Hubo un error al procesar el pago. Por favor, inténtelo de nuevo.");
      });
  } else {
    alert("El producto no está disponible.");
    this.closeModal();
  }
},
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    fetchProducts() {
      axios
        .get("https://api-5iey.onrender.com/products", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredProducts.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
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
  width: 100vw;
}

.product-card {
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #908e8e;
  border-radius: 5px;
  box-shadow: #0a0257;
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
  background-color: #0004ff;
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
.search-bar {
  width: 200px;
  height: 30px;
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
  font-size :12px; 
  line-height :40px; 
  padding :0 10px ;
}
.search-icon{
  padding-left :10px ;
}

.btn {
  background-color: #0a0257;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.product-Nombre {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #000000;
  font-weight: bolder;
}

.product-Precio {
  font-size: 1em;
  color: #000000;
  font-weight: lighter;
  font-family: Arial, Helvetica, sans-serif;

}
.container-pt-fixed{
  padding-top: 5%;
  display:table-column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}
.btn-light {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px; /* Puedes ajustar el relleno según tus preferencias */
  border: none;
  border-radius: 5px; /* Ajusta el radio de la esquina según tus preferencias */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}

.btn-light:hover {
  background-color: white;
  color: #4caf50;
  border: 1px solid #4caf50;
}

</style>
