import React  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './static/css/index.css';
import {utilMethods,_$,$$ } from '../utilMethod.es6';

/*

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/css';*/

import {Modal,Input,Tabs,Select,Button,Form,message} from 'antd';

const FormItem = Form.Item;

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';




import ZmitiProgress from '../components/Progress.jsx';
import ZmitiScan from '../components/scan.jsx';
import './static/css/component.min.css';
import ZmitiCard from '../components/cardgroup.jsx';
import MainUI from '../components/Main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import $ from 'jquery';
class ZmitiPersonalAccApp extends React.Component{
    constructor(args){
        super(...args);
        this.state =
        {
            userData:{
                portrait:'./personalAcc/static/images/user.jpg',//用户头像
                username:'',//用户名
                useremail:'',
                usermobile:'',
                departmentname:'麟腾传媒文化有限公司',
                departmentid:'',
                companyid:'',
                companyname:'',
                userrealname:'用户真实姓名',//用户真实姓名
                usersex:'',//用户性别
                useremergencycontacter:'',//紧急联系人
                useremergencycontactmobile:'',//紧急联系人电话/
                credentials:[
                    {src: "./personalAcc/static/images/user.jpg"},
                    {src: "./personalAcc/static/images/user.jpg"},
                    {src: "./personalAcc/static/images/user.jpg"}

                ],//用户证件照片
                projectnum:222,//作品总个数.
                loginnum:24,//登录次数.
                spaceuse:'123',//空间使用量
                consume:'101',//总消费数。
                expiredate:'2016-12-13',//过期时间/
                currentVal:50,//进度条当前值,用户试用期总时间
                maxVal:100,//进度最大值,已使用的时间 (两个数据无关紧要,我最终要根据两个数据算出比例.)
            },
            modifyUserPwdDialogVisible:false,
        }
    }

