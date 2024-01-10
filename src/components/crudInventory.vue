<template>
    <div id="content">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Inventario</h2>
            <div class="d-row">
                <div class="search-bar">
                    <div class="search-icon">🔍</div> 
                    <input type="text" placeholder="">
                </div>
                <router-link  class="bton-link " to="/provider">
                    <button class="btn btn-success" style="background-color:blue;" >Ver proveedores</button>
                </router-link>
                <button @click="showAddProductForm" class="btn btn-success mb-3">
                  <i class="bi bi-plus"></i> Nuevo producto
                </button>
            </div>

        <table class="table-crud">
          <thead>
            <tr>
              <th style="font-size: 70%">ID</th>
              <th style="font-size: 70%">Nombre</th>
              <th style="font-size: 70%">Descripción</th>
              <th style="font-size: 70%">Precio</th>
              <th style="font-size: 70%">Cantidad</th>
              <th style="font-size: 70%">Categoria</th>
              <th style="font-size: 70%">Proveedor</th>
              <th style="font-size: 70%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>${{ product.price }} MX</td>
              <td>{{ product.quantify }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.provider }}</td>
              <td>
                <button @click="editProduct(product)" class="btn btn-warning btn-sm">Editar</button>
                <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form v-if="showForm" @submit.prevent="saveProduct" class="mb-3">
        </form>
      </div>

      <div class="add-form-container" v-show="showForm">
        <div class="add-form">
          <h3>{{ selectedProduct ? 'Editar producto' : 'Agregar producto' }}</h3>
          <form @submit.prevent="saveProduct" class="form-container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Nombre:</label>
                  <input v-model="newProduct.name" type="text" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="description">Descripción:</label>
                  <input v-model="newProduct.description" type="text" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="price">Precio:</label>
                  <input v-model="newProduct.price" type="text" class="form-control" required />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="quantify">Cantidad:</label>
                  <input v-model="newProduct.quantify" type="text" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="category">Categoría:</label>
                  <select v-model="newProduct.category" class="form-control" required>
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Suplementos">Suplementos</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="provider">Proveedor:</label>
                  <input v-model="newProduct.provider" type="text" class="form-control" required />
                </div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">{{ selectedProduct ? 'Guardar' : 'Agregar' }}</button>
              <button type="button" class="btn btn-secondary" @click="hideForm">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "CrudProducts",
  data() {
    return {
      showForm: false,
      products: [
        {
          id: "1",
        name: "Camiseta",
        description: "Playera deportiva",
        price: "125",
        quantify: "2",
        category: "Ropa",
        provider: "Manuel Inc.",
        }

      ],
      newProduct: {
        id: "",
        name: "",
        description: "",
        price: "",
        quantify: "",
        category: "",
        provider: "",
      },
      selectedProduct: null,
    };
  },
  methods: {
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
        quantify: "",
        category: "",
        provider: "",
      };
    },
    saveProduct() {
      if (this.selectedProduct) {
        const index = this.products.findIndex(
          (product) => product.id === this.selectedProduct.id
        );
        if (index !== -1) {
          this.products.splice(index, 1, this.newProduct);
        }
      } else {
        this.newProduct.id = Date.now().toString(); 
        this.products.push(this.newProduct);
      }

      this.hideForm();
    },
    editProduct(product) {
      this.selectedProduct = product;
      this.newProduct = { ...product }; 
      this.showForm = true;
    },
    deleteProduct(productId) {
      const index = this.products.findIndex((product) => product.id === productId);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },
  },
};

</script>

<style scoped >

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
.table-crud{
width: 95%;
border-collapse: collapse;
border: 1px solid #ddd;
font-size: 75%;
font-family: Arial, Helvetica, sans-serif;
}

.table-crud th, .table-crud td {
text-align: left;
padding: 8px;
color:beige;
font-size: 75%;
font-family: Arial, Helvetica, sans-serif;

}

.table-crud tr:nth-child(even){background-color: transparent !important}

.table-crud th {
background-color: #4CAF50;
color: white;

}
.d-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    margin-right: 45%;
    margin-bottom: 20px;
}

.bton {
  margin-left: 100%;
}
.btn{
  font-size: 75%;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;

}

.table-crud {
  width: 95%;
  border-collapse: collapse;
  border: 1px solid #ddd;
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
  background-color: transparent !important
}

.table-crud th {
  background-color: #4CAF50;
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

.search-bar {
  width: 300px;
  height: 40px;
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
  font-size: 18px;
  line-height: 40px;
  padding: 0 10px;
}

.search-icon {
  padding-left: 10px;
}

.button-container button {
  margin-left: 10px;
  cursor: pointer;
}

.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.button-container button {
  margin-left: 10px;
  cursor: pointer;
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
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
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
.bton-link{
  margin-left: 100%;
}
</style>