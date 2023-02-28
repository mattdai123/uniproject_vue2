<template>
<view class="goods-list">
  <view v-for="(item, i) in goodlist" :key="i" @click="gotodetail(item)">
    <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
    <my-goods :goods="item"></my-goods>
  </view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				//定义需要传入的参数对象
				queryobj:{
					//查询关键词
					query:'',
					//商品分类id
					cid:'',
					//页码值
					pagenum:1,
					//每页显示数据条数
					pagesize:10,
				},
				goodlist:[],
				total:0,
				 // 是否正在请求数据
				isloading: false
				
				}
			},
			onLoad(options) {
			  // 将页面参数转存到 this.queryObj 对象中
				this.queryobj.query = options.query || ''
				this.queryobj.cid = options.cid || ''
				this.getgoodlist()
		},
		methods:{
			// 获取商品列表数据的方法
			async getgoodlist(cb) {
				this.isloading = true
			    // 发起请求
			    const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryobj)
			    if (res.meta.status !== 200) return uni.$showMsg()
			    // 为数据赋值
			    this.goodlist = [...this.goodlist, ...res.message.goods]
			    this.total = res.message.total
				this.isloading = false
				cb&&cb()
			  },
			  gotodetail(item) {
			    uni.navigateTo({
			      url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			    })
			  }
		},
		onReachBottom(){
			// 判断是否还有下一页数据
			if (this.queryobj.pagenum * this.queryobj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')	
			  // 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			this.queryobj.pagenum+=1
			this.getgoodlist()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
		  // 1. 重置关键数据
		  this.queryobj.pagenum = 1
		  this.total = 0
		  this.isloading = false
		  this.goodlist = []
		
		  // 2. 重新发起请求
		  this.getgoodlist(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
