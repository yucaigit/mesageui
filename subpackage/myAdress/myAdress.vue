<template>
	<!--pages/my/my-add-address/index.wxml-->
	<view class="redact-address">
	  <view class="possess-layout">
	    <view class="mains">
	      <view class="address-msg">
	        <view class="item-msg">收货人</view>
	        <view class="section">
	          <input type="text" placeholder="请填写收货人姓名" :value="resiveAdress.resiveName" @input="consigneeNameInput" placeholder-class="phcolor"></input>
	        </view>
	        <view class="address-right">
	         
	        </view>
	      </view>
	      <view class="address-msg">
	        <view class="item-msg">手机号码</view>
	        <view class="section">
	          <input type="number" placeholder="请填写收货人手机号码" :value="resiveAdress.phone" @input="phoneInput" maxlength="11" placeholder-class="phcolor"></input>
	        </view>
	      </view>
	      <view class="address-msg">
	        <view class="item-msg">所在地区</view>
	        <view class="section">
	          <input  placeholder="省市区县、乡镇等"  :value="resiveAdress.roughAdress" @input="consigneeRegionInput" placeholder-class="phcolor"></input>
	        </view>
			
	        <view class="address-rights" @click="getLocation">
	          <image src="../../static/temp/adress.png"></image>
	          <view>定位</view>
	        </view>
	      </view>
	      <view class="address-msg">
	        <view class="item-msg">详细地址门牌号</view>
	        <view class="section">
	          <input type="text" placeholder="街道、楼牌号等" :value="resiveAdress.detailAdress"  placeholder-class="phcolor" @input="getDetailAdress"></input>
	        </view>
	      </view>
	      <view class="label">
	        <view class="label-title">特别说明</view>
	        <view class="section">
	          <input type="number" placeholder="详细说明"  maxlength="11"  placeholder-class="phcolor"></input>
	        </view>
	      </view>
	    </view>
	  </view>
	  <view class="btn" @click="submitAdress">保存</view>
	</view>
	
	
	    
	 

</template>

<script>
	import { mapState , mapMutations ,mapGetters} from 'vuex'
	export default {
		computed:{
		  ...mapState('m_user',['user'])
		},
		data() {
			return {
				resiveAdress:{
					resiveName:'',
					phone:'',
					roughAdress:'',
					detailAdress:'',
					uid:0
				}
			};
		},
		onLoad(options) {
			this.resiveAdress.uid = this.user.uid
			
		},
		methods:{
			consigneeNameInput(e){
				this.setData = setTimeout(()=>{
					this.resiveAdress.resiveName = e.detail.value
				});
			},
			phoneInput(e){
				setTimeout(()=>{
					this.resiveAdress.phone = e.detail.value
				})
			},
			consigneeRegionInput(e){
				setTimeout(()=>{
					this.resiveAdress.roughAdress = e.detail.value
				})
			},
			getLocation(){
				const _this = this
				uni.chooseLocation({
				  success(res) {
					_this.resiveAdress.roughAdress = res.address
				  }
				})
			  },
			getDetailAdress(e){
				setTimeout(()=>{
					this.resiveAdress.detailAdress = e.detail.value
				})
			},
			async submitAdress(){
				if(this.resiveAdress.resiveName ==null || this.resiveAdress.resiveName==''){
					this.showMessage('请填写收货人姓名')
				}
				if(this.resiveAdress.phone == null || this.resiveAdress.phone==''){
					this.showMessage('填写手机号！')
				}
				if(this.resiveAdress.roughAdress ==null || this.resiveAdress.roughAdress==''){
					this.showMessage('填写地址')
				}
				let adress = this.resiveAdress
				console.log(adress)
				let result = await this.$request('/saveAdress',adress);
				if(result){
					uni.navigateBack({
						delta:1,
					})
				}
			},
			showMessage(e){
				uni.showToast({
					title:e
				})
			}
		}
	}
</script>

<style lang="scss">
/* pages/my/my-add-address/index.wxss */
.redact-address {
  background: white;
  margin-bottom: 20rpx;
}
 
.address-msg {
  height: 128rpx;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-top: 2rpx solid #efefef;
  font-size: 28.68rpx;
  color: #333333;
  padding: 0 20rpx;
}
.address-right image {
  width: 32rpx;
  height: 32rpx;
}
.address-rights {
  display: flex;
  align-items: center;
}
.address-rights image {
  width: 26rpx;
  height: 32rpx;
  margin-right: 13rpx;
}
.address-rights view {
  font-size: 28.68rpx;
}
.address-msg:last-child {
  border-bottom: none;
}
 
.section {
  width: 58%;
}
.phcolor {
  color: #999999;
}
.item-msg {
  width: 25%;
  margin-right: 25rpx;
}
 
.img {
  width: 35rpx;
  height: 35rpx;
  align-self: center;
}
 
.address-right {
  width: 100rpx;
  display: flex;
  flex-direction: row-reverse;
}
 
/* 标签 */
.label {
  display: flex;
  height: 128rpx;
  align-items: center;
  margin-top: 73rpx;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  padding: 0 20rpx;
}
.label-title {
  font-size: 28.68rpx;
  color: #333333;
  margin-right: 83rpx;
}
.label .label-list {
  display: flex;
}
.label .label-list .labels{
  height: 40rpx;
  width: 96rpx;
  border: 1px solid #EEEEEE;
  margin-right: 37rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  color: #000000;
  border-radius: 20rpx;
}
.labels-active {
  background: #F73C41 !important;
  color: #FFFFFF !important;
}
/* 默认设置 */
.default-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160rpx;
  padding: 0 20rpx;
}
.defaul-setting-left view:nth-child(1){
  font-size: 28.68rpx;
  color: #333333;
  margin-bottom: 25rpx;
}
.defaul-setting-left view:nth-child(2) {
  font-size: 20rpx;
  color: #333333;
}
.defaul-setting-right {
  height: 64rpx;
  width: 105rpx;
}
 
.btn {
  width: 680rpx;
  height: 88rpx;
  background: #F73C41;
  color: #FFFFFF;
  position: fixed;
  bottom: 55rpx;
  left: 35rpx;
  border-radius: 41.5rpx;
  font-size: 36rpx;
  text-align: center;
  line-height: 88rpx;
}
 
/* 城市选择 */
.picker {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 12;
  background-color: #fff;
  background: rgba(0, 0, 0, 0.2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0rpx;
}
.picker-view {
  width: 100%;
  display: flex;
  z-index: 12;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0rpx;
  height: 40vh;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
}
 
.gangedBtn {
  border-top: 1px solid #efefef;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  width: 100%;
  height: 90rpx;
  padding: 0 66rpx;
  box-sizing: border-box;
  line-height: 90rpx;
  text-align: center;
  color: black;
  font-size: 0.8rem;
  display: flex;
  background: white;
  justify-content: space-between;
}
 
.cont {
  width: 100%;
  height: 389rpx;
}
 
.picker-item {
  line-height: 70rpx;
  margin-left: 5rpx;
  margin-right: 5rpx;
  text-align: center;
}
 
.address {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-bottom: 1rpx solid #f1f1f1;
}
.city-cancel {
  color: gray;
}
</style>
