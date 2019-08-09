import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: 'Old Data'
		}
	}
	// 组件将要加载
	componentWillMount(){
		console.log('componentWillMount')
	}
	// 组件加载完成
	componentDidMount(){
		console.log('componentDidMount')
	}
	// 将要接收父组件传来的props
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	// 组件是不是应该更新
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate,默认true')
		return true
	}
	// 组件将要更新
	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
	// 组件更新完成
	componentDidUpdate(){
		console.log('componentDidUpdate')
	}
	// 组件即将销毁 (销毁:即组件从dom上消失)
	componentWillUnmount(){
		console.log('componentWillUnmount')
	}

	onChangeClick(){
		console.log('改变state事件:')
		this.setState({
			data: 'New Data'
		})
	}
	render(){
		return (
			<div>
				<h1>this state is {this.state.data}</h1>
				<button onClick={()=>{this.onChangeClick()}}>改变state</button>
				<p>this props is {this.props.data}</p>
			</div>
		)
	}
}

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: 'Old Data',
			temp: true
		}
	}
	onChangeProps(){
		console.log('改变props事件:')
		this.setState({
			data: 'New Data'
		})
	}
	onDestroyChild(){
		console.log('销毁子组件事件:')
		this.setState({
			temp: false
		})
	}
	onRecoveryChild(){
		console.log('恢复子组件事件:')
		this.setState({
			temp: true
		})
	}
	render(){
		return (
			<div>
				{ this.state.temp ? <Component data={this.state.data}/> : null }
				<button onClick={()=>{this.onChangeProps()}}>改变props</button>
				<button onClick={()=>{this.onDestroyChild()}}>销毁子组件</button>
				<button onClick={()=>{this.onRecoveryChild()}}>恢复子组件</button>
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