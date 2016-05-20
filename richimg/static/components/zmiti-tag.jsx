import React from 'react';
import '../js/dragAndResize';
import $ from 'jquery';
import './zmiti-tag.css'

export default class ZmitiTag extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            tags: []
        }
    }

    click() {
        this.state.tags.push({
            "type": "text",
            "href": "http://www.zmiti.com",
            "content": "",
            "id": 'aaaaaa',
            "icon": "images/red-plain.png",
            "iconHover": "images/hoverlink.png",
            "styles": {
                "left": "85%",
                "top": "42%"
            },
            "wrapStyles": {
                "width": "200px",
                "height": "130px",
                "fontFamily": "'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif"
            }
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div key={this.props.id} ref={this.props.id} style={this.props.styles} className="fly-tag"
                 onDoubleClick={this.click.bind(this)}>
                <div style={{background:"url("+this.props.icon+") no-repeat center",backgroundSize:'contain'}}
                     className="ico"></div>
            </div>
        )
    }

    componentDidMount() {

        $(this.refs[this.props.id]).dragAndReize().on('mousedown', e=> {
            $('.fly-tag').hidePoint();
            $(e.target).parents('.fly-tag').showPoint();
        });
    }
}