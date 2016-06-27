
/**
 * Created by fly on 2016/4/6 0006.
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Input,ButtonToolbar,Grid,Row,Col,Modal,Popover,Tooltip,Image} from 'react-bootstrap';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import './dragAndResize';
import reactMixin from 'react-mixin';
import utilMixin from './utilmixin';

class Tag extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            tags:[

            ]
        }
    }

    click() {
        this.state.tags.push({
            "type": "text",
            "href": "http://www.zmiti.com",
            "content": "",
            "id": this.getGuid(),
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
reactMixin(Tag.prototype, utilMixin);

let tag = new Tag();
console.log(tag)

export default class Stage extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        return (
            <div>
                <TopBanner />
                <MainStage></MainStage>
            </div>
        )
    };
}

class TopBanner extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        return (
            <div className="top-banner-group">
                <form className="form-inline input-form">
                    <div className="form-group has-success">
                        <input type="text" placeholder="输入标题名称" className="form-control"/>
                        <Button bsStyle="success">添加标签</Button>
                    </div>
                </form>
                <div className="right-btn-group">
                    <ButtonToolbar>
                        <Button >保存</Button>
                        <Button >返回</Button>
                    </ButtonToolbar>
                </div>
            </div>
        )
    }
}

class MainStage extends React.Component {
    constructor(args) {

        super(...args);

        this.state = {
            items: [{
                "type": "text",
                "href": "http://www.zmiti.com",
                "content": "",
                "id": this.getGuid(),
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
            }]
        };
    }

    click() {

        var newItems = this.state.items.slice();//复制一个数组。

        newItems.splice(0, 1);

        this.setState({items: newItems})
    }

    createTag() {

    }

    render() {

        let item = this.state.items.map((item, i)=> {
            return (
                <Tag key={item.id} {...this.state.items[i]}></Tag>
            )
        });

        return (
            <div className='fly-main-stage' ref="mainStage" style={{border:'1px solid #eee'}}>
                <div className="fly-img-container">
                    <Image id="targetImg" src="./static/images/bg.jpg" alt="" draggable="false"/>
                    {item}
                </div>
            </div>
        )
    }

    componentWillMount() {

    }

    componentDidMount() {

        let stage = $(this.refs.mainStage),
            targetImg = $('#targetImg');
        stage.keydown = false;
        stage.height(document.documentElement.clientHeight - stage.offset().top - 50);

        targetImg.on('load', ()=> {
            stage.find('.fly-img-container')
                .width(targetImg.width())
                .height(targetImg.height());
        });


        let imgContainer = $('.fly-img-container', stage);

        stage.transX = 0;
        stage.transY = 0;
        stage.on('mousedown', e=> {

            stage.currentX = stage.transX;
            stage.currentY = stage.transY;

            stage.startX = e.clientX;
            stage.startY = e.clientY;

            stage.lastX = e.clientX;
            stage.lastY = e.clientY;

            $(document).on('mousemove', e=> {
                if (stage.keydown) {
                    let ty = e.clientY - stage.startY + stage.currentY;
                    let tx = e.clientX - stage.startX + stage.currentX;
                    imgContainer.css({transform: 'translate3d(' + tx + 'px,' + ty + 'px,0)'});
                    stage.transY = ty;
                    stage.transX = tx;
                }
            }).on('mouseup', e=> {
                $(document).off('mousemove mouseup');
            });
        });

        $('div[contenteditable=true]').on('blur', ()=> {
            stage.blur = true;
        }).on('focus', ()=> {
            stage.blur = false;
        });

        $(window).on('keydown', e=> {
            if (e.keyCode === 32) {
                if (stage.blur) {
                    e.preventDefault();
                }
                $('input').blur();
                stage.keydown = true;
                targetImg.css({cursor: 'pointer'});

            }
        }).on('keyup', e=> {
            if (e.keyCode === 32) {
                if (stage.blur) {
                    e.preventDefault();
                }
                stage.keydown = false;
                targetImg.css({cursor: 'default'})
            }
        })

    }
}
reactMixin(MainStage.prototype, utilMixin);


