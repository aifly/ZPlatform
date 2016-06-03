import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';


export default class ZmitiBtnGroup extends React.Component {
    constructor(args) {
        super(...args);
    }

    warning(){
        message.warning("至少要有一个标签");
    }

    delete() {
        if (Zmiti.richImgData.tags.length <= 1) {
            this.warning();
            return;
        }
        this.props.deleteTag(Zmiti.richImgData.focusTagIndex);
        this.props.getFocusComponent(0);
    }

    render() {
        let style = {
            color: '#fff',
            fontSize: 30,
            border: '1px solid #ccc',
            position: 'relative',
            top: 8,
            padding: 6,
            borderRadius: 5,
            cursor: 'pointer'
        };
        return (
            <div className="rm-btn-group">
                <Icon onClick={this.delete.bind(this)} type="delete" style={style}/>
                <Button type="" size="large">CANCEL</Button>
                <Button type="primary" size="large">SAVE TAG</Button>
            </div>
        )
    }
}
