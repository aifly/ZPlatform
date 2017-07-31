import React, { Component } from 'react';
import './css/editor.css';
import ZmitiWxHeader from './wxheader/index.jsx';


import '../static/editor/froala_editor.min';
import '../static/editor/align.min';
import '../static/editor/colors.min';
import '../static/editor/font_family.min';
import '../static/editor/font_size.min';
import '../static/editor/link.min';
import '../static/editor/table.min';


export default class ZmitiEditor extends Component {
	constructor(props) {
		super(props);
		  this.state = {
		        phoneW:0,
		        text:''
		    }
	}
	
	render() {
		
		 return <div className='zmiti-editor-main-ui'>
		 	<div className={'zmiti-editor-preview '+(this.props.showPreview?' ':' hide')} style={{maxHeight:this.props.height+46||446}}>
		 		<section>
		 			<div className='zmiti-editor-phone'>
			 			<img ref='phone' src={this.props.isAdmin?'../static/images/phone-bg.png':'./static/images/phone-bg.png'}/>
			 		</div>
			 		<div style={{width:this.state.phoneW}} className='zmiti-editor-header'>
			 			<img  src={this.props.isAdmin?'../static/images/wx-header.png':"./static/images/wx-header.png"}/>
			 			<div  dangerouslySetInnerHTML={this.createMarkup()}></div>
			 		</div>
		 		</section>
		 	</div> 
			<div ref='zmiti-editor'>
				
			</div>
		 </div>
	}

	createMarkup(){
		 return {__html:  this.state.text};
	}

	componentDidMount() {


		var prefix = this.props.isAdmin?'../':'./';
		var assets=[
				{
					type:'link',
					src:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css'
				},{
					type:'link',
					src:prefix+'static/editor/css/froala_editor.css',
				},{
					type:'link',
					src:prefix+'static/editor/css/colors.css',
				},{
					type:'link',
					src:prefix+'static/editor/css/froala_style.css',
				},{
					type:'link',
					src:prefix+'static/editor/css/royal.css',
				},{
					type:'link',
					src:prefix+'static/editor/css/table.min.css',
				}
			];


		var $ = window.$ || this.props.$;
		
		var doc = document,
			style="",
			body=$('body');


			

			assets.forEach((item,i)=>{
				if(item.type === 'script'){
					
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
		        height:s.props.height||400
		    }).on ('froalaEditor.contentChanged', function (e,editor) {
                s.props.onChange && s.props.onChange(editor);
                s.setState({
                	text:editor.el.innerHTML
                })
            });
		},100)

		var img = new Image();
		img.onload = function(){
			setTimeout(()=>{
				$('.royal-theme a[href="https://www.froala.com/wysiwyg-editor?k=u"]').remove();
				s.setState({
					phoneW:s.refs['phone'].width,
					text:s.props.html||''
				});
				$('.fr-element.fr-view').html(s.props.html);
			},100)
			
		}
		img.src=this.refs['phone'].src;
		
	}

	
}

ZmitiEditor.defaultProps = {
	isAdmin : true,
	showPreview:true
}