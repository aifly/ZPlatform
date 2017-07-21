import './static/css/index.css';
import React from 'react';
import {Button} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingHeaderApp from './header.jsx';

import MainUI from '../components/Main.jsx';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import '../static/echarts/china';

 class ZmitiWenmingApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           totalPV:'000,000,000'
        }
    }

    componentWillMount() {
        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);
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
    componentDidMount(){
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
        setTimeout(()=>{
            this.initEcharts();
        },300);

        var worksid = 'wenming-login';
        this.worksid = worksid;

        this.socket();

        this.formatPV(localStorage.getItem('defaultcount'+this.worksid)*1||0);

    }

      getPos(data){
        var s = this;

        var worksid = this.worksid;

         $.ajax({
            url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${data.pos[0]},${data.pos[1]}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
            type:'get',
            error(){

            },
            success(d){
                if(d.status === '1' && d.infocode === '10000'){
                    
                    var addressComponent = d.regeocode.addressComponent;
                    /*var opt = {
                        type:'map',
                        address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
                        pos:[wx.longitude,wx.latitude],
                        nickname:nickname,
                        headimgurl:headimgurl
                    }*/

                    var address = (addressComponent.city[0]||addressComponent.province)+addressComponent.district;
                    
                

                    if(s.geoCoordMap[address]){//存在
                        s.userData.forEach(function(item,i){
                            if(item.name === address){
                                item.value++;
                            }
                        });
                        
                    }
                    else{
                         s.geoCoordMap[address] = data.pos;
                         s.userData.push({
                            name:address,
                            value:1
                         });
                    }
                    s.defaultCount = localStorage.getItem('defaultcount'+ worksid) || 0;
                    s.defaultCount++;

                    s.formatPV(s.defaultCount);

                    localStorage.setItem('defaultcount'+ worksid,s.defaultCount);
                    s.pv++;
                    localStorage.setItem('pv'+ worksid,s.pv);
                    localStorage.setItem('uv'+ worksid,s.uv);

                    s.fillUVPV();

                    s.fillPV();

                    localStorage.setItem('geoCoordMap'+worksid,JSON.stringify(s.geoCoordMap));
                    localStorage.setItem('userData'+worksid,JSON.stringify({userData:s.userData}));
                    
                    var nickname = data.nickname;
                    var headimgurl = data.headimgurl;
                    

                    s.myChart.setOption(s.dataConfig(s.userData), true);

                    
                }
                else{
                   
                }
            }                                   
        })
    }


    socket(){
        var socket = io('http://socket.zmiti.com:2120');
        var worksid =   this.worksid;
        
        var s = this;
        socket.on(worksid, function(msg){
                    if(!msg){
                        return;
                    }
                    msg = msg.replace(/&quot;/g,"\"");

                    var data = JSON.parse(msg);
                  

                    console.log(data);
                    var zmitiWx = {
                        longitude:data.pos[0],
                        latitude:data.pos[1],


                    }
                    s.getPos(data)

                    return;
                    
                    


                  /*  var isAppend = true;
                    window.userlist.map(function(item,i){
                        if(item.nickname === nickname && item.headimgurl === headimgurl){
                            isAppend = false;
                        }
                    });
*/
                    if(isAppend){
                       /* window.userlist.push({nickname:nickname,headimgurl:headimgurl});
                        //var personDom = '<div class="zmiti-user" style="top:'+Math.random()*50+'px"><img src='+headimgurl+' /><span>'+nickname+'</span></div>';

                        document.getElementById('box').innerHTML += personDom;

                        var users = document.getElementById('box').querySelectorAll('.zmiti-user');
                        $('#box .zmiti-user').on('webkitAnimationEnd',function(){
                             setTimeout(()=>{
                                $(this).remove();
                                window.userlist.pop();
                            },5000)
                        });*/
                    } 
                    
                });
    }


    fillUVPV(){

    }

    fillPV(){}




    render(){


        var headerTitle = this.props.params.title;
        
        var component = <div className='wenming-main-ui' style={{height:this.state.mainHeight}}>
            <ZmitiWenmingHeaderApp title={headerTitle} id={1} cusId={this.props.params.id}></ZmitiWenmingHeaderApp>
            <section>
                <aside className='wenming-map-C'>
                    <header>
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
                                    
                                </section>
                                <section>
                                    
                                </section>
                            </div>
                            
                        </aside>
                    </section>
                </aside>
                <aside>
                    <section></section>
                    <section></section>
                </aside>
            </section>    


        </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }

    formatPV(num = 8888){
        var n = num+'';
        var _len = n.length;
        var pvLen = this.state.totalPV.length;
        var number = this.formatNumber(num);
        //1,234
        var arr = this.state.totalPV.split('');
        number.split('').reverse().map((item,i)=>{
            arr[pvLen-i-1] = item;
           //this.state.totalPV[pvLen-i-1] = item;
        });
        this.state.totalPV = arr.join('');
        this.forceUpdate();


    }

    formatNumber(s, n = 3){   
           n = n > 0 && n <= 20 ? n : 2;   
           s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
           var l = s.split(".")[0].split("").reverse(),   
           r = s.split(".")[1];   
            var  t = "";   
           for(var i = 0; i < l.length; i ++ )   
           {   
              t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
           }   
           return t.split("").reverse().join("");   
    } 

    initEcharts(){
        var s = this;
        var worksid = this.worksid;
        this.lastCityId = this.lastCityId || -1;
        var myChart = echarts.init(this.refs['map']);
            

            var userData = [
                   // {name: "常德市", value: 1023,key:'asa'},
                ];
            var geoCoordMap = {
                //"常德市":[111.7087330000,28.9399430000]
            };
            this.userData = userData;
            this.geoCoordMap = geoCoordMap;


              geoCoordMap = localStorage.getItem('geoCoordMap'+worksid) || '{}';
            geoCoordMap = JSON.parse(geoCoordMap);

            var userArr = localStorage.getItem('userData'+worksid)||'{}';
                userData = JSON.parse(userArr).userData || [];

           this.myChart = myChart;

            myChart.setOption(this.dataConfig(userData), false);
    }

     dataConfig(userData){
        var s = this;
        return  {
            backgroundColor: 'transparent',
            title: {
                text: '',
                subtext: '',
                sublink: '',
                x:'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            legend: {
                orient: 'vertical',
                y: 'top',
                x:'left',
                data:[''],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                min: 0,
                max: 500,
                calculable: true,
                inRange: {
                    color: ['#f4e6a2',  '#c0464e']
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
                center:[
                   116.6308452923,39.4701180437
                ],
                itemStyle: {
                    normal: {
                        areaColor: '#f5f5f5',//地图的背景颜色 
                        borderColor: '#999'//地图边框颜色。
                    },
                    emphasis: {
                        areaColor: '#f4654c'
                    }
                }
            },
            series: [
                {
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbol: '',
                    data:s.convertData(userData),
                    symbolSize: function(val){
                         return val[2] / 100 ;//100
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show:false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: 'transparent',
                            borderWidth: 3,
                            color:'#f90'
                        },
                        normal: {
                            color: '#f90'
                        }
                    }
                }
            ]
        };
    }

    convertData(data){
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
