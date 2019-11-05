/**
 * 持久化示例
 * 使用 sessionStorage 或 localStorage 持久化数据
 * Github：https://github.com/robinvdvleuten/vuex-persistedstate
 */

import createPersistedState from 'vuex-persistedstate'; // Vuex 持久化插件

const demoStatePersisted = createPersistedState({
  // 键名
  key: 'projectNameData',
  // storage 可选值：window.sessionStorage | window.localStorage
  storage: window.localStorage,
  reducer: (key) => ({
    token: key.token,
    lang: key.lang,
    orderFoods: key.orderFoods
  })
});

export default demoStatePersisted;
