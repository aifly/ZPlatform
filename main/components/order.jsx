import React, { Component } from 'react';
import './css/order-list.css';

import { Table ,Select ,Icon} from '../commoncomponent/common.jsx';
let Option = Select.Option;
export default class ZmitiOrderList extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	orderList:[
	  		
	  	],
	  	columns:[]
	  };
	}

	render() {
		
		return (
			<section className='order-main-ui' style={{height:this.props.mainHeight}}>
				{
					this.props.columns.map((col,i)=>{
						if(i===0){
							return <section key={i} className='user-list-section'>
								<Table bordered={true}
								  expandedRowRender={record => <div>{this.props.detail(record)}</div>}
								 dataSource={this.props.orderList} columns={col} />
							</section>	
						}
					})
				}
			</section>
		);
	}

	
	componentDidMount() {
	 
	}
	
}

ZmitiOrderList.defaultProps = {
}

