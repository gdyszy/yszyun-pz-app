<template>
	<view class="wanl-order-list">
		<swiper style="height: calc(100% - 60rpx)" duration="300">
			<swiper-item class="tab-content" v-for="(tag, key) in navList" :key="key">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<wanl-empty text="没有找到任何优惠券" src="ticket_default3x" v-if="tag.loaded === true && tag.cardList.length === 0"/>
					<!-- 订单列表 -->
					<view class="wanl-coupon">
						<view v-for="(coupon, seat) in tag.cardList" :key="seat" :class="coupon.type" class="item margin-bj radius-bock"  @tap="onDetails(coupon)">
							<image :src="('/static/coupon/bg_coupon_3x.png')" class="coupon-bg"></image>
							<image :src="('/static/coupon/img_couponcentre_received_3x.png')" class="coupon-sign" v-if="coupon.state"></image>
							<view class="item-left">
								<block v-if="coupon.coupon_type == '1' ||coupon.coupon_type == '2' ||coupon.coupon_type == '3'|| (coupon.type == 'vip' && coupon.usertype == 'reduction')">
									<view class="colour">
										<text class="text-price"></text>
										<text class="price">{{Number(coupon.price)}}</text>
									</view>
									<view class="cu-tag wanl-gray-dark radius text-sm">
										满{{Number(coupon.low_limit_price)}}减{{Number(coupon.price)}}
									</view>
								</block>
								<block v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
									<view class="colour">
										<text class="price">{{Number(coupon.discount)}}</text>
										<text class="discount">折</text>
									</view>
									<view class="cu-tag wanl-gray-dark radius text-sm">
										满{{Number(coupon.limit)}}打{{Number(coupon.discount)}}折
									</view>
								</block>
								<block v-if="coupon.type == 'shipping'">
									<view class="colour">
										<text class="price">包邮</text>
									</view>
									<view class="cu-tag wanl-gray-dark radius text-sm">
										满{{Number(coupon.limit)}}元包邮
									</view>
								</block>
							</view>
							<view class="item-right padding-bj">
								<view class="shop">
									<view class="name">
										<text class="wlIcon-dianpu margin-right-xs"></text> 平台券
									</view>
									<view>
										<!-- <text class="wlIcon-fanhui2"></text> -->
									</view>
								</view>
								<view class="title">
									<view class="cu-tag sm radius margin-right-xs tagstyle">
										{{scence(coupon.coupon_type)}}
									</view>
									<text class="text-cut wanl-gray text-min">{{coupon.name}}</text>
								</view>
								<view class="content text-min" style="display: flex;flex-direction: row;">
									<view class="wanl-gray">
										
										<!-- <view v-if="coupon.grant != '-1'">
											<text class="wlIcon-dot"></text>目前仅剩余 {{coupon.surplus}} 张
										</view> -->
										
										<view v-if="coupon.drawlimit != 0">
											<text class="wlIcon-dot"></text>每人仅限领取 {{coupon.draw_limit}} 张
										</view>
										<block v-if="coupon.expire_type == 2">
											<!-- <view>
												<text class="wlIcon-dot"></text>生效 {{coupon.startdate}}
											</view> -->
											<view>
												<text class="wlIcon-dot"></text>截止日期 {{coupon.validity_end_time | timeStamp}}
											</view>
										</block>
										<block v-if="coupon.expire_type == 1">
											<!-- <view v-if="coupon.validity == 0">
												<text class="wlIcon-dot"></text>未使用前 永久 有效
											</view> -->
											<view>
												<text class="wlIcon-dot"></text>领取后 {{coupon.validity_day}} 天有效
											</view>
										</block>
									</view>
									<view class="cu-btn sm round btn-corlor" @tap.stop="onReceive(key,seat)">
										立即领取
									</view>
								</view>
							</view>
						</view>
					</view>
					
					
					
					<uni-load-more :status="tag.loadingType" :content-text="contentText"/>
					<view class="edgeInsetBottom"></view> 
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var t = require("@/api.js");
	import {timeStamp} from '@/utils/time.js';
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [
					{
						status: 1,
						text: '领券中心',
						loadingType: 'more',
						current_page: 1,
						cardList: []
					}
				],
				contentText: {
					contentdown: ' ',
					contentrefresh: '正在加载...',
					contentnomore: ''
				}
			};
		},
		onLoad(options) {
			this.loadData();
		},
		filters: {
			timeStamp,
		},
		methods: {
			scence(type){
				let scoreType=new Map([
					[1,'满减券'],[2,'新人券'],[3,'日常送券']
				])
				return scoreType.get(type) || '未知类型';
			},
			//获取订单列表
			async loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let status = navItem.status;
				console.log(navItem.loadingType,navItem.loaded,source,navItem.loadingType)
				//判断是否最后一页
				if (navItem.loadingType == 'noMore') {
					return;
				}
				//tab切换只有第一次需要加载数据
				if (source === 'tabChange' && navItem.loaded === true) {
					return;
				}
				//防止重复加载
				if (navItem.loadingType === 'loading') {
					return;
				}
				navItem.loadingType = 'loading';
				// 获取列表
				this.commHttpRequest(t.coupon.getcancouponlist, {
					page_num: navItem.current_page,
					page_list_num: 10
				}, 'get', true, (res) => {
					let  page_num = Math.ceil(res.data.data.count/res.data.data.page_list_num);
					if (res.data.code == 10000 ){
						navItem.current_page = res.data.data.page_num; //当前页码
						if (page_num <= res.data.data.page_num) {
							navItem.loadingType = 'noMore';
						} else {
							navItem.loadingType = 'more';
							navItem.current_page++;
						}
						let cardList = res.data.data.list.filter(item => {
							item = Object.assign(item, {
								state: false
							});
							return Number(item.status) === status;
						});
						cardList.forEach(item => {
							navItem.cardList.push(item);
						});
						this.$set(navItem, 'loaded', true);
					}else {
						// this.loading = false
						// this.$wanlshop.msg(`错误信息:` + res.desc);
						uni.showToast({
							title:`错误信息:` + res.desc,
							icon:'none'
						})
						return
					}
				})
				
			},
			// 领取优惠券
			async onReceive(key,seat) {
					let coupon = this.navList[key].cardList[seat];
				this.commHttpRequest(t.coupon.drawcoupon, {coupon_id: coupon.id}, 'post', true, (res) => {
					if (res.data.code === 10000) {
						coupon.id = res.id;
						coupon.state = true;
						// this.$wanlshop.msg(res.desc);
						uni.showToast({
							title:res.desc,
							icon:'none'
						})
						setTimeout(() => {
							let routes = getCurrentPages();
							let curPage = routes[routes.length - 2];
							// console.log("curPage",curPage)
							curPage.$vm.init();
							curPage.$vm.loadData();
							uni.navigateBack({delta:1})
						},1000)
						
						this.remindMsg(res.data.msg);
						this.loadData();
					}
				})
			},
			onDetails(data){
				// uni.navigateTo({
				// 	url:`/pages/user/coupon/details?data=${JSON.stringify(data)}`
				// })
			}
		}
	};
</script>

<style>
	@import '/common/colorui.css';
	@import '/common/iconfont.css';
	page {
		height: 100%;
	}
	.wanl-order-list .navbar {
		margin-top: 26%;
		background-color: #FFFFFF;
		display: flex;
	    height: 100rpx;
	    color: #16BCC7;
	    font-size: 26rpx;
	    z-index: 10;
	}
	.wanl-coupon .item .item-left {
	    width: 218rpx;
	    height: 210rpx;
	    position: relative;
	    z-index: 2;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    flex-direction: column;
	    flex-shrink: 0;
		/* background-color: #16BCC7;
		color: #FFFFFF; */
	}
	.title {
	    margin: 10rpx 0;
	    display: flex;
	    justify-content: space-between;
	}
	.colour {
	    color: #ff4f00;
	}
	.tagstyle {
	    background-color: #fff0e6;
	    color: #ff4f00;
	}
	.btn-corlor{
		color: #1CA3AD;
	}
</style>
