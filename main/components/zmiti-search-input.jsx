import React, { Component } from 'react';
import '../public/css/base.css';
import Input from 'antd/lib/input';
const InputGroup = Input.Group;
import 'antd/lib/input/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
export default class ZmitiSearchInput extends Component {
	render() {
		return (
			<div>
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
