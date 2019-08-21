import React        from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			serachType 		: 'productName', //productName / productId
			searchKeyword 	: ''
		}
	}
	// select和input共用的change方法
	onChangeValue(e){
		let value = e.target.value,
			name  = e.target.name;
		this.setState({
			[name]: value
		})
	}
	onSearch(){
		this.props.onSearch(this.state.serachType, this.state.searchKeyword);
	}
	onSearchKeywordKeyUp(e){
		if(e.keyCode == 13){
			this.onSearch();
		}
	}
	render(){
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select className="form-control" 
								name="serachType"
								onChange={(e) => this.onChangeValue(e)}>
								<option value="productName">按商品名称搜索</option>
								<option value="productId">按商品ID搜索</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text" 
								className="form-control" 
								name="searchKeyword"
								placeholder="关键字"
								onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
								onChange={(e) => this.onChangeValue(e)} />
						</div>
						<button className="btn btn-primary" 
							onClick={(e) => {this.onSearch(e)}}>搜索</button>
					</div>
				</div>
			</div>
		)
	}
}

export default ListSearch;