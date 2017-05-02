import React, { Component } from 'react';

import { message,Row,Col,Input,Button,Popconfirm,Tooltip } from '../commoncomponent/common.jsx';


import {Link} from 'react-router';

import './static/css/index.css';
import './static/css/list.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';


class ZmitiStatisticsListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight - 50,
			
		}; 
	}


	render() {

		var worksid = this.props.params.id;

		var component = <div className='' style={{height:this.state.mainHeight}}>
				<iframe style={{height:this.state.mainHeight}} src={'./poetry/index.html?worksid='+worksid}></iframe>
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

	}
 
}

export default ZmitiValidateUser(ZmitiStatisticsListApp);
