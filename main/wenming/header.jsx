import React from 'react';
import {
    Button
} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';



import ZmitiUserList from '../components/zmiti-user-list.jsx';

var path = ['/wenming', '/wenmingdatacheck', '/wenmingcommentcheck', '/wenmingreport', '/wenmingsetting', '/wenmingabout'];

class ZmitiWenmingAsideBarApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            totalPV: '000,000,000'
        }

    }


    componentDidMount() {

    }

    changeAccount(i) {

        window.location.hash = path[i];
        if (i === 0) {
            // window.location.reload();

            //window.location.href = window.location.href;

        }

    }


    render() {



        var title = this.props.title;

        let props = {
            userList: this.state.userList,
            userid: this.userid,
            changeAccount: this.changeAccount.bind(this),
            type: 'custom-1',
            tags: ['首页', '数据审核', '评论审核', '文明播报', '通用设置', '关于我们'],
            mainHeight: this.state.mainHeight,
            title: title,
            selectedIndex: this.props.selectedIndex,
            rightType: "custom",
            customRightComponent: this.props.mainRight
        }


        return (
            <ZmitiUserList {...props}></ZmitiUserList>
        );


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

        window.globalMenus.map((item, i) => {
            console.log(item.linkTo)
            if (item.linkTo.startsWith('/wenming')) {
                this.productid = item.productid; //获取当前产品的id;
                return;
            }
        });
        if (!this.productid) {
            loginOut('您没有访问权限', window.mainUrl, true);
            return;
        }

        $.ajax({
            type: 'post',
            url: window.baseUrl + '/admin/userhaveauth',
            data: {
                userid: userid,
                getusersigid: getusersigid,
                setuserid: userid,
                productid: 'b274b278-3d08-9ac1-faf4-5975b042ca7b'
            }
        }).done(data => {
            if (data.getret === 0) {
                if (data.code === 1) { //无此权限
                    loginOut('您没有访问权限', window.mainUrl, true);
                }
            }
        })



    }



}

export default ZmitiValidateUser(ZmitiWenmingAsideBarApp);