import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Bus from './assets/js/bus'

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

Vue.use(Router)
Vue.prototype.$Bus = Bus;

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'huiyuan',
          component: () => import('./views/Huiyuan.vue')
        },
        {
          path: '/guanli',
          name: 'guanli',
          component: () => import('./views/Guanli.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: '/admin/member',
          name: 'member',
          component: () => import('./views/Member.vue')
        },
        // 管理商品
        {
          path: '/admin/mastergoods',
          name: 'mastergoods',
          component: () => import('./views/MasterGoods.vue')
        }
      ]
    },
    {
      path: '/mb',
      name: 'mb',
      component: () => import('./views/Mb.vue'),
      children: [
        // 用户信息
        {
          path: '/mb/shou',
          name: 'shou',
          component: () => import('./views/Shou.vue')
        },
        // 商品兑换
        {
          path: '/mb/hgoods',
          name: 'hgoods',
          component: () => import('./views/Hgoods.vue')
        }
      ]
    },
    // 用户信息
    // {
    //   path: '/shou',
    //   name: 'shou',
    //   component: () => import('./views/Shou.vue')
    // },
    // // 商品兑换
    // {
    //   path: '/hgoods',
    //   name: 'hgoods',
    //   component: () => import('./views/Hgoods.vue')
    // }
    // // 管理用户
    // {
    //   path: '/member',
    //   name: 'member',
    //   component: () => import('./views/Member.vue')
    // },
    // // 管理商品
    // {
    //   path: '/mastergoods',
    //   name: 'mastergoods',
    //   component: () => import('./views/MasterGoods.vue')
    // },
  ]
})
