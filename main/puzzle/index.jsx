import React from 'react';
import './static/css/index.css';

import ZmitiPannel from './static/components/zmiti-panel.jsx';
import ZmitiStage from './static/components/zmiti-stage.jsx';
import PubSub from './static/js/pubsub';


import { message ,notification,Button } from '../commoncomponent/common.jsx';

import MainUI from '../components/Main.jsx';
import  createjs from './static/js/createjs.js';
import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiPuzzleApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            width:1000,
            height:800,
            mainHeight:document.documentElement.clientHeight - 50,
            currentMethod :'renderRectLeftRight',
        }
    }

    componentWillMount() {
         let {resizeMainHeight,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin} = this.props;
       //  resizeMainHeight(this);    
       //  
         validateUser(()=>{loginOut(undefined,window.loginUrl,false);},this);
         validateUserRole(this,(obj)=>{
            if(!isSuperAdmin(this) && !isNormalAdmin(this)){//不是管理员，也不是超级管理员
                loginOut(obj.msg,'',true);
            }else{
                const key = `open${Date.now()}`;
        let btnClick = ()=> {
                notification.close(key);
                    close();
                }
                const close = () => {
                    //
                    localStorage['tipInfo'] = true;
                }
                const btn = (
                    <Button type="primary" size="small" onClick={btnClick}>
                        不再提示我~
                    </Button>
                );

                !localStorage['tipInfo'] && notification['info']({
                    message: '小提示',
                    description: '按住空格键不松开,可以拖拽整张图片~',
                    btn,
                    key
                });

                PubSub.subscribe('getMethod',(e,method)=>{
                    this.setState({
                        currentMethod:method
                    })
                });
            }
         });
    }

    componentDidMount(){

        
    }

    render(){

        var style = {
           // width:100
        }

         let {resizeMainHeight,validateUser,loginOut} = this.props;

       
         
         validateUser(()=>{loginOut();},this);
         
        
        let props = {
            getusersigid:this.getusersigid,
            userid:this.userid
        }

        let component = <div className="p-main-ui" style={{height:this.state.mainHeight}}>
                <ZmitiStage  {...this.props} {...props} ></ZmitiStage>
                <ZmitiPannel {...this.state}></ZmitiPannel>
            </div>;
        return (

            <MainUI component={component}></MainUI>
        )
    }

}
export default ZmitiValidateUser(ZmitiPuzzleApp);
ZmitiPuzzleApp.defaultProps = {
    baseUrl: 'http://api.zmiti.com/v2/',//http://webapi.zmiti.com/v1/
    getusersigid: "09ab77c3-c14c-4882-9120-ac426f527071"
};

/*ReactDOM.render(<ZmitiPuzzleApp></ZmitiPuzzleApp>,document.getElementById('fly-main'),()=>{

    
});

*/


