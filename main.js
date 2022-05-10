import Vue from 'vue'
import App from './App'
import request from 'util/request.js'
import store from 'store/store.js'
Vue.prototype.$request = request

import GoEasy from './lib/goeasy-2.4.6.min.js';

const goEasy = GoEasy.getInstance({
	host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey:"BC-522277e27cac4bba897e825fbfdb329d",// common key
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
	allowNotification:true, //仅有效于app，小程序和H5将会被自动忽略
	modules: ['pubsub'],
});

Vue.prototype.goEasy = goEasy;

/****
 * 点击APP通知栏消息触发，请将APP安装在手机上体验
 * 可根据消息数据，执行不同的业逻辑，比如跳转到不同的页面，或显示不同的内容
 */
goEasy.onClickNotification((notificaionMessage) => {
	console.log("User clicked the notification:", notificaionMessage);
});


goEasy.connect({
	onSuccess: function(){
		console.log("GoEasy connect successfully.")
	},
	onFailed: function(error){
		console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
		uni.showModal({
			title: error.code.toString(),
			content: error.content,
			showCancel: false,
			duration: 6000
		})
	},
	onProgress: function(attempts){
		console.log("GoEasy is connecting", attempts);
	}
});


App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})


//格式化时间
Date.prototype.formatDate = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if(o.hasOwnProperty(k)){
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	return fmt;
};
app.$mount()
