import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/user-list.css';
import Input from 'antd/lib/input';
const InputGroup = Input.Group;
import 'antd/lib/input/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import '../public/css/base.css';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
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
		
		return (
			<section className='user-main-ui'>
				<div className='user-left-pannel'>
					<ul onClick={this.changeAccount}>
						<li data-index='0' className={this.state.current === 0 ?'active':''}>{this.props.tags[0]}</li>
						<li data-index='1' className={this.state.current === 1 ?'active':''}>{this.props.tags[1]}</li>
					</ul>
				</div>
				<div className='user-right-pannel'>
					<header>
						<InputGroup>
							<Input />
							  <div className="ant-input-group-wrap">
					            <Button icon="search" type='primary'>
					            	搜索
					            </Button>
					          </div>
						</InputGroup>
						
					</header>
					<section className='user-list-section'>
						<Table dataSource={this.props.userList} columns={this.props.columns} />
					</section>
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

