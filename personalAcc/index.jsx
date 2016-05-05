import React  from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/index.css';
import './static/css/index.min.css';
import { Tabs, Select,Button } from 'antd';
import ZmitiProgress from '../components/Progress.jsx'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ZmitiTab extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            tabPosition:'left',
            userName:"iLinten",
            phone:"15718879215",
            email:'xuc@linten.cn'
        }
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
            <Tabs tabPosition={this.state.tabPosition}>
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
                                <h2 className="acc-company-name">麟腾传媒文化有限公司</h2>
                                <h6 className="acc-department">多媒体部</h6>
                            </div>
                        </article>
                        <article>
                            <div className="acc-consume">
                                <div className="acc-msg"><span>你的账号将于2016年12月31号过期</span><span>点此续费</span><span><a href="#">消费记录</a></span></div>
                                <ZmitiProgress {...zmitiProgressProps}></ZmitiProgress>
                            </div>
                        </article>
                    </div>
                </TabPane>
                <TabPane tab="正式个人账户" key="2">正用个人账户内容</TabPane>
            </Tabs>
        )
    }
}


ReactDOM.render(<ZmitiTab></ZmitiTab>,document.getElementById('fly-main'));
