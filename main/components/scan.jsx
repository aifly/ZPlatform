import './scan.css';
import React  from 'react';
import addons from 'react-addons';


export default class ZmitiScan extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            scanW: 0,
            data: [
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"}
            ],
            iNow: 0
        }
    }

    componentDidMount() {
        let s = this,
            width = s.refs['acc-scan-C'].offsetWidth;
        s.setState({
            scanW: width / 5,
            data: [
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"},
                {src: "./personalAcc/static/images/user.jpg"}
            ]
        })

    }

    prev() {
        let iNow = this.state.iNow - 1;
        iNow < 0 && (iNow = 0);
        this.setState({
            iNow: iNow
        });
    }

    next() {

        let iNow = this.state.iNow + 1;
        iNow > this.state.data.length - 5 && (iNow = this.state.data.length - 5);
        this.setState({
            iNow: iNow
        });

    }


    render() {

        let data = this.state.data.map((item, i)=> {
            let style = {
                width: this.state.scanW,
                background: 'url(' + item.src + ') no-repeat center center',
                backgroundSize: 'contain'
            };
            return (
                <li style={style} key={i}><img hidden draggable="false" src={item.src} alt=""/></li>
            )
        });
        var cx = addons.classSet;
        let classL = cx({
            'acc-ar-l': true,
            'ar': true,
            'activeL': this.state.iNow > 0
        });

        let classR = cx({
            'acc-ar-r': true,
            'ar': true,
            'activeR': this.state.iNow < data.length-5
        });


        let w = data.length * this.state.scanW;
        let ulStyle = {
            width: w,
            transform: "translate3d(-" + (this.state.iNow * this.state.scanW) + "px,0,0)",
            WebkitTransform: "translate3d(-" + (this.state.iNow * this.state.scanW) + "px,0,0)"
        }

        return (
            <section className="acc-scan">
                <div className={classL} onClick={this.prev.bind(this)}></div>
                <div className="acc-scan-C" ref="acc-scan-C">
                    <ul style={ulStyle}>
                        {data}
                    </ul>
                </div>
                <div className={classR} onClick={this.next.bind(this)}></div>
            </section>
        )
    }
}