import React from 'react';
import './scss/zmiti-stage.css';
import PubSub from '../js/pubsub';
import ShapeGenerater from '../shapes.jsx';

import { Slider, InputNumber,Icon, Row, Button,Col,Tooltip,message } from '../../../commoncomponent/common.jsx';
import  ZmitiUploadDialog from '../../../components/zmiti-upload-dialog.jsx';
import $ from 'jquery';

export default class ZmitiStage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            imgList: [],
            width: 1000,
            height: 500,
            scaleValue:1,
            showPanel:true,
            scale:1 //当前舞台的缩放比例
        };


        this.containerArr =[];
        this.currentMask = null;
    }

    drag(bmp,container){
        let s=  this;
        var disX, disY;
       
        bmp.on("mousedown", function (e) {
            if (s.isDrag) { //用户按下空格键，则不能拖拽图片。
                return;
            }

            s.currentMask = bmp;
            s.currentMask.scale  = s.currentMask.scale || 1;

            s.setState({
              scaleValue: s.currentMask.scale,
            });

            s.currentMask.container = container;//删除虚线框的时候会用到。

            s.containerArr.forEach((item,i)=>{
                if(item && container && item.id === container.id){
                    s.containerArr.splice(i,1);
                }
            });
            
            container && s.containerArr.push(container);

            
            var shape = s.createDashShape(bmp);

            var c = container|| s.stage;

            container.children.forEach((item,i)=>{
                container.setChildIndex(item,i);
            });


            
            s.containerArr.forEach((item,i)=>{
                item.removeChild(item.getChildByName('shapes'));
                s.stage.setChildIndex(item,1+i);
            });

            shape.scaleX = s.currentMask.scale;
            shape.scaleY = s.currentMask.scale;

            s.stage.setChildIndex(c,0);

            c.addChild(shape);



           /* container.setChildIndex(container.getChildByName('shapes'),1);
            container.setChildIndex(bmp,2);*/



            e.preventDefault()
            
            var L  = window.mainLeftSize;
            disX = e.stageX  - bmp.x + L +  s.canvas.offsetLeft; //- s.canvas.width/2 + L;
            disY = e.stageY  - bmp.y + s.canvas.offsetTop + 52;//- s.canvas.height/2 + 50;
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
            bmp.x = s.dashShape.x = x;
            bmp.y = s.dashShape.y =y;
            //console.log(e.x*s.state.scale ,disX,s.state.scale);
            //s.stage.update();
        }

    }

    removeDashShape(){//移除虚线框
        this.containerArr.forEach((item,i)=>{
            item.removeChild(item.getChildByName('shapes'));
        });
        this.currentMask = null;
        this.dashCmd = null;
        this.stage.update();
    }

    createDashShape(bmp,scale){//创建虚线框
        var shape = new createjs.Shape();
        var s = this;
        s.dashCmd = shape.graphics.setStrokeDash([10,5]).command;
        shape.graphics.setStrokeStyle(3).beginStroke("#99071e").rect(0,0, bmp.image.width *( scale || 1), bmp.image.height * ( scale || 1));
        shape.x = bmp.x;
        shape.y = bmp.y;
        shape.name = 'shapes';
        s.dashShape = shape;

        return shape;
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
               
                let img = new Image();
                imgData.target.text.text = 'loading...';

                s.stage.update();
                img.crossOrigin = "anonymous";
                
                img.onload = function () {
                    
                    let bmp = new createjs.Bitmap(this);
                    bmp.x =  imgData.target.x;
                    bmp.y =  imgData.target.y;
                    imgData.target.text.alpha = 0;

                    imgData.target.container.addChild(bmp);

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
                    <div className='z-puzzle-drag' style={{left:this.state.width+stageStyle.left-(window.mainLeftSize||0),top:this.state.height+stageStyle.top}}></div>
                    <ZmitiUploadDialog id="puzzle" {...props}></ZmitiUploadDialog>
                </div>
                <ul className='z-puzzle-operator' onClick={this.changeScale.bind(this)}>
                    <li data-index={0}><span><Icon type='scan'></Icon></span></li>
                    <li data-index={1}><span><Icon type='plus-circle-o'></Icon></span></li>
                    <li data-index={2}><span><Icon type='minus-circle-o'></Icon></span></li>
                </ul>
                <section className={'z-puzzle-imgscale ' + (this.state.showPanel?'':'active')}>
                    <h3>图片调整<span onClick={this.closeImgScale.bind(this)}>&times;</span></h3>
                    <div>

                        <div style={{marginLeft:10,marginTop:5}}> 
                            <label>缩放</label>
                        </div>
                       <Row >
                        <Col span={1}>
                        </Col>
                        <Col span={12}>
                          <Slider min={.1} max={2} step={0.01} onChange={this.onScaleChange.bind(this)} value={this.state.scaleValue} />
                        </Col>
                        <Col span={4}>
                          <InputNumber  min={.1} max={2} step={0.01}  style={{ marginLeft: 16 }}
                            value={this.state.scaleValue} onChange={this.onScaleChange.bind(this)}
                          />
                        </Col>
                      </Row>
                    </div>
                    <section>
                        <Row style={{marginLeft:10,marginTop:10}}>
                            <Col span={4}>
                                <Tooltip placement="bottom" title={'删除图片'}>
                                    <div className='z-puzzle-delete' onClick={this.deleteMaskImg.bind(this)}>
                                        <div className='z-puzzle-line1'></div>
                                        <div className='z-puzzle-line2'></div>
                                        <div className='z-puzzle-line3'></div>
                                        <div className='z-puzzle-line4'></div>
                                        <div className='z-puzzle-vline1'></div>
                                        <div className='z-puzzle-vline2'></div>
                                        <div className='z-puzzle-vline3'></div>
                                        <div className='z-puzzle-vline4'></div>
                                    </div>
                                 </Tooltip>
                            </Col>
                            <Col span={4}>
                                 <Tooltip placement="bottom" title={'重置'}>
                                    <div className='z-puzzle-reset' onClick={this.resetCanvas.bind(this)}>
                                        <img src='./puzzle/static/images/reset.png'/>
                                    </div>
                                 </Tooltip>
                               
                            </Col>
                        </Row>
                    </section>
                     <div className='zmiti-imgscale-bar' onClick={this.closeImgScale.bind(this)}>
                         <Icon type="menu-fold" style={{display:this.state.showPanel?'inline-block':'none'}}/>
                        <Icon type="menu-unfold" style={{display:!this.state.showPanel?'inline-block':'none'}}/>
                        <span></span>
                        <span></span>
                        {this.state.showPanel?'收起':'展开'}
                     </div>
                </section>
            </article>
        )
    }

    closeImgScale(){//
        this.setState({
            showPanel:!this.state.showPanel
        });
    }

    onScaleChange(value) {
        this.setState({
          scaleValue: value,
        });

        if(this.currentMask){
            
            this.currentMask.scale = value;    
            this.currentMask.scaleX = value;
            this.currentMask.scaleY = value;
            this.dashShape.scaleX = value;
            this.dashShape.scaleY = value;
           /* this.removeDashShape();
            this.currentMask.container.addChild(this.createDashShape(this.currentMask,value));*/
            
        }
        

    }

    resetCanvas(){//重置画布
        
        var size = obserable.trigger({type:'getPicmMargin'});
        var method = window.obserable.trigger({type:'getCurrentMehtod'});//获取当前的渲染画布的方法。
        this.state.imgList.length = 0;//清空当前的所有的图片列表。
        this.renderCanvas(method,null,size);
       
    }

    deleteMaskImg(){//删除当前选中的图片

        if(!this.currentMask){//还没有选中图片。
            message.error('还没有选中图片。');
            return;
        }

        this.state.imgList.forEach((item,i)=>{
            if(item === this.currentMask.image.src){
                this.state.imgList.splice(i,1);
            }
        })

        this.currentMask.container.removeChild(this.currentMask,this.currentMask.container.getChildByName('shapes'));//移除虚线框。
        this.stage.update();
        this.currentMask = null;
        this.dashCmd = null;

    }

    componentDidMount() {

        window.obserable.on('removeDashShape',()=>{
            this.removeDashShape();
        });

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

                            containers[index].addChild(bmp);
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
                            containers[index].addChild(bmp);
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