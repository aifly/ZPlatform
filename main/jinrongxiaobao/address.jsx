import './static/css/address.css';
import React from 'react';
import ZmitiUploadDialog from '../components/zmiti-upload-dialog.jsx';
import {
  message,
  Select,
  Modal,
  Form,
  Icon,
  Tag,
  Tooltip,
  Cascader,
  Input,
  Button,
  Row,
  Col,
  Switch,
  Radio,
  InputNumber,
  DatePicker,
  Table,
  moment,
  Spin
} from '../commoncomponent/common.jsx';
let Search = Input.Search;
const FormItem = Form.Item;
let Option = Select.Option;
import $ from 'jquery';

import {
  ZmitiValidateUser
} from '../public/validate-user.jsx';
import ZmitiUserList from '../components/zmiti-user-list.jsx';
import MainUI from '../components/Main.jsx';

class ZmitiJinrongxbaddressApp extends React.Component {
  constructor(args) {
    super(...args);
    this.state = {
      mainHeight: document.documentElement.clientHeight - 50,
      loading: false,
      tip: '数据拉取中...',
      keyword: '',
      visible: false,
      xbid: '',
      name: '', //名称
      province: '', //省份          
      city: '', //城市
      positionbd: '', //百度地图坐标
      positiongd: '', //高德地图坐标
      address: '', //地址
      decoration: '', //简介
      cityid: -1,
      proviceid: -1,
      options: [{
        value: 'shanxi',
        label: '陕西',
        children: [{
          value: 'xian',
          label: '西安',
        }, {
          value: 'xianyang',
          label: '咸阳',
        }],
      }],
      dataSource: [{
        key: '1',
        name: '名称1',
        city: '西安',
        address: '未央区张家堡',
      }, {
        key: '2',
        name: '名称2',
        city: '西安',
        address: '新城区西一路',
      }, {
        key: '3',
        name: '名称3',
        city: '西安',
        address: '碑林区张家村',
      }],
    }
    this.currentId = -1;
  }


