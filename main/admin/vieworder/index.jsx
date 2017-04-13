import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import {Input, message,Select,Row, Col,Layout,Button,Steps,Form,Icon,Tooltip  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
const Step = Steps.Step;
const { Header, Content } = Layout;
 class ZmitiViewOrderApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[

			],
		};

		this.condition = 0;
		
	}
	render() {
		var title = this.props.params.title;
		let props={
			userList:this.state.userList,			
			changeAccount:this.changeAccount,
			mainHeight:this.state.mainHeight,
			tags:['待处理','已反馈','已处理','已关闭'],
			type:'vieworder',
			title,
			selectedIndex:0,
			rightType:"custom",
            customRightComponent:<div className="zmiti-vieworder-main-ui">
            	<div className="pad-10">
					<Row className='zmiti-vieworder-header'>
						<Col span={8}  className='zmiti-vieworder-header-inner' >工单详情</Col>
						<Col span={8} offset={8} className='zmiti-workorder-button-right'><Button type='primary'>返回列表</Button></Col>
					</Row>
					<div className="zmiti-workorder-line"></div>
					<div className="hr10"></div>
					<div className="hr10"></div>
					<Steps current={0}>
						<Step title="已受理"  icon={<Icon type="user"/>} />
						<Step title="已处理"  icon={<Icon type="solution"/>}/>
						<Step title="已确认"  icon={<Icon type="save"/>}/>
						<Step title="已评价"  icon={<Icon type="smile-o" />}/>
					</Steps>
					<div className="hr10"></div>
					<div className="view-questionInfo">
						<div className="gutter-example">
							<Row>
								<Col span={24}><span className="questionTitle">问题标题：</span>登录可以加验证码不？</Col>
							</Row>
							<Row>
								<Col span={6}>
									<span className="questionTitle">工单编号：</span>GqgzA1OL
								</Col>
								<Col span={6}>
									<span className="questionTitle">提交时间：</span>2017-04-12 17:40:09
								</Col>
								<Col span={6}>
									<span className="questionTitle"> 状态：</span>已受理
								</Col>
								<Col span={6}>
										<div className="text-right"><a href="javasctip:void(0);" >关闭工单</a></div>
								</Col>
							</Row>
						</div>
					</div>
					<div className="hr10"></div>
					<Layout className="workorder-table">
						<Header>沟通记录</Header>
						<Content>
							<div className="view-questionPane">
								<div className="view-questionLists">
									<ul>
										<li>
                                            <div className="view-faceIco">
                                            	<img src='./static/images/header.png' />
                                            </div>
                                            <div className="view-Infor">
                                                songxian
                                                <div>问题描述：登录可以加验证码不？</div>
                                                <div>                                                
                                                	附件：<a href="#" title="">点击下载</a>
                                                </div>
                                                <div>2017-04-05 17:52:27</div>
                                            </div>
                                        </li>
                                        <li className="messageDiv">
                                            <div className="view-Infor">
                                                回复：
                                                <div>您的问题我们已收到，会尽快为您查看。请您耐心等待，谢谢  </div>
                                                <div>2017-04-05 17:52:27</div>
                                            </div>
                                        </li>
                                        <li className="messageDiv">
                                            <div className="view-Infor">
                                                回复：
                                                <div>不支持的~~ </div>
                                                <div>2017-04-06 09:54:31</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="view-faceIco">
                                            	<img src='./static/images/header.png' />
                                            </div>
                                            <div className="view-Infor">
                                                songxian
                                                <div>用户确认工单已解决! </div>
                                                <div>2017-04-06 10:54:31</div>
                                            </div>
                                        </li>
                                        <li className="questionFinish">
                                            <div className="view-faceIco">
                                            	<img src='./static/images/header.png' />
                                            </div>
                                            <div className="view-Infor">
                                                songxian
                                                <div>问题是否解决 : 已解决</div>                                                
												<div>评价内容 : 虽然不是自己想要的结果，但是回复很及时。</div>
												<div>2017-04-06 10:54:36</div>
                                            </div>
                                        </li>
									</ul>
								</div>
							</div>
						</Content>
					</Layout>
					<div className="hr10"></div>
					<Layout className="workorder-table ">
						<Header>回复</Header>
						<Content>
							<div className="view-questionPane">
								<div className="view-questionForm">
									<Form>										
										<Input type="textarea" placeholder="此处限定5000字符" className="workorderquestion-inputContent" />
										<div className="hr10"></div>

										<div>
											<Button
												type="primary"
												htmlType="submit"
											>提交</Button>
										</div>
									</Form>
								</div>
							</div>
						</Content>
					</Layout>
				</div>
		</div>
			
      }	

		console.log(props.userList);



    //console.log(this.state.mainHeight);
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
		/*  var {userid,getusersigid} = this.props.params;
		  this.getusersigid = this.getusersigid = getusersigid;
      this.userid =userid;
      this.baseUrl = window.baseUrl;*/

       let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
      resizeMainHeight(this,'setAdminHeight');

      
      var params = {
      	getusersigid:this.getusersigid,
      	userid:this.userid,
      	setisadmin:1
      }
      let s = this;

      $.ajax({
      	type:"POST",
      	url:window.baseUrl+"/user/get_workorder/",
      	data:params,
      	success(data){
      		console.log(data);
      		
      		if(data.getret === 0){

      			s.setState({
      				userList:data.workorderinfo
      			});
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
	
}
export default ZmitiValidateUser(ZmitiViewOrderApp);
/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/