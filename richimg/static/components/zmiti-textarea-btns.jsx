import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
const FormItem = Form.Item;
import './zmiti-textarea-btns.css'

export default class ZmitiTextAreaBtns extends React.Component{
    constructor(args){
        super(...args)
    }
    render(){
        return (
            <div className="rm-textarea-btn-group">
                <div className="rm-textarea-btns">
                    <FormItem label={this.props.label}>
                        <Input type="textarea" rows="4" placeholder=""/>
                    </FormItem>
                </div>
                <div className="rm-textarea-btns rm-btns">
                    <FormItem>
                        <Button type="primary" size="small">B</Button>
                        <Button type="primary" size="small">I</Button>
                        <Button type="primary" size="small">H</Button>
                        <Button type="primary" size="large" className="rm-large-btn">图标</Button>
                    </FormItem>
                </div>
            </div>
        )
    }
}