<template>
  <div class="container" style="background: white; margin: 140px auto; padding: 20px; border-radius: 50px; width: 50%; text-align: center; display: grid; place-items: center;">
    <form id="form_login" @submit.prevent="iniciarSesion" style="margin-top: 50px;">
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <h1 style="color: black; text-align: center; font-family: fantasy; padding-bottom: 30px; font-size: 80px;">FLOWFIT</h1>
        <label for="txtusu"><strong>Username</strong></label>
        <input type="text" id="txtusu" style="text-align: center;" class="form-control" v-model="usu" required />
      </div>
      <div>
        <label for="txtpas"><strong>Password</strong></label>
        <input type="password" id="txtpas" style="text-align: center;" class="form-control" v-model="pas" required />
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>

    <Login v-if="miLogin === 'true'" :usu="usu" />
  </div>
</template>

<script>
import Login from './Login.vue';

export default {
  components: {
    Login
  },
  data() {
    return {
      miLogin: false,
      usu: '',
      pas: ''
    };
  },
  methods: {
    iniciarSesion() {
      if (this.usu.length === 0 || this.pas.length === 0) {
        alert("Complete Los Datos Faltantes!!");
      } else {
        if (this.usu === "DaniSantoyoyo" && this.pas === "123") {
          this.miLogin = true;
          document.getElementById("form_login").style.display = "none";
        } else {
          this.miLogin = false;
          alert("Error De Usuario y/o Contraseña!!");
          this.usu = "";
          this.pas = "";
          document.getElementById("txtusu").focus();
        }
      }
    }
  }
};
</script>
