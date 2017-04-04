import React, { Component } from 'react';
import { message,Row,Col,Input,Button } from '../../commoncomponent/common.jsx';
import IScroll from 'iscroll';
export default class WXMemberApp extends Component {
	render() {

		 
		return (
			<section className='wxchat-members-scroll' ref='wxchat-members-scroll'>
				<ul>
					{this.props.data.memberList.map((item,i)=>{
						return <li key={i}>
							{i===0 && <img title='群主' src='./static/images/king.png' className='wxchat-king'/>}
							{this.props.data.memberList.length>=2 && <section className={'wxchat-member-bar ' +(i%4===0?'active':'')}>
									<aside onClick={this.setMainMember.bind(this,i)}>设为群主</aside>
									<aside onClick={this.replaceHead.bind(this,i)}>替换</aside>
									<aside onClick={this.deleteMember.bind(this,i)}>删除</aside>
							</section>}
							<div>
								<section  style={{background:'url('+item.head+') no-repeat center center / cover'}}></section>
							</div>
							<div>
								<Input placeholder='请输入名称' type='text' onChange={(e)=>{this.props.modifyUserName(e,i)}} value={item.name}/>
							</div>
						</li>
					})}
					<li onClick={()=>{this.props.uploadHead()}}>
						<div  style={{background:'url(./static/images/upload.jpg) no-repeat center center / cover',cursor:'pointer'}}>
						</div>
						<div>
						</div>
					</li>
				</ul>
			</section>
		);
	}

	setMainMember(i){//设置群主
		window.obserable.trigger({
			type:'setMainMember',
			data:i
		});
	}

	replaceHead(i){//替换头像i
		window.obserable.trigger({
			type:'replaceHead',
			data:i
		});
	}

	deleteMember(i){//删除成员 
		window.obserable.trigger({
			type:'deleteMember',
			data:i
		});
	}


	

	componentDidMount() {
		this.scroll = new IScroll(this.refs['wxchat-members-scroll'],{
	        scrollbars:true,//显示滚动条
	        interactiveScrollbars:true,//允许用户拖动滚动条
	        mouseWheel:true
	     });

    	window.obserable.on('refreshMemberList',()=>{
    		this.scroll.refresh();
    	})
	}
}
