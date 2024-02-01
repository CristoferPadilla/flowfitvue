<template>
    <section class="layout">
      <div class="header">
        <h1 class="title">Historial</h1>
      </div>
      <div class="main">
        <div class="tab-container">
          <input type="radio" v-model="tab" name="tab" id="tab1" class="tab tab--1" value="tab--1" />
          <label class="tab_label" for="tab1">Miembros</label>
  
          <input type="radio" v-model="tab" name="tab" id="tab2" class="tab tab--2" value="tab--2" />
          <label class="tab_label" for="tab2" @click="fetchSalesHistory">Productos</label>
  
          <div class="indicator"></div>
        </div>
        
        <div v-if="tab === 'tab--2'">
            <table class="table-crud">
            <thead>
              <tr>
                <th style="font-size: 70%">ID</th>
                <th style="font-size: 70%">ID Producto</th>
                <th style="font-size: 70%">Cantidad</th>
                <th style="font-size: 70%">Precio de Venta</th>
                <th style="font-size: 70%">Fecha de Venta</th>
                <th style="font-size: 70%">ID Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in salesHistory" :key="sale.id">
                <td class="btn-border">{{ sale.id }}</td>
                <td class="btn-border">{{ sale.id_producto }}</td>
                <td class="btn-border">{{ sale.cantidad }}</td>
                <td class="btn-border">{{ sale.precio_venta }}</td>
                <td class="btn-border">{{ sale.fecha_venta }}</td>
                <td class="btn-border">{{ sale.id_usuario }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </template>

  <script>
  import axios from 'axios';
  
  export default {
    name: 'historyView',
    data() {
      return {
        token: localStorage.getItem('token') || '',
        tab: 'tab--1',
        indicatorPosition: '2px',
        salesHistory: [],
      };
    },
    methods: {
      fetchSalesHistory() {
        axios.get('https://api-5iey.onrender.com/sales_history', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
          .then(response => {
            this.salesHistory = response.data;
            this.tab = 'tab--2';
            this.indicatorPosition = 'calc(130px + 2px)';
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
  </script>

<style scoped>
.table-crud {
    padding-top: 5%;
    width: 100%;
    border-bottom: #ced4da 2px solid;
    border-collapse: collapse;
    font-size: 75%;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .table-crud th,
  .table-crud td {
    text-align: left;
    padding: 8px;
    color: beige;
    font-size: 75%;
    font-family: Arial, Helvetica, sans-serif;
  
  }
  
  .table-crud tr:nth-child(even) {
    background-color: transparent !important
  }
  
  .table-crud th {
    background-color: #4CAF50;
    color: white;
  
  }
.btn-border {
    border-bottom: 1px solid white;
}

.layout {
    width: 100vw;
    display: grid;
    grid:
        "header" auto
        "main" 1fr
        / 1fr;
    gap: 8px;
}

.cnt-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    background-color: #dadadb;
    border-radius: 9px;
}

.header {
    grid-area: header;
}

.main {
    grid-area: main;
}

.footer {
    grid-area: footer;
}

.tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    background-color: #dadadb;
}

.indicator {
    content: "";
    width: 130px;
    height: 28px;
    background: #4caf50;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 7px;
    color: white;
    transition: all 0.2s ease-out;

}

.tab {
    width: 130px;
    height: 28px;
    position: absolute;
    z-index: 99;
    outline: none;
    opacity: 0;
}

.tab_label {
    width: 130px;
    height: 28px;
    color: rgb(0, 0, 0);
    position: relative;
    z-index: 999;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    font-size: 0.75rem;
    opacity: 0.6;
    cursor: pointer;
    transition: color 0.2s ease-out;

}

.tab--1:checked ~ .indicator {
    left: 2px;
    color: white;

}

.tab--2:checked ~ .indicator {
    left: calc(130px + 2px);
    color: white;

}

.search-bar {
    width: 200px;
    height: 30px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    position: absolute;
}

.search-bar input {
    border: none;
    outline: none;
    background: none;
    width: auto;
    color: black;
    font-size: 12px;
    line-height: 40px;
    padding: 0 10px;
}

.search-icon {
    padding-left: 10px;
}
</style>