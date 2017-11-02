import React, {
  Component
} from 'react';

import './static/css/index.css';
import ZmitiUserList from '../../components/zmiti-user-list.jsx';

import {
  message,
  Select,Modal,Button,DatePicker,Progress,Slider,InputNumber
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
      userList: [

      ],
      dataList: [{
          "key": "64c319ec-0dfc-0644-4b5f-58e48401031f",
          "isover": 1,
          "username": "wenmingzg",
          "email": "",
          "mobile": "15810753578",
          "departmentname": "",
          "departmentid": "",
          "departmentfatherid": ""
        },{
          "key": "b44fb05b-ec84-b823-d2d4-58e5f5b47d05",
          "isover": 0,
          "username": "wmw_yangf",
          "email": "",
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
    }, {
      title: '用户名',
      dataIndex: 'companyName',
      key: 'companyName'
    }, {
      title: '邮箱',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '手机',
      dataIndex: 'totalUserNum',
      key: 'totalUserNum',
    }, {
      title: '部门',
      dataIndex: 'expirDate',
      key: 'expirDate',
    }, {
      title: '状态',
      dataIndex: 'userSpace',
      key: 'userSpace',
    }];
    var columns1 = columns.concat({
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)" >操作</a></div>
    });
    
    var title = this.props.params.title;
    var uid = this.props.params.id;

    var auothParams = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: this.state.setuserid
    }

    let props = {
      userList: this.state.userList,
      columns: [columns1],
      changeAccount: this.changeAccount,
      tags: ['试用公司账户', '正式公司账户'],
      mainHeight: this.state.mainHeight,
      title
    }
    return (
      <MainUI  component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
    );
  }



  //获取用户
  getmangeruserlist(){
  	var s = this;
  	var uid = this.props.params.id;
  	console.log(uid,'uid');
    
    /*var params = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: this.state.setuserid,
      setcompanyid:uid
    }
    $.ajax({
      url:'http://api.zmiti.com/v2/user/get_departmentlist/',
      type:'post',
      data:params,
      success:function(data){
        console.log(data,'getmanageruserlist');
      }

    })*/
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
    $.ajax({
      type: "POST",
      url: window.baseUrl + "/user/get_userlist/",
      data: params,
      success(data) {
        if (data.getret === 0) {
          s.setState({
            userList: data.userlist
          })
        } else if (data.getret === -3) {
          message.error('您没有访问的权限,请重新登录');
          window.location.href = '/';
        }

      }

    })
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