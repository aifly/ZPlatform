import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Icon,Steps,Form , Input,Button, Row, Col,Layout ,Tooltip,Table,message  } from '../commoncomponent/common.jsx';



import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';
const Step = Steps.Step;
const FormItem = Form.Item;
const { Header, Content } = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ZmitiViewQuestionApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
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


		};
	}

	render() {

        const uploadColumns=[{
            title: '上传名称',
            dataIndex: 'filename',
            key: 'filename',
        },{
            title: '文件大小',
            dataIndex: 'datainfosize',
            key: 'datainfosize',
        },{
            title: '文件路径',
            dataIndex: 'datainfourl',
            key: 'datainfourl',
            className:'hidden',
        }, {
            title: '文件密码',
            dataIndex: 'setpwd',
            key: 'setpwd',
            className:'hidden',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,recoder,index)=>(
				<span className="workorder-del"><a href="javascript:void(0);" onClick={this.delUploadfile.bind(this,recoder,index)}> 删除</a></span>
            )
        },
        ];

        var title = this.props.params.title || '服务支持中心';

        let props= {
            userid: this.userid,
            changeAccount: this.changeAccount.bind(this),
            tags: ['我的工单', '提交工单'],
            mainHeight: this.state.mainHeight,
            title: title,
            type: 'workorder-1',
            selectedIndex: 0,
            rightType: "custom",
            customRightComponent:
				<div className="view-qestion-main-ui padding-10" >
					<Row className='zmiti-workorder-header'>
						<Col span={8}  className='zmiti-workorder-header-inner' >工单详情</Col>
						<Col span={8} offset={8} className='zmiti-workorder-button-right'><Button type='primary' onClick={this.changeAccount.bind(this,0)}>返回列表</Button></Col>
					</Row>
					<div className="zmiti-workorder-line"></div>
					<div className="hr10"></div>
					<div className="hr10"></div>
						<Steps current={this.state.status*1}>
							<Step title="已受理"  icon={<Icon type="user"/>} />
							<Step title="已处理"  icon={<Icon type="solution"/>}/>
							<Step title="已确认"  description={this.state.getTimestr} icon={<Icon type="save"/>}/>
							<Step title="已评价"  icon={<Icon type="smile-o" />}/>
						</Steps>
						<div className="hr10"></div>

						<div className="view-questionInfo">
							<div className="gutter-example">
								<Row>
									<Col span={24}><span className="questionTitle">问题标题：</span>{this.state.content}</Col>
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
														{item.workordertype === 1 && this.username}
                                                        <p>问题描述：{item.content}</p>
                                                        <p>{item.operatime}</p>
                                                        <p><a href={item.attachment}> {item.attachment}</a></p>
                                                    </div>
                                                </li>
                                            )
                                            })
                                        }


										<li>
											<div className="view-faceIco">
												{this.state.usericon &&<img src={this.state.usericon}/>}
											</div>
											<div className="view-Infor">
												<p>{this.username}</p>
												<p>问题描述：{this.state.content}</p>
												<p>{this.state.createtime}</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</Content>
					</Layout>
					<div className="hr10"></div>
                    <Layout className={"workorder-table "+ (this.state.isHidden?'hidden':'')}>

						<Header>{this.state.getworkordername}</Header>
						<Content>
						<div className="view-questionPane">
							<div className="view-questionForm">
								<Form>
									<div className="view-tit-label">留言</div>
									<Input type="textarea" placeholder="此处限定5000字符" onFocus={()=>{this.setState({questionError:false})}} className={"workorderquestion-inputContent "+ (this.state.questionError?'error-table':'')} value={this.state.questionContent} onChange={e=>{this.setState({questionContent:e.target.value})}}/>
									<div className="hr10"></div>
									<div style={{position:'relative'}}>
										<Button>
											<Icon type="upload"  /> 附件上传
										</Button>
										<input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  style={{position:'absolute',left:0,top:0,opacity:0,cursor:'pointer'}}/>
										<Table columns={uploadColumns} dataSource={this.state.uploadData} showHeader={false} />
									</div>
									<p>
										<Button
											type="primary"
											htmlType="submit"
											onClick={this.submitWorkorder.bind(this)}
										>提交</Button>
									</p>
								</Form>
							</div>
						</div>
						</Content>
					</Layout>
				</div>

        }


		var mainComponent =
			<ZmitiUserList {...props}></ZmitiUserList>

		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

    changeAccount(i){
        if(i*1===1){
            window.location.hash='commitworkorder/';
        }else if(i*1===0){
            window.location.hash='workorder/';
        }
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
                    s.filterStatus();
                	s.state.workordertype=data.workinfo.workordertype;
                    s.getuserinfo();

                    s.getworkordername();
                    s.forceUpdate();

                }
			}

		})
        s.getworkorderlist();
		

	}
