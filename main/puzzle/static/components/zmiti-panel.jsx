import React from 'react';
import './scss/zmiti-panel.css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';
import {utilMethods,_$,$$} from '../../../utilMethod.es6';
import PubSub from '../js/pubsub';
import Button from 'antd/lib/button';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import  $ from 'jquery';


export default class ZmitiPanel extends React.Component {
    constructor(args) {
        super(...args);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.changeMould = this.changeMould.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.chooseMould = this.chooseMould.bind(this);
        this.changeWidth = this.changeWidth.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.downloadImg = this.downloadImg.bind(this);
        this.state = {
            current: 0,
            width: 1000,
            height: 600,
            currentMethod: 'renderRectLeftRight',
            dataUrl:'#',
            isLocked:false,
            picMargin:2,
            scale:-1,//当前图片缩放的比例
        }
    }

    changeHeight(value) {

        /*window.obserable.trigger({
            type:'setCanvasHeight',
            data:value
        })*/
        PubSub.publish('setCanvasHeight', value);
       /* var s = this;
         window.obserable.trigger({
            type:'renderCanvas',
            data:s.state.currentMethod
        });*/

        
        var state ={
            height: value
        };

        if(this.state.scale>-1){//等比缩放的
            state.width = value*this.state.scale;
            PubSub.publish('setCanvasWidth', state.height);
        }
        this.setState(state,()=>{
            PubSub.publish('renderCanvas', {method:this.state.currentMethod,marginSize:this.state.picMargin});    
        });
    }

    changeWidth(value) {

        var s = this;

        PubSub.publish('setCanvasWidth', value);

        
        var state = {
            width:value
        };
        if(this.state.scale>-1){
            state.height = value / this.state.scale;
            PubSub.publish('setCanvasHeight', state.height);
        }
        s.setState(state,()=>{
            PubSub.publish('renderCanvas', {method:this.state.currentMethod,marginSize:this.state.picMargin});
        });
    }

