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
            height: 500,
            currentMethod: 'renderRectLeftRight',
            dataUrl:'#'
        }
    }

    changeHeight(value) {
        PubSub.publish('setCanvasHeight', value);
        PubSub.publish('renderCanvas', this.state.currentMethod);
        this.setState({
            height: value
        });
    }

    changeWidth(value) {
        PubSub.publish('setCanvasWidth', value);
        PubSub.publish('renderCanvas', this.state.currentMethod);
        this.setState({
            width: value
        });
    }

    render() {

        let moulds = [
            {
                type: 2,
                html: <div className="p-mould p-mould-left-right active" data-size="1000*500"
                           data-method="renderRectLeftRight"
                           key='renderRectLeftRight'>
                    <aside></aside>
                    <aside></aside>
                </div>
            },
            {
                type: 2,
                html: <div className="p-mould p-mould-top-bottom" data-size="1000*500" data-method="renderRectUpDown"
                           key='renderRectUpDown'>
                    <aside></aside>
                    <aside></aside>
                </div>
            },
            {
                type: 2,
                html: <div className="p-mould p-mould-tilt" data-size="1000*500" data-method="renderRectTilt"
                           key='renderRectTilt'>
                </div>
            },
            {
                type: 2,
                html: <div className="p-mould p-mould-bessel" data-size="500*800" data-method="renderRectBessel"
                           key='renderRectBessel'>
                </div>
            },
            {
                type: 3,
                html: <div className="p-mould p-mould-three1" data-size="1000*500" data-method="renderRectThree1"
                           key='renderRectThree1'>
                </div>
            },
            {
                type: 4,
                html: <div className="p-mould p-mould-four1" data-size="1000*500" data-method="renderRectFour1"
                           key='renderRectFour1'>
                </div>
            },
            {
                type: 4,
                html: <div className="p-mould p-mould-four2" data-size="600*600" data-method="renderRectFour2"
                           key='renderRectFour2'>
                </div>
            },
            {
                type: 4,
                html: <div className="p-mould p-mould-four3" data-size="600*600" data-method="renderRectFour3"
                           key='renderRectFour3'>
                </div>
            },
            {
                type: 4,
                html: <div className="p-mould p-mould-four4" data-size="600*600" data-method="renderRectFour4"
                           key='renderRectFour4'>
                </div>
            }
        ];
        return (
            <div className="zmiti-panel-ui" ref="panel">
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
                            宽 <InputNumber min={1} max={1920} className="width-input-number" ref="input-number"
                                           value={this.state.width} size="large" onChange={this.changeWidth}/>
                        </div>
                        <div className="z-puzzle-height">
                            高 <InputNumber min={1} max={1920} className="height-input-number" value={this.state.height}
                                           size="large" onChange={this.changeHeight}/>
                        </div>
                    </article>
                    <div style={{marginTop:6}}><a target="_blank" download={this.state.dataUrl} onClick={this.downloadImg} href={this.state.dataUrl}>下载图片</a></div>
                </header>

                <section className="zmiti-panel-body " ref="panel-body">
                    <section className="zmiti-panel-type-C">
                        <ul onClick={this.changeMould}>
                            <li className={this.state.current === 0 ? 'active':''}>全部</li>
                            <li className={this.state.current === 1 ? 'active':''}>2</li>
                            <li className={this.state.current === 2 ? 'active':''}>3</li>
                            <li className={this.state.current === 3 ? 'active':''}>4</li>
                        </ul>
                        <article className="zmiti-panel-C" ref="zmiti-panel-C" onClick={this.chooseMould}>
                            {
                                moulds.filter((item)=> {
                                    if (this.state.current === 0) {//全部的。
                                        return 1;
                                    }
                                    return item.type === this.state.current + 1;
                                }).map((it=> {
                                    return it.html;
                                }))
                            }
                        </article>
                    </section>
                </section>
            </div>
        )
    }


    downloadImg() {
      ///  let imgPathURL = window.ZmitiState.toDataURL();
        this.setState({
            dataUrl:document.getElementsByTagName('canvas')[0].toDataURL()
        })
    }

    componentDidMount() {

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

            $$('.p-mould', this.refs['zmiti-panel-C']).forEach(item=> {
                item.classList.contains('active') && item.classList.remove('active');
            });

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
            PubSub.publish('renderCanvas', method);

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
