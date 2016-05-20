
import React from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';

export default class ZmitiModal extends React.Component{
    constructor(args){
        super(...args);
        this.state={
            visible:false
        }
    }
    handleOk() {
        this.setState({
            visible: false
        });
    }
    showModal() {
        this.setState({
            visible: true
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    render(){
        return (
            <div>
                <Modal title="第一个 Modal" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                    <p>对话框的内容</p>
                </Modal>
            </div>
        )
    }

}