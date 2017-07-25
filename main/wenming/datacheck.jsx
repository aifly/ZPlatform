import './static/css/datacheck.css';
import React from 'react';
import {Button,Icon,Checkbox,Input,Row,Col,Pagination} from '../commoncomponent/common.jsx';

import $ from 'jquery';



import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';
var defaulturl= 'http://www.zmiti.com/main/static/images/zmiti-logo.jpg';
 class ZmitiWenmingDataCheckApp extends React.Component{
    constructor(args){
        super(...args);

        this.state = {
           mainHeight:document.documentElement.clientHeight-50,
           selectAll:false,
           allCount:500,
           pageIndex:1,

           uncheckList:[
              {
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.jpg',
                    './static/images/wenming/2.jpg',
                    './static/images/wenming/3.jpg',
                    './static/images/wenming/1.png',
                    './static/images/wenming/2.png',
                    './static/images/wenming/3.png', 
                    './static/images/wenming/1.jpg',
                    './static/images/wenming/2.jpg',
                    './static/images/wenming/3.jpg',
                ],
                videos:[],
                id:1,
              },{
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.jpg',
                    './static/images/wenming/2.jpg',
                    './static/images/wenming/3.jpg',
                ],
                videos:[],
                id:1,
              },{
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.png',
                    './static/images/wenming/2.png',
                    './static/images/wenming/3.png',
                ],
                videos:[],
                id:1,
              },{
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.jpg',
                    './static/images/wenming/2.jpg',
                    './static/images/wenming/3.jpg',
                ],
                videos:[],
                id:1,
              },{
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.png',
                    './static/images/wenming/2.png',
                    './static/images/wenming/3.png',
                ],
                videos:[],
                id:1,
              },{
                nickname:'智媒体',
                headimgurl:defaulturl,
                date:'7月20日 20：07',
                content:'郑爽做好人好事！在酒店大堂，看见有人提着沉重行李，郑爽跑上前主动为人开门，小小举动好暖心！ ​',
                imgs:[
                    './static/images/wenming/1.jpg',
                    './static/images/wenming/2.jpg',
                    './static/images/wenming/3.jpg',
                ],
                videos:[],
                id:1,
              }
           ]
        }
    }

    componentWillMount() {

        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

        var visit = false;
        window.WENMING.VISITUSERS.forEach((item,i)=>{
            if(item === username){
                visit = true;
                return;
            }
        });
        if(!visit){
            loginOut('您没有访问的权限',window.mainUrl,true);//不是hash跳转。location.href跳转
        }
        this.loginOut = loginOut;
        this.listen = listen;
        this.send = send;
        this.popNotice = popNotice;
        this.isSuperAdmin = isSuperAdmin;
        this.isNormalAdmin = isNormalAdmin;
        this.validateUserRole = validateUserRole;
        this.getUserDetail = getUserDetail;
        this.resizeMainHeight = resizeMainHeight;
    }
    componentDidMount(){
       this.resizeMainHeight(this);
       let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            loginOut();
        },this);


        resizeMainHeight(this);


        this.scroll = new IScroll(this.refs['wenming-datacheck-list'],{
            scrollbars:true,//显示滚动条
            interactiveScrollbars:true,//允许用户拖动滚动条
            mouseWheel:true,//启用鼠标滚轮。
        });

        setTimeout(()=>{
            this.scroll.refresh();
        },100)

        this.request()
       
    }


    render(){


        var title = '身边文明事';

        var props = {
            title,
            selectedIndex:1,
            mainRight:<div className='wenming-datacheck-main-ui' style={{height:this.state.mainHeight}}>
                        <header className='wenming-datacheck-header'>
                            <div>数据审核-{title}</div>   
                            <div><span>已审</span> | <span>未审</span></div>   
                            <div><a href='#'><Icon type="upload"/>上报数据</a></div>   
                        </header>
                        <section className='wenming-datacheck-bar'>
                            <div>
                                <Checkbox onChange={this.selectAll.bind(this)} checked={this.state.selectAll}>全选</Checkbox>
                                <div className='wenming-del'>删除</div>
                                <div>分类</div>
                            </div>
                            <div>
                                <Row type='flex'>
                                    <Col span={20}><Input type='text' /></Col>
                                    <Col span={4}><Button type='primary'><Icon type='search'/></Button></Col>
                                </Row>
                                
                            </div>
                        </section>
                        <section className='wenming-datacheck-list' ref='wenming-datacheck-list'>
                            <ul>
                                {this.state.uncheckList.map((item,i)=>{
                                    return <li key={i}>
                                        <aside>
                                            <Checkbox checked={item.checked} onChange={()=>{item.checked=!item.checked;this.state.selectAll = false;this.forceUpdate();}}></Checkbox>
                                        </aside>
                                        <aside className='wenming-datacheck-item-C'>
                                            <section className='wenming-datacheck-item-head'>
                                                <img src={item.headimgurl}/>
                                            </section>
                                            <section className='wenming-datacheck-item-main-content'>
                                                <h2>{item.nickname}</h2>
                                                <div className='wenming-datacheck-date'>{item.date}</div>
                                                <div className='wenming-datacheck-content'>{item.content}</div>
                                                <ol>
                                                    {item.imgs.map((img,k)=>{
                                                        return <li key={k} style={{background:'url('+img+') no-repeat center center / cover'}}></li>
                                                    })}
                                                </ol>
                                                <section className='wenming-datacheck-operator'>
                                                    <div>
                                                        {item.videos && item.videos.length>0 && <div><Icon type="video-camera" /> 查看视频</div>}
                                                        {/*<div><Icon type="message" /> 查看评论 ({item.comments}条)</div>*/}
                                                        <div><Checkbox>推荐</Checkbox></div>
                                                        <div>
                                                            
                                                            <Icon className='wenming-pass' type="check-circle" /> 通过审核
                                                        </div>
                                                        <div>
                                                            <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                        </div>
                                                    </div>
                                                </section>
                                            </section>
                                        </aside>
                                        <aside>
                                            <div onClick={this.delete.bind(this,i)}><Icon type='delete'/> 删除</div>
                                        </aside>
                                    </li>;
                                })}
                                <li style={{height:40}}></li>
                            </ul>
                        </section>
                        <section className='wenming-pagination' style={{height:40}}>
                            <Pagination showQuickJumper defaultCurrent={this.state.pageIndex} total={this.state.allCount} onChange={()=>{}} />
                        </section>
                    </div>
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }

    delete(index){
        this.state.uncheckList.splice(index,1);
        this.forceUpdate(()=>{
            this.scroll.refresh();
        });
    }

    selectAll(){
        this.state.uncheckList.forEach((item,i)=>{
            item.checked = !this.state.selectAll;
        })
        this.setState({
            selectAll:!this.state.selectAll
        });

    }

    request(){

         $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/search_articlelist/',
            data:{
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid,
                status:0,
                page:this.state.pageIndex,
                pagenum:10
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){

                this.state.uncheckList = [];
                data.list.map((item,i)=>{
                    var imgs = item.imageslist.split(',');
                    if(!imgs[0]){
                        imgs.shift();
                    }
                    this.state.uncheckList.push({
                        nickname:item.nickname,
                        headimgurl:item.headimgurl,
                        date:item.createtime,
                        content:item.content,
                        imgs,
                        ///videos:[],
                        id:item.articlid,
                    });
                    this.state.allCount = data.countRow.countrows
                    this.forceUpdate();

                });

                console.log(data);   
            }
        })

    }
    

    formatNumber(s, n = 3){   
           n = n > 0 && n <= 20 ? n : 2;   
           s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
           var l = s.split(".")[0].split("").reverse(),   
           r = s.split(".")[1];   
            var  t = "";   
           for(var i = 0; i < l.length; i ++ )   
           {   
              t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
           }   
           return t.split("").reverse().join("");   
    } 

   

  
}

export default ZmitiValidateUser(ZmitiWenmingDataCheckApp);
