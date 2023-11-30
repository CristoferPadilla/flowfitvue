<template>
  <div class="header-container">
    <img src="../assets/arrow-bar-left.svg" alt="" class="header-menu-icon">
    <div class="header-datetime">{{ capitalizedDate }}</div>
  </div>
</template>

<script>
import '@/css/style.css';

export default {
  name: 'headerApp',
  data() {
    return {
      currentDate: '',
    };
  },
  mounted() {
    this.updateCurrentDate(); // Llama a la función para actualizar la fecha cuando se monta el componente
    setInterval(() => {
      this.updateCurrentDate(); // Actualiza la fecha cada segundo (se puede ajustar el intervalo)
    }, 1000);
  },
  computed: {
    capitalizedDate() {
      return this.currentDate.charAt(0).toUpperCase() + this.currentDate.slice(1);
    },
  },
  methods: {
    updateCurrentDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const today = new Date();
      this.currentDate = today.toLocaleDateString('es-ES', options); // Formatea la fecha según la localización
    },
  },
};
</script>


