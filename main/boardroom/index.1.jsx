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



var toolbarWidth = 50;


class ZmitiBoardroomApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [];

        for (var i = 0; i < 40; i++) {
            list1.push({
                name: '徐畅' + i,
                tel: '15718879215',
                headimgurl: './static/images/zmiti-logo.jpg'
            })
        }

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            menuLeft: 0,
            menuTop: 0,
            toolbarWidth: toolbarWidth,
            stageWidth: document.documentElement.clientWidth - window.mainLeftSize - toolbarWidth,
            stageHeight: document.documentElement.clientHeight - 50,
            currentType: 'col', //row or col
            currentSeatIndex: -1,
            mouseType: 'default',
            userList: list1,
            backColor: "transparent",

            currentListIndex: 0, //当前的

            list: [],


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



    range(index) {

        var arr = [];
        this.state.list[index].data.length = 0;
        for (var i = 0; i < this.state.list[index].rows * this.state.list[index].cols; i++) {
            arr.push(i);

            this.state.list[index].data.push({
                name: '--'
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
                    var row = (this.state.currentSeatIndex / this.state.list[this.state.currentListIndex].cols) | 0
                    var index = (this.state.list[this.state.currentListIndex].cols) * row;

                    var arr = this.state.list[this.state.currentListIndex].data.slice(0, index);


                    var arr2 = [];
                    for (var i = 0; i < this.state.list[this.state.currentListIndex].cols; i++) {
                        arr2.push({
                            name: '--'
                        })
                    }

                    var arr3 = this.state.list[this.state.currentListIndex].data.slice(index);

                    var result = arr.concat(arr2, arr3);

                    this.state.list[this.state.currentListIndex].data = result;

                    this.state.backColor = 'transparent';

                    this.state.list[this.state.currentListIndex].rows = this.state.list[this.state.currentListIndex].rows + 1;
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

                    var row = ((this.state.currentSeatIndex + this.state.list[this.state.currentListIndex].cols) / this.state.list[this.state.currentListIndex].cols) | 0;


                    var index = (this.state.list[this.state.currentListIndex].cols) * row;



                    var arr = this.state.list[this.state.currentListIndex].data.slice(0, index);


                    var arr2 = [];
                    for (var i = 0; i < this.state.list[this.state.currentListIndex].cols; i++) {
                        arr2.push({
                            name: '***'
                        })
                    }

                    var arr3 = this.state.list[this.state.currentListIndex].data.slice(index);

                    var result = arr.concat(arr2, arr3);

                    this.state.list[this.state.currentListIndex].data = result;
                    this.state.backColor = 'transparent';
                    this.state.list[this.state.currentListIndex].rows = this.state.list[this.state.currentListIndex].rows + 1;
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
                    var row = ((this.state.currentSeatIndex) / this.state.list[this.state.currentListIndex].cols) | 0;


                    var index = (this.state.list[this.state.currentListIndex].cols) * row;



                    for (var i = 0; i < this.state.list[this.state.currentListIndex].cols; i++) {
                        this.state.list[this.state.currentListIndex].data.splice(index, 1);
                    }
                    this.state.backColor = 'transparent';
                    this.state.list[this.state.currentListIndex].rows = this.state.list[this.state.currentListIndex].rows - 1;
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
                    var row = ((this.state.currentSeatIndex) % this.state.list[this.state.currentListIndex].cols) | 0;


                    console.log(row);
                    for (var i = 0; i < this.state.list[this.state.currentListIndex].rows; i++) {
                        this.state.list[this.state.currentListIndex].data.splice((i) * this.state.list[this.state.currentListIndex].cols + i + row, 0, {
                            name: '^^^'
                        })
                    }
                    this.state.backColor = 'transparent';
                    this.state.list[this.state.currentListIndex].cols = this.state.list[this.state.currentListIndex].cols + 1;

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
                    var row = ((this.state.currentSeatIndex) % this.state.list[this.state.currentListIndex].cols) | 0;


                    console.log(row);
                    for (var i = 0; i < this.state.list[this.state.currentListIndex].rows; i++) {
                        this.state.list[this.state.currentListIndex].data.splice((i) * this.state.list[this.state.currentListIndex].cols + i + row + 1, 0, {
                            name: '==='
                        })
                    }
                    this.state.list[this.state.currentListIndex].cols = this.state.list[this.state.currentListIndex].cols + 1;
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
                    var row = ((this.state.currentSeatIndex) % this.state.list[this.state.currentListIndex].cols) | 0;

                    console.log(row);
                    for (var i = 0; i < this.state.list[this.state.currentListIndex].rows; i++) {
                        this.state.list[this.state.currentListIndex].data.splice((i) * this.state.list[this.state.currentListIndex].cols - i + row, 1)
                    }
                    this.state.list[this.state.currentListIndex].cols = this.state.list[this.state.currentListIndex].cols - 1;
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
            <section className='board-main-C' style={{height:this.state.mainHeight}}>
                <aside>
                    <aside>
                        <section  onClick={()=>{this.setState({mouseType:'default'})}}  className={this.state.mouseType === 'default'?'active':''}>
                            <span></span>
                        </section>
                        <div onClick = {() => {this.setState({mouseType: 'plus'})}} className = {this.state.mouseType === 'plus' ? 'active' : ''        }> <Icon type={this.state.mouseType === 'plus'?"plus-circle":'plus-circle-o'} /></div>
                        <div onClick = {() => {this.setState({mouseType: 'minus'})}} className = {this.state.mouseType === 'minus' ? 'active' : ''}> <Icon type={this.state.mouseType === 'minus'?"minus-circle":'minus-circle-o'} /></div>
                         <section className = 'board-print' title = '打印'> <Icon type="printer" /> </section> 
                         <section className = 'board-save'title = '保存'> <Icon type="save" /> </section> 
                         <section className = 'board-download'title = '下载'> <Icon type="download" /> </section> 
                         <ul draggable = 'true'>
                             <li> </li> <li> </li> <li> </li> <li> </li> <li> </li> <li> </li> <li> </li> <li> </li> <li> </li>
                         </ul> 
                    </aside> 
                </aside>
                <aside>
                  <section className = 'board-main-stage' style = {{width: this.state.stageWidth,height: this.state.stageHeight}}> 
                    {this.state.list.map((list, i) => {
                        return <section style={{transform:'translate('+list.style.left+'px,'+list.style.top+'px)'}} onMouseDown={()=>{this.setState({currentListIndex:i})}} key={i} ref={'seat'+i} className='board-seat'>
                                <div><span ref='down' style={{cursor:'url(./static/images/rotate.ico) 10 10 ,default'}}></span></div>
                                <ul style={{width:60*list.cols+1}}>
                                    {
                                        list.data.map((item, i) => {
                                            var backColor = '#fff';
                                            if(this.state.currentType === 'row' && i === this.state.currentListIndex){
                                                var row = ((this.state.currentSeatIndex + list.cols) / list.cols) | 0;

                                                var idx = ((i + list.cols)/list.cols)|0;

                                                if(idx === row){
                                                    backColor = this.state.backColor;
                                                }else{
                                                    backColor = '#fff'
                                                }
                                            }
                                            else if(this.state.currentType === 'col' && i === this.state.currentListIndex){
                                                var row = ((this.state.currentSeatIndex) % list.cols);

                                                var idx = ((i + list.cols)/list.cols)|0;

                                                if(i % list.cols === row){
                                                    backColor = this.state.backColor;
                                                }else{
                                                    backColor = '#fff'
                                                }
                                            }
                                            return <li style={{backgroundColor:backColor}}  onContextMenu={this.onContextMenu.bind(this,i)} title={list.data[i].name?list.data[i].name:''} className='zmiti-text-overflow' key={i} onDoubleClick={this.addEdit.bind(this,i)}>
                                                {!list.data[i].edit&&<span>{list.data[i].name}</span>}
                                                {list.data[i].edit &&<input data-id={'input-'+i} ref={'input-'+i} value={list.data[i].name} onChange={e=>{this.state.list[this.state.currentListIndex].data[i].name = e.target.value;this.forceUpdate()}} />}
                                            </li>
                                        })
                                    }
                                </ul>
                            </section>
            })
        } </section>

        </aside>  <aside ref = 'user-scroll'> <ul> <li> 人员名单 </li> {
            this.state.userList.map((user, i) => {

                return <li draggable={true} key={i}>
                                <div style={{background:"url("+user.headimgurl+") no-repeat center / contain"}}></div>
                                <div>
                                    <div>{user.name}</div>
                                    <div>手机号：{user.tel}</div>
                                </div>
                            </li>
            })
        } </ul> </aside> </section>


        <ZmitiContextmenu {...data
        }> </ZmitiContextmenu> </div>;
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

        this.state.list[this.state.currentListIndex].data.forEach((item, k) => {
            item.edit = false;
        })

        this.state.currentSeatIndex = i;
        this.state.currentType = '';
        this.state.list[this.state.currentListIndex].data[i].edit = true;

        this.forceUpdate(() => {
            this.refs['input-' + i].focus();
            this.refs['input-' + i].select();
        });

        window.obserable.trigger({
            type: 'toggleContextmenu',
            data: false
        })
    }

    componentDidMount() {

        var down = $(this.refs['down']);
        //this.range(0);
        window.s = this;
        var lastAngle = 0;

        $.ajax({
            url: './static/js/seat.json'
        }).done((data) => {

            this.state.list = data.list;

            this.state.list.forEach((list, i) => {
                this.range(i);

            });


            this.forceUpdate(() => {
                this.state.list.map((item, i) => {
                    var obj = this.refs['seat' + i];
                    this.bindDrag($(obj));
                })
            });
        })

        /* down.on('mousedown', e => {

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

         angle = Math.atan(to) / (Math.PI) * 180; //鼠标相对于旋转中心的角度                if (ox <0 && oy <0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
         {
         angle = -angle;
         } else if (ox <0 && oy> 0) //左下角,3象限
         {
         angle = -(180 - angle)
         } else if (ox> 0 && oy <0) //右上角，1象限
         {

         } else if (ox> 0 && oy> 0) //右下角，2象限
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
         */


        $(window).on('keydown', (e) => {

            if (e.keyCode === 9) { //tab键
                e.preventDefault();
                if (this.state.currentSeatIndex > -1) {
                    if (this.state.currentSeatIndex >= this.state.list[this.state.currentListIndex].rows * this.state.list[this.state.currentListIndex].cols - 1) {
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

        setTimeout(() => {
            var userScroll = new IScroll(this.refs['user-scroll'], {
                mouseWheel: true,
                scrollbars: true,
                interactiveScrollbars: true
            })
        }, 1000)



    }

    bindDrag(obj) {
        var stage = obj;

        stage.on('mousedown', ev => {

            if (ev.target.nodeName === 'INPUT') {
                return;
            }

            var offsetX = stage.offset().left - window.mainLeftSize - 100;
            var offsetY = stage.offset().top - 50;
            var mouseX = ev.pageX - offsetX;
            var mouseY = ev.pageY - offsetY;

            $(document).on('mousemove', e => {

                this.state.list[this.state.currentListIndex].style = {
                    left: e.pageX - mouseX,
                    top: e.pageY - mouseY
                }
                this.forceUpdate();

            }).on('mouseup', () => {
                $(document).off('mousemove mouseup');
            });
        })

    }



}

export default ZmitiValidateUser(ZmitiBoardroomApp);