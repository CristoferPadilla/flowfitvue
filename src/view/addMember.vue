<!-- views/AddMember.vue -->

<template>
    <div id="add-member">
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h2 class="title">Agregar Miembro</h2>
        <form @submit.prevent="saveMember" class="add-member-form">
          <div class="form-group">
            <label for="id">ID (CURP o Número de Lector):</label>
            <input v-model="member.id" type="text" id="id" required />
          </div>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input v-model="member.name" type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="lastName">Apellido:</label>
            <input v-model="member.lastName" type="text" id="lastName" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="member.email" type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="phone">Celular:</label>
            <input v-model="member.phone" type="tel" id="phone" required />
          </div>
          <div class="form-group">
            <label for="registrationDate">Fecha de Registro:</label>
            <input v-model="member.registrationDate" type="date" id="registrationDate" required />
          </div>
          <div class="form-group">
            <label for="membresiaAsignada">Membresía Asignada:</label>
            <select v-model="member.membresiaAsignada" id="membresiaAsignada" required>
              <option value="pareja">Pareja</option>
              <option value="estudiantil">Estudiantil</option>
              <option value="normal">Normal</option>
              <!-- Agrega otras opciones según sea necesario -->
            </select>
          </div>
          <div class="form-group">
            <label for="fechaFinalizacion">Fecha de Finalización:</label>
            <input v-model="member.fechaFinalizacion" type="date" id="fechaFinalizacion" required />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <router-link :to="{ name: 'CrudMembers' }" class="btn btn-secondary">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import "@/css/style.css";
  
  export default {
    name: "AddMemberView",
    data() {
      return {
        member: {
          id: "",
          name: "",
          lastName: "",
          email: "",
          phone: "",
          registrationDate: "",
          membresiaAsignada: "",
          fechaFinalizacion: "",
        },
      };
    },
    methods: {
      saveMember() {
        // Puedes implementar la lógica para guardar el miembro aquí
        // Por ejemplo, emitir un evento o llamar a una acción de Vuex
        console.log("Miembro guardado:", this.member);
        // Después de guardar, redireccionar a la vista principal
        this.$router.push({ name: 'CrudMembers' });
      },
    },
  };
  </script>
  
  <style>
  /* Puedes agregar estilos específicos del formulario aquí */
  </style>
  