<template>
    <div class="header-container">
        <img src="../assets/arrow-bar-left.svg" alt=""  class="header-menu-icon">
        <div class="header-datetime">Miercoles 29 de noviembre</div>
    </div>
</template>
<script>
export default {
  name: 'headerApp',
};
</script>

<style>
.header-container{
    display: flex;
    align-items: flex-start;
    justify-content: start;
    padding-left: 5%;
    flex: 1;
}
.header-datetime{
    font-size: 25px;
    font-weight:bold;   
    padding-top: 8px;
    justify-content:flex-start; ;
    color: white;
    white-space: nowrap;
    margin-left: 10px; /* Ajusta este valor según tus necesidades */
}
.header-menu-icon{
    padding-top: 10px;
    padding-left: 10px;
    filter: brightness(0) invert(1); /* Cambia el color a blanco */
    height: 25px;
}
</style>