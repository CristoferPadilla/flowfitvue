<template>
  <div class="container-pt-fixed">
    <h3 class="title">Membresias</h3>
    <div class="Container-row">
      <div class="search-bar">
      <div class="search-icon">🔍</div>
      <input v-model="searchTerm" placeholder="Buscar membresía" />
    </div>
    <button @click="showForm" class="btn btn-success" style="margin-top: 20px;">Agregar</button>
    </div>
  </div>

    <div class="container-card">
      <div v-for="item in filteredItems" :key="item.ID" class="card">
        <div class="card-body">
          <h5 style="color: #000000" class="card-Titulo">{{ item.Titulo }}</h5>
          <p style="color: #000000" class="card-text">{{ item.Descripcion }}</p>
          <p style="color: #000000" class="card-number">$ {{ item.Precio }} MX</p>
          <button @click="editItem(item.ID)" class="btn btn-warning">Editar</button>
          <button @click="removeItem(item.ID)" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>

    <div v-if="showAddForm" class="add-form">
      <h3>{{ newItem.ID ? 'Editar Membresía' : 'Agregar Membresía' }}</h3>
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
        <button type="submit" class="btn btn-primary">
          {{ newItem.ID ? 'Guardar' : 'Agregar' }}
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
      if (this.newItem.ID) {
        axios.put(`https://api-5iey.onrender.com/memberships/${this.newItem.ID}`, this.newItem)
          .then(response => {
            console.log('Membresía actualizada en el servidor:', response.data);
            const index = this.items.findIndex(item => item.ID === this.newItem.ID);
            if (index !== -1) {
              this.$set(this.items, index, { ...this.newItem });
            }
            this.hideForm();
          })
          .catch(error => {
            console.error('Error al actualizar membresía en el servidor:', error);
          });
      } else {
        axios.post('https://api-5iey.onrender.com/memberships', this.newItem)
          .then(response => {
            console.log('Membresía agregada en el servidor:', response.data);
            this.items.push({ ...this.newItem, ID: response.data.ID });
            this.hideForm();
          })
          .catch(error => {
            console.error('Error al agregar membresía en el servidor:', error);
          });
      }
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
.form-control{
  margin-bottom: 30px;
}
.btn{
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
  width: 300px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
.search-bar input {
  border:none; 
  outline:none; 
  background:none; 
  width:auto; 
  color:black; 
  font-size :18px; 
  line-height :40px; 
  padding :0 10px ;
}
.search-icon{
  padding-left :10px ;
}
.Container-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.container-pt-fixed{
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;

}
</style>
