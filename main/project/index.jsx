import React,{Component} from 'react';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import MainUI from '../components/Main.jsx';
import './static/css/index.css';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
const TabPane = Tabs.TabPane;
import ZmitiSearchInput from '../components/zmiti-search-input.jsx';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

class  ZmitiProject extends Component{
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
const columns = [{
  title: '编号',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '项目名称',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '项目状态',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '项目开始时间',
  dataIndex:'action',
  key: 'action',

}, {
  title: '预计结束时间',
  dataIndex:'endtime',
  key: 'endtime',

}, {
  title: '项目负责人',
  dataIndex:'username',
  key: 'username',

}, {
  title: '成员数',
  dataIndex:'number',
  key: 'number',

}, {
  title: '客户名称',
  dataIndex:'cname',
  key: 'cname',

}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  action:'',
  endtime:'',
  username:'',
  number:'',
  cname:'',
}];
		var component =<div>
			<Tabs tabPosition='left'>
          <TabPane tab="项目管理" key="1">
			<Row>
				<Col span={12} offset={6}><ZmitiSearchInput></ZmitiSearchInput></Col>
			</Row>
			<Table columns={columns} dataSource={data} />
          </TabPane>
          <TabPane tab="任务管理" key="2">Content of Tab 2</TabPane>
        </Tabs>
		</div>;
		return <MainUI component={component}></MainUI>
	}
}


export default ZmitiValidateUser(ZmitiProject);