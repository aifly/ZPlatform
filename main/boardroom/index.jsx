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
    Select 
} from '../commoncomponent/common.jsx';
let FormItem = Form.Item;
import $ from 'jquery';
const Option = Select.Option;

import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

class ZmitiBoardroomApp extends React.Component {
    constructor(args) {
        super(...args);

        var list1 = [];


        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            list: [],
            visible:false,
            formUser:{},
            provinceList: [
                "北京",
                "安徽",
                "福建",
                "甘肃",
                "广东",
                "广西",
                "贵州",
                "海南",
                "河北",
                "河南",
                "黑龙江",
                "湖北",
                "湖南",
                "吉林",
                "江苏",
                "江西",
                "辽宁",
                "内蒙古",
                "宁夏",
                "青海",
                "山东",
                "山西",
                "陕西",
                "上海",
                "四川",
                "天津",
                "西藏",
                "新疆",
                "兵团",
                "云南",
                "浙江",
                "重庆"
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
                },{
                    title:'状态',
                    dataIndex:'status',
                    align:'center',
                    key:'status',
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
                    title: '操作',
                    dataIndex: '',
                    key: '3',
                    align: 'center',
                    width: 200,
                    render: (value, record, index) => {
                        return <div>
                            <Button type='primary' icon='edit' size='small' onClick={this.edit.bind(this, value, record, index)}>编辑</Button>
                            <Button onClick={this.deleteUser.bind(this,record)} type='danger' icon='delete' size='small' style={{ marginLeft: 10 }}>删除</Button>
                        </div>
                    }
                }
            ],
            dataSource:[
                {
                    username:'张三',
                    sex:1,
                    seat:'5排13号',
                    room:'503',
                    mobile:'15718879215',
                    key:'1'
                }
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
                    <div><Button size='small' type='primary' icon='reload' onClick={this.getUserList.bind(this)}>刷新</Button></div>
                </header>
                <div className='board-list'>
                    <label htmlFor="">按省份查询：</label><Select defaultValue="北京" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        {this.state.provinceList.map((item,i)=>{
                            return <Option key={i} value={item}>{item}</Option>
                        })}
                    </Select>
                <Table style={{marginTop:10}} pagination={{ pageSize: (this.viewH - 200)/50|0}} onChange={this.handleTableChange.bind(this)} dataSource={this.state.dataSource} bordered={true} columns={this.state.columns} />
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
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }
    handleChange(e){
        var s = this;
        $.ajax({
            url: window.baseUrl + '/wenming/getsignuplist/',
            type: 'post',
            data: {
                type: 2,
                name: e,
                status: 1
            },
            success(data) {
                if (data.getret === 0) {
                    data.list.forEach((item, i) => {
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
                    $.ajax({
                        url: window.baseUrl + '/share/wmsendsms/',
                        type: 'post',
                        data: {
                            mobile: record.mobile,
                            smstype: type + 1,//1.报名成功短信,2.审核通过短信,3.审核未通过短信
                            username: record.username,
                            getaddress:"全国宣传干部学院怀柔校区5号楼（教学楼）",
                            projectname: '2018年地方文明网站建设管理工作培训班',
                            getdate: '2018年8月13日20时',
                            getcompany:"中国文明网",
                        },
                        error() {
                        },
                        success(data) {
                            if(data.getret === 0){
                                message.success('短信已发送');
                            }
                        }
                    })
                    s.getUserList();
                } else {
                    message.error('审核失败')
                }
            }
        })
    }

    handleTableChange(pagination, filters, sorter){
        console.log(this.dataSource, filters.status);
        this.state.dataSource = this.dataSource.filter((item)=>{
            return item.status === filters.status[0]*1;
        })
        if(filters.status.length<=0){
            this.state.dataSource = this.dataSource.concat([]);
        }
        this.forceUpdate();
        console.log(this.state.dataSource);
    }
    deleteUser(record){
        var s =this;
        $.ajax({
            url: window.baseUrl + 'admin/editsignup',
            type: 'post',
            data: {
                userid:s.userid,
                getusersigid:s.getusersigid,
                signupid: record.signupid,
                status:3
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
        $.ajax({
            type:'post',
            url: window.baseUrl +'/admin/getwmsignuplist',
            data:{
                pageindex:1,
                pagenum:1000,
                userid: s.userid,
                getusersigid: s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                    data.list.filter((item,i)=>{
                        item.key = i+'-1';
                        return item.status*1 !== 3;//过滤掉已经删除的人员、
                    }).forEach((item,i)=>{
                        item.key = i+1;
                    })
                    s.setState({
                        dataSource : data.list
                    });
                    s.dataSource = data.list.concat([]);
                    console.log(s.dataSource )

                }
            }
        })
    }
  
    componentDidMount() {

        this.getUserList();
    }
 


}

export default ZmitiValidateUser(ZmitiBoardroomApp);