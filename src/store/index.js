import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null,
    name: null,
    email: null
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (!state.user) {
        state.drawer = false;
        return;
      }

      if (isVisible === undefined) {
        state.drawer = !state.drawer;
      } else {
        state.drawer = isVisible;
      }
    },
    setUser(state, token) {
      state.user = token;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        state.drawer = true;
      } else {
        delete axios.defaults.headers.common["Authorization"];
        state.drawer = false;
      }
    },
    setName(state, name) {
      state.name = name;
    },
    setEmail(state, email) {
      state.email = email;
    }
  },
  actions: {},
  modules: {}
});
