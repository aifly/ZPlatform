import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';

import ZmitiPannel from './static/components/zmiti-panel.jsx';


class ZmitiPuzzleApp extends React.Component{
    constructor(args){
        super(...args);
    }

    render(){
        return (
            <div class="p-main-ui">
                <ZmitiPannel></ZmitiPannel>
            </div>
        )
    }

}

ReactDOM.render(<ZmitiPuzzleApp></ZmitiPuzzleApp>,document.getElementById('fly-main'));