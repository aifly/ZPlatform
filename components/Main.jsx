import React from 'react';
import Icon from  'antd/lib/icon/index';
import Menu  from  'antd/lib/menu';
import Input from  'antd/lib/input';
import Badge from  'antd/lib/badge';
import 'antd/lib/icon/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/badge/style/css';

const SubMenu = Menu.SubMenu;

import {utilMethods,_$,$$} from '../utilMethod.es6';

export  default class MainUI extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            defaultClass: "fly-left-aside",
            isOpen: true,
            current: '3',
            currentAcc:'iLinten@qq.com',
            frameSrc: './home/index.html',
            isCompany : false //是否是企业用户。默认为false.
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key,
            frameSrc:e.key

        });
    }

    toggleMenu() {

        if (this.state.defaultClass === "fly-left-aside") {
            this.setState({defaultClass: "fly-left-aside unfold", isOpen: false});

        } else {
            this.setState({defaultClass: "fly-left-aside"});
            setTimeout(()=> {
                this.setState({isOpen: true});
            }, 200);
        }
    }

    render() {

        let companyMenu = [];

        if(this.state.isCompany){
            companyMenu = [1].map((item,i)=>{
                return <SubMenu key="sub2" title={<span><Icon type="user" style={{marginRight:'22px'}} /><span>用户中心</span></span>}>
                    <Menu.Item key="5"><Icon type="team" style={{marginRight:'32px'}}/>用户和部门</Menu.Item>
                    <Menu.Item key="6"><Icon type="book" style={{marginRight:'32px'}}/>项目管理</Menu.Item>
                    <Menu.Item key="7"><Icon type="user" style={{marginRight:'32px'}}/>办公管理</Menu.Item>
                    <Menu.Item key="8"><Icon type="user" style={{marginRight:'32px'}}/>作品管理</Menu.Item>
                    <Menu.Item key="9"><Icon type="picture" style={{marginRight:'32px'}}/>素材管理</Menu.Item>
                    <Menu.Item key="10"><Icon type="user" style={{marginRight:'32px'}}/>系统日志</Menu.Item>
                </SubMenu>;
            });
        }

        return (
            <section className="main">
                <header className="fly-header">
                    <div className="fly-logo"><a href="/"><img src="./static/images/logo.png" alt=""/></a></div>
                    <div className="fly-nav"><a href="#">控制平台</a></div>
                    <div className="fly-nav"><a href="#">产品与服务</a></div>
                    <div style={{display:this.props.isAdmin?'block':'none'}} className="fly-nav"><a href="#">系统管理</a></div>
                    <div className="fly-nav"><a href="#">项目洽谈</a></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="fly-search icon">
                        <div><Icon type="search"/></div>
                    </div>
                    <div className="fly-msg icon">
                        <Badge count={1} overflowCount={9}>
                            <Icon type="mail"/>
                        </Badge>
                        </div>
                    <div className="curAcc">{this.state.currentAcc}</div>
                </header>
                <article className="fly-content">
                    <section className={this.state.defaultClass}>
                        <div className="fly-toggle-menu" onClick={this.toggleMenu.bind(this)}>
                            <Icon type="menu-fold" style={{display:this.state.isOpen?'inline-block':'none'}}/>
                            <Icon type="menu-unfold" style={{display:this.state.isOpen?'none':'inline-block'}}/>
                        </div>
                        <div className="fly-menu-c">
                            <Menu onClick={this.handleClick.bind(this)}
                                  style={{ width: 180 }}
                                  defaultOpenKeys={['sub1']}
                                  selectedKeys={[this.state.current]}
                                  mode="inline">
                                <SubMenu key="sub1"
                                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>产品与服务</span></span>}>
                                    <Menu.Item key="http://www.zmiti.com" ><Icon  type='mobile' style={{marginRight:'32px'}}/>微场景</Menu.Item>
                                    <Menu.Item key="../qa/"><Icon  type="question-circle-o" style={{marginRight:'32px'}}/>微问答</Menu.Item>
                                    <Menu.Item key="richimg/"><Icon  type="picture" style={{marginRight:'32px'}}/>富图片</Menu.Item>
                                </SubMenu>
                                {companyMenu}
                                <SubMenu key="sub4"
                                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>个人中心</span></span>}>
                                    <Menu.Item key="personalAcc/"><Icon type="user" style={{marginRight:'32px'}}/>账号管理</Menu.Item>
                                    <Menu.Item key="10"><Icon type="customerservice" style={{marginRight:'32px'}}/>续费管理</Menu.Item>
                                    <Menu.Item key="11"><Icon type="edit" style={{marginRight:'32px'}}/>办公系统</Menu.Item>
                                </SubMenu>
                            </Menu>
                            <div className="fly-menu-bottom">
                                系统日志
                            </div>
                        </div>
                    </section>
                    <section className="fly-right-aside">
                        <iframe src={this.state.frameSrc} frameborder="0"></iframe>
                    </section>
                </article>
            </section>
        )
    }

    componentDidMount() {
       /* setTimeout(()=> {
            $$('.fly-nav a').forEach((a)=> {
                utilMethods.addClass(a, 'active');
            });
        }, 0)*/
    }
}

