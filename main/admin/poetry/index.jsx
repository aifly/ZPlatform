import React, { Component } from 'react';
import './static/css/index.css';
import { message  } from '../../commoncomponent/common.jsx';
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
import ZmitiEditor from '../../components/zmiti-editor.jsx';

class ZmitiPoetryApp extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
		};
	}
	render() {
		var component = <div><ZmitiEditor></ZmitiEditor></div>
		return (
			<MainUI component={component}>}></MainUI>
			);
	}

	componentWillMount() {

		let {resizeMainHeight,validateUser,loginOut} = this.props;
		resizeMainHeight(this);
		validateUser(()=>{loginOut(undefined,undefined,false);},this);
	}
	componentDidMount() {
		
	}
	
}

export default ZmitiValidateUser(ZmitiPoetryApp);


