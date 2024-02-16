<template>
    <section class="layout">
      <div class="ImageContainer">
        <div class="container">
          <h1 class="title" style="color:black">Imagen</h1>
          <div class="header">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
            <p>Busca la imagen para subir</p>
          </div>
          <label for="file" class="footer">
            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
              </g>
            </svg>
            <p>Sin imagen seleccionada</p>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" stroke-width="2"></path>
                <path d="M19.5 5H4.5" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" stroke-width="2"></path>
              </g>
            </svg>
          </label>
          <input id="file" type="file" @change="handleFileChange">
        </div>
      </div>
      <div class="body">
        <div class="personal-info">
          <h1 class="title">{{ selectedMember ? "Editar miembro" : "Agregar nuevo miembro" }}</h1>
          <div class="form__group field">
            <input v-model="newMember.name" type="input" class="form__field" placeholder="Nombre" required="">
            <label for="name" class="form__label">Nombre</label>
          </div>
          <div class="form__group field">
            <input v-model="newMember.email" type="input" class="form__field" placeholder="Email" required="">
            <label for="Email" class="form__label">Email</label>
          </div>
          <div class="form__group field">
            <input v-model="newMember.phone" type="input" class="form__field" placeholder="Celular" required="">
            <label for="Cellphone" class="form__label">Celular</label>
          </div>
          <div class="form-group">
            <label for="assigned_membership">Membresías:</label>
            <select v-model="newMember.assigned_membership" class="form-control" required>
              <option
                v-for="membership in memberships"
                :key="membership.id"
                :value="membership.id"
              >
                {{ membership.title }}
              </option>
            </select>
          </div>
          <div class="body-center">
            <div class="radio-input">
              <input value="1" name="membership_duration" id="1" type="radio" v-model="newMember.membership_duration">
              <label for="1">1 mes</label>
              <input value="3" name="membership_duration" id="3" type="radio" v-model="newMember.membership_duration">
              <label for="3">3 meses</label>
              <input value="6" name="membership_duration" id="6" type="radio" v-model="newMember.membership_duration">
              <label for="6">6 meses</label>
              <input value="12" name="membership_duration" id="12" type="radio" v-model="newMember.membership_duration">
              <label for="12">1 año</label>
            </div>
            <br>
          </div>
          <button type="button" class="btn btn-primary" @click="saveUser">{{ selectedMember ? "Guardar" : "Agregar" }}</button>
          <button type="button" class="btn btn-secondary" @click="hideForm">Cancelar</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: 'newMemberBody',
    data() {
      return {
        newMember: {
          id: "",
          name: "",
          email: "",
          phone: "",
          assigned_membership: "",
          registration_date: "",
          end_date: "",
          is_active: "",
          profile_picture: "",
          membership_duration: "",
        },
        selectedMember: null,
        memberships: [],
        token: localStorage.getItem("token") || "",
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        this.newMember.profile_picture = file;
      },
      saveUser() {
      const currentDate = new Date();

      const memberData = {
        name: this.newMember.name || null,
        email: this.newMember.email || null,
        phone: this.newMember.phone || null,
        assigned_membership: this.newMember.assigned_membership || null,
        membership_duration: this.newMember.membership_duration || null,
      };

      if (this.newMember.profile_picture) {
        memberData.profile_picture = this.newMember.profile_picture;
      }

      if (this.selectedMember) {
        axios
          .put(
            `https://api-yrrd.onrender.com/members/${this.selectedMember.id}`,
            memberData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            console.log("Usuario actualizado en el servidor:", response.data);
            this.fetchMembers();
          })
          .catch((error) => {
            console.error(
              "Error al actualizar usuario en el servidor:",
              error.response.data
            );
          });
      } else {
        memberData.registration_date = currentDate.toISOString().split("T")[0];
        memberData.assigned_membership = parseInt(this.newMember.assigned_membership);

        axios
          .post("https://api-yrrd.onrender.com/members", memberData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log("Usuario agregado en el servidor:", response.data);
            this.fetchMembers();
          })
          .catch((error) => {
            console.error(
              "Error al agregar usuario en el servidor:",
              error.response.data
            );
          });
      }

      this.showForm = false;
      this.resetForm();
    },
      showAddForm() {
        this.showForm = true;
      },
      hideForm() {
        this.showForm = false;
        this.resetForm();
      },
      editUser(user) {
        this.selectedMember = user;
        this.newMember = { ...user };
        this.showAddForm();
      },
      resetForm() {
        this.newMember = {
          id: "",
          name: "",
          email: "",
          phone: "",
          assigned_membership: "",
          registration_date: "",
          end_date: "",
          is_active: "",
          profile_picture: "",
          membership_duration: "",
        };
        this.selectedMember = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .body-center{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .radio-input {
    display: flex;
    flex-direction: row;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;
  }
  
  .radio-input input[type="radio"] {
    display: none;
  }
  
.form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  .radio-input label {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #212121;
    border-radius: 5px;
    margin-right: 12px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease-in-out;
  }
  
  .radio-input label:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #ccc;
    transition: all 0.3s ease-in-out;
  }
  
  .radio-input input[type="radio"]:checked + label:before {
    background-color: green;
    top: 0;
  }
  
  .radio-input input[type="radio"]:checked + label {
    background-color: royalblue;
    color: #fff;
    border-color: rgb(129, 235, 129);
    animation: radio-translate 0.5s ease-in-out;
  }
  
  @keyframes radio-translate {
    0% {
      transform: translateX(0);
    }
  
    50% {
      transform: translateY(-10px);
    }
  
    100% {
      transform: translateX(0);
    }
  }
  
  .layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 8px;
  }
  .form__group {
    position: relative;
    padding: 20px 0 0;
    width: 100%;
    max-width: 180px;
  }
  
  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }
  
  .form__field::placeholder {
    color: transparent;
  }
  
  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
    top: 20px;
  }
  
  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  }
  
  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #116399, #38caef);
    border-image-slice: 1;
  }
  
  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #38caef;
    font-weight: 700;
  }
  
  /* reset input */
  .form__field:required, .form__field:invalid {
    box-shadow: none;
  }

  .ImageContainer {
    padding: 10%;
    grid-column: 1;
    text-align: center;
    height: 100%;
    background-color: white !important;
  }
  
  .body {
    grid-column: 2;
  }
  .container {
    height: 300px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 5px;
    color:black;
    background-color: rgba(0, 110, 255, 0.041);
  }
  
  .header {
    flex: 1;
    width: 100%;
    border: 2px dashed royalblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  .header svg {
    height: 100px;
    color: black;
  }
  
  .header p {
    text-align: center;
    color: black;
  }
  
  .footer {
    background-color: rgba(0, 110, 255, 0.075);
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: blac;
    border: none;
  }
  
  .footer svg {
    height: 130%;
    fill: royalblue;
    background-color: white;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
  }
  
  .footer p {
    flex: 1;
    text-align: center;
  }
  
  #file {
    display: none;
  }
  </style>
  