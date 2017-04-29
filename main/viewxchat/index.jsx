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

class ZmitiViewxChatApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            mainHeight:document.documentElement.clientHeight - 50,
            dataSource:[],
            wxopenid:'',
            keyword:'',
            startDate:null,
            endDate:moment(new Date(),'YYYY-MM-DD'),
		};
	}
	render() {

        

        
        var mainComponent=
        <div className="zmiti-vieweixin-main-ui" style={{height:this.state.mainHeight}}>
            <div className="padding-10">
                <Row className='zmiti-vieweixin-header'>
                    <Col span={8}  className='zmiti-vieweixin-header-inner' >用户信息</Col>
                    <Col span={8} offset={8} className='zmiti-vieweixin-button-right'><Button type='primary' onClick={this.goback.bind(this)}>返回列表</Button></Col>
                </Row>
                <div className="zmiti-vieweixin-line"></div>
                <div className="zmiti-viewxchat-detail">
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">昵称：</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">地理位置经度：</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">地理位置纬度：</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">类型：</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">总积分：</Col>
                        <Col span={20}></Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={4} className="zmiti-viewxchat-label">公众号appid：</Col>
                        <Col span={20}></Col>
                    </Row>
                </div>
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
		
		//*获取指定用户信息
        var wxopenid=this.props.params.id;
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixin/getwxuserinfo',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                wxopenid:wxopenid,
            },
            success(data){
                console.log(data,'getwxuserinfo');
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
    goback(){
        window.location="#/wxuserinfo/"
    }

}

export default ZmitiValidateUser(ZmitiViewxChatApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/