import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message } from '../commoncomponent/common.jsx';

import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiQAApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[
				{
					key:1,
					sex:'男',
					content:'房价还会再涨吗？',
					hymn:100,
					createtime:'2017-02-24',
					className:'房价',
					status:'未审核',
					sort:1
				}
			],

		};
	}
	render() {
		const columns = [{
			title: '编号',
			dataIndex: 'key',
			key: 'xx',
		},{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
		}, {
			title: '提问内容',
			dataIndex: 'content',
			key: 'content',
		}, {
			title: '点赞数量',
			dataIndex: 'hymn',
			key: 'hymn',
		}, {
			title: '提问时间',
			dataIndex: 'createtime',
			key: 'createtime',
		}, {
			title: '分类名称',
			dataIndex: 'className',
			key: 'className',
		}, {
			title: '审核状态',
			dataIndex: 'status',
			key: 'status',
		}, {
			title: '排序',
			dataIndex: 'sort',
			key: 'sort',
		}];
		var columns1 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">审核</a>&nbsp;&nbsp;&nbsp;&nbsp;</div> });
		var columns2 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)"> 设置权限</a></div> })
		console.log(this.state.userList)
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			changeAccount:this.changeAccount,
			type:'meeting',
			tags:['未审核','审核通过','审核不通过'],
			mainHeight:this.state.mainHeight
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

}

export default ZmitiValidateUser(ZmitiQAApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/