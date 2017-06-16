import React, { Component } from 'react';
import './css/index.css';
import $ from 'jquery';

export default class ZmitiClockApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			width:this.props.size || 60,
			height:this.props.size || 60,
			borderWidth:this.props.size / 60 * 4

		}

		return (
			<div className='zmiti-clock-main-ui' style={mainStyle}>
				<span></span>
				<span></span>
			</div>
		);
	}


	componentDidMount() {

	}
}

ZmitiClockApp.defaultProps = {
	size:60
}


