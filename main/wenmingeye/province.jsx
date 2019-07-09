import './static/css/ranking.css';
import React from 'react';
import { Link } from 'react-router';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio,DatePicker} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import { WMEYEAPPID } from './url';
const { MonthPicker, RangePicker } = DatePicker;
class ZmitiWenmingProvinceRankApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            appid:WMEYEAPPID,
            dataSource:[],
            startValue: null,
			endValue: null,
		    size:'small',
        } 
        
    }

    componentWillMount() {

        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send,copyfileto} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

        this.copyfileto=copyfileto;
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
        var s = this;
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);
        s.bindNewdata();
    }

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '序号',
            dataIndex: 'i',
            key: 'i',
            render:(text,record,index)=>{
                return record.key
            }
        }, {
            title: '省份',
            dataIndex: 'province',
            key: 'province',
            render:(text,record,index)=>{
                return <div><Link to={'/wenmingcity/'+record.provincecode}>{text}</Link>
                </div>
            }
        }, {
            title: '浏览量',
            dataIndex: 'pv',
            key: 'pv',
            onFilter:(value,record)=>value*1===record.pv,
            sorter:(a,b)=>a.pv-b.pv,
        }, {
            title: '上报数',
            dataIndex: 'report',
            key: 'report',
            onFilter:(value,record)=>value*1===record.report,
            sorter:(a,b)=>a.report-b.report,
        }];

        var s =this;
        var title = '身边文明事';


        var props = {
            userid:s.userid,
            getusersigid: s.getusersigid,
            title,
            mainRight:<div className='wenming-ranking-main-ui'>
            			<div className="hr10"></div>
                        <div className="wenming-ranking-header">
                            <Row>
                                <Col span={16} className="wenming-ranking-header-inner">省份排行榜-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-ranking-button-right'>
                                	<Button className='wenming-ranking-alldate' onClick={this.viewall.bind(this)} size={this.state.size}>全部</Button>
                                	<div className='wenming-ranking-rangepicker'>
                                		<RangePicker onChange={this.dateRangePicker.bind(this)} size={this.state.size} />
                                	</div>
                                	<div className="clearfix"></div>
                                </Col>
                            </Row>
                            <div className="clearfix"></div>
                        </div>
                        <div className='wenming-ranking-line'></div>
                        <div className="hr10"></div>
                        <div>
                            <Table dataSource={this.state.dataSource} columns={columns} pagination={{
                            	defaultPageSize:40
                            }} />
                        </div>
                        
                        

            </div>
        }
        var mainComponent = <div>
           
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }



    bindNewdata(){
        var s = this;
        s.state.dataSource=[];
        $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/provincesort/',
            data:{
                appid:WMEYEAPPID,
                monthnum:12,
                userid:s.userid,
                getusersigid:s.getusersigid
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){ 
                //console.log(data.list);
                data.list.map((item,i)=>{
                   s.state.dataSource.push({
                    province:item.province,
                    pv:item.pv,
                    report:item.report,
                    provincecode:item.provincecode,
                    key:i+1,
                   })
                })
                s.forceUpdate();
            }
        });
    }
    viewall(){
    	window.location.reload();
    }
    dateRangePicker(date, dateString){
    	var s = this;
    	s.state.startValue=dateString[0];
    	s.state.endValue=dateString[1];
    	s.state.dataSource=[];
    	//console.log(s.state.startValue,s.state.endValue);
    	$.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/month_daysort/',
            data:{
                appid:WMEYEAPPID,
                userid:s.userid,
                getusersigid:s.getusersigid,
                starttime:s.state.startValue,
                endtime:s.state.endValue,
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){ 
                console.log(data.list);
                //s.state.dataSource=data.list;
                data.list.map((item,i)=>{
                   s.state.dataSource.push({
                    province:item.province,
                    pv:item.pv,
                    report:item.report,
                    provincecode:item.provincecode,
                    key:i+1,
                   })
                })
                s.forceUpdate();
            }
        });
    }




}

export default ZmitiValidateUser(ZmitiWenmingProvinceRankApp);
