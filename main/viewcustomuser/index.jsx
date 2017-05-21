import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

 class ZmitiViewCustomUserApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            dataSource:[],
        }
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
       s.getuserlists();
    }




    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);
        resizeMainHeight(this);
        const columns = [{
            title: '微信号',
            dataIndex: 'wxuserid',
            key: 'wxuserid',
        },{
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width:120,

        },{
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width:200,

        }, {
            title: '时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,
        },  {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:150,
            render:(text,recoder,index)=>(

                <span>
                  <a href={'#/viewcustomuserbook/'+recoder.wxopenid}>查看</a>
                </span>              
            )

        }]

       
        const monthFormat = 'YYYY/MM';
        var component = <div className='viewcustomuser-main-ui' style={{height:this.state.mainHeight}}>
            <div className='pad-10'>
                <div className="zmiti-viewcustomuser-header">
                    <Row>
                        <Col span={8} className="zmiti-viewcustomuser-header-inner">用户列表</Col>
                        <Col span={8} offset={8} className='zmiti-viewcustomuser-button-right'></Col>
                    </Row>                      
                </div>
                <div className="zmiti-viewcustomuser-line"></div>
                <div className="hr20"></div>
                <Table bordered={true} 
                dataSource={this.state.dataSource} 
                columns={columns} />
            </div>
        </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }
    //获取用户列表
    getuserlists(){
        var s=this;
        var worksid=s.props.params.id;
        //console.log(worksid,'worksid');
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'book/get_userlist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                worksid:worksid,
            },
            success(data){
                if(data.getret === 0){
                    console.log(data.list);
                    s.state.dataSource=data.list;
                    s.forceUpdate();
                }
            }
        });
    }

  
}

export default ZmitiValidateUser(ZmitiViewCustomUserApp);
