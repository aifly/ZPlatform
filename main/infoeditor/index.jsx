import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form ,Icon, Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiInforEditorApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
      dialogHeight:document.documentElement.clientHeight,
			tags:['唐诗','宋词','童谣'],
			title:'',
			author:'',
			kindid:'五言绝句',
			originaltext:'',
			changetext:'',
      datatype:0,
      voiceurl:'',
			dataSource:[],
			workdataid:'',
			keyword:'',
      disabled:false,
		};
    this.currentId = undefined;
		
	}
  
	render() {
		    var s =this;
		
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
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
        var title = this.props.params.title || '资料库';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            tags:this.state.tags,
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:this.state.selectedIndex,
            rightType:"custom",
            customRightComponent:<div className='inforlist-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-inforlist-header">
                        <Row>
                            <Col span={8} className="zmiti-inforlist-header-inner">诗词资料</Col>
                            <Col span={8} offset={8} className='zmiti-inforlist-button-right'><Button type='primary' icon="left" onClick={this.goback.bind(this)}>返回</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-inforlist-line"></div>
                    <div className="hr20"></div>
                    
                </div>
                
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="资料标题"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="资料标题" 
                            value={this.state.title}
                            onChange={(e)=>{this.state.title=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="资料作者"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="资料作者" 
                            value={this.state.author}
                            onChange={(e)=>{this.state.author=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="资料原文"
                        hasFeedback
                      >                        
                          
                          <Input 
                            type="textarea"
                            autosize={{minRows: 4, maxRows: 8}}
                            placeholder="资料原文" 
                            value={this.state.originaltext}
                            className="inforlistTextarea"
                            onChange={(e)=>{this.state.originaltext=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="译文"
                        hasFeedback
                      >                        
                          
                          <Input 
                            type="textarea"
                            autosize={{minRows: 4, maxRows: 8}}
                            placeholder="译文" 
                            value={this.state.changetext}
                            className="inforlistTextarea"
                            onChange={(e)=>{this.state.changetext=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="资料类型"
                        hasFeedback
                      >
                          <Select placeholder="资料类型" onChange={(value)=>{this.state.datatype=value;this.forceUpdate();}} value={this.state.datatype}>
                            <Option value={0}>{'唐诗'}</Option>
                            <Option value={1}>{'宋词'}</Option>
                            <Option value={2}>{'童谣'}</Option>
                          </Select>                     
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="标准录音地址"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="标准录音地址" 
                            value={this.state.voiceurl}
                            onChange={(e)=>{this.state.voiceurl=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" icon="save" htmlType="submit" size="large" onClick={this.saveinformation.bind(this)}>提交</Button>
                      </FormItem>
                      
                    </Form>

            </div>
        }

        var mainComponent = <div>
          <ZmitiUserList {...props}></ZmitiUserList>
        </div>;
        return (
          <MainUI component={mainComponent}></MainUI>
        );
		
	}


	componentDidMount() {
		var s=  this;

    s.getinformation();
	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}
  changeAccount(i){       
    /*this.state.selectedIndex = i*1;
    this.state.keyword = '';*/
    window.location="#/viewinforlist/";
    this.forceUpdate();
    //console.log(this.state.selectedIndex);
  }
	

	
    //返回
    goback(){
      window.location="#/viewinforlist/";
    }
    //获取数据
    getinformation(){
      var s=this;      
      this.currentId=s.props.params.id;
      //console.log(this.currentId,"getinformation");
      if(this.currentId!=undefined){     
        
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'document/get_documendetial/',
            data:{
              userid:s.userid,
              getusersigid:s.getusersigid,
              documentid:s.props.params.id,              
            },
            success(data){              
              //console.log(data,"get_documendetial");
              if(data.getret === 0){
                s.setState({                  
                  disabled:true,
                  title:data.detial.title,
                  author:data.detial.author,
                  kindid:data.detial.kindid,
                  originaltext:data.detial.originaltext,
                  changetext:data.detial.changetext,
                  datatype:data.detial.datatype,
                  voiceurl:data.detial.voiceurl,
                });
                s.state.selectedIndex=s.state.datatype;
                s.forceUpdate();

              }
            }
        });
      }else{
        this.setState({
            disabled:false,
            title:'',
            author:'',
            kindid:'五言绝句',
            originaltext:'',
            changetext:'',
            datatype:0,
            voiceurl:''
        })
        s.forceUpdate();
        
      }
    }
    //保存
    saveinformation(){
      var s=this;      
      this.currentId=s.props.params.id;      
      var params = {
          userid:s.userid,
          getusersigid:s.getusersigid,
          title:s.state.title,
          author:s.state.author,
          kindid:s.state.kindid,
          originaltext:s.state.originaltext,
          changetext:s.state.changetext,
          datatype:s.state.datatype,
          voiceurl:s.state.voiceurl,
      }
     
      if(this.currentId!=undefined){        

        params.workdataid = this.currentId;
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'document/edit_document/',
            data:params,
            success(data){
              message[data.getret === 0 ? 'success':'error'](data.getmsg);
              s.forceUpdate();
               window.location="#/viewinforlist/";
            }
        });
        //console.log(this.currentId,"edit_document");
      }else{       
        
        $.ajax({
          type:'POST',
          url:window.baseUrl + 'document/add_document/',
          data:params,
          success(data){
              message[data.getret === 0 ? 'success':'error'](data.getmsg);
              s.forceUpdate();
              window.location="#/viewinforlist/";              
          }
        });
        //console.log(this.currentId,"add_document");        
      }
    }

}



export default ZmitiValidateUser(ZmitiInforEditorApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/