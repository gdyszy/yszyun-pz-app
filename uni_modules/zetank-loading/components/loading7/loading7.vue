<template>
	<view class="wrapper">
		<view class="cssload-loader"></view>
	</view>
</template>

<script>
	export default {
		name: 'loading7',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		padding-left: 1em;
		padding-right: 1em;
		margin: auto;
		display: block;
		width: 110px;
	}
	
	.cssload-loader {
		width: 27px;
		height: 27px;
		border-radius: 50%;
		margin: 2em;
		display: inline-block;
		position: relative;
		vertical-align: middle;
	}
	
	.cssload-loader {
		width: 27px;
		height: 27px;
		border-radius: 50%;
		margin: 2em;
		display: inline-block;
		position: relative;
		vertical-align: middle;
	}
	.cssload-loader,
	.cssload-loader:before,
	.cssload-loader:after {
		animation: 2.8s infinite ease-in-out;
			-o-animation: 2.8s infinite ease-in-out;
			-ms-animation: 2.8s infinite ease-in-out;
			-webkit-animation: 2.8s infinite ease-in-out;
			-moz-animation: 2.8s infinite ease-in-out;
	}
	.cssload-loader:before,
	.cssload-loader:after {
		width: 100%; 
		height: 100%;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.cssload-loader:before,
	.cssload-loader:after {
			content: "";
	}
	
	.cssload-loader {
			background-color: white;
			animation: cssload-fireworks 168s infinite ease-in-out;
			-o-animation: cssload-fireworks 168s infinite ease-in-out;
			-ms-animation: cssload-fireworks 168s infinite ease-in-out;
			-webkit-animation: cssload-fireworks 168s infinite ease-in-out;
			-moz-animation: cssload-fireworks 168s infinite ease-in-out;
	}
	
			.cssload-loader:before {
					content: "";
					width: 80%;
					height: 80%;
					background-color: white;
					top: 10%;
					left: 10%;
					box-shadow: 3px -2px 0 rgba(255,100,100,0.7),
											3px 3px 0 rgba(100,255,100,0.7),
											-2px 3px 0 rgba(100,100,255,0.7),
											-3px -3px 0 rgba(240,240,120,0.7);
			-o-box-shadow: 3px -2px 0 rgba(255,100,100,0.7),
											3px 3px 0 rgba(100,255,100,0.7),
											-2px 3px 0 rgba(100,100,255,0.7),
											-3px -3px 0 rgba(240,240,120,0.7);
			-ms-box-shadow: 3px -2px 0 rgba(255,100,100,0.7),
											3px 3px 0 rgba(100,255,100,0.7),
											-2px 3px 0 rgba(100,100,255,0.7),
											-3px -3px 0 rgba(240,240,120,0.7);
			-webkit-box-shadow: 3px -2px 0 rgba(255,100,100,0.7),
											3px 3px 0 rgba(100,255,100,0.7),
											-2px 3px 0 rgba(100,100,255,0.7),
											-3px -3px 0 rgba(240,240,120,0.7);
			-moz-box-shadow: 3px -2px 0 rgba(255,100,100,0.7),
											3px 3px 0 rgba(100,255,100,0.7),
											-2px 3px 0 rgba(100,100,255,0.7),
											-3px -3px 0 rgba(240,240,120,0.7);
			}
		
	.cssload-loader:after {
		content: "";
		border: 2px solid white;
		z-index: 2;
		top: -2px;
		left: -2px;
	}
	
	
	
	@keyframes cssload-fireworks {
		0%	 { transform: rotate(0deg); }
		100% { transform: rotate(360000deg); }
	}
	
	@-o-keyframes cssload-fireworks {
		0%	 { -o-transform: rotate(0deg); }
		100% { -o-transform: rotate(360000deg); }
	}
	
	@-ms-keyframes cssload-fireworks {
		0%	 { -ms-transform: rotate(0deg); }
		100% { -ms-transform: rotate(360000deg); }
	}
	
	@-webkit-keyframes cssload-fireworks {
		0%	 { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360000deg); }
	}
	
	@-moz-keyframes cssload-fireworks {
		0%	 { -moz-transform: rotate(0deg); }
		100% { -moz-transform: rotate(360000deg); }
	}
</style>
