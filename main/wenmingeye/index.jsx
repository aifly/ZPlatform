import './static/css/index.css';
import React from 'react';
import {
    Button,
    notification
} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import '../static/echarts/china';
import { WMURLS, title, baseUrl} from './url';
import IScroll from 'iscroll';
var defaulturl = 'http://www.zmti.com/main/static/images/zmiti-logo.jpg';

var unload = false;

class ZmitiWenmingApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [],
            list2 = [];

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            totalPV: '000,000,000',
            monthPV: 0,
            dayPV: 0,
            allPV: 0,
            provinceRankingList: list1,
            userRankingList: list2,
            provincePVSort: 'sort-down',
            provinceReportSort: '',
            userCommentSort: '',
            userReportSort: 'sort-down',
            totalComment: '总评论数',
            totalReport: '总人数',
            totalCommentNum: '',
            totalReportNum: '',
            totalView: 0,
        }
    }

    componentWillUnmount() {
        this.unmout = true;
        unload = true;
        this.totalpvAjax && this.totalpvAjax.abort();
        this.userareatotalpv && this.userareatotalpv.abort();

    }

    componentWillMount() {
        this.unmout = false;
        unload = false;
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
        setTimeout(() => {
            this.initEcharts();
            var worksid = 'wenming-login';
            this.worksid = worksid;

            this.socket();
            /// this.formatPV(localStorage.getItem('defaultcount' + this.worksid) * 1 || 0);
            this.request();
            this.setScroll();
        }, 300);

    }

    setScroll() {

        this.refs['provice-scroller'] && (this.proviceScroll = new IScroll(this.refs['provice-scroller'], {
            scrollbars: true, //显示滚动条
            interactiveScrollbars: true, //允许用户拖动滚动条
            mouseWheel: true, //启用鼠标滚轮。
        }));

        this.refs['user-scroller'] && (this.userScroll = new IScroll(this.refs['user-scroller'], {
            scrollbars: true, //显示滚动条
            interactiveScrollbars: true, //允许用户拖动滚动条
            mouseWheel: true, //启用鼠标滚轮。
        }));


    }

    getPos(data) {
        var s = this;

        var worksid = this.worksid;

        $.ajax({
            url: `http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${data.pos[0]},${data.pos[1]}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1` + '',
            type: 'get',
            error() {

            },
            success(d) {
                if (d.status === '1' && d.infocode === '10000') {

                    var addressComponent = d.regeocode.addressComponent;
                    /*var opt = {
                        type:'map',
                        address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
                        pos:[wx.longitude,wx.latitude],
                        nickname:nickname,
                        headimgurl:headimgurl
                    }*/

                    var address = (addressComponent.city[0] || addressComponent.province) + addressComponent.district;



                    if (s.geoCoordMap[address]) { //存在
                        s.userData.forEach(function(item, i) {
                            if (item.name === address) {
                                item.value++;
                            }
                        });

                    } else {
                        s.geoCoordMap[address] = data.pos;
                        s.userData.push({
                            name: address,
                            value: 1
                        });
                    }
                    //s.defaultCount = localStorage.getItem('defaultcount'+ worksid) || 0;



                    s.getVisit();


                    // localStorage.setItem('defaultcount'+ worksid,s.defaultCount);
                    s.pv++;
                    //localStorage.setItem('pv'+ worksid,s.pv);
                    // localStorage.setItem('uv'+ worksid,s.uv);



                    // localStorage.setItem('geoCoordMap'+worksid,JSON.stringify(s.geoCoordMap));
                    //localStorage.setItem('userData'+worksid,JSON.stringify({userData:s.userData}));

                    var nickname = data.nickname;
                    var headimgurl = data.headimgurl;


                    s.myChart.setOption(s.dataConfig(s.userData));


                } else {

                }
            }
        })
    }


    userOnLine(username = '智媒体用户', headerimgurl = defaulturl) {
        notification.config({
            duration: 5,

        })
        notification.open({
            className: 'wenming-online',
            message: '上线提示',
            description: username,
            icon: <img src={headerimgurl||defaulturl}/>
        });
    }

    report(username = "智媒体用户", headerimgurl = "http://www.zmiti.com/main/static/images/zmiti-logo.jpg", content = "从医12年，刘廷涛心里裝得最多的是患者，做得最多的也是为患者。他把“大医...") {
        notification.open({
            duration: 4,
            message: '上报提示',
            description: content,
            btn: <div className='wenming-notification'>
                <a href='#/wenmingdatacheck'>
                    点击查看
                </a>
                <img src={headerimgurl}/>
                <span className='zmiti-text-overflow'>{username}</span>
            </div>
        });
    }

    socket() {

        if(!window.io){
            return;
        }

        var socket = io('http://socket.zmiti.com:2120');
        var worksid = this.worksid;

        var s = this;
        var socketEvent = function(msg) {
            if (!msg) {
                return;
            }
            msg = msg.replace(/&quot;/g, "\"");

            var data = JSON.parse(msg);


            var zmitiWx = {
                longitude: data.pos[0],
                latitude: data.pos[1],
            }

            s.userOnLine(data.nickname || '智媒体用户', data.headimageurl || defaulturl);
            s.getPos(data)
        }

        socket.off(worksid);

        socket.on(worksid, socketEvent);

        var reportEvent = (msg) => {
            if (!msg) {
                return;
            }
            msg = msg.replace(/&quot;/g, "\"");

            var data = JSON.parse(msg);

            this.report(data.nickname, data.headimageurl, data.content);

        }

        socket.off('wenming-report');
        socket.on('wenming-report', reportEvent);
    }


    fillUVPV() {

    }

    fillPV() {}

    changeAccount() {

    }

    render() {
       
        var props = {
            title,
            selectedIndex: 0,
            mainRight: <div className='wenming-main-ui' style={{height:this.state.mainHeight}}>
                            <section>
                                <aside className='wenming-map-C'>
                                    <header  className='wenming-header'>
                                        浏览量分布图
                                    </header>
                                    <section className='wenming-statistics'>
                                        <aside ref='map'>

                                        </aside>
                                        <aside>
                                            <div className='wenming-total-pv'>
                                                总浏览量<span>{this.state.totalPV}</span>人
                                            </div>
                                            <div className='wenming-month-day-pv'>
                                                <section>
                                                    <div>
                                                        <div>月浏览量</div>
                                                        <div ref='month'>{this.formatNumber(this.state.monthPV)}</div>
                                                    </div>
                                                </section>
                                                <section>
                                                    <div>
                                                        <div>日浏览量</div>
                                                        <div>{this.formatNumber(this.state.dayPV)}</div>
                                                    </div>
                                                </section>
                                            </div>
                                        </aside>
                                    </section>
                                </aside>
                                <aside className='weniming-statistics-list'>
                                    <section>
                                        <header className='wenming-header'>
                                            <a href='#/wenmingprovince/'>省排行榜</a>
                                        </header>
                                        <section className='wenming-list-title'>
                                            <div>排名</div>
                                            <div>省份</div>
                                            <div onClick={this.sortList.bind(this,'provincePVSort')} className={'wenming-sort '+this.state.provincePVSort}>浏览量</div>
                                            <div onClick={this.sortList.bind(this,'provinceReportSort')} className={'wenming-sort ' + this.state.provinceReportSort}>上报</div>
                                        </section>
                                        <section className='wenming-ranking-list' ref='provice-scroller'>
                                            <ul>
                                                {this.state.provinceRankingList.map((item,i)=>{
                                                    return <li key={i}>
                                                        <a href={'#/wenmingcity/'+item.provincecode}>
                                                            <div>{i+1}</div>
                                                            <div title={item.province} className='zmiti-text-overflow'>{item.province}</div>
                                                            <div>{item.pv}</div>
                                                            <div>{item.report}</div>
                                                        </a>
                                                    </li>
                                                })}
                                            </ul>
                                        </section>
                                        <h2 style={{height:10}}></h2>
                                    </section>
                                    <section>
                                        <header   className='wenming-header'>
                                            <a href='#/wenmingpersonal/'>个人排行榜</a>
                                            <span style={{float:'right',color:'#999',fontSize:'12px',paddingTop:'5px',paddingRight:'5px'}}>{this.state.totalReport}：{this.state.totalView}</span>
                                        </header>
                                       <section className='wenming-list-title'>
                                            <div style={{opacity:1}}>头像</div>
                                            <div>昵称</div>
                                            <div onClick={this.sortList.bind(this,'userCommentSort')} className={'wenming-no-sort wenming-sort '+this.state.userCommentSort}>评论数</div>
                                            <div onClick={this.sortList.bind(this,'userReportSort')} className={'wenming-no-sort wenming-sort ' + this.state.userReportSort}>上报</div>
                                        </section>
                                        <section className='wenming-ranking-list' ref='user-scroller'>
                                            <ul>
                                                {this.state.userRankingList.map((item,i)=>{
                                                    return <li key={i}>
                                                            <a href="javascript:void(0)" style={{cursor:'default'}}>
                                                                <div><img src={item.headerimgurl||defaulturl}/></div>
                                                                <div title={item.nickname} className='zmiti-text-overflow'>{item.nickname}</div>
                                                                <div>{item.commentCount}</div>
                                                                <div>{item.report}</div>
                                                            </a>
                                                        </li>
                                                })}
                                            </ul>
                                        </section>
                                        <h2 style={{height:10}}></h2>
                                    </section>
                                </aside>
                            </section>    

                        </div>
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );


    }

    sortBy(filed, rev, primer) {
        rev = (rev) ? -1 : 1;
        return function(a, b) {
            a = a[filed];
            b = b[filed];
            if (typeof(primer) != 'undefined') {
                a = primer(a);
                b = primer(b);
            }
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 1;
        }
    }

    sortList(type, e) {
        window.ss = this;
        e.preventDefault();

        switch (type) {
            case "provincePVSort":
                this.state.provincePVSort = this.state.provincePVSort === 'sort-down' ? 'sort-up' : 'sort-down';
                this.state.provinceReportSort = '';

                this.state.provinceRankingList.sort(this.sortBy('pv', this.state.provincePVSort === 'sort-down', parseInt))

                break;
            case 'provinceReportSort':

                this.state.provinceReportSort = this.state.provinceReportSort === 'sort-down' ? 'sort-up' : 'sort-down';
                this.state.provincePVSort = '';

                this.state.provinceRankingList.sort(this.sortBy('report', this.state.provinceReportSort === 'sort-down', parseInt))


                break;
            case "userCommentSort":
                this.setState({
                    //totalReport:'评论数',
                    userCommentSort: 'sort-down',
                    userReportSort: '',
                    userRankingList: this.userRankingList
                });

                this.requestUserRank('userCommentSort');
                //this.state.totalView=this.state.totalCommentNum;//评论数

                break;
            case 'userReportSort':

                this.requestUserRank('userReportSort');
                this.setState({
                    totalReport: '总人数',
                    userCommentSort: '',
                    userReportSort: 'sort-down',
                    userRankingList: this.userRankingList1
                });
                //this.state.totalView=this.state.totalReportNum;//上报人数
                /*this.state.userReportSort ='sort-down';// this.state.userReportSort === 'sort-down'?'sort-up':'sort-down';
                this.state.userCommentSort = '';
                if(this.state.userReportSort === 'sort-down'){

                    this.state.userRankingList.sort(this.sortBy('report',true,parseInt))

                }*/
                break;

        }

        this.forceUpdate();



    }

    formatPV(num = 8888) {
        var n = num + '';
        var _len = n.length;
        var pvLen = this.state.totalPV.length;
        var number = this.formatNumber(num);
        //1,234
        var arr = this.state.totalPV.split('');
        number.split('').reverse().map((item, i) => {
            arr[pvLen - i - 1] = item;
            //this.state.totalPV[pvLen-i-1] = item;
        });
        // this.state.allPV = num;

        this.state.totalPV = arr.join('');
        this.forceUpdate();


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

    initEcharts() {
        if (!this.refs['map']) {
            return;
        }
        var s = this;
        var worksid = this.worksid;
        this.lastCityId = this.lastCityId || -1;
        var myChart = echarts.init(this.refs['map']);

        if (!myChart) {
            return;
        }

        var userData = [
            /*  {
                name: "常德市",
                value: 1023,
                key: 'asa'
            },*/
        ];
        var geoCoordMap = {
            //"常德市": [111.7087330000, 28.9399430000]
        };
        this.userData = userData;
        this.geoCoordMap = geoCoordMap;

        window.s = s;


        //geoCoordMap = localStorage.getItem('geoCoordMap'+worksid) || '{}';
        //geoCoordMap = JSON.parse(geoCoordMap);

        //var userArr = localStorage.getItem('userData' + worksid) || '{}';
        // userData = JSON.parse(userArr).userData || [];

        this.myChart = myChart;

        myChart.setOption(this.dataConfig(userData), true);

    }

    requestUserRank(type = 'userReportSort') {
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/usersort/',
            data: {
                appid: window.WENMING.XCXAPPID,
                monthnum: 3,
                usernum: 30,
                userid: this.userid,
                getusersigid: this.getusersigid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                this.userRankingList = data.list.concat([]);
                var commentCount = 0;
                data.list.map((item, i) => {
                    commentCount += item.commentCount;
                })
                this.state.totalCommentNum = commentCount; //评论数
                this.state.totalReportNum = data.list1.length; //上报数

                this.userRankingList1 = (data.list1 || []).concat([])
                this.setState({
                    userRankingList: type === 'userCommentSort' ? data.list : data.list1
                }, () => {
                    this.userScroll.refresh();
                });

            }
        });
    }

    getVisit() {
        var s = this;

        this.totalpvAjax = $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/totalpv/',
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
                /**/
                this.state.monthPV = data.list.monthpv;
                this.state.dayPV = data.list.daypv;
                this.state.allPV = data.list.totalpv;
                this.formatPV(data.list.totalpv);
                localStorage.setItem('defaultcount' + this.worksid, data.list.totalpv);
            }
        });


        this.userareatotalpv = $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/userareatotalpv/',
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

                s.userData = [];
                s.geoCoordMap = {};
                data.list.map(function(item, i) {
                    if (item.cityname) {
                        s.userData.push({
                            name: item.cityname,
                            value: item.usercount
                        });
                        s.geoCoordMap[item.cityname] = [item.longitude, item.latitude];
                    }

                    ///s.geoCoordMap = JSON.parse(s.geoCoordMap);
                });

                localStorage.setItem('geoCoordMap' + this.worksid, JSON.stringify(s.geoCoordMap));
                localStorage.setItem('userData' + this.worksid, JSON.stringify({
                    userData: s.userData
                }));
                s.myChart && s.myChart.setOption(s.dataConfig(s.userData), true);
            }
        })
    }

    //获取用户数
    getusertotal() {
        var s = this;
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/xcxusercount',
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
                //console.log(data.result.usercount,'用户数统计')
                s.state.totalView = data.result.usercount;
                s.forceUpdate();
            }
        });
    }

    request() {

        var s = this;
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/provincesort/',
            data: {
                appid: window.WENMING.XCXAPPID,
                monthnum: 3,
                userid: this.userid,
                getusersigid: this.getusersigid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                this.provinceRankingList = data.list.concat([]);
                this.setState({
                    provinceRankingList: data.list
                }, () => {
                    this.proviceScroll.refresh();
                });

            }
        });


        this.requestUserRank();

        this.getVisit();
        this.getusertotal();


    }

    dataConfig(userData) {
        var s = this;
        return {
            backgroundColor: 'transparent',
            title: {
                text: '',
                subtext: '',
                sublink: '',
                x: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            legend: {
                orient: 'vertical',
                y: 'top',
                x: 'left',
                data: [''],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                min: 0,
                max: 500,
                calculable: true,
                inRange: {
                    color: ['#ff684e', '#d32000']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: true
                    }
                },
                center: [
                    100.6308452923, 39.4701180437
                ],
                itemStyle: {
                    normal: {
                        areaColor: '#f5f5f5', //地图的背景颜色 
                        borderColor: '#999' //地图边框颜色。
                    },
                    emphasis: {
                        areaColor: '#ffef98'
                    }
                }
            },
            series: [{
                name: '',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbol: '',
                data: s.convertData(userData),
                symbolSize: function(val) {
                    return val[2] / 300; //100
                },
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: 'transparent',
                        borderWidth: 3,
                        color: '#f90'
                    },
                    normal: {
                        color: '#f90'
                    }
                }
            }]
        };
    }

    convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }

        return res;
    }

}

export default ZmitiValidateUser(ZmitiWenmingApp);