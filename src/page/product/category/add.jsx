import React        from 'react';
import MUtil 		from 'util/mm.jsx';
import Product  	from 'service/product-service.jsx';

import PageTitle    from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			categoryList 	: [],
			categoryId 		: 0,
			categoryName 	: ''
		}
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	// 品类列表 显示父类列表
	loadCategoryList(){
		_product.getCategoryList().then(res => {
			this.setState({
				categoryList: res
			});
		}, errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	// 表单的值发生变化
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value;
		this.setState({
			[name] : value
		})
	}
	// 提交
	onSubmit(){
		let categoryName = this.state.categoryName.trim();
		// 品类名称不为空 执行提交
		if(categoryName){
			_product.saveCategory({
				parentId 	 	: this.state.parentId,
				categoryName  	: categoryName
			}).then(res=>{
				_mm.successTips(res);
				this.props.history.push('/product-category/index');
			}, errMsg=>{
				_mm.errorTips(errMsg);
			})
		}
		// 提示品类为空 
		else{
			_mm.errorTips('品类名称不能为空!');
		};
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="添加品类" />	
				<div className="row">
					<div className="col-md-12">
						<div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId" 
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" 
                                        placeholder="请输入品类名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" 
                                        onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		)
	}
}

export default CategoryAdd;