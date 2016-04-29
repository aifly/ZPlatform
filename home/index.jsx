import './static/css/index.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods,_$,$$} from '../utilMethod.es6';
import {Progress} from 'antd';
const ProgressLine = Progress.Line;
import 'antd/lib/index.css';
class MainUI extends React.Component{
    constructor(args){
        super(...args);
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
                                <aside>
                                    <div className="head"><img src='./static/images/user.png' alt=""/></div>
                                </aside>
                                <aside>
                                    <div>早上好！<span className="current-user">@ilinten</span></div>
                                    <div className="account">账号：<span>ilinten@linten.cn</span></div>
                                    <div className="last-time"><span>2016.12.31</span>到期 <a href="#">现在续费>></a></div>
                                </aside>
                            </div>
                            <div className="capacity">
                                <span>总容量</span>
                                <ProgressLine percent={30} />
                            </div>
                            <div></div>
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