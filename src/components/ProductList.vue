<template>
    <div>
      <product-item
        v-for="product in products"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        @click="toggleSelected(product)"
      ></product-item>
    </div>
  </template>
  
  <script>
  import ProductItem from './ProductItem.vue';  // Asegúrate de importar el componente ProductItem
  
  export default {
    props: ['products'],
    components: {
      ProductItem,
    },
    data() {
      return {
        selectedProducts: [],
      };
    },
    methods: {
      toggleSelected(product) {
        const index = this.selectedProducts.findIndex((p) => p.id === product.id);
        if (index === -1) {
          this.selectedProducts.push(product);
        } else {
          this.selectedProducts.splice(index, 1);
        }
      },
    },
    watch: {
      selectedProducts() {
        this.$emit('buy');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente ProductList.vue */
  </style>
  