    componentWillMount() {
       let {validateUser, loginOut,resizeMainHeight,getUserDetail} = this.props;
       var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
          loginOut();
       },this);
       resizeMainHeight(this);
       this.userid = userid;
       this.getusersigid = getusersigid;
       this.companyid = companyid;
       this.loginOut = loginOut;
       this.username =username;
       this.isover = isover;
       this.usertypesign = usertypesign;
       this.getUserDetail = getUserDetail;
      
    }

    componentDidMount(){

      this.setState({
        userName:this.username
      });

      var s = this;


      var userid = this.props.params.userid?this.props.params.userid:this.userid;
      
      this.getUserDetail({
        $:$,
        userid:s.userid,
        getusersigid:s.getusersigid,
        setuserid : userid,
        sussess:(data)=>{
          console.log(data);
          if(data.getret === 0){
            /*
            
       userData:{
                portrait:'./personalAcc/static/images/user.jpg',//用户头像
                
            },
             */
            var da = data.getuserinfo;
            this.state.userData={
                portrait:da.portrait||'./personalAcc/static/images/user.jpg',
                username:da.username,//用户名
                useremail:da.useremail,
                usermobile:da.usermobile,
                departmentname:da.departmentname,
                departmentid:da.departmentid,
                companyid:da.companyid,
                companyname:da.companyname,
                userrealname:da.userrealname,//用户真实姓名
                usersex:da.usersex,//用户性别
                useremergencycontacter:da.useremergencycontacter,//紧急联系人
                useremergencycontactmobile:da.useremergencycontactmobile,//紧急联系人电话/
                credentials:da.credentials,//用户证件照片
                expiredate:da.expiredate,//过期时间/
                currentVal:da.currentVal,//进度条当前值,用户试用期总时间
                maxVal:da.maxVal,//进度最大值,已使用的时间 (两个数据无关紧要,我最终要根据两个数据算出比例.)
            };
            this.forceUpdate();
          }
          else{
            message.error(data.getmsg);
          }
        }
      });
    }

    changeDate(){

    }

    save(){
       /* this.refs['save-btn'].classList.add('active');
        setTimeout(()=>{
            this.refs['save-btn'].classList.remove('active');
        },150)*/
    }

    render(){

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

        let zmitiProgressProps = {
            label:'',
            unit:1,
            isShowInfo:false
        }

         const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
         };
        let component =  <div>
               <div className="acc-header">
                   <article>
                       <div className="acc-user">
                           <div className="acc-portrait">
                               <img draggable="false" src={this.state.userData.portrait} alt=""/>
                               <div>
                                   <Button className="little-br" onClick={this.changePortrait.bind(this)}  type="primary">更换头像</Button>
                               </div>
                           </div>
                           <div className="acc-info">
                               <section className="acc-user-name">
                                   <div>
                                       <span>@{this.username}</span>
                                   </div>
                                   <div>
                                       <em href="javascript:void(0)">{this.isover === 1 ?"试用账号":"正式账号"}</em>
                                       <a href="javascript:void(0)" onClick={()=>{this.setState({modifyUserPwdDialogVisible:true})}}>重置密码</a>
                                   </div>
                               </section>
                               {this.state.userData.usermobile && <section><span>手机：</span>{this.state.userData.usermobile}</section>}
                               {this.state.userData.useremail && <section><span>邮件：</span>{this.state.userData.useremail}</section>}
                           </div>
                       </div>
                   </article>
                   {
                     this.companyid && <article>
                       <div className="acc-company">
                           <h2 className="acc-company-name">{this.state.companyName}</h2>
                           <h6 className="acc-department">{this.state.department}</h6>
                       </div>
                   </article>
                   }
                   {!this.companyid && <article>
                       <div className="acc-consume">
                           <div className="acc-msg"><span>你的账号将于{this.state.userData.expiredate}号过期</span><span>点此续费</span><span><a href="#">消费记录</a></span></div>
                           <ZmitiProgress currentVal={this.state.userData.currentVal} maxVal={this.state.userData.maxVal} {...zmitiProgressProps}></ZmitiProgress>
                       </div>
                   </article>}
               </div>
               <div className="acc-form">
                   <div className="acc-form-left">
                       <Input.Group className="acc-input-group">
                           <Input addonBefore="姓名" defaultValue={this.state.userData.userrealname} onChange={()=>{}}/>
                           <Select placeholder='性别' style={{width:300}} >
                               <Option value="0">男</Option>
                               <Option value="1">女</Option>
                               <Option value="2">我不想说</Option>
                           </Select>
                       </Input.Group>
                   </div>
                   <div className="acc-form-right">
                       <Input.Group className="acc-input-group">
                           <Input addonBefore="紧急联系人" defaultValue={this.state.userData.useremergencycontacter} onChange={()=>{}}/>
                           <Input addonBefore="紧急联系人电话" defaultValue={this.state.userData.useremergencycontactmobile} onChange={()=>{}}/>
                       </Input.Group>
                   </div>
               </div>
               <ZmitiScan {...this.state.userData}></ZmitiScan>
               <div className="acc-save-btn">
                   <Button type="primary" className="little-br" ref="save-btn" size="large" onClick={this.save.bind(this)}>保存</Button>
               </div>

               <ZmitiCard {...this.state.userData}></ZmitiCard>
               <Modal title='修改密码' visible={this.state.modifyUserPwdDialogVisible}
                  onOk={this.modifyUserPwd.bind(this)}
                  onCancel={()=>{this.setState({modifyUserPwdDialogVisible:false})}}>

                <Form >
                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>原始密码</span>}
                   hasFeedback={true}
                 >
                   <Input ref='old-pwd' placeholder='原始密码' onChange={()=>{}}/>
                   {this.state.showUserNameError && <div className='user-error'>账号不合法(6位以上的数字字母)</div>}
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>原始密码</span>}
                   hasFeedback={true}
                 >
                     <Input ref='new-pwd' placeholder='新密码' onChange={()=>{}}/>
                   {this.state.showUserNameError && <div className='user-error'>账号不合法(6位以上的数字字母)</div>}
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>原始密码</span>}
                   hasFeedback={true}
                 >
                     <Input ref='sure-pwd' placeholder='确认密码' onChange={()=>{}}/>
                   {this.state.showUserNameError && <div className='user-error'>账号不合法(6位以上的数字字母)</div>}
                 </FormItem>
                
               </Form>    
             </Modal>
            <ZmitiUploadDialog id="personAcc" {...props}></ZmitiUploadDialog>
           </div>;
        return (
          <MainUI component={component}></MainUI>
        )
    }
    changePortrait(){//更换头像

        var obserable=window.obserable;
        obserable.trigger({
            type:'showModal',
            data:{type:0,id:'personAcc'}
        })
    }
    modifyUserPwd(){//修改密码

    }
}

export default  ZmitiValidateUser(ZmitiPersonalAccApp);
/*ReactDOM.render(<ZmitiTab></ZmitiTab>,document.getElementById('fly-main'));*/
