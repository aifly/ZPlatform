import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
const FormItem = Form.Item;
import './zmiti-textarea-btns.css';
import '../js/pubsub';
/*
import {createStore} from 'redux';


let reducer_0 = (state,action)=>{
    console.log('reducer_0 was call with state',state,' and action' , action);
    return state;
}

let store_0 = createStore(reducer_0)

console.log('store_0 state after initialization:', store_0.getState());

*/

export default class ZmitiTextAreaBtns extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            defaultValue:''
        }
    }
    showIconDialog(){
        PubSub.publish('showDialog',true);
    }

    changeTagContent(e){
        this.setState({
            defaultValue:e.target.value
        });

        PubSub.publish('changeTagContent',{html:e.target.innerHTML,type:e.target.innerHTML?'block':'none'});
    }

   componentDidMount(){

       PubSub.subscribe("getFocusTagContent",(d,e)=>{
           this.setState({
               defaultValue:e
           });
       });
   }

    render(){
        return (
            <div className="rm-textarea-btn-group">
                <div className="rm-textarea-btns">
                    <FormItem label={this.props.label}>
                        <div className='rm-tag-content' contentEditable="true"
                             onInput={this.changeTagContent.bind(this)}
                             dangerouslySetInnerHTML={{__html:this.state.defaultValue}}
                             onFocus={this.changeTagContent.bind(this)}
                        >
                        </div>
                    </FormItem>
                </div>
                <div className="rm-textarea-btns rm-btns">
                    <FormItem>
                        <Button type="primary" size="small">B</Button>
                        <Button type="primary" size="small">I</Button>
                        <Button type="primary" size="small">H</Button>
                        <Button type="primary" size="large" onClick={this.showIconDialog.bind(this)} className="rm-large-btn">图标</Button>
                    </FormItem>
                </div>
            </div>
        )
    }
}