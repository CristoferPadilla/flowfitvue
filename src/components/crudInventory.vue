<template>
    <div id="content">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Inventario</h2>
            <div class="d-row">
                <div class="search-bar">
                    <div class="search-icon">🔍</div> 
                    <input type="text" placeholder="">
                </div>
                <button @click="toggleForm"  id="bton" class="btn btn-success mb-3">
                  <i class="bi bi-plus"></i> Agregar
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
              <td>{{ product.price }}</td>
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
        name: "Calcetines",
        description: "Descripción del producto 1",
        price: "100.00",
        quantify: "20",
        category: "Ropa",
        provider: "Proveedor 1",
      },
      {
        id: "1234567890123451",
        name: "Proteina",
        description: "Descripción del producto 2",
        price: "200.00",
        quantify: "10",
        category: "Suplemento",
        provider: "Proveedor 2",
      },
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
    toggleForm() {
      this.showForm = !this.showForm;
    },

  },
};
</script>

<style>

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
#bton{
    margin-left: 123%;

}

</style>