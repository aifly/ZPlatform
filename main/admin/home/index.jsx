import React, { Component } from 'react';
import MainUI from '../components/main.jsx';
import ZmitiEditor from '../../components/zmiti-editor.jsx';
export default class AdminIndex extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			mainHeight:document.documentElement.clientHeight - 50
		}
	}
	render() {

		
        let editorProps ={
            onChange(editor){
                s.setState({
                    html:editor.el.innerHTML
                });
            },
            height:this.state.mainHeight/2,
            html:this.state.html,
            $,
            isAdmin:true
        }

		var component = <div>
			<ZmitiEditor {...editorProps}></ZmitiEditor>
		</div>;
		return (
			<MainUI component={component}></MainUI>
		);
	}
}
  