import React from 'react';
import './static/css/list.min.css';
import ReactDOM from 'react-dom';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/css';
import Waterfall  from './static/js/waterfall';
import 'babel-polyfill';
import PubSub from './static/js/pubsub';


import ZmitiUploadDialog from './static/components/zmiti-upload-dialog.jsx';



import ZmitiRichImg from './static/components/zmiti-richimg.jsx';

class ZmitiHeader extends React.Component{
    constructor(args){
        super(...args);
    }
    createProject(){
        PubSub.publish('showModal', true);
    }
    render(){
        return(
            <div className="zmiti-header">
                <div className="form-group">
                    <Input size="large" placeholder="搜索"/>
                    <Button size="large" type="primary" icon="search">搜索</Button>
                </div>
                <div className="zmiti-create">
                    <Button type="primary" onClick={this.createProject.bind(this)}>创建作品</Button>
                </div>
            </div>
        )
    }
}

class ZmitiMainContent extends React.Component{
    constructor(args){
        super(...args);
    }

    componentDidMount(){

        new Waterfall({
            containerSelector:'.zmiti-tab-my-project',
            boxSelector:'.zmiti-richimg-C'
        });

    }

    changeTab(e){
        this.alreadyLaodArr =this.alreadyLaodArr || ['1'];
        let a = ['zmiti-tab-my-project',
            'zmiti-tab-department-project',
            'zmiti-tab-company-project',
            'zmiti-tab-platform-project'
        ];

        setTimeout(()=>{
            new Waterfall({
                containerSelector:'.'+a[e-1],
                boxSelector:'.zmiti-richimg-C'
            });
        },0);
    }
    render(){
        /**
         * ,225,346,221,333,234,322,245,274
         * @type {Array}
         */
       let richImg = [224].map((item,i)=>{
           return  <ZmitiRichImg key={i} height={item}></ZmitiRichImg>
       });

        return (
            <div className="zmiti-main-content">
                <div className="zmiti-tab-C">
                    <Tabs defaultActiveKey="1" onChange={this.changeTab.bind(this)}>
                        <TabPane tab="我的作品" key="1">
                           <div className="zmiti-tab-my-project">
                               {richImg}
                           </div>
                        </TabPane>
                        <TabPane tab="部门作品" key="2">
                            <div className="zmiti-tab-department-project">
                                {richImg}
                            </div>
                        </TabPane>
                        <TabPane tab="公司作品" key="3">
                            <div className="zmiti-tab-company-project">
                                {richImg}
                            </div>
                        </TabPane>
                        <TabPane tab="平台作品" key="4">
                            <div className="zmiti-tab-platform-project">
                                {richImg}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

class MainUI extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return (
            <div className="zmiti-main-ui">
                <ZmitiHeader></ZmitiHeader>
                <ZmitiMainContent></ZmitiMainContent>
                <ZmitiUploadDialog></ZmitiUploadDialog>
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>,document.getElementById('fly-main'));



