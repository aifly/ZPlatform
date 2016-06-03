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



import ZmitiRichImg from './static/components/zmiti-richimg.jsx';

class ZmitiHeader extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        return(
            <div className="zmiti-header">
                <div className="form-group">
                    <Input size="large" placeholder="搜索"/>
                    <Button size="large" type="primary" icon="search">搜索</Button>
                </div>
                <div className="zmiti-create">
                    <Button type="primary">创建作品</Button>
                </div>
            </div>
        )
    }
    componentDidMount(){
        var waterfall = new Waterfall({
            containerSelector: '.zmiti-tab-C .ant-tabs-tabpane',
            boxSelector: '.zmiti-richimg-C',
            minBoxWidth: 250
        });
    }
}

class ZmitiMainContent extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){

       let richImg = [124].map((item,i)=>{
           return  <ZmitiRichImg key={i} height={item}></ZmitiRichImg>
       });

        return (
            <div className="zmiti-main-content">
                <div className="zmiti-tab-C">
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="我的作品" key="1">
                            {richImg}
                        </TabPane>
                        <TabPane tab="部门作品" key="2">部门作品</TabPane>
                        <TabPane tab="公司作品" key="3">公司作品</TabPane>
                        <TabPane tab="平台作品" key="4">平台作品</TabPane>
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
            </div>
        )
    }
}

ReactDOM.render(<MainUI></MainUI>,document.getElementById('fly-main'));



