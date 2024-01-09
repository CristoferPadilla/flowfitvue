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
  
  export default {
    name: 'ProductList',
    props: ['products'],
    components: {
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
  </style>
  