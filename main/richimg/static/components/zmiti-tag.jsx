import React from 'react';
import '../js/dragAndResize';
import $ from 'jquery';
import './zmiti-tag.css';
import {ZmitiEnhanceCom}  from  './zmiti-enhance-com.jsx';


class ZmitiTag extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            styles: {
                left: 0,
                top: 0
            },
            remarkStyle: {
                left: 0,
                top: 0,
                opacity: 0
            },
            textContent: ""

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

    hover() {
        if (!this.state.textContent) {
            return;
        }
        let target = $(this.refs[this.props.id]),
            rmWidth = target.find('.rm-tag-remark').width(),
            rmHeight = target.find('.rm-tag-remark').height(),
            tagWidth = 50;

        //
        this.setState({
            remarkStyle: {
                left: (tagWidth - rmWidth - 10) / 2,
                top: -rmHeight - 10
            }
        });
    }

    out() {
        this.setState({
            remarkStyle: {
                display: 'none'
            }
        })
    }

    render() {

        let img = '';
      /*  this.props.imgSrc === undefined && (this.props.imgSrc = '');
        this.props.videoSrc === undefined && (this.props.videoSrc = '');*/
        if(this.props.type === 'image'&& this.props.imgSrc.length>0 && (this.props.imgSrc.includes('.png')||this.props.imgSrc.includes('.jpg')||this.props.imgSrc.includes('.gif'))){
                img = <div><img src={this.props.imgSrc} width={this.state.remarkStyle.width}  alt=""/><span onClick={this.deleteImg.bind(this)} className="fly-z-close">&times;</span></div>;
        }

        return (
            <section key={this.props.id} id={this.props.id} ref={this.props.id} style={this.props.styles} className="fly-tag">

                <div className="rm-tag-remark" hidden={this.props.id === this.props.focusTag.id ? '':'hidden'}
                     style={this.state.remarkStyle}>
                    {img}
                    <div dangerouslySetInnerHTML={{__html:this.props.content}}></div>

                </div>
                <div className="tag">
                    <div
                        style={{background:"url("+this.props.icon+") no-repeat center",backgroundSize:'contain',borderRadius:"50%"}}
                        className="ico"></div>
                </div>
            </section>
        )
    }
    deleteImg(){

        this.props.changeTagPropValue('imgSrc','');
    }

    componentDidMount() {

        this.initLoaded && this.setState({
            remarkStyle: {
                display: this.props.id === this.props.focusTag.id ? 'block' : 'none'
            }
        });

        let style = this.props.styles;

        this.stageWidth = this.stageWidth || 0;
        this.stageHeight = this.stageHeight || 1;
        $('#targetImg').on('load', (e)=> {
            this.stageWidth = $('#targetImg').width();
            this.stageHeight = $('#targetImg').height();
        });

        // PubSub.publish('getFocusTagContent',this.props.content);

        this.setState({
            styles: {
                left: style.left,
                top: style.top
            },
            textContent: this.props.content
        });

        let self = this,
            target = $(this.refs[this.props.id]);

        target.find('.tag').dragAndReize({
            callback(option){

                self.stageWidth = $('#targetImg').width();
                self.stageHeight = $('#targetImg').height();

                self.props.changeTagPropValue("styles", {
                    left: option.x / self.stageWidth * 100 + '%',
                    top: option.y / self.stageHeight * 100 + '%'
                });

            }
        }).on('mousedown', e=> {
            $('.fly-tag').hidePoint();
            $(e.target).parents('.fly-tag').showPoint();
            this.initLoaded = true;
            self.props.getFocusComponent(this.props.index);

            this.setState({
                remarStyle: {
                    opacity: 1
                }
            })


        });

        this.changeTagContent = PubSub.subscribe("changeTagContent", (d, e)=> {

            if(this.props.id === this.props.focusTag.id){
                let target = $(this.refs[this.props.id]).find('.rm-tag-remark'),
                    rmWidth = target[0].offsetWidth,
                    rmHeight = target[0].offsetHeight,
                    tagWidth = 50;


                this.props.changeTagPropValue('wrapStyles', {
                    width: rmWidth + 'px',
                    height: rmHeight + 'px'
                });


                this.setState({
                    remarkStyle: {
                        left: (tagWidth - rmWidth - 10) / 2,
                        top: -rmHeight - 10,
                        ///display: e.type
                    },
                    textContent: e.html
                });
            }

        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.changeTagContent);
    }

}

export default ZmitiEnhanceCom(ZmitiTag);