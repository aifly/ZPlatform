
import React from 'react';

import { Modal } from '../../../commoncomponent/common.jsx';

import '../js/pubsub';
import './zmiti-modal.css';

import $ from 'jquery';




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
    componentDidMount(){
        PubSub.subscribe("showDialog",(d,e)=>{
            this.showModal();
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    chooseIco(e){

        switch (e.type){

        }
        //alert(this.props.changeTagPropValue)
        e.target.src && this.props.changeTagPropValue('icon',e.target.src);

    }
    render(){
        return (
            <div>
                <Modal title="选择图标" width={278} wrapClassName="rm-ico-modal" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <ul className="rm-icon-C" onClick={this.chooseIco.bind(this)}>
                        <li><img draggable="false" src="./static/images/red-plain.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/green-plain.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/black-plain.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/blue-plain.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/black-a.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/black-b.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/black-c.png" alt=""/></li>
                        <li><img draggable="false" src="./static/images/black-d.png" alt=""/></li>
                    </ul>
                </Modal>
            </div>
        )
    }

}