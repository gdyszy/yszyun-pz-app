// 子模块moduleB路径：store/modules/moduleB.js
export default {
	state: {
		timestamp: 1608820295//初始时间戳
	},
	getters: {
		timeString(state) {//时间戳转换后的时间
			var date = new Date(state.timestamp);
			var year = date.getFullYear();
			var mon  = date.getMonth()+1;
			var day  = date.getDate();
			var hours = date.getHours();
			var minu = date.getMinutes();
			var sec = date.getSeconds();
			var trMon = mon<10 ? '0'+mon : mon
			var trDay = day<10 ? '0'+day : day
			return year+'-'+trMon+'-'+trDay+" "+hours+":"+minu+":"+sec;
		}
	},
	mutations: {
		updateTime(state){//更新当前时间戳
			state.timestamp = Date.now()
		}
	},
	actions: {

	}
}
