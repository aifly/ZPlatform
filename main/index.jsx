import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import Obserable from './static/libs/obserable.js';
import {
	Router,
	Route,
	hashHistory,
	Link,
	browserHistory
} from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiUserDepartmentApp from './userdepartment/index.jsx';
//import ZmitiPersonalAccApp from './personalAcc/index.jsx';

import ZmitwxWmwGroupApp from './wxwmwgroup/index.jsx';
import ZmitwxWmwReportApp from './wxwmwreport/index.jsx'; 
import ZmitiWenmingApp from './wenming/index.jsx';
import ZmitiWenmingDataCheckApp from './wenming/datacheck.jsx';
import ZmitiWenmingReportApp from './wenming/report.jsx';
import ZmitiWenmingSettingApp from './wenming/setting.jsx';
import ZmitiWenmingAddApp from './wenming/add.jsx';
import ZmitiWenmingReportaddApp from './wenming/reportadd.jsx';
import ZmitiWenmingAboutApp from './wenming/about.jsx';
import ZmitiWenmingPersonalRankApp from './wenming/personal.jsx';
import ZmitiWenmingProvinceRankApp from './wenming/province.jsx';
import ZmitiWenmingCityRankApp from './wenming/city.jsx';
import ZmitiWenmingCommentCheckApp from './wenming/commentcheck.jsx';
import ZmitiWenmingCommentDetailApp from './wenming/commentdetail.jsx';

import ZmitiWenmingEyeApp from './wenmingeye/index.jsx';
import ZmitiWenmingEyeDataCheckApp from './wenmingeye/datacheck.jsx';
import ZmitiWenmingEyeReportApp from './wenmingeye/report.jsx';
import ZmitiWenmingEyeSettingApp from './wenmingeye/setting.jsx';
import ZmitiWenmingEyeAddApp from './wenmingeye/add.jsx';
import ZmitiWenmingEyeReportaddApp from './wenmingeye/reportadd.jsx';
import ZmitiWenmingEyeAboutApp from './wenmingeye/about.jsx';
import ZmitiWenmingEyePersonalRankApp from './wenmingeye/personal.jsx';
import ZmitiWenmingEyeProvinceRankApp from './wenmingeye/province.jsx';
import ZmitiWenmingEyeCityRankApp from './wenmingeye/city.jsx';
import ZmitiWenmingEyeCommentCheckApp from './wenmingeye/commentcheck.jsx';

import ZmitiWenmingEyeCommentDetailApp from './wenmingeye/commentdetail.jsx'; 
 
import ZmitiViewPersonalApp from "./viewpersonal/index.jsx";

import ZmitiViewUserInforApp from "./viewuserinfor/index.jsx";

/***
 * 
 */
import {
	notification
} from './commoncomponent/common.jsx';
import $ from 'jquery';

class App extends React.Component {
	constructor(args) {
		super(...args);
		this.state = {
			wxProductId: 'wxchat',
		}
	}
	render() {
		var apps = [
			{
				path: '/',
				app: ZmitiHomeApp
			}, {
				path: '/userdepartment/',
				app: ZmitiUserDepartmentApp
			},
			//{path: '/personalAcc/', app: ZmitiPersonalAccApp},
			/*  {		
				path: '/viewuserinfor/(:id)',
				app: ZmitiViewUserInforApp
			}*/, {
				path: '/viewpersonal/(:id)',
				app: ZmitiViewPersonalApp
			} ,  {
				path: 'wxwmwgroup/',
				app: ZmitwxWmwGroupApp
			}, {
				path: 'wxwmwreport/',
				app: ZmitwxWmwReportApp
			}, {
				path: '/wenming',
				app: ZmitiWenmingApp
			}, {
				path: '/wenmingdatacheck',
				app: ZmitiWenmingDataCheckApp
			}, {
				path: '/wenmingreport',
				app: ZmitiWenmingReportApp
			}, {
				path: '/wenmingreportadd/(:id)',
				app: ZmitiWenmingReportaddApp
			}, {
				path: '/wenmingsetting',
				app: ZmitiWenmingSettingApp
			}, {
				path: '/wenmingadd',
				app: ZmitiWenmingAddApp
			}, {
				path: '/wenmingabout',
				app: ZmitiWenmingAboutApp
			}, {
				path: '/wenmingpersonal',
				app: ZmitiWenmingPersonalRankApp
			}, {
				path: '/wenmingprovince',
				app: ZmitiWenmingProvinceRankApp
			}, {
				path: '/wenmingcity/(:id)',
				app: ZmitiWenmingCityRankApp
			}, {
				path: '/wenmingcommentcheck',
				app: ZmitiWenmingCommentCheckApp
			}, {
				path: '/wenmingcommentdetail/:id',
				app: ZmitiWenmingCommentDetailApp
			}
			, {
				path: '/wmeye',
				app: ZmitiWenmingEyeApp
			}, {
				path: '/wmeyedatacheck',
				app: ZmitiWenmingEyeDataCheckApp
			}, {
				path: '/wmeyereport',
				app: ZmitiWenmingEyeReportApp
			}, {
				path: '/wmeyereportadd/(:id)',
				app: ZmitiWenmingEyeReportaddApp
			}, {
				path: '/wmeyesetting',
				app: ZmitiWenmingEyeSettingApp
			}, {
				path: '/wmeyeadd',
				app: ZmitiWenmingEyeAddApp
			}, {
				path: '/wmeyeabout',
				app: ZmitiWenmingEyeAboutApp
			}, {
				path: '/wmeyepersonal',
				app: ZmitiWenmingEyePersonalRankApp
			}, {
				path: '/wmeyeprovince',
				app: ZmitiWenmingEyeProvinceRankApp
			}, {
				path: '/wmeyecity/(:id)',
				app: ZmitiWenmingEyeCityRankApp
			}, {
				path: '/wmeyecommentcheck',
				app: ZmitiWenmingEyeCommentCheckApp
			}, {
				path: '/wmeyecommentdetail/:id',
				app: ZmitiWenmingEyeCommentDetailApp
			}

		];
		return (
			<Router history={hashHistory}>
				{apps.map((app, i) => {
					return <Route key={i} path={app.path} component={app.app} />
				})}
			</Router> 
			
		)
	}

