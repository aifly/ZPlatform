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
class ZmitiSysAuthApp extends Component {

	constructor(args) {
		super(...args);
		this.state = {
			mainHeight: document.documentElement.clientHeight - 50,
			loading: false,
			tip: '数据拉取中...',

			visible: true,

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
			title: '城市',
			dataIndex: 'cityname',
			key: 'cityname',
			width: 150,
		}, {
			title: '负责人',
			dataIndex: 'managername',
			key: 'managername',
			width: 150,
		}, {
			title: '地址',
			dataIndex: 'xbaddress',
			key: 'xbaddress',
		}, {
			title: '操作',
			key: 'action',
			width: 150,
			render: (text, record) => (
				<span>
              <a href='javascript:void(0)'>编辑</a>
              <span className="ant-divider" />
              <Popconfirm placement="top" title={'确定要删除该门店吗？'} onConfirm={this.deleteAddress.bind(this,record.xbid)} okText="确定" cancelText="取消">
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

		var title = this.props.params.title || '权限管理';
		const monthFormat = 'YYYY/MM';
		let props = {
			userList: this.state.userList,
			userid: this.userid,
			changeAccount: this.changeAccount.bind(this),
			type: 'custom-1',
			tags: ['权限管理', '角色管理'],
			mainHeight: this.state.mainHeight,
			title: title,
			selectedIndex: 0,
			rightType: "custom",
			customRightComponent: <div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">权限管理</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary' onClick={this.addRole.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">名称：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="名称" /></Col>
                    </Row>
                    <Table columns={columns} pagination={{pageSize:30}}  dataSource={this.state.dataSource} />
                </div>
                <Modal
		          title="添加权限"
		          width={800}
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		        >
		          <Form>
                      <FormItem
                        {...formItemLayout}
                        label="权限中文名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="权限中文名称" 
                            value={this.state.actionname}
                            onChange={(e)=>{this.state.actionname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="权限英文名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="权限英文名称" 
                            value={this.state.englishname}
                            onChange={(e)=>{this.state.englishname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                    
                   
                      <FormItem
                        {...formItemLayout}
                        label="父级权限"
                        hasFeedback
                      >  
                        <Cascader options={this.state.options}  placeholder="父级权限" />
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="权限url地址"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="权限url地址" 
                            value={this.state.actionurl}
                            onChange={()=>{}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="所属作品/订制"
                        hasFeedback
                      >    
                           <Input placeholder="所属作品/订制" 
                                     value={this.state.worksid}
                                     onChange={(e)=>{this.state.worksid=e.target.value;this.forceUpdate();}}
                                   />   
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="权限编号"
                        hasFeedback
                      >                        
                         <Input placeholder="权限编号" 
                                  value={this.state.actionnumber}
                                  onChange={(e)=>{this.state.actionnumber=e.target.value;this.forceUpdate();}}
                                />   
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="权限等级"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="权限等级" 
                                  value={this.state.urllevel}
                                  onChange={(e)=>{this.state.urllevel=e.target.value;this.forceUpdate();}}
                                />        
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
                        label="是否一级权限"
                        hasFeedback
                      >                        
                          
                          <Switch checkedChildren="开" unCheckedChildren="关" />
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="关键词"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="关键词" 
                                  value={this.state.keyword}
                                  onChange={(e)=>{this.state.keyword=e.target.value;this.forceUpdate();}}
                                />        
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="备注" 
                                  value={this.state.comment}
                                  onChange={(e)=>{this.state.comment=e.target.value;this.forceUpdate();}}
                                />        
                      </FormItem>

                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary">{this.state.xbid?'更新':"添加"}</Button>
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
		this.loadXBList();
	}


	addRole() {

	}



	loadXBList() {
		var s = this;
		$.ajax({
			url: window.baseUrl + 'admin/getuserauthurllist',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				page: 1,
				pagenum: 20
			},
			type: 'post'

		}).done((data) => {
			console.log(data);
			if (data.getret === 0) {

				data.list.forEach((list, i) => {
					list.key = i;
				})
				this.setState({
					dataSource: data.list
				})
			} else {

				message.error('获取店门列表失败')
			}
		});
	}

	changeAccount(i) {
		if (i * 1 === 0) {
			window.location.hash = '/sysauth';
		} else if (i * 1 === 1) {
			window.location.hash = '/sysrole';
		} else if (i * 1 === 2) {
			window.location.hash = 'jinrongxiaobaonotice/';
		} else if (i * 1 === 3) {
			window.location.hash = 'jinrongxiaobaosetup/';
		}
	}



}

export default ZmitiValidateUser(ZmitiSysAuthApp);