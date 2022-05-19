<template>
	<view>
		<view>
			<u-notify ref="uNotify" message="Hi uView"></u-notify>
		</view>
		
		<u-action-sheet :actions="list" @select="selectClick" :title="title" :show="show" ></u-action-sheet>
		
		
				<u-navbar
					title="求购信息列表"
					safeAreaInsetTop
					fixed
					placeholder
				></u-navbar>
		
		<view class="sugg-list" v-for="(item,i) in goodsList" :key="i">
		  <view class="sugg-item"  @click="showT(item)">
		    <view class="goods-name">{{item.name}},{{item.needGoods}},价格{{item.price}}元</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		  
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
export default {
	computed:{
	  ...mapState('m_user',['user'])
	},
	data() {
		return {
			title:'操作',
			tipShow:true,
			list: [
				{
					name:'供应'
				},
				{
					name:'取消'
				}
			],
			show: false,
			goodsList:[],
			goodsName:''
		};
	},
	onLoad() {
		this.getqiugouGoods()
	},
	methods: {
		showT(item){
			this.show =true
			this.goodsName = item.needGoods
		},
		// 判断用户是否有此商品
		async isHaveGoods(e){
			let result = await this.$request('/searchGoods',{uid:e,needName:this.goodsName})
			if(result){
			this.$refs.uNotify.show({
				top: 10,
				type: 'error',
				color: '#000',
				bgColor: '#00ccff',
				message: '供应成功',
				duration: 1000 * 3,
				fontSize: 20,
				safeAreaInsetTop:true
			})
			
		}else{
			this.$refs.uNotify.show({
				top: 10,
				type: 'error',
				color: '#000',
				bgColor: '#00ccff',
				message: '您的仓库无此货物',
				duration: 1000 * 3,
				fontSize: 20,
				safeAreaInsetTop:true
			})
		}
		
		},
		selectClick(index){
			if(index.name==='取消'){
				this.show = false
			}
			if(index.name==='供应'){
				if(this.user===null){
					uni.showToast({
						title:'用户未登录'
					})
				}else{
					this.isHaveGoods(this.user.uid)
				}
			}
		},
		async getqiugouGoods(){
			let result = await this.$request('/getQiugouGoods')
			console.log(result)
			this.goodsList = result
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
