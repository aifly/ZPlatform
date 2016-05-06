import React from 'react';

export default class ZmitiProductList extends React.Component{
    constructor(args){
        super(...args);
    }

    render(){


        let data  = [
            {
                title:'可视化图表',
                remark:'可视化图表可视化图表可视化图表可视化图表可视化图表'
            }, {
                title:'3D新闻',
                remark:'可视化图表可视化图表可视化图表可视化图表可视化图表'
            },{
                title:'VR工具包',
                remark:'可视化图表可视化图表可视化图表可视化图表可视化图表'
            }
        ].map((item,i)=>{
            return (
                <div key={i} className="product-item">
                    <div className="product-thum"></div>
                    <div className="product-name">
                        <h4>{item.title}</h4>
                        <p>{item.remark}</p>
                    </div>
                </div>
            )
        });
        return (
            <div>
                {data}
            </div>
        )

    }
}