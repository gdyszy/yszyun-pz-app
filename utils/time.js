export function timeStamps(value) {
	if (!value) return '';
	 var timestamp = new Date().getTime();
	
	var totime = new Date(timestamp);
	var years = totime.getFullYear();
	var months = totime.getMonth() + 1;
	var dates = totime.getDate();
	var now = new Date(value * 1000);
	
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month || mouths < 10) {
		month = '0' + month
		months = '0' + months
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
		dates ='0' + dates
	}

		return year + "/" + month + "/" + date
	
}


export function timeStampFor(value){
	if (!value) return '';
	var now = new Date(value * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	return year + "年" + month + "月" + date + "日"
}

export function timeStamp(value) {
	if (!value) return '';
	var now = new Date(value * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	return year + "-" + month + "-" + date 
}
export function vote(value) {
	if (!value) return '';
	var now = new Date(value * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	var hour = now.getHours();
	if (hour < 10) {
		hour = '0' + hour
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = '0' + minute
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute
} 

export function timeDate(value) {
	if (!value) return '';
	var now = new Date(value * 1000);

	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	return month + "-" + date
}

export function timeMinute(value) {
	if (!value) return '';
	var now = new Date(value * 1000);
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	var hour = now.getHours();
	if (hour < 10) {
		hour = '0' + hour
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = '0' + minute
	}
	return month + "-" + date + " " + hour + ":" + minute
}

export function timeSecond(value) {
	if (!value) return '';
	var now = new Date(value);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	var hour = now.getHours();
	if (hour < 10) {
		hour = '0' + hour
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = '0' + minute
	}
	var seconds = now.getSeconds();
	if (seconds < 10) {
		seconds = '0' + seconds
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds
}

export function shiChang(value) {
	if (!value) return '';
	let date = new Date(parseInt(value) * 1000);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? "0" + m : m;
	let d = date.getDate();
	d = d < 10 ? "0" + d : d;
	let h = date.getHours();
	h = h < 10 ? "0" + h : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	// return m + "月" + d + "日 " + h + ":" + minute + ":"+second;
	return m + "月" + d + "日 "
 }

export function sheQu(value) {
	if (!value) return '';
	var now = new Date(value);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	var hour = now.getHours();
	if (hour < 10) {
		hour = '0' + hour
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = '0' + minute
	}
	var seconds = now.getSeconds();
	if (seconds < 10) {
		seconds = '0' + seconds
	}
	return year + "/" + month + "/" + date + " " + hour + ":" + minute 
}

export function timeMS(value) {
	if (!value) return '';
	var now = new Date(value * 1000);
	var hour = now.getHours();
	if (hour < 10) {
		hour = '0' + hour
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = '0' + minute
	}
	return hour + ":" + minute
}


export function timeYD(value) {
	if (!value) return '';
	var now = new Date(value);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month
	}
	var date = now.getDate();
	if (date < 10) {
		date = '0' + date
	}
	return year + "-" + month + "-" + date
} 


export function formatDate(date) {
    const mistiming = Math.round((Date.now() - new Date(date).getTime()) / 1000)
    const tags = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    const times = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
    for (let i = 0; i < times.length; i++) {
        const inm = Math.floor(mistiming / times[i])
        if (tags[i] === '天') {
            switch (inm) {
                case 0:
                    return '今天'
                    break
                case 1:
                    return '昨天'
                    break
                case 2:
                    return '前天'
                    break
                default:
                    return date
                    break;
            }
        }

    }
} 