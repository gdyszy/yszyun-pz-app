<template>
	<view class="wanl-money mtop">
		<view class="edgeInsetTop"></view>
		<view class="cu-list menu-avatar" v-if="dataList">
			<view class="cu-item" v-for="(item, index) in dataList" :key="item.id">
				<image class="cu-avatar" src="/static/WECHAT.png"></image>
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							提现到微信账户
						</view>
					</view>
					<view>
						<text class="wanl-orange text-price">￥{{item.money}}</text>
					</view>
					<view class="wanl-gray text-sm">
						{{item.create_time_text}}
					</view>
				</view>
				<view class="action">
					<view class="cu-tag radius"
						:class="item.audit_status == 1?'bg-green':item.audit_status==0?'bg-orange':'bg-red'">
						{{statusList[item.audit_status].status}}
					</view>
				</view>
			</view>
		</view>

		<!-- 空 -->
		<view v-if="total == 0">
			<view class="empty-content">
				<view class="wanl-gray text-center">
					<image class="animation-scale-down" src="/static/ticket_default3x.png"></image>
					<view class="text-30">没找到任何提现记录</view>
				</view>
			</view>
		</view>
		<view class="edgeInsetBottom"></view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				dataList: [],
				statusList: [{
					status: '申请中'
				}, {
					status: '已通过'
				}, {
					status: '未通过'
				}],
				reload: false, //判断是否上拉
				total: 0, //数据量
				current_page: 1, //当前页码
				last_page: 1, //总页码
				status: 'more',
				contentText: {
					contentdown: ' ',
					contentrefresh: '加载中',
					contentnomore: ''
				}
			};
		},
		onLoad() {
			this.getrefundlist();
		},
		onPullDownRefresh() {
			this.current_page = 1;
			this.reload = true;
			this.getrefundlist();
		},
		onReachBottom() {
			//判断是否最后一页
			if (this.current_page >= this.last_page) {
				this.status = 'noMore';
			} else {
				this.reload = false;
				this.current_page = Number(this.current_page) + 1; //页码+1
				this.status = 'loading';
				this.getrefundlist();
			}
		},
		methods: {
			//获取提现日志
			getrefundlist() {
				var that = this;
				this.commHttpRequest(t.mine.getrefundlist, {
					page_num: this.current_page,
					page_list_num: 10
				}, 'get', true, (res) => {
					uni.stopPullDownRefresh();
					this.dataList = this.reload ? res.data : this.dataList.concat(res.data.data.list); //数据 追加
					this.total = res.data.data.count; //数据量
					this.current_page = res.data.data.page_num; //当前页码
					this.last_page = this.total / res.data.data.page_list_num; //总页码
					this.status = res.total == 0 ? 'noMore' : 'more';
				})
			}
			
		}
	};
</script>

<style>
	@import '@/common/wanlnvue.css';

	.mtop {
		margin-top: 30rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: calc(100% - 52px - 32px - 65px - 10px);
		position: absolute;
		line-height: 1.5em;
		left: 65px;
		position: absolute;
	}

	.cu-tag {
		font-size: 13px;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0px 8px;
		height: 26px;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
	}

	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 250rpx 0rpx;
	}

	.empty-content image {
		width: 320rpx;
		height: 320rpx;
	}

	.text-30 {
		font-size: 16px;
		color: #808080;
		/* margin-top: -20px; */
		text-align: center;
	}

	.wanl-money .cu-list.menu-avatar>.cu-item {
		height: 180rpx;
		align-items: flex-start;
		padding: 25rpx 0;
		box-sizing: border-box;
		background-color: #ffffff;
		border-bottom: 1rpx solid #ddd;
	}

	.wanl-money .cu-list.menu-avatar>.cu-item .cu-avatar {
		width: 75rpx;
		height: 75rpx;
		left: 25rpx;
		margin-top: 6rpx;
		position: absolute;
	}

	.wanl-money .cu-list.menu-avatar>.cu-item .content {
		left: 120rpx;
		width: calc(100% - 75rpx - 25rpx -150rpx);
		line-height: 1.5em;
		position: absolute;
	}

	.wanl-money .cu-list.menu-avatar>.cu-item .action {
		width: 82px;
		text-align: right;
		padding-right: 13px;
		box-sizing: border-box;
		position: absolute;
		right: 0;
	}
</style>
