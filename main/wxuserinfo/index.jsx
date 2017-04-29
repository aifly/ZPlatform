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

class ZmitiWXUserInfoApp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mainHeight:document.documentElement.clientHeight - 50,
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
            title: '类型',
            dataIndex: 'usertype',
            key: 'usertype',
            width:100,
            filters:[{
                text:'0',
                value:'0',
            },{
                text:'1',
                value:'1',
            },{
                text:'2',
                value:'2',
            }
            ],
            onFilter:(value,record)=>value*1===record.usertype,
            sorter:(a,b)=>a.usertype-b.usertype,
            render:(value,record)=>{
                switch(value){
                    case 0:
                        return "0";
                    case 1:
                        return "1";
                    case 2:
                        return "2";
                }
            }
        }, {
            title: '总积分',
            dataIndex: 'totalintegral',
            key: 'totalintegral',
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
                <span><span className="workorder-del"><a href={'#/viewxchat/'+recoder.wxopenid}> 查看</a></span>
                </span>
            )

        }];

        
        var mainComponent=
        <div className="zmiti-viewxchat-main-ui" style={{height:this.state.mainHeight}}>
            <div className="padding-10">
                <Row className='zmiti-viewxchat-header'>
                    <Col span={8}  className='zmiti-viewxchat-header-inner' >微信用户列表</Col>
                    <Col span={8} offset={8} className='zmiti-viewxchat-button-right'></Col>
                </Row>
                <div className="zmiti-viewxchat-line"></div>
                <Row>
                    <Col span={12}><div className="zmiti-viewxchat-h2">{this.state.companyname}</div></Col>
                    <Col span={9}></Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <Row gutter={10} type='flex' className='viewxchat-search '>
                            <Col className={'viewxchat-heigth45 '} >时间:</Col>
                            <Col className={'viewxchat-heigth45 zmiti-workorder-with130 '}><DatePicker value={this.state.startDate} onChange={(e)=>{this.setState({startDate:e})}} /></Col>
                            <Col className={'zmiti-viewxchat-with30 viewxchat-heigth45 cen'} value={this.state.endDate}>至:</Col>
                            <Col className={'viewxchat-heigth45 zmiti-viewxchat-with130 '}><DatePicker value={this.state.endDate} onChange={e=>{this.setState({endDate:e})}} /></Col>
                            <Col className={'zmiti-viewxchat-with60 viewxchat-heigth45 rig'}>昵称:</Col>
                            <Col className={'viewxchat-heigth45'}><Input value={this.state.keyword} placeholder="昵称" onChange={this.searchByKeyword.bind(this)}/></Col>
                            <Col className={'viewxchat-heigth45 lef'}><Button onClick={this.searchBybutton.bind(this)}>查询</Button></Col>
                            <Col className={'viewxchat-heigth45'}></Col>
                        </Row>
                    </Col>
                    <Col span={4}><div className="zmiti-viewxchat-h3">用户数：<span className="red pd10-2">{this.state.personalNum}</span>个</div></Col>
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
                    s.state.dataSource = data.workorderinfo;
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
                return  item.nickname.indexOf(this.state.keyword)>-1;
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
            url:window.baseUrl+'weixin/get_wxuserlist',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){

                if(data.getret === 0){
                    console.log(data,"信息列表");
                    s.state.dataSource = data.userlist;
                    s.state.personalNum = data.userlist.length;
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
        
        let {username,userid,getusersigid} = validateUser(()=>{},this);
        this.userid = userid;
        this.getusersigid = getusersigid;

        
    }

}


export default ZmitiValidateUser(ZmitiWXUserInfoApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/