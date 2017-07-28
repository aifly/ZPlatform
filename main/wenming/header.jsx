import React from 'react';
import {Button} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';



import ZmitiUserList  from '../components/zmiti-user-list.jsx';

var path = ['/wenming','/wenmingdatacheck','/wenmingcommentcheck','/wenmingreport','/wenmingsetting'];

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
            tags:['首页','数据审核','评论审核','文明播报','通用设置'],
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
 

  
   
  
}

export default ZmitiValidateUser(ZmitiWenmingAsideBarApp);
