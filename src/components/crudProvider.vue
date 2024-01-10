<template>
    <div id="content">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Proveedores</h2>
        <div class="d-row">
          <div class="search-bar">
            <div class="search-icon">🔍</div>
            <input type="text" placeholder="">
          </div>
          <div class="bton">
            <button @click="showAddForm" class="btn btn-success">Nuevo proveedor</button>
        </div>
        </div>
        <table class="table-crud">
          <thead>
            <tr>
              <th style="font-size: 70%">INE</th>
              <th style="font-size: 70%">Nombre</th>
              <th style="font-size: 70%">Email</th>
              <th style="font-size: 70%">Celular</th>
              <th style="font-size: 70%">Dirección</th>
              <th style="font-size: 70%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="provider in providers" :key="provider.id">
              <td>{{ provider.ine }}</td>
              <td>{{ provider.name }}</td>
              <td>{{ provider.email }}</td>
              <td>{{ provider.cellphone }}</td>
              <td>{{ provider.direction }}</td>
              <td>
                <button @click="editProvider(provider)" class="btn btn-warning btn-sm">Editar</button>
                <button @click="deleteProvider(provider.id)" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="add-form-container" v-show="showForm">

        <div v-show="showForm" class="add-form" style="width: 70%">
            <h3>{{ selectedProvider ? 'Editar miembro' : 'Agregar miembro' }}</h3>
            <form @submit.prevent="saveProvider" class="form-container">
              <div class="form-group">
                <label for="ine">INE:</label>
                <input v-model="newProvider.ine" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input v-model="newProvider.name" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="newProvider.email" type="email" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="phone">Celular:</label>
                <input v-model="newProvider.cellphone" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="direction">Dirección:</label>
                <input v-model="newProvider.direction" type="text" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">{{ selectedProvider ? 'Guardar' : 'Agregar' }}</button>
              <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
            </form>
        </div>
          </div>
    </div>
        </template>
        
        <script>
        import "@/css/style.css";
        
        export default {
  data() {
    return {
      providers: [
        {
          id: 1,
          ine: "123456789",
          name: "Juan Perez",
          email: "cacac@gmail.com",
          cellphone: "1234567890",
          direction: "Calle 12, avenida tutancamon",
        }
      ],
      showForm: false,
      selectedProvider: null,
      newProvider: {
        id: "", 
        ine: "",
        name: "",
        email: "",
        cellphone: "",
        direction: "",
      },
    };
  },
  methods: {
    showAddForm() {
      this.showForm = true;
      this.selectedProvider = null;
      this.clearForm();
    },
    hideForm() {
      this.showForm = false;
      this.clearForm();
    },
    clearForm() {
      this.newProvider = {
        id: "",
        ine: "",
        name: "",
        email: "",
        cellphone: "",
        direction: "",
      };
    },
    saveProvider() {
      if (this.selectedProvider) {
        const index = this.providers.findIndex(provider => provider.id === this.selectedProvider.id);
        if (index !== -1) {
          this.providers[index] = { ...this.selectedProvider };
        }
      } else {
        this.newProvider.id = this.providers.length + 1;
        this.providers.push({ ...this.newProvider });
      }
      this.hideForm();
    },

    editProvider(provider) {
      this.selectedProvider = { ...provider };
      this.newProvider = { ...provider };
      this.showForm = true;
    },

    deleteProvider(providerId) {
      const index = this.providers.findIndex(provider => provider.id === providerId);
      if (index !== -1) {
        this.providers.splice(index, 1);
      
  }
}}};
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
  