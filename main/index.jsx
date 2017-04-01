import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';

import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiPuzzleApp from './puzzle/index.jsx';
import ZmitiQaApp from './qa/index.jsx';
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

import Obserable from './static/libs/obserable.js';

import {notification } from './commoncomponent/common.jsx';
import $ from 'jquery';

class App extends React.Component{
	constructor(args) {
		super(...args);
	}
	render() {
		var apps = [
				{path: '/', app: ZmitiHomeApp},
				{path: '/puzzle/', app: ZmitiPuzzleApp},
				{path: '/userdepartment/', app: ZmitiUserDepartmentApp},
				{path: '/personalAcc/', app: ZmitiPersonalAccApp},
				{path: '/qa/:title', app: ZmitiQaApp},
				{path: '/project/', app: ZmitiProject},
				{path: '/renewal/', app: ZmitiRenewalApp},
				{path: '/custom/', app: ZmitiCustom},
				{path: '/mycustom/', app: ZmitiMycustom},
				{path: '/wxchat/', app: ZmitiWxChatApp},
				{path: '/commitworkorder/', app: ZmitiCommitWorkOrderApp},
				{path: '/workorder/', app: ZmitiWorkOrderApp},
				{path: '/workorderquestion/', app: ZmitiWorkOrderQuestionApp}
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
    socket.on('new_msg', function(msg){
    		msg = msg.replace(/&quot;/g,"\"");
	    	var data = JSON.parse(msg);
	    	var uid = window.obserable.trigger({type:"getuserid"});
	    	if(data.userids.length>0){
	    		data.userids.forEach((userid)=>{
	    				if(uid === userid){
	    					//向当前用户发。
	    					 if (Notification.permission == "granted") {
					            s.popNotice({body:data.content});
					        } else if (Notification.permission != "denied") {
					            Notification.requestPermission(function (permission) {
					              s.popNotice({body:data.content});
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
	            	body:opt.body || '你有新的任务了，http://pm.zmiti.com请查看',
	              icon:opt.icon || 'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg',
	              sound:opt.sound || 'http://webapi.zmiti.com/public/corruption/assets/music/right.mp3',
	            });
	            
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

var s = JSON.parse(window.getCookie('login'));

$.ajax({
	url:window.baseUrl+'product/get_product/',
    data:{
      userid:s.userid,
      getusersigid:s.getusersigid
    },
    success(data){
    	if(data.getret === 0){
    		var arr = [];
    		data.productlist.map((item,i)=>{
    			arr.push({
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
 

