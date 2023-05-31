<template>
	<view>
		<view class="wanl-order">
			<!-- 头部 -->
			<view class="header">
				<uni-steps v-if='orderData.status == 5' :options="[{title: '下订单'}, {title: '待支付'}, {title: '待接单'}, {title: '待服务'}, {title: '已取消'}]" :active="4"></uni-steps>
				<uni-steps v-else :options="[{title: '下订单'}, {title: '待支付'}, {title: '待接单'}, {title: '待服务'}, {title: '已完成'}]" :active="orderData.status"></uni-steps>
			</view>
			<!-- 详细信息 -->
			<view class="swiper-box" v-if="orderData.order_no">
				<view class="order bg-white margin-top-bj padding-bj" style="background-color: #fff;padding: 20rpx;">
					<view class="title titles" style="display: flow-root;">
						<view class="text-sm" style="font-size: 20px;font-weight: 500;">订单{{orderData.status | formatStatus}}</view>
						<view class="text-sm" style="font-size: 15px;color: #666666;">期待下次为您服务，如需帮助可联系客服</view>
					</view>
				</view>
				<!-- 详情 -->
				<view class="order bg-white margin-top-bj padding-bj" style="background-color: #fff;padding: 20rpx;margin-top: 30rpx;">
					<view class="title titles">
						<view class="text-sm" style="font-size: 16px;font-weight: 500;">基本信息</view>
						<!-- <view>
							<text class="wlIcon-fanhui3"></text>
						</view> -->
					</view>
					<view class="text-sm">
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">预约服务：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.server_info.server_name}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">就诊医院：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.hospital_info.hospital_name}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">就诊时间：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.visit_time_text}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">就诊人：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.name}}&#160;&#160;&#160;{{orderData.age}} 周岁</text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">就诊人电话：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.mobile}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">服务地址：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.address}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">其他需求：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.remark}} </text>
						</view>
					</view>					
				</view>
				<view class="order bg-white margin-top-bj padding-bj" style="background-color: #fff;padding: 20rpx;margin-top: 30rpx;">
					<view class="title titles">
						<view class="text-sm" style="font-size: 16px;font-weight: 500;">预约信息</view>
						<!-- <view>
							<text class="wlIcon-fanhui3"></text>
						</view> -->
					</view>
					<view class="text-sm">
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">联系电话：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.mobile}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">下单时间：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.create_time_text}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">服务单价：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.price}} 元 </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">夜间服务费：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.night_other_money}} 元 </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">应付金额：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.total_price}} 元 </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">订单编号：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> {{orderData.order_no}} </text>
						</view>
						<view class="item">
							<text class="wanl-gray" style="width: 30%;font-size: 30rpx;color: #828282;">联系客服：</text>
							<text style="width: 70%; text-align: right;font-size: 30rpx;color: #666666;"> </text>
							<button class="contact-btn" open-type="contact" style="display: inline-block;position: absolute;width: 100%;background: salmon;opacity: 0;">a</button>
						</view>
					</view>
				</view>
				<view v-if="orderData.status == 1" style="display: flex;">
					<button type="primary" style="background-color: #0070C0;" class="btn1" @click="submitOrder">确认支付</button>
					<button type="primary" style="background-color: #0070C0;" class="btn1" @click="cancelOrder">取消订单</button>
				</view>
				<view v-if="orderData.status == 2">
					<button type="primary" style="background-color: #0070C0;" class="btn2" @click="cancelOrder">取消订单</button>
				</view>
				<view v-if="orderData.status == 3">
					<button type="primary" style="background-color: #0070C0;" class="btn2" @click="completeOrder">确认完成</button>
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
				orderid: ''
			}
		},
		filters: {
			formatStatus(str){
				if(str=='1') {
					return '待付款'
				}else if(str=='2') {
					return '待接单'
				}else if(str=='3') {
					return '待服务'
				}else if(str=='4') {
					return '已完成'
				}else if(str=='5') {
					return '已取消'
				}else{
					return '未定义'
				}
			}
		},
		onLoad(option) {
			if(option.orderid){
				this.orderid = option.orderid
			}
			this.getOrderInfo();
		},
		methods: {
			// 获取订单详情
			getOrderInfo() {
				this.commHttpRequest(t.order.getorderinfo, {order_id: this.orderid},'get', true, (res) => {
					if (res.data.code === 10000) {
						this.orderData = res.data.data
					}
				})
			},
			//确认订单
			submitOrder(){
				let client_type;
				// #ifdef APP-PLUS
				client_type = 1;
				// #endif
				// #ifdef MP-WEIXIN
				client_type = 2;
				// #endif
				this.commHttpRequest(t.order.payorder, {order_id: this.orderid, client_type: client_type},'post', true, (res) => {
					if (res.data.code === 10000) {
						// uni.showToast({
						// 	title: `订单已支付`
						// })
						uni.requestPayment({
						    provider: 'wxpay',
						   // #ifdef APP-PLUS
						   orderInfo: res.data.data.payment_result,
						   // #endif
						   // #ifdef MP-WEIXIN
						   timeStamp: res.data.data.payment_result.timeStamp,
						   nonceStr: res.data.data.payment_result.nonceStr,
						   package: res.data.data.payment_result.package,
						   signType: res.data.data.payment_result.signType,
						   paySign: res.data.data.payment_result.paySign,
						   // #endif
						    success: (e) => {
						        this.remindMsg(`订单支付成功`);
								try {
									uni.setStorageSync('index', '2');
								} catch (e) {
								}
						        uni.switchTab({
						        	url: '/pages/tabBar/order/order'
						        })
						    },
						    fail: (e) => {
						        this.remindMsg(`您已取消支付`);
								try {
									uni.setStorageSync('index', '1');
								} catch (e) {
								}
								uni.switchTab({
									url: '/pages/tabBar/order/order'
								})
						    },
						    complete: () => {
								this.disabled = false;
						    }
						})
					}
				})
			},
			//取消订单
			cancelOrder(){
				this.commHttpRequest(t.order.cancelorder, {order_id: this.orderid},'post', true, (res) => {
					if (res.data.code === 10000) {
						uni.showToast({
							title: `订单已取消`
						})
						this.getOrderInfo();
					}
				})
			},
			//确认完成订单
			completeOrder(){
				this.commHttpRequest(t.order.finisherorder, {order_id: this.orderid, order_no: this.orderData.order_no},'post', true, (res) => {
					if (res.data.code === 10000) {
						uni.showToast({
							title: `订单已完成`
						})
						try {
							uni.setStorageSync('index', '3');
						} catch (e) {
						}
						uni.switchTab({
							url: '/pages/tabBar/order/order'
						})
					}
				})
			}
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
	.wanl-order{
		margin: 20rpx 20rpx 60rpx;
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
	.wanl-order .lists .price>view{
		display: flex;
		align-items: center;
		justify-content:space-between;
		height: 40rpx;
	}
	
	.wanl-order .lists .cu-btn{
		font-size: 22rpx;
		padding: 0 14rpx;
	}
	
	.cu-list.menu-avatar>.cu-item{
		height: 160rpx;
	}
	.cu-list.menu-avatar>.cu-item .content{
		line-height: 1.4;
	}
	
	.wanl-order .order .title{
		display: flex;
		align-items: center;
		justify-items: center;
		justify-content: space-between;
	}
	.wanl-order .order .item{
		display: flex;
		padding-top: 30rpx;
	}
	.wanl-order .order .foot{
		display: flex;
		position: fixed;
		justify-content: space-around;
		justify-items: center;
		align-items: center;
		padding-top: 25rpx;
		margin-top: 20rpx;
	}
	.wanl-order .order .foot text[class*="wlIcon-"]{
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
	
	.btn1 {
		width: 45%;
		height: 50px;
		margin-top: 20px;
	}
	.btn2 {
		width: 100%;
		height: 50px;
		margin-top: 20px;
	}
	.edgeInsetBottom {
		height: 50rpx;
		width: 100%;
	}
</style>
