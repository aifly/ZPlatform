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

import clip from '../images/clip.svg';

import './theme.min.css';

import {utilMethods,_$,$$} from  '../../utilMethod.es6';

import ContentEditable from 'react-contenteditable';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

import $ from 'jquery';


export default class ZmitiUploadDialog extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            visible: true,
            current: 4,
            currentCate: -1,
            editable: false,
            ajaxData: [],
            cateVisible:false,//添加分类的对话框
            defaultIds: ['1465782065', '1465782285', '1465782327', '1465782386', '1465285201', '1465285261'],
            allData: [
                {
                    imgs: []
                }
            ],
            alreadyRequest: []
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

        let self = this;

        $.ajax({
            url: self.props.baseUrl + self.props.cateUrl+ 'get_datainfo',
            type: "POST",
            data: {
                "getusersigid": self.props.getusersigid,
                "id": self.state.defaultIds[self.state.current]
            },
            success(data){
                let d = data;
                if (d.getret === -101) {
                    return;
                }
                self.state.ajaxData[self.state.current] = d.dataInfo;
                self.state.alreadyRequest.push(self.state.current);
                self.forceUpdate();
            },
            error(e){
                console.log(e)
            }
        })


        /*  utilMethods.post(this.props.baseUrl + 'datainfoclass/get_datainfo', (data)=> {

         }, {
         "getusersigid": this.props.getusersigid, "id": this.state.defaultIds[this.state.current]
         });*/

        this.setState({
            ajaxData: [
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ],
                [
                    {
                        parentName: {},
                        subNames: []
                    },
                    {
                        parentName: {},
                        subNames: []
                    }
                ]
            ],
            allData: [
                {
                    imgs: [
                        {
                            src: './static/images/2.png',
                            size: '1920x1080',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/2.png',
                            size: '1920x1080',
                            storageSize: '0.1M',
                            id: 1

                        },
                        {
                            src: './static/images/1.jpg',
                            size: '160x253',
                            storageSize: '0.1M',
                            id: 1

                        }, {
                            src: './static/images/2.png',
                            size: '1920x1080',
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
                }
            ]
        });

        setTimeout(()=> {
            let arr = [];

            this.state.ajaxData[this.state.current].forEach(data=> {
                arr = arr.concat(data.parentName.imgs);
            });
            this.state.allData[this.state.current].imgs = this.state.allData[this.state.current].imgs.concat(arr);
            this.forceUpdate();
        }, 0)
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

        let data = [];

        for (let k = 0, len = this.state.ajaxData.length; k < len; k++) {

            this.state.ajaxData[k] && data.push({
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

        let imgList = [];

        if (this.state.currentCate === -1) {


            this.state.allData[this.state.current] && ( imgList = this.getImageFigcaption(this.state.allData[this.state.current].imgs));
        }
        else {
            if (!this.state.ajaxData[this.state.current][this.state.currentCate].parentName) {
                return;
            }
            imgList = this.getImageFigcaption(this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs);
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
                                          tabBarExtraContent={<div className="zmiti-edit-btn" style={{color:this.state.editable?'red':''}}>{this.state.editable ?<Button onClick={this.addParentCate.bind(this)} type="dashed" size="small" >+添加分类</Button>:''}<Icon type={this.state.editable?'check':'edit'} onClick={this.changeEditable.bind(this)} ></Icon></div>}>
                                        {data[this.state.current] && data[this.state.current].tab}
                                    </Tabs>
                                    <div className="zmmiti-asset-content">
                                        <figure className="zmiti-img-figure-C">
                                            <figcaption style={{display:this.state.current === 4 ?'block':'none'}}>
                                                <Upload>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传图片</div>
                                                </Upload>
                                            </figcaption>
                                            {imgList}
                                        </figure>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </Modal>

                <Modal title="添加分类" visible={this.state.cateVisible}
                       style={{ top: 300 }}
                       onOk={this.cateHandleOk.bind(this)} onCancel={this.cateHandleCancel.bind(this)}
                >
                    <p><Input type="text" size="large" defaultValue="" onKeyDown={this.onKeyDown.bind(this)} ref="cate-name" placeholder="分类名称"/></p>
                </Modal>
            </div>
        )
    }

    onKeyDown(e){
        if(e.keyCode === 13){
            this.cateHandleOk();
        }
    }
    cateHandleOk(e){ //添加分类.

        let value =this.refs['cate-name'].refs.input.value;

        if(value.length <= 0){
            message.error('分类名称不能为空');
            return;
        }

        this.setState({
            cateVisible:false
        });


        this.state.ajaxData[this.state.current].unshift(
            {
                parentName: {
                    name:value,
                    id: -1,
                    editable: true,
                    imgs: []
                },
                subNames: []
            }
        )
        this.forceUpdate();

    }

    cateHandleCancel(){
        this.setState({
            cateVisible:false
        })
    }


    getImageFigcaption(obj) {

        return obj.map((img, i)=> {
            if (!img) {
                return;
            }
            let [width,height] = img.size.split('x'),
                style = {
                    width: width > height ? '100%' : 'auto',
                    height: width > height ? 'auto' : '100%',
                    top: width > height ? "50%" : 0,
                    left: width > height ? 0 : '50%',
                    marginLeft: width > height ? 0 : -140 / height * width / 2,
                    marginTop: width > height ? -140 / width * height / 2 : 0
                };

            return (
                <figcaption key={i} className="overflow figcaption" onMouseOver={this.figcaptionMouse.bind(this)}
                            onMouseOut={this.figcaptionMouse.bind(this)} style={{position:'relative',zIndex:100-i}}>
                    <img src={img.src} style={style} draggable="false" alt=""/>
                    <div className="zmiti-img-info">
                        <section className="zmiti-img-i">
                            <span>{img.storageSize}</span>
                            <span>{img.size}</span>
                        </section>
                        <section>
                            <Icon type="setting"></Icon>
                            <ul>
                                <li>删除</li>
                                <li>裁剪</li>
                                <li>分享</li>
                            </ul>
                        </section>
                    </div>
                </figcaption>
            )
        })
    }

    figcaptionMouse(e) {
        switch (e.type) {
            case "mouseover":
                utilMethods.removeClass($$('.figcaption'), 'overflow');
                break;
            case "mouseout":
                // this.refs['figcaption'].classList.add('overflow')
                utilMethods.addClass($$('.figcaption'), 'overflow');
                break;
        }
    }

    onCateNameChange(e) {
        this.state.ajaxData[this.state.current][this.state.currentCate].parentName.name = e.target.value.replace(/<[^>]+>/g, "");
        //this.state.ajaxData[this.state.current][keys[1]*1].parentName.id = -1 && (this.state.ajaxData[this.state.current][keys[1]*1].parentName.id = -2);
        this.forceUpdate();
    }

    deleteCate(e) {
        //  this.state.ajaxData[this.state.current][this.state.currentCate].parentName.id = -2;
        let self=this;
        setTimeout(()=> {
            if (this.state.editable) {
                if (this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs.length > 0) {//有图片.不让删除
                    message.error('当前分类下有资源文件,不能删除此分类!!');
                    return;
                }
                $.ajax({
                   url:self.props.baseUrl + self.props.cateUrl+'class_info_del',
                   type:"POST",
                    data:{datainfoclassid:self.state.ajaxData[self.state.current][self.state.currentCate].parentName.id},
                    success(d){
                        if(d.getret===-101){
                            message.error(d.getmsg);
                        }
                        else{
                            message.success('删除成功');
                        }
                    }
                });
                this.state.ajaxData[this.state.current].splice(this.state.currentCate, 1);
                this.forceUpdate();
            }
        }, 0);
        /**/
    }

    onTabClick(e) {

        let keys = e.split('-');

        this.state.currentCate = keys[0] === 'all' ? -1 : keys[1] * 1;

        this.forceUpdate();

    }


    addParentCate() {//添加父级分类

        this.setState({
            cateVisible:true
        });

       /**/
    }

    changeEditable() {

        let self = this;
        if (this.state.editable) {//开始更新
            let isRequest = false;
            self.state.ajaxData[self.state.current].forEach(data=> {
                if(data.parentName.id < 0){
                    isRequest = true;
                }

            });


            isRequest && $.ajax({
                type: "POST",
                url: self.props.baseUrl+self.props.cateUrl + 'add_class_info',
                data: {
                    "getusersigid": self.props.getusersigid,
                    "id": self.state.defaultIds[self.state.current],
                    "json": self.state.ajaxData[self.state.current]
                },
                success(d){

                    if (d.getret === 0) {
                        message.success('添加分类成功');
                        self.state.ajaxData[self.state.current] = d.dataInfo;
                        self.state.alreadyRequest.push(self.state.current);
                        self.forceUpdate();
                    }
                    else {
                        message.error(d.getmsg);
                    }


                }
            });


        }
        this.setState({
            editable: !this.state.editable
        });
    }

    toString(obj) {

        if (obj instanceof Array) {
            obj.forEach(o=> {

            });
        }
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

}
ZmitiUploadDialog.defaultProps = {
    baseUrl: 'http://webapi.zmiti.com/v1/',
    cateUrl:"datainfoclass/",
    getusersigid: "09ab77c3-c14c-4882-9120-ac426f527071"
};