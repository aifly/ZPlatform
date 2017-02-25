import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input} from '../commoncomponent/common.jsx';
let FormItem  = Form.Item;
let Option = Select.Option;
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiQAApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,
			questionDetailVisible:false,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[
				{
					key:1,
					sex:'男',
					content:'医疗还会再涨吗？',
					hymn:100,
					createtime:'2017-02-24',
					classname:'教育',
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
			dataIndex: 'qid',
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
			dataIndex: 'classname',
			key: 'classname',
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

		const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
         };

		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
			 <Modal title='修改密码' visible={this.state.questionDetailVisible}
                  onOk={this.modifyUserQuestion.bind(this)}
                  onCancel={()=>{this.setState({questionDetailVisible:false})}}>

                <Form >
                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>原始密码</span>}
                   hasFeedback={true}
                 >
                   <Input type='password' ref='old-pwd' placeholder='原始密码' onChange={()=>{}}/>
                   {this.state.showOldPwdError && <div className='user-error'>原始密码不能为空</div>}
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>新密码</span>}
                   hasFeedback={true}
                 >
                     <Input type='password' ref='new-pwd' placeholder='新密码' onChange={()=>{}}/>
                   {this.state.showNewPwdError && <div className='user-error'>新密码不能为空</div>}
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>确认新密码</span>}
                   hasFeedback={true}
                 >
                     <Input type='password' ref='sure-pwd' onFocus={()=>{this.setState({showSurePwdError:false})}}  defaultValue={this.state.surePwd} placeholder='确认密码' onChange={()=>{}}/>
                   {this.state.showSurePwdError && <div className='user-error'>确认新密码不能为空 </div>}
                 </FormItem>
                
               </Form>    
             </Modal>
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

	modifyUserQuestion(){//确定修改问题

	}

	changeCondition(value){
		this.condition = value;
	}

	componentDidMount() {
		var s=  this;
		$.ajax({
			url:window.baseUrl+'h5/select_question/',
			type:"POST",
			data:{
				classid:1
			},
			success(data){
				console.log(data)
				if(data.getret === 0){
					s.state.userList = data.questionlist;
					s.forceUpdate();
				}
			}
		});
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