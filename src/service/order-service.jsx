import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order{
	// 订单列表
	getOrderList(listParam){
		let url 		= '',
			data 		= {},
			listType 	= listParam.listType;
		if(listType == 'list'){
			url 			= '/manage/order/list.do';
			data.pageNum 	= listParam.pageNum;
		}else if(listType == 'search'){
			url 			= '/manage/order/search.do';
			data.pageNum 	= listParam.pageNum;
			data.orderNo    = listParam.orderNo
		}

		return _mm.request({
			type : 'post',
			url  : url,
			data : data
		})
	}
	// 订单详情
	getOrderDetail(orderNo){
		return _mm.request({
			type : 'post',
			url  : '/manage/order/detail.do',
			data : {
				orderNo : orderNo
			}
		})
	}
	// 立即发货
	sendGoods(orderNo){
		return _mm.request({
				type : 'post',
				url  : '/manage/order/send_goods.do',
				data : {
					orderNo : orderNo
				}
			})
		}
}

export default Order;