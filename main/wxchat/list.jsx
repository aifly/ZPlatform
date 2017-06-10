import React, { Component } from 'react';

import { message,Row,Col,Input,Button,Popconfirm,Tooltip ,Icon} from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';

import {Link} from 'react-router';

import './static/css/index.css';
import './static/css/list.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import WXEntryApp from './entry/index.jsx';

class ZmitiWxChatListApp extends Component {
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
        	uploadHead:this.uploadHead.bind(this),
        	entryEdit:this.entryEdit.bind(this),
        	modifyUserName:this.modifyUserName.bind(this),
        	modifyTitle:this.modifyTitle.bind(this),
        }

        const userHeadProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
            	s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	fn:src=>{
	                	s.state.data.memberList.push({
		                	id:s.randomString(),
		                	head:imgData.src,
		                	name:''
		                });

		                s.forceUpdate(()=>{
		                	 window.obserable.trigger({
			                	type:'refreshMemberList'
			                });
		                });
	                }
            	 });
               
            }
        };


		var component = <div className='wxchat-main-ui wxchat-list-main-ui'>
			{this.state.isEntry === 1 && <section className='wxchat-list-C'>
							<ul className='wxchat-list'>
								<li  title='创建作品' onClick={()=>{this.setState({isEntry:0})}}>
									<img src='./static/images/create.png'/>
								</li>
								{this.state.wxchatList.map((item,i)=>{
									console.log(item.qrcodeUrl)
									return <li key={i}>
										<section  className='wxchat-qrcode'><img src={item.qrcodeUrl}/></section>
										<div className='wxchat-item-shareimg' style={{background:'url('+(item.workico|| './static/images/default-chat.jpg')+') no-repeat center / cover'}}></div>
										<div className='wxchat-item-name'>{item.worksname}</div>
										<Tooltip placement="top" title={'当前作品浏览量： '+item.totalview}>
											<div className='wxchat-item-view'><Link to={'/workwxchat/'+item.worksid}><Icon type="user" /></Link><Link to={'/statistics/wxchat/'+item.worksid}><Icon type="dot-chart" /></Link></div>
										</Tooltip>
										
										<div className='wxchat-item-operator'>
											<div><a href={item.viewpath} target='_blank'>预览</a></div>
											<div><Link to={'/wxchat/'+item.worksid}>编辑</Link></div>
											<Popconfirm placement="top" title={'确定要删除吗？'} onConfirm={this.deleteWXChat.bind(this,item.worksid,i)}>
												<div>删除</div>
											</Popconfirm>
										</div>
									</li>
								})}
							</ul>
						</section>}
			<WXEntryApp {...this.state} {...data}></WXEntryApp>	
			<ZmitiUploadDialog id='wxchat-members-head' {...userHeadProps}></ZmitiUploadDialog>		
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
						type:'post',
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
								window.location.hash =  '/wxchat/'+ data.worksid+'/';
							}
						}
					})
				}
				
			}
		})
	}

	uploadHead(){
		var obserable=window.obserable;
		obserable.trigger({
		  type:'showModal',
		  data:{type:0,id:'wxchat-members-head'}
		});
	}

	modifyUserName(e,i){
		this.state.data.memberList[i].name = e.target.value;
		this.forceUpdate();
	}



	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut,copyfile} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.copyfile = copyfile;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

		var s = this;

		window.s = this;

		window.globalMenus.map((item,i)=>{
			
			 if(item.linkTo === '/wxchatlist/'){
			 	this.productid = item.productid;//获取当前产品的id;
			 }
		});

		$.ajax({
			url:window.baseUrl + 'works/get_worksinfo/',
			data:{
				type:1000,
				userid:s.userid,
				productid:s.productid,
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

export default ZmitiValidateUser(ZmitiWxChatListApp);
