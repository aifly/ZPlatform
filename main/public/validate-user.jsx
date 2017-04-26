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

	ajaxFail(data){
		if(data.getret === 1300){
			message.error(data.getmsg);
			setTimeout(()=>{
				window.location.href = window.loginUrl;
			},1000)
		}
	}

	componentWillMount() {
	  
	}

	loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }


	randomString(len){
		　var len = len || 8;
		　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		　　var maxPos = $chars.length;
		　　var pwd = '';
		　　for (var i = 0; i < len; i++) {
		　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		　　}
		　　return pwd;
	}

	getProductList(opt){ //获取产品列表 
			var s=  opt.s;
			 s.setState({
	        loading:true,
	        tip:'正在拉取数据...'
      });
      $.ajax({
        url:window.baseUrl+'product/get_product/',
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid
        },
        success(data){
            if(data.getret === 0){
             	opt.fn&&opt.fn(data);
            }
        }
      })
	}

	listen(opt){
		var socket = io('http://socket.zmiti.com:2120');

    socket.on('connect', function(){
    	socket.emit('login', opt.uid||'');
    });
    // 后端推送来消息时
    socket.on('new_msg', function(msg){
	    	opt.fn && opt.fn(msg);
    });
    // 后端推送来在线数据时
    /*socket.on('update_online_count', function(online_stat){
        $('#online_box').html(online_stat);
    });*/
	}

	send(opt={}){
		$.ajax({
			url:window.baseUrl+'msg/send_msg',
			data:{
				userid:opt.userid,
				getusersigid:opt.getusersigid,
				type:'publish',
				content:opt.content,
				to:opt.to||''
			},
			success(data){
					if(data.getret === 1300){
						//登录超时
						window.location.href= window.loginUrl;
					}
			}
		})
	}

	popNotice(opt={},fnFail){//消息通知
			window.Notification = window.Notification|| window.webkitNotification;
			if (window.Notification) {
		    if (Notification.permission == "granted") {
	            var notification = new Notification(opt.title||"智媒体提醒您：", {
	            	body:opt.body || '你有新的任务了，http://pm.zmiti.com请查看',
	              icon:opt.icon || 'http://www.zmiti.com/main/static/images/notify.jpg',
	              sound:opt.sound || 'http://webapi.zmiti.com/public/corruption/assets/music/right.mp3'
	            });
	            
	            notification.onclick = function() {
	                //text.innerHTML = '张小姐已于' + new Date().toTimeString().split(' ')[0] + '加你为好友！';
	                if(opt.href){
	                	location.href= opt.href;
	                }
	                if(opt.hash){
	                	location.hash = opt.hash;
	                }
	                notification.close();
	            };
	        }    
		} else {
				fnFail && fnFail();
		    console.log('your browser did not support notification,plese update your browser');
		}
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
		 	 			window.obserable.off('getuserid');
		 	 			window.obserable.on('getuserid',()=>{
		 	 				return params.userid;//获取用户的id
		 	 			})
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

	zmitiAjax(options={}){
		var s = this;
		$.ajax({
			url:options.url,
			type:options.type||'get',
			data:options.data||{},
			error(){
				options.error();
			},
			success(data){
				if(data.getret === 1300){

					message.error(data.getmsg);
					setTimeout(()=>{
						window.location.href = window.loginUrl;
					},1000)
				}
				options.success(data);
			}
		})
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
			popNotice:this.popNotice,
			send:this.send,
			listen:this.listen,
			getProductList:this.getProductList,
			loading:this.loading,
			ajaxFail:this.ajaxFail,
			randomString:this.randomString,
			zmitiAjax:this.zmitiAjax
			//fillFeilds:this.fillFeilds
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}

