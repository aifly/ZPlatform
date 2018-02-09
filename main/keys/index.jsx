import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Icon} from '../commoncomponent/common.jsx';
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
			dataSource:[{
              key: '1',
              gender:0,
              keyname: '十九大',
              age: 32,
              edu:1,
              province:1,
              votes: 100
            }, {
              key: '2',
              gender:1,
              keyname: '新时代',
              age: 42,
              edu:2,
              province:1,
              votes: 200
            }]
		};		
	}
	render() {
		var s =this;

		var title = this.props.params.title || '两会热词';
        const columns = [{
          title: '热词',
          dataIndex: 'keyname',
          key: 'keyname',
        }, {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
        }, {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        }, {
          title: '学历',
          dataIndex: 'edu',
          key: 'edu',
        }, {
          title: '省份',
          dataIndex: 'province',
          key: 'province',
        }, {
          title: '投票数',
          dataIndex: 'votes',
          key: 'votes',
        }];
		var component =<div className="zmiti-keys-main-ui" style={{height:this.state.mainHeight}}>
            <div className='pad-10'>
                <div className="zmiti-keys-header">
                    <Row>
                        <Col span={8} className="zmiti-keys-header-inner">两会热词</Col>
                        <Col span={8} offset={8} className='zmiti-keys-button-right'><Button type="primary" onClick={this.openkey.bind(this)}><Icon type="setting" />设置热词</Button></Col>
                    </Row>                      
                </div>
                <div className="zmiti-keys-line"></div>
                <div className="hr20"></div>
                <Table dataSource={this.state.dataSource} columns={columns} />
            </div>
        </div>

		return (
            <MainUI component={component}></MainUI>
        );
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