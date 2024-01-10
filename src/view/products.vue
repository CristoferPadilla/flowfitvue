
<template>
  <div id="app">
    <div class="app">
      <Navbar />
    </div>
    <div id="content">
      <Header />
        <ProductList></ProductList>
    </div>
  </div> 

 

</template>

<script>
import Navbar from "@/components/CustomNav.vue";
import Header from "@/components/header.vue";
import ProductList from "@/components/ProductList.vue";
import "@/css/style.css";

export default {
  name: "membersView",
  components: {
    Navbar,
    Header,
    ProductList,
  }
}
</script>
<style scoped>

</style>