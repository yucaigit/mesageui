import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'

import modeUser from '@/store/userinfo.js'

import modeOrder from '@/store/orders.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    m_cart:moduleCart,
    m_user:modeUser,
    m_order:modeOrder
  },
})
export default store