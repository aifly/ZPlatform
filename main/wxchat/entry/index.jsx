import React from 'react';
import { message,Row,Col,Input,Button } from '../../commoncomponent/common.jsx';
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
		 					<section className='wxchat-members-scroll'>
		 						<ul>
		 							{this.props.data.memberList.map((item,i)=>{
		 								return <li key={i}>
		 									{i===0 && <img title='群主' src='./static/images/king.png' className='wxchat-king'/>}
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
		 					<button className='wxchat-sure-btn' onClick={()=>{this.props.entryEdit()}}>确定</button>
		 				</div>
		 			</section>
			 	</aside>
			 </div>
			 
			</div>
    );
  }
}
