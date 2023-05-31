<template>
	<view class="container">
		<uni-section title="基本信息" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="form"  :model="baseFormData" labelWidth="80px">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="baseFormData.name" placeholder="请填写就诊人姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" required name="age">
						<uni-easyinput v-model="baseFormData.age" placeholder="请填写周岁年龄" type="number" maxlength="3"/>
					</uni-forms-item>
					<uni-forms-item label="性别" required>
						<uni-data-checkbox v-model="baseFormData.gender" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="手机" required name="mobile">
						<uni-easyinput v-model="baseFormData.mobile" placeholder="如没有可填写监护人手机号" type="number" maxlength="11"/>
					</uni-forms-item>
				</uni-forms>
				<button type="primary" style="width: 100%; background-color: #0070C0; height: 50px;" @click="submit('baseForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	var t = require("@/api.js");
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					age: '',
					introduction: '',
					gender: 1,
					city: '',
					skills: 0,
					mobile: ''
				},
				// 表单数据
				alignmentFormData: {
					name: '',
					age: '',
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				// 分段器数据
				current: 0,
				items: ['左对齐', '顶部对齐'],
				// 校验表单数据
				valiFormData: {
					name: '',
					age: '',
					phone: '',
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					},
					mobile: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = (
									/^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/
								); //手机号码
								if (!iphoneReg.test(value)) {
									callback('手机号码格式不正确，请重新填写')
								}
							}
						}]
					},
				},
				servername: '',
				consumer_id: ''  //服务对象ID
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
			if(option.servername){
				this.servername = option.servername
			}
			if(option.consumer_id){
				this.consumer_id = option.consumer_id
				this.getConsumerInfo(option.consumer_id)
			}
		},
		onReady() {
		// 需要在onReady中设置规则
		this.$refs.form.setRules(this.rules)
		},
		methods: {
			onClickItem(e) {
				this.current = e.currentIndex
			},
			getConsumerInfo(consumer_id){
				this.commHttpRequest(t.home.getConsumerInfo, {
					consumer_id: consumer_id
				}, 'get', true, (res) => {
					if (res.data.code === 10000) {
						this.baseFormData = res.data.data
					}
				})
			},
			submit(ref) {
				this.$refs.form.validate().then(res => {
					if(this.consumer_id){
						this.baseFormData = Object.assign(this.baseFormData, {consumer_id: this.consumer_id})
						this.commHttpRequest(t.home.editconsumer, this.baseFormData, 'post', true, (res) => {
							if (res.data.code === 10000) {
								this.remindMsg(res.data.msg);
								let routes = getCurrentPages();
								let prePage = routes[routes.length - 2];
								prePage.$vm.getConsumerList();
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}else{
						this.commHttpRequest(t.home.addconsumer, this.baseFormData, 'post', true, (res) => {
							if (res.data.code === 10000) {
								this.remindMsg(res.data.msg);
								let routes = getCurrentPages();
								let prePage = routes[routes.length - 2];
								prePage.$vm.getConsumerList();
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}
				}).catch(err => {
					console.log("错误信息",JSON.stringify(err))
				})
			},
		}
	}
</script>

<style lang="scss">
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
</style>
