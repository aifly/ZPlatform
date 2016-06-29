import React from 'react';
import './scss/zmiti-panel.css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';
import {utilMethods,_$,$$} from '../../../utilMethod.es6';

export default class ZmitiPanel extends React.Component {
    constructor(args) {
        super(...args);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.changeMould = this.changeMould.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.state = {
            current: 0
        }

    }

    render() {

        let moulds = [
            {
                type: 2,
                html: <div className="p-mould p-mould-left-right" key={+new Date()}>
                    <aside></aside>
                    <aside></aside>
                </div>
            },
            {
                type: 2,
                html: <div className="p-mould p-mould-top-bottom" key={+new Date()}>
                    <aside></aside>
                    <aside></aside>
                </div>
            }
        ].map((m, i)=> {
            return {
                type: m.type,
                html: <div className="p-mould p-mould-left-right" key={this.type+'-'+i}>
                    <aside></aside>
                    <aside></aside>
                </div>
            }
        });

        return (
            <div className="zmiti-panel-ui" ref="panel">
                <section className="zmiti-panel-title" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}
                         onMouseUp={this.onMouseUp}
                >
                    <span></span><span>选择模板</span>
                    <ul className="zmiti-close" refs="close-bar" onClick={this.closePanel}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </section>
                <section className="zmiti-panel-body" ref="panel-body">
                    <section className="zmiti-panel-type-C">
                        <ul onClick={this.changeMould}>
                            <li className={this.state.current === 0 ? 'active':''}>全部</li>
                            <li className={this.state.current === 1 ? 'active':''}>2</li>
                            <li className={this.state.current === 2 ? 'active':''}>3</li>
                            <li className={this.state.current === 3 ? 'active':''}>4</li>
                            <li className={this.state.current === 4 ? 'active':''}>4+</li>
                        </ul>
                        <article className="zmiti-panel-C">

                        </article>
                    </section>
                </section>
            </div>
        )
    }

    closePanel() {
        this.open = !this.open;
        let panel = this.refs['panel-body'];
        panel.classList[this.open ? 'add':'remove']('close');
        let closeBar = _$('.zmiti-close');
        closeBar.classList[this.open ? 'add':'remove']('scroll');
        $$('li',closeBar)[0].classList[this.open?'add':'remove']('close1');
        $$('li',closeBar)[1].classList[this.open?'add':'remove']('scroll');
        $$('li',closeBar)[2].classList[this.open?'add':'remove']('close2');
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
