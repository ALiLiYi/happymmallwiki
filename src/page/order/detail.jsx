import React        	 	from 'react';
import MUtil  				from 'util/mm.jsx';
import Order     			from 'service/order-service.jsx';

import PageTitle   			from 'component/page-title/index.jsx';
import TableList   			from 'util/table-list/index.jsx';

const _mm 					= new MUtil();
const _order  				= new Order();

import './detail.scss';

class OrderDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNo   : this.props.match.params.orderNo,
			orderInfo : {}
		}
	}
	componentDidMount(){
		this.loadOrderDetail();
	}
	// 加载商品详情
	loadOrderDetail(){
		_order.getOrderDetail(this.state.orderNo).then((res)=>{
			this.setState({
				orderInfo: res
			});
		}, (errMsg)=>{
			_mm.errorTips(errMsg);
		})
	}
	// 立即发货
	sendGoods(){
		if(window.confirm('是否确认该订单已经发货？')){
			_order.sendGoods(this.state.orderNo).then(res=>{
				_mm.successTips('发货成功');
				this.loadOrderDetail();
			}, errMsg=>{
				_mm.errorTips(errMsg);
			})
		};
	}
    render(){
    	let orderInfo 		= this.state.orderInfo,
			receiverInfo  	= this.state.orderInfo.shippingVo      || {},
            productList   	= this.state.orderInfo.orderItemVoList || [];
        let tableHeads  	= [
            {name: '商品图片', width: '10%'},
            {name: '商品信息', width: '45%'},
            {name: '单价', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计', width: '15%'}
        ];
        return (
            <div id="page-wrapper">
				<PageTitle title="订单详情" />	
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-md-2 control-label">订单号</label>
						<div className="col-md-5">
							<p className="form-control-static">{orderInfo.orderNo}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">创建时间</label>
						<div className="col-md-5">
							<p className="form-control-static">{orderInfo.createTime}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">收件人</label>
						<div className="col-md-5">
							<p className="form-control-static">
								{receiverInfo.receiverName}，
                                {receiverInfo.receiverProvince} 
                                {receiverInfo.receiverCity} 
                                {receiverInfo.receiverAddress} 
                                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
							</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">订单状态</label>
						<div className="col-md-5">
							<p className="form-control-static">
								{orderInfo.statusDesc}
								{
									orderInfo.status === 20 
									? <button className="btn btn-default btn-sm btn-send-goods"
										onClick={(e)=>{this.sendGoods(e)}}>立即发货</button>
									: null
								}
							</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">支付方式</label>
						<div className="col-md-5">
							<p className="form-control-static">{orderInfo.paymentTypeDesc}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">订单金额</label>
						<div className="col-md-5">
							<p className="form-control-static">{orderInfo.payment}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品列表</label>
						<div className="col-md-10">
							<TableList tableHeads={tableHeads}>
								{
									productList.map((item, index) => {
										return (
											<tr key={index}>
												<td>
													<img className="p-img" alt={item.productName} 
														src={`${orderInfo.imageHost}${item.productImage}`}/>
												</td>
												<td>{item.productName}</td>
												<td>￥{item.currentUnitPrice}</td>
												<td>{item.quantity}</td>
												<td>￥{item.totalPrice}</td>
											</tr>
										)
									})
								}
							</TableList>
						</div>
					</div>
				</div>

			</div>
        )
    }
}
export default OrderDetail;