<template>
	<!--pages/my/my-add-address/index.wxml-->
	<view class="redact-address">
	  <view class="possess-layout">
	    <view class="mains">
	      <view class="address-msg">
	        <view class="item-msg">姓名</view>
	        <view class="section">
	          <input type="text" placeholder="请填写姓名" :value="qiugou.name" @input="consigneeNameInput" placeholder-class="phcolor"></input>
	        </view>
	        <view class="address-right">
	         
	        </view>
	      </view>
	      <view class="address-msg">
	        <view class="item-msg">手机号码</view>
	        <view class="section">
	          <input type="number" placeholder="请填写收货人手机号码" :value="qiugou.phone" @input="phoneInput" maxlength="11" placeholder-class="phcolor"></input>
	        </view>
	      </view>
	      <view class="address-msg">
	        <view class="item-msg">求购商品</view>
	        <view class="section">
	          <input type="text" placeholder="输入需要的商品" :value="qiugou.needGoods"  placeholder-class="phcolor" @input="getDetailAdress"></input>
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
	  <view class="btn" @click="submitAdress">发布需求</view>
	</view>
	
	
	    
	 

</template>

<script>
	export default {
		data() {
			return {
				qiugou:{
					name:'',
					phone:'',
					needGoods:'',
				},
				qiugou2:{
					name:'',
					phone:'',
					needGoods:'',
				}
			};
		},
		onLoad(options) {
			
		},
		methods:{
			consigneeNameInput(e){
				this.setData = setTimeout(()=>{
					this.qiugou.name = e.detail.value
				});
			},
			phoneInput(e){
				setTimeout(()=>{
					this.qiugou.phone = e.detail.value
				})
			},
			getDetailAdress(e){
				setTimeout(()=>{
					this.qiugou.needGoods = e.detail.value
				})
			},
			async submitAdress(){
				if(this.qiugou == this.qiugou2){
					uni.showToast({
						title:'不可重复发布！',
					})
					return
				}
				this.qiugou2 = this.qiugou
				let result = await this.$request('/qiugou',this.qiugou)
				if(result){
					uni.showToast({
						title:'需求发布成功！'
					})
				}
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
