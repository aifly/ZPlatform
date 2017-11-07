import React, {
	Component
} from 'react';
import './static/css/index.css';
import ZmitiUserList from '../../components/zmiti-user-list.jsx';
import {
	message,
	Select
} from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {
	ZmitiValidateUser
} from '../../public/validate-user.jsx';
import $ from 'jquery';
class ZmitiSystemApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: 0,

			userList: [],

		};
		this.changeAccount = this.changeAccount.bind(this);
	}
	render() {
		const columns = [{
			title: '序号',
			dataIndex: 'key',
			key: 'xx',
		}, {
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '手机',
			dataIndex: 'usermobile',
			key: 'usermobile',
		}, {
			title: '邮箱',
			dataIndex: 'useremail',
			key: 'useremail',
		}, {
			title: '个人用户数',
			dataIndex: '',
			key: 'sigleUserTotalNum',
			render: (record) =>
				<div>
					<a href = 'javascript:void(0)' title='试用用户' > {record.trypersonusernum||0} </a>
					 | <a href='javascript:void(0)' title='正式用户'>{record.formalpersonusernum||0}</a>
				</div>

		}, {
			title: '公司用户数',
			dataIndex: '',
			key: 'companyUserTotalNum',
			render: (record) =>
				<div>
					<a href = 'javascript:void(0)' title='试用用户' > {record.trycompanyusernum||0} </a>
					 | <a href='javascript:void(0)' title='正式用户'>{record.formalcompnayusernum||0}</a>
				</div>
		}, {
			title: '操作',
			dataIndex: '',
			key: 'x',
			render: () => <div>
				<a href="javascript:void(0)">分配用户</a><a href="javascript:void(0)" className='system-operator'>转用户</a><a href="javascript:void(0)">删除</a>
			</div>
		}];

		var title = this.props.params.title;
		let props = {
			userList: this.state.userList,
			columns: [columns, columns],
			changeAccount: this.changeAccount,
			tags: ['账户管理'],
			mainHeight: this.state.mainHeight,
			title,
			type: 'system',
			keyDown: (value) => {
				clearTimeout(this.keyupTimer);
				this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
				this.keyupTimer = setTimeout(() => {
					var userlists = this.defautlUserList;
					var condition = 'username';
					this.state.userList = userlists.filter(user => {
						switch (this.condition * 1) {
							case 0: //提问内容
								condition = 'username';
								break;
							case 1: //类型
								condition = 'username'
								break;
						}

						return user[condition].indexOf(value) > -1;
					});

					this.forceUpdate(() => {});
				}, 350);
			},
			selectComponent: <Select placeholder='用户名' onChange={(e)=>{this.condition = e}}  style={{width:120}} size='small' >
                       <Option value="0">用户名</Option>
                   </Select>
		}
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
		);
	}

	componentWillMount() {

		let {
			resizeMainHeight,
			validateUser,
			loginOut
		} = this.props;
		resizeMainHeight(this);
		let {
			userid,
			getusersigid,
			usertypesign
		} = validateUser(() => {
			loginOut(undefined, undefined, false);
		}, this);
		this.userid = userid;
		this.getusersigid = getusersigid;
	}
	componentDidMount() {

		$.ajax({
			type: 'post',
			url: window.baseUrl + 'admin/getadminuserlist',
			data: {
				userid: this.userid,
				getusersigid: this.getusersigid
			}
		}).done((data) => {

			if (data.getret === 0) {

				data.list.forEach((item, i) => {
					item.key = i + 1;
				});

				console.log(data.list);

				this.setState({
					userList: data.list
				})
			}
		})

	}

	getUserList() {

		var params = {
			getusersigid: this.getusersigid,
			userid: this.userid,
			setusertypesign: 1,
			pagesize: 100
		}
		let s = this;
		$.ajax({
			type: "POST",
			url: window.baseUrl + "/user/get_userlist/",
			data: params,
			success(data) {

				if (data.getret === 0) {

					s.setState({
						userList: data.userlist
					});
				} else if (data.getret === -3) {
					message.error('您没有访问的权限,2秒后跳转到首页');
					setTimeout(() => {
						location.href = '/';
					}, 2000)
				} else {
					loginOut(data.getmsg, window.loginUrl, false);
				}
			}

		})
	}
	changeAccount(e) {
		// e : 0  1;
	}

}

export default ZmitiValidateUser(ZmitiSystemApp);