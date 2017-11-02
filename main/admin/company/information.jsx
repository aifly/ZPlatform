import React, { Component } from 'react';
import './static/css/information.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip,Progress,Select,message,Popconfirm,Modal,Table} from '../../commoncomponent/common.jsx';
const { Option, OptGroup } = Select;



import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../../public/validate-user.jsx';

import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;
const { Header, Content } = Layout;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ZmitiCompanyinformationApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            mainHeight:document.documentElement.clientHeight - 50,
            projectlist:[],
            isError:false,
            ModalText:'',
            companyData:{
                companyadmin:'wenmingzg',//公司管理员
                companyadminid:'',//公司管理员ID
                useremail:'',//用户邮箱
                companyadminphone:'15810753578',//管理员电话
                companyid:'',
                appid:'123',
                appsecret:'456',
                companyname:'',
                companyaddress:'北京市西城区宣武门西大街97号甲新华社发行楼',
                businesslicensenumber:'',
                newbusinessLicensenumber:'',
                enddate:'2018-12-31',
                capacity:'1',
                capacitied:'0.1',
                capacityratio:'',
                companynum:'10',
                usernumber:'5',
                companynumratio:'',
                worksNumber:'120',
                departmentCount:'3',
                companylogourl:'http://images.wenming.cn/web_wenming/images/Logo.jpg',
                contract:'',
                companydocumetn:'',
                companytotalprice:100,
                departmentData:[]
            },
            showfooter:null,
            wxdisable:true,
            visible: false,
            modalTitles:['上传营业执照','查看扫描件','查看合同'],
            uploadData:[],
            currentDialog:-1,//0表示是的添加营业执照 1 表示查看扫描件 2表示查看合同
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
								</div>
								<div className="companyName">{this.state.companyData.companyname}</div>
								<div className="hr10"></div>
								<div className="information">
									<ul>
										<li className="companyupdatestyle">

                                            <span>
                                                
                                            </span>
                                            <label>公司管理员：</label>{this.state.companyData.companyadmin}&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;<label>管理员电话：</label>{this.state.companyData.companyadminphone}
										</li>
										<li>
											<label>营业注册号：</label>

                                            &nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-c1" >查看扫描件</Button>&nbsp;<Button className="btn-c1" >查看合同</Button>
										</li>
										<li className="companyupdatestyle">                                            
                                            <label>公司地址：</label>{this.state.companyData.companyaddress}&nbsp;&nbsp;&nbsp;&nbsp;
										</li>
									</ul>
								</div>
							</div>
						</Col>
						<Col span={10} >
							<div >
								<span className="viewuserinfor-dates">将于 <span className="c1">{this.state.companyData.enddate}</span> 到期</span>
								<Button className="btn-c2">消费记录</Button>
							</div>
							<div className="hr10"></div>
							<div className="viewuserinfor-place icoA">
								<div className="placeIco "><Icon type="hdd" /></div>
								<div className="placeNum">
									<div className="placeTip">总空间&nbsp;</div>
									<Progress percent={s.state.companyData.capacityratio*1} showInfo={false} />
									<span>{s.state.companyData.capacitied}/{s.state.companyData.capacity}</span>
								</div>
							</div>
							<div className="hr20"></div>
							<div className="viewuserinfor-place icoB">
								<div className="placeIco "><Icon type="user" /></div>
								<div className="placeNum">
									<div className="placeTip">用户数&nbsp;</div>
									<Progress percent={s.state.companyData.companynumratio*1} showInfo={false} />
									<span>{this.state.companyData.usernumber}/{this.state.companyData.companynum}</span>
								</div>
							</div>
							<div className="hr20"></div>
                            <div className="size18">微信公众号设置<span></span></div>
							<div className="viewuserinfor-weixin">
								<ul>
									<li><Input addonBefore='AppId' type='text' value={this.state.companyData.appid}  placeholder='appid'  disabled={this.state.wxdisable} /></li>
									<li><Input addonBefore='appsecret' type='text' placeholder='appsecret' value={this.state.companyData.appsecret}    disabled={this.state.wxdisable}  /></li>
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
								<div className="viewnums"><span className="a5">{this.state.companyData.companytotalprice}</span>元</div>
							</div>
						</li>
					</ul>
					<div className="clear"></div>
				</div>


                
			</div>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}
    inputAddress(e){
	    this.state.companyData.companyaddress=e.target.value;
	    this.forceUpdate();
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



    componentDidMount(){

        var s = this;
        //s.getCompanydetail();
        //s.getCompanywx();
        //s.getumber();
        //s.getprojectlist();
       // s.getcompanytotalprice();






    }


    

    


    

}

export default ZmitiValidateUser(ZmitiCompanyinformationApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/