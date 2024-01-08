<template>
    <div id="content">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Productos</h2>
        <button @click="toggleForm"  id="bton" class="btn btn-success mb-3">
          <i class="bi bi-plus"></i> Agregar
        </button>
        <!-- Tabla de productos -->
        <table class="table-crud">
          <thead>
            <tr>
              <th style="font-size: 70%">ID</th>
              <th style="font-size: 70%">Nombre</th>
              <th style="font-size: 70%">Descripción</th>
              <th style="font-size: 70%">Precio</th>
              <th style="font-size: 70%">Proveedor</th>
              <th style="font-size: 70%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
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
    </div>
</template>

<script>
import "@/css/style.css";
export default {
  name: "CrudProducts",
  components: {
  },
  data() {
  return {
    showForm: false,
    products: [
      {
        id: "1234567890123450",
        name: "Producto 1",
        description: "Descripción del producto 1",
        price: "100.00",
        provider: "Proveedor 1",
      },
      {
        id: "1234567890123451",
        name: "Producto 2",
        description: "Descripción del producto 2",
        price: "200.00",
        provider: "Proveedor 2",
      },
    ],
    newProduct: {
      id: "",
      name: "",
      description: "",
      price: "",
      provider: "",
    },
    selectedProduct: null,
  };
},

  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },

  },
};
</script>

<style>
#bton{
  margin-left: 85%;
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

</style>