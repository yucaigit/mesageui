<template>
	<view>
		<view class="box1">
			倒计时后返回主界面......
		</view>
		<view class="daojishi">
		<uni-countdown :show-day="false" hour="false" :second="time" class="timeFont" color="red" :font-size="60"></uni-countdown>
		</view>
		<view class="lijifanhui" @click="backHurry">
			<button type="primary">立即返回</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:6,
				uid:0,
				goodsid:0
			};
		},
		onLoad(options) {
			this.uid = options.uid
			this.goodsid=options.goodsid
			this.payGoods(this.uid,this.goodsid)
			this.getTime()
			
		},
		methods:{
			async payGoods(uid,goodsid){
				let result =  await this.$request("/payGoods?uid="+uid+"&&goodsid="+goodsid)
			},
			getTime(){
				setTimeout(()=>{
					uni.reLaunch({
						url:'../../pages/index/index'
					});
				},6000)
			},
			backHurry(){
				uni.reLaunch({
					url:'../../pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	.lijifanhui{
		padding: 100rpx;
	}
	.daojishi{
		font-size: 60rpx;
	}
</style>
