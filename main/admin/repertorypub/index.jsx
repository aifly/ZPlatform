import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment  } from '../../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
let FormItem  = Form.Item;
let Option = Select.Option;

import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../../public/validate-user.jsx';


import $ from 'jquery';

class ZmitiRepertoryPubApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
      tags:[],      
      modpostDialogVisible:false,
			uploadData:[],//上传图片
      imgsData:[],//库里图片
      imgsNum:0,//图片数量
      datatype:0,
      voiceurl:'',
      dataList:[],
      dataSource:[],//分类数据
      workdatatype:'',//分类id
      workdataid:'',
      keyword:'',
      disabled:false,
      editable: false,
      value: this.props.value,
      inputVisible: false,
      inputValue: '',
      typeid:'',//'当前分类id'
		};		
	}
  handleInputChange(e){
      this.setState({ inputValue: e.target.value });
  }
  editInput(e){
      var s=this;
      const value = e.target.value;
      const alt = e.target.alt;
      const state = this.state;
      let tags = state.tags;
      s.setState({ 
          value
      });
      s.setState({ tags });
      s.forceUpdate();
      //console.log(alt,"editInput",tags)
  }
	render() {
		var s =this;
    const { tags, inputVisible, inputValue } = this.state;
    const { value, editable } = this.state;
    var title = this.props.params.title || '素材云盘';

    let props={
      userid:this.userid,
      changeAccount:this.changeAccount.bind(this),
      tags:this.state.tags,
      mainHeight:this.state.mainHeight,
      title:title,
      type:'workorder-1',
      selectedIndex:this.state.selectedIndex,
      rightType:"custom",
      customRightComponent:<div className='repertorypub-main-ui' style={{height:this.state.mainHeight}}>
        <div className='pad-10'>
          <div className="zmiti-repertorypub-header">
              <Row>
                  <Col span={8} className="zmiti-repertorypub-header-inner">公共资料库</Col>
                  <Col span={8} offset={8} className='zmiti-repertorypub-button-right'>
                    <div className="repertoryUpBtn">
                      <Button type="primary" icon="upload" size="default">上传</Button>
                      <input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  />
                    </div>
                    <Button icon="folder-add" onClick={this.dialogform.bind(this)}>分类管理</Button>
                    <div className="clear"></div>
                    
                   
                     
                  </Col>
              </Row>                      
          </div>
          <div className="zmiti-repertorypub-line"></div>
          <div className="hr20"></div>
          <div className="repertorypub-column">
              
              <div className="repertorypub-picList" ref="acc-scan-C">
                  <ul className="repertorypub-imgs">
                        {
                          this.state.imgsData.map((item,i)=> {
                            return(
                                <li key={i}>
                                  <div className="repertorypub-pics"><img src={item.src}/></div>
                                  <Button shape="circle" icon="delete" onClick={this.delImg.bind(this,item.id)} />
                                  <div className="repertorypub-size">{item.storageSize}（{item.size}）</div>
                                </li>
                            )
                          })
                        }
                  
                  </ul>

              </div>
              <div className="clear"></div>
          </div> 
          
        </div>
        <Modal title="素材分类" visible={this.state.modpostDialogVisible}
              onOk={this.addProduct.bind(this)}
              onCancel={()=>{this.setState({modpostDialogVisible:false})}}
          >
            <div className="inforListModal">
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                   <Input type="text" 
                    ref={this.editInputRef}
                    className="inforlistCategoryIpt" 
                    defaultValue= {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    onChange={this.editInput.bind(this)}
                    onBlur={this.saveinput.bind(this)}
                    
                    alt={index}
                   />
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text" size="small"
                  style={{ width: 110 }}
                  value={inputValue}
                  onChange={this.handleInputChange.bind(this)}
                  onBlur={this.handleInputConfirm.bind(this)}
                  onPressEnter={this.handleInputConfirm.bind(this)}
                />
              )}
              {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加分类</Button>}
            </div>
          </Modal>
      </div>
    }
		var mainComponent = <div>
      <ZmitiUserList {...props}></ZmitiUserList>
    </div>;
    return (
      <MainUI component={mainComponent}></MainUI>
    );
	}


	componentDidMount() {
		var s=  this;
		s.getPersonalImg();
    s.getcategory();
	}	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

    changeAccount(i){       
      this.state.selectedIndex = i*1;
      this.state.keyword = '';
      this.forceUpdate();
      if(i===0){
        window.location='#/repertorypub/'+'2093f57c-c147-fea8-993d-593bb1d4df1a';

      }else if(i===1){
        window.location='#/repertorypub/'
      }else{
        window.location='#/repertorypub/'
      }
      //console.log(this.state.selectedIndex);
    }

    //上传
    uploadFile(){
      var userid = this.props.params.userid?this.props.params.userid:this.userid;
      var datainfoclassid=this.props.params.id || 1465782065;
        let formData = new FormData(),
            s = this;
        formData.append('userid',s.userid);
        formData.append('getusersigid',s.getusersigid);
        formData.append('setuploadtype','0');
        formData.append('setdatainfoclassid',datainfoclassid);//datainfoclassid
        formData.append('setupfile', this.refs['upload-file'].files[0]);       
        $.ajax({
          url:window.baseUrl+ 'upload/upload_file',
          type:'POST',
          data:formData,
          contentType: false,
          processData: false,
          success(data){
            if(data.getret===0){
              console.log(data);
              s.getPersonalImg();
              s.forceUpdate();
            }                            
          }
        })
    }
    //获取图片
    getPersonalImg(){
        var s=this;
        var datainfoclassid=this.props.params.id;
        //console.log(datainfoclassid);
        $.ajax({
            url: window.baseUrl + 'datainfoclass/get_datainfo/',
            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setdatainfoclassid:datainfoclassid || 1465782065,//1465782065
                setdatainfotype:0
            },
            success(data){
              console.log(data,"图片列表");
              s.state.imgsData=data.allImgs;
              s.state.imgsNum=data.allImgs.length;
              s.forceUpdate();
            }
        })
    }
    //del图片
    delImg(imgid){
      var s=this;
      console.log(imgid);
        $.ajax({
            url: window.baseUrl + 'datainfoclass/resource_del/',
            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setdatainfoid:imgid,
            },
            success(data){
              if(data.getret === 0){
                console.log(data,"删除成功！");
                s.getPersonalImg();
                s.forceUpdate();
              }
            }
        })
    }

    //获取分类
    getcategory(){
      var s=this;
      $.ajax({
        type:'POST',
        url:window.baseUrl+'datainfoclass/get_datainfoclass/',
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid,
        },
        success(data){
          if(data.getret===0){
            console.log(data,'get_documentclasslist')
            var typename=new Array();
            $.each(data.getdatainfoclass,function(i,item){
              if(item.parentid==1465782065){
                typename.push(item.classname);
              }
            })      
            s.state.tags=typename;
            s.state.dataSource=data.getdatainfoclass;
            //console.log(s.state.dataSource,'s.state.dataSource');
            s.forceUpdate();
          }else{
            console.log(this.url,'error:get_documentclasslist')
          }
        }
      })
    }
    //add category
    addProduct(){
      var s=this;
      this.setState({
        modpostDialogVisible:false,
      })
      s.forceUpdate();
    }
    //dialog
    dialogform(){
      var s=this;
      this.setState({
            modpostDialogVisible:false,
      })
      window.location="#/categoryrepertory/";
      s.forceUpdate();
    }
    //添加分类
    handleInputConfirm(){
      var s=this;
      const state = this.state;
      const inputValue = state.inputValue;
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }

      //add
      $.ajax({
        type:'POST',
        url:window.baseUrl+'datainfoclass/add_class_info',//接口地址
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid,
          typename:inputValue,
        },
        success(data){
          if(data.getret === 0){
              //state
              s.setState({
                tags,
                inputVisible: false,
                inputValue: '',
              }); 
              s.getcategory();                
              s.forceUpdate();                  
          }
        }
      })

    }
    //编辑
    saveinput(e){
        var s=this;
        const value = e.target.value;//名称
        const autoid = e.target.alt;//序号
        const state = this.state;
        let tags = state.tags;
        s.setState({ 
          value
        });
        var selectedIndex=s.state.selectedIndex;
        //获取id
        $.each(this.state.dataSource,function(i,item){        
          if(i===parseInt(autoid)){
            s.state.workdatatype=item.workdatatype;
            s.state.tags[i]=value;
           
            //提交
           $.ajax({
              type:'GET',
              url:window.baseUrl+'document/edit_documentclass',//接口地址
              data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                workdatatype:s.state.workdatatype,
                typename:value,
              },
              success(data){
                if(data.getret === 0){
                  //console.log(s.state.tags,'修改成功！');
                  s.getcategory();
                  s.forceUpdate();
                }
              }
            }) 
          }

        })
  
    }
    //删除
    delData(workdataid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        
        $.ajax({
            url:window.baseUrl+'document/del_document/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                documentid:workdataid,
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

}

export default ZmitiValidateUser(ZmitiRepertoryPubApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/