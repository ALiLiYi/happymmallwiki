import React        	 	from 'react';
import MUtil  				from 'util/mm.jsx';
import Product  			from 'service/product-service.jsx';

import PageTitle   			from 'component/page-title/index.jsx';
import CategorySelector 	from './category-selector.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id  					: this.props.match.params.pid,
			name 					: '',
			subtitle 				: '',
			categoryId 				: 0,
			parentCategoryId 		: 0,
			price    				: '',
			stock 					: '',
			subImages 				: [],
			detail 					: '',
			status 					: 1 //商品状态 1为在售
		}
	}
	componentDidMount(){
		this.loadProduct();
	}
	// 加载商品详情
	loadProduct(){
		if(this.state.id){
			_product.getProduct(this.state.id).then((res)=>{
				if(res.subImages){
					let images = res.subImages.split(",");
					res.subImages = images.map((item)=>{
						return {
							uri : item,
							url : res.imageHost + item
						}
					})
				};
				// 回填信息
				this.setState(res);

			}, (errMsg)=>{
				_mm.errorTips(errMsg);
			})
		}
	}
    render(){
        return (
            <div id="page-wrapper">
				<PageTitle title="商品详情" />	

				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-md-2 control-label">商品名称</label>
						<div className="col-md-5">
							<p className="form-control-static">{this.state.name}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品描述</label>
						<div className="col-md-5">
							<p className="form-control-static">{this.state.subtitle}</p>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">所属分类</label>
						<CategorySelector 
							readOnly
							categoryId={this.state.categoryId}
							parentCategoryId={this.state.parentCategoryId}/>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品价格</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control" 
									value={this.state.price} readOnly />
							    <span className="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品库存</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control" 
									value={this.state.stock} readOnly />
								<span className="input-group-addon">件</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品图片</label>
						<div className="col-md-10">
							{
								this.state.subImages.length > 0 ? this.state.subImages.map((item, index) => {
									return (
										<div className="img-con" key={index}>
											<img className="img" src={item.url} />
										</div>
									)
								}) : (<div>暂无图片</div>)
							}
							
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品详情</label>
						<div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
					</div>
				</div>

			</div>
        )
    }
}
export default ProductDetail;