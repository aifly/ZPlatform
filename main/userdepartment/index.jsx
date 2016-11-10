import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
import Tree from 'antd/lib/tree';
import 'antd/lib/tree/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';
import ZmitiDialog from './static/components/zmiti-dialog.jsx';
const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
import Popconfirm from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style/css';
import ZmitiSearchInput from '../components/zmiti-search-input.jsx';
import $ from  'jquery';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
const FormItem = Form.Item;
const Option = Select.Option;
import MainUI from '../components/Main.jsx';

export default class  ZmitiUserDepartmentApp extends Component {
	constructor(props) {
	  super(props);
		const keys = this.props.keys;
	  this.state = {
	  	  defaultExpandedKeys: keys,
	      defaultSelectedKeys: keys,
	      defaultCheckedKeys: keys,
	      updateCompanyDialogVisible:false,
	      createDepartmentDialogVisible:false,
	      companyId:-1,//公司的Id,最外一层的ID
	      totalUserNum:0,//公司总成员
	      disableUserNum:0,//被禁用的员工
	      currentDepartment:{
					userList:[]
	      },
	      treeData:[
	      	
	      ]

	  };

	  this.changeDepartment = this.changeDepartment.bind(this);
	  this.updateCompanyName = this.updateCompanyName.bind(this);
	  this.createDepartment = this.createDepartment.bind(this);
	  this.deleteDepartment = this.deleteDepartment.bind(this);
	  this.rowClick = this.rowClick.bind(this); //
	}

