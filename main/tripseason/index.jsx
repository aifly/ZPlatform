import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Cascader,message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

import { Link } from 'react-router';

import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';
const RangePicker = DatePicker.RangePicker;
import $ from 'jquery';
function onChange(value) {
  console.log(value);
}
class ZmitiTripseasonApp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            setuserid:'',
            selectedIndex:1,
            mainHeight:document.documentElement.clientHeight-50,   
            productlist:[],         
            companyname:'',
            companyid:'',
            modpostDialogVisible:false,
            season:'',
            setseason:'',
            
            startDate:'',
            endDate:'',
            provinceId:'',
            citiesId:'',
            provinceData:[],
            cityData:[],
            cities: [],
            secondCity: [],
            proval:'',
            cityval:'',
            dataSource:[],
            inputValue: '',//省市
            
            defaultValue:[],//省市默认值
            disabled:false,

            provid:'',
            cityid:'',
            seasontype:'',
            daterange:'',
            startdate:'2017-01-01',
            endate:'2017-03-31',

            options:[],
            optiondata: [],
            
        };
        this.currentId = -1;
    }
    
    getProductDetail(record,index,e){
        var s=this;
        var defaultValue=new Array();
        defaultValue[0]=record.provid;
        defaultValue[1]=record.cityid;
        console.log(record);
        var daterange=record.daterange.split(',');
        var startdate=daterange[0];
        var endate=daterange[1];
        this.currentId = record.cityid;
        this.currentPid = record.provid;
        if(e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON'){
            return;//如果点击的是删除按钮，则不用弹出产品详情。
        }
        this.setState({
            modpostDialogVisible:true,
            provid:record.provid,
            cityid:record.cityid,
            seasontype:record.seasontype,
            daterange:record.daterange,
            createtime:record.createtime,
            disabled:true,
            defaultValue:defaultValue,
            startdate:startdate,
            endate:endate,
            selectValue:['zhejiang', 'taizhou'],
        })
        console.log(this.currentId,'currentId');

        this.forceUpdate();
    }
    
    render() {
        
       const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
        const columns = [{
            title: '省份',
            dataIndex: 'provname',
            key: 'provname'

        },{
            title: '城市',
            dataIndex: 'cityname',
            key: 'cityname'

        },{
            title: '日期类别',
            dataIndex: 'seasontype',
            key: 'seasontype',
            render:(value,record)=>{
                switch(value){
                    case 0:
                        return "旺季";
                    case 1:
                        return "淡季";
                }
            }

        },{
            title: '日期范围',
            dataIndex: 'daterange',
            key: 'daterange'

        },{
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime'

        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                                 
                    <Button  onClick={this.delData.bind(this,recoder.provid,recoder.cityid)}> 删除</Button>
                

            )

        }]
        
        var title = this.props.params.title || '出差宝';

        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['职务','淡旺季','交通费','差旅费'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 1,
            rightType: "custom",
            customRightComponent:<div className='tripseason-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-tripseason-header">
                        <Row>
                            <Col span={8} className="zmiti-tripseason-header-inner">淡旺季-{this.state.companyname}</Col>
                            <Col span={8} offset={8} className='zmiti-tripseason-button-right'><Button type='primary' onClick={this.seasonform.bind(this)}>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-tripseason-line"></div>
                    <Table bordered={true}
                                 onRowClick={(record,index,i)=>{this.getProductDetail(record,index,i)}}
                                 dataSource={this.state.dataSource} columns={columns} />
                </div>
                <Modal title="日期类别" visible={this.state.modpostDialogVisible}
                    onOk={this.addProduct.bind(this)}
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Form>
                      
                      <FormItem
                        {...formItemLayout}
                        label="选择城市"
                        hasFeedback
                      >                        
                        <Cascader disabled={this.state.disabled} value={this.state.defaultValue}   options={this.state.options} onChange={this.cityonChange.bind(this)} placeholder="选择城市" />
                    </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="类别"
                        hasFeedback
                      >
                          <Select placeholder="类别" onChange={(value)=>{this.state.seasontype=value;this.forceUpdate();}} value={this.state.seasontype}>
                            <Option value={0}>旺季</Option>
                            <Option value={1}>淡季</Option>
                          </Select>                   
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="开始日期"
                        hasFeedback
                      >
                        <RangePicker value={[moment(this.state.startdate), moment(this.state.endate)]} onChange={this.dateonChange.bind(this)} />
                      </FormItem>
                      

                    </Form>
                  </Modal>

                  
                  {this.state.showCredentialsDiolog && <ZmitiUploadDialog id="modifyaddpost" {...userProps}></ZmitiUploadDialog>}
                  
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
            window.location.hash='tripost/';            
        }else if(i*1===1){
            window.location.hash='tripseason/';
        }else if(i*1===2){
            window.location.hash='triptraffic/';
        }else if(i*1===3){
            window.location.hash='tripexpence/';
        }
    }

    

    componentDidMount() {
        var s=  this;
        s.bindNewdata();
        s.getCompanydetail();
        //s.getbaseData();
        s.getCascader();
    }

    componentWillMount() {
        let {resizeMainHeight,validateUser,loginOut,getProductList} = this.props;
        resizeMainHeight(this);         
        let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
        this.userid = userid;
        this.getusersigid = getusersigid;  
        this.getProductList = getProductList;     
    }

    bindNewdata(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_seasondatelist',//接口地址
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid                
            },
            success(data){

                if(data.getret === 0){
                    //console.log(data.list,"信息列表");
                    s.state.dataSource = data.list;
                    s.forceUpdate();
                }
            }
        })
    }
    //
    addProduct(){//添加
        var s = this;
        var params = {
            userid:this.userid,
            setuserid:this.userid,
            getusersigid:this.getusersigid,
            seasontype:this.state.seasontype,
            daterange:this.state.daterange,
            provid:this.state.inputValue[0],//this.state.provid,//
            cityid:this.state.inputValue[1],//this.state.cityid,//
        }

        if(this.currentId!==-1){//编辑        
            params.cityid = this.currentId;  
            params.provid = this.currentPid;
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'travel/edit_seasondate/',
                data:params,
                success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  console.log(params.provid,params.cityid);
                  
                }
            });
        }else{
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'travel/add_seasondate/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  console.log(params.provid,params.cityid);
              }
            }); 
        }
    }
    
    //获取公司信息
    getCompanydetail(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companydetail',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid
            },
            success(data){
                if(data.getret === 0){
                    s.setState({
                        companyname:data.detail_info.companyname,
                        companyid:data.detail_info.companyid
                    })
                }
            }
        })
    }

    //删除
    delData(provid,cityid){

        
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/del_seasondate/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                provid:provid,
                cityid:cityid
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');
                    
                    setTimeout(()=>{
                        s.bindNewdata();
                        console.log(this.url);
                        console.log(data,'data')
                    },2000)
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })
    }

    //Cascader
    getCascader(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var provinceOptions=[];
        $.ajax({
            url:window.baseUrl+'travel/get_citylist',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                    s.setState({
                        options:data.list[0].children,
                    })
                    s.forceUpdate();
                }
            }
        })
    }

    //选择省市
    cityonChange(value){
        var s=this;
        s.state.inputValue=value;
        s.state.defaultValue=value;
        s.forceUpdate();
    }
    //选择日期范围
    dateonChange(date, dateString){        
        var s=this;
        s.state.daterange=dateString[0]+","+dateString[1];
        s.state.startdate=dateString[0];
        s.state.endate=dateString[1];
        s.forceUpdate();
        console.log(s.state.daterange);
    }
    //弹出新增加时
    seasonform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
            disabled:false,
            defaultValue:[],
            provid:'',
            cityid:'',
            seasontype:'',
            daterange:'',
            startdate:'2017-01-01',
            endate:'2017-03-31',
        })
        console.log(this.currentId,'currentId');
    }


}

export default ZmitiValidateUser(ZmitiTripseasonApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/