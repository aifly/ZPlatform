import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip,Progress} from '../commoncomponent/common.jsx';



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

class ZmitiViewUserInforApp extends Component {
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
			usericon:"",





		};
	}

	render() {

        var title = this.props.params.title || '个人中心';

        let props= {
            userid: this.userid,
            changeAccount: this.changeAccount.bind(this),
            tags: ['试用公司帐户', '正式公司账户'],
            mainHeight: this.state.mainHeight,
            title: title,
            type: 'workorder-1',
            selectedIndex: 0,
            rightType: "custom",
            customRightComponent:
				<div className="viewuserinfor-main">
					<div className="viewuserinfor-persion">
						<Row gutter={16}>
						  <Col span={14} >
						  	<div className="viewuserinfor-all">
							  	<div className="userFace">
							  		<img src='./static/images/userinfor-face.jpg'/>
							  		<div className="editUserIco">
							  			<Icon type="edit" />
							  		</div>
							  	</div>
							  	<div className="companyName">麟腾传媒文化有限公司</div>
							  	<div className="hr10"></div>
							  	<div className="information">
								  	<ul>
								  		<li>
								  			<label>公司负责人：</label>bmyuan&nbsp;&nbsp;<a className="c2" href="#"><Icon type="edit" />修改</a>&nbsp;&nbsp;&nbsp;&nbsp;<label>负责人电话：</label>13910904709
								  		</li>
								  		<li>
								  			<label>营业注册号：</label>12334567&nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-c1">查看扫描件</Button>&nbsp;<Button className="btn-c1">查看合同</Button>
								  		</li>
								  		<li>
								  			<label>公司地址：</label>北京市宣武门西大街129号金隅大厦&nbsp;&nbsp;<a className="c2" href="#"><Icon type="edit" />修改</a>
								  		</li>
								  	</ul>
							  	</div>
						  	</div>
						  </Col>
						  <Col span={10} >
						  	<div >
						  		<span className="viewuserinfor-dates">您的帐号将于 <span className="c1">2016-01-03</span> 到期</span>
<Button className="btn-c1">前往续费</Button><Button className="btn-c2">消费记录</Button>
						  	</div>
						  	<div className="hr10"></div>
						  	<div className="viewuserinfor-place icoA">
						  		<div className="placeIco "><Icon type="hdd" /></div>
						  		<div className="placeNum">
						  			<div className="placeTip">总空间&nbsp;<a href="#">扩充&gt;&gt;</a></div>
						  			<Progress percent={30} showInfo={false} />
						  			<span>300M/1T</span>
						  		</div>	
						  	</div>
						  	<div className="hr20"></div>
						  	<div className="viewuserinfor-place icoB">
						  		<div className="placeIco "><Icon type="user" /></div>
						  		<div className="placeNum">
						  			<div className="placeTip">用户数&nbsp;<a href="#">扩充&gt;&gt;</a></div>
						  			<Progress percent={50} showInfo={false} />
						  			<span>5/10</span>
						  		</div>	
						  	</div>
						  	<div className="hr20"></div>
						  	<div className="size18">微信公众号设置</div>
						  	<div className="viewuserinfor-weixin">
						  		<ul>
						  			<li><Input type='text' placeholder='appid'/></li>
						  			<li><Input type='text' placeholder='appsecret'/></li>
						  		</ul>
						  	</div>
						  </Col>
						</Row>
					</div>
					<div className="hr50"></div>
					<div className="viewuserinfor-nums">
						<ul>
							<li>
								<div className="viewuserinfor-col">
									<h5><div><span>总计作品</span></div></h5>
					        		<div className="viewnums"><span className="a1">32</span>个</div>
								</div>
							</li>
							<li>
								<div className="viewuserinfor-col">									
									<h5><div><span>总部门数</span></div></h5>
					        		<div className="viewnums"><span className="a2">100</span>个</div>
								</div>
							</li>
							<li>
								<div className="viewuserinfor-col">									
									<h5><div><span>总人数</span></div></h5>
					        		<div className="viewnums"><span className="a3">61</span>人</div>
								</div>
							</li>
							<li>
								<div className="viewuserinfor-col">									
									<h5><div><span>空间使用量</span></div></h5>
					        		<div className="viewnums"><span className="a4">453</span>M</div>
								</div>
							</li>
							<li>
								<div className="viewuserinfor-col">									
									<h5><div><span>总消费</span></div></h5>
					        		<div className="viewnums"><span className="a5">88</span>元</div>
								</div>
							</li>
						</ul>
						<div className="clear"></div>
					</div>
					<div className="hr40"></div>
					<div className="viewuserinfo-works">
						<div className="tit-a1">产品与服务</div>
						<Row gutter={16}>
							<Col span={6} >
								<ul>
									<li>
										<span className="rad b1"></span>
										<span className="fontC1"><a href="#">移动微场景</a></span>
										<a className="fontC2" href="#">申请使用</a>
									</li>
									<li>
										<span className="rad b2"></span>
										<a href="#">微信问答</a>
									</li>
									<li>
										<span className="rad b3"></span>
										<a href="#">交互式富图片</a>
									</li>
								</ul>
							</Col>
							<Col span={6} >
								<ul>
									<li>
										<span className="rad b4"></span>
										<span><a href="#">企业项目管理</a></span>
									</li>
									<li>
										<span className="rad b5"></span>
										<a href="#">设计图讨论工具</a>
									</li>
									<li>
										<span className="rad b6"></span>
										<a href="#">页面服务</a>
									</li>
								</ul>
							</Col>
							<Col span={6} >
								<ul>
									<li>
										<span className="rad b7"></span>
										<span><a href="#">互联网整体方案服务</a></span>
									</li>
									<li>
										<span className="rad b8"></span>
										<a href="#">设计类服务</a><em><a className="fontC3" href="#">已使用   134个作品</a></em>
									</li>
									<li>
										<span className="rad b9"></span>
										<a href="#">交互方案服务</a>
									</li>
								</ul>
							</Col>
							<Col span={6} >
								<ul>
									<li>
										<span className="rad b10"></span>
										<a href="#">会员服务问答</a>
									</li>
									<li>
										<span className="rad b11"></span>
										<a href="#">非会员服务问答</a>
									</li>
									<li>
										<span className="rad b12"></span>
										<a href="#">方案书服务</a>
									</li>
								</ul>
							</Col>
						</Row>
					</div>
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

   


//获取用户信息
	getuserinfo(){
    	var s=this;
    	$.ajax({
            url:window.baseUrl+'user/get_userdetails/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setuserid:s.userid,
            },
            success(data){
                if(data.getret === 0){
                	s.state.usericon=data.getuserinfo.portrait;
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

export default ZmitiValidateUser(ZmitiViewUserInforApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/