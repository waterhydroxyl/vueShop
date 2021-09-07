import Vue from 'vue'
import VueRouter from 'vue-router'

import { getToken } from '@/utils'
Vue.use(VueRouter)

const Home = () => import('view/home/Home.vue')
const ShopCart = () => import('view/shopcart/ShopCart.vue')
const Category = () => import('view/category/Category.vue')
const Profile = () => import('view/profile/Profile.vue')
const Detail = () => import('view/detail/Detail.vue')
const Login = () => import('view/login/Login.vue')
const Regiser = () => import('view/register/Register.vue')

const routes = [
  { path: '/', meta: { bottomNav: true }, redirect: '/home' },
  { path: '/home', meta: { bottomNav: true }, component: Home },
  { path: '/shopcart', name: 'shopcart', component: ShopCart },
  { path: '/category', component: Category },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Regiser },
  // { path: '/detail/iid', meta: { bottomNav: true }, name: 'detail', component: Detail },
  {
    path: '/detail/:iid',
    meta: { bottomNav: true },
    name: 'detail',
    component: Detail
  },
  { path: '*', component: () => import('view/404/index.vue') }
]
const router = new VueRouter({
  mode: 'history',
  base: '/mogujie/',
  routes
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.name === 'shopcart') {
    if (!token) {
      if (from.name !== 'login') {
        alert('请先完成登录')
      }
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
//在组件内的beforeRouteLeave中移除事件监听
