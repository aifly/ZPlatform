import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Cascader,message,Select,Modal,Form,Icon,Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment,Checkbox  } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

import { Link } from 'react-router';

import MainUI from '../components/Main.jsx';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
const FormItem = Form.Item;
import {ZmitiValidateUser} from '../public/validate-user.jsx';
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
import $ from 'jquery';

class ZmitwxWmwReportApp extends Component {

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

    render() {
        
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };



        
        var title = this.props.params.title || '身边文明事儿';

        let props={
            userList:this.state.userList,
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            type:'custom-1',
            tags:['首页','数据审核','评论审核','文明播报','通用设置'],
            mainHeight:this.state.mainHeight,
            title:title,
            selectedIndex: 100,
            rightType: "custom",
            customRightComponent:<div className='wmwreport-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-wmwreport-header">
                        <Row>
                            <Col span={16} className="zmiti-wmwreport-header-inner">数据审核-{this.state.companyname}
                            	<span className='zmiti-wmwreport-status'>
                            		<span><a href='#'>已审</a></span>|<span className='zmiti-wmwreport-curr'><a href='#'>未审</a></span>
                            	</span>
                            </Col>
                            <Col span={8} className='zmiti-wmwreport-button-right'><Button type='primary' icon='upload' onClick={this.seasonform.bind(this)}>上报数据</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-wmwreport-line"></div>
                    <div className='zmiti-wmwreport-tool'>
	                    <span className="zmiti-wmwreport-all">
	                    	<Checkbox onChange={onChange}>全选</Checkbox>
	                    </span>
	                    <span className="zmiti-wmwreport-allbtn">
		                    <Button icon="delete">删除</Button>
		                    <Button icon="check">通过审核</Button>
		                    <Button icon="close">拒绝</Button>
	                    </span>
	                    <div className="zmiti-wmwreport-search">
	                    	<span className="zmiti-wmwreport-category">
		                    	<Select defaultValue="0" style={{ width: 100 }}>
							      <Option value="0">-全部-</Option>
							      <Option value="1">好人好事</Option>
							      <Option value="2">身边文明事</Option>
							      <Option value="3">文明播报</Option>
							    </Select>
		                    </span>
	                    	<Search
							    placeholder="内容文字"
							    style={{ width: 200 }}
							    onSearch={value => console.log(value)}
							  />
	                    </div>
	                    <div className='clearfix'></div>
                    </div>
                    <div className="zmiti-wmwreport-list">

                    			<table>
                    				<tbody>
	                    				<tr>
	                    					<td>
	                    						
	                    						<div  className='zmiti-wmwreport-item'>
		                    						<div className='zmiti-wmwreport-con'>
														<div className='zmiti-wmwreport-imgs'>
				                    						
				                    							<img src="http://img2.duitang.com/uploads/item/201201/03/20120103124956_KtWQG.thumb.600_0.jpg" className="zmiti-wmwreport-face"/>
				                    							
				                    						
			                    						</div>
			                    						<div className="zmiti-wmwreport-username">驹萌宝</div>

			                    						<div className='zmiti-wmwreport-del'><Button icon="edit">编辑</Button><Button icon="delete">删除</Button></div>
			                    						<div className='clearfix'></div>
			                    						<div className="zmiti-wmwreport-des"><span className="zmiti-wmwreport-type">#好人365#</span>王金清是内蒙古包头黄河岸边一名普通的农民，从17岁时第一次下水救人，他就再也没有停下来，至今已救出180多条生命。每年黄河开河、封河时，他披星带月、风雨无阻地义务巡堤、帮人救人。2013年4月，王金清将黄河边附近的6位村民组织起来，成立了内蒙古首支黄河水上民间救援队——“王三黄河水上救援队”。从此，一群朴实的农民，在黄河岸边竖起了一面生命的安全屏障。<span className='zmiti-wmwreport-open'>展开全文<Icon type="down" /></span></div>
			                    						<div>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx1.sinaimg.cn/mw690/7e56f833ly1fgzgzr8b8sj20jg0db77i.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx3.sinaimg.cn/mw690/7e56f833gy1fh0lfheq9rj20go0b4n03.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx3.sinaimg.cn/mw690/7e56f833gy1fhfn3jr0n4j20jg0cyn07.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx4.sinaimg.cn/mw690/7e56f833ly1fh7joa9r84j20jg0ifgoj.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx1.sinaimg.cn/mw690/7e56f833ly1fh9v7e1kw5j20jg0czq7g.jpg'/>
			                    						
			                    						</div>
		                    						</div>
		                    						<div className='clearfix'></div>
		                    						<div className='zmiti-wmwreport-act'>
		                    							<div className='zmiti-wmwreport-check'>		                    								
		                    								<Checkbox onChange={onChange}>选择</Checkbox>
		                    							</div>
		                    							<div className='zmiti-wmwreport-left'>
			                    							<span className='zmiti-wmwreport-time'>2017年7月6日 08:36</span>
			                    							<Button icon="video-camera">查看视频</Button>
		                    							</div>
		                    							<div className='zmiti-wmwreport-right'>
		                    								<Button className='zmiti-wmwreport-message' icon="message">查看评论（10001）条</Button>
		                    							</div>
		                    							<div className='clearfix'></div>
		                    						</div>
	                    						</div>
	                    					</td>
	                    					
	                    				</tr>
	                    				<tr>
	                    					<td>
	                    						
	                    						<div  className='zmiti-wmwreport-item'>
		                    						<div className='zmiti-wmwreport-con'>
														<div className='zmiti-wmwreport-imgs'>
				                    							<img src="http://img2.duitang.com/uploads/item/201201/03/20120103124956_KtWQG.thumb.600_0.jpg" className="zmiti-wmwreport-face"/>
			                    						</div>
			                    						<div className="zmiti-wmwreport-username">驹萌宝</div>
			                    						<div className='zmiti-wmwreport-del'><Button icon="edit">编辑</Button><Button icon="delete">删除</Button></div>
			                    						<div className='clearfix'></div>
			                    						<div className="zmiti-wmwreport-des"><span className="zmiti-wmwreport-type">#好人365#</span>王金清是内蒙古包头黄河岸边一名普通的农民，从17岁时第一次下水救人，他就再也没有停下来，至今已救出180多条生命。每年黄河开河、封河时，他披星带月、风雨无阻地义务巡堤、帮人救人。2013年4月，王金清将黄河边附近的6位村民组织起来，成立了内蒙古首支黄河水上民间救援队——“王三黄河水上救援队”。从此，一群朴实的农民，在黄河岸边竖起了一面生命的安全屏障。<span className='zmiti-wmwreport-open'>展开全文<Icon type="down" /></span></div>
			                    						<div>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx1.sinaimg.cn/mw690/7e56f833ly1fgzgzr8b8sj20jg0db77i.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx3.sinaimg.cn/mw690/7e56f833gy1fh0lfheq9rj20go0b4n03.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx3.sinaimg.cn/mw690/7e56f833gy1fhfn3jr0n4j20jg0cyn07.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx4.sinaimg.cn/mw690/7e56f833ly1fh7joa9r84j20jg0ifgoj.jpg'/>
			                    							<img className='zmiti-wmwreport-thumbnail' src='http://wx1.sinaimg.cn/mw690/7e56f833ly1fh9v7e1kw5j20jg0czq7g.jpg'/>
			                    						
			                    						</div>
		                    						</div>
		                    						<div className='clearfix'></div>
		                    						<div className='zmiti-wmwreport-act'>
		                    							<div className='zmiti-wmwreport-check'>
		                    								<Checkbox onChange={onChange}>选择</Checkbox>
		                    							</div>
		                    							<div className='zmiti-wmwreport-left'>
			                    							<span className='zmiti-wmwreport-time'>2017年7月6日 08:36</span>
			                    							<Button icon="video-camera">查看视频</Button>
		                    							</div>
		                    							<div className='zmiti-wmwreport-right'>
		                    								<Button className='zmiti-wmwreport-adopt' icon="check-circle">通过审核</Button>
		                    								<Button className='zmiti-wmwreport-refuse' icon="close-circle">拒绝</Button>
		                    							</div>
		                    							<div className='clearfix'></div>
		                    						</div>
	                    						</div>
	                    					</td>
	                    					
	                    				</tr>

                    				</tbody>

                    			</table>

                    </div>
                </div>
                

                  
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
            window.location.hash='wxwmwreport/出差宝/'; //tripost/tripseason       
        }else if(i*1===1){
            window.location.hash='wxwmwreport/';
        }else if(i*1===2){
            window.location.hash='wxwmwreport/';
        }else if(i*1===3){
            window.location.hash='wxwmwreport/';
        }else if(i*1===4){
            window.location.hash='wxwmwreport/';
        }
    }    

    componentDidMount() {
        var s=  this;
        s.bindNewdata();
        s.getCompanydetail();

    }

    componentWillMount() {
        let {resizeMainHeight,validateUser,loginOut,getProductList} = this.props;
        resizeMainHeight(this);         
        let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
        this.userid = userid;
        this.getusersigid = getusersigid;  
        this.getProductList = getProductList;     
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

export default ZmitiValidateUser(ZmitwxWmwReportApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/