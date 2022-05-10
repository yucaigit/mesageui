<template>
 <view class="page1">
	 
	 <view v-if="mesList.length===0">没有留言给你哦</view>
	 
	 <scroll-view scroll-y>
	 <view class="box" v-for="(item,i) in mesList" :key="i">
		 <view class="userinfo">
			 <image :src="item.users.ua"></image>
			 <view class="user">
				 <view>{{item.buyname}}</view>
				 <view class="selltime">{{item.selltime}}</view>
			 </view>
		 </view>
		 
		 <view class="message">
			 {{item.message}}
		 </view>
		 
		 <view class="liuyan">
<!-- 			 <view class="boxi">
			 		 <input placeholder="回复" />
			 </view> -->
			 <view class="huifu" @click="replyfunction(item.id)" v-if="item.replymessage===null">回复</view>
			 <view class="huifu" v-if="item.replymessage!==null">已回复</view>
			 <view class="hulue" @click="deleteMsg(item.id)">忽略</view>
		 </view>
	 </view>

	 </scroll-view>
	 <uni-popup ref="popup" type="bottom" background-color="#fff">
	 	   <view class="">
	 		   <view class="address-msg">
	 		     <view class="item-msg">回复</view>
	 		     <view class="section">
	 		       <input type="text" placeholder="请回复留言" :value="reply" @input="msgfunction"  placeholder-class="phcolor"></input>
	 		     </view>
	 		   </view>
	 	   </view>
	 	   <view class="tijiaoliuyan" @click="submitReply">
	 		   <button type="warn">提交</button>
	 	   </view>
	 </uni-popup>
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
				reply:'',
				mesList:[],
				id:0
			}
		},
		onShow() {
			this.getMyAllMesg(this.user.uid)
		},

		methods: {
			async getMyAllMesg(e){
		
				let result = await this.$request('/getMyAllMes',{uid:e})
				console.log(result)
				this.mesList = result
				
			},
			replyfunction(e){
				this.id = e
				this.open()
			},
			open(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('popup')
				},
			msgfunction(e){
					  setTimeout(()=>{
						 this.reply = e.detail.value 
					  },1000)
					  
			},
			async submitReply(){
				if(this.reply===null || this.reply===''){
					uni.showToast({
						title:'内容不可为空'
					})
					return
				}
				let result = await this.$request('/updateReplayMs',{id:this.id,reply:this.reply})
				if(result){
					uni.showToast({
						title:'成功'
					})
					this.getMyAllMesg(this.user.uid)
				}
			},
			async deleteMsg(e){
				let result = await this.$request('/deletemsg?id='+e)
					if(result){
						uni.showToast({
							title:'删除成功'
						})
						this.getMyAllMesg(this.user.uid)
					}
			}

      }

	}
</script>

<style lang="scss">
	.page1{
		background-color: #EAEAEA;
	}
	.box{
		width: 90%;
		height: 300rpx;
		margin-top: 20rpx;
		margin-left: 5%;
		background-color: #FFFFFF;
		
	}
	.boxi{
		height: 60rpx;
		background-color: #FFF;
		margin-top: 10rpx;
		border: 1px solid #D1D1D1;
		width: 60%;
	}
	.userinfo{
		display: flex;
	}
	.userinfo image{
		height: 80rpx;
		width: 80rpx;
		margin: 10rpx;
		border-radius: 10rpx;
	}
	.message{
		height: 100rpx;
		width: 60%;
		margin-left: 100rpx;
		background-color: #EAEAEA;
		text-align: center;
	}
	.liuyan{
		display: flex;
		margin-left: 10rpx;
		
	}
	.huifu{
		width: 100rpx;
		font-size: 30rpx;
		color: #4CD964;
		margin-top: 20rpx;
		margin-left: 10rpx;
	}
	.hulue{
		width: 100rpx;
		font-size: 30rpx;
		color: #DD524D;
		margin-top: 20rpx;
		margin-left: 10rpx;
	}
	.selltime{
		font-size: 20rpx;
		font-weight: 10;
	}
	.address-msg {
	  height: 128rpx;
	  display: flex;
	  align-items: center;
	  background: #FFFFFF;
	  border-top: 2rpx solid #efefef;
	  font-size: 28.68rpx;
	  color: #333333;
	  padding: 0 20rpx;
	}
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: 16rpx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70rpx;
			font-size: 30rpx;
			color: #DD524D;
			.tit{
				font-size: 40rpx;
				color: #333333;
				margin-right: 4rpx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10rpx;
			}
		}
	}
</style>
