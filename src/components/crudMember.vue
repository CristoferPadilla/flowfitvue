<template>

      <div id="content">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <h2 class="title">Miembros</h2>
          <div class="d-flex justify-content-end">
            <button @click="toggleForm" class="btn btn-success mb-3">
              <i class="bi bi-plus"></i> Agregar
            </button>
          </div>
          <!-- Tabla de usuarios -->
          <table class="table table-responsive">
            <thead>
              <tr>
                <th style="font-size: 70%">INE</th>
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
              <tr v-for="user in users" :key="user.ine">
                <td style="font-size: 75%;">{{ user.ine }}</td>
                <td style="font-size: 75%;">{{ user.name }}</td>
                <td style="font-size: 75%;">{{ user.email }}</td>
                <td style="font-size: 75%;">{{ user.phone }}</td>
                <td style="font-size: 75%;">{{ user.registrationDate }}</td>
                <td style="font-size: 75%;">{{ user.membresiaAsignada }}</td>
                <td style="font-size: 75%;">{{ user.fechaFinalizacion }}</td>
                <td>
                  <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
                  <button @click="deleteUser(user.ine)" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Botón para mostrar/ocultar el formulario de agregar -->

  
          <!-- Formulario de agregar/editar, inicialmente oculto -->
          <form v-if="showForm" @submit.prevent="saveUser" class="mb-3">
            <!-- ... -->
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
            ine: "1234567890123456",
            name: "Usuario 1",
            email: "usuario1@example.com",
            phone: "123-456-7890",
            registrationDate: "2023-01-01",
            membresiaAsignada: "pareja",
            fechaFinalizacion: "2023-02-01",
          },
          // ...otros usuarios
        ],
        newUser: {
          ine: "",
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
        if (this.newUser.ine.length !== this.ineMaxLength) {
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
          const index = this.users.findIndex((user) => user.ine === this.selectedUser.ine);
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
      deleteUser(ine) {
        this.users = this.users.filter((user) => user.ine !== ine);
      },
      resetForm() {
        this.newUser = {
          ine: "",
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
  
  </style>