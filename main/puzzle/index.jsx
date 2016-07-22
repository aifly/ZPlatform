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

if(!window.parent.userId){
    message.warning('请重新登录');

    setTimeout(()=>{
        ///  window.parent.location.href= '/'
    },1000)
}

class ZmitiPuzzleApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
            width:1000,
            height:500,
            currentMethod :'renderRectLeftRight',
        }
    }

    componentDidMount(){
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

        return (
            <div className="p-main-ui" style={style}>
                <ZmitiStage  {...this.props}></ZmitiStage>
                <ZmitiPannel></ZmitiPannel>
            </div>
        )
    }

}

ZmitiPuzzleApp.defaultProps = {
    baseUrl: 'http://webapi.zmiti.com/v1/',
    getusersigid: "09ab77c3-c14c-4882-9120-ac426f527071"
};

ReactDOM.render(<ZmitiPuzzleApp></ZmitiPuzzleApp>,document.getElementById('fly-main'),()=>{

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
});



