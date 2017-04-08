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
			currentTalkIndex:0,
			isEntry:1,
			wxchatList:[
				  
			],//聊天作品列表
			data:{
				shareTitle:'',//分享标题
				shareDesc:'',//分享描述
				shareImg:'',//分享图片300.jpg;
				background:'',//聊天背景图片
				bgSound:'',//背景音乐
				username:'',
				myHeadImg:'',
				groupName:'',//群名称
				title:'',
				memberList:[
					
				],
				talk:[
					
				]
			}
		}; 
	}

	randomString(len) {
	　　var len = len || 8;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (var i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}
	render() {


		var s = this;
        var data ={
        }

        const userHeadProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.data.memberList.push({
                	id:s.randomString(),
                	head:imgData.src,
                	name:''
                });

                s.forceUpdate(()=>{
                	 window.obserable.trigger({
	                	type:'refreshMemberList'
	                })
                });
            }
        };


		var component = <div className='wxchat-main-ui wxchat-list-main-ui'>
				统计信息页面
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	deleteWXChat(worksid,i){//删除作品
		var s = this;
		$.ajax({
			url:window.baseUrl+'works/del_works/',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksid:worksid
			},success(data){
				if(data.getret === 0){
					message.success(data.getmsg);
					s.state.wxchatList.splice(i,1);
					s.forceUpdate();
				}
				else{
					message.error(data.getmsg);
				}
			}
		})
		window.obserable.trigger({
			type:'deleteWork',
			data:{
				worksid,
				index:i
			}
		})
	}

	modifyTitle(e){
		this.state.data.title = e.target.value;
		this.forceUpdate();
	}

	entryEdit (){
		window.globalMenus.map((item,i)=>{
			
			 if(item.linkTo === '/wxchatlist/'){
			 	this.productid = item.productid;//获取当前产品的id;
			 }
		});
		
		var s = this;
	 
		var type = 0;
		
		switch(s.usertypesign) {
			case window.Role.COMPANYUSER://公司员工
			case window.Role.COMPANYADMINUSER://公司管理员。
				type = 1;//对应的是公司的作品。
				break;
		}
		$.ajax({
			url:window.baseUrl+'/works/create_works/',
			type:'post',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksname:s.state.data.title,
				productid:s.productid,
				worksdesc:'',
				workico:'',
				workstag:'',
				workstate:0,//作品状态, 0，草稿,1，正常 ,2，已删除
				imgurl:'',
				worktypesign:type,//作品类型0:我的作品;1:公司作品;2,平台作品
				datajson:JSON.stringify(s.state.data)
			},
			success(data){
				if(data.getret === 0){

					message.success(data.getmsg);
					$.ajax({
						url:window.baseUrl + '/weixin/getoauthurl/',
						data:{

							userid:s.userid,//不需要传公共参数。
							redirect_uri:data.viewpath,
							scope:'snsapi_userinfo',
							worksid:data.worksid,
							state:new Date().getTime()+''
						},
						success(dt){

							message[dt.getret === 0?'success':'error'](data.getmsg);
							if(dt.getret === 0){
								window.location.hash =  '/wxchat/'+ data.worksid+'/'
							}
						}
					})
				}
				
			}
		})
	}

	modifyUserName(e,i){
		this.state.data.memberList[i].name = e.target.value;
		this.forceUpdate();
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


	 

		var s = this;

		window.s = this;

		$.ajax({
			url:window.baseUrl + 'works/get_worksinfo/',
			data:{
				type:1000,
				userid:s.userid,
				getusersigid:s.getusersigid
			},
			success(data){
				if(data.getret === 0){
					console.log(data.getworksInfo);
					s.state.wxchatList = data.getworksInfo;
					s.forceUpdate();
				}
			}
		})
		

	}
 
}

export default ZmitiValidateUser(ZmitiStatisticsListApp);
