  <template>
    <div id="content">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Miembros</h2>
        <div class="d-row">
          <div class="search-bar">
            <div class="search-icon">🔍</div>
            <input
              v-model="searchTerm"
              @input="filtermembers"
              type="text"
              placeholder="Buscar por nombre"
            />
          </div>
          <div class="bton">
            <button @click="showAddForm" class="btn btn-success">Nuevo miembro</button>
          </div>
        </div>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1" class="btn-light">
            Anterior
          </button>
          <span>{{ currentPage }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage * pageSize >= filteredmembers.length"
            class="btn-light"
          >
            Siguiente
          </button>
        </div>
      </div>
      <br />
      <table class="table-crud">
        <thead>
          <tr>
            <th style="font-size: 70%">Imagen</th>
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
          <tr v-for="member in paginatedmembers" :key="member.id">
            <td class="btn-border">
              <img class="member-image" :src="member.profile_picture" :alt="member.name" />
            </td>
            <td class="btn-border">{{ member.id }}</td>
            <td class="btn-border">{{ member.name }}</td>
            <td class="btn-border">{{ member.email }}</td>
            <td class="btn-border">{{ member.phone }}</td>
            <td class="btn-border">{{ member.assigned_membership }}</td>
            <td class="btn-border">{{ member.registration_date }}</td>
            <td class="btn-border">{{ member.end_date }}</td>
            <td class="btn-border">
              <button @click="editmember(member)" class="btn btn-warning btn-sm">Editar</button>
              <button @click="deletemember(member.id)" class="btn btn-danger btn-sm">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-show="showForm" class="add-form" style="width: 70%">
        <h3>{{ selectedMember ? "Editar miembro" : "Agregar miembro" }}</h3>
        <form
          @submit.prevent="savemember"
          class="form-container"
          enctype="multipart/form-data"
        >
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="newMember.name" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="newMember.email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="newMember.phone" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="assigned_membership">Membresía Asignada:</label>
            <select v-model="newMember.assigned_membership" class="form-control" required>
              <option
                v-for="membership in memberships"
                :key="membership.id"
                :value="membership.id"
              >
                {{ membership.title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="duraciónMembresia">Duración:</label>
            <select v-model="newMember.membership_duration" class="form-control" required>
              <option value="1">1 mes</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">1 año</option>
            </select>
          </div>
          <div class="form-group">
            <label for="profile_picture">Imagen de perfil:</label>
            <input type="file" @change="handleFileChange" accept="image/*"/>
          </div>

          <button type="submit" class="btn btn-primary">
            {{ selectedMember ? "Guardar" : "Agregar" }}
          </button>
          <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
        </form>
      </div>
    </div>
  </template>

  <script>
  import axios from "axios";

  export default {
    name: "crudMember",
  data() {
    return {
      showForm: false,
      members: [],
      newMember: {
        id: "",
        username: "", // Nuevo campo
        password: "", // Nuevo campo
        level: "", // Nuevo campo
        height: null, // Nuevo campo
        weight: null, // Nuevo campo
        muscle_mass: null, // Nuevo campo
        body_fat_percentage: null, // Nuevo campo
        name: "",
        email: "",
        phone: "",
        assigned_membership: "",
        registration_date: "", // No necesitas definir este campo aquí
        end_date: "", // No necesitas definir este campo aquí
        is_active: "", // No necesitas definir este campo aquí
        profile_picture: null,
      },
      selectedMember: null,
      searchTerm: "",
      memberships: [],
      token: localStorage.getItem("token") || "",
      currentPage: 1,
      pageSize: 5,
    };
  },
    computed: {
      filteredmembers() {
        return this.members.filter((member) =>
          member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
      paginatedmembers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredmembers.slice(startIndex, endIndex);
      },
    },
    methods: {
      savemember() {
        if (this.selectedMember) {
          this.updatemember();
        } else {
          this.addmember();
        }
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.newMember.profile_picture = file;

        }
      },
      addmember() {
  const formData = new FormData();
  formData.append('name', this.newMember.name);
  formData.append('email', this.newMember.email);
  formData.append('phone', this.newMember.phone);
  formData.append('assigned_membership', this.newMember.assigned_membership);
  formData.append('membership_duration', this.newMember.membership_duration);
  formData.append('profile_picture', this.newMember.profile_picture);

  // Ajustar los campos con valor predeterminado de null para que se envíen como nulos
  const fieldsWithDefaultNull = ['username', 'password', 'level', 'height', 'weight', 'muscle_mass', 'body_fat_percentage'];
  fieldsWithDefaultNull.forEach(field => {
    if (this.newMember[field] !== null) {
      formData.append(field, this.newMember[field]);
    } else {
      formData.append(field, null);
    }
  });

  axios.post("https://api-zydf.onrender.com/members", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.token}`,
    },
  })
  .then((response) => {
    console.log("Usuario agregado en el servidor:", response.data);
    this.fetchMembers();
    this.showForm = false;
    this.resetForm();
  })
  .catch((error) => {
    console.error("Error al agregar usuario en el servidor:", error.response.data);
    console.log(formData);
    console.log(this.newMember.profile_picture);
  });
},
updatemember() {
  const memberData = {
    name: this.newMember.name,
    email: this.newMember.email,
    phone: this.newMember.phone,
    assigned_membership: this.newMember.assigned_membership,
    membership_duration: this.newMember.membership_duration,
  };


  if (this.newMember.profile_picture) {
    memberData.profile_picture = this.newMember.profile_picture;
  }

  axios
    .put(
      `https://api-zydf.onrender.com/members/${this.selectedMember.id}`,
      memberData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
    .then((response) => {
      console.log("Usuario actualizado en el servidor:", response.data);
      this.fetchMembers();
      this.showForm = false;
      this.resetForm();
    })
    .catch((error) => {
      console.error(
        "Error al actualizar usuario en el servidor:",
        error.response.data
      );
    });
},

      showAddForm() {
        this.showForm = true;
      },
      hideForm() {
        this.showForm = false;
        this.newMember.profile_picture = null;
        this.resetForm();
      },

      editmember(member) {
        this.selectedMember = member;
        this.newMember = { ...member };
        this.showAddForm();
      },

      deletemember(id) {
        axios
          .delete(`https://api-zydf.onrender.com/members/${id}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log("Usuario eliminado en el servidor:", response.data);

            this.members = this.members.filter((member) => member.id !== id);

            const remainingmembers = this.filteredmembers.length;

            if ((this.currentPage - 1) * this.pageSize >= remainingmembers) {
              this.currentPage = Math.max(1, this.currentPage - 1);
            }
            this.fetchMembers();
          })
          .catch((error) => {
            console.error("Error al eliminar usuario en el servidor:", error);
          });
      },

      resetForm() {
        this.newMember = {
          id: "",
          password: "", // Nuevo campo
        level: "", // Nuevo campo
        height: null, // Nuevo campo
        weight: null, // Nuevo campo
        muscle_mass: null, // Nuevo campo
        body_fat_percentage: null, // Nuevo campo
        name: "",
        email: "",
        phone: "",
        assigned_membership: "",
        registration_date: "", // No necesitas definir este campo aquí
        end_date: "", // No necesitas definir este campo aquí
        is_active: "", // No necesitas definir este campo aquí
        profile_picture: null,
        };
        this.selectedMember = null;
      },

      fetchMembers() {
        axios
          .get("https://api-zydf.onrender.com/members", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.members = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },

      fetchMemberships() {
        axios
          .get("https://api-zydf.onrender.com/memberships", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.memberships = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },

      nextPage() {
        if (this.currentPage * this.pageSize < this.filteredmembers.length) {
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
  .btn-border {
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
  .member-image {
    width: 60px; /* Ajusta el tamaño de la imagen según sea necesario */
    height: auto; /* Mantén la proporción de la imagen */
    border-radius: 5px; /* Opcional: Agrega bordes redondeados */
  }
  </style>
