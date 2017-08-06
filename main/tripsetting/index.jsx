import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiTripSettingApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:100,
			mainHeight:document.documentElement.clientHeight-50,
			companyname:'',
            companyid:'',
            title:'',
            versionCode:'',
            versionName:'',
            apkUrl:'',
		};

		
	}

	render() {
		var s =this;
		
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };

		var title = this.props.params.title || '出差宝';

		let props={
			userList:this.state.userList,
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['交通工具','差旅费','出差事由','注意事项','设置'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 4,
			rightType: "custom",
			customRightComponent:<div className='zmiti-tripsetting-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-setting-header">
						<Row>
							<Col span={8} className="zmiti-setting-header-inner">设置-{this.state.companyname}</Col>
							<Col span={8} offset={8} className='zmiti-setting-button-right'></Col>
						</Row>
					</div>
					<div className="zmiti-setting-line"></div>
					<div className='hr15'></div>
					<div className='zmiti-tripsetting-form'>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>公司编号：</div></Col>
                            <Col span={16}>
                                <Input 
                                    value={this.state.companyid}
                                    onChange={(e)=>{this.state.companyid=e.target.value;this.forceUpdate();}}
                                />
                            </Col>
                        </Row>
                        <div className='hr15'></div>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>应用名称：</div></Col>
                            <Col span={16}>
                                <Input 
                                    value={this.state.title}
                                    onChange={(e)=>{this.state.title=e.target.value;this.forceUpdate();}}
                                />
                            </Col>
                        </Row>
                        <div className='hr15'></div>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>应用code号：</div></Col>
                            <Col span={16}>
                                <Input 
                                    value={this.state.versionCode}
                                    onChange={(e)=>{this.state.versionCode=e.target.value;this.forceUpdate();}}
                                />
                            </Col>
                        </Row>
                        <div className='hr15'></div>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>应用版本号：</div></Col>
                            <Col span={16}>
                                <Input 
                                    value={this.state.versionName}
                                    onChange={(e)=>{this.state.versionName=e.target.value;this.forceUpdate();}}
                                />
                            </Col>
                        </Row>
                        <div className='hr15'></div>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'><div className='wenming-setting-textright'>安装包：</div></Col>
                            <Col span={16}>
                                <Input 
                                    value={this.state.apkUrl}
                                    onChange={(e)=>{this.state.apkUrl=e.target.value;this.forceUpdate();}}
                                />
                            </Col>
                        </Row>
                        <div className='hr15'></div>
                        <Row>
                            <Col span={8} className='wenming-setting-leftpane'></Col>
                            <Col span={16}>
                                 <Button type="primary" >提交</Button>
                            </Col>
                        </Row>

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

	changeAccount(i){
        if(i*1===0){
            window.location.hash='triptraffic/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='tripexpence/';
        }else if(i*1===2){
            window.location.hash='tripreason/';
        }else if(i*1===3){
            window.location.hash='tripnotice/';
        }else if(i*1===4){
            window.location.hash='tripsetting/';
        }
	}

	componentDidMount() {
		var s=  this;
		s.bindNewdata();
		s.getCompanydetail();
	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

	//显示列表
	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_joblist',//接口地址
            type:window.ajaxType || 'get',
            data:{
				setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid
            },
            success(data){

                if(data.getret === 0){
                    console.log(data,"信息列表");
                    s.state.dataSource = data.list;
                    s.forceUpdate();
                }
            }
        })
    }

    
    //获取公司信息
    getCompanydetail(){
    	var s=this;
    	$.ajax({
            type:window.ajaxType || 'get',
    		url:window.baseUrl+'user/get_companydetail',
    		data:{
    			userid:s.userid,
    			getusersigid:s.getusersigid
    		},
    		success(data){
    			if(data.getret === 0){
    				s.setState({
    					companyname:data.detail_info.companyname
    				})
    			}
    		}
    	})
    }
}

export default ZmitiValidateUser(ZmitiTripSettingApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/