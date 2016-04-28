import '../css/index.css';
import  '../images/jquery.minicolors.png';
import '../css/jquery.minicolors.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Input,ButtonToolbar,Grid,Row,Col,Modal,Popover,Tooltip,Image} from 'react-bootstrap';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Stage from './stage';
import $ from 'jquery';
import miniColors from 'jquery-minicolors';

let data = {
    viewWidth: document.documentElement.clientWidth,
    viewHeight: document.documentElement.clientHeight,

}
let utilMethod = {

    init(){
        this.setDefault();
        this.setSize();
    },
    setSize(width = data.viewWidth, height = data.viewHeight){

    },
    setDefault(){
        document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
        window.ltP = {};
        ltP.index = {};
        ltP.index.focusWidget = {
            style: {
                background: ""
            }
        };
        ltP.index.globalConfig = {
            focusWidgetAddType: "text"
        };
    }
};



utilMethod.init();

class FlyDialog extends React.Component{

    constructor(args){
        super(...args);
        this.state= {showModal: false}
    };

    close(){
        this.setState({showModal:false});
    }
    open(){
        this.setState({showModal:true});
    }

    choseIco(){
        this.close();
    }
    icoToggle(e){
        let target= e.target;
        if($(target).hasClass('icon-item')||$(target).parent().hasClass('icon-item')){
            let $Target =$(target).hasClass('icon-item') ? $(target) :$(target).parents(".icon-item");
            alert($Target.index())
        }
    }


  render() {
        return (
            <div>
                <Modal bsSize="sm"  show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>选择图标</Modal.Title>
                    </Modal.Header>
                    <Modal.Body onClick={this.icoToggle.bind(this)} >

                        <Grid fluid={true}>
                            <Row>
                                <Col md={3}><Image draggable="false"  src="./static/images/red-plain.png" data-src="./static/images/red-plain.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/green-plain.png" data-src="./static/images/green-plain.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/black-plain.png" data-src="./static/images/black-plain.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/blue-plain.png" data-src="./static/images/blue-plain.png" alt=""/></Col>
                            </Row>
                            <Row>
                                <Col md={1}>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}><Image draggable="false"  src="./static/images/black-a.png" data-src="./static/images/black-a.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/black-b.png" data-src="./static/images/black-b.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/black-c.png" data-src="./static/images/black-c.png" alt=""/></Col>
                                <Col md={3}><Image draggable="false"  src="./static/images/black-d.png" data-src="./static/images/black-d.png" alt=""/></Col>
                            </Row>
                        </Grid>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


};

var flyDialog = ReactDOM.render(
    <FlyDialog />, document.getElementById("fly-dialog"));


class WidgetPannelTitle extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            textClassName: "fly-text-pannel-title ",
            picClassName: "fly-pic-video-title active"
        }
    }

    changeTitleHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        let state = {
            textClassName: '',
            picClassName: ''
        }
        let index = -1;
        if ($(e.target).hasClass('fly-pic-video-title')) {//图片视频
            state.textClassName = 'fly-text-pannel-title';
            state.picClassName = 'fly-pic-video-title active';
            index = 1;
        }
        else if ($(e.target).hasClass('fly-text-pannel-title')) {//文本
            state.textClassName = 'fly-text-pannel-title active';
            state.picClassName = 'fly-pic-video-title';
            index = 0;
        }
        this.setState(state);
        index !== -1 && flyPropContainer.changePropTypeHandler(index);
    };

    render() {
        return (
            <section>
                <div className="fly-fill-left"> &nbsp;</div>
                <div onClick={this.changeTitleHandler.bind(this)} className={this.state.textClassName}>
                    文本
                </div>
                <div className={this.state.picClassName} onClick={this.changeTitleHandler.bind(this)}>
                    图片视频
                </div>
                <div className="fly-fill">
                    &nbsp;
                </div>
            </section>
        )
    }
}
;


ReactDOM.render(<WidgetPannelTitle />, document.getElementById("fly-pannel-title"));

class FlyMiniColor extends React.Component {

    constructor(args) {
        super(...args);
        this.state = {
            // value: this.props.value
        }
    }


    render() {
        return (
            <div className="color-container">
                <a href="javascript:void(0)" className="minicolor" data-opacity="1">
                </a>
                <input type="text" value={this.state.value} className="form-control val"/>
            </div>
        )
    }

    componentDidMount() {//在挂载结束之后马上被调用，需要DOM节点初始化操作应该放在这里。
        var _this = this;
        $('.minicolor').each(function() {
            $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                inline: $(this).attr('data-inline') === 'true',
                opacity: $(this).attr('data-opacity'),
                change (hex, opacity) {

                    if (!hex) return;
                    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                    var sColor = hex;
                    if (sColor && reg.test(sColor)) {
                        if (sColor.length === 4) {
                            var sColorNew = "#";
                            for (var i = 1; i < 4; i += 1) {
                                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                            }
                            sColor = sColorNew;
                        }
                        //处理六位的颜色值
                        var sColorChange = [];
                        for (var i = 1; i < 7; i += 2) {
                            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                        }

                        _this.setState({value: "rgba(" + sColorChange.join(",") + "," + opacity + ")"})
                        //_this.props.value = "rgba(" + sColorChange.join(",") + "," + opacity + ")";
                        //console.log(_this.props.value);
                    }
                },
                theme: 'bootstrap'
            })

        });
    }
}
;

