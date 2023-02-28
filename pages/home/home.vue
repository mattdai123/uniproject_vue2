<template>
	<view class="fatherbox">
		<!-- 使用自定义的搜索组件 -->
		<view class="search-box">
		  <my-search @click="gotoSearch"></my-search>
		</view>	
		<!--轮播图区域-->
		<swiper :indicator-dots="true" autoplay="true" :interval="2000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator  class="swiperimage" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>	
		<!--导航图区域-->
		<view class="navlist"> 
			<view class="navlist-item" v-for="(item,index) in navlist" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-image"></image>			
			</view>
		</view>		
		<!--楼层区域-->
		<view class="floor-list">
		  <!-- 楼层 item 项 -->
		  <view class="floor-item" v-for="(item, i) in floorlist" :key="i">
		    <!-- 楼层标题 -->
		    <image :src="item.floor_title.image_src" class="floor-title"></image>
			<!--楼层图片区域-->
			<view class="floor-img-box">
				<!--左侧单独大盒子-->
				<navigator class="image-left" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				</navigator>
				<!--右侧四个小盒子-->
				<view class="image-right" >
					<navigator class="image-right-item" v-for="(item2,index) in item.product_list" :key="index" v-if="index!==0" :url="item2.url">
						<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
					</navigator >
					
				</view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navlist:[],
				floorlist:[]
			};
		},
		onLoad(){
			this.getswiperlist();
			this.getnavlist();
			this.getfloorlist()
		},
		methods:{
			async getswiperlist(){
				const res = await  uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res.data)
				if(res.data.meta.status ==200){
					this.swiperList=res.data.message;
					
				}else{
					return uni.$showMsg()
					
				}
			},
			async getnavlist(){
				const res =await uni.$http.get('/api/public/v1/home/catitems')
				if(res.data.meta.status ==200){
					this.navlist=res.data.message;
					
				}else{
					return uni.$showMsg()
					
				}
			},
			async getfloorlist(){
				const res =await uni.$http.get('/api/public/v1/home/floordata')
				//对数据进行处理
				 res.data.message.forEach(floor => {
				    floor.product_list.forEach(prod => {
				      prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				    })
				  })
				if(res.data.meta.status ==200){
					this.floorlist=res.data.message;
					
				}else{
					return uni.$showMsg()
					
				}
			},
			// nav-item 项被点击时候的事件处理函数
			navClickHandler(item) {
			  // 判断点击的是哪个 nav
			  if (item.name === '分类') {
			    uni.switchTab({
			      url: '/pages/cate/cate'
			    })
			  }
			}, 
			gotoSearch() {
		     uni.navigateTo({
		       url: '/subpkg/search/search'
		     })
		   }
		}
	}
</script>

<style lang="scss">
.fatherbox{
	font-size: 0px;
}
swiper{
	height: 330rpx;
	
	.swiperimage,
	image{
		width: 100%;
		height: 100%;
	}
}
.navlist{
	display: flex;
	justify-content: space-around;
	margin: 15px, 0rpx;
	
	.nav-image{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.image-right{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box{
	display: flex;
	padding-left:10rpx;
}
.search-box{
	position: sticky;
	top: 0px;
	z-index: 99999;
	
}

</style>
