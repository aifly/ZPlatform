import React, { Component } from 'react';

import './static/css/index.min.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker   } from '../commoncomponent/common.jsx';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';


import $ from 'jquery';

class ZmitiWorkOrderApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {

            mainHeight:document.documentElement.clientHeight - 50,

		};
	}
	render() {
        var title = this.props.params.title || '服务支持中心';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount,
            tags:['我的工单','提交工单'],
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            rightType:"custom",
            customRightComponent:<div className="zmiti-workorder-main-ui padding-10">
				<Row className='zmiti-workorder-header'>
					<Col  className='zmiti-workorder-header-inner' >我的工单</Col>
				</Row>
				<div className="zmiti-workorder-line"></div>
				<Row gutter={10} type='flex' className='workorder-search '>
					<Col span={2} className='zmiti-workorder-with100 workorder-heigth45'>工单编号：</Col>
					<Col span={5} className={'workorder-heigth45'}><Input value={'工单编号录入'}/></Col>
					<Col span={3} className={'zmiti-workorder-with60 workorder-heigth45 rig'}>时间:</Col>
					<Col span={5} className={'workorder-heigth45 zmiti-workorder-with130 '}><DatePicker /></Col>
					<Col span={3} className={'zmiti-workorder-with30 workorder-heigth45 cen'}>至:</Col>
					<Col span={5} className={'workorder-heigth45 zmiti-workorder-with130 '}><DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')}/></Col>
					<Col span={3} className={'zmiti-workorder-with60 workorder-heigth45 rig'}>关键词:</Col>
					<Col span={3} className={'workorder-heigth45'}><Input /></Col>
					<Col span={5} className={'workorder-heigth45 lef'}><Button>查询</Button></Col>
				</Row>

		</div>
        }
  
		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

	changeAccount(i){


	}

	componentDidMount() {
		
	}


	

	componentWillMount() {


		/*let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	*/
		
		/*let {username,userid,getusersigid} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;*/

		
	}

}

export default ZmitiValidateUser(ZmitiWorkOrderApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/