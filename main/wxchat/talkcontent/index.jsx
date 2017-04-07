import React from 'react';
import { Input,Row,Col,Icon ,message,Button} from '../../commoncomponent/common.jsx';

import './css/index.css';


import IScroll from 'iscroll';

export default class WXTalkContentApp extends React.Component {

  constructor(props) {
    super(props);
    this.state =　{
    	current:0,
    	desc:''
    	
    };

    this.typeList = [
    		{
    			background:'./static/images/text.png',
    			component:<div className='wxchat-talk-text-input-C'>
    				<div className='wxchat-talk-text-input-area'>
    					<textarea value={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].text}  onChange={this.modifyCurrentTalk.bind(this)}></textarea>
    					<div className='wxchat-talk-face'><img src='./static/images/face.png'/></div>
    				</div>
    				<Input type='text' placeholder='请输入超链接'/>

    			</div>
    		},
    		{
    			background:'./static/images/image.png',
    		},
    		{
    			background:'./static/images/audio.png',
    		},{
    			background:'./static/images/video.png',
    			width:52
    		},{
    			background:'./static/images/link.png',
    			width:48
    		}

    	]

  }

  render() {


    return (
		<div className={'wxchat-talk-C '}>
			<section ref='wxchat-talk-type-scroll' className='wxchat-talk-type-scroll'>
				<ul className='wxchat-talk-type-list'>
					{this.typeList.map((item,i)=>{
						return <li className={i === this.state.current ?'active':''} key={i} onClick={this.changeType.bind(this,i)}>
							<div><img  style={{width:item.width || 40}} src={item.background} /></div>
						</li>
					})}
				</ul>
				<div className='wxchat-talk-line'></div>
				{this.state.current === 0 && <div className='wxchat-talk-text-input-C'>
									<Button type='primary' onClick={this.addToMe.bind(this)}>@我</Button>
									<div style={{height:10}}></div>
				    				<div className='wxchat-talk-text-input-area'>
				    					<textarea value={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].text}  onChange={this.modifyCurrentTalk.bind(this)}  onKeyUp={this.modifyCurrentTalk.bind(this)}></textarea>
				    					<div className='wxchat-talk-face'><img src='./static/images/face.png'/></div>
				    				</div>
				    				<Input addonBefore='添加URL' value={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].href} onChange={this.modifyCurrentTalkHref.bind(this)} type='text' placeholder='http://www.'/>
				
				    			</div>}
				{this.state.current === 1 && <div>
					<Row type='flex' gutter={12}>
						<Col  span={8}>
							<img onClick={this.modifyTalkImg.bind(this)} style={{cursor:'pointer'}} src='./static/images/uploadimg.jpg'/>
						</Col>
						<Col span={16}>
							{this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].img && <div className='wxchat-talk-img-C'><img src={this.props.data.talk[this.props.currentTalkIndex].img}/><div className='wxchat-talk-mask'><Icon onClick={this.deleteTalkImg.bind(this)} type='delete'/></div></div>}
						</Col>
					
					</Row>
					<div style={{height:20}}></div>
					<Input addonBefore='添加URL' value={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].href} onChange={this.modifyCurrentTalkHref.bind(this)} type='text' placeholder='http://www.'/>
					<div style={{height:40}}></div>
				</div>}
				{this.state.current === 2 && <div>
					<Input addonBefore='添加音频URL' value={this.props.data.talk[this.props.currentTalkIndex]&& this.props.data.talk[this.props.currentTalkIndex].audioSrc} onChange={this.modifyCurrentTalkAudio.bind(this)} type='text' placeholder='http://www.'/>
				</div>}
				{this.state.current === 3 && <div>
					<Input addonBefore='添加视频URL' value={this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].videoSrc} onChange={this.modifyCurrentTalkVideo.bind(this)} type='text' placeholder='http://www.'/>
				</div>}
				{this.state.current === 4 && <div>
					<Row type='flex' gutter={12}>
						<Col span={8}>
							{this.props.data.talk[this.props.currentTalkIndex] && !this.props.data.talk[this.props.currentTalkIndex].linkObj.img && <img style={{cursor:'pointer'}} src='./static/images/uploadimg.jpg' onClick={this.addLinkImg.bind(this)}/>}
							{this.props.data.talk[this.props.currentTalkIndex] && this.props.data.talk[this.props.currentTalkIndex].linkObj.img && <div className='wxchat-link-img-C' style={{backgroundColor:'#000',background:'url('+this.props.data.talk[this.props.currentTalkIndex].linkObj.img+') no-repeat center center /cover',position:'relative'}}><img style={{cursor:'pointer'}} src='./static/images/uploadimg.jpg' style={{opacity:0}}/><Icon className='wxchat-delete-link-img' type='delete' onClick={this.modifyLink.bind(this,'img')}></Icon></div>}
						</Col>
						<Col span={16} className='wxchat-talk-lik-C'>
							{this.props.data.talk[this.props.currentTalkIndex]  && <Input onChange={this.modifyLink.bind(this,'title')} type='text' placeholder='请输入标题' value={this.props.data.talk[this.props.currentTalkIndex].linkObj.title}/>}
							{this.props.data.talk[this.props.currentTalkIndex] && <textarea defaultValue={this.props.data.talk[this.props.currentTalkIndex].linkObj.desc} placeholder='请输入描述' onChange={this.modifyLink.bind(this,'desc')} onKeyUp={this.modifyLink.bind(this,'desc')} value={this.props.data.talk[this.props.currentTalkIndex].linkObj.desc}></textarea>}
						</Col>
					</Row>
					<div style={{height:10}}></div>
					{this.props.data.talk[this.props.currentTalkIndex]  && <Input addonBefore='添加链接URL' value={this.props.data.talk[this.props.currentTalkIndex].linkObj.href} onChange={this.modifyLink.bind(this,'href')} type='text' placeholder='http://www.'/>}
				</div>}
			</section>
			
		</div>
    );
  }

  modifyLink(name,e){
  	window.obserable.trigger({
  		type:'modifyLink',
  		data:{
  			name,
  			value:e.target.value || ''
  		}
  	})

  	if(name==='desc'){
  		this.setState({
  			desc:e.target.value
  		});
  	}
  }

  addLinkImg(){
  	window.obserable.trigger({
  		type:'modifyLinkImg'
  	})
  }

  addToMe(){
  	if(this.props.data.talk[this.props.currentTalkIndex]){
  		window.obserable.trigger({
	  		type:'modifyCurrentTalk',
	  		data:this.props.data.talk[this.props.currentTalkIndex].text + '@{username}'
	  	});
  	}else{
  		message.error('请选择一条对话');
  	}
	
  }
 
  modifyCurrentTalk(e){
  	window.obserable.trigger({
  		type:'modifyCurrentTalk',
  		data:e.target.value
  	});
  }

  modifyCurrentTalkAudio(e){
  	window.obserable.trigger({
  		type:'modifyCurrentTalkAudio',
  		data:e.target.value
  	})
  }

  modifyCurrentTalkVideo(e){
  	window.obserable.trigger({
  		type:'modifyCurrentTalkVideo',
  		data:e.target.value
  	})
  }

  changeType(current){
  	if(!this.props.data.talk[this.props.currentTalkIndex]){
  		message.warning('请选择一条聊天对话');
  		return;
  	}
  	this.setState({
  		current
  	})
  }


  modifyCurrentTalkHref(e){
  	window.obserable.trigger({
  		type:'modifyCurrentTalkHref',
  		data:e.target.value
  	})
  }


  deleteTalkImg(){
  	window.obserable.trigger({
  		type:'deleteTalkImg'
  	})
  }


  modifyTalkImg(){
  	window.obserable.trigger({
  		type:'modifyTalkImg'
  	})
  }

  


  componentDidMount() {
  	
  	window.obserable.on('changeTalkType',(data)=>{
  		this.setState({
  			current:data
  		})
  	})
  }
}

 