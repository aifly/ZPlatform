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

class ZmitiJinrongxbNoticeApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            loading:false,
            tip:'数据拉取中...',
            keyword:'',
            visible:false,
            noticeid:'nilb248P',//文章id
            title:'',
            createtime:'',//创建时间
            updatetime:'',//更新时间
            content:'',
            sort:0,//排序
            istop:0,//是否置顶
            textlength:48,
            dataSource:[],          
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
          title: '内容',
          dataIndex: 'content',
          key: 'content',
        }, {
          title: '时间',
          dataIndex: 'updatetime',
          key: 'updatetime',
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
        let lineHeight={
            lineHeight:'30px',
        }
        let fontcolor={
            color:'red',
        }
        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['消保地址','政策管理','公告管理','设置'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 2,
            rightType: "custom",
            customRightComponent:<div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">公告管理</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <div>&nbsp;</div>
                    <div>
                        <textarea className="ant-input ant-input-lg" value={this.state.content}
                            onChange={this.writenotice.bind(this)}
                        ></textarea>                           
                        <p style={lineHeight}>提示：剩余字数<span style={fontcolor}>{this.state.textlength}</span>个</p>
                        <div><Button type="primary" onClick={this.addcontent.bind(this)}>提交</Button></div>
                    </div>
                    
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
        s.getDetail();//内容
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
    writenotice(e){
        var s = this;
        s.state.content=e.target.value;
        s.state.textlength=48-s.state.content.length;
        if(s.state.content.length>48){
            s.state.textlength=0;
        }
        s.forceUpdate();
    }
    addcontent(){
        var s = this;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,         
            title:s.state.title,            
            content:s.state.content,
            sort:s.state.sort,
            noticeid:s.state.noticeid,
        }
        if(s.state.content.length<49){
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'xbadmin/editnotice/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.getDetail();
                  s.forceUpdate();
              }
            }); 
        }else{
           message.error("内容超出字数限制！"); 
        }


    }
    //获取某一条详情
    getDetail(){
        var s=this;      
        $.ajax({
            url:window.baseUrl+'xbadmin/getnoticedetail/',
            type:'post',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                noticeid:s.state.noticeid,
            },
            success(data){
                if(data.getret === 0){       
                    
                    s.state.content=data.detail.content;
                    s.state.textlength=48-data.detail.content.length;
                    s.forceUpdate();
                }
            }
        })
        //console.log(this.currentId,'this.currentId');
    }
  
}

export default ZmitiValidateUser(ZmitiJinrongxbNoticeApp);
