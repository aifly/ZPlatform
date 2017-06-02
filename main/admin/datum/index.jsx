import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import { message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
import $ from 'jquery';
class ZmitiDatumApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current:0,
            selectedIndex:0,
            mainHeight:document.documentElement.clientHeight - 50,
            dialogHeight:document.documentElement.clientHeight,
            modpostDialogVisible:false,
            categoryname:'',
            categorydata:[],
            tags:[],
            title:'',
            author:'',
            kindid:'五言绝句',
            originaltext:'',
            changetext:'',
            datatype:0,
            voiceurl:'',
            dataList:[],
            dataSource:[],//分类数据
            workdatatype:'',//分类id
            workdataid:'',
            keyword:'',
            disabled:false,
            editable: false,
            value: this.props.value,
            inputVisible: false,
            inputValue: '',
            typeid:'',//'当前分类id'
        };
        this.showInput = () => {
          this.setState({ inputVisible: true }, () => this.input.focus());
        }
        this.editInputRef = input => this.input = input;
        this.saveInputRef = input => this.input = input;
    }
    handleInputChange(e){
        this.setState({ inputValue: e.target.value });
    }
    editInput(e){
        var s=this;
        const value = e.target.value;
        const alt = e.target.alt;
        const state = this.state;
        let tags = state.tags;
        s.setState({ 
            value
        });
        s.setState({ tags });
        s.forceUpdate();
        //console.log(alt,"editInput",tags)
    }
    render() {
        const columnList = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            width:120,

        },{
            title: '资料类型',
            dataIndex: 'datatype',
            key: 'datatype',
            width:100,
            render:(value,record,index)=>{
                /*switch(value){
                        case 0:
                            return "唐诗";
                            break;
                        case 1:
                            return "宋词";
                            break;
                        case 2:
                            return "童谣";
                            break;
                }*/
                return this.state.tags[this.state.selectedIndex]
            }

        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width:150,
        },  {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:150,
            render:(text,recoder,index)=>(

                <span>
                  <a href={'#/editorinfo/'+recoder.workdataid}> 修改</a>
                  <a href="javascript:void(0);" onClick={this.delData.bind(this,recoder.workdataid)}> 删除</a>
                </span>              
            )

        }]
        const formItemLayout = {
           labelCol: {span: 4},
           wrapperCol: {span: 16},
        };
        const { tags, inputVisible, inputValue } = this.state;
        const { value, editable } = this.state;
        var title = this.props.params.title || '资料库';
        let props={
            userid:this.userid,
            changeAccount:this.changeAccount.bind(this),
            tags:this.state.tags,
            mainHeight:this.state.mainHeight,
            title:title,
            type:'workorder-1',
            selectedIndex:this.state.selectedIndex,
            rightType:"custom",
            customRightComponent:<div className='inforlist-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-inforlist-header">
                        <Row>
                            <Col span={8} className="zmiti-inforlist-header-inner">诗词资料</Col>
                            <Col span={8} offset={8} className='zmiti-inforlist-button-right'><Button icon="file-add" onClick={this.postform.bind(this)}>添加资料</Button><Button icon="folder-add" onClick={this.dialogform.bind(this)}>分类管理</Button></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-inforlist-line"></div>
                    <Row gutter={10} type='flex' className='inforlist-search '>
                        <Col className="inforlist-heigth45">标题：</Col>
                        <Col className="inforlist-heigth45"><Input value={this.state.keyword} placeholder="名称" onChange={(e)=>{this.state.keyword=e.target.value;this.forceUpdate();}} /></Col>
                        <Col className="inforlist-heigth45"><Button onClick={this.searchBybutton.bind(this)}>查询</Button></Col>
                    </Row>

                  <Table bordered={true} 
                          dataSource={this.state.dataList} 
                          columns={columnList} />

                </div>
                <Modal title="诗词分类" visible={this.state.modpostDialogVisible}
                    onOk={this.addProduct.bind(this)}
                    onCancel={()=>{this.setState({modpostDialogVisible:false})}}
                >
                  <div className="inforListModal">
                    {tags.map((tag, index) => {
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                        <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                         <Input type="text" 
                          ref={this.editInputRef}
                          className="inforlistCategoryIpt" 
                          defaultValue= {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          onChange={this.editInput.bind(this)}
                          onBlur={this.saveinput.bind(this)}
                          
                          alt={index}
                         />
                        </Tag>
                      );
                      return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text" size="small"
                        style={{ width: 110 }}
                        value={inputValue}
                        onChange={this.handleInputChange.bind(this)}
                        onBlur={this.handleInputConfirm.bind(this)}
                        onPressEnter={this.handleInputConfirm.bind(this)}
                      />
                    )}
                    {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加分类</Button>}
                  </div>
                </Modal>
                
            </div>
        }


        var mainComponent = <div>
          <ZmitiUserList {...props}></ZmitiUserList>
        </div>;
        return (
          <MainUI component={mainComponent}></MainUI>
        );
    }

    componentWillMount() {

        let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;

        validateUser(()=>{loginOut(undefined,undefined,false);},this);

    }
    componentDidMount() {
		/*  var {userid,getusersigid} = this.props.params;
		 this.getusersigid = this.getusersigid = getusersigid;
		 this.userid =userid;
		 this.baseUrl = window.baseUrl;*/

        let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
        resizeMainHeight(this,'setAdminHeight');

        this.bindNewdata();
        this.getcategory();
    }
    //显示列表
    bindNewdata(){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        var selectedIndex=s.state.selectedIndex;
        var dataSource=s.state.dataSource;
        var id=this.props.params.id;
        $.each(dataSource,function(n,category){
          if(n==selectedIndex){
            s.state.typeid=category.workdatatype;
            console.log(category.workdatatype,category.typename);
          }          
        })
        
        $.ajax({
            url:window.baseUrl+'document/get_documentlist',//接口地址
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                datatype:s.state.typeid,             
                type:1,
                searchword:'',
            },
            success(data){
                if(data.getret === 0){                    
                    s.state.dataList = data.list;
                    //console.log(s.state.dataList,"信息列表");                    
                }else if(data.getret === 1002){
                  s.state.dataList=[];                  
                }
                console.log(this.url,"this.url");
                s.forceUpdate();
            }
        })
    }


    //search
    searchBybutton(){
          var selectedIndex = this.state.selectedIndex;
          var keyWord=this.state.keyword;
          var s = this;
          $.ajax({
             url:window.baseUrl+'document/get_documentlist',
              data:{
                  userid:s.userid,
                  getusersigid:s.getusersigid,
                  datatype:selectedIndex,
                  type:1,
                  searchword:keyWord,                  
              },
              success(data){
                  if(data.getret === 0){
                      s.state.dataList = data.list;                      
                  }else if(data.getret === 1002){
                      s.state.dataList=[];
                  }else if(data.getret === -3){
                      message.error('您没有访问的权限,2秒后跳转到首页');
                      setTimeout(()=>{
                          location.href='/';
                      },2000)
                  }
                  else{
                      message.error(data);                      
                  }
                  s.forceUpdate();
              }
          })

    }

    //add
    postform(){
        window.location="#/editorinfo/";
    }
    //获取分类
    getcategory(){
      var s=this;
      $.ajax({
        type:'POST',
        url:window.baseUrl+'document/get_documentclasslist/',
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid,
        },
        success(data){
          if(data.getret===0){
            console.log(data,'get_documentclasslist')
            var typename=new Array();
            $.each(data.list,function(i,item){
              typename.push(item.typename);
            })            
            s.state.tags=typename;
            s.state.dataSource=data.list;
            //console.log(s.state.dataSource,'s.state.dataSource');
            s.forceUpdate();
          }else{
            console.log(this.url,'error:get_documentclasslist')
          }
        }
      })
    }

    //add category
    addProduct(){
      var s=this;
      this.setState({
        modpostDialogVisible:false,
      })
      s.forceUpdate();
    }
    //dialog
    dialogform(){
      var s=this;
      this.setState({
            modpostDialogVisible:true,
      })
      s.forceUpdate();
    }
    //添加分类
    handleInputConfirm(){
      var s=this;
      const state = this.state;
      const inputValue = state.inputValue;
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      //
      //console.log(tags,'handleInputConfirm');
      //add
      //console.log(inputValue,'inputValueinputValueinputValue');
      $.ajax({
        type:'POST',
        url:window.baseUrl+'document/add_documentclass',//接口地址
        data:{
          userid:s.userid,
          getusersigid:s.getusersigid,
          typename:inputValue,
        },
        success(data){
          if(data.getret === 0){
              //state
              s.setState({
                tags,
                inputVisible: false,
                inputValue: '',
              }); 
              s.getcategory();                
              s.forceUpdate();                  
          }
        }
      })

    }
    //编辑
    saveinput(e){
        var s=this;
        const value = e.target.value;//名称
        const autoid = e.target.alt;//序号
        const state = this.state;
        let tags = state.tags;
        s.setState({ 
          value
        });
        var selectedIndex=s.state.selectedIndex;
        //获取id
        $.each(this.state.dataSource,function(i,item){        
          if(i===parseInt(autoid)){
            s.state.workdatatype=item.workdatatype;
            s.state.tags[i]=value;
            //console.log(s.state.workdatatype,"workdatatype"); 
            //console.log(s.state.tags[i],"tagsindex");
            
            //提交
           $.ajax({
              type:'GET',
              url:window.baseUrl+'document/edit_documentclass',//接口地址
              data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                workdatatype:s.state.workdatatype,
                typename:value,
              },
              success(data){
                if(data.getret === 0){
                  //console.log(s.state.tags,'修改成功！');
                  s.getcategory();
                  s.forceUpdate();
                }
              }
            }) 
          }

        })
  
    }
    //删除
    delData(workdataid){
        var s = this;
        var userid = this.props.params.userid?this.props.params.userid:this.userid;
        
        $.ajax({
            url:window.baseUrl+'document/del_document/',
            data:{
                userid:s.userid,
                getusersigid:s.getusersigid,
                documentid:workdataid,
            },
            success(data){
                if(data.getret === 0){
                    message.success('删除成功！');
                    setTimeout(()=>{
                        s.bindNewdata();
                    },2000)
                }
                else if(data.getret === -3){
                    message.error('您没有访问的权限,2秒后跳转到首页');
                    setTimeout(()=>{
                        location.href='/';
                    },2000)
                }
                else{
                    message.error(data.getmsg);
                }
            }
        })
    }
/*    changeAccount(e){
        this.setState({
            selectedIndex:e
        })
    }*/
    changeAccount(i){       
        this.state.selectedIndex = i*1;
        this.setState({
            selectedIndex:i*1
        })
        this.state.keyword = '';
        this.forceUpdate();
        this.bindNewdata();
        window.location='#datum/'+i;
        //console.log(this.state.selectedIndex);
        console.log(this.props.params.id);
    }
}
export default ZmitiValidateUser(ZmitiDatumApp);


/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/