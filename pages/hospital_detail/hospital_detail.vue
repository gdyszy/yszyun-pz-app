<template>
	<view class="page">
		<scroll-view scroll-top="0" scroll-y="true" class="scroll-Y">
			<view class="topview">
				<image class="uni-header-image" mode="widthFix" src='/static/portal/home_background.png' />

				<view class="xqview">
					<view style="width: 100%;margin-bottom: 10px;">
						<!-- <image class="hospimage" :src='uurl+xq.images' /> -->
						<text class="hospname">{{xq.hospital_name}}</text>
					</view>
					<view class="hospcontent">
						<!-- #ifdef APP-PLUS -->
						<uni-list-item :border="false" :title="xq.short_description" rightText="转发" clickable showArrow
							:thumb='uurl+xq.images' thumb-size="lg" @click="shareToggle" />
						<!-- #endif -->	
						<!-- #ifdef MP-WEIXIN -->
						<uni-list-item :border="false" :title="xq.short_description" rightText="转发" clickable showArrow
							:thumb='uurl+xq.images' thumb-size="lg" />
						<button id="shareBtn" data-name="shareBtn" open-type="share">转发</button>
						<!-- #endif -->	
						<uni-list-item :border="false" :title="xq.address" rightText="导航" clickable showArrow
							thumb="/static/Ico28px_Addres.svg" thumb-size="lg" @click="forward()" />
					</view>
				</view>
			</view>

			<view class="tui-spike">
				<view class="tui-spike-box">
					<view class="tui-spike-title">在线预约您需要的服务</view>
				</view>
				<view v-for="(value, index) in newsArr" :key="index">
					<view hover-class="uni-list-cell-hover">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="uurl+value.images"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top sname">
									{{ value.server_name }}
								</view>
								<view class="scontent">
									{{ value.content }}
								</view>
								<view>
									<text :class="value.discount_price != '0.00' ? 'dprice' : 'sprice'">{{value.price}}/次</text>
									<text v-show="value.discount_price != '0.00'" class="fprice">{{value.discount_price}}/次</text>
									<uni-countdown v-if="value.countdown" :font-size="12" :day="1" :hour="2"
										:minute="30" :second="0" color="#FFFFFF" background-color="#C43F37" />
								</view>
							</view>
							<button @tap="addorder(value.id, value.hospital_id, value.server_name, value.hospital_name, value.price, value.discount_price, value.images, value.content, value.have_night_server, value.night_other_money, value.night_start_time, value.night_end_time, value.night_end_time_type)" class="sbtn">
								<text>预约</text>
							</button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 分享示例 -->
		<view>
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share @select="select"></uni-popup-share>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	var t = require("@/api.js");

	export default {
		components: {
			WucTab
		},
		data() {
			return {
				uurl: t.uurl,
				xq: [],
				newsArr: [],
				latitude: '',
				longitude: ''
			}
		},
		onLoad(e) {
			let tempVal = JSON.parse(decodeURIComponent(e.xq))
			this.xq = tempVal;
			this.getList();
		},
		//分享到朋友
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		    }
		    return {
		        type: 0,
		        href: "https://www.yszyun.com/",
		        title: "陪诊服务",
		        summary: "陪诊服务APP，您身边的就诊好帮手！",
		        imageUrl: this.$websiteUrl+"/peizhen.png",
		    }
		},
		//分享到朋友圈
		onShareTimeline(res) {
		    return {
		        type: 0,
		        href: "https://www.yszyun.com/",
		        title: "陪诊服务",
		        summary: "陪诊服务APP，您身边的就诊好帮手！",
		        imageUrl:  this.$websiteUrl+"/peizhen2.png",
		    }
		},
		methods: {
			//获取医院服务
			getList() {
				this.commHttpRequest(t.home.gethospitallist, {
					city_id: this.xq.city_id,
					hospital_id: this.xq.id,
					page_num: 1,
					page_list_num: 10
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.newsArr = res.data.data.list
					}
				})
			},

			addorder: function(id, hospitalid, servername, hospitalname, price, dprice, icon, content, nightserver, nightmoney, starttime, endtime, nighttype) {
				let sprice = price
				if (dprice != '0.00'){
					sprice = dprice
				}
				if (nightserver == 1){
					uni.navigateTo({
						url: "/pages/order_query/add_order?id="+id+'&hospitalid='+hospitalid+'&servername='+servername+'&hospitalname='+hospitalname+'&price='+sprice+'&icon='+icon+'&content='+content+'&nightmoney='+nightmoney+'&starttime='+starttime+'&endtime='+endtime+'&nighttype='+nighttype
					})
				} else {
					uni.navigateTo({
						url: "/pages/order_query/add_order?id="+id+'&hospitalid='+hospitalid+'&servername='+servername+'&hospitalname='+hospitalname+'&price='+sprice+'&icon='+icon+'&content='+content
					})
				}
			},
			shareToggle() {
				this.$refs.share.open()
			},
			select(e) {
				if(e.item.name == 'wechat'){
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: "https://www.yszyun.com/",
						title: "陪诊服务",
						summary: "陪诊服务APP，您身边的就诊好帮手！",
						imageUrl:  this.$websiteUrl+"/peizhen.png",
						success: function (res) {
						},
						fail: function (err) {
						}
					});
				}else if(e.item.name == 'moments'){
					uni.share({
						provider: "weixin",
						scene: "WXSceneTimeline",
						type: 0,
						href: "https://www.yszyun.com/",
						title: "陪诊服务",
						summary: "陪诊服务APP，您身边的就诊好帮手！",
						imageUrl:  this.$websiteUrl+"/peizhen.png",
						success: function (res) {
						},
						fail: function (err) {
						}
					});
				}
			},
			forward(){
				// 获取地址的经纬度
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/geo?address='+this.xq.address+'&key=0a9f67a6f8f7cc3315d30846a0fde88b',
					method: "get",
					success(res) {
						if (res.data.status == 1) {
							const address = res.data.geocodes[0].location.split(",");
							// 这里转化为数字类型，因为这里是用腾讯内置地图map来显示，需要转为number类型才显示
							const latitude = Number(address[1]);  
							const longitude = Number(address[0]);
							// 根据经纬度在地图中标记出来
							uni.openLocation({
								latitude: latitude,
								longitude: longitude,
								success: function () {
								}
							});
						}
					},
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.body {
		width: 750rpx;
		height: 100%;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		display: flex;
		background-color: #333;
	}

	.scroll-Y {
		height: 100%;
		margin-bottom: 90rpx;
	}

	.topview {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		border-radius: 20rpx;
	}

	.uni-header-image {
		width: 750rpx;
	}

	.xqview {
		margin: 20rpx;
		margin-top: -500rpx;
		width: 90%;
	}

	.hospimage {
		width: 200rpx;
		height: 200rpx;
	}

	.hospname {
		font-weight: bold;
		font-size: 35rpx;
		color: #FFF;
		margin-left: 5rpx;
		position: relative;
	}
	
	.hospcontent {
		border-radius: 10px;
		background-color: #FFFFFF;
		border: 1px solid #FFFFFF;
	}

	.uni-media-list {
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
		margin: 10rpx;
	}
	
	// 重写uni-list-item组件的背景色
	/* #ifdef MP-WEIXIN */
	.uni-list-item {
	    background-color: transparent !important;
	}
	/* #endif */
	.uni-media-list-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
		// text-overflow: ellipsis;
		// white-space: nowrap;
		// width: 70%;
	}

	.sname {
		font-weight: bold;
		font-size: 35rpx;
	}

	.scontent {
		// font-weight: bold;
		font-size: 33rpx;
		color: darkcyan;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 90%;
		overflow: hidden;
	}

	.sprice {
		font-weight: bold;
		font-size: 30rpx;
		color: seagreen;
	}
	.dprice {
		text-decoration: line-through;
		font-weight: bold;
		font-size: 30rpx;
		color: seagreen;
	}
	.fprice {
		margin-left: 5px;
		font-weight: bold;
		font-size: 30rpx;
		color: seagreen;
	}

	.sbtn {
		background-color: #0070C0;
		color: #FFFFFF;
		height: 1%;
		align-self: center;
		font-size: 30rpx;
	}

	.tui-spike {
		background-color: white;
		margin: 20rpx;
		margin-top: 100rpx;
	}

	.tui-spike-box {
		background: #fff;
		margin-top: 20rpx;
	}

	.tui-spike-title {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		font-size: 35rpx;
		color: #333;
		font-weight: bold;
	}

	.uni-media-list-logo {
		width: 130rpx;
		height: 130rpx;
	}
	#shareBtn {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
