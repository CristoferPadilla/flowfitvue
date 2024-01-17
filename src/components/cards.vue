<template>
<div class="container">
  <div class="container-column">
    <h1 class="title">Hoy en el gimnasio</h1>
      <div class="row">
          <div class="card" style="background-color: #641b1b;">
              <div class="icon-container">
                <svg  xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                </svg>        
                            </div>
              <div class="card-content">
                <p class="card-number">{{ porVencer }}</p>
                <p class="card-label">Por vencer</p>
              </div>
          </div>
          <div class="card" style="background-color: #1b6464;">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg> 
              </div>
              <div class="card-content">
                <p class="card-number">{{ miembros }}</p>
                <p class="card-label">Miembros</p>
              </div>
          </div>
          <div class="card" style="background-color: #64641b;">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-person-up" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                </svg>
              </div>
              <div class="card-content">
                <p class="card-number">{{ miembrosNuevos }}</p>
                <p class="card-label">Miembros nuevos</p>
              </div>
          </div>
      </div>
  </div>
</div>  
</template>

<script>
import '@/css/style.css'

export default {
name: 'CardApp',
data() {
  return {
    porVencer: 0,
    miembros: 0,
    miembrosNuevos: 0
  };
},
mounted() {
  this.fetchMembers();
},
methods: {
  async fetchMembers() {
    try {
      const response = await fetch('https://api-5iey.onrender.com/members');
      const data = await response.json();
      this.miembros = data.length;
      this.porVencer = data.filter(member => member.vencimiento === true).length;
    } catch (error) {
      console.error(error);
    }
  }
}
};
</script>