//获取用户信息
	getuserinfo(){
    	var s=this;
    	$.ajax({
            url:window.baseUrl+'user/get_userdetails/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                setuserid:s.userid,
            },
            success(data){
                if(data.getret === 0){
                	s.state.usericon=data.getuserinfo.portrait;
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
                if(data.getret === 0){
                    //data.workinfo.operainfo[0].key = s.props.randomString(8);
                    s.state.workeorderinfo=data.workinfo.operainfo;
                    console.log(s.state.workeorderinfo);
                    s.forceUpdate();
                }
               /* else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    loginOut(data.getmsg,window.loginUrl,false);
                }*/
            }

		})

	}
	//上传附件
    uploadFile(){//上传附件

        let formData = new FormData(),
            s = this;
        formData.append('setupfile', this.refs['upload-file'].files[0]);
        formData.append('uploadtype', 2);

        $.ajax({
            url:window.baseUrl+ 'share/upload_file',
            type:'post',
            data:formData,
            contentType: false,
            processData: false,
            success(data){
                data.getfileurl[0].key = s.props.randomString(8);
                s.state.uploadData.push(data.getfileurl[0]);
                s.forceUpdate();
            }
        })
    }
    //删除附件
    delUploadfile(recoder,index){

        var s=this;

        $.ajax({

            url: window.baseUrl + 'user/del_workorderfile/',

            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setpwd: recoder.setpwd,
                filename: recoder.filename,
            },
            success(data){
                if (data.getret === 0) {
                    message.success("成功删除！");
                    s.state.uploadData.splice(index,1);
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
            case 4:
                s.state.statusName=<span className="red">请您反馈</span>;
                s.state.getTimestr="总计花时：" + s.state.totalminu + "分钟!";
                s.setState({
                    isHidden:true
                });
                s.state.orderoperation="关闭工单";
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
//追加工单问题
    submitWorkorder(){
        var s=this;
        var isOk=0;

        if(s.state.questionContent=="") {
            s.setState({
                questionError:true
            })
            isOk=1
        }
        if(isOk!=0){
            return;
        }
        else {
            //判断是否有附件

            //判断是否有附件
            var attachment:"";
            if(s.state.uploadData.length>0) {
                attachment=s.state.uploadData[0].datainfourl;
                for(var i=1;i<s.state.uploadData.length;i++){
                    attachment=attachment + "," +s.state.uploadData[i].datainfourl;
                }
            }

            //以下是存数组方式


            /*if(s.state.uploadData.length>0) {
                for(var i=0;i<s.state.uploadData.length;i++){
                    s.state.attachmentarr.push(s.state.uploadData[i].datainfourl);
                }
            }
            console.log(s.state.attachmentarr);*/
            //附件结束
            $.ajax({
                url: window.baseUrl + 'user/opera_workorder',
                type:'post',
                data: {
                    userid: s.userid,
                    getusersigid: s.getusersigid,
                    setworkorderid:s.state.workorderid,
                    setcontent: s.state.questionContent,
                    setattachment:attachment,
                    setoperatype:1,
                },
                success(data){
                    if (data.getret === 0) {
                        message.success("您已成功提交工单，我们会尽快处理");
                        setTimeout(() => {
                            location.hash = 'workorder/';
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
	

	componentWillMount() {


		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);
		
		let {username,userid,getusersigid} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.username=username;

		
	}

}

export default ZmitiValidateUser(ZmitiViewQuestionApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/