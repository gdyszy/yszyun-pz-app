<template>
	<view class="mtop">
		<view class="edgeInsetTop"> </view>

		<view class="padding-bj bg-white money">
			<view class="text-lg">
				<text>提现金额</text>
			</view>
			<view class="margin-tb-bj price">
				<view class="symbol">
					<text>￥</text>
				</view>
				<view >
					<!-- <uni-easyinput v-model="money" @input="replaceInput"  trim="all" placeholder="请输入提现金额" type="number" maxlength="5" inputBorder="false"/> -->
			<input type="number" maxlength="5" focus @input="replaceInput" placeholder="请输入提现金额"/>
				</view><!--  -->
				<!-- <view class="text-lg wanl-gray-light" @tap="emptyInput" v-if="money">
					<text class="wlIcon-shibai"></text>
				</view> -->
			</view>
			<view class="solid-top padding-top-bj">
				<text class="wanl-gray-light">可用余额</text>
				<text class="wanl-gray-light margin-lr-xs text-price">{{usermoney}}</text>
			</view>
		</view>
		<view class="padding-bj margin-top">
			<!-- 1.0.5升级 -->
			<button class="mix-btn wanl-bg-redorange" :loading="loading" :disabled="disabled" @tap="withdraw">提现</button>
		</view>
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				bankData: null,
				usermoney: 0,
				money: null,
				loading: false,
				disabled: false,
			};
		},
		onLoad(option) {
			this.usermoney = option.yue;
			if(option.yue <= 0){
				this.disabled = true
			}
		},
		methods: {
			withdraw() {
				let _this =  this;
				if (this.loading) return;
				this.loading = true;
				this.disabled = true;
				let client_type;
				// #ifdef APP-PLUS
				client_type = 1;
				// #endif
				// #ifdef MP-WEIXIN
				client_type = 2;
				// #endif
				if (this.money==null) {
					this.remindMsg('请填写金额，再提现。');
					this.loading = false;
					this.disabled = false;
					return;
				}	
				let money = parseFloat(this.money),
					usermoney = parseFloat(this.usermoney);
				
				if (money <= 0) {
					this.remindMsg('请填写正确金额');
					this.loading = false;
					this.disabled = false;
					return;
				}
				if (money > 200) {
					this.remindMsg('提现金额不能超过200元');
					this.loading = false;
					this.disabled = false;
					return;
				}
				if (money > usermoney) {
					this.remindMsg('提现金额不能超过 ' + usermoney + ' 元');
					this.loading = false;
					this.disabled = false;
					return;
				}
				this.commHttpRequest(t.mine.refundmoney, {
					money: money,
					client_type: client_type
				}, 'post', true, (res) => {
					this.remindMsg('提现申请已提交，请等待审批');
					setTimeout(() => {
						uni.navigateBack();
					}, 2000)

				})
				this.loading = false;
				this.disabled = false;
			},
				replaceInput(e) {
								this.money = e.target.value;
							},	
			emptyInput() {
				this.money = null;
			}
		}
	}
</script>

<style>
	@import '@/common/wanlnvue.css';
	@import '@/common/wanlshop.css';
	@import '@/common/iconfont.css';

	.bg-white {
		background-color: #FFFFFF;
		padding-top: 40px;
	}
	
	.mtop {
		margin-top: 15px;
	}

	.wanl-withdraw .money .symbol {
		font-size: 60rpx;
		margin-right: 10rpx;
	}

	.wanl-withdraw .money  {
		display: flex;
		align-items: center;
	}
	.price{
		padding-top: 10px;
		display: flex;
		align-items: center;
	}
	.wanl-withdraw .money .price input {
		/* #ifdef MP */
		height: 100rpx;
		min-height: 100rpx;
		/* #endif */
		width: 100%;
		font-size: 100rpx;
	}

	.wanl-withdraw .bank {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		padding: 20rpx 25rpx;
	}

	.wanl-withdraw .bank image {
		width: 100rpx;
		height: 100rpx;
		margin-right: 25rpx;
	}

	.wanl-withdraw .bank .content {
		flex: 1;
	}

	.wanl-withdraw .bank .action {}
</style>