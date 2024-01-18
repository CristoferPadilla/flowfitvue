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
          <tr v-for="proveedor in filteredProveedores" :key="proveedor.ID">
            <td>{{ proveedor.ID }}</td>
            <td>{{ proveedor.Nombre }}</td>
            <td>{{ proveedor.Email }}</td>
            <td>{{ proveedor.Celular }}</td>
            <td>{{ proveedor.Direccion }}</td>
            <td>
              <button @click="editProveedor(proveedor)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="deleteProveedor(proveedor.ID)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-form-container" v-show="showForm">
      <div v-show="showForm" class="add-form" style="width: 70%">
        <h3>{{ selectedProveedor ? 'Editar proveedor' : 'Agregar proveedor' }}</h3>
        <form @submit.prevent="saveProveedor" class="form-container">
          <div class="form-group">
          </div>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="newProveedor.Nombre" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="newProveedor.Email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="newProveedor.Celular" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="direction">Dirección:</label>
            <input v-model="newProveedor.Direccion" type="text" class="form-control" required />
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
        ID: "",
        Nombre: "",
        Email: "",
        Celular: "",
        Direccion: "",
      },
      searchTerm: "",
      token: localStorage.getItem('token') || '', 
    };
  },
  computed: {
    filteredProveedores() {
      return this.proveedores.filter((proveedor) =>
        proveedor.Nombre && proveedor.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
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
    clearForm() {
      this.newProveedor = {
        ID: "",
        Nombre: "",
        Email: "",
        Celular: "",
        Direccion: "",
      };
    },
    saveProveedor() {
      if (this.selectedProveedor) {
        const index = this.proveedores.findIndex(proveedor => proveedor.ID === this.selectedProveedor.ID);
        if (index !== -1) {
          this.proveedores[index] = { ...this.selectedProveedor };
          axios.put(`https://api-5iey.onrender.com/providers/${this.selectedProveedor.ID}`, this.selectedProveedor, { 
            headers: { 
              Authorization: `Bearer ${this.token}` }
             }
             )
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        const newId = this.proveedores.length > 0 ? this.proveedores[this.proveedores.length - 1].ID + 1 : 1;
        this.newProveedor.ID = newId;

        axios.post('https://api-5iey.onrender.com/providers', this.newProveedor, {
           headers: {
             Authorization: `Bearer ${this.token}`
             } 
            }
            )
          .then(response => {
            console.log(response.data);
            this.proveedores.push(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      this.hideForm();
    },
    editProveedor(proveedor) {
      this.selectedProveedor = { ...proveedor };
      this.newProveedor = { ...proveedor };
      this.showForm = true;
    },
    deleteProveedor(proveedorId) {
      const index = this.proveedores.findIndex(proveedor => proveedor.ID === proveedorId);
      if (index !== -1) {
        this.proveedores.splice(index, 1);
        axios.delete(`https://api-5iey.onrender.com/providers/${proveedorId}`, { headers: { Authorization: `Bearer ${this.token}` } })
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
      axios.get('https://api-5iey.onrender.com/providers', { headers: { Authorization: `Bearer ${this.token}` } })
        .then(response => {
          console.log(response.data);
          this.proveedores = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchProviders();
  },
};
</script>

<style scoped>
  
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
  margin-left: 120%;
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


  </style>
