import React, { Component } from 'react';
import MainUI from './main.jsx';
export default class AdminIndex extends Component {
	render() {
		var component = <div>后台首页</div>;
		return (
			<MainUI component={component}></MainUI>
		);
	}
}
