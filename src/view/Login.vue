<template>
  <div class="container mt-5">
    <form @submit.prevent="iniciarSesion" class="bg-white p-4 rounded-lg" style="background: white; margin: 140px auto; padding: 20px; border-radius: 50px; width: 50%; text-align: center; display: grid; place-items: center;">
      <div class="text-center mb-4">
        <h1 class="text-dark font-fantasy" style="color: black; text-align: center; font-family: fantasy; padding-bottom: 30px; font-size: 80px;">FLOWFIT</h1>
      </div>
      <div class="mb-3">
        <label for="txtusu" class="form-label"><strong>Username</strong></label>
        <input type="text" id="txtusu" class="form-control" v-model="usuario" required>
      </div>
      <div class="mb-3">
        <label for="txtpas" class="form-label"><strong>Password</strong></label>
        <input type="password" id="txtpas" class="form-control" v-model="contrasena" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>

    <UserLogin v-if="isLoggedIn" :usu="usuario" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UserLogin',
  setup() {
    const usuario = ref('');
    const contrasena = ref('');
    const router = useRouter();

    const iniciarSesion = () => {
      if (usuario.value.length === 0 || contrasena.value.length === 0) {
        alert("Complete Los Datos Faltantes!!");
      } else {
        if (usuario.value === "DaniSantoyoyo" && contrasena.value === "123") {
          router.push('/menu');
        } else {
          alert("Error De Usuario y/o Contraseña!!");
          usuario.value = "";
          contrasena.value = "";
          document.getElementById("txtusu").focus();
        }
      }
    };

    return {
      iniciarSesion,
      usuario,
      contrasena
    };
  }
};
</script>

