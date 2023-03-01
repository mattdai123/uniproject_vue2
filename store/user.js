export default {
	
	namespaced: true,
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
	}),
	mutations:{
		// 更新收货地址
		updateAddress(state, address) {
		    state.address = address
			// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		 // 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
		    uni.setStorageSync('address', JSON.stringify(state.address))
		},
	},
	getters:{
		addstr(state) {
			if (!state.address.provinceName) return ''
				
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
	  
  }