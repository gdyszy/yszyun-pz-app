<template>
	<view class="page">
		<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight+'px'}">
			<view v-if="!inputVal">
				<view class="current-city">
					<view class="title">当前城市</view>
					<view class="city-name" @tap="selectCity">
						<tui-icon name="position-fill" color="#5677fc" :size="18"></tui-icon>
						{{localCity}}
					</view>
				</view>
				<view class="hot-city">
					<view class="title">--已开通服务城市--</view>
					<view class="city-names">
						<view class="city-name-item" v-for="(item,index) in hotCity" :key="index" hover-class="tap-city"
							:hover-stay-time="150" @tap="selectCity(item.city_name, item.id)" :data-name="item">
							{{item.city_name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import cityData from '@/common/city.js'
	var t = require("@/api.js");
	export default {
		data() {
			return {
				lists: [],
				touchmove: false, // 是否在索引表上滑动
				touchmoveIndex: -1,
				titleHeight: 0, // 索引二字距离窗口顶部的高度
				indexBarHeight: 0, // 索引表高度
				indexBarItemHeight: 0, // 索引表子项的高度
				scrollViewId: '', // scroll-view滚动到的子元素的id
				winHeight: 0,
				inputShowed: false, // 输入框是否显示
				inputVal: '', // 搜索框输入的内容
				hotCity: {}, // 热门城市
				searchResult: [], // 搜索城市的结果
				localCity: ''
			}
		},
		onLoad: function(options) {
			const that = this;
			that.localCity = options.currentCity || "广州";
			setTimeout(() => {
				uni.getSystemInfo({
					success: function(res) {
						let winHeight = res.windowHeight
						let barHeight = winHeight - uni.upx2px(204);
						that.indexBarHeight = barHeight;
						that.winHeight = winHeight;
						that.indexBarItemHeight = barHeight / 25;
						// #ifdef APP-PLUS
						 // #ifdef VUE3
						    that.winHeight = barHeight;
						    that.indexBarItemHeight = barHeight / 30;
						 // #endif
						// #endif
						that.titleHeight = uni.upx2px(132);
						that.lists = cityData.list
					}
				})
			}, 50)
			that.getCityList();
		},
		methods: {
			getCityList() {
				this.commHttpRequest(t.home.getcitylist, {page_num: 1,
						page_list_num: 100},'get', true, (res) => {
					if (res.data.code === 10000) {
						this.hotCity = res.data.data.list
					}
				})
			},
			showInput() {
				this.inputShowed = true
			},
			clearInput() {
				this.inputVal = "";
				this.inputShowed = false;
				this.searchResult = [];
				uni.hideKeyboard() //强行隐藏键盘
			},
			inputTyping(e) {
				this.inputVal = e.detail.value;
				this.searchCity()
			},
			// 搜索城市
			searchCity() {
				let result = []
				cityData.list.forEach((item1, index1) => {
					item1.data.forEach((item2, index2) => {
						if (item2.keyword.indexOf(this.inputVal.toLocaleUpperCase()) !== -1) {
							result.push(item2.cityName)
						}
					})
				})
				this.searchResult = result
			},
			getEventChannel(handler){
					// #ifdef APP-NVUE
					const eventChannel = handler.$scope.eventChannel; // 兼容APP-NVUE
					// #endif
					// #ifndef APP-VUE
					const eventChannel = handler.getOpenerEventChannel();
					// #endif
					return eventChannel;
				},
			// 选择城市
			selectCity(name, id) {
				let cityName = name;
				let cityId = id;
				//返回并刷新上一页面
				var channel = this.getEventChannel(this);
				channel.emit('onChooseCity', cityName, cityId);  //通知首页更新数据
				uni.navigateBack({
					delta: 1
				})
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index === 0 ? 1 : index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index === 0 ? 1 : index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			handleClick(index) {
				if (index === undefined || this.touchmove) return;
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		overflow: hidden;
	}

	.page {
		height: 100%;
		overflow: hidden;
	}

	.scrollList {
		flex: 1;
	}

	.search-bar {
		display: flex;
		align-items: center;
		position: relative;
		padding: 27rpx 30rpx 35rpx;
		background-color: #fff;
	}

	.search-bar-form {
		flex: 1;
		position: relative;
		border-radius: 32rpx;
		background: #f2f5f7;
	}

	.search-bar-box {
		display: flex;
		align-items: center;
		position: relative;
		padding-left: 20rpx;
		padding-right: 20rpx;
		height: 64rpx;
		z-index: 1;
	}

	.search-bar-input {
		line-height: normal;
		width: 100%;
		padding-left: 20rpx;
		font-size: 30rpx;
		color: #333;
	}

	.phcolor {
		font-size: 30rpx;
	}

	.icon-clear {
		height: 38rpx;
	}

	.icon-clear .tui-icon-class {
		display: block
	}

	.search-bar-label {
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		border-radius: 32rpx;
		color: #ccc;
		background: #f2f5f7;
	}

	.icon-search {
		position: relative;
		height: 26rpx;
		margin-right: 20rpx;
		font-size: inherit;
	}

	.search-bar-text {
		font-size: 30rpx;
		line-height: 32rpx;
	}

	.cancel-btn {
		padding-left: 30rpx;
	}

	.search-result::before {
		display: none;
	}

	.search-result::after {
		display: none;
	}

	.tui-list-cell {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.tui-list-cell-hover {
		background-color: #eee !important;
	}

	.tui-list-cell-navigate {
		width: 100%;
		position: relative;
		padding: 30rpx 0 30rpx 30rpx;
		font-size: 28rpx;
		color: #333;
	}

	.tui-list-cell-navigate::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 30rpx;
	}

	.current-city {
		padding: 30rpx;
		background: #fff;
	}

	.tui-icon-class {
		margin-right: 10rpx;
	}

	.current-city .title {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999;
	}

	.city-name {
		display: flex;
		align-items: center;
		margin-top: 17rpx;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 30rpx;
		color: #333;
	}

	.hot-city .title {
		height: 100rpx !important;
		padding-left: 30rpx;
		padding-top: 30rpx;
		font-size: 50rpx !important;
		line-height: 48rpx !important;
		color: #999;
		background: #f2f5f7 !important;
		text-align: center;
	}

	.city-names {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		padding: 20rpx ;
		background: #fff;
	}

	.city-name-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 60rpx;
		margin-top:20rpx;
		/* border: solid 1rpx #ccc; */
		padding: 5rpx;
		/* border-radius: 10rpx; */
		font-size: 26rpx;
		color: #333;
		position: relative;
	}

	.city-name-item::before {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 20rpx;
		border: 1px solid #ccc;
	}

	.tap-city {
		color: #fff;
		background: #5677fc;
		/* border: solid 1rpx #5677fc; */
	}

	.tui-list {
		background-color: #fff;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-list-cell-divider {
		height: 48rpx;
		padding-left: 30rpx;
		font-size: 24rpx;
		color: #999;
		background: #f2f5f7;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}

	.tui-indexed-list-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		z-index: 9999;
		position: absolute;
		top: 132rpx;
		right: 0;
		padding-right: 10rpx;
		width: 44rpx;
	}

	.tui-indexed-list-text {
		font-size: 22rpx;
		white-space: nowrap;
	}

	.tui-indexed-list-bar.active {
		background-color: rgb(200, 200, 200);
	}

	.tui-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 160rpx;
		height: 160rpx;
		left: 50%;
		top: 50%;
		margin-left: -80rpx;
		margin-top: -80rpx;
		border-radius: 80rpx;
		text-align: center;
		line-height: 160rpx;
		font-size: 70rpx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
