<template>
	<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
		:indicator-active-color="indicatorActiveColor" :active-class="activeClass" :changing-class="changingClass"
		:autoplay="autoplay" :current="current" :current-item-id="currentItemId" :interval="interval"
		:duration="duration" :circular="circular" :vertical="vertical" :previous-margin="previousMargin"
		:next-margin="nextMargin" :acceleration="acceleration"
		:disable-programmatic-animation="disableProgrammaticAnimation" :display-multiple-items="displayMultipleItems"
		:skip-hidden-item-layout="skipHiddenItemLayout" :disable-touch="disableTouch" :touchable="touchable"
		:easing-function="easingFunction" @change="swiperChange" @transition="swiperTransition"
		@animationfinish="swiperAnimationfinish">
		<swiper-item v-for="(item,index) in swiperList" :key="index">
				<!-- 1.当前展示为第1项时，swiperList最后一项和第二项的transformOrigin值分别为'right center'和'left center'，其余项值为'center center' -->
				<!-- 2.当前展示为最后一项时，swiperList倒数第2项和第1项的transformOrigin值分别为'right center'和'left center'，其余项值为'center center' -->
				<!-- 3.当前展示为其他项（非第1和最后1项）时，swiperList当前项的前1项和后1项的justifyContent值分别为'right center'和'left center'，其余项值为'center center' -->
				<!-- 4.padding值也需要根据不同项设定不同值，但理同transformOrigin -->
				<view class="swiper_item" :style="{transitionDuration: (duration / 2000) + 's',
					padding: swiperCurrent == 0 
					? index == listLen
						? (vertical ? '0 0 ' + spaceBetween : '0 ' + spaceBetween + ' 0 0 ') 
						: index == swiperCurrent + 1 ? (vertical ? spaceBetween + ' 0 0' : '0 0 0 ' + spaceBetween) : '0'
					: swiperCurrent == listLen
						? index == 0 
							? (vertical ? spaceBetween + ' 0 0' : '0 0 0 ' + spaceBetween)
							: index == swiperCurrent - 1 ? (vertical ? '0 0 ' + spaceBetween : '0 ' + spaceBetween + ' 0 0 ') : '0'
						:index == swiperCurrent + 1 
							? (vertical ? spaceBetween + ' 0 0' : '0 0 0 ' + spaceBetween) 
							: index == swiperCurrent - 1 ? (vertical ? '0 0 ' + spaceBetween : '0 ' + spaceBetween + ' 0 0 ') : '0'}"
					:data-index="index" @click="swiperClick">
					<view class="swiper_item_wrapper" :style="{transform: 'scale(' + (index == swiperCurrent ? 1 : scale) + ')',
							borderRadius: borderRadius,
							transitionDuration: (duration / 2000) + 's',
							transformOrigin: swiperCurrent == 0 
							? index == listLen
								? (vertical ? 'center bottom' : 'right center') 
								: index == swiperCurrent + 1 ? (vertical ? 'center top' : 'left center') : 'center center'
							: swiperCurrent == listLen
								? index == 0 
									? (vertical ? 'center top' : 'left center')
									: index == swiperCurrent - 1 ? (vertical ? 'center bottom' : 'right center') : 'center center'
								:index == swiperCurrent + 1 
									? (vertical ? 'center top' : 'left center') 
									: index == swiperCurrent - 1 ? (vertical ? 'center bottom' : 'right center') : 'center center'}">
							<slot :swiperItem="item" :swiperCurrent="index">
								<image class="image" :src="item.image"></image>
							</slot>
					</view>
				</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "fx-swiper",
		props: {
			indicatorDots: {
				type: Boolean,
				default: true
			},
			indicatorColor: {
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			},
			indicatorActiveColor: {
				type: String,
				default: '#000000'
			},
			activeClass: String,
			changingClass: String,
			autoplay: {
				type: Boolean,
				default: true
			},
			current: {
				type: Number,
				default: 0
			},
			currentItemId: String,
			interval: {
				type: Number,
				default: 3000
			},
			duration: {
				type: Number,
				default: 1000
			},
			circular: {
				type: Boolean,
				default: false
			},
			vertical: {
				type: Boolean,
				default: false
			},
			previousMargin: {
				type: String,
				default: '0px'
			},
			nextMargin: {
				type: String,
				default: '0px'
			},
			acceleration: {
				type: Boolean,
				default: false
			},
			disableProgrammaticAnimation: {
				type: Boolean,
				default: false
			},
			displayMultipleItems: {
				type: Number,
				default: 1
			},
			skipHiddenItemLayout: {
				type: Boolean,
				default: false
			},
			disableTouch: {
				type: Boolean,
				default: false
			},
			touchable: {
				type: Boolean,
				default: true
			},
			easingFunction: {
				type: String,
				default: 'default'
			},
			spaceBetween: {
				type: String,
				default: '0px'
			},
			borderRadius: {
				type: String,
				default: '0px'
			},
			swiperList: Array,
			is3D: {
				type: Boolean,
				default: false
			},
			isSlot: {
				type: Boolean,
				default: false
			},
			scale: {
				type: [Number, String],
				default: 1
			}
		},
		data() {
			return {
				swiperCurrent: 0
			};
		},
		computed: {
			listLen() {
				return this.swiperList.length - 1
			}
		},
		methods: {
			swiperChange(e) {
				this.$emit('change', e);
				this.swiperCurrent = e.detail.current;
			},
			swiperTransition(e) {
				this.$emit('transition', e);
			},
			swiperAnimationfinish(e) {
				this.$emit('animationfinish', e);
			},
			swiperClick(e) {
				let index = e.currentTarget.dataset.index;
				this.$emit('click', index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 100%;
		height: 100%;

		.swiper_item {
			width: 100%;
			height: 100%;
			overflow: hidden;
			backface-visibility: hidden;
			transition-property: all;
			box-sizing: border-box;
			.swiper_item_wrapper {
				width: 100%;
				height: 100%;
				transition-property: all;
				.image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
