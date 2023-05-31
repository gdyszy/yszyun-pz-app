<template>
	<view class="add">
		<view class="addidea-in"  @click="backtalk">
		<image src="/static/button.png"></image>
		</view>
		<getList :allList='datas' :TypeStatus="0"></getList>
		<loadMore :list="datas" :page="page" :totalPage="totalPage" @load="loadMore" />
	</view>
</template>

<script>
	import getList from './getlist.vue'
	var t = require("@/api.js");
	export default {
		components: {
			getList
		},
		data() {
			return {
				datas: [],
				page: 1,
				limit: 10,
				totalPage: 0
			}
		},
		onLoad() {
			this.getConsumerList();
		},
		methods: {
			//获取就诊人
			getConsumerList() {
				this.commHttpRequest(t.home.getconsumerlist, {
					page_num: this.page,
					page_list_num: this.limit
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.datas = res.data.data.list
					}
				})
			},
			loadMore() {
				const page = this.page++
				this.commHttpRequest(t.home.getconsumerlist, {
					page_num: page,
					page_list_num: this.limit
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.datas = [...this.datas, ...res.data.data.list];
					}
				})
			},
			backtalk(){
				uni.navigateTo({
					url: '/pages/sign_query/sign_query'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.add{
		height: calc(100vh - 88rpx);
		background-color: #F5F6F7;
		.addidea-in{
			width: 104rpx;
			height: 104rpx;
			background-color: #16BCC7;
			border-radius: 50%;
			position: fixed;
			left: 0;
			top:0;
			transform: translate(606rpx,1064rpx);
			image{
				width: 104rpx;
				height: 104rpx;
				
			}
			
		}
	}
</style>
