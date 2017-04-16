import React, { Component } from 'react';

import { message,Select,Tabs } from '../commoncomponent/common.jsx';
const TabPane = Tabs.TabPane;
var Option = Select.Option;

import MainUI from '../components/Main.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

class ZmitiMycustomApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			current:0,

			mainHeight:document.documentElement.clientHeight - 50,
			customList:[]
		}; 
	}
	render() {

		var component = <div className='mycustom-main-ui'>
			 
		</div>
		return (
			<MainUI component={component}></MainUI>
			);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);

		$.ajax({
			url:window.baseUrl+'custom/get_custom_list',
			data:{
				userid,
				getusersigid
			},
			success(data){
				console.log(data);
			}
		})
		
	}

	componentDidMount() {
		var s = this;
		$.ajax({
			url:'./mycustom/data.json',
			data:{},
			success(data){
				s.setState({
					customList:data.customList
				});
				console.log(s.state.customList)
			}
		})	
	}
 
}

export default ZmitiValidateUser(ZmitiMycustomApp);
/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/