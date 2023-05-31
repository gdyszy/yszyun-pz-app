import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'
var t = require("@/api.js");
Vue.prototype.$websiteUrl = t.uurl;

Vue.prototype.commHttpRequest = function(url, params, method, loading = true, callback, needToken = true) {
	let date = Math.round(new Date() / 1000);
	let token = uni.getStorageSync('token');
	let header = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'timestamp': date,
		'token': token
	}
	uni.request({
		url: t.uurl + '/api' + url,
		method: method,
		header: header,
		data: params,
		success: res => {
			if (res.data.code === 10000) {
				callback(res);
			} else if (res.data.code === 10399) {
				uni.showToast({
					title: '您未登录,请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}else if (res.data.code === 10390) {
			}else if (res.data.code === 10001) {
				uni.showModal({
					title:res.data.msg
				})
			}else {
				
				uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000,	
							});		
			}
			uni.hideLoading()
		},
		fail: (err) => {
			uni.hideLoading()
			uni.showToast({
				title: err,
				icon: 'none'
			});
		}
	});
}
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif



Vue.prototype.setData = function(obj) {
	let that = this;
	let keys = [];
	let val, data;
	Object.keys(obj).forEach(function(key) {
		keys = key.split('.');
		val = obj[key];
		data = that.$data;
		keys.forEach(function(key2, index) {
			if (index + 1 == keys.length) {
				that.$set(data, key2, val);
			} else {
				if (!data[key2]) {
					that.$set(data, key2, {});
				}
			}
			data = data[key2];
		})
	});
}
// 时间戳转时间
Vue.prototype.mgetData = function(time) {
	let now = new Date(time * 1000),
		y = now.getFullYear(),
		m = now.getMonth() + 1,
		d = now.getDate();
	return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
// 封装showToast
Vue.prototype.remindMsg = function(title) {
	uni.showToast({
		title:title,
		icon: 'none',
		duration: 2000,
	});
}
Vue.prototype.compareVersion = function(v1, v2) {
	const v1s = v1.split('.');
	const v2s = v2.split('.');
  
	const maxLenth = Math.max(v1s.length, v2s.length);
	while (v1s.length < maxLenth) {
		v1s.push('0')
	}
	while (v2s.length < maxLenth) {
		v2s.push('0')
	}
  
	for(let i = 0; i < maxLenth; i++) {
		const v1Num = parseInt(v1s[i])
		const v2Num = parseInt(v2s[i])
		if (v1Num > v2Num) {
			return 1
		}
	}
	return 0
}

