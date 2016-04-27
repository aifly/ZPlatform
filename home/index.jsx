
import React from 'react';
import ReactDOM from 'react-dom';
import {utilMethods, _$, $$} from './utilMethod.es6';
import {Row,Col} from 'antd';
import 'antd/lib/index.css';
import './static/css/index.min.css';

class MainUI extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return (
            <section className="main">
                <header className="fly-header">
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                    <div>logo</div>
                </header>
                <article className="fly-content">

                </article>
            </section>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>,document.getElementById('fly-main'));


let util = {
    init(){

    }
};

util.init();