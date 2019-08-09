import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

// 基础jsx、样式
let style = {
	color: 'red'
}
let jsx = <div className="jsx" style={style}>jsx...</div>;

ReactDOM.render(
	jsx,
	document.getElementById('app')
);

// 数据逻辑处理
let name = 'Liusir';
let names = ['Liusir', 'Huangsir', 'Gaosir'];
let temp = false;
let jsx = (
	<div>
		{/*变量*/}
		<p>My name is {name}</p>
		{/*判断*/}
		{ temp ? <p>My name is {name}</p> : <p>My name is not {name}</p> }		
		{/*循环遍历*/}
		{
			names.map((name, index) => {
				return <p key={index}>My name is {name}</p>
			})
		}
	</div>
)

ReactDOM.render(
	jsx,
	document.getElementById('app')
);