// index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    loggedIn: false,
    token: null,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    mockLogin({ commit }) {
      setTimeout(() => {
        commit('setLoggedIn', true);
      }, 1000);
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setToken', null);
    },
  },
});
