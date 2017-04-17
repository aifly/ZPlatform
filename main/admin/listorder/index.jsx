import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import {Link, message,Select  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';

 class ZmitiListOrderApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current:0,
			mainHeight:document.documentElement.clientHeight - 50,
			userList:[

			],
		};

		this.condition = 0;
		
	}
	render() {

		const columns = [{
			title: '序号',
			dataIndex: 'key',
			key: 'xx',
		},{
			title:"工单号",
			dataIndex:'workorderid',
			key:'workorderid'
		}
		,{
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: '工单内容',
			dataIndex: 'content',
			key: 'content',
		}, {
			title: '工单类型',
			dataIndex: 'workordertype',
			key: 'workordertype',
		}, {
			title: '工单状态',
			dataIndex: 'statusName',
			key: 'statusName',
		}, {
			title: '创建时间',
			dataIndex: 'createtime',
			key: 'createtime',
			sorter: (a, b) => a.key - b.key
		}];
		var columns1 = columns.concat( { 
			title: '操作', 
			width:'20%',
			dataIndex: '', key: 'x',
			render:  (text, record)  => <div data-userid={record.userid}><a href={'#/editorder/'+record.workorderid}>处理工单</a></div> });
		var columns2= columns.concat( { 
			title: '操作', 
			dataIndex: '', key: 'x',
			render: (text, record) => <div data-userid={record.userid}><a href={'#/vieworder/'+record.workorderid}>查看</a></div> });

		var title = this.props.params.title;
		let props={
			userList:this.state.userList,
			columns:[columns1,columns2],
			changeAccount:this.changeAccount,
			mainHeight:this.state.mainHeight,
			tags:['处理中','已处理'],
			type:'listorder',
			selectedIndex:0,
			title,
			keyDown:(value)=>{

          clearTimeout(this.keyupTimer);
          this.defautlUserList === undefined && (this.defautlUserList = this.state.userList.concat([]));
          this.keyupTimer = setTimeout(()=>{
            var userlists = this.defautlUserList;
            var condition = 'workorderid';
            this.state.userList  = userlists.filter(user=>{

              switch(this.condition*1){
                case 0://提问内容
                  condition = 'workorderid';
                break;
                case 1://类型
                  condition = 'username'
                break;
              }

             return user[condition].indexOf(value)>-1;
            });

            this.forceUpdate(()=>{
            });
          },350);
      },
      selectComponent:<Select placeholder='工单号' onChange={(e)=>{this.condition = e}}  style={{width:120}} size='small' >
                         <Option value="0">工单号</Option>
                         <Option value="1">用户名</Option>
                     </Select>

		}

		//console.log(props.userList)
		

    //console.log(this.state.mainHeight);
		return (
			<MainUI component={<ZmitiUserList {...props}></ZmitiUserList>}></MainUI>
			);
	}
	

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

		validateUser(()=>{loginOut(undefined,undefined,false);},this);

	}
	changeAccount(i){
        if(i*1===0){
            window.location.hash='#/listorder/工单管理';
        }else if(i*1===1){
            window.location.hash='#/listorder/工单管理';
        }

    }
	componentDidMount() {
		/*  var {userid,getusersigid} = this.props.params;
		  this.getusersigid = this.getusersigid = getusersigid;
      this.userid =userid;
      this.baseUrl = window.baseUrl;*/

       let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
      resizeMainHeight(this,'setAdminHeight');

      
      var params = {
      	getusersigid:this.getusersigid,
      	userid:this.userid,
      	setisadmin:1
      }
      let s = this;

      $.ajax({
      	type:"GET",
      	url:window.baseUrl+"/user/get_workorder/",
      	data:params,
      	success(data){
      		
      		
      		if(data.getret === 0){
      			console.log(data.workorderinfo);
      			data.workorderinfo.map((item,i)=>{
				 	if(item.status === 0){
				 		item.status=0;
				 	}else{
				 		item.status=1;
				 	}
				 	s.state.userList.push(item);
				 });
      			s.state.userList.forEach((item,i)=>{
      				switch(item.status){
      					case 0:
      					item.statusName = '处理中';
      					break;
      					case 1:
      					item.statusName = '已处理';
      					break;
      				}
      				switch(item.workordertype){
      					case 0:
      					item.workordertype = '财务类';
      					break;
      					case 1:
      					item.workordertype = '会员帐号类';
      					break;
      					case 2:
      					item.workordertype = '定制服务类';
      					break;
      					case 3:
      					item.workordertype = '产品技术类';
      					break;
      					case 4:
      					item.workordertype = '其它类';
      					break;
      				}

      			})
      			s.setState({
      				userList:s.state.userList
      			});
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
	
}
export default ZmitiValidateUser(ZmitiListOrderApp);
/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/