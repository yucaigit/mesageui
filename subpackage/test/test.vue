<template>
 <view class="page">
	 <view class="box">
		 <!-- 标题区域 -->
		 <view class="title">
			 <text></text>
		 </view>
			<!-- 搜索区域 -->
		<view v-show="current==0" class="sousuoquyu">
		 <view class="sousuo">
			 <input type="number" placeholder="请输入要搜索的用户ID" v-model="userid"/>
		 </view>
		 <image src="../../static/temp/sou.png" class="images" @click="searchUser"/>
		 </view>
		 
		 <!-- 显示用户信息区域 -->
		 <view v-show="current==1" class="xianshiyonhu">
			 <view class="user">
				 <image :src="user.ua" class="img"/></image>
				 <view>{{user.uname}}</view>
			 </view>
		 </view>
		 
		 <scroll-view scroll-y>
			 
		 <!-- 聊天内容区域  左边他人-->
		 <view class="chatbox">
		 <view class="chat" v-for="(item,i) in sendMsgList" :key="i">
			 <view class="username">
				 <image src="../../static/tab_icons/my.png" class="img"></image>
			</view>
			 <view class="chatneiron">{{item.content}}</view>
		 </view>
		 
		 
		 <!-- 我的聊天记录 -->
		 
		 <view class="chatr" v-if="mymessage.length !=0" v-for="(item,i) in mymessage" :key="i">
			 <view class="chatneironr">{{item.data}}</view>
		 			 <view class="username">
		 				 <image src="../../static/tab_icons/my.png" class="img"></image>
		 			</view>	 
		 </view>
		 
		 </view>
		 
		 </scroll-view>
		 <!-- 聊天输入框 -->
		 <view class="fasonquyu">
			 <input placeholder="聊天内容" v-model="msg" class="inputmsg"/>
			 <button type="primary" @click="sendMsgTest">send</button>
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
			userid:0,
			username:'无',
			current:0,
			sendUser:[],
			msg:'',
			
			mymessage:[],
			sendMsgList:[],
			socketOpen:false,
			socketMsgQueue:[],
			response:'',
			
		}
	},
	onShow() {
		this.initWebsocket()
	},	
	methods: {
		// webSocket
		initWebsocket(){
			const that = this
			wx.connectSocket({
			  url: 'ws://127.0.0.1:8088/chat'
			});
			wx.onSocketOpen(function(res) {
			  that.socketOpen = true
			  for (let i = 0; i < that.socketMsgQueue.length; i++){
			    that.sendSocketMessage(socketMsgQueue[i])
			  }
			  that.socketMsgQueue= []
			});
		},
		sendSocketMessage(msg){
			let that = this
			if (this.socketOpen){
				wx.sendSocketMessage({
					data:msg
				})
			}else{
				this.socketMsgQueue.push(msg)
			}
			wx.onSocketMessage(function(res){
				console.log(JSON.parse(res.data))
				let sendMsg = JSON.parse(res.data)
				that.sendMsgList.push(sendMsg)
			})
		},
		
		// 发送消息到服务端
		sendMsg(){
		  const	message = {
				fromName:'a',
				toName:'b',
				content:this.msg,
			};
			//发送消息到服务端
			this.sendSocketMessage(JSON.stringify(message))
		},
		
		// 得到用户信息
	     async searchUser(){
			let result  = await this.$request('/chatcontroller/getuser?userid='+this.userid)
			if(result==null || result==''){
				uni.showToast({
					title:'查无此用户'
				})
			}else{
				console.log(this.user)
				this.sendUser = result
				this.current=1
			}
			console.log(result)
		},
		sendMsgTest(){
			if(this.sendUser==null || this.sendUser==''){
				uni.showToast({
					title:'没有用户发送'
				})
				return
			}
			let query = {
				index:0,
				data:this.msg
			}
			this.mymessage.push(query)
			this.sendMsg()
			this.msg=null
			console.log(this.mymessage)
		},
    },
	onLoad() {
	
	}
}
</script>

<style lang="scss">
.page{
	width: 100%;
	height: 1000rpx;
}
.sousuoquyu{
	background-color: #FFF;
	display: flex;
}
.images{
	
	height: 80rpx;
	width: 80rpx;
}
.sousuo{
	
	height: 80rpx;
	width: 90%;
	border-radius: 10rpx;
    border: 2rpx solid #333333;
}
.chatbox{
	
}
.box{
	height: 100%;
	width: 98%;
	
	margin: 10rpx;
	//background-color: #007AFF;
}
.fasonquyu{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.chat{
	display: flex;
	width: 100%;
	margin-top: 10rpx;
}
.username{
}
// .chatneiron{
// 	margin-left: 10rpx;
// 	width: auto;
// 	height: 30rpx;
// 	background-color: #FFFFFF;
// 	border: 3rpx solid #FFF;
// }
// 聊天旗袍
.chatneiron {
  /* display: none; */
  width: 250rpx;
  font-size: 25rpx;
  height: 50rpx;
  background-color: #666666;
  border: 1px solid #666666;
  border-radius: 5px;
}
.chatneironr {
  /* display: none; */
  width: 250rpx;
  font-size: 25rpx;
  height: 50rpx;
  background-color: #00CC66;
  border: 1px solid #00CC66;
  border-radius: 5px;
}
.img{
	width: 50rpx;
	height: 50rpx;
	margin-right: 10rpx;
}
.chatr{
	display: flex;
	margin-left: 60%;
	margin-top: 10rpx;
}
.xianshiyonhu{
	height: 100rpx;
	width: auto;
}
.user{
	display: flex;
}
.inputmsg{
	width: 100%;
	height: 60rpx;
	border: 2rpx solid #3C3E49;
}
</style>
