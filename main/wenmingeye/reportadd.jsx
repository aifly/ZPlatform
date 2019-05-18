import './static/css/add.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import ZmitiEditor from '../components/zmiti-editor.jsx';
import { WMURLS, title, baseUrl } from './url';
import IScroll from 'iscroll';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TextArea = Input;
class ZmitiWenmingReportaddApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           showCredentialsDiolog:false,
           classid:'A7CZ1YE3',
           appid:window.WENMING.XCXAPPID,
           imgshow:'none',
           articleid:'',
           content:'',
           title:'',
           wxopenid:'zhongguowenmingwang',//oX4P90P4kCl3_5JLOYJyOx1bxISg//oSDVUs-aeHSvmJl9uk1Yq7iTeOyk
           imageslist:'',
           source:'',
           type:3,
           ishost:0,
           voidurl:'',
           longitude:'',
           latitude:'',
        }
        this.currentId =undefined;
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
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        var {userid, getusersigid, companyid,username,isover,usertypesign,capacitied,capacity,endDate}=validateUser(()=>{
          loginOut();
       },this);


        resizeMainHeight(this);
        this.getArticle();
       
    }

    render(){
        var s =this;
        const { disabled } = s.state;
        const userProps ={
            documentbaseUrl: baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.state.userData.credentials.push({src:imgData.src});
                s.forceUpdate();
            }
        }
        
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 14,
              offset: 6,
            },
          },
        };

        var title = '身边文明事';
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
            	console.log(imgData.src,'imgData.src')
            	var imgDatasrc=imgData.src;
                //s.state.imageslist = imgData.src;
                s.copyfileto({
                	userid:s.userid,
                	getusersigid:s.getusersigid,
                	fileurl:imgDatasrc,
                	isover:0,
                	dirname:'wx_xcx',
                	success(fileurl){
                		s.state.imageslist=fileurl;
                		//console.log(fileurl,'新图片');
                		s.state.imgshow='block';
                		s.forceUpdate();
                	}
                })
                
            },
            title,
            selectedIndex:100,
            mainRight:<div className='wenming-add-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-add-header">
                            <Row>
                                <Col span={16} className="wenming-add-header-inner">文明播报
                                    
                                </Col>
                                <Col span={8} className='wenming-add-button-right'>
                                <Button type='primary' onClick={this.goback.bind(this)}>返回</Button>
                                </Col>
                            </Row>  
                            <div className='clearfix'></div>                    
                        </div>
                        <div className="wenming-add-line"></div>
                        <div className='wenming-add-form'>
                             <Form>
                                <FormItem
                                {...formItemLayout}
                                label="标题"
                                hasFeedback
                                >                        
                                  
                                  <Input placeholder="标题" 
                                    value={this.state.title}
                                    onChange={(e)=>{this.state.title=e.target.value;this.forceUpdate();}}
                                  />                      
                                </FormItem>



                                <FormItem
                                {...formItemLayout}
                                label="内容"
                                hasFeedback
                                >  
                                  <div className='wenming-add-editor'>
                                    <ZmitiEditor {...editorProps} ></ZmitiEditor>
                                  </div>                
                                </FormItem>
                                

                                <FormItem
                                {...formItemLayout}
                                label="图片"
                                hasFeedback
                                >                        
                                  
                                    <Button onClick={this.changePortrait.bind(this)}>选择图片</Button> 
                                    
                                        
                                       <div className='wenming-reportadd-imgs' style={{display:this.state.imgshow}}>
                                            <img src={this.state.imageslist}/>
                                            <div className='wenming-reportadd-delimgs'>
                                                <Button shape="circle" icon="delete" onClick={this.delpic.bind(this)} />
                                            </div>
                                        </div> 
                                        
                                                  
                                    
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="来源"
                                hasFeedback
                                >                        
                                  
                                  <Input placeholder="来源" 
                                    value={this.state.source}
                                    onChange={(e)=>{this.state.source=e.target.value;this.forceUpdate();}}
                                  />                      
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="推荐"
                                hasFeedback
                                >                        
                                  
                                  
                                    <RadioGroup onChange={(e)=>{this.state.ishost=e.target.value;this.forceUpdate();}} value={this.state.ishost}>
                                        <Radio value={0}>普通</Radio>
                                        <Radio value={1}>推荐</Radio>
                                    </RadioGroup>
                                                      
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                  <Button type="primary" onClick={this.addProduct.bind(this)}>提交</Button>
                                </FormItem>
                            </Form>

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
    goback(){
        window.location='#/wenmingreport';
    }
    //删除图片
    delpic(){
        var s = this;
        s.state.imageslist='';
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
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var articlid=this.props.params.id;
        this.currentId=this.props.params.id;
        console.log(this.currentId,'this.currentId');
        var params = {
            userid:s.userid,
            getusersigid:s.getusersigid,
            classid:s.state.classid,
            appid:s.state.appid,
            content:s.state.content,    
            title:s.state.title,
            wxopenid:s.state.wxopenid,
            imageslist:s.state.imageslist,
            source:s.state.source,
            type:s.state.type,
            ishost:s.state.ishost,
            voidurl:s.state.voidurl,
        }
        

        if(this.currentId!==undefined){//编辑
            params.articlid=articlid;
            //console.log(articlid,'params.id');
            console.log(s.state.classid,'文章分类');         
            $.ajax({
                type:'POST',
                url:baseUrl + WMURLS + '/edit_articles/',
                data:params,
                success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.forceUpdate();                  
                }
            }); 
        }else{
            //添加
            $.ajax({
                type:'POST',
                url:baseUrl + WMURLS + '/add_articles/',
                data:params,
                success(data){
                        message[data.getret === 0 ? 'success':'error'](data.getmsg);
                        window.location='#/wenmingreport';
                        s.forceUpdate();
                    
                }
            }); 
        }
    }
    //获取文章
    getArticle(articlid){
        var s = this;
        articlid=this.props.params.id;
        console.log(articlid,'title');
        
        if(articlid!==undefined){
            $.ajax({
                type:'POST',
                url:baseUrl + WMURLS + '/get_articledetial/',
                data:{
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    appid:s.state.appid,
                    articlid:articlid 
                },
                success(data){
                        s.setState({
                            title:data.detial.title,
                            content:data.detial.content,                        
                            imageslist:data.detial.imageslist,
                            source:data.detial.source,
                            ishost:data.detial.ishost,
                            articleid:articlid,
                        })
                        if(data.detial.imageslist!=''){
                            s.setState({
                               imgshow:'block', 
                            })
                        }
                        //console.log(data.detial,'data');
                        s.forceUpdate();
                    
                }
            });            
        }else{
            this.currentId=undefined;
            this.forceUpdate();
        }

    }

  
}

export default ZmitiValidateUser(ZmitiWenmingReportaddApp);
