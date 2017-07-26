import './static/css/add.css';
import React from 'react';
import {Upload,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';


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
           classid:'9eGbMukZ',
           appid:'wx32e63224f58f2cb5',
           content:'',
           title:'',
           wxopenid:'',
           imageslist:'',
           source:'',
           type:'',
           ishost:0,
           voidurl:'',
           longitude:'',
           latitude:'',
           fileList: [{
              uid: -1,
              name: 'xxx.png',
              status: 'done',
              url: 'http://www.baidu.com/xxx.png',
            }]
        }
          this.handleChange = (info) => {
            let fileList = info.fileList;

            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-2);

            // 2. read from response and show file link
            fileList = fileList.map((file) => {
              if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
              }
              return file;
            });

            // 3. filter successfully uploaded files according to response from server
            fileList = fileList.filter((file) => {
              if (file.response) {
                return file.response.status === 'success';
              }
              return true;
            });

            this.setState({ fileList });
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
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
       
    }

    render(){
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
        const fileListGroup = {
          action: '//jsonplaceholder.typicode.com/posts/',
          onChange: this.handleChange,
          multiple: true,
        };

        var title = '身边文明事';

        var props = {
            title,
            selectedIndex:1,
            mainRight:<div className='wenming-add-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-add-header">
                            <Row>
                                <Col span={16} className="wenming-add-header-inner">上报数据-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-add-button-right'><Button type='primary'>返回</Button></Col>
                            </Row>                      
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
                                        <Radio value={'9eGbMukZ'}>好人好事</Radio>
                                        <Radio value={'Q8MA1lH5'}>身边文明事</Radio>
                                        <Radio value={'A7CZ1YE3'}>文明播报</Radio>
                                    </RadioGroup>
                                                      
                                </FormItem>

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
                                  
                                  <textArea placeholder="内容" 
                                    value={this.state.content}
                                    onChange={(e)=>{this.state.content=e.target.value;this.forceUpdate();}}
                                  />                    
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="类型"
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
                                  
      <Upload >
        <Button>
          <Icon type="upload" /> upload
        </Button>
      </Upload>                     
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="视频地址"
                                hasFeedback
                                >                        
                                  
                                  <Input placeholder="视频地址" 
                                    value={this.state.voidurl}
                                    onChange={(e)=>{this.state.voidurl=e.target.value;this.forceUpdate();}}
                                  />                      
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
                                  <Button type="primary" htmlType="submit">提交</Button>
                                </FormItem>
                            </Form>
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

  
}

export default ZmitiValidateUser(ZmitiWenmingAddApp);
