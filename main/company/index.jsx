import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import $ from 'jquery';

import MainUI from '../admin/components/main.jsx';
export default class ZmitiCompanyApp extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	userList:[
	  		
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
			}];
		var columns1 = columns.concat( { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: () => <div><a href="#">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"> 转正</a></div> });
		var columns2 = columns.concat( { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: () => <div><a href="#">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"> 设置权限</a></div> })
		let props={
			userList:this.state.userList,
			columns:columns1,
			columns1:columns2,
			changeAccount:this.changeAccount,
			tags:['试用公司账户','正式公司账户']
		}
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
		);
	}

	getQueryString(name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
  }

	componentDidMount() {

		 this.getusersingid = this.getusersigid = this.getQueryString('getusersigid');
      this.userid =this.getQueryString('userId');
      this.baseUrl = 'http://api.zmiti.com/v2/';
      this.companyId = this.getQueryString('companyid');
      
		var params = {
			  getusersigid:this.getusersingid,
       	 userid:this.userid,
       	 setusertypesign:2
		}
		var baseUrl = this.baseUrl || 'http://api.zmiti.com/v2'
		
		let s = this;
		$.ajax({
			type:"POST",
			url:baseUrl+"/user/get_userlist/",
			data:params,
			success(data){
				if(data.getret === 0){
					s.setState({
						userList:data.userlist
					})
				}
				else if(data.getret === -3){
					message.error('您没有访问的权限,请重新登录');
					window.location.href='/';
				}
				
			}

		})
	}
	changeAccount(e){
		// e : 0  1;
	}
}


/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/