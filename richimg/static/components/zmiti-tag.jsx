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
            },
            remarkStyle:{
                left:0,
                top:0,
                display:'none'
            },
            textContent:""


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

    hover(){
        if(!this.state.content){
            return;
        }
       let target =$(this.refs[this.props.id]),
            rmWidth = target.find('.rm-tag-remark').width(),
            rmHeight = target.find('.rm-tag-remark').height(),
            tagWidth = 50;

        //PubSub.publish('getFocusTagContent',this.props.content);
        this.setState({
            remarkStyle:{
                left:(tagWidth-rmWidth - 10)/2,
                top:-rmHeight-10
            }
        });
    }

    out(){
        this.setState({
            remarkStyle:{
                display:'none'
            }
        })
    }

    render() {

        let componentType = null;
        //switch (this.props)
        return (
            <section  key={this.props.id}  ref={this.props.id}   style={this.state.styles} className="fly-tag">
                <div className="rm-tag-remark"  style={this.state.remarkStyle}
                     dangerouslySetInnerHTML={{__html:this.state.textContent}}>
                </div>
                <div className="tag" onMouseOver={this.hover.bind(this)} onMouseOut={this.out.bind(this)} >
                    <div style={{background:"url("+this.props.icon+") no-repeat center",backgroundSize:'contain'}}
                         className="ico"></div>
                </div>
            </section>
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

        let self = this,
            target =$(this.refs[this.props.id]);

        target.find('.tag').dragAndReize({callback(option){

            self.stageWidth = $('#targetImg').width();
            self.stageHeight = $('#targetImg').height() ;

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

        this.changeTagContent = PubSub.subscribe("changeTagContent",(d,e)=>{
            let target =$(this.refs[this.props.id]),
                rmWidth = target.find('.rm-tag-remark').width(),
                rmHeight = target.find('.rm-tag-remark').height(),
                tagWidth = 50;

            //PubSub.publish('getFocusTagContent',this.props.content);
            this.setState({
                remarkStyle:{
                    left:(tagWidth-rmWidth - 10)/2,
                    top:-rmHeight-10,
                    display:e.type

                },
                textContent:e.html
            });
        });
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.changeTagContent);
    }

}

export default ZmitiEnhanceCom(ZmitiTag);