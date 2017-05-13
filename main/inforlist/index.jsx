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

class ZmitiInforListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
			modpostEditDialogVisible:false,		
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
		};
        this.currentId = -1;
		
	}
    getProductDetail(record,index,e){
        var s=this;
        this.currentId = record.workdataid;
        if(e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON'){
            return;//如果点击的是删除按钮，则不用弹出产品详情。
        }
        this.setState({
            modpostDialogVisible:true,
            workdataid:record.workdataid,
            title:record.title,
            author:record.author,
            kindid:record.kindid,
            originaltext:record.originaltext,
            changetext:record.changetext,
            datatype:record.datatype,
            voiceurl:record.voiceurl,
        })

        this.forceUpdate();
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
            width:200,

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
                <Button  onClick={this.delData.bind(this,recoder.workdataid)}> 删除</Button>                
            )

        }]
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };


  
		var mainComponent = <div className='inforlist-main-ui' style={{height:this.state.mainHeight}}>
			
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
                        <Col className="inforlist-heigth45"><Input value={this.state.keyword} placeholder="名称" onChange={this.searchByKeyword.bind(this)}/></Col>
                    </Row>
                    <Table bordered={true}
                                 onRowClick={(record,index,i)=>{this.getProductDetail(record,index,i)}}
                                 dataSource={this.state.dataSource} columns={columns} />
                </div>
                <Modal title="诗词资料" visible={this.state.modpostDialogVisible}
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
	//search
	searchByKeyword(e){
        this.setState({
            keyword:e.target.value
        },()=>{
            this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;

            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.title.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
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
                type:1,
                searchword:'',
            },
            success(data){

                if(data.getret === 0){                    
                    s.state.dataSource = data.list;
                    //console.log(s.state.dataSource,"信息列表");
                    s.forceUpdate();
                }
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

export default ZmitiValidateUser(ZmitiInforListApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/