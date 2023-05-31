//这个文件修改域名
var e = "https://pz.yszyun.com",
mapkey= '', // 必填
	r = {
		uurl: e,
		qqmapkey:mapkey,
		home: {
			getswiperlist: "/v1.index/get_swiper_list",
			getnavlist: "/v1.index/get_nav_list",
			getlist: "/v1.hospital/get_list",
			getcitylist: "/v1.index/get_city_list",
			gethospitallist: "/v1.server/get_hospital_list",
			getconsumerlist: '/v1.consumer/get_consumer_list',
			addconsumer: '/v1.consumer/add_consumer',
			getConsumerInfo: '/v1.consumer/get_info',
			editconsumer: '/v1.consumer/edit_consumer',
			deleteconsumer: '/v1.consumer/delete_consumer',
			getdisclaimerlist: '/v1.disclaimer/get_disclaimer_list',
			getdisclaimerinfo: '/v1.disclaimer/get_disclaimer_info',
			appupdate: '/v1.login/app_update',
			getuserinfo: '/v1.index/get_user_info'
		},
		order: {
			getorderlist: '/v1.order/get_order_list',
			submitorder: '/v1.order/submit_order',
			getorderinfo: '/v1.order/get_order_info',
			servergetlist: '/v1.hospital/server_get_list',
			cancelorder: '/v1.order/cancel_order',
			payorder: '/v1.order/pay_order',
			finisherorder: '/v1.order/finisher_order',
		},
		coupon: {
			getusercouponlist: '/v1.coupon/get_user_coupon_list',
			autosendcoupon: '/v1.coupon/auto_send_coupon',
			drawcoupon: '/v1.coupon/draw_coupon',
			getcancouponlist: '/v1.coupon/get_can_coupon_list'
		},
		mine: {
			submitapply: "/v1.consumer/submit_apply",
			getmemberinfo: "/v1.member/get_member_info",
			moneylog: "/v1.member/money_log",
			getorderlist: "/v1.member/get_order_list",
			receivingorder: "/v1.member/receiving_order",
			getorderinfo: "/v1.member/get_order_info",
			refundmoney: "/v1.member/refund_money",
			getrefundlist: "/v1.member/get_refund_list",
			saveinfo: "/v1.index/save_info"
		},
		upload: e + "/api/upload/upload_file",
		saveinfo: e + "/api/v1.index/save_info"
	};
module.exports = r;