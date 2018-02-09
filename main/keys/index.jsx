import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Icon,Cascader} from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiKeysApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight-50,
      countVal:100,
      provinceval:'',
      genderval:'',
      ageval:'',
      eduval:'',
			dataSource:[{
        key: '1',
        keyname: '十九大',
        votes: 100,
        persent:'10%',
      }, {
        key: '2',
        keyname: '新时代',
        votes: 150,
        persent:'10%',
      }, {
        key: '3',
        keyname: '共享经济（实体经济）',
        votes: 170,
        persent:'10%',
      }, {
        key: '4',
        keyname: '租购并举',
        votes: 175,
        persent:'10%',
      }, {
        key: '5',
        keyname: '雄安新区',
        votes: 190,
        persent:'10%',
      }, {
        key: '6',
        keyname: '人工智能',
        votes: 200,
        persent:'10%',
      }, {
        key: '7',
        keyname: '中国创造',
        votes: 210,
        persent:'10%',
      }, {
        key: '8',
        keyname: '食品安全',
        votes: 220,
        persent:'10%',
      }, {
        key: '9',
        keyname: '教育质量',
        votes: 230,
        persent:'10%',
      }, {
        key: '10',
        keyname: '美丽中国',
        votes: 250,
        persent:'10%',
      }],
      optionsAge:[{
        value: '0 ',
        label: '20岁以下',
      },{
        value: '1',
        label: '20-30岁',
      },{
        value: '2',
        label: '30-40岁',
      },{
        value: '3',
        label: '40-50岁',
      },{
        value: '4',
        label: '50-60岁',
      },{
        value: '5',
        label: '60岁以上',
      }],
      optionsEdu:[{
        value: '0 ',
        label: '本科及以下',
      },{
        value: '1',
        label: '硕士',
      },{
        value: '2',
        label: '博士',
      },{
        value: '3',
        label: '博士及博士以上学历',
      }],
      optionsProvince:[{
        value: 'beijing ',
        label: '北京',
      },{
        value: 'tianjin',
        label: '天津',
      },{
        value: 'shanghai',
        label: '上海',
      },{
        value: 'chongqing',
        label: '重庆',
      },{
        value: 'hebei',
        label: '河北',
      },{
        value: 'shanxi',
        label: '山西',
      },{
        value: 'liaoning',
        label: '辽宁',
      },{
        value: 'jilin',
        label: '吉林',
      },{
        value: 'heilongjiang',
        label: '黑龙江',
      },{
        value: 'jiangsu',
        label: '江苏',
      },{
        value: 'zhejiang',
        label: '浙江',
      },{
        value: 'anhui',
        label: '安徽',
      },{
        value: 'fujian',
        label: '福建',
      },{
        value: 'jiangxi',
        label: '江西',
      },{
        value: 'shandong',
        label: '山东',
      },{
        value: 'henan',
        label: '河南',
      },{
        value: 'hubei',
        label: '湖北',
      },{
        value: 'hunan',
        label: '湖南',
      },{
        value: 'guangdong',
        label: '广东',
      },{
        value: 'hainan',
        label: '海南',
      },{
        value: 'sichuan',
        label: '四川',
      },{
        value: 'guizhou',
        label: '贵州',
      },{
        value: 'yunnan',
        label: '云南',
      },{
        value: 'shanxi2',
        label: '陕西',
      },{
        value: 'gansu',
        label: '甘肃',
      },{
        value: 'qinghai',
        label: '青海',
      },{
        value: 'taiwan',
        label: '台湾',
      },{
        value: 'neimenggu',
        label: '内蒙古',
      },{
        value: 'guangxi',
        label: '广西',
      },{
        value: 'xizang',
        label: '西藏',
      },{
        value: 'ningxia',
        label: '宁夏',
      },{
        value: 'xinjiang',
        label: '新疆',
      },{
        value: 'xianggang',
        label: '香港',
      },{
        value: 'aomen',
        label: '澳门',
      }],
      
		};

	}
	render() {
		var s =this;
		var title = this.props.params.title || '两会热词';

    const columns = [{
      title: '热词',
      dataIndex: 'keyname',
      key: 'keyname',
    },{
      title: '投票数',
      dataIndex: 'votes',
      key: 'votes',
      width:150,
    },{
      title: '百分比',
      dataIndex: 'persent',
      key: 'persent',
      width:120,
    }];

    var component =<div className="zmiti-keys-main-ui" style={{height:this.state.mainHeight}}>
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
              <em>总投票数：</em><span className="zmiti-keys-red">{this.state.countVal}</span><span className="zmiti-keys-ls">|</span><em>总人数：</em><span className="zmiti-keys-red">{this.state.countVal}</span>
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
                <Select defaultValue="0" style={{width:100}} onChange={this.handleChangeGender.bind(this)}>
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
            <Table dataSource={this.state.dataSource} columns={columns} />
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
  onsearch(){
    var s = this;
    var pargams={
      provinceval:this.state.provinceval,
      genderval:this.state.genderval,
      ageval:this.state.ageval,
      eduval:this.state.eduval,
    }
    console.log(pargams,'pargams');
  }
	/*设置热词*/
	openkey(){
		window.location.href='./#/keysopt/';
	}

	componentDidMount() {
		var s=  this;

	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(() =>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}


}

export default ZmitiValidateUser(ZmitiKeysApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/