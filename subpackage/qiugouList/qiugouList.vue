<template>
	<view>
		<u-action-sheet :actions="list" @select="selectClick" :title="title" :show="show" ></u-action-sheet>
		
		
				<u-navbar
					title="求购信息列表"
					safeAreaInsetTop
					fixed
					placeholder
				></u-navbar>
		
		<view class="sugg-list">
		  <view class="sugg-item"  @click="showT">
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
			title:'操作',
			list: [
				{
					name:'供应'
				},
				{
					name:'取消'
				}
			],
			show: false
		};
	},
	onLoad() {},
	methods: {
		showT(){
			this.show =true
		},
		selectClick(index){
			if(index.name==='取消'){
				this.show = false
			}
		}
	}
};
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
</style>
