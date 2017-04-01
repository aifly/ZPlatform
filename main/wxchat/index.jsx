import React, { Component } from 'react';

import { message,Row,Col,Input,Button } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';



import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import WXEntryApp from './entry/index.jsx';
import WXEditApp from './edit/index.jsx';

class ZmitiWxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			currentEditIndex:-1,
			mainHeight:document.documentElement.clientHeight - 50,
			currentDialogName:'wxchat-members-head',
			isShowReplaceMyHeadImg:false,
			isEntry:1,//是否进入编辑状态
			currentTalkIndex:0,
			data:{
				myHeadImg:'',
				groupName:'',//群名称
				title:'2017两会',
				memberList:[
					{
						id:1,
						name:'徐畅',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},
					{
						id:2,
						name:'邓彬',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:3,
						name:'张雷',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:4,
						name:'赵申杉',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:5,
						name:'小郭',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:6,
						name:'师兄',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:7,
						name:'杨凡',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:8,
						name:'杨凡',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:9,
						name:'杨凡',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:10,
						name:'杨凡',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:11,
						name:'杨凡',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					},{
						id:12,
						name:'杨凡1',
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg'
					}
				],
				talk:[{
						isMe:false,
						id:1,
						head:'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161210/28fb05e9289de3bd09bf6f5da1eeb66e.jpg',
						name:'徐畅',
						text:'国大家好大家好大家好大家好大家好大家好',
						href:'http://h5.zmiti.com/public/xwords/'
					},{
						isMe:true,
						head:'',
						name:'邓彬',
						text:'大家好，新人求罩',
					}
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

                s.forceUpdate(()=>{
                	 window.obserable.trigger({
	                	type:'refreshMemberList'
	                })
                });
            }
        };

        const repalcemyheadimgProps ={
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
            	s.state.data.myHeadImg = imgData.src;
            	s.state.isShowReplaceMyHeadImg= false;
            	s.state.data.talk.forEach((item,i)=>{
            		item.isMe && (item.head = imgData.src);
            	});
            	s.forceUpdate()
            }
        }

        const editHeadProps = {
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
            	if(s.state.currentEditIndex === -1){
            		return;
            	}

            	s.state.data.talk.forEach((item,i)=>{
            		if(s.state.data.memberList[s.state.currentEditIndex].id === item.id){
            			item.head = imgData.src;
            		}
            	});
            	s.state.data.memberList[s.state.currentEditIndex].head = imgData.src;
                s.forceUpdate();
            }
        }


        var data ={
        	modifyTitle:this.modifyTitle.bind(this),
        	uploadHead:this.uploadHead.bind(this),
        	modifyUserName:this.modifyUserName.bind(this),
        	entryEdit:this.entryEdit.bind(this),
        	modifyGroupName:this.modifyGroupName.bind(this),
        	

        }


		var component = <div className='wxchat-main-ui' style={mainStyle}>

			<WXEntryApp {...this.state} {...data}></WXEntryApp>			
			<WXEditApp {...this.state} {...data}></WXEditApp>
			<ZmitiUploadDialog id={this.state.currentDialogName} {...userHeadProps}></ZmitiUploadDialog>

			{this.state.currentEditIndex !== -1 && <ZmitiUploadDialog id={'memberList-'+ this.state.currentEditIndex} {...editHeadProps}></ZmitiUploadDialog>}


			{this.state.isShowReplaceMyHeadImg && <ZmitiUploadDialog id={'repalcemyheadimg'} {...repalcemyheadimgProps}></ZmitiUploadDialog>}
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
		});
	}


	modifyTitle(e){
		this.state.data.title = e.target.value;
		this.forceUpdate();
	}

	modifyGroupName(val){
		this.state.data.groupName = val;
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
		window.obserable.on('setMainMember',(i)=>{//设置群主
			if(i===0){
				return;
			}
			var mainMember = this.state.data.memberList[0];
			this.state.data.memberList[0] = this.state.data.memberList.splice(i,1)[0];
			this.state.data.memberList.splice(i,0,mainMember)
			
			this.forceUpdate();
		});


		window.obserable.on('replaceHead',(i)=>{//替换头像

			this.setState({currentEditIndex:i},()=>{
				
				window.obserable.trigger({
				  type:'showModal',
				  data:{type:0,id:'memberList-'+i}
				});
			});


		});

		window.obserable.on('deleteMember',(i)=>{//删除成员
			if(this.state.data.memberList.length<=2){
				message.error('聊天成员最少为2个');
				return;
			}
			this.state.data.memberList.splice(i,1);
			this.forceUpdate();
		});
		
		window.obserable.on('repalceMyHeadImg',()=>{
			this.setState({isShowReplaceMyHeadImg:true},()=>{
				window.obserable.trigger({
					type:'showModal',
					data:{type:0,id:'repalcemyheadimg'}
				});
			});
		});

		window.obserable.on('modifyCurrentTalk',data=>{
			this.state.data.talk[this.state.currentTalkIndex].text = data;
			this.forceUpdate();
		});
	}
 
}

export default ZmitiValidateUser(ZmitiWxChatApp);
