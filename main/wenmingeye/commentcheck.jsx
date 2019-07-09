import './static/css/datacheck.css';
import React from 'react';
import {
    Button,
    Icon,
    Checkbox,
    Input,
    Row,
    Col,
    Pagination,
    Popconfirm,
    message,
    Menu,
    Dropdown,
    Switch,
    Radio
} from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
import $ from 'jquery';
import { WMURLS, title, baseUrl, WMEYEAPPID} from './url';


import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';
var defaulturl = 'http://www.zmiti.com/main/static/images/zmiti-logo.jpg';
class ZmitiWenmingDataCheckApp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            selectAll: false,
            allCount: 1,
            pageIndex: 1,

            currentPicIndex: -1,


            currentViewPic: '',

            currentDeleteIndex: -1,

            currentCommentIndex: 0,

            currentDeleteCommentIndex: -1,

            tab: 'all',

            currentWhere: {},

            status: 0,

            pageSize: 10,

            voidurl: '',

            typeList: [],

            classname: '全部',

            dataSource: [

            ]
        }

        this.viewW = document.documentElement.clientWidth;
    }

    componentWillMount() {

        let {
            resizeMainHeight,
            popNotice,
            validateUser,
            loginOut,
            validateUserRole,
            isSuperAdmin,
            isNormalAdmin,
            getUserDetail,
            listen,
            send
        } = this.props;
        var {
            userid,
            getusersigid,
            companyid,
            username,
            isover,
            usertypesign
        } = validateUser(() => {
            loginOut('登录失效，请重新登录', window.loginUrl, false);
        }, this);


        this.loginOut = loginOut;
        this.listen = listen;
        this.send = send;
        this.popNotice = popNotice;
        this.isSuperAdmin = isSuperAdmin;
        this.isNormalAdmin = isNormalAdmin;
        this.validateUserRole = validateUserRole;
        this.getUserDetail = getUserDetail;
        this.resizeMainHeight = resizeMainHeight;
    }
    componentDidMount() {
        this.resizeMainHeight(this);
        let {
            validateUser,
            loginOut,
            resizeMainHeight
        } = this.props;
        var iNow = 0;
        validateUser(() => {
            loginOut();
        }, this);


        resizeMainHeight(this);


        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 27: //ESC
                    this.setState({
                        currentViewPic: '',
                        voidurl: ''
                    })
                    break;
            }
        })


        this.scroll = new IScroll(this.refs['wenming-datacheck-list'], {
            scrollbars: true, //显示滚动条
            interactiveScrollbars: true, //允许用户拖动滚动条
            mouseWheel: true, //启用鼠标滚轮。
            preventDefault: false
        });

        setTimeout(() => {
            this.scroll.refresh();
        }, 100)

        this.request();


    }


    render() {
  
        var showBatchbars = false;
        this.state.dataSource.map((item, i) => {
            item.comments.map((com, k) => {
                if (com.checked) {
                    showBatchbars = true;
                }
            })
        });
        var menu = (
            <Menu>
                <Menu.Item >
                    <a onClick={this.loadCommentByType.bind(this,'','全部')} href="javascript:">全部</a>
                </Menu.Item>
                {this.state.typeList.map((item,i)=>{
                    return <Menu.Item key={i}>
                        <a  onClick={this.loadCommentByType.bind(this,item.classid,item.classname)} href="javascript:">{item.classname}</a>
                    </Menu.Item>
                })}
                    
              </Menu>)

        var plainOptions = [{
                label: '全部',
                value: 'all'
            }, {
                label: '审核通过',
                value: 'checked-pass'
            }, {
                label: '审核不通过',
                value: 'checked-unpass'
            }

        ];
        var props = {
            title,
            selectedIndex: 2,
            mainRight: <div className='wenming-datacheck-main-ui' style={{height:this.state.mainHeight}}>
                        <header className='wenming-datacheck-header'>
                            <div>评论审核-{title}</div>   
                            <div><Switch onChange={this.getCheckedData.bind(this)} checkedChildren="已审" unCheckedChildren="未审" /></div>
                            <div><a href='#/wmeyeadd'><Icon type="upload"/>上报数据</a></div>   
                        </header>
                        <section className='wenming-datacheck-bar'>
                            <div>
                                <Checkbox onChange={this.selectAll.bind(this)} checked={this.state.selectAll}>全选</Checkbox>
                                
                               {showBatchbars && <Popconfirm onConfirm={this.batchDelete.bind(this)} placement="top" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                                   <div className='wenming-del'><Icon type='delete'/>批量删除</div>
                                                               </Popconfirm>}
                                {showBatchbars && this.state.status === 0 && <div onClick={this.batchChecked.bind(this,'pass')} className='wenming-datacheck-batchcheck'><Icon type="check-circle" />批量审核通过</div>}
                                {showBatchbars && this.state.status === 0 && <div onClick={this.batchChecked.bind(this,'unpass')} className='wenming-datacheck-unpass'><Icon type="close-circle" />拒绝通过审核</div>}
                                <div>
                                   {/*  <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link" href="javascript:">
                                          {this.state.classname} <Icon style={{color:'#108ee9'}}  type="down" />
                                        </a>
                                      </Dropdown>*/}
                                </div>
                                {this.state.status === 1 && <div style={{marginLeft:30}}>
                                   { <RadioGroup options={plainOptions} onChange={this.loadCommentByClass.bind(this)} value={this.state.tab }>
                                       {plainOptions.map((item,i)=>{
                                           return <Radio key={i} value={item.value}>{item.label}</Radio>
                                       })}
                                   </RadioGroup>}
                                </div>}
                            </div>
                            <div hidden>
                                <Row type='flex'>
                                    <Col span={20}><Input value={this.state.keyword} onChange={e=>{this.setState({keyword:e.target.value})}} type='text' /></Col>
                                    <Col span={4}><Button type='primary'><Icon type='search'/></Button></Col>
                                </Row>
                            </div>
                        </section>
                        <section className='wenming-datacheck-list' ref='wenming-datacheck-list'>
                            <ul>
                                {
                                    this.state.dataSource.map((datalist,i)=>{

                                        return  datalist.comments.map((item,k)=>{
                                            
                                            var className='';

                                            if(this.state.status === 1){
                                                if(item.status === 1){
                                                    className += ' pass';
                                                }else if(item.status === 2){
                                                    className += 'unpass';
                                                }
                                                
                                            }
                                            if(this.state.currentDeleteIndex===i && this.state.currentDeleteCommentIndex === k){
                                                className+= ' wenming-datacheck-item-delete'
                                            }
                                            
                                            var len = 80;
                                            
                                            if( item.commenttxt.length > len ){
                                                if(!item.showAll){
                                                    item.commenttxt = item.defaultCommenttxt.substring(0,len)+'...';
                                                }
                                                else{
                                                    item.commenttxt = item.defaultCommenttxt
                                                }
                                            }
                                            var showMore = item.defaultCommenttxt.length > len? <a  className='wenming-expand'
                                                onClick={()=>{item.showAll = !item.showAll;this.forceUpdate(()=>{this.scroll.refresh()})}}
                                                 href='javascript:;'
                                                 >
                                                 {!item.showAll?'查看全部 ':'收起'}
                                                 <Icon type={!item.showAll?"down":'up'} />
                                                 </a>:""


                                            var len1 = 80;
                                    
                                            if( datalist.content.length > len1 ){
                                                if(!item.showAll1){
                                                    datalist.content = datalist.defaultContent.substring(0,len1)+'...';
                                                }
                                                else{
                                                    datalist.content = datalist.defaultContent
                                                }
                                            }
                                            var showMore1 = datalist.defaultContent.length > len1? <a  className='wenming-expand'
                                                onClick={()=>{item.showAll1 = !item.showAll1;this.forceUpdate(()=>{this.scroll.refresh()})}}
                                                 href='javascript:;'
                                                 >
                                                 {!item.showAll1?'展开全文 ':'收起'}
                                                 <Icon type={!item.showAll1?"down":'up'} />
                                                 </a>:""
                                            return <li key={k} className={className}>
                                                    <aside>
                                                        <Checkbox checked={item.checked} onChange={()=>{item.checked=!item.checked;this.state.selectAll = false;this.forceUpdate();}}></Checkbox>
                                                    </aside>
                                                    <aside className='wenming-datacheck-item-C'>
                                                        <section className='wenming-datacheck-item-head'>
                                                            <img src={item.headimgurl||defaulturl}/>
                                                        </section>
                                                        <section className='wenming-datacheck-item-main-content'>
                                                            <h2>{item.nickname}</h2>
                                                            <div className='wenming-datacheck-content'>
                                                                <div dangerouslySetInnerHTML={this.createMarkup(item.commenttxt)}></div>
                                                                {showMore}
                                                            </div>
                                                            <ol>
                                                                {
                                                                    item.commentimg && item.commentimg.split(',').map((img,m)=>{
                                                                        return <li key={m} onClick={this.viewPic.bind(this,i,k,m)}  style={{cursor:'url(./static/images/big.cur),auto',background:'url('+img+') no-repeat center center / cover'}}></li>
                                                                    })
                                                                }
                                                            </ol>
                                                            <div>{item.createtime}</div>
                                                            <div style={{color:'#0099cc',fontWeigt:'bold'}} className='wenming-from'>来自：</div>
                                                            <div style={{maxWidth:'90%',marginTop:10}}>
																<div className='wenming-comment-user'>
																	<img src={datalist.headimgurl} alt=""/>
																	<span>{datalist.nickname}</span>
																	<span>{datalist.looktime}</span>
																</div>
																<div className='wenming-comment-title'>{datalist.title}</div>
                                                                <div dangerouslySetInnerHTML={this.createMarkup(datalist.content)}></div>
                                                                {showMore1}

                                                                <ol>
                                                                    {datalist.imageslist.map((img,h)=>{

                                                                        return <li key={h} onClick={this.viewArticlePic.bind(this,i,h)}  style={{cursor:'url(./static/images/big.cur),auto',background:'url('+img+') no-repeat center center / cover'}}>
                                                                            <img  src={img} style={{opacity:0,width:100,height:100}}/>
                                                                        </li>
                                                                      
                                                                    })}
                                                                    {datalist.voidurl  && <li onClick={this.viewVideo.bind(this,datalist.voidurl )}><span>视频文件</span></li>}
                                                                </ol>

                                                            </div>
                                                                {this.state.status === 0 && <section className='wenming-datacheck-operator'>
                                                                    <div>
                                                                        {<div onClick={this.checkedComment.bind(this,item,'pass',i,k)}>
                                                                           <Icon className='wenming-pass' type="check-circle" /> 通过审核
                                                                        </div>}
                                                                        {<div onClick={this.checkedComment.bind(this,item,'unpass',i,k)}>
                                                                            <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                                        </div>}
                                                                    </div>
                                                                </section>}
                                                                {this.state.status === 1 && false && <section className='wenming-datacheck-operator'>
                                                                    <div>
                                                                        {<div onClick={this.checkedComment.bind(this,item,'pass',i,k)}>
                                                                           <Icon className='wenming-pass' type="check-circle" /> 通过审核
                                                                        </div>}
                                                                        {<div onClick={this.checkedComment.bind(this,item,'unpass',i,k)}>
                                                                            <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                                        </div>}
                                                                    </div>
                                                                </section>}                                                                                                                                        
                                                        </section>
                                                    </aside>
                                                    <aside>

                                                     <Popconfirm onConfirm={this.delete.bind(this,i,k,item.commentid)} placement="leftTop" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                            <div><Icon type='delete'/> 删除</div>
                                                      </Popconfirm>
                                                        
                                                    </aside>
                                                </li>


                                            })

                                    })
                                }

                                <li style={{height:40}}></li>
                                    
                            </ul>
                        </section>

                        <section className='wenming-pagination' style={{height:40}}>
                            <Pagination showQuickJumper current={this.state.pageIndex} pageSize={this.state.pageSize} total={this.state.allCount} onChange={this.loadMoreArticle.bind(this)} />
                        </section>
                        {this.state.currentViewPic && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                            <div onContextMenu={this.download.bind(this)}>
                                <img onMouseDown={this.hideImg.bind(this)} className={this.state.showImg?'show':''} style={{maxHeight:this.state.mainHeight-100,maxWidth:this.viewW-window.mainLeftSize}}  src={this.state.currentViewPic} />
                                <section onClick={this.viewPrev.bind(this)} style={{cursor:'url(./static/images/pic_prev.cur),auto'}}></section>
                                <section onClick={()=>{this.setState({currentViewPic:''})}} style={{cursor:'url(./static/images/small.cur),auto'}}></section>
                                <section onClick={this.viewNext.bind(this)} style={{cursor:'url(./static/images/pic_next.cur),auto'}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                        </div>}

                        {this.state.voidurl  && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                            <div>
                                <video autoPlay width={(this.viewW-window.mainLeftSize)/2} height={this.state.mainHeight/2}  controls src={this.state.voidurl}></video>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                                <section>
                                </section>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                        </div>}
                    </div>
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );


    }

    hideImg(e) {
        this.setState({
            showImg: false
        })
    }

    download() {
        this.setState({
            showImg: true
        })
    }


    loadCommentByClass(e) {
        var arr = e.target.value.split('-');

        this.setState({
            tab: e.target.value
        }, () => {
            if (e.target.value === 'all') {
                this.setState({
                    currentWhere: {}
                }, () => {
                    this.loadComment(this.state.status);
                })

                return;
            }

            var type = '',
                value = '';
            switch (arr[0]) {
                case "checked":
                    type = 'status';
                    value = arr[1] === 'pass' ? 1 : 2
                    break;
                case "recommend":
                    type = 'ishot';
                    value = arr[1] === 'recommend' ? 1 : 0
                    break;
            }

            this.setState({
                currentWhere: {
                    type,
                    value
                }
            }, () => {
                this.loadComment(this.state.status, undefined, {
                    type,
                    value
                })
            })


        });



    }


    createMarkup(item) {
        return {
            __html: item
        };
    }



    getCheckedData(index) {
        this.setState({
            pageIndex: 1
        }, () => {
            this.loadComment(index * 1);
        })

    }

    recommentArticle(item) {
        //item.isHost = true;
        var ishot = 1;
        if (item.isHost) { //取消推荐
            ishot = 0;
        } else { //推荐.

        }

        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS+'/hot_articles/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articleids: item.id,
                ishot
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                item.isHost = !item.isHost;
                this.forceUpdate();
                message.success(ishot ? "推荐成功" : '取消推荐成功');
            }
        })
    }

    loadCommentByType(id, name) {


        this.setState({
            classid: id,
            classname: name
        }, () => {
            this.loadComment(this.state.status);
        })
    }

    viewNext() {
        if (this.currentType === 'article') {
            this.setState({
                currentPicIndex: this.state.currentPicIndex + 1,
                currentViewPic: this.state.dataSource[this.currentRow].imageslist[this.state.currentPicIndex + 1]
            })
        } else {
            this.setState({
                currentPicIndex: this.state.currentPicIndex + 1,
                currentViewPic: this.state.dataSource[this.currentRow].comments[this.state.currentCommentIndex].commentimg.split(',')[[this.state.currentPicIndex + 1]]
            })
        }
    }

    viewPrev() {
        if (this.currentType === 'article') {
            this.setState({
                currentPicIndex: this.state.currentPicIndex - 1,
                currentViewPic: this.state.dataSource[this.currentRow].imageslist[this.state.currentPicIndex - 1]
            })
        } else {
            this.setState({
                currentPicIndex: this.state.currentPicIndex - 1,
                currentViewPic: this.state.dataSource[this.currentRow].comments[this.state.currentCommentIndex].commentimg.split(',')[[this.state.currentPicIndex - 1]]
            })
        }

    }

    viewVideo(voidurl) {
        this.setState({
            voidurl
        });
    }


    viewArticlePic(i, k) {
        this.currentType = 'article';
        this.currentRow = i;
        this.setState({
            currentPicIndex: k,
            currentViewPic: this.state.dataSource[i].imageslist[k]
        })
    }


    viewPic(i, k, m) {
        this.currentType = 'comment';
        this.currentRow = i;
        if (this.state.dataSource[i]) {
            this.setState({
                currentPicIndex: m,
                currentCommentIndex: k,
                currentViewPic: this.state.dataSource[i].comments[k].commentimg.split(',')[m]
            })
        }

    }


    batchDelete() {
        var arr = [];

        this.state.dataSource.map((item, i) => {
            item.comments.map((com, k) => {
                if (com.checked) {
                    arr.push(com.commentid);
                    this.delete(i, k, com.commentid, false);
                }
            });

        });

        if (arr.length <= 0) {
            message.error('请选择您要删除的文章~~');
            return;
        }



    }

    delete(index, k, articleids, showMsg = true) {

        //


        $.ajax({
            async: false,
            type: 'post',
            url: baseUrl + WMURLS+'/del_articlecomment/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                commentid: articleids
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                showMsg && message.success('删除成功');

                this.loadComment(this.state.status)
            }
        })


    }

    batchChecked(type) {

        var status = 1;
        switch (type) {
            case 'pass':
                break;
            case 'unpass':
                status = 2;
                break;
        }

        var arr = [];

        this.state.dataSource.map((item, i) => {
            item.comments.map((com, k) => {
                if (com.checked) {
                    arr.push(com.commentid);
                    this.checkedComment(com, type, i, k, false);
                }
            })

        });

        if (arr.length <= 0) {
            message.error('请选择您要审核的文章~~');
            return;
        }

    }

    checkedComment(item, type, index, k, showMsg = true) {


        this.forceUpdate();
        var status = 1;
        switch (type) {
            case "pass": //审核通过

                break;
            case 'unpass': //审核不通过 
                status = 2;
                break;
        }

        $.ajax({
            type: 'post',
            async: false,
            url: baseUrl + WMURLS+'/look_articlecomment/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                commentid: item.commentid,
                status
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            if (data.getret === 0) {

                this.loadComment(this.state.status);

                showMsg && message.success('审核成功');

            }
        })



    }

    selectAll() {
        this.state.dataSource.forEach((item, i) => {
            item.comments.forEach((com, k) => {
                com.checked = !this.state.selectAll;
            })
        })
        this.setState({
            selectAll: !this.state.selectAll
        });

    }

    loadMoreArticle(e) { //分页
        this.setState({
            pageIndex: e
        }, () => {
            this.loadComment(this.state.status, e);
        })
    }

    loadComment(index, e, other) {



        var state = {
            status: index
        }
        if (!e) {
            state.pageIndex = 1;
        }
        this.setState(state, () => {
            var data = {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,

                page: this.state.pageIndex,
                pagenum: this.state.pageSize
            }
            if (this.state.currentWhere.type) {
                if (this.state.status === 1) {
                    data[this.state.currentWhere.type] = this.state.currentWhere.value;
                }
                if (this.state.currentWhere.type !== 'status') {
                    data.status = 1;
                }

            } else {
                data.status = index === 1 ? 1 : 0;
            }
            if (this.state.classid) {
                //data.classid = this.state.classid;
            }
            $.ajax({
                type: 'post',
                url: baseUrl + WMURLS+'/get_articlecomment/',
                data
            }).done((data) => {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }

                if (data.getret === 0) {
                    data.list.map((item, i) => {
                        var imgs = item.imageslist.split(',');
                        if (!imgs[0]) {
                            imgs.shift();
                        }
                        item.imageslist = imgs;
                        item.defaultContent = item.content;

                        item.comments.forEach((com, k) => {
                            com.defaultCommenttxt = com.commenttxt;
                        })
                    });
                    this.state.dataSource = data.list;
                    this.state.selectAll = false;

                    this.state.allCount = data.countRow.countrows



                    this.forceUpdate(() => {
                        this.scroll.refresh();
                    });
                }
            }, () => {

            })
        });
    }



    request() {

        this.loadComment(0);


        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS+'/search_articleclass',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {


                this.setState({
                    typeList: data.list
                })
            }
        })

    }


    formatNumber(s, n = 3) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
    }



}

export default ZmitiValidateUser(ZmitiWenmingDataCheckApp);