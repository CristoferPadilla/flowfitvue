<template>
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - {{ item.price }} MX
          <button @click="removeFromCart(index)">Eliminar</button>
        </li>
      </ul>
      <button @click="clearCart">Limpiar Carrito</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['cartItems'],
    methods: {
      removeFromCart(index) {
        this.$emit('removeFromCart', index);
      },
      clearCart() {
        this.$emit('clearCart');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos específicos si es necesario */
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #ff0000;
    color: #fff;
    padding: 5px 8px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 10px;
  }
  </style>
  