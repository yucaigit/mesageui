import Vue from 'vue'
import App from './App'
import request from 'util/request.js'
import store from 'store/store.js'
Vue.prototype.$request = request
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
