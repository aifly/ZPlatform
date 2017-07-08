import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
const FormItem = Form.Item;
const Option = Select.Option;
import $ from 'jquery';

class ZmitiTriptrafficApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
            modpostEditDialogVisible:false,
			companyid:'',
			companyname:'',
			transportid:'',
			jobid:'',
			dataSource:[],
			transport:[],
			tripost:[],
            traffic:'',
            

		};

		this.currentId = -1;
	}
    getProductDetail(record,index,e){
        var s=this;
        this.currentId = record.traffic;
        if(e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON'){
            return;//如果点击的是删除按钮，则不用弹出产品详情。
        }
        this.setState({
            modpostDialogVisible:true,
            traffic:record.traffic,
            transportid:record.transportid,
            jobid:record.jobid,
        })

        this.forceUpdate();
    }
	render() {
		const columns = [{
            title: '交通工具',
            dataIndex: 'transportname',
            key: 'transportname'

        },{
            title: '职务',
            dataIndex: 'jobname',
            key: 'jobname'

        },{
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime'

        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                <Button  onClick={this.delData.bind(this,recoder.traffic)}> 删除</Button>                
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
			tags:['交通工具','差旅费','出差事由'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 0,
			rightType: "custom",
			customRightComponent:<div className='tripost-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-tripost-header">
						<Row>
							<Col span={8} className="zmiti-tripost-header-inner">交通工具-{this.state.companyname}</Col>
							<Col span={8} offset={8} className='zmiti-tripost-button-right'><Button type='primary' onClick={this.trafficform.bind(this)}>添加</Button><div>|</div><Button onClick={this.tripostlink.bind(this)}>职务</Button></Col>
						</Row>				
					</div>
					<div className="zmiti-tripost-line"></div>
					<Table bordered={true}
                                 onRowClick={(record,index,i)=>{this.getProductDetail(record,index,i)}}
                                 dataSource={this.state.dataSource} columns={columns} />
				</div>
				<Modal title="交通工具" visible={this.state.modpostDialogVisible}
					onOk={this.addProduct.bind(this)}
					onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="交通工具"
                        hasFeedback
                      >                        
                          
                          
                          <Select placeholder="交通工具" onChange={(value)=>{this.state.transportid=value;this.forceUpdate();}} value={this.state.transportid}
                          >
                          	{
                                this.state.transport.map((item,i)=> {
	                                return(
		                          		<option key={i} value={item.transportid}>{item.transportname}-{item.transportlevel}</option>
		                          	)
                            	})
                            }
                          </Select>                    
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="职务"
                        hasFeedback
                      >
                          <Select placeholder="职务" onChange={(value)=>{this.state.jobid=value;this.forceUpdate();}} value={this.state.jobid}
                          >
                          	{
                                this.state.tripost.map((item,i)=> {
	                                return(
		                          		<option key={i} value={item.jobid}>{item.jobname}</option>
		                          	)
                            	})
                            }
                          </Select>                     
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

	changeAccount(i){
        if(i*1===0){
        	window.location.hash='triptraffic/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='tripexpence/';
        }else if(i*1===2){
            window.location.hash='tripreason/';
        }
	}
    tripostlink(){
        window.location="#/tripost/"
    }

	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_trafficlist',//接口地址
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
                        companyname:data.detail_info.companyname,
                        companyid:data.detail_info.companyid
                    })
                }
            }
        })
    }

    //获取交通工具
    getbaseData(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
    
        $.ajax({
            url:window.baseUrl+'travel/get_trafficbase',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data,"交通工具");
                    s.state.transport=data.list;
                    s.forceUpdate();
                }
            }
        })
    }
    //获取职务
    getjobData(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
    
        $.ajax({
            url:window.baseUrl+'travel/get_joblist',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data,"职务");
                    s.state.tripost=data.list;
                    s.forceUpdate();
                }
            }
        })
    }
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,          
            transportid:s.state.transportid,
            jobid:s.state.jobid,
        }

        if(this.currentId!==-1){//编辑        
            params.traffic = this.currentId;  
            
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'travel/edit_traffic/',
                data:params,
                success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  
                  
                }
            });
            console.log(params,'edit_traffic');
        }else{
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'travel/add_traffic/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  console.log(this.url,'add_traffic');
              }
            }); 
        }

    }
    //删除
    delData(traffic){
        var s = this;
        $.ajax({
            url:window.baseUrl+'travel/del_traffic/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                traffic:traffic,
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
    trafficform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
            transportid:'',
            transportid:''
        })
        s.forceUpdate();
    }
	componentDidMount() {
		var s=  this;
		s.bindNewdata();
		s.getbaseData();
		s.getjobData();
		s.getCompanydetail();
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiTriptrafficApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/