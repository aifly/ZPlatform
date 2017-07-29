import './static/css/datacheck.css';
import React from 'react';
import {Button,Icon,Checkbox,Input,Row,Col,Pagination,Popconfirm,message,Menu, Dropdown,Switch,Radio} from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
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
           allCount:1,
           pageIndex:1,

           currentPicIndex:-1,


           currentViewPic:'',

           currentDeleteIndex:-1,

           tab:'all',

           currentWhere:{},

           keywords:'',

           status:-1,

           voidurl:'',

           typeList:[],

           classname:'全部',

           dataSource:[
              
           ]
        }
    }

    componentWillMount() {

        let {resizeMainHeight,popNotice,validateUser,loginOut,validateUserRole,isSuperAdmin,isNormalAdmin,getUserDetail,listen,send} = this.props;
        var {userid, getusersigid, companyid,username,isover,usertypesign}=validateUser(()=>{
                loginOut('登录失效，请重新登录',window.loginUrl,false);
            },this);

       
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


        window.addEventListener('keydown',(e)=>{
            switch(e.keyCode){
                case 27://ESC
                this.setState({
                    currentViewPic:'',
                    voidurl :''
                })
                break;
            }
        })


        this.scroll = new IScroll(this.refs['wenming-datacheck-list'],{
            scrollbars:true,//显示滚动条
            interactiveScrollbars:true,//允许用户拖动滚动条
            mouseWheel:true,//启用鼠标滚轮。
        });

        setTimeout(()=>{
            this.scroll.refresh();
        },100)

        this.request();

       
    }


    render(){


        var title = '身边文明事';


        var showBatchbars = false;
        this.state.dataSource.map((item,i)=>{
            if(item.checked){
                showBatchbars = true;
            }
        });
        var menu = (
             <Menu>
                <Menu.Item >
                    <a onClick={this.loadArticleByType.bind(this,'','全部')} href="javascript:">全部</a>
                </Menu.Item>
                {this.state.typeList.map((item,i)=>{
                    return <Menu.Item key={i}>
                        <a  onClick={this.loadArticleByType.bind(this,item.classid,item.classname)} href="javascript:">{item.classname}</a>
                    </Menu.Item>
                })}
                    
              </Menu>)

        var plainOptions = [
            { label: '全部', value: 'all' },
            { label: '审核通过', value: 'checked-pass' },
            { label: '审核不通过', value: 'checked-unpass' },
            { label: '推荐', value: 'recommend-recommend' },
            { label: '未推荐', value: 'recommend-unrecommend' }
        ];
        var props = {
            title,
            selectedIndex:1,
            mainRight:<div className='wenming-datacheck-main-ui' style={{height:this.state.mainHeight}}>
                        <header className='wenming-datacheck-header'>
                            <div>数据审核-{title}</div>   
                            <div><Switch onChange={this.getCheckedData.bind(this)} checkedChildren="已审" unCheckedChildren="未审" /></div>
                            <div><a href='#/wenmingadd'><Icon type="upload"/>上报数据</a></div>   
                        </header>
                        <section className='wenming-datacheck-bar'>
                            <div>
                                <Checkbox onChange={this.selectAll.bind(this)} checked={this.state.selectAll}>全选</Checkbox>
                                
                               {showBatchbars && <Popconfirm onConfirm={this.batchDelete.bind(this)} placement="top" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                                   <div className='wenming-del'><Icon type='delete'/>批量删除</div>
                                                               </Popconfirm>}
                                {showBatchbars && this.state.status === 0 && <div onClick={this.batchChecked.bind(this,'pass')} className='wenming-datacheck-batchcheck'><Icon type="check-circle" />批量审核通过</div>}
                                {showBatchbars && this.state.status === 0 && <div onClick={this.batchChecked.bind(this,'unpass')} className='wenming-datacheck-unpass'><Icon type="close-circle" />拒绝通过审核</div>}
                                <div>
                                     <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link" href="javascript:">
                                          {this.state.classname} <Icon style={{color:'#108ee9'}}  type="down" />
                                        </a>
                                      </Dropdown>
                                </div>
                                {this.state.status === 1 && <div style={{marginLeft:30}}>
                                    <RadioGroup options={plainOptions} onChange={this.loadArticleByClass.bind(this)} value={this.state.tab }>
                                        {plainOptions.map((item,i)=>{
                                            return <Radio key={i} value={item.value}>{item.label}</Radio>
                                        })}
                                    </RadioGroup>
                                </div>}
                            </div>
                            <div>
                                <Row type='flex'>
                                    <Col span={20}><Input type='text' value={this.state.keywords} onChange={e=>{this.setState({keywords:e.target.value})}} /></Col>
                                    <Col span={4}><Button type='primary' onClick={this.loadArticleByKeywords.bind(this)}><Icon type='search'/></Button></Col>
                                </Row>
                            </div>
                        </section>
                        <section className='wenming-datacheck-list' ref='wenming-datacheck-list'>
                            <ul>
                                {this.state.dataSource.map((item,i)=>{
                                    var className='';

                                    if(this.state.status === 1){
                                        if(item.status === 1){
                                            className += ' pass';
                                        }else if(item.status === 2){
                                            className += 'unpass';
                                        }
                                        
                                    }
                                    if(this.state.currentDeleteIndex===i){
                                        className+= ' wenming-datacheck-item-delete'
                                    }
                                    
                                    var len = 80;
                                    
                                    if( item.content.length > len ){
                                        if(!item.showAll){
                                            item.content = item.defaultContent.substring(0,len)+'...';
                                        }
                                        else{
                                            item.content = item.defaultContent
                                        }
                                    }
                                    var showMore = item.defaultContent.length > len? <a  className='wenming-expand'
                                        onClick={()=>{item.showAll = !item.showAll;this.forceUpdate(()=>{this.scroll.refresh()})}}
                                         href='javascript:;'
                                         >
                                         {!item.showAll?'展开全文 ':'收起'}
                                         <Icon type={!item.showAll?"down":'up'} />
                                         </a>:""

                                  //item.content.length > len &&  console.log(item.content,item.defaultContent);
                                    return <li key={i} className={className}>
                                        <aside>
                                            <Checkbox checked={item.checked} onChange={()=>{item.checked=!item.checked;this.state.selectAll = false;this.forceUpdate();}}></Checkbox>
                                        </aside>
                                        <aside className='wenming-datacheck-item-C'>
                                            <section className='wenming-datacheck-item-head'>
                                                <img src={item.headimgurl||defaulturl}/>
                                            </section>
                                            <section className='wenming-datacheck-item-main-content'>
                                                <h2>{item.nickname}</h2>
                                                <div className='wenming-datacheck-date'>{item.date}</div>
                                                <div className='wenming-datacheck-content'>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(item.content)}></div>
                                                    {showMore}
                                                </div>
                                                <ol>
                                                    {item.imgs.map((img,k)=>{
                                                        return <li onClick={this.viewPic.bind(this,i,k)} key={k} style={{cursor:'url(./static/images/big.cur),auto',background:'url('+img+') no-repeat center center / cover'}}></li>
                                                    })}
                                                    {item.voidurl  && <li onClick={this.viewVideo.bind(this,item.voidurl )}><Icon type="play-circle-o" /></li>}
                                                </ol>
                                                <section className='wenming-datacheck-operator'>
                                                    <div>
                                                        {item.videos && item.videos.length>0 && <div><Icon type="video-camera" /> 查看视频</div>}
                                                        {item.status === 1 && false && <div><a href={'#/commentdetail/'+item.id}><Icon type="message" /> 查看评论 ({item.comments}条)</a></div>}
                                                        {this.state.status === 0 &&  <div><Checkbox checked={item.recommend} onChange={()=>{item.recommend = !item.recommend;this.forceUpdate();}}>推荐</Checkbox></div>}
                                                        {this.state.status === 1 && item.status !==2  && <div><Checkbox onChange={this.recommentArticle.bind(this,item)} checked={item.isHost} >推荐</Checkbox></div>}
                                                        {item.status*1 === 0 && <div onClick={this.checkedArticle.bind(this,item,'pass',i)}>
                                                           <Icon className='wenming-pass' type="check-circle" /> 通过审核
                                                        </div>}
                                                        {item.status*1 === 0 && <div onClick={this.checkedArticle.bind(this,item,'unpass',i)}>
                                                            <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                        </div>}
                                                    </div>
                                                </section>
                                            </section>
                                        </aside>
                                        <aside>

                                         <Popconfirm onConfirm={this.delete.bind(this,i,item.id)} placement="leftTop" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                <div><Icon type='delete'/> 删除</div>
                                          </Popconfirm>
                                            
                                        </aside>
                                    </li>;
                                })}
                                <li style={{height:40,  background: 'transparent',border:'none'}}></li>
                            </ul>
                        </section>
                        <section className='wenming-pagination' style={{height:40}}>
                            <Pagination showQuickJumper current={this.state.pageIndex} total={this.state.allCount} onChange={this.loadMoreArticle.bind(this)} />
                        </section>
                        {this.state.currentViewPic && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                            <div>
                                <img src={this.state.currentViewPic} />
                                <section onClick={this.viewPrev.bind(this)} style={{cursor:'url(./static/images/pic_prev.cur),auto'}}></section>
                                <section onClick={()=>{this.setState({currentViewPic:''})}} style={{cursor:'url(./static/images/small.cur),auto'}}></section>
                                <section onClick={this.viewNext.bind(this)} style={{cursor:'url(./static/images/pic_next.cur),auto'}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                        </div>}

                        {this.state.voidurl  && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                            <div>
                                <video autoPlay width={800} height={600} controls src={this.state.voidurl}></video>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                                <section>
                                </section>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                        </div>}
                    </div>
        }
        var mainComponent = <div>
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>
            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
        
        
    }

    loadArticleByKeywords(){
        this.setState({
            loadByKeyWords:true
        },()=>{
            this.loadArticle(this.state.status);
        })
        
    }


    loadArticleByClass(e){
        var arr = e.target.value.split('-');
        

        this.setState({
            tab:e.target.value
        },()=>{
            if(e.target.value === 'all'){
                this.setState({
                    currentWhere:{}
                },()=>{
                    this.loadArticle(this.state.status);
                })
                
                return;
            }

            var type = '',
                value = '';
            switch(arr[0]){
                case "checked":
                    type = 'status';
                    value = arr[1] === 'pass'?1:2
                break;
                case "recommend":
                    type = 'ishot';
                    value = arr[1] === 'recommend'?1:0
                break;
            }

            this.setState({
                currentWhere:{
                    type,
                    value
                }
            },()=>{
                this.loadArticle(this.state.status,undefined,{
                    type,
                    value
                })
            })

            
        });

       



    }


    createMarkup(item){
         return {__html:item};
    }

   

    getCheckedData(index){
        this.setState({
            pageIndex:1
        },()=>{
            this.loadArticle(index*1);
        })
        
    }

    recommentArticle(item){
        //item.isHost = true;
        var ishot = 1;
        if(item.isHost){//取消推荐
            ishot = 0;
        }
        else {//推荐.
            
        }

        $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/hot_articles/',
            data:{
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid,
                articleids:item.id,
                ishot
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){
                item.isHost = !item.isHost;
                this.forceUpdate();
                message.success(ishot?"推荐成功":'取消推荐成功');
            }
        })
    }

    loadArticleByType(id,name){
       
      
        this.setState({
            classid:id,
            classname:name
        },()=>{
            this.loadArticle(this.state.status);
        })
    }

    viewNext(){
        this.setState({
            currentPicIndex:this.state.currentPicIndex+1,
            currentViewPic:this.state.dataSource[this.currentRow].imgs[this.state.currentPicIndex+1]
        })
    }

    viewPrev(){
        this.setState({
            currentPicIndex:this.state.currentPicIndex-1,
            currentViewPic:this.state.dataSource[this.currentRow].imgs[this.state.currentPicIndex-1]
        })
    }

    viewVideo(voidurl){
      this.setState({
           voidurl
      });
    }


    viewPic(i,k){
        this.currentRow = i;
        this.setState({
            currentPicIndex:k,
            currentViewPic:this.state.dataSource[i].imgs[k]
        })
    }


    batchDelete(){
        var arr = [];

        this.state.dataSource.map((item,i)=>{
            if(item.checked){
                arr.push(item.id);

            }
        });
        
        if(arr.length<=0){
            message.error('请选择您要删除的文章~~');
            return;
        }
        this.delete(-1,arr.join(','));


    }

    delete(index,articleids){

        //

        this.state.currentDeleteIndex = index;
        this.forceUpdate(()=>{
           
        });

        $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/del_articles/',
            data:{
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid,
                articleids:articleids
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){

                if(index>-1){
                    setTimeout(()=>{
                        this.state.dataSource.splice(index,1);
                        this.state.currentDeleteIndex = -1;
                        this.state.allCount = this.state.allCount -1;
                        this.forceUpdate(()=>{
                            this.scroll.refresh();
                        });
                    },500)

                }else{
                     setTimeout(()=>{
                         articleids.split(",").map((id,i)=>{
                            this.state.dataSource.map((d,k)=>{
                                if(d.id === id){
                                    this.state.dataSource.splice(k,1);
                                }
                            })
                        });

                        this.state.allCount = this.state.allCount -articleids.split(",").length;
                        this.forceUpdate(()=>{
                            this.scroll.refresh();
                        });
                    },500)
                   
                }
            }
        })

       
    }

    batchChecked(type){
        
        var status = 1;
        switch(type){
            case 'pass':
            break;
            case 'unpass':
            status = 2;
            break;
        }

        var arr = [];

        this.state.dataSource.map((item,i)=>{
            if(item.checked){
                arr.push(item.id);
                this.checkedArticle(item,type,i); 

            }
        });
        message.success('操作成功~~');
        if(arr.length<=0){
            message.error('请选择您要审核的文章~~');
            return;
        }
        
    }

    checkedArticle(item,type,index){

        this.state.currentDeleteIndex = index;
        this.forceUpdate();
        var status = 1;
        switch(type){
            case "pass"://审核通过 
                if(item.recommend){//是推荐
                     $.ajax({
                        type:'post',
                        url:window.baseUrl+'weixinxcx/hot_articles/',
                        data:{
                            appid:window.WENMING.XCXAPPID,
                            userid:this.userid,
                            getusersigid:this.getusersigid,
                            articleids:item.id,
                            ishot:1
                        }
                    }).done((data)=>{
                        if(typeof data === 'string'){
                            data = JSON.parse(data);
                        }
                        if(data.getret === 0 ){
                            message.success('推荐成功');
                        }
                    })
                }

            break;
            case 'unpass'://审核不通过 
                status = 2;
            break;
        } 

        $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/look_articles//',
            data:{
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid,
                articleids:item.id,
                status           
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){

               if(index>-1){
                 setTimeout(()=>{
                    this.state.dataSource.forEach((item,i)=>{
                        item.recommend = false;
                    })
                    this.state.dataSource.splice(index,1)
                    this.state.currentDeleteIndex = -1;
                    this.state.allCount = this.state.allCount -1;
                    this.forceUpdate(()=>{
                        this.scroll.refresh();
                    });
                },500)
             }else{
                 
             }
            }
        })


       
    }

    selectAll(){
        this.state.dataSource.forEach((item,i)=>{
            item.checked = !this.state.selectAll;
        })
        this.setState({
            selectAll:!this.state.selectAll
        });

    }

    loadMoreArticle(e){//分页
        this.setState({
            pageIndex:e
        },()=>{
            this.loadArticle(this.state.status,e);
        })
    }

    loadArticle(index,e){


         
         var state = {
            status:index
         }
         if(!e){
            state.pageIndex = 1;
         }
         this.setState(state,()=>{
             var data = {
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid,
                
                page:this.state.pageIndex,
                pagenum:10
            }
            if(this.state.currentWhere.type){
                
                data[this.state.currentWhere.type] = this.state.currentWhere.value;
                if(this.state.currentWhere.type !== 'status'){
                  data.status = 1;    
                }

            }
            else{
              data.status = index===1?'1,2':0
            }
 
            if(this.state.keywords && this.state.loadByKeyWords){
                data.keyword = this.state.keywords;
            }

            if(this.state.classid){
                data.classid = this.state.classid;
            }

            console.log(data)
             $.ajax({
                type:'post',
                url:window.baseUrl+'weixinxcx/search_articlelist/',
                data
            }).done((data)=>{
                if(typeof data === 'string'){
                    data = JSON.parse(data);
                }
                console.log(data)
                if(data.getret === 0 ){
                    this.state.dataSource = [];
                    data.list.map((item,i)=>{
                        var imgs = item.imageslist.split(',');
                        if(!imgs[0]){
                            imgs.shift();
                        }
                        this.state.dataSource.push({
                            nickname:item.nickname,
                            headimgurl:item.headimgurl,
                            date:item.looktime,
                            content:item.content,
                            defaultContent:item.content,
                            comments:item.commentnum,
                            imgs,
                            voidurl:item.voidurl ,
                            isHost:item.ishost,
                            status:item.status,
                            ///videos:[],
                            id:item.articlid,
                        });
                    });
                    this.state.loadByKeyWords = false;
                    var rows = typeof data.countRow === 'nnumber'? data.countRow:data.countRow.countrows
                    this.state.allCount = data.countRow.countrows
                 

                    this.forceUpdate(()=>{
                        this.scroll.refresh();
                    });
                }
            },()=>{

            })
        });

         




        
    }



    request(){

       this.loadArticle(0);


          $.ajax({
            type:'post',
            url:window.baseUrl+'weixinxcx/search_articleclass',
            data:{
                appid:window.WENMING.XCXAPPID,
                userid:this.userid,
                getusersigid:this.getusersigid
            }
        }).done((data)=>{
            if(typeof data === 'string'){
                data = JSON.parse(data);
            }
            if(data.getret === 0 ){

              
                this.setState({
                    typeList:data.list
                })
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
