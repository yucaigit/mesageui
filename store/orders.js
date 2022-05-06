export default{
  namespaced: true,
  state:()=>({
    orders: JSON.parse(uni.getStorageSync('orders') || '[]')
  }),
  mutations:{
    onloadOrders(state,orders){
      state.orders = orders
      this.commit('m_order/saveOrders')
    },
    saveOrders(state){
      uni.getStorageSync('orders',state.orders)
    },
    removeO(state,order){
      state.orders = state.orders.filter(x=>x.orderId !== order.orderId)
      this.commit('m_order/saveOrders')
      },
     confirmPay(state,order){
       let result =  state.orders.find((x)=>x.orderId == order.orderId)
       if(result){
         result.orderState = 0
         this.commit('m_order/saveOrders')
       }
     }
  }
  }