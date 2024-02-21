<template>
  <div class="container-mt-5">
    <form @submit.prevent="iniciarSesion" class="bg-white p-4 rounded-lg" style="">
      <div class="text-center mb-4">
        <h1
          class="text-dark font-fantasy"
          style="
            color: black;
            text-align: center;
            font-family: fantasy;
            padding-bottom: 30px;
            font-size: 100px;
          "
        >
          FLOWFIT
        </h1>
      </div>
      <div class="mb-3">
        <label for="txtusu" class="form-label"><strong>Username</strong></label>
        <input type="text" id="txtusu" class="form-control" v-model="username" required />
      </div>
      <div class="mb-3">
        <label for="txtpas" class="form-label"><strong>Password</strong></label>
        <input
          type="password"
          id="txtpas"
          class="form-control"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn-btn-primary">Login</button>
    </form>

    <UserLogin
      v-if="isLoggedIn"
      :username="username"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script>
import "@/css/style.css";
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import { useStore } from "vuex";

export default {
  name: "LoginScreen",
  components: {
    UserLogin: {
      props: ["username"],
      template: `
        <div>
          <p>Welcome, {{ username }}!</p>
          <button @click="logout">Logout</button>
        </div>
      `,
      methods: {
        logout() {
          this.$emit("logout");
        },
      },
    },
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const { emit } = getCurrentInstance();
    const store = useStore();

    // const handleLoginSuccess = (username, token) => {
    //   emit("login-success", username, token);
    // };
    const iniciarSesion = async () => {
      if (username.value.length === 0 || password.value.length === 0) {
        alert("Complete Los Datos Faltantes!!");
      } else {
        try {
          const response = await fetch("https://api-zydf.onrender.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;
            localStorage.setItem("token", token);
            localStorage.setItem("user", username.value);
            store.dispatch("mockLogin");
            store.commit("setToken", token);
            emit("login-success", username.value, token);

            router.push("/menu");
            console.log(data);
            console.log("Token a almacenar:", token);
            console.log("Nombre de username", username.value);
          } else {
            alert("Error De username y/o Contraseña!!");
            username.value = "";
            password.value = "";
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
      username,
      password,
    };
  },
};
</script>

<style scoped>
.bg-white {
  background-color: black;
  margin: 140px auto;
  border-radius: 50px;
  width: 70%;
  min-height: 30%;
  min-width: 30%;
  height: 80%;
  text-align: center;
  display: grid;
  place-items: center;
}
.container-mt-5 {
  width: 100vw;
  display:table-column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}
.btn-btn-primary{
  background-color: #000000;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}
</style>
