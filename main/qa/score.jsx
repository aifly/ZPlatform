import React, { Component } from 'react';

import { Table,Row,Col,Input,Button,Popconfirm,Tooltip ,Icon,Modal } from '../commoncomponent/common.jsx';

import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';

import {Link} from 'react-router';

import './static/css/score.css';

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';



class ZmitiQAScoreApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mainHeight:document.documentElement.clientHeight - 50,
			isEntry:0,
			showTitle:false,
			dataSource:[],

		}; 
	}


	render() {


		var s = this;
		const columns = [{
            title: '序号',
            dataIndex: 'key',
            width:80,
            key: 'xx',                         
            render:(value,recorder,index)=>{
                return <div>{index+1}</div>
            }
        },{
            title: '昵称',           
            dataIndex: 'username',
            key: 'username',
        },{
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width:200,

        },{
            title: '操作',
            dataIndex: '',
            key: '',
            width:160,
            render:(text,recoder,index)=>(
                <span><Button>删除</Button></span>              
            )
        }]





		var component = <div className="qa-main-ui qa-score-main-ui">
				<div className='pad-10'>
                    <div className="zmiti-qa-score-header">
                        <Row>
                            <Col span={8} className="zmiti-qa-score-header-inner">得分统计</Col>
                            <Col span={8} offset={8} className='zmiti-qa-score-button-right'><Button type="primary" onClick={this.goback.bind(this)}><Icon type="left" />返回</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-qa-score-line"></div>
                    <Row>
                        <Col span={18} >
                            <Row>
                                <Col span={18} className="zmiti-training-inputext" style={{width:250}}>
                                    
                                    <Row>
                                        <Col span={14} style={{width:110}}>
                                        </Col>
                                        <Col span={10} style={{width:140}}>
                                            <Input style={{width:138}} placeholder="请输入名称" onChange={this.searchtext.bind(this)} />
                                        </Col>
                                    </Row>                                   
                                </Col>
                                <Col span={6}>
                                    <div className="zmiti-training-serachbtn">
                                        <Button icon="search" onClick={this.searchbtn.bind(this)}>查询</Button>
                                    </div>                                     
                                </Col>
                            </Row>
                        </Col>

                        <Col span={6} className="zmiti-training-count">

                        </Col>
                    </Row>
                    <div className="hr20"></div>
                    <Table rowKey={record => record.autoid}  bordered={true} 
                    dataSource={this.state.dataSource} 
                    columns={columns} />
                </div>


		</div>
		return (
			<MainUI component={component}></MainUI>
		);
	}


    //返回
    goback(){
        window.location='#/qa/'
    }
    //获取数据列表
    bindNewdata(){
        var s=this;
        $.ajax({
            url:window.baseUrl + 'wenming/get_wmclasslist/',
            type:'post',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                console.log(data,'data');
                if(data.getret === 0){
                    s.state.dataSource=data.list;              
                    s.forceUpdate();
                    console.log(this.url);
                }
            }
        });
    }
    //搜索
    searchtext(e){
        var s=this;
        this.setState({
            searchtext:e.target.value
        })
    }
    //search
    searchbtn(){
        var s=this;
        $.ajax({
            url:window.baseUrl + 'wenming/get_wmclasslist/',
            type:window.ajaxType || 'get',
            data:{
                userid:s.userid,
                cityid:s.state.provinceText,
                getusersigid:s.getusersigid,
                username:s.state.searchtext
            },
            success(data){
            	
                if(data.getret === 0){
                    s.state.dataSource=data.list;
                    s.state.loading=false;
                    s.forceUpdate();
                    console.log(this.url)    
                }
            }
        });
        this.state.countNum=this.state.dataSource.length;
        this.forceUpdate();
    }
	//
	modifyTitle(e){
		this.state.data.title = e.target.value;
		this.forceUpdate();
	}









	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;
		this.usertypesign = usertypesign;
	}

	componentDidMount() {

		var s = this;

		window.s = this;

		window.globalMenus.map((item,i)=>{
			
			 if(item.linkTo === '/qa/'){
			 	this.productid = item.productid;//获取当前产品的id;
			 }

		});

		s.bindNewdata();

	}
 
}

export default ZmitiValidateUser(ZmitiQAScoreApp);
