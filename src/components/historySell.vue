<template>
    <section class="layout">
        <div class="header">
            <h1 class="title">Historial</h1>
        </div>
        <div class="main">
            <div class="tab-container">
                <input type="radio" name="tab" id="tab1" class="tab tab--1" />
                <label class="tab_label" for="tab1" style="color: rgb(0, 0, 0);" >Miembros</label>

                <input type="radio" name="tab" id="tab2" class="tab tab--2" />
                <label class="tab_label" for="tab2" @click="fetchMembers">Productos</label>

                <div class="indicator"></div>
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
            users: []
        };
    },
    methods: {
        fetchMembers() {
            axios.get('https://api-5iey.onrender.com/sales_history', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.users = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>

<style scoped>
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
    width: 100vw;
    height: 100vh;
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
}

.tab--1:checked ~ .indicator {
    left: 2px;
}

.tab--2:checked ~ .indicator {
    left: calc(130px + 2px);
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