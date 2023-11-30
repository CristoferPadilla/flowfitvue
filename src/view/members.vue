
<template>
  <div id="app">
    <div class="app">
      <Navbar />
    </div>
    <div id="content">
      <Header/>
      <div>
        <Crud />
      </div>
    </div>
    </div>
</template>

<script>

import Navbar from '@/components/CustomNav.vue'
  import Header from '@/components/header.vue'
  import Crud from '@/components/crudMember.vue'
  import '@/css/style.css'

  
  export default {
  name: 'membersView',
  components: {
    Navbar,
    Header,
    Crud,
  }
  }
</script>