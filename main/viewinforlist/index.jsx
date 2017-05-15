import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiViewinforListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
      dialogHeight:document.documentElement.clientHeight,
			modpostDialogVisible:false,
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
    this.currentId = -1;
		
	}
  
	render() {
		var s =this;
		const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            width:120,

        },{
            title: '资料类型',
            dataIndex: 'datatype',
            key: 'datatype',
            width:100,
            render:(value,record,index)=>{
            	switch(value){
      					case 0:
      						return "唐诗";
      						break;
      					case 1:
      						return "宋词";
      						break;
      					case 2:
      						return "自定义";
      						break;
      				}
            }

        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,
        },  {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:150,
            render:(text,recoder,index)=>(

                <span>
                  <a href="javascript:void(0);" onClick={this.getEditdialog.bind(this,recoder.workdataid)}> 修改</a>
                  <a href="javascript:void(0);" onClick={this.delData.bind(this,recoder.workdataid)}> 删除</a>
                </span>              
            )

        }]
        const formItemLayout = {
           labelCol: {span: 4},
           wrapperCol: {span: 16},
        };
        var title = this.props.params.title || '资料库';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            tags:['唐诗','宋词','童谣'],
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
                            <Col span={8} offset={8} className='zmiti-inforlist-button-right'><Button type='primary' onClick={this.postform.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-inforlist-line"></div>
                    <Row gutter={10} type='flex' className='inforlist-search '>
                        <Col className="inforlist-heigth45">标题：</Col>
                        <Col className="inforlist-heigth45"><Input value={this.state.keyword} placeholder="名称" onChange={(e)=>{this.state.keyword=e.target.value;this.forceUpdate();}} /></Col>
                        <Col className="inforlist-heigth45"><Button onClick={this.searchBybutton.bind(this)}>查询</Button></Col>
                    </Row>
                    <Table bordered={true} 
                    
                    dataSource={this.state.dataSource} 
                    columns={columns} />
                </div>
                <Modal title="诗词资料" 
                    wrapClassName="dialogInformation"
                    width={1000}                    
                    visible={this.state.modpostDialogVisible}
                    onOk={this.addProduct.bind(this)}
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
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
                            autosize={{minRows: 2, maxRows: 5}}
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
                            autosize={{minRows: 2, maxRows: 5}}
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
                          <Select disabled={this.state.disabled} placeholder="资料类型" onChange={(value)=>{this.state.datatype=value;this.forceUpdate();}} value={this.state.datatype}>
                            <Option value={0}>唐诗</Option>
                            <Option value={1}>宋词</Option>
                            <Option value={2}>自定义</Option>
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

                    </Form>
                  </Modal>

                {this.state.showCredentialsDiolog && <ZmitiUploadDialog id="modifyaddpost" {...userProps}></ZmitiUploadDialog>}
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
		s.bindNewdata();

	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}
  changeAccount(i){       
    this.state.selectedIndex = i*1;
    this.state.keyword = '';
    this.forceUpdate();
    this.bindNewdata();
    //console.log(this.state.selectedIndex);
  }
	
	//显示列表
	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'document/get_documentlist',//接口地址
            data:{
        				userid:s.userid,
        				getusersigid:s.getusersigid,
                datatype:s.state.selectedIndex,             
                type:1,
                searchword:'',
            },
            success(data){
                if(data.getret === 0){                    
                    s.state.dataSource = data.list;
                    //console.log(s.state.dataSource,"信息列表");                    
                }else if(data.getret === 1002){
                  s.state.dataSource=[];                  
                }
                s.forceUpdate();
            }
        })
    }

	//弹框
	modifyaddpost(){
      var obserable=window.obserable;
         this.setState({
            showCredentialsDiolog:true
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:0,id:'addpost'}
          })  
        }) 
    }

    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
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

        if(this.currentId!==-1){//编辑        
            params.workdataid = this.currentId;  
            //console.log(params.workdataid);
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'document/edit_document/',
                data:params,
                success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                }
            });
            
        }else{
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'document/add_document/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  //console.log(this.data,'add_document');
              }
            }); 
        }

    }
    //edit-dialog
    getEditdialog(workdataid){
      var s=this;
      this.state.dataSource.map((item,i)=>{
        if(item.workdataid===workdataid){
          this.currentId = workdataid;
          this.setState({
            modpostDialogVisible:true,
            disabled:true,
            workdataid:item.workdataid,
            title:item.title,
            author:item.author,
            kindid:item.kindid,
            originaltext:item.originaltext,
            changetext:item.changetext,
            datatype:item.datatype,
            voiceurl:item.voiceurl,
          })
          this.forceUpdate();
          //console.log(this.currentId);
        }
      })

    }
    //search
    searchBybutton(){
          var selectedIndex = this.state.selectedIndex;
          var keyWord=this.state.keyword;
          var s = this;
          $.ajax({
             url:window.baseUrl+'document/get_documentlist',
              data:{
                  userid:s.userid,
                  getusersigid:s.getusersigid,
                  datatype:selectedIndex,
                  type:1,
                  searchword:keyWord,                  
              },
              success(data){
                  if(data.getret === 0){
                      s.state.dataSource = data.list;                      
                  }else if(data.getret === 1002){
                      s.state.dataSource=[];
                  }else if(data.getret === -3){
                      message.error('您没有访问的权限,2秒后跳转到首页');
                      setTimeout(()=>{
                          location.href='/';
                      },2000)
                  }
                  else{
                      message.error(data);                      
                  }
                  s.forceUpdate();
              }
          })

    }
	
    //删除
    delData(workdataid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        
        $.ajax({
            url:window.baseUrl+'document/del_document/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                documentid:workdataid,
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');
                    setTimeout(()=>{
                        s.bindNewdata();
                    },2000)
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })
    }

    //add-dialog
    postform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
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

export default ZmitiValidateUser(ZmitiViewinforListApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/