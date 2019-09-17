import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// cookie 操作
// import Cookies from 'js-cookie'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex);

// Storage 存储store
const orderFoodVuex = createPersistedState({
  key: 'projectNameData',
  // storage: window.localStorage,
  storage: window.sessionStorage,
  reducer: (key) => ({
    token: key.token,
    lang: key.lang,
    orderFoods: key.orderFoods
  })
});

// cookie 存储store
// const orderFoodVuex = createPersistedState({
//   key: 'projectNameData',
//   storage: {
//     getItem: key => Cookies.get(key),
//     setItem: (key, value) => Cookies.set(key, value),
//     removeItem: key => Cookies.remove(key)
//   },
//   // 恢复存储
//   getState: (key) => {
//     return Cookies.getJSON(key)
//   },
//   // 设置存储
//   setState: (key, value) => {
//     Cookies.set(key, value)
//   },
//   // 要存储的state，默认全部
//   reducer: key => ({
//     token: key.token,
//     lang: key.lang,
//     orderFoods: key.orderFoods
//   })
// })

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: '',
    // 语言
    lang: 'zh'
  },
  getters: {
  },
  mutations: {
    setLang(state, lang) {
      if (state.lang !== lang) {
        // this.$i18n.locale = lang
        state.lang = lang;
      }
    }
  },
  // 模块
  modules: {},
  plugins: [orderFoodVuex]
});
