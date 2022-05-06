<template>
  <view class="page1">
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <view>
      <!-- 轮播图区域 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <!-- 循环渲染轮播图的 item 项 -->
        <swiper-item v-for="(item, i) in swiperList" :key="i">
          <view class="swiper-item">
            <!-- 动态绑定图片的 src 属性 -->
            <image :src="item.s_Src"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 我的小区 -->
    <!--      五个图标导航-->
    <!-- <view class="navContainer">
      <view class="navItem" @click="lookDetail(1)">
        <text class="iconfont icon-xinpin"></text>
        <text>我的小区</text>
      </view>
      <view class="navItem" @click="lookDetail(2)">
        <text class="iconfont icon-biaoqiankuozhan_fujin-393"></text>
        <text>附近闲置</text>
      </view>
      <view class="navItem" @click="lookDetail(3)">
        <text class="iconfont icon-tongcheng"></text>
        <text>同城闲置</text>
      </view>
      <view class="navItem" @click="lookDetail(4)">
        <text class="iconfont icon-mianfei"></text>
        <text>免费专区</text>
      </view>
      <view class="navItem" @click="lookDetail(5)">
        <text class="iconfont icon-xinpin"></text>
        <text>新品出售</text>
      </view>
    </view> -->
	
	<view class="navContainer">
	  <view class="navItem" @click="lookDetail(1)">
		  <text>我的周边</text>
	  </view>
	  <view class="navItem" @click="lookDetail(2)">
		   <text>最新商品</text>
	  </view>
	</view>
    <!-- 商品列表-->
    <view>
      
      
      <view class='space'></view>
        <van-divider custom-class="table-text" contentPosition="center">
          <image class="table-icon-goodslist" ></image>
        </van-divider>
        <view class="goods-container">
          
          <view class="goods-box" v-for="(item,i) in allGoodsList" :key="i" @click="getToDetail(item)">
            <!-- 图片 -->
            <view class="img-box">
              <image  class="image" mode="aspectFill" lazy-load="true" :src="item.gimg1"/>
            </view>
            <!-- 一级说明 -->
            <view class="goods-title van-multi-ellipsis--l2"></view>
            <!-- 二级描述 -->
            <view  class="characteristic van-multi-ellipsis--l2" style="-webkit-line-clamp: 1;">{{item.gname}}</view>
            <!-- 价格描述 -->
            <view class="goods-price-container">
              <view class="goods-price">{{item.gprice}}</view>
              <view  class="goods-price2">¥ {222}
              </view>
            </view>
          </view>
        </view>
      
    </view>
    
    
  </view>
</template>

<script>
  import request from '../../util/request.js'
  export default {
    data() {
      return {
        swiperList: [],
        allGoodsList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
        // this.getAllGoods()
      this.getAllGoodsList()
    },
    methods: {
      async getSwiperList() {
       let result = await this.$request("/findSwiperList")
        this.swiperList = result
      },
      // 得到所有商品
      async getAllGoodsList(){
        let result = await this.$request("/getAllG")
        this.allGoodsList = result;
        console.log(result)
      },
      // 搜索按钮
      gotoSearch() {
        uni.navigateTo({
          url: "/subpackage/search/search"
        })
      },
      lookDetail(e) {
        uni.navigateTo({
        	url:'../../subpackage/goodsList/goodsList?i='+e
        })
      },
      getToDetail(e){
        const g_id = e.gid
		console.log(g_id)
        
        uni.navigateTo({
          url:'../../subpackage/goodsDetail/goodsDetail?query='+g_id
        })
      }
    }
  }
</script>


<style lang="scss">
	
	.page1{
		background-color: #EAEAEA;
	}
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }

  .navContainer {
    display: flex;
  }
  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
	margin-left: 25rpx;
	margin-top: 10rpx;
    width: 45%;
	height: 140rpx;
	background-color: #FFFFFF;
	border-radius: 10rpx;
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
	  margin-top: 40rpx;
    font-size: 40rpx;
  }




.goods-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: content-box;
  padding: 0 24rpx;
}

.goods-box {
  width: 339rpx;
  /* height: 472rpx; */
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 24rpx;
  border-radius: 5px;
  border: 1px solid #D1D1D1;
  padding-bottom: 10rpx;
}

.goods-box .img-box {
  width: 339rpx;
  height: 339rpx;
  overflow: hidden;
}

.goods-box .img-box image {
  width: 339rpx;
  height: 339rpx;
}

.goods-box .goods-title {
  width: 280rpx;
  font-size: 24rpx;
  color: #333;
  margin-left: 24rpx;
}

.goods-box .goods-price-container {
  display: flex;
  align-items: baseline;
}

.goods-box .goods-price {
  overflow: hidden;
  font-size: 34rpx;
  color: #F20C32;
  margin-left: 24rpx;
}

.goods-box .goods-price2 {
  overflow: hidden;
  font-size: 26rpx;
  color: #aaa;
  text-decoration: line-through;
  margin-left: 20rpx;
}
.table-icon-goodslist {
  width: 34rpx;
  height: 45rpx;
  margin-right: 18rpx;
}
</style>
