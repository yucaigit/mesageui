<template>
	<view class="content">
		<view class="header">
			<text>欢迎来到小程序社区服务聊天频道</text>
		</view>

		
		<scroll-view scroll-y>
			
		
		
		<view class="message-content">
			<view class="message-text" v-for="(msg, index) in messages" :key="index">
				<view class="netcontent">
					<text class="wxname">{{msg.name}}   :</text><text class="wxdata">{{msg.data}}</text>
				</view>
			</view>
		</view>
		</scroll-view>
		
		<!--  -->
		<view>
			
		</view>
		
		<view class="send-box">
			<input v-model="message"/>
			<text @click="sendMessage">发送</text>
		</view>
		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
	let goEasy = getApp().globalData.goEasy;
	let pubSub = goEasy.pubsub;
	export default {
		computed:{
		  ...mapState('m_user',['user'])
		},
		data() {
			return {
				message: "",//发送的消息内容
				
				messages: [], //接收到的消息列表
				
			
			}
		},
		watch:{

		},
		onLoad() {
			let self = this;
			pubSub.subscribe({
				// 这里的chan 以将用户的id或者uuid来作为channel。
				channel: "my_channel",
				onMessage: function (message) {
					self.unshiftMessage(message.content)
				},
				onSuccess: function () {
					self.unshiftMessage('上线啦')
				},
				onFailed: function (error) {
					self.unshiftMessage("订阅失败，错误编码："+error.code+" 错误信息："+error.content);
				}
			});
		},
		methods: {
			sendMessage() {//发消息

				if(this.message.trim() != "") {
					let self = this;
					let body = this.message;
					if(this.message.length >= 50){
						body = this.message.substring(0,30)+"...";
					}
					pubSub.publish({
						channel: "my_channel",
						message: this.message,
						//只要接收端APP参数以及GoEasy控制台参数正确配置，并且allowNotification为true，就可以接收通知栏提醒
						//若不需要通知栏提醒，可以直接删掉notification
						notification: {
							title: "收到一条新消息",
							body: body      // 字段最长50字符
						},
						onSuccess: function () {
							self.message = ''; //清空发送消息内容
						},
						onFailed: function (error) {
							self.unshiftMessage("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
						}
					});
				}
			},
			unshiftMessage(content) {
				var formattedTime = this.formatDate(new Date(), "hh:mm");
				// 消息格式
				//var message = formattedTime +":"+ content;
				//this.messages.unshift(message);
				// 反转数组即可
				//this.messages.unshift(message);
				var message = {
					time:formattedTime,
					name:this.user.uname,
					data:content
				}
				this.messages.push(message)
				console.log(this.user)
			},
			
			
			formatDate(date, format){
				var o = {
					"M+": date.getMonth() + 1,
					"d+": date.getDate(),
					"h+": date.getHours(),
					"m+": date.getMinutes(),
					"s+": date.getSeconds(),
					"q+": Math.floor((date.getMonth() + 3) / 3),
					"S": date.getMilliseconds()
				};
				if (/(y+)/.test(format))
					format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if(o.hasOwnProperty(k)){
						if (new RegExp("(" + k + ")").test(format))
							format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
					}
				return format;
			}
		}
	}
</script>r

<style>
	.content {
		padding: 20rpx 20rpx 20rpx 20rpx;
		font-family: Source Han Sans CN;
		width:100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #D02129;
		margin-top: 10px;
	}

	.header .title {
		height: 25px;
		line-height: 25px;
		font-size: 24px;
	}

	.header .description {
		height: 25px;
		line-height: 25px;
		font-size: 28px;
		font-weight: bold;
		margin-top: 10px;
	}

	.send-box {
		display: flex;
		flex-direction: row;
		height: 40rpx;
		margin-top: 32rpx;
		margin-bottom: 32rpx;
	/* //	position:fixed;  // 使按钮固定于可视窗口的底部 */
	margin-top: 60%;
	}

	.send-box input {
		flex-grow: 1;
		background: #EFEFEF;
		border: 1rpx solid #C8C7CC;
		border-radius: 6rpx;
		padding: 8rpx;
	}

	.send-box text {
		color: #D02129;
		margin-left: 9px;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		width: 40px;
		text-align: right;
	}

	.message-content {
		height: 500rpx;
		background: #FFFFFF;
	
		margin-top: 26px;
	}

	.message-text {
		padding: 4px 11px;
		display: flex;
	}
	.img{
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}
	.wxname{
		font-size: 20rpx;
		font-weight: 10;
	}
	.wxdata{
		margin-left: 20rpx;
	}

</style>
