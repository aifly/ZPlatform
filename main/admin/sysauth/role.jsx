import React, {
	Component
} from 'react';
import './static/css/index.css';
import ZmitiUserList from '../../components/zmiti-user-list.jsx';
import {
	message,
	Select,
	Row,
	Col,
	Table,
	Popconfirm,
	Form,
	Input,
	Cascader,
	Button,
	Modal,
	Switch


} from '../../commoncomponent/common.jsx';

let Option = Select.Option;
const FormItem = Form.Item;

import {
	Link
} from 'react-router';

import MainUI from '../components/main.jsx';
import {
	ZmitiValidateUser
} from '../../public/validate-user.jsx';
import $ from 'jquery';
class ZmitiSysRoleApp extends Component {

	constructor(args) {
		super(...args);
		this.state = {
			mainHeight: document.documentElement.clientHeight - 50,
			loading: false,
			tip: '数据拉取中...',

			visible: true,

			currentActionId: '',

			pageSize: 10,

			pageNum: 1,

			pageCount: 40,

			authList: [],

			dataSource: [],

		}
		this.currentId = -1;
	}


	render() {
		var s = this;
		let {
			validateUser,
			loginOut,
			resizeMainHeight
		} = this.props;
		var iNow = 0;
		validateUser(() => {
			loginOut();
		}, this);
		resizeMainHeight(this);

		const columns = [{
			title: '角色名称',
			dataIndex: 'rolename',
			key: 'rolename',
			width: 100,
		}, {
			title: '是否系统默认角色',
			dataIndex: 'isdefault',
			key: 'isdefault',
			width: 300,
		}, {
			title: '备注',
			dataIndex: 'comment',
			key: 'comment',
			width: 300,
		}, {
			title: '操作',
			key: 'action',
			width: 150,
			render: (text, record) => (
				<span>
              <a href='javascript:void(0)' onClick={this.editAction.bind(this,record)}>编辑</a>
              <span className="ant-divider" />
              <Popconfirm placement="top" title={'确定要删除该门店吗？'} onConfirm={this.deleteAction.bind(this,record)} okText="确定" cancelText="取消">
                <a href='javascript:void(0)'>删除</a>
              </Popconfirm>
              
            </span>
			),
		}];
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 14
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};

