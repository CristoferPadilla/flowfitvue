import Navbar from '@/components/CustomNav.vue';
<template>
    <div id="app">
        <div class="app">
          <Navbar/>
        </div>
        <div id="content">
            <Header></Header>
            <div class="Container-Cards"><MemCards></MemCards></div>

        </div>
    </div>

</template>

<script>
import Navbar from '@/components/CustomNav.vue'
import Header from '@/components/header.vue'
import MemCards from '@/components/membershipCard.vue'
import '@/css/style.css'


export default {
name: 'membersshipScreen',
components: {
  Navbar,
  Header,
  MemCards
}
}
</script>
<style>
.Container-Cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 70%;

}


</style>
