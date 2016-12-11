import React from 'react';
import Modal from 'antd/lib/modal';
import  'antd/lib/modal/style/css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';
import './zmiti-upload-dialog.css';

import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/css';

import PubSub from '../richimg/static/js/pubsub';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css'

import Waterfall from '../richimg/static/js/waterfall';



import './theme.css';

import {utilMethods,_$,$$} from  '../utilMethod.es6';

import ContentEditable from 'react-contenteditable';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import $ from 'jquery';


import IScroll from 'iscroll';

export default class ZmitiUploadDialog extends React.Component {
    constructor(args) {
        super(...args);
        this.uploadBtnClick = this.uploadBtnClick.bind(this);
        this.beginUploadFile = this.beginUploadFile.bind(this);
        this.operatorRes = this.operatorRes.bind(this);
        this.chooseImg = this.chooseImg.bind(this);
        this.state = {
            visible: false,
            current: 4,
            currentCate: -1,
            editable: false,
            loading: false,
            type: 0,//当前显示的类型，0表示图片，1表示音频，2表示视频
            uploadLoading: false,
            ajaxData: [],
            cateVisible: false,//添加分类的对话框
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
        if (this.imgData === undefined) {
            message.warning('您还没选择资源', 2);
            return !1;
        }
        this.setState({
            visible: false
        });
        this.props.onFinish && this.props.onFinish(this.imgData);
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    showModal(data) {

        if (this.props.id !== data.id) {
            return;
        }
        this.target = data.target;
        this.setState({
            visible: true,
            type: data.type
        });

        if (!this.isShowModel) { //当再次打开对话框的时候，如果第一次请求成功。不再进行第二次请求
            this.isShowModel = true;
            let self = this;

            self.setState({
                loading: true
            });

            

        


            var params ={
                    "setdatainfotype": data.type || 0,
                    "getusersigid": self.props.getusersigid,
                    "userid":self.props.userid,
                    "setdatainfoclassid": self.state.defaultIds[self.state.current]
                };
           
            $.ajax({//获取当前分类信息.
                url: self.props.baseUrl + self.props.cateUrl + 'get_datainfo',
                type: "POST",
                data: params,
                success(data){

                    let d = data;
                    if (d.getret === -101) {
                        self.isShowModel = false;
                        return;
                    }
                    if(d.getret!==0){
                        message.error(d.getmsg);
                        self.props.S&&self.props.S.props.loginOut();
                        return;                        
                    }

                    self.state.ajaxData[self.state.current] = d.dataInfo;

                    self.state.alreadyRequest.push(self.state.current);
                    self.state.loading = false;
                    self.state.allData[self.state.current].imgs.length = 0;

                    self.state.allData[self.state.current].imgs = self.state.allData[self.state.current].imgs.concat(d.allImgs);

                    self.state.ajaxData[self.state.current].forEach((img, i)=> {

                        img.parentName.imgs[i] && ( img.parentName.imgs[i].index = i); // 记录全部分类下面的图片所属哪个分类.
                        self.state.allData[self.state.current].imgs = self.state.allData[self.state.current].imgs.concat(img.parentName.imgs);
                    });
                    self.forceUpdate(()=>{
                        self.picScroll = new IScroll(self.refs['zmmiti-asset-content'],{
                                    scrollbars:true,//显示滚动条
                                    interactiveScrollbars:true,//允许用户拖动滚动条
                                 });
                    });

                },
                error(e){
                    console.log(e)
                }
            });
            this.setState({
                ajaxData: [
                    [],
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
                    [],
                    [],
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
                        imgs: []
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
        }


    }

    componentDidMount() {


        PubSub.subscribe("showModal", (d, e)=> {
            this.showModal(e);
        });

        var obserable=window.obserable;
        obserable.on('showModal',(data)=>{
            this.showModal(data);
        });

        window.showModal = this.showModal.bind(this);
/*
        $$('li', this.refs['menu-C']).forEach((li, i)=> {
            i === this.state.current && utilMethods.addClass(li, 'active');
        });*/
    /*    let self= this;
        console.log({
                "getusersigid": self.props.getusersigid,
                "userid":self.props.userId
            })
        $.ajax({
            url: self.props.baseUrl + self.props.cateUrl + 'get_datainfoclass',
            type:"post",
            data:{
                "getusersigid": self.props.getusersigid,
                "userid":self.props.userId
            },
            success(data){
                console.log(data);
            }
        })*/


    }


    render() {


        let
            current = this.state.current,
            data = [<TabPane tab="全部" key={'all-'+current}>
            </TabPane>],
            d = (this.state.ajaxData[current] ) ? this.state.ajaxData[current].map((parent, n)=> {

                let editableCom = parent.parentName.editable ?
                    <ContentEditable onChange={this.onCateNameChange.bind(this)}
                                     html={parent.parentName.name}></ContentEditable> : parent.parentName.name;
                return <TabPane
                    tab={this.state.editable?<span>{editableCom}<Icon type="cross" onClick={this.deleteCate.bind(this)}></Icon></span>:parent.parentName.name}
                    key={'parentName-'+n}>
                </TabPane>
            }) : <TabPane key={'all2-'+current} tab="nnnnn">
            </TabPane>;

        data.push(d);


        let imgList = [];

        if (this.state.currentCate === -1) {
            this.state.allData[this.state.current] && ( imgList = this.getImageFigcaption(this.state.allData[this.state.current].imgs));
        }
        else {
            if (!this.state.ajaxData[this.state.current][this.state.currentCate]) {
                return;
            }
            this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs&&(  imgList = this.getImageFigcaption(this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs));
        }



        return (
            <div className="zmiti-upload-C" ref='zmiti-upload-C'>
                <Modal title="资料库" width={800}  wrapClassName="vertical-center-modal" className="zmiti-upload-C" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <div className="zmiti-upload-body" ref='zmiti-upload-body'>
                        <section className="zmiti-upload-body-L">
                            <ul className={'zmiti-sub-menu-'+this.state.current} ref="menu-C"
                                onClick={this.onLeftMenuClick.bind(this)}>
                                <li>公共资料库</li>
                                <li>公司资料库</li>
                                <li style={{cursor:'not-allowed'}}>我的资料库</li>
                                <li className="zmiti-sub-menu">基本资料库</li>
                                <li className="zmiti-sub-menu active">我的素材库</li>
                                <li className="zmiti-sub-menu">我的作品库</li>
                            </ul>

                        </section>
                        <section className="zmiti-upload-body-R">
                            <article>
                                <div className="zmiti-asset-C active">
                                    <Spin spinning={this.state.loading}>
                                        <Tabs onTabClick={this.onTabClick.bind(this)}
                                              tabBarExtraContent={<div className="zmiti-edit-btn" style={{color:this.state.editable?'red':''}}>{this.state.editable ?<Button onClick={this.addParentCate.bind(this)} type="dashed" size="small" >+添加分类</Button>:''}<Icon type={this.state.editable?'check':'edit'} onClick={this.changeEditable.bind(this)} ></Icon></div>}>
                                            {data}
                                        </Tabs>
                                    </Spin>
                                    <Spin tip="正在拼命上传,请稍后..." spinning={this.state.uploadLoading}>
                                        <div className="zmmiti-asset-content" ref='zmmiti-asset-content'>
                                            <figure className="zmiti-img-figure-C">
                                                <figcaption onClick={this.uploadBtnClick}
                                                            style={{display:this.state.current === 4 ?'block':'none'}}>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传图片</div>
                                                    <input onChange={this.beginUploadFile} type="file"
                                                           ref="upload-file" />
                                                </figcaption>
                                                {imgList}
                                            </figure>
                                        </div>
                                    </Spin>
                                </div>
                            </article>
                        </section>
                    </div>
                </Modal>

                <Modal title="添加分类" visible={this.state.cateVisible}
                       style={{ top: 300 }}
                       onOk={this.cateHandleOk.bind(this)} onCancel={this.cateHandleCancel.bind(this)}
                >
                    <p><Input type="text" size="large" defaultValue="" onKeyDown={this.onKeyDown.bind(this)}
                              ref="cate-name" placeholder="分类名称"/></p>
                </Modal>
            </div>
        )
    }

   

    beginUploadFile() {//开始上传

        if (this.refs['upload-file'].files.length <= 0) {
            message.warning('请选择一个要上传的文件.');
            return;
        }

        let formData = new FormData(),
            s = this;
        s.setState({
            uploadLoading: true
        });

        formData.append('setupfile', this.refs['upload-file'].files[0]);
        formData.append('setuploadtype', this.state.type);
        formData.append('getusersigid', s.props.getusersigid);
        formData.append('userid', s.props.userid);
        formData.append('setdatainfoclassid', s.state.currentCate === -1 ? s.state.defaultIds[s.state.current] + "" : s.state.ajaxData[s.state.current][s.state.currentCate].parentName.id + "");
        formData.append('setisthum', 1);//是否是缩略图。
        formData.append('seturltype', 'material' /*s.state.defaultIds[s.state.current]*/);

        ///console.log( s.state.currentCate === -1 ? s.state.defaultIds[s.state.current] + "" : s.state.ajaxData[s.state.current][s.state.currentCate].parentName.id + "")

        //console.log( this.refs['upload-file'].files[0]);

        //console.log(s.state.currentCate === -1 ? s.state.defaultIds[s.state.current] + "" : s.state.ajaxData[s.state.current][s.state.currentCate].parentName.id + "");

        $.ajax({
            url:window.baseUrl + s.props.uploadUrl,// 'http://192.168.23.2/v2/upload/upload_file/',//
            type: "POST",
            contentType: false,
            processData: false,
            data: formData,
            success(da){

    
                console.log(da);
                if (da.gettips) {//
                    message.error(d.gettips[0]);
                    return;
                }
                
                if (da.getret === 0) {

                    message.success(da.getmsg, 4);

                    da = da.getfileurlArr[0];

                    let option = {
                        src: da.datainfourl,
                        size: da.datainfosize1,
                        storageSize: da.datainfosize,
                        id: da.datainfoid
                    };
                    if (s.state.currentCate === -1) {

                    }
                    else {
                        option.index = s.state.currentCate;
                        s.state.ajaxData[s.state.current][s.state.currentCate].parentName.imgs.push(option);
                    }

                    s.state.allData[s.state.current].imgs.push(option);

                    s.state.uploadLoading = false;
                    s.forceUpdate(()=>{
                        s.picScroll.refresh();//上传成功后，重新刷新列表
                    });
                }

            },
            error(){

            }
        })

    };

    chooseImg(e) {
        e.preventDefault();
        e.persist();
        let target = $(e.target).parents('.figcaption');
        let img = null;

        if(e.target.nodeName==="LI"){
            return;
        }

        if(target.data('id')){
            $('.zmiti-img-figure-C .figcaption').removeClass('active');
            target.addClass('active');


            let
                infos = target.data('id').split('_'),
                id = infos[0],
                index = infos[1] * 1;

            if (this.state.currentCate === -1) {
                if (isNaN(index)) {//是全部的分类下、
                    this.state.allData[this.state.current].imgs.forEach((item, i)=> {
                        if (item.id === id) {
                            img = item;
                            return false;
                        }
                    });
                } else {//非全部的子分类下。
                    this.state.ajaxData[this.state.current][index].parentName.imgs.forEach(item=> {
                        if (item.id === id) {
                            img = item;
                            return false;
                        }
                    });
                }
            }

            img.target = this.target;
            this.imgData = img;
        }

        return false;
    }

    operatorRes(e) {//删除,移动,分享 资源


        let infos = e.key.split('_'),
            index = infos[0],
            self = this;

        let id = infos[1];

        let currentCate = infos[2] * 1;

        switch (index) {
            case 'delete'://删除
                $.ajax({
                    url: self.props.baseUrl + self.props.deleteResUrl,
                    type: "POST",
                    data: {
                        datainfoid: id,
                        "getusersigid": self.props.getusersigid
                    },
                    success(da){
                        if (da.getret === -101) {
                            message.error('服务器返回错误:' + da.getmsg)
                        }
                        else {
                            message.success(da.getmsg);

                            if (self.state.currentCate >= 0) {//
                                self.state.ajaxData[self.state.current][self.state.currentCate].parentName.imgs.forEach((img, i)=> {
                                    if (img.id === id) {
                                        self.state.ajaxData[self.state.current][self.state.currentCate].parentName.imgs.splice(i, 1);
                                        return false;
                                    }
                                })
                            }
                            else { //在全部分类下面删除其它的分类的图片
                                if (currentCate > -1) {//当前删除的图片,是其它分类的图片.
                                    self.state.ajaxData[self.state.current][currentCate].parentName.imgs.forEach((img, i)=> {
                                        if (img.id === id) {
                                            self.state.ajaxData[self.state.current][currentCate].parentName.imgs.splice(i, 1);
                                            return false;
                                        }
                                    })
                                }
                            }

                            self.state.allData[self.state.current].imgs.forEach((img, i)=> {
                                if (img.id === id) {
                                    self.state.allData[self.state.current].imgs.splice(i, 1);
                                    self.forceUpdate();
                                    return false;
                                }
                            });

                        }

                    },
                    error(){

                    }

                })
                break;
            case 'clip'://裁剪
                break;
            case 'move'://移动
                break;
            case 'share'://分享
                break;
        }

    }

    uploadBtnClick(e) {
        this.refs['upload-file'].click();
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.cateHandleOk();
        }
    }

    cateHandleOk(e) { //添加分类.

        let value = this.refs['cate-name'].refs.input.value;

        if (value.length <= 0) {
            message.error('分类名称不能为空');
            return;
        }

        this.setState({
            cateVisible: false
        });


        this.state.ajaxData[this.state.current].unshift(
            {
                parentName: {
                    name: value,
                    id: -1,
                    editable: true,
                    imgs: []
                },
                subNames: []
            }
        );
        this.forceUpdate();

    }

    cateHandleCancel() {
        this.setState({
            cateVisible: false
        })
    }


    getImageFigcaption(obj) {

        return obj.map((img, i)=> {
            if (!img) {
                return <div></div>;
            }
            let [width,height] = img.size.toLowerCase().split('x'),
                style = {
                    width: width > height ? '100%' : 'auto',
                    height: width > height ? 'auto' : '100%',
                    top: width > height ? "50%" : 0,
                    left: width > height ? 0 : '50%',
                    marginLeft: width > height ? 0 : -140 / height * width / 2,
                    marginTop: width > height ? -140 / width * height / 2 : 0
                };



            return (
                <figcaption key={i} onClick={this.chooseImg}
                            data-id={img.id+(img.index === undefined?'_none':'_'+img.index)} className="figcaption"
                            style={{position:'relative',zIndex:100-i}}>
                    <div className="zmiti-img-C"><img src={img.src} style={style} draggable="false" alt=""/></div>
                    <div className="zmiti-img-info">
                        <section className="zmiti-img-i">
                            <span>{img.storageSize}</span>
                            <span>{img.size}</span>
                        </section>
                        <section ref="menu" onMouseOver={this.figcaptionMouse.bind(this)}
                                 onMouseOut={this.figcaptionMouse.bind(this)}>
                            <Icon type="setting"></Icon>
                            <Menu mode="vertical" className="zmiti-asset-menu" onClick={this.operatorRes} ref="menu">
                                <Menu.Item key={'delete_'+img.id+'_'+(img.index === undefined?-101:img.index)}><Icon
                                    type="delete"/>删除</Menu.Item>
                                <Menu.Item key={'clip_'+img.id+'_'+(img.index === undefined?-101:img.index)}><Icon
                                    type="cross"/>裁剪</Menu.Item>
                                <SubMenu key={'move_'+img.id+'_'+(img.index === undefined?-101:img.index)}
                                         title={<span><Icon type="swap" /><span>移动</span></span>}>
                                    <Menu.Item
                                        key={'9_'+img.id+'_'+(img.index === undefined?-101:img.index)}>选项9</Menu.Item>
                                    <Menu.Item
                                        key={'10_'+img.id+'_'+(img.index === undefined?-101:img.index)}>选项10</Menu.Item>
                                    <Menu.Item
                                        key={'11_'+img.id+'_'+(img.index === undefined?-101:img.index)}>选项11</Menu.Item>
                                    <Menu.Item
                                        key={'12_'+img.id+'_'+(img.index === undefined?-101:img.index)}>选项12</Menu.Item>
                                </SubMenu>
                                <Menu.Item key={'share_'+img.id+'_'+(img.index === undefined?-101:img.index)}><Icon
                                    type="share-alt"/>分享</Menu.Item>
                            </Menu>
                        </section>
                    </div>
                </figcaption>
            )
        })
    }

    figcaptionMouse(e) {
        var eventType = e.type;
        e.persist();
        this.menu = this.menu || $('.zmiti-asset-menu');

        let index =$(e.target).parents('.figcaption').index('.figcaption');
        switch (eventType) {
            case "mouseover":
                this.timer && clearTimeout(this.timer);
                this.menu.eq(index).show();
                break;
            case "mouseout":
                this.timer = setTimeout(()=> {
                    this.menu.eq(index).hide();
                }, 500);
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
        let self = this;
        setTimeout(()=> {
            if (this.state.editable) {


                if (this.state.ajaxData[this.state.current][this.state.currentCate].parentName.imgs.length > 0) {//有图片.不让删除
                    message.error('当前分类下有资源文件,不能删除此分类!!');
                    return;
                }
                let self = this;

                this.setState({ //开启loading动画
                    loading: true
                });

                $.ajax({
                    url: self.props.baseUrl + self.props.cateUrl + 'class_info_del',
                    type: "POST",
                    data: {
                        datainfoclassid: self.state.ajaxData[self.state.current][self.state.currentCate].parentName.id,
                        "getusersigid": self.props.getusersigid
                    },
                    success(d){
                        if (d.getret === -101) {
                            message.error('服务器返回错误: ' + d.getmsg);
                        }
                        else {

                            self.state.ajaxData[self.state.current].splice(self.state.currentCate, 1);
                            self.state.currentCate = -1;
                            self.state.loading = false;
                            self.forceUpdate();
                            message.success('删除成功');

                        }
                    },
                    error(){
                        alert('error')
                    }
                });
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
            cateVisible: true
        });

        /**/
    }

    changeEditable() {

        let self = this;
        if (this.state.editable) {//开始更新
            let isRequest = false;
            self.state.ajaxData[self.state.current].forEach(data=> {
                if (data.parentName.id < 0) {
                    isRequest = true;
                }

            });

            isRequest && $.ajax({
                type: "POST",
                url: self.props.baseUrl + self.props.cateUrl + 'add_class_info',
                data: {
                    "getusersigid": self.props.getusersigid,
                    "id": self.state.defaultIds[self.state.current],
                    "json": self.state.ajaxData[self.state.current]
                },
                success(d){


                    if (d.getret === 0) {
                        message.success('添加分类成功');

                        self.state.ajaxData[self.state.current].length = 0;

                        d.datainfo.forEach(info=> {

                            //info.parentName.imgs = [];
                            let item = {
                                parentName: info.parentName,
                                subNames: ''
                            };

                            self.state.ajaxData[self.state.current].push(item);
                        });

                        self.forceUpdate();
                    }
                    else {
                        message.error(d.getmsg);
                    }


                },
                error(){
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
                current: index,
                currentCate: -1
            });
        }

    }

}

ZmitiUploadDialog.defaultProps = {
    baseUrl: 'http://api.zmiti.com/v2/',//http://webapi.zmiti.com/v1/
    cateUrl: "datainfoclass/",
    uploadUrl: 'upload/upload_file/',
    getImgInfoUrl: 'datainfoclass/resinfo/',//获取当前分类下的所有图片资源
    getusersigid: "09ab77c3-c14c-4882-9120-ac426f527071",
    deleteResUrl: 'datainfoclass/resource_del' //删除资源

};