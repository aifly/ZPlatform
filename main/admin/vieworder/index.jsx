import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import {Input, message,Select,Row, Col,Layout,Button,Steps,Form,Icon,Tooltip  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
const Step = Steps.Step;
const { Header, Content } = Layout;
 class ZmitiViewOrderApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			uploadData:[],
			workorderid:"",
			content:"",
			createtime:"",
			status:"",
            workordertype:"",
            workordername:"",
            totalminu:"",
			statusName:"",
            getTimestr:"",
			usericon:"",
            questionContent:"",
            isHidden:false,
			orderoperation:"",
            workeorderinfo:[],
            setuserid:'',
            customername:'',
		};

		this.condition = 0;
		
	}
	render() {
		var title = '工单管理';
		let props={
			userid: this.userid,			
			changeAccount:this.changeAccount,
			mainHeight:this.state.mainHeight,
			tags:['处理中','已处理'],
			type:'vieworder',
			title:title,
			selectedIndex:1,
			rightType:"custom",
            customRightComponent:<div className="zmiti-vieworder-main-ui">
            	<div className="pad-10">
					<Row className='zmiti-vieworder-header'>
						<Col span={8}  className='zmiti-vieworder-header-inner' >工单详情</Col>
						<Col span={8} offset={8} className='zmiti-workorder-button-right'><Button type='primary' onClick={this.changeAccount.bind(this,1)}>返回列表</Button></Col>
					</Row>
					<div className="zmiti-workorder-line"></div>
					<div className="hr10"></div>
					<div className="hr10"></div>
					<Steps current={this.state.status*1}>
						<Step title="已受理"  icon={<Icon type="user"/>} />
						<Step title="已处理"  icon={<Icon type="solution"/>}/>
						<Step title="已确认"  icon={<Icon type="save"/>}/>
						<Step title="已评价"  icon={<Icon type="smile-o" />}/>
					</Steps>
					<div className="hr10"></div>
					<div className="view-questionInfo">
						<div className="gutter-example">
							<Row>
								<Col span={24}><span className="questionTitle">问题描述：</span>{this.state.content}</Col>
							</Row>
							<Row>
								<Col span={6}>
									<span className="questionTitle">工单编号：</span>{this.state.workorderid}
								</Col>
								<Col span={6}>
									<span className="questionTitle">提交时间：</span>{this.state.createtime}
								</Col>
								<Col span={6}>
									<span className="questionTitle"> 状态：</span>{this.state.statusName}
								</Col>
								<Col span={6}>
                                        <div className="text-right"><a href="javasctip:void(0);" onClick={this.getorderoperation.bind(this)} >{this.state.orderoperation}</a></div>
                                </Col>
							</Row>
						</div>
					</div>
					<div className="hr10"></div>
					<Layout className="workorder-table">
						<Header>{this.state.getworkordername}</Header>
						<Content>
							<div className="view-questionPane">
								<div className="view-questionLists">
									<ul>
										<li>
                                            <div className="view-faceIco">
                                            	<img src={this.state.usericon}/>
                                            </div>
                                            <div className="view-Infor">
                                                <div>{this.state.customername}</div>
                                                <div>问题描述：{this.state.content}</div>
                                                <div>                                                
                                                	
                                                </div>
                                                <div>{this.state.createtime}</div>
                                            </div>
                                        </li>
										{

                                            this.state.workeorderinfo.map((item,i)=> {

                                            return(
                                                <li key={i}>
                                                    <div className="view-faceIco">
                                                    	{item.workordertype === 0 && <img src={'./static/images/notify.jpg'}/>}
                                                        {item.workordertype === 1 && <img src={this.state.usericon}/>}
                                                    </div>
                                                    <div className="view-Infor">
                                                        {item.workordertype === 0 && '管理员回复'}
                                                        {item.workordertype === 1 && this.state.customername}
                                                        <p>问题描述：{item.content}</p>
                                                        <p>{item.operatime}</p>
                                                        <p>
                                                        {item.attachment && item.attachment.split(',').map((atta,i)=>{
                                                        	return <a key={i} href={atta} title={atta}> {/*atta.split('/').pop()*/}点击下载</a>
                                                        })}
                                                        
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                            })
                                        }
										
                                        
                                        
									</ul>
								</div>
							</div>
						</Content>
					</Layout>


				</div>
		</div>
			
      }	

    //console.log(this.state.mainHeight);
		var mainComponent =
		<ZmitiUserList {...props}></ZmitiUserList>

		return (
			<MainUI component={mainComponent}></MainUI>
		);
	}

    changeAccount(i){
        if(i*1===0){
            window.location.hash='#/listorder/工单管理';
        }else if(i*1===1){
            window.location.hash='#/listorder/工单管理';
        }
    }

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
    	//*获取指定工单的所有信息
        var workorderid=this.props.params.id;

        var s=this
		$.ajax({
            url:window.baseUrl+'user/view_workorder',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setworkorderid:workorderid,
			},
            success(data){
            	
                if(data.getret === 0){
                	s.state.workorderid=data.workinfo.workorderid;
                	s.state.content=data.workinfo.content;
                	s.state.createtime=data.workinfo.createtime;
                	s.state.status=data.workinfo.status;
                    s.state.totalminu=data.workinfo.totalminu;
                    s.state.operauser=data.workinfo.userid;
                    s.filterStatus();
                	s.state.workordertype=data.workinfo.workordertype;
                    s.getuserinfo(data.workinfo.userid);//工單用戶信息                    
                    s.getworkordername();
                    s.forceUpdate();
                }
			}

		})
        s.getworkorderlist();
	}
	//获取用户信息
	getuserinfo(inputValue){
    	var s=this;

    	$.ajax({
            url:window.baseUrl+'user/get_userdetails/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                isonly:1,
                setuserid:inputValue,
            },
            success(data){
                if(data.getret === 0){
                    s.state.customername=data.getuserinfo.customername;//名称
                	s.state.usericon=data.getuserinfo.usericon;//头像
                    s.forceUpdate();
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    loginOut(data.getmsg,window.loginUrl,false);
                }
			}
		})
        return inputValue

	}
	//获取工单详细列表（本次工单的所有对话）
	getworkorderlist(){
		var s = this;
		$.ajax({
            url:window.baseUrl+'user/view_workorder',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setworkorderid:s.props.params.id,
            },
			success(data){
				console.log(data)
                if(data.getret === 0){
                    s.state.workeorderinfo=data.workinfo.operainfo;
                    s.state.setuserid=data.workinfo.operainfo[0].operauser;
                    s.forceUpdate();
                }
            }

		})

	}
	//获取工单类型名称
    getworkordername(){
		var s=this;
        switch (s.state.workordertype) {
            case 0:
                s.state.getworkordername="财务类工单问题";
                break;
            case 1:
                s.state.getworkordername="会员帐号类工单问题";
                break;
            case 2:
                s.state.getworkordername="定制服务类工单帐号问题";
                break;
            case 3:
                s.state.getworkordername="产品技术类工单问题";

                break;
            case 4:
                s.state.getworkordername="其它类工单问题";

                break;
        }
	}
	//获取工单状态
	filterStatus(){
    	var s = this;
        switch (s.state.status) {
            case 0:
                s.state.statusName="已受理";
                s.state.orderoperation="关闭工单";
                break;
            case 1:
                s.state.statusName="已处理";
                s.state.orderoperation="关闭工单";
                break;
            case 2:
                s.state.statusName="已确认";
                s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!";
                s.setState({
                    isHidden:true
                });
                s.state.orderoperation="删除工单";
                break;
            case 3:
                s.state.statusName="已评价";
                s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!";
                s.setState({
                    isHidden:true
                });
                s.state.orderoperation="删除工单";
                break;            
        }

       // s.forceUpdate();
	}
	//操作工单状态
    getorderoperation(){
		var s = this;
		if(s.state.orderoperation=="关闭工单"){
            $.ajax({
                url: window.baseUrl + 'user/close_workorder/',
                data: {
                    userid: s.userid,
                    getusersigid: s.getusersigid,
                    setworkorderid:s.state.workorderid,
                },
                success(data){
                    if (data.getret === 0) {
                        message.success("关闭工单成功");
                        s.state.orderoperation="删除工单";
                        s.setState({
                            isHidden:true
                        });
                        s.forceUpdate();
                    }
                    else if (data.getret === -3) {
                        message.error('您没有访问的权限,2秒后跳转到首页');
                        setTimeout(() => {
                            location.href = '/';
                        }, 2000)
                    }
                    else {
                        message.error(data.getmsg);
                    }
                }
            })
		}
		if(s.state.orderoperation=="删除工单"){
            $.ajax({

                url: window.baseUrl + 'user/del_workorder/',

                data: {
                    userid: s.userid,
                    getusersigid: s.getusersigid,
                    setworkorderid: s.state.workorderid,

                },
                success(data){
                    if (data.getret === 0) {
                        message.success("删除工单成功");
                        setTimeout(() => {
                            window.location.hash='workorder/';
                        }, 2000)

                    }
                    else if (data.getret === -3) {
                        message.error('您没有访问的权限,2秒后跳转到首页');
                        setTimeout(() => {
                            location.href = '/';
                        }, 2000)
                    }
                    else {
                        message.error(data.getmsg);
                    }
                }
            })
		}

	}
	
}
export default ZmitiValidateUser(ZmitiViewOrderApp);
/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/