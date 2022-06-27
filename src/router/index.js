import {createRouter, createWebHistory} from "vue-router";

const home = () => import('@/views/home/Home')
const category = () => import('@/views/category/Category')
const cart = () => import('@/views/cart/Cart')
const profile = () => import('@/views/profile/Profile')
const detail = () => import('@/views/detail/Detail')

const routes =[
  {
    path: '',
    redirect: '/home',
    meta:{
      keepAlive: true
    }
  },
  {
    path: '/home',
    component: home,
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component:cart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:iid',
    component: detail,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
