import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

import ZmitiPannel from './static/components/zmiti-panel.jsx';
import ZmitiStage from './static/components/zmiti-stage.jsx';
import PubSub from './static/js/pubsub';

import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import MainUI from '../components/Main.jsx';
import  createjs from './static/js/createjs.js';








export default class ZmitiPuzzleApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            width:1000,
            height:800,
            currentMethod :'renderRectLeftRight',
        }
    }

    componentDidMount(){

        const key = `open${Date.now()}`;
        let btnClick = ()=> {
            notification.close(key);
            close();
        }
        const close = () => {
            //
            localStorage['tipInfo'] = true;
        }
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                不再提示我~
            </Button>
        );

        !localStorage['tipInfo'] && notification['info']({
            message: '小提示',
            description: '按住空格键不松开,可以拖拽整张图片~',
            btn,
            key
        });

        PubSub.subscribe('getMethod',(e,method)=>{
            this.setState({
                currentMethod:method
            })
        });
    }

    render(){

        var style = {
            width:100
        }
        let props = {
            getusersigid:window.parent.getusersingid,
            userId:window.parent.userId
        }
        let component = <div className="p-main-ui" style={style}>
                <ZmitiStage  {...this.props} {...props} ></ZmitiStage>
                <ZmitiPannel></ZmitiPannel>
            </div>;
        return (
            
            <MainUI component={component}></MainUI>
        )
    }

}

ZmitiPuzzleApp.defaultProps = {
    baseUrl: 'http://api.zmiti.com/v2/',//http://webapi.zmiti.com/v1/
    getusersigid: "09ab77c3-c14c-4882-9120-ac426f527071"
};

/*ReactDOM.render(<ZmitiPuzzleApp></ZmitiPuzzleApp>,document.getElementById('fly-main'),()=>{

    
});

*/


