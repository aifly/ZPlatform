import './static/css/index.css';
import React from 'react';
import {message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin} from '../commoncomponent/common.jsx';
let Search = Input.Search;
const FormItem = Form.Item;
let Option = Select.Option;
import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import MainUI from '../components/Main.jsx';

 class ZmitiJinrongxbNoticeApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            mainHeight:document.documentElement.clientHeight-50,
            loading:false,
            tip:'数据拉取中...',
            keyword:'',
            dataSource:[{
              key: '1',
              name: '标题标题标题标题',              
              newsdate: '2017-11-17',
            }, {
              key: '2',
              name: '标题标题标题标题标题标题标题标题2',
              newsdate: '2017-11-17',
            }, {
              key: '3',
              name: '标题标题标题标题标题标题标题标题3',
              newsdate: '2017-11-17',
            }],            
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
        
        const columns = [{
          title: '标题',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '时间',
          dataIndex: 'newsdate',
          key: 'newsdate',
          width:150,
        }, {
          title: '操作',
          key: 'action',
          width:150,
          render: (text, record) => (
            <span>
              <a href="#">编辑</a>
              <span className="ant-divider" />
              <a href="#">删除</a>
            </span>
          ),
        }];

        var title = this.props.params.title || '金融消保';
        const monthFormat = 'YYYY/MM';
        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['消保地址','政策管理','公告管理','设置'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 2,
            rightType: "custom",
            customRightComponent:<div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">公告管理</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'><Button type='primary'>添加</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <Row gutter={10} type='flex' className='jinrongxb-search '>
                        <Col className="jinrongxb-heigth45">标题：</Col>
                        <Col className="jinrongxb-heigth45"><Input value={this.state.keyword} placeholder="标题" /></Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.dataSource} />
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

    }
    changeAccount(i){
        if(i*1===0){
            window.location.hash='jinrongxiaobao/';       
        }else if(i*1===1){
            window.location.hash='jinrongxiaobaopolicy/';
        }else if(i*1===2){
            window.location.hash='jinrongxiaobaonotice/';
        }else if(i*1===3){
            window.location.hash='jinrongxiaobaosetup/';
        }
    }
    //search
    /*searchByKeyword(e){
        this.setState({
            keyword:e.target.value
        },()=>{
            this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;

            this.state.dataSource = this.dataSource.filter((item)=>{
                return  item.jobname.indexOf(this.state.keyword)>-1;
            });
            this.forceUpdate();
        })
    }*/






  
}

export default ZmitiValidateUser(ZmitiJinrongxbNoticeApp);
