import './static/css/index.css';
import React from 'react';
import {Button,notification} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';
var defaulturl= 'http://www.zmti.com/main/static/images/zmiti-logo.jpg';

var unload = false;

 class ZmitiBoardroomApp extends React.Component{
    constructor(args){
        super(...args);

        var list1 = [],
            list2 = [];
        
        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
          
        }
    }

    componentWillUnmount(){
         this.unmout = true;
    }

    componentWillMount() {
        this.unmout = false;
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
       

       
    }

   



    render(){


        var mainComponent = '';

      
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }


   
   

  
}

export default ZmitiValidateUser(ZmitiBoardroomApp);
