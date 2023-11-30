import Navbar from '@/components/CustomNav.vue';
<template>
    <div id="app">
        <div class="app">
          <Navbar/>
        </div>
        <div id="content">
            <Header></Header>
        </div>
    </div>

</template>

<script>
import Navbar from '@/components/CustomNav.vue'
import Header from '@/components/header.vue'
import '@/css/style.css'


export default {
name: 'MenuPrincipal',
components: {
  Navbar,
  Header,
}
}
</script>