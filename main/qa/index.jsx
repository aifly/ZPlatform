import React, { Component } from 'react';
import MainUI from '../components/Main.jsx';
export default class ZmitiQaApp extends Component {
	render() {
		let component = <div>两会</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}
}
