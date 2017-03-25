import React, { Component } from 'react';
import './css/user-list.css';

import { Table ,Select ,Icon} from '../commoncomponent/common.jsx';
let Option = Select.Option;
import  ZmitiSearchInput  from './zmiti-search-input.jsx';
export default class ZmitiUserList extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	current:0,
	  	showPanel:true,
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
			case 'meeting':

				userList = this.props.userList.filter(item=>{
					switch(this.state.current){
						case 0:
							return 1;
						break;
						case 1:
							return item.status === 0;//未审核
						break;
						case 2:
							return item.status === 1;//已审核
						break;
						case 3:
							return item.status === 2;//审核不通过。
						break;
					}
				});

			break;
			case 'custom':

				userList = this.props.userList.filter(item=>{
					switch(this.state.current){
						case 0:
							return item.isshare !== 0;
						break;
						case 1:
							return this.props.userid === item.userid;//未审核
						break;
					}
				});

			break;
		}
 
		let searchInputProps = {
          	selectComponent:this.props.selectComponent,
          	keyUpHandler:(e)=>{
          		this.props.keyDown(e.target.value)
          	}
          }

		return (
			<section className='user-main-ui' style={{height:this.props.mainHeight}}>
				<div className='user-left-pannel' style={{height:this.props.mainHeight,marginLeft:!this.state.showPanel?-window.mainLeftSize-20:0}}>
					<div className='zmiti-pannel-bar' onClick={this.togglePanel.bind(this)}>
						<Icon type="menu-fold" style={{display:this.state.showPanel?'inline-block':'none'}}/>
		                <Icon type="menu-unfold" style={{display:!this.state.showPanel?'inline-block':'none'}}/>
		                <span></span>
		                <span></span>
					</div>
					<div style={{width:'100%',overflow:'hidden'}}>
						<div className='user-title'>
							{this.props.title}
						</div>
						<ul onClick={this.changeAccount}>
							{
								this.props.tags.map((tag,i)=>{
									return <li data-index={i} key={i} className={this.state.current === i ?'active':''}><div data-index={i}>{tag}</div></li>
								})
							}
						</ul>
					</div>
				</div>
				<div className='user-right-pannel' style={{height:this.props.mainHeight,overflow:'auto',width:'100%'}}>
					<header>
						<ZmitiSearchInput {...searchInputProps}></ZmitiSearchInput>
					</header>
					{this.props.customerComponent}
					

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

	togglePanel(){
		this.setState({
            showPanel:!this.state.showPanel
        })
	}
	componentDidMount() {
	 
	}
	changeAccount(e){

		if(e.target.parentNode.nodeName === 'LI' || e.target.nodeName === "LI"){
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