	listen(opt = {}) {
		if(!window.io){
			return
		}

		return;
		var socket = io(protocol + '//socket.zmiti.com:2120');

		/*socket.on('connect', function(){
			socket.emit('login', opt.uid||'');
		});*/
		// 后端推送来消息时
		var s = this;
		socket.on('zmitilogout', function(msg) {
			if (!msg) {
				return;
			}
			msg = msg.replace(/&quot;/g, "\"");
			var data = JSON.parse(msg);

			var uid = window.obserable.trigger({
				type: "getuserid"
			});
			if (data.userids.length > 0) {
				data.userids.forEach((userid) => {
					if (uid === userid) {
						//向当前用户发。
						if (Notification.permission == "granted") {
							s.popNotice({
								body: data.content,
								href: data.href
							});
						} else if (Notification.permission != "denied") {
							Notification.requestPermission(function(permission) {
								s.popNotice({
									body: data.content,
									href: data.href
								});
							});
						} else {
							notification['info']({
								message: data.content,
								description: '智媒体提示您'
							});
						}
					}
				});
			} else { //向所有人推送消息。
				if (Notification.permission == "granted") {
					s.popNotice();
				} else if (Notification.permission != "denied") {
					Notification.requestPermission(function(permission) {
						s.popNotice();
					});
				} else {
					notification['info']({
						message: data.content,
						description: '智媒体提示您'
					});
				}
			}

		});
	}

	popNotice(opt = {}, fnFail) { //消息通知
		window.Notification = window.Notification || window.webkitNotification;
		if (window.Notification) {
			if (Notification.permission == "granted") {
				var notifications = new Notification(opt.title || "智媒体提醒您：", {
					body: opt.body || '您有新的消息',
					icon: opt.icon || 'http://www.zmiti.com/main/static/images/notify.jpg',
					sound: opt.sound || 'http://webapi.zmiti.com/public/corruption/assets/music/right.mp3',
				});



				setTimeout(() => {
					location.href = opt.href;
				}, 1000)

				notifications.onclick = function() {
					//text.innerHTML = '张小姐已于' + new Date().toTimeString().split(' ')[0] + '加你为好友！';
					if (opt.href) {
						location.href = opt.href;
					}
					if (opt.hash) {
						location.hash = opt.hash;
					}
					notifications.close();
				};
			}
			setTimeout(() => {
				location.href = opt.href;
			}, 1000)
		} else {
			fnFail && fnFail();
			console.log('your browser did not support notification,plese update your browser');
		}
	}

	componentWillMount() {

		//this.listen();

		window.obserable = new Obserable();


	}

	componentDidMount() {

	}
}

window.getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
};

try {
	var s = JSON.parse(window.getCookie('login'));

	$.ajax({
		url: window.baseUrl + 'product/get_product/',
		type: window.ajaxType || 'get',
		data: {
			userid: s.userid,
			getusersigid: s.getusersigid
		},
		success(data) {
			if (data.getret === 0) {
				var arr = [];
				data.productlist.map((item, i) => {

					arr.push({
						"productid": item.productid,
						"linkTo": item.producturl,
						"key": item.producturl.split('/')[1],
						"title": item.productname,
						"iconType": item.icontype,
						"type": item.producticon
					})
				});
				window.globalMenus = arr;
				ReactDOM.render(<App></App>, document.getElementById('fly-main'));
				window.mainLeftSize = 180;
				window.onresize = function() {
					window.obserable.trigger({
						type: 'setMainHeight'
					});
					window.obserable.trigger({
						type: 'setMenuWidth'
					});
				}


			}
		}
	})
} catch (e) {
	window.location.href = window.loginUrl;
}