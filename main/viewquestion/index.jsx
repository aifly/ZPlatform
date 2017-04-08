import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip  } from '../commoncomponent/common.jsx';



import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;
const { Header, Content } = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ZmitiViewQuestionApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            mainHeight:document.documentElement.clientHeight - 50,

		};
	}

	render() {

        var title = this.props.params.title || '服务支持中心';

        let props= {
            userid: this.userid,
            changeAccount: this.changeAccount.bind(this),
            tags: ['我的工单', '提交工单'],
            mainHeight: this.state.mainHeight,
            title: title,
            type: 'workorder-1',
            selectedIndex: 0,
            rightType: "custom",
            customRightComponent:
				<div className="view-qestion-main-ui padding-10" >
					<Row className='zmiti-workorder-header'>
						<Col span={8}  className='zmiti-workorder-header-inner' >工单详情</Col>
						<Col span={8} offset={8} className='zmiti-workorder-button-right'><Button type='primary' onClick={this.changeAccount.bind(this,0)}>返回列表</Button></Col>
					</Row>
					<div className="zmiti-workorder-line"></div>
					<div className="hr10"></div>
					<div className="hr10"></div>
						<Steps >
							<Step title="已受理"  status="finish" icon={<Icon type="user"/>} />
							<Step title="已处理"  status="finish" icon={<Icon type="solution"/>}/>
							<Step title="已确认"  status="process" description="总计使用时间为2分钟" icon={<Icon type="save"/>}/>
							<Step title="已评价"  status="wait" icon={<Icon type="smile-o" />}/>
						</Steps>
						<div className="hr10"></div>

						<div className="view-questionInfo">
							<div className="gutter-example">
								<Row>
									<Col span={24}><span className="questionTitle">问题标题：</span>如何变更发票信息</Col>
								</Row>
								<Row>
									<Col span={6}>
										<span className="questionTitle">工单编号：</span>2175809
									</Col>
									<Col span={6}>
										<span className="questionTitle">提交时间：</span>2017-01-03 12:07:33
									</Col>
									<Col span={6}>
										<span className="questionTitle"> 状态：</span>工单已关闭
									</Col>
									<Col span={6}>
											<div className="text-right"><a href="#">删除工单</a></div>
									</Col>
								</Row>
							</div>
						</div>
					<div className="hr10"></div>
					<Layout className="workorder-table">
						<Header>咨询类工单问题</Header>
						<Content>
							<div className="view-questionPane">
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

									</ul>
								</div>
							</div>
						</Content>
					</Layout>
					<div className="hr10"></div>
					<Layout className="workorder-table">
						<Header>咨询类工单问题</Header>
						<Content>
						<div className="view-questionPane">
							<div className="view-questionForm">
								<Form>
									<div className="view-tit-label">留言</div>
									<Input type="textarea" rows={5} placeholder="此处限定5000字符" />
									<div className="hr10"></div>
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
						</Content>
					</Layout>
				</div>

        }


		var mainComponent =
			<ZmitiUserList {...props}></ZmitiUserList>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}


    changeAccount(i){
        if(i*1===1){
            window.location.hash='commitworkorder/';
        }else if(i*1===0){
            window.location.hash='workorder/';
        }
	}

   

	componentDidMount() {
    	//*获取指定工单的所有信息
        var workorderid=this.props.params.id;
		$.ajax({
            url:window.baseUrl+'user/view_workorder',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setworkorderid:workorderid,
			},
            success(data){
            	console.log(data);
			}

		})
		

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