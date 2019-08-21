import React from 'react';

import './index.scss';

class Title extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		document.title = this.props.title + ' - HAPPY MMALL';
	}
	render(){
		return (
			<div className="row">
				<div className="col-md 12 titleRelative">
					<h1 className='page-header'>{this.props.title}</h1>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Title;