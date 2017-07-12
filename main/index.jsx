import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';

import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiPuzzleApp from './puzzle/index.jsx';
import ZmitiQAListApp from './qa/list.jsx';
import ZmitiQAApp from './qa/index.jsx';
import ZmitiMeetingApp from './meeting/index.jsx';
import ZmitiUserDepartmentApp from './userdepartment/index.jsx';
import ZmitiPersonalAccApp from './personalAcc/index.jsx';
import ZmitiRenewalApp from './renewal/index.jsx';
import ZmitiProject from './project/index.jsx';
import ZmitiCustom from './custom/index.jsx';
import ZmitiMycustom from './mycustom/index.jsx';
import ZmitiWxChatApp from './wxchat/index.jsx';
import ZmitiWorkOrderApp from './workorder/index.jsx';
import ZmitiCommitWorkOrderApp from './commitworkorder/index.jsx';
import ZmitiWorkOrderQuestionApp from './workorderquestion/index.jsx';
import ZmitiWxChatListApp from './wxchat/list.jsx';
import ZmitiViewQuestionApp  from './viewquestion/index.jsx';
import ZmitiViewUserInforApp  from './viewuserinfor/index.jsx';
import ZmitiStatisticsListApp  from './statistics/index.jsx';
import ZmitiViewPersonalApp  from './viewpersonal/index.jsx';
import ZmitiWXUserInfoApp  from './wxuserinfo/index.jsx';
import ZmitiPoetryListApp  from './poetry/list.jsx';
import ZmitiPoetryApp  from './poetry/index.jsx';
import ZmitiViewxChatApp  from './viewxchat/index.jsx';
import ZmitiTripostApp  from './tripost/index.jsx';
import ZmitiTripseasonApp  from './tripseason/index.jsx';
import ZmitiTriptrafficApp from './triptraffic/index.jsx';
import ZmitiTripexpenceApp from './tripexpence/index.jsx';
import ZmitiWorkWxchatApp from './workwxchat/index.jsx';
import ZmitiInforListApp from './inforlist/index.jsx';
import ZmitiRepertoryListApp from './repertorylist/index.jsx';

import ZmitiViewBookListApp from './viewcustombooklist/index.jsx';
import ZmitiViewCustomUserApp from './viewcustomuser/index.jsx';
import ZmitiViewCustomUserListApp from './viewcustomuserlist/index.jsx';
import ZmitiViewUserBookApp from './viewcustomuserbook/index.jsx';
import ZmitiViewAnswerApp from './viewanswer/index.jsx';
import Obserable from './static/libs/obserable.js';
import ZmitiTrainingApp from './training/index.jsx';
import ZmitiTripReasonApp from './tripreason/index.jsx';
import ZmitiTripNoticeApp from './tripnotice/index.jsx';

import {notification } from './commoncomponent/common.jsx';
import $ from 'jquery';

class App extends React.Component{
	constructor(args) {
		super(...args);
		this.state = {
			wxProductId:'wxchat',
		}
	}
	render() {
		var apps = [
				{path: '/', app: ZmitiHomeApp},
				{path: '/puzzle/', app: ZmitiPuzzleApp},
				{path: '/userdepartment/', app: ZmitiUserDepartmentApp},
				{path: '/personalAcc/', app: ZmitiPersonalAccApp},
				{path: '/meeting/:title', app: ZmitiMeetingApp},
				{path: '/project/', app: ZmitiProject},
				{path: '/renewal/', app: ZmitiRenewalApp},
				{path: '/custom/', app: ZmitiCustom},
				{path: '/myorder/', app: ZmitiMycustom},
				{path: '/wxchat/:id', app: ZmitiWxChatApp},
				{path: '/wxchatlist/', app: ZmitiWxChatListApp},
				{path: '/commitworkorder/', app: ZmitiCommitWorkOrderApp},
				{path: '/workorder/', app: ZmitiWorkOrderApp},
				{path: '/workorderquestion/(:id)', app: ZmitiWorkOrderQuestionApp},
				{path: '/statistics/:productname/:id', app: ZmitiStatisticsListApp},
				{path: '/viewquestion/(:id)', app: ZmitiViewQuestionApp},
				{path: '/viewuserinfor/(:id)', app: ZmitiViewUserInforApp},
				{path: '/viewpersonal/(:id)', app: ZmitiViewPersonalApp},
				{path: '/viewxchat/(:id)', app: ZmitiViewxChatApp},
				{path: '/wxuserinfo/', app: ZmitiWXUserInfoApp},
				{path: '/poetry/', app: ZmitiPoetryListApp},
				{path: '/poetryedit/:id', app: ZmitiPoetryApp},
				{path: '/tripost/', app: ZmitiTripostApp},
				{path: '/tripseason/(:id)', app: ZmitiTripseasonApp},
				{path: '/triptraffic/(:title)/(:id)',app:ZmitiTriptrafficApp},
				{path: '/tripexpence/(:id)',app:ZmitiTripexpenceApp},
				{path: '/workwxchat/(:id)',app:ZmitiWorkWxchatApp},
				{path: '/inforlist/', app: ZmitiInforListApp},
				{path: '/repertorylist/', app: ZmitiRepertoryListApp},
				{path: '/viewcustombooklist/(:title)/(:id)',app:ZmitiViewBookListApp},
				{path: '/viewcustomuser/(:title)/(:id)',app:ZmitiViewCustomUserApp},
				{path: '/viewcustomuserlist/(:title)/(:id)',app:ZmitiViewCustomUserListApp},
				{path: '/viewcustomuserbook/(:wxuserid)/(:id)',app:ZmitiViewUserBookApp},
				{path: '/qa/',app:ZmitiQAListApp},
				{path: '/qaedit/:id', app: ZmitiQAApp},
				{path: '/viewanswer/(:title)/(:id)',app:ZmitiViewAnswerApp},
				{path: '/training/(:title)/(:id)',app:ZmitiTrainingApp},
				{path: '/tripreason/',app:ZmitiTripReasonApp},
				{path: 'tripnotice/',app:ZmitiTripNoticeApp}
				
		];
		return (
			<Router history={hashHistory}>
				{apps.map((app, i) => {
					return <Route key={i} path={app.path} component={app.app}/>
				})}
			</Router>
			)
	}

