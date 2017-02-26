import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button} from '../commoncomponent/common.jsx';
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
			dataIndex: 'sexname',
			key: 'sexname',
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
			dataIndex: 'statusname',
			key: 'statusname',
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
      						condition = 'classname'
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
				
			},
			success(data){
				
				if(data.getret === 0){
					s.state.userList = data.questionlist;
					s.state.userList.forEach((item,i)=>{
								switch(item.classid){
									case 1:
										item.classname = '房产';
									break;
									case 2:
										item.classname = '就医';
									break;
									case 3:
										item.classname = '养老';
									break;
									case 4:
										item.classname = '钱包';
									break;
									case 5:
										item.classname = '教育';
									break;
									case 6:
										item.classname = '交通';
									break;
									case 7:
										item.classname = '食品';
									break;
									case 8:
										item.classname = '户口本';
									break;
									case 9:
										item.classname = '办事效率';
									break;
									case 10:
										item.classname = '反腐';
									break;
									case 11:
										item.classname = '就业';
									break;
									case 12:
										item.classname = '环保';
									break;
									case 13:
										item.classname = '互联网+';
									break;
									case 14:
										item.classname = '其他';
									break;
								} 
								item.sexname =item.sex ?'女': '男';
								switch(item.status){
									case 0:
									item.statusname = <span style={{color:'red',fontWeight:'bold'}}>未审核</span>;
									break;
									case 1:
									item.statusname = <span style={{color:'green',fontWeight:'bold'}}>审核通过</span>;
									break;
									case 2:
										item.statusname = <span style={{color:'#ccc',fontWeight:'bold'}}>审核不通过</span>;
									break;
								}
					});
					
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