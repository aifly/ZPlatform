import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Icon  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiRepertoryListApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:0,
			mainHeight:document.documentElement.clientHeight-50,
      tags:['共享','公司','个人'],
			uploadData:[],//上传图片
      imgsData:[],//库里图片
      imgsNum:0,//图片数量
		};		
	}
	render() {
		var s =this; 
    var title = this.props.params.title || '元素库';
    let props={
      userid:this.userid,
      changeAccount:this.changeAccount.bind(this),
      tags:this.state.tags,
      mainHeight:this.state.mainHeight,
      title:title,
      type:'workorder-1',
      selectedIndex:this.state.selectedIndex,
      rightType:"custom",
      customRightComponent:<div className='repertorylist-main-ui' style={{height:this.state.mainHeight}}>
        <div className='pad-10'>
          <div className="zmiti-repertorylist-header">
              <Row>
                  <Col span={8} className="zmiti-repertorylist-header-inner">共享</Col>
                  <Col span={8} offset={8} className='zmiti-repertorylist-button-right'>
                    <div className="repertoryUpBtn">
                      <Button type="primary" icon="upload" size="default">上传</Button>
                      <input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  />
                    </div>
                    <div className="clear"></div>
                    
                     
                  </Col>
              </Row>                      
          </div>
          <div className="zmiti-repertorylist-line"></div>
          <div className="hr20"></div>
          <div className="repertorylist-column">
              
              <div className="repertorylist-picList" ref="acc-scan-C">
                  <ul className="repertorylist-imgs">
                        {
                          this.state.imgsData.map((item,i)=> {
                            return(
                                <li key={i}>
                                  <div className="repertorylist-pics"><img src={item.src}/></div>
                                  <Button shape="circle" icon="delete" onClick={this.delImg.bind(this,item.id)} />
                                  <div className="repertorylist-size">{item.storageSize}（{item.size}）</div>
                                </li>
                            )
                          })
                        }
                  
                  </ul>

              </div>
              <div className="clear"></div>
          </div> 
          
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


	componentDidMount() {
		var s=  this;
		s.getPersonalImg();
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
      //this.bindNewdata();
      //console.log(this.state.selectedIndex);
    }

    //上传
    uploadFile(){
      var userid = this.props.params.userid?this.props.params.userid:this.userid;
        let formData = new FormData(),
            s = this;
        formData.append('userid',s.userid);
        formData.append('getusersigid',s.getusersigid);
        formData.append('setuploadtype','0');
        formData.append('setdatainfoclassid','1465782065');
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
        $.ajax({
            url: window.baseUrl + 'datainfoclass/get_datainfo/',
            type:window.ajaxType || 'get',
            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setdatainfoclassid:1465782065,
                setdatainfotype:0
            },
            success(data){
              //console.log(data,"图片列表");
              s.state.imgsData=data.allImgs;
              s.state.imgsNum=data.allImgs.length;
              s.forceUpdate();
            }
        })
    }
    //del图片
    delImg(imgid){
      var s=this;
      //console.log(imgid);
        $.ajax({
            url: window.baseUrl + 'datainfoclass/resource_del/',
            type:window.ajaxType || 'get',
            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setdatainfoid:imgid,
            },
            success(data){
              if(data.getret === 0){
              //  console.log(data,"删除成功！");
                s.getPersonalImg();
                s.forceUpdate();
              }
            }
        })
    }



}

export default ZmitiValidateUser(ZmitiRepertoryListApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/