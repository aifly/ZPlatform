import React from 'react';
import $ from 'jquery';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import ZmitiTag from './zmiti-tag.jsx';


export default class ZmitiMainStage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            width:'auto',
            defaultWidth:0,
            richImg: "./static/images/2.png",
            scale: 1,
            items: [{
                "type": "text",
                "href": "http://www.zmiti.com",
                "content": "",
                "id": ZmitiTag.getGuid(),
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

    setScale(sign = 1) {
        let scale = this.state.scale+ .02 * sign;
        scale <=.25 &&(scale=.25);
        scale >=1.75 &&(scale=1.75);

        this.setState({
            scale: scale ,
            width:this.state.defaultWidth * ( scale + .02 * sign)
        });
    }

    default(){

        let stage = $(this.refs.mainStage);
        stage.transX = 0;
        stage.transY = 0;
        let imgContainer = $('.rm-img-container', stage);
        imgContainer.css({transform: 'translate3d(0,0,0)'});
        this.setState({
            scale: 1,
            width:this.state.defaultWidth
        });
    }

    fit(){
        this.setState({
            scale: 1,
            width:this.refs.mainStage.offsetWidth
        });
    }

    render() {

        let style = {
            width:this.state.width
        } ,
            item = this.state.items.map((item, i)=> {
            return (
                <ZmitiTag key={item.id}  {...this.state.items[i]}></ZmitiTag>
            )
        });

        return (
            <div className='rm-main-stage' ref="mainStage">
                <div className="rm-img-container" ref="img-c" style={style}>
                    <img style={{width:'100%',height:'auto'}} id="targetImg" src={this.state.richImg} alt=""
                         draggable="false"/>
                    {item}
                </div>
                <div className="rm-operator-bar">
                    <div onClick={this.setScale.bind(this,1)}><Icon type='plus'></Icon></div>
                    <div onClick={this.default.bind(this)}>FIT</div>
                    <div onClick={this.setScale.bind(this,-1)}><Icon type='minus'></Icon></div>
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

        targetImg.on('load', (e)=> {

            this.setState({
               width: stage.offsetWidth,
               defaultWidth: e.currentTarget.naturalWidth
            });

            /*stage.find('.rm-img-container')
                .width(targetImg.width())
                .height(targetImg.height());*/
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
                    let ty = (e.clientY - stage.startY + stage.currentY) ;
                    let tx = (e.clientX - stage.startX + stage.currentX);
                    imgContainer.css({transform: 'translate3d(' + tx + 'px,' + ty + 'px,0) '});
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
            if(e.ctrlKey && e.keyCode === 97){ // ctrl+1
                e.preventDefault();
                this.default();
                return false;
            }
            else if(e.ctrlKey && e.keyCode === 96){ // ctrl+0
                e.preventDefault();
                this.fit();
                return false;
            }
            else if (e.ctrlKey && e.keyCode === 221){
                e.preventDefault();
                this.setScale(1);
                return false;
            }
            else if (e.ctrlKey && e.keyCode === 219){
                e.preventDefault();
                this.setScale(-1);
                return false;
            }
        }).on('keyup', e=> {
            if (e.keyCode === 32) {
                if (stage.blur) {
                    e.preventDefault();
                }
                stage.keydown = false;
                targetImg.css({cursor: 'default'})
            }
        });


    }
}