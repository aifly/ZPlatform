import './static/css/index.css';
import React from 'react';
import {
  message,
  Select,
  Modal,
  Form,
  Icon,
  Tag,
  Tooltip,
  Input,
  Button,
  Row,
  Col,
  Switch,
  Radio,
  InputNumber,
  DatePicker,
  Table,
  moment,
  Spin,
  Popconfirm
} from '../commoncomponent/common.jsx';
let Search = Input.Search;
const FormItem = Form.Item;
let Option = Select.Option;
import $ from 'jquery';


import {
  Link
} from 'react-router';

import {
  ZmitiValidateUser
} from '../public/validate-user.jsx';
import ZmitiUserList from '../components/zmiti-user-list.jsx';
import MainUI from '../components/Main.jsx';

class ZmitiJinrongxbApp extends React.Component {
  constructor(args) {
    super(...args);
    this.state = {
      mainHeight: document.documentElement.clientHeight - 50,
      loading: false,
      tip: '数据拉取中...',
      keyword: '',
      visible: false,
      name: '', //名称            
      city: '', //城市
      positionbd: '', //百度地图坐标
      positiongd: '', //高德地图坐标
      address: '', //地址
      decoration: '', //简介
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
      title: '名称',
      dataIndex: 'xbname',
      key: 'xbname',
      render: text => <a href="javascript:void(0)">{text}</a>,
    }, {
      title: '城市',
      dataIndex: 'cityname',
      key: 'cityname',
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
              <Link to={'jinrongxiaobaoaddress/'+record.xbid}>编辑</Link>
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
    var title = this.props.params.title || '金融消保';
    const monthFormat = 'YYYY/MM';
    let props = {
      userList: this.state.userList,
      userid: this.userid,
      changeAccount: this.changeAccount.bind(this),
      type: 'custom-1',
      tags: ['消保地址', '政策管理', '公告管理', '设置'],
      mainHeight: this.state.mainHeight,
      title: title,
      selectedIndex: 0,
      rightType: "custom",
      customRightComponent: <div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">消保地址</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary' onClick={this.address.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">名称：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="名称" /></Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.dataSource} />
                </div>

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


  deleteAddress(id) { //
    $.ajax({
      url: window.baseUrl + 'xbadmin/delxbstore/',
      type: 'post',
      data: {
        xbid: id,
        userid: this.userid,
        getusersigid: this.getusersigid
      }
    }).done((data) => {
      if (data.getret === 0) {
        this.state.dataSource.forEach((item, i) => {
          if (item.xbid === id) {
            console.log(this.state.dataSource)
            this.state.dataSource.split(i, 1);
            this.forceUpdate();

          }
        });
      }
      message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
    })
  }


  loadXBList() {
    var s = this;
    $.ajax({
      url: window.baseUrl + 'xbadmin/getxbstorelist/',
      data: {
        userid: s.userid,
        getusersigid: s.getusersigid,
        status: 1
      },
      type: 'post'

    }).done((data) => {
      if (data.getret === 0) {
        console.log(data);

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
      window.location.hash = 'jinrongxiaobao/';
    } else if (i * 1 === 1) {
      window.location.hash = 'jinrongxiaobaopolicy/';
    } else if (i * 1 === 2) {
      window.location.hash = 'jinrongxiaobaonotice/';
    } else if (i * 1 === 3) {
      window.location.hash = 'jinrongxiaobaosetup/';
    }
  }
  address() {
    window.location.hash = 'jinrongxiaobaoaddress/';
  }



}

export default ZmitiValidateUser(ZmitiJinrongxbApp);