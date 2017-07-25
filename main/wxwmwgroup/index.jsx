import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Cascader,message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Tree  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

import { Link } from 'react-router';

import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';
const RangePicker = DatePicker.RangePicker;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import $ from 'jquery';

function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 5; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}
class ZmitwxWmwGroupApp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            setuserid:'',
            selectedIndex:100,
            mainHeight:document.documentElement.clientHeight-50,
            modpostDialogVisible:false,
            dataSource:[],            
            companyname:'',
            companyid:'',
            classname:'',
            classename:'',
            treeData:[],
        };
        this.currentId = -1;
    }
    treeSelect(info){
        console.log('selected', info);
    }
    treeLoadData(treeNode){
        var s = this;
        //treeNode=s.state.treeData;
        return new Promise((resolve) => {
          setTimeout(() => {
            const treeData = [...this.state.treeData];
            console.log(treeData,'const')
            getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
            this.setState({ treeData });
            resolve();
          }, 1000);
        });
    }
    render() {
        
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const loop = data => data.map((item) => {
          if (item.children) {
            return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
          }
          return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
        });
        const treeNodes = loop(this.state.treeData);
        
        var title = this.props.params.title || '身边文明事儿';

        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['首页','数据审核','文明播报','通用设置'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 100,
            rightType: "custom",
            customRightComponent:<div className='tripseason-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-tripseason-header">
                        <Row>
                            <Col span={8} className="zmiti-tripseason-header-inner">数据审核-{this.state.companyname}</Col>
                            <Col span={8} offset={8} className='zmiti-tripseason-button-right'><Button type='primary' onClick={this.seasonform.bind(this)}>分类管理</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-tripseason-line"></div>
                    <div>
                        <Tree onSelect={this.treeSelect.bind(this)} loadData={this.treeLoadData.bind(this)}>
                        {treeNodes}
                        </Tree>
                    </div>
                </div>
                <Modal title="分类管理" visible={this.state.modpostDialogVisible}
                    onOk={this.addProduct.bind(this)}
                    width='500'
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                  >
                    <Row>
                        <Col span={10}>
                            <div>tree</div>
                        </Col>
                        <Col span={14}>
                            <Form>
                              <FormItem
                                {...formItemLayout}
                                label="中文名称"
                                hasFeedback
                              > 
                                <Input placeholder="中文名称" 
                                    value={this.state.classname}
                                    onChange={(e)=>{this.state.classname=e.target.value;this.forceUpdate();}}
                                />
                              </FormItem>
                              <FormItem
                                {...formItemLayout}
                                label="英文名称"
                                hasFeedback
                              > 
                                <Input placeholder="英文名称" 
                                    value={this.state.classename}
                                    onChange={(e)=>{this.state.classename=e.target.value;this.forceUpdate();}}
                                />
                              </FormItem>
                            </Form>
                        </Col>
                    </Row>
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
            window.location.hash='triptraffic/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='tripexpence/';
        }else if(i*1===2){
            window.location.hash='tripreason/';
        }
    }    

    componentDidMount() {
        var s=  this;
        s.bindNewdata();
        s.getCompanydetail();
        s.bindtreedata();
    }

    componentWillMount() {
        let {resizeMainHeight,validateUser,loginOut,getProductList} = this.props;
        resizeMainHeight(this);         
        let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
        this.userid = userid;
        this.getusersigid = getusersigid;  
        this.getProductList = getProductList;     
    }
    bindtreedata(){
        var s = this;
        $.ajax({
            url:window.baseUrl+'weixinxcx/search_articleclass',
            type:'POST',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                appid:'wx32e63224f58f2cb5',
            },
            success(data){
                if(data.getret === 0){
                    console.log(data.list,'mytree');
                    var getreeArr= new Array();
                    $.each(data.list,function(i,item){    
                        //getreeArr.push({ name: item.classname, key: item.classid });
                        getreeArr.push({ name: item.classname, key: item.autoid,classid:item.classid });
                    })
                    console.log(getreeArr,'getreeArr');
                    setTimeout(() => {
                      s.setState({
                        treeData:getreeArr,
                      });
                    }, 100);
                    s.forceUpdate();
                }
            }
        })
 
    }
    bindNewdata(){
        var s=this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        /*$.ajax({
            url:window.baseUrl+'travel/get_seasondatelist',
            type:window.ajaxType || 'get',
            data:{
                setuserid:userid,
                userid:s.userid,
                getusersigid:s.getusersigid                
            },
            success(data){

                if(data.getret === 0){
                    s.state.dataSource = data.list;
                    s.forceUpdate();
                }
            }
        })*/
    }
    //
    addProduct(){//添加
        var s = this;
        var params = {
            userid:this.userid,
            setuserid:this.userid,
            getusersigid:this.getusersigid,

        }

        if(this.currentId!==-1){//编辑        
            //params.cityid = this.currentId;  

            /*$.ajax({
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
            });*/
        }else{
            /*$.ajax({
              type:'POST',
              url:window.baseUrl + 'travel/add_seasondate/',
              data:params,
              success(data){
                  message[data.getret === 0 ? 'success':'error'](data.getmsg);
                  s.setState({
                    modpostDialogVisible:false
                  });
                  s.bindNewdata();
              }
            }); */
        }
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

 
    //弹出新增加时
    seasonform(){
        var s=this;
        this.currentId=-1;
        this.setState({
            modpostDialogVisible:true,
        })
        console.log(this.currentId,'currentId');
    }


}

export default ZmitiValidateUser(ZmitwxWmwGroupApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/