import React, { Component } from 'react';

import { message,Row,Col,Input,Button,Popconfirm,Tooltip } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';

import {Link} from 'react-router';

import './static/css/list.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiPoetryListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight - 50,
			isEntry:1,
			poetryList:[
				  
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
		var component = <div className='poetry-list-main-ui'>
			<section className='poetry-list-C'>
				<ul className='poetry-list'>
					<li  title='创建作品' onClick={this.createWork.bind(this)}>
						<img src='./static/images/create.png'/>
					</li>
					{this.state.poetryList.map((item,i)=>{
						return <li key={i}>
							<section onClick={this.save.bind(this,item.worksid,item.viewpath)}  className='poetry-qrcode'><img src={item.qrcodeUrl}/></section>
							<div className='poetry-item-shareimg' style={{background:'url('+(item.workico|| './static/images/default-chat.jpg')+') no-repeat center / cover'}}></div>
							<div className='poetry-item-name'>{item.worksname}</div>
							<Tooltip placement="top" title={'当前作品浏览量： '+item.totalview}>
								<div className='poetry-item-view'><a href={item.viewpath} target='_blank'><img src='./static/images/eye.png'/></a></div>
							</Tooltip>
							<div className='poetry-item-operator'>
											{/*<div><a href={item.viewpath} target='_blank'>预览</a></div>
																						<div><Link to={'/poetry/'+item.worksid}>编辑</Link></div>*/}
											<Popconfirm placement="top" title={'确定要删除吗？'} onConfirm={this.deletePoetry.bind(this,item.worksid,i)}>
												<div>删除</div>
											</Popconfirm>
										</div>
						</li>
					})}
				</ul>
			</section>					
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	deletePoetry(worksid,i){
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
					s.state.poetryList.splice(i,1);
					s.forceUpdate();
				}
				else{
					message.error(data.getmsg);
				}
			}
		})
	}

	save(worksid,viewpath){
		var s = this;
		this.zmitiAjax({
			url:window.baseUrl+'/works/update_works/',
			type:'post',
			data:{
				worksid:worksid,
				userid:s.userid,
				getusersigid:s.getusersigid,
				datajson:JSON.stringify({worksid:worksid,wxappid:'wxfacf4a639d9e3bcc',
					wxappsecret:'149cdef95c99ff7cab523d8beca86080',
					viewpath:viewpath
				}),
				worksname:'诗词解密测试',
				dirname:'poetry',
				workstag:'',
				workico:''
			},
			success(data){
				message[data.getret === 0?'success':'error'](data.getmsg);
				if(data.getret === 1300){//用户登录超时
					window.location.href = window.loginUrl;
				}
			}
		})
	}

	createWork(){

		
		var s = this;

		var type = 0;
		
		switch(s.usertypesign) {
			case window.Role.COMPANYUSER://公司员工
			case window.Role.COMPANYADMINUSER://公司管理员。
				type = 1;//对应的是公司的作品。
				break;
		}
		
		this.zmitiAjax({
			url:window.baseUrl+'/works/create_works/',
			type:'get',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				productid:s.productid,
				dirname:'poetry',
				worksname:'诗词解密测试',
				workstate:1,
				worktypesign:type,
				datajson:JSON.stringify({})
			},
			success(data){
				message[data.getret === 0?'success':'error'](data.getmsg);
				
			}
		});
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut,zmitiAjax} = this.props;

		resizeMainHeight(this);	

		this.zmitiAjax = zmitiAjax;



		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

		var s = this;

		window.globalMenus.map((item,i)=>{
			
			 if(item.linkTo === '/poetry/'){
			 	this.productid = item.productid;//获取当前产品的id;
			 }
		});
		this.zmitiAjax({
			url:window.baseUrl + 'works/get_worksinfo/',
			data:{
				type:1000,
				productid:s.productid,
				userid:s.userid,
				getusersigid:s.getusersigid
			},
			success(data){
				if(data.getret === 0){

					s.state.poetryList = data.getworksInfo;
					s.forceUpdate();
				}
			}
		})
		

	}
 
}

export default ZmitiValidateUser(ZmitiPoetryListApp);
