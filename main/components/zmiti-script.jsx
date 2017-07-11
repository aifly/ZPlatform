import React, { Component } from 'react';
import $ from 'jquery';


export default class ZmitiScript extends Component {
	constructor(props) {
		super(props);
		  this.state = {
		       
		   }
	}
	
	render() {
		return <div>
			
		</div>
	}

	componentDidMount() {
		
		var doc = document,
			style="",
			assets = this.props.assets,
			body=$('body');
			
			assets.map((item,i)=>{
				if(item.type === 'script'){
					
					var script = doc.createElement('script');
					script.src= item.src;
					script.type ='text/javascript';

					body.append(script);
				}else if(item.type === 'link'){
					style+='<link rel="stylesheet" type="text/css" href='+item.src+' \/>'
				}
			});

			style && (document.getElementsByTagName('head')[0].innerHTML += style);

	}

}
