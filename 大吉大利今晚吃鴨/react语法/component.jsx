import React from 'react';
import ReactDOM from 'react-dom';

// 组件基础写法
function Component(){
	return <p>I am Liusir</p>
}

// ES6写法
class ES6Component extends React.Component{
	render(){
		return <p>I am Liusir in es6</p>
	}
}

ReactDOM.render(
	<div>
		<Component/>
		<ES6Component/>
	</div>,
	document.getElementById('app')
);


// state和props用法
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'Liusir'
		}
	}
	render(){
		setTimeout(()=>{
			this.setState({
				name: 'Liusir test'
			})
		},2000)
		return (
			<div>
				<p>I am {this.state.name}</p>
				<p>She is {this.props.name}</p>
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<Component name="Kangsir"/>
	</div>,
	document.getElementById('app')
);


// 事件处理方式1
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'Liusir',
			age: 12
		}
		// 解决this指向问题
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		this.setState({
			age: this.state.age + 1
		})
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} years old!</p>
				<button onClick={this.handleClick}>加一岁</button>
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<Component/>
	</div>,
	document.getElementById('app')
);

// 事件处理方式2
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'Liusir',
			age: 12
		}
	}
	handleClick(){
		this.setState({
			age: this.state.age + 1
		})
	}
	valueChange(e){
		this.setState({
			age: e.target.value
		})
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} years old!</p>
				<button onClick={(e)=>{this.handleClick(e)}}>加一岁</button>
				<input type="text" onChange={(e)=>{this.valueChange(e)}}/>
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<Component/>
	</div>,
	document.getElementById('app')
);


// 组件的组合方式
class Component extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: 'Liusir',
			age: 10
		}
	}
	handleClick(){
		this.setState({
			age: +this.state.age + 1
		})
	}
	valueChange(e){
		this.setState({
			age: e.target.value
		})
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} years old!</p>
				<button onClick={(e)=>{this.handleClick(e)}}>加一岁</button>
				<input type="text" onChange={(e)=>{this.valueChange(e)}}/>
			</div>
		)
	}
}

class Title extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <h1>{this.props.children}</h1>
	}
}

class App extends React.Component{
	render(){
		return (
			<div>
				{/*容器式组件*/}
				<Title>
					<span>App span</span>
					<a href="">Link</a>
				</Title>
				{/*单纯组件*/}
				<Component/>
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<App/>
	</div>,
	document.getElementById('app')
);



// 数据传递和状态提升(子组件的变量提升到父组件去,实现兄弟组件之间的通信)
class Child1 extends React.Component{
	constructor(props){
		super(props);
	}
	handleClick(){
		this.props.onChild2Change('red')
	}
	render(){
		return (
			<div>
				<h1>Child1: {this.props.bgColor}</h1>
				<button onClick={(e)=>{this.handleClick(e)}}>改变Child2背景颜色</button>
			</div>
		)
	}
}

class Child2 extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div style={{background: this.props.bgColor}}>
				<h1>Child2的背景颜色是 {this.props.bgColor}</h1>
			</div>
		)
	}
}

class Father extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			Child2bgColor: '#333'
		}
	}
	onChild2bgColorChange(color){
		this.setState({
			Child2bgColor: color
		})
	}
	render(){
		return (
			<div>
				<Child1 onChild2Change={(color)=>{this.onChild2bgColorChange(color)}} />
				<Child2 bgColor={this.state.Child2bgColor} />
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<Father/>
	</div>,
	document.getElementById('app')
);