<template>
  <div>
    <h2>Carrito de Compras</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.name }} - {{ item.price }} MX
        <button @click="removeFromCart(index)">Eliminar</button>
      </li>
    </ul>
    <p>Total: {{ total }} MX</p>
    <button @click="pagar">Pagar en Efectivo</button>
  </div>
</template>

<script>
export default {
  props: ['cartItems', 'total'],
  methods: {
    removeFromCart(index) {
      this.$emit('removeFromCart', index);
    },
    pagar() {
      this.$emit('pagar');
    },
  },
};
</script>
