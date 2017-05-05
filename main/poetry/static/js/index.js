var ZmitiUtil = {
	getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },

    fillDate:function(){
        var s = this;
        var zmitiTime = $('.zmiti-header-date div:eq(0)'),
            zmitiDate = $('.zmiti-header-date div:eq(1)');
        var arr = ['日','一','二','三','四','五','六']
        var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = date.getDay();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var seconds = date.getSeconds();
            hours < 10 && (hours = '0'+hours);
            mins < 10 && (mins = '0'+mins);
            seconds < 10 && (seconds = '0'+seconds);
            zmitiTime.html(hours+"<span>:</span>"+mins);
            zmitiDate.html(year+'.'+month+'.'+day+ ' 星期'+arr[week]);

        var t = setInterval(function(){
                date = new Date();
                hours = date.getHours();
                mins = date.getMinutes();
                seconds = date.getSeconds();
                hours<10 && (hours = '0'+hours);
                mins<10 && (mins = '0'+mins);
                seconds<10 && (seconds = '0'+seconds);
                zmitiTime.html(hours+"<span>:</span>"+mins);

                s.hours = hours;
                s.mins = mins;
                if(mins === 0 && hours === 0 && mins === 0){
                    year = date.getFullYear();
                    month = date.getMonth()+1;
                    day = date.getDate();
                    zmitiDate.html(year+'.'+month+'.'+day);
                }

        },1000)

    },

    request:function(worksid){
        var s = this;
        $.ajax({
            url:'http://api.zmiti.com/v2/weixin/get_wxuserviewcount/',
            data:{
                worksid:worksid
            }
        }).then(function(data){
            if(data.getret === 0){
                console.log(data)
                s.userData.length = 0;
                data.usercountlist.map(function(item,i){
                    s.userData.push({
                        name:item.usercity,
                        value:item.usercount
                    });
                    s.geoCoordMap[item.usercity] = [item.longitude,item.latitude];
                    //s.geoCoordMap = JSON.parse(geoCoordMap);
                });
                s.fillPV(data.worksinfo.totalviewcount);
                s.defaultCount = data.worksinfo.totalviewcount || 0;
                localStorage.setItem('worksname'+ worksid,data.worksinfo.worksname);
                localStorage.setItem('defaultcount'+ worksid,s.defaultCount);
                $("#zmiti-work-name").html(data.worksinfo.worksname);
            }
            
            s.myChart.setOption(s.dataConfig(s.userData), true);
        });
    },
    convertData:function(data){
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
    },
    scoreConfig:function(){
        return option = {
            title: {
                textStyle:{
                    color:'#3bf3ff',
                    fontFamily:'Microsoft YaHei',
                    fontWeight:'normal'
                },
                text: '用户得分趋势'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['用户得分趋势'],
                textStyle:{
                    color:'#fff'
                }
            },
            toolbox: {
               
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data: ['','04:00','08:00','12:00','16:00','20:00','24:00'],
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                }
            ],
            yAxis : [
                 {
                    type : 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'用户得分趋势',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 510],
                    itemStyle:{
                        normal:{
                            color:'#3bf3ff',
                            borderWidth:3
                        }
                    },
                    lineStyle:{
                        normal:{
                            color:'#3bf3ff'    
                        }
                    } 
                }
            ]
        };

    },
    visitConfig:function(){
        return option = {
            title: {
                text: '用户访问趋势',

                textStyle:{
                    color:'#3bf3ff',
                    fontFamily:'Microsoft YaHei',
                    fontWeight:'normal'

                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['访问趋势'],
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['','04:00','08:00','12:00','16:00','20:00','24:00'],
                nameTextStyle:{
                    color:'#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                }
            },
            series: [
                {
                    name:'访问趋势',
                    type:'line',
                    stack: '总量',
                    label:{

                    },
                    data:[120, 132, 101, 134, 90, 230, 210],
                    //smooth:true,是否平滑显示线条，默认为false
                    itemStyle:{
                        normal:{
                            color:'#3bf3ff',
                            borderWidth:3
                        }
                    },
                    lineStyle:{
                        normal:{
                            color:'#3bf3ff'    
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color:['#fff']
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#f00'
                        }
                    }
                }
            ]
        };
    },
    fillPV:function(num){
        var zmitiPV = $('#zmiti-pv-count');
        var html = this.formatNumer(num);
        html = html.split('').map(function(item,i){
            return item === ','? ' ':'<span>'+item+'</span>';
        });
        zmitiPV.html(html.join(''));
    },
    dataConfig:function(userData){
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
                data:['用户分布位置'],
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
                    126.6308452923,39.4701180437
                ],
                itemStyle: {
                    normal: {
                        areaColor: '#475e81',//地图的背景颜色 
                        borderColor: '#55f3fe'//地图边框颜色。
                    },
                    emphasis: {
                        areaColor: '#48cde5'
                    }
                }
            },
            series: [
                {
                    name: '智媒体用户分布',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbol: '',
                    data:s.convertData(userData),
                    symbolSize: function(val){
                         return val[2]  / 5 ;
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
    },

    formatNumer:function(num){
        var result = [ ], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) { result.unshift(','); }
        }
        return result.join('');
    },
    initVisitChart:function(){
        var dom = document.getElementById("zmiti-visit-C");
            var myChart = echarts.init(dom);
            this.visitChart = myChart;
            myChart.setOption(this.visitConfig());
    },
    initScoreChart:function(){
         var dom = document.getElementById("zmiti-score-C");
            var myChart = echarts.init(dom);
            this.scoreChart = myChart;
            myChart.setOption(this.scoreConfig());
    },

    bindEvent:function(){
        var tabContent =  $('.zmiti-tab-content')
        $('.zmiti-tab aside').on('click',function(){
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            tabContent.eq(index).show().siblings('.zmiti-tab-content').hide();

        });
    },
	init:function(){
        var s = this;
        this.fillDate();
        this.initVisitChart();
        this.initScoreChart();
        this.bindEvent();
        var worksid = this.getQueryString('worksid');
        $("#zmiti-work-name").html(localStorage.getItem('worksname'+worksid));
        this.fillPV(localStorage.getItem('defaultcount'+worksid));
		var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            this.myChart = myChart;
            var app = {};
            var option = null;
            var geoCoordMap = {
                //"常德市":[111.7087330000,28.9399430000]
            };
            var userData = [
                //{name: "常德市", value: 123,key:'asa'},
            ];

            geoCoordMap = localStorage.getItem('geoCoordMap'+worksid) || '{}';
            geoCoordMap = JSON.parse(geoCoordMap);

            var userArr = localStorage.getItem('userData'+worksid)||'{}';
                userData = JSON.parse(userArr).userData || [];
   
            this.userData = userData;
            this.geoCoordMap = geoCoordMap;
            myChart.setOption(this.dataConfig(userData));
            window.userlist = [];
            var socket = io('http://socket.zmiti.com:2120');
            var box = document.getElementById('box');
            this.request(worksid);
            /*socket.on('connect', function(){
              socket.emit('login', opt.uid||'');
            });*/
            // 后端推送来消息时
              
                socket.on(worksid, function(msg){
                    if(!msg){
                        return;
                    }
                    msg = msg.replace(/&quot;/g,"\"");

                    var data = JSON.parse(msg);
                    if(data.type !== 'map'){
                        return;
                    }
                    
                    var address = data.address,
                        pos = data.pos;

                    if(s.geoCoordMap[address]){//存在
                        s.userData.forEach(function(item,i){
                            if(item.name === address){
                                item.value++;
                            }
                        });
                        
                    }
                    else{
                         s.geoCoordMap[address] = pos;
                         s.userData.push({
                            name:address,
                            value:1
                         });   
                    }

                    s.defaultCount++;
                    localStorage.setItem('defaultcount'+ worksid,s.defaultCount);
                    s.fillPV(s.defaultCount);

                    localStorage.setItem('geoCoordMap'+worksid,JSON.stringify(s.geoCoordMap));
                    localStorage.setItem('userData'+worksid,JSON.stringify({userData:s.userData}));
                    var nickname = data.nickname;
                    var headimgurl = data.headimgurl;
                    

                     var personDom = "<div class='zmiti-user'>\
                                          <aside><img src="+headimgurl+" /></aside>\
                                          <aside>\
                                              <div><span class='zmiti-nickname'>"+nickname+"</span>上线了</div>\
                                              <span>"+s.hours+":"+s.mins+"</span>\
                                          </aside>\
                                        </div>"
                    myChart.setOption(s.dataConfig(s.userData), true);


                    var isAppend = true;
                    window.userlist.map(function(item,i){
                        if(item.nickname === nickname && item.headimgurl === headimgurl){
                            isAppend = false;
                        }
                    });

                    if(isAppend){
                        window.userlist.push({nickname:nickname,headimgurl:headimgurl});
                        //var personDom = '<div class="zmiti-user" style="top:'+Math.random()*50+'px"><img src='+headimgurl+' /><span>'+nickname+'</span></div>';

                        document.getElementById('box').innerHTML += personDom;

                        var users = document.getElementById('box').querySelectorAll('.zmiti-user');
                        $('#box .zmiti-user').on('webkitAnimationEnd',function(){
                             setTimeout(()=>{
                                $(this).remove();
                                window.userlist.pop();
                            },5000)
                        });
                    } 
                    
                });

	}
}

ZmitiUtil.init();