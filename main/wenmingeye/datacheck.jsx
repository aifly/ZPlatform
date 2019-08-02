import './static/css/datacheck.css';
import React from 'react';
import {
    Button,
    Icon,
    Checkbox,
    Input,
    Row,
    Col,
    Pagination,
    Popconfirm,
    message,
    Menu,
    Dropdown,
    Switch,
    Form,
    Radio,
    Modal,
    Select,
    Upload
} from '../commoncomponent/common.jsx';
const RadioGroup = Radio.Group;
let FormItem = Form.Item;
const Option = Select.Option;
import $ from 'jquery';

import { WMURLS, title, baseUrl, WMEYEAPPID } from './url';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import {
    ZmitiValidateUser
} from '../public/validate-user.jsx';

import ZmitiWenmingAsideBarApp from './header.jsx';

import MainUI from '../components/Main.jsx';


import IScroll from 'iscroll';
var defaulturl = 'http://www.zmiti.com/main/static/images/zmiti-logo.jpg';

class ZmitiWenmingDataCheckApp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            mainHeight: document.documentElement.clientHeight - 50,
            selectAll: false,
            allCount: 1,
            pageIndex: 1,
            replycompanyname:'',
            replycontent:'',
            fileList: [
            ],
            defaultProvince:"",
            pageSize: 10,
            
            replyObj:{
                id:-1
            },
            editObj:{
                id:-1
            },
            editIndex:-1,
            editTitle:'',
            editContent:'',

            currentPicIndex: -1,


            currentViewPic: '',

            currentDeleteIndex: -1,

            tab: 'all',

            currentWhere: {},
            provinceRankingList:[],
            keywords: '',

            status: -1,

            voidurl: '',

            typeList: [],

            classname: '全部',

            dataSource: [

            ],
            previewVisible: false,
            previewImage: '',
            fileImgList: [],
            editImgStr:'',
            editVideoUrl:'',
            editusername:'',
            isReplyImage:false,
            isEditImage:false,
            isEditVideo:false
        }

        this.viewW = document.documentElement.clientWidth;
    }

    componentWillMount() {

        let {
            resizeMainHeight,
            popNotice,
            validateUser,
            loginOut,
            validateUserRole,
            isSuperAdmin,
            isNormalAdmin,
            getUserDetail,
            listen,
            send,
            copyfileto
            
        } = this.props;
        var {
            userid,
            getusersigid,
            companyid,
            username,
            isover,
            usertypesign
        } = validateUser(() => {
            loginOut('登录失效，请重新登录', window.loginUrl, false);
        }, this);


        this.loginOut = loginOut;
        this.listen = listen;
        this.send = send;
        this.popNotice = popNotice;
        this.isSuperAdmin = isSuperAdmin;
        this.isNormalAdmin = isNormalAdmin;
        this.validateUserRole = validateUserRole;
        this.getUserDetail = getUserDetail;
        this.resizeMainHeight = resizeMainHeight;
        this.copyfileto = copyfileto;

    
    }
    componentDidMount() {
        this.resizeMainHeight(this);
        let {
            validateUser,
            loginOut,
            resizeMainHeight
        } = this.props;
        var iNow = 0;
        validateUser(() => {
            loginOut();
        }, this);


        resizeMainHeight(this);
        

        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 27: //ESC
                    this.setState({
                        currentViewPic: '',
                        voidurl: ''
                    })
                    break;
            }
        })


        this.scroll = new IScroll(this.refs['wenming-datacheck-list'], {
            scrollbars: true, //显示滚动条
            interactiveScrollbars: true, //允许用户拖动滚动条
            mouseWheel: true, //启用鼠标滚轮。
            preventDefault: false
        });

        setTimeout(() => {
            this.scroll.refresh();
        }, 100)
        
        var id = this.props.params.id;
        if(id){
            this.refs['switch'].querySelector('button').click();
        }
        else{
            this.request();
        }
        this.getProvinceList();

    }


    render() {

 


        var showBatchbars = false;
        this.state.dataSource.map((item, i) => {
            if (item.checked) {
                showBatchbars = true;
            }
            
        });
        
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        
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

        var s = this;
              
        var replyProps = {
            userid: s.userid,
            getusersigid: s.getusersigid,
            onFinish(imgData) {
                s.state.type = 1;
                //console.log(s.state.type,'图片');
                var imgDatasrc = imgData.src;
                if (s.state.fileList.length < 5) {
                    s.copyfileto({
                        userid: s.userid,
                        getusersigid: s.getusersigid,
                        fileurl: imgDatasrc,
                        isover: 0,
                        dirname: 'wx_xcx',
                        success(fileurl) {
                            s.state.fileList.push(fileurl);
                            console.log(fileurl, '新图片');
                            s.forceUpdate();
                        }
                    })

                } else {
                    message.warning('最多只能添加5张图片');
                }

                s.state.imageslist = s.state.fileList.join();

                s.state.selectvideo = 'none';
                s.forceUpdate();

                
            },
            onCancel() {
                
            },
            title,
            selectedIndex: 100,
             
        }
        var editProps = {
            userid: s.userid,
            getusersigid: s.getusersigid,
            onFinish(imgData) {
                s.state.type = 1;
                var imgDatasrc = imgData.src;
                if (s.state.fileImgList.length < 5) {
                    s.copyfileto({
                        userid: s.userid,
                        getusersigid: s.getusersigid,
                        fileurl: imgDatasrc,
                        isover: 0,
                        dirname: 'wx_xcx',
                        success(fileurl) {
                            s.state.fileImgList.push(fileurl);
                            console.log(fileurl, '新图片',s.state.fileImgList);

                            s.state.editImgStr = s.state.fileImgList.join(',');
                            console.log(s.state.fileImgList.join(','),'拼接图片地址');
                            s.forceUpdate();
                        }
                    })

                } else {
                    message.warning('最多只能添加5张图片');
                }                
                
                s.forceUpdate();
            },
            onCancel() {
                
            },
            title,
            selectedIndex: 100,
             
        }

        var videoProps = {
            userid: s.userid,
            getusersigid: s.getusersigid,
            onFinish(imgData) {
                var imgDatasrc=imgData.src;
                s.copyfileto({
                    userid:s.userid,
                    getusersigid:s.getusersigid,
                    fileurl:imgDatasrc,
                    isover:0,
                    dirname:'wx_xcx',
                    success(fileurl){
                        s.state.editVideoUrl=fileurl;
                        console.log(fileurl,'新video');
                        s.state.type=2;
                        s.forceUpdate();
                    }
                })               
                
                s.forceUpdate();
            },
            onCancel() {
                
            },
            title,
            selectedIndex: 100,
             
        }

        var plainOptions = [{
            label: '全部',
            value: 'all'
        }, {
            label: '审核通过',
            value: 'checked-pass'
        }, {
            label: '审核不通过',
            value: 'checked-unpass'
        }, {
            label: '推荐',
            value: 'recommend-recommend'
        }, {
            label: '未推荐',
            value: 'recommend-unrecommend'
        }];
        var props = {
            title,
            selectedIndex: 1,
            mainRight: <div className='wenming-datacheck-main-ui' style={{height:this.state.mainHeight}}>
                        <header className='wenming-datacheck-header'>
                            <div>数据审核-{title}</div>   
                            <div  ref='switch' ><Switch onChange={this.getCheckedData.bind(this)} checkedChildren="已审" unCheckedChildren="未审" /></div>
                        <div><a href='#/wmeyeadd'><Icon type="upload" />上报数据</a></div>   
                            
                        </header>
                        <section className='wenming-datacheck-bar'>
                            <div>
                                <Checkbox onChange={this.selectAll.bind(this)} checked={this.state.selectAll}>全选</Checkbox>
                                
                               {showBatchbars && <Popconfirm onConfirm={this.batchDelete.bind(this)} placement="top" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                                   <div className='wenming-del'><Icon type='delete'/>批量删除</div>
                                                               </Popconfirm>}
                                {showBatchbars && this.state.status === 0 && false && <div onClick={this.batchChecked.bind(this,'pass')} className='wenming-datacheck-batchcheck'><Icon type="check-circle" />批量审核通过</div>}
                                {showBatchbars && this.state.status === 0 && false && <div onClick={this.batchChecked.bind(this,'unpass')} className='wenming-datacheck-unpass'><Icon type="close-circle" />拒绝通过审核</div>}
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
                                    <Select style={{width:120}} value={this.state.defaultProvince} onChange={this.searchByProvince.bind(this)}>
                                        {
                                        this.state.provinceRankingList.map((p,i)=>{
                                            return <Option key={i} value={p.provicecode}>{p.provicename}</Option>
                                        })
                                        }
                                    </Select>
                                </div>
                            }
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
                                {this.state.dataSource.length<=0 && <li style={{textAlign:'center'}}>
                                    <span style={{position:'relative',left:'50%',marginLeft:-26}}>暂无数据</span>
                                </li>}
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


                                    var sentiment = {
                                        
                                    };
                                    if(item.sentiment*1 === 0){
                                        sentiment = {
                                            type:'frown',
                                            name:'消极的'
                                        };
                                    }
                                    else if(item.sentiment*1 === 1){
                                        sentiment = {
                                            type:'meh',
                                            name:'中性的'
                                        }
                                    }else if(item.sentiment*1 === 2){
                                        sentiment = {
                                            type:'smile',
                                            name:'积极的'
                                        }
                                    }

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
                                                <h2>{item.nickname} <span style={{ fontSize: '12px', fontWeight: 'normal' }}>({item.mobile} &nbsp;&nbsp;&nbsp; {item.provicename})</span></h2>
                                                <div className='wenming-datacheck-date'>{item.date}</div>
                                                <h2>{item.title}</h2>
                                                <div className='wenming-datacheck-content'>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(item.content)}></div>
                                                    {showMore}
                                                </div>
                                                <ol>
                                                    {item.imgs.map((img,k)=>{
                                                        return <li onClick={this.viewPic.bind(this,i,k)} key={k} style={{cursor:'url(./static/images/big.cur),auto',background:'url('+(item.imgs.imgList[k].loaded?img:'./static/images/default-loading.jpg')+') no-repeat center center / cover'}}>
                                                            <img onLoad={()=>{item.imgs.imgList[k].loaded=  true ;this.forceUpdate()}} src={img} style={{opacity:0,width:100,height:100}}/>
                                                        </li>
                                                    })}
                                                    {item.voidurl  && <li onClick={this.viewVideo.bind(this,item.voidurl )}><Icon type="play-circle-o" /></li>}
                                                </ol>
                                                <section className='wenming-datacheck-operator'>
                                                    <div>
                                                        {item.status * 1 === 1 && (item.replyimg || item.replycompanyname || item.replycontent) && <div onClick={this.reply.bind(this, item, 'pass', i)}>
                                                            <Icon className='wenming-edit' type="edit" />编辑回复
                                                        </div>}


                                                        {item.status * 1 === 1 && (item.replyimg || item.adminreplycompanyname || item.adminreplycontent || item.replycompanyname || item.replycontent) && <div>
                                                            <Popconfirm placement="top" title={'撤销后些文章将为成未审核状态，确定要撤销吗'} onConfirm={this.delPeplyitem.bind(this, item)} okText="确定" cancelText="取消">
                                                                <Icon className='wenming-edit' type="delete" />撤销审核 
                                                            </Popconfirm>
                                                        </div>}
                                                        {item.status === 1 && <div><a href={'#/wmeyecommentdetail/'+item.id}><Icon type="message" /> 查看评论 ({item.comments}条)</a></div>}
                                                        {this.state.status === 0 &&  <div><Checkbox checked={item.recommend} onChange={()=>{item.recommend = !item.recommend;this.forceUpdate();}}>推荐到首页</Checkbox></div>}
                                                        {this.state.status === 1 && item.status !== 2 && <div><Checkbox onChange={this.recommentArticle.bind(this, item)} checked={item.isHost} >推荐到首页</Checkbox></div>}
                                                        {item.status * 1 === 0 && (!item.adminreplycompanyname && !item.adminreplycontent) && <div onClick={this.quickReply.bind(this, item, 'pass', i)}>
                                                            <Icon className='wenming-pass' type="check-circle" />快捷回复
                                                        </div>}
                                                        {item.status*1 === 0 && (!item.replyimg && !item.replycompanyname && !item.replycontent)&& <div onClick={this.reply.bind(this,item,'pass',i)}>
                                                           <Icon className='wenming-pass' type="check-circle" />回复
                                                        </div>}

                                                        {item.status * 1 === 0 && (item.replyimg || item.replycompanyname || item.replycontent) && <div onClick={this.reply.bind(this, item, 'pass', i)}>
                                                            <Icon className='wenming-edit' type="edit" />编辑回复
                                                        </div>}


                                                        {item.status * 1 === 0 && (item.replyimg || item.adminreplycompanyname || item.adminreplycontent || item.replycompanyname || item.replycontent) && <div>
                                                            <Popconfirm placement="top" title={'确定要撤销吗'} onConfirm={this.delPeplyitem.bind(this, item)} okText="确定" cancelText="取消">
                                                                <Icon className='wenming-edit' type="delete" />撤销回复 
                                                            </Popconfirm>
                                                        </div>}
                                                        
                                                        {item.status*1 === 0 && <div onClick={this.checkedArticle.bind(this,item,'unpass',i)}>
                                                            <Icon className='wenming-unpass' type="close-circle" /> 拒绝通过审核
                                                        </div>}

                                                        <div onClick={this.editBtn.bind(this,item,'pass',i)}><Icon className='wenming-edit' type="edit" /> 编辑内容</div>
                                                    </div>
                                                </section>
                                            </section>
                                        </aside>
                                        <aside>
                                            {item.sentiment && <div className='wenming-sentiment' title={sentiment.name}><img src={'./static/images/'+sentiment.type+'.png'}/></div>}
                                            <Popconfirm onConfirm={this.delete.bind(this,i,item.id)} placement="leftTop" title="删除后数据将无法恢复，确定要删除吗？" okText="确定" cancelText="取消">
                                                  <div className='wenming-datacheck-delete'><Icon type='delete'/> 删除</div>
                                            </Popconfirm>
                                            
                                        </aside>
                                    </li>;
                                })}
                                <li style={{height:40,  background: 'transparent',border:'none'}}></li>
                            </ul>
                        </section>
                        <section className='wenming-pagination' style={{height:40}}>
                            <Pagination showQuickJumper current={this.state.pageIndex} pageSize={this.state.pageSize} total={this.state.allCount} onChange={this.loadMoreArticle.bind(this)} />
                        </section>
                        {this.state.currentViewPic && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                            <div onContextMenu={this.download.bind(this)}>
                                <img  onMouseDown={this.hideImg.bind(this)} className={this.state.showImg?'show':''} style={{maxHeight:this.state.mainHeight-100,maxWidth:this.viewW-window.mainLeftSize}}  src={this.state.currentViewPic} />
                                <section onClick={this.viewPrev.bind(this)} style={{cursor:'url(./static/images/pic_prev.cur),auto'}}></section>
                                <section onClick={()=>{this.setState({currentViewPic:''})}} style={{cursor:'url(./static/images/small.cur),auto'}}></section>
                                <section onClick={this.viewNext.bind(this)} style={{cursor:'url(./static/images/pic_next.cur),auto'}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({currentViewPic:''})}}></aside>
                        </div>}

                        {this.state.voidurl  && <div className='wenming-mask'>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                            <div>
                                <video autoPlay width={(this.viewW-window.mainLeftSize)/2} height={this.state.mainHeight/2} controls src={this.state.voidurl}></video>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                                <section>
                                </section>
                                <section onClick={()=>{this.setState({voidurl:''})}}></section>
                            </div>
                            <aside onClick={()=>{this.setState({voidurl:''})}}></aside>
                        </div>}
                        
                <Modal title="我的回复" 
                    width={830}
                    wrapClassName='wm-reply-modal-ui'
                    maskClosable={false} visible={this.state.replyObj.id!==-1}
                    onCancel={this.closedialog.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.replyAction.bind(this,1)}>
                            保存
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.replyAction.bind(this,2)} >
                            保存并发布
                        </Button>
                    ]}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                        >
                            <div dangerouslySetInnerHTML={this.createMarkup(this.state.replyObj.content)}></div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="回复单位"
                        >
                            <Input placeholder='' value={this.state.replyObj.replycompanyname} onChange={e => { this.state.replyObj.replycompanyname = e.target.value;this.forceUpdate() }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="回复内容"
                        >
                            <textarea className='wm-reply-content' value={this.state.replyObj.replycontent} onChange={e => { this.state.replyObj.replycontent = e.target.value ;this.forceUpdate() }}></textarea>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="附加图片"
                        >
                            <Button onClick={this.addImage.bind(this)}>选择图片</Button>
                            <div className='wenming-add-imgs5' >
                                <ul>
                                    {this.state.fileList.map((item, i) => {
                                        return <li key={i}><img src={item} />
                                            <div className='wenming-reportadd-delimgs'>
                                                <Button shape="circle" icon="delete" onClick={this.delpic.bind(this, i)} />
                                            </div>
                                        </li>
                                    })}
                                </ul>
                                <div className='clearfix'></div>
                            </div>
                        </FormItem>

                    </Form>
                    </Modal>
                    <Modal title="编辑" 
                    width={830}
                    wrapClassName='wm-edit-modal-ui'
                    maskClosable={false} visible={this.state.editObj.id!==-1}
                    onCancel={this.closeEditdialog.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.editAction.bind(this,1)}>
                            保存
                        </Button>
                    ]}
                    >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                        >
                            <Input placeholder='' value={this.state.editObj.username} onChange={e => { this.state.editObj.username = e.target.value;this.forceUpdate() }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                        >
                            <Input placeholder='' value={this.state.editObj.title} onChange={e => { this.state.editObj.title = e.target.value;this.forceUpdate() }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容"
                        >
                            <textarea className='wm-edit-content' value={this.state.editContent} onChange={e => { this.state.editContent = e.target.value ;this.forceUpdate() }}></textarea>
                        </FormItem>
                        {!this.state.editVideoUrl &&
                        <FormItem
                            {...formItemLayout}
                            label="图片"
                        >
                            
                            <div className='editUploaderBtn' style={{clear:'both'}}>
                                <Button onClick={this.editImage.bind(this)}>选择图片</Button>
                            </div>
                            <div className='wenming-edit-imgs5' >
                                <ul>
                                    {
                                        this.state.fileImgList.map((item, i) => {
                                        return <li key={i}><img src={item} />
                                            <div className='wenming-reportedit-delimgs'>
                                                <span onClick={this.downloadIamge.bind(this,item)}><Icon type="download" style={{ fontSize: 16, color: '#333' }} />下载</span>
                                                <span onClick={this.editRemovepic.bind(this, i)} ><Icon type="delete" style={{ fontSize: 16, color: '#333' }} />删除</span>
                                            </div>
                                        </li>
                                        })
                                    }
                                </ul>
                                <div className='clearfix'></div>
                            </div>
                        </FormItem>
                        }
                        {this.state.editVideoUrl &&
                            <FormItem
                                {...formItemLayout}
                                label="视频"                            
                            >                            
                                <div className='editUploaderBtn' style={{clear:'both'}}>
                                    <Button onClick={this.editVideo.bind(this)}>选择视频</Button>
                                </div>
                                <div className='wenming-edit-imgs5' >                                
                                    <Input addonBefore='视频URL' value={this.state.editVideoUrl}
                                            onChange={e => {this.state.editVideoUrl = e.target.value ; this.forceUpdate()}}
                                            type='text' placeholder='http://www.'/>
                                    <div className='clearfix'></div>
                                </div>
                            </FormItem>
                        }
                    </Form>
                        
                    </Modal>
                
                
            </div>
        }
        var mainComponent = <div>
        	{!this.state.isEditImage && this.state.isEditVideo && this.state.isReplyImage && <ZmitiUploadDialog id="editImage" {...editProps}></ZmitiUploadDialog>}
        	{!this.state.isReplyImage && this.state.isEditVideo && this.state.isEditImage && <ZmitiUploadDialog id="addReplyImage" {...replyProps}></ZmitiUploadDialog>}
            {!this.state.isEditVideo && this.state.isReplyImage && this.state.isEditImage && <ZmitiUploadDialog id="editVideo" {...videoProps}></ZmitiUploadDialog>}
            <ZmitiWenmingAsideBarApp {...props}></ZmitiWenmingAsideBarApp>            
        </div>;
        return (
            <MainUI component={mainComponent}></MainUI>
        );
    }
    delPeplyitem(item){
        
        
        this.operatorReply(3,item);

    }

    searchByProvince(provicecode){
 
        window.location.hash ='#/wmeyedatacheck/';
        this.setState({
            defaultProvince:provicecode
        });
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/get_articlelistbyprovice/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                provicecode
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                 this.state.dataSource = [];
                     
                    data.list.map((item, i) => {
                        var imgs = item.imageslist.split(',');
                        imgs.imgList = [];
                        imgs.map((item, i) => {
                            imgs.imgList[i] = {}
                            imgs.imgList[i].loaded = false;
                        });
                        if (!imgs[0]) {
                            imgs.shift();
                        }
                        this.state.dataSource.push({
                            nickname: item.nickname,
                            headimgurl: item.headimgurl,
                            date: item.looktime,
                            content: item.content,
                            adminreplycompanyname: item.adminreplycompanyname,
                            adminreplyimg:item.adminreplyimg,
                            adminreplycontent:item.adminreplycontent,
                            replytime:item.replytime,
                            replycompanyname: item.replycompanyname,
                            replyimg:item.replyimg,
                            replycontent:item.replycontent,                            
                            replytime2:item.replytime2,
                            defaultContent: item.content,
                            comments: item.commentnum,
                            username:item.username,
                            imgs,
                            sentiment: item.sentiment,
                            mobile: item.mobile,
                            provicename: item.provicename,
                            voidurl: item.voidurl,
                            isHost: item.ishost,
                            title: item.title,
                            status: item.status,
                            ///videos:[],
                            id: item.articlid,
                        });
                    });
                    this.state.loadByKeyWords = false;
                    var rows = typeof data.countRow === 'nnumber' ? data.countRow : data.countRow.countrows
                    this.state.allCount = data.countRow.countrows


                    this.forceUpdate(() => {
                        this.scroll.refresh();
                    });

            }
        })
    }
    quickReply(item) {//快捷回复
        var obj = {
            id:item.id,
            adminreplycompanyname:'中国文明网',
            adminreplycontent:'您提供的线索已收到，请继续关注！'

        };
        this.operatorReply(2, obj);
    }

    operatorReply(savetype,obj){
        var s = this;
        var item =  obj || this.state.replyObj;
        console.log(item,'点击了回复');
        //console.log(this.state.replyObj,'获取了回复的内容');
        var params={
            appid: WMEYEAPPID,
            userid: this.userid,
            getusersigid: this.getusersigid,
            articleids: item.id,
            savetype:savetype,
            replyimg: s.state.fileList.join(','),
            adminreplycompanyname:item.adminreplycompanyname,
            adminreplycontent:item.adminreplycontent,
            replycompanyname: item.replycompanyname,
            replycontent: item.replycontent
        }
        console.log(params,'params','回复成功');
        /*提交成功后*/
        this.state.replyObj = {
            id: -1
        };
        this.forceUpdate();
        /*$.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/reply_articles/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articleids: item.id,
                savetype,
                adminreplycompanyname: item.replyCompany,
                adminreplycontent: item.replyContent,
                replyimg: s.state.fileList.join(',')
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {

                this.forceUpdate();
                message.success(data.getmsg);
                this.loadArticle(this.state.status);
                this.state.replyObj = {
                    id: -1
                };
                this.forceUpdate();

            }
        })*/
    }

    


    replyAction(savetype){
        this.operatorReply(savetype);
    }



    addImage(){
        var obserable = window.obserable;
        this.setState({
            isEditImage:true,
          	isEditVideo:true,
          	isReplyImage:false
        }, () => {
            obserable.trigger({
                type: 'showModal',
                data: { type: 0, id: 'addReplyImage' }
            })
        })
    }

    delpic(i) {
        var s = this;
        //console.log(i,'del');
        s.state.fileList.splice(i, 1);
        if (s.state.fileList.length < 1) {
            s.state.type = 3;
        }
        console.log(s.state.type, '恢复默认');
        s.forceUpdate();
    }

    hideImg(e) {
        this.setState({
            showImg: false
        })
    }
    
    closedialog(){
        var s = this;
        s.setState({
            replyObj:{
                id:-1
            }           
        })
        //s.forceUpdate(); 
    }

    download() {
        this.setState({
            showImg: true
        })
    }

    loadArticleByKeywords() {
        this.setState({
            loadByKeyWords: true
        }, () => {
            this.loadArticle(this.state.status);
        })

    }


    loadArticleByClass(e) {
        var arr = e.target.value.split('-');


        this.setState({
            tab: e.target.value
        }, () => {
            if (e.target.value === 'all') {
                this.setState({
                    currentWhere: {}
                }, () => {
                    this.loadArticle(this.state.status);
                })

                return;
            }

            var type = '',
                value = '';
            switch (arr[0]) {
                case "checked":
                    type = 'status';
                    value = arr[1] === 'pass' ? 1 : 2
                    break;
                case "recommend":
                    type = 'ishot';
                    value = arr[1] === 'recommend' ? 1 : 0
                    break;
            }

            this.setState({
                currentWhere: {
                    type,
                    value
                }
            }, () => {
                this.loadArticle(this.state.status, undefined, {
                    type,
                    value
                })
            })


        });



    }


    createMarkup(item) {
        return {
            __html: item
        };
    }



    getCheckedData(index) {
        var id = this.props.params.id;
        window.location.hash = '#/wmeyedatacheck/';
        if(!index){
            this.setState({
                pageIndex: 1,
                status:index,
                defaultProvince:''
            }, () => {
                this.loadArticle(index * 1);
            })
        }else{
            if(id){
                
                var type = id.split('_')[1];
                
                switch (type) {
                    case 'city':
                        this.setState({
                            pageIndex: 1,
                            status:1,
                            
                            defaultProvince:id.split('_')[0]
                        }, () => {
                            this.searchByProvince(id.split('_')[0]);
                        })
                        
                        break;
                    case 'openid':
                        this.setState({
                            pageIndex: 1,
                            status:1,
                            openid: id.split('_')[0]
                        }, () => {
                            this.loadArticle(index * 1);
                        })

                    break;
                }
            }
            else{
                this.setState({
                    pageIndex: 1,
                    status:index
                }, () => {
                    this.loadArticle(index * 1);
                })
            }
        }

        
    }

    recommentArticle(item) {
        //item.isHost = true;
        var ishot = 1;
        if (item.isHost) { //取消推荐
            ishot = 0;
        } else { //推荐.

        }

        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/hot_articles/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articleids: item.id,
                ishot
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                item.isHost = !item.isHost;
                this.forceUpdate();
                message.success(ishot ? "推荐成功" : '取消推荐成功');
            }
        })
    }

    loadArticleByType(id, name) {


        this.setState({
            classid: id,
            classname: name
        }, () => {
            this.loadArticle(this.state.status);
        })
    }

    viewNext() {
        this.setState({
            currentPicIndex: this.state.currentPicIndex + 1,
            currentViewPic: this.state.dataSource[this.currentRow].imgs[this.state.currentPicIndex + 1]
        })
    }

    viewPrev() {
        this.setState({
            currentPicIndex: this.state.currentPicIndex - 1,
            currentViewPic: this.state.dataSource[this.currentRow].imgs[this.state.currentPicIndex - 1]
        })
    }

    viewVideo(voidurl) {
        this.setState({
            voidurl
        });
    }


    viewPic(i, k) {
        this.currentRow = i;
        this.setState({
            currentPicIndex: k,
            currentViewPic: this.state.dataSource[i].imgs[k]
        })
    }


    batchDelete() {
        var arr = [];

        this.state.dataSource.map((item, i) => {
            if (item.checked) {
                arr.push(item.id);

            }
        });

        if (arr.length <= 0) {
            message.error('请选择您要删除的文章~~');
            return;
        }
        this.delete(-1, arr.join(','));


    }

    delete(index, articleids) {

        //


        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/del_articles/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articleids: articleids
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                this.loadArticle(this.state.status);
                message.success('删除成功');

                /*if(index>-1){

                   

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
                   
                }*/
            }
        })


    }

    batchChecked(type) {

        var status = 1;
        switch (type) {
            case 'pass':
                break;
            case 'unpass':
                status = 2;
                break;
        }

        var arr = [];

        this.state.dataSource.map((item, i) => {
            if (item.checked) {
                arr.push(item.id);
                this.checkedArticle(item, type, i, false);

            }
        });

        if (arr.length <= 0) {
            message.error('请选择您要审核的文章~~');
            return;
        }

    }


    
    reply(item,type,index){
        this.state.replyObj = item;
        this.state.replyObj.replycontent = item.replycontent || '';
        this.state.replyObj.replycompanyname = item.replycompanyname || '';
        this.state.fileList = item.adminreplyimg.split(',');
        if (this.state.fileList[0] === ''){
            this.state.fileList = [];
        }
        console.log(item,'地方回复');
        this.forceUpdate();
    }

    checkedArticle(item, type, index, showMsg = true) {

        var status = 1;
        switch (type) {
            case "pass": //审核通过 
                if (item.recommend) { //是推荐
                    $.ajax({
                        async: false,
                        type: 'post',
                        url:baseUrl + WMURLS+'/hot_articles/',
                        data: {
                            appid: WMEYEAPPID,
                            userid: this.userid,
                            getusersigid: this.getusersigid,
                            articleids: item.id,
                            ishot: 1
                        }
                    }).done((data) => {
                        if (typeof data === 'string') {
                            data = JSON.parse(data);
                        }
                        if (data.getret === 0) {
                            message.success('推荐成功');
                        }
                    })
                }

                break;
            case 'unpass': //审核不通过 
                status = 2;
                break;
        }

        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/look_articles//',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articleids: item.id,
                status
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {

                showMsg && message.success('审核成功');

                this.loadArticle(this.state.status);

            }
        })



    }

    selectAll() {
        this.state.dataSource.forEach((item, i) => {
            item.checked = !this.state.selectAll;
        })
        this.setState({
            selectAll: !this.state.selectAll
        });

    }

    loadMoreArticle(e) { //分页
        this.setState({
            pageIndex: e
        }, () => {
            this.loadArticle(this.state.status, e);
        })
    }
    
    getProvinceList(){
        var s = this;
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/get_articleprovince/',
            data: {
                appid: WMEYEAPPID,
                monthnum: 3,
                userid: this.userid,
                getusersigid: this.getusersigid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                this.provinceRankingList = data.list.concat([]);
                this.setState({
                    provinceRankingList: data.list
                });

            }
        });
    }

    loadArticle(index, e) {

        var state = {
            status: index
        }
        if (!e) {
            state.pageIndex = 1;
        }
        this.setState(state, () => {
            var data = {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,

                page: this.state.pageIndex,
                pagenum: this.state.pageSize
            }
            if (this.state.currentWhere.type) {

                data[this.state.currentWhere.type] = this.state.currentWhere.value;
                if (this.state.currentWhere.type !== 'status') {
                    data.status = 1;
                }

            } else {
                data.status = index === 1 ? '1,2' : 0
            }

            if (this.state.keywords && this.state.loadByKeyWords) {
                data.keyword = this.state.keywords;
            }
            
            if(this.state.openid){
                data.wxopenid = this.state.openid;
            }


            if (this.state.classid) {
                data.classid = this.state.classid;
            }

            $.ajax({
                type: 'post',
                url:baseUrl + WMURLS+'/search_articlelist/',
                //url:'http://192.168.1.116/wmy/system2.json',
                data
            }).done((data) => {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                if (data.getret === 0) {
                    this.state.dataSource = [];
                    data.list.map((item, i) => {
                        var imgs = item.imageslist.split(',');
                        imgs.imgList = [];
                        imgs.map((item, i) => {
                            imgs.imgList[i] = {}
                            imgs.imgList[i].loaded = false;
                        });
                        if (!imgs[0]) {
                            imgs.shift();
                        }
                        this.state.dataSource.push({
                            nickname: item.nickname,
                            headimgurl: item.headimgurl,
                            date: item.looktime,
                            content: item.content,
                            adminreplycompanyname: item.adminreplycompanyname,
                            adminreplyimg:item.adminreplyimg,
                            adminreplycontent:item.adminreplycontent,
                            replycompanyname: item.replycompanyname,
                            replyimg:item.replyimg,
                            replycontent:item.replycontent,
                            defaultContent: item.content,
                            comments: item.commentnum,
                            username:item.username,                            
                            replytime:item.replytime,
                            replytime2:item.replytime2,
                            imgs,
                            sentiment: item.sentiment,
                            mobile: item.mobile,
                            provicename: item.provicename,
                            voidurl: item.voidurl,
                            isHost: item.ishost,
                            title: item.title,
                            status: item.status,
                            ///videos:[],
                            id: item.articlid,
                        });
                    });
                    this.state.loadByKeyWords = false;
                    var rows = typeof data.countRow === 'nnumber' ? data.countRow : data.countRow.countrows
                    this.state.allCount = data.countRow.countrows


                    this.forceUpdate(() => {
                        this.scroll.refresh();
                    });
                }
            }, () => {

            })
        });



    }

    closeEditdialog(){
        var s = this;
        s.setState({
            editObj:{
                id:-1
            }           
        })
    }

    editBtn(item,type,index){
    	var s = this;
        this.state.editObj = item;
        var content=this.state.editObj.content;
        var defaultContent=this.state.editObj.defaultContent;
        //console.log(this.state.editObj,'this.state.editOb')
        this.state.editContent=this.state.editObj.defaultContent.replace(new RegExp("<br/>", "gm"), "\r\n");
        this.state.editIndex=index;
        s.state.fileImgList=[];//清空编辑图片
        console.log('当前内容',item);
        var curItems=item.imgs.join(',');
        this.state.editImgStr=item.imgs.join(',');
        //console.log(this.state.editImgStr,'join');
        var curItemsArr=new Array();        
        if(curItems!=""){
            curItemsArr=curItems.split(',');
            curItemsArr.map(function(elem,index) {
            	s.state.fileImgList.push(elem);
            })            
            //console.log(this.state.fileImgList,'fileImgList')
        }
        this.state.editVideoUrl=item.voidurl;
        this.forceUpdate();
    }

    editAction(){
        var s = this;
        var item = this.state.editObj;
        var classid=this.state.typeList[0].classid;
        /*给内容加<br>换行*/
        var content=this.state.editContent;
        content=content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
        //console.log(content,'new-content');
        var editIndex=this.state.editIndex;
        var status=this.state.status;//当前状态
        var pageIndex=this.state.pageIndex;//当前页
        var editImgStr=this.state.editImgStr;
        var editVideoUrl=this.state.editVideoUrl;
        $.ajax({
            type: 'post',
            url: baseUrl + WMURLS + '/edit_articles/',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid,
                articlid: item.id,
                username:item.username,
                title: item.title,
                content: content,
                imageslist:editImgStr,
                voidurl:editVideoUrl,
                classid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {
                message.success(data.getmsg);
                this.state.editObj = {
                    id: -1
                };
                s.state.fileImgList=[];//清空编辑图片
                this.loadArticle(status,pageIndex);//加载当前页
                this.forceUpdate();

            }
        })
    }
    //编辑图片
    editImage(){
        var obserable=window.obserable;
        this.setState({
          isEditImage:false,
          isEditVideo:true,
          isReplyImage:true
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:0,id:'editImage'}
          })  
        })        
    }
    editRemovepic(i) {
        var s = this;
        s.state.fileImgList.splice(i, 1);
        if (s.state.fileImgList.length < 1) {
            s.state.type = 3;
        }
        console.log(s.state.type, '恢复默认');
        s.state.editImgStr=s.state.fileImgList.join(',');
        s.forceUpdate();
    }
    downloadIamge (imgsrc) {
      let image = new Image();
      let obj=imgsrc.lastIndexOf("/");
      let name=imgsrc.substr(obj+1);//图片名称
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous")
      image.onload = function() {
        let canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL("image/png") //得到图片的base64编码数据
        let a = document.createElement("a") // 生成一个a元素
        let event = new MouseEvent("click") // 创建一个单击事件
        a.download = name || "photo" // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    }
    //更换视频
    editVideo(){
        console.log('editVideo');
        var obserable=window.obserable;
        this.setState({
          isEditVideo:false,
          isEditImage:true,
          isReplyImage:true
        },()=>{
          obserable.trigger({
              type:'showModal',
              data:{type:2,id:'editVideo'}
          })  
        })
    }
    request() {

        this.loadArticle(0);


        $.ajax({
            type: 'post',
            url:baseUrl + WMURLS+'/search_articleclass',
            data: {
                appid: WMEYEAPPID,
                userid: this.userid,
                getusersigid: this.getusersigid
            }
        }).done((data) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.getret === 0) {


                this.setState({
                    typeList: data.list
                })
            }
        })

    }


    formatNumber(s, n = 3) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
    }



}

export default ZmitiValidateUser(ZmitiWenmingDataCheckApp);