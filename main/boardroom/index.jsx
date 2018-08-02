import './static/css/index.css';
import React from 'react';
import {
    Button,
    notification,
    Icon,
    Table,
    Modal,
    Form,
    Input
} from '../commoncomponent/common.jsx';
let FormItem = Form.Item;
import $ from 'jquery';

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
            columns:[
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
                    dataIndex: 'room',
                    align: 'center',
                    key: 'room'
                }, {
                    title: '座位号',
                    dataIndex: 'seat',
                    align: 'center',
                    key: 'seat'
                },{
                    title:'操作',
                    dataIndex:'',
                    key:'2',
                    align: 'center',
                    width:220,
                    render:(value,record,index)=>{
                        return <div>
                            <Button type='primary' icon='edit' size='small' onClick={this.edit.bind(this, value, record, index)}>编辑</Button> 
                            <Button type='danger' icon='delete' size='small' style={{marginLeft:10}}>删除</Button>
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
                    <div><Button size='small' type='primary' icon='reload'>刷新</Button></div>
                </header>
                <div className='board-list'>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                </div>

            <Modal title="出差事由" visible={this.state.visible}
                
                onCancel={() => { this.setState({ visible: false }) }}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                    >

                        <Input placeholder="用户名" defaultValue='xx' value={this.state.formUser.username}/>
                    </FormItem>
                   

                </Form>
            </Modal>
            </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }

    edit(value,record,index){
        this.setState({
            visible:true,
            formUser:record
        })
    }
  
    componentDidMount() {


    }
 


}

export default ZmitiValidateUser(ZmitiBoardroomApp);