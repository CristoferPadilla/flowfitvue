<template>
  <div class="container" style="background-color: #000000; padding-bottom: 10%;">
    <div class="card">
      <div class="card-label" style="color: black;">
        <p>Estudiante</p>
      </div>
      <div class="card-number" style="color: black;">
        <p>$100</p>
      </div>
    </div>

    <div class="card">
      <div class="card-label" style="color: black;">
        <p>Normal</p>
      </div>
      <div class="card-number" style="color: black;">
        <p>$200</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Estudiante', price: '$100' },
        { title: 'Normal', price: '$200' },
      ],
    };
  },
};
</script>

<style>
.container {
  max-height: 60vh;
  width: 60vw;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  color: #ffffff;
  width: 150px;
  height: 90px;
  border-radius: 5px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  padding: 13px;
  margin: 10px;
}

.card-content {
  text-align: center;
  align-items: center;
}

.card-number {
  font-size: 14px;
  font-weight: bold;
}

.card-label{
  font-size: 1;
}
</style>
