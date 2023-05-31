<template>
	<view class='container'>
		<view class="rep-banner" v-for="(item,index) in allList" :key='index'>
			<view class="repair-item">
				<view style="display: flex;" @click="clickmessage(item.id,index)">
					<view class="ban-image">
						<image src="/static/direct.png" mode=""></image>
					</view>
					<view class="ban-text">
						<view class="ban-text3">
							<view>{{item.name}}</view>
						</view>
						<view class="ban-text2">
							<view class="status" :class="item.status==0?'unAccept':item.status==1?'accepted':(item.status==2?'yiWeiXiu':'')">
								{{item.gender==0?'男':'女'}}&#160;&#160;&#160;{{item.age}}周岁&#160;&#160;&#160;{{item.mobile}}
							</view>
						</view>
					</view>
				</view>
				
				<view >
					<view class="status" >
						<view class="fu-image">
							<!-- <image src="/static/btn_01.png"></image> -->
							<button style="background-color: #0070C0; " type="primary"  @click="isDeleteOrder(item.id)">移除</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="deleteDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提示" content="您确定要移除吗？" @confirm="deleteConsumer"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	var t = require("@/api.js");
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup';
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog';
	export default {
		components: {
			uniPopup,
			uniPopupDialog
		},
		data(){
			return {
				id: ''
			}
		},
		props: {
			allList: {
				type:Array,
				default:[]
			},
			TypeStatus: {
				type: Number,
				default: 0
			}
		},
		methods: {
			// 移除服务对象确认弹框
			isDeleteOrder(id){
				this.id = id
				this.$refs.deleteDialog.open();
			},
			dialogClose(){
				this.$refs.deleteDialog.close();
			},
			clickmessage(id,index) {
				uni.navigateTo({
					url: "./sign_query?consumer_id=" + id
				})
			},
			//删除就诊人信息
			deleteConsumer(){
				this.commHttpRequest(t.home.deleteconsumer, {consumer_id: this.id},'post', true, (res) => {
					if (res.data.code === 10000) {
						this.remindMsg(res.data.msg);
						uni.redirectTo({
							url:'/pages/sign_query/index'
						})
					}
				})
			},
		},
	};
</script>

<style scoped lang="scss">
	.container {
		background-color: #F5F5F7;
		padding: 0;
		box-sizing: border-box;
		.bb {
			border-bottom: 1rpx solid #e6e6e6;
		}

		.rep-banner {
			padding: 32rpx;
			width: 702rpx;
		    margin: 24rpx auto 0;
		    background-color: #FFFFFF;
			border-radius: 10rpx;
			
			.repair-item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				// margin-bottom: 26rpx;
				.ban-image {
					margin-right: 20rpx;

					image {
						height: 90rpx;
						width: 90rpx;
					}
				}

				.status {
					font-size: 24rpx;
					padding-right: 10rpx;
					.fu-image{
						// font-weight: 700;
						
						button {
							font-size: small;
							background-color: #0bb584; 
						}
						image {
							height: 32rpx;
							width: 32rpx;
						}	
					}
				}

		
			}

		}
	}
	.ban-text {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
	
		.ban-text1 {
			margin: 2rpx 0;
			font-size: 30rpx;
			color: rgba(26,26,26,1);
			font-family: PingFang SC;
			font-weight: 700;
			line-height: normal;
			letter-spacing: 0rpx;
			text-align: left;
	
		}
	
		.ban-text2 {
			margin-bottom: 15rpx;
			color: #808080;
			font-size: 24rpx;
			display: flex;
			view {
				margin-left: 40rpx;
			}
			.unAccept {
				color: #f38210;
			}
			
			.accepted {
				color: #33acb4;
			}
			
			.yiWeiXiu{
				color: #0ff9a4;
			}
		}
		
		.ban-text3 {
			font-size: 30rpx;
			color: rgba(26,26,26,1);
			font-family: PingFang SC;
			font-weight: 700;
			line-height: normal;
			letter-spacing: 0rpx;
			display: flex;
			view {
				margin-left: 40rpx;
			}
		}
	}
</style>
