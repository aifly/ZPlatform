import React, {
  Component
} from 'react';

import './static/css/userinfo.css';
import ZmitiUserList from '../../components/zmiti-user-list.jsx';

import {
  message,
  Select,Modal,Button,DatePicker,Progress,Slider,InputNumber,Table, Row, Col
} from '../../commoncomponent/common.jsx';
var Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const ButtonGroup = Button.Group;
import ZmitiRoleModal from '../components/roleModal.jsx'

import MainUI from '../components/main.jsx';

import {
  ZmitiValidateUser
} from '../../public/validate-user.jsx';
import $ from 'jquery';
class ZmitiUserinfoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      mainHeight: document.documentElement.clientHeight - 50,
      userList: [{
          "key": "64c319ec-0dfc-0644-4b5f-58e48401031f",
          "isover": 1,
          "username": "wenmingzg",
          "email": "wenmingzg@wenming.cn",
          "mobile": "15810753578",
          "departmentname": "",
          "departmentid": "",
          "departmentfatherid": ""
        },{
          "key": "b44fb05b-ec84-b823-d2d4-58e5f5b47d05",
          "isover": 0,
          "username": "wmw_yangf",
          "email": "yangf@linten.cn",
          "mobile": "13141313322",
          "departmentname": "美编",
          "departmentid": "38b4a40a-e9f4-1c0b-ff38-58e5f505cdac",
          "departmentfatherid": "5eba6734-509a-85aa-a48f-58e484e95471"
        }
      ]


    };
    this.condition = 0;
    this.changeAccount = this.changeAccount.bind(this);
  }
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'xx',
      render:(text,record,e)=><div>{e+1}</div>
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '部门',
      dataIndex: 'departmentname',
      key: 'departmentname',
    }, {
      title: '状态',
      dataIndex: 'isover',
      key: 'isover',
    }];

    
    var title = this.props.params.title || '公司账户管理';
    var uid = this.props.params.id;
    var mainComponent = <div className="zmiti-companyuserinfo-main-ui pad-10" style={{height:this.state.mainHeight}}>
      	<div className="hr5"></div>
      	<Row className='zmiti-companyuserinfo-header'>
			<Col span={8}  className='zmiti-companyuserinfo-header-inner' >公司账户管理</Col>
            <Col span={8} offset={8} className='zmiti-companyuserinfo-button-right textright'><Button onClick={this.goback.bind(this)}>返回</Button></Col>
		</Row>
		<div className="zmiti-companyuserinfo-line"></div>
		<div className="hr20"></div>
      	<Table dataSource={this.state.userList} columns={columns} bordered/>
      </div>;
	return (<MainUI component={mainComponent}></MainUI>);
  }



  //获取用户
  getmangeruserlist(){
  	var s = this;
  	var uid = this.props.params.id;
  	console.log(uid,'uid');
    
    var params = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: this.state.setuserid,
      setcompanyid:uid
    }
    /*$.ajax({
      url:window.baseUrl + 'admin/getmanageruserlist/',
      type:'post',
      data:params,
      success:function(data){
        console.log(data,'getmanageruserlist');
        if (data.getret === 0) {
          s.setState({
            userList: data.userlist
          })
        } else if (data.getret === -3) {
          message.error('您没有访问的权限,请重新登录');
          window.location.href = '/';
        }
      }
    })*/

  }
  //goback
  goback(){
  	window.location='./index.html#/company/'+this.props.params.title;
  }


  componentWillMount() {

    let {
      resizeMainHeight,
      validateUser,
      loginOut,
      getProductList
    } = this.props;

    resizeMainHeight(this);

    validateUser(() => {
      loginOut(undefined, undefined, false);
    }, this);
    this.getProductList = getProductList;

  }



  componentDidMount() {
    window.$ = $;
    
    this.baseUrl = window.baseUrl;
    let {
      validateUser,
      loginOut
    } = this.props;
    var {
      userid,
      getusersigid,
      companyid,
      username,
      isover,
      usertypesign
    } = validateUser(() => {
      loginOut(undefined, undefined, false);
    }, this);
    this.userid = userid;
    this.getusersigid = getusersigid;
    this.companyid = companyid;
    this.isover = isover;
    this.usertypesign = usertypesign;
    this.loginOut = loginOut;
    var params = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setusertypesign: 2
    }


    let s = this;

    this.getProductList({
      s: this,
      fn: (data) => {
        s.setState({
          productList: data.productlist
        });

      }
    });

    window.obserable.off('modifyProductList')
    window.obserable.on('modifyProductList', data => {
      this.setState({
        productList: data
      })
    })
    //获取该企业下所有用户
    this.getmangeruserlist();
  }
  changeAccount(e) {
    // e : 0  1;
  }


}

export default ZmitiValidateUser(ZmitiUserinfoApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/