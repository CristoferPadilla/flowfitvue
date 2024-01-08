<template>

      <div id="content">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <h2 class="title">Miembros</h2>
          <div class="d-row">
            <div class="search-bar">
                <div class="search-icon">🔍</div> 
                <input type="text" placeholder="">
            </div>
            <button @click="toggleForm"  id="bton" class="btn btn-success mb-3">
              <i class="bi bi-plus"></i> Agregar
            </button>
        </div>
          <!-- Tabla de usuarios -->
          <table class="table-crud">
            <thead>
              <tr>
                <th style="font-size: 70%">ID</th>
                <th style="font-size: 70%">Nombre</th>
                <th style="font-size: 70%">Email</th>
                <th style="font-size: 70%">Celular</th>
                <th style="font-size: 70%">Fecha de Registro</th>
                <th style="font-size: 70%">Membresía Asignada</th>
                <th style="font-size: 70%">Fecha de Finalización</th>
                <th style="font-size: 70%">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.registrationDate }}</td>
                <td>{{ user.membresiaAsignada }}</td>
                <td >{{ user.fechaFinalizacion }}</td>
                <td>
                  <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
                  <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
  

  
          <form v-if="showForm" @submit.prevent="saveUser" class="mb-3">
          </form>
        </div>
      </div>
  </template>
  
  
  <script>

  import "@/css/style.css";
  
  export default {
    name: "CrudMembers",
    components: {
    },
    data() {
      return {
        showForm: false,
        ineMaxLength: 16,
        users: [
          {
            id: "1234567890123450",
            name: "Usuario 1",
            email: "usuario1@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
          
            {
            id: "1234567890123451",
            name: "Usuario 2",
            email: "usuario2@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
          {
            id: "1234567890123452",
            name: "Usuario 3",
            email: "usuario3@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
          {
            id: "1234567890123453",
            name: "Usuario 4",
            email: "usuario4@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
          {
            id: "1234567890123457",
            name: "Usuario 3",
            email: "usuario3@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
        ],
        newUser: {
          id: "",
          name: "",
          email: "",
          phone: "",
          registrationDate: "",
          membresiaAsignada: "",
          fechaFinalizacion: "",
        },
        
        selectedUser: null,
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm();
        }
      },
      addUser() {
        // Verificar la longitud del INE
        if (this.newUser.id.length !== this.ineMaxLength) {
          alert(`La longitud del INE debe ser de ${this.ineMaxLength} caracteres.`);
          return;
        }
  
        // Calcular fecha de finalización
        const registrationDate = new Date(this.newUser.registrationDate);
        const nextMonth = new Date(registrationDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
  
        if (this.newUser.membresiaAsignada === "visita") {
          // Si la membresía es "visita", establecer la fecha de finalización como el mismo día
          this.newUser.fechaFinalizacion = registrationDate.toISOString().split("T")[0];
        } else {
          // Para otras membresías, establecer la fecha de finalización como un mes después
          this.newUser.fechaFinalizacion = nextMonth.toISOString().split("T")[0];
        }
  
        this.users.push({ ...this.newUser });
        this.resetForm();
        this.showForm = false;
      },
      editUser(user) {
        this.selectedUser = user;
        this.newUser = { ...user };
        this.showForm = true;
      },
      saveUser() {
        // Calcular fecha de finalización
        const registrationDate = new Date(this.newUser.registrationDate);
        const nextMonth = new Date(registrationDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
  
        if (this.newUser.membresiaAsignada === "visita") {
          // Si la membresía es "visita", establecer la fecha de finalización como el mismo día
          this.newUser.fechaFinalizacion = registrationDate.toISOString().split("T")[0];
        } else {
          // Para otras membresías, establecer la fecha de finalización como un mes después
          this.newUser.fechaFinalizacion = nextMonth.toISOString().split("T")[0];
        }
  
        if (this.selectedUser) {
          // Editar usuario existente
          const index = this.users.findIndex((user) => user.id === this.selectedUser.id);
          if (index !== -1) {
            this.users.splice(index, 1, { ...this.newUser });
          }
        } else {
          // Crear nuevo usuario
          this.users.push({ ...this.newUser });
        }
  
        this.resetForm();
        this.showForm = false;
      },
      deleteUser(id) {
        this.users = this.users.filter((user) => user.id !== id);
      },
      resetForm() {
        this.newUser = {
          id: "",
          name: "",
          email: "",
          phone: "",
          registrationDate: "",
          membresiaAsignada: "",
          fechaFinalizacion: "",
        };
        this.selectedUser = null;
      },
    },
  };
  </script>
  
  <style>
  #bton{
    margin-left: 123%;
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

  </style>