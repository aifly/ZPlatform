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

import {Modal,Input,Tabs,Select,Button,Form} from 'antd';

const FormItem = Form.Item;



import ZmitiProgress from '../components/Progress.jsx';
import ZmitiScan from '../components/scan.jsx';
import './static/css/component.min.css';
import ZmitiCard from '../components/cardgroup.jsx';
import MainUI from '../components/Main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ZmitiPersonalAccApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            tabPosition:'left',
            userName:"iLinten",
            phone:"",
            modifyUserPwdDialogVisible:false,
            email:'xuc@linten.cn',
            companyName :"麟腾传媒文化有限公司",
            department:"多媒体部"
        }
    }

    componentWillMount() {
       let {validateUser, loginOut} = this.props;
       var {userid, getusersigid, companyid,username,isover}=validateUser();
       this.userid = userid;
       this.getusersigid = getusersigid;
       this.companyid = companyid;
       this.loginOut = loginOut;
       this.username =username;
       this.isover = isover;
      
    }

    componentDidMount(){

      this.setState({
        userName:this.username
      })

     /*   classie.addClass($$('.ant-tabs-tabpane'),'show-tab');

        var currentLoader = {
            id:"loader5",
            speedIn:300
        };
        this.loader = new SVGLoader( document.getElementById( currentLoader.id ), { speedIn : currentLoader.speedIn, easingIn : mina.easeinout } );*/
        //console.log(this.props.params)
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

        let zmitiProgressProps = {
            currentVal:90,
            label:'',
            unit:1,
            maxVal:100,
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
                               <img src="./personalAcc/static/images/user.jpg" alt=""/>
                               <div>
                                   <Button type="primary">更换头像</Button>
                               </div>
                           </div>
                           <div className="acc-info">
                               <section className="acc-user-name">
                                   <div>
                                       <span>@{this.state.userName}</span>
                                   </div>
                                   <div>
                                       <em href="javascript:void(0)">{this.isover === 1 ?"试用账号":"正式账号"}</em>
                                       <a href="javascript:void(0)" onClick={()=>{this.setState({modifyUserPwdDialogVisible:true})}}>重置密码</a>
                                   </div>
                               </section>
                               {this.state.phone && <section><span>手机：</span>{this.state.phone}</section>}
                               {this.state.email && <section><span>邮件：</span>{this.state.email}</section>}
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
                           <div className="acc-msg"><span>你的账号将于2016年12月31号过期</span><span>点此续费</span><span><a href="#">消费记录</a></span></div>
                           <ZmitiProgress {...zmitiProgressProps}></ZmitiProgress>
                       </div>
                   </article>}
               </div>
               <div className="acc-form">
                   <div className="acc-form-left">
                       <Input.Group className="acc-input-group">
                           <Input addonBefore="姓名"/>
                           <Select placeholder='性别' style={{width:300}} >
                               <Option value="0">男</Option>
                               <Option value="1">女</Option>
                               <Option value="2">我不想说</Option>
                           </Select>
                       </Input.Group>
                   </div>
                   <div className="acc-form-right">
                       <Input.Group className="acc-input-group">
                           <Input addonBefore="紧急联系人"/>
                           <Input addonBefore="紧急联系人电话"/>
                       </Input.Group>
                   </div>
               </div>
               <ZmitiScan></ZmitiScan>
               <div className="acc-save-btn">
                   <Button type="primary" ref="save-btn" size="large" onClick={this.save.bind(this)}>保存</Button>
               </div>

               <ZmitiCard></ZmitiCard>
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
           </div>;
        return (
          <MainUI component={component}></MainUI>
        )
    }
    modifyUserPwd(){//修改密码

    }
}

export default  ZmitiValidateUser(ZmitiPersonalAccApp);
/*ReactDOM.render(<ZmitiTab></ZmitiTab>,document.getElementById('fly-main'));*/
