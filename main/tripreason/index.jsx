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

class ZmitiTripReasonApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:2,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
			modpostEditDialogVisible:false,		
			tripname:'',
			ptripcode:'1Aekq8x',
			settripcode:'',
			settripname:'',
			setptripcode:'',
			dataSource:[],
			tripcode:'',
			keyword:'',
			companyname:'',
		};
        this.currentId = -1;
		
	}
    getProductDetail(record,index,e){
        var s=this;
        this.currentId = record.tripcode;
        if(e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON'){
            return;//如果点击的是删除按钮，则不用弹出产品详情。
        }
        this.setState({
            modpostDialogVisible:true,
            tripcode:record.tripcode,
            tripname:record.tripname,
            ptripcode:record.ptripcode,
        })

        this.forceUpdate();
    }
	render() {
		var s =this;
		const columns = [{
            title: '出差事由',
            dataIndex: 'tripname',
            key: 'tripname'

        },{
            title: '类别',
            dataIndex: 'ptripcode',
            key: 'ptripcode',
            render:(value,record,index)=>{
            	switch(value){
					case '1Aekq8x':
						return "在途天数";
						break;
					case 'h7Wmv3d':
						return "自然天数";
						break;
				}
            }

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
                <Button  onClick={this.delData.bind(this,recoder.tripcode)}> 删除</Button>                
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
			tags:['交通工具','差旅费','出差事由','注意事项'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 2,
			rightType: "custom",
			customRightComponent:<div className='tripost-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-tripost-header">
						<Row>
							<Col span={8} className="zmiti-tripost-header-inner">出差事由-{this.state.companyname}</Col>
							<Col span={8} offset={8} className='zmiti-tripost-button-right'><Button type='primary' onClick={this.postform.bind(this)}>添加</Button></Col>
						</Row>						
					</div>
					<div className="zmiti-tripost-line"></div>
					<Row gutter={10} type='flex' className='tripost-search '>
						<Col className="tripost-heigth45">出差事由：</Col>
						<Col className="tripost-heigth45"><Input value={this.state.keyword} placeholder="出差事由" onChange={this.searchByKeyword.bind(this)}/></Col>
					</Row>
					<Table bordered={true}
                                 onRowClick={(record,index,i)=>{this.getProductDetail(record,index,i)}}
                                 dataSource={this.state.dataSource} columns={columns} />
				</div>
				<Modal title="出差事由" visible={this.state.modpostDialogVisible}
					onOk={this.addProduct.bind(this)}
					onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="出差事由"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="出差事由" 
							value={this.state.tripname}
							onChange={(e)=>{this.state.tripname=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="类别"
                        hasFeedback
                      >
                          <Select placeholder="类别" onChange={(value)=>{this.state.ptripcode=value;this.forceUpdate();}} value={this.state.ptripcode}>
                          	<Option value={'1Aekq8x'}>在途天数</Option>
                          	<Option value={'h7Wmv3d'}>自然天数</Option>
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
        }else if(i*1===3){
            window.location.hash='tripnotice/';
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
                return  item.tripname.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
    }
	//显示列表
	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/search_businesstriplist',//接口地址
            type:'POST',
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

    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,  
            setuserid:userid,          
            tripname:s.state.tripname,
            ptripcode:s.state.ptripcode,
        }

        if(this.currentId!==-1){//编辑        
            params.tripcode = this.currentId;  
            
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'travel/edit_businesstrip/',
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
              url:window.baseUrl + 'travel/add_businesstrip/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();

              }
            }); 
        }

    }

	
    //删除
    delData(tripcode){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        
        $.ajax({
            url:window.baseUrl+'travel/del_businesstrip/',
            type:'POST',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                tripcode:tripcode,
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
            tripname:'',
            ptripcode:'1Aekq8x'
        })
        s.forceUpdate();
    }
    //获取公司信息
    getCompanydetail(){
    	var s=this;
    	$.ajax({
    		url:window.baseUrl+'user/get_companydetail',
            type:'POST',
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

export default ZmitiValidateUser(ZmitiTripReasonApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/