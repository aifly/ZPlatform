import './static/css/index.css';
import React from 'react';
import { message,Row,Col,Input,Button,Icon,InputNumber } from '../commoncomponent/common.jsx';

import $ from 'jquery';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import {ZmitiValidateUser} from '../public/validate-user.jsx';

import ZmitiWxHeader from '../components/wxheader/index.jsx'
import ZmitiClockApp from '../components/clock/index.jsx'

import IScroll from 'iscroll';

import MainUI from '../components/Main.jsx';

 class ZmitiQAApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
           mainHeight:document.documentElement.clientHeight - 50,
            isBg:true,//是否选中风格，
            isBgSound:false,
            currentQid:0,
            currentSetting:0,//当前的设置面板  内容设置，风格设置 、发布设置。
            questionIndex:0,
            themeList:[
                {name:'DANGJIAN',src:'./static/images/qa-phone.png'},
            ],
            audioList:[
                {name:'花火',type:'纯音乐',src:''},
                {name:'花火',type:'纯音乐',src:'1'},
                {name:'花火',type:'纯音乐',src:'2'},
                {name:'花火',type:'纯音乐',src:'3'},
                {name:'花火',type:'纯音乐',src:'4'},
                {name:'花火',type:'纯音乐',src:'5'}
            ],
            data:{
                shareTitle:'',//分享标题
                shareDesc:'',//分享描述
                shareImg:'',//分享图片300.jpg;
                background:'',//聊天背景图片
                bgSound:'',//背景音乐
                worksname:'',
                theme:'default',
                duration:360,
                type:'',
                question:[
                {
                    answer:[]
                }
                ],
                viewpath:'',//预览地址
                 
            }
        }
        this.arr = ["A",'B','C','D','E','F','G','H','I'];
        this.viewH = document.documentElement.clientHeight;
    }

