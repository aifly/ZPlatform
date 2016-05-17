import React from 'react';
import Steps from 'antd/lib/steps';
import 'antd/lib/steps/style/css';
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
            <div style={{ marginTop:20 }}>
                <div style={{margin:'0 20px 0  0',float:'left'}}>{this.props.name}：</div>
                <Steps style={{width:'80%',height:50,float:'left',display:'inline-block',position:'relative'}} size={this.props.size} current={this.props.current}>{step}</Steps>
            </div>
        )
    }
}
ZmitiStep.defaultProps = {
    current:0
};