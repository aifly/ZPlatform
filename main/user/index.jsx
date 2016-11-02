import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
export default class ZmitiUserApp extends Component {
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
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},
	  		{
	  			key:2,
	  			username:'fly',
	  			mobile:'15718879215',
	  			email:'15718879215@163.com',
	  			regDate:'2016-10-01',
	  			surplusDays:23, //剩余天数
	  			userSpace:'41M/100M'
	  		}
	  		,{
	  			key:3,
	  			username:'bmyuan',
	  			mobile:'13455242525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:4,
	  			username:'bmyuan',
	  			mobile:'13455142525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:5,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:11,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:6,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:7,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:8,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:9,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
	  		},{
	  			key:10,
	  			username:'bmyuan',
	  			mobile:'15445542525',
	  			email:'1345542525@163.com',
	  			regDate:'2016-11-01',
	  			surplusDays:13, //剩余天数
	  			userSpace:'40M/100M'
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
			  title: '注册日期',
			  dataIndex: 'regDate',
			  key: 'regDate',
			}, {
			  title: '剩余天数',
			  dataIndex: 'surplusDays',
			  key: 'surplusDays',
			}, {
			  title: '空间使用量',
			  dataIndex: 'userSpace',
			  key: 'userSpace',
			},  { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: () => <div><a href="#">延长试用</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">转为正式用户</a></div> },];
		let props={
			userList:this.state.userList,
			columns:columns,
			changeAccount:this.changeAccount
		}
		return (
			<ZmitiUserList {...props}></ZmitiUserList>
		);
	}
	componentDidMount() {
		
	}
	changeAccount(e){
		// e : 0  1;
	}
}


ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));