<template>
	<view>
		<view class="wanl-order">
			<!-- 头部 -->
			<view class="header">
				<uni-steps :options="[{title: '填写订单'}, {title: '在线支付'}, {title: '专人服务'}, {title: '服务完成'}]"
					:active="orderData.status-1"></uni-steps>
			</view>
			<!-- 详细信息 -->
			<view v-if="orderData.order_no">
				<view class="order bg-white endtxt" v-if="orderData.status==4">
					<view class="title titles" style="display: flow-root;">
						<view class="text-sm" style="font-size: 20px;font-weight: 500;">订单已完成</view>
						<view class="text-sm" style="font-size: 15px;color: #666666;">期待下次为您服务，如需帮助可联系客服</view>
					</view>
				</view>
				<!-- 详情 -->
				<view class="order bg-white" style="margin-top: 30rpx;">
					<view class="title titles">
						<view class="text-sm" style="font-size: 16px;font-weight: 500;">基本信息</view>
						<view>
							<text class="wlIcon-fanhui3"></text>
						</view>
					</view>
					<view class="text-sm">
						<view class="item">
							<text class="wanl-gray">预约服务：</text>
							<text class="textvalue">
								{{orderData.server_info.server_name}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">就诊医院：</text>
							<text class="textvalue">
								{{orderData.hospital_info.hospital_name}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">就诊时间：</text>
							<text class="textvalue">
								{{orderData.visit_time_text}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">就诊人：</text>
							<text class="textvalue">
								{{orderData.name}}&#160;&#160;&#160;{{orderData.age}} 周岁</text>
						</view>
						<view class="item">
							<text class="wanl-gray">就诊人电话：</text>
							<text class="textvalue">
								{{orderData.mobile}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">服务地址：</text>
							<text class="textvalue">
								{{orderData.address}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">其他需求：</text>
							<text class="textvalue">
								{{orderData.remark}} </text>
						</view>
					</view>
				</view>
				<view class="order bg-white" style="margin-top: 30rpx;">
					<view class="title titles">
						<view class="text-sm" style="font-size: 16px;font-weight: 500;">预约信息</view>
						<view>
							<text class="wlIcon-fanhui3"></text>
						</view>
					</view>
					<view class="text-sm">
						<view class="item">
							<text class="wanl-gray">联系电话：</text>
							<text class="textvalue">
								{{orderData.mobile}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">下单时间：</text>
							<text class="textvalue">
								{{orderData.create_time_text}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">应付金额：</text>
							<text class="textvalue">
								{{orderData.server_info.price}} 元 </text>
						</view>
						<view class="item">
							<text class="wanl-gray">订单编号：</text>
							<text class="textvalue">
								{{orderData.order_no}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray">联系客服：</text>
							<text class="textvalue"> </text>
							<button class="contact-btn" open-type="contact">a</button>
						</view>
					</view>
				</view>
				<view class="edgeInsetBottom"> </view>
			</view>
		</view>
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				orderData: {},
				act: 2
				// status:状态 1待付款 2待接单 3待服务 4已完成 5已取消
			}
		},
		onLoad(option) {
			this.getOrderInfo(option.index);
		},
		methods: {
			// 获取订单详情
			getOrderInfo(gid) {
				this.commHttpRequest(t.mine.getorderinfo, {
					order_id: gid
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						// console.log(res)
						this.orderData = res.data.data
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 0;
	}

	.uni-share-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
	}

	.uni-share-button::after {
		border-radius: 50px;
	}

	.wanl-order {
		margin: 20rpx 20rpx;
	}

	.wanl-order .header {
		width: 100%;
		height: 120rpx;
		position: relative;
		top: 20rpx;
		/* background-color: #f72b36; */
	}

	.img-bg {
		width: 180rpx;
		height: 160rpx;
	}

	.wanl-order .header .content {
		width: 100%;
		height: 180rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 60rpx;
		box-sizing: border-box;
	}

	.wanl-order .header .status-text {
		font-size: 34rpx;
		font-weight: 550;
		color: #000000;
		font-weight: medium;
	}

	.wanl-order .header .reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #a6a6a6;
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.wanl-order .header .reason-text {
		padding-right: 12rpx;
	}

	.wanl-order .header .status-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}




	.wanl-order .lists .shopname {
		margin: 25rpx 25rpx 30rpx 25rpx;
	}

	.wanl-order .lists .price>view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40rpx;
	}

	.wanl-order .lists .cu-btn {
		font-size: 22rpx;
		padding: 0 14rpx;
	}

	.cu-list.menu-avatar>.cu-item {
		height: 160rpx;
	}

	.cu-list.menu-avatar>.cu-item .content {
		line-height: 1.4;
	}

	.wanl-order .order {
		background-color: #fff;
		padding: 20rpx;
	}

	.wanl-order .order .title {
		display: flex;
		align-items: center;
		justify-items: center;
		justify-content: space-between;
	}

	.wanl-order .order .item {
		display: flex;
		padding-top: 30rpx;
	}

	.textvalue {
		width: 70%;
		text-align: right;
		font-size: 30rpx;
		color: #666666;
	}

	.wanl-gray {
		width: 30%;
		font-size: 30rpx;
		color: #828282;
	}

	.wanl-order .order .foot {
		display: flex;
		position: fixed;
		justify-content: space-around;
		justify-items: center;
		align-items: center;
		padding-top: 25rpx;
		margin-top: 20rpx;
	}

	.wanl-order .order .foot text[class*="wlIcon-"] {
		color: #0081FF;
		margin-right: 10rpx;
		font-size: 32rpx;
	}

	.wanl-order .wanlian.cu-bar.tabbar {
		background-color: white;
		justify-content: center;
		left: 0;
	}

	.wanlian.cu-bar.tabbar {
		background-color: #f8f8f8;
		padding: 0;
		height: calc(130rpx + env(safe-area-inset-bottom));
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 2;
	}

	.btn {
		width: 710rpx;
		height: 96rpx;
		background-color: #16BCC7;
		margin: 50rpx 0;
		border-radius: 20rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.text-btn {
		font-size: 40rpx;
	}
	
	.contact-btn {
		display: inline-block;position: absolute;width: 100%;background: salmon;opacity: 0;
	}
</style>
