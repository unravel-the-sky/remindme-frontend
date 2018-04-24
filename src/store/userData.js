import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: 'unknown user'
  },
  mutations: {
    updateUser(state, username) {
      state.userName = username;
    }
  }
});

export default store;
