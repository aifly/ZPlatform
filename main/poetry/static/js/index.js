var ZmitiUtil = {
	getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },
	init:function(){

		var id = this.getQueryString('worksid');
		var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var app = {};
            var option = null;
            var geoCoordMap = {
                "常德市":[111.7087330000,28.9399430000]
            };
            var userData = [
                {name: "常德市", value: 123,key:'asa'},
            ];

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            var config = function(userData){
                return  {
                backgroundColor: 'transparent',
                title: {
                    text: '智媒体统计报表',
                    subtext: 'www.zmiti.com',
                    sublink: 'http://www.zmiti.com',
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
                    y: 'bottom',
                    x:'right',
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
                        data:convertData(userData),
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
            }

            geoCoordMap = localStorage.getItem('geoCoordMap') || '{}';
            geoCoordMap = JSON.parse(geoCoordMap);
      //      geoCoordMap["常德市"] = [111.7087330000,28.9399430000];

            var userArr = localStorage.getItem('userData')||'{}';
                userData = JSON.parse(userArr).userData || [];
               /* userData.push({
                    name:'常德市',
                    value:25
                })
*/
            myChart.setOption(config(userData), true);
            window.userlist = [];
            var socket = io('http://socket.zmiti.com:2120');
            var box = document.getElementById('box');

            /*socket.on('connect', function(){
              socket.emit('login', opt.uid||'');
            });*/
            // 后端推送来消息时
                var s = this;
                socket.on(id, function(msg){
                    msg = msg.replace(/&quot;/g,"\"");

                    var data = JSON.parse(msg);
                    if(data.type !== 'map'){
                        return;
                    }
                    console.log(data);

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

                    localStorage.setItem('geoCoordMap',JSON.stringify(geoCoordMap));
                    localStorage.setItem('userData',JSON.stringify({userData:userData}));
                    var nickname = data.nickname;
                    var headimgurl = data.headimgurl;
                    
                    var personDom = '<div class="zmiti-user"><img src='+headimgurl+' /><span>'+nickname+'</span></div>'

                    myChart.setOption(config(userData), true);


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