import React        	 	from 'react';
import MUtil  				from 'util/mm.jsx';
import Product  			from 'service/product-service.jsx';

import PageTitle   			from 'component/page-title/index.jsx';
import CategorySelector 	from './category-selector.jsx';
import FileUploader 		from 'util/file-uploader/index.jsx';
import RichEditor           from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
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
				res.defaultDetail = res.detail;
				// 回填信息
				this.setState(res);

			}, (errMsg)=>{
				_mm.errorTips(errMsg);
			})
		}
	}
	// 普通字段的改变 商品名称 商品描述 商品价格 商品库存 商品详情
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name] : value
		})
	}
	// 品类选择
	onCategoryChange(categoryId, parentCategoryId){
		this.setState({
			categoryId  		: categoryId,
			parentCategoryId  	: parentCategoryId
		})
	}
	// 图片上传成功
	onSuccessUpload(res){
		let subImages = this.state.subImages;
			subImages.push(res);
		this.setState({
			subImages: subImages
		});
	}
	// 图片上传失败
	onErrorUpload(errMsg){
		_mm.errorTips(errMsg);
	}
	// 删除图片
	onRemoveImg(e){
		let index  		= e.target.getAttribute('index'),
			subImages  	= this.state.subImages;
			subImages.splice(index, 1);
		this.setState({
			subImages: subImages
		})

	}
	// 富文本编辑器change
	onEditorValueChange(value){
		this.setState({
			detail: value
		})
	}
	getSubImagesString(){
		return this.state.subImages.map((item) => item.uri).join(',');
	}
	// 表单提交
	onSubmit(){
		let product = {
			name 			: this.state.name,
			subtitle 		: this.state.subtitle,
			categoryId 		: parseInt(this.state.categoryId),
			subImages 		: this.getSubImagesString(),
			detail 			: this.state.detail,
			price 			: parseFloat(this.state.price),
			stock 			: parseInt(this.state.stock),
			status 			: this.state.status
		},
		// 表单验证结果
		CheckProduct = _product.CheckProduct(product);
		if(this.state.id){
			product.id = this.state.id
		};
		// 表单验证成功
		if(CheckProduct.status){
			_product.SaveProduct(product).then(res=>{
				_mm.successTips(res);
				this.props.history.push('/product/index');
			}, errMsg=>{
				_mm.errorTips(errMsg);
			})
		}
		// 表单验证失败
		else{
			_mm.errorTips(CheckProduct.msg);
		}
	}
    render(){
        return (
            <div id="page-wrapper">
				<PageTitle title="添加商品" />	

				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-md-2 control-label">商品名称</label>
						<div className="col-md-5">
							<input type="text" className="form-control" 
								placeholder="请输入商品名称"
								value={this.state.name}
								name="name"
								onChange={(e) => this.onValueChange(e)}/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品描述</label>
						<div className="col-md-5">
							<input type="text" className="form-control" 
								placeholder="请输入商品描述"
								value={this.state.subtitle}
								name="subtitle"
								onChange={(e) => this.onValueChange(e)}/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">所属分类</label>
						<CategorySelector 
							categoryId={this.state.categoryId}
							parentCategoryId={this.state.parentCategoryId}
							onCategoryChange={ 
								(categoryId, parentCategoryId)=>this.onCategoryChange(categoryId, parentCategoryId) 
							}/>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品价格</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control" 
									placeholder="价格"
									value={this.state.price}
									name="price"
									onChange={(e) => this.onValueChange(e)}/>
							    <span className="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品库存</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control" 
									placeholder="库存"
									value={this.state.stock}
									name="stock"
									onChange={(e) => this.onValueChange(e)}/>
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
											<i className="fa fa-close" index={index}
												onClick={(e) => this.onRemoveImg(e)}></i>
											
										</div>
									)
								}) : (<div>请上传图片</div>)
							}
							
						</div>
						<div className="col-md-offset-2 col-md-10 upload-con">
							<FileUploader onSuccess={(res) => this.onSuccessUpload(res)}
								onError={(err) => this.onErrorUpload(err)} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">商品详情</label>
						<div className="col-md-10">
							<RichEditor 
								defaultDetail={this.state.defaultDetail}
								onValueChange={(value) => this.onEditorValueChange(value)}/>
						</div>
					</div>
					
					<div className="form-group">
						<div className="col-md-offset-2 col-md-10">
							<button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button>
						</div>
					</div>
				</div>

			</div>
        )
    }
}
export default ProductSave;