<template>

 <view>
   <my-search></my-search>
   
   <view class="navContainer">
     <view class="navItem" v-for="(item,i) in items" :key="i" @click="onClickItem(i)">
       <text class="tobtext" :class="{active:current==i}">{{item}}</text>
     </view>
   </view>

<!-- 内容区域 --> 
   <view class="fenge">
     <image src="../../static/temp/cart_border@2x.png" class="fengexian"></image>
   </view>
  <view class="content">
<view class="order" v-if="current  == 0">
	<view class="content_">
		<view class="title">
			<view>订单编号：2018041729873019</view>
			<text>全部订单</text>
		</view>
		<view class="card" v-for="(item,i) in orderlist" :key="i">
			<view class="card-img">
				<image :src="item.goods.gimg1"></image>
			</view>
			<view class="card-text">
				<view class="card-text_">
					<text>{{item.goods.gname}}</text>
					<view>
						<view>{{item.goods.gprice}}</view>
						<text>x1</text>
					</view>
				</view>
				<view class="card-button">
          <view @click="lookDetail(item)">再次购买</view>
			</view>
			</view>
		</view>
		
		
		
	</view>
	<view class="bottom-title">
		共2件商品 实付：￥198.00
	</view>
</view>


<!-- 待付款 -->
<view class="order" v-if="current  == 1">
	<view class="content_">
		<view class="title">
			<view>订单编号：2018041729873019</view>
			<text>全部订单</text>
		</view>
		<view class="card" v-for="(item,i) in orderlist" :key="i" v-if="item.orderState==1">
			<view class="card-img">
				<image :src="item.goods.gimg1"></image>
			</view>
			<view class="card-text">
				<view class="card-text_">
					<text>{{item.goods.gname}}</text>
					<view>
						<view>{{item.goods.gprice}}</view>
						<text>x1</text>
					</view>
				</view>
				<view class="card-button">
          <view @click="removeOrder(item)">删除</view>
          <view>查看物流</view>
          <view @click="lookDetail(item)">再次购买</view>
				</view>
			</view>
		</view>
	</view>
</view>

<!-- 待收货 -->
<view class="order" v-if="current  == 2">
	<view class="content_">
		<view class="title">
			<view>订单编号：2018041729873019</view>
			<text>全部订单</text>
		</view>
		<view class="card" v-for="(item,i) in orderlist" :key="i" v-if="item.orderState==2">
			<view class="card-img">
				<image :src="item.goods.gimg1"></image>
			</view>
			<view class="card-text">
				<view class="card-text_">
					<text>{{item.goods.gname}}</text>
					<view>
						<view>{{item.goods.gprice}}</view>
						<text>x1</text>
					</view>
				</view>
				<view class="card-button">
          <view @click="removeOrder(item)">删除</view>
          <view @click="confimOrder(item)">确认收货</view>
          <view @click="lookDetail(item)">再次购买</view>
				</view>
			</view>
		</view>
	</view>
	<view class="bottom-title">
		
	</view>
</view>

<!-- 完成收获 -->
      <view class="order" v-if="current  == 3">
      	<view class="content_">
      		<view class="title">
      			<view>订单编号：2018041729873019</view>
      			<text>全部订单</text>
      		</view>
      		<view class="card" v-for="(item,i) in susccOrder" :key="i">
      			<view class="card-img">
      				<image :src="item.goods.gimg1"></image>
      			</view>
      			<view class="card-text">
      				<view class="card-text_">
      					<text>{{item.goods.gname}}</text>
      					<view>
      						<view>{{item.goods.gprice}}</view>
      						<text>x1</text>
      					</view>
      				</view>
      				<view class="card-button">
                <view @click="removeOrder(item)">删除</view>
                <view @click="lookDetail(item)">再次购买</view>
      				</view>
      			</view>
      		</view>
      	</view>
      	<view class="bottom-title">
      		<!-- 共2件商品 实付：￥198.00 -->
      	</view>
      </view>
	  
      <view v-show="current === 1">
          待付款
      </view>
      <view v-show="current === 2">
          待收货
      </view>
      <view v-show="current === 3">
         已完成
      </view>
  </view>
  
