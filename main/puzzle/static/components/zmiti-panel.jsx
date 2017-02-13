import React from 'react';
import './scss/zmiti-panel.css';

import { Tabs, InputNumber,Icon,Modal,Select, Button} from '../../../commoncomponent/common.jsx';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import {utilMethods, _$, $$} from '../../../utilMethod.es6';
import PubSub from '../js/pubsub';
import  $ from 'jquery';
import IScroll from 'iScroll';

export default class ZmitiPanel extends React.Component {
    constructor(args) {
        super(...args);

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
            visible:false,
            imageType:"image/png",
            currentMethod: 'renderRectLeftRight',
            dataUrl: '#',
            isLocked: false,
            showDownload: true,//显示下载按钮
            picMargin: 2,
            showPanel:true,
            scale: -1,//当前图片缩放的比例
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


        var state = {
            height: value
        };

        if (this.state.scale > -1) {//等比缩放的
            state.width = value * this.state.scale;
            PubSub.publish('setCanvasWidth', state.height);
        }
        this.setState(state, ()=> {
            PubSub.publish('renderCanvas', {method: this.state.currentMethod, marginSize: this.state.picMargin});
        });
    }

    changeWidth(value) {

        var s = this;

        PubSub.publish('setCanvasWidth', value);


        var state = {
            width: value
        };
        if (this.state.scale > -1) {
            state.height = value / this.state.scale;
            PubSub.publish('setCanvasHeight', state.height);
        }
        s.setState(state, ()=> {
            PubSub.publish('renderCanvas', {method: this.state.currentMethod, marginSize: this.state.picMargin});
        });
    }

