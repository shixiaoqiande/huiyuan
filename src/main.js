import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/js/key'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