	render() {

		const text = '确定要删除么?';
 
		 const loop = data => {
		 		if(!data.map){
		 			return null;
		 		}
 				return data.map((item,i) => {
 					
	 		      if (item.children) {
	 		        return <TreeNode title={item.title} key={item.key} >{loop(item.children)}</TreeNode>;
	 		      }
	 		      return <TreeNode title={item.title} key={item.key} userList={item.userList}  />;
	 	    })};
   		 const treeNodes = loop(this.state.treeData);


		const companyUserRowSelection = {
		  onChange(selectedRowKeys, selectedRows) {
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  },
		  onSelect(record, selected, selectedRows) {
		    console.log(record, selected, selectedRows);
		  },
		  onSelectAll(selected, selectedRows, changeRows) {
		    console.log(selected, selectedRows, changeRows);
		  },
		};

		const departmentUserRowSelection ={
			  onChange(selectedRowKeys, selectedRows) {
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  },
		  onSelect(record, selected, selectedRows) {
		    console.log(record, selected, selectedRows);
		  },
		  onSelectAll(selected, selectedRows, changeRows) {
		    console.log(selected, selectedRows, changeRows);
		  }
		}


    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

     var params = JSON.parse(document.cookie);
     var companyId = params.companyid;

    let component = 	<section className='ud-main-ui'>
				<aside className='ud-left-side'>
					<Tabs defaultActiveKey="1">
					    <TabPane tab="组织架构" key="1">
					    	 <Tree title='' className="myCls" showLine onSelect={this.changeDepartment}
						        defaultExpandAll = {true}
						        defaultExpandedKeys={[companyId]}
						        defaultSelectedKeys={[companyId]}
						        >
						        {treeNodes}
						      </Tree>
					    </TabPane>
					    <TabPane tab="项目群组" key="2">Content of Tab Pane 2</TabPane>
					  </Tabs>
				</aside>
				<aside className='ud-right-side'>
					<div className='ud-main-section'>
						<section className='ud-current-department'>
								<div className="ud-current-header">
									<h2>
										{this.state.currentDepartment.title || '文明网'}
										<div><span>成员:</span><span>{this.state.totalUserNum}人,</span><a href="javascript:void(0)">禁用{this.state.disableUserNum}人</a></div>
										<div className='ud-operator-bar'><a href="javascript:void(0)" onClick={()=>{this.setState({updateCompanyDialogVisible:true})}}><Icon type="edit" />修改名称</a><a href="javascript:void(0)">|</a><a href="javascript:void(0)" onClick={()=>{this.setState({createDepartmentDialogVisible:true})}}><Icon type="plus-circle-o" />新建子部门</a><a href="javascript:void(0)">|</a>
												<Popconfirm placement="top" title={text} onConfirm={this.deleteSubDepartment} okText="Yes" cancelText="No">
				      						<a href='javascript:void(0)'><Icon type='delete'/>删除</a>
				    						</Popconfirm>
		    						</div>
									</h2>
									<aside><ZmitiSearchInput></ZmitiSearchInput></aside>
								</div>
									<section className='ud-operator-btn-group'>
							 <ButtonGroup>
							      <Button className='ant-btn-clicked' type="primary" icon='plus-circle-o'>新增成员</Button>
							      <Button type="primary" icon='setting'>设置所在部门</Button>
							      <Button type="primary" icon='info-circle'>添加到项目组</Button>
							      <Button type="primary" icon='minus-circle'>禁用</Button>
							      <Button type="primary" icon='check-circle'>启用</Button>
							      <Button type="primary" icon='delete'>删除</Button>
							</ButtonGroup>
						</section>
								<section className="ud-current-user-section">
									{this.state.currentDepartment.userList && this.state.currentDepartment.userList.length <= 0 && 
										<div>
											<p>当前部门下没有成员,您可以</p>
											<ButtonGroup>
												<Button type="primary"  icon='plus-circle-o'>新增成员</Button>
												<Button type="primary"  icon='export'>批量导入成员</Button>
												<Button type="primary">移入其它部门成员</Button>
											</ButtonGroup>
										</div>
									}
									{
										this.state.currentDepartment.userList && this.state.currentDepartment.userList.length>0 && 
										<Table  onRowClick={this.rowClick}  rowSelection={departmentUserRowSelection} dataSource={this.state.currentDepartment.userList} columns={this.props.columns} />
									}
								</section>
							</section>
					</div>

					<Modal title='修改名称' visible={this.state.updateCompanyDialogVisible} onOk={this.updateCompanyName} onCancel={()=>{this.setState({updateCompanyDialogVisible:false})}}>
		         <Input value={this.state.treeData[0] && this.state.treeData[0].title } onChange={()=>{}}/>
        	</Modal>

        	<Modal title='新建子部门' visible={this.state.createDepartmentDialogVisible} onOk={this.createDepartment} onCancel={()=>{this.setState({createDepartmentDialogVisible:false})}}>
		         <Input ref='newDepartment' placeholder='请输入部门名称' onChange={()=>{}}/>
        	</Modal>

        	<Modal title='新增成员' visible={false} >
        		<Form horizontal >
        				 <FormItem
					          {...formItemLayout}
					          label={<span><span style={{color:'red',marginRight:4,}}>*</span>账号</span>}
					          hasFeedback={true}
					        >
					        	<Input ref='username' onFocus={()=>{}} placeholder='请输入账号' onChange={()=>{}}/>
					        	<div className='user-error'>账号不合法(6位以上的数字字母)</div>
					        </FormItem>
					         <FormItem
					          {...formItemLayout}
					          label={<span><span style={{color:'red',marginRight:4,}}>*</span>所属部门</span>}
					        >
					        	 <Select placeholder="Please select a department">
					              <Option value="china">China</Option>
					              <Option value="use">U.S.A</Option>
					            </Select>
					        </FormItem>
					         <FormItem
					          {...formItemLayout}
					          label="密码"
					        >
					        	<Input ref='username' placeholder='' value='(密码默认为111111),此处不用填写' disabled={true} onChange={()=>{}}/>
					        </FormItem>

					         <FormItem
					          {...formItemLayout}
					          label={<span><span style={{color:'red',marginRight:4,}}>*</span>手机号/邮箱</span>}
					        >
					        	<Input ref='username' placeholder='请输入成员的手机号或者邮箱'  onChange={()=>{}}/>
					        </FormItem>

        		</Form>
        	</Modal>
					
				</aside>
			</section>;


		return (
			<MainUI component={component}></MainUI>
		);
	}
	rowClick(e){
			console.log(e)
			//location.hash= '/personalAcc?userId='+ e.key;
	}
	componentDidMount() {
		try{
        var params = JSON.parse(document.cookie);
        var companyId = params.companyid;

        this.userid = params.userid;
        this.getusersigid = params.getusersigid;
        this.companyid = companyId;
        	
      	let s = this;
				$.ajax({
					url:window.baseUrl+'/user/get_departmentlist/',//window.baseUrl+'/user/get_departmentlist/',//'http://localhost:90/12306/data.php',
					type:"POST",
					data:{
							userid:params.userid,
							getusersigid:params.getusersigid,
							setcompanyid:companyId
					},
					error(e){
					//	var data = JSON.parse(e.responseText);
						//console.log( e.responseText);
					},
					success(data){
						///data = JSON.parse(data);
						var data = data.getdata;
						
						s.parentId =data.treeData[0].key;
						s.defaultUserList = data.treeData[0];
						s.setState({
							treeData:data.treeData,
							totalUserNum:data.totalUserNum,
							disableUserNum:data.disableUserNum,
							
							currentDepartment:{
								title:data.treeData[0].title,
								key:data.treeData[0],
								userList:s.defaultUserList.userList
							},
							
						});
					}
				});
    }catch(e){
        message.error('登录超时');
        setTimeout(()=>{
            window.location.href= window.loginUrl;    
        },1000)
    }
		
	}

