<template>
	<view>
		<uni-nav-bar dark color="#fff" backgroundColor="#0070C0" :border="false" statusBar fixed>
			<template v-slot:left>
				<view class="city" @click="chooseCity">
					<text class="uni-nav-bar-text">{{ city }}</text>
					<uni-icons type="arrowdown" color="#ffffff" size="18" />
				</view>
			</template>
			<!-- <view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<text class="input-uni-text" @click="search">输入关键字搜索</text>
				<uni-icons type="scan" color="#999" size="20" @click="scan" />
			</view>
			<template v-slot:right>
				<uni-badge class="uni-badge-left-margin" text="5" absolute="rightTop" size="small" type="error">
					<uni-icons type="chat" color="#fff" size="25" @click="message" />
				</uni-badge>
			</template> -->
		</uni-nav-bar>
		<view class="tui-skeleton">
			<!-- 轮播图 -->
			<view class="tui-banner-box">
				<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="600"
					class="tui-banner-swiper" :circular="true" previous-margin="60rpx" next-margin="60rpx"
					@change="change">
					<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
						<image :src="uurl+item.images" class="tui-slide-image "
							:class="[bannerCurrent != index ? 'tui-banner-scale' : '']" mode="scaleToFill" lazy-load
							></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 轮播消息 -->
			<view class="tui-rolling-news list-item">
				<uni-icons type="sound" color="#555" size="22"></uni-icons>
				<swiper :vertical="true" :autoplay="true" :circular="true" :interval="4000" class="tui-swiper">
					<swiper-item v-for="(item, index) in headlinesTmpArr" :key="index" class="tui-swiper-item">
						<view class="tui-news-item">{{ item }}</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 导航列表 -->
			<view class="tui-classify-box">
				<view class="tui-classify-item" v-for="(item, index) in classify" :key="index"
					@tap="addorder(item.page, item.icon, item.title, item.content)" :data-key="item.title">
					<image :src="uurl+item.icon" class="tui-classify-img " lazy-load></image>
					<view class="tui-classify-name">{{ item.title }}</view>
				</view>
			</view>

			<view style="background-color: white;">
				<view v-for="(value, index) in newsArr" :key="index">
					<view hover-class="uni-list-cell-hover" @click="goDetail(value)">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="uurl+value.images"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top "
									style="font-weight: bold;font-size: 35rpx;margin-bottom: 30rpx;">
									{{ value.hospital_name }}
								</view>
								<text class="uni-sub-text-bottom uni-sub-time-text-color "
									style="font-weight: bold;font-size: 33rpx;color: darkcyan;">{{ value.short_description }}</text>
								<view class="uni-bottom-subchild ">
									<text class="uni-sub-text-bottom uni-sub-status-text-color"
										style="font-size: 30rpx;">{{value.short_description}}</text>
									<uni-countdown v-if="value.countdown" class="countdown-margin-left" :font-size="12"
										:day="1" :hour="2" :minute="30" :second="0" color="#FFFFFF"
										background-color="#C43F37" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top:30rpx; height: 30px;">
				<!-- <uni-load-more :status="status" :content-text="contentText" :iconSize="20" /> -->
			</view>
			<!-- 优惠券弹窗 -->
			<view v-if="isMask">
			<ys-popup type="2"  :money="coupon_money" :low_limit_price="low_limit_price" :title="coupon_title" @close="closeMask()" @eventClick="viewcoupon"></ys-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import { dateUtils } from '../../../common/util.js';
	var t = require("@/api.js");
	var QQMapWX = require('@/common/qqmap/qqmap-wx-jssdk.min.js');
	// 实例化API核心类
	var qqmapsdk = new QQMapWX({
	    key:t.qqmapkey
	});
	

	export default {
		data() {
			return {
				isMask:false,
				coupon_money:0,//红包金额
				low_limit_price:0,
				coupon_title:'',
				uurl: t.uurl,
				city: '广州',
				cityid: 0,
				show_no_data_tip: "",
				loading: "",
				showSkeleton: true,
				status: 'noMore',
				bannerCurrent: 0,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '',
					contentnomore: 'END'
				},
				banner: [],
				headlines: [''],
				headlinesTmpArr: [
					'优势智云陪诊服务，专业陪诊，全程无忧',
					'招贤纳士！欢迎注册成为优势智云陪诊师',
					'喜报！优势智云陪诊APP正式上线'
				],
				classify: [],
				hot: {},
				newsArr: [],
				onLineVersion: '',
				couponList: [],
				type: 'center'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.updateApp();
			// #endif
		},
		onShow() {
			if(this.cityid == 0){
				// #ifdef APP-PLUS
				this.getLocation();
				// #endif
				// #ifdef MP-WEIXIN
				this.getAuthorize();
				// #endif
			}
			setTimeout(() => {
				this.getBanner();
				this.getClassify();
				let userinfo = uni.getStorageSync('userinfo');
				//新用户领券
				this.getAutoSendCoupon();
				/* if (userinfo.new_user == true) {
					this.getAutoSendCoupon();
				} */
			}, 1000)
		},
		methods: {
			closeMask(){//关闭弹窗
				this.isMask=false;
			},
			// 获取新用户优惠券
			getAutoSendCoupon() {
				let  _this = this;
				this.commHttpRequest(t.coupon.autosendcoupon, {coupon_type: 2}, 'post', true, (res) => {
					if (res.data.code === 10000) {
						this.couponList = res.data.data.list
						setTimeout(() => {
							_this.coupon_money = this.couponList[0].price;
							_this.coupon_title = this.couponList[0].name;
							_this.low_limit_price=this.couponList[0].low_limit_price;
							_this.isMask = true;
						},300)
					}
				})
			},
			// 查看优惠券
			viewcoupon(){
				this.isMask=false;
				uni.navigateTo({
					url: "/pages/coupon/couponList"
				})
			},
			//导航按钮跳转
			addorder: function(upage, icon, servername, content) {
				uni.navigateTo({
					url: upage+'?&servername='+servername+'&icon='+icon+'&content='+content
				})
			},
			//轮播图change
			change: function(e) {
				this.bannerCurrent = e.detail.current;
			},
			// 获取导航列表
			getClassify() {
				this.commHttpRequest(t.home.getnavlist, {}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.classify = res.data.data
					}
				})
			},
			// 根据定位获取城市id
			getLocation() {
				var _this = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function (res) {
						if(res.address.city){
							_this.city = res.address.city.split("市")[0];
						}
						_this.commHttpRequest(t.home.getcitylist, {page_num: 1,
								page_list_num: 100},'get', true, (res) => {
							if (res.data.code === 10000) {
								for (var i = 0; i < res.data.data.list.length; i++) {
									if(res.data.data.list[i].city_name.split("市")[0] === _this.city){
										_this.cityid = res.data.data.list[i].id
										uni.setStorageSync('cityid',res.data.data.list[i].id)
										_this.getList();
									}
								}
							}
						})
					}
				});
			},
			//获取当前城市的医院列表
			getList() {
				this.commHttpRequest(t.home.getlist, {city_id: this.cityid,
						page_num: 1,
						page_list_num: 10},'get', true, (res) => {
					if (res.data.code === 10000) {
						this.newsArr = res.data.data.list
					}
				})
			},
			// 获取轮播图
			getBanner() {
				this.commHttpRequest(t.home.getswiperlist, {}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.banner = res.data.data
					}
				})
			},
			//跳转医院详情
			goDetail: function(e) {
				uni.navigateTo({
					url: '/pages/hospital_detail/hospital_detail?xq=' + JSON.stringify(e)
				})
			},
			
			chooseCity: function() {
				var _this = this;
				uni.navigateTo({
					url: '/pages/citys/citys?currentCity='+_this.city,
					events: {
						// 从上一页返回后，当我的小程序数据发生改变时触发
						onChooseCity: function(cityName, cityId) {
							if (cityName) {
								_this.city = cityName.split("市")[0];
								_this.cityid = cityId;
								uni.setStorageSync('cityid',cityId)
							}
							_this.getList();
						}
					},
				})
			},
			search: function() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			message: function() {
				uni.navigateTo({
					url: '/pages/message/message'
				})
			},
			//扫码
			scan: function() {
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: function(res) {
						if (res.scanType == 'QR_CODE') {
							plus.runtime.openURL('http://www.baidu.com');
						}
					}
				});
			},
			// 获取微信定位授权方法
			getAuthorize () {
				uni.authorize({
					scope: 'scope.userLocation',
					success: (res) => {
						this.getWXLocation()
					},
					fail: (err) => {
						uni.showModal({
							content: '需要授权位置信息',
							confirmText: '确认授权',
							success: function (res) {
								if (res['confirm']) {
									uni.openSetting({
										success: res => {
											if (res.authSetting['scope.userLocation']) {
												uni.showToast({
													title: '授权成功',
													icon: 'none'
												})
												this.getWXLocation()
											} else {
												uni.showToast({
													title: '授权失败',
													icon: 'none'
												})
											}
										}
									})
								}
								else if (res['cancel']) {
									// 取消授权
									this.getWXLocation()
								}
							},
						})
					},
				})
			},
			getWXLocation(){
				var _this = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function (res) {
						//逆地址解析  坐标转地址信息
						qqmapsdk.reverseGeocoder({
							//Object格式
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							}, 
							success: function(res) {//成功后的回调
							   const mapdata=res.result.ad_info;
							   _this.city = mapdata.city.split("市")[0];
							   _this.commHttpRequest(t.home.getcitylist, {page_num: 1,
							   		page_list_num: 100},'get', true, (res) => {
							   	if (res.data.code === 10000) {
							   		for (var i = 0; i < res.data.data.list.length; i++) {
							   			if(res.data.data.list[i].city_name.split("市")[0] === _this.city){
							   				_this.cityid = res.data.data.list[i].id
							   				uni.setStorageSync('cityid',res.data.data.list[i].id)
											_this.getList();
							   			}
							   		}
							   	}
							   })
							},fail: function(error) {
								_this.remindMsg(error.message)
							},
							complete: function(res) {
							}
						});
					}
				});
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
						// uni.showToast({
						// 	title: '当前已经是最新版本！',
						// 	icon: 'none'
						// });
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

