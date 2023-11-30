<template>
    <div id="app">
        <div class="app">
          <Navbar/>
        </div>
        <div id="content">
            <Header></Header>
            <Cards></Cards>
        </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/CustomNav.vue'
  import Header from '@/components/header.vue'
  import Cards from '@/components/cards.vue'
  
  export default {
  name: 'MenuPrincipal',
  components: {
    Navbar,
    Header,
    Cards
  }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: row; /* Esto hará que tus elementos se alineen horizontalmente */
    height: 100vh;
    width: 100vw; /* Esto hará que tu app ocupe toda la altura de la pantalla */
  }
  
  body {
    background-color: #0E0F13;  
  }
  
  #content {
    display: flex;
    flex-direction: column;
  
    flex-grow: 1; 
    height: 100vh;
  }
  
  </style>
  