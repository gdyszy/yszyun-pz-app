<template>
	<view>
		<uni-section title="基本信息" type="line">
			<view class="example">
				<uni-forms ref="form" :model="baseFormData" labelWidth="85px">
					<uni-forms-item label="头像" required>
						<easyUpload ref="upload" :uploadUrl="uploadImg.uploadUrl" @successImage="successImage"
							@deleteSuccess="deleteSuccess" :uploadIcon="uploadImg.uploadIcon"
							:clearIcon="uploadImg.clearIcon" @imgCount="imgCount" :autoUpload="true" />
					</uni-forms-item>
					<uni-forms-item label="性别" required>
						<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="手机" required name="phone">
						<uni-easyinput v-model="baseFormData.phone" placeholder="请填写您的手机号" type="number" maxlength="11"/>
					</uni-forms-item>
					<uni-forms-item label="姓名" required name="idname">
						<uni-easyinput v-model="baseFormData.idname" placeholder="请填写身份证姓名,否则无法正常提现" />
					</uni-forms-item>
					<uni-forms-item label="身份证号" required name="idno">
						<uni-easyinput v-model="baseFormData.idno" placeholder="请填写身份证号" maxlength="18"/>
					</uni-forms-item>
					<uni-forms-item label="身份证照片(正反面)" required>
						<easyUpload ref="upload" :uploadUrl="uploadidcard.uploadUrl" @successImage="succidcardImage"
							@deleteSuccess="delidcardSuccess" :uploadIcon="uploadidcard.uploadIcon"
							:clearIcon="uploadidcard.clearIcon" :uploadCount=2 @imgCount="idcardCount"
							:autoUpload="true" />
					</uni-forms-item>
				</uni-forms>
				<button class="button" @click="submit('baseForm')">注册成为陪诊师</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import easyUpload from '@/components/easyUpload/easy-upload.vue';
	var t = require("@/api.js");

	export default {
		components: {
			easyUpload
		},
		data() {
			return {
				uploadImg: {
					uploadUrl: t.upload,
					uploadIcon: '/static/btn_02_add.png',
					clearIcon: '/static/btn_03_del.png',
					photoCount: 0,
					photoStr: '',
					photoArr: [],
				},
				uploadidcard: {
					uploadUrl: t.upload,
					uploadIcon: '/static/btn_02_add.png',
					clearIcon: '/static/btn_03_del.png',
					photoCount: 0,
					photo1Str: '',
					photo2Str: '',
					photoArr: [],
				},
				// 基础表单数据
				baseFormData: {
					sex: 1,
					phone: '',
					idname: '',
					idno: ''
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 0
				}],
				// 校验规则
				rules: {
					phone: {
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
					idname: {
						rules: [{
							required: true,
							errorMessage: '身份证姓名不能为空'
						}]
					},
					idno: {
						rules: [{
							required: true,
							errorMessage: '身份证号不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = (
									/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
								); //
								if (!iphoneReg.test(value)) {
									callback('身份证格式不正确，请重新填写')
								}
							}
						}]
					}
				}
			}
		},
		onLoad() {},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			// 上传身份证
			succidcardImage(singlePic) {
				this.uploadidcard.photoArr.unshift(singlePic);
				this.uploadidcard.photo1Str = this.uploadidcard.photoArr[0].url;
				if (this.uploadidcard.photoCount > 0) {
					this.uploadidcard.photo2Str = this.uploadidcard.photoArr[1].url;
				}
			},
			delidcardSuccess(singlePicArr) {
				this.uploadidcard.photoArr = singlePicArr;
			},
			idcardCount(num) {
				this.uploadidcard.photoCount = num.length;
				if (this.uploadidcard.photoCount == 0) {
					this.uploadidcard.photoArr = [];
					this.uploadidcard.photoStr = '';
				}
			},
			// 上传头像
			successImage(singlePic) {
				this.uploadImg.photoArr.unshift(singlePic);
				this.uploadImg.photoStr = this.uploadImg.photoArr[0].url;
			},
			deleteSuccess(singlePicArr) {
				this.uploadImg.photoArr = singlePicArr;
			},
			imgCount(num) {
				this.uploadImg.photoCount = num.length;
				if (this.uploadImg.photoCount == 0) {
					this.uploadImg.photoArr = [];
					this.uploadImg.photoStr = '';
				}
			},
			// 提交
			submit(ref) {
				this.$refs.form.validate().then(res => {
					if (!this.uploadImg.photoStr) {
						this.remindMsg('请上传头像');
						return;
					}


					if (!this.uploadidcard.photo1Str || !this.uploadidcard.photo2Str || this.uploadidcard
						.photoCount < 2) {
						this.remindMsg('请上传身份证正反面');
						return;
					}

					var params = {
						name: res.idname,
						idcard: res.idno,
						idcard_images_one: this.uploadidcard.photo1Str,
						idcard_images_two: this.uploadidcard.photo2Str,
						mobile: res.phone,
						avatar: this.uploadImg.photoStr,
						gender: this.baseFormData.sex,
						city_id: uni.getStorageSync('cityid')
					};
					this.commHttpRequest(t.mine.submitapply, params, 'post', true, (res) => {
						this.remindMsg(res.data.msg);
						setTimeout(() => {
							try {
								uni.setStorageSync('peizhen', 'peizhen');
							} catch (e) {
							}
							uni.switchTab({
								url: '/pages/tabBar/mine/mine'
							})
						},2000)
					})
				}).catch(err => {
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

	.button {
		width: 100%;
		height: 50px;
		color: #FFFFFF;
		background-color: #0070C0; 
	}
</style>
