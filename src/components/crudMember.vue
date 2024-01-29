<template>
  <div id="content">
    <div class="d-flex justify-content-center align-items-center flex-column">
      <h2 class="title">Miembros</h2>
      <div class="d-row">
        <div class="search-bar">
          <div class="search-icon">🔍</div>
          <input v-model="searchTerm" @input="filterUsers" type="text" placeholder="Buscar por nombre" />
        </div>
        <div class="bton">
          <button @click="showAddForm" class="btn btn-success">Nuevo miembro</button>
        </div>
      </div>
      
      <!-- paginacion -->

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn-light">Anterior</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * pageSize >= filteredUsers.length" class="btn-light" >Siguiente</button>
      </div>

      <!-- tabla -->
      
      <table class="table-crud">
        <thead>
          <tr>
            <th style="font-size: 70%">ID</th>
            <th style="font-size: 70%">Nombre</th>
            <th style="font-size: 70%">Email</th>
            <th style="font-size: 70%">Celular</th>
            <th style="font-size: 70%">Membresía Asignada</th>
            <th style="font-size: 70%">Fecha de Registro</th>
            <th style="font-size: 70%">Fecha de Finalización</th>
            <th style="font-size: 70%">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.ID">
            <td class="btn-border">{{ user.ID }}</td>
            <td class="btn-border">{{ user.Nombre }}</td>
            <td class="btn-border">{{ user.Email }}</td>
            <td class="btn-border">{{ user.Celular }}</td>
            <td class="btn-border">{{ user.MembresiaAsignada }}</td>
            <td class="btn-border">{{ user.FechaRegistro }}</td>
            <td class="btn-border">{{ user.FechaFinalizacion }}</td>
            <td class="btn-border">
              <button @click="editUser(user)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="deleteUser(user.ID)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-show="showForm" class="add-form" style="width: 70%">
        <h3>{{ selectedUser ? 'Editar miembro' : 'Agregar miembro' }}</h3>
        <form @submit.prevent="saveUser" class="form-container">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="newUser.Nombre" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="newUser.Email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="newUser.Celular" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="membresiaAsignada">Membresía Asignada:</label>
            <select v-model="newUser.MembresiaAsignada" class="form-control" required>
              <option v-for="membership in memberships" :key="membership.ID" :value="membership.ID">{{ membership.Titulo }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">{{ selectedUser ? 'Guardar' : 'Agregar' }}</button>
          <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "crudMember",
  data() {
    return {
      showForm: false,
      users: [],
      newUser: {
        ID: "",
        Nombre: "",
        Email: "",
        Celular: "",
        MembresiaAsignada: "",
        FechaRegistro: "",
        FechaFinalizacion: "",
      },
      selectedUser: null,
      searchTerm: "",
      memberships: [],
      token: localStorage.getItem('token') || '', 
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
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
    const index = this.users.findIndex((user) => user.ID === this.selectedUser.ID);
    if (index !== -1) {
      this.users[index] = { ...this.newUser };
      axios.put(`https://api-5iey.onrender.com/members/${this.selectedUser.ID}`, this.newUser, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(response => {
          console.log('Usuario actualizado en el servidor:', response.data);
        })
        .catch(error => {
          console.error('Error al actualizar usuario en el servidor:', error);
        });
    }
  } else {
    const nextId = this.users.length > 0 ? this.users[this.users.length - 1].ID + 1 : 1;
    this.newUser.ID = nextId;

    const currentDate = new Date();
    this.newUser.FechaRegistro = currentDate.toISOString().split('T')[0];

    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 1);
    this.newUser.FechaFinalizacion = endDate.toISOString().split('T')[0];

    axios.post('https://api-5iey.onrender.com/members', this.newUser, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
      .then(response => {
        console.log('Usuario agregado en el servidor:', response.data);
        this.fetchMembers();
      })
      .catch(error => {
        console.error('Error al agregar usuario en el servidor:', error.response.data);
      });
  }

  this.showForm = false;
  this.resetForm();
},

    editUser(user) {
      this.selectedUser = user;
      this.newUser = { ...user };
      this.showAddForm();  
    },

    deleteUser(id) {
  axios.delete(`https://api-5iey.onrender.com/members/${id}`, {
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })
    .then(response => {
      console.log('Usuario eliminado en el servidor:', response.data);

      this.users = this.users.filter(user => user.ID !== id);
      
      const remainingUsers = this.filteredUsers.length;
      
      if ((this.currentPage - 1) * this.pageSize >= remainingUsers) {
        this.currentPage = Math.max(1, this.currentPage - 1);
      
      }
    })
    .catch(error => {
      console.error('Error al eliminar usuario en el servidor:', error);
    });
},



    resetForm() {
      this.newUser = {
        ID: "",
        Nombre: "",
        Email: "",
        Celular: "",
        MembresiaAsignada: "",
        FechaRegistro: "",
        FechaFinalizacion: "",
      };
      this.selectedUser = null;
    },
    fetchMembers() {
      axios.get('https://api-5iey.onrender.com/members', {
        headers: {
          Authorization: `Bearer ${this.token}` 
        }
      })
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchMemberships() {
      axios.get('https://api-5iey.onrender.com/memberships', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(response => {
          this.memberships = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredUsers.length) {
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
    this.fetchMembers();
    this.fetchMemberships();
  },
};
</script>

<style scoped>
.bton {
  margin-left: 120%;
  padding: auto;
}
.btn-border{
  border-bottom: 1px solid white;
}
.btn {
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
  font-size: 70%;
  font-family: Arial, Helvetica, sans-serif;
}

.table-crud tr:nth-child(even) {
  background-color: transparent !important;
}

.table-crud th {
  background-color: #4caf50;
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
  width: 200px;
  height: 30px;
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
  font-size: 12px;
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

.add-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 15px;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 50px;
 
}

.pagination span {
  margin: 0 5px;
  font-size: 14px;
  
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