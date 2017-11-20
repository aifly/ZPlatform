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
class ZmitiJinrongxbPolicyinfoApp extends React.Component{
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
            excerpt:'',
            content:'',
            sort:0,//排序
            dataSource:[],
            dataSearchSource:[],
            total:0,
            pageIndex:1,
            pagenum:10,        
        }
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
          labelCol: {
            xs: {
              span: 24
            },
            sm: {
              span: 6
            },
          },
          wrapperCol: {
            xs: {
              span: 24
            },
            sm: {
              span: 14
            },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 14,
              offset: 6,
            },
          },
        };
        const columns = [{
          title: '序号',
          dataIndex: 'sort',
          key: 'sort',
        },{
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },{
          title: '浏览量',
          dataIndex: 'totalview',
          key: 'totalview',
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
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary'><a href="./#/jinrongxiaobaopolicyinfo/" onClick={this.openform.bind(this)}>添加</a></Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <div>&nbsp;</div>
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
                        label="摘要"
                        hasFeedback
                      >                        
                          
                          <textarea className="ant-input ant-input-lg" 
                            style={{"resize":"none"}}
                            placeholder="摘要" 
                            value={this.state.excerpt}
                            onChange={(e)=>{this.state.excerpt=e.target.value;this.forceUpdate();}}
                          >
                          </textarea>                    
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="内容"
                        hasFeedback
                      > 
                          <ZmitiEditor {...editorProps} ></ZmitiEditor>
                                               
                      </FormItem>

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
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.addcontent.bind(this)} htmlType="submit">提交</Button>
                      </FormItem>

                      
                    </Form>

                </div>


                    

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
        s.getDetail();//详情
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

    addcontent(){
      var s = this;
      var policyid = s.props.params.id;    	
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,         
            title:s.state.title,            
            content:s.state.content,
            sort:s.state.sort,
            excerpt:s.state.excerpt,
        }
        if(policyid){//编辑        
            params.policyid = s.props.params.id;
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'xbadmin/editpolicyinfo/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
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
                    title:'',
                    excerpt:'',
                    content:'',
                    sort:0,
                  });
                  s.forceUpdate();
              }
            });         	
        }
    }
    //获取某一条详情
    getDetail(){
        var s=this;      
        $.ajax({
            url:window.baseUrl+'xbadmin/getpolicyinfodetail/',
            type:'post',
            data:{
				      userid:s.userid,
				      getusersigid:s.getusersigid,
				      policyid:s.props.params.id,
            },
            success(data){
                if(data.getret === 0){                   
                  s.setState({
                    visible:true,
                    title:data.detail.title,
                    updatetime:data.detail.updatetime,
                    content:data.detail.content,
                    sort:data.detail.sort,
                    excerpt:data.detail.excerpt,
                  })
                  s.forceUpdate();
                }
            }
        })
    }
    openform(){
      var s = this;
      s.setState({
        title:'',
        excerpt:'',
        content:'',
        sort:0,
      });
      s.forceUpdate();
    }
  
}

export default ZmitiValidateUser(ZmitiJinrongxbPolicyinfoApp);
