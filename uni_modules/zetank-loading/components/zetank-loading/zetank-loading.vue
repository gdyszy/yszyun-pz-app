<template>
	<view v-if="show">
		<!-- 遮罩loading -->
		<view class="fullloading" :style="{backgroundColor: bgcolor}" v-if="type === 'fullloading'&& fullloadingShow">
			<view class="loadicon">
				<slot>
					<loading1></loading1>
				</slot>
			</view>
			<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
		</view>
		<!-- 底部loading -->
		<view class="bottomloading" v-if="type === 'bottomloading'">
			<view class="loadicon">
				<slot>
					<loading8></loading8>
				</slot>
			</view>
			<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
		</view>
		<!-- 无更多 -->
		<view class="nomore" v-if="type === 'nomore'">
			<view class="text"  :style="{fontSize:textsize+'rpx',color:textcolor}">{{text?text:'-- 我是有底线的 --'}}</view>
		</view>
		<!-- 无数据 -->
		<view class="nodata" v-if="type === 'nodata'">
			<view style="flex:0.35;"></view>
			<image :src="emptyImages" :style="{width:imagewidth+'rpx',height:imageheight+'rpx'}"></image>
			<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
		</view>
	</view>
</template>
<script>
	import emptyImages from './emptyImage.js';
	export default {
		props: {
			emptyImages: {
				type: String,
				default:emptyImages.data,
				
			},
			text: {
				type: String,
				default:''
			},
			imagewidth: {
				type: [Number, String],
				default:500
			},
			imageheight: {
				type: [Number, String],
				default:500
			},
			textcolor: {
				type: String,
				default:"gray"
			},
			textsize: {
				type: [Number, String],
				default:28
			},
			bgcolor: {
				type: String,
				default:'#ffffff'
			},
			show: {
				type: Boolean,
				default:false
			},
			type:{
				type: String,
				default:"fullloading"
			}
		},
		data() {
			return {
				fullloadingShow:true
			}
		},
		methods: {
			open(){
				this.fullloadingShow=true
			},
			hide(){
				this.fullloadingShow=false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.fullloading{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		text-align: center;
		z-index: 99999;
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		.loadicon{
			padding: 50rpx;
		}
	}
	
	.bottomloading{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.loadicon{
			//padding: 15rpx;
		}
		
	}
	.nomore{
		padding: 15rpx;
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nodata{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		text-align: center;
		z-index: 99999;
		display: flex;
		flex-direction:column;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
</style>