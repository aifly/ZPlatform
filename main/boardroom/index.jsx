import './static/css/index.css';
import React from 'react';
import {
    Button,
    notification,
    Icon,
    Table,
    Modal,
    Form,
    Input,
    message,
    Select ,
    Popconfirm
} from '../commoncomponent/common.jsx';
let FormItem = Form.Item;
import $ from 'jquery';
const Option = Select.Option;

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import ZmitiUserList from "../components/zmiti-user-list.jsx";

import MainUI from '../components/Main.jsx';

class ZmitiBoardroomApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [];


        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            list: [],
            selectedIndex:0,
            visible:false,
            defaultProvince:'全部',
            formUser:{},
            kw:"",
            provinceList: [
                "全部",
                "北京",
                "天津",
                "河北",
                "山西",
                "内蒙古",
                "辽宁",
                '吉林',
                '黑龙江',
                '上海',
                '江苏',
                '浙江',
                '安徽',
                '福建',
                '江西',
                '山东',
                '河南',
                '湖北',
                '湖南',
                '广东',
                '广西',
                '海南',
                '重庆',
                '四川',
                '贵州',
                '云南',
                '西藏',
                '陕西',
                '甘肃',
                '青海',
                '宁夏',
                '新疆',
                '兵团',
                '中国文明网'
            ],
            columns:[
                {
                    title: '序号',
                    dataIndex: 'key',
                    key: 'key',
                    align: 'center'
                },
                {
                    title:'姓名',
                    dataIndex:'username',
                    key:'username',
                    align:'center'
                },{
                    title:'性别',
                    dataIndex:'sex',
                    align:'center',
                    key:'sex',
                    render: (value, record, index) => {
                        return <div>
                            {record.sex === 1 ? '男' :'女'}
                        </div>
                    }
                },{
                    title:'手机',
                    dataIndex:'mobile',
                    align: 'center',
                    key:'mobile'
                },
                {
                    title: '房间号',
                    dataIndex: 'roomnumber',
                    align: 'center',
                    key: 'room'
                }, {
                    title: '座位号',
                    dataIndex: 'seatnumber',
                    align: 'center',
                    key: 'seat'
                }, {
                    title: '职位',
                    dataIndex: 'job',
                    align: 'center',
                    key: 'job'
                }, {
                    title: '省份',
                    dataIndex: 'provicename',
                    align: 'center',
                    key: 'provicename'
                }, {
                    title: '民族',
                    dataIndex: 'nation',
                    align: 'center',
                    key: 'nation'
                }, {
                    title: '办公电话',
                    dataIndex: 'telphone',
                    align: 'center',
                    key: 'telphone'
                }, {
                    title: '邮箱',
                    dataIndex: 'email',
                    align: 'center',
                    key: 'email'
                },{
                    title:'状态',
                    dataIndex:'status',
                    align:'center',
                    key:'status',
                    //filterMultiple: false,
                    filters: [
                        { text: '未审核', value: 0 },
                        { text: '审核通过', value: 1 },
                        { text: '审核未通过', value: 2 }
                    ],
                    render:(value,record,index)=>{
                        return <div className={'zmiti-board-status-'+record.status}>{record.status === 0 ? '未审核' : record.status === 1 ? '审核通过':record.status===2 ? '审核不通过':'已删除'}</div>
                    }
                },{
                    title:'审核',
                    dataIndex:'',
                    key:'2',
                    align: 'center',
                    width:220,
                    render:(value,record,index)=>{
                        return <div >
                            <Button onClick={this.check.bind(this, record, 1)} disabled={record.status === 0 ? false :'disabled'} type='primary'  size='small' style={{marginLeft:10}}>审核通过</Button>
                            <Button onClick={this.check.bind(this, record, 2)} type='danger' size='small' style={{ marginLeft: 10 }} disabled={record.status === 0 ? false : 'disabled'}>审核不通过</Button>
                        </div>
                    }
                }, {
                    title: '是否签到',
                    dataIndex: '',
                    key: 'issign',
                    align: 'center',
                    //filterMultiple: false,
                    filters: [
                    { text: '已签到', value: 1 },
                    { text: '未签到', value: 0 }
                ],
                    render: (value, record, index) => {
                        return <div style={{ color: record.issign? 'green':'#f00',fontWeight:'bold'}}>
                            {record.issign ? '已签到':"未签到"}
                        </div>
                    }
                }, {
                    title: '操作',
                    dataIndex: '',
                    key: '3',
                    align: 'center',
                    width: 180,
                    render: (value, record, index) => {
                        return <div>
                            <Button type="primary" icon="edit" size="small" onClick={this.edit.bind(this, value, record, index)}>
                              编辑
                            </Button>
                            <Popconfirm title="删除后数据将无法恢复,确定删除吗？" okText="确定" cancelText="取消" onConfirm={this.deleteUser.bind(this, record)}>
                              <Button type="danger" icon="delete" size="small" style={{ marginLeft: 10 }}>
                                删除
                              </Button>
                            </Popconfirm>
                          </div>;
                    }
                }
            ],
            dataSource:[
               
            ]
        }

        this.viewW = document.documentElement.clientWidth;
        this.viewH = document.documentElement.clientHeight;
    }

    componentWillUnmount() {
        this.unmout = true;
    }

    componentWillMount() {
        this.unmout = false;
        let {
            resizeMainHeight,
            popNotice,
            validateUser,
            loginOut,
            validateUserRole,
            isSuperAdmin,
            isNormalAdmin,
            getUserDetail,
            listen,
            send
        } = this.props;
        var {
            userid,
            getusersigid,
            companyid,
            username,
            isover,
            usertypesign
        } = validateUser(() => {
            loginOut('登录失效，请重新登录', window.loginUrl, false);
        }, this);


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
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        var mainComponent = <div className='board-main-ui' ref='board-main-ui' style={{ height: this.state.mainHeight }}>
                <header>
                    <div>人员管理</div>
                    <div><Button size='small' type='primary' icon='reload' onClick={this.refresh.bind(this)}>刷新</Button></div>
                </header>
                <div className='board-list'>
                    <label htmlFor="">按省份查询：</label><Select value={this.state.defaultProvince} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        {this.state.provinceList.map((item,i)=>{
                            return <Option key={i} value={item}>{item}</Option>
                        })}
                    </Select>
                    <input placeholder='按姓名查询' value={this.state.kw} onChange={this.filterDataSource.bind(this)} />
                <Table style={{marginTop:10}} pagination={{ pageSize: (this.viewH - 500)/50|0}} onChange={this.handleTableChange.bind(this)} dataSource={this.state.dataSource} bordered={true} columns={this.state.columns} />
                </div>

            <Modal title="编辑人员信息" visible={this.state.visible}
                onOk={this.editUser.bind(this)}
                okText='确定'
                cancelText='取消'
                onCancel={() => { this.setState({ visible: false }) }}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="房间号"
                        hasFeedback
                    >
                        <Input onChange={this.changeRoomnumber.bind(this)} placeholder="房间号" defaultValue='xx' value={this.state.formUser.roomnumber} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="座位号"
                        hasFeedback
                    >
                        <Input onChange={this.changeSeatnumber.bind(this)} placeholder="座位号" defaultValue='xx' value={this.state.formUser.seatnumber} />
                    </FormItem>

                </Form>
            </Modal>
            </div>;
        var props = { userList: this.state.userList, userid: this.userid, changeAccount: this.changeAccount.bind(this), type: "signup", tags: ["第一期", "第二期"], //mainHeight: mainComponent,
          title: "会议系统", selectedIndex: this.state.selectedIndex, rightType: "custom", customRightComponent: mainComponent };

        var userListApp = <ZmitiUserList {...props}></ZmitiUserList>
        
        return <MainUI component={userListApp} />;
    }
    refresh(){
        this.currentType = '';
        this.setState({ defaultProvince:'全部' });
        this.getUserList();
    }
    changeAccount(e){
        this.setState({
            selectedIndex:e,
            kw:''
        },()=>{
            this.getUserList();
        });
        
    }
    filterDataSource(e){
        var kw = e.target.value;
        this.setState({
            kw
        })
        this.state.dataSource = this.dataSource.filter((d)=>{
            return d.username.indexOf(kw)>-1;
        });
        this.forceUpdate();
    }
    handleChange(e){
        var s = this;
        
        this.setState({ defaultProvince: e });
       
        if(e === '全部'){
            this.currentType = '';
            this.getUserList();
            return;
        }

        this.currentType = e;
        
        $.ajax({
            url: window.baseUrl + '/wenming/getsignuplist/',
            type: 'post',
            data: {
                type: 2,
                pnumber:s.state.selectedIndex+1,
                name: e,
                status: 1
            },
            success(data) {
                if (data.getret === 0) {
                   
                    data.list.filter((d)=>{
                        return d.status*1 !== 3;
                    }).forEach((item, i) => {
                        item.key = i + 1;
                    })

                    s.setState({
                        dataSource: data.list
                    });
                    s.dataSource = data.list.concat([]);
                }
                console.log(data);
            }
        })
    }
    check(record,type){
        var s = this;
        $.ajax({
            url: window.baseUrl + 'admin/editsignup',
            type: 'post',
            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                signupid: record.signupid,
                status:type
            },
            success(data) {
                if (data.getret === 0) {
                    message.success('审核成功')
                    var SMSConfig = window.wmMeetingSmsTempConfig[
                            s.state.selectedIndex + 1
                          ];
                    
                    $.ajax({
                      url:
                        window.baseUrl +
                        "/share/wmsendsms/",
                      type: "post",
                      data: {
                        mobile: record.mobile,
                        smstype: type + 1, //1.报名成功短信,2.审核通过短信,3.审核未通过短信
                        username: record.username,
                        getaddress: SMSConfig.getaddress,
                        projectname:SMSConfig.projectname,
                        getdate:SMSConfig.getdate,
                        getcompany:SMSConfig.getcompany
                      },
                      error() {},
                      success(data) {
                        if (data.getret === 0) {
                          message.success("短信已发送");
                        }
                      }
                    });
                    s.getUserList();
                } else {
                    message.error('审核失败')
                }
            }
        })
    }

    handleTableChange(pagination, filters, sorter){
        //console.log(filters.issign);
        this.state.dataSource = this.dataSource.filter((item)=>{
            if(filters.status){
                return item.status === filters.status[0]*1;
            }else if(filters.issign){
                return item.issign === filters.issign[0] * 1;
            }
        })

        console.log(filters)
         
        if (filters.status && filters.status.length <= 0) {
          this.state.dataSource = this.dataSource.concat([]);
        }
        if (filters.issign && filters.issign.length <= 0) {
          this.state.dataSource = this.dataSource.concat([]);
        }
        if (JSON.stringify(filters) === "{}"){
            this.state.dataSource = this.dataSource.concat([]);
        }
        this.forceUpdate();
    }
    deleteUser(record){
        var s =this;
        $.ajax({
            url: window.baseUrl + 'admin/delsignup',
            type: 'post',
            data: {
                userid:s.userid,
                getusersigid:s.getusersigid,
                signupids: record.signupid
            },
            success(data) {
                if (data.getret === 0) {
                    message.success('删除成功')
                    s.getUserList();
                }else{
                    message.error('删除失败')
                }
            }
        })
    }
    edit(value,record,index){
        this.setState({
            visible:true,
            formUser:record
        })
    }
    changeRoomnumber(e){
        this.state.formUser.roomnumber = e.target.value;
        this.forceUpdate();
    }
    changeSeatnumber(e){
        this.state.formUser.seatnumber = e.target.value;
        this.forceUpdate();
    }
    editUser(){
        var s = this;
        var p = this.state.formUser;
        p.userid = s.userid;
        p.getusersigid = s.getusersigid;
        $.ajax({
            url: window.baseUrl + 'admin/editsignup',
            type:'post',
            data:p,
            success(data){
                
                if(data.getret === 0){
                    s.setState({
                        visible:false
                    });
                    s.getUserList();
                }
            }
        })
    }
    getUserList(){
        var s = this;
        if (this.currentType){
            this.handleChange(this.currentType);
            return;
        }
        $.ajax({
            type: "post",
            url: window.baseUrl + "/admin/getwmsignuplist",
            data: {
              pnumber: s.state.selectedIndex+1,
              pageindex: 1,
              pagenum: 1000,
              userid: s.userid,
              getusersigid: s.getusersigid
            },
            success(data) {
              if (data.getret === 0) {
                var list = data.list;
                  list.forEach((item, i) => {
                    item.key = i + 1;
                  });
                s.setState({
                  dataSource: list
                });
                
                s.dataSource = list.concat([]);
              }
            }
          });


        /* $.ajax({
            type:'post',
            url: window.baseUrl +'/admin/getpnumberlist',
            data:{
                userid: s.userid,
                getusersigid: s.getusersigid,
            },
            success(data){
                console.log(data,'getpnumberlist');
                if(data.getret === 0){
                }
            }
        }) */
    }
  
    componentDidMount() {

        this.getUserList();
    }
 


}

export default ZmitiValidateUser(ZmitiBoardroomApp);