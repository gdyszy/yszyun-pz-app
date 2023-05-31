# zetank-loading

>loading组件，包含加载更多、无数据、遮罩加载、无更多。组件使用loading样式一部分采用[w-loading](https://ext.dcloud.net.cn/plugin?id=504)

###安装
下载组件到项目即可，本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范

###使用

在template使用

```html

/* 遮罩加载 */
<zetank-loading :show="true" ref="loading"  text = "加载中" type="fullloading" textcolor="gray" textsize="28">
	<loading2></loading2>
</zetank-loading>
/* 加载更多 */
<zetank-loading :show="loading" text = "加载中" type="bottomloading" textcolor="gray" textsize="28">
	<loading8></loading8>
</zetank-loading>
/* 无更多 */
<zetank-loading :show="nomore" type="nomore" textcolor="gray" textsize="28"></zetank-loading>
/* 无数据 */
<zetank-loading :show="isempty" text = "暂无数据" type="nodata" textcolor="gray" textsize="28"></zetank-loading>

```

###属性

|  属性名	|    类型	| 默认值		| 说明															|
| :-:		| :-:		| :-:			| :-:														|
| 	show	| 	Boolean		| 	false			| 			是否显示												|
| 	text	| 	String		| 	-			| 					文字	内容								|
| 	textcolor	| 	String		| 	gray			| 			文字颜色											|
| 	textsize	| 	Number		| 	28			| 				文字大小										|
| 	type	| 	String		| 	fullloading			| 			类型（fullloading、bottomloading、nomore、nodata）	|
| 	emptyImages	| 	String		| 	-			| 				无数据图片url											|
| 	imagewidth	| 	Number		| 	500			| 				无数据图片宽											|
| 	imageheight	| 	Number		| 	500			| 				无数据图片高											|
| 	bgcolor 	| 	String		| 	#ffffff			| 			背景颜色												|