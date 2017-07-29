import React from 'react';
import {Button} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';



import ZmitiUserList  from '../components/zmiti-user-list.jsx';

var path = ['/wenming','/wenmingdatacheck','/wenmingcommentcheck','/wenmingreport','/wenmingsetting','/wenmingabout'];

 class ZmitiWenmingAsideBarApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           totalPV:'000,000,000'
        }

    }

 
    componentDidMount(){
  
    }

    changeAccount(i){

       window.location.hash = path[i];

    }


    render(){

        

        var title = this.props.title;

        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['首页','数据审核','评论审核','文明播报','通用设置','关于我们'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: this.props.selectedIndex,
            rightType: "custom",
            customRightComponent:this.props.mainRight
        }
  
   
        return (
            <ZmitiUserList {...props}></ZmitiUserList>
        );
        
        
    }

    componentWillMount() {
        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

          var visit = false;
        window.MENUCONFIG.map((item,i)=>{
            if(item.key === 'wenming'){
                item.VISITUSERS.forEach((vis)=>{
                    if(vis === username){
                        visit = true;
                    }
                })
            }
        });
        if(!visit){
            loginOut('您没有访问的权限',window.mainUrl,true);//不是hash跳转。location.href跳转
        }

    }
 

  
   
  
}

export default ZmitiValidateUser(ZmitiWenmingAsideBarApp);
