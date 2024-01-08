
<template>
    <div id="app">
      <div class="app">
        <Navbar />
      </div>
      <div id="content">
        <Header/>
        <ShoppingCard></ShoppingCard>

      </div>
      </div>
  </template>
  
  <script>
  
  import Navbar from '@/components/CustomNav.vue'
    import Header from '@/components/header.vue'
    import ShoppingCard from '@/components/shopcards.vue'
    import '@/css/style.css'
  
    
    export default {
    name: 'membersView',
    components: {
      Navbar,
      Header,
      ShoppingCard,
    }
    }
  </script>