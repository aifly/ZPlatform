import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select } from '../commoncomponent/common.jsx';
var Option = Select.Option;

import MainUI from '../admin/components/main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiCompanyApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[
			
			],

		};
		this.condition = 0;
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
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '用户总数',
			dataIndex: 'totalUserNum',
			key: 'totalUserNum',
		}, {
			title: '到期时间',
			dataIndex: 'expirDate',
			key: 'expirDate',
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
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.regular.bind(this)}> 转正</a></div> });
		var columns2 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)"> 设置权限</a></div> })
		var title = this.props.params.title;
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			changeAccount:this.changeAccount,
			tags:['试用公司账户','正式公司账户'],
			mainHeight:this.state.mainHeight,
			title,
			keyDown:(value)=>{
          clearTimeout(this.keyupTimer);
          this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
          this.keyupTimer = setTimeout(()=>{
            var userlists = this.defautlUserList;
            var condition = 'companyName';
            this.state.userList  = userlists.filter(user=>{
              switch(this.condition*1){
                case 0://提问内容
                  condition = 'companyName';
                break;
                case 1://类型
                  condition = 'username'
                break;
              }

             return user[condition].indexOf(value)>-1;
            });

            this.forceUpdate(()=>{
            });
          },350);
      },
      selectComponent:<Select placeholder='公司名称' onChange={(e)=>{this.condition = e}}  style={{width:120}} size='small' >
                         <Option value="0">公司名称</Option>
                         <Option value="1">负责人账号</Option>
                     </Select>
		}
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		validateUser(()=>{loginOut(undefined,undefined,false);},this);
		
	}

  regular(e){//转正
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

           componentDidMount() {


           	this.baseUrl = window.baseUrl;
           	let  {validateUser,loginOut} = this.props;
           	var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
           		loginOut(undefined,undefined,false);
           	},this);
           	this.userid = userid;
           	this.getusersigid = getusersigid;
           	this.companyid = companyid;
           	this.isover = isover;
           	this.usertypesign = usertypesign;
           	this.loginOut = loginOut;
           	var params = {
           		getusersigid: this.getusersigid,
           		userid: this.userid,
           		setusertypesign: 2
           	}


           	let s = this;
           	$.ajax({
           		type: "POST",
           		url: window.baseUrl + "/user/get_userlist/",
           		data: params,
           		success(data){
           			if (data.getret === 0) {
           				s.setState({
           					userList: data.userlist
           				})
           			}
           			else if (data.getret === -3) {
           				message.error('您没有访问的权限,请重新登录');
           				window.location.href = '/';
           			}

           		}

           	})
           }
           changeAccount(e){
		// e : 0  1;
	}
}

export default ZmitiValidateUser(ZmitiCompanyApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/