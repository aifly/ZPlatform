import React  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './static/css/index.css';
import {utilMethods,_$,$$ } from '../utilMethod.es6';
import { Tabs, Select,Button,Form, Input,DatePicker } from 'antd';
const FormItem = Form.Item;
import ZmitiProgress from '../components/Progress.jsx';
import ZmitiScan from '../components/scan.jsx';
import './static/css/component.min.css';
import ZmitiCard from '../components/cardgroup.jsx';
 

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ZmitiTab extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            tabPosition:'left',
            userName:"iLinten",
            phone:"15718879215",
            email:'xuc@linten.cn',
            companyName :"麟腾传媒文化有限公司",
            department:"多媒体部"
        }
    }

    

    componentDidMount(){

     /*   classie.addClass($$('.ant-tabs-tabpane'),'show-tab');

        var currentLoader = {
            id:"loader5",
            speedIn:300
        };
        this.loader = new SVGLoader( document.getElementById( currentLoader.id ), { speedIn : currentLoader.speedIn, easingIn : mina.easeinout } );*/
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
        return (
           <div>
               <div className="acc-header">
                   <article>
                       <div className="acc-user">
                           <div className="acc-portrait">
                               <img src="./static/images/user.png" alt=""/>
                               <div>
                                   <Button type="primary">更换头像</Button>
                               </div>
                           </div>
                           <div className="acc-info">
                               <section className="acc-user-name">
                                   <div>
                                       <span>{this.state.userName}</span>
                                   </div>
                                   <div>
                                       <a href="#">试用账号</a>
                                       <a href="#">重置密码</a>
                                   </div>
                               </section>
                               <section><span>手机：</span>{this.state.phone}</section>
                               <section><span>邮件：</span>{this.state.email}</section>
                           </div>
                       </div>
                   </article>
                   <article>
                       <div className="acc-company">
                           <h2 className="acc-company-name">{this.state.companyName}</h2>
                           <h6 className="acc-department">{this.state.department}</h6>
                       </div>
                   </article>
                   <article>
                       <div className="acc-consume">
                           <div className="acc-msg"><span>你的账号将于2016年12月31号过期</span><span>点此续费</span><span><a href="#">消费记录</a></span></div>
                           <ZmitiProgress {...zmitiProgressProps}></ZmitiProgress>
                       </div>
                   </article>
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
           </div>
        )
    }
}


ReactDOM.render(<ZmitiTab></ZmitiTab>,document.getElementById('fly-main'));
