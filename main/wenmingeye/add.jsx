import './static/css/add.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import { WMURLS, title, baseUrl, WMEYEAPPID } from './url';
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
			appid: WMEYEAPPID,
           content:'',
		   title:'',
			provinceList:[],
           wxopenid:'zhongguowenmingwang',
           imageslist:'',
           source:'',
           type:3,
           ishost:0,
           voidurl:'',
			longitude: '116.585856',
			latitude: '40.364989',
           fileList:[],
           isAddImage:false,
           isAddVideo:false,
           classlist:[],
           selectimage:'',
           selectvideo:'',
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
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
		window.s = this;
		
		this.getProvinceList();
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
            baseUrl: baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                var imgDatasrc=imgData.src;
                s.copyfileto({
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    fileurl:imgDatasrc,
                    isover:0,
                    dirname:'wx_xcx',
                    success(fileurl){
                        s.state.voidurl=fileurl;
                        //console.log(fileurl,'新video');
                        s.state.type=2;
                        //console.log(s.state.type,'视频');                 
                        s.state.selectimage='none';
                        s.forceUpdate();
                    }
                })
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
                s.state.type=1;
                //console.log(s.state.type,'图片');
                var imgDatasrc=imgData.src;
                if(s.state.fileList.length<5){
                    s.copyfileto({
                        userid:s.userid,
                        getusersigid:s.getusersigid,
                        fileurl:imgDatasrc,
                        isover:0,
                        dirname:'wx_xcx',
                        success(fileurl){
                            s.state.fileList.push(fileurl);
                            console.log(fileurl,'新图片');
                            s.forceUpdate();
                        }
                    })
                    
                }else{
                    message.warning('最多只能添加5张图片');
                }
                             
                s.state.imageslist=s.state.fileList.join();

                s.state.selectvideo='none';
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
                                <Col span={16} className="wenming-add-header-inner">上报数据-{title}
                                    
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
									label="标题"
									hasFeedback
								>

									<Input
										onChange={(e) => { this.state.title = e.target.value; this.forceUpdate(); }} value={this.state.title}
									/>
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
									label="省份"
									hasFeedback
								>

									<Select value={this.state.provicename} onChange={this.changeProvince.bind(this)}>
										{this.state.provinceList.map((item,i)=>{
											return <Option value={item.name + '-' + item.log + '-' + item.lat}  key={i}>
												 {item.name}
											</Option>
										})}
									</Select>
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="手机号"
									hasFeedback
								>

									<Input
										onChange={(e) => { this.state.mobile = e.target.value; this.forceUpdate(); }} value={this.state.mobile}
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
                                <div className='wenming-add-selectimg' style={{display:this.state.selectimage}}>
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
                                </div>
                                <div className='wenming-add-selectvideo' style={{display:this.state.selectvideo}}>
                                    <FormItem
                                    {...formItemLayout}
                                    label="视频地址"
                                    hasFeedback
                                    >   
                                      
                                    <Button onClick={this.addVideo.bind(this)}>选择视频</Button>
                                    <div className='hr10'></div>
                                    <Input addonBefore='添加视频URL' value={this.state.voidurl}
                                        onChange={this.videourls.bind(this)}
                                        type='text' placeholder='http://www.'/>                             
                                    </FormItem>
                                </div>
                                
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
	changeProvince(e){
		var info = e.split('-');
		if(info[1] && info[2]){
			this.setState({
				provicename:info[0],
				longitude: info[1],
				latitude: info[2],
			});
		}
		else{
			this.setState({
				provicename:info[0],
			});
		}
	}
    uploadVideo(){//上传视频

        let formData = new FormData(),
            s = this;


        formData.append('setupfile', this.refs['upload-video'].files[0]);
        formData.append('uploadtype', 1);

        $.ajax({
            url:baseUrl+ 'share/upload_file',
            type:'post',
            data:formData,
            contentType: false,
            processData: false,
            success(data){
                data.getfileurl[0].key = s.props.randomString(8);
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
    //更换视频
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
    //视频地址
    videourls(e){
        var s = this;
        s.state.voidurl=e.target.value;
        //console.log(s.state.voidurl,'video-url');
        if(s.state.voidurl.length<1){
            s.state.selectimage='block';
            s.state.type=3;
            console.log(s.state.type,'恢复默认');
        }else{
            s.state.selectimage='none';
            s.state.type=2;
            console.log(s.state.type,'图片');
        }
        
        s.forceUpdate();
    }
    //删除图片
    delpic(i){
        var s = this;
        //console.log(i,'del');
        s.state.fileList.splice(i,1);
        if(s.state.fileList.length<1){
            console.log('没有图片了');
            s.state.type=3;
            s.state.selectvideo='block';
        }
        console.log(s.state.type,'恢复默认');
        s.forceUpdate();
	}
	getProvinceList(){
		var s = this;
		$.ajax({
			url: baseUrl + WMURLS +  '/get_provicelist',
			data:{},
			success(data){
				if(data.getret === 0){
					s.setState({
						provinceList:data.result
					});

					
				}
			}
		});
	}
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:s.userid,
			getusersigid:s.getusersigid,
			title:s.state.title,
            classid:s.state.classid,
            appid:s.state.appid,
            mobile:s.state.mobile,    
            provicename:s.state.provicename,    
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
		if(!this.state.title){
			message.error('标题不为能为空');
			return;
		}
        $.ajax({
            type:'POST',
            url:baseUrl + WMURLS+'/add_articles/',
            data:params,
            success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({                        
                        appid:WMEYEAPPID,
                        content:'',
                        title:'',
                        wxopenid:'zhongguowenmingwang',//
                        imageslist:'',
                        fileList:[],
                        source:'',
                        type:3,
                        ishost:0,
                        voidurl:'',
                        selectimage:'block',
                        selectvideo:'block',
                    })
                    s.bindtreedata();
                    s.forceUpdate();
                
            }
        });
    }
    //栏目
    bindtreedata(){
        var s = this;
        $.ajax({
            url:baseUrl+WMURLS+'/search_articleclass',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
            },
            success(data){
                if(data.getret === 0){
                    
                    s.state.classlist=data.list;
                    s.state.classid=data.list[0].classid;
                    console.log(s.state.classid,'mytree');             
                    s.forceUpdate();
                }
            }
        }) 
    }
  
}

export default ZmitiValidateUser(ZmitiWenmingAddApp);
