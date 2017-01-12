import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/user-list.css';

import { Table } from '../commoncomponent/common.jsx';

import  ZmitiSearchInput  from './zmiti-search-input.jsx';
export default class ZmitiUserList extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	userList:[
	  		
	  	],
	  	columns:[]
	  };
	  this.changeAccount = this.changeAccount.bind(this);
	}
	render() {


		


		var userList =null;
		switch(this.props.type) {
			case "user":
				userList = this.props.userList.filter(item=>{
					return item.isover === this.state.current ||  item.isover === 2;//isover : 0 正式账号，1为试用账户
				});		
				break;
			case 'workorder':
				userList = this.props.userList
	/*			userList = this.props.userList.filter(item=>{
					//return item.isover === this.state.current ||  item.isover === 2;//isover : 0 正式账号，1为试用账户
				});		*/
				break;
		}

		 

		return (
			<section className='user-main-ui' style={{height:this.props.mainHeight}}>
				<div className='user-left-pannel'>
					<ul onClick={this.changeAccount}>
						{
							this.props.tags.map((tag,i)=>{
								return <li data-index={i} key={i} className={this.state.current === i ?'active':''}><div>{tag}</div></li>
							})
						}
					</ul>
				</div>
				<div className='user-right-pannel'>
					<header>
						<ZmitiSearchInput></ZmitiSearchInput>
					</header>
					
					{
						this.props.columns.map((col,i)=>{
							if(this.state.current === i ){
								return <section key={i} className='user-list-section'>
											<Table bordered={true} dataSource={userList} columns={col} />
										</section>	
							}
							
						})
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
			this.props.changeAccount && this.props.changeAccount(index);
		}
	}
}

ZmitiUserList.defaultProps = {
	tags:['试用人个账户','正式人个账户'],
	type:'user'
}