class FlyTextContent extends React.Component {

    render() {
        let style = {maxWidth: 110, marginTop: 10, height: 100};
        return (
            <div className="fly-widget-content">
                <label className="control-label">
                    <span>{this.props.title}</span>
                </label>
                <div>
                    <div className="fly-text-content" contentEditable="true"></div>
                    <div className="fly-text-icon">
                        <ButtonToolbar>
                            <Button bsStyle="info">B</Button>
                            <Button bsStyle="warning">I</Button>
                            <Button bsStyle="success">H</Button>
                        </ButtonToolbar>
                        <div style={style}>
                            <Button bsStyle="primary" style={{height:"64px"}} bsSize="large" block onClick={flyDialog.open.bind(flyDialog)}>
                                图标
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
;


class FlyFileButton extends React.Component {
    constructor(arges) {
        super(...arges);
    }
    uploadSource() {
        $("#" + this.props.uploadType).trigger('click');
    }
    render() {
        return (
            <div className="fly-text-content-input">
                <input accept={this.props.accept} type="file" id={this.props.uploadType}
                       style={{position:"fixed",opacity:0,zIndex:-1,left:0,top:0}}/>
                <Input disabled type="text" bsStyle="success" placeholder="http://www."/>
                <div className="fly-addons" onClick={this.uploadSource.bind(this)}>
                    <b></b>
                    <span>&times;</span>
                    <span>选择</span>
                </div>
            </div>
        )
    }
}
;

let FlyPropContainer = React.createClass({

    mixins: [LinkedStateMixin],

    getInitialState(){
        return {
            className: "active",
            checked: true
        }
    },
    changePropTypeHandler(index){
        var state = {
            className: "",
            checked: true
        }
        switch (index) {
            case 0:
                state.className = "";
                break;
            case 1:
                state.className = "active";
                break;
        }

        this.setState(state);
    },
    addSwitchType(e){
        switch (e.target.className) {
            case "addPic":
                break;
            case "addVideo":

                break;
        }
    },
    render(){
        var focusWidget = ltP.index.focusWidget.style.background;

        // <!--{this.state.className}-->
        return (
            <ul className={this.state.className}>
                <li className="fly-widget-prop-item">
                    <div className="fly-widget-href">
                        <Input type="text" label="标点链接" placeholder="http://www."/>
                    </div>
                    <FlyTextContent title='标点文字'></FlyTextContent>
                    <div className="fly-widget-bg-container">
                        <label className="control-label">
                            <span>气泡颜色</span>
                        </label>
                        <div className="fly-widget-bg">
                            <FlyMiniColor value={focusWidget}></FlyMiniColor>
                        </div>
                    </div>
                </li>
                <li className="fly-widget-prop-item">
                    <div className="fly-pic-video-container">
                        <Input onChange={this.addSwitchType} className="addPic" type="radio" label="添加图片" name="add"
                               defaultChecked={this.state.checked}/>
                        <FlyFileButton accept="image/gif,image/jpg,image/png" uploadType="pic"></FlyFileButton>
                        <FlyTextContent title='图片说明'></FlyTextContent>
                    </div>
                    <div className="fly-pic-video-container" style={{marginTop:"20px"}}>
                        <Input onChange={this.addSwitchType} type="radio" className="addVideo" label="添加视频" name="add"
                               defaultChecked={!this.state.checked}/>
                        <FlyFileButton uploadType="video" accept="video/mp4,video/webm,video/ogg"></FlyFileButton>
                        <FlyTextContent title='视频说明'></FlyTextContent>
                    </div>
                </li>
            </ul>
        )
    }
});

var flyPropContainer = ReactDOM.render(
    <FlyPropContainer />, document.getElementById("fly-widget-prop-setting-container"));


class FlyBottomOperatorBar extends React.Component{
    constructor(arges){
        super(...arges);
    };
    render() {
        return (
            <div className="fly-bottom-container">
                <div className="dustbin"><img src="./static/images/dustbin.png" alt=""/></div>
                <div className="operator-btn-group">
                    <ButtonToolbar>
                        <Button bsSize="large">CANCEL</Button>
                        <Button bsStyle="info" bsSize="large">SAVE TAG</Button>
                    </ButtonToolbar>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<FlyBottomOperatorBar></FlyBottomOperatorBar>,document.getElementById("fly-bottom-container"));

ReactDOM.render(<Stage></Stage>,document.getElementById('fly-edit-content-pannel'));

