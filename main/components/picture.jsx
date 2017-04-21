import './picture.css';
import React  from 'react';
import addons from 'react-addons';
import {InputNumber,Slider,Icon,Steps,Form,DatePicker , Input,Button, Row, Col,Layout ,Tooltip,Progress,Select,message,Popconfirm,Modal,Table,moment} from '../commoncomponent/common.jsx';

export default class ZmitiPersonalScan extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            scanW: 2,
            iNow: 0,
            inputValue: 0,
        }
        this.onChangeSlider = (value) => {
            this.setState({
              inputValue: value,
            });
        }
    }

    componentDidMount() {
        let s = this;
        s.setState({
            scanW: 157,
        });

    }    

    removeCredentials(i){
        window.obserable.trigger({type:'removeCredentials',data:i});
    }


    render() {

        let data = this.props.credentials.map((item, i)=> {
            return (
                <li key={i}>
                    <span data-index={i} onClick={this.removeCredentials.bind(this,i)}>&times;</span>
                    <img hidden draggable="false" src={item.src} alt=""/>
                </li>
            )
        });



        let w = data.length * this.state.scanW;
        let imgCount = data.length;
        let imgArea = imgCount-4;
        let ulStyle = {
            width: w,
            marginLeft:-this.state.inputValue*157,
            transform: "translate3d(-" + (this.state.iNow * this.state.scanW) + "px,0,0)",
            WebkitTransform: "translate3d(-" + (this.state.iNow * this.state.scanW) + "px,0,0)"
        }


        return (
            <div className="viewpersonal-scan">
                <div className="viewpsersonal-column">
                    <div className="viewpersonal-add" onClick={this.addUesrCredentials.bind(this)}><img src={'./static/images/file-add.jpg'} /></div>
                    <div className="viewpsersonal-picList" ref="acc-scan-C">
                        <ul style={ulStyle} className="viewpersonal-imgs" id="viewpersonal-imgs">
                            {data}
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="hr10"></div>
                <div name={imgCount}>

                    <Slider min={0} max={imgArea} tipFormatter={null} step={2} onChange={this.onChangeSlider} value={this.state.inputValue} />

                </div>           
            </div>
        )
    }
    addUesrCredentials(){
        window.obserable.trigger({type:'modifyUesrCredentials'})
    }

}
