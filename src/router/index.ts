import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 引入图标
import {
  Menu as IconMenu,
  Setting,
  DataLine,
  CreditCard,
DataAnalysis,
} from "@element-plus/icons-vue";
// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/login/LoginView.vue"),
  },
  //重定向
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/login/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/HomeView.vue"),
    children: [
      {
        path: "/echarts",
        name: "echarts",
        component: () => import("@/views/home/childrens/EchartsView.vue"),
        meta: {
          title: "数据展示页面",
          icon: DataLine,
        },
      },
      {
        path: "/pay",
        name: "pay",
        component: () => import("@/views/home/childrens/PayList.vue"),
        meta: {
          title: "支付展示页面",
          icon: CreditCard,
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/home/childrens/UserInfo.vue"),
        meta: {
          title: "用户信息",
          icon:DataAnalysis ,
        },
        children: [
          {
            path: "/userlist",
            name: "userlist",
            component: () => import("@/views/home/childrens/UserList.vue"),
            meta: {
              title: "住户信息展示页面",
              classifyTitle: "用户信息",
            },
          },
          {
            path: "/userupdate",
            name: "userupdate",
            component: () => import("@/views/home/childrens/UserUpdate.vue"),
            meta: {
              title: "住户信息修改页面",
              classifyTitle: "用户信息",
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
