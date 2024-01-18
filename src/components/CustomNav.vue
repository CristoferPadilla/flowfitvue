<template>
  <div class="app-navbar">
    <div class="nav-title">Administador</div>
    <div class="user-picture">
      <img src="../assets/dani.jpg" alt="" class="user-picture">
    </div>
    <div class="nav-user-name">{{ usuario }}</div> 
    <router-link to="/menu" class="nav-link">
      <img src="../assets/house-fill.svg" alt="Ejercicio Icon" class="nav-icon" />
      Menu 
    </router-link>
    <router-link to="/membership" class="nav-link">
      <img
        src="../assets/person-vcard-fill.svg"
        alt="Membresias Icon"
        class="nav-icon"
      />
      Membresias
    </router-link>
    <router-link to="/members" class="nav-link">
      <img
        src="../assets/people-fill.svg"
        alt="Miembros Icon"
        class="nav-icon"
      />
      Miembros
    </router-link>
    <router-link to="/inventory" class="nav-link">
      <img
        src="../assets/list-check.svg"
        alt="inventario icon"
        class="nav-log-out"
      />
      Inventario
    </router-link>
    <router-link to="/products" class="nav-link">
      <img
        src="../assets/shop.svg"
        alt="carrito icon"
        class="nav-log-out"
      />
      Venta
    </router-link>
    <router-link to="/" class="nav-link">
      <img
        src="../assets/door-open-fill.svg"
        alt="Cerrar sesion icon"
        class="nav-log-out"
      />
      Cerrar sesión
    </router-link>
  </div>
</template>

<script>
import "@/css/style.css";
export default {
  name: "AppNavbar",
  data() {
    return {
      usuario: "", 
    };
  },
  methods:{
    handleLoginSuccess(usuario) {
      this.usuario = usuario;
    },
  },
  mounted() {
    this.$emit('login-success', 'Nombre de usuario');
  }
};
</script>

<style scoped></style>
