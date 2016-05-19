import './static/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button  from 'antd/lib/button';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';
const FormItem = Form.Item;


import ZmitiTextAreaBtns from './static/components/zmiti-textarea-btns.jsx';
import ZmitiMiniColor from './static/components/zmiti-minicolor.jsx';
import ZmitiChooseFile from './static/components/zmiti-choose-file.jsx';



if (!Array.from) {
    Array.from = (c)=> {
        return Array.prototype.slice.call(c);
    }
}

class ZmitiLeftApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            textClassName: "rm-text-pannel-title active",
            picClassName: "rm-pic-video-title "
        }
    }
    changePannel(e){
        this.refs.text.classList.remove('active');
        this.refs.pic.classList.remove('active');

        e.target.classList.add("active");


    }
    chooseImg(e){
        if(e.target.className.indexOf('ant-input-group-addon')>-1){
            this.refs['rm-upload'].click();
        }
    }
    render(){


        return (
            <aside id="rm-left-app" className="rm-left-app">
                <header className="rm-header">编辑图片</header>
                <section className="rm-pannel-bar">
                    <div className="rm-fill-left"> &nbsp;</div>
                    <div className={this.state.textClassName} ref="text" onClick={this.changePannel.bind(this)}>
                        文本
                    </div>
                    <div className={this.state.picClassName} ref="pic" onClick={this.changePannel.bind(this)}>
                        图片视频
                    </div>
                    <div className="rm-fill-right">
                        &nbsp;
                    </div>
                </section>
                <section className="rm-operator-C">
                    <section className="rm-operator-box active">
                        <div className="rm-operator-t">
                            <Form >
                                <FormItem
                                    label="标点链接：">
                                    <Input placeholder="http://www."/>
                                </FormItem>
                                <ZmitiTextAreaBtns label="标题文字"></ZmitiTextAreaBtns>
                                <ZmitiMiniColor></ZmitiMiniColor>
                            </Form>
                        </div>
                        <div className="rm-operator-p">
                            <ZmitiChooseFile></ZmitiChooseFile>
                        </div>
                    </section>
                </section>
            </aside>
        )
    }
}




class ZmitiRightApp extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return (
            <aside id="rm-right-app" className="rm-right-app">
                right
            </aside>
        )
    }
}

class MainUI extends React.Component{
    constructor(args){
        super(...args);
    }

    render(){
        return (
            <div className="rm-main-ui">
                <ZmitiLeftApp></ZmitiLeftApp>
                <ZmitiRightApp></ZmitiRightApp>
            </div>
        )
    }
}



ReactDOM.render(<MainUI></MainUI>,$("#fly-main")[0]);

