var ZmitiUtil = {
	getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },

    fillDate:function(){
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
            hours<10 && (hours = '0'+hours);
            mins<10 && (mins = '0'+mins);
            seconds<10 && (seconds = '0'+seconds);
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

                $("#zmiti-work-name").html(data.worksinfo.worksname);
            }
            
            s.myChart.setOption(s.dataConfig(s.userData), true);
        });
    },
    convertData:function(data){
        var res = [];
        console.log(data.length)
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
                data:['智媒体用户分布'],
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
                        show: false
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
                         return val[2]  / 2 ;
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
	init:function(){
        var s = this;

        this.fillDate();

		var worksid = this.getQueryString('worksid');
       
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

            geoCoordMap = localStorage.getItem(worksid+'geoCoordMap') || '{}';
            geoCoordMap = JSON.parse(geoCoordMap);

            var userArr = localStorage.getItem(worksid+'userData')||'{}';
                userData = JSON.parse(userArr).userData || [];
   
            this.userData = userData;
            this.geoCoordMap = geoCoordMap;
            myChart.setOption(this.dataConfig(userData), true);
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

                    if(geoCoordMap[address]){//存在
                        userData.forEach(function(item,i){
                            if(item.name === address){
                                item.value++;
                            }
                        });
                        
                    }
                    else{
                         geoCoordMap[address] = pos;
                         userData.push({
                            name:address,
                            value:1
                         });   
                    }

                    localStorage.setItem(worksid+'geoCoordMap',JSON.stringify(geoCoordMap));
                    localStorage.setItem(worksid+'userData',JSON.stringify({userData:userData}));
                    var nickname = data.nickname;
                    var headimgurl = data.headimgurl;
                    
                    var personDom = '<div class="zmiti-user"><img src='+headimgurl+' /><span>'+nickname+'</span></div>'

                    myChart.setOption(s.dataConfig(userData), true);


                    var isAppend = true;
                    window.userlist.map(function(item,i){
                        if(item.nickname === nickname && item.headimgurl === headimgurl){
                            isAppend = false;
                        }
                    });

                    if(isAppend){
                        window.userlist.push({nickname:nickname,headimgurl:headimgurl});
                        var personDom = '<div class="zmiti-user" style="top:'+Math.random()*50+'px"><img src='+headimgurl+' /><span>'+nickname+'</span></div>';

                        document.getElementById('box').innerHTML += personDom;

                        var users = document.getElementById('box').querySelectorAll('.zmiti-user');

                        users[users.length-1].addEventListener('webkitAnimationEnd',function(){
                            document.getElementById('box').removeChild(this);
                            this.style.display = 'none';
                            window.userlist.pop();

                        });    
                    }
                    
                     
                });

	}
}

ZmitiUtil.init();