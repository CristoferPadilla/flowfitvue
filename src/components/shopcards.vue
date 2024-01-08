<template>
   <div class="cards-title-container">
    <h2 class="title">Tienda</h2>
    <div class="cards-shop-container">
        <router-link to="/punto-de-venta" class="card-shop" style="width: 18rem; background-color: rgb(9, 60, 9);">
          <div class="card-body-shop">
            <h5 class="card-title-shop">Punto de venta</h5>
        </div>

        </router-link>
        <router-link to="/historial-de-ventas" class="card-shop" style="width: 18rem; background-color: rgb(9, 30, 60);">
            <div class="card-body-shop">
              <h5 class="card-title-shop">Historial de ventas</h5>
            </div>
        </router-link>
      </div> 
   </div> 


</template>

<script>
export default{
    name: "ShoppingCard",
    components: [

    ]

}

</script>
<style scoped>
.card-shop{
    color: #ffffff;
    width: 250px; /* Ajusta este valor según tus necesidades */
    height: 140px; /* Ajusta este valor según tus necesidades */
    border-radius: 5px; /* Ajusta este valor según tus necesidades */
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    padding: 13px;
    margin: 10px;
    text-decoration: none;
}
.card-body-shop{
    text-align: center;
}
.card-title-shop{
    font-size: 20px;
    font-weight: bold;
}
.cards-shop-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;    
}
.cards-title-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

</style>