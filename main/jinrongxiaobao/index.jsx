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

 class ZmitiJinrongxbApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            loading:false,
            tip:'数据拉取中...',
            keyword:'',
            visible:false,            
            name:'',//名称            
            city:'',//城市
            positionbd:'',//百度地图坐标
            positiongd:'',//高德地图坐标
            address:'',//地址
            decoration:'',//简介
            dataSource:[{
              key: '1',
              name: '名称1',
              city: '西安',
              address: '未央区张家堡',
            }, {
              key: '2',
              name: '名称2',
              city: '西安',
              address: '新城区西一路',
            }, {
              key: '3',
              name: '名称3',
              city: '西安',
              address: '碑林区张家村',
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
        
        const columns = [{
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '城市',
          dataIndex: 'city',
          key: 'city',
          width:150,
        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
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
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
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
            selectedIndex: 100,
            rightType: "custom",
            customRightComponent:<div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">消保地址</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary' onClick={this.showModal.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">名称：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="名称" /></Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.dataSource} />
                </div>
                <Modal
                  title="消保地址"
                  width={800}
                  visible={this.state.visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="名称" 
                            value={this.state.name}
                            onChange={(e)=>{this.state.name=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="城市"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="城市" 
                            value={this.state.city}
                            onChange={(e)=>{this.state.city=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="地址"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="地址" 
                            value={this.state.address}
                            onChange={(e)=>{this.state.address=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="百度地图坐标"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="百度地图坐标" 
                            value={this.state.positionbd}
                            onChange={(e)=>{this.state.positionbd=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="高德地图坐标"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="高德地图坐标" 
                            value={this.state.positiongd}
                            onChange={(e)=>{this.state.positiongd=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="简介"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="简介" 
                            value={this.state.decoration}
                            onChange={(e)=>{this.state.decoration=e.target.value;this.forceUpdate();}}
                          />                      
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
        this.setState({
          visible: true,
        });
    }

    handleOk(e){
        console.log(e);
        this.setState({
          visible: false,
        });
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
          visible: false,
        });
    }






  
}

export default ZmitiValidateUser(ZmitiJinrongxbApp);