componentWillMount() {
        
        let {resizeMainHeight,validateUser,loginOut,randomString} = this.props;

        resizeMainHeight(this); 

        this.resizeMainHeight = resizeMainHeight;

        this.randomString = randomString;
        
        let {userid,getusersigid,usertypesign} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
        this.userid = userid;
        this.getusersigid = getusersigid;
        this.usertypesign = usertypesign;
        this.loginOut = loginOut;
    }

    componentDidMount(){
       this.resizeMainHeight(this);



        var s = this;
        this.worksid = s.props.params.id;

        if(!this.worksid){
            message.error('url 参数不正确');
            return;
        }
        $.ajax({
            url:window.baseUrl + '/works/get_filecontent/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                worksid:s.worksid
            },
            success(data){
                if(data.getret === 0){

                    try{

                        s.state.data = JSON.parse(data.filecontent);
                        !s.state.data.theme && (s.state.data.theme = 'DANGJIAN');
                        !s.state.data.bgSound && (s.state.data.bgSound = '');
                        
                        s.state.data.question = s.state.data.question || [];
                        s.state.data.question  = s.state.data.question.length<=0 ?  [{title:'“三会一课制度”不包括下列哪个内容？',img:'',score:0,answer:[{content:'定期召开支部党员大会',isRight:false},{content:'定期召开支部委员会',isRight:false},{"content":"按时上好党课","isRight":false},{content:'定期召开民主生活会',isRight:true}],id:s.randomString() }] :  s.state.data.question;
                        s.state.data.duration  = s.state.data.duration || 360;
                        s.state.data.questionType  = s.state.data.questionType || 'single';
 
                        s.forceUpdate(()=>{

                            s.state.data.question.map((item,i)=>{
                                if(s.refs['editqa-q-scroll'+i]){
                                    s['scroll'+i] = new IScroll(s.refs['editqa-q-scroll'+i],{
                                        scrollbars:true,//显示滚动条
                                        interactiveScrollbars:true,//允许用户拖动滚动条
                                        mouseWheel:true

                                    });
                                }
                            });
                            setTimeout(()=>{
                                s.state.data.question.map((item,i)=>{
                                    s['scroll'+i].refresh();
                                });
                            },1000)

                        })
                    }catch(e){
                        message.error('您没有该作品该编辑');
                        setTimeout(()=>{
                           s.loginOut();
                        },400)
                    }
                    
                }
            }
        })

    }




    render(){

            var mainStyle = {
            height:this.state.mainHeight
        }

        var s = this;

        const showShareProps  = {
            baseUrl: window.baseUrl,
            getusersigid: s.getusersigid,
            userid: s.userid,
            onFinish(imgData){
                s.modifyShareInfo('shareImg','',imgData.src);
                
            }
        }

         
       var shareStyle = {cursor:'pointer',position:'relative'};
       if(this.state.data.shareImg){
            shareStyle.background = 'url('+this.state.data.shareImg+') no-repeat center / cover'
        }

        var phoneStyle ={
            background:'url(./static/images/phone-bg.png) no-repeat center / contain'
        };

        var headerProps = {
            title:this.state.data.title
        }

        var component = <div className='qaedit-main-ui' style={mainStyle}>
            <aside>
                <div className='editpoetry-iphone' style={phoneStyle} >
                    
                    <div className='zmiti-edit-phone-C'>
                        <ZmitiWxHeader {...headerProps}></ZmitiWxHeader>
                        <div className='qaedit-phone-body'>
                            <header>
                                <aside>
                                    <span>姓名：{this.state.username||'张三'}</span>
                                </aside>
                                <aside>
                                    <div className='editqa-clock-sm'><ZmitiClockApp animate={false} size={12}></ZmitiClockApp></div>
                                    <div>剩余时间：<span>{this.state.data.duration/60<10?'0'+(this.state.data.duration/60|0):this.state.data.duration/60|0}:{this.state.data.duration % 60<10?'0'+this.state.data.duration % 60:this.state.data.duration % 60}</span></div>
                                </aside>
                            </header>

                            <svg  width="100%" height="23px" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                        <path strokeDasharray="10,6" d="M0 2 L640 2" stroke='#ccc' strokeWidth={3} >
                        </path>
                    </svg>
                    {this.state.data.question.map((question,q)=>{
                        var className = '';
                        if(this.state.currentQid > q ){
                            className = 'left';
                        }else if(this.state.currentQid === q){
                            className = 'active';
                        }else{
                            className = 'right';
                        }
                        var scrollStyle ={
                            height:434-50,
                            overflow:'hidden',
                           // background:"url(./static/images/bg.png) no-repeat center center / cover "

                        }

                        return  <section className={'editqa-question-list-C '+ className} ref={'editqa-q-scroll'+q} key={q} style={scrollStyle}>
                                    <section style={{paddingBottom:60}}>
                                        <div className='editqa-q-title'>
                                            <article>
                                                {question.img && <img src={question.img}/>} 
                                                <div>{question.title}</div>
                                            </article>
                                            <div className='editqa-pager'>
                                                <span>{(this.state.currentQid||0) +1}</span>
                                                <span>{this.state.data.question.length}</span>
                                            </div>
                                        </div>
                                        <div className='editqa-q-answer-list'>
                                            {question.answer.map((item,i)=>{
                                                return <div 
                                                         key={i} 
                                                        className={'editqa-q-item '}>
                                                        {this.arr[i]+"、"+item.content}
                                                    </div>
                                            })}

                                           {/* {this.props.myAnswer.length>=this.props.question.length-1 && <div onTouchTap={this.submitPaper.bind(this)} className={'editqa-submit-btn ' + (this.state.submit?'active':'')}>提交答卷</div>}
                                                                                       {this.props.myAnswer.length<this.props.question.length-1 && <div onTouchTap={this.doNext.bind(this)} className={'editqa-submit-btn ' + (this.state.submit?'active':'')}>下一题</div>}*/}
                                        </div>
                                    </section>  
                                </section>
                    })}
                        </div>
                    </div>
                    <section className='qaedit-btn-ground'>
                        <div onClick={this.changeMenu.bind(this,'bg')} className='qaedit-bg-btn' style={{background:'url(./static/images/poetry-bg-btn.png) no-repeat left '+(this.state.isBg ? 'top':'bottom')+''}}>
                        </div>
                        <div onClick={this.changeMenu.bind(this,'bgsound')} className='qaedit-bgsound-btn' style={{background:'url(./static/images/poetry-bgsound-btn.png) no-repeat left '+(this.state.isBgSound ? 'top':'bottom')+''}}>
                            
                        </div>
                    </section>
                </div>

                <section className='editqa-left-operator-btns'>
                    <aside onClick={this.preview.bind(this)}>
                        <div className={this.state.viewtap?'tap':''}>预览</div>
                    </aside>
                    <aside onClick={this.save.bind(this)}>
                        <div className={this.state.savetap?'tap':''}>保存</div>
                    </aside>
                    <aside onClick={this.publish.bind(this)}>
                        <div className={this.state.publishtap?'tap':''}>发布</div>
                    </aside>
                </section>
            </aside>
            <aside>
                {this.state.currentSetting === 0 && <section className='qaedit-right-C'>
                    <div className='editqa-title'>
                        <Input type='text' value={this.state.data.title} addonBefore='作品标题' onChange={e=>{this.state.data.title = e.target.value;this.forceUpdate()}}/>
                    </div>
                    <div className="editqa-q-type">
                        <section>
                            题目类型 :                            
                        </section>
                        <section onClick={()=>{this.state.data.questionType = 'single';this.forceUpdate();}} className={this.state.data.questionType === 'single' ? 'active': ''}>
                            单选
                        </section>
                        <section onClick={()=>{this.state.data.questionType = 'multi';this.forceUpdate();}} className={this.state.data.questionType === 'multi' ? 'active': ''}>
                            多选
                        </section>
                        <section onClick={()=>{this.state.data.questionType = 'mixin';this.forceUpdate();}} className={this.state.data.questionType === 'mixin' ? 'active':''}>
                            混合
                        </section>
                    </div>
                    <div className="editqa-q-duration">
                        <section>
                            答题时间 :                            
                        </section>
                        <section>
                            <InputNumber min={30} value={this.state.data.duration} onChange={e=>{this.state.data.duration = e;this.forceUpdate();}}/> S
                        </section>
                        <section>
                            
                        </section>
                        <section>
                            
                        </section>
                    </div>
                    <section className='qaedit-bg-C'>
                        <ul>
                            {
                                this.state.themeList.map((item,i)=>{
                                    return <li onClick={()=>{this.state.data.theme = item.name;this.forceUpdate()}} className={this.state.data.theme === item.name?'active':''} key={i}>
                                        <img src={item.src}/>
                                    </li>
                                })  
                            }
                        </ul>
                    </section>
                    <div style={{marginTop:30}} className='qaedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
                </section>}
                {this.state.currentSetting === -1 && <section className='qaedit-right-C'>
                    <header>背景音乐设置</header>
                    <section className='qaedit-bgsound-C'>
                        <ul>
                            <li>
                                <aside>歌名</aside>
                                <aside>类型</aside>
                                <aside>播放</aside>
                                <aside>设为</aside>
                            </li>
                            {
                                this.state.audioList.map((item,i)=>{
                                    return <li onClick={()=>{this.state.data.bgSound = item.src;this.forceUpdate()}} className={this.state.data.bgSound === item.src?'active':''} key={i}>
                                        <aside>{item.name}</aside>
                                        <aside>{item.type}</aside>
                                        <aside><img src='./static/images/poetry-play-btn.png'/></aside>
                                        <aside>设为</aside>       
                                    </li>
                                })  
                            }
                            <li className={this.state.data.bgSound === '-1' ? 'active':''} onClick={()=>{this.state.data.bgSound = '-1';this.forceUpdate()}}>
                                <aside></aside>
                                <aside>无背景音乐</aside>
                                <aside></aside>
                            </li>
                        </ul>
                    </section>
                    <div className='qaedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
                </section>}

                {this.state.isShare && <section className='qaedit-right-C'>
                    <header>分享设置</header>
                    <aside>
                        <div className='poetry-share-ui'>
                            <section>
                                <Button title='{username}会被替换成微信的昵称' type='primary' size='large' onClick={this.atMeAtTitle.bind(this)}>在标题中插入昵称</Button>
                                <Button title='{username}会被替换成微信的昵称' type='primary' size='large' style={{marginLeft:30}} onClick={this.atMeAtDesc.bind(this)}>在描述中插入昵称</Button>
                                <h1 style={{height:10}}></h1>
                                <Row type='flex' align='start' gutter={20}>
                                    <Col span={6}>
                                        <div style={shareStyle}>
                                            <img onClick={this.modifyShareImg.bind(this)} style={{opacity:this.state.data.shareImg?0:1}} src='./static/images/add-share.png'/>
                                            {this.state.data.shareImg && this.state.showShareImgBtn && <div className='poetry-operat-shareimg'>
                                                                                    <Button type='primary' icon='reload' onClick={this.replaceShareImg.bind(this)}>替换</Button>
                                                                                    <Button type='primary' icon='delete' onClick={this.modifyShareInfo.bind(this,'shareImg','','')}>删除</Button>
                                                                                </div>}
                                        </div>
                                    </Col>
                                    <Col span={18}>
                                        <Input value={this.state.data.shareTitle} onChange={this.modifyShareInfo.bind(this,'shareTitle')} type='text' placeholder='请输入分享的标题'/>
                                        <textarea placeholder='请输入分享的描述' value={this.state.data.shareDesc}  onChange={this.modifyShareInfo.bind(this,'shareDesc')}></textarea>
                                    </Col>
                                </Row>              
                            </section>
                            <section>
                                <Row type='flex' align='middle'>
                                    <Col span={12}>
                                        <img src={this.state.data.qrcodeurl||'./static/images/qrcode.png'}/>
                                    </Col>
                                    <Col span={12}>
                                        <div>扫二维码分享给好友</div>
                                    </Col>
                                </Row>              
                            </section>
                            
                        </div>  
                    </aside>
                </section>}

                {this.state.isCustom && <section className='qaedit-right-C'>
                    <header>添加问题</header>
                    <ul className='qaedit-custom-list'>
                        {this.state.data.customList.map((item,i)=>{
                            return <li onClick={this.changeCurrentCustom.bind(this,i)} className={this.state.customIndex === i?'active':''} key={i}>{i+1}<span>x</span></li>
                        })}
                    </ul>
                    {this.state.data.question[this.state.questionIndex] && <section className='qaedit-custom-center qaedit-custom-content'>
                                            <textarea  value={this.state.data.question[this.state.questionIndex].content} onChange={e=>{this.state.data.question[this.state.questionIndex].content = e.target.value;this.forceUpdate()}} placeholder='请输入内容'></textarea>
                                            <Input value={this.state.data.question[this.state.questionIndex].answer[0].content} addonBefore={'答案1'} addonAfter={'点击继续添加答案'} type='text'/>
                                        </section>}

                    <section className='qaedit-custom-center qaedit-custom-btn'>
                        <Button type='primary' onClick={this.addCustom.bind(this)}>继续</Button>
                    </section>
                    <div className='qaedit-next'><Button type='primary' onClick={this.entryShare.bind(this)}>下一步</Button></div>
                </section>}
                <section className='editqa-setting-C'>
                    <aside onClick={()=>{this.setState({currentSetting:0})}} className={this.state.currentSetting === 0 ?'active':''}>内容设置</aside>
                    <aside onClick={()=>{this.setState({currentSetting:1})}} className={this.state.currentSetting === 1 ?'active':''}>风格设置</aside>
                    <aside onClick={()=>{this.setState({currentSetting:2})}} className={this.state.currentSetting === 2 ?'active':''}>发布设置</aside>
                </section>
                {this.state.showShareDialog && <ZmitiUploadDialog id={'showShareDialog'} {...showShareProps}></ZmitiUploadDialog>}  
            </aside>
        </div>
        return (
            <MainUI component={component}></MainUI>
        );
    }

    changeMenu(type){
        if(type === 'bg'){
            this.setState({
                isBg:true,
                isCustom:false,
                isBgSound:false,
                isShare:false
            });
        }else if(type ==='bgsound'){
            this.setState({
                isBg:false,
                isCustom:false,
                isBgSound:true,
                isShare:false
            });
        }
    }

    modifyShareInfo(name,e,data){

        this.state.data[name] = e.target?e.target.value : data;
        this.forceUpdate();
  }

    entryShare(){
        //进入分享页面
        this.setState({
            isBg:false,
            isBgSound:false,
            isCustom:false,
            isShare:true
        })
    }


    atMeAtTitle(){
        this.state.data.shareTitle+='{username}';
        this.forceUpdate();
    }
    atMeAtDesc(){
        this.state.data.shareDesc+='{username}';
        this.forceUpdate(); 
    }

    changeCurrentCustom(i,e){
        if(e.target.nodeName === "SPAN"){
            if(this.state.data.customList.length<=1){
                message.error('至少要有1条记录');
                return;
            }
            this.state.data.customList.splice(i,1);
            this.state.customIndex = this.state.data.customList.length -1;
        }else{

            this.state.customIndex = i;
            this.state.currentCustom = this.state.data.customList[i];
        }

        this.forceUpdate(); 
        
    }

    modifyShareImg(){

        if(!this.state.data.shareImg){
            this.replaceShareImg()
        }
        else{
            this.setState({
                showShareImgBtn:true,
                showShareDialog:false
            });
        }

    }

    addCustom(){
        let {randomString} = this.props;

        if(this.state.data.customList.length>=10){
            message.error('最多添加10条记录');
            return;
        }

        if(this.state.data.customList[this.state.customIndex].content.length<=0){
            message.error('内空不能空为');
            return;
        }
        
        this.state.data.customList.push ({content:'',title:'',id:randomString()});

        this.state.customIndex = this.state.data.customList.length -1;

       
        
        this.forceUpdate();
    }

    replaceShareImg(){

        this.setState({
            showShareDialog:true,
            showShareImgBtn:false
        },()=>{

            window.obserable.trigger({
                type:'showModal',
                data:{
                    id:'showShareDialog',
                    type:0
                }
            })
        })
    }
    
    modifyShareInfo(name,e,data){

        this.state.data[name] = e.target?e.target.value : data;
        this.forceUpdate();
   }

   changeCurrentCustom(i,e){
        if(e.target.nodeName === "SPAN"){
            if(this.state.data.customList.length<=1){
                message.error('至少要有1条记录');
                return;
            }
            this.state.data.customList.splice(i,1);
            this.state.customIndex = this.state.data.customList.length -1;
        }else{

            this.state.customIndex = i;
            this.state.currentCustom = this.state.data.customList[i];
        }

        this.forceUpdate(); 
        
    }

    preview(){
        this.setState({
            viewtap:true
        });

        setTimeout(()=>{
            this.setState({
                viewtap:false
            });
        },150)
    }

    publish(){
        this.setState({
            publishtap:true
        });

        setTimeout(()=>{
            this.setState({
                publishtap:false
            });
        },150)
    }

    save(){

        this.setState({
            savetap:true
        });

        setTimeout(()=>{
            this.setState({
                savetap:false
            });
        },150);

        return;

        var s = this;
        if(this.state.data.customList[this.state.data.customList.length - 1] && !this.state.data.customList[this.state.data.customList.length - 1].content){
            this.state.data.customList.pop();
        }
        if(this.state.data.type==="CUSTOM" && this.state.data.customList.length <= 0){
            message.error('至少要有1条记录');
            return;
        }

        s.filterLoadingImg(s.state.data);
        s.state.data.loadingImg = s.loadingImg;

        $.ajax({
            url:window.baseUrl+'/works/update_works/',
            type:'post',
            data:{
                worksid:s.state.data.worksid,
                userid:s.userid,
                getusersigid:s.getusersigid,
                datajson:JSON.stringify(s.state.data),
                worksname:s.state.data.title,
                dirname:'qa',
                workstag:'',
                workico:''
            },
            success(data){
                message[data.getret === 0?'success':'error'](data.getmsg);
                if(data.getret === 1300){//用户登录超时
                    window.location.href = window.loginUrl;
                }
            }
        })
    }

    filterLoadingImg(data){
        this.loadingImg = this.loadingImg || 
        [
            "./assets/images/300.jpg",
            "./assets/images/zmiti.png",
            "./assets/images/bg.png",
            "./assets/images/watch.png",
            "./assets/images/logo.png",
            "./assets/images/refresh.png",
            "./assets/images/share-ico.png",
            "./assets/images/arron1.png"
        ];


        for(var attr in data){

            if(typeof data[attr] === 'object'){
                this.filterLoadingImg(data[attr]);
            }else{
                if(typeof data[attr] === 'string' && data[attr].split('.').length>1){
                    var suffix = data[attr].split('.')[data[attr].split('.').length-1];
                    
                    if(suffix === 'jpg'||suffix === 'png'||suffix === 'gif'||suffix === 'jpeg'){
                        var add =true;
                        this.loadingImg.forEach((item,i)=>{
                            if(item === data[attr]){
                                add = false;
                            }
                        });
                        add && this.loadingImg.push(data[attr]);
                    }
                }
            }
        }
    }

  
}

export default ZmitiValidateUser(ZmitiQAApp);
