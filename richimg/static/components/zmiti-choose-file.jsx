import React from 'react';
import Form from 'antd/lib/form';
import Radio from 'antd/lib/Radio';
import Input from 'antd/lib/input';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import ZmitiTextAreaBtns from './zmiti-textarea-btns.jsx'


export default class ZmitiChooseFile extends React.Component{
    constructor(args){
        super(...args);
    }
     chooseImg(){

     }
    render(){
        //const { getFieldProps } = this.props.form;
        return (
            <Form  onClick={this.chooseImg.bind(this)}  style={{marginTop:6}}>
                <RadioGroup >
                    <Radio value="pic">添加图片</Radio>
                    <FormItem className="rm-choose-img">
                        <Input disabled addonAfter="+选择"/>
                        <input type="file" ref="rm-upload" style={{opacity:0,position:'fixed',zIndex:-1}} />
                    </FormItem>
                    <ZmitiTextAreaBtns label="图片说明"></ZmitiTextAreaBtns>
                    <Radio value="video">添加视频</Radio>
                    <FormItem className="rm-choose-img">
                        <Input disabled addonAfter="+选择"/>
                        <input type="file" ref="rm-upload" style={{opacity:0,position:'fixed',zIndex:-1}} />
                    </FormItem>
                    <ZmitiTextAreaBtns label="图片说明"></ZmitiTextAreaBtns>
                </RadioGroup>
            </Form>
        )
    }
}


