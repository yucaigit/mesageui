<template>
	<view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索列表 -->
    <view class="sugg-list" v-if="searchResults.length !==0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.gid)">
        <view class="goods-name">{{item.gname}}</view>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historyList" :key="i"  @click="gotoGoodsList(item)"></uni-tag>
      </view>
      
      <!-- 热搜榜 -->
      <view class="history-title">
        <text>热搜榜</text>
      </view>
      <view class="resoubang">
        <view class="resoubox" v-for="(item,i) in resouData" :key="i" @click="gotoDetail(item.g_id)">
          <image class="resouimage" :src="item.g_img1"></image>
          <view class="resouTextBox">
            <text class="resoutext1">{{item.g_name}}</text>
            <text class="resoutext2">{{item.g_describe}}</text>
          </view>
        </view>
        
       
      </view>
      
    </view>
	</view>
</template>

<script>
  import request_ from '../../util/request.js'
	export default {
    computed:{
      // 这个计算属性就是将搜索历史反转
      historys(){
        return [...this.historyList].reverse()
      }
    },
		data() {
			return {
        // 防抖
        // 延时器的 timerId
         timer: null,
         // 搜索关键词
         kw: '',
         
         // 搜索结果列表
         searchResults: [],
         
         // 搜索建议 历史搜索
         historyList: ['a', 'b', 'apple'],
         
         // 热搜榜数据
         resouData:[],
			};
		},
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
      // 得到热搜榜数据
      this.getResouData()
    },
    methods:{
      // 输入框
      input(e) {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e.value
          this.getSearchList()
        }, 800)
      },
      /* 根据Kw  得到搜所列表*/
      async getSearchList(){
        // 判断kw
        if(this.kw == ''){
          this.searchResults=[]
          return
        }
        let result = await this.$request("/search",{query:this.kw});
        this.searchResults = result;
        
        // 将存储关键词到历史
        this.savaSearchHistpory()
      },
      // 点击搜索的数据跳转到商品详情页面去
      gotoDetail(g_id){
        uni.navigateTo({
          url:'../goodsDetail/goodsDetail?query='+g_id
        })
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'../goodsList/goodsList?query='+item
        })
      },
      // 保存关键字到历史列表中
      savaSearchHistpory(){
        //this.historyList.push(this.kw);
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList =  Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 清空历史关键字
      cleanHistory(){
        this.historyList=[]
        uni.getStorageSync('kw','[]')
      },
      // 热搜榜数据
      async getResouData(){
        let result = await this.$request("/getResou")
        this.resouData = result
      }
    }
	}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
/* 搜索建议列表 */
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
/* 搜索历史区域 */
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    
    .uni-tag {
      margin-top: 5px;
      margin-right: 15px;
      border-radius: 20%;
      
    }
  }
}

// 热搜榜
.resoubang{
  
  .resoubox{
    display: flex;
    padding-bottom: 20rpx;
  }
  .resouimage{
    width: 100rpx;
    height: 100rpx;
   }
   .resouTop{
     color: #DC143C;
   }
   .resouTextBox{
     padding-top: 20rpx;
   }
   .resoutext1{
     
     padding-left: 20rpx;
     text-align: center;
     font-size: 20pxrpx;
   }
   .resoutext2{
     color: #DC143C;
     padding-top: 20rpx;
     font-size: 14rpx;
     padding-left: 25rpx;
     display: flex;
   }
}
</style>
