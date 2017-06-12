import React, { Component } from 'react';

import { message,Row,Col,Input,Button,Popconfirm,Tooltip ,Icon,Modal } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';

import {Link} from 'react-router';

import './static/css/index.css';
import './static/css/list.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';



class ZmitiQAListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight - 50,
			isEntry:0,
			showTitle:false,
			data:{
				title: "",
			      indexBg:"./assets/images/bg.png",
			      theme:"DANGJIAN",
			      duration:360,
				duration:0,
				question:[],
				shareTitle:'',//分享标题
				shareDesc:'',//分享描述
				shareImg:'',//分享图片300.jpg;
				loadingImg: [
					
				]
			}
		}; 
	}

	randomString(len) {
	　　var len = len || 8;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (var i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}
	render() {


		var s = this;
        var data ={
        	
        }

        const userHeadProps = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.data.memberList.push({
                	id:s.randomString(),
                	head:imgData.src,
                	name:''
                });

                s.forceUpdate(()=>{
                	 window.obserable.trigger({
	                	type:'refreshMemberList'
	                })
                });
            }
        };


		var component = <div className='qa-main-ui qa-list-main-ui'>
			{this.state.isEntry === 1 && <section className='qa-list-C'>
							<ul className='qa-list'>
								<li  title='创建作品' onClick={()=>{this.setState({showTitle:true})}}>
									<img src='./static/images/create.png'/>
								</li>
								{this.state.data.question.map((item,i)=>{
									return <li key={i}>
										<section  className='qa-qrcode'><img src={item.qrcodeUrl}/></section>
										<div className='qa-item-shareimg' style={{background:'url('+(item.workico|| './static/images/default-chat.jpg')+') no-repeat center / cover'}}></div>
										<div className='qa-item-name'>{item.worksname}</div>
										<Tooltip  placement="top" title={'当前作品浏览量： '+item.totalview}>
											<div hidden className='qa-item-view'><Link to={'/workqa/'+item.worksid}><Icon type="user" /></Link><Link to={'/statistics/qa/'+item.worksid}><Icon type="dot-chart" /></Link></div>
										</Tooltip>
										
										<div className='qa-item-operator'>
											<div><a href={item.viewpath} target='_blank'>预览</a></div>
											<div><Link to={'/qaedit/'+item.worksid}>编辑</Link></div>
											<Popconfirm placement="top" title={'确定要删除吗？'} onConfirm={this.deleteqa.bind(this,item.worksid,i)}>
												<div>删除</div>
											</Popconfirm>
										</div>
									</li>
								})}
							</ul>


						</section>}
				{this.state.isEntry === 0 && <section className='qa-create-C' style={{height:this.state.mainHeight}}>
				<aside>
					<img  draggable='false' className='qa-iphone' src='./static/images/qa-phone.png'/>
				</aside>
				<aside>
					<div className='qa-text' ref='qa-text'>
						<img ref='qa-text-img'  draggable='false' src='./static/images/poetry-text.png'/>
					</div>
					<div onClick={()=>{this.setState({showTitle:true})}} className='qa-creat-btn' style={{background:'url(./static/images/poetry-btn-bg.png) no-repeat center center / contain'}}>
						创建选题
					</div>
					<div onClick={()=>{this.setState({isEntry:1})}} className='qa-sea-list'>查看历史创建</div>
				</aside>
				
			</section>}

			<Modal title="请输入作品标题" visible={this.state.showTitle }
				  width={400}
				  onCancel={()=>{this.setState({showTitle:false})}}
				  footer={''}
		        >
		         <div className='qa-title-input'>
		         	<Input value={this.state.data.title} onChange={e=>{this.state.data.title = e.target.value;this.forceUpdate()}} type='text' placeholder= '请输入标题'/>
		         	<div className='qa-title-btn'><Button onClick={this.createWork.bind(this)} type='primary' size="large">创建</Button></div>
		         </div>
		        </Modal>
		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}

	createWork(){
		var s = this;
		console.log(this.state.data.title);
		if(this.state.data.title.length <=0){
			message.error('标题不能为空');
			return;
		}
		var type = 0;
		
		switch(s.usertypesign) {
			case window.Role.COMPANYUSER://公司员工
			case window.Role.COMPANYADMINUSER://公司管理员。
				type = 1;//对应的是公司的作品。
				break;
		}
		$.ajax({
			url:window.baseUrl+'/works/create_works/',
			type:'post',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksname:s.state.data.title,
				productid:s.productid,
				worksdesc:'',
				workico:'',
				workstag:'',
				dirname:'qa',
				workstate:0,//作品状态, 0，草稿,1，正常 ,2，已删除
				imgurl:'',
				worktypesign:type,//作品类型0:我的作品;1:公司作品;2,平台作品
				datajson:JSON.stringify(s.state.data)
			},
			success(data){
				message[data.getret === 0?'success':'error'](data.getmsg);
				if(data.getret === 0 ){
					window.location.hash= '/qaedit/'+data.worksid;
				}
				
			}
		})	
	}


	showCreateWorkModal(){

	}

	deleteqa(worksid,i){//删除作品
		var s = this;
		$.ajax({
			url:window.baseUrl+'works/del_works/',
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				worksid:worksid
			},success(data){
				if(data.getret === 0){
					message.success(data.getmsg);
					s.state.data.question.splice(i,1);
					s.forceUpdate();
				}
				else{
					message.error(data.getmsg);
				}
			}
		})
		window.obserable.trigger({
			type:'deleteWork',
			data:{
				worksid,
				index:i
			}
		})
	}

	modifyTitle(e){
		this.state.data.title = e.target.value;
		this.forceUpdate();
	}

	entryEdit (){
		 
		
	}

	uploadHead(){
		var obserable=window.obserable;
		obserable.trigger({
		  type:'showModal',
		  data:{type:0,id:'qa-members-head'}
		});
	}

	modifyUserName(e,i){
		this.state.data.memberList[i].name = e.target.value;
		this.forceUpdate();
	}



	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

		var s = this;

		window.s = this;

		window.globalMenus.map((item,i)=>{
			
			 if(item.linkTo === '/qa/'){
			 	this.productid = item.productid;//获取当前产品的id;
			 }

		});

		$.ajax({
			url:window.baseUrl + 'works/get_worksinfo/',
			data:{
				type:1000,
				userid:s.userid,
				productid:s.productid,
				getusersigid:s.getusersigid
			},
			success(data){
				if(data.getret === 0){
					console.log(data.getworksInfo);
					s.state.data.question = data.getworksInfo;
					s.forceUpdate();
				}
			}
		})
		

	}
 
}

export default ZmitiValidateUser(ZmitiQAListApp);
