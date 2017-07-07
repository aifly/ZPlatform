import React, { Component } from 'react';


export default class ZmitiScript extends Component {
	constructor(props) {
		super(props);
		  this.state = {
		       
		   }
	}
	
	render() {


		var component = <div></div>;

		return <div>
			{(this.props.assets||[]).map((item,i)=>{
				if(item.type === 'link'){
					return  <link key={i} rel="stylesheet" type="text/css" href={item.src} />
				}
				else{
					return '';
				}
			})}
		</div>
	}

	componentDidMount() {
		
		var doc = document;
		this.props.assets.map((item,i)=>{

			if( item.type === 'script'){
				$.ajax({
					url:item.src
				});
			}

		});

	}

}
