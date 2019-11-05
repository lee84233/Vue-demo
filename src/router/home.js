export default [
  {
    path: '/home',
    component: () => import('@/views/layout/Layout-index'),
    children: [
      {
        path: '/',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'home',
        meta: {
          title: '首页',
          requiresAuth: true
        },
        component: () => import('@/views/home/index')
      }
    ]
  }
];
