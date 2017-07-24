
import React from 'react';
import {Cascader, message,Input,Button,InputNumber, Row, Col,Popconfirm,DatePicker,Table ,Icon } from '../commoncomponent/common.jsx';

export default class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false,
    }
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  check(){
    this.setState({ editable: false });
    
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
    this.props.onEdit && this.props.onEdit(this.state.value);
  }
  edit() {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check.bind(this)}
                onBlur={this.check.bind(this)}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {this.fmoney(value) || <span style={{color:'#f00'}}>0</span>}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
    );
  }
  fmoney(s, n = 3){   
       n = n > 0 && n <= 20 ? n : 2;   
       s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
       var l = s.split(".")[0].split("").reverse();
       var r = s.split(".")[1];   
       var t = "";   
       for(var i = 0; i < l.length; i ++ )   
       {   
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
       }   
       return t.split("").reverse().join("") + "." + r;   
  } 

}