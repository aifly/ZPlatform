import React from 'react';
import ReactDOM from 'react-dom';
import './progress.min.css';

export default class ZmitiProgress extends React.Component {


    constructor(args) {

        super(...args);
        this.state = {
            currentVal: 700
        };
    }


    render() {
        let s = this;

        let style = {
            display: this.props.isShowInfo ? "block" : 'none'
        };

        return (
            <div className="fly-progress">
                <span className="fly-progress-label">{this.props.label}</span>
                <div className="fly-progress-bar">
                    <span style={{width:s.props.currentVal / s.props.maxVal / s.props.unit * 100+'%'}}></span>
                    <div style={style}>{this.state.currentVal}M / {this.props.maxVal}G</div>
                </div>
            </div>
        )
    }
}


ZmitiProgress.defaultProps = {
    isShowInfo:true
};