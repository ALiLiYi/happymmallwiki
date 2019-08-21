import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product  from 'service/product-service.jsx';

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-search-list.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _product = new Product();

import './index.scss';

class ProductList extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list 			: [],
			pageNum 	 	: 1,
			listType 		: 'list'
		}
	}
	componentDidMount(){
		this.loadProductList();
	}
	// 搜索
	onSearch(searchType, searchKeyword){
		let listType = searchKeyword === '' ? 'list' : 'search';
		this.setState({
			searchType 		: searchType,
			searchKeyword 	: searchKeyword,
			listType 		: listType,
			pageNum 		: 1
		}, ()=>{
			this.loadProductList();
		})
	}
	// 列表加载
	loadProductList(){
		let data = {};
			data.pageNum = this.state.pageNum;
			data.listType = this.state.listType;
			// 若是搜索操作 要传入搜索类型和关键字
			if(this.state.listType == 'search'){
				data.searchType = this.state.searchType;
				data.keyword = this.state.searchKeyword;
			}

		_product.getProductList(data).then(res => {
			this.setState(res);
		}, errMsg => {
			this.setState({
				list: []
			});
			_mm.errorTips(errMsg);
		})
	}
	// 商品状态修改 上架 / 下架
	onChangeProductStatus(e, productId, productStatus){
		let NewStatus = productStatus == 1 ? 2 : 1,
			tips 	  = productStatus == 1 ? '确定下架该商品?' : '确定上架该商品?';
		if(window.confirm(tips)){
			_product.setProductStatus({
				productId: productId,
				status   : NewStatus
			}).then(res=>{
				_mm.successTips(res);
				this.loadProductList();
			}, errMsg=>{
				_mm.errorTips(errMsg);
			})
		}
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, ()=>{
			this.loadProductList()
		})
	}
	render(){
		let tableHeads = [
			{name: '商品ID', width: '10%'},
			{name: '商品信息', width: '50%'},
			{name: '价格', width: '10%'},
			{name: '状态', width: '15%'},
			{name: '操作', width: '15%'},
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<div className="page-header-right">
						<Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
					</div>
				</PageTitle>	
				<ListSearch onSearch={(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}} />
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product, index) => {
							return (
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										<p>{product.subtitle}</p>
									</td>
									<td>￥{product.price}</td>
									<td>
										<p>{product.status == 1 ? '在售' : '已下架'}</p>
										<button className='btn btn-xs btn-warning' 
											onClick={(e)=>{this.onChangeProductStatus(e, product.id, product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
									</td>
									<td>
										<Link className='operation' to={ `/product/detail/${product.id}` }>查看</Link>
										<Link className='operation' to={ `/product/save/${product.id}` }>编辑</Link>
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

export default ProductList;