import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
