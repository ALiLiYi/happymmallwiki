import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx';
import Order 	  	from 'service/order-service.jsx';

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-search-list.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';

const _mm  			= new MUtil();
const _order  		= new Order();

class OrderList extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list 			: [],
			pageNum 	 	: 1,
			listType 		: 'list' // list || search
		}
	}
	componentDidMount(){
		this.loadOrderList();
	}
	// 搜索
	onSearch(orderNo){
		let listType = orderNo === '' ? 'list' : 'search';
		this.setState({
			orderNo 		: orderNo,
			listType 		: listType,
			pageNum 		: 1
		}, ()=>{
			this.loadOrderList();
		})
	}
	// 列表加载
	loadOrderList(){
		let data = {};
			data.listType = this.state.listType;
			data.pageNum  = this.state.pageNum;
			// 若是搜索操作 要传入搜索类型和关键字
			if(this.state.listType == 'search'){
				data.orderNo = this.state.orderNo
			}

		_order.getOrderList(data).then(res => {
			this.setState(res);
		}, errMsg => {
			this.setState({
				list: []
			});
			_mm.errorTips(errMsg);
		})
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, ()=>{
			this.loadOrderList()
		})
	}
	render(){
		let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作'];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表"/>
				<ListSearch onSearch={(orderNo) => this.onSearch(orderNo)} />
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((item, index) => {
							return (
								<tr key={index}>
									<td>
										<Link to={ `/order/detail/${item.orderNo}` }>{item.orderNo}</Link>
									</td>
									<td>{item.receiverName}</td>
									<td>{item.statusDesc}</td>
									<td>￥{item.payment}</td>
									<td>{item.createTime}</td>
									<td>
										<Link to={ `/order/detail/${item.orderNo}` }>详情</Link>
									</td>
								</tr>
							)
						})
					}
				</TableList>
				<Pagination current={this.state.pageNum} total={this.state.total} 
					onChange={ (pageNum)=>{this.onPageNumChange(pageNum)} } />
			</div>
		)
	}
}

export default OrderList;