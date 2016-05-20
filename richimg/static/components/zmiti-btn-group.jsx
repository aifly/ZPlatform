import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';


export default class  ZmitiBtnGroup extends React.Component{
    constructor(args){
        super(...args);
    }
    delete(){

    }
    render(){
        let style = {color:'#fff',
            fontSize:30,
            border:'1px solid #ccc',
            position:'relative',
            top:8,
            padding:6,
            borderRadius:5,
            cursor:'pointer'
        };
        return (
            <div className="rm-btn-group">
                <Icon onClick={this.delete.bind(this)} type="delete" style={style} />
                <Button type="" size="large">CANCEL</Button>
                <Button type="primary" size="large">SAVE TAG</Button>
            </div>
        )
    }
}
