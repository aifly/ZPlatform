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
			title:"工单号",
			dataIndex:'workorderid',
			key:'workorderid'
		}
		,{
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '工单标题',
			dataIndex: 'title',
			key: 'title',
		}, {
			title: '工单内容',
			dataIndex: 'content',
			key: 'content',
		}, {
			title: '处理人',
			dataIndex: 'adminname',
			key: 'adminname',
		}, {
			title: '工单类型',
			dataIndex: 'workordertype',
			key: 'workordertype',
		}, {
			title: '工单状态',
			dataIndex: 'status',
			key: 'status',
		}, {
			title: '创建时间',
			dataIndex: 'createtime',
			key: 'createtime',
		}, {
			title: '修改时间',
			dataIndex: 'operatime',
			key: 'operatime',
		}];
		var columns1 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render:  (text, record)  => <div data-userid={record.userid}><a href='javascript:void(0)'>审核通过</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>审核不通过</a></div> });
		var columns2= columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div data-userid={record.userid}><a href='javascript:void(0)'>审核通过</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>审核不通过</a></div> });
		
		let props={
			userList:this.state.userList,
			columns:columns1,
			columns1:columns2,
			changeAccount:this.changeAccount,
			mainHeight:this.state.mainHeight,
			tags:['已审核的工单','未审核的工单'],
			type:'workorder'

		}

		console.log(props.userList)

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
      	userid:this.userid
      }
      let s = this;

      $.ajax({
      	type:"POST",
      	url:window.baseUrl+"/user/get_workorder/",
      	data:params,
      	success(data){
      		console.log(data);
      		
      		if(data.getret === 0){

      			s.setState({
      				userList:data.workorderinfo
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
/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/