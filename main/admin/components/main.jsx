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
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
const SubMenu = Menu.SubMenu;

class MainUI extends Component {
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

    let params = '';//this.state.userid+'/'+this.state.getusersigid;

    this.userManagerMenuConfig = [
       {
          "linkTo":"/user/",
          "key":"user",
          "title":"个人账户管理",
          "isIcon":true,
          "type":"user",
          "isShow":true
      }, {
          "linkTo":"/company/",
          "key":"company",
          "title":"公司账户管理",
          "isIcon":true,
          "type":"customerservice",
          "isShow":true
      }
    ];
    if(this.usertypesign===4){
      this.userManagerMenuConfig.push( {
          "linkTo":"/system/",
          "key":"system",
          "title":"系统账户管理",
          "isIcon":true,
          "type":"edit",
          "isShow":true
      })
    }

    var openKey = 'sub5';
    this.userManagerMenuConfig.forEach(item=>{
      if(item.key.indexOf('#/user/')>-1){

      }
    });

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
                                  defaultOpenKeys={[openKey]}
                                  selectedKeys={[this.state.current]}
                                  mode="inline">
                                <SubMenu key="sub5"
                                title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>用户管理</span></span>}>
                                     {this.userManagerMenuConfig.map(item=>{
                                        return <Menu.Item key={item.key} ><Icon  type={item.type} style={{marginRight:'32px'}}/><Link to={item.linkTo}>{item.title}</Link></Menu.Item> 
                                     })}
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
  componentWillMount() {
      let  {validateUser,loginOut} = this.props;
      var {userid,getusersigid,companyid,isover,usertypesign}=validateUser();
        this.userid = userid;
        this.getusersigid = getusersigid;
        this.companyid = companyid;
        this.isover = isover;
        this.usertypesign = usertypesign;
        this.loginOut = loginOut;
     
      if(this.usertypesign !== 3 &&  this.usertypesign !== 4){
        loginOut('您没有访问的权限',window.mainUrl);
      }

  }
	componentDidMount() {
        
    
		var hash = window.location.hash;
    var configs = this.userManagerMenuConfig;
    var current =  '';
    configs.forEach(item=>{
      if(hash.indexOf('#'+item.linkTo)>-1){
        current = item.key;
      }
    });
    this.setState({
        current: current,
        rightWidth:document.documentElement.clientWidth - 180,
        userid:this.userid,
        isover:this.isover,
        getusersigid:this.getusersigid
    });
   
		
	}
}
export default ZmitiValidateUser(MainUI);