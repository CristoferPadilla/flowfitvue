
<template>
    <div id="app">
      <div class="app">
        <Navbar />
      </div>
      <div id="content">
        <Header/>
        <div>
<CrudInventory></CrudInventory>
        </div>
      </div>
      </div>
  </template>
  
  <script>
  
  import Navbar from '@/components/CustomNav.vue'
    import Header from '@/components/header.vue'
    import CrudInventory from '@/components/crudInventory.vue'
    import '@/css/style.css'
  
    
    export default {
    name: 'membersView',
    components: {
      Navbar,
      Header,
      CrudInventory
    }
    }
  </script>