    render() {

        let moulds = [
            {
                type: 2,
                html: <div
                    className={"p-mould p-mould-left-right " + (this.state.currentMethod === 'renderRectLeftRight' ? 'active' : '')}
                    data-size="1000*500"
                    data-method="renderRectLeftRight"

                    key='renderRectLeftRight'>
                    <aside></aside>
                    <aside></aside>
                </div>
            },
            {
                type: 2,
                html: <div
                    className={"p-mould p-mould-top-bottom " + (this.state.currentMethod === 'renderRectUpDown' ? 'active' : '')}
                    data-size="1000*500" data-method="renderRectUpDown"
                    key='renderRectUpDown'>
                    <aside></aside>
                    <aside></aside>
                </div>
            },
            {
                type: 2,
                html: <div
                    className={"p-mould p-mould-tilt " + (this.state.currentMethod === 'renderRectTilt' ? 'active' : '')}
                    data-size="1000*500" data-method="renderRectTilt"
                    key='renderRectTilt'>
                </div>
            },
            {
                type: 2,
                html: <div
                    className={"p-mould p-mould-bessel " + (this.state.currentMethod === 'renderRectBessel' ? 'active' : '')}
                    data-size="500*800" data-method="renderRectBessel"
                    key='renderRectBessel'>
                </div>
            },
            {
                type: 3,
                html: <div
                    className={"p-mould p-mould-three1 " + (this.state.currentMethod === 'renderRectThree1' ? 'active' : '')}
                    data-size="1000*500" data-method="renderRectThree1"
                    key='renderRectThree1'>
                </div>
            },
            {
                type: 3,
                html: <div
                    className={"p-mould p-mould-three2 " + (this.state.currentMethod === 'renderRectThree2' ? 'active' : '')}
                    data-size="500*500" data-method="renderRectThree2"
                    key='renderRectThree2'>
                </div>
            },
            {
                type: 3,
                html: <div
                    className={"p-mould p-mould-three3 " + (this.state.currentMethod === 'renderRectThree3' ? 'active' : '')}
                    data-size="500*500" data-method="renderRectThree3"
                    key='renderRectThree3'>
                </div>
            },
            {
                type: 4,
                html: <div
                    className={"p-mould p-mould-four1 " + (this.state.currentMethod === 'renderRectFour1' ? 'active' : '')}
                    data-size="1000*500" data-method="renderRectFour1"
                    key='renderRectFour1'>
                </div>
            },
            {
                type: 4,
                html: <div
                    className={"p-mould p-mould-four2 " + (this.state.currentMethod === 'renderRectFour2' ? 'active' : '')}
                    data-size="600*600" data-method="renderRectFour2"
                    key='renderRectFour2'>
                </div>
            },
            {
                type: 4,
                html: <div
                    className={"p-mould p-mould-four3 " + (this.state.currentMethod === 'renderRectFour3' ? 'active' : '')}
                    data-size="600*600" data-method="renderRectFour3"
                    key='renderRectFour3'>
                </div>
            },
            {
                type: 4,
                html: <div
                    className={"p-mould p-mould-four4 " + (this.state.currentMethod === 'renderRectFour4' ? 'active' : '')}
                    data-size="600*600" data-method="renderRectFour4"
                    key='renderRectFour4'>
                </div>
            }
        ];

        return (
            <div className={'zmiti-panel-ui '+ (this.state.showPanel?'':'active')} ref="panel" style={{height: this.props.mainHeight}}>
                <div className='zmiti-panel-bar' onClick={this.closePanel}>
                    <Icon type="menu-fold" style={{display:this.state.showPanel?'inline-block':'none'}}/>
                    <Icon type="menu-unfold" style={{display:!this.state.showPanel?'inline-block':'none'}}/>
                    <span></span>
                    <span></span>
                    {this.state.showPanel?'收起':'展开'}
                </div>
                <div className={'zmiti-download-bar ' + (this.state.showPanel?' active':'')}>
                    <a  target="_blank" 
                        download={this.state.dataUrl}
                        onClick={this.downloadImg}
                        href={this.state.dataUrl}>
                        <Icon type="cloud-download"/>
                        <span></span>
                        <span></span>
                        下载图片
                    </a>
                </div>
                <section className="zmiti-panel-title">
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
                            宽 <InputNumber min={1} max={1920} style={{color: 'red'}} className="width-input-number"
                                           ref="input-number"
                                           value={this.state.width} size="large" onChange={this.changeWidth}/>
                        </div>
                        X
                        <div className="z-puzzle-height">
                            高 <InputNumber min={1} max={1920} className="height-input-number" value={this.state.height}
                                           size="large" onChange={this.changeHeight}/>
                        </div>
                        <div className='z-puzzle-lock' onClick={this.lockedScale.bind(this)}>
                            <span style={{
                                background: 'url(./puzzle/static/images/lock.png) no-repeat',
                                backgroundPosition: !this.state.isLocked ? '0 0' : '-17px 0'
                            }}></span>
                            <div>{this.state.isLocked ? '当前图片比例被锁定' : '当前图片比例被解锁'}</div>
                        </div>
                    </article>
                    <ul className='z-puzzle-scale' onClick={this.setScale.bind(this)}>
                        <li>比例:</li>
                        <li data-scale={16 / 9} className={this.state.scale === 16 / 9 ? 'active' : ''}>16:9</li>
                        <li data-scale={9 / 16} className={this.state.scale === 9 / 16 ? 'active' : ''}>9:16</li>
                        <li data-scale={4 / 3} className={this.state.scale === 4 / 3 ? 'active' : ''}>4:3</li>
                        <li data-scale={3 / 4} className={this.state.scale === 3 / 4 ? 'active' : ''}>3:4</li>
                        <li data-scale={1 / 1} className={this.state.scale === 1 / 1 ? 'active' : ''}>1:1</li>
                    </ul>

                </header>

                <section className="zmiti-panel-body " ref="panel-body">
                    <section className="zmiti-panel-type-C">

                        <Tabs defaultActiveKey="1">
                            <TabPane tab="全部" key="1">
                                <div style={{height: 190,overflow:'hidden'}} ref='scroll'>
                                    <article className="zmiti-panel-C" ref="zmiti-panel-C" onClick={this.chooseMould}>
                                        {

                                            moulds.filter((item)=> {
                                                return 1;
                                            }).map((it=> {
                                                return it.html;
                                            }))
                                        }
                                    </article>
                                </div>

                            </TabPane>

                            {
                                [2, 3, 4, 5, 6].map(num=> {
                                    return <TabPane tab={num} key={num}>
                                        <article className="zmiti-panel-C" ref="zmiti-panel-C"
                                                 onClick={this.chooseMould}>
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
                                <aside className={this.state.picMargin === 0 ? 'active' : ''} data-margin='0'
                                       onClick={this.setMarginSize.bind(this)}><span>无</span></aside>
                                <aside></aside>
                                <aside className={this.state.picMargin === 2 ? 'active' : ''} data-margin='2'
                                       onClick={this.setMarginSize.bind(this)}><span>中</span></aside>
                                <aside></aside>
                                <aside className={this.state.picMargin === 4 ? 'active' : ''} data-margin='4'
                                       onClick={this.setMarginSize.bind(this)}><span>大</span></aside>
                            </div>
                        </div>
                    </section>

                </section>
                <div style={{transform: 'translate3d(' + (this.state.showDownload ? 0 : '-100%') + ',0,0)'}}
                     className='z-puzzle-download'><a target="_blank" download={this.state.dataUrl}
                                                       onClick={this.downloadImg} href={this.state.dataUrl}><Icon
                    type="cloud-download"/>下载图片</a></div>

                <Modal title='选择图片类型' visible={this.state.visible}
                  onOk={this.downloadImg}
                  onCancel={()=>{this.setState({visible:false})}}
                  width={600}

                  >
                   <Select onChange={this.selectImageType.bind(this)} ref='img-type' placeholder='图片类型' style={{width:'100%'}} defaultValue='image/png' >
                               <Option value={'image/png'}>PNG</Option>
                               <Option value={'image/jpeg'}>JPG</Option>
                           </Select>
                </Modal>
            </div>
        )
    }

    selectImageType(e){
        this.setState({
            imageType:e
        });
    }


    downloadImg() {
        ///  let imgPathURL = window.ZmitiState.toDataURL();
        
        window.obserable.trigger({type:'removeDashShape'});//移除虚线框

        this.setState({
            dataUrl: document.getElementsByTagName('canvas')[0].toDataURL(this.state.imageType)
        });
    }

    setMarginSize(e) {

        var target = e.target;
        if (target.nodeName === 'SPAN') {
            target = target.parentNode;
        }

        var size = target.getAttribute('data-margin') * 1;

        this.setState({
            picMargin: size
        }, ()=> {

            PubSub.publish('renderCanvas', {method: this.state.currentMethod, marginSize: size});
        })
    }

    componentWillMount() {
        window.obserable.on('getPicmMargin', ()=> {
            return this.state.picMargin;
        });
    }

    componentDidMount() {
          var iScroll = new IScroll(this.refs['scroll'],{
                scrollbars:true,//显示滚动条
                interactiveScrollbars:true,//允许用户拖动滚动条
                mouseWheel:true,//启用鼠标滚轮。
             });

          window.obserable.on('getCurrentMehtod',()=>{
            return this.state.currentMethod;
          })

    }

    lockedScale() {//解锁、锁定比例
        var locked = this.state.isLocked;
        var state = {
            isLocked: !locked
        };

        if (!locked) {
            state.scale = this.state.width / this.state.height;
        }
        else {
            state.scale = -1;
        }
        this.setState(state);
    }

    setScale(e) {
        window.that = this;
        var scale = e.target.getAttribute('data-scale');
        if (scale) {
            this.setState({
                scale: scale * 1,
                isLocked: true,
                height: this.state.width / scale
            }, ()=> {
                window.obserable.trigger({
                    type: 'setCanvasHeight',
                    data: this.state.width / scale
                });
                window.obserable.trigger({
                    type: 'setCanvasWidth',
                    data: this.state.width
                });
                PubSub.publish('renderCanvas', {method: this.state.currentMethod, marginSize: this.state.picMargin});
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
            PubSub.publish('renderCanvas', {method, marginSize: this.state.picMargin});

            PubSub.publish('getMethod', method);

            target.classList.add('active');
            this.lastTarget = target;
        }
    }

    closePanel() {

        this.setState({
            showPanel:!this.state.showPanel
        })

        /* this.open = !this.open;

         this.setState({
         showDownload:!this.open
         })

         this.open && (this.bodyHeight = this.refs['panel-body'].offsetHeight);
         let panel = this.refs['panel'];
         // / panel.classList[this.open ? 'add' : 'remove']('close');
         panel.classList.add("active");
         this.closeTimer && clearTimeout(this.closeTimer);
         $(this.refs['panel-body']).height(this.open ? 0 : this.bodyHeight );
         this.closeTimer = setTimeout(()=> {
         panel.classList.remove("active");
         }, 500);
         let closeBar = _$('.zmiti-close');
         closeBar.classList[this.open ? 'add' : 'remove']('scroll');
         $$('li', closeBar)[0].classList[!this.open ? 'add' : 'remove']('close1');
         $$('li', closeBar)[1].classList[!this.open ? 'add' : 'remove']('scroll');
         $$('li', closeBar)[2].classList[!this.open ? 'add' : 'remove']('close2');*/
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

}
