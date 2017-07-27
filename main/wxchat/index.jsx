import React, { Component } from 'react';

import { message,Row,Col,Input,Button } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';



import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import WXEntryApp from './entry/index.jsx';
import WXEditApp from './edit/index.jsx';
import WXSaveApp from './save/index.jsx';

class ZmitiWxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			currentEditIndex:-1,
			mainHeight:document.documentElement.clientHeight - 50,
			currentDialogName:'wxchat-members-head',
			isShowReplaceMyHeadImg:false,
			isShowBackgroundDialog:false,
			isEntry:1,//是否进入编辑状态
			currentTalkIndex:0,
			data:{
				shareTitle:'',//分享标题
				shareDesc:'',//分享描述
				shareImg:'',//分享图片300.jpg;
				background:'',//聊天背景图片
				bgSound:'',//背景音乐
				username:'',
				myHeadImg:'',
				groupName:'',//群名称
				title:'2017两会',
				viewpath:'',//预览地址
				memberList:[
					
				],
				talk:[

					

					/*{
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
					}*/
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

            	s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
	                 s.state.data.memberList.push({
	                	id:s.props.randomString(8),
	                	head:imgData.src,
	                	name:''
	                });

	                s.forceUpdate(()=>{
	                	 window.obserable.trigger({
		                	type:'refreshMemberList'
		                })
	                	
	                });
	                }
            	 });
               
            }
        };
        const linkProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){

            	 s.copyfile({
            	 	imgData,
            	 	worksid:s.worksid,
            	 	that:s,
            	 	fn:src=>{
	                	s.state.data.talk[s.state.currentTalkIndex].linkObj.img = src;
		    			s.forceUpdate();
	                }
            	 });
              
            }
        };

        const backgroundProps = {
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
        		 
        		 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
		                s.state.data.background  = src;
		    			s.forceUpdate();
	                }
            	 });
            }	
        }

        const repalcemyheadimgProps ={
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){

            	 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
		                s.state.data.myHeadImg = imgData.src;
		            	s.state.isShowReplaceMyHeadImg= false;
		            	s.state.data.talk.forEach((item,i)=>{
		            		item.isMe && (item.head = imgData.src);
		            	});
		            	s.forceUpdate()
	                }
            	 });
            	
            }
        }

        const  replaceTalkImgProps = {//替换聊天中的图片
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){

            	 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
	                	s.state.data.talk[s.state.currentTalkIndex].img = imgData.src;
        	
		            	s.state.data.talk[s.state.currentTalkIndex].text = '';

		            	s.state.isShowReplaceTalkImg= false;

		            	s.forceUpdate(()=>{
		            		window.obserable.trigger({type:'refreshTalkBodyScroll'});
		            	})
	                }
            	 });
            
            }
        } 
		const  addMusicProps = {//添加音频
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){

            	console.log(imgData);
            	 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
	                	s.state.data.talk[s.state.currentTalkIndex].audioSrc = imgData.src;
	                	s.state.data.talk[s.state.currentTalkIndex].text = '';
		            	s.state.isAddMusic= false;

		            	s.forceUpdate(()=>{
							window.obserable.trigger({type:'refreshTalkBodyScroll'});
		            	})
	                }
            	 });
            }
        } 

        const  addVideoProps = {//添加视频
        	baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){

            	 
            	 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
	                	s.state.data.talk[s.state.currentTalkIndex].videoSrc = imgData.src;

		            	s.state.isAddVideo= false;
		            	s.state.data.talk[s.state.currentTalkIndex].text = '';
		            	s.forceUpdate(()=>{
		            		window.obserable.trigger({type:'refreshTalkBodyScroll'});
		            	})
	                }
            	 });
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

            	 s.copyfile({
            	 	imgData,
            	 	that:s,
            	 	worksid:s.worksid,
            	 	fn:src=>{
	                	s.state.data.talk.forEach((item,i)=>{
		            	if(s.state.data.memberList[s.state.currentEditIndex].id === item.id){
		            			item.head = imgData.src;
		            		}
		            	});
		            	s.state.data.memberList[s.state.currentEditIndex].head = imgData.src;
		                s.forceUpdate();
	                }
            	 });

            	
            }
        }


        var data ={
        	modifyTitle:this.modifyTitle.bind(this),
        	uploadHead:this.uploadHead.bind(this),
        	modifyUserName:this.modifyUserName.bind(this),
        	entryEdit:this.entryEdit.bind(this),
        	modifyGroupName:this.modifyGroupName.bind(this),
        	loading:this.props.loading,
        	copyfile:this.copyfile.bind(this),
        	worksid:this.worksid

        }


		var component = <div className='wxchat-main-ui' style={mainStyle}>
			{this.state.data.bgSound && <audio src={this.state.data.bgSound} autoPlay loop></audio>}
			<WXEntryApp {...this.state} {...data}></WXEntryApp>			
			<WXEditApp {...this.state} {...data}></WXEditApp>
			<WXSaveApp {...this.state} {...data} userid={this.userid} getusersigid={this.getusersigid}></WXSaveApp>
			<ZmitiUploadDialog id={this.state.currentDialogName} {...userHeadProps}></ZmitiUploadDialog>

			{this.state.currentEditIndex !== -1 && <ZmitiUploadDialog id={'memberList-'+ this.state.currentEditIndex} {...editHeadProps}></ZmitiUploadDialog>}


			{this.state.isShowReplaceMyHeadImg && <ZmitiUploadDialog id={'repalcemyheadimg'} {...repalcemyheadimgProps}></ZmitiUploadDialog>}
			{this.state.isShowReplaceTalkImg && <ZmitiUploadDialog id={'isShowReplaceTalkImg'} {...replaceTalkImgProps}></ZmitiUploadDialog>}
			{this.state.isAddMusic && <ZmitiUploadDialog id={'addMusic'} {...addMusicProps}></ZmitiUploadDialog>}
			{this.state.isAddVideo && <ZmitiUploadDialog id={'addVideo'} {...addVideoProps}></ZmitiUploadDialog>}
			{this.state.isShowBackgroundDialog && <ZmitiUploadDialog id={'showBackgroundDialog'} {...backgroundProps}></ZmitiUploadDialog>}
			{this.state.isShowLinkDialog && <ZmitiUploadDialog id={'showLinkDialog'} {...linkProps}></ZmitiUploadDialog>}
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

		//创建or更新作品
		//
		//
		


		this.setState({
			isEntry:true
		});
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
		this.worksid = s.props.params.id;
		$.ajax({
			url:window.baseUrl + '/works/get_filecontent/',
			type:window.ajaxType || 'get',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksid:s.worksid,
			},
			success(data){
				if(data.getret === 0){
					
					s.state.data = JSON.parse(data.filecontent);
					s.state.data.talk.forEach((item,i)=>{
						if(!item.linkObj){
							item.linkObj = {};
						}
					});
					s.state.viewpath = data.path.viewpath;
					s.forceUpdate(()=>{
						window.obserable.trigger({
							type:'refreshMemberScroll'
						})
						
						s.props.loading(s.state.data.loadingImg|| [],null,()=>{
							
		  					window.obserable.trigger({
					  			type:'refreshTalkBodyScroll'
					  		})
		  				})
					});

					
				}
			}
		})

		

		window.s = this;
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
			this.forceUpdate(()=>{
				window.obserable.trigger({
					type:'refreshMemberList'
				});

			});
		});
		
		window.obserable.on('repalceMyHeadImg',()=>{
			this.setState({isShowReplaceMyHeadImg:true},()=>{
				window.obserable.trigger({
					type:'showModal',
					data:{type:0,id:'repalcemyheadimg'}
				});
			});
		});

		window.obserable.on('modifyCurrentTalk',data=>{//输入框改变时。
			this.state.data.talk[this.state.currentTalkIndex].text = data;
			this.state.data.talk[this.state.currentTalkIndex].img = '';//清空聊天图片
			this.state.data.talk[this.state.currentTalkIndex].linkObj = {};//清空聊天图片
			this.forceUpdate();
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(()=>{
				window.obserable.trigger({type:'refreshTalkBodyScroll'});
			},370);
		});

		window.obserable.on('modifyCurrentIndex',data=>{ //设置当前的聊天记录。
			this.setState({
				currentTalkIndex:data
			});

			var type= 0;
			if(this.state.data.talk[data].img){
				type= 1;
			}else if(this.state.data.talk[data].audioSrc){
				type= 2;
			}
			else if(this.state.data.talk[data].videoSrc){
				type= 3;
			}
			else if(this.state.data.talk[data].linkObj.img || this.state.data.talk[data].linkObj.title || this.state.data.talk[data].linkObj.href ||this.state.data.talk[data].linkObj.desc){
				type= 4;
			}


			window.obserable.trigger({
				type:'changeTalkType',
				data:type
			})
		});

		window.obserable.on('setCurrentTalk',data=>{//设置聊天的内容和头像
			if(!this.state.data.talk[this.state.currentTalkIndex]){
				return;
			}
			this.state.data.talk[this.state.currentTalkIndex].head = this.state.data.memberList[data].head;
			this.state.data.talk[this.state.currentTalkIndex].name = this.state.data.memberList[data].name;
			this.state.data.talk[this.state.currentTalkIndex].id = this.state.data.memberList[data].id;
			this.state.data.talk[this.state.currentTalkIndex].isMe = false;
			this.forceUpdate();

		});

		window.obserable.on('addTalk',()=>{//
			var talk = {
				isMe:false,
				id:-1,
				head:'',
				name:'xxx',
				text:'',
				linkObj:{}
			}

			this.state.data.talk.splice(this.state.currentTalkIndex+1,0,talk);
			this.state.currentTalkIndex = this.state.currentTalkIndex+1;
			this.forceUpdate(()=>{
				this.timer && clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					window.obserable.trigger({type:'refreshTalkBodyScroll'});
				},370);
			});
		});


		window.obserable.on("setTalkIsMe",()=>{//设置当前的聊天内容为我。
			this.state.data.talk[this.state.currentTalkIndex].id = -1;
			this.state.data.talk[this.state.currentTalkIndex].isMe = true;
			this.state.data.talk[this.state.currentTalkIndex].head = this.state.data.myHeadImg;
			this.forceUpdate();
  		});

  		window.obserable.on('modifyCurrentTalkHref',(data)=>{//更新当前聊天的链接。
  			this.state.data.talk[this.state.currentTalkIndex].href = data;
  			this.forceUpdate();
  		});

  		window.obserable.on('modifyTalkImg',()=>{//替换图片。
  			this.setState({
  				isShowReplaceTalkImg:true
  			},()=>{
  				window.obserable.trigger({
  					type:'showModal',
					data:{type:0,id:'isShowReplaceTalkImg'}
  				})
  			})
  		});

  		window.obserable.on('addMusic',()=>{//替换图片。
  			this.setState({
  				isAddMusic:true
  			},()=>{
	  			window.obserable.trigger({
					type:'showModal',
					data:{type:1,id:'addMusic'}
	  			})
			})
  		});

  		window.obserable.on('addVideo',()=>{//替换图片。
  			this.setState({
  				isAddVideo:true
  			},()=>{

	  			window.obserable.trigger({
					type:'showModal',
					data:{type:2,id:'addVideo'}
	  			})
			})
  		});

  		window.obserable.on('deleteTalkImg',()=>{
  			var s = this;
  			s.state.data.talk[s.state.currentTalkIndex].img = null;
        	s.forceUpdate()
  		});

  		window.obserable.on('deleteTalk',(i)=>{
  			if(this.state.data.talk.length<=1){
  				message.error('至少得有一个聊天记录');
  				return;
  			}

  			this.state.currentTalkIndex = this.state.data.talk.length - 2;
  			this.forceUpdate();

  			this.state.data.talk.splice(i,1);

  			this.forceUpdate();
  		});

  		window.obserable.on('modifyUserName',data=>{
  			this.state.data.username = data;
  			this.forceUpdate();
  		});

  		window.obserable.on('modifyBackground',(data)=>{
  			this.setState({
  				isShowBackgroundDialog:true
  			},()=>{
  				window.obserable.trigger({
  					type:"showModal",
  					data:{
  						type:0,
  						id:'showBackgroundDialog'
  					}
  				})
  			});
  		});

  		window.obserable.on('deleteBackground',()=>{
  			this.state.data.background = '';//清除背景图片
  			this.forceUpdate();
  		});

  		window.obserable.on('modifyBgSound',(e)=>{
  			this.state.data.bgSound = e;//添加背景音乐
  			this.forceUpdate();
  		});

  		window.obserable.on('deleteBgSound',(e)=>{
  			this.state.data.bgSound = '';//添加背景音乐
  			this.forceUpdate();
  		});

  		window.obserable.on('backtoedit',()=>{//返回编辑
  			this.setState({
  				isEntry:1
  			});

  			window.obserable.trigger({
  				type:'save'
  			})
  		});

  		window.obserable.on('modifyShareInfo',(data)=>{//分享标题,描述
  			this.state.data[data.name] = data.title;
  			this.forceUpdate();
  		});

  		window.obserable.on("save",()=>{
  			this.state.isEntry = 2;
  			var s = this;
  			if(this.state.data.memberList.length<=1){
  				message.error('聊天的人数不能少于两人');
  				return;
  			}
  			s.filterLoadingImg(s.state.data);
  			s.state.data.loadingImg = s.loadingImg;//把所有的资源图片统一加到页面上。
			this.forceUpdate();
  			$.ajax({
  				url:window.baseUrl+'/works/update_works/',
  				type:'post',
  				data:{
  					worksid:s.worksid,
  					userid:s.userid,
  					getusersigid:s.getusersigid,
  					datajson:JSON.stringify(s.state.data),
  					worksname:s.state.data.title,
  					workstag:'',
  					workico:s.state.data.shareImg
  				},
  				success(data){
  					
  					message[data.getret === 0?'success':'error'](data.getmsg);
  				}

  			})

  		});

  		window.obserable.on('modifyCurrentTalkAudio',(data)=>{
  			this.state.data.talk[this.state.currentTalkIndex].audioSrc = data;
  			this.state.data.talk[this.state.currentTalkIndex].text = '';
  			this.state.data.talk[this.state.currentTalkIndex].img = '';
  			this.state.data.talk[this.state.currentTalkIndex].videoSrc ='';
  			this.state.data.talk[this.state.currentTalkIndex].linkObj = {};
  			this.forceUpdate();
  		});

  		window.obserable.on('modifyCurrentTalkVideo',(data)=>{
  			this.state.data.talk[this.state.currentTalkIndex].videoSrc = data;
  			this.state.data.talk[this.state.currentTalkIndex].text = '';
  			this.state.data.talk[this.state.currentTalkIndex].img = '';
  			this.state.data.talk[this.state.currentTalkIndex].audioSrc ='';
  			this.state.data.talk[this.state.currentTalkIndex].linkObj = {};
  			this.forceUpdate(()=>{
  				this.timer && clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					window.obserable.trigger({type:'refreshTalkBodyScroll'});
				},370);
  			});
  		});

  		window.obserable.on('modifyLink',(data)=>{
  			this.state.data.talk[this.state.currentTalkIndex].videoSrc = '';
  			this.state.data.talk[this.state.currentTalkIndex].text = '';
  			this.state.data.talk[this.state.currentTalkIndex].img = '';
  			this.state.data.talk[this.state.currentTalkIndex].audioSrc ='';
  			this.state.data.talk[this.state.currentTalkIndex].linkObj[data.name] = data.value;
  			this.forceUpdate();
  		});

  		window.obserable.on('modifyLinkImg',()=>{
			this.setState({
				isShowLinkDialog:true
			},()=>{
				window.obserable.trigger({
					type:'showModal',
					data:{
						type:0,
						id:'showLinkDialog'
					}
				})
			})
		});


	}

	filterLoadingImg(data){
		this.loadingImg = this.loadingImg || [];

		for(var attr in data){

			if(typeof data[attr] === 'object'){
				this.filterLoadingImg(data[attr]);
			}else{
				if(typeof data[attr] === 'string' && data[attr].split('.').length>1){
					var suffix = data[attr].split('.')[data[attr].split('.').length-1];
					
					if(suffix === 'jpg'||suffix === 'png'||suffix === 'gif'||suffix === 'jpeg'){
						var add =true;
						this.loadingImg.forEach((item,i)=>{
							if(item === data[attr]){
								add = false;
							}
						});
						add && this.loadingImg.push(data[attr]);
					}
				}
			}
		}
	}
 
}

export default ZmitiValidateUser(ZmitiWxChatApp);
