import React from 'react';
import './zmiti-richimg.css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import $ from 'jquery';



export default class ZmitiRichImg extends React.Component {
    constructor(args) {
        super(...args);
        this.operatorRichImg=this.operatorRichImg.bind(this);
    }
    operatorRichImg(e){
        e.preventDefault();//阻止a标签默认跳转行为
        if(e.target.nodeName === "LI"){
            let index = $(e.target).index();
            switch (index){
                case 0://预览
                    break;
                case 1://删除
                    break;
                case 2://分享
                    break;
            }
        }

        return false;
    }
    render() {

        let richimg = {
            projectId: this.props.worksid,
            imgSrc: this.props.imgurl,
            jsonSrc: this.props.datajsonpath
        }
        return (
            <div className="zmiti-richimg-C">
                <a href={'./index.html?richimg='+encodeURI(JSON.stringify(richimg))} target="_blank">
                    <img src={this.props.worksico} alt="" draggable="false"/>
                    <div className="zmiti-name">{this.props.worksname || '新建作品'}</div>
                    <div className="zmiti-athor-C">
                        <aside>作者：<span>{this.props.username}</span></aside>
                        <aside>
                            <Icon type="setting"></Icon>
                            <ul onClick={this.operatorRichImg}>
                                <li><Icon type="eye"></Icon>预览</li>
                                <li><Icon type="delete"></Icon>删除</li>
                                <li><Icon type="share-alt"></Icon>分享</li>
                            </ul>
                        </aside>
                    </div>
                </a>
            </div>
        )
    }
}