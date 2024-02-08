<template>
  <div id="app">
    <div class="app">
      <Navbar />
    </div>
    <div id="content">
      <Header></Header>
      <Cards></Cards>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/CustomNav.vue";
import Header from "@/components/header.vue";
import Cards from "@/components/cards.vue";
import "@/css/style.css";

export default {
  name: "MenuPrincipal",
  components: {
    Navbar,
    Header,
    Cards,
  },
};
</script>
