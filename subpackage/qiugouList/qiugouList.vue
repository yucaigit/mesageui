<template>
	<view>
		<view class="header"></view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list">
		  <view class="sugg-item">
		    <view class="goods-name">item.goods_name}}</view>
			<view class="subgoods">供给</view>
		    <uni-icons type="arrowright" size="16" color="#DD524D"></uni-icons>
		  </view>
		</view>
		
		<view class="sugg-list">
		  <view class="sugg-item">
		    <view class="goods-name">item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		
		<view class="sugg-list">
		  <view class="sugg-item">
		    <view class="goods-name">item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.subgoods{
	margin-left: 58%;
	color: #DD524D;
}
</style>
