import './static/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import   './static/js/jquery.longShadow';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button  from 'antd/lib/button';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';
const FormItem = Form.Item;
import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/css';


import ZmitiTextAreaBtns from './static/components/zmiti-textarea-btns.jsx';
import ZmitiMiniColor from './static/components/zmiti-minicolor.jsx';
import ZmitiChooseFile from './static/components/zmiti-choose-file.jsx';
import ZmitiRipple from './static/components/zmiti-ripple.jsx';
import ZmitiBtnGroup from './static/components/zmiti-btn-group.jsx';
import ZmitiTopBanner from './static/components/zmiti-top-banner.jsx';
import ZmitiMainStage from './static/components/zmiti-main-stage.jsx';
import ZmitiModal from './static/components/zmiti-dialog.jsx';

if (!Array.from) {
    Array.from = (c)=> {
        return Array.prototype.slice.call(c);
    }
}

class ZmitiLeftApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            textClassName: "rm-text-pannel-title active rm-pannel",
            picClassName: "rm-pic-video-title rm-pannel"
        }
    }

    changePannel(e) {
        this.refs.text.classList.remove('active');
        this.refs.pic.classList.remove('active');
        e.target.classList.add("active");
        let index = $(e.target).index();
        this.refs['rm-operator-box'].classList[index - 1 ? 'add' : 'remove']('active');
        this.refs.ripple.startMove(e);

    }

    componentDidMount(){


        $('.rm-pannel').longShadow({
            colorShadow: '#990000',
            sizeShadow: 8
        });
    }

    render() {

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
                <ZmitiRipple id="rm-pannel-ripple" ref="ripple"></ZmitiRipple>
                <section className="rm-operator-C">
                    <section className="rm-operator-box" ref="rm-operator-box">
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
                <div className="rm-btn-group-C">
                    <ZmitiBtnGroup></ZmitiBtnGroup>
                </div>
                <ZmitiModal></ZmitiModal>
            </aside>
        )
    }
}


class ZmitiRightApp extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        return (
            <aside id="rm-right-app" className="rm-right-app">
                <div className="rm-main-ui-C">
                    <div className="rm-top-banner-C">
                        <ZmitiTopBanner></ZmitiTopBanner>
                    </div>
                    <div className="rm-stage-C">
                        <ZmitiMainStage></ZmitiMainStage>
                    </div>
                </div>
            </aside>
        )
    }
}

class MainUI extends React.Component {
    constructor(args) {
        super(...args);
    }
    render() {
        return (
            <div className="rm-main-ui">
                <ZmitiLeftApp></ZmitiLeftApp>
                <ZmitiRightApp></ZmitiRightApp>
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>, $("#fly-main")[0],()=>{

    notification['info']({
        message: '小提示',
        description: '按住键盘空格键可以拖动图片哦~~'
    });

});

