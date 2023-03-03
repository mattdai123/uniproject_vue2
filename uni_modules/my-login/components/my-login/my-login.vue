<template>
	<view class="login-container">
	    <!-- 提示登录的图标 -->
	    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
	    <!-- 登录按钮 -->
	    <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
	    <!-- 登录提示 -->
	    <view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default{
	data(){
		return{
			
		}
	},
	computed:{
		...mapState('m_user', ['redirectInfo']),
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
		
		getUserInfo(e) {		
		        // uni.getUserInfo({		
		        //   provider: 'weixin',		
		        //   success: (info) => {		
		        //     console.log('getUserInfo', info);		
		        //     this.updateUserInfo(info.userInfo)	
		        //     this.getToken(info)		
		        //   },		
		        //   fail: (err) => {		
		        //     if (err.errMsg === 'getUserProfile:fail auth deny') uni.$showMsg('您取消了授权！')		
		        //   }		
		        // })	
		        // 或
	
		        uni.getUserProfile({		
		          desc: '登录后可同步数据',		
		          lang: 'zh_CN',		
		          success: (info) => {		
		            console.log('getUserProfile', info);		
		            this.updateUserInfo(info.userInfo)		
		            this.getToken(info)		
		          },		
		          fail: (err) => {		
		            if (err.errMsg === 'getUserProfile:fail auth deny') uni.$showMsg('您取消了授权！')		
		          }		
		        })
		
		      },		
		      async getToken(info) {
				  // 调用微信登录接口
					const [err, res] = await uni.login().catch(err => err)
					console.log(res)	
				  // 判断是否 uni.login() 调用失败
					if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
					// 准备参数对象
					  // const query = {
					  //   code: res.code,
					  //   encryptedData: info.encryptedData,
					  //   iv: info.iv,
					  //   rawData: info.rawData,
					  //   signature: info.signature
					  // }
					  //请求返回400无法获取token，使用自定的响应
					   //const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
					   //console.log(loginResult)
					   const loginResult2 = {			   		
					       "message": {		
					         "user_id": 12,		
					         "user_email_code": null,		
					         "is_active": null,		
					         "user_sex": "男",		
					         "user_qq": "",		
					         "user_tel": "",		
					         "user_xueli": "本科",	
					         "user_hobby": "",	
					         "user_introduce": null,	
					         "create_time": 1525402223,		
					         "update_time": 1525402223,		
					         "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"		
					       },
					   		
					       "meta": {		
					         "msg": "登录成功",		
					         "status": 200		
					       }		
					   }
					    if (loginResult2.meta.status !== 200) return uni.$showMsg('登录失败！')
						this.updateToken(loginResult2.message.token)	
					    uni.$showMsg('登录成功')
		
						this.navigateBack()
		      },
			  navigateBack() {
			    // redirectInfo 不为 null，并且导航方式为 switchTab
			    if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
			      // 调用小程序提供的 uni.switchTab() API 进行页面的导航
			      uni.switchTab({
			        // 要导航到的页面地址
			        url: this.redirectInfo.from,
			        // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
			        complete: () => {
			          this.updateRedirectInfo(null)
			        }
			      })
			    }
			  }
	}
}
</script>
<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
