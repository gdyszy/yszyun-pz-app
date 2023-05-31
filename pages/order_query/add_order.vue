<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header">
			<uni-steps :options="[{title: '下订单'}, {title: '待支付'}, {title: '待接单'}, {title: '待服务'}, {title: '已完成'}]" :active="0"></uni-steps>
		</view>
		<view class="detail">
			<view  class="uni-board uni-margin-top">
				<uni-list-item :border="false" :title="servername" clickable rightText="服务内容"
					:thumb="uurl+serverimage"
					thumb-size="lg"  @click="shareToggle" />
			</view>
		</view>
		<uni-section title="基本信息" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :rules="baseFormrules" :model="baseFormData" labelWidth="80px">
					<uni-forms-item label="就诊医院" required name="name">
						<view class="picker picker-content">
							<picker @change="hospitalChange" :value="hospitalIndex" :range="hospitalRange" rangeKey="hospital_name" style="width: 100%">
								<view v-if="!hospital_name"  class="no_hospital_name" >
									<text class="margin-left-xs">请选择</text>
								</view>
								<view v-else  class="hospital_name">{{ hospital_name }}</view>
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="就诊时间" required>
						<uni-datetime-picker type="datetime" :start="date" return-type="string" :clear-icon="false" :hide-second="true" @change="changetime" v-model="baseFormData.yuyuetime" />
						<view v-show="nightmoney" class="night-money-text">{{'如服务时间（'+starttime+'-'+endtime+'），需要额外支付服务费'+nightmoney+'元'}}</view>
					</uni-forms-item>
					<uni-forms-item label="就诊人" required name="name">
							<uni-easyinput v-if="peopleRange.length <= 0" placeholder="请选择" @focus="addpeople"/>
							<view class="picker picker-content"  v-else>
							<picker @change="pepchange" :value="peopleIndex" :range="peopleRange" rangeKey="name" style="width: 100%">
								<view v-if="!people_name"  class="no_hospital_name" >
									<text class="margin-left-xs">请选择</text>
								</view>
								<view v-else  class="hospital_name">{{ people_name }}</view>
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="联系电话" required name="mobile">
						<uni-easyinput v-model="baseFormData.mobile" placeholder="如没有可填写监护人手机号" type="number" maxlength="11" disabled/>
					</uni-forms-item>
					<uni-forms-item label="服务地址" required name="address">
						<uni-easyinput v-model="baseFormData.address" placeholder="请填写服务地址" />
					</uni-forms-item>
					<uni-forms-item label="服务需求" name="remark">
						<uni-easyinput type="textarea" v-model="baseFormData.remark" placeholder="如有其它服务需求请在此填写" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<uni-section title="优惠券" type="line" v-if="baseFormData.consumer_id != 0">
			<view class="example">
				<uni-forms ref="baseForm" :rules="baseFormrules" :model="baseFormData" labelWidth="80px">
					<uni-forms-item label="优惠券" name="coupon">
						<view class="picker picker-content">
							<picker @change="couponchange" :value="couponIndex" :range="couponRange" rangeKey="name" style="width: 100%">
								<view v-if="!coupon_name"  class="no_hospital_name" >
									<text class="margin-left-xs">请选择</text>
								</view>
								<view v-else  class="hospital_name">{{ coupon_name }}</view>
							</picker>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<view class="safeAreaBottom"> </view>
		<view class="bottom-content">
			<!-- 同意服务条款 -->
			<checkbox-group :class="checked == 1 ? 'shake-horizontal' : ''" class="auth-clause" @change="CheckboxChange">
				<checkbox class="orange" :class="checked == 2 ? 'checked' : ''" :checked="checked == 2 ? true : false" value="2" />
				<view>
					我已阅读并同意<text @tap="onDetails(1, '服务条款')">用户协议</text>及<text @tap="onDetails(2, '隐私声明')">隐私权保护声明</text>
				</view>
			</checkbox-group>
			<button class="button-content" @click="submit('baseForm')">确认下单(支付{{cprice ? cprice : price}}元)</button>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<text class="text">{{servername}}服务内容</text>
					<view class="service-content">{{serviceTips}}</view>
					<button class="button-content" @click="closeToggle">我知道了，开始预约</button>
				</view>
			</uni-popup>
			
			<!-- 支付弹窗 -->
			<uni-popup ref="coupon" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<text class="text">{{servername}}订单支付</text>
					<uni-forms-item label="优惠券" name="coupon">
						<!-- <uni-easyinput v-if="hospitalname!=''" v-model="hospitalname" placeholder="请选择" disabled/> -->
						<uni-data-select style="width: 200px;" v-model="baseFormData.coupon_no" :localdata="couponRange" :clear="false" @change="couponchange">
						</uni-data-select>
					</uni-forms-item>
					<button class="button-content" @click="submit('baseForm')">确认下单(支付{{cprice ? cprice : price}}元)</button>
				</view>
			</uni-popup>
		</view>	
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				hospital_name: '',
				hospitalIndex: '',
				people_name: '',
				peopleIndex: '',
				coupon_name: '',
				couponIndex: '',
				checked: 0,
				isChecked:false,
				uurl: t.uurl,
				date: Date.now(),
				// datetime: Date.parse(this.date),
				type: 'center',
				servername: '',
				serverimage: '',
				serviceTips: '',
				cprice: '',
				price: '0.00',
				nightmoney: '',   //夜间服务费
				starttime: '',   //夜间服务开始时间
				endtime: '',   //夜间服务结束时间
				nighttype: '',   //夜间服务结束时间类型 1：当天，2：第二天
				// 基础表单数据
				baseFormData: {
					name: '',
					age: '',
					introduction: '',
					sex: 1,
					hobby: [5],
					yuyuetime: '',
					visit_time: '',
					city_id: '',
					hospital_id: 0,
					consumer_id: 0,
					mobile: '',
					address: '',
					server_id: '',
					remark: '',
					coupon_no: ''   ,//优惠券券码
					client_type: 1   //客户端类型 1app 2小程序
				},
				hospitalRange: [],
				peopleRange: [],
				couponRange: [],
				// 分段器数据
				current: 0,
				// 校验规则
				baseFormrules: {
					mobile: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '服务地址不能为空'
						}]
					},
				}
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		onLoad(option) {
			if(option.price){
				this.price = option.price
			}
			if(option.id){
				this.baseFormData.server_id = option.id
			}
			if(option.hospitalid){
				this.baseFormData.hospital_id = option.hospitalid
			}
			if(option.hospitalname){
				this.hospital_name = option.hospitalname
			}
			if(option.servername){
				this.servername = option.servername
				// if(!option.id){
					this.serverGetList();
				// }
			}
			if(option.icon){
				this.serverimage = option.icon
			}
			if(option.content){
				this.serviceTips = option.content
			}
			if(option.nightmoney){
				this.nightmoney = option.nightmoney
			}
			if(option.starttime){
				this.starttime = option.starttime
			}
			if(option.endtime){
				this.endtime = option.endtime
			}
			if(option.nighttype){
				this.nighttype = option.nighttype
			}
			this.baseFormData.city_id = uni.getStorageSync('cityid');
			this.getConsumerList();
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
			this.$refs.popup.open('bottom')
		},
		mounted() {
			setTimeout(() => {
				this.baseFormData.yuyuetime =  Date.now()
			}, 500)
		},
		methods: {
			onDetails(id, title) {
				uni.navigateTo({
					url: `/pages/service_rule/details?id=${id}&title=${title}`
				})
			},
			CheckboxChange(e) {
				this.checked = e.detail.value;
				this.isChecked = !this.isChecked
			},
			// 获取个人待使用优惠券
			getUserCouponList() {
				var that = this;
				this.commHttpRequest(t.coupon.getusercouponlist, {
					status: 1,
					page_num: 1,
					page_list_num: 10
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						for (var i = 0; i < res.data.data.list.length; i++) {
							const cprice = Number(this.cprice)
							const price = Number(this.price)
							if((this.cprice && cprice >= Number(res.data.data.list[i].low_limit_price)) || price >= Number(res.data.data.list[i].low_limit_price)){
								this.couponRange.push(res.data.data.list[i])
							}
						}
					}
				})
			},
			showPeople(){
			if(this.baseFormData.consumer_id == 0){
				this.remindMsg(`请先选择就诊人`);
				return
			}	
			},
			//选择优惠券后需要修改订单价格
			couponchange(e){
				if(e==""){
					return false
				}
				this.couponIndex = e.target.value;
				this.coupon_name = this.couponRange[e.target.value].name;
				this.baseFormData.coupon_no = this.couponRange[e.target.value].coupon_no;
				this.cprice = (parseFloat(this.price) - parseFloat(this.couponRange[e.target.value].price)).toFixed(2);
			},
			hospitalChange(e){
				this.hospitalIndex = e.target.value;
				this.hospital_name = this.hospitalRange[e.target.value].hospital_name;
				this.baseFormData.hospital_id = this.hospitalRange[e.target.value].hospital_id;
				this.cprice = ''   //切换医院，清除总金额
				this.baseFormData.yuyuetime = Date.now()   //切换医院，清除就诊时间，因为可能会产生夜间服务费   
				this.baseFormData.server_id = this.hospitalRange[e.target.value].id;
				if (this.hospitalRange[e.target.value].discount_price != '0.00'){
					this.price = this.hospitalRange[e.target.value].discount_price
				}else{
					this.price = this.hospitalRange[e.target.value].price
				}
				if(this.hospitalRange[e.target.value].night_other_money != '0.00'){
					this.nightmoney = this.hospitalRange[e.target.value].night_other_money
					this.starttime = this.hospitalRange[e.target.value].night_start_time
					this.endtime = this.hospitalRange[e.target.value].night_end_time
					this.nighttype = this.hospitalRange[e.target.value].night_end_time_type
				}else{
					this.nightmoney = ''
					this.starttime = ''
					this.endtime = ''
					this.nighttype = ''
				}
			},
			// 切换就诊人,带出就诊人电话
			pepchange(e){
				this.peopleIndex = e.target.value;
				this.people_name = this.peopleRange[e.target.value].name;
				this.baseFormData.consumer_id = this.peopleRange[e.target.value].id;
				this.baseFormData.mobile = this.peopleRange[e.target.value].mobile;
				// 获取优惠券
				this.getUserCouponList();
			},
			// 根据服务名获取医院信息和服务信息
			serverGetList(){
				let cityid = uni.getStorageSync('cityid');
				this.commHttpRequest(t.order.servergetlist, {city_id: cityid,
						server_name: this.servername,
						page_num: 1,
						page_list_num: 10},'get', true, (res) => {
					if (res.data.code === 10000) {
						this.hospitalRange = res.data.data.list
						for (var i = 0; i < res.data.data.list.length; i++) {
							if(this.baseFormData.hospital_id == res.data.data.list[i].hospital_id){
								this.baseFormData.server_id = res.data.data.list[i].id
							}
						}
					}
				})
			},
			//获取就诊人
			getConsumerList() {
				this.commHttpRequest(t.home.getconsumerlist, {
					page_num: 1,
					page_list_num: 10
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.peopleRange = res.data.data.list
					}
				})
			},
			// 就诊时间改变时触发计算是否需要夜间服务费
			changetime(e){
				let date = e.split(' ')[0]
				let cstarttime, cendtime, now, begin, end
				cstarttime = date + ' ' + this.starttime
				if(this.nighttype == '2'){
					cendtime = this.dateAdd(date) + ' ' + this.endtime
				} else {
					cendtime = date + ' ' + this.endtime
				}
				now = Date.parse(e)
				begin = Date.parse(cstarttime)
				end = Date.parse(cendtime)
				if(now>=begin && now<=end){
					this.cprice = (parseFloat(this.price)+parseFloat(this.nightmoney)).toFixed(2);
				}else{
					this.cprice = this.price
				}
			},
			// 指定日期加一天
			dateAdd(startDate) {
				startDate = new Date(startDate);
				startDate = +startDate + 1000*60*60*24;
				startDate = new Date(startDate);
				var nextStartDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
				return nextStartDate;
			},
			change(e) {
			},
			shareToggle() {
				this.type = 'bottom'
				this.$refs.popup.open('bottom')
			},
			coupon() {
				if(this.baseFormData.hospital_id == 0){
					this.remindMsg(`请选择就诊医院`);
					return
				}
				if(this.baseFormData.yuyuetime == ''){
					this.remindMsg(`请选择就诊时间`);
					return
				}
				if(this.baseFormData.consumer_id == 0){
					this.remindMsg(`请选择就诊人`);
					return
				}
				if(this.baseFormData.address == ''){
					this.remindMsg(`请填写服务地址`);
					return
				}
				this.type = 'center'
				this.$refs.coupon.open('center')
			},
			closeToggle() {
				this.$refs.popup.close()
			},
			onClickItem(e) {
				this.current = e.currentIndex
			},
			addpeople() {
				uni.navigateTo({
					url: '/pages/sign_query/sign_query?&servername='+this.servername
				})			
			},
			submit(ref) {
				if(this.baseFormData.hospital_id == 0){
					this.remindMsg(`请选择就诊医院`);
					return
				}
				if(this.baseFormData.yuyuetime == ''){
					this.remindMsg(`请选择就诊时间`);
					return
				}
				if(this.baseFormData.consumer_id == 0){
					this.remindMsg(`请选择就诊人`);
					return
				}
				if(this.baseFormData.address == ''){
					this.remindMsg(`请填写服务地址`);
					return
				}
				if(!this.isChecked){
					uni.showToast({
						title: '请勾选同意选项',
						icon: 'none',
						duration: 2000,
					});
					return
				}
				this.$refs[ref].validate().then(res => {
					this.baseFormData.visit_time = Date.parse(this.baseFormData.yuyuetime) ? Date.parse(this.baseFormData.yuyuetime)/1000 : this.baseFormData.yuyuetime/1000;
					// #ifdef APP-PLUS
					this.baseFormData.client_type = 1;
					// #endif
					// #ifdef MP-WEIXIN
					this.baseFormData.client_type = 2;
					// #endif
					this.commHttpRequest(t.order.submitorder, this.baseFormData, 'post', true, (res) => {
						if (res.data.code === 10000) {
							this.remindMsg(res.data.msg);
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
										uni.setStorageSync('index', 2);
									} catch (e) {
									}
							        uni.switchTab({
							        	url: '/pages/tabBar/order/order'
							        })
							    },
							    fail: (e) => {
									this.remindMsg(`您已取消支付`);
									try {
										uni.setStorageSync('index', 1);
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
				}).catch(err => {
				})
			},
		}
	}
</script>

<style lang="scss">
	@import url("../login/auth.css");
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	
	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}
	.header {
		width: 100%;
		height: 120rpx;
		position: relative;
		top: 20rpx;
		// background-color: #f72b36;
	}
	.detail {
		width: 100%;
		height: 120rpx;
		position: relative;
		top: 20rpx;
		background-color: #fff;
		display: flex;
		margin-bottom: 90rpx;
	}
	.uni-board{
		padding-top: 20rpx;
		width: 100%;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		padding-bottom: 20rpx;
	}
	.uni-margin-top{
		margin-top: 20rpx;
	}
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		margin-left: 10px;
	}
	.popup-content {
		// @include flex;
		align-items: center;
		justify-content: center;
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 15px;
		// height: 200px;
		background-color: #fff;
	}
	.text {
		width: 100%;
		height: 99%;
		font-size: 20px;
		color: #333;
		margin-bottom: 30rpx;
		font-weight: 550;
	}
	.service-content {
		border: #333;
		border-radius: 20rpx;
		background-color: #fff2e4;
		color: #ff8400;
		font-size: 20px;
		padding: 10px;
		margin-bottom: 30rpx;
		line-height: 30px;
	}
	.safeAreaBottom {
		height: 300rpx;
		height: calc(env(safe-area-inset-bottom) + 300rpx);
		width: 100%;
	}
	.hospital_name{
		color: #4d4d4d; 
		display: inline-block; 
		padding-right: 5rpx;
	}
	.no_hospital_name{
		color: #b3b3b3; 
		font-size: 30rpx;
	}
	.margin-left-xs{
		padding: 10px;
	}
	.picker-content{
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 5px 10px;
		height: 25px;
	}
	.bottom-content{
		left: 0; 
		position: fixed; 
		bottom: 0; 
		width: 100%; 
		background-color: #FFFFFF; 
		overflow-x: hidden;
		z-index: 1;
	}
	.button-content{
		width: 100%; 
		color: #FFFFFF;
		background-color: #0070C0; 
		height: 50px; 
		margin-top: 10px;
	}
	.night-money-text{
		color: red;
		font-size: 10px;
		position: absolute;
	}
</style>
