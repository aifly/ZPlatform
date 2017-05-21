import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../components/zmiti-user-list.jsx';
import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment  } from '../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import $ from 'jquery';
 class ZmitiViewBookListApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
      		selectedIndex:0,
      		bookIndex:0,
      		tags:['全部'],
      		keyword:'',
      		booktypeList:[],
      		workdatatype:0,
			dataSource:[

			],

		};
		
	}
	render() {

		var title = this.props.params.title || '书本列表';
		const columns=[{
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '二维码',
            dataIndex: 'qrcodeurl',
            key: 'qrcodeurl',
            width:120,

        },{
            title: '时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:120,

        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:120,

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
            customRightComponent:<div className='viewcustombooklist-main-ui'>
            	<div className='pad-10'>
            		<Table bordered={true} 
                          dataSource={this.state.dataSource} 
                          columns={columns} />
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

	componentWillMount() {
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	componentDidMount() {
		var s = this;
		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
		resizeMainHeight(this,'setAdminHeight');
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

}
export default ZmitiValidateUser(ZmitiViewBookListApp);


