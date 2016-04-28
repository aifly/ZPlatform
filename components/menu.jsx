import React from 'react';
import {Menu,Icon,Tooltip} from 'antd';
const SubMenu = Menu.SubMenu;
import MainUI from './Main.jsx';

export  default class FlyMenu extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            current: '3'
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
        var m =  new MainUI();
        m.changeFrameSrc.call(m,'./home/index.html');
    }
    render() {
        return (
            <Menu onClick={this.handleClick.bind(this)}
                  style={{ width: 180 }}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                <SubMenu key="sub1"
                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>产品与服务</span></span>}>
                    <Menu.Item key="1" ><Icon  type='mobile' style={{marginRight:'32px'}}/>微场景</Menu.Item>
                    <Menu.Item key="2"><Icon  type="question-circle-o" style={{marginRight:'32px'}}/>微问答</Menu.Item>
                    <Menu.Item key="3"><Icon  type="picture" style={{marginRight:'32px'}}/>富图片</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2"
                         title={<span><Icon type="user" style={{marginRight:'22px'}} /><span>用户中心</span></span>}>
                    <Menu.Item key="5"><Icon type="team" style={{marginRight:'32px'}}/>公司管理</Menu.Item>
                    <Menu.Item key="6"><Icon type="appstore-o" style={{marginRight:'32px'}}/>部门管理</Menu.Item>
                    <Menu.Item key="7"><Icon type="user" style={{marginRight:'32px'}}/>用户管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4"
                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>个人中心</span></span>}>
                    <Menu.Item key="9"><Icon type="user" style={{marginRight:'32px'}}/>账号管理</Menu.Item>
                    <Menu.Item key="10"><Icon type="customerservice" style={{marginRight:'32px'}}/>续费管理</Menu.Item>
                    <Menu.Item key="11"><Icon type="edit" style={{marginRight:'32px'}}/>办公系统</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

