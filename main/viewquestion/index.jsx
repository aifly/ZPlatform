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
			workorderid:"",
			content:"",
			createtime:"",
			status:"",
            workordertype:"",
            totalminu:"",
			statusName:"",
            getTimestr:"",





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
						<Steps current={this.state.status}>
							<Step title="已受理"  icon={<Icon type="user"/>} />
							<Step title="已处理"  icon={<Icon type="solution"/>}/>
							<Step title="已确认"  description={this.state.getTimestr} icon={<Icon type="save"/>}/>
							<Step title="已评价"  icon={<Icon type="smile-o" />}/>
						</Steps>
						<div className="hr10"></div>

						<div className="view-questionInfo">
							<div className="gutter-example">
								<Row>
									<Col span={24}><span className="questionTitle">问题标题：</span>{this.state.content}</Col>
								</Row>
								<Row>
									<Col span={6}>
										<span className="questionTitle">工单编号：</span>{this.state.workorderid}
									</Col>
									<Col span={6}>
										<span className="questionTitle">提交时间：</span>{this.state.createtime}
									</Col>
									<Col span={6}>
										<span className="questionTitle"> 状态：</span>{this.state.statusName}
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
        var s=this
		$.ajax({
            url:window.baseUrl+'user/view_workorder',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setworkorderid:workorderid,
			},
            success(data){
                if(data.getret === 0){
                	console.log(data);
                	s.state.workorderid=data.workinfo.workorderid;
                	s.state.content=data.workinfo.content;
                	s.state.createtime=data.workinfo.createtime;
                	s.state.status=data.workinfo.status;
                    s.state.totalminu=data.workinfo.totalminu;
                    if(s.state.status=="0"){
                        s.state.statusName="已受理";
					}
                    if(s.state.status=="1"){
                        s.state.statusName="已处理";
                    }
                    if(s.state.status=="2"){
						s.state.statusName="已确认";
                        s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!"
                    }
                    if(s.state.status=="3"){
                        s.state.statusName="已评价";
                        s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!"
                    }
                    if(s.state.status=="4"){
						s.state.statusName=<span className="red">请您反馈</span>;
                        s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!"
                    }
                    console.log("状态名" + s.state.statusName);
                	s.state.workordertype=data.workinfo.workordertype;

                    s.forceUpdate();

                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    loginOut(data.getmsg,window.loginUrl,false);
                }
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