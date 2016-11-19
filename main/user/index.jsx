import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import $ from 'jquery';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
import MainUI from '../admin/components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';

export default class ZmitiUserApp extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	userList:[
	  		
	  	],

	  };
	  this.changeAccount = this.changeAccount.bind(this);
	  this.transFormal = this.transFormal.bind(this);
	  this.disableUser = this.disableUser.bind(this);
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
			}];
		var columns1 = columns.concat( { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render:  (text, record)  => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0' style={{color:record.isover === 2?'':'red'}} onClick={this.disableUser}>{record.isover === 2?'启用':'禁用'}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>延长试用</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onClick={this.transFormal}>转为正式用户</a></div> });
		var columns2= columns.concat( { 
				title: '操作', 
				dataIndex: '', key: 'x',
				render: (text, record) => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0'  style={{color:record.isover === 2?'':'red'}} onClick={this.disableUser}>{record.isover === 2?'启用':'禁用'}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>删除</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>设置权限</a></div> });
		
		let props={
			userList:this.state.userList,
			columns:columns1,
			columns1:columns2,
			changeAccount:this.changeAccount
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
		/*  var {userid,getusersigid} = this.props.params;
		  this.getusersigid = this.getusersigid = getusersigid;
      this.userid =userid;
      this.baseUrl = window.baseUrl;*/
      

      let  {validateUser} = this.props;
      var {userid,getusersigid,companyid}=validateUser();
      this.userid = userid;
      this.getusersigid = getusersigid;
      this.companyid = companyid;
      
		var params = {
			  getusersigid:this.getusersigid,
        userid:this.userid,
       	setusertypesign:1
		}
		let s = this;
		$.ajax({
			type:"POST",
			url:window.baseUrl+"/user/get_userlist/",
			data:params,
			success(data){
				console.log(data);
				if(data.getret === 0){

					s.setState({
						userList:data.userlist
					});
				}
				else if(data.getret === -3){
					message.error('您没有访问的权限,2秒后跳转到首页');
					setTimeout(()=>{
						location.href='/';
					},2000)
				}
			}

		})
	}
	disableUser(e){
		e.preventDefault();
		var userid = e.target.parentNode.getAttribute('data-userid');
		var isover = -1;
		this.state.userList.forEach(user=>{
			if(user.userid === userid){
				isover = user.isover;
			}
		});
		if(isover===-1){
			return;
		}

		var params = {
			 getusersigid:this.getusersigid,
           	 userid:this.userid,
           	 setuserid:userid,
           	 setisover:isover === 2 ? 0 : 2 //0:正式用户，1 试用用户，2禁用用户，3已删除。
		}
		var baseUrl = this.props.baseUrl || 'http://api.zmiti.com/v2';
		let s = this;
		
		$.ajax({
			type:"post",
			url:baseUrl+'user/disable_user/',
			data:params,
			success(data){
				if(data.getret === 0){
					message.success('操作成功');
					s.state.userList.forEach(user=>{
						if(user.userid === userid){
							user.isover = isover === 2 ? 0 : 2;
						}
					});
					s.forceUpdate();
				}else{
					message.error('操作失败');
				}
			}
		})
	}
	transFormal(e){//转成正式用户
		var userid = e.target.parentNode.getAttribute('data-userid');
		var params = {
				 getusersigid:this.getusersigid,
           	 userid:this.userid,
           	 setuserid:userid,
           	 setisover:0 //0:正式用户，1 试用用户，2禁用用户，3已删除。
		}
		var baseUrl = window.baseUrl || 'http://api.zmiti.com/v2';
		let s = this;
		
		$.ajax({
			type:"post",
			url:baseUrl+'user/disable_user/',
			data:params,
			success(data){
				console.log(data);	
				if(data.getret === 0){
					message.success('操作成功');
					s.state.userList.forEach(user=>{
						if(user.userid === userid){
							user.isover = 0;
						}
					});
					s.forceUpdate();
				}else{
					message.error('操作失败');
				}
			}
		})
	}
	changeAccount(e){
		// e : 0  1;
	}
}
export default ZmitiValidateUser(ZmitiUserApp);
ZmitiUserApp.defaultProps = {
     baseUrl : window.parent.baseUrl || 'http://api.zmiti.com/v2/'
}

/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/