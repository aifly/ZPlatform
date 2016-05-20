
import React from 'react';
import './zmiti-ripple.css';
import $ from 'jquery';

export default class ZmitiRipple extends React.Component{
    constructor(args) {
        super(...args);
    }
    startMove(e){
        let obj = $("#"+this.props.id).css({left:e.pageX,top:e.pageY}).removeClass('active');
        obj.addClass('active').on('animationend',()=>{
            obj.removeClass("active");
        });
    }
    render(){
        return (
            <div className="rm-ripple" ref={this.props.ripple} id={this.props.id}>
                <div></div>
                <div></div>
            </div>
        )
    }
}