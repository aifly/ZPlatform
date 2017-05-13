var ZmitiUtil = {
	getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },

    requestWorktimeCount:function(worksid){
        var s = this;
        $.ajax({
            url:'http://api.zmiti.com/v2/count/get_worktimecount/',
            data:{
                worksid:worksid
            }
        }).done((data)=>{
            if(data.getret === 0 ){
                var list = data.list;
                list.unshift(0);
                s.initVisitChart(list);
            }
        });
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
                if(seconds === '00' && hours === '00' && mins === '00'){
                    year = date.getFullYear();
                    month = date.getMonth()+1;
                    day = date.getDate();
                    zmitiDate.html(year+'.'+month+'.'+day);
                }

        },1000)

    },

    request:function(worksid){
        var s = this;
        s.requestWorktimeCount(worksid);
        $.ajax({
            url:'http://api.zmiti.com/v2/weixin/get_wxuserviewcount/',
            data:{
                worksid:worksid
            }
        }).then(function(data){
            console.log(data)
            if(data.getret === 0){
               
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


        $.ajax({
            url:'http://api.zmiti.com/v2/count/get_workpvuv/',
            data:{
                worksid:worksid
            }
        }).done((data)=>{
            if(data.getret === 0){
                s.fillUVPV(data.pv,data.uv,worksid);
                localStorage.setItem('pv'+ worksid,data.pv);
                localStorage.setItem('uv'+ worksid,data.uv);
            }
        });
 
    },

    fillUVPV:function(pv,uv,worksid){
        $("#zmiti-pv").html(localStorage.getItem('pv'+worksid) || this.formatNumer(pv||0));
        $("#zmiti-uv").html(localStorage.getItem('uv'+worksid) || this.formatNumer(uv||0));

        this.pv = pv;
        this.uv = uv;


    },

    setSize:function(){
        var dom = $('.zmiti-ranking-list-scorll');
        var height = document.documentElement.clientHeight - dom.offset().top ;
         var num = height % 40;

        dom.height(height- num);
        this.setSroll(dom);
        var s = this;
     
    },
    setSroll:function(dom){
        this.scroll = new IScroll(dom[0],{
            scrollX:false,
            scrollY:true,
            scrollbars:true,//显示滚动条
            interactiveScrollbars:true,//允许用户拖动滚动条
            mouseWheel:true
        });
       /* var dom1 = $('.zmiti-poetry-course-scroll');
        this.courseScroll = new IScroll(dom1[0],{
            scrollX:false,
            scrollY:true,
            scrollbars:true,//显示滚动条
            interactiveScrollbars:true,//允许用户拖动滚动条
            mouseWheel:true 
        });*/
    },

    loadDataByCate:function(type){
        var worksid = this.getQueryString('worksid');
        var s = this;
        switch(type){
            case "shengfen":
                $('.zmiti-ranking-sub-title span:eq(1)').html('名称');
                $('.zmiti-ranking-sub-title span:eq(2)').html('提交量');
            break;
        }
        
         $.ajax({
            url:'./static//js/data.json',
            data:{
                worksid:worksid
            }
        }).done((data)=>{
            if(data.getret === 0){
                var html = '';
                data.list.map(function(item,i){
                    html += '<li>\
                    <span>'+(i+1)+'</span><span title='+item.name+' class="zmiti-text-overflow">《'+item.name+'》</span><span>'+s.formatNumer(item.value)+'</span>\
                    </li>';
                });
                $('.zmiti-ranking-list').html(html);
                s.scroll.refresh();
            }
        })
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
    visitConfig:function(list){
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
                    data:list,
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
                         return val[2] /10 ;
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
    initVisitChart:function(list){
        var dom = document.getElementById("zmiti-visit-C");
            var myChart = echarts.init(dom);
            this.visitChart = myChart;
            myChart.setOption(this.visitConfig(list));
    },

    bindEvent:function(){
        var s = this;
        var tabContent =  $('.zmiti-tab-content');
        this.count = this.count ||  0 ;
        $('.zmiti-tab aside').on('click',function(){
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            tabContent.eq(index).show().siblings('.zmiti-tab-content').hide();
            tabContent.eq(index)[index === 0 ? 'addClass':'removeClass']('active');
            if(index === 0 && s.count === 0 ){
                s.setSize();
                s.scroll.refresh();
                s.count++;
            }
        });

        $('.zmiti-ranking-title li').on('click',function(){
            var index = $(this).index();
            $(this).addClass('active').siblings(this).removeClass('active');
        });
    },
    getDefaultLocaStorage:function(worksid){
        $("#zmiti-work-name").html(localStorage.getItem('worksname'+worksid));
        this.fillUVPV(null,null,worksid);
    },
	init:function(){
        var s = this;
        this.fillDate();
        this.setSize();
        
       // this.initScoreChart();
        this.bindEvent();
        
        //this.loadDataByCate('shengfen');

        var worksid = this.getQueryString('worksid');
        this.getDefaultLocaStorage(worksid);


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
                    s.pv++;
                    localStorage.setItem('pv'+ worksid,s.pv);
                    localStorage.setItem('uv'+ worksid,s.uv);
                    s.fillUVPV(s.pv,s.uv,worksid);

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