import React, { Component } from 'react';

import { message,Select } from '../commoncomponent/common.jsx';
var Option = Select.Option;

import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiMycustomApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
		}; 
	}
	render() {

		return (
			<MainUI component={<div>我的订制</div>}></MainUI>
			);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		validateUser(()=>{loginOut(undefined,undefined,false);},this);
		
	}
 
}

export default ZmitiValidateUser(ZmitiMycustomApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/