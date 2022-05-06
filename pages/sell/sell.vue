<template>
	<view>
    <!-- 内容区域 -->
      <view class="section">
        <form @submit="bindFormSubmit">
          <view class="title">
            <view class="quxiao" @click="casale">
              <text class="quxiaotext">取消</text>
            </view>   
          <view class="buttonm">
          <button class="view-biankuang" > 存草稿 </button>
          <button class="view-biankuang2" form-type="submit"> 发布 </button>
          </view>
          </view>
          <textarea placeholder="请对您的商品加以描述!......" name="textarea"/>
          <text>添加商品图片,最多可添加三张哦</text>
          <!-- 添加图片-->
          <view class="tupianwaibian">
          <view class="tupianquyu" v-if="imgs.length !=0" v-for="(item,i) in imgs" :key="i">
            <image :src="item"  class="tupian"/>
          </view>
          <view class="tupianquyu">
              <image @click="upload" class="tianjiatupian" src="../../static/temp/tianjiatupian.png" />
          </view>
          </view>
          <!-- 地址区域-->
          <view class="dizhiquyu">
            <image src="../../static/temp/adress.png" class="dizhitubiao" @click="getLocation"/>
            <view class="shurudizhi">
               <input type="text" placeholder="请输入地址" :value='adress' name="adress"/>
            </view>
            <input name="goodsName" class="goodsName" placeholder="商品名称"/>
            <input name="price" class="goodsName" placeholder="商品价格$若想置换其它物品请填写其他物品名称" style="color: #DD524D;"/>
          </view> 
          <view>-------------------</view>
          <view class="fenlei">
            <uni-section title="商品类别" subTitle="点击选择" type="line">
            	<view class="example-body">
            		<uni-combox :border="false" :candidates="candidates" placeholder="选择商品类型" v-model="attribute"></uni-combox>
            	</view>
            </uni-section>
          </view>
        </form>
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
        candidates: ['书籍', '食物', '衣服', '鞋子', '家电', '手机', '电脑','玩具','其它'],
        attribute: '',
        imgs:[],
        adress:''
			}
		},
		onShow(res) {
		},
    methods:{
		casale(){
			uni.switchTab({
				url:'../index/index'
			})
		},
      getLocation(){
        const _this = this
        uni.chooseLocation({
          success(res) {
            _this.adress = res.address
          }
        })
      },
      upload(){
        if(this.imgs.length<=2){
          const _this = this
          uni.chooseImage({
            success(res) {
              _this.imgs.push(res.tempFilePaths)
            }
          })
        }else{
          uni.showToast({
            title:'不可在添加了哦'
          })
        }

      },
      async saveGoodsAndImgs(){
        let result = await this.$request('/saveGoods')
        if(result){
          uni.switchTab({
            url:'../index/index',
			success(res) {
				const currentPage = getCurrentPages().pop()
			    console.log(currentPage)
				if(currentPage == undefined || currentPage==null) return;
				currentPage.onLoad();
			}
          })
          
        }
      },
      // 记得后期封装
       bindFormSubmit:function(e){

        const uid = this.user.uid
        const textarea = e.detail.value.textarea
        const adress = e.detail.value.adress
        const goodsName = e.detail.value.goodsName
        const price = e.detail.value.price
        const attribute = this.attribute
        if(textarea.length == 0){
          uni.showToast({
            title:'请填写商品信息!',
            duration:2000
          })
          return 
        }
        if(adress.length == 0){
          uni.showToast({
            title:'请添加地址!',
            duration:2000
          })
          return
        }
        if(goodsName.length==0){
          uni.showToast({
            title:'请添加商品名称!',
            duration:2000
          })
          return
        }
        if(price.length==0){
          uni.showToast({
            title:'请填写商品价格!'
          })
        }
        for(var i=0;i<this.imgs.length;i++){
          const img = this.imgs[i]
          // 记得封装
          uni.uploadFile({
            url:'http://127.0.0.1:8080/upload',
            filePath:img[0],
            name:'file',
            formData:{
              textarea:textarea,
              adress:adress,
              id:uid,
              goodsName:goodsName,
              price:price,
              attribute:attribute
            },
          })
        }

        uni.showLoading({
          title:"商品正在发布!"
        });
        const _this = this
        setTimeout(function () {
          _this.saveGoodsAndImgs();
        	uni.hideLoading();
        }, 3000);
      }
    }
	}
</script>

<style lang="scss">
.title{
  height: 100rpx;
  width: 100%;
  
 display: flex;
}
.quxiao{
  width: 100rpx;
  display: flex;
}
.quxiaotext{
  margin-top: 30rpx;
}
.buttonm{
  padding-left: 305rpx;
  display: flex;
}
.view-biankuang{
  font-size: 25rpx;
  border: 1rpx solid #D3D3D3;
  margin-top: 30rpx;
  border-radius: 25px;
  height: 50rpx;
  text-align: center;
	}
.view-biankuang2{
  font-size: 25rpx;
  border: 1rpx solid #D3D3D3;
  margin-top: 30rpx;
  border-radius: 25px;
  height: 50rpx;
  text-align: center;
  margin-left: 105rpx;
  border-radius: 25px;	
  border: 1rpx solid #F0AD4E;
  background-color: #F0AD4E;
}
.neironquyu{
  height: 300rpx;
  width: 100%;
}

/* 图片区域样式 */
.tupianwaibian{
  display: flex;
}
.tupianquyu{
  display: flex;
}
.tupian{
  height: 180rpx;
  width: 180rpx;
  margin-left: 10rpx;
}
.tianjiatupian{
  height: 180rpx;
  width: 180rpx;
}

.dizhiquyu{
  
}
.dizhitubiao{
  height: 100rpx;
  width: 100rpx;
}
.shurudizhi{
  height: 100rpx;
  width: 100%;

  border-style:solid;
  border-color:#ff0000 #0000ff;
}
.goodsName{
margin-top: 50rpx;
}

</style>

