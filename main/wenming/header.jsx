import './static/css/header.css';
import React from 'react';
import {Button} from '../commoncomponent/common.jsx';

import $ from 'jquery';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../components/Main.jsx';

 class ZmitiWenmingHeaderApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           list:[
                {name:'首页',href:'/wening/',id:1},
                {name:'数据审核',href:'/checkdata',id:2},
                {name:'公告',href:'',id:3},
                {name:'设置',href:'',id:4}
           ],
           currentId:1
        }
    }

    componentDidMount(){
        this.state.list.forEach((item,i)=>{
            if(i===0){
                item.href='/wenming/'+this.props.title+'/'+this.props.cusId
            }
        });
        this.forceUpdate();
    }

    render(){

        return(
            <header className='wenming-header'>
                <span>{this.props.title}</span>
                <ul>
                    {this.state.list.map((item,i)=>{
                        return <li className={this.props.id === item.id ? 'active':''} key={i}><a href={'#'+item.href}>{item.name}</a></li>
                    })}
                </ul>
            </header>
        )
    }

  
}

export default ZmitiValidateUser(ZmitiWenmingHeaderApp);
