import React from 'react';
import { message,Row,Col,Input,Button } from '../../commoncomponent/common.jsx';
import  WXMemberApp from '../member/index.jsx'
export default class WXEntryApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.isEntry?'hide':''}>
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
		 					<Input onChange={(e)=>{this.props.modifyTitle(e)}} value={this.props.data.title}/>
		 				</div>
		 				<div className='wxchat-members'>
		 					<h2>添加群成员头像和昵称<span>(最多可上传20位成员)</span></h2>
		 					<WXMemberApp {...this.props}></WXMemberApp>
		 					<button className='wxchat-sure-btn' onClick={()=>{this.props.entryEdit()}}>确定</button>
		 				</div>
		 			</section>
			 	</aside>
			 </div>
			 
			</div>
    );
  }
}
