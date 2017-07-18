
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
              {value || <span style={{color:'#f00'}}>0</span>}
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
}