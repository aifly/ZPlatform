import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table   } from '../commoncomponent/common.jsx';



import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ZmitiViewQuestionApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {

            mainHeight:document.documentElement.clientHeight - 50,
            dataSource:[],

		};
	}

	render() {
		
		const formItemLayoutWithOutLabel = {
	      wrapperCol: {
	        xs: { span: 24, offset: 0 },
	        sm: { span: 20, offset: 4 },
	      },
	    };


		var mainComponent = <div className="view-qestion-main-ui" style={{height:this.state.mainHeight}}>

			<div className="pad-10 " >
				<Steps current={2}>
					<Step title="已受理" description="" />
					<Step title="已处理" description="" />
					<Step title="已确认" description="实际处理时长21分钟" />
					<Step title="已评价" description="" />
				</Steps>
				<div className="hr10"></div>
				<div className="view-questionInfo">				
					<div className="gutter-example">
						<Row>
						  <Col span={24}><span>问题标题：</span>如何变更发票信息</Col>
						</Row>
						<Row>
						  <Col span={6}>
						    <div><span>工单编号：</span>2175809</div>
						  </Col>
						  <Col span={6}>
						    <div><span>提交时间：</span>2017-01-03 12:07:33</div>
						  </Col>
						  <Col span={6}>
						    <div>状态：工单已关闭</div>
						    <div>状态：正在为您处理</div>
						    <div>状态：待反馈</div>
						  </Col>
						  <Col span={6}>
						    <div>
						    	<div className="text-right"><a href="#">删除工单</a></div>
						    	<div className="text-right"><a href="#">关闭工单</a></div>
						    </div>
						  </Col>
						</Row>
					</div>
				</div>
				<div className="hr10"></div>
				<div className="view-questionPane">
					<div className="view-titPane"><p>沟通记录</p></div>
					<div className="view-questionLists">
						<ul>
							<li>
								<div className="view-faceIco">
									<img src='./static/images/header.png'/>
								</div>
								<div className="view-Infor">
									<p>song***@163.com&nbsp;&nbsp;&nbsp;&nbsp;备案域名：www.youwebsite.com</p>
									<p>问题描述：如何变更发票信息</p>
									<p>2017-01-03 12:07:33</p>
								</div>
							</li>
							<li>
								<div className="view-faceIco">
									<img src='./static/images/header2.png'/>
								</div>
								<div className="view-Infor"><p>自2014年12月1日起，您将选择启用一条发票模板信息，您选择的公司（或个人）视为进行实际交易的法律主体。发票将根据您的选择确定发票抬头，一经选择，不得随意变更。
</p>
<p>2017-01-05 12:07:33</p>
								</div>
							</li>
							<li>
								<div className="view-faceIco">
									<img src='./static/images/header2.png'/>
								</div>
								<div className="Infor">
<p>禁止一个云账号下随意变更发票抬头，主要系基于对增值税发票（尤其是专用发票）管理的严肃性考虑，这同时也是国家有关部门的要求。</p>
									<p>2017-01-08 12:13:30</p>
								</div>
							</li>
							<li>
								<div className="view-faceIco">
									<img src='./static/images/header2.png'/>
								</div>
								<div className="view-Infor">
<p>禁止一个云账号下随意变更发票抬头，主要系基于对增值税发票（尤其是专用发票）管理的严肃性考虑，这同时也是国家有关部门的要求。</p>
									<p>2017-01-08 12:13:30</p>
								</div>
							</li>
							<li>
								<div className="view-faceIco">
									<img src='./static/images/header2.png'/>
								</div>
								<div className="view-Infor">
<p>禁止一个云账号下随意变更发票抬头，主要系基于对增值税发票（尤其是专用发票）管理的严肃性考虑，这同时也是国家有关部门的要求。</p>
									<p>2017-01-08 12:13:30</p>
								</div>
							</li>


						</ul>
					</div>
				</div>
				<div className="hr10"></div>
				<div className="view-questionPane">
					<div className="view-titPane"><p>我要反馈</p></div>
					<div className="view-questionForm">
						<Form>							
							<div className="view-tit-label">留言</div>							
							<Input type="textarea" rows={5} placeholder="此处限定5000字符" />
							<div className="hr10"></div>
							<div className="view-tit-label">机密信息（非必填项）</div>							
							<Input type="textarea" rows={5} placeholder="此处限定5000字符" />

							<p>
						    <Button>
						      <Icon type="upload" /> 上传文件
						    </Button>
							</p>
							<p>
							<Button
					            type="primary"
					            htmlType="submit"
					            size="small"					           
					          >提交</Button>
							</p>
						</Form>						
					</div>
				</div>



			</div>
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

   

	componentDidMount() {

		

	}


	

	componentWillMount() {


		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);
		
		let {username,userid,getusersigid} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiViewQuestionApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/