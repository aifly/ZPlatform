import React from 'react';

import { Form,Input,Button} from '../../../commoncomponent/common.jsx';
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
        let target=e.target;
        if(e.target.parentNode && e.target.parentNode.classList.contains('rm-tag-content')){
            target = e.target.parentNode;
        }

        this.props.changeTagPropValue('content', target[val]);

        PubSub.publish('changeTagContent', {html: target[val], type: target[val] ? 'block' : 'none'});
    }

    changeTagContentStyle(type) {
        this.style = this.style || [];
        switch (type) {
            case"b":
                this.bold = !this.bold;
                this.style[this.bold ? 'push' : 'remove']('bold');
                break;
            case 'i':
                this.italic = !this.italic;
                this.style[this.italic ? 'push' : 'remove']('italic');
                break;
        }

        let content = "<div  class='" + this.style.join(' ') + "'>" + this.props.textContent.replace(/<[^>]+>/g, "") + "</div>";
        this.props.changeTagPropValue("content", content);

    }

    componentDidMount() {

        Array.prototype.remove = function (item) {
            this.forEach((a, i)=> {
                if (a === item) {
                    this.splice(i, 1);
                }
            });
        };

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
    textContent: ''
}