import React from 'react';

import { Form, Input } from '../../../commoncomponent/common.jsx';

const FormItem = Form.Item;


import ZmitiTextAreaBtns from './zmiti-textarea-btns.jsx';
import PubSub from '../js/pubsub';
import ZmitiUploadDialog from '../../../components/zmiti-upload-dialog.jsx';
import $ from 'jquery';

export default class ZmitiChooseFile extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            currentId: 'c-video'
        }
    }

    onMouseOver(e){
        let focusTag = this.props.tags[this.props.focusTagIndex] || {};
        if (e.target.className.indexOf('ant-input-group-addon') > -1) {
            if (focusTag.type === "image") {
                $('.rm-choose-video .ant-input-group-addon').css("cursor",'not-allowed');
                $('.rm-choose-image .ant-input-group-addon').css("cursor",'pointer');
            }
            else {
                $('.rm-choose-image .ant-input-group-addon').css("cursor",'not-allowed');
                $('.rm-choose-video .ant-input-group-addon').css("cursor",'pointer');

            }
        }
    }
    chooseImg(e) {
        if (e.target.className.indexOf('ant-input-group-addon') > -1) {


            let focusTag = this.props.tags[this.props.focusTagIndex] || {},
                type =0,
                id='image';

            if (focusTag.type === "image") {
                if ($(e.target).parents('.rm-choose-img').hasClass('rm-choose-video')) {
                    return;
                }
                type =0;
                id='image';
            }
            else {
                if (!$(e.target).parents('.rm-choose-img').hasClass('rm-choose-video')) {
                    return;
                }
                type = 2; //2代表视频
                id='video';
            }

            //type: 1->图片 2->音频 3->视频

            PubSub.publish('showModal', {type,id});

        }
    }

    changeTagType(e) {


        let type = e.target.id === 'c-pic' ? "image" : "video";


        this.props.changeTagPropValue("type", type);
    }

    changeHref(e) {
        this.props.changeTagPropValue("href", e.target.value);
    }

    componentDidMount() {
        this.props.getFocusComponent(0);
    }

    render() {
        let labelStyle = {
            position: 'relative',
            top: -3,
            left: 5,
            color: '#fff',
            cursor: 'pointer'
        }


        let focusTag = this.props.tags[this.props.focusTagIndex] || {};


        let methods = {
                changeTagPropValue: this.props.changeTagPropValue
            },
            s = this,
            props = {
                getusersigid:this.props.getusersigid,
                baseUrl: this.props.baseUrl,
                onFinish(imgData){
                    $.ajax({
                        url: s.props.baseUrl + "works/add_img",
                        type: "POST",
                        data: {
                            worksid:s.props.worksid,
                            imgSrc:imgData.src
                        },
                        success(data){
                            if(data.getret===0){
                                s.props.changeTagPropValue("imgSrc", data.imgSrc);
                            }
                        }
                    });
                }
            };


        return (
            <Form onClick={this.chooseImg.bind(this)} onMouseOver={this.onMouseOver.bind(this)} style={{marginTop:6}}>
                <div>
                    <input checked={focusTag.type === 'image'} onChange={this.changeTagType.bind(this)} ref="choose-img"
                           type="radio" name="type" value="pic" id="c-pic"/><label style={labelStyle} htmlFor="c-pic">添加图片</label>
                </div>
                <FormItem className="rm-choose-img rm-choose-image">
                    <Input disabled addonAfter="+选择"/>
                    <input type="file" ref="rm-upload" style={{opacity:0,position:'fixed',zIndex:-1}}/>
                </FormItem>
                <div>
                    <input checked={focusTag.type === 'video'} onChange={this.changeTagType.bind(this)}
                           ref="choose-video" type="radio" name="type" value="video" id="c-video"/><label
                    style={labelStyle} htmlFor="c-video">添加视频</label>
                </div>
                <FormItem className="rm-choose-img rm-choose-video">
                    <Input disabled addonAfter="+选择"/>
                </FormItem>
                <ZmitiTextAreaBtns type="video" {...methods} textContent={focusTag.content}
                                   label="图片/视频说明"></ZmitiTextAreaBtns>
                <FormItem
                    label="标点链接：">
                    <Input placeholder="http://www." value={focusTag.href} onChange={this.changeHref.bind(this)}/>
                </FormItem>
                <ZmitiUploadDialog id="image" {...props}></ZmitiUploadDialog>
                <ZmitiUploadDialog id="video" {...props}></ZmitiUploadDialog>
            </Form>
        )
    }
}

//ZmitiChooseFile = Form.create({})(ZmitiChooseFile);
