###说明
导航栏菜单通用组件 胶囊滑动切换  样式扩展 无需固定宽度  可局部可全局 一键导入使用简单方便高扩展 低代码量
###使用
全局：遵循uniapp全局组件规则可直接使用
局部：

```
import duNav from '@/components/du-nav/du-nav.vue'
export default { components: { duNav } }

	<du-nav :option="Array＜Object＞" @feedback="feedback">
					<template v-slot:="{ item, active }">
						<text>{{ item.name }}</text>
					</template>
	</du-nav>
```
###参数使用说明
| 属性名| 类型				| 默认值				| 说明																		|
| ------| ---------------	| --------------------	| --------------------------------------------------------------------------|
| option| Array＜Object＞	| [{ name: '全部'}]		| 菜单项目，name为当前显示字段，格式如:[{ name: '全部'}, { name: '选项一' }]|
| scroll| Boolean			| true					| 是否滑动																	|
| sec	| Number			| 0.25					| 胶囊速度																	|
| width	| Number			| 40					| 胶囊宽																	|
| colour| String			| rgba(243, 152, 0, 1)	| 胶囊颜色																	|

###事件和插槽说明
| 属性名 | 类型           | 默认值 | 说明                                                                       |
| --------- | ---------------- | ------ | ---------------------------------------------------------------------------- |
| @feedback | [Number, String] | -      | 当前选中时的事件反馈，返回值为当前下标                    |
| v-slot    | Object           | -      | 插槽，通过v-slot:="{ item, active }"获取，item为当前项数据，active为是否选中 |



###示例
```
<template>
	<view>
		<view class="consent">
			<view class="common-page-head">可滑动导航（默认）</view>
			<view class="consent-item-1">
				<du-nav :option="list1" @feedback="feedback">
					<template v-slot:="{ item, active }">
						<text>{{ item.name }}</text>
					</template>
				</du-nav>
			</view>
			<view class="common-page-head">固定导航</view>
			<view class="consent-item-2">
				<du-nav :option="list2" :scroll="false" width="66">
					<template v-slot:="{ item, active }">
						<text>{{ item.name }}</text>
					</template>
				</du-nav>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 插槽参数 active=>false true  可自行判断修改text样式
 */
export default {
	data() {
		return {
			list1: [
				{ name: '全部', type: '0' },
				{ name: '选项一', type: '1' },
				{ name: '选项二', type: '2' },
				{ name: '选项三', type: '3' },
				{ name: '选项四', type: '4' },
				{ name: '选项五', type: '5' },
				{ name: '选项六', type: '6' },
				{ name: '选项七', type: '7' }
			],
			list2: [{ name: '全部', type: '0' }, { name: '选项一', type: '1' }, { name: '选项二', type: '2' }, { name: '选项二', type: '3' }]
		};
	},
	methods:{
		/**
		 * @param [Number, String] i 当前选中下标
		 */
		feedback(i){
			console.log(i)
		}
	}
};
</script>

<style lang="less">
.consent {
	margin-bottom: 12px;
	padding: 15upx;
	.consent-item-1 {
		border: 1upx solid #f4f4f4;
	}
	.consent-item-2 {
		border: 1upx solid #f4f4f4;
		padding: 0 20upx; //可自行调整内边距
	}
}
</style>


```
