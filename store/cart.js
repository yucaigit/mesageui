export default{
  namespaced: true,
  // 模块的 state 数据
  state:()=>({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 加入购物车
    addToCart(state,goods){
      
      let result = state.cart.find((x)=>x.goodsId==goods.goodsId);
      if(!result){
        state.cart.push(goods)
      }else{
        result.goodsCount++
      }
      // 掉用的是命名空间下的saveToStorage()
      this.commit('m_cart/saveToStorage')
    },
    // 保存cart
    saveToStorage(state) {
       uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goodsId === goods.goodsId)
    
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goodsTate = goods.goodsTate
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    //修改购物车数量
    updateGoodsCount(state,goods){
      const result = state.cart.find(x=>x.goodsId==goods.goodsId)
      if(result){
        result.goodsCount = goods.goodsCount
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据 Id 从购物车中删除对应的商品信息
    removeGoodsById(state, goodsId) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goodsId !== goodsId)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
	claenCart(state){
		state.cart=[]
		this.commit('m_cart/saveToStorage')
	}
    
  },
  getters: {
    total(state){
      var n = 0
      state.cart.forEach(g=>n=n+g.goodsCount)
      return n
    }
  },
}