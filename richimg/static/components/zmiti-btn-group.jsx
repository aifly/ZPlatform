import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
import $ from 'jquery';


export default class ZmitiBtnGroup extends React.Component {
    constructor(args) {
        super(...args);
        this.save = this.save.bind(this);
    }

    warning() {
        message.warning("至少要有一个标签");
    }

    save() {

        let url = this.props.baseUrl + "works/upload_json";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                worksid: this.props.worksid,
                json: window.Zmiti
            },
            success(data){
                if (data.getret === 0) {
                    message.success('保存成功',4);
                }
                else{
                    message.error('保存失败',3);
                }
            }
        });
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
                <Button type="primary" size="large" onClick={this.save}>SAVE TAG</Button>
            </div>
        )
    }
}


