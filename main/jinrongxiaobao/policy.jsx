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
            keyword:'',
            visible:false,
            aid:'',//文章id
            title:'',
            update:'',
            content:'',
            dataSource:[{
              key: '1',
              aid:'001',
              title: '标题标题标题标题',              
              update: '2017-11-17',
              content:'内容',
            }, {
              key: '2',
              aid:'002',
              title: '标题标题标题标题222',              
              update: '2017-11-17',
              content:'内容222',
            }, {
              key: '3',
              aid:'003',
              title: '标题标题标题标题333',              
              update: '2017-11-17',
              content:'内容3333',
            }],            
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
          render: text => <a href="#">{text}</a>,
        }, {
          title: '时间',
          dataIndex: 'update',
          key: 'update',
          width:150,
        }, {
          title: '操作',
          key: 'action',
          width:150,
          render: (text, record) => (
            <span>
              <a href="#">编辑</a>
              <span className="ant-divider" />
              <a href="#">删除</a>
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
                        <Col className="jinrongxb-heigth45">标题：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="标题" /></Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.dataSource} />
                </div>
                <Modal
                  title="政策管理"
                  width={800}
                  visible={this.state.visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
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
                        label="时间"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="时间" 
                            value={this.state.update}
                            onChange={(e)=>{this.state.update=e.target.value;this.forceUpdate();}}
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
    showModal() {    	
    	var s=this;
        this.currentId=-1;
        this.setState({
            visible:true,
            title:'',
            update:'', 
            content:'',           
        })
        s.forceUpdate();
    }
    addcontent(){
    	var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,  
            setuserid:userid,          
            title:s.state.title,
            update:s.state.update,
            content:s.state.content,
        }
        if(this.currentId!==-1){//编辑        
            params.aid = this.currentId; 
            console.log(params,'params');
        }else{//添加
        	console.log(params,'params');
        }
    }

    handleOk(e){
        //console.log(e);
        this.setState({
          visible: false,
        });
    }
    handleCancel(e) {
        //console.log(e);
        this.setState({
          visible: false,
        });
    }






  
}

export default ZmitiValidateUser(ZmitiJinrongxbPolicyApp);
