<template>
  <div id="content">
    <div class="d-flex justify-content-center align-items-center flex-column">
      <h2 class="title">Miembros</h2>
      <div class="d-row">
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input type="text" placeholder="">
        </div>
        <div class="bton">
          <button @click="toggleForm" class="bi-plus">Agregar</button>
        </div>

      </div>
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
            <td>{{ user.fechaFinalizacion }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <h3>{{ selectedUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label for="id">ID</label>
            <input v-model="newUser.id" type="text" id="id" :maxlength="ineMaxLength" placeholder="ID (16 dígitos)" required>
          </div>

          <div class="form-group">
            <label for="name">Nombre</label>
            <input v-model="newUser.name" type="text" id="name" placeholder="Nombre" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="newUser.email" type="email" id="email" placeholder="Email" required>
          </div>

          <div class="form-group">
            <label for="phone">Celular</label>
            <input v-model="newUser.phone" type="tel" id="phone" placeholder="Celular" required>
          </div>

          <div class="form-group">
            <label for="registrationDate">Fecha de Registro</label>
            <flat-pickr v-model="newUser.registrationDate" :config="datePickerConfig"></flat-pickr>
          </div>

          <div class="form-group">
            <label for="membresiaAsignada">Membresía Asignada</label>
            <select v-model="newUser.membresiaAsignada" id="membresiaAsignada">
              <option value="individual">Individual</option>
              <option value="pareja">Pareja</option>
              <option value="familiar">Familiar</option>
              <option value="visita">Visita</option>
            </select>
          </div>

          <div class="button-container">
            <button type="button" @click="toggleForm">Cancelar</button>
            <button type="submit">{{ selectedUser ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

  
  
<script>

import "@/css/style.css";

export default {
  name: "addMembers",
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
#bton {
  margin-left: 123%;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container button {
  margin-left: 10px;
  cursor: pointer;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  /* Asegúrate de que sea un valor mayor que el de .modal-overlay */
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* Puedes ajustar el valor según sea necesario */
}
</style>