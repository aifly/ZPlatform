import React, { Component } from 'react';

import { message,Row,Col,Input,Button } from '../commoncomponent/common.jsx';

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
				{
					worksid:'123456',
					worksname:'民法你知道多少民法你知道多少民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				},{
					worksid:'123456',
					worksname:'民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				},{
					worksid:'123456',
					worksname:'民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				},{
					worksid:'123456',
					worksname:'民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				},{
					worksid:'123456',
					worksname:'民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				},{
					worksid:'123456',
					worksname:'民法你知道多少',
					worksdesc:'',
					workstag:'',
					workico:'./static/images/300.jpg',
					viewpath:'http://h5.zmiti.com/public/civil-law3/index.html',
					datajsonpath:''
				}
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


	render() {


		var s = this;
        var data ={
        	uploadHead:this.uploadHead.bind(this)
        }

        const userHeadProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.data.memberList.push({
                	id:s.state.data.memberList.length-1,
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
			{this.state.isEntry === 1 && <section className='wxchat-list-C'>
							<ul className='wxchat-list'>
								<li  title='创建作品' onClick={()=>{this.setState({isEntry:0})}}>
									<img src='./static/images/create.png'/>
								</li>
								{this.state.wxchatList.map((item,i)=>{
									return <li key={i}>
										<div className='wxchat-item-shareimg' style={{background:'url('+item.workico+') no-repeat center / cover'}}></div>
										<div className='wxchat-item-name'>{item.worksname}</div>
										<div className='wxchat-item-operator'>
											<div>预览</div>
											<div><Link to={'/wxchat/'+item.worksid}>编辑</Link></div>
											<div onClick={this.deleteWXChat.bind(this,item.worksid)}>删除</div>
										</div>
									</li>
								})}
							</ul>
						</section>}
			<WXEntryApp {...this.state} {...data}></WXEntryApp>	
			<ZmitiUploadDialog id={'wxchat-members-head'} {...userHeadProps}></ZmitiUploadDialog>		
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	deleteWXChat(){//删除作品

	}

	uploadHead(){
		var obserable=window.obserable;
		obserable.trigger({
		  type:'showModal',
		  data:{type:0,id:'wxchat-members-head'}
		});
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

		

	}
 
}

export default ZmitiValidateUser(ZmitiWxChatListApp);
