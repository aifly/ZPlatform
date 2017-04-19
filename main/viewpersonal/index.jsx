import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Slider,Icon,Steps,Form,DatePicker , Input,Button, Row, Col,Layout ,Tooltip,Progress,Select,message,Popconfirm,Modal,Table,moment} from '../commoncomponent/common.jsx';
const { Option, OptGroup } = Select;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
import ZmitiProgress from '../components/Progress.jsx';
import ZmitiCard from '../components/cardgroup.jsx';
import ZmitiScan from '../components/scan.jsx';
import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;
const { Header, Content } = Layout;
const dateFormat = 'YYYY-MM-DD';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
function onChangedate(date, dateString) {
  console.log(date,dateString);
}
class ZmitiViewPersonalApp extends Component {

	constructor(args){
        super(...args);
        this.state =
        {
            mainHeight:document.documentElement.clientHeight-50,
            showCredentialsDiolog:false,
            isExpire:false,//是否过期
            isFullSpace:false,//使用空间是否已满
            oldPwd:'',
            newPwd:'',
            surePwd:'',
            userData:{
                portrait:'./viewpersonal/static/images/notify.jpg',//用户头像
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
                dateofbirth:'2011-12-31',
                useremergencycontacter:'',//紧急联系人
                useremergencycontactmobile:'',//紧急联系人电话/
                credentials:[

                ],//用户证件照片
              
                expiredate:'2016-12-13',//过期时间/
                currentVal:50,//进度条当前值,用户试用期总时间
                maxVal:100,//进度最大值,已使用的时间 (两个数据无关紧要,我最终要根据两个数据算出比例.)
                projectnum:'',//作品总个数.
                loginnum:'',//登录次数.
                spaceuse:'',//空间使用量
                consume:'',//总消费数
            },
            modifyUserPwdDialogVisible:false,
            modPersonalDialogVisible:false,

        }
    }

