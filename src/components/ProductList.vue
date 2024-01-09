<template>
  <div class="product-list">
    <div class="product-card" v-for="product in products" :key="product.id">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }} MX</p>
        <button @click="addToCart(product)">Agregar al Carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    addToCart(product) {
      this.$emit('addToCart', product);
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-card {
  background-color: #566372;
  padding: 10px;
  margin: 10px;
  width: 200px; /* Ajusta este valor según tus necesidades */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 21px;
}

.product-image {
  width: 100%;
  height: 100px; /* Ajusta este valor según tus necesidades */
  object-fit: cover;
  margin-bottom: 10px;
}

.product-details {
  text-align: center;
}

.product-name {
  font-size: 16px;
  margin: 0;
}

.product-price {
  font-size: 14px;
  margin: 0;
  color: #555;
}

button {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 5px 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 12px;
}
</style>