</view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
	export default {
    computed:{
      ...mapState('m_order',['orders'])
    },
		data() {
		  return {
        items:['全部','待付款','待收货','完成'],
        current: 0,
        orderlist:[],
        uid:0,
		susccOrder:[]
			}
		},
		onLoad(options) {
      this.uid=options.uid
      this.getMyOrder(options.uid)
	  this.getSuccess(this.uid)
    },
		methods: {
      ...mapMutations('m_order',['onloadOrders','removeO','confirmPay']),
      onClickItem(e) {
        this.current = e
      },
      // 得到全部订单
      async getMyOrder(uid){
        let result =  await this.$request("/getOrders",{uid:uid})
        this.orderlist = result
        this.onloadOrders(result)
		console.log(result)
      },
       async removeOrder(item){
        let result = await this.$request("/removeOrderById",{oId:item.orderId})
        if(result){
			this.getMyOrder(this.uid)
			this.getSuccess(this.uid)
		}
       },
	   
       async confimOrder(item){
         let result = await this.$request("/confirmResive",{oId:item.orderId})
		 this.getSuccess(this.uid)
         this.confirmPay(item)
		 
       },
	   async getSuccess(e){
		   let result = await this.$request("/getSuccess",{uid:e})
		   this.susccOrder = result
		   console.log(result)
	   },
       payOrder(item){
         
       },
	   lookDetail(item){
		   uni.navigateTo({
		   	url:'../goodsDetail/goodsDetail?query='+item.goods.gid
		   })
	   }
      }

	}
</script>

<style lang="scss">
  .navContainer {
    display: flex;
    margin-top: 30rpx;
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top:3;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }
  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    margin-left: 20rpx;
  } 
  .navItem text {
    font-size: 26rpx;
  }
  
  .fengexian{
    width: 100%;
    height: 30rpx;
  }
  .tobtext{
    font-weight: 30rpx;
  }
  /* 内容区域*/
  .contentBox{

  }
  .contentBox1{
    display: flex;
  }
  .contentBoxIm{
    width: 200rpx;
    height: 200rpx;
    background-color: #F2F2F2;
    border-radius: 20rpx;
  }
  .contentBoxImage{
    height: 150rpx;
    width: 150rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
  }
  .contentBoxText{
    margin-left: 30rpx;
    background-color: #F2F2F2;
    height: 50rpx;
    border-radius: 25%;
  }
  .contentBox2{
    display: flex;
    margin-top: 150rpx;
    
  }
  .buttontob{
    font-size: 20rpx;
    text-align: center;
    height: 50rpx;
    width: 200rpx;
    
    border-radius: 12rpx;
    
    background-color: #FFFFFF;
  }
  .money{
    color: #FF0000;
    padding: 20rpx;
  }
  .orderinfo{
    font-size: 20rpx;
    color: #DD524D;
    padding-left: 40rpx;
    height: 40rpx;
  }
  .active{
	  color: #007AFF;
  }
  .order {
    width: 100%;
    background-color: #f4f4f4;
  }
  
  .content_ {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .title {
    width: 100%;
    line-height: 30px;
    justify-content: space-between;
    border-bottom: 1px solid #f5f8f4;
    padding: 0 20rpx;
  }
  
  .title>view {
    color: #666;
  }
  
  .title>text {
    color: #fa9b4e;
  }
  
  .bottom-title {
    width: 100%;
    text-align: right;
    line-height: 40px;
    background-color: #fff;
    padding: 0 20rpx;
  }
  
  .card {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
  }
  
  .card-img {
    height: 100px;
    width: 100px;
    padding: 7px 7px;
  }
  
  .card-img>image {
    width: 86px;
    height: 86px;
  }
  
  .card-text {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .card-text_ {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
  }
  
  .card-text_>text {
    width: 80%;
    padding-left: 20rpx;
    color: #444;
    font-weight: 600;
    font-size: 10pt;
  }
  
  .card-text_>view {
    padding-right: 20rpx;
    width: 20%;
    text-align: right;
  }
  
  .card-text_>view>view {
    color: #444;
    font-weight: 600;
    margin-bottom: 10rpx;
  }
  
  .card-text_>view>text {
    font-size: 9pt;
    color: #999;
  }
  
  .card-button {
    width: 100%;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    padding-left: 30rpx;
  }
  
  .card-button>view {
    background-color: #fff;
    line-height: 25px;
    width: 30%;
    margin-left: 10rpx;
    text-align: center;
    border-radius: 15px;
    border:1px solid#d6d6d6;
    color: #444;
    font-size: 9pt;
  }
</style>
