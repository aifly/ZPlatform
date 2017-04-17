import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip,Progress,Select,message,Popconfirm,notification} from '../commoncomponent/common.jsx';
const { Option, OptGroup } = Select;



import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;
const { Header, Content } = Layout;

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: '您已不再是管理员！',
        description: '您修改管理员后，将不再具备管理员权限。系统将带您转向个人中心页面',
    });
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ZmitiViewUserInforApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            mainHeight:document.documentElement.clientHeight - 50,
            projectlist:[],
            companyData:{
                companyadmin:'',//公司管理员
                companyadminid:'',//公司管理员ID
                useremail:'',//用户邮箱
                companyadminphone:'',//管理员电话
                companyid:'',
                appid:'',
                appsecret:'',
                companyname:'',
                companyaddress:'',
                businesslicensenumber:'',
                enddate:'',
                capacity:'',
                capacitied:'',
                capacityratio:'',
                companynum:'',
                usernumber:'',
                companynumratio:'',
                worksNumber:'',
                companylogourl:'',
                contract:'',
                companydocumetn:'',
                companytotalprice:'',
                departmentData:[]
            }
		};
	}

	render() {
        var s =this;

        var mainComponent =
			<div className="viewuserinfor-main" style={{height:this.state.mainHeight}} >
				<div className="viewuserinfor-persion">
					<Row gutter={16}>
						<Col span={14} >
							<div className="viewuserinfor-all">
								<div className="userFace">
									<img src={this.state.companyData.companylogourl}/>
									<div className="editUserIco">
										<a href="#" className="icoEdit">修改</a>
									</div>
								</div>
								<div className="companyName">{this.state.companyData.companyname}</div>
								<div className="hr10"></div>
								<div className="information">
									<ul>
										<li className="companyupdatestyle">

                                            <span>
                                                <Select value={this.state.companyData.companyadmin} className={"companyupdatestyle-inner " + (this.state.modifyAdmin?'active':'')} onChange={this.companyadminChange.bind(this)}>

                                                    {this.state.companyData.departmentData.map((item,i)=>{

                                                        return <Option  key={i} value={item.username}>{item.username}</Option>
                                                    })}

                                                </Select>
                                            </span>
                                            <label>公司管理员：</label>{this.state.companyData.companyadmin}&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Popconfirm title="修改管理员后，您将不再具备管理员权限。您确定要修改吗？" onConfirm={this.updatecompanyadmin.bind(this)} onCancel="" okText="确认修改" cancelText="暂不修改">
                                                    <a className="c2" href="javasctip:void(0);" >修改</a>
                                                </Popconfirm>&nbsp;&nbsp;&nbsp;&nbsp;<label>管理员电话：</label>{this.state.companyData.companyadminphone}
										</li>
										<li>
											<label>营业注册号：</label>{this.state.companyData.businesslicensenumber}&nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-c1">查看扫描件</Button>&nbsp;<Button className="btn-c1">查看合同</Button>
										</li>
										<li>
											<label>公司地址：</label>{this.state.companyData.companyaddress}&nbsp;&nbsp;&nbsp;&nbsp;<a className="c2" href="#">修改</a>
										</li>
									</ul>
								</div>
							</div>
						</Col>
						<Col span={10} >
							<div >
								<span className="viewuserinfor-dates">您的帐号将于 <span className="c1">{this.state.companyData.enddate}</span> 到期</span>
								<Button className="btn-c1">前往续费</Button><Button className="btn-c2">消费记录</Button>
							</div>
							<div className="hr10"></div>
							<div className="viewuserinfor-place icoA">
								<div className="placeIco "><Icon type="hdd" /></div>
								<div className="placeNum">
									<div className="placeTip">总空间&nbsp;<a href="#">扩充&gt;&gt;</a></div>
									<Progress percent={s.state.companyData.capacityratio*1} showInfo={false} />
									<span>{s.state.companyData.capacitied}/{s.state.companyData.capacity}</span>
								</div>
							</div>
							<div className="hr20"></div>
							<div className="viewuserinfor-place icoB">
								<div className="placeIco "><Icon type="user" /></div>
								<div className="placeNum">
									<div className="placeTip">用户数&nbsp;<a href="#">扩充&gt;&gt;</a></div>
									<Progress percent={s.state.companyData.companynumratio*1} showInfo={false} />
									<span>{this.state.companyData.usernumber}/{this.state.companyData.companynum}</span>
								</div>
							</div>
							<div className="hr20"></div>
							<div className="size18">微信公众号设置</div>
							<div className="viewuserinfor-weixin">
								<ul>
									<li><Input addonBefore='AppId' type='text' value={this.state.companyData.appid} onChange={(e)=>{this.state.companyData.appid=e.target.value;this.forceUpdate()}} placeholder='appid'/></li>
									<li><Input addonBefore='appsecret' type='text' placeholder='appsecret' value={this.state.companyData.appsecret} onChange={(e)=>{this.state.companyData.appsecret=e.target.value;this.forceUpdate()}}/></li>
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
								<div className="viewnums"><span className="a1">{s.state.companyData.worksNumber}</span>个</div>
							</div>
						</li>
						<li>
							<div className="viewuserinfor-col">
								<h5><div><span>总部门数</span></div></h5>
								<div className="viewnums"><span className="a2">{this.state.companyData.departmentCount}</span>个</div>
							</div>
						</li>
						<li>
							<div className="viewuserinfor-col">
								<h5><div><span>总人数</span></div></h5>
								<div className="viewnums"><span className="a3">{this.state.companyData.usernumber}</span>人</div>
							</div>
						</li>
						<li>
							<div className="viewuserinfor-col">
								<h5><div><span>空间使用量</span></div></h5>
								<div className="viewnums"><span className="a4">{this.state.companyData.capacitied.replace(/mb|m|MB|M|GB/ig,"")}</span>G</div>
							</div>
						</li>
						<li>
							<div className="viewuserinfor-col">
								<h5><div><span>总消费</span></div></h5>
								<div className="viewnums"><span className="a5">{this.state.companytotalprice}</span>元</div>
							</div>
						</li>
					</ul>
					<div className="clear"></div>
				</div>
				<div className="hr40"></div>
				<div className="viewuserinfo-works">
					<div className="tit-a1">产品与服务</div>
					
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
    updatecompanyadmin(){
	    var s=this
        s.setState({
            modifyAdmin:true
        });
	    s.getcompanyuserlist();


    }
    //获取公司的部门及用户
    getcompanyuserlist(){

        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_departmentlist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setcompanyid:s.state.companyData.companyid,
            },
            success(data){
                if(data.getret === 0){
                    s.state.companyData.departmentData = data.getdata.treeData[0].userList;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    componentDidMount(){

        var s = this;
        s.getCompanydetail();
        s.getCompanywx();
        s.getumber();
        s.getprojectlist();
        s.getcompanytotalprice();



    }
    getCompanydetail(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companydetail',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                    s.state.companyData.companyname=data.detail_info.companyname;
                    s.state.companyData.companyadmin=data.detail_info.companyadmin;
                    s.state.companyData.companylogourl=data.detail_info.companylogourl;
                    if(s.state.companyData.companylogourl===""){
                        s.state.companyData.companylogourl="./static/images/userinfor-face.jpg"
                    }
                    s.state.companyData.companyadminphone=data.detail_info.companyadminphone;
                    s.state.companyData.departmentCount=data.detail_info.departmentCount;
                    s.state.companyData.companyaddress=data.detail_info.companyaddress;
                    s.state.companyData.businesslicensenumber=data.detail_info.businesslicensenumber;
                    if(s.state.companyData.businesslicensenumber==="" || s.state.companyData.businesslicensenumber === null){
                        s.state.companyData.businesslicensenumber=<a className="c2" href="#">增加</a>;
                    }
                    s.state.companyData.enddate=data.detail_info.enddate;
                    s.state.companyData.capacity=data.detail_info.capacity;
                    s.state.companyData.capacitied=data.detail_info.capacitied;
                    var strcapacitied=s.state.companyData.capacitied;
                    var strcapacity=s.state.companyData.capacity;
                    s.state.companyData.capacityratio=(strcapacitied.replace(/mb|m|MB|M|GB/ig,"")*1)/(strcapacity.replace(/mb|m|MB|M|GB/ig,"")*1)*100;
                    s.state.companyData.companynum=data.detail_info.companynum;
                    s.state.companyData.usernumber=data.detail_info.usernumber;
                    var strusernumber=s.state.companyData.usernumber;
                    var strcompanynum=s.state.companyData.companynum;
                    s.state.companyData.companyid=data.detail_info.companyid;

                    s.state.companyData.companynumratio=(strusernumber*1)/(strcompanynum*1)*100;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    getCompanywx(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companywx',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){

                if(data.getret === 0){
                    s.state.companyData.appid=data.wxappid;
                    s.state.companyData.appsecret=data.wxappsecret;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    getumber(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companyworksnum',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){

                if(data.getret === 0){
                    s.state.companyData.worksNumber=data.worksnum;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    getprojectlist(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'product/get_product/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){

                if(data.getret === 0){
                    s.state.projectlist=data.productlist;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    getcompanytotalprice(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companytotalprice',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                    s.state.companytotalprice=data.totalprice;
                    if(s.state.companytotalprice==="" ){
                        s.state.companytotalprice=0;
                    }
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }
    //改变公司管理员用户
    companyadminChange(e){
        var s= this;
        console.log(s.state.companyData.departmentData)

        s.state.companyData.companyadmin = e;

        s.state.companyData.departmentData.map((item,i)=>{
            if(item.username === e){
                s.state.companyData.companyadminphone  = item.mobile;
                s.state.companyData.companyadminid=item.key;
            }
        })
        s.forceUpdate();
        $.ajax({
            url:window.baseUrl+'company/changer_companyadmin',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setuserid:s.state.companyData.companyadminid,
            },
            success(data){
                console.log(data);
                if(data.getret === 0){
                    message.success("管理员修改成功",3);
                    openNotificationWithIcon('info');
                    setTimeout(()=>{

                        location.hash='/';
                    },2000)
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })
    }

}

export default ZmitiValidateUser(ZmitiViewUserInforApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/