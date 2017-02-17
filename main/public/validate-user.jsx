import React, { Component } from 'react';

import { browserHistory } from 'react-router'




import { message  } from '../commoncomponent/common.jsx';

import $ from 'jquery';

export let ZmitiValidateUser = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	loginOut(errorMsg='登录超时',url= window.loginUrl,isHash){
			message.error(errorMsg);
      setTimeout(()=>{
      	   if(isHash){
     	   		window.location.hash ='/';    
      	   }
      	   else{
      	   	window.location.href= url;
      	   }
      },100);

      return <div></div>;
	}

	componentWillMount() {
	
	}

	 

	validateUser(fn,that){
		var s = this;

		try{

			 var params = JSON.parse(window.getCookie('login'));
		 	 	if(that){

		 	 		 that.userid = params.userid;
					 that.getusersigid = params.getusersigid;
					 that.companyid = params.companyid;
					 that.loginOut = params.loginOut;
					 that.username = params.username;
					 that.usermobile=  params.usermobile;
					 that.useremail = params.useremail;
					 that.usertypesign = params.usertypesign;
					 that.endDate = params.endDate;
					 that.capacitied = params.capacitied;
					 that.capacity = params.capacity;
		 	 	}
		 	 	
		 	 	if(params.userid && params.getusersigid){

						return {
			        	userid:params.userid,
			        	getusersigid:params.getusersigid,
			        	companyid:params.companyid,
			        	isover:params.isover,
			        	usertypesign:params.usertypesign,
			        	username:params.username,
			        	usermobile:params.usermobile,
			        	useremail:params.useremail,
			        	capacitied:params.capacitied,
			        	capacity:params.capacity,
			        	endDate:params.endDate
			        }
				}
				else{
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

	isSuperAdmin(that){//是否是超级管理员。
		return that['usertypesign']*1 === window.Role.SUPERADMINUSER;
	}

	isNormalAdmin(that){//是否是系统管理员。
		return that['usertypesign']*1 === window.Role.NORMALADMINUSER;
	}

	isCompanyAdmin(that){//是否是公司管理员
		return that['usertypesign']*1 === window.Role.COMPANYADMINUSER;
	}

	resizeMainHeight(that,name='setMainHeight') {

		window.obserable.on(name, ()=> {
			that.setState({
				mainHeight: document.documentElement.clientHeight - 50
			});

		});


	}
	resizeLeftMenu(that,name='setMenuWidth') {
	

		window.obserable.on(name, ()=> {
				that.setState({
					rightWidth: document.documentElement.clientWidth - window.mainLeftSize
				})
		});	


	}

	getUserDetail(options={}){//获取用户的详细信息
		let {$,userid,getusersigid,setuserid,sussess} = options;
		$.ajax({
			url:window.baseUrl+'/user/get_userdetails',
			data:{
				userid:userid,
				getusersigid:getusersigid,
				setuserid:setuserid
			},
			success(data){
				sussess(data);
			}
		});
	}

	componentWillMount() {
		
	}
	validateUserRole(that,fn){
		var s = that.props;
		var self = that;

		try{
			var params = JSON.parse(document.cookie);
			/*if(params.usertypesign === window.Role.SUPERADMINUSER|| params.usertypesign === window.Role.NORMALADMINUSER){
				return;//超级管理员，普通管理员都不用验证用户是否过期。
			}*/
			$.ajax({
				type:'post',
				url:window.baseUrl+'user/user_auth',
				data:{
					userid:params.userid,
					getusersigid:params.getusersigid
				},
				success(data){
					if(data.getret === 0){//返回正常
						self.isExpire =  data.userauth.isExpire;
						self.isFullSpace = data.userauth.isFullSpace;
						if(data.userauth.isExpire){//用户过期了
							fn && fn({
								msg:'您的账号已过期，请及时去续费或延长试用',
								isExpire:true
							});
							//s.loginOut('此账号已过期，请续费或延长试用',window.mainUrl,true);
						}
						else{
							if(data.userauth.isFullSpace){//用户空间已使用完
								fn && fn({
									msg:'您的账号空间已使用完，请及时续费',
									isFullSpace:true
								});
								//s.loginOut('此账号空间已使用完，请续费',window.mainUrl,true);		
							}else{
								fn && fn({
									msg:'欢迎您来到智媒体',
									isFullSpace:false,
									isExpire:false
								});
							}
						}
					}
				}
			})
		}catch(e){

		}

		
	}

	componentDidMount() {
		
	}
 

	render() {


		let methods = {
			validateUser: this.validateUser,
			loginOut: this.loginOut,
			resizeMainHeight: this.resizeMainHeight,
			resizeLeftMenu: this.resizeLeftMenu,
			getUserDetail: this.getUserDetail,
			validateUserRole:this.validateUserRole,
			isSuperAdmin:this.isSuperAdmin,
			isNormalAdmin:this.isNormalAdmin,
			isCompanyAdmin:this.isCompanyAdmin,
			//fillFeilds:this.fillFeilds
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}

