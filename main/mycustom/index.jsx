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
			 <h1 style={{fontWeight:'normal'}}>联系电话：13910904709</h1>
		</div>
		return (
			<MainUI component={component}></MainUI>
			);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		let {userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);

		
	}

	componentDidMount() {
		var s = this;
		$.ajax({
			url:'./mycustom/data.json',
			type:window.ajaxType || 'get',
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