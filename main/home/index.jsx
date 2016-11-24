import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods,_$,$$} from '../utilMethod.es6';

import Progress from 'antd/lib/progress';
import Tabs from 'antd/lib/tabs';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/progress/style/css';
import 'antd/lib/tabs/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
const MonthPicker = DatePicker.MonthPicker;
import ZmitiStep from '../components/step.jsx';
const TabPane = Tabs.TabPane;
const ProgressLine = Progress.Line;
import ZmitiTab from '../components/tab.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiProgress from '../components/Progress.jsx';
import ZmitiProductList from '../components/product-list.jsx';
import MainUI from '../components/Main.jsx';

 class ZmitiHomeApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            currentAcc:"ilinten@linten.cn",
            currentUser:"iLinten",
            lastTime:"2016.12.31",
            curUsersCount:5,
            mainHeight:600,
            maxUsersCount:10,
            isCompany:true //当前登录用户是否是企业账号
        }
    }

    componentWillMount() {
       let  {resizeMainHeight} = this.props;
            resizeMainHeight(this);
    }

    componentDidMount(){
        
        this.setState({
            currentUser:this.username,
            mainHeight:document.documentElement.clientHeight - 50
        });

        
    }

    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            iNow++;
            loginOut();
        },this);
        resizeMainHeight(this);
        
        if(iNow === 1){
            return <div></div>;    
        }
    

        let zmitiProgressProps = {
            currentVal:700,
            label:'总容量',
            unit:1024,
            maxVal:1
        }

        const steps = [{
            title: '已下发'
        }, {
            title: '已接收'
        }, {
            title: '进行中'
        }, {
            title: '已完成'
        }];

        let style={
            height:248,
            margin:'0 auto'
        }
        let component =  <div className="home-main" style={{height:this.state.mainHeight}}>
                <header className="header">
                    公告：智媒体新增新的交互工具"富图片"。<a href="#">点此查看</a>
                </header>
                <article className="fly-home-content">
                    <div className="fly-home-user">
                        <figure className="user">
                            <div className="user-info">
                                <aside className="user-head">
                                    <div className="head"><img draggable="false" src='./home/static/images/user.png' alt=""/></div>
                                </aside>
                                <aside className="user-content">
                                    <div><span style={{color:'#f90'}}>早上好！</span><span className="current-user">@{this.state.currentUser}</span></div>
                                    <div className="account">账号：<span>{this.state.currentAcc}</span></div>
                                    <div className="last-time"><span>{this.state.lastTime}</span>到期 <a href="#">现在续费>></a></div>
                                </aside>
                            </div>
                            <div className="capacity">
                                <ZmitiProgress {...zmitiProgressProps}></ZmitiProgress>
                                <div className="dilatation">
                                    <a href="#">扩充&gt;&gt;</a>
                                </div>
                            </div>
                            <div className="user-count">
                                <div className="u-info">
                                    <span><span style={{color:'#00ada7'}}>{this.state.curUsersCount}</span>/{this.state.maxUsersCount}</span>
                                    <span>最高上限为100人</span>
                                </div>
                                <div className="u-info">
                                    <a href="#">扩充&gt;&gt;</a>
                                </div>
                            </div>
                        </figure>
                        <figure className="module">
                            <ZmitiTab></ZmitiTab>
                        </figure>
                        <figure className="msg">
                             <h2 className="product-title">新产品发布</h2>
                            <ZmitiProductList key="1"></ZmitiProductList>
                        </figure>
                    </div>
                    <div className="fly-home-office" style={{display:this.state.isCompany?'':'none'}}>
                        <figure className='office'>
                           <div className="off-left">
                               <h2>办公系统</h2>
                               <section className="task-state">
                                   <article className="new-task">
                                       <span>新任务</span>
                                       <div><span>15</span>/条</div>
                                   </article>
                                   <article className="task-running">
                                       <span>进行中</span>
                                       <div><span>34</span>/条</div>
                                   </article>
                                   <article className="task-complete">
                                       <span>已完成</span>
                                       <div><span>50</span>/条</div>
                                   </article>
                               </section>
                               <div className="task-btns">
                                   <Button  size="large">下达任务</Button>
                                   <Button  size="large">提交任务</Button>
                               </div>
                           </div>
                           <div className="off-right">
                               <h2>
                                   您还有 <span><a href="#">5条</a></span>任务没有完成  <span><a href="#">2条</a></span>需要审核 <span><a
                                   href="#">10条</a></span>到期未提交
                               </h2>
                                <div><ZmitiStep current="1" name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep current="2" name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep current="3" name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep current="4" name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                           </div>
                        </figure>
                        <figure className="work">
                            <h2>考勤系统</h2>
                            <section className="attendance-C">
                                <article className="att-work-time">

                                    <div className="att-time">
                                        <aside>
                                            <div>上班</div>
                                            <div>09:00</div>
                                        </aside>
                                        <aside>
                                            <span className="att-p-time">8:50</span>
                                            <div><span>电脑端:</span><span>172.16.89.237</span></div>
                                        </aside>
                                    </div>

                                    <div className="att-time">
                                        <aside>
                                            <div>下班</div>
                                            <div>18:00</div>
                                        </aside>
                                        <aside>
                                            <span className="att-p-time">19:50</span>
                                            <div><span>电脑端:</span><span>172.16.89.237</span></div>
                                        </aside>
                                    </div>
                                    <div className="task-btns">
                                        <Button  size="large">签退</Button>
                                    </div>
                                </article>
                                <article className="att-month">
                                    <MonthPicker size="small" defaultValue="2016-6" />
                                    <div className="behavior"><span>迟到</span>: <span>12</span></div>
                                    <div className="behavior"><span>旷工</span>: <span>0</span></div>
                                    <div className="behavior"><span>请假</span>: <span>1</span></div>
                                    <div className="behavior"><span>旷时</span>: <span>0</span></div>
                                    <div className="behavior"><span>调休</span>: <span>4</span></div>
                                </article>
                            </section>

                        </figure>

                    </div>
                    <div className="fly-home-service">
                        <h2 className="fly-home-ser-title">产品与服务</h2>
                        <div className="fly-home-service-C">
                            <figure className="fly-home-service-item">
                                <Card  title="产品工具系列" style={style} >
                                    <ul>
                                        <li>移动微场景 <a href="#">申请使用</a></li>
                                        <li>微信问答</li>
                                        <li>交互式富图片</li>
                                    </ul>
                                </Card>
                            </figure>
                            <figure className="fly-home-service-item">
                                <Card  title="产品交互系列"  style={style}>
                                    <ul>
                                        <li>企业项目管理</li>
                                        <li>设计图讨论工具</li>
                                    </ul>
                                </Card>
                            </figure>
                            <figure className="fly-home-service-item">
                                <Card  title="项目服务系列" style={style} >
                                    <ul>
                                        <li>互联网整体文字服务</li>
                                        <li>设计类服务<a href="#"><i>已使用 134个作品</i></a></li>
                                        <li>交互方案服务</li>
                                        <li>页面服务</li>
                                        <li>方案书服务</li>
                                    </ul>
                                </Card>
                            </figure>
                            <figure className="fly-home-service-item">
                                <Card  title="人工工具系列" style={style} >
                                    <ul>
                                        <li>会员服务问答</li>
                                        <li>非会员服务问答</li>
                                    </ul>
                                </Card>
                            </figure>
                        </div>
                    </div>
                </article>
            </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }
}

export default ZmitiValidateUser(ZmitiHomeApp);

/*ReactDOM.render(<ZmitiHomeApp></ZmitiHomeApp>,_$("#fly-main"));*/

/*
((document,window)=>{
    let zmitiTab = new ZmitiTab();
    window.addEventListener('resize',()=>{

    });
})(document,window)*/