  render() {
    var s = this;
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

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width: 150,
    }, {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
              <a href="#">编辑</a>
              <span className="ant-divider" />
              <a href="#">删除</a>
            </span>
      ),
    }];
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        },
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    var xbLogoProps = {
      baseUrl: window.baseUrl,
      getusersigid: s.getusersigid,
      userid: s.userid,
      onFinish(imgData) {
        s.setState({
          logo: imgData.src
        })
      }
    }



    var title = this.props.params.title || '金融消保';

    const monthFormat = 'YYYY/MM';
    let props = {
      userList: this.state.userList,
      userid: this.userid,
      changeAccount: this.changeAccount.bind(this),
      type: 'custom-1',
      tags: ['消保地址', '政策管理', '公告管理', '设置'],
      mainHeight: this.state.mainHeight,
      title: title,
      selectedIndex: 0,
      rightType: "custom",
      customRightComponent: <div className='jinrongxb-main-ui' style={{height:this.state.mainHeight}}>
                <div className='pad-10'>
                    <div className="zmiti-jinrongxb-header">
                        <Row>
                            <Col span={8} className="zmiti-jinrongxb-header-inner">消保地址</Col>
                            <Col span={8} offset={8} className='zmiti-jinrongxb-button-right'></Col>
                        </Row>                      
                    </div>
                    <div className="zmiti-jinrongxb-line"></div>
                    <div className="jinrongxb-heigth45"></div>
                    <Form>
                      <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="名称" 
                            value={this.state.name}
                            onChange={(e)=>{this.state.name=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="电话"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="电话" 
                            value={this.state.phone}
                            onChange={(e)=>{this.state.phone=e.target.value;this.forceUpdate();}}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="LOGO"
                        hasFeedback
                      >                        
                          
                          <div style={{background:'url('+this.state.logo+') no-repeat center/cover'}} onClick={this.uploadLogo.bind(this)} className='zmiti-xb-upload'>
                            <img style={{opacity:this.state.logo?0:1}} src={'./static/images/file-add.jpg'}/>
                            {this.state.logo && <div className='zmiti-xb-logo-del' onClick={this.deleteLogo.bind(this)}>
                                                          <Icon type='delete'/>
                                                        </div>}
                          </div>                    
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="城市"
                        hasFeedback
                      >  
                        <Cascader value={[this.state.countyid,this.state.proviceid,this.state.cityid]} options={this.state.options} onChange={this.selectcity.bind(this)} placeholder="选择城市" />
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="地址"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="地址" 
                            value={this.state.address}
                            onChange={this.modifyAddress.bind(this)}
                          />                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="百度地图坐标"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="百度地图坐标" 
                            value={this.state.positionbd}
                            onChange={(e)=>{this.state.positionbd=e.target.value;this.forceUpdate();}}
                          />
                          <div className='zmiti-jinrongxb-map' id='zmiti-xb-baidumap'></div>                     
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="高德地图坐标"
                        hasFeedback
                      >                        
                          
                          <Input placeholder="高德地图坐标" 
                            value={this.state.positiongd}
                            onChange={(e)=>{this.state.positiongd=e.target.value;this.forceUpdate();}}
                          />     
                          <div className='zmiti-jinrongxb-map' id='zmiti-xb-gaodemap'></div>                                      
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="简介"
                        hasFeedback
                      >                        
                          
                          <textarea value={this.state.xbcontent} onChange={(e)=>{this.setState({xbcontent:e.target.value})}} rows={4} className="ant-input ant-input-lg">
                          </textarea>             
                      </FormItem>

                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.addAddress.bind(this)} htmlType="submit">{this.state.xbid?'更新':"添加"}</Button>
                      </FormItem>
                    </Form> 
                    
                </div>
                {this.state.showDialog && <ZmitiUploadDialog id='zmiti-upload-xb-logo' {...xbLogoProps}></ZmitiUploadDialog>}
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
      send
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
  }
  componentDidMount() {
    var s = this;
    this.resizeMainHeight(this);


    this.loadCity();

    var key = 'E0cb94f3d37bab2a125593149b409687';

    var script = document.createElement('script');

    var i = 0;
    script.onload = () => {
      i++;
      if (i >= 2) {
        this.loadMap();
      }

    }
    script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=' + key;
    document.body.appendChild(script);



    //http://webapi.amap.com/maps?v=1.4.1&key=2dbb2d18663da519b6de64c286eae1c7
    var script1 = document.createElement('script');
    script1.src = 'http://webapi.amap.com/maps?v=1.4.1&key=b174dc1e3ab2942b72916080eabdcc75&plugin=AMap.Geocoder';
    //script1.src = 'http://webapi.amap.com/maps?v=1.4.1&key=b174dc1e3ab2942b72916080eabdcc75&plugin=AMap.Geocoder';
    script1.onload = () => {
      i++;
      if (i >= 2) {
        this.loadMap();
      }
    }
    document.body.appendChild(script1);



    // document.body.appendChild(script2)
  }

  loadXBById() {
    var id = this.props.params.id;
    if (!id) {
      return;
    }

    $.ajax({
      url: window.baseUrl + 'xbadmin/getxbstoredetail/',
      type: 'post',
      data: {
        userid: this.userid,
        getusersigid: this.getusersigid,
        xbid: id
      }
    }).done(data => {
      console.log(data)

      if (data.getret === 0) {
        var detail = data.detail;
        this.setState({
          name: detail.xbname,
          xbid: id,
          countyid: 1,
          phone: detail.phone,
          proviceid: detail.proviceid,
          logo: detail.xblogourl,
          xbcontent: detail.xbcontent,
          address: detail.xbaddress,
          positiongd: detail.latitude + ',' + detail.longitude,
          positionbd: detail.bdlatitude + ',' + detail.bdlongitude,
          cityid: detail.cityid
        }, () => {})
      }
    })
  }

  addAddress() {

    var id = this.props.params.id;


    var params = {
      userid: this.userid,
      getusersigid: this.getusersigid,
      xbname: this.state.name,
      xblogourl: this.state.logo,
      xbcontent: this.state.xbcontent,
      proviceid: this.state.proviceid,
      cityid: this.state.cityid,
      xbaddress: this.state.address,
      latitude: this.state.positiongd.split(',')[1],
      longitude: this.state.positiongd.split(',')[0],
      bdlatitude: this.state.positionbd.split(',')[1],
      bdlongitude: this.state.positionbd.split(',')[0],
      phone: this.state.phone
    }


    if (id) {
      params.xbid = id;
      $.ajax({
        url: window.baseUrl + 'xbadmin/editxbstore/',
        data: params,
        type: 'post'
      }).done((data) => {
        console.log(data);
        message[data.getret === 0 ? 'success' : 'error'](data.getmsg);

      })
    } else {
      $.ajax({
        url: window.baseUrl + 'xbadmin/addxbstore/',
        data: params,
        type: 'post'
      }).done((data) => {
        console.log(data);
        //window.location.hash = 'jinrongxiaobaoaddress/' + data.xbid;

        this.setState({
          name: '',
          phone: '',
          latitude: '',
          longitude: '',
          bdlatitude: '',
          bdlongitude: '',
          cityid: -1,
          proviceid: -1,
          countyid: -1,
          logo: '',
          address: '',
          xbcontent: '',
          positionbd: '',
          positiongd: ''
        })
        message[data.getret === 0 ? 'success' : 'error'](data.getmsg);

      })
    }



  }

  deleteLogo(e) {
    e.stopPropagation();
    this.setState({
      logo: ''
    })
  }

  uploadLogo() {
    this.setState({
      showDialog: true
    }, () => {
      var obserable = window.obserable;
      obserable.trigger({
        type: 'showModal',
        data: {
          type: 0,
          id: 'zmiti-upload-xb-logo'
        }
      });
    })
  }


  modifyAddress(e) {
    this.state.address = e.target.value;
    this.forceUpdate();

    this.fillAddress();
    this.theLocation(e.target.value)
  }

  loadCity() {
    $.ajax({
      url: window.baseUrl + 'share/get_citylist/',
      data: {},
      type: 'post'

    }).done(data => {
      if (data.getret === 0) {
        this.setState({
          options: data.list
        })
      }
    })
  }

  loadMap() {

    var map = new BMap.Map("zmiti-xb-baidumap");
    this.baiduMap = map;
    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 11);


    map.addEventListener("click", (e) => {

      this.setState({
        positionbd: e.point.lng + ", " + e.point.lat
      })
    });


    var gdmap = new AMap.Map('zmiti-xb-gaodemap', {
      resizeEnable: true,
      zoom: 11,

    });

    gdmap.on('click', e => {
      this.setState({
        positiongd: e.lnglat.getLng() + ',' + e.lnglat.getLat()
      })
    })

    this.gaodeMap = gdmap;


    this.loadXBById();
  }

  theLocation(city) {
    city && this.baiduMap.centerAndZoom(city, 11);
  }

  changeAccount(i) {
      if (i * 1 === 0) {
        window.location.hash = 'jinrongxiaobao/';
      } else if (i * 1 === 1) {
        window.location.hash = 'jinrongxiaobaopolicy/';
      } else if (i * 1 === 2) {
        window.location.hash = 'jinrongxiaobaonotice/';
      } else if (i * 1 === 3) {
        window.location.hash = 'jinrongxiaobaosetup/';
      }
    }
    //选择城市
  selectcity(value, a) {

    var city = '';
    var city1 = '';
    a.forEach((item, i) => {
      if (i > 0) {
        city += item.label;
      }
      if (i === a.length - 1) {
        city1 = item.label;
      }
    });
    this.setState({
      address: city,
      countyid: value[0],
      proviceid: value[1],
      cityid: value[2]
    });

    this.searchByStationName(a[2] || a[1]);

    //city1 && this.gaodeMap.setCity(city1);
    this.theLocation(city);
  }

  searchByStationName(keyword, fn) {　　
    var s = this;
    var geocoder = new AMap.Geocoder({
      city: "", //城市，默认：“全国”
      radius: 1000 //范围，默认：500
    });
    geocoder.getLocation(keyword.label, function(status, result) {
      if (status === 'complete' && result.info === 'OK') {
        s.setState({
          positiongd: result.geocodes[0].location.lng + ',' + result.geocodes[0].location.lat
        }, () => {
          fn && fn();
          s.gaodeMap.setZoomAndCenter(16, s.state.positiongd.split(','));
        })
      } else {
        console.log('errrp')
      }
    });


    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(keyword.label, function(point) {
        if (point) {
          s.setState({
            positionbd: point.lng + ',' + point.lat
          })

          console.log(point.lng + ',' + point.lat)

        } else {}
      },
      "北京市");
  }

  fillAddress() {

    this.searchByStationName({
      label: this.state.address
    }, () => {

      this.gaodeMap.setZoomAndCenter(11, this.state.positiongd.split(','));

      this.baiduMap.setZoom(20);
    });

  }



}

export default ZmitiValidateUser(ZmitiJinrongxbaddressApp);