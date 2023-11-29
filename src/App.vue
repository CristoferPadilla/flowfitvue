<template>
  <div  class="app-container">
    <Navbar/>
    <Header></Header>
  </div>

</template>

<script>
import Navbar from './components/CustomNav.vue'
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Header
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
  margin-top: 60px;
  display: flex;
  flex-direction: row 
}
body{
  background-color: #0E0F13;  
}
.app-container{
  display: flex;
  flex-direction: row 
}
</style>
