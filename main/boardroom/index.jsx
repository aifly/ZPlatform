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

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';



var unload = false;

class ZmitiBoardroomApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [],
            list2 = [];

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,

            list: {
                cols: 10,
                rows: 13
            }

        }
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



    }


    range() {

        var arr = [];
        for (var i = 0; i < this.state.list.rows * this.state.list.cols; i++) {
            arr.push(i);
        }
        return arr;
    }



    render() {


        var mainComponent = <div className='board-main-ui' ref='board-main-ui'>
        <section ref='seat'>
            <div><span ref='down' style={{cursor:'url(./static/images/rotate.ico) 10 10 ,default'}}></span></div>
            <ul style={{width:20*this.state.list.cols+2}}>
            {
                this.range().map((item, i) => {
                    return <li key={i}></li>
                })
            } < /ul>
         < /section>
        </div>;


        return (
            <MainUI component={mainComponent}></MainUI>
        );


    }

    componentDidMount() {

        var stage = $(this.refs['down']);



        stage.on('mousedown', e => {

            var containerOffset = this.refs['seat'];
            var offsetX = containerOffset.offsetLeft;
            var offsetY = containerOffset.offsetTop;
            $(document).on('mousemove', ev => {
                var mouseX = ev.pageX - offsetX; //计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
                var mouseY = ev.pageY - offsetY;
                var ox = mouseX - offsetX - containerOffset.offsetWidth; //cx,cy为圆心
                var oy = mouseY - offsetY - containerOffset.offsetHeight / 2;
                var to = Math.abs(ox / oy);
                var angle = Math.atan(to) / (Math.PI) * 180; //鼠标相对于旋转中心的角度

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
                console.log(angle)
                var offsetAngle = angle;
                containerOffset.style.transform = 'rotate(' + offsetAngle + 'deg)'
            }).on('mouseup', e => {
                $(document).off('mousemove mouseup');
            })
        });



    }



}

export default ZmitiValidateUser(ZmitiBoardroomApp);