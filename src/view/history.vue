
<template>
    <div id="column-div">
        <Header></Header>
        <div class="tab-container">
          <historySell></historySell>
        </div>
    </div>

  </template>
  
  <script>

    import historySell from '@/components/historySell.vue'
    import  Header from '@/components/header.vue'

    export default {
    name: 'historyView',
    components: {
        historySell,
        Header

    }
    }
  </script>
  <style scoped>
  #column-div{
    width: 100vw;
    height: 100vh;
  }
  </style>