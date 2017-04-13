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
            userData:{
                portrait:'./personalAcc/static/images/user.jpg',//用户头像
                username:'',//用户名
                useremail:'',
                usermobile:'',
                departmentname:'麟腾传媒文化有限公司',
                departmentid:'',
                companyid:'',
                appid:'',
                appsecret:'',
                companyname:'',
                userrealname:'',//用户真实姓名
                usersex:'1',//用户性别
                useremergencycontacter:'',//紧急联系人
                useremergencycontactmobile:'',//紧急联系人电话/
                credentials:[

                ],//用户证件照片

                expiredate:'2016-12-13',//过期时间/
                currentVal:50,//进度条当前值,用户试用期总时间
                maxVal:100,//进度最大值,已使用的时间 (两个数据无关紧要,我最终要根据两个数据算出比例.)
            },
		};
	}

	render() {
        var s =this;

        const props = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.userData.portrait = imgData.src;
                s.forceUpdate();
            }
        };

        const userProps ={
            documentbaseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.userData.credentials.push({src:imgData.src});
                s.forceUpdate();
            }
        }

        let zmitiProgressProps = {
            label:'',
            unit:1,
            isShowInfo:false
        }

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        var mainComponent =
			<div className="viewuserinfor-main" style={{height:this.state.mainHeight}} >
				<div className="viewuserinfor-persion">
					<Row gutter={16}>
						<Col span={14} >
							<div className="viewuserinfor-all">
								<div className="userFace">
									<img src='./static/images/userinfor-face.jpg'/>
									<div className="editUserIco">
										<a href="#" className="icoEdit">修改</a>
									</div>
								</div>
								<div className="companyName">{this.state.userData.companyname}</div>
								<div className="hr10"></div>
								<div className="information">
									<ul>
										<li>
											<label>公司负责人：</label>{this.state.userData.username}&nbsp;&nbsp;&nbsp;&nbsp;<a className="c2" href="#">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;<label>负责人电话：</label>{this.state.userData.usermobile}
										</li>
										<li>
											<label>营业注册号：</label>{this.state.userData.businesslicensenumber}&nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-c1">查看扫描件</Button>&nbsp;<Button className="btn-c1">查看合同</Button>
										</li>
										<li>
											<label>公司地址：</label>{this.state.userData.companyaddress}&nbsp;&nbsp;&nbsp;&nbsp;<a className="c2" href="#">修改</a>
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
									<li><Input addonBefore='AppId' type='text' value={this.state.userData.appid} onChange={(e)=>{this.state.userData.appid=e.target.value;this.forceUpdate()}} placeholder='appid'/></li>
									<li><Input addonBefore='appsecret' type='text' placeholder='appsecret' value={this.state.userData.appsecret} onChange={(e)=>{this.state.userData.appsecret=e.target.value;this.forceUpdate()}}/></li>
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
									<span className="tit-c1">移动微场景</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b2"></span>
									<span className="tit-c1">微信问答</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b3"></span>
									<span className="tit-c1">交互式富图片</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
							</ul>
						</Col>
						<Col span={6} >
							<ul>
								<li>
									<span className="rad b4"></span>
									<span className="tit-c1">企业项目管理</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b5"></span>
									<span className="tit-c1">设计图讨论工具</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b6"></span>
									<span className="tit-c1">页面服务</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
							</ul>
						</Col>
						<Col span={6} >
							<ul>
								<li>
									<span className="rad b7"></span>
									<span className="tit-c1">互联网整体方案服务</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li className="stateA">
									<span className="rad b8"></span>
									<span className="tit-c1">设计类服务</span>
									<span className="tit-c2"><a href="#">已使用134个作品</a></span>
								</li>
								<li>
									<span className="rad b9"></span>
									<span className="tit-c1">交互方案服务</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
							</ul>
						</Col>
						<Col span={6} >
							<ul>
								<li>
									<span className="rad b10"></span>
									<span className="tit-c1">会员服务问答</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b11"></span>
									<span className="tit-c1">非会员服务问答</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
								<li>
									<span className="rad b12"></span>
									<span className="tit-c1">方案书服务</span>
									<span className="tit-c2"><a href="#">申请使用</a></span>
								</li>
							</ul>
						</Col>
					</Row>
				</div>
			</div>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}


	componentWillMount() {
        let {resizeMainHeight,validateUser,loginOut,getUserDetail} = this.props;
        resizeMainHeight(this);
        let {username,userid,getusersigid} = validateUser(()=>{},this);
        this.getUserDetail = getUserDetail;
        this.userid = userid;
        this.getusersigid = getusersigid;
    }
    componentDidMount(){

        var s = this;
        window.obserable.on('modifyUesrCredentials',()=>{
            this.modifyUesrCredentials();
        });

        window.obserable.on('removeCredentials',(data)=>{
            this.state.userData.credentials.splice(data,1);
            this.forceUpdate();
        });


        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        this.getUserDetail({
            $:$,
            userid:s.userid,
            getusersigid:s.getusersigid,
            setuserid : userid,
            sussess:(data)=>{
                if(data.getret === 0){
                    console.log(data)
                    var da = data.getuserinfo;
                    s.state.userData={
                        portrait:da.portrait||'./personalAcc/static/images/user.jpg',
                        username:da.username,//用户名
                        useremail:da.useremail,
                        usermobile:da.usermobile,
                        departmentname:da.departmentname,
                        departmentid:da.departmentid,
                        companyid:da.companyid,
                        companyname:da.companyname,
                        appid:da.wxappid,
                        appsecret :da.wxappsecret,
                        userrealname:da.userrealname,//用户真实姓名
                        usersex:da.usersex+'',//用户性别
                        useremergencycontacter:da.useremergencycontacter,//紧急联系人
                        useremergencycontactmobile:da.useremergencycontactmobile,//紧急联系人电话/
                        credentials:da.credentials,//用户证件照片
                        expiredate:s.endDate,//过期时间/
                        currentVal:parseFloat(s.capacitied),//进度条当前值,用户试用期总时间
                        maxVal:s.capacity,//进度最大值,已使用的时间 (两个数据无关紧要,我最终要根据两个数据算出比例.)
                    };


                    s.forceUpdate();
                }
                else{
                    message.error(data.getmsg);
                }
            }
        });
    }
    changePortrait(){//更换头像

        var obserable=window.obserable;
        this.setState({
            showCredentialsDiolog:false
        },()=>{
            obserable.trigger({
                type:'showModal',
                data:{type:0,id:'personAcc'}
            })
        })

    }

    delayDay(){//延长试用。
        var s = this;
        this.ajaxStart = this.ajaxStart === undefined ? 1:0;
        if(this.ajaxStart){
            this.ajaxStart = 0;
            $.ajax({
                type:'post',
                url:window.baseUrl + 'user/user_delayday',
                data:{
                    userid:s.userid,
                    getusersigid:s.getusersigid
                },
                success(data){
                    if(data.getret === 0){
                        message.success('您的申请已经提交到后台，我们将在1-2个工作日内审核！感谢您使用智媒体');
                    }else{
                        message.error(data.getmsg);
                    }
                }
            });
        }
        else{
            message.error('您的申请已经提交到后台，无须重复申请。');
        }
    }

    modifyUesrCredentials(){
        var obserable=window.obserable;
        this.setState({
            showCredentialsDiolog:true
        },()=>{
            obserable.trigger({
                type:'showModal',
                data:{type:0,id:'userCredentials'}
            })
        })
    }


    modifyUserPwd(){//修改密码
        var  oldPwd = this.refs['old-pwd'].refs.input.value;
        var  newPwd = this.refs['new-pwd'].refs.input.value;
        var  surePwd = this.refs['sure-pwd'].refs.input.value;

        if(oldPwd.length<=0){
            this.setState({
                showOldPwdError:true
            });

            return 0;
        }
        if(newPwd.length<=0){
            this.setState({
                showNewPwdError:true
            })
            return 0;
        }
        if(surePwd.length<=0){
            this.setState({
                showSurePwdError:true
            })
            return 0;
        }

        if(surePwd !== newPwd){
            message.error('两次输入密码不一致');
            return;
        }

        var s = this;

        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl + 'user/edit_userpwd/',
            data:{
                setolduserpwd:oldPwd,
                setnewuserpwd:newPwd,
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid
            },
            success(data){
                message[data.getret === 0?'success':'error'](data.getmsg);
                s.setState({
                    modifyUserPwdDialogVisible:false
                });
            }
        })

    }
    save(){
		/* this.refs['save-btn'].classList.add('active');
		 setTimeout(()=>{
		 this.refs['save-btn'].classList.remove('active');
		 },150)*/
        var s = this;
        var credentialsStr = '';
        s.state.userData.credentials.map((data,i) =>{
            credentialsStr+= data.src+ (i>= s.state.userData.credentials.length-1 ? '':',');
        });


        var params = {
            userid : s.userid,
            setuserid:s.userid,
            getusersigid:s.getusersigid,
            usermobile: s.state.userData.usermobile,
            useremail: s.state.userData.useremail,
            userrealname: s.state.userData.userrealname,
            dateofbirth: s.state.userData.dateofbirth,
            datesign: s.state.userData.datesign || '阳历',
            emergencycontact: s.state.userData.useremergencycontacter,
            contactmobile: s.state.userData.useremergencycontactmobile,
            usericon: s.state.userData.portrait,
            credentials:credentialsStr,
            wxappid:s.state.userData.appid,
            wxappsecret:s.state.userData.appsecret,
            comment:'' //备注
        }

        $.ajax({
            url:window.baseUrl + 'user/edit_user/',
            data:params,
            success(data){

                if(data.getret === 0 ){
                    message.success(data.getmsg);
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })

    }

}

export default ZmitiValidateUser(ZmitiViewUserInforApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/