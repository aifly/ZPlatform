import  React from 'react';
import addons from 'react-addons'

export default class ZmitiTab extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            moduleW: 0,
            iNow: 0,
            titleClassName:'title'
        }
    };

    componentDidMount() {
        let s = this;
        setTimeout(()=>{
            this.setState({
                moduleW: s.refs.moduleC.offsetWidth / 3
            });
        },1)

        window.addEventListener('resize', ()=> {
            if(s.refs.moduleC){
                this.setState({
                    moduleW: s.refs.moduleC.offsetWidth / 3,
                    iNow:0
                });
            }
        });
    }

    prev(e) {
        let iNow = this.state.iNow - 1;
        if(iNow < 0){
            iNow = 0;
            this.addClickShadow(e,'error-active');
        }
        else{
            this.addClickShadow(e,'active');
        }
        this.setState({
            iNow: iNow
        });
    }

    addClickShadow(e,className){
        let target = e.target;
        target.classList.add(className);
        setTimeout(()=>{
            target.classList.remove(className);
        },100);

    }

    next(e) {
        let iNow = this.state.iNow + 1;
        if(iNow > this.data.length - 3 ){
            iNow = this.data.length - 3;
            this.addClickShadow(e,'error-active');
        }
        else{

            this.addClickShadow(e,'active');
        }

        this.setState({
            iNow: iNow
        });
    }
    render() {
        let iNow = this.state.iNow;

        var cx = addons.classSet;



        let data = [
            {title: "微场景", store: 1256, my: 143},
            {title: "微问答", store: 2555, my: 125},
            {title: "微3d", store: 2012, my: 125},
            {title: "富图片", store: 991, my: 320}
        ].map((item, i)=> {

            var classes = cx({
                'title': true,
                'active': i===iNow || i === iNow + 1
            });

            return (
                <article key={i}>
                    <div className={classes}>{item.title}</div>
                    <div className="store">库 <span>{item.store}</span></div>
                    <div className="store my">我 <span>{item.my}</span></div>
                </article>
            )
        });

        this.data = data;

        let style = {
            width: this.state.moduleW * data.length,
            transform: 'translate3d(-' + (this.state.iNow * this.state.moduleW) + 'px,0,0)',
            WebkitTransform: 'translate3d(-' + (this.state.iNow * this.state.moduleW) + 'px,0,0)'
        }
        return (
            <div className="module-container" ref="moduleC">
                <span className="ar-left ar" onClick={this.prev.bind(this)}>&lt;</span>
                <div className="module-item-c" ref="moduleItemC" style={style}>
                    {data}
                </div>
                <span className="ar-right ar" onClick={this.next.bind(this)}>&gt;</span>
                <div className="other-link">
                    <ul>
                        <li><a href="#">项目洽谈室</a></li>
                        <li><a href="#">索取发票</a></li>
                        <li><a href="#">申请合同</a></li>
                        <li><a href="#">工单管理</a></li>
                    </ul>
                </div>

            </div>
        )
    }
}