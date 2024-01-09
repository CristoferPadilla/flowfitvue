
<template>
    <div id="app">
      <div class="app">
        <Navbar />
      </div>
      <div id="content">
        <Header/>
        <productList>></productList>
      </div>
      </div>
  </template>
  
  <script>
  
  import Navbar from '@/components/CustomNav.vue'
    import Header from '@/components/header.vue'
    import productList from '@/components/ProductList.vue'
    import '@/css/style.css'
  
    
    export default {
    name: 'membersView',
    components: {
      Navbar,
      Header,
      productList
    }
    }
  </script>