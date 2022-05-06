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
				time:6

			};
		},
		onLoad(options) {
			this.getTime()
			
		},
		methods:{
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
