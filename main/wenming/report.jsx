import './static/css/report.css';
import React from 'react';

import {message,Select,Modal,Form,Icon,Input,Button, Row, Col,Table,moment,Checkbox,Radio} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';


import MainUI from '../components/Main.jsx';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';

import '../static/echarts/china';

import IScroll from 'iscroll';
const Search = Input.Search;
const FormItem = Form.Item;
 class ZmitiWenmingReportApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           appid:window.WENMING.XCXAPPID,
           classid:'A7CZ1YE3',
           total:0,
           pageIndex:1,
           pagenum:3,
           titleIndex:'',
           dataSource:[],
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

        var s = this;
        var title = '身边文明事';
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title'

        },{
            title: '图片',
            dataIndex: 'imageslist',
            key: 'imageslist',
            width:130,
            render:(value,recoder,index)=>{
                if(recoder.imageslist!=''){
                    return <img className='wenming-report-thumbnail' src={recoder.imageslist}/>
                }                
                              
            }

        },{
            title: '更新时间',
            dataIndex: 'looktime',
            key: 'looktime',
            render:(text,recoder,index)=>{
                var d=new Date(text);
                return text;//this.formatDate(d);
            }

        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                <div className='wenming-report-actbtn'>
                    <Button onClick={this.editData.bind(this,recoder.articlid)}> 编辑</Button>
                    <Button onClick={this.delData.bind(this,recoder.articlid)}> 删除</Button> 
                </div>               
            )

        }]

        var props = {
            title,
            selectedIndex:3,
            mainRight:<div className='wenming-report-main-ui' style={{height:this.state.mainHeight}}>
                        <div className="wenming-report-header">
                            <Row>
                                <Col span={16} className="wenming-report-header-inner">文明播报-身边文明事
                                    
                                </Col>
                                <Col span={8} className='wenming-report-button-right'>
                                    <Button type='primary' onClick={this.goadd.bind(this)}>添加</Button>
                                </Col>
                            </Row>
                            <div className="clearfix"></div>                 
                        </div>
                        
                        <div className="wenming-report-line"></div>
                        <div className='hr15'></div>                        
                        <Row>
                            <Col span={6} className='wenming-report-label'>搜索：</Col>
                            <Col span={18}>                                    
                                <Search
                                placeholder="输入文章内容"
                                style={{ width: 200 }}
                                onSearch={function(value){                                    
                                    s.state.titleIndex=value;
                                    //console.log(s.state.titleIndex,'titleIndex')
                                    s.forceUpdate();
                                    s.bindNewdata(value);
                                }}
                                />
                            </Col>
                        </Row>                        
                        <div className='hr15'></div>
                        <div className='wenming-report-datalist'>
                            <Table bordered={true} dataSource={this.state.dataSource} columns={columns} 
                                pagination={{
                                   defaultCurrent:s.state.pageIndex,
                                   defaultPageSize:s.state.pagenum,
                                   total:s.state.total,
                                   onChange:function(page){                                    
                                    s.state.pageIndex=page;
                                    s.bindNewdata();
                                    s.forceUpdate();
                                   }
                                }}
                             />
                            <div className="clearfix"></div>
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
    formatDate(now){ 
        var year=now.getYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    }
    goadd(){
        window.location='#/wenmingreportadd/'
    }
    bindNewdata(title){//getData     
        var s = this;
        $.ajax({
            type:'POST',
            url:window.baseUrl + 'weixinxcx/search_articlelist/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:s.state.appid,
                classid:s.state.classid,
                status:1,
                pagenum:s.state.pagenum,
                page:s.state.pageIndex,
                keyword:title,
            },
            success(data){                    
                s.state.dataSource=data.list;
                s.state.total=data.countRow.countrows;
                //console.log(data.list,this.url,'data.result');
                s.forceUpdate();                
            }
        });
    }
    //编辑
    editData(articlid){
        var s = this;
        window.location='#/wenmingreportadd/'+articlid;
    }
    //删除
    delData(articlid){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/del_articles/',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                articleids:articlid,
                appid:s.state.appid,
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

export default ZmitiValidateUser(ZmitiWenmingReportApp);