		var children = [];
		this.state.authList.map((item, i) => {
			children.push(<Option key={i} value={item.actionid}>{item.actionname}</Option>)
				//		children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
				//children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
		})
		for (let i = 10; i < 36; i++) {
			//children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}

		var title = this.props.params.title || '角色管理';
		const monthFormat = 'YYYY/MM';
		let props = {
			userList: this.state.userList,
			userid: this.userid,
			changeAccount: this.changeAccount.bind(this),
			type: 'custom-1',
			tags: ['权限管理', title],
			mainHeight: this.state.mainHeight,
			title: title,
			selectedIndex: 1,
			rightType: "custom",
			customRightComponent: <div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
			<Col span={8} className="zmiti-jinrongxb-header-inner">{title}</Col>
                            <Col span={2} offset={14} className='zmiti-jinrongxb-button-right'><Button type='primary' onClick={this.showRoleModal.bind(this,'')}>添加</Button></Col>

                        </Row>                      

                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">名称：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="名称" />
                        	
                        </Col>
                    </Row>
                    <Table columns={columns} 
                    pagination={{
                    	total:this.state.pageCount,
                    	onChange:this.loadAuth.bind(this)
                    }} 
                    dataSource={this.state.dataSource} />
                </div>
                <Modal
		          title="添加角色"
		          width={800}
		          okText={!this.state.currentActionId?'添加':'更新'}
		          visible={this.state.visible}
		          onOk={this.addAction.bind(this)}
		          onCancel={()=>{this.setState({visible:false})}}
		        >
		          <Form>
		          	
                      <FormItem
                        {...formItemLayout}
                        label="角色名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="角色名称" 
                            value={this.state.rolename}
                            onChange={(e)=>{this.state.rolename=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                     
                   
                      <FormItem
                        {...formItemLayout}
                        label="权限"
                        hasFeedback
                      >  
						  <Select
						    mode="multiple"
						    style={{ width: '100%' }}
						    placeholder="Please select"
						    defaultValue={['a10', 'c12']}
						  >
						    {children}
						  </Select>  
                      </FormItem>

                       <FormItem
                        {...formItemLayout}
                        label="排序"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="排序" 
                                  value={this.state.sort}
                                  onChange={(e)=>{this.state.sort=e.target.value;this.forceUpdate();}}
                                />        
                      </FormItem> 
                      <FormItem
                        {...formItemLayout}
                        label="是否系统默认角色"
                        hasFeedback
                      >                        
                          
                          <Switch onChange={()=>{this.setState({isdefault:!this.state.isdefault})}} checkedChildren="是" unCheckedChildren="否" checked={this.state.isdefault} />
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                      >                        
                          <Input type='textarea' placeholder="备注" 
                                  value={this.state.comment}
                                  onChange={(e)=>{this.state.comment=e.target.value;this.forceUpdate();}}
                                />        
                      </FormItem>

                    </Form> 
		        </Modal>
            </div>
		}
		var mainComponent = <div>
            <ZmitiUserList {...props}></ZmitiUserList>
            
        </div>;
		return (
			<MainUI component={mainComponent}></MainUI>
		);
	}
	componentWillMount() {
		let {
			resizeMainHeight,
			popNotice,
			validateUser,
			loginOut,
			validateUserRole,
			isSuperAdmin,
			isNormalAdmin,
			getUserDetail,
			listen,
			send
		} = this.props;
		var {
			userid,
			getusersigid,
			companyid,
			username,
			isover,
			usertypesign
		} = validateUser(() => {
			loginOut('登录失效，请重新登录', window.loginUrl, false);
		}, this);
		this.loginOut = loginOut;
		this.listen = listen;
		this.send = send;
		this.popNotice = popNotice;
		this.isSuperAdmin = isSuperAdmin;
		this.isNormalAdmin = isNormalAdmin;
		this.validateUserRole = validateUserRole;
		this.getUserDetail = getUserDetail;
		this.resizeMainHeight = resizeMainHeight;
	}
	componentDidMount() {
		var s = this;
		this.resizeMainHeight(this);
		this.loadRoleList();
		this.loadAuthList();
	}


	showRoleModal(type = '') {
		this.setState({
			visible: true,
			currentActionId: type,
			actionname: '',
			actionurl: '',

		})

		this.initState();
	}

	initState() {
		this.setState({
			actionname: '',
			actionurl: '',
			actionnumber: '',
			comment: '',
			isparent: false,
			sort: '',
			keyword: '',
			urllevel: '',
			worksid: '',
			englishname: ''
		})
	}

	deleteAction(record) {

		$.ajax({
			type: 'post',
			url: window.baseUrl + 'admin/deluserauthurl',
			data: {
				userid: this.userid,
				getusersigid: this.getusersigid,
				actionid: record.actionid
			}
		}).done(data => {
			if (data.getret === 0) {
				message.success(data.getmsg);

				this.state.dataSource.forEach((item, i) => {
					if (item.actionid === record.actionid) {
						this.state.dataSource.splice(i, 1)
						this.forceUpdate();
					}
				})
			} else {
				console.log(data);
			}
		})
	}

	editAction(record) { //
		this.showRoleModal(record.actionid);
		this.setState(record)

	}

	addAction() {

		var params = {
			userid: this.userid,
			getusersigid: this.getusersigid,
			rolename: this.state.rolename,
			actionids: '',
			sort: this.state.sort,
			isdefault: this.state.isdefault | 0,
			comment: this.state.comment
		}
		if (!this.state.currentActionId) { //新增
			$.ajax({
				type: 'post',
				url: window.baseUrl + 'admin/adduserauthurl/',
				data: params
			}).done((data) => {
				message.info(data.getmsg);
				console.log(data);
				if (data.getret === 0) {
					this.setState({
						//	visible: false,
					})
					this.initState();
					this.loadRoleList();
				}
			})
		} else {
			params.actionid = this.state.currentActionId;
			$.ajax({
				type: 'post',
				url: window.baseUrl + 'admin/edituserauthurl/',
				data: params
			}).done((data) => {
				message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
				if (data.getret === 0) {
					this.setState({
						visible: false
					})
				}
			})
		}
	}


	loadAuth(pageNum) {

		this.setState({
			pageNum
		}, () => {
			this.loadRoleList();
		})
	}


	loadAuthList() {
		var s = this;
		$.ajax({
			url: window.baseUrl + 'admin/getuserauthurllist',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				page: this.state.pageNum,
				pagenum: this.state.pageSize
			},
			type: 'post'

		}).done((data) => {



			if (data.getret === 0) {

				data.list.forEach((list, i) => {
					list.key = i;
				})

				this.setState({
					authList: data.list
				})
			} else {

			}
		});
	}



	loadRoleList() {
		var s = this;
		$.ajax({
			url: window.baseUrl + 'admin/getrolelist',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				page: this.state.pageNum,
				pagenum: this.state.pageSize
			},
			type: 'post'

		}).done((data) => {
			console.log(data);
			if (data.getret === 0) {

				data.list.forEach((list, i) => {
					list.key = i;
				})
				data.list.filter((d, i) => {
					return d.parentactionid === ''
				}).forEach((item, i) => {

					data.list.forEach((d, i) => {
						if (d.parentactionid === item.actionid) {
							d.pareantaction = <div style={{color:"green",fontWeight:'bold'}}>{item.actionname}</div>;
						}
					})
				})
				this.setState({
					dataSource: data.list
				})
			} else {

				//message.error('获取店门列表失败')
			}
		});
	}

	changeAccount(i) {
		if (i * 1 === 0) {
			window.location.hash = '/sysauth/';
		} else if (i * 1 === 1) {
			window.location.hash = '/sysrole/';
		} else if (i * 1 === 2) {
			window.location.hash = 'jinrongxiaobaonotice/';
		} else if (i * 1 === 3) {
			window.location.hash = 'jinrongxiaobaosetup/';
		}
	}



}

export default ZmitiValidateUser(ZmitiSysRoleApp);