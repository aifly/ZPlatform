import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/user-list.css';

import { Table } from '../commoncomponent/common.jsx';

import  ZmitiSearchInput  from './zmiti-search-input.jsx';
export default class ZmitiUserList extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:1,
	  	userList:[
	  		
	  	],
	  	columns:[]
	  };
	  this.changeAccount = this.changeAccount.bind(this);
	}
	render() {


		var userList = this.props.userList.filter(item=>{
			return item.isover === this.state.current ||  item.isover === 2;//isover : 0 正式账号，1为试用账户
		});
		return (
			<section className='user-main-ui' style={{height:this.props.mainHeight}}>
				<div className='user-left-pannel'>
					<ul onClick={this.changeAccount}>
						<li data-index='1' className={this.state.current === 1 ?'active':''}>{this.props.tags[0]}</li>
						<li data-index='0' className={this.state.current === 0 ?'active':''}>{this.props.tags[1]}</li>
					</ul>
				</div>
				<div className='user-right-pannel'>
					<header>
						<ZmitiSearchInput></ZmitiSearchInput>
					</header>
					
					{
						this.state.current === 1 &&
						<section className='user-list-section'>
							<Table bordered={true} dataSource={userList} columns={this.props.columns} />
						</section>
					}
					{
						this.state.current === 0 &&
						<section className='user-list-section'>
							<Table bordered={true} dataSource={userList} columns={this.props.columns1} />
						</section>
					}
				</div>
			</section>
		);
	}
	componentDidMount() {
	
	}
	changeAccount(e){
		if(e.target.nodeName === "LI"){
			var index = e.target.getAttribute('data-index');
			this.setState({
				current:index*1
			});
			this.props.changeAccount(index);
		}
	}
}

ZmitiUserList.defaultProps = {
	tags:['试用人个账户','正式人个账户']
}

