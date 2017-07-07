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
            provinceData:[],
            provinceName:[],
            provinceText:'',
            modpostDialogVisible:false,
            username:'',
            sex:0,
            mobile:'',
            cityid:'',
            roomid:'',
        }
        this.currentId = -1;
    }


    render(){
        var s=this;
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
            dataIndex: 'username',
            key: 'username',
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
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
            dataIndex: 'cityid',
            key: 'cityid',
            width:160,
            render:function(text,record,index){
                var citynames="";
                s.state.provinceData.map(function(item,index){          
                    if(text===item.value){
                        citynames=item.label;
                    }
                })
                return citynames;             
            }

        },{
            title: '房间号',
            dataIndex: 'roomid',
            key: 'roomid',
            width:160,
        },{
            title: '操作',
            dataIndex: '',
            key: '',
            width:160,
            render:(text,recoder,index)=>(
                <span><Button onClick={this.editProduct.bind(this,recoder.classid)}>编辑</Button> <Button onClick={this.delData.bind(this,recoder.classid)}>删除</Button></span>              
            )
        }]

       
        const monthFormat = 'YYYY/MM';
        var component = <Spin tip={this.state.tip} spinning={this.state.loading}><div className='training-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-training-header">
                        <Row>
                            <Col span={8} className="zmiti-training-header-inner">文明网培训班</Col>
                            <Col span={8} offset={8} className='zmiti-training-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button><Button onClick={this.trainform.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-training-line"></div>
                    <div className="hr20"></div>
                    <Row>
                        <Col span={18} >
                            <Row>
                                <Col span={18} className="zmiti-training-inputext" style={{width:250}}>
                                    
                                    <Row>
                                        <Col span={14} style={{width:110}}>
                                            <Select style={{width:100}} placeholder="省份" onChange={(value)=>{this.state.provinceText=value;this.forceUpdate();}} value={this.state.provinceText}>
                                                <Option value="">--全部--</Option>
                                                {
                                                    this.state.provinceData.map(function(item,index){
                                                        return (
                                                            <Option value={item.value}>{item.label}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                        <Col span={10} style={{width:140}}>
                                            <Input style={{width:138}} placeholder="请输入名称" onChange={this.searchtext.bind(this)} />
                                        </Col>
                                    </Row>                                   
                                </Col>
                                <Col span={6}>
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
                    onOk={this.addProduct.bind(this)}
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback
                            >
                            <Input placeholder="姓名" 
                            value={this.state.username}
                            onChange={(e)=>{this.state.username=e.target.value;this.forceUpdate();}}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别"
                            hasFeedback
                            >
                            <Select placeholder="性别" onChange={(value)=>{this.state.sex=value;this.forceUpdate();}} value={this.state.sex}>
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
                            <Select placeholder="省份" onChange={(value)=>{this.state.cityid=value;this.forceUpdate();}} value={this.state.cityid}>
                            {
                                this.state.provinceData.map(function(item,index){
                                    return (
                                        <Option value={item.value}>{item.label}</Option>
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
                            value={this.state.roomid}
                            onChange={(e)=>{this.state.roomid=e.target.value;this.forceUpdate();}}
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
            url:window.baseUrl + 'wenming/get_wmclasslist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                s.state.loading=false;
                if(data.getret === 0){
                    s.state.dataSource=data.list;
                    s.state.countNum=data.list.length;                    
                    s.forceUpdate();
                    console.log(this.url)    
                }
            }
        });
    }
    //搜索
    searchtext(e){
        var s=this;
        this.setState({
            searchtext:e.target.value
        }/*,()=>{
            this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;

            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.realname.indexOf(this.state.searchtext)>-1;
            });
            this.state.countNum=this.state.dataSource.length;
            this.forceUpdate();
        }*/)
    }
    //search
    searchbtn(){
        var s=this;
        $.ajax({
            url:window.baseUrl + 'wenming/get_wmclasslist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                username:s.state.searchtext
            },
            success(data){
                if(data.getret === 0){
                    s.state.dataSource=data.list;
                    s.state.countNum=data.list.length;
                    s.state.loading=false;
                    s.forceUpdate();
                    console.log(this.url)    
                }
            }
        });
/*        this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;
        console.log(s.state.provinceText,s.state.searchtext);
        this.state.dataSource = this.dataSource.filter((item)=>{
            return item.username.indexOf(this.state.searchtext)>-1;
        });*/
        this.state.countNum=this.state.dataSource.length;
        this.forceUpdate();
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
                    s.state.provinceData=data.list[0].children;
                    s.forceUpdate();
                }
            }
        })
    }
    //对话框新增加时
    trainform(){
        var s=this;
        this.currentId=-1;        
        if(this.currentId!==-1){//编辑
            s.setState({
                modpostDialogVisible:true
            }); 
        }else{//添加
            s.setState({
                modpostDialogVisible:true,
                username:'',
                sex:0,
                mobile:'',
                cityid:'',
                roomid:'',
            });
        }
        s.forceUpdate();
    }
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,
            username:s.state.username,
            sex:s.state.sex,
            mobile:s.state.mobile,
            cityid:s.state.cityid,
            roomid:s.state.roomid,
        }
        if(this.currentId!==-1){//编辑
            params.classid = this.currentId;
            $.ajax({
              url:window.baseUrl + 'wenming/edit_wmclass/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
              }
            });
        }else{
            $.ajax({
              url:window.baseUrl + 'wenming/add_wmclass/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
              }
            });             
        }
    }
    editProduct(id){//编辑
        
        var s = this;
        this.currentId=id;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.each(this.state.dataSource,function(index,item){          
            if(item.classid===id){
                s.setState({
                    modpostDialogVisible:true,
                    username:item.username,
                    sex:item.sex,
                    mobile:item.mobile,
                    cityid:item.cityid,
                    roomid:item.roomid
                })                              
            }
        })
    }
    delData(classid){//删除
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,
            classid:classid,
        }
        $.ajax({
            url:window.baseUrl+'wenming/del_wmclass/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                classid:classid,
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');
                    setTimeout(()=>{
                        s.bindNewdata();
                    },2000)
                }
            }
        })
    }
  
}

export default ZmitiValidateUser(ZmitiTrainingApp);
