<template>
  <div>
    <h2>Lista de Productos</h2>
    <product-list :products="products" @buy="comprar" ref="productList"></product-list>
    <button @click="comprar">Comprar</button>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  name: 'ProductsView',  // Cambiado a un nombre multi-palabra
  components: {
    ProductList,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Producto 1",
          price: 100,
          image: "https://example.com/product-1.jpg",
        },
        {
          id: 2,
          name: "Producto 2",
          price: 200,
          image: "https://example.com/product-2.jpg",
        },
        {
          id: 3,
          name: "Producto 3",
          price: 300,
          image: "https://example.com/product-3.jpg",
        },
      ],
    };
  },
  methods: {
    comprar() {
      // Implementa la lógica para comprar los productos aquí.
      // Puedes acceder a los productos seleccionados a través del componente ProductList.
      console.log("Compra realizada. Productos seleccionados:", this.$refs.productList.selectedProducts);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos del componente products.vue */
</style>
iiioo