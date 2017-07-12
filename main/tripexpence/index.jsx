import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Cascader, message,Select,Modal,Form , Input,Button, Row,Checkbox, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
const FormItem = Form.Item;
const Option = Select.Option;
import $ from 'jquery';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import ZmitiScript from '../components/zmiti-script.jsx';

import '../static/echarts/china';

class ZmitiTripexpenceApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:1,
			mainHeight:document.documentElement.clientHeight-50,
			mainHeight:document.documentElement.clientHeight-50,
			modpostDialogVisible:false,
			modpostEditDialogVisible:false,
			companyid:'',
			companyname:'',
			dataSource:[],
			transportid:'',
			jobid:'',
			transport:[],
			tripost:[],
			provid:'30',//省份id
			cityid:'377',//城市id
			jobid:'',//职务id
			hotelprice1:'',//住宿费
			hotelprice2:'',//旺季住宿费
			foodprice:'',//伙食费
			othertraficprice:'',//其它交通补助费
			otherprice:'',//其它补助费
			expenseid:'',
			
            inputValue: '',//省市
            defaultValue:[],//编辑时省市默认值
            options:[],
            cityList:[],
            disabled:false,
            currentCityIndex:1,
            currentCityId:-1,
            transX:0,
            transY:0,
            showTable:true,
            currentProv:'云南'
		};
        this.viewW = document.documentElement.clientWidth;
		this.currentId = -1;
	}
    getProductDetail(record,index,e){
        var s=this;
        var defaultValue=new Array();
        defaultValue[0]=record.provid;
        defaultValue[1]=record.cityid;

        this.currentId = record.expenseid;
        if(e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON'){
            return;//如果点击的是删除按钮，则不用弹出产品详情。
        }
        this.setState({
            modpostDialogVisible:true,
            expenseid:record.expenseid,
            provid:record.provid,
            cityid:record.cityid,
            jobid:record.jobid,
            hotelprice1:record.hotelprice1,
            hotelprice2:record.hotelprice2,
            foodprice:record.foodprice,
            othertraficprice:record.othertraficprice,
            otherprice:record.otherprice,
            disabled:true,
            defaultValue:defaultValue,
        })
        //console.log(s.state.provid,s.state.cityid,'defaultValue');

        this.forceUpdate();
    }
	render() {
		

       
		var title = this.props.params.title || '出差宝';
        
        const columns = [{
            title: '市',
            dataIndex: 'cityname',
            key: 'cityname',
            render: (value, row, index) => {
                const obj = {
                  children: value,
                  props: {},
                };
                console.log(row,value);
                if (index === 0) {
                   obj.props.rowSpan = 2;
                }
                if (index === 1) {
                   obj.props.rowSpan = 0;
                }
                return obj;
              }

        },{
            title: '职务',
            dataIndex: 'jobname',
            key: 'jobname',
           

        },{
            title: '淡季住宿标准',
            dataIndex: 'hotelprice1',
            key: 'hotelprice1'

        },  {
            title: '旺季住宿标准',
            dataIndex: 'hotelprice2',
            key: 'hotelprice2'
        },  {
            title: '伙食费',
            dataIndex: 'foodprice',
            key: 'foodprice'
        },  {
            title: '交通补助',
            dataIndex: 'othertraficprice',
            key: 'othertraficprice'
        }]

		let props={
			userList:this.state.userList,
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['交通工具','差旅费','出差事由','注意事项'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 1,
			rightType: "custom",
			customRightComponent:<div  className=' tripexpence-main-ui' style={{height:this.state.mainHeight}}>
                <section className={'tripexpence-map '+(this.state.showTable?'left':'')}>
                  
                    <div className="tripexpence-line"></div>
              
                    <div ref='tripexpence-main-ui' style={{width:'100%',height:this.state.mainHeight}}></div>
                    <ul ref='city-C' className='tripexpence-citylist'  style={{transform:'translate3d('+(this.state.transX)+'px,'+this.state.transY+'px,0)'}}>
                            {this.state.cityList.length>1 && this.state.currentCityIndex >-1 &&this.state.cityList[this.state.currentCityIndex].children.map((item,i)=>{
                                return <li key={i}>
                                    <Checkbox
                                        checked={this.state.checked}
                                        onChange={()=>{this.setState({checked:!this.state.checked})}}
                                      >{item.label}</Checkbox></li>
                            })}
                           {this.state.cityList.length>1 && this.state.currentCityIndex >-1 && <li onClick={this.next.bind(this)}>下一步</li>}
                    </ul>
                </section>
                <section className={'tripexpence-table-C '+(this.state.showTable?'active':'')}>
                     <div className="tripexpence-header pad-10">
                        <Row>
                            <Col span={22} className="tripexpence-header-inner"><span>{this.state.currentProv}</span>-差旅费</Col>
                            <Col span={2}  className=''><Button type='primary' >返回</Button></Col>
                        </Row>                      
                        <div className="tripexpence-line"></div>
                    </div>
                    <Table bordered={true}
                                
                                 dataSource={this.state.dataSource} columns={columns} />
                </section>
                
            </div>
		}
  
		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
			
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
		);
	}

    next(){
        this.setState({
            showTable:true
        })
    }

	changeAccount(i){
        if(i*1===0){
            window.location.hash='triptraffic/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='tripexpence/';
        }else if(i*1===2){
            window.location.hash='tripreason/';
        }else if(i*1===3){
            window.location.hash='tripnotice/';
        }
	}
    tripostlink(){
        window.location="#/tripost/"
    }
    seasonlink(){
        window.location="#/tripseason/"
    }

	bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        $.ajax({
            url:window.baseUrl+'travel/get_expenselist',//接口地址
            type:window.ajaxType || 'get',
            data:{
				userid:s.userid,
				getusersigid:s.getusersigid
            },
            success(data){

                if(data.getret === 0){
                    //console.log(data,"信息列表");
                    s.state.dataSource = data.list.filter((item,i)=>{
                        return item.provname === s.state.currentProv;
                    });

                    console.log(s.state.dataSource)
                    
                    s.forceUpdate();
                }
            }
        })
    }
 


    //弹框
	modifyaddpost(){
      var obserable=window.obserable;
         this.setState({
            showCredentialsDiolog:true
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:0,id:'addpost'}
          })  
        }) 
    }
    addProduct(){//添加
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var params = {
            userid:this.userid,
            getusersigid:this.getusersigid,  
            setuserid:userid,          
            provid:s.state.provid,//this.state.inputValue[0],
            cityid:s.state.cityid,//this.state.inputValue[1],
            jobid:s.state.jobid,
            hotelprice1:s.state.hotelprice1,
            hotelprice2:s.state.hotelprice2,
            foodprice:s.state.foodprice,
            othertraficprice:s.state.othertraficprice,
            otherprice:s.state.otherprice,
        }

        if(this.currentId!==-1){//编辑        
            params.expenseid = this.currentId;  
            
            $.ajax({
                type:'POST',
                url:window.baseUrl + 'travel/edit_expense/',
                data:params,
                success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  
                  
                }
            });
            console.log(params,'edit_expense'); 

        }else{
            $.ajax({
              type:'POST',
              url:window.baseUrl + 'travel/add_expense/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
                  console.log(this.url,'add_expense');
              }
            }); 
        }
    }

    //删除
    delData(expenseid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
    	$.ajax({
            url:window.baseUrl+'travel/del_expense/',
            type:window.ajaxType || 'get',
            data:{
                setuserid:userid,
				userid:s.userid,
				getusersigid:s.getusersigid,
                expenseid:expenseid,
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');
                    setTimeout(()=>{
                        s.bindNewdata();
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
    //获取公司信息
    getCompanydetail(){
        var s=this;
        $.ajax({
            url:window.baseUrl+'user/get_companydetail',
            type:window.ajaxType || 'get',
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
    //获取职务
    getjobData(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
    
        $.ajax({
            url:window.baseUrl+'travel/get_joblist',
            type:window.ajaxType || 'get',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                    //console.log(data,"职务");
                    s.state.tripost=data.list;
                    s.forceUpdate();
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
            type:window.ajaxType || 'get',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                companyid:s.companyid
            },
            success(data){
                if(data.getret === 0){
                   // console.log(data.list[0].children[1].children)
                    s.setState({
                        cityList:data.list[0].children,
                    });
                    
                }
            }
        })
    }
    //选择省市
    cityonChange(value){
        var s=this;
        s.state.inputValue=value;        
        s.state.defaultValue=value;
        s.state.provid=value[0];
        s.state.cityid=value[1];
        //console.log(s.state.provid,s.state.cityid);        
        s.forceUpdate();
    }
    //增加
    expenceform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
            disabled:false,
            defaultValue:[],
            expenseid:'',
            provid:'',
            cityid:'',
            jobid:'',
            hotelprice1:'',
            hotelprice2:'',
            foodprice:'',
            othertraficprice:'',
            otherprice:'',            
        })
        console.log(this.currentId,'currentId');
    }

	componentDidMount() {
		var s=  this;
		s.bindNewdata();
		s.getCompanydetail();
		s.getjobData();
        s.getCascader();
       
        
        setTimeout(()=>{
            s.initEcharts();
        },100)
/*
        $.ajax({
            dataType:'jsonp',
            url:"http://124.193.148.50:8017/_layouts/15/UBI.SharePoint.AppCenter/WrapperHandler/UBILogin.ashx?method=UserLogin&taken=123456789&LICD=2052&LoginSuc=false&UserName=admin&PassWord=admin1&jsonpCallback=callback",
            data:{},
            jsonp: "callback",
            jsonpCallback: "callback",
            success(data){
                console.log(data);
            }
        })
        */

        
	}

    initEcharts(){
        var s = this;
        this.lastCityId = this.lastCityId || -1;
        var myChart = echarts.init(this.refs['tripexpence-main-ui']);
            var app = {},
            option = null;
            var locations = [{
                name: '上海',
                coord: [121.472644, 31.231706]
            }, {
                name: '北京',
                coord: [116.405285, 39.904989]
            }, {
                name: '广东',
                coord: [113.280637, 23.839463714285714]
            }];
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                series: [
                    {
                        name: '中国',
                        type: 'map',
                        mapType: 'china',
                        selectedMode : 'single',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        }
                    }
                ]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            myChart.on('click', function (params) {

               console.log(params.name)
            });
            myChart.on('mouseover',(params)=>{
               // console.log(params);
                var cityid = -1,
                    index = -1,
                    currentProv='';
               s.state.cityList.map((city,i)=>{
                    if(params.name === city.label){
                        cityid = city.value;
                        index = i;
                        currentProv = city.label
                        return;
                    }
               });
               if(cityid === -1 || index === -1){
                 return;
               }
               s.lastCityId = cityid;


               s.setState({
                    currentCityIndex:index,
                    currentProv

                },()=>{

                   var height = s.refs['city-C'].offsetHeight;

                   var transY = params.event.offsetY-height;
                   transY < 0 && (transY = 0);
                    s.setState({
                        currentCityIndex:index,
                        transX:params.event.offsetX+2,
                        transY
                    });
                });
            });

          
            myChart.on('mouseout',(params)=>{
                //console.log(params)
                
              setTimeout(()=>{
                  var cityid = -1,
                      index =-1;
                   s.state.cityList.map((city,i)=>{
                        if(params.name === city.label){
                            cityid = city.value;
                           index = i;
                            return;
                        }
                   });
                   if(cityid === -1){
                      return;
                   }
                  
                  
                    if(cityid === s.lastCityId){
                        console.log('out');
                        s.setState({
                           // currentCityIndex:-1,
                        });
                    }
                    else{
                        console.log('in');   
                        //s.lastCityId = -1;
                    }
                    

              },100)
            });
    }

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiTripexpenceApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/