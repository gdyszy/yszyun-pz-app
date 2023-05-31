<template>
	<view>
		<template v-if="scroll">
			<view class="scroll-view-x" :style="'background-color: '+ backGroundColor + ';height: '+BgHeight+'px;'">
				<view :id="'the-' + index" :style="'height: '+ (idx == index ? BgHeight : ItemHeight) + 'px;line-height: '+ItemHeight+'px;'" v-for="(item, index) in option" :key="item.id" :class="idx == index?'scroll-view-item idxc':'scroll-view-item '" @tap="calculator(index)">
					<slot name="scroll" :item="item" :active="idx == index">
						<!-- 后备内容 -->
						{{ item.name }}
					</slot>
				</view>
				<view class="link-p" v-if="lineShow" :style="{ width: `${width}upx`, background: colour, left: `${LeftPx}px`, transition: `left ${sec}s ease-in-out` }"></view>
			</view>
		</template>
		<template v-else>
			<view class="scroll-view-x">
				<view :id="'the-' + index" v-for="(item, index) in option" :key="item.id" class="scroll-view-item " @tap="calculator(index)">
					<slot :item="item" :active="idx == index">
						<!-- 后备内容 -->
						{{ item.name }}
					</slot>
				</view>
				<view class="link-p" :style="{ width: `${width}upx`, background: colour, left: `${LeftPx}px`, transition: `left ${sec}s ease-in-out` }"></view>
			</view>
		</template>
	</view>
</template>

<script>
/**
 * 已测试平台兼容性": 微信小程序 现代浏览器 app-vue
 */

export default {
	name: 'duNav',
	props: {
		/**
		 * 是否滑动
		 */
		scroll: {
			type: Boolean,
			default: true
		},
		lineShow: {
			type: Boolean,
			default: true
		},
    ItemHeight:{
      type:Number,
      default:44
    },
    BgHeight:{
      type:Number,
      default:50
    },
		/**
		 * 样式类型
		 */
		classType: {
			type: [Number],
			default: 0
		},
		/**
		 * 胶囊速度
		 */
		sec: {
			type: [Number, String],
			default: 0.25
		},
		/**
		 * 胶囊宽
		 */
		width: {
			type: [Number, String],
			default: 40
		},
		/**
		 * 胶囊颜色
		 */
		colour: {
			type: String,
			default: 'rgba(243, 152, 0, 1)'
		},
		backGroundColor: {
			type: String,
			default: '#cdf4f1'
		},
		/**
		 * 选项
		 */
		option: {
			type: [Array],
			default: () => [{ name: '全部' }]
		}
	},
	data() {
		return {
			idx: 0,
			LeftPx: 0
		};
	},
	created() {
		this.initialPra();
	},
	methods: {
		initialPra() {
			this.$nextTick(() => {
				for(let i in this['\x6f\x70\x74\x69\x6f\x6e']){
          const query=uni['\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x65\x63\x74\x6f\x72\x51\x75\x65\x72\x79']()['\x69\x6e'](this);
          query['\x73\x65\x6c\x65\x63\x74']('\x23\x74\x68\x65\x2d'+i)['\x62\x6f\x75\x6e\x64\x69\x6e\x67\x43\x6c\x69\x65\x6e\x74\x52\x65\x63\x74'](data=>{let{left,width}=data;this['\x6f\x70\x74\x69\x6f\x6e'][i]['\x6c\x65\x66\x74']=left;this['\x6f\x70\x74\x69\x6f\x6e'][i]['\x77\x69\x64\x74\x68']=data['\x77\x69\x64\x74\x68'];if(window["\x4e\x75\x6d\x62\x65\x72"](i)===0){this['\x4c\x65\x66\x74\x50\x78']=this['\x6f\x70\x74\x69\x6f\x6e'][0]['\x77\x69\x64\x74\x68']/2-this['\x77\x69\x64\x74\x68']/4}})['\x65\x78\x65\x63']()}
			});
		},
		calculator(i) {
			let initial=this['\x6f\x70\x74\x69\x6f\x6e'][0]['\x6c\x65\x66\x74'];
      let left=this['\x6f\x70\x74\x69\x6f\x6e'][i]['\x6c\x65\x66\x74'];
      let width=this['\x6f\x70\x74\x69\x6f\x6e'][i]['\x77\x69\x64\x74\x68'];
      this['\x69\x64\x78']=i;this['\x4c\x65\x66\x74\x50\x78']=left+width/2-this['\x77\x69\x64\x74\x68']/4-initial;
			this.$emit('feedback', i);
		}
	}
};
</script>

<style scoped>
.scroll-view-x {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	white-space: nowrap;
	width: 100%;
	/* background-color: #ffffff; */
	box-sizing: border-box;
	position: relative;
	justify-content: space-between;
	overflow: auto;
}
.idxc{
  color: #269939 !important;
  /* padding: 0 20px !important; */
  font-size: 16px;  
  border-radius: 5px 5px 0 0;
  background-image: linear-gradient( to bottom, #f3fefd,#fff) !important;
}
.scroll-view-x .scroll-view-item {
	display: inline-block;
	text-align: center;
	font-size: 30upx;
	padding: 0 25upx;
	color: #666;
  font-weight: 600;
  font-size: 14px;
  background-image: linear-gradient( to bottom, #f0fbfa,#f5f7f6);
}
.scroll-view-x .tapitem {
	color: #ff8c39;
	position: relative;
}
.scroll-view-x .link-p {
	position: absolute;
	height: 5upx;
	border-radius: 4upx;
	bottom: 10upx;
	transition: left 0.25s ease-in-out;
	width: 40upx;
	background: rgba(243, 152, 0, 1);
}
.scroll-view-x .link-p .link {
	display: block;
	margin: 0 auto;
	height: inherit;
	border-radius: 4px;
}
</style>
