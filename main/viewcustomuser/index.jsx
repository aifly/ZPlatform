import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin} from '../commoncomponent/common.jsx';
let Search = Input.Search;
let Option = Select.Option;
import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

 class ZmitiViewCustomUserApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            loading:false,
            tip:'数据拉取中...',
            searchtype:0,
            searchtext:'',
            dataSource:[],
            alldataSource:[],
            countNum:0,
            setuserid:'',
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
       s.loadData();
       s.getuserid();
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
            width:80,
            render:(text,recoder,index)=>(
                <span>
                  <a href={'#/viewcustomuserbook/'+recoder.wxuserid+'/'+recoder.wxopenid}>查看</a>
                </span>              
            )
        }]

       
        const monthFormat = 'YYYY/MM';
        var component = <Spin tip={this.state.tip} spinning={this.state.loading}><div className='viewcustomuser-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-viewcustomuser-header">
                        <Row>
                            <Col span={8} className="zmiti-viewcustomuser-header-inner">{this.props.params.title}-访客列表</Col>
                            <Col span={8} offset={8} className='zmiti-viewcustomuser-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-viewcustomuser-line"></div>
                    <div className="hr20"></div>
                    <Row>
                        <Col span={18}>
                            <Row>
                                <Col span={12} className="zmiti-viewcustomuser-select">
                                    <Select placeholder='微信号' onChange={this.searchtype.bind(this)}  style={{width:120}} defaultValue="0">
                                     <Option value="0">微信号</Option>
                                     <Option value="1">手机号</Option>
                                     <Option value="2">邮箱</Option>
                                    </Select>
                                </Col>
                                <Col span={12} className="zmiti-viewcustomuser-search">
                                    <Search
                                        placeholder=""
                                        style={{ width: 200 }}
                                        size="default"
                                        onSearch={this.searchbtn.bind(this)}
                                      />    
                                </Col>
                            </Row>
                        </Col>

                        <Col span={6} className="zmiti-viewcustomuser-count">
                            总计：<span>{this.state.countNum}</span>条
                        </Col>
                    </Row>
                    <div className="hr20"></div> 
                    <Table bordered={true} 
                    dataSource={this.state.dataSource} 
                    columns={columns} />
                </div>
            </div>
        </Spin>
        return(
            <MainUI component={component}></MainUI>
        )
    }
    //获取訪客列表
    getuserlists(){
        var s=this;
        var worksid=s.props.params.id;
        //console.log(worksid,'worksid');
        $.ajax({
            url:window.baseUrl + 'book/get_userlist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                worksid:worksid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.list);
                    s.state.dataSource=data.list;
                    s.state.alldataSource=data.list;
                    s.state.loading=false;
                    s.state.countNum=s.state.dataSource.length;
                    //console.log(this.url,'this.url')
                    s.forceUpdate();
                    s.dataSource = s.state.dataSource.concat([]) ;     
                }
            }
        });
    }
    //select
    searchtype(value){
        var s=this;
        s.state.searchtype=value;
        
        //s.getuserlists();
        console.log(s.state.searchtype);
    }
    //search 
    searchbtn(value){
        var s=this;
        s.state.searchtext=value;

        //console.log(s.state.searchtype+"..."+s.state.searchtext);
        
        if(s.state.searchtype*1===0){
            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.wxuserid.indexOf(this.state.searchtext)>-1;
            });
            this.state.countNum=this.state.dataSource.length;
            s.forceUpdate();
        }else if(s.state.searchtype*1===1){
            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.phone.indexOf(this.state.searchtext)>-1;
            });
            this.state.countNum=this.state.dataSource.length;
            s.forceUpdate(); 
        }else{
            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.email.indexOf(this.state.searchtext)>-1;
            });
            this.state.countNum=this.state.dataSource.length;
            s.forceUpdate(); 
        }

    }
    //loading
    loadData(){   
        var s = this;
        this.state.loading = true;
        this.forceUpdate();
    }
    //返回
    goback(){
        window.location='#/custom/'
    }
    //userid
    getuserid(){
        var s=this;
        var customid=s.props.params.id;
        $.ajax({
            url:window.baseUrl+'custom/get_custom_list/',
            type:"get",
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid
            },
            success(data){
                
                if(data.getret === 0){
                    //console.log(data.customlist,'data.customlist');
                    $.each(data.customlist,function(i,item){
                        if(customid==item.customid){                            
                            s.state.setuserid=item.userid;
                            //console.log(s.state.setuserid,'s.state.setuserid');
                        }
                    })
                }
            }
        })             
    }

}

export default ZmitiValidateUser(ZmitiViewCustomUserApp);
