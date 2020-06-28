import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: 'hello, vuex-class',
  },
  mutations: {
    idetMsg(state, value) {
      state.message = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
