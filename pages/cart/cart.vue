<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!--收货地址区域-->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"> </uni-icons>
		  <!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!---购物车商品列表-->
		<!-- uni-swipe-action 是最外层包裹性质的容器 -->
		<uni-swipe-action>
		<block v-for="(item,index) in cart" :key="index">
			<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
			<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
				<my-goods :goods="item" :showRadio="true" @radiochange="radiochange" :show-num="true" @numchange="numchange"></my-goods>
			</uni-swipe-action-item>
		</block>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
	    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
	    <text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import badgeMix from '@/mixins/tabbar-badge.js'	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				options: [{
				      text: '删除', // 显示的文本内容
				      style: {
				        backgroundColor: '#C00000' // 按钮的背景颜色
				      }
				    }]
			};
		},
		computed:{
			...mapState('m_cart', ['cart'])
		},
		methods:{
			...mapMutations('m_cart', ['updatestate','updatcount','removegoods']),
			radiochange(e){
				this.updatestate(e)
			},
			numchange(e){
				this.updatcount(e)
			},
			swipeActionClickHandler(item) {
			  this.removegoods(item.goods_id)
			}
		}
 
	}
</script>

<style lang="scss">
.cart-title{
	
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;	
	.cart-title-text{
		margin-left: 10 px;
	}
}
.goods-item {
  // 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;
  // 设置盒模型为 border-box
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
}
.cart-container{
	padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
