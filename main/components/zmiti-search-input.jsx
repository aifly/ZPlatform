import React, { Component } from 'react';
import './css/searchinput.css';
import { Input ,Button,Select } from '../commoncomponent/common.jsx';
const InputGroup = Input.Group;
export default class ZmitiSearchInput extends Component {
	render() {
		return (
			<div className='search-input-main-ui'>
				<Input addonBefore='搜索' onKeyUp={this.props.keyUpHandler} />
			  <div className="ant-input-group-wrap">
			  	{this.props.selectComponent}
	            {/*<Button icon="search" type='primary'>
	            	            	搜索
	            	            </Button>*/}
	          </div>

			</div>
		);
	}

}
