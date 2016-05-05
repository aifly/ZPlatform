import './static/css/index.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods,_$,$$} from '../utilMethod.es6';
import {Progress,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const ProgressLine = Progress.Line;
import ZmitiTab from '../components/tab.jsx';
import 'antd/lib/index.css';
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
                            <ZmitiProductList></ZmitiProductList>
                        </figure>
                    </div>
                    <div className="fly-office">
                        <figure className='office'>
                           开发中...
                        </figure>
                        <figure className="work">
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
