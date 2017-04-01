import React from 'react';
import { Input } from '../../commoncomponent/common.jsx';

import './css/index.css';


import IScroll from 'iscroll';

export default class WXTalkContentApp extends React.Component {

  constructor(props) {
    super(props);
    this.state =　{
    	current:0,
    	
    };

    this.typeList = [
    		{
    			background:'./static/images/text.png',
    			component:<div className='wxchat-talk-text-input-C'>
    				<div className='wxchat-talk-text-input-area'>
    					<textarea value={this.props.data.talk[this.props.currentTalkIndex].text}  onChange={this.modifyCurrentTalk.bind(this)}></textarea>
    					<div className='wxchat-talk-face'><img src='./static/images/face.png'/></div>
    				</div>
    				<Input type='text' placeholder='请输入超链接'/>

    			</div>
    		},
    		{
    			background:'./static/images/image.png',
    			component:<div>图片</div>
    		},
    		{
    			background:'./static/images/text.png',
    			component:<div>链接</div>
    		},{
    			background:'./static/images/image.png',
    			component:<div>链接</div>
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
							<div><img src={item.background} /></div>
						</li>
					})}
				</ul>
				<div className='wxchat-talk-line'></div>
				{this.typeList[this.state.current].component}
			</section>
			
		</div>
    );
  }

  modifyCurrentTalk(e){
  	window.obserable.trigger({
  		type:'modifyCurrentTalk',
  		data:e.target.value
  	});
  }

  changeType(current){
  	this.setState({
  		current
  	})
  }

  


  componentDidMount() {
  	
  }
}

 