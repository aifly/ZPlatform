import React, { Component } from 'react';
import MainUI from './main.jsx';
export default class AdminIndex extends Component {
	render() {
		var conponent = <div>后台首页</div>;
		return (
			<MainUI conponent={conponent}></MainUI>
		);
	}
}
