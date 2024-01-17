<template>
  <div>
    <div class="search-bar">
      <div class="search-icon">🔍</div>
      <input v-model="searchTerm" placeholder="Buscar membresía" />
    </div>

    <button @click="showForm" class="btn btn-success" style="margin-top: 20px;">Agregar</button>

    <div class="container-card">
      <div v-for="(item, index) in filteredItems" :key="index" class="card">
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
      <form @submit.prevent="saveItem">
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

    <!-- Formulario de editar -->
    <div v-if="showEditForm" class="add-form">
      <h3>Editar Membresía</h3>
      <form @submit.prevent="updateItem">
        <div class="form-group">
          <label for="title">Título:</label>
          <input v-model="editItemData.Titulo" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <input v-model="editItemData.Descripcion" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input v-model="editItemData.Precio" type="text" class="form-control" required />
            <span class="input-group-text">MXN</span>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
        <button @click="cancelEdit" class="btn btn-secondary">Cancelar</button>
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
      showEditForm: false,
      newItem: {
        ID: "",
        Titulo: "",
        Descripcion: "",
        Precio: "",
      },
      editItemData: {
        Titulo: '',
        Descripcion: '',
        Precio: '',
      },
      editItemIndex: null,
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
      this.newItem = { Titulo: '', Descripcion: '', Precio: '' };
    },
    addItem() {
      const formattedPrice = `$${this.newItem.Precio} MXN`;
      this.items.push({
        title: this.newItem.Titulo,
        description: this.newItem.Descripcion,
        price: formattedPrice,
      });
      this.newItem = { Titulo: '', Descripcion: '', Precio: '' };
      this.hideForm();
    },

    editItem(index) {
      this.editItemIndex = index;
      this.editItemData = { ...this.items[index] };
      // Muestra el formulario para editar
      this.showEditForm = true;
    },
    cancelEdit() {
      this.showEditForm = false;
      this.editItemData = { Titulo: '', Descripcion: '', Precio: '' };
    },
    updateItem() {
      const formattedPrice = `$${this.editItemData.Precio} MXN`;
      this.$set(this.items, this.editItemIndex, {
        title: this.editItemData.Titulo,
        description: this.editItemData.Descripcion,
        price: formattedPrice,
      });
      this.showEditForm = false;
      this.editItemData = { Titulo: '', Descripcion: '', Precio: '' };
    },
    saveItem() {
      // Si es una edición
      if (this.showEditForm) {
        // Implementa tu lógica de actualización aquí
        // Puedes usar axios.put para realizar la solicitud PUT a tu API
      } else {
        // Es una nueva membresía
        const formattedPrice = `$${this.newItem.Precio} MXN`;
        axios.post('https://tu-api.com/membresias', {
          Titulo: this.newItem.Titulo,
          Descripcion: this.newItem.Descripcion,
          Precio: formattedPrice,
        })
        .then(response => {
          // Actualiza el estado local con la nueva membresía recibida del servidor
          this.items.push(response.data);
          this.hideForm();
        })
        .catch(error => {
          console.error(error);
        });
      }
    },

    fetchItems() {
      axios.get('https://tu-api.com/membresias')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchItems();
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
  color: black;
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
