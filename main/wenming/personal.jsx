import './static/css/ranking.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';

const Search = Input.Search;
import MainUI from '../components/Main.jsx';
import IScroll from 'iscroll';

class ZmitiWenmingPersonalRankApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            appid:window.WENMING.XCXAPPID,
            dataSource:[],
            keyword:'',
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
        },{
            title: '头像',
            dataIndex: 'headerimgurl',
            key: 'headerimgurl',
            render:(text,record,index)=>{
                return <div className='wenming-ranking-imgs'><img src={text}/></div>
            }
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        }, {
            title: '评论数',
            dataIndex: 'commentCount',
            key: 'commentCount',
            onFilter:(value,record)=>value*1===record.commentCount,
            sorter:(a,b)=>a.commentCount-b.commentCount,
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
            mainRight:<div className='wenming-ranking-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-ranking-header">
                            <Row>
                                <Col span={16} className="wenming-ranking-header-inner">个人排行榜-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-ranking-button-right'>
                                    
                                </Col>
                            </Row>
                            <div className="clearfix"></div>
                        </div>
                        <div className='wenming-ranking-line'></div>
                        <div className='hr15'></div>                        
                        <Row>
                            <Col span={6} className='wenming-ranking-label'>搜索：</Col>
                            <Col span={18}>                                    
                                <Search
                                placeholder="输入昵称"
                                style={{ width: 200 }}
                                onSearch={function(value){                                   
                                    //console.log(value,'value');
                                    s.getpersonal(value);
                                    //s.forceUpdate();   
                                }}
                                />
                            </Col>
                        </Row>  
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
        s.state.dataSource=[];
        $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/usersort/',
            data:{
                appid:window.WENMING.XCXAPPID,
                monthnum:3,
                usernum:200,
                userid:s.userid,
                getusersigid:s.getusersigid
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){     
                data.list.map((item,i)=>{
                   s.state.dataSource.push({
                    commentCount:item.commentCount,
                    headerimgurl:item.headerimgurl,
                    nickname:item.nickname,
                    report:item.report,
                    key:i+1,
                   })
                })
                s.forceUpdate();
            }
        });
    }

    //search
    getpersonal(value){
        var s = this;
        s.state.dataSource=[];
        console.log(value);
        if(value==''){
            s.bindNewdata();
        }else{
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'weixinxcx/personcount/',
                data:{
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    appid:s.state.appid,
                    nickname:value
                },
                success(data){
                    if(data.getret === 0){
                        console.log(data,'personal');
                        //s.state.dataSource=data.list;
                        data.list.map((item,i)=>{
                            s.state.dataSource.push({
                                commentCount:item.commentCount,
                                headerimgurl:item.headerimgurl,
                                nickname:item.nickname,
                                report:item.report,
                                key:i+1,
                            })
                        })
                        s.forceUpdate();
                    }
                }
            })            
        }

    }


}

export default ZmitiValidateUser(ZmitiWenmingPersonalRankApp);