    render() {

        let moulds = [
        {
            type: 2,
            html: <div className={"p-mould p-mould-left-right "+ (this.state.currentMethod === 'renderRectLeftRight' ? 'active':'')} data-size="1000*500"
            data-method="renderRectLeftRight"

            key='renderRectLeftRight'>
            <aside></aside>
            <aside></aside>
            </div>
        },
        {
            type: 2,
            html: <div className={"p-mould p-mould-top-bottom "+(this.state.currentMethod === 'renderRectUpDown'?'active':'')} data-size="1000*500" data-method="renderRectUpDown"
            key='renderRectUpDown'>
            <aside></aside>
            <aside></aside>
            </div>
        },
        {
            type: 2,
            html: <div className={"p-mould p-mould-tilt " +  (this.state.currentMethod === 'renderRectTilt' ? 'active':'')} data-size="1000*500" data-method="renderRectTilt"
            key='renderRectTilt'>
            </div>
        },
        {
            type: 2,
            html: <div className={"p-mould p-mould-bessel " +(this.state.currentMethod === 'renderRectBessel' ? 'active':'')} data-size="500*800" data-method="renderRectBessel"
            key='renderRectBessel'>
            </div>
        },
        {
            type: 3,
            html: <div className={"p-mould p-mould-three1 " +(this.state.currentMethod === 'renderRectThree1' ? 'active':'')} data-size="1000*500" data-method="renderRectThree1"
            key='renderRectThree1'>
            </div>
        },
        {
            type: 3,
            html: <div className={"p-mould p-mould-three2 " + (this.state.currentMethod === 'renderRectThree2' ? 'active':'')} data-size="500*500" data-method="renderRectThree2"
            key='renderRectThree2'>
            </div>
        },
        {
            type: 3,
            html: <div className={"p-mould p-mould-three3 " + (this.state.currentMethod === 'renderRectThree3' ? 'active':'')} data-size="500*500" data-method="renderRectThree3"
            key='renderRectThree3'>
            </div>
        },
        {
            type: 4,
            html: <div className={"p-mould p-mould-four1 " +  (this.state.currentMethod === 'renderRectFour1' ? 'active':'')} data-size="1000*500" data-method="renderRectFour1"
            key='renderRectFour1'>
            </div>
        },
        {
            type: 4,
            html: <div className={"p-mould p-mould-four2 " + (this.state.currentMethod === 'renderRectFour2' ? 'active':'')} data-size="600*600" data-method="renderRectFour2"
            key='renderRectFour2'>
            </div>
        },
        {
            type: 4,
            html: <div className={"p-mould p-mould-four3 "+ (this.state.currentMethod === 'renderRectFour3' ? 'active':'')} data-size="600*600" data-method="renderRectFour3"
            key='renderRectFour3'>
            </div>
        },
        {
            type: 4,
            html: <div className={"p-mould p-mould-four4 "+(this.state.currentMethod === 'renderRectFour4' ? 'active':'')} data-size="600*600" data-method="renderRectFour4"
            key='renderRectFour4'>
            </div>
        }
        ];

        return (
            <div className="zmiti-panel-ui" ref="panel" style={{height:this.props.mainHeight}}>
            <section className="zmiti-panel-title" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            >
            <span></span><span>选择模板</span>
            <ul className="zmiti-close scroll" ref="close-bar" onClick={this.closePanel}>
            <li className="close1"></li>
            <li className="scroll"></li>
            <li className="close2"></li>
            </ul>
            </section>
            <header className="z-puzzle-header">
            <article>
            <div className="z-puzzle-width">
            宽 <InputNumber min={1} max={1920}  style={{color:'red'}} className="width-input-number" ref="input-number"
            value={this.state.width} size="large" onChange={this.changeWidth}/>
            </div>
            X
            <div className="z-puzzle-height">
            高 <InputNumber min={1} max={1920} className="height-input-number" value={this.state.height}
            size="large" onChange={this.changeHeight}/>
            </div>
            <div className='z-puzzle-lock' onClick={this.lockedScale.bind(this)}>
            <span  style={{background:'url(./puzzle/static/images/lock.png) no-repeat',backgroundPosition:!this.state.isLocked?'0 0':'-17px 0'}}></span>
            <div>{this.state.isLocked?'当前图片比例被锁定':'当前图片比例被解锁'}</div>
            </div>
            </article>
            <ul className='z-puzzle-scale' onClick={this.setScale.bind(this)}>
            <li>比例:</li>
            <li data-scale={16/9} className={this.state.scale === 16/9 ? 'active':''}>16:9</li>
            <li data-scale={9/16} className={this.state.scale === 9/16 ? 'active':''}>9:16</li>
            <li data-scale={4/3} className={this.state.scale === 4/3 ? 'active':''}>4:3</li>
            <li data-scale={3/4} className={this.state.scale === 3/4 ? 'active':''}>3:4</li>
            <li data-scale={1/1} className={this.state.scale === 1/1 ? 'active':''}>1:1</li>
            </ul>                    

            </header>

            <section className="zmiti-panel-body " ref="panel-body">
            <section className="zmiti-panel-type-C">

            <Tabs defaultActiveKey="1">
            <TabPane tab="全部" key="1">
            <article className="zmiti-panel-C" ref="zmiti-panel-C" onClick={this.chooseMould}>
                 {

                        moulds.filter((item)=> {
                            return 1;
                        }).map((it=> {
                            return it.html;
                        }))
                    }
            </article>
            </TabPane>

            {
                [2,3,4,5,6].map(num=>{
                    return   <TabPane tab={num} key={num}>
                    <article className="zmiti-panel-C" ref="zmiti-panel-C" onClick={this.chooseMould}>
                    {
                        moulds.filter((item)=> {
                         return item.type === num;
                     }).map((it=> {
                        return it.html;
                    }))
                 }
                 </article>
                 </TabPane>
             })
            }

            </Tabs>

            <div className='z-puzzle-border-style'>边框设置</div>
            <div className='z-puzzle-pic-margin'>
                <div>图片间距:</div>
                <div className='z-puzzle-size'>
                    <aside className={this.state.picMargin===0?'active':''} data-margin='0' onClick={this.setMarginSize.bind(this)}><span>无</span></aside>
                    <aside></aside>
                    <aside className={this.state.picMargin===2?'active':''} data-margin='2' onClick={this.setMarginSize.bind(this)}><span>中</span></aside>
                    <aside></aside>
                    <aside className={this.state.picMargin===4?'active':''} data-margin='4' onClick={this.setMarginSize.bind(this)}><span>大</span></aside>
                </div>
            </div>
            </section>
            
            </section>
            <div className='z-puzzle-download'><a target="_blank" download={this.state.dataUrl} onClick={this.downloadImg} href={this.state.dataUrl}>下载图片</a></div>
            </div>
            )
    }


