import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Tooltip , Row, Col ,Icon } from '../commoncomponent/common.jsx';

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiCustomApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[
				
			],

		};

		this.condition = 0; //默认的搜索条件
		
	}
	render() {

		const columns = [{
			title: '编号',
			dataIndex: 'customid',
			key: 'xx',
			width:'8%'
			
		},{
			title: '作品名称',
			dataIndex: 'customname',
			key: 'customname',
			width:'5%',
		},{
			title: '作品类别',
			dataIndex: 'customtype',
			key: 'customtype',
			width:'5%',
		}];
		var columns1 = columns.concat([]);
		var columns2 = columns.concat( [{ 
					title: '后台地址', 
					width:'13%',
					dataIndex: 'adminurl', key: 'x',
					render: (text, record) => (record.adminurl ?<div><Link to={record.adminurl}>进入</Link></div>:<div><span>暂无</span></div> )
					}]);
		

		 var title = this.props.params.title || '订制作品';
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['共享作品','我的作品'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: this.state.selectedIndex,
			rightType: "custom",
			customRightComponent:<section className='custom-list-C'>
				<ul className='custom-list'>
					
					{this.state.userList.map((item,i)=>{
						return <li key={i}>
							<div className='custom-item-shareimg' style={{background:'url('+(item.thumbnail|| './static/images/default-chat.jpg')+') no-repeat center / cover'}}></div>
							<div className='custom-item-qrcode' style={{background:'url('+item.qrcode+') no-repeat center / cover'}}></div>
							<div className='custom-item-name'>{item.customname}</div>
							{item.adminurl && <div className='custom-item-view'><Link to={item.adminurl}><Icon type="laptop" /></Link></div>}
							<Tooltip placement="top" title={'当前作品浏览量： '+item.totalpv}>
								{!item.adminurl && <div title='点击进入管理后台' className='custom-item-view'><a href={item.viewpath}><img src='./static/images/eye.png'/></a></div>}
							</Tooltip>
						</li>
					})}
				</ul>
			</section>
		}

		const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
         };

  
		var mainComponent = <div className='custom-main-ui'>
			<ZmitiUserList {...props}></ZmitiUserList>
			
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

	changeAccount(i){
		
		this.state.selectedIndex = i*1;
		this.customlist = this.customlist || this.state.userList.concat([]);
		this.state.userList = this.customlist.filter(item=>{
			switch(i){
				case 0:
					return item.isshare !== 0;
				break;
				case 1:
					return this.userid === item.userid;//未审核
				break;
				default:{
					return 1;
				}
			}
		});

		this.forceUpdate();
	}

	componentDidMount() {
		var s=  this;
		$.ajax({
			url:window.baseUrl+'custom/get_custom_list/',
			type:"get",
			data:{
				userid:s.userid,
				getusersigid:s.getusersigid
			},
			success(data){
				
				if(data.getret === 0){
					console.log(data.customlist);
					 data.customlist.map((item,i)=>{
					 	var img = new Image();
					 	img.onerror = ()=>{
					 		item.thumbnail = './static/images/default-chat.jpg';
					 		s.forceUpdate();
					 	};
					 	img.src = item.thumbnail;
					 	if(item.customtype === 1){
					 		item.customtype = 'h5';
					 	}else{
					 		item.customtype = '其它';
					 	}
					 	s.state.userList.push(item);
					 });
					 s.state.userList = s.state.userList.filter((item,i)=>{
					 	return item.isshare !== 0;
					 });
					s.forceUpdate();
				}
			}
		});
	}


	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiCustomApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/