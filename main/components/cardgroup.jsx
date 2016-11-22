import React from 'react';
import { Card  } from 'antd';

export default class ZmitiCard extends React.Component{
    constructor(args){
        super(...args);
    }
    render(){
        let  style= {
            background:'#aaa',color:"#fff"
        }
        return (
            <div className="zmit-card-C">
               <div>
                   <Card  title="总计作品" style={style}>
                       {this.props.projectnum}个
                    </Card>
               </div>
                <div>
                   <Card  title="总登录次数"  style={style}>
                       {this.props.loginnum}次
                    </Card>
               </div>
                <div>
                   <Card  title="总消费数"  style={style}>
                       {this.props.consume}元
                    </Card>
               </div>
                <div>
                   <Card  title="空间使用量"  style={style}>
                       {this.props.spaceuse}M
                    </Card>
               </div>

            </div>
        )
    }
}