<template>
	<view class="wanl-article">
		<view class="edgeInsetTop"></view>
		<!-- 进度条 -->
		<view class="load-progress" :class="loadProgress!=0?'show':'hide'">
			<view class="load-progress-bar bg-orange" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
		</view>
		<view class="margin-bj content">
			<mp-html :content="detailsData" />
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser';
	var t = require("@/api.js");
	export default {
		data() {
			return {
				loadProgress: 0, //进度条
				detailsData: ''
			}
		},
		onLoad(option) {
			// 进度条
			this.LoadProgress();
			this.loadData({id:option.id});
			uni.setNavigationBarTitle({
				title: option.title
			})
		},
		methods: {
			// 异步加载
			async loadData(data) {
				this.commHttpRequest(t.home.getdisclaimerinfo, data, 'get', true, (res) => {
					if (res.data.code === 10000) {
						//详情正则
						// res.data.data.content = res.data.data.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
						// 	var img = `<img style="display: block; max-width: 100%;" src="${this.$wanlshop.oss(capture, 500, 0)}">`;
						// 	return img;
						// });
						this.detailsData = res.data.data.content;
						this.loadProgress = 90;
					}
				})
			},
			// 进度条
			LoadProgress() {
				this.loadProgress = this.loadProgress + 2;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
				}
			}
		}
	}
</script>

<style>
	.wanl-article .content{
		
	}
	.margin-bj {
		margin: 0 15rpx;
	}
</style>
