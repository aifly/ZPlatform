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
        this.state={
            currentId : 'c-video'
        }
    }
    chooseImg(e){
        if(e.target.className.indexOf('ant-input-group-addon')>-1){
            this.refs['rm-upload'].click();
        }
    }
    changeTagType(e){
        //e.preventDefault();
        this.setState({
            currentId:e.target.id
        });
    }
    render(){
        let labelStyle= {
            position:'relative',
            top:-3,
            left:5,
            color:'#fff',
            cursor:'pointer'
        }
        return (
            <Form  onClick={this.chooseImg.bind(this)}  style={{marginTop:6}}>
                <div><input checked={this.state.currentId === 'c-pic'} onChange={this.changeTagType.bind(this)} ref="choose-img" type="radio" name="type" value="pic" id="c-pic"/><label style={labelStyle} htmlFor="c-pic">添加图片</label></div>
                <FormItem className="rm-choose-img">
                    <Input disabled addonAfter="+选择"/>
                    <input type="file" ref="rm-upload" style={{opacity:0,position:'fixed',zIndex:-1}} />
                </FormItem>
                <ZmitiTextAreaBtns type="image" label="图片说明"></ZmitiTextAreaBtns>
                <div><input checked={this.state.currentId === 'c-video'} onChange={this.changeTagType.bind(this)}  ref="choose-video" type="radio" name="type" value="video" id="c-video"/><label style={labelStyle} htmlFor="c-video">添加视频</label></div>
                <FormItem className="rm-choose-img">
                    <Input disabled addonAfter="+选择"/>
                    <input type="file" ref="rm-upload" style={{opacity:0,position:'fixed',zIndex:-1}} />
                </FormItem>
                <ZmitiTextAreaBtns type="video" label="视频说明"></ZmitiTextAreaBtns>
            </Form>
        )
    }
}

//ZmitiChooseFile = Form.create({})(ZmitiChooseFile);
