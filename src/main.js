// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import routerConfig from './router/index.js'
import storeConfig from './vuex/index.js'
import api from './api/index.js'
import './assets/js/rem.js'
import * as filters from './filter.js'
import './assets/css/base.css'
import {ToastPlugin} from 'vux'
import { ToastTestPlugin } from './plugin.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ToastPlugin)
Vue.use(ToastTestPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter(routerConfig)
const store = new Vuex.Store(storeConfig)

FastClick.attach(document.body)

axios.defaults.baseURL = 'http://mk.yonyou.com:8080/'
Vue.prototype.axios = axios
Vue.prototype.api = api

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   store.dispatch('changeLoadingStatus', true)
//   next()
// })

router.afterEach((to, from) => {
  store.dispatch('changeTitle', to.meta.title)

  if (to.path === '/login') {
    store.dispatch('changeBackStatus', false)
  } else {
    store.dispatch('changeBackStatus', true)
  }

  if (to.path === '/customer') {
    store.dispatch('changeFilterStatus', true)
    store.dispatch('changeNavStatus', false)
  } else {
    store.dispatch('changeFilterStatus', false)
  }

  // setTimeout(() => {
  //   store.dispatch('changeLoadingStatus', false)
  // }, 1000)
})

// http request 拦截器
axios.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.token = `${sessionStorage.token}`
  }
  store.dispatch('changeLoadingStatus', true)
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  store.dispatch('changeLoadingStatus', false)
  // token 过期
  if (response.data.flag === 100002) {
    if (sessionStorage.token) {
      sessionStorage.removeItem('token')
    }
    router.push('/login')
    return
  }
  return response
}, err => {
  console.log(err)
  if (err.response) {
    switch (err.response.status) {
      case 401:
        if (sessionStorage.token) {
          sessionStorage.removeItem('token')
        }
        router.push('/login')
    }
  }
  return Promise.reject(err.response.data)
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
