<template>
	<view id="circleG">
		<view id="circleG_1" class="circleG"></view>
		<view id="circleG_2" class="circleG"></view>
		<view id="circleG_3" class="circleG"></view>
	</view>
</template>

<script>
	export default {
		name: 'loading12',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	#circleG{
		width:60px;
		margin:auto;
	}
	
	.circleG{
		background-color:rgb(255,255,255);
		float:left;
		height:13px;
		margin-left:7px;
		width:13px;
		animation-name:bounce_circleG;
			-o-animation-name:bounce_circleG;
			-ms-animation-name:bounce_circleG;
			-webkit-animation-name:bounce_circleG;
			-moz-animation-name:bounce_circleG;
		animation-duration:2.24s;
			-o-animation-duration:2.24s;
			-ms-animation-duration:2.24s;
			-webkit-animation-duration:2.24s;
			-moz-animation-duration:2.24s;
		animation-iteration-count:infinite;
			-o-animation-iteration-count:infinite;
			-ms-animation-iteration-count:infinite;
			-webkit-animation-iteration-count:infinite;
			-moz-animation-iteration-count:infinite;
		animation-direction:normal;
			-o-animation-direction:normal;
			-ms-animation-direction:normal;
			-webkit-animation-direction:normal;
			-moz-animation-direction:normal;
		border-radius:8px;
			-o-border-radius:8px;
			-ms-border-radius:8px;
			-webkit-border-radius:8px;
			-moz-border-radius:8px;
	}
	
	#circleG_1{
		animation-delay:0.45s;
			-o-animation-delay:0.45s;
			-ms-animation-delay:0.45s;
			-webkit-animation-delay:0.45s;
			-moz-animation-delay:0.45s;
	}
	
	#circleG_2{
		animation-delay:1.05s;
			-o-animation-delay:1.05s;
			-ms-animation-delay:1.05s;
			-webkit-animation-delay:1.05s;
			-moz-animation-delay:1.05s;
	}
	
	#circleG_3{
		animation-delay:1.35s;
			-o-animation-delay:1.35s;
			-ms-animation-delay:1.35s;
			-webkit-animation-delay:1.35s;
			-moz-animation-delay:1.35s;
	}
	
	
	
	@keyframes bounce_circleG{
		0%{}
	
		50%{
			background-color:rgb(0,0,0);
		}
	
		100%{}
	}
	
	@-o-keyframes bounce_circleG{
		0%{}
	
		50%{
			background-color:rgb(0,0,0);
		}
	
		100%{}
	}
	
	@-ms-keyframes bounce_circleG{
		0%{}
	
		50%{
			background-color:rgb(0,0,0);
		}
	
		100%{}
	}
	
	@-webkit-keyframes bounce_circleG{
		0%{}
	
		50%{
			background-color:rgb(0,0,0);
		}
	
		100%{}
	}
	
	@-moz-keyframes bounce_circleG{
		0%{}
	
		50%{
			background-color:rgb(0,0,0);
		}
	
		100%{}
	}
</style>
