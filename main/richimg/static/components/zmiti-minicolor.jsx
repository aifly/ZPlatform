import React from 'react';
import $ from 'jquery';
import a from  'jquery-minicolors';

import Input from 'antd/lib/input';
import  'jquery-minicolors/jquery.minicolors.png';
import 'jquery-minicolors/jquery.minicolors.css';


export default class ZmitiMiniColor extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
             value: 'rgba(0,0,0,0)'
        }
    }
    changeColor(){

    }
    render() {
        return (
            <div className="color-container">
                <a href="javascript:void(0)" className="minicolor" data-opacity="1">
                </a>
                <Input type="text" onChange={this.changeColor.bind(this)} value={this.state.value} className="form-control val"/>
            </div>
        )
    }
    componentDidMount() {//在挂载结束之后马上被调用，需要DOM节点初始化操作应该放在这里。
        var _this = this;

        $('.minicolor').each(function() {

            $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                inline: $(this).attr('data-inline') === 'true',
                opacity: $(this).attr('data-opacity'),
                change (hex, opacity) {
                    if (!hex) return;
                    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                    var sColor = hex;
                    if (sColor && reg.test(sColor)) {
                        if (sColor.length === 4) {
                            var sColorNew = "#";
                            for (var i = 1; i < 4; i += 1) {
                                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                            }
                            sColor = sColorNew;
                        }
                        //处理六位的颜色值
                        var sColorChange = [];
                        for (var i = 1; i < 7; i += 2) {
                            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                        }

                        _this.setState({value: "rgba(" + sColorChange.join(",") + "," + opacity + ")"})
                        //_this.props.value = "rgba(" + sColorChange.join(",") + "," + opacity + ")";
                        //console.log(_this.props.value);
                    }
                },
                theme: 'bootstrap'
            })

        });
    }
};