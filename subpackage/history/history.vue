<template>
  <view>
	  <view v-if="hisList.length===0">暂无浏览记录</view>
    <view  class="goods-list" v-else>
		<view class="clean">
			<view class="cleanhis">清空足迹</view>
			<image src="../../static/temp/clean.png" @click="cleanHisy"></image></view>
      <block v-for="(item,i) in hisList" :key="i">
        <view class="goods-item" @click="getToGoodsDetil(item.gid)">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="item.gimg1" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{item.gname}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{item.gprice}}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				uid:0,
				hisList:[],
			};
		},
		methods: {
			async getHisyList(e){
				let result = await this.$request('/getHisyList',{uid:e})
				this.hisList = result
				console.log(result)
			},
			getToGoodsDetil(e){
				uni.navigateTo({
					url:'../goodsDetail/goodsDetail?query='+e
				})
			},
			async cleanHisy(){
			 let result = await this.$request('/cleanHisMap',{uid:this.uid})
			 if(result){
				 uni.showToast({
				 	title:'success'
				 })
			 }
			}
		},
		onLoad(options) {
			this.uid = options.query
			this.getHisyList(options.query)
		},
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
.clean{
	display: flex;
}
.cleanhis{
	margin-left: 70%;
	margin-top: 20rpx;
	font-size: 30rpx;
	font-weight: 20;
}
.clean image{
	height: 80rpx;
	width: 80rpx;
}
</style>
