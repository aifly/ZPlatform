import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment,Spin } from '../commoncomponent/common.jsx';
let Option = Select.Option;
let Search = Input.Search;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import $ from 'jquery';
 class ZmitiViewBookListApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			loading:false,
            tip:'数据拉取中...',
      		selectedIndex:0,
      		bookIndex:0,
      		searchtype:0,
      		searchtext:'',
      		tags:['全部'],
      		keyword:'',
      		booktypeList:[],
      		workdatatype:0,
			dataSource:[

			],
		};
		this.condition = 0;
	}
	render() {

		var title = this.props.params.title || '书本列表';
		const columns=[{
            title:"序号",
            dataIndex:'key',
            key:'xx',
            width:80,
            filterIcon:true,
            render:(value,recorder,index)=>{
                return <div className="zmiti-viewcustombooklist-key">{index+1}</div>;
            }
        },{
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '二维码',
            dataIndex: 'qrcodeurl',
            key: 'qrcodeurl',
            width:120,
            filterIcon:true,
            render:(value)=>{
                return <img src={value} />;
            }

        },{
            title: '时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,

        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:80,
            render:(value,recoder,index)=>(
            	<span>
                  <a href={'#/viewcustomuserbook/'+recoder.autoid}>修改</a>
                </span>
            )

        }]
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
			tags:this.state.tags,
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:this.state.selectedIndex,
            rightType:"custom",
            customRightComponent:<Spin tip={this.state.tip} spinning={this.state.loading}><div className='viewcustombooklist-main-ui'>
            	<div className='pad-10'>
            		<div className="zmiti-viewcustombooklist-header">
                        <Row>
                            <Col span={8} className="zmiti-viewcustombooklist-header-inner">书本列表</Col>
                            <Col span={8} offset={8} className='zmiti-viewcustombooklist-button-right'></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-viewcustombooklist-line"></div>
                    <div className="hr20"></div>
                    <Row>
                    	<Col span={8} className="zmiti-viewcustombooklist-search">
                    		<Search
							    placeholder="书名"
							    style={{ width: 200 }}
							    size="default"
							    onSearch={this.searchbtn.bind(this)}
							  />	
                    	</Col>
                    </Row>
                    <div className="hr20"></div>                     
            		<Table bordered={true} 
                          dataSource={this.state.dataSource} 
                          columns={columns} />
            	</div>
            </div>
            </Spin>
        }
        var mainComponent = <div>
          <ZmitiUserList {...props}></ZmitiUserList>
        </div>;
        return (
          <MainUI component={mainComponent}></MainUI>
        );
	}

	componentWillMount() {
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
		var s = this;
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		resizeMainHeight(this,'setAdminHeight');
		s.loadData();
		s.getbooktype();
		s.bindNewdata();

	}
	changeAccount(i){ 
		var s = this;     
		this.state.selectedIndex = i*1;
		this.state.keyword = '';
		this.forceUpdate();
		this.bindNewdata();
		//console.log(this.state.selectedIndex);
	}
	//列表
	bindNewdata(){
		var s=this;
		var wxopenid=s.props.params.id;
		if(s.state.selectedIndex>0){
			
			$.each(s.state.booktypeList,function(m,item){
					if(s.state.selectedIndex-1===m){
						//console.log(item.workdatatype);
						s.state.workdatatype=item.workdatatype;
						$.ajax({
					        type:'POST',
					        url:window.baseUrl+'book/get_booklist/',
					        data:{
					          userid:s.userid,
					          getusersigid:s.getusersigid,
					          datatype:s.state.workdatatype,
					          wxopenid:wxopenid,
					        },
					        success(data){
					        	if(data.getret===0){
					        		s.setState({
					        			dataSource:data.list,
					        			loading:false,
					        		})
					        		s.forceUpdate();
					        		console.log(data,s.state.workdatatype);
					        	}
					        }
						})
					}
			})
		}else{
			$.ajax({
		        type:'POST',
		        url:window.baseUrl+'book/get_booklist/',
		        data:{
		          userid:s.userid,
		          getusersigid:s.getusersigid,
		          datatype:'',
		          wxopenid:wxopenid,
		        },
		        success(data){
		        	if(data.getret===0){
		        		s.setState({
		        			dataSource:data.list,
		        			loading:false,
		        		})
		        		s.forceUpdate();
		        		console.log(data,'bindNewdata');
		        	}
		        }
			})
		}

	}
	//获取书本分类
	getbooktype(){
		var s = this;
		$.ajax({
            url:window.baseUrl+'book/get_bookclass/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){
                if(data.getret === 0){
                	var typename=['全部'];
		            $.each(data.list,function(i,item){
		              typename.push(item.typename);
		            })            
		            s.state.tags=typename;
		            s.state.booktypeList=data.list;
		            console.log(data.list);
		            s.forceUpdate();
                }
            }
        })    
	}
	//search 
	searchbtn(value){
		var s=this;
		s.state.searchtext=value;
		console.log(s.state.searchtext);
        this.dataSource = this.dataSource  || this.state.dataSource.concat([]) ;
        this.state.dataSource = this.dataSource.filter((item)=>{
            return  item.title.indexOf(this.state.searchtext)>-1;
        });
        this.forceUpdate(); 
	}
	//loading
	loadData(){   
		var s = this;
		this.state.loading = true;
		this.forceUpdate();
	}

}
export default ZmitiValidateUser(ZmitiViewBookListApp);


