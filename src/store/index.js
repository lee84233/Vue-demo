import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// cookie 操作
// import Cookies from 'js-cookie'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex);

// Storage 存储store
const orderFoodVuex = createPersistedState({
  key: 'myMenuStore',
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
//   key: 'myMenuStore',
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
    orderFoods: [],
    result: {
      status: false,
      msg: ''
    },
    // 语言
    lang: 'zh'
  },
  getters: {
    FoodNum: (state) => {
      return state.orderFoods.length;
    }
  },
  mutations: {
    addFood(state, newOrder) {
      let index = state.orderFoods.findIndex((item) => {
        return item.id === newOrder.id;
      });
      // 存在，已点
      if (index !== -1) {
        state.result = {
          status: false,
          msg: '已点过该菜品'
        };
      } else {
        state.orderFoods.push(newOrder);
        state.result = {
          status: true,
          msg: '成功'
        };
      }
    },
    delFood(state, index) {
      state.orderFoods.splice(index, 1);
    },
    setToken(state, token) {
      state.token = token;
    },
    setLang(state, lang) {
      if (state.lang !== lang) {
        // this.$i18n.locale = lang
        state.lang = lang;
      }
    }
  },
  plugins: [orderFoodVuex]
});
