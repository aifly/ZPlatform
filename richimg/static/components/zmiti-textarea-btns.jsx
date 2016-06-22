import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
const FormItem = Form.Item;
import './zmiti-textarea-btns.css';
import '../js/pubsub';
import 'babel-polyfill';
import ContentEditable from 'react-contenteditable';

/*
 import {createStore} from 'redux';


 let reducer_0 = (state,action)=>{
 console.log('reducer_0 was call with state',state,' and action' , action);
 return state;
 }

 let store_0 = createStore(reducer_0)

 console.log('store_0 state after initialization:', store_0.getState());

 */

export default class ZmitiTextAreaBtns extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            html: ''
        }
    }

    showIconDialog() {
        PubSub.publish('showDialog', true);
    }

    changeTagContent(e) {


        let val = 'value';

        switch (e.type) {
            case "input":
                val = 'value';
                break;
            case "click":
                val = 'innerHTML';
                break;
            default:
            {
                return false;
            }
        }

        this.props.changeTagPropValue('content', e.target[val]);

        PubSub.publish('changeTagContent', {html: e.target[val], type: e.target[val] ? 'block' : 'none'});
    }

    changeTagContentStyle(type) {
        let style = '';
        switch (type) {
            case"b":
                this.bold = !this.bold;
                style += 'font-weight:' + (this.bold ? 'bold' : 'normal');
                break;
            case 'i':
                this.italic = !this.italic;
                style += 'font-style:' + (this.italic ? 'italic' : 'normal');
                break;
        }



        let content = this.props.textContent;
        this.props.changeTagPropValue("content", content.replace("<div", "<div style=" + style + ""))

    }

    componentDidMount() {

        let textContent = this.props.textContent.startsWith('<div') ? this.props.textContent : "<div>" + this.props.textContent + "</div>";
        setTimeout(()=> {
            this.props.changeTagPropValue('content', textContent);
        }, 0);

    }

    render() {

        return (
            <div className="rm-textarea-btn-group">
                <div className="rm-textarea-btns">
                    <FormItem label={this.props.label}>
                        <ContentEditable
                            className='rm-tag-content'
                            html={this.props.textContent}
                            disabled={false}
                            onChange={this.changeTagContent.bind(this)}
                            onClick={this.changeTagContent.bind(this)}
                        />
                    </FormItem>
                </div>
                <div className="rm-textarea-btns rm-btns">
                    <FormItem>
                        <Button type="primary" size="small"
                                onClick={this.changeTagContentStyle.bind(this,'b')}>B</Button>
                        <Button type="primary" size="small"
                                onClick={this.changeTagContentStyle.bind(this,'i')}>I</Button>
                        <Button type="primary" size="small" disabled>H</Button>
                        <Button type="primary" size="large" onClick={this.showIconDialog.bind(this)}
                                className="rm-large-btn">图标</Button>
                    </FormItem>
                </div>
            </div>
        )
    }
}

ZmitiTextAreaBtns.defaultProps = {
    textContent:''
}