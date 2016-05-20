import React from 'react';
import $ from 'jquery';
import ZmitiTag from './zmiti-tag.jsx';


export default class ZmitiMainStage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            richImg:"./static/images/bg.jpg",
            items: [{
                "type": "text",
                "href": "http://www.zmiti.com",
                "content": "",
                "id": '1111',
                "icon": "images/red-plain.png",
                "iconHover": "images/hoverlink.png",
                "styles": {
                    "left": "55%",
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
                <ZmitiTag key={item.id} {...this.state.items[i]}></ZmitiTag>
            )
        });

        return (
            <div className='rm-main-stage' ref="mainStage">
                <div className="rm-img-container" ref="img-c">
                    <img  id="targetImg" src={this.state.richImg} alt="" draggable="false"/>
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


            stage.find('.rm-img-container')
                .width(targetImg.width())
                .height(targetImg.height());
        });


        let imgContainer = $('.rm-img-container', stage);

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