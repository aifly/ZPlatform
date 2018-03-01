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
  Popconfirm,
  DatePicker,
  Table,
  moment,
  Icon,
  Cascader
} from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import {
  Link
} from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {
  ZmitiValidateUser
} from '../public/validate-user.jsx';
import $ from 'jquery';
/*计算两个整数的百分比值*/
function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
}
class ZmitiKeysApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainHeight: document.documentElement.clientHeight - 50,
      totalpv:0,//访问量
      countVal: 0,
      usernumVal: 0,//投票人数
      provinceval: '',
      genderval: '',
      ageval: '',
      eduval: '',
      dataSource: [],
      optionsAge: [{
        value: 0,
        label: '20岁以下',
      }, {
        value: 1,
        label: '20-30岁',
      }, {
        value: 2,
        label: '30-40岁',
      }, {
        value: 3,
        label: '40-50岁',
      }, {
        value: 4,
        label: '50-60岁',
      }, {
        value: 5,
        label: '60岁以上',
      }],
      optionsEdu: [{
        value: 0,
        label: '高中及以下',
      }, {
        value: 1,
        label: '本科',
      }, {
        value: 2,
        label: '硕士',
      }, {
        value: 3,
        label: '博士',
      }, {
        value: 4,
        label: '其它',
      }],
      optionsProvince: [{
        value: '',
        label: '全部',
      }, {
        value: 1,
        label: '北京',
      }, {
        value: 2,
        label: '天津',
      }, {
        value: 3,
        label: '上海',
      }, {
        value: 4,
        label: '重庆',
      }, {
        value: 5,
        label: '河北',
      }, {
        value: 6,
        label: '山西',
      }, {
        value: 7,
        label: '辽宁',
      }, {
        value: 8,
        label: '吉林',
      }, {
        value: 9,
        label: '黑龙江',
      }, {
        value: 10,
        label: '江苏',
      }, {
        value: 11,
        label: '浙江',
      }, {
        value: 12,
        label: '安徽',
      }, {
        value: 13,
        label: '福建',
      }, {
        value: 14,
        label: '江西',
      }, {
        value: 15,
        label: '山东',
      }, {
        value: 16,
        label: '河南',
      }, {
        value: 17,
        label: '湖北',
      }, {
        value: 18,
        label: '湖南',
      }, {
        value: 19,
        label: '广东',
      }, {
        value: 20,
        label: '海南',
      }, {
        value: 21,
        label: '四川',
      }, {
        value: 22,
        label: '贵州',
      }, {
        value: 23,
        label: '云南',
      }, {
        value: 24,
        label: '陕西',
      }, {
        value: 25,
        label: '甘肃',
      }, {
        value: 26,
        label: '青海',
      }, {
        value: 27,
        label: '台湾',
      }, {
        value: 28,
        label: '内蒙古',
      }, {
        value: 29,
        label: '广西',
      }, {
        value: 30,
        label: '西藏',
      }, {
        value: 31,
        label: '宁夏',
      }, {
        value: 32,
        label: '新疆',
      }, {
        value: 33,
        label: '香港',
      }, {
        value: 34,
        label: '澳门',
      }],

    };

  }
  render() {
    var s = this;
    var title = this.props.params.title || '两会热词';

    const columns = [{
      title: '热词',
      dataIndex: 'hotword',
      key: 'hotword',
    }, {
      title: '投票数',
      dataIndex: 'num',
      key: 'num',
      width: 150,
    }, {
      title: '百分比',
      dataIndex: 'persent',
      key: 'persent',
      width: 120,
      render: (text, recoder, index) => (
        <div>{GetPercent(recoder.num,this.state.countVal)}</div>
      )
    }];

    var component = <div className="zmiti-keys-main-ui" style={{height:this.state.mainHeight}}>
        <div className='pad-10'>
            <div className="zmiti-keys-header">
                <Row>
                    <Col span={8} className="zmiti-keys-header-inner">两会热词</Col>                    
                    <Col span={16} className='zmiti-keys-button-right'><Button type="primary" onClick={this.openkey.bind(this)}><Icon type="setting" />设置热词</Button></Col>
                </Row>                      
            </div>
            <div className="zmiti-keys-line"></div>
            <div className="hr20"></div>
            <div className="zmiti-keys-count">
              <em>总投票数：</em><span className="zmiti-keys-red">{this.state.countVal}</span><span className="zmiti-keys-ls">|</span><em>总访问量：</em><span className="zmiti-keys-red">{this.state.totalpv}</span>
            </div>
            <div className="hr20"></div>
            <Row>
              <Col span={6} className="zmiti-keys-sel-1">
                <div className="zmiti-keys-sel-font">选择：</div>
                <div>
                  <Cascader options={this.state.optionsProvince} onChange={this.onChangeProvince.bind(this)} placeholder="省份" />
                </div>
              </Col>
              <Col span={3} className="zmiti-keys-sel-2">
                <Select defaultValue="" style={{width:100}} onChange={this.handleChangeGender.bind(this)}>
                  <Option value="">性别</Option>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Col>
              <Col span={6} className="zmiti-keys-sel-3">
                <div>
                  <Cascader options={this.state.optionsAge} onChange={this.onChangeAge.bind(this)} placeholder="年龄" />
                </div>
              </Col>
              <Col span={6} className="zmiti-keys-sel-4">
                <div>
                  <Cascader options={this.state.optionsEdu} onChange={this.onChangeEdu.bind(this)} placeholder="学历" />
                </div>
              </Col>
              <Col span={3} className="zmiti-keys-sel-5">
                <Button icon="search" onClick={this.onsearch.bind(this)}>查询</Button>
              </Col>
            </Row>
            <div className="hr20"></div>
            <Table dataSource={this.state.dataSource} columns={columns} rowKey={record => record.hotword} />
        </div>
    </div>

    return (
      <MainUI component={component}></MainUI>
    );
  }
  /*选择省份*/
  onChangeProvince(value) {
    this.state.provinceval = value.toString();
    console.log(this.state.provinceval);
  }
  /*性别*/
  handleChangeGender(value) {
    this.state.genderval = value;
    console.log(this.state.genderval);
  }
  /*选择年龄*/
  onChangeAge(value) {
    this.state.ageval = value.toString();
    console.log(this.state.ageval);
  }
  /*选择学历*/
  onChangeEdu(value) {
    this.state.eduval = value.toString();
    console.log(this.state.eduval);
  }
  /*搜索*/
  onsearch() {
    var s = this;
    var pargams = {
      provinceval: this.state.provinceval,
      genderval: this.state.genderval,
      ageval: this.state.ageval,
      eduval: this.state.eduval,
    }
    //console.log(pargams,'pargams');
    $.ajax({
      url: 'http://api.zmiti.com/v2/h5/count_user/',
      type: 'post',
      data: {
        userid: s.userid,
        getusersigid: s.getusersigid,
        worksclassid: 3,
        proviceid: this.state.provinceval,
        sex: this.state.genderval,
        age: this.state.ageval,
        education: this.state.eduval,
      },
      success(data) {
        if (data.getret === 0) {
          //console.log(data,"获取总人数");
          s.state.dataSource = data.list;
          s.state.countVal = data.totalnum;
          s.state.usernumVal = data.totalusernum;
          s.forceUpdate();
        }
      }
    })
  }
  //获取总人数
  getusercound() {
    var s = this;
    $.ajax({
      url: 'http://api.zmiti.com/v2/h5/count_user/',
      type: 'post',
      data: {
        userid: s.userid,
        getusersigid: s.getusersigid,
        worksclassid: 3,
      },
      success(data) {
        if (data.getret === 0) {
          //console.log(data,"获取总人数");
          s.state.dataSource = data.list;
          s.state.countVal = data.totalnum;
          s.state.usernumVal = data.totalusernum;
          s.forceUpdate();
        }
      }
    })
  }
  //获取访问量
  pageViewCount(){
    var s = this;
    $.ajax({
      url:window.baseUrl+'custom/get_customdetial/',
      type:'post',
      data:{
        userid:s.userid,
        getusersigid:s.getusersigid,
        customid:39,
      },
      success(data){
        if(data.getret === 0){
            //console.log(data.detial.totalpv,"访问量");
            s.state.totalpv = data.detial.totalpv;
            s.forceUpdate();
        }
      }
    })
  }

  /*设置热词*/
  openkey() {
    window.location.href = './#/keysopt/';
  }

  componentDidMount() {
    var s = this;
    s.getusercound();
    s.pageViewCount();
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
    window.HOTWORDSLIST.forEach((item, i) => {
      if (item === username) {
        index = i;
      }
    });
    if (index <= -1) {
      loginOut('您没有访问的权限', window.mainUrl, true); //不是hash跳转。location.href跳转
    }

  }

}

export default ZmitiValidateUser(ZmitiKeysApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/