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
          <button @click="showAddForm" class="btn btn-success">Nuevo miembro</button>
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

      <div v-show="showForm" class="add-form" style="width: 60%">
          <h3>{{ selectedUser ? 'Editar Miembro' : 'Agregar Miembro' }}</h3>
          <form @submit.prevent="saveUser">
            <div class="form-group">
              <label for="id">ID:</label>
              <input v-model="newUser.id" type="text" class="form-control" required />
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
              <input v-model="newUser.membresiaAsignada" type="text" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="fechaFinalizacion">Fecha de Finalización:</label>
              <input v-model="newUser.fechaFinalizacion" type="date" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">{{ selectedUser ? 'Guardar' : 'Agregar' }}</button>
            <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import "@/css/style.css";

export default {
  name: "addMembers",
  components: {},
  data() {
    return {
      showForm: false,
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
    showAddForm() {
      this.showForm = true;
    },
    hideForm() {
    this.showForm = false;
    this.resetForm(); 
    },
    saveUser() {
      if (this.selectedUser) {
        const index = this.users.findIndex((user) => user.id === this.selectedUser.id);
        if (index !== -1) {
          this.users.splice(index, 1, { ...this.newUser });
        }
      } else {
        this.users.push({ ...this.newUser });
      }
      this.showForm = false;
    },
    editUser(user) {
      this.selectedUser = user;
      this.newUser = { ...user };
      this.showAddForm();
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
  
<style >
.bton {
  margin-left: 120%;
  padding: auto;
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


</style>