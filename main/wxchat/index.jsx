import React, { Component } from 'react';

import { message,Row,Col,Input,Button } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';



import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import WXEntryApp from './entry/index.jsx';

class ZmitiWxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			currentDialogName:'wxchat-members-head',
			isEntry:false,//是否进入编辑状态
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


        var data ={
        	modifyTitle:this.modifyTitle.bind(this),
        	uploadHead:this.uploadHead.bind(this),
        	modifyUserName:this.modifyUserName.bind(this),
        	entryEdit:this.entryEdit.bind(this)
        }


		var component = <div className='wxchat-main-ui' style={mainStyle}>
			<WXEntryApp {...this.state} {...data}></WXEntryApp>			
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

			<ZmitiUploadDialog id={this.state.currentDialogName} {...userHeadProps}></ZmitiUploadDialog>
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	modifyUserName(e,i){
		this.state.data.memberList[i].name = e.target.value;
		this.forceUpdate();
	}

	entryEdit(){
		this.setState({
			isEntry:true
		})
	}

	uploadHead(){
		var obserable=window.obserable;
		obserable.trigger({
		  type:'showModal',
		  data:{type:0,id:'wxchat-members-head'}
		})  
	}


	modifyTitle(e){
		this.state.data.title = e.target.value;
		this.forceUpdate();
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
