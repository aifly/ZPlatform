import React from 'react';
import { Card  } from 'antd';

export default class ZmitiCard extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            projectnum:222,//作品总个数.
            loginnum:24,//登录次数.
            spaceuse:'123',//空间使用量
            consume:'101',//总消费数。
        };
    }
    render(){
        let  style= {
            background:'#aaa',color:"#fff"
        }
        return (
            <div className="zmit-card-C">
               <div>
                   <Card  title="总计作品" style={style}>
                       {this.state.projectnum || 0}个
                    </Card>
               </div>
                <div>
                   <Card  title="总登录次数"  style={style}>
                       {this.state.loginnum || 1}次
                    </Card>
               </div>
                <div>
                   <Card  title="总消费数"  style={style}>
                       {this.state.consume || 0}元
                    </Card>
               </div>
                <div>
                   <Card  title="空间使用量"  style={style}>
                       {this.state.spaceuse || 1}M
                    </Card>
               </div>

            </div>
        )
    }
    componentDidMount(){
      
    }
}