import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';


import $ from 'jquery';

class ZmitiWorkWxchatApp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mainHeight:document.documentElement.clientHeight - 50,
            phoneDataList:[],
            dataSource:[],
            wxopenid:'',
            keyword:'',
            startDate:null,
            endDate:moment(new Date(),'YYYY-MM-DD'),
            companyname:'麟腾传媒',
            personalNum:'0',
        };
    }
    render() {

        const columns = [{
            title: '头像',
            dataIndex: 'headimgurl',
            key: 'headimgurl',
            width:100,
            filterIcon:true,
            render:(value)=>{
                return <img src={value} />;
            }

        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            width:180,
            render:(value,record)=>{
                var getLength=value.length;
                if(getLength>=40)
                {
                    return value.substring(0,40);
                }
                else
                    return value;
            }

        }, {
            title: '姓名',
            dataIndex: 'realname',
            key: 'realname'
           

        }, {
            title: '职务',
            dataIndex: 'job',
            key: 'job',
            width:100

        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            width:100

        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width:100

        },{
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,
        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                <span><span className="workorder-del"><a href={'#/'}> 查看</a></span>
                </span>
            )

        }];

        
        var mainComponent=
        <div className="zmiti-workwxchat-main-ui" style={{height:this.state.mainHeight}}>
            <div className="padding-10">
                <Row className='zmiti-workwxchat-header'>
                    <Col span={8}  className='zmiti-workwxchat-header-inner' >微信用户列表</Col>
                    <Col span={8} offset={8} className='zmiti-workwxchat-button-right'></Col>
                </Row>
                <div className="zmiti-workwxchat-line"></div>
                <Row>
                    <Col span={12}><div className="zmiti-workwxchat-h2">{this.state.companyname}</div></Col>
                    <Col span={9}></Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <Row gutter={10} type='flex' className='workwxchat-search '>                            
                            <Col className={'zmiti-workwxchat-with60 workwxchat-heigth45 rig'}>姓名:</Col>
                            <Col className={'workwxchat-heigth45'}><Input value={this.state.keyword} placeholder="姓名" onChange={this.searchByKeyword.bind(this)}/></Col>
                            <Col className={'workwxchat-heigth45'}></Col>
                        </Row>
                    </Col>
                    <Col span={4}><div className="zmiti-workwxchat-h3">用户数：<span className="red pd10-2">{this.state.personalNum}</span>个</div></Col>
                </Row>              
                
                
                <Table dataSource={this.state.dataSource} columns={columns} bordered/>
            </div>
        </div>
  
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }

    searchBybutton(){
        var wxopenid = this.state.wxopenid;
        var startDate = this.state.startDate.format("YYYY-MM-DD");
        var endDate=this.state.endDate.format("YYYY-MM-DD");
        var keyWord=this.state.keyword;
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixin/get_wxuserlist',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                wxopenid:s.wxopenid,
                setstarttime:startDate,
                setendtime:endDate,
                setkeyword:keyWord,
            },
            success(data){
                if(data.getret === 0){                    
                    s.state.dataSource = data.userlist;
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);
                }
            }
        })

    }

    searchByWorkorderid(e){
        this.setState({
            workorderid:e.target.value
        },()=>{

            this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;

            this.state.dataSource = this.dataSource.filter((item)=>{

                return  item.wxopenid.indexOf(this.state.wxopenid)>-1;
            });
            this.forceUpdate();
        });

    }
    searchByKeyword(e){
        this.setState({
            keyword:e.target.value
        },()=>{
            this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;

            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.realname.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
    }
    delData(wxopenid){
        var s = this;
        $.ajax({
            url:window.baseUrl+'user/del_workorder/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                wxopenid:wxopenid,
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
    bindNewdata(){
        var s=this
        $.ajax({
            url:window.baseUrl+'weixin/get_workwxuserlist',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                worksid:s.props.params.id,
            },
            success(data){

                if(data.getret === 0){
                    //s.state.dataSource = data.userlist;
                    s.state.personalNum = data.userlist.length;
                    $.each(data.userlist,function(i,item){
                        if(item.phone!=""){                            
                            s.state.phoneDataList.push(item);
                        }
                    })
                    s.state.dataSource=s.state.phoneDataList;
                    //console.log(s.state.phoneDataList);
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data);

                }
            }
        })
    }
    componentDidMount() {

        var s = this;
        var worksid=this.props.params.id;
        s.bindNewdata();
        s.getcompanyinfo();
    }
    getcompanyinfo(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companydetail/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,               

            },
            success(data){
                s.state.companyname=data.detail_info.companyname;
                s.forceUpdate();
            }
        })
    }

    componentWillMount() {


        let {resizeMainHeight,validateUser,loginOut} = this.props;

        resizeMainHeight(this);
        
        let {username,userid,getusersigid,usertypesign} = validateUser(()=>{},this);
        this.userid = userid;
        this.getusersigid = getusersigid;
        if(usertypesign===window.Role.DEFAULTUSER){
            loginOut('您没有访问的权限',window.mainUrl,true);//不是hash跳转。location.href跳转
        }

        
    }

}


export default ZmitiValidateUser(ZmitiWorkWxchatApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/