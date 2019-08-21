import React        	 from 'react';
import MUtil from 'util/mm.jsx';
import Product  from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

// 品类选择器
class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstCategoryList 		: [],
			firstCategoryId 		: 0,
			secondCategoryList 		: [],
			secondCategoryId 		: 0
		}
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	componentWillReceiveProps(netxProps){
		let categoryIdChange = this.props.categoryId !== netxProps.categoryId,
			parentCategoryIdChange = this.props.parentCategoryId !== netxProps.parentCategoryId;
		// 数据没有发生变化的时候，直接不做处理	
		if(!categoryIdChange && !parentCategoryIdChange){
			return;
		};
		// 只有一级品类
		if(netxProps.parentCategoryId === 0){
			this.setState({
				firstCategoryId  	: netxProps.categoryId,
				secondCategoryId 	: 0
			})
		}
		// 有两级品类
		else{
			this.setState({
				firstCategoryId  	: netxProps.parentCategoryId,
				secondCategoryId 	: netxProps.categoryId
			}, () => {
				parentCategoryIdChange && this.loadSecondCategory();
			})
		}

	}
	// 一级分类加载
	loadFirstCategory(){
		_product.getCategoryList().then(res=>{
			this.setState({
				firstCategoryList: res
			});
		}, errMsg=>{
			_mm.errorTips(errMsg);
		})
	}
	// 二级品类加载
	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res=>{
			this.setState({
				secondCategoryList: res
			});
		}, errMsg=>{
			_mm.errorTips(errMsg);
		})
	}
	// 选择一级品类
	onFirstCategoryChange(e){
		if(this.props.readOnly) return;
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId 		: newValue,
			secondCategoryList 		: [],
			secondCategoryId 		: 0
		}, ()=>{
			// 更新二级品类
            newValue ? this.loadSecondCategory() : null;
			this.onPropsCategoryChange();
		})
	}
	// 选择二级分类
	onSecondCategoryChange(e){
		if(this.props.readOnly) return;
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId: newValue
		}, ()=>{
			this.onPropsCategoryChange();
		})
	}
	// 传给父组件的结果 ~ 暴露所选的id 只选一级分类 /一二级分类都选
	onPropsCategoryChange(){
		// 判断props里的函数存在否
		let categoryChangable = typeof this.props.onCategoryChange === 'function';
		//若有二级分类
		if(this.state.secondCategoryId){
			categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
		}
		// 只有一级分类
		else{
			categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
		}
	}
    render(){
        return (
            <div className="col-md-5">
				<select className="form-control cate-select"
					readOnly={this.props.readOnly}
					value={this.state.firstCategoryId}
					onChange={(e)=>{this.onFirstCategoryChange(e)}}>
					<option value="">请选择一级分类</option>
					{
						this.state.firstCategoryList.map(
							(item, index) => <option value={item.id} key={index}>{item.name}</option>
						)
					}
				</select>
				{	this.state.secondCategoryList.length ? 
					<select className="form-control cate-select"
						readOnly={this.props.readOnly}
						value={this.state.secondCategoryId}
						onChange={(e)=>{this.onSecondCategoryChange(e)}}>
						<option value="">请选择二级分类</option>
						{
							this.state.secondCategoryList.map(
								(item, index) => <option value={item.id} key={index}>{item.name}</option>
							)
						}
					</select> : null
				}
			</div>
        )
    }
}
export default CategorySelector;