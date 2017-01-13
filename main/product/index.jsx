import './static/css/index.css';
import React from 'react';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import {Button,message,Input,Table,Modal,Form,Icon,Radio} from '../commoncomponent/common.jsx';

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

import MainUI from '../admin/components/main.jsx';

 class ZmitiProductApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            visible:true,
            currentIconType:'',//当前产品的图标,默认用智媒体的图标
        }
    }

    componentWillMount() {
       let  {resizeMainHeight} = this.props;
            //resizeMainHeight(this);
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
        let component =  <div className="product-main-ui" style={{height:this.state.mainHeight}}>
                <header className='product-header'><Button onClick={()=>{this.setState({visible:true})}} type='primary'>新增产品服务</Button></header>
                <Modal title='新增产品服务' visible={this.state.visible}
                  onOk={()=>{this.addProduct.bind(this)}}
                  onCancel={()=>{this.setState({visible:false})}}
                  width={600}
                  >

                <Form >
                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品名称</span>}
                   hasFeedback={true}
                 >
                   <Input ref='product-name' placeholder='要显示的菜单名' onChange={()=>{}}/>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品简称</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-sort-name' placeholder='产品简称' onChange={()=>{}}/>
                 </FormItem>


                 <FormItem
                   {...formItemLayout}
                   label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品图标</span>}
                   hasFeedback={true}
                 >

                    <RadioGroup onChange={this.onChangeIcon.bind(this)} value={this.state.currentIconType}>
                        <Radio value={'zmiti'}>智媒体图标</Radio>
                        <Radio value={'antd'}>组件库图标</Radio>
                    </RadioGroup>

                    <section className='product-ico-C'>
                        <section className='product-ico-header'>
                            <div>添加产品图标</div>
                            <div><span>&times;</span></div>
                        </section>
                        <section className='product-ico-list'>
                            <div>
                                <ul>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                  <li><img src='../public/images/lt-company-ico.png'/></li>
                                </ul>
                            </div>
                        </section>
                    </section>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品费用</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-cost' addonAfter="￥/月" defaultValue={0} onChange={()=>{}}/>
                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span><span style={{color:'red',marginRight:4,}}>*</span>产品地址</span>}
                   hasFeedback={true}
                 >
                     <Input ref='product-path' defaultValue={''} onChange={()=>{}} placeholder='产品存放的项目地址，由超级管理员填写'/>

                 </FormItem>

                  <FormItem
                   {...formItemLayout}
                    label={<span>产品说明</span>}
                   hasFeedback={true}
                 >
                     <textarea ref='product-remark' style={{width:'100%'}} defaultValue={''} onChange={()=>{}} placeholder='产品说明'>
                     </textarea>
                 </FormItem>
                
               </Form>    
             </Modal>
            </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }
    addProduct(){//添加产品

    }
    onChangeIcon(e){//切换图标
        this.setState({
            currentIconType:e.target.value
        })
    }
}

export default ZmitiValidateUser(ZmitiProductApp);
 