import React, {
	Component
} from 'react';

import './static/css/index.css';
import ZmitiUserList from '../components/zmiti-user-list.jsx';

import {
	message,
	Select,
	Modal,
	Form,
	Input,
	Button,
	Row,
	Col,
	Switch,
	Radio,
	InputNumber,
	Pagination,
	Popconfirm
} from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
let FormItem = Form.Item;
let Option = Select.Option;
import MainUI from '../components/Main.jsx';

import {
	ZmitiValidateUser
} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiBehindChildApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			totalPV: 0,
			checked: false,
			loading: false,
			sex: 1,
			content: '',
			hymn: 0,
			sort: 0,
			classname: '',
			questionDetailVisible: false,
			page: 0,
			pageNum: 20,
			mainHeight: document.documentElement.clientHeight - 50,
			userList: [],

		};

		this.condition = 0; //默认的搜索条件
		this.cate = [{
			classid: 1,
			classname: '住房',
			navImg: 'fc'
		}, {
			classid: 2,
			classname: '就医',
			navImg: 'jiuyi'
		}, {
			classid: 3,
			classname: '养老',
			navImg: 'yl'
		}, {
			classid: 4,
			classname: '钱包',
			navImg: 'qb'
		}, {
			classid: 5,
			classname: '教育',
			navImg: 'jiaoyu'
		}, {
			classid: 6,
			classname: '交通',
			navImg: 'jt'
		}, {
			classid: 7,
			classname: '食品',
			navImg: 'sp'
		}, {
			classid: 8,
			classname: '户口本',
			navImg: 'hkb'
		}, {
			classid: 9,
			classname: '办事效率',
			navImg: 'bsxl'
		}, {
			classid: 10,
			classname: '反腐',
			navImg: 'ff'
		}, {
			classid: 11,
			classname: '就业',
			navImg: 'jy'
		}, {
			classid: 12,
			classname: '环保',
			navImg: 'hb'
		}, {
			classid: 13,
			classname: '互联网+',
			navImg: 'hlw'
		}, {
			classid: 14,
			classname: '其他',
			navImg: 'qt'
		}]
	}
	render() {

		const columns = [{
				title: '编号',
				dataIndex: 'key',
				key: 'key',
				//width: '8%'
			}, {
				title: '姓名',
				dataIndex: 'username',
				key: 'username',
			}, {
				title: '性别',
				dataIndex: 'sexname',
				key: 'sexname',
			}, {
				title: '民族',
				dataIndex: 'nation',
				key: 'nation',
			}, {
				title: '年龄',
				dataIndex: 'userage',
				key: 'userage',

			}, {
				title: '电话',
				dataIndex: 'mobile',
				key: 'mobile',
				//width: '10%',
			}, {
				title: '孩子居住地',
				dataIndex: 'address1',
				key: 'address1',
				//width: '4%',
			}, {
				title: '现父母工作地',
				dataIndex: 'address2',
				key: 'address2',
				//width: '4%',
			}, {
				title: '就读学校',
				dataIndex: 'schoolname',
				key: 'schoolname',
				//width: '10%',
			}, {
				title: '目前监护人',
				dataIndex: 'gname',
				key: 'gname',
				//width: '10%',
			}, {
				title: '创建时间',
				dataIndex: 'createtime',
				key: 'createtime'
			}, {
				title: '审核状态',
				dataIndex: 'statusname',
				key: 'statusname',
				//width: '8%'
			}, {
				title: '备注',
				dataIndex: 'content',
				key: 'content',
				width: '10%'
			}
			/*, {
						title: '排序',
						dataIndex: 'sort',
						key: 'sort',
						//width: '8%',
						sorter: (a, b) => a.sort - b.sort
					}*/
		];
		var columns1 = columns.concat({
			title: '操作',
			//width: '40%',
			dataIndex: '',
			key: 'x',
			render: (text, record) => <div  data-userid={record.qid}><a  href="javascrit:void(0)" onClick={this.editQuestion.bind(this,record.qid)} hidden>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{display:record.status === 0?'block':'none'}} onClick={this.checkQuestion.bind(this,record.qid,1)} href="javascrit:void(0)">审核通过</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{display:record.status === 0?'block':'none'}} onClick={this.checkQuestion.bind(this,record.qid,2)} href="javascrit:void(0)">审核不通过</a>&nbsp;&nbsp;&nbsp;&nbsp; <Popconfirm placement="topLeft" title={'确定要删除么？'} onConfirm={this.deleteQuestion.bind(this,record.qid)} okText="确定" cancelText="取消"><a href='javascrit:void' style={{color:'red'}}>删除</a></Popconfirm></div>
		});
		var columns2 = columns.concat({
			title: '操作',
			//width: '40%',
			dataIndex: '',
			key: 'x1',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)" onClick={this.editQuestion.bind(this,record.qid)} hidden>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.checkQuestion.bind(this,record.qid,1)}>审核通过</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.checkQuestion.bind(this,record.qid,2)}>审核不通过</a>&nbsp;&nbsp;&nbsp;&nbsp; <Popconfirm placement="topLeft" title={'确定要删除么？'} onConfirm={this.deleteQuestion.bind(this,record.qid)} okText="确定" cancelText="取消"><a href='javascrit:void' style={{color:'red'}}>删除</a></Popconfirm></div>
		});
		var columns3 = columns.concat({
			title: '操作',
			//width: '40%',
			dataIndex: '',
			key: 'x2',
			render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)" onClick={this.editQuestion.bind(this,record.qid)} hidden>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<Popconfirm placement="topLeft" title={'确定要删除么？'} onConfirm={this.deleteQuestion.bind(this,record.qid)} okText="确定" cancelText="取消"><a href='javascrit:void' style={{color:'red'}}>删除</a></Popconfirm></div>
		});
		var title = this.props.params.title || '征集留守儿童';
		let props = {
			userList: this.state.userList,
			columns: [columns1, columns2, columns3, columns3],
			changeAccount: this.changeAccount,
			type: 'behindchild',
			tags: ['全部', '未审核', '审核通过', '审核不通过'],
			mainHeight: this.state.mainHeight,
			title: title,
			keyDown: (value) => {
				clearTimeout(this.keyupTimer);
				this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
				this.keyupTimer = setTimeout(() => {
					var userlists = this.defautlUserList;
					var condition = 'username';
					this.state.userList = userlists.filter(user => {
						switch (this.condition * 1) {
							case 0: //提问内容

								break;
							case 1: //备注
								condition = 'content'
								break;
							case 2: //监护人
								condition = 'gname'
								break;
						}
						return user[condition].indexOf(value) > -1;
					});

					this.forceUpdate(() => {});
				}, 350);
			},
			selectComponent: <Select placeholder='姓名' onChange={this.changeCondition.bind(this)}  style={{width:120}} size='small' >
                         <Option value="0">姓名</Option>
                         <Option value="1">备注</Option>
                         <Option value="2">监护人</Option>
                     </Select>,
			customerComponent: <div>
                     			 <Row type="flex" justify="center" align="top">
												      <Col span={4}><Button type='primary' onClick={this.addQuestion.bind(this)}>新增留守儿童</Button></Col>
			<Col span={4}> <Switch checked={this.state.checked} onChange={this.toggleChecked.bind(this)} checkedChildren={'开启审核'} unCheckedChildren={'关闭审核'} /></Col>
												      <Col span={4}><Button type='primary' icon='reload' loading={this.state.loading} onClick={this.refreshData.bind(this)}>刷新</Button></Col>
												    </Row>
								<div style={{marginLeft:20}}>总浏览量：<span style={{fontSize:20,color:'#f00'}}>{this.state.totalPV}</span></div>
                     </div>

		}

		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 14
			},
		};

		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
			 <Modal title='问题详情' visible={this.state.questionDetailVisible}
                  onOk={this.modifyUserQuestion.bind(this)}
                  onCancel={()=>{this.setState({questionDetailVisible:false})}}>
                <Form >
                 <FormItem style={{display:'none'}}
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>性别</span>}
                   hasFeedback={true}
                 >
                   <RadioGroup onChange={(e)=>{this.setState({sex:e.target.value})}} value={this.state.sex}>
							        <Radio value={1}>男</Radio>
							        <Radio value={0}>女</Radio>
							      </RadioGroup>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>问题内容</span>}
                   hasFeedback={true}
                 >
                   <textarea value={this.state.content} type='text' ref='qa-content' className='qa-content' placeholder='评论内容' onChange={(e)=>{this.setState({content:e.target.value})}}></textarea>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>点赞数量</span>}
                   hasFeedback={true}
                 >
                    <InputNumber  value={this.state.hymn} size="large" min={1} max={100000} defaultValue={3} onChange={(e)=>{this.setState({hymn:e})}} />
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>排序</span>}
                   hasFeedback={true}
                 >
                    <InputNumber size="large" value={this.state.sort} min={1} max={100000} onChange={(e)=>{this.setState({sort:e})}} />
                 </FormItem>

                   <FormItem style={{display:'none'}}
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>分类名称</span>}
                   hasFeedback={true}
                 >
                   <RadioGroup onChange={(e)=>{this.setState({classid:e.target.value})}} value={this.state.classid}>
                   		{this.cate.map((item,i)=>{
				return <Radio key={i} value={item.classid}>{item.classname}</Radio>
                   		})}
							      </RadioGroup>
                 </FormItem>

                
               </Form>    
             </Modal>
		</div>;
		/*mainComponent = <div>
			<header></header>
			<div className='zmiti-child-main-ui'>
				{this.state.userList.map((list,i)=>{
					return <div key={i} className='zmiti-child-list'>
								<div className='zmiti-child-label'>
									<div>
										<span>编号</span>
										<span>{list.key}</span>
									</div>

									<Button onClick={this.checkQuestion.bind(this,list.qid,1)} >审核通过</Button>
									<Button onClick={this.checkQuestion.bind(this,list.qid,2)} >审核不通过</Button>
									
									<Popconfirm placement="topLeft" title={'确定要删除么？'} onConfirm={this.deleteQuestion.bind(this,list.qid)} okText="确定" cancelText="取消"><Button icon='delete'>删除</Button></Popconfirm>
									
								</div>
								<table>

									<tr>
										<td>姓名</td>
										<td>{list.username}</td>
										<td>性别</td>
										<td>{list.sexname}</td>
										<td>民族</td>
										<td>{list.nation}</td>
									</tr>
									<tr>
										<td>年龄</td>
										<td>{list.userage}</td>
										<td>电话</td>
										<td>{list.mobile}</td>
										<td>就读学校</td>
										<td>{list.schoolname}</td>
									</tr>
									<tr>
										<td>孩子居住地</td>
										<td  colSpan={5}>{list.address1}</td>
									</tr>
									<tr>
										<td>现父母工作地</td>
										<td  colSpan={5}>{list.address2}</td>
									</tr>
									<tr>
										<td>目前监护人</td>
										<td  colSpan={5}>{list.gname}</td>
									</tr>
									<tr>
										<td>备注</td>
										<td  colSpan={5}>{list.content}</td>
									</tr>
								</table>
					</div>
				})}
			</div>
			<div className='zmiti-child-pagination'><Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange.bind(this)} current={1} total={500} /></div>
		</div>;*/
		return (
			<MainUI component={mainComponent}></MainUI>
		);
	}

	onShowSizeChange() {

	}

	refreshData() {
		this.setState({
			loading: true
		});
		var s = this;
		$.ajax({
			url: window.baseUrl + 'h5/select_question/',
			type: "POST",
			data: {
				worksclassid: 1
			},
			success(data) {

				if (data.getret === 0) {
					s.fill(s, data);
					s.setState({
						loading: false
					})
				}
			}
		});
	}

	deleteQuestion(qid) {
		var s = this;
		$.ajax({
			type: window.ajaxType || 'get',
			url: window.baseUrl + 'h5/del_question',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				qid: qid
			},
			success(data) {
				message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
				s.state.userList.forEach((item, i) => {
					if (item.qid === qid) {
						s.state.userList.splice(i, 1);
						return false;
					}
					return true;
				});
				s.forceUpdate();
			}
		});

	}

	addQuestion() {
		this.qid = -1;
		this.setState({
			sex: -1,
			content: '',
			hymn: 0,
			sort: 0,
			questionDetailVisible: true
		});
	}


	checkQuestion(qid, status) {
		var s = this;
		$.ajax({
			url: window.baseUrl + 'h5/check_question',
			type: window.ajaxType || 'get',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				qid: qid,
				status: status
			},
			success(data) {
				message[data.getret === 0 ? "success" : 'error'](data.getret === 0 ? '审核成功' : '审核失败');
				s.state.userList.forEach((item, i) => {
					if (item.qid === qid) {
						item.status = status;
						return false;
					}
					return true;
				});
				s.forceUpdate();
			}
		})
	}


	editQuestion(qid) {

		this.qid = qid;

		this.state.userList.forEach((item, i) => {
			if (item.qid === qid) {
				this.setState({
					sex: item.sex,
					content: item.content,
					hymn: item.hymn,
					sort: item.sort,
					classid: item.classid,
					questionDetailVisible: true
				})
				return false;
			}
			return true;
		});

	}


	toggleChecked(e) {
		var s = this;
		$.ajax({
			url: window.baseUrl + 'h5/check_switch/',
			type: window.ajaxType || 'get',
			data: {
				productid: '957fdef3-fa98-11e6-beb7-c869cda336f9',
				switch: e | 0,
				userid: s.userid,
				getusersigid: s.getusersigid
			},
			success(data) {
				message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
				s.setState({
					checked: e | 0
				})
			}
		})
	}

	getPV() {
		$.ajax({
			url: window.baseUrl + 'custom/get_customdetial/',
			type: 'post',
			data: {
				customid: 34
			}
		}).done((data) => {
			console.log(data);
			if (data.getret === 0) {
				this.setState({
					totalPV: data.detial.totalpv
				})
			}
		})
	}

	modifyUserQuestion() { //确定修改问题
		var s = this;
		if (this.qid > -1) {
			$.ajax({
				url: window.baseUrl + 'h5/edit_question/',
				type: window.ajaxType || 'get',
				data: {
					userid: s.userid,
					getusersigid: s.getusersigid,
					qid: s.qid,
					sex: s.state.sex,
					content: s.state.content,
					hymn: s.state.hymn,
					classid: s.state.classid,
					sort: s.state.sort
				},
				success(data) {
					message[data.getret === 0 ? 'success' : 'error'](data.getmsg);

					s.state.userList.forEach((item, i) => {
						if (item.qid === s.qid) {

							item.sex = s.state.sex;
							item.content = s.state.content;
							item.hymn = s.state.hymn;
							item.classid = s.state.classid;
							item.sort = s.state.sort;
							s.state.questionDetailVisible = false;
							s.fill(s);

							return false;
						}
						return true;
					});
				}
			})
		} else {
			$.ajax({
				url: window.baseUrl + 'h5/add_question',
				type: window.ajaxType || 'get',
				data: {
					sex: s.state.sex,
					content: s.state.content,
					hymn: s.state.hymn,
					classid: 15,
					sort: s.state.sort,
					contenttype: 1, //评论
					username: '新华社网友',
					headimage: '',
					worksclassid: 1 //十九大

				},
				success(data) {
					message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
					var questionObj = {
						qid: data.qid,
						sex: s.state.sex,
						content: s.state.content,
						hymn: s.state.hymn,
						classid: 15,
						sort: s.state.sort,
						status: s.status
					}
					s.state.userList.push(questionObj);
					s.state.questionDetailVisible = false;
					s.fill(s);
				}
			});
		}
	}

	changeCondition(value) {
		this.condition = value;
	}

	componentDidMount() {

		var s = this;
		$.ajax({
			url: window.baseUrl + '/h5/select_question/',
			type: "POST",
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				worksclassid: 2,
				page: 1,
				pagenum: 20,
				order: 'createtime desc'
			},
			success(data) {
				console.log(data);
				if (data.getret === 0) {
					s.fill(s, data);
				}
			}
		});

		this.getPV();

		//获取是否需要审核
		$.ajax({
			url: window.baseUrl + 'h5/getcheckstatus/',
			type: window.ajaxType || 'get',
			data: {
				userid: s.userid,
				getusersigid: s.getusersigid,
				productid: '957fdef3-fa98-11e6-beb7-c869cda336f9'
			},
			success(data) {
				if (data.getret === 0) {
					s.setState({
						checked: !!data.status
					});
					s.status = data.status;
					s.fill(s);
				}
			}
		})
	}

	fill(s, data) {
		if (data) {

			s.state.userList = data.questionlist || data.list;
		}
		s.state.userList.forEach((item, i) => {
			item.createtime && (item.createtime = item.createtime.substring(0, 10));
			item.key = i + 1;
			item.sexname = !item.sex ? '女' : '男';
			switch (item.status) {
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

	componentWillMount() {

		let {
			resizeMainHeight,
			validateUser,
			loginOut
		} = this.props;

		resizeMainHeight(this);

		let {
			username,
			userid,
			getusersigid
		} = validateUser(() => {
			loginOut(undefined, undefined, false);
		}, this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		var index = -1;
		window.BEHINDCHILDUSERLIST.forEach((item, i) => {
			if (item === username) {
				index = i;
			}
		});
		if (index <= -1) {
			loginOut('您没有访问的权限', window.mainUrl, true); //不是hash跳转。location.href跳转			
		}


	}

}

export default ZmitiValidateUser(ZmitiBehindChildApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/