<template>
	<view class="page">
		<view class="uheader">
			<view class="uni-header-body">
				<image class="uni-avatar-image" @click="edit_avatar" :src="pic">
				</image>
				<view class="uni-avatar">
					<view class="uni-avatar-luckname">{{name}}</view>
					<!-- <view class="uni-avatar-luckname2">{{this.zhiwu}}</view> -->
				</view>
				<!-- <image class="uset" src="/static/btn_02_add.png">
				</image> -->
			</view>
			<uni-list-item clickable class="ulist" style="background: #0070C0;" @click="refundmoney()">
				<!-- 自定义 header -->
				<view slot="header" class="slot-box llist">
					<image class="list-image"
						src="/static/mine/balance.svg"
						mode="widthFix"></image>
				</view>
				<!-- 自定义 body -->
				<view slot="body" class="slot-box list-text">
					余额
				</view>
				<!-- 自定义 footer -->
				<view slot="footer" class="rlist">
					<text class="list-text">{{yue}}元</text>
					<uni-icons :size="16" class="uni-icon-wrapper" color="#fff" type="arrowright" />
				</view>

			</uni-list-item>
			<uni-list-item clickable class="ulist" style="background: #0070C0;" @click="getrefundlist()">
				<view slot="header" class="slot-box llist">
					<image class="list-image"
						src="/static/mine/withdrawlog.svg"
						mode="widthFix"></image>
				</view>
				<view slot="body" class="slot-box list-text">
					提现日志
				</view>
				<view slot="footer" class="rlist">
					<uni-icons :size="16" class="uni-icon-wrapper" color="#fff" type="arrowright" />
				</view>
			</uni-list-item>
		</view>

		<view class="uni-main-board">

			<view spacing="0" padding="0" :border="false" class="uni-board" :is-shadow="false">
				<uni-list-item :border="false" clickable title="我的订单" @click="order_query(3)" />
				<view class="uni-line" />
				<view class="uni-gird-button">
					<view class="grid-item-box" @click="order_query(3)">
						<image class="img" src="/static/mine/service.svg" mode="aspectFill" />
						<text class="text">待服务</text>
					</view>
					<view class="grid-item-box" @click="order_query(4)">
						<image class="img" src="/static/mine/complete.svg" mode="aspectFill" />
						<text class="text">已完成</text>
					</view>
				</view>
			</view>

			<view class="newdd">- 新的订单 ({{city}}) -</view>

			<view class="uni-board uni-margin-top" v-for="(item, i) in dingdan" :key="i">

				<uni-list-item :border="false">
					<!-- 自定义 header -->
					<view slot="header" class="slot-box">
						<image class="slot-image" :src="uurl+item.server_info.images" mode="widthFix"></image>
					</view>
					<!-- 自定义 body -->
					<view slot="body" class="slot-box slot-text">
						<view class="utitle">{{item.server_info.server_name}}</view>
						<view class="uxx">{{item.hospital_info.hospital_name}}</view>
						<view class="uxx">{{mgetData(item.visit_time)}}</view>
						<view class="uxx">{{item.name}}</view>
						<view class="utext">{{item.remark}}</view>
					</view>
				</uni-list-item>

				<uni-list-item>
					<template slot="header">
						<view class="utitle2">本单收益：</view>
						<view class="utitle2 utext">{{item.price}}元</view>
					</template>
					<template slot="body">
						<button type="primary" @click="receivingorder(item.id,item.order_no)"
							class="pributton">接单</button>
					</template>
				</uni-list-item>

			</view>
			<uni-load-more :status="status" :content-text="contentText" />
			<!-- <view class="end">- 嗯，目前就这么多 -</view> -->

		</view>

	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				uurl: t.uurl,
				name: '',
				pic: '',
				yue: '',
				city: '',
				dingdan: [],
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
			}
		},
		onLoad() {
			setTimeout(() => {
				this.getmemberinfo();
				this.getorderlist();
			}, 1000)
		},
		onPullDownRefresh() {
			this.current_page = 1;
			this.reload = true;
			this.getorderlist();
		},
		onReachBottom() {
			//判断是否最后一页
			if (this.current_page >= this.last_page) {
				this.status = 'noMore';
			} else {
				this.reload = false;
				this.current_page = Number(this.current_page) + 1; //页码+1
				this.status = 'loading';
				this.getorderlist();
			}
		},
		methods: {
			//提现
			refundmoney: function() {
				uni.navigateTo({
					url: '/pages/score_query/money/withdraw?yue=' + this.yue
				})
			},
			//提现日志
			getrefundlist: function() {
				uni.navigateTo({
					url: '/pages/score_query/money/witlist'
				})
			},

			//获取陪诊师信息
			getmemberinfo() {
				var that = this;
				this.commHttpRequest(t.mine.getmemberinfo, {}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						var re = res.data;
						that.name = re.data.name;
						that.pic = t.uurl + re.data.avatar;
						that.yue = re.data.money;
						that.city = re.data.city_name;
					}
				})
			},

			//获取可接/待服务/已完成的订单列表
			getorderlist() {
				this.commHttpRequest(t.mine.getorderlist, {
					status: 2,
					page_num: this.current_page,
					page_list_num: 10
				}, 'get', true, (re) => {
					if (re.data.code === 10000) {
						uni.stopPullDownRefresh();
						var res = re.data;
						this.dingdan = this.reload ? res.data : this.dingdan.concat(res.data.list); //数据 追加
						this.total = res.data.count; //数据量
						this.current_page = res.data.page_num; //当前页码
						this.last_page = this.total / res.data.page_list_num; //总页码
						this.status = res.total == 0 ? 'noMore' : 'more';
					}
				})
			},

			//接单
			receivingorder(id, no) {
				var that = this;
				this.commHttpRequest(t.mine.receivingorder, {
					order_id: id,
					order_no: no
				}, 'post', true, (res) => {
					if (res.data.code === 10000) {
						this.remindMsg(res.data.msg);
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/score_query/score_query2'
							})
						}, 2000)
					}
				})
			},

			edit_avatar: function() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
					}
				});
			},
			//我的订单
			order_query: function(index) {
				uni.navigateTo({
					url: '/pages/score_query/order/order?index=' + index
				})
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

	.uheader {
		width: 750rpx;
		background-color: #0070C0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding-bottom: 20rpx;
	}

	.uni-header-body {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 30rpx;
		margin-left: 68rpx;
	}

	.uni-avatar-image {
		width: 120rpx;
		height: 120rpx;
		border: 1px solid #fff;
		border-radius: 30px;
		margin-right: 20rpx;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.uni-avatar {
		width: 400rpx;
	}

	.uni-avatar-luckname {
		color: white;
		font-size: 42rpx;
		font-weight: bold;
	}

	.uni-avatar-luckname2 {
		color: white;
		font-size: 22rpx;
	}

	.uni-main-board {
		position: relative;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: -30rpx;
	}

	.uni-board {
		margin-top: 40px;
		padding-top: 20rpx;
		width: 700rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
	}

	.uni-margin-top {
		margin-top: 20rpx;
	}

	.uni-height {
		height: 240rpx;
	}

	.text {
		font-size: 28rpx;
		margin-top: 30rpx;
		color: #A2A2A2;
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
		background-color: #E6E6E6;
		margin: 0 30rpx;
	}

	.newdd {
		padding: 20px 0 10px;
		font-weight: bold;
		font-size: 16px;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 50px;
		height: 30px;
	}

	.list-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 18px;
		width: 25px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #A2A2A2;
		margin-right: 10px;
	}

	.list-text {
		flex: 1;
		color: #fff;
		margin-right: 10px;
		margin-top: 6px;
	}

	.utitle {
		font-weight: bold;
		font-size: 16px;
		color: #000;
		padding: 3px 0;
	}
	
	.utitle2 {
		font-weight: bold;
		font-size: 14px;
		color: #000;
		padding: 3px 0;
	}

	.uxx {
		padding: 0 0 3px;
	}

	.utext {
		color: #ff4444;
	}

	.pributton {
		line-height: 2.1;
		font-size: 16px;
		margin-right: inherit;
		width: 50%;
		background-color: #0070C0;
		height: 35px;
	}

	.end {
		color: #A2A2A2;
		font-size: 12px;
		margin: 40px 0;
	}

	.uset {
		width: 40rpx;
		height: 40rpx;
		margin-left: inherit;
	}

	.ulist {
		width: inherit;
		background: #0070C0;
		padding: 1px 0;
	}

	.rlist {
		margin-right: 10px;
		margin-top: 6px;
	}

	.llist {
		margin-left: 10px;
	}
	/* // 重写uni-list-item组件的背景色 */
	/* #ifdef MP-WEIXIN */
	.uni-list-item {
	    background-color: transparent !important;
	}
	/* #endif */
</style>
