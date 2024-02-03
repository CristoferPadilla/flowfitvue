<template>
  <div id="content">
    <div class="d-flex justify-content-center align-items-center flex-column">
      <h2 class="title">Inventario</h2>
      <div class="d-row">
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input
            v-model="searchTerm"
            @input="filterProducts"
            type="text"
            placeholder="Buscar por nombre"
          />
        </div>
        <router-link class="btn-link" to="/provider">
          <button class="btn btn-success" style="background-color: blue">
            Ver proveedores
          </button>
        </router-link>
        <button @click="showAddProductForm" class="btn btn-success mb-3">
          <i class="bi bi-plus"></i> Nuevo producto
        </button>
      </div>

      <!-- paginacion -->

      <div class="pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn-light"
        >
          Anterior
        </button>
        <span>{{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage * pageSize >= filteredProducts.length"
          class="btn-light"
        >
          Siguiente
        </button>
      </div>

      <!-- tabla -->

      <table class="table-crud">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoria</th>
            <th>ProviderID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="btn-border">{{ product.id }}</td>
            <td class="btn-border">{{ product.name }}</td>
            <td class="btn-border">{{ product.description }}</td>
            <td class="btn-border">${{ product.price }} MXN</td>
            <td class="btn-border">{{ product.quantity }}</td>
            <td class="btn-border">{{ product.category_id }}</td>
            <td class="btn-border">{{ product.provider_id }}</td>
            <td class="btn-border">
              <button
                @click="editProduct(product)"
                class="btn btn-warning btn-sm"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="add-form-container" v-show="showForm">
        <div class="add-form">
          <h3>{{ selectedProduct ? "Edit product" : "Add product" }}</h3>
          <form @submit.prevent="saveProduct" class="form-container"  enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Nombre:</label>
                  <input
                    v-model="newProduct.name"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="description">Descripción:</label>
                  <input
                    v-model="newProduct.description"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="price">Precio:</label>
                  <input
                    v-model="newProduct.price"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="quantity">Cantidad:</label>
                  <input
                    v-model="newProduct.quantity"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="category_id">Categoria:</label>
                  <select
                    v-model="newProduct.category_id"
                    class="form-control"
                    required
                  >
                    <option value="" disabled selected>
                      Selecciona una categoría
                    </option>
                    <option
                      v-for="category in categories"
                      :value="category.id"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="provider_id">Proveedor:</label>
                  <select
                    v-model="newProduct.provider_id"
                    class="form-control"
                    required
                  >
                    <option value="" disabled selected>
                      Select a provider
                    </option>
                    <option
                      v-for="provider in providers"
                      :value="provider.id"
                      :key="provider.id"
                    >
                      {{ provider.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="image_path">Imagen del producto:</label>
                  <input type="file" @change="handleFileChange" accept="image/*" />
                </div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">
                {{ selectedProduct ? "Save" : "Add" }}
              </button>
              <button type="button" class="btn btn-secondary" @click="hideForm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CrudProducts",
  data() {
    return {
      showForm: false,
      products: [],
      categories: [],
      newProduct: {
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
        provider_id: "",
        image_path: "",
      },
      selectedProduct: null,
      searchTerm: "",
      providers: [],
      token: localStorage.getItem("token") || "",
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
  },
  methods: {
    handleFileChange(event) {
    const file = event.target.files[0];
    this.newProduct.image_path = file;
  },
    isValidNumber(value) {
      return /^\d+(\.\d{1,2})?$/.test(value);
    },

    validateNumberInput() {
      if (!this.isValidNumber(this.newProduct.quantity)) {
        return false;
      }

      if (!this.isValidNumber(this.newProduct.price)) {
        return false;
      }

      return true;
    },

    showAddProductForm() {
      this.showForm = true;
      this.selectedProduct = null;
      this.clearProductForm();
    },
    hideForm() {
      this.showForm = false;
      this.clearProductForm();
    },
    clearProductForm() {
      this.newProduct = {
          id: "",
          name: "",
          description: "",
          price: "",
          quantity: "",
          category_id: "",
          provider_id: "",
          image_path: "",
      };
    },
    saveProduct() {
  if (!this.validateNumberInput()) {
    return;
  }

  const formData = {
    name: this.newProduct.name || null,
    description: this.newProduct.description || null,
    price: this.newProduct.price || null,
    quantity: this.newProduct.quantity || null,
    category_id: this.newProduct.category_id || null,
    provider_id: this.newProduct.provider_id || null,
  };

  if (this.newProduct.image_path) {
    formData.image_path = this.newProduct.image_path;
  }

      if (this.selectedProduct) {
        axios
  .put(`https://api-yrrd.onrender.com/products/${this.selectedProduct.id}`, formData, {
    headers: {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',

    },
  })
  .then((response) => {
    if (response && response.data) {
      console.log('Producto actualizado en el servidor:', response.data);
      this.fetchProducts();
    } else {
      console.error('Error: La respuesta no tiene la estructura esperada');
    }
  })
  .catch((error) => {
    console.error('Error al actualizar producto en el servidor:', error.response.data);
  });
    
  } else {
    this.products.push({ ...this.newProduct });
    axios
      .post("https://api-yrrd.onrender.com/products", formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added on server:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product on server:", error);
      });
  }

  this.hideForm();
},
    editProduct(product) {
    this.selectedProduct = product;
    this.newProduct = { ...product };
    this.showForm = true;
  },
    deleteProduct(productID) {
      if (confirm("Are you sure you want to delete this product?")) {
        axios
          .delete(`https://api-yrrd.onrender.com/products/${productID}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log("Product deleted on server:", response.data);
            this.fetchProducts();
          })
          .catch((error) => {
            console.error("Error deleting product on server:", error);
          });
        this.fetchProducts();
      }
    },
    filterProducts() {},
    fetchProducts() {
      axios
        .get("https://api-yrrd.onrender.com/products", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error getting data from API:", error);
        });
    },
    fetchProviders() {
      axios
        .get("https://api-yrrd.onrender.com/providers", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.providers = response.data;
        })
        .catch((error) => {
          console.error("Error getting providers from API:", error);
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
    fetchCategories() {
      axios
        .get("https://api-yrrd.onrender.com/categories", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("Error getting categories from API:", error);
        });
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchProviders();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.btn-border {
  border-bottom: 1px solid white;
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
  border: none;
  outline: none;
  background: none;
  width: auto;
  color: black;
  font-size: 12px;
  line-height: 40px;
  padding: 0 10px;
}

.search-icon {
  padding-left: 10px;
}

.table-crud {
  padding-top: 5%;
  width: 95%;
  border-bottom: #ced4da 2px solid;
  border-collapse: collapse;
  font-size: 75%;
  font-family: Arial, Helvetica, sans-serif;
}

.table-crud th,
.table-crud td {
  text-align: left;
  padding: 8px;
  color: beige;
  font-size: 75%;
  font-family: Arial, Helvetica, sans-serif;
}

.table-crud tr:nth-child(even) {
  background-color: transparent !important;
}

.table-crud th {
  background-color: #4caf50;
  color: white;
}

.d-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-right: 45%;
  margin-bottom: 20px;
}

.btn-link {
  margin-left: 100%;
}

.btn {
  font-size: 75%;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.add-form-container {
  position: fixed;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  background-color: transparent;
  width: 80%;
  display: flex;
  justify-content: center;
}

.add-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.col-md-6 {
  width: 48%;
}

.text-center {
  text-align: center;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.pagination span {
  margin: 0 5px;
  font-size: 14px;
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
