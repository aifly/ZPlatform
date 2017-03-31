import React, { Component } from 'react';

import './static/css/index.min.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table   } from '../commoncomponent/common.jsx';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';


import $ from 'jquery';

class ZmitiWorkOrderApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {

            mainHeight:document.documentElement.clientHeight - 50,
            dataSource:[],
			workorderid:'',
            keyword:'',
            startDate:null,
            endDate:moment(new Date(),'YYYY-MM-DD'),


		};
	}
	render() {

        const columns = [{
            title: '工单编号',
            dataIndex: 'workorderid',
            key: 'workorderid',
			width:200,

        }, {
            title: '问题内容',
            dataIndex: 'content',
            key: 'content',
        }, {
            title: '工单类型',
            dataIndex: 'workordertype',
            key: 'workordertype',
			width:100,
            filters:[{
                text:'财务类',
                value:'0',
            },{
                text:'会员帐号类',
                value:'1',
            },{
                text:'定制服务类',
                value:'2',
            }, {
                text: '产品技术类',
                value: '3',
            },{
                text:'其它类',
                value:'4',
            }
            ],
            onFilter:(value,record)=>value*1===record.workordertype,
            sorter:(a,b)=>a.workordertype-b.workordertype,
            render:(value,record)=>{
                switch(value){
                    case 0:
                        return "财务类";
                    case 1:
                        return "会员帐号类";
                    case 2:
                        return "定制服务类";
                    case 3:
                        return "产品技术类";
                    case 4:
                        return "其它类";
                }
            }
        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
			width:150,
        }, {
            title: '工单状态',
            dataIndex: 'status',
            key: 'status',
			width:100,
            filters:[{
                text:'已受理',
                value:'0',
            },{
                text:'已处理',
                value:'1',
            },{
                text:'已确认',
                value:'2',
            },{
                text:'已评价',
                value:'3',
            }
            ],
			onFilter:(value,record)=>value*1===record.status,
			sorter:(a,b)=>a.status-b.status,
			render:(value,record)=>{
            	switch(value){
					case 0:
						return <div className='red'>已受理</div>;
					case 1:
						return <div className='green'>已处理</div>;
					case 2:
						return "已确认";
					case 3:
						return "已评价";
				}
			}

        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:100,
			render:(text,recoder)=>(
                <span><span className="workorder-gotodetail"><a href="javascript:void(0);">查看</a></span><span className="workorder-del"><a href="javascript:void(0);"> 删除</a></span>
				</span>
			)

        }];

        var title = this.props.params.title || '服务支持中心';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount,
            tags:['我的工单','提交工单'],
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            rightType:"custom",
            customRightComponent:<div className="zmiti-workorder-main-ui padding-10">
				<Row className='zmiti-workorder-header'>
					<Col  className='zmiti-workorder-header-inner' >我的工单</Col>
				</Row>
				<div className="zmiti-workorder-line"></div>
				<Row gutter={10} type='flex' className='workorder-search '>
					<Col  className='zmiti-workorder-with100 workorder-heigth45'>工单编号：</Col>
					<Col  className={'workorder-heigth45'}><Input value={this.state.workorderid} onChange={this.searchByWorkorderid.bind(this)}  placeholder="工单编号录入" /></Col>
					<Col  className={'zmiti-workorder-with60 workorder-heigth45 rig'} >时间:</Col>
					<Col  className={'workorder-heigth45 zmiti-workorder-with130 '}><DatePicker value={this.state.startDate} onChange={(e)=>{this.setState({startDate:e})}} /></Col>
					<Col  className={'zmiti-workorder-with30 workorder-heigth45 cen'} value={this.state.endDate}>至:</Col>
					<Col  className={'workorder-heigth45 zmiti-workorder-with130 '}><DatePicker value={this.state.endDate} onChange={e=>{this.setState({endDate:e})}} /></Col>
					<Col  className={'zmiti-workorder-with60 workorder-heigth45 rig'}>关键词:</Col>
					<Col  className={'workorder-heigth45'}><Input value={this.state.keyword} placeholder="关键词" onChange={this.searchByKeyword.bind(this)}/></Col>
					<Col  className={'workorder-heigth45 lef'}><Button onClick={this.searchBybutton.bind(this)}>查询</Button></Col>
				</Row>
				<Table dataSource={this.state.dataSource} columns={columns} bordered/>

		</div>
        }
  
		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

    searchBybutton(){
        var workorderid = this.state.workorderid;
        var startDate=this.state.startDate;
        var endDate=this.state.endDate;
        var keyWord=this.state.keyword;
        var s = this;
        $.ajax({
            url:window.baseUrl+'user/get_workorder',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                workorderid,
                startDate,
                endDate,
                keyWord
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
                    loginOut(data.getmsg,window.loginUrl,false);
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

                return  item.workorderid.indexOf(this.state.workorderid)>-1;
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
                return  item.content.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
    }

	changeAccount(i){


	}

	componentDidMount() {

		var s = this;
		$.ajax({
			url:window.baseUrl+'user/get_workorder',
			data:{
				userid:s.userid,
                getusersigid:s.getusersigid
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
                    loginOut(data.getmsg,window.loginUrl,false);
                }
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

export default ZmitiValidateUser(ZmitiWorkOrderApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/