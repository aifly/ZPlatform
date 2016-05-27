import React from 'react';
import '../js/dragAndResize';
import $ from 'jquery';
import './zmiti-tag.css';
import {ZmitiEnhanceCom}  from  './zmiti-enhance-com.jsx';

class ZmitiTag extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            styles:{
                left:0,
                top:0
            }

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
            <div key={this.props.id}   ref={this.props.id} style={this.state.styles} className="fly-tag">
                <div style={{background:"url("+this.props.icon+") no-repeat center",backgroundSize:'contain'}}
                     className="ico"></div>
            </div>
        )
    }

    componentDidMount() {

        let style = this.props.styles;

        this.stageWidth = this.stageWidth || 0;
        this.stageHeight =this.stageHeight || 1;
        $('#targetImg').on('load',(e)=>{
            this.stageWidth = $('#targetImg').width();
            this.stageHeight = $('#targetImg').height() ;

        });



        this.setState({
            styles:{
                left:style.left,
                top:style.top
            }
        });

        let self = this;
        $(this.refs[this.props.id]).dragAndReize({callback(option){
            console.log(self.stageHeight,self.stageWidth)
            self.setState({
                styles:{
                    left:option.x / self.stageWidth *100 + '%',
                    top :option.y / self.stageHeight*100 + '%'
                }
            });
            //  console.log(self.state.styles.left,self.state.styles.top)
        }}).on('mousedown', e=> {
            $('.fly-tag').hidePoint();
            $(e.target).parents('.fly-tag').showPoint();
        });

    }
}

export default ZmitiEnhanceCom(ZmitiTag);