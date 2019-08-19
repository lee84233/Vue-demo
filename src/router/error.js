export default [
  {
    path: '/404',
    meta: {
      title: '页面不存在',
      requiresAuth: false
    },
    component: () => import('@/views/error/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
];
