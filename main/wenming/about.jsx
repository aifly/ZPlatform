import './static/css/report.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import IScroll from 'iscroll';
import ZmitiEditor from '../components/zmiti-editor.jsx';
class ZmitiWenmingAboutApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           appid:window.WENMING.XCXAPPID,
           pageid:'',
           content:'钟宜龙带领民兵剿匪，为了逼土匪现身，他和战士们用了火攻，没想到一场大火',
        } 
        
    }

    componentWillMount() {

        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

        var visit = false;
        window.WENMING.VISITUSERS.forEach((item,i)=>{
            if(item === username){
                visit = true;
                return;
            }
        });
        if(!visit){
            loginOut('您没有访问的权限',window.mainUrl,true);//不是hash跳转。location.href跳转
        }
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
        var s = this;
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
        s.bindNewdata();
    }

    render(){


        var title = '身边文明事';
        let editorProps ={
            onChange(editor){
                s.setState({
                    content:editor.el.innerHTML
                });
            },
            height:this.state.mainHeight/2,
            html:this.state.content,
            $,
            isAdmin:false,
            showPreview:false,
        }
        var props = {
            title,
            selectedIndex:5,
            mainRight:<div className='wenming-report-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-report-header">
                            <Row>
                                <Col span={16} className="wenming-report-header-inner">关于我们-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-report-button-right'>
                                    
                                </Col>
                            </Row>
                            <div className="clearfix"></div>                 
                        </div>
                        
                        <div className="wenming-report-line"></div>
                        <div className='hr15'></div>
                        <div className='wenming-about-datalist'>
                            <ZmitiEditor {...editorProps} ></ZmitiEditor>
                            <div className="hr15"></div>
                            <Button type='primary' onClick={this.editData.bind(this)}>保存</Button>
                        </div>

            </div>
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }



    bindNewdata(){
        var s = this;
        /*$.ajax({
            type:'POST',
            url:window.baseUrl + 'weixinxcx/search_articlelist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                pageid:s.state.pageid,
            },
            success(data){                    
                
                console.log(data.list,'data.result');
                s.forceUpdate();
                
            }
        });*/
    }
    //编辑
    editData(articlid){
        var s = this;
        
    }
}

export default ZmitiValidateUser(ZmitiWenmingAboutApp);
