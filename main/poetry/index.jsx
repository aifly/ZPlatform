import React, { Component } from 'react';

import { message,Row,Col,Input,Button,Icon } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';



import './static/css/index.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
 

class ZmitiPoetryApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight - 50,
			isBg:true,//是否选中风格，
			isBgSound:false,
			isShare:false,
			isCustom:false,
			customIndex:0,
			currentCustom:{

			},
			themeList:[
				{name:'default',src:'./static/images/poetry-theme1.jpg'},
			],
			audioList:[
				{name:'花火',type:'纯音乐',src:''},
				{name:'花火',type:'纯音乐',src:'1'},
				{name:'花火',type:'纯音乐',src:'2'},
				{name:'花火',type:'纯音乐',src:'3'},
				{name:'花火',type:'纯音乐',src:'4'},
				{name:'花火',type:'纯音乐',src:'5'}
			],
			data:{
				shareTitle:'',//分享标题
				shareDesc:'',//分享描述
				shareImg:'',//分享图片300.jpg;
				background:'',//聊天背景图片
				bgSound:'',//背景音乐
				worksname:'',
				theme:'default',
				type:'',
				viewpath:'',//预览地址
				customList:[{content:'',title:'',id:this.props.randomString()}]
				 
			}
		}; 
	}


	render() {
		var mainStyle = {
			height:this.state.mainHeight
		}

		var s = this;

		const showShareProps  = {
	  		baseUrl: window.baseUrl,
	        getusersigid: s.getusersigid,
	        userid: s.userid,
	        onFinish(imgData){
	        	s.modifyShareInfo('shareImg','',imgData.src);
	        	
	        }
	  	}

		 
       var shareStyle = {cursor:'pointer',position:'relative'};
       if(this.state.data.shareImg){
	  		shareStyle.background = 'url('+this.state.data.shareImg+') no-repeat center / cover'
	  	}
		var component = <div className='poetryedit-main-ui' style={mainStyle}>
			<aside>
				<div className='editpoetry-iphone'>
					<Input type='text' value={this.state.data.worksname} onChange={e=>{this.state.data.worksname = e.target.value;this.forceUpdate()}}/>
					<img  draggable='false'  src='./static/images/poetry-phone.png'/>
					<section className='poetryedit-btn-ground'>
						<div onClick={this.changeMenu.bind(this,'bg')} className='poetryedit-bg-btn' style={{background:'url(./static/images/poetry-bg-btn.png) no-repeat left '+(this.state.isBg ? 'top':'bottom')+''}}>
						
						</div>
						<div onClick={this.changeMenu.bind(this,'bgsound')} className='poetryedit-bgsound-btn' style={{background:'url(./static/images/poetry-bgsound-btn.png) no-repeat left '+(this.state.isBgSound ? 'top':'bottom')+''}}>
							
						</div>
					</section>
				</div>
			</aside>
			<aside>
				{this.state.isBg && <section className='poetryedit-right-C'>
					<header>背景图片设置</header>
					<section className='poetryedit-bg-C'>
						<ul>
							{
								this.state.themeList.map((item,i)=>{
									return <li onClick={()=>{this.state.data.theme = item.name;this.forceUpdate()}} className={this.state.data.theme === item.name?'active':''} key={i}>
										<img src={item.src}/>
									</li>
								})	
							}
						</ul>
					</section>
					<div style={{marginTop:30}} className='poetryedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
				</section>}
				{this.state.isBgSound && <section className='poetryedit-right-C'>
					<header>背景音乐设置</header>
					<section className='poetryedit-bgsound-C'>
						<ul>
							<li>
								<aside>歌名</aside>
								<aside>类型</aside>
								<aside>播放</aside>
								<aside>设为</aside>
							</li>
							{
								this.state.audioList.map((item,i)=>{
									return <li onClick={()=>{this.state.data.bgSound = item.src;this.forceUpdate()}} className={this.state.data.bgSound === item.src?'active':''} key={i}>
										<aside>{item.name}</aside>
										<aside>{item.type}</aside>
										<aside><img src='./static/images/poetry-play-btn.png'/></aside>
										<aside>设为</aside>		
									</li>
								})	
							}
							<li className={this.state.data.bgSound === '-1' ? 'active':''} onClick={()=>{this.state.data.bgSound = '-1';this.forceUpdate()}}>
								<aside></aside>
								<aside>无背景音乐</aside>
								<aside></aside>
							</li>
						</ul>
					</section>
					<div className='poetryedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
				</section>}

				{this.state.isShare && <section className='poetryedit-right-C'>
					<header>分享设置</header>
					<aside>
						<div className='poetry-share-ui'>
							<section>
								<Row type='flex' align='start' gutter={20}>
									<Col span={6}>
										<div style={shareStyle}>
											<img onClick={this.modifyShareImg.bind(this)} style={{opacity:this.state.data.shareImg?0:1}} src='./static/images/add-share.png'/>
											{this.state.data.shareImg && this.state.showShareImgBtn && <div className='poetry-operat-shareimg'>
																					<Button type='primary' icon='reload' onClick={this.replaceShareImg.bind(this)}>替换</Button>
																					<Button type='primary' icon='delete' onClick={this.modifyShareInfo.bind(this,'shareImg','','')}>删除</Button>
																				</div>}
										</div>
									</Col>
									<Col span={18}>
										<Input value={this.state.data.shareTitle} onChange={this.modifyShareInfo.bind(this,'shareTitle')} type='text' placeholder='请输入分享的标题'/>
										<textarea placeholder='请输入分享的描述' value={this.state.data.shareDesc}  onChange={this.modifyShareInfo.bind(this,'shareDesc')}></textarea>
									</Col>
								</Row>				
							</section>
							<section>
								<Row type='flex' align='middle'>
									<Col span={12}>
										<img src={this.state.data.qrcode||'./static/images/qrcode.png'}/>
									</Col>
									<Col span={12}>
										<div>扫二维码分享给好友</div>
									</Col>
								</Row>				
							</section>
							
						</div>	
					</aside>
				</section>}

				{this.state.isCustom && <section className='poetryedit-right-C'>
					<header>我的自定义诗词</header>
					<ul className='poetryedit-custom-list'>
						{this.state.data.customList.map((item,i)=>{
							return <li onClick={this.changeCurrentCustom.bind(this,i)} className={this.state.customIndex === i?'active':''} key={i}>{i+1}<span>x</span></li>
						})}
					</ul>
					<section className='poetryedit-custom-title poetryedit-custom-center'>
						<Input value={this.state.data.customList[this.state.customIndex].title} onChange={e=>{this.state.data.customList[this.state.customIndex].title = e.target.value;this.forceUpdate()}} type='text' placeholder='请输入标题'/>
					</section>
					<section className='poetryedit-custom-center poetryedit-custom-aduio'>
						<img src='./static/images/poetry-add-audio.png'/>
						添加音频组件
					</section>
					<section className='poetryedit-custom-center poetryedit-custom-content'>
						<textarea  value={this.state.data.customList[this.state.customIndex].content} onChange={e=>{this.state.data.customList[this.state.customIndex].content = e.target.value;this.forceUpdate()}} placeholder='请输入内容'></textarea>
					</section>

					<section className='poetryedit-custom-center poetryedit-custom-btn'>
						<Button type='primary' onClick={this.addCustom.bind(this)}>继续</Button>
					</section>
					<div className='poetryedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
				</section>}
				<div title='保存作品' className='poetryedit-save-btn' onClick={this.save.bind(this)}><Icon type="save" />保存</div>
				{this.state.showShareDialog && <ZmitiUploadDialog id={'showShareDialog'} {...showShareProps}></ZmitiUploadDialog>}	
			</aside>
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	changeCurrentCustom(i,e){
		if(e.target.nodeName === "SPAN"){
			if(this.state.data.customList.length<=1){
				message.error('至少要有1条记录');
				return;
			}
			this.state.data.customList.splice(i,1);
			this.state.customIndex = this.state.data.customList.length -1;
		}else{

			this.state.customIndex = i;
			this.state.currentCustom = this.state.data.customList[i];
		}

		this.forceUpdate();	
		
	}

	modifyShareImg(){

		if(!this.state.data.shareImg){
			this.replaceShareImg()
		}
		else{
			this.setState({
				showShareImgBtn:true,
				showShareDialog:false
			});
		}

	}

	addCustom(){
		let {randomString} = this.props;

		if(this.state.data.customList.length>=10){
			message.error('最多添加10条记录');
			return;
		}

		if(this.state.data.customList[this.state.customIndex].content.length<=0){
			message.error('内空不能空为');
			return;
		}
	    
		this.state.data.customList.push ({content:'',title:'',id:randomString()});

		this.state.customIndex = this.state.data.customList.length -1;

		console.log(this.state.data.customList)

		
		this.forceUpdate();
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
	
	modifyShareInfo(name,e,data){

		this.state.data[name] = e.target?e.target.value : data;
		this.forceUpdate();
  }

	entryShare(){
		//进入分享页面
		this.setState({
			isBg:false,
			isBgSound:false,
			isCustom:false,
			isShare:true
		})
	}

	save(){
		var s = this;
		if(this.state.data.customList[this.state.data.customList.length - 1].content.length<=0){
			this.state.data.customList.pop();
		}
		$.ajax({
			url:window.baseUrl+'/works/update_works/',
			type:'post',
			data:{
				worksid:s.state.data.worksid,
				userid:s.userid,
				getusersigid:s.getusersigid,
				datajson:JSON.stringify(s.state.data),
				worksname:s.state.data.worksname,
				dirname:'poetry',
				workstag:'',
				workico:''
			},
			success(data){
				message[data.getret === 0?'success':'error'](data.getmsg);
				if(data.getret === 1300){//用户登录超时
					window.location.href = window.loginUrl;
				}
			}
		})
	}

	changeMenu(type){
		if(type === 'bg'){
			this.setState({
				isBg:true,
				isCustom:false,
				isBgSound:false,
				isShare:false
			});
		}else if(type ==='bgsound'){
			this.setState({
				isBg:false,
				isCustom:false,
				isBgSound:true,
				isShare:false
			});
		}
	}



	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut,randomString} = this.props;

		resizeMainHeight(this);	

		this.randomString = randomString;
		
		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

		var s = this;
		this.worksid = s.props.params.id;

		if(!this.worksid){
			message.error('url 参数不正确');
			return;
		}
		$.ajax({
			url:window.baseUrl + '/works/get_filecontent/',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksid:s.worksid
			},
			success(data){
				if(data.getret === 0){
					console.log(JSON.parse(data.filecontent))
					s.state.data = JSON.parse(data.filecontent);
					!s.state.data.theme && (s.state.data.theme = 'default');
					!s.state.data.bgSound && (s.state.data.bgSound = '');
					if(s.state.data.type === 'CUSTOM'){
						s.state.isBg = s.state.isBgSound = false;
						s.state.isCustom = true;
					}
					s.state.data.customList = s.state.data.customList || [];
					s.state.data.customList  = s.state.data.customList.length<=0 ?  [{title:'',content:'',id:s.randomString() }] :  s.state.data.customList;

					s.forceUpdate()
				}
			}
		})

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

export default ZmitiValidateUser(ZmitiPoetryApp);
