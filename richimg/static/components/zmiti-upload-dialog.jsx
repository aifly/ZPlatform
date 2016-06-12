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

import './theme.min.css';

import {utilMethods,_$,$$} from  '../../utilMethod.es6';


export default class ZmitiUploadDialog extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            visible: true,
            tabPosition: 'left',
            isOpen: true,
            current: 2,
            currentCate:-1,
            editable:true,
            openKeys: ['sub2']
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

        /* this.waterfall1 =  new Waterfall({
         containerSelector: '.zmiti-img-list-C',
         boxSelector: '.zmiti-img-list-item',
         minBoxWidth: 120
         });*/
    }

    componentDidMount() {
        PubSub.subscribe("showModal", (d, e)=> {
            this.showModal();
        });

        $$('li', this.refs['menu-C']).forEach((li, i)=> {
            i === this.state.current && utilMethods.addClass(li,'active');
        });

        this.state.currentCate !== -1 &&  $$('li',this.refs['Parent-C']).forEach((li,i)=>{
            i === this.state.currentCate && utilMethods.addClass(li,'active');
        });

        /*  this.waterfall1 =  new Waterfall({
         containerSelector: '.zmiti-img-list-C',
         boxSelector: '.zmiti-img-list-item',
         minBoxWidth: 120
         });*/

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


        let ajaxData =[
            {
                parentNames:[
                    '图标1',
                    '图标2',
                    '图标4',
                    '图标3'
                ],
                subNames:[
                    [
                        '我的资料库',
                        '图标1',
                        '动画1',
                        '节日1',
                        '风格1',
                        '风景1'
                    ],
                    [
                        '我的资料库',
                        '图标2',
                        '动画2',
                        '节日2',
                        '风格2',
                        '风景2'
                    ],
                    [
                        '我的资料库',
                        '图标3',
                        '动画3',
                        '节日3',
                        '风格3',
                        '风景3'
                    ],
                    [
                        '我的资料库',
                        '图标4',
                        '动画4',
                        '节日4',
                        '风格4',
                        '风景4'
                    ]
                ]
            },
            {
                parentNames:[
                    '图标1',
                    '图标2',
                    '图标4',
                    '图标3'
                ],
                subNames:[
                    [
                        '我的资料库',
                        '图标1',
                        '动画1',
                        '节日1',
                        '风格1',
                        '风景1'
                    ],
                    [
                        '我的资料库',
                        '图标2',
                        '动画2',
                        '节日2',
                        '风格2',
                        '风景2'
                    ],
                    [
                        '我的资料库',
                        '图标3',
                        '动画3',
                        '节日3',
                        '风格3',
                        '风景3'
                    ],
                    [
                        '我的资料库',
                        '图标4',
                        '动画4',
                        '节日4',
                        '风格4',
                        '风景4'
                    ]
                ]
            },
            {
                    parentNames:[
                        '图标1',
                        '图标2',
                        '图标4',
                        '图标3'
                    ],
                    subNames:[
                        [
                            '我的资料库',
                            '图标1',
                            '动画1',
                            '节日1',
                            '风格1',
                            '风景1'
                        ],
                        [
                            '我的资料库',
                            '图标2',
                            '动画2',
                            '节日2',
                            '风格2',
                            '风景2'
                        ],
                        [
                            '我的资料库',
                            '图标3',
                            '动画3',
                            '节日3',
                            '风格3',
                            '风景3'
                        ],
                        [
                            '我的资料库',
                            '图标4',
                            '动画4',
                            '节日4',
                            '风格4',
                            '风景4'
                        ]
                    ]
                },
            {
                parentNames:[
                    '图标1',
                    '图标2',
                    '图标4',
                    '图标3'
                ],
                subNames:[
                    [
                        '我的资料库',
                        '图标1',
                        '动画1',
                        '节日1',
                        '风格1',
                        '风景1'
                    ],
                    [
                        '我的资料库',
                        '图标2',
                        '动画2',
                        '节日2',
                        '风格2',
                        '风景2'
                    ],
                    [
                        '我的资料库',
                        '图标3',
                        '动画3',
                        '节日3',
                        '风格3',
                        '风景3'
                    ],
                    [
                        '我的资料库',
                        '图标4',
                        '动画4',
                        '节日4',
                        '风格4',
                        '风景4'
                    ]
                ]
            },
            {
                parentNames:[
                    '图标1',
                    '图标2',
                    '图标4',
                    '图标3'
                ],
                subNames:[
                    [
                        '我的资料库',
                        '图标1',
                        '动画1',
                        '节日1',
                        '风格1',
                        '风景1'
                    ],
                    [
                        '我的资料库',
                        '图标2',
                        '动画2',
                        '节日2',
                        '风格2',
                        '风景2'
                    ],
                    [
                        '我的资料库',
                        '图标3',
                        '动画3',
                        '节日3',
                        '风格3',
                        '风景3'
                    ],
                    [
                        '我的资料库',
                        '图标4',
                        '动画4',
                        '节日4',
                        '风格4',
                        '风景4'
                    ]
                ]
            },
            {
                parentNames:[
                    '图标1',
                    '图标2',
                    '图标4',
                    '图标3'
                ],
                subNames:[
                    [
                        '我的资料库',
                        '图标1',
                        '动画1',
                        '节日1',
                        '风格1',
                        '风景1'
                    ],
                    [
                        '我的资料库',
                        '图标2',
                        '动画2',
                        '节日2',
                        '风格2',
                        '风景2'
                    ],
                    [
                        '我的资料库',
                        '图标3',
                        '动画3',
                        '节日3',
                        '风格3',
                        '风景3'
                    ],
                    [
                        '我的资料库',
                        '图标4',
                        '动画4',
                        '节日4',
                        '风格4',
                        '风景4'
                    ]
                ]
            },
            ];




        let data = [
            {
                tab: [
                    <TabPane  tab="全部" key={'all-0'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            },
            {
                tab: [
                    <TabPane  tab="全部" key={'all-1'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            },
            {
                tab: [
                    <TabPane  tab="全部" key={'all-2'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            },
            {
                tab: [
                    <TabPane  tab="全部" key={'all-3'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            },
            {
                tab: [
                    <TabPane  tab="全部" key={'all-4'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            },
            {
                tab: [
                    <TabPane  tab="全部" key={'all-5'}>
                    </TabPane>,
                    ajaxData[2].parentNames.map((parentName,n)=>{
                        return <TabPane tab={this.state.editable?<span>{parentName}<Icon type="cross"></Icon></span>:parentName} key={'parentName-'+n}>
                            <ol>
                                {ajaxData[2].subNames[n].map((li,i)=>{
                                    return <li key={'subname-'+i}>{li}</li>
                                })}
                            </ol>
                        </TabPane>
                    })
                ]
            }
        ];

        let currentData = {

        };


        /*
         *
         *  <Tabs defaultActiveKey="2" tabPosition={this.state.tabPosition} onChange={this.changeCate.bind(this)}>
         {data}
         </Tabs>
         <div className="zmiti-upload-tool-C">
         <div>
         <Button type="primary"><Icon type="plus-circle-o"></Icon>添加分组</Button>
         <Button><Icon type="edit"></Icon>在线制作</Button>
         </div>
         <div>
         <Upload name="logo" listType="picture" onChange={this.upload.bind(this)}>
         <Button type="primary">
         <Icon type="upload"/> 点击上传
         </Button>
         </Upload>
         </div>
         </div>
         <Menu
         style={{ width: 240 }}
         openKeys={this.state.openKeys}
         onClick={this.menuClick.bind(this)}
         onOpen={this.onToggle.bind(this)}
         onClose={this.onToggle.bind(this)}
         mode="inline"
         >
         <Menu.Item key="1">公共资料库</Menu.Item>
         <Menu.Item key="2">公司资料库</Menu.Item>
         <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>我的资料库</span></span>}>
         <Menu.Item key="3">基本资料库</Menu.Item>
         <Menu.Item key="4">我的素材库</Menu.Item>
         <Menu.Item key="5">我的作品库</Menu.Item>
         </SubMenu>
         </Menu>
         * */

        return (
            <div className="zmiti-upload-C">
                <Modal title="资料库" width={1000} visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>

                    <div className="zmiti-upload-body">
                        <section className="zmiti-upload-body-L">
                            <ul className={'zmiti-sub-menu-'+this.state.current} ref="menu-C"
                                onClick={this.onLeftMenuClick.bind(this)}>
                                <li>公共资料库</li>
                                <li>公司资料库</li>
                                <li>我的资料库</li>
                                <li className="zmiti-sub-menu">基本资料库</li>
                                <li className="zmiti-sub-menu">我的素材库</li>
                                <li className="zmiti-sub-menu">我的作品库</li>
                            </ul>
                            <div>
                                <Button size="large" type="primary"><Icon type="plus-circle-o"></Icon>添加分组</Button>
                                <Button size="large"><Icon type="edit"></Icon>在线制作</Button>
                            </div>
                        </section>
                        <section className="zmiti-upload-body-R">
                           <article>
                               <div className="zmiti-asset-C active">
                                   <Tabs>
                                       {data[this.state.current].tab}
                                   </Tabs>
                                   <div className="zmiti-edit-btn"><Icon type="edit"></Icon></div>
                               </div>
                           </article>
                        </section>
                    </div>

                </Modal>
            </div>
        )
    }


    onToggle(info) {

        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });

    }

    onLeftMenuClick(e) {
        if (e.target.nodeName === "LI") {

            utilMethods.removeClass($$('li', this.refs['menu-C']), 'active');

            let index = utilMethods.index(e.target);

            utilMethods.addClass($$('li', this.refs['menu-C'])[index], 'active');

            this.setState({
                current:index
            });
        }

    }

    upload(e) {
        console.log(e.file)
    }

    changeCate(index) {
        setTimeout(()=> {
            this.waterfall1 = new Waterfall({
                containerSelector: '.zmiti-img-list-C',
                boxSelector: '.zmiti-img-list-item',
                minBoxWidth: 120
            });
        }, 1)
    }
}