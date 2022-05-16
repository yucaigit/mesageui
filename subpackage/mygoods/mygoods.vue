<template>
	<view>
		    <u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
			<u-divider ></u-divider>
			<view>
				<!-- 全部商品 -->
				<view class="goods-list" v-if="curNow===0">
					<u-swipe-action>
					<block v-for="(item,i) in allgoods" :key="i">
					<u-swipe-action-item :options="options1" @click="swipeActionClickHandler(item)">
					<view class="goods-item">
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
					</u-swipe-action-item>				
					</block>
				</u-swipe-action>
				</view>
				
				<view class="goods-list" v-if="curNow===1">
					<u-swipe-action>
					<block v-for="(item,i) in allgoodsZero" :key="i">
					<u-swipe-action-item :options="options1" @click="swipeActionClickHandler(item)">
					<view class="goods-item">
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
					</u-swipe-action-item>				
					</block>
				</u-swipe-action>
				</view>
				<!-- 未出售 -->
				<view class="goods-list" v-if="curNow===2">
					<u-swipe-action>
					<block v-for="(item,i) in allgoodsOne" :key="i">
					<u-swipe-action-item :options="options1" @click="swipeActionClickHandler(item)">
					<view class="goods-item">
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
					</u-swipe-action-item>				
					</block>
				</u-swipe-action>
				</view>
				
			</view>
	</view>

	
</template>

<script>
	export default {
		data() {
			return {
				userid:0,
                list: ['全部', '未售出', '已售出'],
				curNow: 0,
				nowcurrent:1,
				options1: [{
					text: '删除'
				}],
				allgoods:[],
				allgoodsOne:[],
				allgoodsZero:[],
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			},
			deleteGoods(index){
				console.log("删除")
				console.log(index)
			},
			 async getAllGoods(){
				let result = await this.$request('/getMypubGoods',{userid:this.userid})
				this.allgoods = result
		
			},
			async getAllGoodsIsbuyOne(){
				let result = await this.$request('/getMypubGoodsIsBuyOne',{userid:this.userid})
				this.allgoodsOne = result
				
		
			},
			async getAllGoodsIsBuyZero(){
				let result = await this.$request('/getMypubGoodsIsBuyZero',{userid:this.userid})
				this.allgoodsZero = result
			
			},
			
			 async swipeActionClickHandler(goods){
				console.log(goods.gid)
				let result = await this.$request('/removeMyup',{gid:goods.gid})
				this.getAllGoods()
				this.getAllGoodsIsbuyOne()
				this.getAllGoodsIsBuyZero()
			},
			
			updateGoods(e){
				console.log(e)
			}
		},
		onLoad(options) {
			this.userid = options.query
			this.getAllGoods()
			this.getAllGoodsIsbuyOne()
			this.getAllGoodsIsBuyZero()
		}
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
</style>
