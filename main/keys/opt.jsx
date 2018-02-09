import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Icon,Spin } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiKeysOptApp extends Component {
	constructor(props) {
		super(props);
		
    this.state = {
    	mainHeight:document.documentElement.clientHeight-50,
      hotword:'',
      sort:1,
      hotwordid:null,
      visible: false,
    	dataSource:[],
      loading:false,
      tip:'数据拉取中...',
    };
	}
	render() {
		var s =this;

		var title = this.props.params.title || '两会热词';
        const columns = [{
          title: '序号',
          dataIndex: 'sort',
          key: 'sort',
          width:100,
        },{
          title: '热词',
          dataIndex: 'hotword',
          key: 'hotword',
        }, {
          title: '操作',
          dataIndex: '',
          key: '',
          width:120,
          render:(text,recoder,index)=>(
            <div className='zmiti-keys-spt'><a href='javascript:void(0)' onClick={this.editor.bind(this,recoder.hotwordid,recoder.hotword,recoder.sort)}>修改</a><span>|</span><a href='javascript:void(0)' onClick={this.del.bind(this,recoder.hotwordid)}>删除</a></div>        
          )
        }];
        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
        };
		    var component =<Spin tip={this.state.tip} spinning={this.state.loading}><div className="zmiti-keys-main-ui" style={{height:this.state.mainHeight}}>
            <div className='pad-10'>
                <div className="zmiti-keys-header">
                    <Row>
                        <Col span={8} className="zmiti-keys-header-inner">热词列表</Col>
                        <Col span={8} offset={8} className='zmiti-keys-button-right'><Button onClick={this.goback.bind(this)}><Icon type="left" />返回</Button><Button type="primary" onClick={this.showModal.bind(this)}><Icon type="file-add" />新增</Button></Col>
                    </Row>                      
                </div>
                <div className="zmiti-keys-line"></div>
                <div className="hr20"></div>
                <Table dataSource={this.state.dataSource} columns={columns} rowKey={record => record.hotwordid} />
            </div>
            <Modal
              title="热词"
              visible={this.state.visible}
              onOk={this.handleOk.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              >
                <Form>
                  <FormItem
                    {...formItemLayout}
                    label="热词"
                    hasFeedback
                  >
                    <Input placeholder="热词" 
                    value={this.state.hotword}
                    onChange={(e)=>{this.state.hotword=e.target.value;this.forceUpdate();}}
                    />                      
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="序号"
                    hasFeedback
                  >
                    <Input placeholder="序号" 
                    value={this.state.sort}
                    onChange={(e)=>{this.state.sort=e.target.value;this.forceUpdate();}}
                    />                      
                  </FormItem>

                </Form>
            </Modal>
        </div>
        </Spin>
		    return (
            <MainUI component={component}></MainUI>
        );
	}

  //打开对话框
  showModal(){
    this.setState({
      visible: true,
    });
    this.state.hotword = '';
    this.state.sort = 1;
    this.state.hotwordid = null;
    this.forceUpdate();
  }
  //确认提交
  handleOk(){
    var s = this;
    var userid = this.props.params.userid?this.props.params.userid:this.userid;
    s.setState({
      visible: true,
    });
    var params = {
        userid:this.userid,
        getusersigid:this.getusersigid,
        worksclassid:3,//作品分类编号
        sort:s.state.sort,//序号
        hotword:s.state.hotword,
    }
    if(s.state.hotwordid!==null){
      params.hotwordid = s.state.hotwordid;
      $.ajax({
        type:'POST',
        url:window.baseUrl + 'h5/edit_hotword/',
        data:params,
        success(data){
            message[data.getret === 0 ? 'success':'error'](data.getmsg);
            s.setState({
              visible:false
            });
            s.bindNewdata();
        }
      });
    }else{
      $.ajax({
        type:'POST',
        url:window.baseUrl + 'h5/add_hotword/',
        data:params,
        success(data){
            message[data.getret === 0 ? 'success':'error'](data.getmsg);
            s.setState({
              visible:false
            });
            s.bindNewdata();
        }
      }); 
    }
 
  }
  //取消对话框
  handleCancel(e){
    this.setState({
      visible: false,
    });
    this.state.hotword = '';
    this.state.sort = 1;
    this.state.hotwordid = '';
    this.forceUpdate();
  }
  //修改对话框
  editor(id,keywords,sort){
    this.setState({
      visible: true,
    });
    this.state.hotwordid = id;
    this.state.hotword = keywords; 
    this.state.sort = sort;
    this.forceUpdate();
  }
  //获取列表
  bindNewdata(){
    var s = this;
    var userid = this.props.params.userid?this.props.params.userid:this.userid;
    $.ajax({
      url:window.baseUrl+'h5/select_hotword/',
      type:'post',
      data:{
        userid:s.userid,
        getusersigid:s.getusersigid
      },
      success(data){
        if(data.getret === 0){
            s.state.dataSource = data.list;
            s.state.loading = false;
            s.forceUpdate();
        }
      }
    })
  }
  //删除
  del(id){
    var s = this;
    $.ajax({
        type:'POST',
        url:window.baseUrl + 'h5/del_hotword/',
        data:{
          hotwordids:id,
          userid:s.userid,
          getusersigid:s.getusersigid 
        },      
        success(data){
          message[data.getret === 0 ? 'success':'error'](data.getmsg);
          s.bindNewdata();
        }
    });
  }
  //返回上一页
  goback(){
    window.history.back();
  }
	componentDidMount() {
		var s=  this;
    this.bindNewdata();
	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(() =>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}


}

export default ZmitiValidateUser(ZmitiKeysOptApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/