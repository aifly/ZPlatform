import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin} from '../commoncomponent/common.jsx';
let Search = Input.Search;
const FormItem = Form.Item;
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
            provinceName:[],
            modpostDialogVisible:false,
            realname:'',
            gender:0,
            mobile:'',
            province:'',
            rooms:'',
        }
        this.currentId = -1;
    }


    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);
        resizeMainHeight(this);
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
        const columns = [{
            title: '序号',
            dataIndex: 'key',
            width:80,
            key: 'xx',                         
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
            width:80,
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
            width:160,

        },{
            title: '房间号',
            dataIndex: 'rooms',
            key: 'rooms',
            width:160,
        },{
            title: '操作',
            dataIndex: '',
            key: '',
            width:160,
            render:(text,recoder,index)=>(
                <span><Button onClick={this.editProduct.bind(this,recoder.id)}>编辑</Button> <Button onClick={this.delData.bind(this,recoder.id)}>删除</Button></span>              
            )
        }]

       
        const monthFormat = 'YYYY/MM';
        var component = <Spin tip={this.state.tip} spinning={this.state.loading}><div className='training-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-training-header">
                        <Row>
                            <Col span={8} className="zmiti-training-header-inner">文明网培训班</Col>
                            <Col span={8} offset={8} className='zmiti-training-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button><Button onClick={this.addProduct.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-training-line"></div>
                    <div className="hr20"></div>
                    <Row>
                        <Col span={18}>
                            <Row>
                                <Col span={8} className="zmiti-training-inputext">
                                    <div>
                                        <Input placeholder="请输入名称" onChange={this.searchtext.bind(this)} />
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
                <Modal title="培训班" visible={this.state.modpostDialogVisible}
                    onOk={this.trainform.bind(this)}
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback
                            >
                            <Input placeholder="姓名" 
                            value={this.state.realname}
                            onChange={(e)=>{this.state.realname=e.target.value;this.forceUpdate();}}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别"
                            hasFeedback
                            >
                            <Select placeholder="性别" onChange={(value)=>{this.state.gender=value;this.forceUpdate();}} value={this.state.gender}>
                                <Option value={0}>男</Option>
                                <Option value={1}>女</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="手机号"
                            hasFeedback
                            >
                            <Input placeholder="手机号" 
                            value={this.state.mobile}
                            onChange={(e)=>{this.state.mobile=e.target.value;this.forceUpdate();}}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="省份"
                            hasFeedback
                            >
                            <Select placeholder="省份" onChange={(value)=>{this.state.province=value;this.forceUpdate();}} value={this.state.province}>
                            {
                                this.state.provinceName.map(function(item,index){
                                    return (
                                        <Option value={item}>{item}</Option>
                                    )
                                })
                            }
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="房间号"
                            hasFeedback
                            >
                            <Input placeholder="房间号" 
                            value={this.state.rooms}
                            onChange={(e)=>{this.state.rooms=e.target.value;this.forceUpdate();}}
                            />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </Spin>
        return(
            <MainUI component={component}></MainUI>
        )
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
       s.bindNewdata();
       s.getCascader();
       s.loadData();
    }

    //获取数据列表
    bindNewdata(){
        var s=this;
        $.ajax({
            //url:window.baseUrl + 'weixin/get_userscorelist/',
            url:"training/static/js/training.json",
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data.list);
                    s.state.dataSource=data.list;
                    s.state.countNum=data.list.length;
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
    //省份
    getCascader(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var provinceOptions=[];
        $.ajax({
            url:window.baseUrl+'travel/get_citylist',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){                    
                    var provinceData=data.list[0].children;                    
                    $.each(provinceData,function(index,item){
                        s.state.provinceName.push(item.label);
                    })
                    s.forceUpdate();
                }
            }
        })
    }
    //对话框新增加时
    trainform(){
        var s=this;
        if(this.currentId!==-1){//编辑
            s.setState({
                modpostDialogVisible:false
            });
            s.bindNewdata();
        }else{//添加
            s.setState({
                modpostDialogVisible:false
            });
            s.bindNewdata();
        }
    }
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
            realname:'',
            gender:0,
            mobile:'',
            province:'',
            rooms:'',
        })
        console.log(this.currentId,'currentId');
    }
    editProduct(id){//编辑
        
        var s = this;
        this.currentId=id;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.each(this.state.dataSource,function(index,item){          
            if(item.id===id){
                s.setState({
                    modpostDialogVisible:true,
                    realname:item.realname,
                    gender:item.gender,
                    mobile:item.mobile,
                    province:item.province,
                    rooms:item.rooms
                })                              
                //console.log(item.realname,s.state.realname);
            }
        })
        console.log(this.currentId,'currentId');
    }
    delData(id){//删除
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,
            id:id,
        }
        console.log(id,'params-del');
    }
  
}

export default ZmitiValidateUser(ZmitiTrainingApp);
