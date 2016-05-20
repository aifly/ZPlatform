

import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

export default class ZmitiTopBanner extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        return (
            <div className="rm-top-banner-group">
                <div className="form-group has-success">
                    <Input type="text" placeholder="输入标题名称" />
                    <Button bsStyle="success">添加标签</Button>
                </div>
                <div className="right-btn-group">
                    <Button >保存</Button>
                    <Button >返回</Button>
                </div>
            </div>
        )
    }
}