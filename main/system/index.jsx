import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import { message,Select  } from '../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../admin/components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiSystemApp extends Component {
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

			var title = this.props.params.title;
			let props={
				userList:this.state.userList,
				columns:[columns,columns],
				changeAccount:this.changeAccount,
				tags:['账户管理','分配用户'],
				mainHeight:this.state.mainHeight,
				title,
				keyDown:(value)=>{
        clearTimeout(this.keyupTimer);
        this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
        this.keyupTimer = setTimeout(()=>{
          var userlists = this.defautlUserList;
          var condition = 'username';
          this.state.userList  = userlists.filter(user=>{
            switch(this.condition*1){
              case 0://提问内容
                condition = 'username';
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
    selectComponent:<Select placeholder='用户名' onChange={(e)=>{this.condition = e}}  style={{width:120}} size='small' >
                       <Option value="0">用户名</Option>
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
		componentDidMount() {
			
		}
		changeAccount(e){
		// e : 0  1;
	}
}

export default ZmitiValidateUser(ZmitiSystemApp);


/*ReactDOM.render(<ZmitiSystemApp></ZmitiSystemApp>,document.getElementById('fly-main'));*/