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
            currentCityId:1
		};
        this.viewW = document.documentElement.clientWidth;
		this.currentId = -1;
	}
    getProductDetail(record,index,e){
        var s=this;
        var defaultValue=new Array();
        defaultValue[0]=record.provid;
        defaultValue[1]=record.cityid;
        console.log(record);

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
        let scriptList = {// <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts-all-3.js"></script>
//       <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>

            assets:[
              
                {
                    src:'../static/echarts/china.js',
                    type:'script'
                }
               

            ]
        };

		let props={
			userList:this.state.userList,
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['交通工具','差旅费','出差事由'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 1,
			rightType: "custom",
			customRightComponent:<div  className='tripost-main-ui tripexpence-main-ui' style={{height:this.state.mainHeight}}>
                <div ref='tripexpence-main-ui' style={{width:'100%',height:'100%'}}></div>
                <div className='tripost-citylist-C' style={{width:(this.viewW - window.mainLeftSize)||0,height:this.state.mainHeight}}>
                    <section>

                        <ul>
                            {this.state.cityList.length>1&&this.state.cityList[this.state.currentCityId].children.map((item,i)=>{
                                return <li key={i}>
                                    <Checkbox
                                        checked={this.state.checked}
                                        onChange={()=>{this.setState({checked:!this.state.checked})}}
                                      >{item.label}</Checkbox></li>
                            })}
                        </ul>
                    </section>
                    <section></section>
                </div>
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
            window.location.hash='triptraffic/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='tripexpence/';
        }else if(i*1===2){
            window.location.hash='tripreason/';
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
                    s.state.dataSource = data.list;
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

                    s.setState({
                        cityList:data.list[0].children,

                        
                    })
                    
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
        

        
	}

    initEcharts(){
        var s = this;
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
               var cityid = -1;
               s.state.cityList.map((city,i)=>{
                    if(params.name === city.label){
                        cityid = city.value;
                        return;
                    }
               });
               if(cityid === -1){
                return;
               }
               s.setState({
                    currentCityId:cityid
               });
               console.log(params.name)
              
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