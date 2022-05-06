<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <radio :checked="goods.goodsTate" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goodsLogo" class="goods-pic"></image>
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.goodSName}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goodsPrice}}</view>
        <uni-number-box :min="1" :value="goods.goodsCount" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        // 默认情况下，不会展示 radio 组件
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      };
    },
    methods: {
      // 这是 radio 组件的 点击事件处理函数
      radioClickHandler() {
        this.$emit('radio-change', {
          goodsId: this.goods.goodsId,
          goodsTate: !this.goods.goodsTate,
        })
        
      },
      numChangeHandler(val) {
        this.$emit('num-change',{
          goodsId:this.goods.goodsId,
          goodsCount:+val
        })
      },
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
