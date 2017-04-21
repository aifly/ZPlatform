import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip,Progress,Select,message,Popconfirm,Modal,Table} from '../commoncomponent/common.jsx';
const { Option, OptGroup } = Select;



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
            projectlist:[],
            isError:false,
            ModalText:'',
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
                newbusinessLicensenumber:'',
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
        const uploadColumns=[{
            title: '上传名称',
            dataIndex: 'filename',
            key: 'filename',
        },{
            title: '文件大小',
            dataIndex: 'datainfosize',
            key: 'datainfosize',
        },{
            title: '文件路径',
            dataIndex: 'datainfourl',
            key: 'datainfourl',
            className:'hidden',
        }, {
            title: '文件密码',
            dataIndex: 'filepwd',
            key: 'filepwd',
            className:'hidden',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,recoder,index)=>(
                <span className="workorder-del"><a href="javascript:void(0);" onClick={this.delUploadfile.bind(this,recoder,index)}> 删除</a></span>
            )
        },
        ];


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
											<label>营业注册号：</label>{this.state.companyData.businesslicensenumber || <a className="c2" href="javascript:void(0);" onClick={s.showModal.bind(s,0)}>增加</a>}

                                            &nbsp;&nbsp;&nbsp;&nbsp;<Button className="btn-c1" onClick={s.showModal.bind(s,1)}>查看扫描件</Button>&nbsp;<Button className="btn-c1" onClick={s.showModal.bind(s,2)}>查看合同</Button>
										</li>
										<li className="companyupdatestyle">
                                            <Input placeholder="请录入公司地址" value={this.state.companyData.companyaddress} className={"companyupdatestyle-inner " + (this.state.modifyAdress?'withAdress':'')} onChange={this.inputAddress.bind(this)} onBlur={this.updateAddress.bind(this)}></Input>
											<label>公司地址：</label>{this.state.companyData.companyaddress}&nbsp;&nbsp;&nbsp;&nbsp;<a className="c2" href="javasctipt:void(0);" onClick={this.getupdateAddress.bind(this)} >修改</a>
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
                            <div className="size18">微信公众号设置<span><a href="javascrpt:void(0)" onClick={this.modifyWxInfo.bind(this)}> {this.state.wxdisable?'点击修改':'保存'}</a></span></div>
							<div className="viewuserinfor-weixin">
								<ul>
									<li><Input addonBefore='AppId' type='text' value={this.state.companyData.appid} onChange={(e)=>{this.state.companyData.appid=e.target.value;this.forceUpdate()}} placeholder='appid'  disabled={this.state.wxdisable} /></li>
									<li><Input addonBefore='appsecret' type='text' placeholder='appsecret' value={this.state.companyData.appsecret}   onChange={(e)=>{this.state.companyData.appsecret=e.target.value;this.forceUpdate()}} disabled={this.state.wxdisable}  /></li>
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

                <Modal title={this.state.modalTitles[this.state.currentDialog]}
                       visible={this.state.visible}
                       onOk={this.handleOk.bind(this)}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleCancel.bind(this)}
                       footer={this.state.showfooter}

                >

                    {this.state.currentDialog === 0 && <div>
                        <Row gutter={16} className="rowlinght">
                            <Col span={6} >
                                统一社会信用代码：
                            </Col>
                            <Col span={18}>
                                <Input  placeholder="请录入公司营业执照的统一信用代码" onFocus={()=>{this.setState({isError:false})}} className={(this.state.isError?'error-table':'')} value={this.state.companyData.newbusinessLicensenumber} onChange={this.inputbusinesslicensenumber.bind(this)} />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                上传营业执照：
                            </Col>
                            <Col span={18}>
                                <div style={{position:'relative'}}>
                                    <Button>
                                        <Icon type="upload"  /> 附件上传
                                    </Button>
                                    <input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  style={{position:'absolute',left:0,top:0,opacity:0,cursor:'pointer'}}/>
                                    <Table columns={uploadColumns} dataSource={this.state.uploadData} showHeader={false} />
                                </div>
                            </Col>
                        </Row>
                    </div>}
                    {this.state.currentDialog === 1 && <div>
                        <p className="viewuserinfor-main-image">{s.state.companyData.companydocumetn && <img src={s.state.companyData.companydocumetn} />}</p>
                    </div>}
                    {this.state.currentDialog === 2 && <div>
                        <p className="viewuserinfor-main-image">{s.state.companyData.contract&& <img src={s.state.companyData.contract}/>}</p>
                    </div>}

                </Modal>
			</div>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}
    inputAddress(e){
	    this.state.companyData.companyaddress=e.target.value;
	    this.forceUpdate();
    }
    updateAddress(){
        var s=this
        $.ajax({
            url:window.baseUrl+'company/edit_companyinfo',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyaddress:s.state.companyData.companyaddress,
            },
            success(data){
                if(data.getret === 0){
                    message.success("公司地址修改成功");
                    s.setState({
                        modifyAdress:false
                    });
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })
    }

    modifyWxInfo(){

        if(!this.state.wxdisable){

            if(this.defaultWxInfo.wxappid === this.state.companyData.appid && this.defaultWxInfo.wxappsecret === this.state.companyData.appsecret){
                message.warning('公众好号信息没有修改，无需更新');
                this.setState({
                    wxdisable:!this.state.wxdisable
                });
                return;
            }


            this.updatewx();
        }

        this.setState({
            wxdisable:!this.state.wxdisable
        });
    }


    updatewx(){
        var s=this
        $.ajax({
            url:window.baseUrl+'company/edit_companywx',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setwxappid:s.state.companyData.appid,
                setwxappsecret:s.state.companyData.appsecret,
            },
            success(data){
                if(data.getret === 0){
                    message.success("公司微信公众号修改成功");
                    s.setState({
                        modifyAdress:false
                    });
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })
    }
    getupdateAddress(){
        var s=this
        s.setState({
            modifyAdress:true
        });
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
    //上传附件
    uploadFile() {//上传附件

        let formData = new FormData(),
            s = this;
        console.log(s.userid);
        formData.append('setupfile', this.refs['upload-file'].files[0]);
        formData.append('setuploadtype', 0);
        formData.append('setdatainfotype', 0);
        formData.append('userid', s.userid);
        formData.append('getusersigid', s.getusersigid);
        $.ajax({
            url: window.baseUrl + 'company/upload_file',
            type: 'post',
            contentType: false,
            processData: false,
            data: formData,
            success(data){
                console.log(data);

                data.getfileurlArr[0].key = s.props.randomString(8);
                s.state.uploadData.push(data.getfileurlArr[0]);
                s.forceUpdate();
            }
        });


    }
    delUploadfile(recoder,index){

        var s=this;

        $.ajax({

            url: window.baseUrl + 'user/del_workorderfile/',

            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setpwd: recoder.setpwd,
                filename: recoder.filename,
            },
            success(data){
                if (data.getret === 0) {
                    message.success("成功删除！");
                    s.state.uploadData.splice(index,1);
                    s.forceUpdate();
                }
                else if (data.getret === -3) {
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(() => {
                        location.href = '/';
                    }, 2000)
                }
                else {
                    message.error(data.getmsg);
                }


            }
        })
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
    showModal(i){
        var s=this
        s.setState({
            visible: true,
            currentDialog:i,
        });
        if(i!=0){
            s.setState({
                showfooter:null
            });
        }else {
            s.setState({
                showfooter:<Button key="btn" onClick={this.handleOk.bind(this)}>
                   确 定
                </Button>
            });
        }


    }

    //提交信息
    handleOk(){
        var s=this;
        var isOk=0;
        if(s.state.companyData.newbusinessLicensenumber==""){
            s.setState({
                isError:true
            });

        }
        else {

            this.setState({
                ModalText: '数据正在提交！',
                confirmLoading:true,

            });
            var attachment:"";
            if(s.state.uploadData.length>0) {
                attachment=s.state.uploadData[0].datainfourl;
                for(var i=1;i<s.state.uploadData.length;i++){
                    attachment=attachment + "," +s.state.uploadData[i].datainfourl;
                }
            }
            $.ajax({
                url:window.baseUrl+'company/edit_companyinfo',
                data:{
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    businesslicensenumber:s.state.companyData.newbusinessLicensenumber,
                    companydocumetn:attachment,
                },
                success(data){
                    if(data.getret === 0){
                        message.success("公司统一编码信息录入成功");
                        s.getCompanydetail();
                        s.state.companyData.businessLicensenumber = s.state.companyData.newbusinessLicensenumber;
                        s.state.visible = false;
                        s.state.confirmLoading = false;
                        s.forceUpdate();
                    }
                    else if(data.getret === -3){
                        message.error('您没有访问的权限,2秒后跳转到首页');
                        setTimeout(()=>{
                            location.href='/';
                        },2000)
                    }
                    else{
                        message.error(data.getmsg);
                    }
                }
            })


        }
    }
    handleCancel(){

        this.setState({
            visible: false,
        });
    }
    inputbusinesslicensenumber(e){
        var s=this;
        s.state.companyData.newbusinessLicensenumber = e.target.value;
        s.forceUpdate();
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
                console.log(data)
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
                    s.state.companyData.companydocumetn=data.detail_info.companydocumetn;
                    if(s.state.companyData.companydocumetn==""){
                        s.state.companyData.companydocumetn==""
                    }
                    s.state.companyData.contract=data.detail_info.contract;
                    if(s.state.companyData.contract==""){
                        s.state.companyData.contract==""
                    }

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
                    s.defaultWxInfo = {
                        wxappid : data.wxappid,
                        wxappsecret:data.wxappsecret
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
                    message.success("管理员修改成功，系统需要您重新登录以获得新的权限！",3);
                    setTimeout(()=>{

                        location.href = window.loginUrl;

                    },3000)
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