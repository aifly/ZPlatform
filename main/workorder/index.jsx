import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm   } from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiWorkOrderApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			

		};
	}
	render() {
  
		var mainComponent = <div>
				工单
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

	changeAccount(i){


	}

	componentDidMount() {
		
	}


	

	componentWillMount() {


		/*let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	*/
		
		/*let {username,userid,getusersigid} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;*/

		
	}

}

export default ZmitiValidateUser(ZmitiWorkOrderApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/