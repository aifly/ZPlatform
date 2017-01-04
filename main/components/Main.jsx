import React from 'react';

import { Link } from 'react-router';

import {Icon,Menu,Input,Badge,message} from '../commoncomponent/common.jsx';
const SubMenu = Menu.SubMenu;
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import {utilMethods,_$,$$} from '../utilMethod.es6';
import $ from 'jquery';


class MainUI extends React.Component {
    constructor(args) {
        super(...args);

        this.menuClickHandler=this.menuClickHandler.bind(this);
        this.state = {
            defaultClass: "fly-left-aside",
            isOpen: true,
            current: '3',
            currentAcc:'iLinten@qq.com', 
            isCompany : true, //是否是企业用户。默认为false.
            rightWidth:0,
            getusersigid:'',
            userid:'',
            usertypesign:-1,
            isover:-1,
            baseUrl:'http://api.zmiti.com/v2/',
            companyId:'',
            routers:[],
            defaultOpenKeys:'sub1'
            
        }
    }

    menuClickHandler(e){
       /* e.preventDefault();
          this.setState({
            frameSrc:e.target.href
        });*/
    };

    handleClick(e) {

        /*this.setState({
            current: e.key,
            frameSrc:e.key
        });*/

    }

    toggleMenu() {

        if (this.state.defaultClass === "fly-left-aside") {
            window.mainLeftSize = 60;
            this.setState({defaultClass: "fly-left-aside unfold", isOpen: false,rightWidth:document.documentElement.clientWidth - window.mainLeftSize});

        } else {
            this.setState({defaultClass: "fly-left-aside"});
            window.mainLeftSize = 180;
            setTimeout(()=> {
              this.setState({
                isOpen: true,
                rightWidth:document.documentElement.clientWidth - window.mainLeftSize
              });
          }, 200);

        }
    }

