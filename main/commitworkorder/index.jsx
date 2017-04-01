import React, { Component } from 'react';

import './static/css/index.min.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';


import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table,Layout } from '../commoncomponent/common.jsx';
const { Header, Footer, Sider, Content } = Layout;
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

class ZmitiCommitWorkOrderApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {

            mainHeight:document.documentElement.clientHeight - 50,
			productlist:[

			]
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
            selectedIndex:1,
            customRightComponent:<div className="zmiti-workorder-main-ui padding-10">
				<Row className='zmiti-workorder-header'>
					<Col span={8}  className='zmiti-workorder-header-inner' >提交工单</Col>
				</Row>
				<div className="zmiti-workorder-line"></div>
				<Layout className="workorder-table">
					<Header>咨询类工单问题</Header>
					<Content>
						<Row gutter={30} className="zmiti-workorder-table-row">
							<Col span={5}>
								<div className="workorder-table-col-title">财务类</div>
								<Button className="workorder-table-col-button">提问</Button>
								<div className="workorder-table-col-content">订单，合同，充值，发票，汇款，等与资金相关问题</div>
							</Col>
							<Col span={5}>
								<div className="workorder-table-col-title">会员帐号类</div>
								<Button className="workorder-table-col-button">提问</Button>
								<div className="workorder-table-col-content">更换用户信息，找回密码，空间，到期时间，用户数等相关</div>
							</Col>
							<Col span={5}>
								<div className="workorder-table-col-title">定制服务类</div>
								<Button className="workorder-table-col-button">提问</Button>
								<div className="workorder-table-col-content">个性化定制，设计，规划及相关服务类问题</div>
							</Col>
							<Col span={5}>
								<div className="workorder-table-col-title">产品技术类</div>
								<Button className="workorder-table-col-button">提问</Button>
								<div className="workorder-table-col-content">现有产品的所有技术相关问题及接口类问题</div>
							</Col>
							<Col span={4}>
								<div className="workorder-table-col-title">其它类</div>
								<Button className="workorder-table-col-button">提问</Button>
								<div className="workorder-table-col-content">您无法判断的所有问题都可以此选择提问</div>
							</Col>
						</Row>
					</Content>
				</Layout>
				<Layout className="workorder-table">
					<Header>产品类工单问题</Header>
					<Content>
						<Row gutter={20} className="zmiti-workorder-table-row ">


							{
								this.state.productlist.map((item,i)=>{
									return <Col span={8} key={i}>
										<div className="workorder-table-box">
											<div className="workorder-table-col-title">{item.productname}</div>
											<Button className="workorder-table-col-button">提问</Button>
										</div>
									</Col>
								})
							}

						</Row>
					</Content>
				</Layout>
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

        if(i*1===0){
            window.location.hash='workorder/';
        }

	}

	componentDidMount() {

		var s = this;
        this.getProductList({
        	s:s,
			fn:(data)=>{
        		//console.log();
				s.setState({
                    productlist:data.productlist
				})
			}
        });
		 

	}


	

	componentWillMount() {


		let {resizeMainHeight,validateUser,loginOut,getProductList} = this.props;

		resizeMainHeight(this);
		
		let {username,userid,getusersigid} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.getProductList=getProductList;

	}

}

export default ZmitiValidateUser(ZmitiCommitWorkOrderApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/