import React  from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/index.css';
import './static/css/index.min.css';
import {utilMethods,_$,$$ } from '../utilMethod.es6';
import { Tabs, Select,Button,Form, Input,DatePicker } from 'antd';
const FormItem = Form.Item;
import ZmitiProgress from '../components/Progress.jsx';
import './static/css/component.min.css';

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

    changeTab(e){

        this.id = this.id || 1;
        this.last = this.last || 1;


        if(this.last === e){
            return;
        }

        if(this.id === 1){
            this.id = 2;
            //classie.removeClass($$('.ant-tabs-tabpane')[e-1],'show');
        }
        else{
            classie.removeClass($$('.ant-tabs-tabpane')[e-1],'show-tab');
        }




        this.loader.show();
        setTimeout(()=>{
            this.loader.hide();
            classie.addClass($$('.ant-tabs-tabpane'),'show-tab');
        },800);

        this.last = e;
    }

    componentDidMount(){

        classie.addClass($$('.ant-tabs-tabpane'),'show-tab');

        var currentLoader = {
            id:"loader5",
            speedIn:300
        };
        this.loader = new SVGLoader( document.getElementById( currentLoader.id ), { speedIn : currentLoader.speedIn, easingIn : mina.easeinout } );

    }

    changeDate(){

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
            <Tabs onTabClick={this.changeTab.bind(this)} tabPosition={this.state.tabPosition}>
                <TabPane tab="试用个人账户" key="1">
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
                </TabPane>
                <TabPane tab="正式个人账户" key="2">正用个人账户内容</TabPane>
            </Tabs>
        )
    }
}


ReactDOM.render(<ZmitiTab></ZmitiTab>,document.getElementById('fly-main'));
