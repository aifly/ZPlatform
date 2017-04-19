import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
  EditorState,
} from 'draft-js';

export default class ZmitiEditor extends Component {
	constructor(props) {
		super(props);
		  this.state = {
		        editorState: EditorState.createEmpty(),
		    }
	}
	
	render() {
		 const { editorContent, contentState, editorState } = this.state;
		    return <Editor
				  toolbarClassName="home-toolbar"
				  wrapperClassName="home-wrapper"
				  editorClassName="home-editor"
				  onEditorStateChange={this.onEditorStateChange.bind(this)}
				  uploadCallback={this.uploadImageCallBack.bind(this)}
				  onContentStateChange={this.onEditorChange.bind(this)}
				/>
	}

	onEditorChange(e){
		console.log(3)
	}

	onEditorStateChange(e){
		console.log(e)
	}

	uploadImageCallBack(content) {
		console.log("Recieved content", content);
	}
}
