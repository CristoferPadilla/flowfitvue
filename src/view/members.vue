<template>
  <div id="app">
    <div class="app">
      <Navbar />
    </div>
    <div id="content">
      <Header/>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2>Lista de Usuarios</h2>

        <!-- Botón para mostrar/ocultar el formulario de agregar -->
        <button @click="toggleForm" class="btn btn-success mb-3">
          <i class="bi bi-plus"></i> Agregar
        </button>

        <!-- Formulario de agregar/editar, inicialmente oculto -->
        <form v-if="showForm" @submit.prevent="saveUser" class="mb-3">
          <div class="form-group">
            <label for="ine">INE:</label>
            <input v-model="newUser.ine" type="text" class="form-control" :maxlength="ineMaxLength" required />
          </div>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="newUser.name" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="newUser.email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="newUser.phone" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="registrationDate">Fecha de Registro:</label>
            <input v-model="newUser.registrationDate" type="date" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="membresiaAsignada">Membresía Asignada:</label>
            <select v-model="newUser.membresiaAsignada" class="form-control" required>
              <option value="pareja">Pareja</option>
              <option value="estudiante">Estudiante</option>
              <option value="mes">Mes</option>
              <option value="visita">Visita</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">{{ selectedUser ? 'Editar' : 'Agregar' }}</button>
        </form>

        <!-- Tabla de usuarios -->
        <table class="table">
          <thead>
            <tr>
              <th>INE</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Fecha de Registro</th>
              <th>Membresía Asignada</th>
              <th>Fecha de Finalización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.ine">
              <td>{{ user.ine }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.registrationDate }}</td>
              <td>{{ user.membresiaAsignada }}</td>
              <td>{{ user.fechaFinalizacion }}</td>
              <td>
                <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
                <button @click="deleteUser(user.ine)" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/CustomNav.vue";
import Header from "@/components/header.vue";
import "@/css/style.css";

export default {
  name: "MenuPrincipal",
  components: {
    Navbar,
    Header,
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
