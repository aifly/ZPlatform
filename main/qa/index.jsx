import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select } from '../commoncomponent/common.jsx';
let Option = Select.Option;
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
					content:'医疗还会再涨吗？',
					hymn:100,
					createtime:'2017-02-24',
					className:'教育',
					status:'未审核',
					sort:1
				}
			],

		};

		this.condition = 0; //默认的搜索条件
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
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">审核</a>&nbsp;&nbsp;&nbsp;&nbsp;</div> });
		var columns2 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)">延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)">提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)"> 设置权限</a></div> })
		
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			changeAccount:this.changeAccount,
			type:'meeting',
			tags:['全部','未审核','审核通过','审核不通过'],
			mainHeight:this.state.mainHeight,
			keyDown:(value)=>{
					clearTimeout(this.keyupTimer);
      		this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
      		this.keyupTimer = setTimeout(()=>{
      			var userlists = this.defautlUserList;
      			var condition = 'content';
      			this.state.userList  = userlists.filter(user=>{
      				switch(this.condition*1){
      					case 0://提问内容

      					break;
      					case 1://类型
      						condition = 'className'
      					break;
      				}
      				console.log(condition)
							return user[condition].indexOf(value)>-1;
      			});

      			this.forceUpdate(()=>{
      			});
      		},350);
			},
			selectComponent:<Select placeholder='提问内容' onChange={this.changeCondition.bind(this)}  style={{width:120}} size='small' >
                         <Option value="0">提问内容</Option>
                         <Option value="1">类型</Option>
                     </Select>
		}
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}

	changeCondition(value){
		this.condition = value;
	}

	componentDidMount() {
		for(var i = 0 ; i<100;i++){
			var obj = {
					key:i+2,
					sex:'男',
					content:'房价还会再涨吗？'+(i+1),
					hymn:100,
					createtime:'2017-02-24',
					className:'房价',
					status:'未审核',
					sort:1
				}
			this.state.userList.push(obj);
			this.forceUpdate();
		}
	}

	componentWillMount() {


		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username} = validateUser(()=>{loginOut(undefined,undefined,false);},this);

		var index = -1;
		window.MEETINGUSERLIST.forEach((item,i)=>{
				if(item === username){
						index = i;
				}
		});

		if(index<=-1){
				loginOut('您没有访问的权限',window.mainUrl,true);//不是hash跳转。location.href跳转			
		}

		
	}

}

export default ZmitiValidateUser(ZmitiQAApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/