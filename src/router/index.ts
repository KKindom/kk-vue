import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/LoginView.vue')


  },
  //重定向
  {
    path: '/',
    redirect: '/login'
  }

  ,
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: "home",
    component: () => import('@/views/home/HomeView.vue'),
    children: [
      {
        path: '/echarts',
        name: "echarts",
        component: () => import('@/views/home/childrens/EchartsView.vue')
      },
      {
        path: '/pay',
        name: "pay",
        component: () => import('@/views/home/childrens/PayList.vue')
      },
      {
        path: '/user',
        name: "user",
        component: () => import('@/views/home/childrens/UserInfo.vue'),
        children: [
          {
            path: '/userlist',
            name: "userlist",
            component: () => import('@/views/home/childrens/UserList.vue')
          },
          {
            path: '/userupdate',
            name: "userupdate",
            component: () => import('@/views/home/childrens/UserUpdate.vue')
          },
        ]
      },
    ]
  },




]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
