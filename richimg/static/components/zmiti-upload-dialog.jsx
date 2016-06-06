import React from 'react';
import Modal from 'antd/lib/modal';
import  'antd/lib/modal/style/css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';
import './zmiti-upload-dialog.css';

import Tag from 'antd/lib/tag';
import 'antd/lib/tag/style/css';
import PubSub from '../js/pubsub';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css'

import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/css';
import Waterfall from '../js/waterfall';


export default class ZmitiUploadDialog extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            visible: false,
            tabPosition: 'left'
        }
    }

    handleOk() {

        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
        this.waterfall1 = null;
    }

    showModal() {

        this.setState({
            visible: true
        });

      this.waterfall1 =  new Waterfall({
            containerSelector: '.zmiti-img-list-C',
            boxSelector: '.zmiti-img-list-item',
            minBoxWidth: 120
        });
    }

    componentDidMount() {
        PubSub.subscribe("showModal", (d, e)=> {
            this.showModal();
        });

    }

    checkImg(e) {
        e.preventDefault();

        Array.from(document.getElementsByClassName('zmiti-img-list-item')).forEach(item=> {
            item.classList.remove('active');
        });

        e.target.parentNode.classList.add('active');
        return false;
    }



    render() {
        let parentTag1 = [
                {name: '最新', id: 1},
                {name: '图标', id: 2},
                {name: '节日', id: 3},
                {name: '风景', id: 4},
                {name: '企业', id: 5},
                {name: '行业', id: 6},
                {name: '海外', id: 7},
                {name: '背景', id: 8}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="blue">{tag.name}</Tag>
                )
            }),
            subTag1 = [
                {name: '边框1', id: 100},
                {name: '图标1', id: 200},
                {name: '线条1', id: 300}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="red">{tag.name}</Tag>
                )
            });

        let parentTag2 = [
                {name: '最新', id: 1},
                {name: '图标', id: 2},
                {name: '节日', id: 3},
                {name: '风景', id: 4},
                {name: '企业', id: 5},
                {name: '行业', id: 6},
                {name: '海外', id: 7},
                {name: '背景', id: 8}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="blue">{tag.name}</Tag>
                )
            }),
            subTag2 = [
                {name: '边框', id: 100},
                {name: '图标', id: 200},
                {name: '线条', id: 300}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="red">{tag.name}</Tag>
                )
            });

        let parentTag3 = [
                {name: '最新', id: 1},
                {name: '图标1', id: 2},
                {name: '节日', id: 3},
                {name: '风景', id: 4},
                {name: '企业2', id: 5},
                {name: '行业', id: 6},
                {name: '海外', id: 7},
                {name: '背景', id: 8}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="blue">{tag.name}</Tag>
                )
            }),
            subTag3 = [
                {name: '边框', id: 100},
                {name: '图标', id: 200},
                {name: '线条', id: 300}
            ].map((tag, i)=> {
                return (
                    <Tag key={i} style={{cursor:'pointer'}} color="red">{tag.name}</Tag>
                )
            });


        let imgArr1 = [
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"},
            {src: "./static/images/2.png"}
        ].map((img, i)=> {
            return (
                <div key={i} data-index={i} className="zmiti-img-list-item" onClick={this.checkImg.bind(this)}>
                    <img draggable="false" src={img.src} alt=""/>
                </div>
            )
        });
        let data = [
            {
                tab: '公共资料库',
                tabPane: <div className="zmiti-img-list-C">
                    {imgArr1}
                </div>,
                cate: <div>
                    <div className="zmiti-cate-1">
                        {parentTag1}
                    </div>
                    <div className="zmiti-cate-line"></div>
                    <div className="zmiti-cate-2">
                        {subTag1}
                    </div>
                </div>
            },
            {
                tab: 'XX公司资料库',
                tabPane: <p>XX公司资料库</p>,
                cate: <div>
                    <div className="zmiti-cate-1">
                        {parentTag2}
                    </div>
                    <div className="zmiti-cate-line"></div>
                    <div className="zmiti-cate-2">
                        {subTag2}
                    </div>
                </div>
            },
            {
                tab: '我的资料库',
                tabPane: <p>我的资料库</p>,
                cate: <div>
                    <div className="zmiti-cate-1">
                        {parentTag3}
                    </div>
                    <div className="zmiti-cate-line"></div>
                    <div className="zmiti-cate-2">
                        {subTag3}
                    </div>
                </div>
            }
        ].map((d, i)=> {
            return (
                <TabPane tab={d.tab} key={i}>
                    {d.cate}
                    {d.tabPane}
                </TabPane>
            )
        });

        return (
            <div>
                <Modal title="资料库" width={1000} visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <div style={{textAlign:'right'}}>
                        <Upload name="logo" listType="picture" onChange={this.upload.bind(this)}>
                            <Button type="primary">
                                <Icon type="upload"/> 点击上传
                            </Button>
                        </Upload>
                    </div>
                    <Tabs tabPosition={this.state.tabPosition} onChange={this.changeCate.bind(this)}>
                        {data}
                    </Tabs>
                </Modal>
            </div>
        )
    }

    upload(e) {
        console.log(e.file)
    }

    changeCate(index) {
        setTimeout(()=>{
            this.waterfall1 =  new Waterfall({
                containerSelector: '.zmiti-img-list-C',
                boxSelector: '.zmiti-img-list-item',
                minBoxWidth: 120
            });
        },1)
    }
}