import React, { Component } from 'react';
import './static/css/index.css';
import ZmitiUserList  from '../../components/zmiti-user-list.jsx';
import {Tree,message,Select,Modal,Form,Icon,Tag,Tooltip, Input,Button, Row, Col,Switch,Radio,InputNumber,DatePicker,Table ,moment  } from '../../commoncomponent/common.jsx';
let Option = Select.Option;
const TreeNode = Tree.TreeNode;
import MainUI from '../components/main.jsx';
import {ZmitiValidateUser} from '../../public/validate-user.jsx';
import $ from 'jquery';
class ZmitiFolderApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current:0,
            selectedIndex:3,
            mainHeight:document.documentElement.clientHeight - 50,
            dataSource:[{
              key: '1',
              name: '文件名称',
              filelong: '1000kb',              
              filetype:'0',
              creatime: '2017-10-01',
            }, {
              key: '2',
              name: '文件名称2',
              filelong: '1024kb',              
              filetype:'0',
              creatime: '2017-10-02',
            }],
            treeData: [{
              title: '0-0',
              key: '0-0',
              children: [{
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0',isLeaf: true },
                  { title: '0-0-0-1', key: '0-0-0-1',isLeaf: true },
                  { title: '0-0-0-2', key: '0-0-0-2',isLeaf: true },
                ],
              }, {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0',isLeaf: true },
                  { title: '0-0-1-1', key: '0-0-1-1',isLeaf: true },
                  { title: '0-0-1-2', key: '0-0-1-2',isLeaf: true},
                ],
              }, {
                title: '0-0-2',
                key: '0-0-2',
              }],
            }, {
              title: '0-1',
              key: '0-1',
              children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
              ],
            }, {
              title: '0-2',
              key: '0-2',
            }],
            treeListData: [{
              title: '我的空间',
              key: 'AA',
              children: [
                { title: '公司培训', key: 'AA-1' ,
                  children:[{
                    title: '设计', key: 'AA-1-1',
                  },{
                    title: '制作', key: 'AA-1-2',
                  }]
                },
                { title: '公司文件', key: 'AA-2'},
              ]
            }]
            
        };

        this.onLoadData = (treeNode) => {
          return new Promise((resolve) => {
            if (treeNode.props.children) {
              resolve();
              return;
            }
            setTimeout(() => {
              this.setState({
                treeListData: [...this.state.treeListData],
              });
              resolve();
            }, 1000);
          });
        }

        this.renderTreeNodes = (data) => {
          return data.map((item) => {
            if (item.children) {
              return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                  {this.renderTreeNodes(item.children)}
                </TreeNode>
              );
            }
            return <TreeNode {...item} />;
          });
        }
    }
    onSelect(selectedKeys, info){
      //console.log('selected', selectedKeys, info);
      console.log('selected', selectedKeys[0]);
    }
    render() {
        let  {validateUser,loginOut,resizeMainHeight} = this.props;

        const columns = [{
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: '大小',
          dataIndex: 'filelong',
          key: 'filelong',
        }, {
          title: '类型',
          dataIndex: 'filetype',
          key: 'filetype',
        }, {
          title: '修改日期',
          dataIndex: 'creatime',
          key: 'creatime',
        }];
        var title = '素材管理';

        let component =<div className="zmiti-folder-main-ui" style={{height:this.state.mainHeight}}>
          <div className="pad-10-a">
            <Row className='zmiti-folder-header'>
              <Col span={8}  className='zmiti-folder-header-inner' >素材管理</Col>
              <Col span={8} offset={8} className='zmiti-folder-button-right'></Col>
            </Row>
            <div className="zmiti-folder-line"></div>
          </div>
          <div className="pad-10-b zmiti-folder-container">
            
            <div className="zmiti-folder-mainpane">
              <div className="zmiti-folder-leftpane">
                <div className="zmiti-folder-treelist">
                  <Tree loadData={this.onLoadData}
                    defaultExpandAll={true}
                    showIcon={true}
                    prefixCls={'ant-tree'}
                    onSelect={this.onSelect.bind(this)}
                  >
                    {this.renderTreeNodes(this.state.treeListData)}
                  </Tree>
                </div>
              </div>
              <div className="zmiti-folder-rightpane">
                <div className="zmiti-folder-rightpane-inner">
                  <Table dataSource={this.state.dataSource} columns={columns} />
                </div>
              </div>
            </div>          
           
          </div>
        </div>

        return (
          <MainUI component={component}></MainUI>
        );

    }

    componentWillMount() {
      let {resizeMainHeight,validateUser,loginOut,resizeLeftMenu} = this.props;
      validateUser(() => {loginOut(undefined,undefined,false);},this);
    }
    componentDidMount() {


    }
    

}
export default ZmitiValidateUser(ZmitiFolderApp);