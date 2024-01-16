<template>
  <div>
    <div class="search-bar">
      <div class="search-icon">🔍</div>
      <input v-model="searchTerm" placeholder="Buscar membresía" />
    </div>

    <button @click="showForm" class="btn btn-success" style="margin-top: 20px;">Agregar</button>

    <div class="container-card">
      <div v-for="item in filteredItems" :key="item.ID" class="card">
        <div class="card-body">
          <h5 style="color: #000000" class="card-Titulo">{{ item.Titulo }}</h5>
          <p style="color: #000000" class="card-text">{{ item.Descripcion }}</p>
          <p style="color: #000000" class="card-number">{{ item.Precio }}</p>
          <button @click="editItem(index)" class="btn btn-warning">Editar</button>
          <button @click="removeItem(index)" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Formulario de agregar -->
    <div v-if="showAddForm" class="add-form">
      <h3>Agregar Membresía</h3>
      <form @submit.prevent="addItem">
        <div class="form-group">
          <label for="Titulo">Título:</label>
          <input v-model="newItem.Titulo" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <input v-model="newItem.Descripcion" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input v-model="newItem.Precio" type="text" class="form-control" required />
            <span class="input-group-text">MXN</span>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Agregar</button>
        <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
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
        ID: "",
        Titulo: "",
        Descripcion: "",
        Precio: "",
      },
      searchTerm: "",
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.Titulo && item.Titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
    },
    showForm() {
      this.showAddForm = true;
    },
    hideForm() {
      this.showAddForm = false;
    },
    addItem() {
  const formattedPrice = `$${this.newItem.Precio} MXN`;
  this.items.push({
    ID: this.items.length + 1,
    Titulo: this.newItem.Titulo,
    Descripcion: this.newItem.Descripcion,
    Precio: formattedPrice,
  });
  this.newItem = { ID: "", Titulo: "", Descripcion: "", Precio: "" };
  this.hideForm();
},
    editItem(index) {
      this.newItem = { ...this.items[index] };
      this.showAddForm = true;
    },
    fetchMemberships() {
      axios
        .get("https://api-5iey.onrender.com/memberships")
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
};
</script>

<style scoped>
.container-card {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  width: 180px;
  height: 290px;
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
}

.card-Titulo {
  text-align: center;
  margin-bottom: 10px;
  color:black;
  /* Ajusta el margen inferior del título */
}

.card-text {
  text-align: center;
}

.search-bar {
  margin-top: 20px;
  margin-bottom: 20px;
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
</style>
