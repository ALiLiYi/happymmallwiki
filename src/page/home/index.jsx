import React from 'react';

import PageTtile from 'component/page-title/index.jsx';

class Home extends React.Component{
	render(){
		return (
			<div id="page-wrapper">
				<PageTtile title="首页" />	
				<div className="row">
					<div className="col-md-12">
						body
					</div>
				</div>
			</div>
		)
	}
}

export default Home;