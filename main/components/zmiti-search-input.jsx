import React, { Component } from 'react';
import './css/searchinput.css';
import { Input ,Button } from '../commoncomponent/common.jsx';
const InputGroup = Input.Group;
export default class ZmitiSearchInput extends Component {
	render() {
		return (
			<div className='search-input-main-ui'>
				<InputGroup>
					<Input />
					  <div className="ant-input-group-wrap">
			            <Button icon="search" type='primary'>
			            	搜索
			            </Button>
			          </div>
				</InputGroup>

			</div>
		);
	}
}
