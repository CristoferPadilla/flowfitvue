<template>
  <div>
    <button @click="showForm" class="btn btn-success">Agregar</button>

    <div class="container-card" style="background-color: #000000; padding-bottom: 10%;">
      <div v-for="(item, index) in items" :key="index" class="card">
        <div class="card-label" style="color: black;">
          <p>{{ item.title }}</p>
        </div>
        <div class="card-number" style="color: black;">
          <p>{{ item.price }}</p>
        </div>
        <button @click="removeItem(index)" class="btn btn-danger">Eliminar</button>
      </div>

    </div>

    <!-- Formulario de agregar -->
    <div v-if="showAddForm" class="add-form">
      <h3>Agregar Membresía</h3>
      <form @submit.prevent="addItem">
        <div class="form-group">
          <label for="title">Título:</label>
          <input v-model="newItem.title" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <input v-model="newItem.description" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <input v-model="newItem.price" type="text" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Agregar</button>
        <button @click="hideForm" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Estudiante', price: '$100' },
        { title: 'Normal', price: '$200' },
      ],
      showAddForm: false,
      newItem: {
        title: '',
        description: '',
        price: '',
      },
    };
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
      this.items.push({ title: this.newItem.title, price: this.newItem.price });
      this.newItem = { title: '', description: '', price: '' };
      this.hideForm();
    },
  },

};
</script>

<style>
.container-card {
  max-height: 60vh;
  width: 60vw;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.card-number {
  font-size: 14px;
  font-weight: bold;
}

.card-label {
  font-size: 16px;
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
</style>
