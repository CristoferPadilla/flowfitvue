<template>
  <div class="container-pt-fixed">
    <h3 class="title">Membresias</h3>
    <div class="Container-row">
      <div class="search-bar">
        <div class="search-icon">🔍</div>
        <input v-model="searchTerm" placeholder="Buscar membresía" />
      </div>
      <button @click="showForm" class="btn btn-success" style="margin-top: 20px">
        Agregar
      </button>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn-light">Anterior</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="!hasMorePages" class="btn-light">Siguiente</button>
      </div>

    </div>
  </div>

  <div class="container-card">
    <div v-for="item in paginatedItems" :key="item.id" class="card">
      <div class="card-body">
        <h5 style="color: #000000" class="card-Titulo">{{ item.title }}</h5>
        <p style="color: #000000" class="card-text">{{ item.description }}</p>
        <p style="color: #000000" class="card-number">$ {{ item.price }} MX</p>
        <button @click="editItem(item.id)" class="btn btn-warning">
          Editar
        </button>
        <button @click="confirmDelete(item.id)" class="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  </div>

  <div v-if="showAddForm" class="add-form">
    <h3>{{ newItem.id ? "Editar Membresía" : "Agregar Membresía" }}</h3>
    <form @submit.prevent="addItem">
      <div class="form-group">
        <label for="Titulo">Título:</label>
        <input v-model="newItem.title" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <input v-model="newItem.description" type="text" class="form-control" required />
      </div>
      <div class="form-group">
  <label for="price">Precio:</label>
  <div class="input-group">
    <span class="input-group-text">$</span>
    <input
      v-model="newItem.price"
      type="text"
      class="form-control"
      required
      pattern="[0-9]+([.][0-9]+)?"  
      title="Ingrese un número válido" 
      oninput="validity.valid||(value='');" 
    />
    <span class="input-group-text">MXN</span>
  </div>
  </div>

  <button @click="saveItem" class="btn btn-primary">
    {{ isEditing ? "Guardar" : "Agregar" }}
  </button>
      <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "membershipCard",
  data() {
    return {
      items: [],
      showAddForm: false,
      newItem: {
        id: "",
        title: "",
        description: "",
        price: "",
      },
      searchTerm: "",
      token: localStorage.getItem("token") || "",
      currentPage: 1,
      pageSize: 3,
      isEditing: false,

    };
  },
  computed: {

    hasMorePages() {
      return this.currentPage * this.pageSize < this.filteredItems.length;
    },
  
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredItems.slice(startIndex, endIndex);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredItems.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetForm() {
    this.newItem = {
       id: "",
        title: "",
        description: "",
        price: "",
    };
    this.isEditing = false;
    this.hideForm();
  },
  deleteMembership(id) {
  axios
    .delete(`https://api-yrrd.onrender.com/memberships/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    .then((response) => {
      console.log('Intentando eliminar membresía con ID:', id);
      console.log("Membresía eliminada en el servidor:", response.data);
      this.fetchMemberships(); 
    })
    .catch((error) => {
      console.error("Error al eliminar membresía en el servidor:", error);
    });
},

    confirmDelete(id) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta membresía?');

    if (confirmed) {
      this.deleteMembership(id);
    }
  },
    showForm() {
      this.showAddForm = true;
      this.newItem = {
        id: "",
        title: "",
        description: "",
        price: "",
      };
    },
    hideForm() {
      this.showAddForm = false;
    },
    addItem() {
      if (this.newItem.id) {
        axios
          .put(
            `https://api-yrrd.onrender.com/memberships/${this.newItem.id}`,
            this.newItem,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            console.log("Membresía actualizada en el servidor:", response.data);
            this.fetchMemberships();
            this.hideForm();
          })
          .catch((error) => {
            console.error(
              "Error al actualizar membresía en el servidor:",
              error
            );
          });
      } else {
        axios
          .post("https://api-yrrd.onrender.com/memberships", this.newItem, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log("Membresía agregada en el servidor:", response.data);
            this.fetchMemberships(); 
            this.hideForm();
          })
          .catch((error) => {
            console.error("Error al agregar membresía en el servidor:", error);
          });
      }
    },
    editItem(id) {
    const membershipToEdit = this.items.find((item) => item.id === id);

    if (membershipToEdit) {
      this.newItem = {
        id: membershipToEdit.id,
        title: membershipToEdit.title,
        description: membershipToEdit.description,
        price: membershipToEdit.price,
      };

      this.showAddForm = true;
      this.isEditing = true; 
    } else {
      console.error('No se encontró la membresía con el ID proporcionado:', id);
    }
  },
    fetchMemberships() {
      axios
        .get("https://api-yrrd.onrender.com/memberships", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchMemberships();
  },
  saveItem() {
    if (this.newItem.id) {
      axios
        .put(
          `https://api-yrrd.onrender.com/memberships/${this.newItem.id}`,
          this.newItem,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log("Membresía actualizada en el servidor:", response.data);
          this.fetchMemberships(); 
          this.hideForm();
        })
        .catch((error) => {
          console.error(
            "Error al actualizar membresía en el servidor:",
            error
          );
        });
    } else {
      axios
        .post("https://api-yrrd.onrender.com/memberships", this.newItem, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log("Membresía agregada en el servidor:", response.data);
          this.fetchMemberships();
          this.hideForm();
        })
        .catch((error) => {
          console.error("Error al agregar membresía en el servidor:", error);
        });
    }
  },
};
</script>

<style scoped>
.form-control {
  margin-bottom: 30px;
}

.btn {
  margin-right: 5%;
}

.container-card {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  width: 250px;
  height: 300px;
  margin: 10px;
  background: linear-gradient(to bottom, #ffffff, #7a7e85);
}

.card-body {
  padding: 25px 20px;
  height: 220px;
}

.card-number {
  font-size: 16px;
  font-weight: bold;
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
  width: 35%;
  height: 70%;
}

.card-Titulo {
  text-align: center;
  margin-bottom: 10px;
  color: black;
}

.card-text {
  text-align: center;
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

.Container-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.container-pt-fixed {
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.pagination {
  margin-top: -90px;
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
