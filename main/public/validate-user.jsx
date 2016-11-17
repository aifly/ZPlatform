import React, { Component } from 'react';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

export let ZmitiValidateUser = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	validateUser(){
		 try{
		 	 var params = JSON.parse(document.cookie);
        return {
        	userid:params.userid,
        	getusersigid:params.getusersigid,
        	companyid:params.companyid,
        }
		 }
		 catch(e){
		 		 message.error('登录超时');
        setTimeout(()=>{
       	   window.location.href= window.loginUrl;    
        },1000);
        return null;
		 }
	}
	render() {

		let methods = {
			validateUser:this.validateUser
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;

	}
}