	deleteDepartment(){//删除部门
		console.log('delete department')
	}

	deleteSubDepartment(){//删除子部门

	}
	createDepartment(){//新建子部门
		var departmentName = this.refs['newDepartment'].refs['input'].value;
		if(!departmentName){
			message.error('部门名称不能为空');
			return;
		}
		let s = this;
		console.log({
				getusersigid:s.props.getusersingid,
				userid :s.props.userid,
				departmenname:departmentName,
				fatherid:s.parentId
			})
		$.ajax({
			type:"post",
			url:s.props.baseUrl + '/user/create_department/',
			data:{
				getusersigid:s.props.getusersingid,
				userid :s.props.userid,
				departmenname:departmentName,
				fatherid:s.parentId
			},
			success(data){
					console.log(data);
					if(data.getret === 0){
						message.success(data.getmsg);
						s.setState({
							createDepartmentDialogVisible:false
						})
					}else{
						message.error('创建部门失败');
					}
			}
		});
	}

	updateCompanyName(){
		this.setState({
			updateCompanyDialogVisible:false
		})
	}

	getDepartmentNameById(id){
		var name = '';
		var key = '';
		var loop = (obj)=>{
				if(!obj || !obj instanceof Array){return};

				obj.forEach((item,i)=>{
				if(item.key === id){
						name = item.title;
						key = item.key;
				}else{
					loop(item.children);
				}
		});			
		}
		loop(this.state.treeData);
		
		return {name:name,key:key};
	}
	changeDepartment(e,b,c){//切换部门，显示当前部门下的所有员工
		

		if(!b.selected){
			return;
		}

		this.parentId = e[0];
		var s = this;
		if(this.parentId === this.companyid){

			 this.setState({
				 	currentDepartment:{
						title:s.defaultUserList.title,
						key:s.defaultUserList.key,
						userList:s.defaultUserList.userList
					},
			 });
			 return;
		}
		var departObj = s.getDepartmentNameById(s.parentId);
			s.setState({
				 currentDepartment:{
						title:departObj.name,
						key:departObj.key
		     },
			})	
		/*	$.ajax({
				type:"POST",
				url:window.baseUrl+'/user/get_departmentuserlist',
				data:{
					userid:s.userid,
					getusersigid:s.getusersigid,
					setdepartmentid:s.parentId
				},
				success(data){
					//data = JSON.parse(data);
					//console.log(data);
					s.setState({
						 currentDepartment:{
								title:s.getDepartmentNameById(s.parentId),
								key:data.key,
								userList:data.userList
				     },
					})
				}
		})*/
	}
}

ZmitiUserDepartmentApp.defaultProps = {
	keys: ['123', '0-0-1'],
  columns:[{
		 	title:"用户名",
		 	dataIndex: 'username',
		 	key:'1'
		 },{
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		  },{
			title: '手机',
			dataIndex: 'mobile',
			key: 'mobile',
   		}, {
			  title: '部门',
			  dataIndex: 'department',
			  key: 'department',
			}
  ]
  
}


/*ReactDOM.render(<ZmitiUserDepartmentApp></ZmitiUserDepartmentApp>,document.getElementById('fly-main'));*/