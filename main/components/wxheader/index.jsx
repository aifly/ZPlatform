import React, { Component } from 'react';
import './css/index.css';


export default class ZmitiWxHeader extends Component {
	render() {

		 var barStyle ={
            background:'url(./static/images/wx-header1.jpg) no-repeat center / contain'
        };
        var d = new Date();
        var hours = d.getHours();
        var mins = d.getMinutes();

        hours<10 && (hours = '0'+hours);
        mins<10 && (mins = '0'+mins);
		return (
			<header className='zmiti-wxheader-main-ui'>
                <div className='zmiti-edit-phone-bar' style={barStyle}>
                    <span>{hours} <em>:</em> {mins}</span>
                    <span></span>
                </div>
                <div className='zmiti-edit-operator'>
                	<aside><span>&lt;</span>返回</aside>
                	<aside className='zmiti-text-overflow'>{this.props.title}</aside>
                	<aside>
                		<div>
                			<span></span>
                			<span></span>
                			<span></span>
                		</div>
                	</aside>
                </div>
            </header>
		);
	}
}
