import React, { Component } from 'react';
import Icon from  'antd/lib/icon/index';
import Menu  from  'antd/lib/menu';
import Input from  'antd/lib/input';
import Badge from  'antd/lib/badge';
import 'antd/lib/icon/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/badge/style/css';
import '../../static/css/index.css';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;
export default class MainUI extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 defaultClass: "fly-left-aside",
      isOpen: true,
      current: '3',
      currentAcc:'iLinten@qq.com',
      rightWidth:0,
      userid:'',
      getusersigid:''

	  };
	}

  menuClickHandler(e){
     /* e.preventDefault();
        this.setState({
          frameSrc:e.target.href
      });
*/
  };

  handleClick(e) {

   
  
      // this.context.router.replace('/company');

      //window.location.hash =  'company';
  }

  toggleMenu() {

      if (this.state.defaultClass === "fly-left-aside") {
          this.setState({defaultClass: "fly-left-aside unfold", isOpen: false,rightWidth:document.documentElement.clientWidth - 60});
      } else {
          this.setState({defaultClass: "fly-left-aside"});
          setTimeout(()=> {
              this.setState({isOpen: true,rightWidth:document.documentElement.clientWidth - 180});
          }, 200);
      }
  }
	render() {
    let params = this.state.userid+'/'+this.state.getusersigid;
		return (
			 <section className="main">
                <header className="fly-header">
                    <div className="fly-logo"><a href="/"><img src="../static/images/logo.png" alt=""/></a></div>
                    <div className="fly-nav"><a href="#">控制平台</a></div>
                    <div className="fly-nav"><a href="#">产品与服务</a></div>
                    <div  className="fly-nav"><a href={"./#/"+params}>系统管理</a></div>
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
                            <Menu
                                  style={{ width: 180 }}
                                  defaultOpenKeys={['sub5']}
                                  selectedKeys={[this.state.current]}
                                  mode="inline">
                                <SubMenu key="sub5"
                                title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>用户管理</span></span>}>
                                    <Menu.Item key="user"><Icon type="user" style={{marginRight:'32px'}}/><Link to={"/user/"+params}>个人账户管理</Link></Menu.Item>
                                    <Menu.Item key="company"><Icon type="customerservice" style={{marginRight:'32px'}}/><Link to={"/company/"+params}>公司账户管理</Link></Menu.Item>
                                    <Menu.Item key="system"><Icon type="edit" style={{marginRight:'32px'}}/><Link to={"/system/"+params}>系统账户管理</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </section>
                    <section className="fly-right-aside" style={{width:this.state.rightWidth}}>
                          {this.props.component}
                    </section>
                </article>
            </section>
		);
	}
	componentDidMount() {
        var params = JSON.parse(document.cookie);

        
        this.setState({
            userid:params.userid,
            isover:params.isover,
            getusersigid:params.getusersigid
        })

		  var hash = window.location.hash;
    if(hash.indexOf('#/user')>-1){
		 this.setState({
          current: 'user',
      });
		 
    }
    else if(hash.indexOf('#/company')>-1){
    	 this.setState({
          current: 'company',
      });
    }
    else if(hash.indexOf('#/system')>-1){
		 			this.setState({
		          current: 'system',
		      });
    }
		this.setState({
			rightWidth:document.documentElement.clientWidth - 180
		})
	}
}
