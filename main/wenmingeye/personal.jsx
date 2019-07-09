import './static/css/ranking.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';
import { WMURLS, title, baseUrl, WMEYEAPPID } from './url';

const Search = Input.Search;
import MainUI from '../components/Main.jsx';
import IScroll from 'iscroll';

class ZmitiWenmingPersonalRankApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            appid:WMEYEAPPID,
            dataSource:[],
            keyword:'',
            filterDropdownComment: false,
            filterDropdownReport: false,
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
        var s=this;
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
            filterDropdown:(<div></div>),
            filterIcon: <Icon type="caret-down" />,
            filterDropdownVisible: this.state.filterDropdownComment,
            onFilterDropdownVisibleChange: (visible) => {
                if(visible==true){
                    console.log(visible,'filterDropdownComment');
                    s.bindNewdata('userCommentSort');

                    
                }            
            },
        }, {
            title: '上报数',
            dataIndex: 'report',
            key: 'report',
            filterDropdown:(<div></div>),
            filterIcon: <Icon type="caret-down" />,
            filterDropdownVisible: this.state.filterDropdownReport,
            onFilterDropdownVisibleChange: (visible) => {
                if(visible==true){
                    console.log(visible,'filterDropdownReport');
                    s.bindNewdata('userReportSort');
                    
                }            
            },
        }];

        var s =this; 


        var props = {
            userid:s.userid,
            getusersigid: s.getusersigid,
            title,
            mainRight:<div className='wenming-ranking-main-ui' style={{height:this.state.mainHeight}}>
                         <div className='wenming-ranking-pos'>
                            <div className="wenming-ranking-header">
                                <Row>
								<Col span={16} className="wenming-ranking-header-inner">个人排行榜-{title}
                                        
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
                        </div>
                        <div className='wenming-ranking-sortlist'>
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

    bindNewdata(type){
        var s = this;
        s.state.dataSource=[];
        $.ajax({
            type:'post',
            url:baseUrl + WMURLS +'/usersort/',
            data:{
                appid:WMEYEAPPID,
                monthnum:3,
                usernum:200,
                userid:s.userid,
                getusersigid:s.getusersigid
            }
        }).done((data)=>{
            console.log(data)
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){      
                switch (type) {
                    case "userCommentSort":
                        data.list.map((item,i)=>{
                           s.state.dataSource.push({
                            commentCount:item.commentCount,
                            headerimgurl:item.headerimgurl,
                            nickname:item.nickname,
                            report:item.report,
                            key:i+1,
                           })
                        })
                        
                    break;
                    case "userReportSort":
                        data.list1.map((item,i)=>{
                           s.state.dataSource.push({
                            commentCount:item.commentCount,
                            headerimgurl:item.headerimgurl,
                            nickname:item.nickname,
                            report:item.report,
                            key:i+1,
                           })
                        })
                        
                    break;
                    default:
                        data.list.map((item,i)=>{
                           s.state.dataSource.push({
                            commentCount:item.commentCount,
                            headerimgurl:item.headerimgurl,
                            nickname:item.nickname,
                            report:item.report,
                            key:i+1,
                           })
                        })
                        
                }
                s.forceUpdate();
            }
        });
    }

    //search
    getpersonal(value){
        var s = this;
        s.state.dataSource=[];
        //console.log(value);
        if(value==''){
            s.bindNewdata();
        }else{
            $.ajax({
                type:'POST',
                url:baseUrl +  WMURLS + '/personcount/',
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
