import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mockServer'
import Split from './components/Split/Split.vue'
import './filters'
Vue.component('Split',Split)//名和组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 注册上路由器(路由相关语法才能使用)
  store, //  所有组件对象都多了一个属性: $store
})
