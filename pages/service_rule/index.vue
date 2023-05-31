<template>
	<view class="nessction">
		<view class="neartable">
			<view class="neartable-in">
				<view class="contents" @tap="onDetails(item.id, item.title)" v-for="(item, index) in disclaimerlist" :key="index" :data-key="item.id"> 
					<view><image src="/static/Ico_36_list_01.svg"></image>{{item.title}}</view> 
					<image src="/static/Btn_nextpage.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data(){
			return {
				disclaimerlist: {}
			}
		},
		onLoad(){
			this.getdisclaimerlist();
		},
		methods:{
			getdisclaimerlist() {
				this.commHttpRequest(t.home.getdisclaimerlist, {page_num: 1,
								page_list_num: 10}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.disclaimerlist = res.data.data.list
					}
				})
			},
			onDetails(id, title) {
				uni.navigateTo({
					url: `/pages/service_rule/details?id=${id}&title=${title}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.neartable{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		padding: 0 24rpx;
		.neartable-in{
			.contents{
				height: 126rpx;
				border-bottom: 2rpx solid #EDEDED;
				align-items: left!important;
				
				display: flex;
				justify-content: space-between;
				view{
					height: 100%;
					display: flex;
					align-items: center;
					image{
						width: 72rpx;
						height: 72rpx;
						margin: 0 20rpx 0rpx 8rpx;
					}
				}
				image{
					width: 48rpx;
					height: 48rpx;
					// margin: 40rpx 0 0  422rpx;
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
