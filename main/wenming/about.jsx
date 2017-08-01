import './static/css/report.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import IScroll from 'iscroll';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import ZmitiEditor from '../components/zmiti-editor.jsx';
class ZmitiWenmingAboutApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           appid:window.WENMING.XCXAPPID,
           imgshow:'none',
           pageid:'gywm',
           imageurl:'',
           content:'',
        } 
        
    }

    componentWillMount() {

        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send,copyfileto} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

        this.copyfileto=copyfileto;
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

        var s =this;
        var title = '身边文明事';
        const userProps ={
            documentbaseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.userData.credentials.push({src:imgData.src});
                s.forceUpdate();
            }
        }
        let editorProps ={
            onChange(editor){
                s.setState({
                    content:editor.el.innerHTML
                });
            },
            height:200,
            html:this.state.content,
            $,
            isAdmin:false,
            showPreview:false,
        }
        var props = {
            userid:s.userid,
            getusersigid: s.getusersigid,
            onFinish(imgData){
                var imgDatasrc=imgData.src;
                s.copyfileto({
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    fileurl:imgDatasrc,
                    isover:0,
                    dirname:'wx_xcx',
                    success(fileurl){
                        s.state.imageurl=fileurl;
                        console.log(fileurl,'新图片');
                        s.state.imgshow='block';
                        s.forceUpdate();
                    }
                })
                //s.state.imageurl = imgData.src;
                //s.state.imgshow='block';
                //s.forceUpdate();
            },
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
                            <div className="hr10"></div>
                            <Button onClick={this.changePortrait.bind(this)}>选择图片</Button>                                    
                                        
                            <div className='wenming-reportadd-imgs' style={{display:this.state.imgshow}}>
                                <img src={this.state.imageurl}/>
                                <div className='wenming-reportadd-delimgs'>
                                    <Button shape="circle" icon="delete" onClick={this.delpic.bind(this)} />
                                </div>
                            </div>
                            <div className="hr15"></div>
                            <Button type='primary' onClick={this.editData.bind(this)}>保存</Button>
                            <div className="hr15"></div>
                        </div>

            </div>
        }
        var mainComponent = <div>
            {!this.state.showCredentialsDiolog && <ZmitiUploadDialog id="personAcc" {...props}></ZmitiUploadDialog>}
        
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }



    bindNewdata(){
        var s = this;
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'weixinxcx/get_signpage/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                pageid:s.state.pageid,
            },
            success(data){                    
                if(data.getret === 0){
                    //console.log(data.result,'data.result');
                    s.setState({
                        content:data.result.content,
                        imageurl:data.result.imageurl,
                        imgshow:'block',
                    })
                    s.forceUpdate();
                }
                
            }
        });
    }
    //编辑
    editData(pageid){
        var s = this;
        pageid=s.state.pageid;
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'weixinxcx/edit_singpage/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                pageid:s.state.pageid,
                imageurl:s.state.imageurl,
                content:s.delHtmlTag(s.state.content),
            },
            success(data){
                //console.log(data,'data.result');
                message[data.getret === 0 ? 'success':'error'](data.getmsg);
                s.bindNewdata();
                s.forceUpdate();           
            }
        });
        
    }
    //删除图片
    delpic(){
        var s = this;
        s.state.imageurl='';
        s.state.imgshow='none';
        s.forceUpdate();
    }
    //更换图片
    changePortrait(){

        var obserable=window.obserable;
        this.setState({
          showCredentialsDiolog:false
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:0,id:'personAcc'}
          })  
        })        
    }
    //过滤
    delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    }

}

export default ZmitiValidateUser(ZmitiWenmingAboutApp);
