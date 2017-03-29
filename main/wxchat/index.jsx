import React, { Component } from 'react';

import { message,Select } from '../commoncomponent/common.jsx';
var Option = Select.Option;

import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiWxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
		}; 
	}
	render() {
		var mainStyle = {
			background:'url(./static/images/wxtalk-bg.png) repeat center'
		}
		var component = <div className='wxchat-main-ui' style={mainStyle}>
			 aaaaaa
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
	}

	componentDidMount() {
		var s = this;
	
	}
 
}

export default ZmitiValidateUser(ZmitiWxChatApp);
