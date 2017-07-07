import React, { Component } from 'react';
import MainUI from '../components/main.jsx';
import ZmitiEditor from '../../components/zmiti-editor.jsx';
export default class AdminIndex extends Component {
	render() {

		var props = {
			onChange(editor){
 				console.log(editor.el.innerHTML);
			}
		}

		var component = <div>
			<ZmitiEditor {...props}></ZmitiEditor>
		</div>;
		return (
			<MainUI component={component}></MainUI>
		);
	}
}
  