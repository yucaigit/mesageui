<template>

 <view class="page1">
    <!--      五个图标导航-->
	<view class="daohang">
		
		
		<view class="location">
			<view class="headetext">
				<text class="heade1text">当前位置</text>
				<text class="heade1text">{{location}}
				</text>
				<image src="../../static/temp/choosecity.png" @click="getLocation"></image>
			</view>

		</view>
		
		
		
		<view>
			<uni-notice-bar scrollable single :text="notification"></uni-notice-bar>
		</view>
	</view>
		
		<!-- 商品列表 -->
		<view class="lieBox" v-for="(item,i) in toncheng" :key="i" @click="getToDetail(item.gid)">
			
			<view class="gooditems">
				<view class="gooditem">
					<image :src="item.gimg1"></image>
				</view>
				<view class="goods-item">
					<view class="good-nav1">{{item.gname}}</view>
					<view class="good-nav2">{{item.gdescribe}}</view>
					<view class="good-nav3">发布于：{{item.gdateUp}}    {{item.gadress}}</view>
				</view>
				<view class="good-user" style="color: #DD524D;">{{item.gprice}}￥</view>
			</view>
			
		</view>
		

</view>
</template>

<script>

	export default {
		data() {
			return {
				
				location:'兰州',
				
				notification:'无',
				timer:0,
				allGoods:[],
				toncheng:[],
				freeList:[]
			}
		},
		onLoad(options) {
			this.current = options.i
			this.getNotification()
			this.timeOnload()
			this.getAllGoods()
			this.gettoncheng()

		},

		methods: {
			getToDetail(e){
			  uni.navigateTo({
			    url:'../../subpackage/goodsDetail/goodsDetail?query='+e
			  })
			},
			getLocation(){
				const _this = this
				uni.chooseLocation({
					success: function (res) {
						console.log(res.address)
						_this.location = res.address
						_this.gettoncheng()
					}
				});
			},
			 async gettoncheng(){
				let result = await this.$request('/toncheng',{adress:this.location})
				this.toncheng = result
			},
			lookDetail(e){
				this.current =e
			},
			async getNotification(){
				let resutl =  await this.$request('/notification')
				this.notification = resutl
			},
			async getAllGoods(){
				let result = await this.$request('/getAll')
				this.allGoods = result
			},
			timeOnload(){
				let firstTime = new Date();
				let nextTime = new Date();
				if(this.timer==0){
					this.timer = firstTime
				}
				const _this =this
				setTimeout(()=>{
					nextTime = new Date();
					console.log("00000")
					_this.getNotification()
					_this.timeOnload()
				},30000);
				
			}
      }

	}
</script>

<style lang="scss">
	.page1{
		background-color: #EAEAEA;
	}
	.good-user{
		margin-left: 10rpx;
		padding-top: 40rpx;
		
	}
	.good-nav1{
		width: 250rpx;
		margin-top: 20rpx;
		// overflow: hidden;
		font-size: 35rpx;
		color: #aaa;
		// text-decoration: line-through;
		margin-left: 20rpx;
	}
	.good-nav2{
		width: 250rpx;
		margin-top: 20rpx;
		// overflow: hidden;
		font-size: 20rpx;
		color: #aaa;
		// text-decoration: line-through;
		margin-left: 20rpx;
	}
	.good-nav3{
		width: 250rpx;
		margin-top: 20rpx;
		// overflow: hidden;
		font-size: 24rpx;
		color: #aaa;
		// text-decoration: line-through;
		margin-left: 20rpx;
	}
	.goods-item{
		margin-left: 40rpx;
	}
	.gooditem image{
		height: 250rpx;
		width: 250rpx;
	}
	.lieBox{
		width: 90%;
		margin: 35rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx;
	}
	.gooditems{
		display: flex;
		
	}
	.heade1text{
		margin-left: 30rpx;
	}
.headetext{
	margin: 20rpx;
}
.location{
	width: 100%;
	height: 100rpx;
}
.location image{
	height: 25rpx;
	width: 25rpx;
}
.daohang{
	position: -webkit-sticky;
	position: sticky;
	top: var(--window-top);
	z-index: 99;
	background-color: #FFF;
}
  .navContainer {
    display: flex;
	 

  }
  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
  }
  .navItem .iconfont {
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 50rpx;
    color: #fff;
    margin: 20rpx 0;
  }

  .navItem text {
    font-size: 26rpx;
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
.active{
	color: #DD524D;
}
.konbai{
	height: 30rpx;
	width: 100%;
	background-color: #C0C0C0;
}
</style>
