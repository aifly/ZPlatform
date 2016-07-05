import React from 'react';
import './scss/zmiti-stage.css';
import PubSub from '../js/pubsub';
import ShapeGenerater from '../shapes.jsx';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css'

import  ZmitiUploadDialog from '../../../components/zmiti-upload-dialog.jsx';

export default class ZmitiStage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            imgList : [],
            width:1000,
            height:500
        };
    }

    render() {
        let s = this;
        const props = {
            baseUrl: s.props.baseUrl,
            getusersigid:s.props.getusersigid,
            onFinish(imgData){
                s.state.imgList.push(imgData.src);
                s.forceUpdate();

                let img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = function(){
                    let bmp = new createjs.Bitmap(img);

                    bmp.x = 0;
                    bmp.y = 0;

                    s.stage.addChild(bmp);

                    bmp.mask = imgData.target;

                    var disX, disY;
                    bmp.on("mousedown", function (e) {

                        disX = e.stageX - bmp.x +s.canvas.offsetLeft;
                        disY = e.stageY - bmp.y +s.canvas.offsetTop-10;
                        document.addEventListener("mousemove", moveHandler);
                        document.addEventListener("mouseup", function () {
                            document.removeEventListener("mousemove", moveHandler);
                        });
                    });

                    function moveHandler(e) {

                        bmp.x = e.x - disX;
                        bmp.y = e.y - disY -10;
                        s.stage.update();
                    }

                    s.stage.update();


                };
                img.src=imgData.src;
            }
        };
        return (
            <article className="z-puzzle-stage">
                <div className="z-puzzle-canvas-C">
                    <canvas ref="z-puzzle-canvas" width={this.state.width} height={this.state.height}></canvas>
                    <ZmitiUploadDialog  id="puzzle" {...props}></ZmitiUploadDialog>
                </div>
            </article>
        )
    }

    componentDidMount() {
        this.renderCanvas();
        PubSub.subscribe('renderCanvas', (e, method)=> {
            this.renderCanvas(method);
        });

        PubSub.subscribe('setCanvasWidth',(e,width)=>{
            this.setState({
                width:width
            })
        });
        PubSub.subscribe('setCanvasHeight',(e,height)=>{
            this.setState({
                height:height
            })
        });

    }

    renderCanvas(method = 'renderRectLeftRight') {

        let canvas = this.refs['z-puzzle-canvas'];

        if (!canvas) return;

        let {width,height} = this.state;

        this.canvas = canvas;
        !this.stage && (this.stage = new createjs.Stage(canvas));
        this.stage.removeAllChildren();

        let colors = ['#ff99c1', '#ffdb71'];

        let stage = this.stage,
            s=this;



        ShapeGenerater[method]({stage, colors, width, height},function(){
            let arr = arguments;

            s.state.imgList.forEach(img=>{
                console.log(1)
               /* let image = new Image();
                image.onload=  function(){
                    let bmp = new createjs.Bitmap(this);
                    stage.addChild(bmp);
                    bmp.mask = arr[i];

                    s.stage.update();
                }
                image.src = img;*/
            });
        });

    }


}