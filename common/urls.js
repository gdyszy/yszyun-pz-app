import store from '@/store/index.js';//需要引入store
var baseUrl = store.state.baseUrl;

function ulogin(userName, passWord, callback){
	const requestTask = uni.request({
		url: baseUrl + '/request', //仅为示例，并非真实接口地址。
		data: {
	        name: userName,
	        password: passWord
		},
		success: function(res) {
			console.log(res.data);
			callback(res.data);
		}
	});
	// 中断请求任务
	requestTask.abort();
}

module.exports = class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
	
  sum(){
		return 5;
	}
};

export default {
	baseUrl: store.state.baseUrl,
	login: ulogin
}