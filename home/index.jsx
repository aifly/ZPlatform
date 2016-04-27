
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods, _$, $$} from './utilMethod.es6';
import {Row,Col} from 'antd';
import 'antd/lib/index.css';
import './static/css/index.min.css';

class MainUI extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return (
            <section className="main">
                <header className="fly-header">
                    <div className="fly-logo"><img src="./static/images/logo.png" alt=""/></div>
                    <div className="fly-nav"><a href="#">控制平台</a></div>
                    <div className="fly-nav"><a href="#">产品与服务</a></div>
                    <div className="fly-nav"><a href="#">系统管理</a></div>
                    <div className="fly-nav"><a href="#">项目洽谈</a></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </header>
                <article className="fly-content">
                   adsd
                </article>
            </section>
        )
    }
    componentDidMount(){
        setTimeout(()=>{
            $$('.fly-nav a').forEach((a)=>{
                utilMethods.addClass(a,'active');
            });
        },0)
    }
}

ReactDOM.render(<MainUI></MainUI>,document.getElementById('fly-main'));


let util = {
    init(){

    }
};

util.init();