import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import Goods from '@/components/pages/Goods'
import Abouts from '@/components/pages/Abouts'
import change from '@/components/pages/change'
import history from '@/components/pages/history'
import Cart from '@/components/pages/Cart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/Abouts',
      name: 'Abouts',
      component: Abouts
    },{
      path: '/change',
      name: 'change',
      component: change
    },{
      path: '/history',
      name: 'history',
      component: history
    },{
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
