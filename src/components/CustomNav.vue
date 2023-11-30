<template>
  <div class="app-navbar">
    <div class="nav-title">
      Administador
    </div>
    <div class="user-picture"> </div>
    <div class="nav-user-name">
      Daniela Santoyo
    </div>
    <router-link to="/Membresias" class="nav-link">
      <img src="../assets/person-vcard-fill.svg" alt="Membresias Icon" class="nav-icon" />
      Membresias
    </router-link>
    <router-link to="/members" class="nav-link">
      <img src="../assets/people-fill.svg" alt="Miembros Icon" class="nav-icon" />
      Miembros
    </router-link>
    <router-link to="/Suscripciones" class="nav-link">
      <img src="" alt="Suscripciones Icon" class="nav-icon" /> 
      Suscripciones
    </router-link>
    <router-link to="/" class="nav-link">
      <img src="../assets/door-open-fill.svg" alt="Cerrar sesion icon" class="nav-log-out"/>
      Cerrar sesión
    </router-link>
  </div>
</template>
 
<script>
import '@/css/style.css'
export default {
  name: 'AppNavbar',
};
</script>
 
<style scoped>

</style>