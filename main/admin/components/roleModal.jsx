import React, {
	Component
} from 'react';


import $ from 'jquery';

import {
	message,
	Select,
	Modal,
	Switch,
	Checkbox
} from '../../commoncomponent/common.jsx';

import './css/rolemodal.css'

export default class ZmitiRoleModal extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {

		return <Modal title = '权限设置'
		visible = {
			this.state.showRole
		}
		onOk = {
			() => {}
		}
		onCancel = {
			() => {
				this.setState({
					showRole: false
				})
			}
		}
		width = {
				800
			} >
			<ul className='role-list'>
               <li>
                 <aside></aside>
                 <aside>产品</aside>
                 <aside>访问权限</aside>
               </li>
               <li>
                 <aside></aside>
                 <aside>产品</aside>
                 <aside>访问权限</aside>
               </li>
               {this.props.productList.map((item,i)=>{
                  return <li key={i}>
                     <aside><Checkbox></Checkbox></aside>
                     <aside>{item.productname}</aside>
                     <aside><Switch checked={item.status === 1} onChange={this.toggleRole.bind(this,item,i)} checkedChildren="允许访问" unCheckedChildren="不能访问" /></aside>
                  </li>
               })}
             </ul> < /Modal>

	}

	toggleRole(item, i) {

		$.ajax({
			type: 'post',
			url: window.baseUrl + 'admin/setuserauth/',
			data: {
				userid: this.props.userid,
				getusersigid: this.props.getusersigid,
				setuserid: this.props.setuserid,
				isdel: item.status === 1 ? 1 : 2,
				productids: item.productid
			}
		}).done(data => {
			console.log(data);
			if (data.getret === 0) {
				var list = this.props.productList;

				list[i].status = list[i].status === 1 ? 2 : 1;

				window.obserable.trigger({
					type: 'modifyProductList',
					data: list
				})
			}
		})

	}

	componentDidMount() {

		window.obserable.off("toggleRoleModal");

		window.obserable.on('toggleRoleModal', (data) => {
			this.toggleModal(data)
		})

	}

	toggleModal(flag = true) {
		this.setState({
			showRole: flag
		})
	}
}