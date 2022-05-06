<template>
	<view>
    <!--  为自定义组件绑定 @click事件  需要在组件 封装一个@click事件-->
    <my-search @click="gotoSearch"></my-search>
    
		<view class="scroll-view-container">
		      <!-- 左侧的滚动视图区域 -->
		      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
		        <block v-for="(item,i) in cateList" :key="i">
               <view :class="['left-scroll-view-item',i==active?'active':'']" @click="activeChanged(i)">{{item.aname}}</view>
            </block>
		       
		      </scroll-view>
		      <!-- 右侧的滚动视图区域 -->
		      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
                <view class="cate-lv2" >
               <view class="cate-lv2-title"> /</view>
               <!-- 动态渲染三级分类的列表数据 -->
                   <view class="cate-lv3-list">
                     <!-- 三级分类 Item 项 -->
                     <view class="cate-lv3-item" v-for="(item2, i2) in cateLevel2" :key="i2" @click="gotoGoodsList(item2)">
                       <!-- 图片 -->
                       <image :src="item2.gimg1"></image>
                       <!-- 文本 -->
                       <text>{{item2.gname}}</text>
                     </view>
                   </view>
            </view>
		      </scroll-view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
        wh:0,
        cateList:[],
		title:'',
        active:0,
        cateLevel2: [],
        scrollTop:0
			};
		},
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight-50
      this.getCateList()
    },
    methods:{
      async getCateList(){
        let result  =await this.$request('/getsortList')
		this.cateList = result
        // 为二级分类赋值
		this.cateLevel2 = result[0].goodsList
		console.log(result)
        
      },
      activeChanged(i){
        this.active = i
        this.cateLevel2 = this.cateList[i].goodsList
        
        this.scrollTop=this.scrollTop==0?1:0
      },
      gotoGoodsList(item2){
		console.log(item2)
        uni.navigateTo({
          url:'../../subpackage/goodsDetail/goodsDetail?query='+item2.gid
        })
      },
      // 搜索事件 函数
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
