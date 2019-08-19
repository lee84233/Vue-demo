export default [
  {
    path: '/',
    component: () => import('@/views/layout/Layout-index'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          requiresAuth: false
        },
        component: () => import('@/views/home/Home')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '首页',
          requiresAuth: false
        },
        component: () => import('@/views/home/About')
      }
    ]
  }
];
