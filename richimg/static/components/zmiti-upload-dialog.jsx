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

import ContentEditable from 'react-contenteditable';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';


export default class ZmitiUploadDialog extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            visible: true,
            current: 0,
            currentCate: -1,
            editable: false,
            ajaxData: [],
            allData:[]
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
            i === this.state.current && utilMethods.addClass(li, 'active');
        });

        /* this.state.currentCate !== -1 && $$('li', this.refs['Parent-C']).forEach((li, i)=> {
         i === this.state.currentCate && utilMethods.addClass(li, 'active');
         });*/

        /*  this.waterfall1 =  new Waterfall({
         containerSelector: '.zmiti-img-list-C',
         boxSelector: '.zmiti-img-list-item',
         minBoxWidth: 120
         });*/

        this.setState({
            ajaxData: [
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [

                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: [
                            {
                                src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                size: '100x100',
                                storageSize: '0.1M',
                                id: 1

                            }
                        ]},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: []},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: []},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: []},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: []},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {
                            name: '公共',
                            id: 0,
                            imgs: [
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                },
                                {
                                    src: './static/images/w.png',
                                    size: '100x100',
                                    storageSize: '0.1M',
                                    id: 1

                                }
                            ]
                        },
                        subNames: []
                    },
                    {
                        parentName: {name: '公共', id: 100, imgs: []},
                        subNames: []
                    }
                ]
            ],
            allData:[
                {
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                },
                {
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/w.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                },
                {
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/w.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                },{
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/w.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                },{
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/w.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                },{
                    imgs: [
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/w.png',
                            size: '100x100',
                            storageSize: '0.1M',
                            id: 1

                        }
                    ]
                }
            ]
        });

        setTimeout(()=>{
            let arr = [];

            this.state.ajaxData[this.state.current].forEach(data=>{
                arr= arr.concat(data.parentName.imgs);
            });
            this.state.allData[this.state.current].imgs = this.state.allData[this.state.current].imgs.concat(arr);
            this.forceUpdate();
        },0)
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


        /*
         *  <ol>
         {parent.subNames.map((li, i)=> {
         let subEditCom = li.editable ?<ContentEditable onChange={this.onCateNameChange.bind(this)} html={li.name}></ContentEditable>:<span>{li.name}</span>;
         return <li key={'subname-'+i} data-id={li.id}>{this.state.editable ? (<span>{subEditCom}<Icon type="cross"></Icon></span>) : li.name}</li>
         })}
         {this.state.editable? <li><Button onClick={this.addSubCate.bind(this)} size="small" type="dashed" data-id={parent.parentName.id}>+ 添加分类</Button></li>:''}
         </ol>
         * */


        let data = [];

        for (let k = 0, len = this.state.ajaxData.length; k < len; k++) {
            data.push({
                tab: [
                    <TabPane tab="全部" key={'all-'+k}>
                    </TabPane>,
                    this.state.ajaxData[k].map((parent, n)=> {
                        let editableCom = parent.parentName.editable ?
                            <ContentEditable onChange={this.onCateNameChange.bind(this)}
                                             html={parent.parentName.name}></ContentEditable> : parent.parentName.name;
                        return <TabPane
                            tab={this.state.editable?<span data-id={parent.parentName.id} >{editableCom}<Icon type="cross" onClick={this.deleteCate.bind(this)}></Icon></span>:parent.parentName.name}
                            key={'parentName-'+n}>
                        </TabPane>
                    })
                ],
            });
        }

        return (
            <div className="zmiti-upload-C">
                <Modal title="资料库" width={1000} className="zmiti-upload-C" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <div className="zmiti-upload-body">
                        <section className="zmiti-upload-body-L">
                            <ul className={'zmiti-sub-menu-'+this.state.current} ref="menu-C"
                                onClick={this.onLeftMenuClick.bind(this)}>
                                <li>公共资料库</li>
                                <li>公司资料库</li>
                                <li style={{cursor:'not-allowed'}}>我的资料库</li>
                                <li className="zmiti-sub-menu">基本资料库</li>
                                <li className="zmiti-sub-menu">我的素材库</li>
                                <li className="zmiti-sub-menu">我的作品库</li>
                            </ul>

                        </section>
                        <section className="zmiti-upload-body-R">
                            <article>
                                <div className="zmiti-asset-C active">
                                    <Tabs onTabClick={this.onTabClick.bind(this)}
                                          tabBarExtraContent={<div className="zmiti-edit-btn" style={{color:this.state.editable?'red':''}}>{this.state.editable ?<Button onClick={this.addParentCate.bind(this)} type="dashed" size="small" >+添加分类</Button>:''}<Icon type="edit" onClick={this.changeEditable.bind(this)} ></Icon></div>}>
                                        {data[this.state.current] && data[this.state.current].tab}
                                    </Tabs>
                                    <div className="zmmiti-asset-content">
                                        <figure className="zmiti-img-figure-C">
                                            <figcaption>
                                                <Upload>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传照片</div>
                                                </Upload>
                                            </figcaption>
                                            {this.state.allData[this.state.current] && this.state.allData[this.state.current].imgs.map((img,i)=>{
                                                return (
                                                    <figcaption key = {i}>
                                                        <img src={img.src} draggable="false" alt=""/>
                                                    </figcaption>
                                                )
                                            })};
                                        </figure>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </Modal>
            </div>
        )
    }

    onCateNameChange(e) {
        this.state.ajaxData[this.state.current][this.state.currentCate].parentName.name = e.target.value.replace(/<[^>]+>/g, "");
        //this.state.ajaxData[this.state.current][keys[1]*1].parentName.id = -1 && (this.state.ajaxData[this.state.current][keys[1]*1].parentName.id = -2);
        this.forceUpdate();
    }

    deleteCate(e) {
        //  this.state.ajaxData[this.state.current][this.state.currentCate].parentName.id = -2;
        setTimeout(()=> {
            if (this.state.editable) {
                if (this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs.length > 0) {//有图片.不让删除
                    message.error('当前分类下有资源文件,不能删除此分类!!');
                    return;
                }

                this.state.ajaxData[this.state.current].splice(this.state.currentCate, 1);
                this.forceUpdate();
            }
            ;
        }, 0);
        /**/
    }

    onTabClick(e) {

        let keys = e.split('-');
        if (keys[0] === 'all') {
            return;
        }
        this.state.currentCate = keys[1] * 1;

        this.forceUpdate();

    }


    addParentCate() {//添加父级分类
        this.state.ajaxData[this.state.current].push(
            {
                parentName: {name: '新增分类', id: -1, editable: true, imgs: []},
                subNames: []
            }
        )
        this.forceUpdate();
    }

    changeEditable() {
        this.setState({
            editable: !this.state.editable
        });
    }


    onLeftMenuClick(e) {
        if (e.target.nodeName === "LI") {

            let index = utilMethods.index(e.target);
            if (index === 2) {
                return;
            } //禁用我的资料库选项

            utilMethods.removeClass($$('li', this.refs['menu-C']), 'active');
            utilMethods.addClass($$('li', this.refs['menu-C'])[index], 'active');

            this.setState({
                current: index
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