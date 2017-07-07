import React, { Component } from 'react';
import './css/editor.css';
import ZmitiWxHeader from './wxheader/index.jsx';

export default class ZmitiEditor extends Component {
	constructor(props) {
		super(props);
		  this.state = {
		        phoneW:0
		    }
	}
	
	render() {
		
		 return <div className='zmiti-editor-main-ui'>
		 	<div className='zmiti-editor-preview'>
		 		<img style={{width:this.state.phoneW}} className='zmiti-editor-header' src='../static/images/wx-header.png'/>
		 		<div className='zmiti-editor-phone'>
		 			<img ref='phone' src={this.props.isAdmin?'../static/images/phone-bg.png':'./static/images/phone-bg.png'}/>
		 		</div>
		 	</div> 
			<div ref='zmiti-editor'>

			</div>
		 </div>
	}

	componentDidMount() {

		var assets=[
				{
					type:'script',
					src:'../static/editor/froala_editor.min.js',
				},{
					type:'script',
					src:'../static/editor/align.min.js',
				},{
					type:'script',
					src:'../static/editor/colors.min.js',
				},{
					type:'script',
					src:'../static/editor/image.min.js',
				},{
					type:'script',
					src:'../static/editor/link.min.js',
				},{
					type:'link',
					src:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css'
				},{
					type:'link',
					src:'../static/editor/css/froala_editor.css',
				},{
					type:'link',
					src:'../static/editor/css/colors.css',
				},{
					type:'link',
					src:'../static/editor/css/froala_style.css',
				},{
					type:'link',
					src:'../static/editor/css/royal.css',
				}
			];
		
		var iCount = 0,
			doc = document,
			style="",
			body=$('body');
			

			assets.forEach((item,i)=>{
				if(item.type === 'script'){
					iCount++;
					var script = doc.createElement('script');
					script.src= item.src;
					body.append(script);
				}else if(item.type === 'link'){
					style+='<link rel="stylesheet" type="text/css" href='+item.src+' \/>'
				}
			});

			

		document.getElementsByTagName('head')[0].innerHTML += style;
		var s = this;
		setTimeout(()=>{
			$(this.refs['zmiti-editor']).froalaEditor({
		        theme: 'royal',
		        height:400
		    }).on ('froalaEditor.contentChanged', function (e,editor) {
                s.props.onChange && s.props.onChange(editor);
            });
		},100)


		this.refs['phone'].onload = function(e){
			setTimeout(()=>{
				this.setState({
					phoneW:this.width 
				})
			},100 )
		}

	}

	
}

ZmitiEditor.defaultProps = {
	isAdmin : true
}