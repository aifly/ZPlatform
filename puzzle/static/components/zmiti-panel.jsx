import React from 'react';
import './scss/zmiti-panel.css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';

export default class ZmitiPanel extends React.Component {
    constructor(args) {
        super(...args);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

    }

    render() {

        let moulds = [
            {
                type:2,
                html:
                    <div className="p-mould p-mould-left-right" key={this.type}>
                        <aside></aside>
                        <aside></aside>
                    </div>
            },
            {
                type:2,
                html:
                    <div className="p-mould p-mould-top-bottom" key={this.type}>
                        <aside></aside>
                        <aside></aside>
                    </div>
            }
        ].map((m,i)=>{
            return {
                type:m.type,
                html:
                    <div className="p-mould p-mould-left-right" key={this.type+'-'+i}>
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
                </section>
                <section className="zmiti-pannel-body">
                    <Tabs defaultActiveKey="1" size="small">
                        <TabPane tab="全部" key="1">
                            <div className="p-mould-C">
                                {moulds.map((m,i)=>{
                                    return m.html;
                                })}
                            </div>
                        </TabPane>
                        <TabPane tab="2" key="2">

                        </TabPane>
                        <TabPane tab="3" key="3">
                            2
                        </TabPane>
                        <TabPane tab="4" key="4">
                            3
                        </TabPane>
                        <TabPane tab="4+" key="5">
                            4
                        </TabPane>
                    </Tabs>
                </section>
            </div>
        )
    }

    onMouseOut(){

    }
    onMouseDown(e){
        this.panel = this.refs['panel'];
        this.isMove = true;
        this.disX = e.pageX - this.panel.offsetLeft;
        this.disY = e.pageY - this.panel.offsetTop;
    }
    onMouseMove(e){
        if(this.isMove){
            let x = e.pageX - this.disX,
                y =e.pageY - this.disY ;
            x<0 && (x=0);
            y<0 && (y=0);

            this.panel.style.left = x + 'px';
            this.panel.style.top =  y + 'px';
        }
    }

    onMouseUp(e){
        this.isMove = false;
    }
}
