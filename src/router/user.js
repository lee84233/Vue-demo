export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      requiresAuth: false
    },
    component: () => import('@/views/user/login')
  }
];
