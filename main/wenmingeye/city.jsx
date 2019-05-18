import './static/css/ranking.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';
import { WMURLS, title, baseUrl } from './url';

import MainUI from '../components/Main.jsx';

class ZmitiWenmingCityRankApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            appid:window.WENMING.XCXAPPID,
            dataSource:[],
            province:'',
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
        s.getprovince();
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
            title: '市',
            dataIndex: 'city',
            key: 'city',
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
                                <Col span={16} className="wenming-ranking-header-inner">{this.state.province}-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-ranking-button-right'>
                                    <Button icon="left" onClick={this.goback.bind(this)}>返回</Button>
                                </Col>
                            </Row>
                            <div className="clearfix"></div>
                        </div>
                        <div className='wenming-ranking-line'></div>
                        <div className="hr10"></div>
                        <div>
                            <Table dataSource={this.state.dataSource} columns={columns} />
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
        var provinceid=this.props.params.id;
        $.ajax({
            type:'post',
            url:baseUrl+WMURLS+'/citysort/',
            data:{                
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:window.WENMING.XCXAPPID,
                provincecode:provinceid,
                monthnum:3,
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){ 
                console.log(data.list);
                data.list.map((item,i)=>{
                   s.state.dataSource.push({
                    city:item.city,
                    pv:item.pv,
                    report:item.report,
                    key:i+1,
                   })
                })
                s.forceUpdate();
            }
        });
    }

    //获取省份
    getprovince(){
        var s = this;
        var provinceid=this.props.params.id;
        $.ajax({
            type:'post',
            url:baseUrl+WMURLS+'/provincesort/',
            data:{
                appid:window.WENMING.XCXAPPID,
                monthnum:3,
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
                   if(item.provincecode==provinceid){
                   	s.state.province=item.province;
                   }
                })
                s.forceUpdate();
            }
        });
    }
    //goback
    goback(){
    	window.location='#/wenming'
    }




}

export default ZmitiValidateUser(ZmitiWenmingCityRankApp);
