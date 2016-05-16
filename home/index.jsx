import './static/css/index.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods,_$,$$} from '../utilMethod.es6';
import {Progress,Tabs,Card,Button,DatePicker } from 'antd';
const MonthPicker = DatePicker.MonthPicker;
import ZmitiStep from '../components/step.jsx';
const TabPane = Tabs.TabPane;
const ProgressLine = Progress.Line;
import ZmitiTab from '../components/tab.jsx';
import 'antd/dist/antd.css';
import ZmitiProgress from '../components/Progress.jsx';
import ZmitiProductList from '../components/product-list.jsx';
class MainUI extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            currentAcc:"ilinten@linten.cn",
            currentUser:"iLinten",
            lastTime:"2016.12.31",
            curUsersCount:5,
            maxUsersCount:10
        }
    }

    render(){

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

        return(
            <div className="main">
                <header className="header">
                    公告：智媒体新增新的交互工具"富图片"。<a href="#">点此查看</a>
                </header>
                <article className="fly-content">
                    <div className="fly-user">
                        <figure className="user">
                            <div className="user-info">
                                <aside className="user-head">
                                    <div className="head"><img draggable="false" src='./static/images/user.png' alt=""/></div>
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
                                <div className="u-info">总用户</div>
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
                    <div className="fly-office">
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
                                <div><ZmitiStep name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
                                <div><ZmitiStep name="智媒体研发" size="small" steps={steps}></ZmitiStep></div>
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
                </article>
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>,_$("#fly-main"));

/*
((document,window)=>{
    let zmitiTab = new ZmitiTab();
    window.addEventListener('resize',()=>{

    });
})(document,window)*/
