<template>
<!-- <view   @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend" >  
长按支付</view> -->
<view class="contain">
<view class="box">
	<view class="zhifuxiangqinye">支付详情页</view>
	<!-- 地址详情栏 -->
	<view class="box1" @click="gotoAdress">
		<view class="dizhilan">地址栏</view>
		<view class="adress">{{adress.roughAdress}}</view>
	</view>
	<!-- 订单详情页面 -->
	<view class="box2" @click="open">
		<view class="dizhilan">订单详情页面</view>
		<view class="adress">商品名称：{{goods.gname}}</view>
		<view class="adress">商品信息：{{goods.gdescribe}}</view>
		<view class="adress">商品价格：{{goods.gprice}}</view>
	</view>
	<uni-popup ref="popup" :mask-click="false">
		<view class='container'>
			<view @click="close" class="close" style="color: #DD524D;">关闭</view>
			<view>商品名称：{{goods.gname}}</view>
			<view>商品信息：{{goods.gdescribe}}</view>
			<view>商品价格：{{goods.gprice}}</view>
			<view><image :src="goods.gimg1"></image></view>
		</view>
	</uni-popup>
	
	<!-- 支付方式 -->
	<view class="box3">
		<view class="uni-padding-wrap">
			<view class="uni-title">支付方式</view>
			<view>
				<image src="../../static/temp/saomapay.png" class="saoma"></image>
				<label class="radio"><radio value="r1" :checked="ifChoose"  @click="chooseRadio"/></label>
			</view>
			<view>
				<image src="../../static/temp/gonshang.png" class="saoma"></image>
				<label class="radio"><radio value="r2"  :checked="ifChoose2" @click="chooseRadio2"/></label>
			</view>
		</view>
	</view>
	
	<!-- 提交订单页面 -->
	<view class="box4" @click="pay">
		<view class="lijizhifu">立即支付</view>
	</view>
	
	<uni-popup ref="popupPay" :mask-click="false">
		<view class='container2'>
			<view @click="closePay" class="close" style="color: #DD524D;">关闭</view>
			<text>微信小程序支付测试,长按测试</text>
		    <view class="imagequyu">
				<!-- show-menu-by-longpress="true" -->
		      <image  class="erweima" src="../../static/temp/mypayimge.JPG" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend" ></image>
		    </view>	 
		</view>
	</uni-popup>
</view>
</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
	export default {
		computed:{
		  ...mapState('m_user',['user'])
		},
		data() {
			return {
				ifChoose:false,
				ifChoose2:false,
				goodsId:0,
				uid:0,
				adress:{
					adressId:0,
					detailAdress:'',
					phone:'',
					resiveName:'',
					roughAdress:'',
					uid:''
				},
				goods:[],
			};
		},
		onLoad(options) {
			this.goodsId = options.goodsId
			this.uid = this.user.uid
			this.getGoods(this.goodsId)
			this.getAdress(this.uid)
		},
		methods:{
			async getGoods(){
			let result = await this.$request('/getGoodsDetail',{g_id:this.goodsId})
			this.goods=result
			console.log(this.goods)
			},
			
			async getAdress(uid){
			let result = await this.$request("/getAdressByUid?uid="+uid)
			this.adress = result
			},
			chooseRadio(){
				if(this.ifChoose){
					this.ifChoose = false
				}
				else{
					this.ifChoose = true
				}
			},
			chooseRadio2(){
				uni.showToast({
					title:'暂不支持银行卡支付'
				});
				if(this.ifChoose2){
					this.ifChoose2 = false
				}
				else{
					this.ifChoose2 = true
				}
			},
			// 查看详情
			open(){
				this.$refs.popup.open('center')
			},
			close(){
				this.$refs.popup.close()
			},
			gotoAdress(){
				uni.navigateTo({
					url:'../myAdress/myAdress?uid='+this.user.uid
				})
			},
			
			pay(){
				this.$refs.popupPay.open('center')
			},
			closePay(){
				this.$refs.popupPay.close()
			},
			// 模拟支付方法集
			handletouchstart(e) {
			     this.timeOutEvent = setTimeout(() => {  
			         this.onLongPress(e)  
			     }, 1000); //这里设置定时器，定义长按1000毫秒触发长按事件，时间可以自己改，  
			     return false;  
			 },  
			 handletouchend() {  
			     clearTimeout(this.time); //清除定时器    
			     if (this.time != 0) {  
			         //处理点击时间  
			     }  
			     return false;  
			 },  
			 handletouchmove() {  
			     clearTimeout(this.time); //清除定时器    
			     this.time = 0;  
			 },  
			onLongPress(e) {
				// 这里写支付成功 向后端
				//成功后
				//this.payGoods(this.uid,this.goodsId);
				uni.navigateTo({
					url:'../payok/payok?uid='+this.uid+"&&goodsid="+this.goodsId
				})
			}
		}
	}
</script>

<style lang="scss">
.contain{
	background-color: #CCCCCC;
	width: 100%;
	display: flex;
}
.box{
	width: 100%;
	background-color: #F2F2F2;
	bottom: 0;
}
.zhifuxiangqinye{
	height: 100rpx;
	width: 100%;
	text-align: center;
	background-color: #FFFFFF;
	font-size: 40rpx;
}
.box1{
	height: 150rpx;
	width: 80%;
	margin-left: 10%;
	margin-top: 50rpx;
	background-color: #FFFFFF;
	border-radius: 25rpx;
}
.box2{
	height: 300rpx;
	width: 80%;
	margin-left: 10%;
	margin-top: 100rpx;
	background-color: #FFFFFF;
	border-radius: 25rpx;
}
.box3{
	height: 250rpx;
	width: 80%;
	margin-left: 10%;
	margin-top: 50rpx;
	background-color: #FFFFFF;
	border-radius: 25rpx;
}
.box4{
	height: 200rpx;
	width: 80%;
	margin-left: 10%;
	margin-top: 150rpx;
	background-color: #FFFFFF;
	margin-bottom: 30rpx;
	border-radius: 25rpx;
	text-align: center;
	font-size: 70rpx;

}
.lijizhifu{
	color: #339900;
	padding-top: 50rpx;
	font-weight: 500;
}
.adress{
	padding: 10rpx;
	font-size: 20rpx;
	font-weight: 20;
}
.saoma{
	height: 50rpx;
	width: 50rpx;
}
.radio{
	padding-left: 50%;
}
.container{
	height: 700rpx;
	width: 600rpx;
	background-color: #FFFFFF;
}
.container2{
	background-color: #F7F7F7;
	height: 500rpx;
	width: 500rpx;
}
.imagequyu{
	height: 400rpx;
	width: 400rpx;
}
.erweima{
	height: 400rpx;
	width: 400rpx;
	
	margin-left: 50rpx;
	
}

</style>
