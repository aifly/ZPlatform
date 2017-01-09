import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import { message  } from '../commoncomponent/common.jsx';
import MainUI from '../admin/components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';

 class ZmitiWorkOrderApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[

			],
		};
		
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
			render:  (text, record)  => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0' style={{color:record.isover === 2?'':'red'}} </a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>延长试用</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' >转为正式用户</a></div> });
		var columns2= columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0'  style={{color:record.isover === 2?'':'red'}} </a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>删除</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>设置权限</a></div> });
		
		let props={
			userList:this.state.userList,
			columns:columns1,
			columns1:columns2,
			changeAccount:this.changeAccount,
			mainHeight:this.state.mainHeight

		}

    //console.log(this.state.mainHeight);
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
		/*  var {userid,getusersigid} = this.props.params;
		  this.getusersigid = this.getusersigid = getusersigid;
      this.userid =userid;
      this.baseUrl = window.baseUrl;*/

       let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
      resizeMainHeight(this,'setAdminHeight');

      
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
          else{
              loginOut(data.getmsg,window.loginUrl,false);
          }
      	}

      })
  }


	
}
export default ZmitiValidateUser(ZmitiWorkOrderApp);
ZmitiUserApp.defaultProps = {
	baseUrl : window.baseUrl || 'http://api.zmiti.com/v2/'
}

/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/