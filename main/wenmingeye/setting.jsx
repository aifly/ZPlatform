import './static/css/setting.css';
import React from 'react';
import {Popconfirm,Switch,message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { WMURLS, title, baseUrl } from './url';

 class ZmitiWenmingSettingApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           appid:window.WENMING.XCXAPPID,
           modpostDialogVisible:false,
           datacheck:false,//数据审核
           messagecheck:false,//评论审核
           noticecheck:false,
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
            selectedIndex:3,
            mainRight:<div className='wenming-setting-main-ui' style={{height:this.state.mainHeight}}>
                        
                        <div className="wenming-setting-header">
                            <Row>
							<Col span={16} className="wenming-setting-header-inner">通用设置-{title}
                                    
                                </Col>
                                <Col span={8} className='wenming-setting-button-right'>
                                    
                                </Col>
                            </Row>
                            <div className="clearfix"></div>                 
                        </div>
                        <div className="wenming-setting-line"></div>
                        <div className='hr10'></div>
                        <div className='wenming-setting-table'>
                            <Row>
                                <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>数据自动审核：</div></Col>
                                <Col span={16}>
                                    <div>
                                    <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.datacheck.bind(this)} checked={this.state.datacheck} />
                                    </div>
                                </Col>
                            </Row>
                            <div className='hr15'></div>
                            <Row>
                                <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>评论自动审核：</div></Col>
                                <Col span={16}>
                                    <div>
                                    <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.messagecheck.bind(this)} checked={this.state.messagecheck} />
                                    </div>
                                </Col>
                            </Row>
                            <div className='hr15'></div>
                            <Row>
                                <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>文明播报：</div></Col>
                                <Col span={16}>
                                    <div>
                                    <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.noticecheck.bind(this)} checked={this.state.noticecheck} />
                                    </div>
                                </Col>
                            </Row>
                            <div className='hr15'></div>
                            <Row>
                                <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>栏目设置：</div></Col>
                                <Col span={16}>
                                    <div className='wenming-setting-classlist'>                                                
                                        <ul>
                                            {this.state.classlist.map((item,i)=>{
                                                if(item.classname!=='文明播报'){
                                                    return <li key={i}>
                                                        <div className='wenming-setting-classname'>{item.classname}</div>
                                                        <div className='wenming-setting-classact'>
                                                            <Button icon="edit" onClick={this.editype.bind(this,item.classid)}/>
                                                            <Popconfirm title="如果确定删除的话，同步会把当前栏目的所有数据删除" onConfirm={this.delConfirm.bind(this,item.classid)} okText="确定" cancelText="取消">
                                                                <Button icon="close"/>
                                                            </Popconfirm>
                                                        </div>
                                                    </li>
                                                }    
                                            })}                                                   
                                        </ul>

                                        <div className='wenming-setting-classact'>
                                            <Button onClick={this.postform.bind(this)}><Icon type="folder-add" />增加</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            
                        </div>
                        <Modal title="栏目设置" visible={this.state.modpostDialogVisible}
                            onOk={this.addtype.bind(this)}
                            onCancel={this.closedialog.bind(this)}
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
            url:baseUrl+WMURLS+'/search_articleclass',
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
                url:baseUrl+WMURLS+'/edit_articleclass/',
                type:'POST',
                data:params,
                success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({
                        modpostDialogVisible:false,
                        classname:'',
                        classename:'',
                        gettype:'',
                        parentclassid:'',
                    })
                    s.bindtreedata();                
                    s.forceUpdate();            
                }
            })
        }else{
            //add
            $.ajax({
                url:baseUrl+WMURLS+'/add_articleclass/',
                type:'POST',
                data:params,
                success(data){
                    message[data.getret === 0 ? 'success':'error'](data.getmsg);
                    s.setState({
                        modpostDialogVisible:false,
                        classname:'',
                        classename:'',
                        gettype:'',
                        parentclassid:'',
                    })
                    s.bindtreedata();                
                    s.forceUpdate();            
                }
            })
        }
    }
    //关闭dialog
    closedialog(){
        var s =this;
        s.setState({
            modpostDialogVisible:false,
            classname:'',
            classename:'',
            gettype:'',
            parentclassid:'',
        })
        s.forceUpdate(); 
    }
    //确认删除
    delConfirm(classid){
        var s = this;
        $.ajax({
            url:baseUrl+WMURLS+'/del_articleclass/',
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
    //删除栏目
    deletetype(classid){
        var s = this;
        $.ajax({
            url:baseUrl+WMURLS+'/del_articleclass/',
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
            url:baseUrl+WMURLS+'/get_xcxconfilist',
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
                            case 'sae4c56a':
                                if(item.switch==0){
                                    s.state.noticecheck=false;
                                }else{
                                    s.state.noticecheck=true;
                                    
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
            url:baseUrl+WMURLS+'/edit_xcxconfig/',
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
            url:baseUrl+WMURLS+'/edit_xcxconfig/',
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
    //文明播报
    noticecheck(checked){
        var s = this; 
        var configid='sae4c56a';
        console.log(checked,'noticecheck');
        var value='';
        if(checked==true){
            value=1;
        }else{
            value=0;
        }
        $.ajax({
            url:baseUrl+WMURLS+'/edit_xcxconfig/',
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
                s.state.noticecheck=checked;
                s.getsetting();            
                s.forceUpdate();          
            }
        }) 
    }
  
}

export default ZmitiValidateUser(ZmitiWenmingSettingApp);
