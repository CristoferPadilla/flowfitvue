<template>
  <section class="layout">
    <div class="header">
      <h1 class="title">Historial</h1>
    </div>
    <div class="main">
      <div class="tab-container">
        <input
          type="radio"
          v-model="tab"
          name="tab"
          id="tab1"
          class="tab tab--1"
          value="tab--1"
          @click="resetIndicatorPosition"
        />
        <label class="tab_label" for="tab1">Miembros</label>

        <input
          type="radio"
          v-model="tab"
          name="tab"
          id="tab2"
          class="tab tab--2"
          value="tab--2"
          @click="fetchSalesHistory"
        />
        <label class="tab_label" for="tab2">Productos</label>

        <div class="indicator" :style="{ left: indicatorPosition }"></div>
      </div>

      <div v-if="tab === 'tab--1'">
        <table class="table-crud">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>ID Membresía</th>
              <th>Fecha de Compra</th>
              <th>Usuario</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="membershipSale in membershipSales" :key="membershipSale.id">
              <td>{{ membershipSale.id }}</td>
              <td>{{ membershipSale.membership_id }}</td>
              <td>{{ membershipSale.sale_date }}</td>
              <td>{{ membershipSale.member_id }}</td>
              <td>${{ membershipSale.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="tab === 'tab--2'">
        <table class="table-crud">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Precio de Venta</th>
              <th>Fecha de Venta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in salesHistory" :key="sale.id">
              <td>{{ sale.id }}</td>
              <td>{{ sale.product_id }}</td>
              <td>{{ sale.quantity }}</td>
              <td>${{ sale.sale_price }}</td>
              <td>{{ sale.sale_date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "historyView",
  data() {
    return {
      token: localStorage.getItem("token") || "",
      tab: "tab--1",
      indicatorPosition: "2px",
      salesHistory: [],
      membershipSales: [],
    };
  },
  methods: {
    fetchSalesHistory() {
      axios
        .get("https://api-zydf.onrender.com/sales_history", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.salesHistory = response.data;
          this.tab = "tab--2";
          this.indicatorPosition = "calc(130px + 2px)";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchMembershipHistory() {
      axios
        .get("https://api-zydf.onrender.com/MembershipSale", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.membershipSales = response.data;
          this.tab = "tab--1";
          this.indicatorPosition = "2px"; // Restablecer la posición del indicador
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resetIndicatorPosition() {
      // Restablecer la posición del indicador al cambiar a la pestaña "Miembros"
      this.indicatorPosition = "2px";
    },
  },
};
</script>

<style scoped>
.table-crud {
  width: 100%;
  border-collapse: collapse;
  font-size: 75%;
  background-color: aliceblue;
  font-family: Arial, Helvetica, sans-serif;
}

.table-crud th,
.table-crud td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Añadir borde inferior */
}

.table-crud tr:last-child td {
  border-bottom: none; /* Eliminar borde inferior en la última fila */
}

.table-crud th {
  background-color: #4caf50;
  color: white;
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
</style>
