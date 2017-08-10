import './static/css/index.css';


import React from 'react';
import {
    Button,
    notification,
    Icon
} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';


import ZmitiContextmenu from '../components/zmiti-contextmenu.jsx';


var unload = false;

class ZmitiBoardroomApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [],
            list2 = [];

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            menuLeft: 0,
            menuTop: 0,
            currentType: 'col', //row or col
            currentSeatIndex: -1,
            backColor: "transparent",
            list: {
                cols: 5,
                rows: 12,
                data: [

                ]
            },


        }

        this.viewW = document.documentElement.clientWidth;
        this.viewH = document.documentElement.clientHeight;
    }

    componentWillUnmount() {
        this.unmout = true;
    }

    componentWillMount() {
        this.unmout = false;
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



    range() {

        var arr = [];
        this.state.list.data.length = 0;
        for (var i = 0; i < this.state.list.rows * this.state.list.cols; i++) {
            arr.push(i);

            this.state.list.data.push({
                name: i
            });
        }

        this.forceUpdate();
    }



    render() {


        var data = {
            left: this.state.menuLeft,
            top: this.state.menuTop,
            menus: [{
                name: "在上面插入一行",
                type: <Icon type="plus-circle" />,
                fn: (i) => {
                    var row = (this.state.currentSeatIndex / this.state.list.cols) | 0
                    var index = (this.state.list.cols) * row;

                    var arr = this.state.list.data.slice(0, index);


                    var arr2 = [];
                    for (var i = 0; i < this.state.list.cols; i++) {
                        arr2.push({
                            name: '--'
                        })
                    }

                    var arr3 = this.state.list.data.slice(index);

                    var result = arr.concat(arr2, arr3);

                    this.state.list.data = result;

                    this.state.backColor = 'transparent';

                    this.state.list.rows = this.state.list.rows + 1;
                    this.forceUpdate()
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'row',
                        backColor: '#eee'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }, {
                name: "在下面插入一行",
                type: <Icon type="plus-circle-o" />,
                fn: (i) => {

                    var row = ((this.state.currentSeatIndex + this.state.list.cols) / this.state.list.cols) | 0;


                    var index = (this.state.list.cols) * row;



                    var arr = this.state.list.data.slice(0, index);


                    var arr2 = [];
                    for (var i = 0; i < this.state.list.cols; i++) {
                        arr2.push({
                            name: '***'
                        })
                    }

                    var arr3 = this.state.list.data.slice(index);

                    var result = arr.concat(arr2, arr3);

                    this.state.list.data = result;
                    this.state.backColor = 'transparent';
                    this.state.list.rows = this.state.list.rows + 1;
                    this.forceUpdate()
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'row',
                        backColor: '#eee'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }, {
                name: "删除当前行",
                type: <Icon type="delete" />,
                fn: (i) => {
                    var row = ((this.state.currentSeatIndex) / this.state.list.cols) | 0;


                    var index = (this.state.list.cols) * row;



                    for (var i = 0; i < this.state.list.cols; i++) {
                        this.state.list.data.splice(index, 1);
                    }
                    this.state.backColor = 'transparent';
                    this.state.list.rows = this.state.list.rows - 1;
                    this.forceUpdate()
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'row',
                        backColor: '#f00'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }, {
                name: "在左侧插入一列",
                type: <Icon type="plus-circle" />,
                fn: (i) => {
                    var row = ((this.state.currentSeatIndex) % this.state.list.cols) | 0;


                    console.log(row);
                    for (var i = 0; i < this.state.list.rows; i++) {
                        this.state.list.data.splice((i) * this.state.list.cols + i + row, 0, {
                            name: '^^^'
                        })
                    }
                    this.state.backColor = 'transparent';
                    this.state.list.cols = this.state.list.cols + 1;

                    this.forceUpdate();
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'col',
                        backColor: '#eee'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }, {
                name: "在右侧插入一列",
                type: <Icon type="plus-circle-o" />,
                fn: (i) => {
                    var row = ((this.state.currentSeatIndex) % this.state.list.cols) | 0;


                    console.log(row);
                    for (var i = 0; i < this.state.list.rows; i++) {
                        this.state.list.data.splice((i) * this.state.list.cols + i + row + 1, 0, {
                            name: '==='
                        })
                    }
                    this.state.list.cols = this.state.list.cols + 1;
                    this.state.backColor = 'transparent';
                    this.forceUpdate();
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'col',
                        backColor: '#eee'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }, {
                name: "删除当前列",
                type: <Icon type="delete" />,
                fn: (i) => {
                    var row = ((this.state.currentSeatIndex) % this.state.list.cols) | 0;

                    console.log(row);
                    for (var i = 0; i < this.state.list.rows; i++) {
                        this.state.list.data.splice((i) * this.state.list.cols - i + row, 1)
                    }
                    this.state.list.cols = this.state.list.cols - 1;
                    this.state.backColor = 'transparent';
                    this.forceUpdate();
                },
                mouseover: () => {
                    this.setState({
                        currentType: 'col',
                        backColor: '#f00'
                    });
                },
                mouseout: () => {
                    this.setState({
                        currentType: '',
                        backColor: 'transparent'
                    });
                }
            }]
        }


        var mainComponent = <div className='board-main-ui' ref='board-main-ui'>
            <section ref='seat'>
                <div><span ref='down' style={{cursor:'url(./static/images/rotate.ico) 10 10 ,default'}}></span></div>
                <ul style={{width:60*this.state.list.cols+1}}>
                {
                    this.state.list.data.map((item, i) => {
                          var backColor = '#fff';
                        if(this.state.currentType === 'row'){
                            var row = ((this.state.currentSeatIndex + this.state.list.cols) / this.state.list.cols) | 0;

                            var idx = ((i + this.state.list.cols)/this.state.list.cols)|0;

                            if(idx === row){
                                backColor = this.state.backColor;
                            }else{
                                backColor = '#fff'
                            }
                        }
                        else if(this.state.currentType === 'col'){
                             var row = ((this.state.currentSeatIndex) % this.state.list.cols);

                            var idx = ((i + this.state.list.cols)/this.state.list.cols)|0;
                              
                            if(i % this.state.list.cols === row){
                                backColor = this.state.backColor;
                            }else{
                                backColor = '#fff'
                            }
                        }
                          return <li style={{backgroundColor:backColor}}  onContextMenu={this.onContextMenu.bind(this,i)} title={this.state.list.data[i].name?this.state.list.data[i].name:''} className='zmiti-text-overflow' key={i} onMouseUp={this.addEdit.bind(this,i)}>
                            {!this.state.list.data[i].edit&&<span>{this.state.list.data[i].name}</span>}
                            {this.state.list.data[i].edit &&<input data-id={'input-'+i} ref={'input-'+i} value={this.state.list.data[i].name} onChange={e=>{this.state.list.data[i].name = e.target.value;this.forceUpdate()}} />}
                        </li>
                    })
                } 
                </ul>
            </section>
            <ZmitiContextmenu {...data}></ZmitiContextmenu>
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }


    onContextMenu(index, e) {
        e.preventDefault();



        this.setState({
            currentType: '',
            backColor: 'transparent',
            currentSeatIndex: index,
            menuLeft: Math.min(this.viewW - 150, e.pageX),
            menuTop: Math.min(e.pageY, this.viewH - 150)
        }, () => {
            window.obserable.trigger({
                type: 'toggleContextmenu',
                data: true
            })
        });


        return false;
    }

    addEdit(i) {

        this.state.list.data.forEach((item, k) => {
            item.edit = false;
        })

        this.state.currentSeatIndex = i;
        this.state.currentType = '';
        this.state.list.data[i].edit = true;

        this.forceUpdate(() => {
            this.refs['input-' + i].focus();
        });

        window.obserable.trigger({
            type: 'toggleContextmenu',
            data: false
        })
    }

    componentDidMount() {

        var down = $(this.refs['down']);
        this.range();
        window.s = this;
        var lastAngle = 0;
        down.on('mousedown', e => {

            var containerOffset = this.refs['seat'];
            var offsetX = containerOffset.offsetLeft;
            var offsetY = containerOffset.offsetTop;

            console.log(offsetX)

            var angle = lastAngle;

            $(document).on('mousemove', ev => {
                var mouseX = ev.pageX - offsetX; //计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
                var mouseY = ev.pageY - offsetY;
                var ox = mouseX - offsetX + containerOffset.offsetWidth / 2; //cx,cy为圆心
                var oy = mouseY - offsetY - containerOffset.offsetHeight / 2 + 30;
                var to = Math.abs(ox / oy);
                console.log(ox, oy);

                angle = Math.atan(to) / (Math.PI) * 180; //鼠标相对于旋转中心的角度
                if (ox < 0 && oy < 0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
                {
                    angle = -angle;
                } else if (ox < 0 && oy > 0) //左下角,3象限
                {
                    angle = -(180 - angle)
                } else if (ox > 0 && oy < 0) //右上角，1象限
                {

                } else if (ox > 0 && oy > 0) //右下角，2象限
                {
                    angle = 180 - angle;
                }



                var offsetAngle = angle + lastAngle;
                ///containerOffset.style.transform = 'rotate(' + offsetAngle + 'deg)';


            }).on('mouseup', e => {
                $(document).off('mousemove mouseup');
                lastAngle = angle;
            })
        });

        var stage = $(this.refs['seat']);

        stage.on('mousedown', ev => {

            if (ev.target.nodeName === 'INPUT') {
                return;
            }

            var offsetX = stage[0].offsetLeft;
            var offsetY = stage[0].offsetTop;
            var mouseX = ev.pageX - offsetX;
            var mouseY = ev.pageY - offsetY;

            $(document).on('mousemove', e => {

                stage.css({
                    left: e.pageX - mouseX,
                    top: e.pageY - mouseY
                });

            }).on('mouseup', () => {
                $(document).off('mousemove mouseup');
            });
        })


        $(window).on('keydown', (e) => {
            if (e.keyCode === 9) { //tab键
                e.preventDefault();
                if (this.state.currentSeatIndex > -1) {
                    if (this.state.currentSeatIndex >= this.state.list.rows * this.state.list.cols - 1) {
                        this.state.currentSeatIndex = -1;
                    }
                    this.setState({
                        currentSeatIndex: this.state.currentSeatIndex + 1
                    }, () => {
                        this.addEdit(this.state.currentSeatIndex);
                    })
                }
            };
        });



    }



}

export default ZmitiValidateUser(ZmitiBoardroomApp);