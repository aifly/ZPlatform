import './static/css/index.css';
import React from 'react';
import {Button} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

 class ZmitiHomeApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
           
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
    }




    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);
        resizeMainHeight(this);

       
        const monthFormat = 'YYYY/MM';
        var component = <div>
            请在这里填充主要内容。
        </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }

  
}

export default ZmitiValidateUser(ZmitiHomeApp);
