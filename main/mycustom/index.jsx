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
			 <Tabs tabPosition={'left'}>
	          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
	          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
	          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
	        </Tabs>
		</div>
		return (
			<MainUI component={component}></MainUI>
			);
	}

	componentWillMount() {
		
		let {resizeMainHeight,validateUser,loginOut} = this.props;

		resizeMainHeight(this);	
		
		validateUser(()=>{loginOut(undefined,undefined,false);},this);
		
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