<template>
 <view>
<view v-if="user !=null">
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
     <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 循环渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeItemClickHandler(goods)">
      <my-goods :goods="goods" :show-radio="true" :show-num="true"
       @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
  </view>
  <view v-else>没货啊</view>
</view>
    
    <view class="allprice">
		总计
		<text style="color: #DD524D;">            {{allPrice}}</text>
    </view>
	<button type="warn" style="width: 400rpx;" @click="cartPay">结算</button>
  </view>
</template>

<script>
	
  import badgeMix from '../../store/cartNumber.js'
  import { mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapState('m_user',['user']),
	   ...mapGetters('total')
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }],
		totalPrice:0,
		carts:[],
		allPrice:0,
		cnt:0
      };
    },
	created() {
		// console.log(this.total)
		// console.log(this.cart)
		this.carts = this.cart
		// console.log(this.carts)
		console.log(this.carts)
	},
	// computed:{
	// 	tempPrice(){
	// 		if(this.times===0){
	// 			this.times = 1
	// 			return 0
	// 		}else{
	// 			console.log(this.carts)
	// 		}
	// 	}
	// },
	watch:{
		cnt(){
			var n=0
			this.carts.forEach(g=>n=n+(g.goodsTate?g.goodsCount*parseInt(g.goodsPrice):0))
			this.allPrice = n
		}
	},
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById','claenCart']),
      radioChangeHandler(e) {
        this.updateGoodsState(e)
		this.carts = this.cart
		if(!e.goodsTate){
			this.cnt++
		}
		
      },
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
		this.cnt++
      },
      swipeItemClickHandler(goods) {
        this.removeGoodsById(goods.goodsId)
      },
	  async cartPay(){
		let result =  await this.$request('/cartPay',this.carts,'post')  
		if(result){
		 this.claenCart()
		  uni.navigateTo({
			url:'../../subpackage/cartpayok/cartpayok'
		})
		}	
	  }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #EFEFEF;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
  .allprice{
	  margin-left: 200rpx;
  }
</style>
