
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
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: baseline;
}

.controls input {
  width: 100%;
}

.button {
  background-color: #ff0000;
  color: #fff;
  padding: 5px 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
}

.checkout-link {
  text-decoration: none;
  color: #007bff;
  font-size: 14px;
  margin-left: 10px;
}
.search-bar {
  width: 300px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
.search-bar input {
  border:none; 
  outline:none; 
  background:none; 
  width:auto; 
  color:black; 
  font-size :18px; 
  line-height :40px; 
  padding :0 10px ;
}
.search-icon{
  padding-left :10px ;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #ff7575;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* ... (resto de estilos) ... */
 </style>
