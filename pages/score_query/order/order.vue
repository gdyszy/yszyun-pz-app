<template>
	<view>
		<wuc-tab :tab-list="tabList" textFlex :tabCur.sync="tabCur" tab-class="text-center text-black bg-white fixed"
			select-class="text-orange"></wuc-tab>
		<swiper :current="tabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
			indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			<swiper-item v-for="(tab,index) in tabList" :key="index">
				<scroll-view scroll-top="0" scroll-y="true" class="scroll-Y" @scrolltolower="getList(tabCur==0?3:4)">
					<view v-if="firstRequest" class="uni-loading-content">
						<view class="uni-loading-fill"></view>
						<uni-load-more status="loading" :content-text="{}" />
					</view>
					<view v-else style="height: 100rpx;width: 100%;" />
					<view v-if="tab.data.length > 0" >
						<view v-for="(item, i) in tab.data" :key="i">
							<view class="uni-media-list" @click="goDetail(item.id)">
								<view class="uni-media-list-logo">
									<image :src="uurl+item.server_info.images"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top" style="font-weight: bold;font-size: 35rpx;">
										{{ item.server_info.server_name }}
									</view>
									<text
										class="uni-sub-text-bottom uni-sub-time-text-color listfont">{{ item.hospital_info.hospital_name }}</text>
									<view class="uni-bottom-subchild "><text
											class="uni-sub-text-bottom uni-sub-time-text-color listfont">{{ item.name }}</text>
									</view>
									<view class="uni-bottom-subchild">{{mgetData(item.visit_time)}}</view>
									<!-- <view class="uni-bottom-subchild">{{item.remark}}</view> -->
								</view>
							</view>
						</view>
						<uni-load-more :status="status" :content-text="contentText" />
					</view>
					<view v-else>
						<view class="nothingImg">
							<image src="/static/nothing.png" mode="widthFix" style="width: 100%; height: 100%"></image>
						</view>
						<view class="nothing">暂无数据</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import {
		obj2style
	} from '@/components/wuc-tab/utils/index.js';
	var t = require("@/api.js");
	export default {
		components: {
			WucTab
		},
		data() {
			return {
				uurl: t.uurl,
				tabCur: 0,
				firstRequest: false,
				tabList: [{
						loadtext: "上拉加载更多",
						count: 0,
						name: '待服务',
						data: []
					},
					{
						loadtext: "上拉加载更多",
						count: 0,
						name: '已完成',
						data: []
					}
				],
				current_page: 1, //当前页码
				status: 'more',
				contentText: {
					contentdown: ' ',
					contentrefresh: '加载中',
					contentnomore: ''
				}
			}
		},
		onLoad(option) {
			this.tabChange(option.index)
		},
		methods: {
			goDetail: function(index) {
				uni.navigateTo({
					url: '/pages/score_query/order/order_query?index=' + index
				})
			},
			tabChange(index) {
				if (index == 3) {
					this.tabCur = 0
				} else if (index == 4) {
					this.tabCur = 1
				}
				this.getList(index);
			},
			swiperChange(e) {
				let {
					current
				} = e.target;
				this.tabCur = current;
				this.current_page = 1;
				
				if (current == 0) {
					this.tabList[0].data = [];
					this.getList(3);
				} else if (current == 1) {
					this.tabList[1].data = [];
					this.getList(4);
				}
			},
			getList(index) {
				var that = this;
				this.commHttpRequest(t.mine.getorderlist, {
					status: index,
					page_num: this.current_page,
					page_list_num: 10
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						var res = res.data;
						this.tabList[that.tabCur].data = this.tabList[that.tabCur].data
							.concat(res.data.list); //数据 追加
						this.current_page = Number(res.data.page_num) + 1; //当前页码
					}
				})
			}
		},
	};
</script>
<style>
	@import "../../../components/wuc-tab/styles/icon.scss";

	div,
	scroll-view,
	swiper {
		box-sizing: border-box;
	}

	.swiper {
		height: 100vh;
		background-color: #f8f8f8;
	}

	.scroll-Y {
		height: 100vh;
	}

	.uni-order-item {
		width: 100%;
		height: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.uni-loading-content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-loading-fill {
		flex: 0.45;
	}

	.uni-media-list {
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
		margin: 10rpx;
		background-color: #fff;
	}

	.uni-media-list-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
	}

	.listfont {
		font-size: 33rpx;
		color: #545454;
	}

	.uni-media-list-logo {
		width: 135rpx;
		height: 135rpx;
	}
	.nothing {
		font-size: 16px;
		color: #808080;
		margin-top: -80px;
		text-align: center;
	}
</style>
