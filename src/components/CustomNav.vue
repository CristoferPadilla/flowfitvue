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
    <router-link to="/Miembros" class="nav-link">
      <img src="../assets/people-fill.svg" alt="Miembros Icon" class="nav-icon" />
      Miembros
    </router-link>
    <router-link to="/Suscripciones" class="nav-link">
      <img src="" alt="Suscripciones Icon" class="nav-icon" />
      Suscripciones
    </router-link>
    <router-link to="/login" class="nav-link">
      <img src="../assets/door-open-fill.svg" alt="Cerrar sesion icon" class="nav-log-out"/>
      Cerrar sesión
    </router-link>
  </div>
</template>
 
<script>
export default {
  name: 'AppNavbar',
};
</script>
 
<style scoped>
.app-navbar {
  height: 100vh; /* Cambia este valor */
  width: 100%; /* Ajusta el ancho según tus necesidades */
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: #070611;
  padding: 20px;
  color: white;
}

 
.nav-title {
  font-size: 25px; /* Ajusta el tamaño del título según tus necesidades */
  font-weight: bold;
  justify-content: center; /* Esto centra horizontalmente el contenido */
  margin-bottom: 30px; /* Ajusta el espacio entre el título y los enlaces según tus necesidades */
}
 
.nav-link {
  text-decoration: none;
  color: white;
  margin-bottom: 40px; /* Ajusta el espacio entre los enlaces según tus necesidades */
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px; /* Ajusta el tamaño de la letra según tus necesidades */
  cursor: pointer;
}
 
.nav-link:hover, .nav-link:active, .nav-link:focus {
  text-decoration: underline;
  background-color: #273c73;
  color: #ffffff;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  font-size: 15px;
  font-weight: bold;
  padding: 10px
}
 
.nav-icon {
  width: 24px; /* Ajusta el tamaño del icono según tus necesidades */
  height: 24px;
  padding-right: 5px;
  margin-right: 10px; /* Ajusta el espacio entre el icono y el texto según tus necesidades */
  filter: brightness(0) invert(1); /* Cambia el color a blanco */
}
.user-picture{
  width: 80px;
  height: 80px;
  margin: 0 auto;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: white;
  
}
.nav-user-name {
  text-decoration: none;
  color: white;
  margin-top: 10px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center; /* Esto centra horizontalmente el contenido */
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.nav-log-out{
  width: 24px; /* Ajusta el tamaño del icono según tus necesidades */
  height: 24px;
  padding-right: 5px;
  margin-right: 10px; /* Ajusta el espacio entre el icono y el texto según tus necesidades */
  filter: brightness(0) invert(1); 
  align-self: flex-end;
  align-items: self-end;
}
</style>