    render() { 
        let companyMenu = [];

        var params = this.state.userid+'/'+this.state.getusersigid;

        var hash = window.location.hash;
        var defaultOpenKeys = 'sub1';
        if(hash.indexOf('userdepartment')>-1||hash.indexOf('project')>-1){
            defaultOpenKeys = 'sub2';
        }else if(hash.indexOf('personalAcc')>-1 || hash.indexOf('renewal')>-1){
            defaultOpenKeys = 'sub3';
        }

        if(this.state.isCompany && this.usertypesign === window.Role.COMPANYADMINUSER){//this.usertypesign === 5的时候,才是公司管理员.
            this.userMenuConfig = [//用户中心下的菜单
                {
                    "linkTo":"/userdepartment/",
                    "key":"userdepartment",
                    "title":"用户和部门",
                    "isIcon":true,
                    "type":"team",
                    "isShow":true
                },{
                    "linkTo":"/project/",
                    "key":"project",
                    "title":"项目管理",
                    "isIcon":true,
                    "type":"picture",
                    "isShow":true
                }
            ];
            companyMenu = [1].map((it,i)=>{
                return <SubMenu key="sub2" title={<span><Icon type="user" style={{marginRight:'22px'}} /><span>用户中心</span></span>}>
                            {this.userMenuConfig.map(item=>{
                                return <Menu.Item key={item.key} ><Icon  type={item.type} style={{marginRight:'32px'}}/><Link to={item.linkTo}>{item.title}</Link></Menu.Item> 
                            })}
                        </SubMenu>;
            });
        }

        this.singleUserMenuConfig = [//个人中心下的菜单列表
            {
                "linkTo":"/personalAcc/",
                "key":"personalAcc",
                "title":"账号管理",
                "isIcon":true,
                "type":"user",
                "isShow":true
            },
             {
                "linkTo":"/renewal/",
                "key":"renewal",
                "title":"续费管理",
                "isIcon":true,
                "type":"user",
                "isShow":true
            }
        ]

        var configMenus =window.globalMenus;
        
        return (
            <section className={"main " + (this.props.className || '')}>
                <header className="fly-header" onClick={this.menuClickHandler}>
                    <div className="fly-logo"><a href="/"><img src="./static/images/logo.png" alt=""/></a></div>
                    <div className="fly-nav"><a href="#">控制平台</a></div>
                    <div className="fly-nav"><a href="#">产品与服务</a></div>
                    {(this.state.usertypesign*1 === window.Role.SUPERADMINUSER||this.state.usertypesign*1 === window.Role.NORMALADMINUSER) && <div className="fly-nav"><a href={window.adminUrl}>系统管理</a></div>}
                    <div className="fly-nav"><a href="#">项目洽谈</a></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="fly-search icon">
                        <div onClick={this.logout.bind(this)}><Icon type="logout" /></div>
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
                                  defaultOpenKeys={[defaultOpenKeys]}
                                  selectedKeys={[this.state.current]}
                                  mode="inline">
                                <SubMenu key="sub1"
                                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>产品与服务</span></span>}>
                                     {configMenus.map(item=>{
                                        return <Menu.Item key={item.key} ><Icon  type={item.type} style={{marginRight:'32px'}}/><Link to={item.linkTo}>{item.title}</Link></Menu.Item> 
                                     })}
                                </SubMenu>
                                {companyMenu}
                                <SubMenu key="sub3"
                                         title={<span><Icon type="setting" style={{marginRight:'22px'}} /><span>个人中心</span></span>}>
                                    {this.singleUserMenuConfig.map(item=>{
                                        return <Menu.Item key={item.key} ><Icon type={item.type} style={{marginRight:'32px'}}/><Link to={item.linkTo}>{item.title}</Link></Menu.Item> 
                                    })}
                                </SubMenu>
                            </Menu>
                            <div className="fly-menu-bottom">
                                系统日志
                            </div>
                        </div>
                    </section>
                    <section className="fly-right-aside" style={{width:this.state.rightWidth}}>
                         {this.props.component}
                    </section>
                </article>
            </section>
        )
    }
    
    componentWillMount(){
      let  {validateUser,loginOut,resizeLeftMenu,resizeMainHeight} = this.props;
      var {userid,getusersigid,companyid,isover,usertypesign,username,usermobile,useremail}=validateUser(()=>{
          loginOut();
      });
      resizeLeftMenu(this);
      resizeMainHeight(this);
       this.userid = userid;
       this.getusersigid = getusersigid;
       this.companyid = companyid;
       this.isover = isover;
       this.usertypesign = usertypesign;
       this.username = username;
       this.usermobile = usermobile;
       this.useremail = useremail;
    }

    logout(){//退出登录
    	var s=  this;

    	console.log({
    				userid:s.userid,
    				getusersigid:s.getusersigid
    			})
    		$.ajax({
    			url:window.baseUrl+'user/user_loginout/',
    			data:{
    				userid:s.userid,
    				getusersigid:s.getusersigid
    			},
    			success(data){
    				if(data.getret === 0){
    					document.cookie = null;
    					message.success(data.getmsg);
    					window.location.href= window.loginUrl;
    				}
    			}
    		})
    }

    componentDidMount() {
      

        var hash = window.location.hash;
        var current = '';
        var configMenus =window.globalMenus;
        

        if(this.userMenuConfig){
            configMenus = configMenus.concat(this.userMenuConfig);
        }
        configMenus = configMenus.concat(this.singleUserMenuConfig);
        configMenus.forEach(item=>{
            if(hash.indexOf(item.key)>-1){
                current = item.key;
            }
        });



        this.setState({
            isCompany:this.companyid,
            companyId:this.companyid,
            userid:this.userid,
            current:current,
            usertypesign:this.usertypesign,
            isover:this.isover, 
            getusersigid:this.getusersigid,
            rightWidth:document.documentElement.clientWidth - 180,
            currentAcc:this.usermobile || this.useremail,
            username:this.username
        });

    }
}

export  default ZmitiValidateUser(MainUI);