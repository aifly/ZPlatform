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
const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
import ZmitiSearchInput from '../components/zmiti-search-input.jsx';
import $ from  'jquery';
export default class ZmitiUserDepartmentApp extends Component {
	constructor(props) {
	  super(props);
		const keys = this.props.keys;
	  this.state = {
	  	  defaultExpandedKeys: keys,
	      defaultSelectedKeys: keys,
	      defaultCheckedKeys: keys,
	      currentDepartment:{
			title:'VI设计部',
			key:'b',
			userList:[
				{
		  			key:1,
		  			username:'邓彬',
		  			email:'1345542525@163.com',
		  			mobile:'13455422525',
		  			department:'麟腾传媒/设计中心/设计部'
		  		}
			]
	      },
	      treeData:[
	      	{
	      		title:'麟腾传媒文化有限公司',
	      		key:'f',
	      		children:[
	      			{
	      				title:'D&S设计中心',
	      				key:'a',
	      				children:[
	      					{
	      						title:'VI设计部',
	      						key:'b',
	      					},
	      					{	
	      						key:'c',
	      						title:'UI设计部'
	      					},
	      					{
	      						key:'d',
	      						title:'编码设计部'
	      					}
	      				]
	      			}
	      		]
	      	}
	      ]

	  };

	  this.changeDepartment = this.changeDepartment.bind(this);
	}

	render() {
		
		 const loop = data => data.map((item) => {
		      if (item.children) {
		        return <TreeNode title={item.title} key={item.key}>{loop(item.children)}</TreeNode>;
		      }
		      return <TreeNode title={item.title} key={item.key}   />;
	    });
   		 const treeNodes = loop(this.state.treeData);
		return (
			<section className='ud-main-ui'>
				<aside className='ud-left-side'>
					<Tabs defaultActiveKey="1">
					    <TabPane tab="组织架构" key="1">
					    	 <Tree className="myCls" showLine onSelect={this.changeDepartment}
					    	    defaultExpandedKeys={this.state.defaultExpandedKeys}
						        defaultSelectedKeys={this.state.defaultSelectedKeys}
						        defaultCheckedKeys={this.state.defaultCheckedKeys}>
						        {treeNodes}
						      </Tree>
					    </TabPane>
					    <TabPane tab="项目群组" key="2">Content of Tab Pane 2</TabPane>
					  </Tabs>
				</aside>
				<aside className='ud-right-side'>
					<div className='ud-main-section'>
						<header>
							<h1>{this.state.treeData[0].title}</h1>
							<div className='ud-operator-bar'><a href='#'>修改名称</a><a href=''>|</a><a href='#'>新建子部门</a><a href=''>|</a><a href='#'>删除</a></div>
							<div>成员:<span>29人</span>,<a href="">禁用9人</a></div>
						</header>
						<section className='ud-operator-btn-group'>
							 <ButtonGroup>
							      <Button className='ant-btn-clicked' type="primary">新增成员</Button>
							      <Button type="primary">设置所在部门</Button>
							      <Button type="primary">添加到项目组</Button>
							      <Button type="primary">禁用</Button>
							      <Button type="primary">启用</Button>
							      <Button type="primary">删除</Button>
							</ButtonGroup>
						</section>
						<section>
							<Table dataSource={this.props.userList} columns={this.props.columns} />
						</section>
						<section className='ud-current-department'>
							<div className="ud-current-header">
								<h2>
									{this.state.currentDepartment.title}
									<div className='ud-operator-bar'><a href="#">修改名称</a><a href="#">|</a><a href="#">新建子部门</a><a href="#">|</a><a href="#">删除</a></div>
								</h2>
								<aside><ZmitiSearchInput></ZmitiSearchInput></aside>
							</div>
							<section className="ud-current-user-section">
								{ this.state.currentDepartment.userList.length <= 0 && 
									<div>
										<p>当前部门下没有成员,您可以</p>
										<ButtonGroup>
											<Button type="primary">新增成员</Button>
											<Button type="primary">批量导入成员</Button>
											<Button type="primary">移入其它部门成员</Button>
										</ButtonGroup>
									</div>
								}
								{
									this.state.currentDepartment.userList.length>0 && 
									<Table dataSource={this.state.currentDepartment.userList} columns={this.props.columns} />
								}
							</section>
						</section>
					</div>
					
				</aside>
			</section>
		);
	}
	componentDidMount() {

		$.ajax({
			url:'http://localhost:90/12306/data.php',
			data:{},
			error(e){
			//	var data = JSON.parse(e.responseText);
				//console.log( e.responseText);
			},
			success(data){
				console.log('--------')
				console.log(JSON.parse(data));
			}
		});
	}
	changeDepartment(e,b){
		this.setState({
		 currentDepartment:{
			title:b.selectedNodes[0].props.title,
			key:'b',
			userList:[
				{
		  			key:1,
		  			username:'邓彬',
		  			email:'1345542525@163.com',
		  			mobile:'13455422525',
		  			department:'麟腾传媒/设计中心/设计部'
		  		}
			]
      },
		})
	}
}

ZmitiUserDepartmentApp.defaultProps = {
	 keys: ['0-0-0', '0-0-1'],
	  userList:[
	  		{
	  			key:1,
	  			username:'邓彬',
	  			email:'1345542525@163.com',
	  			mobile:'13455422525',
	  			department:'麟腾传媒/设计中心/设计部'
	  		}
      ],
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


ReactDOM.render(<ZmitiUserDepartmentApp></ZmitiUserDepartmentApp>,document.getElementById('fly-main'));