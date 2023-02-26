<template>
	<view>
		home
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[]
			};
		},
		onLoad(){
			this.getswiperlist()
		},
		methods:{
			async getswiperlist(){
				const res = await  uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">

</style>
