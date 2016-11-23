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
      },100);

      return <div></div>;
	}

	validateUser(fn,that){
		var s = this;
		 try{
		 	 var params = JSON.parse(document.cookie);
		 	 	
		 	 	if(that){

		 	 		 that.userid = params.userid;
		 	 		 
					 that.getusersigid = params.getusersigid;
					 that.companyid = params.companyid;
					 that.loginOut = params.loginOut;
					 that.username = params.username;
					 that.usermobile=  params.usermobile;
					 that.useremail = params.useremail;
					 that.usertypesign = params.usertypesign;	
		 	 	}

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
		 				fn&&fn();
		 				return <div></div>;
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

	resizeMaiHeight(that) {
		window.obserable.on('setMainHeight', ()=> {
			that.setState({
				mainHeight: document.documentElement.clientHeight - 50
			});
		});

	}
	resizeLeftMenu(that) {
		window.obserable.on('setMenuWidth', ()=> {
			that.setState({
				rightWidth: document.documentElement.clientWidth - 180
			})
		});
	}


	getUserDetail(options={}){//获取用户的详细信息
		let {$,userid,getusersigid,curId} = options;
		$.ajax({
			url:window.baseUrl+'/user/get_userdetails',
			data:{
				userid:userid,
				getusersigid:getusersigid
			},
			success(data){
				console.log(data);
			}
		});
	}
 

	render() {
		let methods = {
			validateUser: this.validateUser,
			loginOut: this.loginOut,
			resizeMaiHeight: this.resizeMaiHeight,
			resizeLeftMenu: this.resizeLeftMenu,
			getUserDetail: this.getUserDetail
			//fillFeilds:this.fillFeilds
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}

