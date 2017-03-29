import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm   } from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiCustomApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
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
			changeAccount:this.changeAccount,
			type:'custom',
			tags:['共享作品','我的作品'],
			mainHeight:this.state.mainHeight,
			title:title,
		}

		const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
         };

  
		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
			
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

	changeAccount(i){


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
					 	if(item.customtype === 1){
					 		item.customtype = 'h5';
					 	}else{
					 		item.customtype = '其它';
					 	}
					 	s.state.userList.push(item);
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