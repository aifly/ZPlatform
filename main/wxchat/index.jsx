import React, { Component } from 'react';

import { message,Row,Col,Input,Button } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';

import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiWxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			currentDialogName:'wxchat-members-head',
			isEntry:true,//是否进入编辑状态
			data:{
				title:'2017两会',
				memberList:[
					
				]
			}
		}; 
	}


	render() {
		var mainStyle = {
			background:'url(./static/images/wxtalk-bg.png) repeat center',

		}

		var s = this;

		const userHeadProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.data.memberList.push({
                	head:imgData.src,
                	name:''
                });
                s.forceUpdate();
            }
        };


		var component = <div className='wxchat-main-ui' style={mainStyle}>
			<div className={this.state.isEntry?'hide':''}>
				<h4 style={{height:'5vh'}}></h4>
			 <div className="wxchat-main-content">
			 	<aside>
			 		<img draggable='false' src='./static/images/iphone.png'/>
			 	</aside>
			 	<aside>
				 	<h4 style={{height:'8vh'}}></h4>
		 			<section>
		 				<div className='wxchat-title'>
		 					<h2>输入H5名称</h2>
		 					<Input onChange={e=>{this.state.data.title= e.target.value;this.forceUpdate();}} value={this.state.data.title}/>
		 				</div>
		 				<div className='wxchat-members'>
		 					<h2>添加群成员头像和昵称<span>(最多可上传20位成员)</span></h2>
		 					<section className='wxchat-members-scroll'>
		 						<ul>
		 							{this.state.data.memberList.map((item,i)=>{
		 								return <li key={i}>
		 									{i===0 && <img title='群主' src='./static/images/king.png' className='wxchat-king'/>}
		 									<div>
		 										<section  style={{background:'url('+item.head+') no-repeat center center / cover'}}></section>
		 									</div>
		 									<div>
		 										<Input placeholder='请输入名称' type='text' onChange={(e)=>{this.state.data.memberList[i].name = e.target.value;this.forceUpdate()}} value={item.name}/>
		 									</div>
		 								</li>
		 							})}
		 							<li onClick={this.uploadHead.bind(this)}>
	 									<div  style={{background:'url(./static/images/upload.jpg) no-repeat center center / cover',cursor:'pointer'}}>
	 									</div>
	 									<div>
	 									</div>
		 							</li>
		 						</ul>
		 					</section>
		 					<button className='wxchat-sure-btn'>确定</button>
		 				</div>
		 			</section>
			 	</aside>
			 </div>
			 <ZmitiUploadDialog id={this.state.currentDialogName} {...userHeadProps}></ZmitiUploadDialog>
			</div>
			<div className={'wxchat-main-stage '+(this.state.isEntry?'show':'')}>
				<aside>
					<div className='wxchat-phone-container' style={{background:'rgba(255,255,255,.7) url(./static/images/phone-bg.png) no-repeat  center / contain'}}>
						<section className='wxchat-talk-main'>
							<aside className='wxchat-talk-header' style={{background:'url(./static/images/wx-header.png) no-repeat center / contain'}}>
								<div><span>{this.state.data.title}</span><span></span></div>
							</aside>
							<aside className='wxchat-talk-body'></aside>
							<aside className='wxchat-talk-footer'  style={{background:'url(./static/images/wxtalk.png) no-repeat center / contain'}}></aside>
						</section>
					</div>					
				</aside>
				<aside>2</aside>
			</div>
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	uploadHead(){
		var obserable=window.obserable;
		obserable.trigger({
		  type:'showModal',
		  data:{type:0,id:'wxchat-members-head'}
		})  
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
	}

	componentDidMount() {
		var s = this;
	
	}
 
}

export default ZmitiValidateUser(ZmitiWxChatApp);
