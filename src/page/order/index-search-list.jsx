import React        from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			orderNo: ''
		}
	}
	onChangeValue(e){
		let name = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name] : value
		})
	}
	onSearch(){
		this.props.onSearch(this.state.orderNo);
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
							<select className="form-control">
								<option value="productName">按订单号搜索</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text" 
								className="form-control" 
								placeholder="订单号"
								name="orderNo"
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