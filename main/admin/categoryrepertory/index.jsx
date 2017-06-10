import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment  } from '../../commoncomponent/common.jsx';
const Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
import $ from 'jquery';
const FormItem = Form.Item;
class ZmitiCategoryRepertoryApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      setuserid:'',
      selectedIndex:0,
      mainHeight:document.documentElement.clientHeight-50,
      dialogHeight:document.documentElement.clientHeight,
      tags:[],
      classname:'',
      classtype:1465782065,//默认公共资料库
      datatype:0,//元素类型
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
        var title = this.props.params.title || '素材云盘';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            tags:this.state.tags,
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:this.state.selectedIndex,
            rightType:"custom",
            customRightComponent:<div className='categoryrepertory-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-categoryrepertory-header">
                        <Row>
                            <Col span={8} className="zmiti-categoryrepertory-header-inner">素材云盘</Col>
                            <Col span={8} offset={8} className='zmiti-categoryrepertory-button-right'><Button type='primary' icon="left" onClick={this.goback.bind(this)}>返回</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-categoryrepertory-line"></div>
                    <div className="hr20"></div>
                    
                </div>
                
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="父级分类"
                        hasFeedback
                      >
                         <Select placeholder="父级分类" onChange={(value)=>{this.state.classtype=value;this.forceUpdate();}} value={this.state.classtype}> 
                          {
                              this.state.dataSource.map((item,i)=> {
                                return(
                                  <Option key={i} value={item.datainfoclassid*1}>{item.classname}</Option>
                                )
                              })
                          }
                        </Select>

                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="分类名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="分类名称" 
                            value={this.state.classname}
                            onChange={(e)=>{this.state.classname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="类型"
                        hasFeedback
                      >                        
                          <Select placeholder="类型" onChange={(value)=>{this.state.datatype=value;this.forceUpdate();}} value={this.state.datatype}>
                            <Option value={0}>图片</Option>
                            <Option value={1}>音频</Option>
                            <Option value={2}>视频</Option>
                            <Option value={3}>VR视频</Option>
                          </Select>                   
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
    s.getcategory();
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
    window.location="#/datum/";
    this.forceUpdate();
    //console.log(this.state.selectedIndex);
  }
  

  
    //返回
    goback(){
      window.history.go(-1);
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
                  datainfoclassid:data.detial.datainfoclassid,
                  classname:data.detial.classname,                  
                  datatype:data.detial.datatype,
                });
                //s.state.selectedIndex=s.state.datatype;
                s.forceUpdate();

              }
            }
        });
      }else{
        this.setState({
            disabled:false,
            classname:'',
            datainfoclassid:1465782065,            
            datatype:0,
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
          setparentid:s.state.datainfoclassid,
          setclassname:s.state.classname,
          setdataclasstype:s.state.datatype,
      }
     
      if(this.currentId!=undefined){        

        /*params.workdataid = this.currentId;
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'document/edit_document/',//编辑
            data:params,
            success(data){
              message[data.getret === 0 ? 'success':'error'](data.getmsg);
              s.forceUpdate();
               window.location="#/datum/";
            }
        });*/
        //console.log(this.currentId,"edit_document");
      }else{ 
        $.ajax({
          url:window.baseUrl + 'datainfoclass/add_class_info/',//添加；等换接口
          data:params,
          success(data){
              message[data.getret === 0 ? 'success':'error'](data.getmsg);
              s.forceUpdate();
              console.log(this.url);            
          }
        });
        //console.log(this.currentId,"add_class_info",this.state.classname);        
      }
    }
    //获取分类
    getcategory(){
      var s=this;
      $.ajax({
        type:'POST',
        url:window.baseUrl+'datainfoclass/get_datainfoclass/',
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid,
        },
        success(data){
          if(data.getret===0){
            console.log(data,'get_documentclasslist')
            var typename=new Array();
            $.each(data.getdatainfoclass,function(i,item){
              if(item.parentid===null){
                typename.push(item.classname);
              }
              
            })            
            s.state.tags=typename;
            s.state.dataSource=data.getdatainfoclass;
            console.log(s.state.dataSource,'s.state.dataSource');
            s.forceUpdate();
          }else{
            console.log(this.url,'error:get_documentclasslist')
          }
        }
      })
    }
}



export default ZmitiValidateUser(ZmitiCategoryRepertoryApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/