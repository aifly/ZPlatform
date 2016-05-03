import React from 'react';
import ReactDOM from 'react-dom';
import './progress.min.css';

export default class FlyProgress extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            currentVal: 700
        };
    }
    render() {
        let s = this;

        return (
            <div className="fly-progress">
                <span class="fly-progress-label">{this.props.label}</span>
                <div className="fly-progress-bar">
                    <span style={{width:s.state.currentVal / s.props.maxVal / s.props.unit * 100+'%'}}></span>
                    <div>{this.state.currentVal}M / {this.props.maxVal}G</div>
                </div>
            </div>
        )
    }
}