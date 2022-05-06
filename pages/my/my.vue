<template>
  <view>
    
    <view v-if="user == null" class="loginClass" @click="getUserP">
      <view class="logoBox">
        <image src="../../static/temp/wxlogin.png" class="logoImage"></image>
        <text  class="yijiandenglu">微信一键登录</text>
      </view>
    </view>
    
    
    <view v-else>
     <view class="my-userinfo-container">
       <!-- 头像和昵称区域 -->
       <view class="top-box">
         <image :src="user.ua" class="avatar"></image>
         <view class="nickname">{{user.uname}}</view>
       </view>
     
       <!-- 面板区域 -->
       <view class="panel-list">
         <!-- 第1个面板 -->
         <view class="panel">
           <view class="panel-body">
             <view class="panel-item" @click="goToMyCart">
               <text>8</text>
               <text>我的购物车</text>
             </view>
             <view class="panel-item">
               <text>14</text>
               <text>主页</text>
             </view>
             <view class="panel-item">
               <text>18</text>
               <text>关注的商品</text>
             </view>
             <view class="panel-item">
               <text>84</text>
               <text>足迹</text>
             </view>
           </view>
         </view>
     
         <!-- 第2个面板 -->
         <view class="panel">
           <view class="panel-title">
             我的管理
           </view>
           <view class="panel-body">
             
             <view class="panel-item">
               <image src="../../static/temp/wodefabu.png" class="icon"></image>
               <text>我的发布</text>
             </view>
             <view class="panel-item" @click="getoQiugou">
               <image  class="icon" src="../../static/temp/fabuxuqiu.png"></image>
               <text>求购商品</text>
             </view>
             <view class="panel-item" @click="gettoliuyan">
               <image  src="../../static/temp/wxlogin.png" class="icon"></image>
               <text>留言状态</text>
             </view>
             <view class="panel-item" @click="goToOrder(user.uid)">
               <image src="../../static/temp/dindan.png" class="icon"></image>
               <text>全部订单</text>
             </view>
           </view>
         </view>
         
         <!-- 第3个面板 -->
         <view class="panel">
           <view class="panel-list-item" @click="gotoMyAdress">
             <text>收货地址</text>
             <uni-icons type="arrowright" size="15"></uni-icons>
           </view>
           <view class="panel-list-item" @click="gotoTest">
             <text>给开发者留言</text>
             <uni-icons type="arrowright" size="15"></uni-icons>
           </view>
           <view class="panel-list-item" @click="exitLogin">
             <text>退出登录</text>
             <uni-icons type="arrowright" size="15"></uni-icons>
           </view>
         </view>
        
         
         <view class="message">
           ---------------------------
         </view>
        
        
       </view>
       
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
      return{
        userinfo:[],
      }
    },
    onLoad(e) {
		console.log("------------")
		console.log(e)
    },
    
    methods:{
      ...mapMutations('m_user',['userLogin','removeUser']),
      async getInfo(userInfo){
       let res =await this.$request("/wxLogin",userInfo)
       console.log(res)
       this.userinfo = res
       this.userLogin(this.userinfo)
      },
      getUserP(){
        const _this = this
        uni.getUserProfile({
         desc:"登录",
          success:(res)=>{
           _this.getInfo(res.userInfo)
          }
        })
      },
      exitLogin(){
        this.removeUser()
      },
	  gettoliuyan(){
		uni.navigateTo({
			url:'../../subpackage/mymessage/mymessage?id='+this.user.uid
		})  
	  },
      //订单
      goToOrder(uid){
        uni.navigateTo({
          url:'../../subpackage/order/order?uid='+uid
        })
      },
      goToMyCart(){
        console.log("-----------")
        uni.reLaunch({
          url:'../cart/cart'
        })
      },
	  gotoMyAdress(){
		  uni.navigateTo({
		  	url:'../../subpackage/myAdress/myAdress?uid='+this.user.uid
		  })
	  },
	  gotoTest(){
		  uni.navigateTo({
		  	url:'../../subpackage/test/test'
		  })
	  },
	  getoQiugou(){
		  uni.navigateTo({
		  	url:'../../subpackage/qiugou/qiugou'
		  })
	  }
    },
    
	};
</script>

<style lang="scss">
  .loginClass{
   width: 100%;
   height: 100%; 
  }
  .yijiandenglu{
    padding-left: 28rpx;
  }
  .logoImage{
    width: 250rpx;
    height: 250rpx;

  }
  .logoBox{
    padding: 250rpx;
    }
 
 .my-userinfo-container {
   height: 100%;
   background-color: #F4F4F4;
 
   .top-box {
     height: 400rpx;
     background-color: #F5F5F5;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
 
     .avatar {
       width: 90px;
       height: 90px;
       border-radius: 45px;
       border: 2px solid #FFF;
       box-shadow: 0 1px 5px black;
     }
 
     .nickname {
       font-size: 16px;
       color: #FFF;
       font-weight: bold;
       margin-top: 10px;
     }
   }
 }
 
 .panel-list {
   padding: 0 10px;
   position: relative;
   top: -10px;
 
   .panel {
     background-color: white;
     border-radius: 3px;
     margin-bottom: 8px;
 
     .panel-title {
       line-height: 45px;
       padding-left: 10px;
       font-size: 15px;
       border-bottom: 1px solid #F4F4F4;
     }
 
     .panel-body {
       display: flex;
       justify-content: space-around;
 
       .panel-item {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: space-around;
         padding: 10px 0;
         font-size: 13px;
 
         .icon {
           width: 35px;
           height: 35px;
         }
       }
     }
   }
 }
 
 .panel-list-item {
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 15px;
   padding: 0 10px;
   line-height: 45px;
 }
</style>