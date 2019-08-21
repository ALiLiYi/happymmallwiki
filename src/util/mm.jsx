class MUtil{
	request(params){
		return new Promise((resolve, reject)=>{
			$.ajax({
				type 		: params.type 		|| 'get',
				url 		: params.url 		|| '',
				dataType 	: params.dataType 	|| 'json',
				data 		: params.data 		|| null,
				success 	: res => {
					// 数据请求成功
					if(0 === res.status){
						typeof resolve === 'function' && resolve(res.data, res.msg);
					}
					// 未登录状态,强制登录
					else if(10 === res.status){
						this.dologin();
					}
					else{
						typeof reject === 'function' && reject(res.msg || res.data);
					}
				},
				error 		: err => {
					console.log('失败',err)
					typeof reject === 'function' && reject(err.statusText);
				}
			})
		})
	}
	// 跳转登录
	dologin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
	}
	// 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg){
    	alert(successMsg || '操作成功!');
    }
    // 错误提示
    errorTips(errMsg){
    	alert(errMsg || '好像哪里出错了~');
    }
    // 本地存储
    setStorage(name, data){
		let dataType = typeof data;
		// json对象
		if(dataType === 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));
		}
		// 基础类型
		else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name, data)
		}
		// 其它不支持的类型
		else{
			alert('该类型不能用于本地存储')
		}
    }
    // 获取本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
    	window.localStorage.removeItem(name);
    }
}

export default MUtil;