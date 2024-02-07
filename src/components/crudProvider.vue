<template>
  <div id="content">
    <div class="d-flex justify-content-center align-items-center flex-column">
      <h2 class="title">Proveedores</h2>
      <div class="d-row">
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input v-model="searchTerm" @input="filterProveedores" type="text" placeholder="Buscar por nombre" />
        </div>
        <div class="bton">
          <button @click="showAddForm" class="btn btn-success">Nuevo proveedor</button>
        </div>
      </div>
      <!-- Paginación -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn-light">Anterior</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * pageSize >= filteredProveedores.length" class="btn-light">Siguiente</button>
      </div>
      <table class="table-crud">
        <thead>
          <tr>
            <th style="font-size: 70%">ID</th>
            <th style="font-size: 70%">Nombre</th>
            <th style="font-size: 70%">Email</th>
            <th style="font-size: 70%">Celular</th>
            <th style="font-size: 70%">Dirección</th>
            <th style="font-size: 70%">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in filteredProveedores" :key="proveedor.id">
            <td class="btn-border">{{ proveedor.id }}</td>
            <td class="btn-border">{{ proveedor.name }}</td>
            <td class="btn-border">{{ proveedor.email }}</td>
            <td class="btn-border">{{ proveedor.phone }}</td>
            <td class="btn-border">{{ proveedor.address }}</td>
            <td class="btn-border">
              <button @click="editProveedor(proveedor)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="deleteProveedor(proveedor.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-form-container" v-show="showForm">
      <div v-show="showForm" class="add-form" style="width: 70%">
        <h3>{{ selectedProveedor ? 'Editar proveedor' : 'Agregar proveedor' }}</h3>
        <form @submit.prevent="saveProveedor" class="form-container" enctype="multipart/form-data">
          <div class="form-group">
          </div>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="newProveedor.name" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="newProveedor.email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="newProveedor.phone" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="direction">Dirección:</label>
            <input v-model="newProveedor.address" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="image_path">Imagen de proveedor:</label>
            <input type="file" @change="handleFileChange" accept="image/*" />
          </div>
          <button type="submit" class="btn btn-primary">{{ selectedProveedor ? 'Guardar' : 'Agregar' }}</button>
          <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      proveedores: [],
      showForm: false,
      selectedProveedor: null,
      newProveedor: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        image_path: "",
      },
      
      searchTerm: "",
      token: localStorage.getItem('token') || '',
      currentPage: 1,
      pageSize: 6, 
    };
  },
  computed: {
    filteredProveedores() {
      return this.proveedores.filter((proveedor) =>
        proveedor.name && proveedor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedProveedores() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProveedores.slice(startIndex, endIndex);
    },
  },
  methods: {
    showAddForm() {
      this.showForm = true;
      this.selectedProveedor = null;
      this.clearForm();
    },
    hideForm() {
      this.showForm = false;
      this.clearForm();
    },
    handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    this.newProveedor.image_path = file;
  }
},
    clearForm() {
      this.newProveedor = {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        image_path: null, 
      };
    },
    saveProveedor() {
  const formData = new FormData();

  formData.append('name', this.newProveedor.name || '');
  formData.append('email', this.newProveedor.email || '');
  formData.append('phone', this.newProveedor.phone || '');
  formData.append('address', this.newProveedor.address || '');

  if (this.newProveedor.image_path && (!this.selectedProveedor || this.newProveedor.image_path !== this.selectedProveedor.image_path)) {
    formData.append('image_path', this.newProveedor.image_path);
}
  const config = {
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": 'multipart/form-data',
    },
  };

  if (this.selectedProveedor) {
    axios.put(`https://api-yrrd.onrender.com/providers/${this.selectedProveedor.id}`, formData, config)
      .then((response) => {
        console.log('Proveedor actualizado en el servidor:', response.data);
        this.fetchProviders();
      })
      .catch((error) => {
        console.log('Error response:', error.response);
        console.error('Error al actualizar proveedor en el servidor:', error);
      });
  }else {
    axios
      .post('https://api-yrrd.onrender.com/providers', formData, config)
      .then((response) => {
        console.log('Proveedor agregado en el servidor:', response.data);
        console.log("FormData:", formData);
        this.fetchProviders();
      })
      .catch((error) => {
        console.error('Error al agregar proveedor en el servidor:', error.response.data);
        console.log("FormData:", formData);
        console.log('Error response:', error.response); 


      });
  }

  this.showForm = false;
  this.clearForm();
},

    editProveedor(proveedor) {
      this.selectedProveedor = { ...proveedor };
      this.newProveedor = { ...proveedor };
      this.showForm = true;
    },
    deleteProveedor(proveedorId) {
      const index = this.proveedores.findIndex(proveedor => proveedor.id === proveedorId);
      if (index !== -1) {
        this.proveedores.splice(index, 1);
        axios.delete(`https://api-yrrd.onrender.com/providers/${proveedorId}`, { headers: { Authorization: `Bearer ${this.token}` } })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    filterProveedores() {
    },
    fetchProviders() {
      axios.get('https://api-yrrd.onrender.com/providers', { headers: { Authorization: `Bearer ${this.token}` } })
        .then(response => {
          console.log(response.data);
          this.proveedores = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredProveedores.length) {
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
    this.fetchProviders();
  },
};
</script>

<style scoped>
.pagination button {
  margin: 0 15px;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 50px;
 
}
.btn-border{
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
.table-crud {
  padding-top: 5%;
  width: 95%;
  border-bottom: #ced4da 2px solid;
  border-collapse: collapse;
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
  margin-left: 120%;
}
.btn{
  font-size: 75%;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;

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
  width: 80%;.add-form-container {
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