<style lang="scss">
	$nav-height: 60rpx;

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-left: 2rpx;
		width: 100%;
	}

	.scan {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-left: 2rpx;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		background-color: #fff;
		height: $nav-height;
		border-radius: 10rpx;
		padding: 0 10px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: $nav-height;
	}

	.input-uni-text {
		color: #999;
		font-size: 24rpx;
		padding: 0 10rpx;
		flex: 1;
	}

	.input-uni-icon {
		line-height: $nav-height;
		background-color: #fff;
	}

	.uni-nav-bar-text {
		color: #fff;
		margin-right: 10rpx;
	}

	.uni-badge-left-margin {
		margin-right: 15rpx;
	}

	/*banner*/

	.tui-banner-box {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 240rpx;
	}

	.tui-banner-item {
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
		border-radius: 12rpx;
		background-color: #f5f5f5;
		/* transition: all 0.1s linear; */
	}

	.tui-banner-scale {
		transform: scaleY(0.9);
		transform-origin: center center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	::v-deep .tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */
	/*banner*/

	/*headlines*/

	.tui-rolling-news {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #fff;
	}

	.tui-rolling-news::after {
		left: 0;
	}

	.tui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 80rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}

	/*headlines*/

	/*classify*/

	.tui-classify-box {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 0;
		background-color: #fff;
	}

	.uni-media-list {
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
		margin: 10rpx;
	}

	.uni-media-list-body {
		display: flow-root;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
	}

	.tui-classify-item {
		width: 20%;
		text-align: center;
	}

	.tui-classify-img {
		width: 100rpx;
		height: 100rpx;
		background-color: #f5f5f5;
		border-radius: 50%;
	}

	.tui-classify-name {
		font-size: 26rpx;
		line-height: 26rpx;
		min-height: 26rpx;
		padding-top: 8rpx;
		color: #555;
		white-space: nowrap;
	}

	/*classify*/

	.uni-media-list-logo {
		width: 145rpx;
		height: 145rpx;
	}

	.uni-sub-text-bottom {
		font-size: 24rpx;
		// line-height: 24rpx;
	}

	.uni-sub-time-text-color {
		color: #6E6D6E;
	}

	.uni-sub-status-text-color {
		color: #BBBBBB;
	}

	.uni-bottom-subchild {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 30rpx;
	}

	.countdown-margin-left {
		margin-left: 10rpx;
	}

	.uni-popup .uni-popup__wrapper {
		border-radius: 10px !important;
	}
</style>
