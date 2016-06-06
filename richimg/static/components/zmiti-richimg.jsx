import React from 'react';
import './zmiti-richimg.css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';



export default class ZmitiRichImg extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return (
            <div className="zmiti-richimg-C" style={{height:this.props.height}}>
                <img src="./static/images/2.png" alt="" draggable="false"/>
                <div className="zmiti-name">智媒体</div>
                <div className="zmiti-athor-C">
                    <aside>作者：<span>ilinten</span></aside>
                    <aside>
                        <Icon type="eye"></Icon>
                        <Icon type="setting"></Icon>
                        <ul>
                            <li>删除<Icon type="delete"></Icon></li>
                            <li>分享<Icon type="share-alt"></Icon></li>
                        </ul>
                    </aside>
                </div>
            </div>
        )
    }
}