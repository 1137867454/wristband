import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import store from '../store/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import 'echarts-liquidfill'
import VeCharts from 've-charts'
import { getItem } from '../util/localStorage'
import anime from 'vue-animejs'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// import VeCharts from 've-charts'
// import 've-charts/lib/ve-charts.min.css'
// import { asyncRouterMap } from './asyncRouterMap'
// Vue.use(SockJS);
// Vue.use(Stomp);
Vue.use(anime)
Vue.use(VeCharts)
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
const whiteList = ['/student_login', '/teacher_login', '/admin_login', '/MJK_login'];
export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/nav',
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/statistics/statistics.vue')
      },
      {
        path: 'nav',
        name: 'nav',
        component: () => import('../views/Home/nav')
      },
      {
        path: 'self',
        name: 'self',
        meta: { title: '个人信息', icon: '' },
        component: () => import('../views/queryInfo/self')
      },
      {
        path: 'adminself',
        name: 'adminself',
        meta: { title: '个人信息', icon: '' },
        component: () => import('../views/queryInfo/adminself')
      },
      {
        path: 'workAndRest',
        name: 'workAndRest',
        mata: {title: '作息状态', icon: ''},
        component: () => import('../views/admin/workRest')
      }
    ]
  },
  {
    path: '/student_login',
    name: '/student_login',
    component: () => import('../views/login/student_login.vue')
  },
  {
    path: '/teacher_login',
    name: 'teacher_login',
    component: () => import('../views/login/teacher_login.vue')
  },
  {
    path: '/admin_login',
    name: 'admin_login',
    component: () => import('../views/login/admin_login.vue')
  },
  {
    path: '/MJK_login',
    name: 'MJK_login',
    component: () => import('../views/login/MJK_login.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap,
  linkActiveClass: 'is-active'
})
// router.addRoutes(asyncRouterMap)
router.beforeEach((to, from, next) => {

  if (getItem('token')) {
    NProgress.start();
    store.commit('setAuthorization', getItem('token'));
    // console.log(store)
    // console.log(to)
    console.log(store.getters.getUser.role)
    // store.dispatch('getCourseList')
    if (!store.getters.getUser.role) {
      store.dispatch('set_router').then(() => {
        next({ path: to.path })
      })
      // next();
    }else{
      // console.log('uuuu')
      // console.log(store.getters.getUser)
      next()
    }
    NProgress.done()
  } else if (whiteList.includes(to.path)) {
    next(); NProgress.done()
  } else {
    let search = window.location.search;
    let arr = [];
    if( search ) {
      search = search.slice(1).replace('&', '=');
      arr = search.split('=');
    }
    console.log(search);
    console.log(arr);
    // next({ path: '/admin_login' });
  }
  NProgress.done()
})
export default router
