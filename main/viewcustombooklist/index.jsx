import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin } from '../commoncomponent/common.jsx';
let Option = Select.Option;
let Search = Input.Search;
let FormItem = Form.Item;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import $ from 'jquery';
 class ZmitiViewBookListApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			loading:false,
			modDialogVisible:false,
			disabled:true,
            tip:'数据拉取中...',
      		selectedIndex:0,
      		bookIndex:0,
      		searchtype:0,
      		searchtext:'',
      		tags:['全部'],
      		keyword:'',
      		booktypeList:[],
      		workdatatype:0,
			dataSource:[],
			alldataSource:[],
			title:'',
			datatype:'',
			datatypename:'全部',
			datainfourl:'',//二维码图片
			workdataid:'',//书本id
			booktypeid:'',//书本分类id

		};
		this.condition = 0;
	}
	render() {

		var title = this.props.params.title || '书本列表';
		const columns=[{
            title:"序号",
            dataIndex:'key',
            key:'xx',
            width:80,
            filterIcon:true,
            render:(value,recorder,index)=>{
                return <div className="zmiti-viewcustombooklist-key">{index+1}</div>;
            }
        },{
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '二维码',
            dataIndex: 'qrcodeurl',
            key: 'qrcodeurl',
            width:120,
            filterIcon:true,
            render:(value)=>{
            	if(value!=''){
            		return <img src={value} />;
            	}else{
            		return "NULL"
            	}
                
            }

        },{
            title: '时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,

        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:80,
            render:(value,recoder,index)=>(
            	<span>
                  
                  <a href="javascript:void(0)" onClick={this.bookdialog.bind(this,recoder.workdataid)}>修改</a>
                </span>
            )

        }]
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
			tags:this.state.tags,
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:this.state.selectedIndex,
            rightType:"custom",
            customRightComponent:<Spin tip={this.state.tip} spinning={this.state.loading}><div className='viewcustombooklist-main-ui'>
	            	<div className='pad-10'>
	            		<div className="zmiti-viewcustombooklist-header">
	                        <Row>
	                            <Col span={8} className="zmiti-viewcustombooklist-header-inner">书本列表</Col>
	                            <Col span={8} offset={8} className='zmiti-viewcustombooklist-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button></Col>
	                        </Row>                      
	                    </div>
	                    <div className="zmiti-viewcustombooklist-line"></div>
	                    <div className="hr20"></div>
	                    <Row>
	                    	<Col span={8} className="zmiti-viewcustombooklist-search">
	                    		<Search
								    placeholder="书名"
								    style={{ width: 200 }}
								    size="default"
								    onSearch={this.searchbtn.bind(this)}
								  />	
	                    	</Col>
	                    </Row>
	                    <div className="hr20"></div>                     
	            		<Table bordered={true} 
	                          dataSource={this.state.dataSource} 
	                          columns={columns} />
	            	</div>
	            </div>
	            <Modal title={'分类：'+this.state.datatypename} visible={this.state.modDialogVisible}
					onOk={this.editbookinfo.bind(this)}
					onCancel={()=>{this.setState({modDialogVisible:false})}}
                  >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="名称" disabled={this.state.disabled}
							value={this.state.title}
							onChange={(e)=>{this.state.title=e.target.value;this.forceUpdate();}}
                          />                    
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="二维码"
                        hasFeedback
                      >                        
                          
			              <Row>
			              	
			              	<Col span={12} className="zmiti-viewcustombooklist-spaces">
				              <div className="zmiti-viewcustombooklist-upload">
								<Button>
									<Icon type="upload" /> 上传图片
								</Button>
				                <input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  />                                
				              </div>
			              	</Col>
			              	<Col span={12} className="zmiti-viewcustombooklist-picture">
			              		<img src={this.state.qrcodeurl} alt={this.state.qrcodeurl}/>
			              	</Col>
			              </Row>


                
                      </FormItem>
                    </Form>
                </Modal>
            </Spin>
        }
        var mainComponent = <div>
          <ZmitiUserList {...props}></ZmitiUserList>
        </div>;
        return (
          <MainUI component={mainComponent}></MainUI>
        );
	}

	componentWillMount() {
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
		var s = this;
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		resizeMainHeight(this,'setAdminHeight');
		s.loadData();
		s.getbooktype();
		s.bindNewdata();

	}
	changeAccount(i){ 
		var s = this;     
		this.state.selectedIndex = i*1;
		this.state.title = '';
		s.forceUpdate();
		s.bindNewdata();
		//console.log(this.state.selectedIndex);
	}
	//列表
	bindNewdata(){
		var s=this;
		var wxopenid=s.props.params.id;
		s.state.dataSource=[];
		if(s.state.selectedIndex>0){
			
			$.each(s.state.booktypeList,function(m,item){
					if(s.state.selectedIndex-1===m){
						//console.log(item.workdatatype);
						s.state.workdatatype=item.workdatatype;
						$.ajax({
					        url:window.baseUrl+'document/get_documentlist/',
					        //type:window.ajaxType || 'get',
					        data:{
					          userid:s.userid,
					          getusersigid:s.getusersigid,
					          datatype:s.state.workdatatype,
					        },
					        success(data){
					        	if(data.getret===0){
					        		s.state.dataSource=data.list;
					        		s.state.loading=false;
					        		s.forceUpdate();
					        		console.log(this.url,s.state.workdatatype);
					        	}
					        }
						})
					}
			})
		}else{
			$.ajax({
		        url:window.baseUrl+'book/get_booknamelist/',
		        //type:window.ajaxType || 'get',
		        data:{
		          userid:s.userid,
		          getusersigid:s.getusersigid,
		        },
		        success(data){
		        	if(data.getret===0){
		        		s.state.dataSource=data.list;
		        		s.state.alldataSource=data.list;
					    s.state.loading=false;
		        		s.forceUpdate();
		        		//console.log(this.url,'bindNewdata');
		        	}
		        }
			})
		}

	}
	//获取书本分类
	getbooktype(){
		var s = this;
		$.ajax({
            url:window.baseUrl+'book/get_bookclass/',
            //type:window.ajaxType || 'get',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                	var typename=['全部'];
		            $.each(data.list,function(i,item){
		              typename.push(item.typename);
		            })            
		            s.state.tags=typename;
		            s.state.booktypeList=data.list;
		            //console.log(data.list,'booktypeList');
		            s.forceUpdate();
                }
            }
        })    
	}
	//search 
	searchbtn(value){
		var s=this;
		s.state.searchtext=value;
		s.state.selectedIndex=0;
		console.log(s.state.dataSource);
        this.dataSource = this.alldataSource  || this.state.alldataSource.concat([]) ;
        this.state.dataSource = this.dataSource.filter((item)=>{
            return  item.title.indexOf(this.state.searchtext)>-1;
        });
        s.forceUpdate(); 
	}
	//dialog
	bookdialog(workdataid){
		var s = this;
		var typename='';
		$.each(s.state.dataSource,function(i,item){
			if(item.workdataid===workdataid){
				//console.log(workdataid,'workdataid');				
				$.each(s.state.booktypeList,function(m,category){
					if(item.datatype===category.workdatatype){						
						typename=category.typename;
					}
				})
				s.setState({
					modDialogVisible:true,
					title:item.title,
					qrcodeurl:item.qrcodeurl,
					datatypename:typename,
					workdataid:workdataid,
					booktypeid:item.datatype,
				})
			}
		})

	}
	//edit
	editbookinfo(){
		var s = this;
		$.ajax({
          url:window.baseUrl+ 'document/edit_book/',
          //type:window.ajaxType || 'get',
          type:'GET',
          data:{
          	userid:s.userid,
            getusersigid:s.getusersigid,         	
          	workdataid:s.state.workdataid,
          	datatype:s.state.booktypeid,
          	qrcodeurl:s.state.datainfourl,
          },success(data){
          	message[data.getret === 0 ? 'success':'error'](data.getmsg);
          	if(data.getret===0){
          		//console.log(data,'修改成功');
          		s.setState({
					modDialogVisible:false,
				})
				s.bindNewdata();
				s.forceUpdate(); 
          	}
          }
        })
		
	}
	//上传图片
    uploadFile(){
    	var userid = this.props.params.userid?this.props.params.userid:this.userid;
        let formData = new FormData(),
        s = this;
        formData.append('userid',s.userid);
        formData.append('getusersigid',s.getusersigid);
        formData.append('setuploadtype','0');
        formData.append('setdatainfoclassid','1465782065');
        formData.append('setupfile', this.refs['upload-file'].files[0]);       
        $.ajax({
          url:window.baseUrl+ 'upload/upload_file',
          //type:window.ajaxType || 'get',
          type:'POST',
          data:formData,
          contentType: false,
          processData: false,
          success(data){
          	message[data.getret === 0 ? 'success':'error'](data.getmsg);
          	if(data.getret === 0){
          		s.state.datainfourl=data.getfileurlArr[0].datainfourl;
	            //console.log(data.getfileurlArr[0].datainfourl);
	            s.forceUpdate(); 
            }          
          }
        })
    }
	//loading
	loadData(){   
		var s = this;
		this.state.loading = true;
		s.forceUpdate();
	}
	//返回
    goback(){
        window.location='#/custom/'
    }

}
export default ZmitiValidateUser(ZmitiViewBookListApp);


