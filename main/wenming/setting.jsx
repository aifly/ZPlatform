import './static/css/setting.css';
import React from 'react';
import {Switch,message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import IScroll from 'iscroll';

 class ZmitiWenmingSettingApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           appid:window.WENMING.XCXAPPID,
           modpostDialogVisible:false,
           datacheck:false,//数据审核
           messagecheck:true,//评论审核
           settinglist:[],
           classlist:[],
           classname:'',
           classename:'',
           parentclassid:'',
           gettype:'',
        }
        this.currentId = -1;
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
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);

        resizeMainHeight(this);
        this.bindtreedata();
        this.getsetting();       
    }

    render(){


        var title = '身边文明事';
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        };
        var props = {
            title,
            selectedIndex:4,
            mainRight:<div className='wenming-setting-main-ui' style={{height:this.state.mainHeight}}>
                        
                        <div className="wenming-setting-header">
                            <Row>
                                <Col span={16} className="wenming-setting-header-inner">通用设置-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-setting-button-right'>
                                    
                                </Col>
                            </Row>
                            <div className="clearfix"></div>                 
                        </div>
                        <div className="wenming-setting-line"></div>
                        <div className='hr10'></div>
                        <div className='wenming-setting-table'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width={120}><div className='wenming-setting-textright'>数据自动审核：</div></td>
                                        <td></td>
                                        <td>
                                            <div>
                                            <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.datacheck.bind(this)} checked={this.state.datacheck} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><div className='wenming-setting-textright'>评论自动审核：</div></td>
                                        <td></td>
                                        <td>
                                            <div>
                                            <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.messagecheck.bind(this)} checked={this.state.messagecheck} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><div className='wenming-setting-textright'>栏目设置：</div></td>
                                        <td></td>
                                        <td>
                                            <div className='wenming-setting-classlist'>                                                
                                                <ul>
                                                    {this.state.classlist.map((item,i)=>{
                                                        return <li>
                                                                <div className='wenming-setting-classname'>{item.classname}</div>
                                                                <div className='wenming-setting-classact'>
                                                                    <Button icon="edit" onClick={this.editype.bind(this,item.classid)}/>
                                                                    <Button icon="close" onClick={this.deletetype.bind(this,item.classid)} />
                                                                </div>
                                                            </li>
                                                    })}                                                   
                                                </ul>
                                                <div className='wenming-setting-classact'>
                                                    <Button onClick={this.postform.bind(this)}><Icon type="folder-add" />增加</Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Modal title="栏目设置" visible={this.state.modpostDialogVisible}
                            onOk={this.addtype.bind(this)}
                            onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                        >
                            <Form>
                              <FormItem
                                {...formItemLayout}
                                label="名称"
                                hasFeedback
                              >                        
                                  
                                  <Input placeholder="栏目名称" 
                                    value={this.state.classname}
                                    onChange={(e)=>{this.state.classname=e.target.value;this.forceUpdate();}}
                                  />                      
                              </FormItem>
                              <FormItem
                                {...formItemLayout}
                                label="英文名称"
                                hasFeedback
                              >                        
                                  
                                  <Input placeholder="栏目英文名称" 
                                    value={this.state.classename}
                                    onChange={(e)=>{this.state.classename=e.target.value;this.forceUpdate();}}
                                  />                      
                              </FormItem>
                              <FormItem
                                {...formItemLayout}
                                label="展示方式"
                                hasFeedback
                              >                        
                                  
                                <RadioGroup onChange={(e)=>{this.state.gettype=e.target.value;this.forceUpdate();}} value={this.state.gettype}>
                                    <Radio  style={radioStyle} value={0}>只首页调用</Radio>
                                    <Radio  style={radioStyle} value={1}>子页调用</Radio>
                                    <Radio  style={radioStyle} value={2}>首页与子页都可调用</Radio>
                                </RadioGroup>                     
                              </FormItem>
                            </Form>
                      </Modal>
                    </div>
                    
                    
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }
    
    //栏目
    bindtreedata(){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/search_articleclass',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.list,'mytree');
                    s.state.classlist=data.list;                    
                    s.forceUpdate();
                }
            }
        }) 
    }
    //栏目
    addtype(){
        var s = this;
        //
        var params={
            userid:s.userid,
            getusersigid:s.getusersigid,
            appid:s.state.appid,
            classname:s.state.classname,
            classename:s.state.classename,
            gettype:s.state.gettype,
            parentclassid:s.state.parentclassid,
        }
        
        if(this.currentId!==-1){//edit
            params.classid=this.currentId;
            $.ajax({
                url:window.baseUrl+'weixinxcx/edit_articleclass/',
                type:'POST',
                data:params,
                success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({
                        modpostDialogVisible:false,
                    })
                    s.bindtreedata();                
                    s.forceUpdate();            
                }
            })
        }else{
            //add
            $.ajax({
                url:window.baseUrl+'weixinxcx/add_articleclass/',
                type:'POST',
                data:params,
                success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({
                        modpostDialogVisible:false,
                    })
                    s.bindtreedata();                
                    s.forceUpdate();            
                }
            })
        }
    }
    //删除栏目
    deletetype(classid){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/del_articleclass/',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                classid:classid,
            },
            success(data){
                message[data.getret === 0 ? 'success':'error'](data.getmsg);
                s.bindtreedata();                
                s.forceUpdate();          
            }
        }) 
    }
    
    //edit
    editype(classid){
        var s=this;
        this.currentId=classid;
        this.state.classlist.map((item,i)=>{
            if(item.classid==classid){
                console.log(item.classname,'classname');
                s.setState({
                    classname:item.classname,
                    classename:item.classename,
                    parentclassid:item.parentclassid,
                    gettype:item.gettype,
                    modpostDialogVisible:true,
                })               
            }
            
        })
        s.forceUpdate();  
    }
    //dialog
    postform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
        })
        s.forceUpdate();
    }
    //获取配置
    getsetting(){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/get_xcxconfilist',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data,'setting');
                    s.state.settinglist=data.list; 
                    data.list.map((item,i)=>{

                        switch(item.configid){
                            case 'baffc85a':
                                if(item.switch==0){
                                    s.state.datacheck=false;
                                }else{
                                    s.state.datacheck=true;
                                    
                                    s.forceUpdate();
                                }
                            break;
                            case 'baffb7f4':
                                if(item.switch==0){
                                    s.state.messagecheck=false;
                                }else{
                                    s.state.messagecheck=true;
                                    
                                    s.forceUpdate();
                                }
                            break;

                        }
                    })                  
                    
                }          
                          
            }
        }) 
    }
    //数据审核
    datacheck(checked){ 
        var s = this;      
        //console.log(checked,'datacheck');
        var configid='baffc85a';
        var value='';
        if(checked==true){
            value=1;
        }else{
            value=0;
        }
        $.ajax({
            url:window.baseUrl+'weixinxcx/edit_xcxconfig/',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                configid:configid,
                switch:value,
            },
            success(data){
                message[data.getret === 0 ? 'success':'error'](data.getmsg);
                //console.log(value,checked,'value');
                s.state.datacheck=checked;
                s.getsetting();            
                s.forceUpdate();          
            }
        }) 
    }
    //评论审核
    messagecheck(checked){
        var s = this; 
        var configid='baffb7f4';
        console.log(checked,'messagecheck');
        var value='';
        if(checked==true){
            value=1;
        }else{
            value=0;
        }
        $.ajax({
            url:window.baseUrl+'weixinxcx/edit_xcxconfig/',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                configid:configid,
                switch:value,
            },
            success(data){
                message[data.getret === 0 ? 'success':'error'](data.getmsg);
                //console.log(value,checked,'value');
                s.state.messagecheck=checked;
                s.getsetting();            
                s.forceUpdate();          
            }
        }) 
    }
    //修改配置
    editsetting(){

    }

    



   

  
}

export default ZmitiValidateUser(ZmitiWenmingSettingApp);
