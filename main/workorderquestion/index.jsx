import React, { Component } from 'react';

import './static/css/index.min.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';

import {Input,Button, Row, Col,Radio,Layout,Icon,message,Table} from '../commoncomponent/common.jsx';
const { Header, Content } = Layout;
const RadioGroup = Radio.Group;


import { Link } from 'react-router';
import MainUI from '../components/Main.jsx';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import $ from 'jquery';

class ZmitiWorkOrderQuestionApp extends Component {
	constructor(props) {
		/*action:window.baseUrl + 'v2/upload/upload_file/',
			onChange({ file, fileList }){
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }}*/
		super(props);
		
		this.state = {

            mainHeight:document.documentElement.clientHeight - 50,
            uploadData:[],
			massagedefaultValue:0,
			questionContent:"",
            mobile:"",
			email:"",
            workordertype:"",
            workordername:"",
            questionError:false,
            mobileError:false,



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
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount,
            tags:['我的工单','提交工单'],
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:1,
            rightType:"custom",
            customRightComponent:<div className="workorderquestion-main-ui padding-10">
				<Row className='zmiti-workorder-header'>
					<Col span={8}  className='zmiti-workorder-header-inner' >提交工单</Col>
					<Col span={8} offset={8} className='zmiti-workorder-button-right'><Button type='primary' onClick={this.changeAccount.bind(this,1)}>返回工单列表</Button></Col>
				</Row>
				<div className="zmiti-workorder-line"></div>
				<Layout className="workorder-table">
					<Header>咨询类工单问题</Header>
					<Content>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle"><span className="red">*</span> 问题描述:</Col>
							<Col span={17}>
									<Input type="textarea" placeholder="请在此输入您要提交的问题内容，我们将尽快答复" onFocus={()=>{this.setState({questionError:false})}} className={"workorderquestion-inputContent "+ (this.state.questionError?'error-table':'')} value={this.state.questionContent} onChange={e=>{this.setState({questionContent:e.target.value})}}/>
							</Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle"><span className="red">*</span> 手机号:</Col>
							<Col span={17}><Input placeholder="请录入您的手机号" className={"workorderquestion-inputContent2 " + (this.state.mobileError?'error-table':'')}  onFocus={()=>{this.setState({mobileError:false})}} value={this.state.mobile} onChange={e=>{this.setState({mobile:e.target.value})}}/></Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle">接收手机短信提醒:</Col>
							<Col span={17}>
								<RadioGroup onChange={this.getRadioGrouoValue.bind(this)} value={this.state.massagedefaultValue}>
									<Radio value={0}>任何时间</Radio>
									<Radio value={1}>每日09:00--18:00</Radio>
									<Radio value={2}>从不接收</Radio>
								</RadioGroup>
							</Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle"> 邮箱:</Col>
							<Col span={17}><Input placeholder="请录入您的邮箱" className="workorderquestion-inputContent2" value={this.state.email} onChange={e=>{this.setState({email:e.target.value})}}/></Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle">上传附件:</Col>
							<Col span={17} style={{position:'relative'}}>
								<Button>
									<Icon type="upload"  /> 附件上传
								</Button>
								<input ref="upload-file" onChange={this.uploadFile.bind(this)} type="file"  style={{position:'absolute',left:0,top:0,opacity:0,cursor:'pointer'}}/>
                                <Table columns={uploadColumns} dataSource={this.state.uploadData} showHeader={false} />
							</Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>
						<Row gutter={30} className="workorderquestion-row-magin20">
							<Col span={6} className="workorderquestion-inputTitle"></Col>
							<Col span={17}><Button onClick={this.submitWorkorder.bind(this)}>提交</Button></Col>
							<Col span={1} className="workorderquestion-width30"></Col>
						</Row>

					</Content>
				</Layout>
			</div>
		}

		var mainComponent = <div>
			<ZmitiUserList {...props}></ZmitiUserList>
		</div>;
		return (
			<MainUI component={mainComponent}></MainUI>
			);
	}

    getRadioGrouoValue(e){
        this.setState({
            massagedefaultValue: e.target.value,
        });
	}

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

    submitWorkorder(){
        var s=this;
    	var isOk=0;
    	if(s.state.questionContent=="") {
			s.setState({
                questionError:true
			})
            isOk=1
        }
    	if(s.state.mobile==""){
            s.setState({
                mobileError:true
            })
            isOk=1
		}
        if(!(/^1[34578]\d{9}$/.test(s.state.mobile))){
            s.setState({
                mobileError:true
            })
            isOk=1
        }
		if(isOk!=0){
    		return;
		}
		else {

            var setworkordertype = 3;
            if (!isNaN(this.props.params.id * 1)) {//数字
                setworkordertype = this.props.params.id * 1;
            }
            else {//字符串

            }
            var questionContent=s.state.questionContent;

            if(s.state.workordername!=""){
                questionContent=s.state.workordername+"问题 ，"+questionContent;
            }
            //判断是否有附件
            var attachment:"";
            if(s.state.uploadData.length>0) {
                attachment=s.state.uploadData[0].datainfourl;
                for(var i=1;i<s.state.uploadData.length;i++){
                        attachment=attachment + "," +s.state.uploadData[i].datainfourl;
                }
            }

            //附件结束
            $.ajax({

                url: window.baseUrl + 'user/post_workorder',
                type:window.ajaxType || 'get',

                data: {
                    userid: s.userid,
                    getusersigid: s.getusersigid,
                    setcontent: questionContent,
                    setworkordertype: setworkordertype,
                    setusermobile: s.state.mobile,
                    setsmstime: s.state.massagedefaultValue,
                    setuseremail: s.state.email,
                    setattachment:attachment,

                },
                success(data){
                    if (data.getret === 0) {
                        message.success("您已成功提交工单，我们会尽快处理");
                        setTimeout(() => {
                            location.hash = '/commitworkorder/';
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

    delUploadfile(recoder,index){

        var s=this;

        $.ajax({

            url: window.baseUrl + 'user/del_workorderfile/',
            type:window.ajaxType || 'get',

            data: {
                userid: s.userid,
                getusersigid: s.getusersigid,
                setpwd: recoder.setpwd,
                filename: recoder.filename,
            },
            success(data){
                s.state.uploadData.splice(index,1);
                s.forceUpdate();

            }
        })
    }
    changeAccount(i){
        if(i*1===1){
            window.location.hash='commitworkorder/';
        }else if(i*1===0){
            window.location.hash='workorder/';
        }

    }

	componentDidMount() {

        switch(this.props.params.id){

            case "0"://财务类
                this.state.workordertype=0;
                break;
            case "1"://会员帐号类
                this.state.workordertype=1;
                break;
            case "2"://定制服务类
                this.state.workordertype=2;
                break;
            case "3"://产品技术类
                this.state.workordertype=3;
                break;
            case "4"://其它类
                this.state.workordertype=4;
                break;
            default://带具体产品的提问
                this.state.workordertype=3;
                this.state.workordername=this.props.params.id;
                break;
        }
        this.setState({
            mobile:this.usermobile,
            email:this.useremail,
		})
		

	}


	

	componentWillMount() {


		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);
		
		let {userid,getusersigid,usermobile,useremail} = validateUser(()=>{},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.useremail = useremail;
		this.usermobile = usermobile;
	}

}

export default ZmitiValidateUser(ZmitiWorkOrderQuestionApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/