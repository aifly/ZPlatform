import './static/css/index.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods,_$,$$} from '../utilMethod.es6';
import {Progress} from 'antd';
const ProgressLine = Progress.Line;
import 'antd/lib/index.css';
import FlyProgress from '../components/Progress.jsx';
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
                                    <div className="head"><img src='./static/images/user.png' alt=""/></div>
                                </aside>
                                <aside className="user-content">
                                    <div><span style={{color:'#f90'}}>早上好！</span><span className="current-user">@{this.state.currentUser}</span></div>
                                    <div className="account">账号：<span>{this.state.currentAcc}</span></div>
                                    <div className="last-time"><span>{this.state.lastTime}</span>到期 <a href="#">现在续费>></a></div>
                                </aside>
                            </div>
                            <div className="capacity">
                                <FlyProgress label="总容量" unit={1024} maxVal={1}></FlyProgress>
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
                            2
                        </figure>
                        <figure className="msg">
                             2
                        </figure>
                    </div>
                    <div className="fly-office">
                        <figure className='office'>
                            1
                        </figure>
                        <figure className="work">
                            2
                        </figure>

                    </div>
                </article>
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>,_$("#fly-main"));