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

class ZmitiTripostApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
			modpostEditDialogVisible:false,		
			jobname:'',
			level:'',
			setjobid:'',
			setjobname:'',
			setlevel:'',
			dataSource:[],
			jobid:'',
			keyword:'',
			companyname:'',
		};

		
	}
	render() {
		var s =this;
		const columns = [{
            title: '职务名称',
            dataIndex: 'jobname',
            key: 'jobname'

        },{
            title: '职务级别',
            dataIndex: 'level',
            key: 'level',
            render:(value,record,index)=>{
            	switch(value){
					case 1:
						return "初级职称";
						break;
					case 2:
						return "中级职称";
						break;
					case 3:
						return "高级职称";
						break;
				}
            }

        },{
            title: '创建时间',
            dataIndex: 'creattime',
            key: 'creattime'

        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                <span>
                	<a href="javascript:void(0);"  onClick={this.editData.bind(this,recoder.jobid)}> 修改</a>
                	<a href="javascript:void(0);"  onClick={this.delData.bind(this,recoder.jobid)}> 删除</a>
                </span>
            )

        }]
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };

		var title = this.props.params.title || '出差宝';

		let props={
			userList:this.state.userList,
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['职务','淡旺季','交通费','差旅费'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 0,
			rightType: "custom",
			customRightComponent:<div className='tripost-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-tripost-header">
						<Row>
							<Col span={8} className="zmiti-tripost-header-inner">职务-{this.state.companyname}</Col>
							<Col span={8} offset={8} className='zmiti-tripost-button-right'><Button type='primary' onClick={()=>{this.setState({modpostDialogVisible:true})}}>添加</Button></Col>
						</Row>						
					</div>
					<div className="zmiti-tripost-line"></div>
					<Row gutter={10} type='flex' className='tripost-search '>
						<Col className="tripost-heigth45">职务名称：</Col>
						<Col className="tripost-heigth45"><Input value={this.state.keyword} placeholder="职务名称" onChange={this.searchByKeyword.bind(this)}/></Col>
					</Row>
					<Table dataSource={this.state.dataSource} columns={columns} bordered/>
				</div>
				<Modal title="新增职务" visible={this.state.modpostDialogVisible}
					onOk={this.modpostOk.bind(this)}
					onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="职务名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="职务名称" 
							value={this.state.jobname}
							onChange={(e)=>{this.state.jobname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="职务级别"
                        hasFeedback
                      >
                          <Select placeholder="职务级别" onChange={(value)=>{this.state.level=value;this.forceUpdate();}} value={this.state.level}>
                          	<Option value={1}>普通职称</Option>
                          	<Option value={2}>中级职称</Option>
                          	<Option value={3}>高级职称</Option>
                          </Select>                     
                      </FormItem>

                    </Form>
                  </Modal>
                  <Modal title="修改职务" visible={this.state.modpostEditDialogVisible}
					onOk={this.modsaveData.bind(this)}
					onCancel={()=>{this.setState({modpostEditDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="职务名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="职务名称" 
							value={this.state.setjobname}
							onChange={(e)=>{this.state.setjobname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="职务级别"
                        hasFeedback
                      >
                          <Select placeholder="职务级别" onChange={(value)=>{this.state.setlevel=value;this.forceUpdate();}} value={this.state.setlevel}>
                          	<Option value={1}>普通职称</Option>
                          	<Option value={2}>中级职称</Option>
                          	<Option value={3}>高级职称</Option>
                          </Select>               
                      </FormItem>

                    </Form>
                  </Modal>
                  {this.state.showCredentialsDiolog && <ZmitiUploadDialog id="modifyaddpost" {...userProps}></ZmitiUploadDialog>}
                  {this.state.showCredentialsDiolog && <ZmitiUploadDialog id="modifyaddeditpost" {...userProps}></ZmitiUploadDialog>}

			</div>
		}
  
		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
			
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
		);
	}

	changeAccount(i){
        if(i*1===0){
        	window.location.hash='tripost/';            
        }else if(i*1===1){
            window.location.hash='tripseason/';
        }else if(i*1===2){
            window.location.hash='triptraffic/';
        }else if(i*1===3){
            window.location.hash='tripexpence/';
        }
	}

	componentDidMount() {
		var s=  this;
		s.bindNewdata();
		s.getCompanydetail();
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
                return  item.jobname.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
    }
	//显示列表
	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_joblist',//接口地址
            data:{
				setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid
            },
            success(data){

                if(data.getret === 0){
                    console.log(data,"信息列表");
                    s.state.dataSource = data.list;
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

	//新增職稱
    modpostOk(){
    	var s =this;
    	var userid = this.props.params.userid?this.props.params.userid:this.userid;
    	var  jobnameTxt =s.state.jobname;
		var  levelTxt = s.state.level;
		$.ajax({
			url:window.baseUrl + 'travel/add_job/',
			data:{
				setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid,
				jobname:jobnameTxt,
				level:levelTxt
			},
			success(data){
				if(data.getret === 0){
					console.log(data);
                    s.bindNewdata();
                    s.forceUpdate();
                    s.setState({
		              modpostDialogVisible:false
		            });
                }
			}
		})
    }
    //删除
    delData(jobid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        
        $.ajax({
            url:window.baseUrl+'travel/del_job/',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                jobid:jobid,
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
    //编辑
    editData(jobid){
    	var s = this;
    	var userid = this.props.params.userid?this.props.params.userid:this.userid;
        s.setState({        	
        	modpostEditDialogVisible:true
        })
        $.ajax({
        	url:window.baseUrl+'travel/get_jobdetial/',
        	data:{
        		setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                jobid:jobid,
        	},
        	success(data){
        		//console.log(jobid);
        		if(data.getret === 0){
	        		s.state.setjobname=data.detial.jobname;
	        		s.state.setlevel=data.detial.level;
	        		s.state.setjobid=jobid;	        		
	        		s.forceUpdate();	        		
        		}
        	}
        })
        //
    }
    //保存修改
    modsaveData(jobid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/edit_job/',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                jobid:s.state.setjobid,
                jobname:s.state.setjobname,
				level:s.state.setlevel
            },
            success(data){
                if(data.getret === 0){
                   //console.log(data,'保存成功');
					s.bindNewdata();
					s.setState({        	
						modpostEditDialogVisible:false
					})
                }

            }
        })
    }
    //获取公司信息
    getCompanydetail(){
    	var s=this;
    	$.ajax({
    		url:window.baseUrl+'user/get_companydetail',
    		data:{
    			userid:s.userid,
    			 getusersigid:s.getusersigid
    		},
    		success(data){
    			if(data.getret === 0){
    				s.setState({
    					companyname:data.detail_info.companyname
    				})
    			}
    		}
    	})
    }
}

export default ZmitiValidateUser(ZmitiTripostApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/