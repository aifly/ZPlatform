import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin} from '../commoncomponent/common.jsx';
let Search = Input.Search;
let Option = Select.Option;
import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

 class ZmitiTrainingApp extends React.Component{
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

    }




    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);
        resizeMainHeight(this);
        const columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'xx',
            width:150,             
            render:(value,recorder,index)=>{
                return <div>{index+1}</div>
            }
        },{
            title: '昵称',
            dataIndex: 'realname',
            key: 'realname',
        },{
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width:200,
            render:function(text, record, index) {
                if(text==0){
                    return "男"
                }else if(text==1){
                    return "女"
                }                
            }

        },{
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width:200,

        },{
            title: '省份',
            dataIndex: 'province',
            key: 'province',
            width:200,

        },{
            title: '房间号',
            dataIndex: 'rooms',
            key: 'rooms',
            width:200,
        }]

       
        const monthFormat = 'YYYY/MM';
        var component = <Spin tip={this.state.tip} spinning={this.state.loading}><div className='training-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-training-header">
                        <Row>
                            <Col span={8} className="zmiti-training-header-inner">文明网培训班</Col>
                            <Col span={8} offset={8} className='zmiti-training-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-training-line"></div>
                    <div className="hr20"></div>
                    <Row>
                        <Col span={18}>
                            <Row>
                                <Col span={8} className="zmiti-training-inputext">
                                    <div>
                                        <Input placeholder="请输入名称或省份" onChange={this.searchtext.bind(this)} />
                                    </div>                                   
                                </Col>
                                <Col span={16}>
                                    <div className="zmiti-training-serachbtn">
                                        <Button icon="search" onClick={this.searchbtn.bind(this)}>查询</Button>
                                    </div>                                     
                                </Col>
                            </Row>
                        </Col>

                        <Col span={6} className="zmiti-training-count">
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
    //获取数据列表
    getuserlists(){
        var s=this;
        $.ajax({
            //url:window.baseUrl + 'weixin/get_userscorelist/',
            url:"training/training.json",
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.list);
                    s.state.dataSource=data.list;
                    s.state.loading=false;
                    s.forceUpdate();
                    console.log(this.url)    
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
    //text
    searchtext(e){
        var s = this;
        s.state.searchtext=e.target.value;
        this.forceUpdate();
    }
    //search 
    searchbtn(){
        var s=this;
        //console.log(s.state.searchtype+"..."+s.state.searchtext);
        
        if(s.state.searchtype*1===0){
            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.realname.indexOf(this.state.searchtext)>-1;
            });
            this.state.countNum=this.state.dataSource.length;            
            s.forceUpdate();
        }else{
            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.mobile.indexOf(this.state.searchtext)>-1;
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
  
}

export default ZmitiValidateUser(ZmitiTrainingApp);
