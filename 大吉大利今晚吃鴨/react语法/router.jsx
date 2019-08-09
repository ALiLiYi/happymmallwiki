// 页面路由
window.location.href = "http://www.baidu.com";
history.back();

// hash 路由
window.location = "#hash";
window.onhashchange = function(){
	console.log('current hash', window.location.hash)
}

// h5路由
// 推进一个状态
history.pushState('name', 'title', '/path');
// 替换一个状态
history.replaceState('name', 'title', '/path');
// popstate
window.onpopstate = function(){
	console.log(window.location.href);
	console.log(window.location.pathname);
	console.log(window.location.hash);
	console.log(window.location.search);
}



// react-router
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
 
class A extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				组件A
				<Switch>
					{/*exact 严格匹配*/}
                    <Route exact path={`${this.props.match.path}`} render={(route) => {
                        return <div>当前组件不是带参数的A</div>
                    }}/>
                    <Route path={`${this.props.match.path}/sub`} render={(route) => {
                        return <div>当前组件是sub</div>
                    }}/>
					<Route path={`${this.props.match.path}/:id`} render={(route) => {
						return <div>当前组件是带参数的A,参数是{route.match.params.id}</div>
					}}/>
				</Switch>
			</div>
		)	
	}
}

class B extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>B组件</div>
	}
}

class Wrapper extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				<Link to='/a/123'>带参数组件A</Link>
				<br/>
				<Link to='/a/sub'>/a/sub</Link>
				<br/>
				<Link to='/a'>组件A</Link>
				<br/>
				<Link to='/b'>组件B</Link>
				{this.props.children}
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<Wrapper>
			<Route path='/a' component={A}/>
			<Route path='/b' component={B}/>
		</Wrapper>
	</Router>,
	document.getElementById('app')
);