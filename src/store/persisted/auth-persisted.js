/**
 * 用户和权限相关字段
 * 使用 Cookie 持久化数据
 */

import Cookies from 'js-cookie'; // cookie 操作
import createPersistedState from 'vuex-persistedstate'; // Vuex 持久化插件

const AuthStatePersisted = createPersistedState({
  // 键名
  key: 'projectAuth',
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, {expires: 1 / 6}),
    removeItem: key => Cookies.remove(key)
  },
  // 恢复存储
  getState: (key) => {
    return Cookies.getJSON(key);
  },
  // 设置存储
  setState: (key, value) => {
    Cookies.set(key, value);
  },
  // 要存储的state，默认全部
  reducer: key => ({
    token: key.token,
    userName: key.userName
  })
});

export default AuthStatePersisted;
