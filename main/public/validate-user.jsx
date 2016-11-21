import React, { Component } from 'react';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

export let ZmitiValidateUser = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	loginOut(errorMsg='登录超时',url=window.loginUrl){
			message.error(errorMsg);
      setTimeout(()=>{
     	   window.location.href= url;    
      },1000);	
	}

	validateUser(){
		var s = this;
		 try{
		 	 var params = JSON.parse(document.cookie);
		 	 
        return {
        	userid:params.userid,
        	getusersigid:params.getusersigid,
        	companyid:params.companyid,
        	isover:params.isover,
        	usertypesign:params.usertypesign,
        	username:params.username,
        	usermobile:params.usermobile,
        	useremail:params.useremail,
        }
		 }
		 catch(e){

		 		if(!window.isDebug){
		 				s.loginOut();
		 		}
        return  {
        	userid:-1,
        	getusersigid:-1,
        	companyid:-1,
        	isover:-1,
        	usertypesign:-1,
        	username:'',
        	usermobile:'',
        	useremail:''
        };
		 }
	}
	render() {

		let methods = {
			validateUser:this.validateUser,
			loginOut:this.loginOut
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;

	}
}

