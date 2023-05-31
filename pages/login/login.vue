<template>
	<view>
		<view class="auth">
			<view class="wanl-title">微信绑定登录</view>
			<form>
				<view class="oauth">
					<view :class="item.name" class="cu-avatar lg round bg-white" v-for="(item, key) in providerList" @tap="tologin(item)" :key="key" ></view>
				</view>
				<button class="WeiXinLogin" @tap="tologin(WeiXinLoginMsg)">微信一键登录</button>
				<!-- 同意服务条款 -->
				<checkbox-group :class="checked == 1 ? 'shake-horizontal' : ''" class="auth-clause" @change="CheckboxChange">
					<checkbox class="orange" :class="checked == 2 ? 'checked' : ''" :checked="checked == 2 ? true : false" value="2" />
					<view>
						我已阅读并同意<text @tap="onDetails(1, '服务条款')">用户协议</text>及<text @tap="onDetails(2, '隐私声明')">隐私权保护声明</text>
					</view>
				</checkbox-group>
			</form>
		</view>
	</view>
</template>
<script>
	var t = require("@/api.js");
	import md5 from 'common/md5.js'
	export default {
		data() {
			return {
				providerList: [],
				loginRes: {},
				WeiXinLoginMsg:{
					id:'weixin',
					name:'wlIcon-WeChat',
					platform:'mp_weixin'
				},
				pageroute: '',
				checked: 0,
				isChecked:false,
				loginParams:{
					appkey:'',
					secret:'',
					nonce:'',
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
				},
				
			};
		},
		onLoad() {						
			// 防止刷新登录态，uni.login code提前获取
			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: res => {
					this.loginRes = res;
				},
				fail: err => {
					this.$wanlshop.msg(err.msg);
				}
			});
			// #endif
		},
		methods: {
			onDetails(id, title) {
				uni.navigateTo({
					url: `/pages/service_rule/details?id=${id}&title=${title}`
				})
			},
			CheckboxChange(e) {
				this.checked = e.detail.value;
				this.isChecked = !this.isChecked
			},

			async initParams(){
				let timestamps = this.getTime();
				let nonce = Math.random().toString(36).substr(2);

				await this.commHttpRequest(t.home.getuserinfo, {}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.loginParams.appkey = res.data.app_keys;
						this.loginParams.secret = res.data.secret;
						uni.setStorageSync('app_key',res.data.app_keys);
						uni.setStorageSync('secret',res.data.secret);
						this.loginParams.nonce = nonce;
					}
				})
			},

			getTime(){
				let timestamps = new Date().getTime();
				timestamps = Math.round(new Date().getTime() / 1000).toString();
				return timestamps;
			},

			getSignature(){
				let timestamps = this.getTime();
				let signature = md5('app_key=' + this.loginParams.appkey + '&app_secret=' + this.loginParams.secret + '&nonce=' + this.loginParams.nonce + '&time_stamp=' + timestamps);
				return signature;
			},

			// 第三方登录
			async tologin() {
				if(!this.isChecked){
					uni.showToast({
						title: '请勾选同意选项',
						icon: 'none',
						duration: 2000,
					});
					return
				}
				uni.showLoading({
				    title: '登录中'
				});


				let timestampsOne = this.getTime();
				let signatureOne = this.getSignature();

				// #ifdef APP-PLUS
				uni.login({
					provider: "weixin",
					onlyAuthorize: true, // 微信登录仅请求授权认证
					success:(loginRes)=>{
						//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
						let getData = {
							client_type: 1,
							code: loginRes.code
						}
						
						uni.request({
							url: t.uurl+'/api/v1.login/wechat_login',
							method: 'POST',
							header: {
								'Content-Type': 'application/json',
							},
							data: {
								...getData
							},
							success: (res) => {
								uni.hideLoading();
								if(res.data.code == 10000) {
									uni.setStorageSync('token', res.data.data.token)
									uni.setStorageSync('userinfo', res.data.data.user_info)
									uni.switchTab({
										url: '/pages/tabBar/home/home'
									})
								}else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}
							},
							fail: function(err) {
								// 登录授权失败  
								// err.code是错误码
							}
						})
					}
				})
				// #endif
				// #ifdef MP-WEIXIN
				uni.login({
					provider: "weixin",
					onlyAuthorize: true, // 微信登录仅请求授权认证
					success:(loginRes)=>{
						uni.getUserInfo({
							provider: "weixin",
							success:async (infoRes)=>{
								const {code} = infoRes
												
								//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
								let getData = {
									client_type: 2,
									encrypted_data: infoRes.encryptedData,
									iv: infoRes.iv,
									code: loginRes.code
								}
								
								uni.request({
									url: t.uurl+'/api/v1.login/wechat_login',
									method: 'POST',
									header: {
										'Content-Type': 'application/json',
									},
									data: {
										...getData
									},
									success: (res) => {
										uni.hideLoading();
										if(res.data.code == 10000) {
											uni.setStorageSync('token', res.data.data.token)
											uni.setStorageSync('userinfo', res.data.data.user_info)
											uni.switchTab({
												url: '/pages/tabBar/home/home'
											})
										}else {
											uni.showToast({
												title: res.data.msg,
												icon: "none"
											})
										}
									},
									fail: function(err) {
										// 登录授权失败  
										// err.code是错误码
									}
								})
							},
							fail: function(err) {
								// 登录授权失败  
								// err.code是错误码
							}
						})
					}
				})
				// #endif
			},
			getUrlCode() {
				// 截取url中的code方法
				var url = location.search;
				// this.winUrl = url;
				var theRequest = new Object();
				if (url.indexOf('?') != -1) {
					var str = url.substr(1);
					var strs = str.split('&');
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
					}
				}
				return theRequest;
			},
			queryParams(data, isPrefix = false) {
				let prefix = isPrefix ? '?' : ''
				let _result = []
				for (let key in data) {
					let value = data[key]
					// 去掉为空的参数
					if (['', undefined, null].includes(value)) {
						continue
					}
					if (value.constructor === Array) {
						value.forEach(_value => {
							_result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
						})
					} else {
						_result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
					}
				}
				return _result.length ? prefix + _result.join('&') : ''
			}
		}
	};
</script>

<style>
@import url("auth.css");
.oauth {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	min-height: 160upx;
	justify-content: space-around;
}

.oauth view {
	border: 2rpx solid #FCF7E9;
}
.WeiXinLogin{
	color: #fff;
	background-color: #0070C0;
}
</style>
