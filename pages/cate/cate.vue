<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-box">
			<!--左侧滑动区域-->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,index) in catelist" :key="index">
					<view :class="['left-scroll-item', index === active?'active' :' ']" @click="activechange(index)">{{item.cat_name}}</view>
				</block>					
			</scroll-view>
			<!--右侧滑动区域-->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrolltop">
				<view class="catelv2" v-for="(item2,index2) in catelistlv2" :key="index2">
					<view class="catelv2-title">
						/{{item2.cat_name}}/
					</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="catelv3-list">
					      <!-- 三级分类 Item 项 -->
						  <view class="catelv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							  <image :src="item3.cat_icon"></image>
							  <text>{{item3.cat_name}}</text>
						  </view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				wh:0,
				catelist:[],
				active:0,
				catelistlv2:[],
				scrolltop:0
			};
		},
		onLoad(){
			const res=uni.getSystemInfoSync()
			this.wh=res.windowHeight-50,
			this.getcatelist()		
		},
		methods:{
			async getcatelist(){
				const res =await  uni.$http.get('/api/public/v1/categories')
				
				if(res.data.meta.status ==200){
					this.catelist=res.data.message;
					//为二级分类赋值
					this.catelistlv2=res.data.message[0].children
					
				}else{
					return uni.$showMsg()
			}
		},
		activechange(index){
			this.active=index
			//重新为二级分类赋值
			this.catelistlv2=this.catelist[index].children
			// 让 scrollTop 的值在 0 与 1 之间切换
			this.scrolltop = this.scrolltop === 0 ? 1 : 0

		},
		gotoGoodsList(item3){
			uni.navigateTo({
			    url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
			  })
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
.scroll-view-box{
	display: flex;
	.left-scroll{
		width: 120px;
		.left-scroll-item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			
			&.active{
				background-color: #ffffff;
				position: relative;
				
				&::before{
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50% );
				}
			}
		}		
	}
}
.catelv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.catelv3-list{
	display: flex;
	flex-wrap: wrap;
	.catelv3-item{
		width: 33.33%;
	    margin-bottom: 10px;
	    display: flex;
	    flex-direction: column;
	    align-items: center;

		image{
			width: 60px;
			height: 60px;
			border-radius: 10px;
		}
		text{
			font-size: 12px;
		}
	}
}

</style>
