<template>
  <div class="container mt-5">
    <form @submit.prevent="iniciarSesion" class="bg-white p-4 rounded-lg" style="">
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

    <UserLogin v-if="isLoggedIn" :usuario="usuario" @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import { useStore } from 'vuex';


export default {
  name: 'LoginScreen',
  components: {
    UserLogin: {
      props: ['usuario'],
      template: `
        <div>
          <p>Welcome, {{ usuario }}!</p>
          <button @click="logout">Logout</button>
        </div>
      `,
      methods: {
        logout() {
          this.$emit('logout');
        }
      }
    }
  },
  setup() {
    const usuario = ref('');
    const contrasena = ref('');
    const router = useRouter();
    const { emit } = getCurrentInstance();
    const store = useStore(); 


    const iniciarSesion = async () => {
      if (usuario.value.length === 0 || contrasena.value.length === 0) {
        alert("Complete Los Datos Faltantes!!");
      } else {
        try {
          const response = await fetch('https://api-5iey.onrender.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: usuario.value,
              password: contrasena.value
            })
          });

          if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;
            localStorage.setItem('token', token);
            store.dispatch('mockLogin');
            store.commit('setToken', token);
            emit('login-success', usuario.value, token);

            router.push('/menu');
            console.log(data);
            console.log('Token a almacenar:', token);
            console.log('Nombre de usuario', usuario.value);

          } else {
            alert("Error De Usuario y/o Contraseña!!");
            usuario.value = "";
            contrasena.value = "";
            document.getElementById("txtusu").focus();
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while logging in. Please try again later.");
        }
      }
    };

    return {
      ...mapActions(),
      iniciarSesion,
      usuario,
      contrasena
    };
    
  }
};
</script>

<style scoped>
.bg-white{
  background-color: black; margin: 140px auto; padding: 20px; border-radius: 50px; width: 50%; text-align: center; display: grid; place-items: center
}

</style>

