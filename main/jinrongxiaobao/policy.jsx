import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin} from '../commoncomponent/common.jsx';
let Search = Input.Search;
const FormItem = Form.Item;
let Option = Select.Option;
import $ from 'jquery';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import MainUI from '../components/Main.jsx';
import ZmitiEditor from '../components/zmiti-editor.jsx';
class ZmitiJinrongxbPolicyApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            loading:false,
            tip:'数据拉取中...',
            titleIndex:'',
            visible:false,
            policyid:'',//文章id
            title:'',
            createtime:'',//创建时间
            updatetime:'',//更新时间
            content:'',
            sort:0,//排序
            dataSource:[],
            total:0,
			pageIndex:1,
			pagenum:5,        
        }
        this.currentId = -1;
    }


    render(){
        var s=this;
        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);
        resizeMainHeight(this);
        const formItemLayout = {
           labelCol: {span: 3},
           wrapperCol: {span: 20},
        };
        const columns = [{
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        }, {
          title: '时间',
          dataIndex: 'createtime',
          key: 'createtime',
          width:150,
        }, {
          title: '操作',
          key: 'action',
          width:150,
          render: (text, record) => (
            <span>
              <a href="javascript:void(0)" onClick={this.getDetail.bind(this,record.policyid)}>编辑</a>
              <span className="ant-divider" />
              <a href="javascript:void(0)" onClick={this.delcontent.bind(this,record.policyid)}>删除</a>
            </span>
          ),
        }];
        let editorProps ={
            onChange(editor){
                s.setState({
                    content:editor.el.innerHTML
                });
            },
            height:200,
            html:this.state.content,
            $,
            isAdmin:false,
            showPreview:false,
        }
        var title = this.props.params.title || '金融消保';
        const dateFormat = 'YYYY-MM-DD';
        const monthFormat = 'YYYY/MM';
        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['消保地址','政策管理','公告管理','设置'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 1,
            rightType: "custom",
            customRightComponent:<div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">政策管理</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary' onClick={this.showModal.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">搜索</Col>
                        <Col className="jinrongxb-heigth45">
                        	<Search
                                placeholder="输入文章内容"
                                style={{ width: 200 }}
                                onSearch={function(value){                                    
                                    s.state.titleIndex=value;
                                    s.forceUpdate();
                                    s.searchNewdata(value);
                                }}
                                />
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.dataSource} 
                    	pagination={{
                           defaultCurrent:s.state.pageIndex,
                           defaultPageSize:s.state.pagenum,
                           total:s.state.total,
                           onChange:function(page){                                    
                            s.state.pageIndex=page;
                            s.bindNewdata();
                            s.forceUpdate();
                           }
                        }}
                    />
                </div>
                <Modal
                  title="政策管理"
                  width={800}
                  visible={this.state.visible}
                  onOk={this.addcontent.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="序号"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="序号" 
                            value={this.state.sort}
                            onChange={(e)=>{this.state.sort=e.target.value;this.forceUpdate();}}
                          />                      
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
                          <ZmitiEditor {...editorProps} ></ZmitiEditor>
                                               
                      </FormItem>


                    </Form>
                    
                </Modal>
            </div>
        }
        var mainComponent = <div>
            <ZmitiUserList {...props}></ZmitiUserList>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }
    componentWillMount() {
        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);
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
        var s=this;
        this.resizeMainHeight(this);
        s.bindNewdata();//列表
    }
    changeAccount(i){
        if(i*1===0){
            window.location.hash='jinrongxiaobao/';       
        }else if(i*1===1){
            window.location.hash='jinrongxiaobaopolicy/';
        }else if(i*1===2){
            window.location.hash='jinrongxiaobaonotice/';
        }else if(i*1===3){
            window.location.hash='jinrongxiaobaosetup/';
        }
    }
	//列表
	bindNewdata(){
        var s = this;
        $.ajax({
            url:window.baseUrl+'xbadmin/getpolicyinfolist/',//接口地址
            type:'post',
            data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				status:1,//有效文章
				page:s.state.pageIndex,
				pagenum:s.state.pagenum,
            },
            success(data){

                if(data.getret === 0){
                    //console.log(data,"信息列表");
                    s.state.total=data.totalnum;
                    s.state.dataSource = data.list;
                    s.forceUpdate();
                }
            }
        })
    }
    //搜索
    searchNewdata(title){
    	var s = this;
    	if(title.length>0){
    		$.ajax({
	            url:window.baseUrl+'xbapp/searchpolicylist/',//接口地址
	            type:'post',
	            data:{
					userid:s.userid,
					getusersigid:s.getusersigid,
					status:1,//有效文章
					keyword:title,
	            },
	            success(data){
	                if(data.getret === 0){
	                    //console.log(data,"信息列表");
	                    s.state.total=0;
	                    s.state.dataSource = data.list;
	                    s.forceUpdate();
	                }else{
	                	message.warning("无数据");
	                }
	            }
	        })
    	}else{
    		s.bindNewdata();
    	}
        
    }
    showModal() {    	
    	var s=this;
        this.currentId=-1;
        this.setState({
            visible:true,
            title:'',
            //updatetime:'', 
            content:'', 
            sort:0,          
        })
        s.forceUpdate();
    }
    addcontent(policyid){
    	var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,         
            title:s.state.title,            
            content:s.state.content,
            sort:s.state.sort,
        }
        if(this.currentId!==-1){//编辑        
            params.policyid = this.currentId;
            //console.log(params.policyid,'params');
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'xbadmin/editpolicyinfo/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    visible:false,
                    title:'',
                    content:'',
                  });
                  s.bindNewdata();
                  s.forceUpdate();
              }
            });
        }else{//添加
        	$.ajax({
              type:'POST',
              url:window.baseUrl + 'xbadmin/addpolicyinfo/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    visible:false,
                    title:'',
                    updatetime:'',
                    content:'',
                    sort:0,
                  });
                  s.bindNewdata();
                  s.forceUpdate();
              }
            });         	
        }
    }
    //获取某一条详情
    getDetail(policyid){
        var s=this;
        this.currentId = policyid;        
        $.ajax({
            url:window.baseUrl+'xbadmin/getpolicyinfodetail/',
            type:'post',
            data:{
				userid:s.userid,
				getusersigid:s.getusersigid,
				policyid:policyid,
            },
            success(data){
                if(data.getret === 0){
                   
                    s.setState({
			            visible:true,
			          	title:data.detail.title,
			            updatetime:data.detail.updatetime,
			            content:data.detail.content,
			            sort:data.detail.sort,
			        })
                    s.forceUpdate();
                }
            }
        })
        //console.log(this.currentId,'this.currentId');
    }
    delcontent(policyid){
    	var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'xbadmin/delpolicyinfo/',
            type:'post',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                policyid:policyid,
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');                    
                    setTimeout(()=>{
                        s.bindNewdata();
                    },2000)               
                }else{

                	message.error(data.getmsg);
                }
            }
        })
    }

    handleCancel(e) {
        this.setState({
          visible: false,
        });
    }
  
}

export default ZmitiValidateUser(ZmitiJinrongxbPolicyApp);
