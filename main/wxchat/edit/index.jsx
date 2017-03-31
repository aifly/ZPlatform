import React from 'react';
import { message,Row,Col,Input,Button } from '../../commoncomponent/common.jsx';

import './css/index.css';

import  WXMemberApp from '../member/index.jsx'

export default class WXEditApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	currentShowArea:'addTalkContent',
    };
  }

  render() {
    return (
      <div className={'wxchat-main-stage '+(this.props.isEntry?'show':'')} style={{height:this.props.mainHeight}}>
				<aside>
					<div className='wxchat-phone-container' style={{background:'rgba(255,255,255,.7) url(./static/images/phone-bg.png) no-repeat  center / contain'}}>
						<section className='wxchat-talk-main'>
							<aside className='wxchat-talk-header' style={{background:'url(./static/images/wx-header.png) no-repeat center / contain'}}>
								<div onClick={()=>{this.setState({currentShowArea:'modifyTitle'})}}><span>{this.props.data.title}</span><span style={{background:'url(./static/images/wx-header-edit.png) no-repeat left bottom'}}></span></div>
							</aside>
							<aside className='wxchat-talk-body'>
								<section className='wxchat-edit-member-list'>
									<div>
										{this.props.data.memberList[0].name+'邀请你和'+this.props.data.memberList[1].name+' 、'}
										{this.props.data.memberList.filter((item,i)=>{
											return i > 1;
										}).map((item,i)=>{
											return <span key={i}>{i>= this.props.data.memberList.length - 3 ? item.name: item.name+' 、'}</span>
										})}
										<span>等加入群聊</span>
									</div>
								</section>
								{!this.props.data.groupName&&<section onClick={()=>{this.setState({currentShowArea:'modifyGroupName'})}} className='wxchat-group-name'>点击修改群名称</section>}
								{this.props.data.groupName&&<section onClick={()=>{this.setState({currentShowArea:'modifyGroupName'})}} className='wxchat-group-name'>{this.props.data.memberList[0].name}修改群名称为{this.props.data.groupName}</section>}
								
							</aside>
							<aside className='wxchat-talk-footer'  style={{background:'url(./static/images/wxtalk.png) no-repeat center / contain'}}></aside>
						</section>
					</div>					
				</aside>
				<aside style={{backgroundColor:'#edf2f5'}}>
					<header className='wxchat-edit-header'>
						<aside>
							<div style={{background:'url(./static/images/eye.png) no-repeat 60px 20px / 10%',paddingLeft:20}}>保存关预览</div>
						</aside>
						<aside>
							<div  style={{background:'url(./static/images/publish.png) no-repeat 90px /  8%',paddingLeft:20}}>发布</div>
						</aside>
					</header>
					{this.state.currentShowArea === 'modifyTitle' && <section className='wxchat-modify-memebers'>
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
					{this.state.currentShowArea === 'addTalkContent' && <section className='wxchat-modify-talk-content'>
						<h2>选择聊天人员</h2>
						
					</section>}
				</aside>
			</div>
    );
  }
}
