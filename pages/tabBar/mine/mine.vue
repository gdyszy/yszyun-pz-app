<template>
	<view class="page">
		<view class="uni-user-header">
			<view class="uni-header-body">
				<!-- #ifdef MP-WEIXIN -->
				<button class="button-image" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="uni-avatar-image" :src="avatar"></image>
				</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<image class="uni-avatar-image" @click="edit_avatar" :src="avatar"></image>
				<!-- #endif -->
				
				<view class="list-item__content" @tap="gotoLogin">
					<!-- #ifdef MP-WEIXIN -->
					<input type="nickname" class="uni-avatar-luckname" :value="username ? username : '您未登录,请先登录'" @blur="bindblur"/>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<text class="uni-avatar-luckname">{{username ? username : '您未登录,请先登录'}}</text>
					<!-- #endif -->
					<text class="list-item__content-note">{{post}}</text>
					
				</view>
			</view>
		</view>

		<view class="uni-main-board">
			<view spacing="0" padding="0" :border="false" class="uni-board" :is-shadow="false">
				<uni-list-item :border="false" clickable showArrow title="我的订单" rightText="全部"
					@click="order_query(0)" />
				<view class="uni-line" />
				<view class="uni-gird-button">
					<view class="grid-item-box" @click="order_query(1)">
						<image class="img" src="/static/mine/pay.svg" mode="aspectFill" />
						<text class="text">待支付</text>
					</view>
					<view class="grid-item-box" @click="order_query(3)">
						<image class="img" src="/static/mine/service.svg" mode="aspectFill" />
						<text class="text">待服务</text>
					</view>
					<view class="grid-item-box" @click="order_query(4)">
						<image class="img" src="/static/mine/complete.svg" mode="aspectFill" />
						<text class="text">已完成</text>
					</view>
					<view class="grid-item-box" @click="order_query(5)">
						<image class="img" src="/static/mine/nocomplete.svg" mode="aspectFill" />
						<text class="text">已取消</text>
					</view>
				</view>
			</view>
			<view class="uni-board uni-margin-top">
				<uni-list-item :border="false" title="优惠券" clickable showArrow
					thumb="/static/mine/yhq.svg"
					thumb-size="lg" @click="coupon()" />
				<uni-list-item :border="false" title="服务对象管理" clickable showArrow
					thumb="/static/mine/servicepersion.svg"
					thumb-size="lg" @click="sign_query()" />
				<uni-list-item :border="false" title="服务条款" clickable showArrow
					thumb="/static/mine/service.svg"
					thumb-size="lg" @click="serviceRule">
				</uni-list-item>
				<!-- #ifdef APP-PLUS -->
					<uni-list-item :border="false" title="检查版本" clickable showArrow
						thumb="/static/mine/update.svg"
						thumb-size="lg" :rightText="version" @click="updateApp">
					</uni-list-item>
					<uni-list-item :border="false" title="分享转发" clickable showArrow
						thumb="/static/mine/share.svg"
						thumb-size="lg" @click="shareToggle" />
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<!-- <uni-list-item :border="false" title="分享转发" clickable showArrow
						thumb="/static/mine/share.svg"
						thumb-size="lg">
					</uni-list-item>
					<button id="shareBtn" data-name="shareBtn" open-type="share">转发</button> -->
				<!-- #endif -->	
				<uni-list-item v-if="username" :border="false" title="退出登录" clickable showArrow
					thumb="/static/mine/quit.svg"
					thumb-size="lg" @click="isLogout" />
			</view>
			<view class="uni-board uni-margin-top">
				<uni-list-item :border="false" title="我是陪诊师" clickable showArrow
					thumb="/static/mine/peizhen.svg"
					thumb-size="lg" @click="score_query()" />
			</view>
		</view>
		<view>
			<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share @select="select"></uni-popup-share>
			</uni-popup>
			<!-- 退出登录提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提示" content="是否退出登录,请确认" @confirm="logout"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				msgType: 'success',
				avatar: '/static/nologin@3x.png',
				gender: 0,
				username: '',
				post: '',
				tel: '',
				mstatus: 0,
				version: '',
				onLineVersion: ''
			}
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo');
			if (!userinfo) {
				this.gotoLogin();
			}
			this.version = uni.getStorageSync("appSystemInfo").appWgtVersion
			// wx.showShareMenu({
			// 	withShareTicket:true,
			// 	//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			// 	menus:["shareAppMessage","shareTimeline"]
			// })
		},
		onShow(option){
			// setTimeout(() => {
				try {
					const peizhen = uni.getStorageSync('peizhen');
					// 陪诊师注册完成后重新获取用户信息,得到陪诊师的审核状态
					let userinfo = uni.getStorageSync('userinfo');
					if (userinfo) {
						this.getUserInfo();
						this.tel = userinfo.tel;
						this.gender = userinfo.gender;
					}
					try {
						uni.removeStorageSync('peizhen');
					} catch (e) {
					}
				} catch (e) {
				}
			// }, 1000)
		},
		//分享到朋友
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		    }
		    return {
		        type: 0,
		        href: "https://www.yszyun.com/",
		        title: "陪诊服务",
		        summary: "陪诊服务APP，您身边的就诊好帮手！",
		        imageUrl:  this.$websiteUrl+"/peizhen.png",
		    }
		},
		//分享到朋友圈
		onShareTimeline(res) {
		    return {
		        type: 0,
		        href: "https://www.yszyun.com/",
		        title: "陪诊服务",
		        summary: "陪诊服务APP，您身边的就诊好帮手！",
		        imageUrl:  this.$websiteUrl+"/peizhen2.png",
		    }
		},
		methods: {
			bindblur(e) {
				this.username = e.detail.value // 获取微信昵称
				/* this.commHttpRequest(t.mine.saveinfo, {type: 2, nickname: e.detail.value}, 'post', true, (res) => {
					if (res.data.code === 10000) {
						this.username = res.data.data.username;
					}
				}) */
			},
			onChooseAvatar(e) {
				const avatarUrl = e.detail.avatarUrl // 此处是头像的临时路径
				// 需要后端配合，获得线上的地址
				this.uploadFile(avatarUrl).then(res => {
						const result = JSON.parse(res.data)
						this.avatar = t.uurl + result.data.avatar
				}).catch(err => {
				})
			},
			uploadFile(filePath) {
				// 添加token
				let token = uni.getStorageSync('token')
				if(!token){
					uni.showToast({
						title: '您未登录,请先登录',
						icon: 'none'
					});
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				// 时间戳
				let timestamp = Math.round(new Date() / 1000);
					
				return new Promise((resolved, rejected) => {
					uni.uploadFile({
						url: t.saveinfo,
						method: 'POST',
						type: 1,
						filePath: filePath,
						name: 'avatar',
						header: {
							'content-type' : 'multipart/form-data',
							'timestamp': timestamp,
							'token': token
						},
						success: (res) => {
							if (res.statusCode == 200) {
								resolved(res)
							} else {
								rejected(res)
							}
						},
						fail: (err) => {
							rejected(err)
						}
					})
				})
			},
			gotoLogin() {
				let token = uni.getStorageSync('token')
				if(!token){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			// 获取用户信息
			getUserInfo() {
				this.commHttpRequest(t.home.getuserinfo, {}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.mstatus = res.data.data.member_status
						this.username = res.data.data.nickname;
						if(~res.data.data.avatar.indexOf('http')){
							this.avatar = res.data.data.avatar;
						}else{
							this.avatar = t.uurl + res.data.data.avatar;
						}
					}
				})
			},
			isLogout() {
				this.$refs.alertDialog.open()
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			logout() {
				this.username = ''
				try {
					uni.removeStorageSync('token');
					uni.removeStorageSync('userinfo');
					uni.showToast({
						title: '已退出登录！',
						icon: 'none'
					});
				} catch (e) {
				}
			},
			shareToggle() {
				this.$refs.share.open()
			},
			select(e) {
				if(e.item.name == 'wechat'){
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: "https://www.yszyun.com/",
						title: "陪诊服务",
						summary: "陪诊服务APP，您身边的就诊好帮手！",
						imageUrl:  this.$websiteUrl+"/peizhen.png",
						success: function (res) {
						},
						fail: function (err) {
						}
					});
				}else if(e.item.name == 'moments'){
					uni.share({
						provider: "weixin",
						scene: "WXSceneTimeline",
						type: 0,
						href: "https://www.yszyun.com/",
						title: "陪诊服务",
						summary: "陪诊服务APP，您身边的就诊好帮手！",
						imageUrl:  this.$websiteUrl+"/peizhen2.png",
						success: function (res) {
						},
						fail: function (err) {
						}
					});
				}
			},
			serviceRule: function() {
				uni.navigateTo({
					url: "/pages/service_rule/index"
				})
			},
			edit_avatar: function() {
				var _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						_this.uploadFile(res.tempFilePaths[0]).then(res => {
								const result = JSON.parse(res.data)
								_this.avatar = t.uurl + result.data.avatar
						}).catch(err => {
						})
					}
				});
			},
			sign_query: function() {
				uni.navigateTo({
					url: "/pages/sign_query/index"
				})
			},
			coupon: function() {
				uni.navigateTo({
					url: "/pages/coupon/couponList"
				})
			},
			score_query: function() {
				const that = this;
				if (!this.username) {
					this.remindMsg('您未登录,请先登录');
				} else {
					if (that.mstatus == 0) {
						uni.navigateTo({
							url: '/pages/score_query/score_query'
						})
					} else if (that.mstatus == 1) {
						this.remindMsg('您的申请正在审核中,无需重复申请！');
					} else {
						uni.navigateTo({
							url: '/pages/score_query/score_query2'
						})
					}
				}
			},
			order_query: function(index) {
				try {
					uni.setStorageSync('index', index);
				} catch (e) {
				}
				uni.switchTab({
					url: '/pages/tabBar/order/order'
				})
			},
			updateApp() {
				uni.getSystemInfo({
					success: function (res) {
						uni.setStorageSync("appSystemInfo",res)
					}
				});
				var _this = this
				const appSystemInfo = uni.getStorageSync("appSystemInfo")
				let data = {}
				data.appid = appSystemInfo.appId
				data.version = appSystemInfo.appWgtVersion
				data.os = uni.getDeviceInfo().platform;
				_this.commHttpRequest(t.home.appupdate, data, 'post', false, (res) => {
					// if (!res.data.data.length) {
					// 	return true
					// }
					let appVersion = appSystemInfo.appWgtVersion
					_this.onLineVersion = res.data.data ? res.data.data.version : appVersion;
					const permission = res.data.data.need_update
					const contents = res.data.data.updated_content
					if(permission == false){
						uni.showToast({
							title: '当前已经是最新版本！',
							icon: 'none'
						});
					}
					if (_this.compareVersion(_this.onLineVersion, appVersion)) { // 有新版本
						// _this.newVersion = true
						//跳转到浏览器下载包
						// plus.runtime.openURL(res.data.data[0].package_url)
						let appData = {}
						appData.is_mandatory = permission
						appData.title = "版本更新"+_this.onLineVersion
						appData.contents = contents ? contents : "修复已知问题"
						appData.platform = uni.getDeviceInfo().platform == 'android' ? ["Android"] : ["iOS"]
						appData.version = _this.onLineVersion
						appData.url = t.uurl + res.data.data.app_url
						appData.type = "wgt"
					
						appData.store_list = []
						uni.setStorageSync("PACKAGE_INFO_KEY", appData)
						uni.navigateTo({
							url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${"PACKAGE_INFO_KEY"}`,
							fail: (err) => {
								console.error('更新弹框跳转失败', err)
								uni.removeStorageSync("PACKAGE_INFO_KEY")
							}
						})
					}
				}, false)
			}
		}
	}
</script>

<style>
	.page {
		width: 750rpx;
		height: 100vh;
		background-color: #F6F6F6;
	}

	.uni-user-header {
		width: 750rpx;
		height: 260rpx;
		background-color: #0070C0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.uni-header-body {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 30rpx;
		margin-left: 70rpx;
	}
	.button-image {
		background-color: transparent;
		border: 1px solid transparent;
		color: #3376f3;
	}
	.button-image::after{
		border: none;
	}
	.uni-avatar-image {
		width: 125rpx;
		height: 125rpx;
		border: 1px solid #fff;
		border-radius: 30px;
		margin-right: 20rpx;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.uni-avatar-luckname {
		color: white;
		font-size: 32rpx;
		font-weight: bold;
	}

	.uni-main-board {
		position: relative;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 30rpx;
	}

	.uni-board {
		padding-top: 20rpx;
		width: 700rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		padding-bottom: 20rpx;
	}

	.uni-margin-top {
		margin-top: 20rpx;
	}

	.uni-height {
		height: 240rpx;
	}

	.text {
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 6rpx;
	}

	.uni-gird-button {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin: 20rpx 0;
	}

	.uni-line {
		height: 2rpx;
		/* width: 100vw; */
		background-color: #999;
		margin: 0 30rpx;
	}
	.uni-media-list {
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		width: 250px;
		height: 80px;
		flex-direction: row;
		/* justify-content: space-between; */
		background-color: #fff;
	}
	.uni-media-list-logo {
		width: 205rpx;
		height: 135rpx;
		display: flex;
		flex-direction: column;
		line-height: 30px;
	}
	#shareBtn {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
