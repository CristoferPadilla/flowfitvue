
<template>
    <div id="app">
      <div class="app">
        <Navbar />
      </div>
      <div id="content">
        <Header/>
        <div>
        <providerCrud></providerCrud>
        </div>
      </div>
      </div>
  </template>
  
  <script>
  
  import Navbar from '@/components/CustomNav.vue'
    import Header from '@/components/header.vue'
    import providerCrud from '@/components/crudProvider.vue'
    import '@/css/style.css'
  
    
    export default {
    name: 'providerView',
    components: {
      Navbar,
      Header,
      providerCrud
    }
    }
  </script>