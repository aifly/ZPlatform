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
const FormItem = Form.Item;
import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/css';

/*import 'babel-polyfill';
import { Provider } from 'react-redux';*/

import ZmitiTextAreaBtns from './static/components/zmiti-textarea-btns.jsx';
import ZmitiMiniColor from './static/components/zmiti-minicolor.jsx';
import ZmitiChooseFile from './static/components/zmiti-choose-file.jsx';
/*import ZmitiRipple from './static/components/zmiti-ripple.jsx';*/
import ZmitiBtnGroup from './static/components/zmiti-btn-group.jsx';
import ZmitiTopBanner from './static/components/zmiti-top-banner.jsx';
import ZmitiMainStage from './static/components/zmiti-main-stage.jsx';
import ZmitiModal from './static/components/zmiti-dialog.jsx';

import ZmitiTag from './static/components/zmiti-tag.jsx';

if (!Array.from) {
    Array.from = (c)=> {
        return Array.prototype.slice.call(c);
    }
}

class ZmitiLeftApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            textClassName: "rm-text-pannel-title  rm-pannel",
            picClassName: "rm-pic-video-title rm-pannel active"
        }
    }


    componentDidMount(){


        $('.rm-pannel').longShadow({
            colorShadow: '#990000',
            sizeShadow: 8
        });
    }

    render() {
/*
*  <div className={this.state.textClassName} ref="text" onClick={this.changePannel.bind(this)}>
 文本
 </div>

 <ZmitiRipple id="rm-pannel-ripple" ref="ripple"></ZmitiRipple>
* */

        let methods = {
            changeTagPropValue:this.props.changeTagPropValue
        }
        return (
            <aside id="rm-left-app" className="rm-left-app">
                <header className="rm-header">编辑图片</header>
                <section className="rm-pannel-bar">
                    <div className="rm-fill-left"> &nbsp;</div>
                    <div className={this.state.picClassName} ref="pic">
                        图片/视频
                    </div>
                    <div className="rm-fill-right">
                        &nbsp;
                    </div>
                </section>

                <section className="rm-operator-C">
                    <section className="rm-operator-box" ref="rm-operator-box">
                        <div className="rm-operator-p">
                            <ZmitiChooseFile {...this.props}></ZmitiChooseFile>
                        </div>
                    </section>
                    <div className="rm-btn-group-C">
                        <ZmitiBtnGroup></ZmitiBtnGroup>
                    </div>
                </section>
                <ZmitiModal {...methods}></ZmitiModal>
            </aside>
        )
    }
}


class ZmitiRightApp extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        let methods = {
            getFocusComponent:this.props.getFocusComponent
        };
        return (
            <aside id="rm-right-app" className="rm-right-app">
                <div className="rm-main-ui-C">
                    <div className="rm-top-banner-C">
                        <ZmitiTopBanner></ZmitiTopBanner>
                    </div>
                    <div className="rm-stage-C">
                        <ZmitiMainStage {...this.props} {...methods}></ZmitiMainStage>
                    </div>
                </div>
            </aside>
        )
    }
}

class MainUI extends React.Component {
    constructor(args) {
        super(...args);
       /// this.changeTagType = this.changeTagType.bind(this);
        this.state = {
            ltP:{
                index:{
                    tags:[
                        {
                            "type": "image",
                            "href": "http://www.zmiti.com",
                            "content": "中华人民共和国中华人民共和国",
                            "id": ZmitiTag.getGuid(),
                            "icon": "images/red-plain.png",
                            "iconHover": "images/hoverlink.png",
                            "styles": {
                                "left": "55%",
                                "top": "42%"
                            },
                            "wrapStyles": {
                                "width": "200px",
                                "height": "130px",
                                "fontFamily": "'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif"
                            }
                        },
                        {
                            "type": "image",
                            "href": "http://www.linten.cn",
                            "content": "组件测试。react",
                            "id": ZmitiTag.getGuid(),
                            "icon": "images/red-plain.png",
                            "iconHover": "images/hoverlink.png",
                            "styles": {
                                "left": "25%",
                                "top": "62%"
                            },
                            "wrapStyles": {
                                "width": "200px",
                                "height": "130px",
                                "fontFamily": "'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif"
                            }
                        }
                    ],
                    focusTagIndex:0
                }
            }
        };

    }

    componentDidMount(){
        this.setState({
            ltP:{
                index:{
                    tags:this.state.ltP.index.tags,
                    focusTagIndex:0,
                    focusTag:this.state.ltP.index.tags[this.state.ltP.index.focusTagIndex]
                }
            }
        },()=>{
            window.Zmiti = this.state.ltP;
        });


    }


    /**
     * 切换当前标签的属性。
     * @param key  属性类型
     * @param value 属性值
     */
    changeTagPropValue(key,value){//

        this.state.ltP.index.focusTag[key] = value;
        this.forceUpdate();
    }
    createTag(tagObj){
        this.state.ltP.index.tags.push = tagObj;
        this.forceUpdate();
    }

    deleteTag(index){
        this.state.ltP.index.tags.splice(index,1);
        this.forceUpdate();
    }

    getFocusComponent(index){
        this.state.ltP.index.focusTagIndex = index;
        this.state.ltP.index.focusTag =this.state.ltP.index.tags[index];
        this.forceUpdate();
    }


    render() {

        let methods = {
            changeTagPropValue:this.changeTagPropValue.bind(this),
            getFocusComponent:this.getFocusComponent.bind(this)
        }

        return (
            <div className="rm-main-ui">
                <ZmitiLeftApp {...this.state.ltP.index} {...methods}></ZmitiLeftApp>
                <ZmitiRightApp {...this.state.ltP.index} {...methods}></ZmitiRightApp>
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>, $("#fly-main")[0],()=>{

    const key = `open${Date.now()}`;
    let btnClick = ()=>{
        notification.close(key);
        close();
    }
    const  close = () =>{
        //
        localStorage['hideInfo'] = true;

    }
    const btn = (
        <Button type="primary" size="small" onClick={btnClick}>
            不再提示我~
        </Button>
    );

    !localStorage['hideInfo'] && notification['info']({
        message: '小提示',
        description: '按住键盘空格键可以拖动图片哦~~,试试 ctrl+0(图片自适应舞台) , ctrl+1(显示图片的真实尺寸),ctrl+],ctrl+[ 分别为放大缩小图片 快捷键~~',
        btn,
        key
    });

});

