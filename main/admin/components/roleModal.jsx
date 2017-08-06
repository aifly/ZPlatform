import React, {
	Component
} from 'react';

import {
	message,
	Select,
	Modal,
	Switch,
	Checkbox
} from '../../commoncomponent/common.jsx';

import './css/rolemodal.css'

export default class ZmitiRoleModal extends Component {
	render() {
		console.log(this.props)
		return <Modal title = '权限设置'
		visible = {
			this.props.showRole
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
                     <aside><Switch onChange={()=>{}} checkedChildren="允许访问" unCheckedChildren="不能访问" /></aside>
                  </li>
               })}
             </ul> < /Modal>

	}
}