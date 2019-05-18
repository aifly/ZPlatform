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


import { WMURLS, title, baseUrl} from './url';
import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';
var defaulturl = 'http://www.zmiti.com/main/static/images/zmiti-logo.jpg';
class ZmitiWenmingCommentDetailApp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            selectAll: false,
            allCount: 1,
            pageIndex: 1,

            currentPicIndex: 0,


            currentViewPic: '',

            currentDeleteIndex: -1,

            tab: 'all',

            currentCommentIndex: -1,

            currentWhere: {},

            status: 0,

            pageSize: 10,

            voidurl: '',

            loadingState: [
                '加载更多',
                'down'
            ],

            isMore: false,

            typeList: [],

            classname: '全部',

            dataSource: [{
                content: '',
                defaultContent: ''
            }]
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
        }, 2000)

        this.request();


    }


    render() {


        var title = '身边文明事';


        var showBatchbars = false;
        this.state.dataSource.map((item, i) => {
            if (item.checked) {
                showBatchbars = true;
            }
        });
        var menu = (
            <Menu>
                <Menu.Item >
                    <a onClick={this.loadArticleByIdByType.bind(this,'','全部')} href="javascript:">全部</a>
                </Menu.Item>
                {this.state.typeList.map((item,i)=>{
                    return <Menu.Item key={i}>
                        <a  onClick={this.loadArticleByIdByType.bind(this,item.classid,item.classname)} href="javascript:">{item.classname}</a>
                    </Menu.Item>
                })}
                    
              </Menu>)

        var plainOptions = [{
                label: '全部',
                value: 'all'
            }, {
                label: '审核通过',
                value: 1
            }, {
                label: '未审核',
                value: 0
            }

        ];

        var dataSource = this.state.dataSource[0] || {}


        var len = 80;

        if (dataSource.content.length > len) {
            if (!dataSource.showAll) {
                dataSource.content = dataSource.defaultContent.substring(0, len) + '...';
            } else {
                dataSource.content = dataSource.defaultContent
            }
        }
        var showMore = dataSource.defaultContent.length > len ? <a  className='wenming-expand'
            onClick={()=>{dataSource.showAll = !dataSource.showAll;this.forceUpdate(()=>{this.scroll&&this.scroll.refresh()})}}
             href='javascript:;'
             >
             {!dataSource.showAll?'查看全部 ':'收起'}
             <Icon type={!dataSource.showAll?"down":'up'} />
             </a> : ""

        var props = {
            title,
            selectedIndex: 67,
            mainRight: <div className='wenming-datacheck-main-ui' style={{height:this.state.mainHeight}}>
                        <header className='wenming-datacheck-header'>
                            <div>数据审核-{title}</div>   
                            <div></div>
                            <div><a href='#/wenmingadd'><Icon type="upload"/>上报数据</a></div>   
                        </header>
                        <section className='wenming-datacheck-bar wenming-detail-bar'>
                            <div className=''>
                                <span>数据审核 > 查看评论</span>
                            </div>
                        </section>
                        <section className='wenming-article-detail-list' ref='wenming-datacheck-list'>
                            <div>
                                <aside>
                                    {dataSource.headimgurl && <img src={dataSource.headimgurl}/> }
                                </aside>
                                <aside>
                                    <section>
                                        {dataSource.nickname}
                                    </section>
                                    <section>{dataSource.looktime}</section>
                                    <section>{dataSource.content}{showMore}</section>
                                    <ol>
                                        {dataSource.imageslist&&dataSource.imageslist.split(',').map((img,i)=>{
                                            return <li key={i} onClick={this.viewArticlePic.bind(this,i)}  style={{cursor:'url(./static/images/big.cur),auto',background:'url('+img+') no-repeat center center / cover'}}></li>
                                        })}
                                    </ol>
                                    <section className='wenming-detail-seecomment'>
                                        <div><Icon type="message" /> 查看评论 ({this.state.allCount}条)</div>
                                    </section>
                                    <section className='wenming-detail-comment-list'>
                                        <RadioGroup options={plainOptions} onChange={this.filterComents.bind(this)} value={this.state.tab }>
                                            {plainOptions.map((item,i)=>{
                                                return <Radio key={i} value={item.value}>{item.label}</Radio>
                                            })}
                                        </RadioGroup>
                                        <div>
                                            <ul>
                                                {dataSource.comments && dataSource.comments.map((com,i)=>{

                                                    var passClass = '';
                                                    if(com.status === 0){

                                                        passClass = './static/images/unpass.png';
                                                    }
                                                    else if( com.status === 1){
                                                        passClass = './static/images/pass.png';
                                                    }

                                                     var className='';

                                                    if(this.state.currentDeleteIndex===i){
                                                        className+= ' wenming-datacheck-item-delete'
                                                    }
                                                    return <li key ={i} className={className}>
                                                       <div>
                                                            <aside>
                                                                <img src={com.headimgurl}/>         
                                                            </aside>
                                                            <aside>
                                                                <section style={{color:'#ea7350'}}>{com.nickname}</section>
                                                                <section>
                                                                     <ol>
                                                                        {
                                                                            com.commentimg && com.commentimg.split(',').map((img,m)=>{
                                                                                return <li key={m} onClick={this.viewPic.bind(this,m,i)}  style={{cursor:'url(./static/images/big.cur),auto',background:'url('+img+') no-repeat center center / cover'}}>
                                                                                        <img  src={img} style={{opacity:0,width:100,height:100}}/>
                                                                                </li>
                                                                            })
                                                                        }
                                                                    </ol>
                                                                </section>
                                                                <section>
                                                                    {com.commenttxt}
                                                                </section>
                                                                <section>{com.createtime}</section>
                                                               
                                                            </aside>
                                                            <aside>
                                                                {passClass && <img src={passClass}/>}
                                                                
                                                            </aside>
                                                       </div>
                                                        <section className='wenming-detail-comment-delete'>
                                                             <Popconfirm onConfirm={this.delete.bind(this,i,com.commentid)} placement="leftTop" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                                    <div><Icon  className='wenming-delete' type='delete'/> 删除</div>
                                                              </Popconfirm>
                                                              {<div style={{opacity:com.status*1===0?1:0}} onClick={this.checkedComment.bind(this,com,'pass',i)}>
                                                                   <Icon className='wenming-pass' type="check-circle" /> 通过审核
                                                                </div>}
                                                                {<div  style={{opacity:com.status*1===0?1:0}} onClick={this.checkedComment.bind(this,com,'unpass',i)}>
                                                                    <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                                </div>}
                                                        </section>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                        <div onClick={this.loadMore.bind(this)} className='wenming-comment-load-more'>
                                            {this.state.loadingState[0]}<Icon type={this.state.loadingState[1]}/>
                                        </div>
                                    </section>
                                </aside>
                                <aside></aside>
                            </div>
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

    filterComents(val) {
        this.setState({
            tab: val.target.value
        })
        this.defaultCom = this.defaultCom || this.state.dataSource[0].comments.concat([]);
        this.state.dataSource[0].comments = this.defaultCom.filter((item, i) => {
            if (val.target.value === 'all') {

                return true;
            } else {
                return item.status === val.target.value * 1;
            }
        });
        this.forceUpdate(() => {
            this.scroll.refresh();
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
            this.loadArticleById(index * 1);
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
            url:baseUrl + WMURLS+'/hot_articles/',
            data: {
                appid: window.WENMING.XCXAPPID,
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

    loadArticleByIdByType(id, name) {


        this.setState({
            classid: id,
            classname: name
        }, () => {
            this.loadArticleById(this.state.status);
        })
    }

    viewNext() {

        if (this.currentType === 'comment') {
            this.setState({
                currentPicIndex: this.state.currentPicIndex + 1,
                currentViewPic: this.state.dataSource[0].comments[this.state.currentCommentIndex].commentimg.split(',')[this.state.currentPicIndex + 1]
            })
        } else {
            this.setState({
                currentPicIndex: this.state.currentPicIndex + 1,
                currentViewPic: this.state.dataSource[0].imageslist.split(',')[this.state.currentPicIndex + 1]
            })
        }

    }

    viewPrev() {
        if (this.currentType === 'comment') {
            this.setState({
                currentPicIndex: this.state.currentPicIndex - 1,
                currentViewPic: this.state.dataSource[0].comments[this.state.currentCommentIndex].commentimg.split(',')[this.state.currentPicIndex - 1]
            })
        } else {
            this.setState({
                currentPicIndex: this.state.currentPicIndex - 1,
                currentViewPic: this.state.dataSource[0].imageslist.split(',')[this.state.currentPicIndex - 1]
            })
        }


    }

    viewArticlePic(i) {
        this.currentType = 'article';
        this.currentRow = 0;
        this.setState({
            currentPicIndex: i,
            currentViewPic: this.state.dataSource[0].imageslist.split(',')[i]
        })
    }


    viewPic(m, i) {

        this.currentType = 'comment';

        this.currentRow = m;

        this.setState({
            currentCommentIndex: i,
            currentPicIndex: m,
            currentViewPic: this.state.dataSource[0].comments[i].commentimg.split(',')[m]
        })
    }



    delete(index, articleids) {

        //

        this.setState({
            currentDeleteIndex: index
        })


        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/del_articlecomment/',
            data: {
                appid: window.WENMING.XCXAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                commentid: articleids
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                message.success("删除成功");

                this.state.dataSource[0].comments.splice(index, 1);
                this.state.currentDeleteIndex = -1;
                this.forceUpdate();
            }
        })
    }


    checkedComment(item, type, index) {
        if (item.status === 1) {
            return;
        }

        this.state.currentDeleteIndex = index;
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
            url:baseUrl + WMURLS+'/look_articlecomment/',
            data: {
                appid: window.WENMING.XCXAPPID,
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

                if (index > -1) {
                    message.success('审核成功');
                    setTimeout(() => {
                        this.state.dataSource[0].comments[index].status = status;
                        this.state.currentDeleteIndex = -1;

                        this.forceUpdate(() => {
                            this.scroll.refresh();
                        });
                    }, 500)
                } else {

                }
            }
        })



    }



    loadMore() {
        if (this.state.loadingState[0] === '没有更多了') {
            return;
        }
        this.setState({
            pageIndex: this.state.pageIndex + 1,
            loadingState: ['加载中...', 'loading']
        }, () => {
            this.loadArticleById(this.state.status, this.state.pageIndex);
        })
    }

    loadArticleById(index, e, other) {


        var articlid = this.props.params.id;


        var state = {
            status: index
        }
        if (!e) {
            state.pageIndex = 1;
        }
        this.setState(state, () => {
            var data = {
                appid: window.WENMING.XCXAPPID,
                userid: this.userid,
                pagenum: this.state.pageSize,
                page: this.state.pageIndex,
                getusersigid: this.getusersigid,
                articlid
            }

            $.ajax({
                type: 'post',
                url:baseUrl + WMURLS+'/get_articlecomment/',
                data
            }).done((data) => {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }


                if (data.getret === 0) {
                    if (data.list.length <= 0) {
                        this.setState({
                            loadingState: ['没有更多了', 'frown-o']
                        })
                        return;
                    }
                    data.list.forEach((item, i) => {
                        item.defaultContent = item.content;
                    })
                    this.state.dataSource = data.list;
                    this.defaultComments = this.defaultComments || [];

                    this.defaultComments = this.defaultComments.concat(data.list[0].comments);
                    ///console.log('data.list[0].comments.length => '+data.list[0].comments.length);
                    this.state.dataSource[0].comments = this.defaultComments;

                    this.state.allCount = data.countRow.countrows;
                    loadingState: ['加载更多', 'down']
                    this.forceUpdate(() => {
                        this.scroll.refresh();
                    });


                }
            }, () => {

            })
        });
    }



    request() {

        this.loadArticleById(0);


        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/search_articleclass',
            data: {
                appid: window.WENMING.XCXAPPID,
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

export default ZmitiValidateUser(ZmitiWenmingCommentDetailApp);