import Vue from 'vue';
import Vuex from 'vuex';
// Auth 持久化
import AuthStatePersisted from './persisted/auth-persisted';

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: '',
    userName: ''
  },
  getters: { },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserName(state, userName) {
      state.userName = userName;
    }
  },
  // 模块
  modules: {},
  plugins: [
    AuthStatePersisted
  ]
});
