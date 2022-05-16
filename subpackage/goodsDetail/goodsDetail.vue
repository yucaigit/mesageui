<template>
	<view>
   <!-- 轮播图区域 -->
   <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
     <swiper-item v-for="(item,i) in goodsImg" :key="i">
       <image :src="item.imgSrc"  @click="preview(i)"></image>
     </swiper-item>
   </swiper>
   <!-- 商品信息区域 -->
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="price">￥{{goods.gprice}}</view>
     <!-- 信息主体区域 -->
     <view class="goods-info-body">
       <!-- 商品名称 -->
       <view class="goods-name">{{goods.gname}} | {{goods.gdescribe}}</view>
       <!-- 收藏 -->
     </view>
     <!-- 运费 -->
     <view class="yf">快递：免运费</view>
   </view>
   <!-- 商品导航组件 -->
   <view class="goods_nav">
     <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
   </view>
   <!-- 评价 -->
   <view @click="getCommit">
     <view class="eva-section">
     	<view class="e-header">
     		<text class="tit">留言</text>
     		<text>({{messages.length}})</text>
     		<text class="tip">回复 100%</text>
     		<text class="yticon icon-you"></text>
     	</view> 
		
		
     	<view class="eva-box" v-for="(item,i) in messages" :key="i">
     		<view class="right">
     			<text class="name">{{item.buyname}}</text>
     			<text class="con">{{item.message}}</text>
     			<view class="bot">
     				<text class="attr"></text>
     				<text class="time">{{item.buytime}}</text>
     			</view>
     		</view>
     	</view>
		<view style="height: 500rpx;"></view>		
     </view>
   </view>
   
   <uni-popup ref="popup" type="bottom" background-color="#fff">
	   <view class="">
		   <view class="address-msg">
		     <view class="item-msg">留言</view>
		     <view class="section">
		       <input type="text" placeholder="请输入留言" :value="msg" @input="msgfunction"  placeholder-class="phcolor"></input>
		     </view>
		   </view>
	   </view>
	   <view class="tijiaoliuyan" @click="submitliuyan">
		   <button type="warn">提交</button>
	   </view>
   </uni-popup>
</view>
</template>
<script>
  import { mapState , mapMutations ,mapGetters} from 'vuex'
	export default {
    computed:{
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total']),
      ...mapState('m_user',['user'])
    },
    watch: {
       // 定义 total 侦听器，指向一个配置对象
       total: {
          // handler 属性用来定义侦听器的 function 处理函数
          handler(newVal) {
             const findResult = this.options.find(x => x.text === '购物车')
             if (findResult) {
                findResult.info = newVal
             }
          },
          // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
          immediate: true
       }
    },
		data() {
			return {
        request_id:0,
        goods:[],
        goodsImg:[],
		msg:'',
		messages:[],
		current:1,
        options: [{
              icon: 'shop',
              text: '留言'
            }, {
              icon: 'cart',
              text: '购物车',
              info: 0
            }],
            // 右侧按钮组的配置对象
            buttonGroup: [
              {
                text: '加入购物车',
                backgroundColor: '#ffa200',
                color: '#fff'
              },
              {
                text: '立即购买',
                backgroundColor: '#ff0000',
                color: '#fff'
              }
            ]
			};
		},
    
    onLoad(options) {
      this.request_id = options.query
      this.getGoodsDetail()
	  this.getAllMessage()
	
	  this.addHistory(this.user.uid,this.request_id)
    },
    methods:{
      ...mapMutations('m_cart',['addToCart']),
      
	  async submitliuyan(){
		if(this.msg=='') return
		let result =  await this.$request('/submsg?msg='+this.msg+'&&goodsid='+this.request_id+'&&buyid='+this.user.uid)
		if(result){
			uni.showToast({
				title:'留言成功'
			})
			this.getAllMessage()
		}
	  },
	  msgfunction(e){
		  setTimeout(()=>{
			 this.msg = e.detail.value 
		  },1000)
	  },
	  open(){
		  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
		  this.$refs.popup.open('popup')
		  
		},
	  async getAllMessage(){
		let result = await this.$request('/getMessage',{goodsid:this.request_id})
		this.messages = result
		
	  },
	  
      async getGoodsDetail(){
        let result = await this.$request('/getGoodsDetail',{g_id:this.request_id});
        this.goods = result
        this.goodsImg = result.imgs
      },
      // 点击图片放大
      preview(i){
        uni.previewImage({
          current:i,
          urls:this.goodsImg.map(x=>x.imgSrc)
        })
      },
      
      // 左侧按钮的点击事件处理函数
      onClick(e) {
        if (e.content.text === '购物车') {
          // 切换到购物车页面
          uni.switchTab({
            url: '../../pages/cart/cart'
          })
        }
		if (e.content.text === '留言'){
			console.log("----")
			this.open()
		}
      },
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
        //这边应该判断是否登录操作
        if(this.user == null){
          uni.showToast({
            title:'请先登录',
          });
          uni.reLaunch({
            url:'../../pages/my/my'
          })
        }
         // 1. 判断是否点击了 加入购物车 按钮
         if (e.content.text === '加入购物车') {
           const goods = {
             goodsId:this.goods.gid,
             goodSName:this.goods.gname,
             goodsPrice:this.goods.gprice,
             goodsCount:1,
             goodsLogo:this.goods.gimg1,
             goodsTate:true
           }
           this.addToCart(goods)
         }
		 if(e.content.text == '立即购买'){
			 uni.showModal({
			 	title: '提示',
			 	content: '是否购买？',
			 	cancelText: "取消", // 取消按钮的文字  
			 	confirmText: "确认", // 确认按钮的文字  
			 	showCancel: true, // 是否显示取消按钮，默认为 true
			 	confirmColor: '#f55850',
			 	cancelColor: '#39B54A',
			 	success: (res) => {
			 	if(res.confirm) {
					console.log(this.goods)
			 		// uni.navigateTo({
			 		// 	url:'../wxPay/wxPay?goodsId='+this.goods.gid
			 		// })
					uni.navigateTo({
						url:'../wxpay/wxpay?goodsId='+this.goods.gid
					})
			 	} else {  
			 		console.log('cancel') //点击取消之后执行的代码
			 		}  
			 	} 
			 })
		 }
      },
      // 查看评论方法
      getCommit(){
        // console.log(this.request_id)
      },
      
      async addHistory(a,b){
		let result = await this.$request('/addHistory',{uid:a,goodsid:b})  
	  }
      
    }
	}
</script>

<style lang="scss">

swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.liuyan{
	height: 250rpx;
	width: 700rpx;
	background-color: #FFFFFF;
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
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
  .eva-box{
  	display: flex;
  	padding: 20rpx 0;
  	.portrait{
  		flex-shrink: 0;
  		width: 80rpx;
  		height: 80rpx;
  		border-radius: 100px;
  	}
  	.right{
  		flex: 1;
  		display: flex;
  		flex-direction: column;
  		font-size: 20rpx;
  		color: #007AFF;
  		padding-left: 26rpx;
  		.con{
  			font-size: 20rpx;
  			color: #333333;
  			padding: 20rpx 0;
  		}
  		.bot{
  			display: flex;
  			justify-content: space-between;
  			font-size: 25rpx;
  			color:#007AFF;
  		}
  	}
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
</style>

