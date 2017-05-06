import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Cascader, message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
const FormItem = Form.Item;
const Option = Select.Option;
import $ from 'jquery';

class ZmitiTripexpenceApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:3,
			mainHeight:document.documentElement.clientHeight-50,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
			modpostEditDialogVisible:false,
			companyid:'',
			companyname:'',
			dataSource:[],
			transportid:'',
			jobid:'',
			transport:[],
			tripost:[],
			provid:'30',//省份id
			cityid:'377',//城市id
			jobid:'',//职务id
			hotelprice1:'',//住宿费
			hotelprice2:'',//旺季住宿费
			foodprice:'',//伙食费
			othertraficprice:'',//其它交通补助费
			otherprice:'',//其它补助费
			expenseid:'',
			setsetexpenseid:'',
			setprovid:'30',//省份id
			setcityid:'377',//城市id
			setjobid:'',//职务id
			sethotelprice1:'',//住宿费
			sethotelprice2:'',//旺季住宿费
			setfoodprice:'',//伙食费
			setothertraficprice:'',//其它交通补助费
			setotherprice:'',//其它补助费
            inputValue: '',//省市
            defaultValue:[],//编辑时省市默认值
            options:[],
		};

		
	}
	render() {
		const columns = [{
            title: '省份',
            dataIndex: 'provid',
            key: 'provid',
            width:100

        },{
            title: '城市',
            dataIndex: 'cityid',
            key: 'cityid'

        },{
            title: '职务',
            dataIndex: 'jobid',
            key: 'jobid'

        },{
            title: '住宿费',
            dataIndex: 'hotelprice1',
            key: 'hotelprice1'

        },{
            title: '旺季住宿费',
            dataIndex: 'hotelprice2',
            key: 'hotelprice2'

        },{
            title: '伙食费',
            dataIndex: 'foodprice',
            key: 'foodprice'

        },{
            title: '其它交通补助费',
            dataIndex: 'othertraficprice',
            key: 'othertraficprice'

        },{
            title: '其它补助费',
            dataIndex: 'otherprice',
            key: 'otherprice'

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
                <span>
                	<a href="javascript:void(0);"  onClick={this.editData.bind(this,recoder.expenseid)}> 修改</a>
                	<a href="javascript:void(0);"  onClick={this.delData.bind(this,recoder.expenseid)}> 删除</a>
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
			selectedIndex: 3,
			rightType: "custom",
			customRightComponent:<div className='tripost-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-tripost-header">
						<Row>
							<Col span={8} className="zmiti-tripost-header-inner">差旅费-{this.state.companyname}</Col>
							<Col span={8} offset={8} className='zmiti-tripost-button-right'><Button type='primary' onClick={()=>{this.setState({modpostDialogVisible:true})}}>添加</Button></Col>
						</Row>					
					</div>
					<div className="zmiti-tripost-line"></div>
					<Table dataSource={this.state.dataSource} columns={columns} bordered/>
				</div>
				<Modal title="新增差旅费" visible={this.state.modpostDialogVisible}
					onOk={this.modpostOk.bind(this)}
					onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                >
                	<Form>
						<FormItem
                            {...formItemLayout}
                            label="选择城市"
                            hasFeedback
                          >                        
                              
                          <Cascader options={this.state.options} onChange={this.cityonChange.bind(this)} placeholder="选择城市" />
                         
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
						<FormItem
							{...formItemLayout}
							label="住宿费"
							hasFeedback
							>
							<Input placeholder="住宿费" 
							value={this.state.hotelprice1}
							onChange={(e)=>{this.state.hotelprice1=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="旺季住宿费"
							hasFeedback
							>
							<Input placeholder="旺季住宿费" 
							value={this.state.hotelprice2}
							onChange={(e)=>{this.state.hotelprice2=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="伙食费"
							hasFeedback
							>
							<Input placeholder="伙食费" 
							value={this.state.foodprice}
							onChange={(e)=>{this.state.foodprice=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="其它交通补助费"
							hasFeedback
							>
							<Input placeholder="其它交通补助费" 
							value={this.state.othertraficprice}
							onChange={(e)=>{this.state.othertraficprice=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="其它补助费"
							hasFeedback
							>
							<Input placeholder="其它补助费" 
							value={this.state.otherprice}
							onChange={(e)=>{this.state.otherprice=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="修改差旅费" visible={this.state.modpostEditDialogVisible}
					onOk={this.modsaveData.bind(this)}
					onCancel={()=>{this.setState({modpostEditDialogVisible:false})}}
                >
                	<Form>
						<FormItem
                        {...formItemLayout}
                        label="选择城市"
                        hasFeedback
                      >                        
                          
                      <Cascader defaultValue={this.state.defaultValue} options={this.state.options} onChange={this.cityonChange.bind(this)} placeholder="选择城市" />
                     
                      </FormItem>
                        <FormItem
							{...formItemLayout}
							label="职务"
							hasFeedback
							>
							<Select placeholder="职务" onChange={(value)=>{this.state.setjobid=value;this.forceUpdate();}} value={this.state.setjobid}
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
						<FormItem
							{...formItemLayout}
							label="住宿费"
							hasFeedback
							>
							<Input placeholder="住宿费" 
							value={this.state.sethotelprice1}
							onChange={(e)=>{this.state.sethotelprice1=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="旺季住宿费"
							hasFeedback
							>
							<Input placeholder="旺季住宿费" 
							value={this.state.sethotelprice2}
							onChange={(e)=>{this.state.sethotelprice2=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="伙食费"
							hasFeedback
							>
							<Input placeholder="伙食费" 
							value={this.state.setfoodprice}
							onChange={(e)=>{this.state.setfoodprice=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="其它交通补助费"
							hasFeedback
							>
							<Input placeholder="其它交通补助费" 
							value={this.state.setothertraficprice}
							onChange={(e)=>{this.state.setothertraficprice=e.target.value;this.forceUpdate();}}
							/>
                        </FormItem>
                        <FormItem
							{...formItemLayout}
							label="其它补助费"
							hasFeedback
							>
							<Input placeholder="其它补助费" 
							value={this.state.setotherprice}
							onChange={(e)=>{this.state.setotherprice=e.target.value;this.forceUpdate();}}
							/>
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

	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_expenselist',//接口地址
            data:{
				setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid
            },
            success(data){

                if(data.getret === 0){
                    //console.log(data,"信息列表");
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

    //新增
    modpostOk(){
    	var s =this;
    	var userid = this.props.params.userid?this.props.params.userid:this.userid;
    	var transportidTxt =s.state.transportVal;
		var jobidTxt = s.state.tripostVal;
		$.ajax({
			url:window.baseUrl + 'travel/add_expense/',
			data:{
				setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid,
				provid:s.state.inputValue[0],
                cityid:s.state.inputValue[1],
				jobid:s.state.jobid,
				hotelprice1:s.state.hotelprice1,
				hotelprice2:s.state.hotelprice2,
				foodprice:s.state.foodprice,
				othertraficprice:s.state.othertraficprice,
				otherprice:s.state.otherprice,
			},
			success(data){				
                s.bindNewdata();
                s.forceUpdate();
                s.setState({
	              modpostDialogVisible:false
	            });
	            //console.log(this.url,"提交地址")
			}
		})
		
    }
    //编辑
    editData(expenseid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var defaultValue=new Array();
        s.setState({            
            modpostEditDialogVisible:true
        })
        $.ajax({
            type:'POST',
            url:window.baseUrl+'travel/get_expensedetial/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setuserid:userid,
                expenseid:expenseid,
            },
            success(data){
                //console.log(jobid);
                if(data.getret === 0){
                    s.state.setprovid=data.detial.provid;
                    s.state.setcityid=data.detial.cityid;
                    s.state.setjobid=data.detial.jobid;
                    s.state.sethotelprice1=data.detial.hotelprice1;
                    s.state.sethotelprice2=data.detial.hotelprice2;
                    s.state.setfoodprice=data.detial.foodprice;
                    s.state.setothertraficprice=data.detial.othertraficprice;
                    s.state.setotherprice=data.detial.otherprice;            
                     
                    s.state.setexpenseid=expenseid;  
                    defaultValue.push(String(data.detial.provid),String(data.detial.cityid));
                    s.state.defaultValue=defaultValue;
                    
                    s.setState({ 
                        defaultValue:defaultValue
                    })
                    console.log(s.state.defaultValue);      
                    s.forceUpdate();                    
                }
            }
        })
        //
    }
    //保存修改
    modsaveData(expenseid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/edit_expense/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setuserid:userid,
                provid:s.state.setprovid,
				cityid:s.state.setcityid,
				jobid:s.state.setjobid,
				hotelprice1:s.state.sethotelprice1,
				hotelprice2:s.state.sethotelprice2,
				foodprice:s.state.setfoodprice,
				othertraficprice:s.state.setothertraficprice,
				otherprice:s.state.setotherprice,
				expenseid:s.state.setexpenseid,
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
    //删除
    delData(expenseid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
    	$.ajax({
            url:window.baseUrl+'travel/del_expense/',
            data:{
                setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid,
                expenseid:expenseid,
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
    //Cascader
    getCascader(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var provinceOptions=[];
        $.ajax({
            url:window.baseUrl+'travel/get_basedata',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.result.citys[0].list,"基础数据");
                    /*var items=data.result.citys[0].list;
                    $.each(data.result.citys[0].list,function(index,item){   
                        provinceOptions.label=item.name;
                        provinceOptions.value=item.provinceId;
                        provinceOptions.children=item.cities;

                    }) 
                    
                    
                    console.log(provinceOptions,"省市");*/

                    s.forceUpdate();
                }
            }
        })
                    s.setState({
                        options:[{
                          value: '30',
                          label: '云南',
                          children: [{
                            value: '377',
                            label: '临沧'
                          },{
                            value: '370',
                            label: '丽江'
                          }],
                        }, {
                          value: '19',
                          label: '内蒙古',
                          children: [{
                            value: '267',
                            label: '乌兰察布市'
                          },{
                            value: '266',
                            label: '乌海'
                          }],
                        }]
                    })
    }
    //选择省市
    cityonChange(value){
        var s=this;
        s.state.inputValue=value;
    }

	componentDidMount() {
		var s=  this;
		s.bindNewdata();
		s.getCompanydetail();
		s.getjobData();
        s.getCascader();
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiTripexpenceApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/