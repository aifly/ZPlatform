import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import MainUI from '../admin/components/main.jsx';
export default class ZmitiSystemApp extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	userList:[
	  		{
	  			key:1,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		},{
	  			key:2,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		},{
	  			key:3,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		},{
	  			key:4,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		},{
	  			key:5,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		},{
	  			key:6,
	  			username:'bmyuan',
	  			mobile:'13455422525',
	  			email:'1345542525@163.com',
	  			sigleUserTotalNum:'13|30',
	  			companyUserTotalNum:'13|30'
	  		}
	  	],

	  };
	  this.changeAccount = this.changeAccount.bind(this);
	}
	render() {
		const columns = [{
			  title: '序号',
			  dataIndex: 'key',
			  key: 'xx',
			},{
			  title: '用户名',
			  dataIndex: 'username',
			  key: 'username',
			}, {
			  title: '手机',
			  dataIndex: 'mobile',
			  key: 'mobile',
			}, {
			  title: '邮箱',
			  dataIndex: 'email',
			  key: 'email',
			}, {
			  title: '个人用户数',
			  dataIndex: 'sigleUserTotalNum',
			  key: 'sigleUserTotalNum',
			}, {
			  title: '公司用户数',
			  dataIndex: 'companyUserTotalNum',
			  key: 'companyUserTotalNum',
			}, { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: () => <div><a href="#">转用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">删除</a></div>}];
		let props={
			userList:this.state.userList,
			columns:columns,
			columns1:columns,
			changeAccount:this.changeAccount,
			tags:['账户管理','分配用户']
		}
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
		);
	}
	componentDidMount() {
		
	}
	changeAccount(e){
		// e : 0  1;
	}
}


/*ReactDOM.render(<ZmitiSystemApp></ZmitiSystemApp>,document.getElementById('fly-main'));*/