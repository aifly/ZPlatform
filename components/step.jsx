import React from 'react';
import {Steps } from 'antd';
const Step = Steps.Step;

export default class ZmitiStep extends React.Component{
    constructor(args){
        super(...args);
    }

    render(){

        let step = this.props.steps.map((s,i)=>{
           return <Step key={i} title={s.title} description={s.description} />
        })

        return (
            <div style={{height:50}}>
                <span style={{marginRight:'20px',position:'relative',top:'13'}}>{this.props.name}：</span><Steps style={{width:'80%',display:'inline-block'}} size={this.props.size} current={0}>{step}</Steps>
            </div>
        )
    }
}