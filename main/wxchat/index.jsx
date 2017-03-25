import React, { Component } from 'react';

import { message,Select } from '../commoncomponent/common.jsx';
var Option = Select.Option;

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

		var component = <div className='wxchat-main-ui'>
			 aaaa
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
