import './static/css/add.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import ZmitiEditor from '../components/zmiti-editor.jsx';
import IScroll from 'iscroll';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TextArea = Input;
 class ZmitiWenmingAddApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           classid:'',
           appid:window.WENMING.XCXAPPID,
           content:'',
           title:'',
           wxopenid:'zhongguowenmingwang',
           imageslist:'',
           source:'',
           type:3,
           ishost:0,
           voidurl:'',
           longitude:'',
           latitude:'',
           fileList:[],
           isAddImage:false,
           isAddVideo:false,
           classlist:[],
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
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
        window.s = this;
        window.obserable.on('addImage',()=>{
            this.setState({isAddImage:true},()=>{
                window.obserable.trigger({
                    type:'showModal',
                    data:{type:0,id:'addImage'}
                });
            });
        });
        window.obserable.on('addVideo',()=>{
            this.setState({isAddVideo:true},()=>{
                window.obserable.trigger({
                    type:'showModal',
                    data:{type:2,id:'addVideo'}
                });
            });
        });
        this.bindtreedata();
       
    }

    render(){
        var s =this;
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
            height:this.state.mainHeight/2,
            html:this.state.content,
            $,
            isAdmin:false,
            showPreview:false,
        }
        const addVideoProps = {//添加视频
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                 s.state.voidurl = imgData.src;
                 s.forceUpdate();
            },
            onCancel(){
                s.setState({
                    isAddVideo:false,
                    isAddImage:true
                })
            }
        }
        var props = {
            userid:s.userid,
            getusersigid: s.getusersigid,
            onFinish(imgData){
                //imgnum.push(imgData.src);
                if(s.state.fileList.length<5){
                    s.state.fileList.push(imgData.src);
                }else{
                    message.warning('最多只能添加5张图片');
                }
                             
                s.state.imageslist=s.state.fileList.join();
                //s.state.imgshow='block';
                s.forceUpdate();
                
                //console.log(s.state.fileList,'s.state.fileList');
                //console.log(s.state.imageslist,'s.state.imageslist');
            },
            onCancel(){
                s.setState({
                    isAddImage:false,
                    isAddVideo:true,
                })
            },
            title,
            selectedIndex:100,
            mainRight:<div className='wenming-add-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-add-header">
                            <Row>
                                <Col span={16} className="wenming-add-header-inner">上报数据-身边文明事
                                    
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
                                label="分类"
                                hasFeedback
                                >                        
                                  
                                  
                                    <RadioGroup onChange={(e)=>{this.state.classid=e.target.value;this.forceUpdate();}} value={this.state.classid}>
                                       {this.state.classlist.map((item,i)=>{
                                            if(item.classname!=='文明播报'){
                                               return <Radio key={i} value={item.classid}>{item.classname}</Radio> 
                                            }
                                            
                                        })}  
                                    </RadioGroup>
                                                      
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="类型"
                                hasFeedback
                                >                        
                                  
                                  
                                    <RadioGroup onChange={(e)=>{this.state.type=e.target.value;this.forceUpdate();}} value={this.state.type}>
                                        <Radio value={3}>文字</Radio>
                                        <Radio value={1}>图片</Radio>
                                        <Radio value={2}>视频</Radio>
                                    </RadioGroup>
                                                      
                                </FormItem>


                                <FormItem
                                {...formItemLayout}
                                label="内容"
                                hasFeedback
                                >                        
                                  
                                  <textarea rows={5}
                                    onChange={(e)=>{this.state.content=e.target.value;this.forceUpdate();}} value={this.state.content}
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
                                <FormItem
                                {...formItemLayout}
                                label="图片"
                                hasFeedback
                                >
                                <Button onClick={this.addImage.bind(this)}>选择图片</Button>
                                <div className='wenming-add-imgs5' >
                                     
                                    <ul>
                                        {this.state.fileList.map((item,i)=>{
                                            return <li key={i}><img src={item}/>
                                                <div className='wenming-reportadd-delimgs'>
                                                    <Button shape="circle" icon="delete" onClick={this.delpic.bind(this,i)} />
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                    <div className='clearfix'></div>
                                </div>                       
                               
                    
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="视频地址"
                                hasFeedback
                                >   
                                  
                                <Button onClick={this.addVideo.bind(this)}>选择视频</Button>
                                <div className='hr10'></div>
                                <Input addonBefore='添加视频URL' value={this.state.voidurl}
                                    onChange={(e)=>{this.state.voidurl=e.target.value;this.forceUpdate();}}
                                    type='text' placeholder='http://www.'/>                             
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
                                <FormItem {...tailFormItemLayout}>
                                  <Button type="primary" onClick={this.addProduct.bind(this)}>提交</Button>
                                </FormItem>
                            </Form>

                        </div>
                    </div>
        }
        var mainComponent = <div>
            {!this.state.isAddImage && this.state.isAddVideo && <ZmitiUploadDialog id="addImage" {...props}></ZmitiUploadDialog>}
            {!this.state.isAddVideo && this.state.isAddImage && <ZmitiUploadDialog id={'addVideo'} {...addVideoProps}></ZmitiUploadDialog>}  
            
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }
    goback(){
        window.location='#/wenmingdatacheck'
    }
    //video
    
    uploadVideo(){//上传视频

        let formData = new FormData(),
            s = this;


        formData.append('setupfile', this.refs['upload-video'].files[0]);
        formData.append('uploadtype', 1);

        $.ajax({
            url:window.baseUrl+ 'share/upload_file',
            type:'post',
            data:formData,
            contentType: false,
            processData: false,
            success(data){
                data.getfileurl[0].key = s.props.randomString(8);
                console.log(data.getfileurl[0].datainfourl,'data.getfileurl[0]');
                s.state.voidurl=data.getfileurl[0].datainfourl;
                s.forceUpdate();
            }
        })
    }
    //更换图片
    addImage(){
        console.log('addImage');
        var obserable=window.obserable;
        this.setState({
          isAddImage:false,
          isAddVideo:true,
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:0,id:'addImage'}
          })  
        })
        
    }
    //更好视频
    addVideo(){
        console.log('addVideo');
        var obserable=window.obserable;
        this.setState({
          isAddVideo:false,
          isAddImage:true,
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:2,id:'addVideo'}
          })  
        })
    }
    //删除图片
    delpic(i){
        var s = this;
        //s.state.imageslist='';
        //s.state.imgshow='none';
        console.log(i,'del');
        s.state.fileList.splice(i,1);
        s.forceUpdate();
    }
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
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
            longitude:s.state.longitude,
            latitude:s.state.latitude,
        }
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'weixinxcx/append_article/',
            data:params,
            success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({
                        classid:'9eGbMukZ',
                        appid:window.WENMING.XCXAPPID,
                        content:'',
                        title:'',
                        wxopenid:'zhongguowenmingwang',//
                        imageslist:[],
                        source:'',
                        type:3,
                        ishost:0,
                        voidurl:'',
                        longitude:'',
                        latitude:'',
                    })
                
            }
        });
    }
    //栏目
    bindtreedata(){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/search_articleclass',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.list,'mytree');
                    s.state.classlist=data.list;                    
                    s.forceUpdate();
                }
            }
        }) 
    }
  
}

export default ZmitiValidateUser(ZmitiWenmingAddApp);
