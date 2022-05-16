<script>
	export default {
		globalData:{

        },
        onLaunch: function() {

            //为了支持nvue能读到全局对象. 如果不需要支持nvue，main.js里挂在Vue.prototype,其他页面通过this.goEasy就可以获取
            this.globalData.goEasy = this.goEasy;
            console.log("App onLaunch");
        },
        onShow: function() {
            console.log('App Show');
        },
        onHide: function() {
            console.log('App Hide')
        }
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
@import "/static/iconfont.css";
</style>