    downloadImg() {
      ///  let imgPathURL = window.ZmitiState.toDataURL();
      this.setState({
        dataUrl:document.getElementsByTagName('canvas')[0].toDataURL()
    })
  }

  setMarginSize(e){
        
    var target= e.target;
    if(target.nodeName === 'SPAN'){
        target= target.parentNode;
    }

    var size = target.getAttribute('data-margin')*1;
   
    this.setState({
        picMargin:size
    },()=>{

        PubSub.publish('renderCanvas', {method:this.state.currentMethod,marginSize:size});
    })
  }

  componentWillMount() {
    window.obserable.on('getPicmMargin',()=>{
        return this.state.picMargin;
    });
  }

  componentDidMount() {
    
  }

    lockedScale(){//解锁、锁定比例
        var locked = this.state.isLocked;
        var state = {
            isLocked:!locked
        };

        if(!locked){
            state.scale = this.state.width / this.state.height;
        }
        else{
            state.scale = -1;
        }
        this.setState(state);
    }

    setScale(e){
        window.that = this;
        var scale = e.target.getAttribute('data-scale');
        if(scale){
            this.setState({
                scale:scale*1,
                isLocked:true,
                height:this.state.width / scale
            },()=>{
                window.obserable.trigger({
                    type:'setCanvasHeight',
                    data:this.state.width / scale
                });
                window.obserable.trigger({
                    type:'setCanvasWidth',
                    data:this.state.width
                });
                PubSub.publish('renderCanvas',{method:this.state.currentMethod,marginSize:this.state.picMargin});
            });
        }
    }

    chooseMould(e) { //切换模板。
        e.persist();
        let target = null;
        if (e.target.classList.contains('p-mould')) {
            target = e.target;
        }
        else if (e.target.parentNode.classList.contains('p-mould')) {
            target = e.target.parentNode;
        }
        this.lastTarget = this.lastTarget || null;
        if (this.lastTarget === target) {
            return;
        }
        if (target) {

            let method = target.dataset['method'];
            let size = target.dataset['size'];
            if (size) {
                let sizeArr = size.split('*');

                /*   !isNaN(sizeArr[0]*1) && this.changeWidth(sizeArr[0]*1);
                !isNaN(sizeArr[1]*1) && this.changeHeight(sizeArr[1]*1);*/

                this.setState({
                    width: sizeArr[0] * 1,
                    height: sizeArr[1] * 1
                });

                PubSub.publish('setCanvasWidth', sizeArr[0] * 1);
                PubSub.publish('setCanvasHeight', sizeArr[1] * 1);

            }
            this.setState({
                currentMethod: method
            });
            PubSub.publish('renderCanvas', {method,marginSize:this.state.picMargin});

            PubSub.publish('getMethod', method);

            target.classList.add('active');
            this.lastTarget = target;
        }
    }

    closePanel() {

        this.open = !this.open;
        let panel = this.refs['panel'];
        panel.classList[this.open ? 'add' : 'remove']('close');
        panel.classList.add("active");
        this.closeTimer && clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(()=> {
            panel.classList.remove("active");
        }, 500);
        let closeBar = _$('.zmiti-close');
        closeBar.classList[this.open ? 'add' : 'remove']('scroll');
        $$('li', closeBar)[0].classList[!this.open ? 'add' : 'remove']('close1');
        $$('li', closeBar)[1].classList[!this.open ? 'add' : 'remove']('scroll');
        $$('li', closeBar)[2].classList[!this.open ? 'add' : 'remove']('close2');
    }

    changeMould(e) {
        if (e.target.nodeName === 'LI') {
            this.setState({
                current: utilMethods.index(e.target)
            });
        }
    }

    onMouseOut() {

    }

    onMouseDown(e) {
        e.preventDefault();
        this.panel = this.refs['panel'];
        this.isMove = true;
        this.disX = e.pageX - this.panel.offsetLeft;
        this.disY = e.pageY - this.panel.offsetTop;
        return false;
    }

    onMouseMove(e) {
        if (this.isMove) {
            let x = e.pageX - this.disX,
            y = e.pageY - this.disY;
            x < 0 && (x = 0);
            y < 0 && (y = 0);

            this.panel.style.left = x + 'px';
            this.panel.style.top = y + 'px';
        }
    }

    onMouseUp(e) {
        e.preventDefault();
        this.isMove = false;
        return false;
    }
}
