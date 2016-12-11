import React from 'react';
import './scss/zmiti-stage.css';
import PubSub from '../js/pubsub';
import ShapeGenerater from '../shapes.jsx';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import  ZmitiUploadDialog from '../../../components/zmiti-upload-dialog.jsx';
import $ from 'jquery';

export default class ZmitiStage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            imgList: [],
            width: 1000,
            height: 500,
            
            scale:1 //当前舞台的缩放比例
        };
        this.containerArr =[];
        this.currentMask = null;
    }

    drag(bmp,container){
        let s=  this;
        var disX, disY;
        var dashShape =null;
        
        bmp.on("mousedown", function (e) {
            if (s.isDrag) { //用户按下空格键，则不能拖拽图片。
                return;
            }

            s.currentMask = bmp;

            s.containerArr.forEach((item,i)=>{
                if(item && container && item.id === container.id){
                    s.containerArr.splice(i,1);
                }
            });
            
            container && s.containerArr.push(container);

            var shape = new createjs.Shape();
            s.dashCmd = shape.graphics.setStrokeDash([10,5]).command;
            shape.graphics.setStrokeStyle(2).beginStroke("green").rect(0,0, bmp.image.width, bmp.image.height);
            shape.x = bmp.x;
            shape.y = bmp.y;
            shape.name = 'shapes';
            dashShape = shape;
            var c = container|| s.stage;
            
            s.containerArr.forEach((item,i)=>{
                item.removeChild(item.getChildByName('shapes'));
                s.stage.setChildIndex(item,1+i);
            });

            s.stage.setChildIndex(c,0);

            c.addChild(shape);

            e.preventDefault()
            
            var L  = window.mainLeftSize;
            disX = e.stageX  - bmp.x + L +  s.canvas.offsetLeft; //- s.canvas.width/2 + L;
            disY = e.stageY  - bmp.y + s.canvas.offsetTop + 50;//- s.canvas.height/2 + 50;
           // document.title = bmp.x+','+s.canvas.offsetLeft;
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", moveHandler);
            });
        });



        function moveHandler(e) {
           var x =e.x - disX,
            y = e.y - disY;

           // dashShape.x
            bmp.x = dashShape.x = x;
            bmp.y = dashShape.y =y;
            //console.log(e.x*s.state.scale ,disX,s.state.scale);
            //s.stage.update();
        }

    }

    render() {
        let s = this;
        const props = {
            S:this,
            baseUrl: s.props.baseUrl,
            getusersigid: s.props.getusersigid,
            userid: s.props.userid,
            onFinish(imgData){


                s.state.imgList.push(imgData.src);
                s.forceUpdate();

                let img = new Image();
                imgData.target.text.text = '        loading...';

                img.crossOrigin = "anonymous";
                
                img.onload = function () {

                    let bmp = new createjs.Bitmap(this);
                    bmp.x =  imgData.target.x;
                    bmp.y =  imgData.target.y;
                    imgData.target.text.alpha = 0;

                    s.stage.addChild(bmp);

                    bmp.mask = imgData.target.rect;

                    s.stage.update();
                    s.drag(bmp,imgData.target.container);
                };
                
                img.src = imgData.src;//'http://api.zmiti.com/zmiti_ele/user/xuchang/material/20161127/9898db3eb0c472ac10d1eb39523622b2.jpg';
                        //;
            }
        };
        var stageStyle = {
           /* transform:'scale('+this.state.scale+')',
            WebkitTransform:'scale('+this.state.scale+')',*/
            transformOrigin:'center',
            WebkitTransformOrigin:'center',
            top:(document.documentElement.clientHeight -  this.state.height) / 2 ,
            left:(document.documentElement.clientWidth -  this.state.width) / 2 
            
        }
        
        return (
            <article className="z-puzzle-stage">
                <div className="z-puzzle-canvas-C">
                    <canvas ref="z-puzzle-canvas" style={stageStyle} width={this.state.width} height={this.state.height}></canvas>
                    <ZmitiUploadDialog id="puzzle" {...props}></ZmitiUploadDialog>
                </div>
                <ul className='z-puzzle-operator' onClick={this.changeScale.bind(this)}>
                    <li data-index={0}><span><Icon type='scan'></Icon></span></li>
                    <li data-index={1}><span><Icon type='plus-circle-o'></Icon></span></li>
                    <li data-index={2}><span><Icon type='minus-circle-o'></Icon></span></li>
                </ul>
            </article>
        )
    }

    componentDidMount() {
        var s= this;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on("tick", function(){
            if(s.dashCmd){
                s.dashCmd.offset+=1;
                s.stage.update();    
            }
            
        });

        var size = obserable.trigger({type:'getPicmMargin'});
        this.renderCanvas('renderRectLeftRight',null,size);

        PubSub.subscribe('renderCanvas', (e, data)=> {
            this.renderCanvas(data.method,null,data.marginSize);
        });
        var s = this;
        window.obserable.on("renderCanvas",(method)=>{
          
            s.renderCanvas(method);
        });

        window.obserable.on('setCanvasWidth',(width)=>{
            s.setState({
                width: width
            })
        })

        PubSub.subscribe('setCanvasWidth', (e, width)=> {
            this.setState({
                width: width
            })
        });

        window.obserable.on('setCanvasHeight',(height)=>{

            s.setState({
                height: height
            })
        })

       PubSub.subscribe('setCanvasHeight', (e, height)=> {
            this.setState({
                height: height
            })
        });

        this.isDrag = false;
        document.addEventListener('keydown', e=> {
            if (e.keyCode === 32) {
                this.isDrag = true;
                this.canvas.style.cursor = 'pointer';
            }
            ;
        });

        document.addEventListener('keyup', e=> {
            if (e.keyCode === 32) {
                this.isDrag = false;
                this.canvas.style.cursor = 'default';
            }
        });

        this.canvas.onmousedown = e => {
            if (this.isDrag) {
                let disX = e.pageX - this.canvas.offsetLeft ,//- window.mainLeftSize,
                    disY = e.pageY - this.canvas.offsetTop;

                console.log(disX);

                document.onmousemove = ev => {
                    this.canvas.style.left = ev.pageX - disX + 'px';
                    this.canvas.style.top = ev.pageY - disY + 'px';
                }
                document.onmouseup = ev=> {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }

    }

    changeScale(e){//
        if(e.target.nodeName === 'UL'){
            return;
        }
        var index = -1;
        if(e.target.nodeName==="LI"){
            index = e.target.getAttribute('data-index');
        }
        else {
            index = $(e.target).parents('li').data('index');
        }
        switch(index*1) {
            case 0:
                this.setState({
                    scale:1
                });
                break;
            case 1:
                if(this.state.scale+.1>2){
                    this.setState({
                        scale:2
                    });
                    return;
                }
                this.setState({
                    scale:this.state.scale+.1
                });

                break;
            case 2:
                if(this.state.scale - .1 < .1){
                    this.setState({
                        scale:.1
                    });
                    return;
                }
                this.setState({
                    scale:this.state.scale-.1
                });
                break;
        }
    }

    /**
     * 重新渲染canvas画布
     * @param  {String} method     [description]
     * @param  {[type]} target     [description]
     * @param  {Number} marginSize [description]
     * @return {[type]}            [description]
     */
    renderCanvas(method = 'renderRectLeftRight',target= null,marginSize=0) {

        this.canvas = this.canvas || this.refs['z-puzzle-canvas'];

        if (!this.canvas) return;

        let {width,height} = this.state;
       
        !this.stage && (this.stage = new createjs.Stage(this.canvas));
        this.stage.removeAllChildren();

        let colors = ['#ff99c1', '#ffdb71','#b6d172','#aaddff','#78c9ba'];

        let stage = this.stage,
            s = this;

        ShapeGenerater[method]({stage, colors, width, height,marginSize}, function () {
            let arr = Array.from(arguments);

            if(s.state.imgList.length){
                if(s.state.imgList.length >= arr.length){
                    var containers = window.obserable.trigger({type:'getContianers'});
                    arr.forEach((img,i)=> {
                        let image = new Image();
                        image.crossOrigin = "Anonymous";
                        arr[i].text.alpha =1;//显示loading
                        stage.update();
                        let index = i;
                        image.onload = function(){
                            let bmp = new createjs.Bitmap(this);

                            bmp.x =arr[i].x || 0;
                            bmp.y =arr[i].y || 0;

                            stage.addChild(bmp);
                            bmp.mask = arr[i].rect;
                            arr[i].text.alpha =0;//隐藏loading.
                            s.drag(bmp,containers[index]);
                            stage.update();
                        }
                        image.src = s.state.imgList[i];

                    });
                }
                else{
                    var containers = window.obserable.trigger({type:'getContianers'});

                    s.state.imgList.forEach((img,i)=> {
                        let index = i;
                        let image = new Image();
                        arr[i].text.alpha =1;//显示loading
                        stage.update();
                        image.crossOrigin = "Anonymous";
                        image.onload = function(){
                            let bmp = new createjs.Bitmap(this);
                            bmp.x =bmp.y =0;
                            stage.addChild(bmp);
                            bmp.mask = arr[i].rect;
                            arr[i].text.alpha =0;//隐藏loading.
                            s.drag(bmp,containers[index]);
                            stage.update();
                        }
                        image.src = img;

                    });
                }

            }

        },target);

    }


}