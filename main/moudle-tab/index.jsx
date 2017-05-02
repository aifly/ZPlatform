import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import { message,Select  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';

 class ZmitiUserApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
      selectedIndex:0,
			userList:[

			],

		};
		this.transFormal = this.transFormal.bind(this);
		this.disableUser = this.disableUser.bind(this);
	}
	render() {

    

		const columns = [{
			title: '序号',
			dataIndex: 'key',
			key: 'xx',
		},{
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '手机',
			dataIndex: 'mobile',
			key: 'mobile',
		}, {
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		}, {
			title: '注册日期',
			dataIndex: 'regDate',
			key: 'regDate',
      sorter: (a, b) => a.key - b.key
		}, {
			title: '剩余天数',
			dataIndex: 'surplusDays',
			key: 'surplusDays',
      sorter: (a, b) => a.surplusDays - b.surplusDays
		}, {
			title: '空间使用量',
			dataIndex: 'userSpace',
			key: 'userSpace',
		}];
		var columns1 = columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
      width:'30%',
			render:  (text, record)  => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0' style={{color:record.isover === 2?'':'red'}} onClick={this.disableUser}>{record.isover === 2?'启用':'禁用'}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>延长试用</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onClick={this.transFormal}>转为正式用户</a></div> });
		var columns2= columns.concat( { 
			title: '操作', 
      width:'30%',
			dataIndex: '', key: 'x',
			render: (text, record) => <div data-userid={record.userid}><a href='javascript:void(0)' data-index='0'  style={{color:record.isover === 2?'':'red'}} onClick={this.disableUser}>{record.isover === 2?'启用':'禁用'}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>删除</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)'>设置权限</a></div> });
		
    var title = this.props.params.title;
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			mainHeight:this.state.mainHeight,
      title,
      changeAccount:this.changeAccount.bind(this), 
      keyDown:(value)=>{
          clearTimeout(this.keyupTimer);
          this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
          this.keyupTimer = setTimeout(()=>{
            var userlists = this.defautlUserList;
            var condition = 'username';
            this.state.userList  = userlists.filter(user=>{
              switch(this.condition*1){
                case 0://提问内容
                  condition = 'username';
                break;
                case 1://类型
                  condition = 'username'
                break;
              }

             return user[condition].indexOf(value)>-1;
            });

            this.forceUpdate(()=>{
            });
          },350);
      },
      selectComponent:<Select placeholder='用户名' onChange={()=>{}}  style={{width:120}} size='small' >
                         <Option value="0">用户名</Option>
                     </Select>
		}

		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
 

       let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
      resizeMainHeight(this,'setAdminHeight');
 
  }
  changeAccount(i){

  }

}
export default ZmitiValidateUser(ZmitiUserApp);


