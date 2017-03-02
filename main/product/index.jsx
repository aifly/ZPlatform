import './static/css/index.css';
import React from 'react';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import moment from 'moment';
import {Button,message,Input,Table,Modal,Form,Icon,Radio,DatePicker } from '../commoncomponent/common.jsx';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

const RadioGroup = Radio.Group;

import MainUI from '../admin/components/main.jsx';

 class ZmitiProductApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            visible:true,
            productName:'',//产品名称
            productShortName:'',
            productPrice:'0',
            productLink:'',//产品地址
            productRemark:'',
            defaultZmitiIcon:'../public/images/lt-company-ico.png',
            defaultAntdIcon:'picture',
            expireDate:'2099-12-31',//过期时间
            currentIconType:'',//当前产品的图标,默认用智媒体的图标
            iconModalVisible:false,//图标对话框是否显示。
            currentIcon:"",//当前产品图标。默认为空的
        }
    }

    componentWillMount() {
       let {resizeMainHeight,validateUser,loginOut} = this.props;

        resizeMainHeight(this); 
        
        let {username,userid,getusersigid} = validateUser(()=>{loginOut(undefined,undefined,false);},this);
        this.userid = userid;
        this.getusersigid = getusersigid;
       
    }

    componentDidMount(){
        
        this.setState({
            mainHeight:document.documentElement.clientHeight - 50
        });

        
    }

    render(){

        let  {validateUser,loginOut,resizeMainHeight} = this.props;
        var iNow = 0 ;
        validateUser(()=>{
            iNow++;
            loginOut();
        },this);
       // resizeMainHeight(this);
        
        if(iNow === 1){
            return <div></div>;    
        }

        const formItemLayout = {
           labelCol: {span: 6},
           wrapperCol: {span: 14},
         };
         const dateFormat = 'YYYY-MM-DD';
        let component =  <div className="product-main-ui" style={{height:this.state.mainHeight}}>
                <header className='product-header'><Button onClick={()=>{this.setState({visible:true})}} type='primary'>新增产品服务</Button></header>
                <Modal title='新增产品服务' visible={this.state.visible}
                  onOk={this.addProduct.bind(this)}
                  onCancel={()=>{this.setState({visible:false})}}
                  width={600}
                  >

                <Form >
                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品名称</span>}
                   hasFeedback={true}
                 >
                   <Input ref='product-name' placeholder='要显示的菜单名' onChange={(e)=>{this.setState({productName:e.target.value})}}/>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品简称</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-sort-name' placeholder='产品简称'  onChange={(e)=>{this.setState({productShortName:e.target.value})}}/>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>到期时间</span>}
                   hasFeedback={true}
                 >
                     <DatePicker
                      format="YYYY-MM-DD"
                      onChange={this.changeExpireDate.bind(this)}
                      size={'default'} defaultValue={moment(this.state.expireDate,dateFormat)}/>

                 </FormItem>


                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品图标</span>}
                   hasFeedback={true}
                 >

                   {this.state.currentIcon && this.state.currentIconType === 'zmiti' && <div className='product-menu-ico'><img src={this.state.currentIcon}/></div>}
                   {this.state.currentIcon && this.state.currentIconType === 'antd' && <div className='product-menu-ico product-antd-ico'><Icon type={this.state.currentIcon} /></div>}

                    <RadioGroup onChange={this.onChangeIcon.bind(this)} value={this.state.currentIconType}>
                        <Radio value={'zmiti'}>智媒体图标</Radio>
                        <Radio value={'antd'}>组件库图标</Radio>
                    </RadioGroup>

                    <section className='product-ico-C' style={{display:this.state.iconModalVisible?'block':'none'}}>
                        <section className='product-ico-header'>
                            <div>添加产品图标</div>
                            <div onClick={()=>{this.setState({iconModalVisible:false})}}><span>&times;</span></div>
                        </section>
                        <section className='product-ico-list' >
                           {this.state.currentIconType === 'zmiti' && <div>
                                                           <ul onClick={this.changeIcon.bind(this)}>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-money-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-msg-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-usergroup-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-user-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                             <li><img draggable='false' src='../public/images/lt-company-ico.png'/></li>
                                                           </ul>
                                                       </div>}
                            {this.state.currentIconType === 'antd' && 
                               <div>
                                  <ul onClick={this.changeIcon.bind(this)}>
                                      <li><Icon type="lock"/></li>
                                      <li><Icon type="unlock"/></li>
                                      <li><Icon type="android"/></li>
                                      <li><Icon type="apple"/></li>
                                      <li><Icon type="apple-o"/></li>
                                      <li><Icon type="area-chart"/></li>
                                      <li><Icon type="pie-chart"/></li>
                                      <li><Icon type="bar-chart"/></li>
                                      <li><Icon type="dot-chart"/></li>
                                      <li><Icon type="bars"/></li>
                                      <li><Icon type="book"/></li>
                                      <li><Icon type="calendar"/></li>
                                      <li><Icon type="cloud"/></li>
                                      <li><Icon type="cloud-download"/></li>
                                      <li><Icon type="code"/></li>
                                      <li><Icon type="code-o"/></li>
                                      <li><Icon type="copy"/></li>
                                      <li><Icon type="credit-card"/></li>
                                      <li><Icon type="desktop"/></li>
                                      <li><Icon type="edit"/></li>
                                      <li><Icon type="ellipsis"/></li>
                                      <li><Icon type="file"/></li>
                                      <li><Icon type="appstore-o"/></li>
                                      <li><Icon type="picture"/></li>
                                      <li><Icon type="shopping-cart"/></li>
                                      <li><Icon type="star-o"/></li>
                                      <li><Icon type="star"/></li>
                                      <li><Icon type="hearr-o"/></li>
                                      <li><Icon type="camera"/></li>
                                      <li><Icon type="camera-o"/></li>
                                      <li><Icon type="team"/></li>
                                      <li><Icon type="solution"/></li>
                                      <li><Icon type="customer-service"/></li>
                                      <li><Icon type="switcher"/></li>
                                      <li><Icon type="rocket"/></li>
                                  </ul>
                               </div>
                            }
                        </section>
                    </section>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品费用</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-cost' addonAfter="￥/月" defaultValue={0}  onChange={(e)=>{this.setState({productPrice:e.target.value})}}/>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品地址</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-path' defaultValue={''}  onChange={(e)=>{this.setState({productLink:e.target.value})}} placeholder='产品存放的项目地址，由超级管理员填写'/>

                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span>产品说明</span>}
                   hasFeedback={true}
                 >
                     <textarea ref='product-remark' style={{width:'100%'}} defaultValue={''} onChange={(e)=>{this.setState({productRemark:e.target.value})}}  placeholder='产品说明'>
                     </textarea>
                 </FormItem>
                
               </Form>    
             </Modal>
            </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }

    changeExpireDate(value){
        
        this.setState({expireDate:value.format('YYYY-MM-DD')})
    }

    changeIcon(e){//选择当前产品图标。
      switch(this.state.currentIconType) {
        case 'zmiti':
           var src = e.target.src || e.target.children[0].src;
            if(!src){
              return;
            }
            this.setState({
              currentIcon:src
            });
          break;
        case 'antd':
          if(e.target.nodeName === 'I'){
            var icon = e.target.className.split(' ')[1].substring(8);
           
          }else{
            var icon = e.target.children[0].className.split(' ')[1].substring(8);
          }
          this.setState({
              currentIcon:icon
            });
         // console.log(e.target);
          break;
      }

     
    }
    addProduct(){//添加产品
      var params = {
        setlinkto:this.state.productLink,
        setkey:'puzzle',
        settitle:this.state.productName,
        setpoutline:this.state.productShortName,
        setisicon:this.state.currentIconType === 'antd',
        settype:this.state.currentIcon,
        setendtime:this.state.expireDate,
        setprice:this.state.productPrice,
        setmonthnum:1,//按月算。
        setpdesc:this.state.productRemark,
        userid:this.userid,
        getusersigid:this.getusersigid
      }
      $.ajax({
        url:window.baseUrl + '/product/add_product/',
        data:params,
        success(data){
          console.log(data);
        }
      });
    }
    onChangeIcon(e){//切换图标
      switch(e.target.value) {
        case 'zmiti':
           this.setState({
              currentIcon:this.state.defaultZmitiIcon
            });
          break;
        case 'antd':
          this.setState({
              currentIcon:this.state.defaultAntdIcon
            });
          break;
      }
        this.setState({
            currentIconType:e.target.value,
            iconModalVisible:true
        });
    }
}

export default ZmitiValidateUser(ZmitiProductApp);
 