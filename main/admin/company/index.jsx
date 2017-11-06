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
class ZmitiCompanyApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      mainHeight: document.documentElement.clientHeight - 50,
      userList: [

      ],
      productList: [],
      visible:false,
      datevalue: [],//延长时间
      inputValue:100,//提升空间


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
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render:(text,record)=>{
        //console.log('record.userid')
        return <a href={'./index.html#/companyinformation/id/'+record.userid}>{text}</a>
      }
    }, {
      title: '负责人账号',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '用户总数',
      dataIndex: 'totalUserNum',
      key: 'totalUserNum',
    }, {
      title: '到期时间',
      dataIndex: 'expirDate',
      key: 'expirDate',
    }, {
      title: '空间使用量',
      dataIndex: 'userSpace',
      key: 'userSpace',
    }, {
      title: '负责客服',
      dataIndex: 'serviceName',
      key: 'serviceName',
    }];
    var columns1 = columns.concat({
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)" onClick={this.timextends.bind(this)}>延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href={'./index.html#/companyuserinfo/试用公司账户/id/'+record.userid}>用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.timextends.bind(this)}>提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.regular.bind(this)}> 转正</a></div>
    });
    var columns2 = columns.concat({
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <div  data-userid={record.userid}><a href="javascrit:void(0)" onClick={this.timextends.bind(this)}>延长时间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href={'./index.html#/companyuserinfo/正式公司账户/id/'+record.userid}>用户</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.timextends.bind(this)}>提升空间</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascrit:void(0)" onClick={this.setRole.bind(this,record)}> 设置权限</a></div>
    })
    var title = this.props.params.title;


    var auothParams = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: this.state.setuserid
    }

    let props = {
      userList: this.state.userList,
      columns: [columns1, columns2],
      changeAccount: this.changeAccount,
      tags: ['试用公司账户', '正式公司账户'],
      mainHeight: this.state.mainHeight,
      title,
      keyDown: (value) => {
        clearTimeout(this.keyupTimer);
        this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
        this.keyupTimer = setTimeout(() => {
          var userlists = this.defautlUserList;
          var condition = 'companyName';
          this.state.userList = userlists.filter(user => {
            switch (this.condition * 1) {
              case 0: //提问内容
                condition = 'companyName';
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
      selectComponent: <div>
        
        <Select placeholder='公司名称' onChange={(e)=>{this.condition = e}}  style={{width:120}} size='small' >
                           <Option value="0">公司名称</Option>
                           <Option value="1">负责人账号</Option>
                       </Select>
<Modal
  title="时间延长与提升空间"
  visible={this.state.visible}
  onOk={this.handleOk.bind(this)}
  onCancel={this.handleCancel.bind(this)}
>
  <div className="zmiti-system-extend-pane">
    <div className="zmiti-system-t1">时间延长:</div>
    <div>
    <RangePicker onChange={this.datePickerChange.bind(this)} />
    </div>
    <br/>

    <div className="zmiti-system-t1">提升空间：单位（M）</div>
    <Slider min={100} max={1024} onChange={this.spaceChange.bind(this)} value={this.state.inputValue}  />
    <div>
      <InputNumber
          min={100}
          max={1024}
          step={10}
          value={this.state.inputValue}
          onChange={this.spaceChange.bind(this)}
        />
        <div className="zmiti-system-t2">提示：最大可提升到1024M</div>
    </div>
  </div>
</Modal>
      {this.state.showRole && <ZmitiRoleModal {...auothParams} showRole={this.state.showRole} productList={this.state.productList}></ZmitiRoleModal>}
        
      </div>
    }
    return (
      <MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
    );
  }

  setRole(record) {


    this.setState({
      setuserid: record.userid,
      showRole: true
    }, () => {
      this.loadRoleData()
      window.obserable.trigger({
        type: 'toggleRoleModal',
        data: true
      })
    });
  }


  loadRoleData() {
    var auothParams = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: this.state.setuserid
    }
    $.ajax({
      url: window.baseUrl + 'admin/getuserauth/',
      type: 'post',
      data: auothParams
    }).then(data => {
      if (data.getret === 0) {

        this.setState({
          productList: data.list
        })
      }

    })
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

  regular(e) { //转正
    var userid = e.target.parentNode.getAttribute('data-userid');
    var params = {
      getusersigid: this.getusersigid,
      userid: this.userid,
      setuserid: userid,
      setisover: 0 //0:正式用户，1 试用用户，2禁用用户，3已删除。
    }
    var baseUrl = window.baseUrl || 'http://api.zmiti.com/v2';
    let s = this;

    $.ajax({
      type: "post",
      url: baseUrl + 'user/disable_user/',
      data: params,
      success(data) {
        if (data.getret === 0) {
          message.success('操作成功');
          s.state.userList.forEach(user => {
            if (user.userid === userid) {
              user.isover = 0;
            }
          });
          s.forceUpdate();
        } else {
          message.error('操作失败');
        }
      }
    })
  }
  /*延长时间*/
  timextends(){
    this.setState({
      visible: true,
    });
  }
  handleOk(e){
    var s = this;
    this.setState({
      visible: false,
    });
    var datevalue=s.state.datevalue;//延长时间
    var inputValue=s.state.inputValue;//提升空间
    console.log(datevalue,inputValue);
  }
  handleCancel(e){
    var s = this;
    this.setState({
      visible: false,
    });
  }
  /*date*/
  datePickerChange(date, dateString) {
    //console.log(dateString[0],dateString[1]);
    var s = this;
    s.state.datevalue=dateString;
    //console.log(s.state.datevalue,'s.state.datevalue');
  }
  /*提升空间*/
  spaceChange(value){
    this.setState({
      inputValue: value,
    });
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
  }
  changeAccount(e) {
    // e : 0  1;
  }


}

export default ZmitiValidateUser(ZmitiCompanyApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/