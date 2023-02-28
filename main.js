
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//导入网络请求包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

//请求拦截器
$http.beforeRequest = function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
}
//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}

//封装弹窗
uni.$showMsg=function(title='数据请求失败', duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif