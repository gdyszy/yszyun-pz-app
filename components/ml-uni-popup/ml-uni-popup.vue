<template>
	<view v-if="exist" class="popup " :style="{'z-index':zIndex?zIndex:'999'}"  >
		<view class="content veryfast animated" 
		:class="[{
			'flex-v':types=='bottom'||types=='top',
			'fadeInUp':showFadeInAnimate && types=='bottom',
			'fadeInDown':showFadeInAnimate && types=='top',
			'fadeInLeft':showFadeInAnimate && types=='left',
			'fadeInRight':showFadeInAnimate && types=='right',
			'fadeIn':showFadeInAnimate && types=='center',
			'fadeOutDown':showFadeOutAnimate && types=='bottom',
			'fadeOutUp':showFadeOutAnimate && types=='top',
			'fadeOutRight':showFadeOutAnimate && types=='left',
			'fadeOutLeft':showFadeOutAnimate && types=='right',
			'fadeOut':showFadeOutAnimate && types=='center'
		},'parentClass']">
			<template v-if="types=='bottom'||types=='right'">
				<view class="popup-shelter" @click="close" @touchmove.stop></view>
				<view class="popup-content" :style="{width:types=='right'?percent:'100%',height:types=='bottom'?percent:'100%',background:background,borderTopRightRadius:calSubRadius,borderTopLeftRadius:calSubRadius}">
					<slot></slot>
				</view>
			</template>
			<template v-else-if="types=='top'||types=='left'">
				<view class="popup-content"  :style="{width:types=='left'?percent:'100%',height:types=='top'?percent:'100%',background:background,borderBottomRightRadius:calSubRadius,borderTopRightRadius:calSubRadius}">
					<slot></slot>
				</view>
				<view class="popup-shelter" @click="close"></view>
			</template>
			<template v-else-if="types=='center'">
				<view class="popup-shelter"  @click="close"></view>
				<view class="popup-center">
					<slot></slot>
				</view>
			</template>
		</view>
		
		<view class="mask animated veryfast" :class="{'fadeIn':showFadeInAnimate,'fadeOut':showFadeOutAnimate}"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				isShow:false,
				exist:false,
				showFadeInAnimate:true,
				showFadeOutAnimate:false,
			}
		},
		props:{
			//類型
			types:{
				default:"bottom", //top bottom left right center
			},
			//percent 大小比例
			percent:{
				default:"auto",
				type:String
			},
			//子内容样式類
			subRadius:{
				default:"20",
				type:String
			},
			//背景色
			background:{
				default:"white",
				type:String
			},
			//层級
			zIndex:{
				default:999,
				type:Number
			}
			
		},
		computed:{
			calSubRadius(){
				return parseInt(this.subRadius)?uni.upx2px(parseInt(this.subRadius))+'px':0;
			}
		},
		methods:{
			//关闭
			close(){
				this.showFadeInAnimate = false
				this.showFadeOutAnimate = true
				this.timer = setTimeout(()=>{
					this.$emit("onHide");
					this.showFadeInAnimate = true
					this.showFadeOutAnimate = false
					this.exist=false
				},300)
			},
			//打开
			open(){
				clearTimeout(this.timer)
				this.showFadeInAnimate = true
				this.showFadeOutAnimate = false
				this.exist=true
				this.$emit("onShow");
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url("@/static/animate/animate.min.css");
	.popup{
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		.mask{
			position:absolute;
			width: 100%;
			height: 100%;
			z-index:1;
			background:rgba(0, 0, 0, .6);
		}

		.content{
			top:25%;
			position:absolute;
			width: 100%;
			height:100%;
			z-index:2;
			display:flex;
			display:-webkit-flex;
			display:-webkit-box;
			&.flex-v{
				-webkit-box-orient: vertical;
				-webkit-flex-flow: column;
				flex-flow: column;
			}
			.popup-shelter{
				position:relative;
				flex:1;
				-webkit-flex:1;
				-webkit-box-flex:1;
				
			}
			.popup-content{
				background:white;
			}
			.popup-center{
				position:absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				z-index: 3;
				background:white;
			}
		}

	}
</style>
