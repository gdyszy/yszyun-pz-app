// 子模块moduleA路径：store/modules/moduleA.js 
export default {
	state: {
		showtext:"我是moduleA模块下state.text的值",
		token: uni.getStorageSync('token'),
		userInfo:null,
		isLogin:false
	},
	getters: {
		accessToken: (state) => {
			return state.token.accessToken;
		},
		refreshToken: (state) => {
			return state.token.refreshToken;
		},
		userInfo: (state) => {
			return state.userInfo;
		},
		isLogin: (state) =>{
			return state.isLogin;
		},
		getMpList: (state) =>{
			return state.myMpList;
		}
	},
	mutations: {
		setUserInfo(state, info){
			state.userInfo = info;
		},
		login(state, token){
			try {
				console.log("login:" + JSON.stringify(token));
				uni.setStorageSync('token', token);
				state.token = token;
				state.isLogin = true;
			} catch (e) {
				console.log("login err:" + e.log);
			}
		},
		updateToken(state, token){
			try {
				console.log("setToken:" + JSON.stringify(token));
				uni.setStorageSync('token', token);
				state.token = token;
			} catch (e) {
				console.log("setToken err:" + e.log);
			}
		},
		logout(){
			try {
				state.token = null;
				state.isLogin = false;
				state.userInfo = null;
				uni.clearStorageSync();
				console.log("clearStorage()");
			} catch (e) {
				console.log("clearStorage:" + e.log);
			}
		},
			
		addMyMpList(state, list){
			state.myMpList.concat(list);
			let obj = {};    //obj用来记录该项重复出现了几次
			let brr = [];    //brr是去重后的数组
			state.myMpList.forEach((item) => {
				if (obj[item.id] == undefined) {
					obj[item.id] = 1;
					brr.push(item);
				} else {
					obj[item.id] += 1;
				}
			});
			state.myMpList = brr;
		}
	},
	actions: { 
		
	}
}
