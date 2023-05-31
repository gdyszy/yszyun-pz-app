<template>
  <view>
	<wuc-tab :tab-list="tabList" textFlex :tabCur.sync="tabCur" tab-class="text-center text-black bg-white fixed" select-class="text-orange"></wuc-tab>
	<swiper :current="tabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
		<swiper-item v-for="(tab,index) in tabList" :key="index">
			<scroll-view scroll-top="0" scroll-y="true" class="scroll-Y">
				<view v-if="firstRequest" class="uni-loading-content" >
					<view class="uni-loading-fill" ></view>
					<uni-load-more  status="loading" :content-text="{}" />
				</view>
				<view v-else style="height: 100rpx;width: 100%;"/>
				<view v-if="tab.data.length > 0" >
					<view class="uni-order-content" v-for="(item, i) in tab.data" :key="i">
						<view class="uni-media-list" @click="goDetail(item.id)">
							<view class="uni-media-list-logo">
								<image :src="uurl+item.hospital_info.images"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top " style="font-weight: bold;font-size: 35rpx;">{{ item.server_info.server_name }}</view>
								<text class="uni-sub-text-bottom uni-sub-time-text-color " style="font-size: 33rpx;color: #545454;">{{ item.hospital_info.hospital_name }}</text>
								<view class="uni-bottom-subchild "><text class="uni-sub-text-bottom uni-sub-time-text-color " style="font-size: 33rpx;color: #545454;">{{ item.name }}</text></view>
								<view class="uni-bottom-subchild ">
									<text class="uni-sub-text-bottom uni-sub-status-text-color" style="font-size: 30rpx;color: #545454;">{{item.visit_time | formatDate}}</text>
									<uni-countdown v-if="false" class="countdown-margin-left" :font-size="12" :day="1" :hour="2" :minute="30" :second="0" color="#FFFFFF"
										background-color="#C43F37" />
								</view>
							</view>
						</view>
					</view>
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
import { obj2style } from '@/components/wuc-tab/utils/index.js';
import { formatDate } from '@/common/sjcuo.js';
var t = require("@/api.js");
export default {
	components: { WucTab },
    data() {
        return {
			uurl: t.uurl,
			tabCur: '0',
			firstRequest: false,
            tabList: [
				{ 
					name: '全部' ,
					data:[]
				}, 
				{ 
					name: '待支付' ,
					data:[]
				}, 
				{
					name: '待接单' ,
					data:[]
				},  
				{ 
					name: '待服务' ,
					data:[]
				},
				{
					name: '已完成' ,
					data:[]
				},
				{
					name: '已取消' ,
					data:[]
				},
			],
        };
    },
	filters: {
		formatDate(time) {
			time = time * 1000;
			let date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			// hh:mm 获取秒
		},
	},
	onLoad(option){
		this.tabChange(0)
		this.uurl = this.$websiteUrl;
	},
	onShow(option){
		try {
			const index = uni.getStorageSync('index');
			if(index != ''){
				this.tabChange(index);
			}else{
				this.tabChange(0);
			}
			try {
				uni.removeStorageSync('index');
			} catch (e) {
			}
		} catch (e) {
		}
	},
    methods: {
		goDetail: function(orderid){
			uni.navigateTo({
				url:'/pages/order_query/order_query?orderid='+orderid
			})
		},
        tabChange(index) {
            this.tabCur = index;
			this.getOrderList(index);
        },
        swiperChange(e) {
            let { current } = e.target;
            this.tabCur = current;
			this.getOrderList(current);
        },
		getOrderList(index){
			this.commHttpRequest(t.order.getorderlist, {
				page_num: 1,
				page_list_num: 100,
				status: index,
			}, 'get', true, (res) => {
				if (res.data.code === 10000) {
					// if(this.tabList[index].data.length === 0){
						this.firstRequest = true;
						setTimeout(()=>{
							this.tabList[index].data = res.data.data.list
							this.firstRequest = false;
						}, 300);
					// }
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
.scroll-Y{
	height: 100vh;
}
.uni-order-content{
	/* padding: 20rpx 30rpx; */
}
.uni-order-item{
	width: 100%;
	height: 30rpx;
	border-radius: 20rpx;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.uni-loading-content{
	height: 100%;
	display: flex;
	flex-direction: column;
}
.uni-loading-fill{
	flex:0.45;
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
.uni-media-list-body{
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	overflow: hidden;
}
.uni-media-list-logo {
	width: 105rpx;
	height: 105rpx;
}
.nothing {
	font-size: 16px;
	color: #808080;
	margin-top: -80px;
	text-align: center;
}
</style>