	render() {
        var s =this;
        const { disabled } = s.state;
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
			<div className="viewpersonal-main-ui" style={{height:this.state.mainHeight}} >
				<div className="viewuserinfor-persion">
					<Row gutter={16}>
						<Col span={14} >
							<div className="viewuserinfor-all">
								<div className="userFace">
									<img src={this.state.userData.portrait}/>
									<div className="editUserIco">
										<Button className="viewpersonal-icoEdit" onClick={this.changePortrait.bind(this)}>修改</Button>
									</div>
								</div>
								<div className="viewpersonal-user-pass">
                    <span>{this.username}</span>
                    <Button className="btn-c1" onClick={()=>{this.setState({modifyUserPwdDialogVisible:true})}}>重置密码</Button>
								    <div className="clear"></div>
                </div>
                <div className="hr10"></div>
								<div className="viewpersonal-information">
									<ul>
										<li className="viewpersonal-update">
                        <Row>
                          <Col span={10}><label>手机：</label>{this.state.userData.usermobile}</Col>
                          <Col span={14}><label>邮箱：</label>{this.state.userData.useremail}
                            <a className="c2" href="javasctip:void(0);" onClick={()=>{this.setState({modPersonalDialogVisible:true})}} >修改</a>
                          </Col>
                        </Row>
                                            
                                            
										</li>
										
									</ul>
								</div>
							</div>
						</Col>
						<Col span={10} >
							<div >
								<span className="viewuserinfor-dates">您的帐号将于 <span className="c1">{this.state.userData.expiredate}</span> 到期</span>
								<Button className="btn-c1">前往续费</Button><Button className="btn-c2">消费记录</Button>
							</div>
							<div className="hr10"></div>
							<div className="viewuserinfor-place icoA">
								<div className="placeIco "><Icon type="hdd" /></div>
								<div className="placeNum">
									<div className="placeTip">总空间&nbsp;<a href="#">扩充&gt;&gt;</a></div>
									<Progress percent={50} showInfo={false} />
                  <span>{this.state.userData.currentVal}M/{this.state.userData.maxVal}</span>
								</div>
							</div>
							
						</Col>
					</Row>
				</div>
				<div className="hr50"></div>
        
        <div className="viewpersonal-forms">
          <Form>
          <Row gutter={30}>
            <Col span={6}>
              <div className="label">姓名:</div>
              <Input placeholder="真实姓名"
                value={this.state.userData.userrealname} onChange={(e)=>{this.state.userData.userrealname=e.target.value;this.forceUpdate();}}
              />
            </Col>
            <Col span={3} >
              <div className="label">性别：</div>
              <Select placeholder='性别'  onChange={(value)=>{this.state.userData.usersex=value;this.forceUpdate();}} value={this.state.userData.usersex}>
                               <Option value={'1'}>男</Option>
                               <Option value={'2'}>女</Option>
                           </Select>
            </Col>
            <Col span={3} >
              <div className="label">出生日期：</div>
              <DatePicker
                      format="YYYY-MM-DD"
                      onChange={this.changeDateOfBirth.bind(this)}
                      value={moment(this.state.userData.dateofbirth,dateFormat)}
                      size={'default'} />
            </Col>
            <Col span={6}>
              <div className="label">紧急联系人: </div>
              <Input
                placeholder="突发状况的联系人" 
                value={this.state.userData.useremergencycontacter} onChange={(e)=>{this.state.userData.useremergencycontacter=e.target.value;this.forceUpdate();}}
              />
            </Col>
            <Col span={6}>
              <div className="label">紧急联系人电话： </div>
              <Input
                placeholder="真实联系方式"
                value={this.state.userData.useremergencycontactmobile}
                onChange={(e)=>{this.state.userData.useremergencycontactmobile=e.target.value;this.forceUpdate();}}
               />
            </Col>
          </Row>
          <div className="hr10"></div>
          <Button className="ipt-btn5" type='submit' onClick={this.save.bind(this)}>保存</Button>
          </Form>
        </div>
        <div className="hr40"></div>
        <ZmitiScan {...this.state.userData}></ZmitiScan>
        <Slider defaultValue={0} disabled={disabled} />
				<div className="viewpersonal-nums">
					<ul>
						<li>
							<div className="viewpersonal-col">
								<h5><div><span>总计作品</span></div></h5>
								<div className="viewnums"><span className="a1">{this.state.userData.projectnum || 0}</span>个</div>
							</div>
						</li>
						<li>
							<div className="viewpersonal-col">
								<h5><div><span>总登录次数</span></div></h5>
								<div className="viewnums"><span className="a2">{this.state.userData.loginnum || 1}</span>个</div>
							</div>
						</li>
						<li>
							<div className="viewpersonal-col">
								<h5><div><span>总消费数</span></div></h5>
								<div className="viewnums"><span className="a3">{this.state.userData.consume || 0}</span>元</div>
							</div>
						</li>
						<li>
							<div className="viewpersonal-col">
								<h5><div><span>空间使用量</span></div></h5>
								<div className="viewnums"><span className="a4">{this.state.userData.currentVal}</span>M</div>
							</div>
						</li>
					</ul>
					<div className="clear"></div>
				</div>
				<div className="hr40"></div>


				<div className="viewpersonal-works">
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
                <Modal title='修改密码' visible={this.state.modifyUserPwdDialogVisible}
                      onOk={this.modifyUserPwd.bind(this)}
                      onCancel={()=>{this.setState({modifyUserPwdDialogVisible:false})}}>

                    <Form >
                     <FormItem
                       {...formItemLayout}
                       label={<span><span style={{color:'red',marginRight:4,}}>*</span>原始密码</span>}
                       hasFeedback={true}
                     >
                       <Input type='password' ref='old-pwd' onFocus={()=>{this.setState({showOldPwdError:false})}} defaultValue={this.state.oldPwd} placeholder='原始密码' onChange={()=>{}}/>
                       {this.state.showOldPwdError && <div className='user-error'>原始密码不能为空</div>}
                     </FormItem>

                      <FormItem
                       {...formItemLayout}
                       label={<span><span style={{color:'red',marginRight:4,}}>*</span>新密码</span>}
                       hasFeedback={true}
                     >
                         <Input type='password' ref='new-pwd' onFocus={()=>{this.setState({showNewPwdError:false})}} defaultValue={this.state.newPwd} placeholder='新密码' onChange={()=>{}}/>
                       {this.state.showNewPwdError && <div className='user-error'>新密码不能为空</div>}
                     </FormItem>

                      <FormItem
                       {...formItemLayout}
                       label={<span><span style={{color:'red',marginRight:4,}}>*</span>确认新密码</span>}
                       hasFeedback={true}
                     >
                         <Input type='password' ref='sure-pwd' onFocus={()=>{this.setState({showSurePwdError:false})}}  defaultValue={this.state.surePwd} placeholder='确认密码' onChange={()=>{}}/>
                       {this.state.showSurePwdError && <div className='user-error'>确认新密码不能为空 </div>}
                     </FormItem>
                    
                   </Form>    
                 </Modal>
                 <Modal title="修改手机与邮箱" visible={this.state.modPersonalDialogVisible}
                    onOk={this.modmobilemailOk.bind(this)} 
                    onCancel={()=>{this.setState({modPersonalDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="手机"
                        hasFeedback
                      >                        
                          <Input type='text' ref='usermobile'  />                        
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                      >                        
                          <Input type='text' ref='useremail'  />                        
                      </FormItem>
                    </Form>
                  </Modal>


			</div>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

  changeDateOfBirth(value){
     this.state.userData.dateofbirth = value.format('YYYY-MM-DD');
     this.forceUpdate();
  }


	componentWillMount() {
       let {validateUser, loginOut,resizeMainHeight,getUserDetail,validateUserRole,isSuperAdmin,isNormalAdmin} = this.props;
       var {userid, getusersigid, companyid,username,isover,usertypesign,capacitied,capacity,endDate}=validateUser(()=>{
          loginOut();
       },this);

       this.getUserDetail = getUserDetail;
       this.validateUserRole=  validateUserRole;
       this.loginOut = loginOut;
       this.isSuperAdmin = isSuperAdmin;
       this.isNormalAdmin = isNormalAdmin;
       resizeMainHeight(this);
    }    
    
    componentDidMount(){

      this.setState({
        userName:this.username
      });

      var s = this;

      this.validateUserRole(this,obj=>{
          if(!s.isSuperAdmin(this) && !s.isNormalAdmin(this)){//不是管理员，也不是超级管理员
                s.setState({
                  isExpire:obj.isExpire,
                  isFullSpace:obj.isFullSpace,
                  msg:obj.msg
                });
            }
      })


      window.obserable.on('modifyUesrCredentials',()=>{
        this.modifyUesrCredentials();
      });

      window.obserable.on('removeCredentials',(data)=>{
          this.state.userData.credentials.splice(data,1);
          this.forceUpdate();
      });


      var userid = this.props.params.userid?this.props.params.userid:this.userid;
      this.validateUserRole(this,()=>{
         this.setState({
          isExpire:this.isExpire,
          isFullSpace:this.isFullSpace
         })
      });
      this.getUserDetail({
        $:$,
        userid:s.userid,
        getusersigid:s.getusersigid,
        setuserid : userid,
        sussess:(data)=>{
          if(data.getret === 0){
            console.log(data)
            /*
            
       userData:{
                portrait:'./personalAcc/static/images/user.jpg',//用户头像
            },
             */
            var da = data.getuserinfo;

            console.log(da)

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
                dateofbirth:da.dateofbirth || new Date(),//紧急联系人电话/
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
    save(){
        var s = this;
        var credentialsStr = '';
        s.state.userData.credentials.map((data,i) =>{
            credentialsStr+= data.src+ (i>= s.state.userData.credentials.length-1 ? '':',');  
        });

        var params = {
          userid : s.userid,
          setuserid:s.userid,
          getusersigid:s.getusersigid,
          customername: s.state.userData.userrealname,
          usersex:s.state.userData.usersex,
          dateofbirth:s.state.userData.dateofbirth,
          emergencycontact: s.state.userData.useremergencycontacter,
          contactmobile: s.state.userData.useremergencycontactmobile
        }

        console.log(params);
        $.ajax({
          url:window.baseUrl + 'user/edit_user/',
          data:params,
          success(data){
            console.log(data);
            if(data.getret === 0 ){
              message.success(data.getmsg);
            }
            else{
              message.error(data.getmsg);
            }
          }
        })

    }
    //更换头像
    changePortrait(){

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
            console.log(data)
            message[data.getret === 0?'success':'error'](data.getmsg);
            s.setState({
              modifyUserPwdDialogVisible:false
            });
        }
      })

    }
    //编辑用户信息
    modmobilemailOk(){
      var  emailTxt = this.refs['useremail'].refs.input.value;
      var  mobileTxt = this.refs['usermobile'].refs.input.value;
      if(mobileTxt.length<=0){
         this.setState({
            showMobileError:true
         })
         return 0;
      }
      if(emailTxt.length<=0){
         this.setState({
            showEmailError:true
         })
         return 0;
      }
      var s = this;
      var userid = this.props.params.userid?this.props.params.userid:this.userid;
      $.ajax({
        url:window.baseUrl + 'user/edit_user/',
        data:{
          setuserid:userid,
          userid:s.userid,
          useremail:emailTxt,
          usermobile:mobileTxt,
          getusersigid:s.getusersigid
        },
        success(data){
            //console.log(data);
            message[data.getret === 0?'success':'error'](data.getmsg);
            s.setState({
              modPersonalDialogVisible:false
            });
            window.location.reload();
        }
      })
    }
    
}

export default ZmitiValidateUser(ZmitiViewPersonalApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/