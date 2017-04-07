import React from 'react';
import { message,Row,Col,Input,Button,Checkbox,Modal } from '../../commoncomponent/common.jsx';

import './css/index.css';

import  WXMemberApp from '../member/index.jsx';

import WXTalkContentApp from '../talkcontent/index.jsx';

import IScroll from 'iscroll';

export default class WXEditApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	currentShowArea:'addTalkContent',
    	showDetail:false,
    	visible:false,
    	showBgSoundDetail:false,
    };
  }

  render() {

  	var bodyStyle ={};
  	if(this.props.data.background){
  		bodyStyle.background = 'url('+this.props.data.background+') no-repeat center / cover'
  	}



    return (
      <div className={'wxchat-main-stage '+(this.props.isEntry === 1?'show':'')} style={{height:this.props.mainHeight}}>
				<aside>
					<div className='wxchat-phone-container' style={{background:'rgba(255,255,255,.7) url(./static/images/phone-bg.png) no-repeat  center / contain'}}>
						<section className='wxchat-talk-main'>
							<section className='wxchat-talk-bg-C'>
								<aside>
									<img src='./static/images/bg-ico.png' title='设置聊天背景' onClick={this.operatBackground.bind(this)}/>
									<section style={{display:this.state.showDetail?'block':'none'}}>
										<Button type='primary' icon='reload' onClick={this.modifyBackground.bind(this)}>替换背景</Button>
										<Button  type='primary'  icon='delete' onClick={this.deleteBackground.bind(this)}>删除背景</Button>
									</section>
								</aside>
								<aside>
									<img src='./static/images/music-ico.png' title='设置背景音乐' onClick={this.operatBgSound.bind(this)}/>
									<section style={{display:this.state.showBgSoundDetail?'block':'none',top:44}}>
										<Button type='primary' icon='reload' onClick={()=>{this.setState({visible:true})}}>替换音乐</Button>
										<Button  type='primary'  icon='delete' onClick={this.deleteBgSound.bind(this)}>删除音乐</Button>
									</section>
								</aside>
							</section>
							<aside className='wxchat-talk-header' style={{background:'url(./static/images/wx-header.png) no-repeat center / contain'}}>
								<div onClick={()=>{this.setState({currentShowArea:'modifyTitle'})}}><span>{this.props.data.title}</span><span style={{background:'url(./static/images/wx-header-edit.png) no-repeat left bottom'}}></span></div>
							</aside>
							<aside className='wxchat-talk-body' ref='wxchat-talk-body' style={bodyStyle}>
								<div ref='wxchat-talk-body-scroller' style={{paddingBottom:20}}>
									<section className='wxchat-edit-member-list'>
									{this.props.data.memberList.length>1 && <div>
																			{this.props.data.memberList[0].name+'邀请你和'+this.props.data.memberList[1].name+' 、'}
																			{this.props.data.memberList.filter((item,i)=>{
																				return i > 1;
																			}).map((item,i)=>{
																				return <span key={i}>{i>= this.props.data.memberList.length - 3 ? item.name: item.name+' 、'}</span>
																			})}
																			<span>等加入群聊</span>
																		</div>}
								</section>
								{this.props.data.title&& this.props.data.memberList[0] && <section className='wxchat-group-name'>{this.props.data.memberList[0].name}修改群名称为{this.props.data.title}</section>}
								
								<ul className='wxchat-edit-talk-list'>
									{this.props.data.talk.map((item,i)=>{
										if(item.isMe){
											return <li onClick={this.modifyCurrentIndex.bind(this,i)} key={i} className={'wxchat-edit-talk-user '+(i===this.props.currentTalkIndex  ? 'active':'')}>
														<div className={'wxchat-edit-talk-content ' + (item.text?'':'wxchat-edit-talk-img')}>
															<aside>
																<div></div>
															</aside>
															<aside>
																<div>
																	{item.text && item.text}
																	{item.img && <img  src={item.img}/>}
																	{item.audioSrc && <section className='wxchat-audia'><img src='./static/images/audio-ico.png' /></section>}
																	{item.videoSrc && <img  src={'./static/images/video-ico1.jpg'}/>}
																	{item.linkObj && (item.linkObj.img || item.linkObj.title||item.linkObj.href ||item.linkObj.desc) && <div className='wxchat-linkobj-C wxchat-linkobj-isMe'>
																				<section>{item.linkObj.title}</section>
																				<section>{item.linkObj.desc}</section>
																				<section style={{background:'url('+(item.linkObj.img || './static/images/zmiti.jpg')+') no-repeat center / cover'}}></section>
																			</div>}
																</div>
															</aside>
														</div>
														<div className='wxchat-edit-talk-head'  style={{background:'url('+(item.head || './static/images/me.png')+' ) no-repeat center / cover'}}></div>
														{i===this.props.currentTalkIndex && <img src='./static/images/delete.png' onClick={this.deleteTalk.bind(this,i)} style={{position:'absolute',left:0,bottom:0,width:20,cursor:'pointer'}}/>}
													</li>
										}
										return <li key={i} className={(i===this.props.currentTalkIndex  ? 'active':'')}  onClick={this.modifyCurrentIndex.bind(this,i)}>
											<div className='wxchat-edit-talk-head' style={{background:'url('+(item.head || './static/images/zmiti.jpg')+') no-repeat center / cover'}}></div>
											<div className={'wxchat-edit-talk-content ' + (item.text?'':'wxchat-edit-talk-img')}>
												<aside>{item.name}</aside>
												<aside>
													<div>
															{item.text && item.text}
															{item.img && <img  src={item.img}/>}
															{item.audioSrc && <section className='wxchat-audia'><img src='./static/images/audio-ico.png' /></section>}
															{item.videoSrc && <img  src={'./static/images/video-ico.jpg'}/>}
															{item.linkObj && (item.linkObj.img || item.linkObj.title||item.linkObj.href ||item.linkObj.desc) && <div className='wxchat-linkobj-C'>
																<section>{item.linkObj.title}</section>
																<section>{item.linkObj.desc}</section>
																<section style={{background:'url('+(item.linkObj.img || './static/images/zmiti.jpg')+') no-repeat center / cover'}}></section>
															</div>}

													</div>
												</aside>
											</div>
											{i===this.props.currentTalkIndex && <img src='./static/images/delete.png' onClick={this.deleteTalk.bind(this,i)} style={{position:'absolute',right:0,bottom:0,width:20,cursor:'pointer'}}/>}
										</li>
									})}
								</ul>

								<section className='wxchat-add-talk-btn' onClick={this.addTalk.bind(this)}>
									<img src='./static/images/add-talk.png'/>
								</section>
								</div>
								
							</aside>
							<aside className='wxchat-talk-footer'  style={{background:'url(./static/images/wxtalk.png) no-repeat center / contain'}}></aside>
						</section>
					</div>					
				</aside>
				<aside style={{backgroundColor:'#edf2f5'}}>
					<header className='wxchat-edit-header'>
						<aside>
							<div style={{background:'url(./static/images/eye.png) no-repeat 180px 20px / 5%',paddingLeft:20}} onClick={this.save.bind(this)}>保存并预览</div>
						</aside>
						{/*<aside>
							<div  style={{background:'url(./static/images/publish.png) no-repeat 90px /  8%',paddingLeft:20}}>发布</div>
						</aside>*/}
					</header>
					{ <section className='wxchat-modify-memebers' style={{display:this.state.currentShowArea === 'modifyTitle'?'block':'none'}}>
						<h2>修改h5名称</h2>
						<Input style={{marginTop:18}} onChange={(e)=>{this.props.modifyTitle(e)}} value={this.props.data.title}/>
						<h2>修改群成员头像和昵称</h2>
		 					<WXMemberApp {...this.props}></WXMemberApp>
					</section>}
					{this.state.currentShowArea === 'modifyGroupName' && <section className='wxchat-modify-groupname'>
						<h2>修改内容</h2>
						<Row type='flex' gutter={10} align='middle'>
							<Col><span style={{background:'#fff',padding:'3px 10px',border:'1px solid #ccc'}}>{this.props.data.memberList[0].name}</span>修改群名为</Col>
							<Col><Input style={{width:250}} value={this.props.data.groupName} onChange={e=>{this.props.modifyGroupName(e.target.value)}} /></Col>
						</Row>
						
					</section>}
					{ <section className='wxchat-modify-talk-content' style={{display:this.state.currentShowArea === 'addTalkContent'?'block':'none'}}>
						<h2>选择聊天人员</h2>
						<Row type='flex' gutter={20} align='middle'>
							<Col>
								<div className='wxchat-edit-me'>
									<div style={{background:'url('+(this.props.data.myHeadImg||'./static/images/me.png')+') no-repeat center / cover'}}></div>
									<section>我</section>
									<section className={'wxchat-member-bar'}>
											<aside onClick={this.setTalkIsMe.bind(this)}>设置聊天</aside>
											<aside onClick={this.repalceMyHeadImg.bind(this)}>替换头像</aside>
									</section>
								</div>
							</Col>
							<Col span={8}>
								<Input placeholder='显示我的默认名称' value={this.props.data.username} onChange={this.modifyUserName.bind(this)}/>
							</Col>
							<Col>
								<div style={{width:170,lineHeight:'26px'}}>注：默认头像会在真实环境中替换为读取的微信头像</div>
							</Col>
						</Row>
						<div className='wxchat-edit-line'></div>
						<h3 className='wxchat-edit-count'>
							<img src='./static/images/user.png'/><span>共{this.props.data.memberList.length}人</span>
						</h3>
						<section className='wxchat-edit-scroll' ref='wxchat-edit-scroll'>
							<ul style={{width:this.props.data.memberList.length*62}}>
								{this.props.data.memberList.map((item,i)=>{
									return <li className={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].id === item.id? 'active':''} key={i} onClick={this.setCurrentTalk.bind(this,i)}>
										{i===0 && <img className='wxchat-king' src='./static/images/king.png'/>}
										<div>
											<section  style={{background:'url('+item.head+') no-repeat center center / cover'}}></section>
										</div>
										<div title={item.name} className='wxchat-user-name'>
											<span>{item.name}</span>
										</div>
										{this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].id === item.id && <Checkbox style={{position:'absolute',bottom:0,right:0}} checked={true}></Checkbox>}
									</li>

									})
							}
							</ul>
						</section>
						<h2>输入聊天内容</h2>
						<WXTalkContentApp {...this.props}></WXTalkContentApp>
					</section>}
				</aside>

				 <Modal
			      visible={this.state.visible}
			      title="添加背景音乐"
			      onOk={()=>{this.setState({visible:false})}}
			      onCancel={()=>{this.setState({visible:false})}}
			    >
			      <Input value={this.props.data.bgSound} onChange={this.modifyBgSound.bind(this)} placeholder='http://www.'/>
    			</Modal>	
			</div>
    );
  }

  save(){
  	window.obserable.trigger({
  		type:'save'
  	})
  }

  modifyBgSound(e){
  	window.obserable.trigger({type:'modifyBgSound',data:e.target.value});
  }

  deleteBgSound(){
  	window.obserable.trigger({type:'deleteBgSound'});//删除背景音乐
  	this.setState({
		showBgSoundDetail:false,
		visible:false
	});
  }

  modifyBackground(){
  	window.obserable.trigger({type:'modifyBackground'})
  }

  operatBgSound(){
  	if(this.props.data.bgSound){
  		this.setState({
  			showBgSoundDetail:true,
  			visible:false
  		});
  	}else{
  		this.setState({
  			showBgSoundDetail:false,
  			visible:true
  		});
  		window.obserable.trigger({type:'modifyBgSound'});		
  	}
  }

  operatBackground(){
  	if(this.props.data.background){
  		this.setState({
  			showDetail:true
  		});
  	}else{
  		this.setState({
  			showDetail:false
  		});
  		window.obserable.trigger({type:'modifyBackground'});		
  	}
  }

  deleteBackground(){
  	window.obserable.trigger({type:'deleteBackground'});
  	this.setState({
		showDetail:false
	});
  }

  setCurrentTalk(i){
  	 window.obserable.trigger({
  	 	type:'setCurrentTalk',
  	 	data:i
  	 })
  }

  modifyUserName(e){
  	window.obserable.trigger({
  		type:'modifyUserName',
  		data:e.target.value
  	})
  }

  repalceMyHeadImg(){
  	window.obserable.trigger({
  		type:'repalceMyHeadImg'
  	});
  }

  modifyCurrentIndex(index){
  	window.obserable.trigger({
  		type:'modifyCurrentIndex',
  		data:index
  	})
  	this.setState({currentShowArea:'addTalkContent'},()=>{
  		window.obserable.trigger({
			type:'refreshMemberScroll'
		})
  	});
  }

  setTalkIsMe(){
  	

  	window.obserable.trigger({
  		type:'setTalkIsMe'
  	})
  }

  deleteTalk(i){
  	window.obserable.trigger({
  		type:'deleteTalk',
  		data:i
  	});
  }


  addTalk(){
	this.setState({currentShowArea:'addTalkContent'});
	window.obserable.trigger({
  		type:'addTalk'
  	});
  }

  componentDidMount() {




  	window.obserable.on('refreshMemberScroll',()=>{
		this.scroll = this.scroll || new IScroll(this.refs['wxchat-edit-scroll'],{
	  		scrollX:true,
	  		scrollY:false,
	  		scrollbars:true,//显示滚动条
	        interactiveScrollbars:true,//允许用户拖动滚动条
	        mouseWheel:true
	  	});
  		this.scroll.refresh();
  	})

  	this.talkBodyScroll = new IScroll(this.refs['wxchat-talk-body'],{
        interactiveScrollbars:true,//允许用户拖动滚动条
        mouseWheel:true
  	});

  	
  	var scrollHeight = this.refs['wxchat-talk-body'].offsetHeight;

  	window.obserable.on('refreshTalkBodyScroll',()=>{
  		var top = scrollHeight - this.refs['wxchat-talk-body-scroller'].offsetHeight;
  		top>0 && (top = 0);
  		this.talkBodyScroll.scrollTo(0,top,100);
  		this.talkBodyScroll.refresh();
  	});

   
   
  	
  }

}
