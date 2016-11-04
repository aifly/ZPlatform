import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';
export default class ZmitiDialog extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		let {title , updateCompanyDialogVisible } = this.props;
		return (
			<div>
					 <Modal title={title} visible={updateCompanyDialogVisible}>
		          <p>some contents...</p>
		          <p>some contents...</p>
		          <p>some contents...</p>
        	</Modal>
			</div>
		);
	}
}
