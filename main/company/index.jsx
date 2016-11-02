import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
export default class ZmitiCompanyApp extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	userList:[
	  		{
	  			key:1,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		},
	  		{
	  			key:2,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		}
	  		,{
	  			key:3,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		},{
	  			key:4,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		},{
	  			key:5,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		},{
	  			key:6,
	  		companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
	  		},{
	  			key:7,
	  			companyName:'麟腾传媒文化有限公司',
	  			chargePersonName:'fly',
	  			totalUserNum:"80/100",
	  			expireDate:'2016-11-01',
	  			userSpace:'40M/100M',
	  			serviceName:'刘小庆'
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
			  title: '公司名称',
			  dataIndex: 'companyName',
			  key: 'companyName',
			}, {
			  title: '负责人账号',
			  dataIndex: 'chargePersonName',
			  key: 'chargePersonName',
			}, {
			  title: '用户总数',
			  dataIndex: 'totalUserNum',
			  key: 'totalUserNum',
			}, {
			  title: '到期时间',
			  dataIndex: 'expireDate',
			  key: 'expireDate',
			}, {
			  title: '空间使用量',
			  dataIndex: 'userSpace',
			  key: 'userSpace',
			}, {
			  title: '负责客服',
			  dataIndex: 'serviceName',
			  key: 'serviceName',
			},  { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: () => <div><a href="#">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"> 转正</a></div> }];
		let props={
			userList:this.state.userList,
			columns:columns,
			changeAccount:this.changeAccount,
			tags:['试用公司账户','正式公司账户']
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


ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));