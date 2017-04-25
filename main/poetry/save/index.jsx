import React from 'react';
import './css/index.css';
import { message,Row,Col,Input,Button } from '../../commoncomponent/common.jsx';
import ZmitiUploadDialog from '../../components/zmiti-upload-dialog.jsx';
export default class WXSaveApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	showShareDialog:false,
    }
  }

  render() {

  	var shareStyle = {cursor:'pointer',position:'relative'};
  	if(this.props.data.shareImg){
  		shareStyle.background = 'url('+this.props.data.shareImg+') no-repeat center / cover'
  	}

  	var s = this;

  	const showShareProps  = {

  		baseUrl: window.baseUrl,
        getusersigid: s.props.getusersigid,
        userid: s.props.userid,
        onFinish(imgData){
            window.obserable.trigger({
		  		type:"modifyShareInfo",
		  		data:{
		  			name:'shareImg',
		  			title:imgData.src
		  		}
		  	});
        }
  	}
    return (
		<div className={'wxchat-save-main-ui '+( this.props.isEntry === 2 ? 'show':'')}>
			<aside>
				<div className='wxchat-phone-container' style={{background:'rgba(255,255,255,.7) url(./static/images/phone-bg.png) no-repeat  center / contain'}}>
					<section className='wxchat-talk-main'>
						<aside className='wxchat-talk-header' style={{background:'url(./static/images/wx-header.png) no-repeat center / contain'}}>
							<div><span>{this.props.data.title}</span><span style={{position:'absolute'}}></span></div>
						</aside>
						<aside className='wxchat-talk-body' ref='wxchat-talk-body'>
							{this.props.viewpath && false && <iframe src={this.props.viewpath} frameBorder={0}></iframe>}
						</aside>
					</section>
				</div>	
			</aside>
			<aside>
				<div className='wxchat-share-ui'>
					<section>
						<Row type='flex' align='start' gutter={20}>
							<Col span={6}>
								<div style={shareStyle}>
									<img onClick={this.modifyShareImg.bind(this)} style={{opacity:this.props.data.shareImg?0:1}} src='./static/images/add-share.png'/>
									{this.props.data.shareImg && this.state.showShareImgBtn && <div className='wxchat-operat-shareimg'>
																			<Button type='primary' icon='reload' onClick={this.replaceShareImg.bind(this)}>替换</Button>
																			<Button type='primary' icon='delete' onClick={this.modifyShareInfo.bind(this,'shareImg','')}>删除</Button>
																		</div>}
								</div>
							</Col>
							<Col span={18}>
								<Input value={this.props.data.shareTitle} onChange={this.modifyShareInfo.bind(this,'shareTitle')} type='text' placeholder='请输入分享的标题'/>
								<textarea placeholder='请输入分享的描述' value={this.props.data.shareDesc}  onChange={this.modifyShareInfo.bind(this,'shareDesc')}></textarea>
							</Col>
						</Row>				
					</section>
					<section>
						<Row type='flex' align='bottom'>
							<Col span={12}>
								<img src={this.props.data.qrcode||'./static/images/qrcode.png'}/>
							</Col>
							<Col span={12}>
								<div>扫二维码</div>
								<div>分享给好友</div>
							</Col>
						</Row>				
					</section>
					<section style={{marginTop:20}}>
						<Row type='flex' gutter={20}>
							<Col span={12}>
								<div className='wxchat-publish-btn'>确定发布</div>
							</Col>
							<Col span={12}>
								<div className='wxchat-back-edit' onClick={this.backToEdit.bind(this)}>返回编辑</div>
							</Col>
						</Row>				
					</section>
				</div>				
			</aside>
		{this.state.showShareDialog && <ZmitiUploadDialog id={'showShareDialog'} {...showShareProps}></ZmitiUploadDialog>}	
		</div>
    );
  }

  modifyShareInfo(name,e){
  	window.obserable.trigger({
  		type:"modifyShareInfo",
  		data:{
  			name,
  			title:e.target?e.target.value : ''
  		}
  	});
  }

  backToEdit(){
  	window.obserable.trigger({
  		type:"backtoedit"
  	})
  }

  replaceShareImg(){

  	this.setState({
  		showShareDialog:true,
  		showShareImgBtn:false
  	},()=>{

  		window.obserable.trigger({
  			type:'showModal',
  			data:{
  				id:'showShareDialog',
  				type:0
  			}
  		})
  	})
  }

  modifyShareImg(){

  	if(!this.props.data.shareImg){
  		this.replaceShareImg()
  	}
  	else{
  		this.setState({
  			showShareImgBtn:true,
  			showShareDialog:false
  		});
  	}
  	
  }

}