	listen(opt={}){
		var socket = io('http://socket.zmiti.com:2120');

    /*socket.on('connect', function(){
    	socket.emit('login', opt.uid||'');
    });*/
    // 后端推送来消息时
    var s = this;
    socket.on('zmitilogout', function(msg){
    	   if(!msg){
    	   	return;
    	   }
    		msg = msg.replace(/&quot;/g,"\"");
	    	var data = JSON.parse(msg);

	    	var uid = window.obserable.trigger({type:"getuserid"});
	    	if(data.userids.length>0){
	    		data.userids.forEach((userid)=>{
	    				if(uid === userid){
	    					//向当前用户发。
	    					 if (Notification.permission == "granted") {
					            s.popNotice({body:data.content,href:data.href});
					        } else if (Notification.permission != "denied") {
					            Notification.requestPermission(function (permission) {
					              s.popNotice({body:data.content,href:data.href});
					            });
					        }else{
					        		notification['info']({
					        			message:data.content,
					        			description:'智媒体提示您'
					        		});
					        }
	    				}
		    	});
	    	}else{//向所有人推送消息。
	    		if (Notification.permission == "granted") {
		            s.popNotice();
		        } else if (Notification.permission != "denied") {
		            Notification.requestPermission(function (permission) {
		              s.popNotice();
		            });
		        }
		        else{
					notification['info']({
        			message:data.content,
        			description:'智媒体提示您'
        		});
		        }
	    	}
	    	
    });
	}

	popNotice(opt={},fnFail){//消息通知
			window.Notification = window.Notification|| window.webkitNotification;
			if (window.Notification) {
		    if (Notification.permission == "granted") {
	            var notifications = new Notification(opt.title||"智媒体提醒您：", {
	            	body:opt.body || '您有新的消息',
	              icon:opt.icon || 'http://www.zmiti.com/main/static/images/notify.jpg',
	              sound:opt.sound || 'http://webapi.zmiti.com/public/corruption/assets/music/right.mp3',
	            });



	             setTimeout(()=>{
 	            	location.href= opt.href;
 	             },1000)
	            
	            notifications.onclick = function() {
	                //text.innerHTML = '张小姐已于' + new Date().toTimeString().split(' ')[0] + '加你为好友！';
	                if(opt.href){
	                	location.href= opt.href;
	                }
	                if(opt.hash){
	                	location.hash = opt.hash;
	                }
	                notifications.close();
	            };
	        } 
	        setTimeout(()=>{
            	location.href= opt.href;
             },1000)
		} else {
				fnFail && fnFail();
		    console.log('your browser did not support notification,plese update your browser');
		}
	}

	componentWillMount(){

		this.listen();

		window.obserable = new Obserable();
		
		
	}
	
	componentDidMount() {

	}
}

window.getCookie = function(cname){
 var name = cname + "=";  
    var ca = document.cookie.split(';');  
    for(var i=0; i<ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0)==' ') c = c.substring(1);  
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
    }  
    return "";  
};

try{
	var s = JSON.parse(window.getCookie('login'));

	$.ajax({
		url:window.baseUrl+'product/get_product/',
		type:window.ajaxType || 'get',
	    data:{
	      userid:s.userid,
	      getusersigid:s.getusersigid
	    },
	    success(data){
	    	if(data.getret === 0){
	    		var arr = [];
	    		data.productlist.map((item,i)=>{

	    			arr.push({
	    				"productid":item.productid,
	    				"linkTo":item.producturl,
						"key":item.producturl.split('/')[1],
						"title":item.productname,
						"iconType":item.icontype,
						"type":item.producticon
	    			})
	    		});
	    		window.globalMenus = arr;
				ReactDOM.render(<App></App>, document.getElementById('fly-main'));
				window.mainLeftSize = 180;
				window.onresize = function(){
					window.obserable.trigger({type:'setMainHeight'});
					window.obserable.trigger({type:'setMenuWidth'});
				}


	    	}
	    }
	})
}
catch(e){
	window.location.href = window.loginUrl;
}
 

