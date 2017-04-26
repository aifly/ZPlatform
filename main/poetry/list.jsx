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
					<li  title='创建作品' onClick={()=>{this.setState({isEntry:0})}}>
						<img src='./static/images/create.png'/>
					</li>
					{this.state.poetryList.map((item,i)=>{
						return <li key={i}>
							<div className='poetry-item-shareimg' style={{background:'url('+(item.workico|| './static/images/default-chat.jpg')+') no-repeat center / cover'}}></div>
							<div className='poetry-item-name'>{item.worksname}</div>
							<Tooltip placement="top" title={'当前作品浏览量： '+item.totalview}>
								<div className='poetry-item-view'><a href={item.viewpath} target='_blank'><img src='./static/images/eye.png'/></a></div>
							</Tooltip>
						</li>
					})}
				</ul>
			</section>					
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
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

		return;

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
					s.state.poetryList = data.getworksInfo;
					s.forceUpdate();
				}
			}
		})
		

	}
 
}

export default ZmitiValidateUser(ZmitiPoetryListApp);
