import React, { Component } from 'react';

import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';

import { message,Select,Modal,Form , Input,Button, Row, Col,Switch,Radio,InputNumber,Popconfirm,DatePicker,Table ,moment  } from '../../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Link } from 'react-router';
import MainUI from '../components/main.jsx';

import {ZmitiValidateUser} from '../../public/validate-user.jsx';


class ZmitiTripexpenceApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			setuserid:'',
			selectedIndex:3,
			mainHeight:document.documentElement.clientHeight-50,
			dataSource:[],
		};

		
	}
	render() {
		const columns = [{
            title: '公司编号',
            dataIndex: 'companyid',
            key: 'companyid',
            width:100

        },{
            title: '交通标识唯一标准',
            dataIndex: 'transportid',
            key: 'transportid'

        },{
            title: '职务编号',
            dataIndex: 'jobid',
            key: 'jobid'

        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status'

        },{
            title: '创建时间',
            dataIndex: 'creattime',
            key: 'creattime'

        },  {
            title: '操作',
            dataIndex: '',
            key: '',
            width:150,
            render:(text,recoder,index)=>(
                <span><a href="#"> 查看</a></span>
            )

        }]
		var title = this.props.params.title || '出差宝';

		let props={
			userList:this.state.userList,
			userid:this.userid,
			changeAccount:this.changeAccount.bind(this),
			type:'custom-1',
			tags:['职务','淡旺季','交通费','差旅费'],
			mainHeight:this.state.mainHeight,
			title:title,
			selectedIndex: 3,
			rightType: "custom",
			customRightComponent:<div className='tripost-main-ui' style={{height:this.state.mainHeight}}>
				<div className='pad-10'>
					<div className="zmiti-tripost-header">
						<Row>
							<Col span={8} className="zmiti-tripost-header-inner">差旅费</Col>
						</Row>						
					</div>
					<div className="zmiti-tripost-line"></div>
					<Table dataSource={this.state.dataSource} columns={columns} bordered/>
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

	changeAccount(i){
        if(i*1===0){
        	window.location.hash='tripost/';            
        }else if(i*1===1){
            window.location.hash='tripseason/';
        }else if(i*1===2){
            window.location.hash='triptraffic/';
        }else if(i*1===3){
            window.location.hash='tripexpence/';
        }
	}

	bindNewdata(){
        var s=this
        $.ajax({
            url:window.baseUrl+'weixin/get_wxuserlist',//接口地址
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
            },
            success(data){

                if(data.getret === 0){
                    console.log(data,"信息列表");
                    s.state.dataSource = data.userlist;
                    s.forceUpdate();
                }
            }
        })
    }

	componentDidMount() {
		var s=  this;
		s.bindNewdata();
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
		this.userid = userid;
		this.getusersigid = getusersigid;

		
	}

}

export default ZmitiValidateUser(ZmitiTripexpenceApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/