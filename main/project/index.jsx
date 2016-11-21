import React,{Component} from 'react';
import {ZmitiValidateUser} from '../public/validate-user.jsx';
import MainUI from '../components/Main.jsx';
import './static/css/index.css';
import {Row,Col,Tabs,Table,Icon,Button,Checkbox,Modal,Form,Input,DatePicker,} from 'antd';
const TabPane = Tabs.TabPane;
import ZmitiSearchInput from '../components/zmiti-search-input.jsx';
const FormItem = Form.Item;

class  ZmitiProject extends Component{
	constructor(props) {
		super(props);
		this.state = {
			visible:true
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
      		{/*项目管理内部框架*/}
		  <Row>
		  	<Col span={21} offset={0} className="pro-col-15 pro-row-15">
		  		<h5 className="pro-name">中国文明网项目管理组</h5>
		    </Col>
		    <Col span={3} offset={0} className="pro-col-15 pro-row-15" >
		  		<Button type="primary " onClick={()=>{this.setState({visible:true})}}>创建项目</Button>
		    </Col>
		  </Row>
		  <Row>
		  	<Col span={24} className="pro-col-15">
		  		 <div className="pro-line"></div>
		  	</Col>
		  </Row>
		  <Row>
          	<Col span={24} offset={0} className="pro-col-15">
	          	<Row>
					<Col span={12} offset={0} className="pro-row-15"><ZmitiSearchInput></ZmitiSearchInput></Col>
					<Col span={5}  className="pro-row-15 pro-col-15"><Checkbox defaultChecked="true" >只看正在进行的项目</Checkbox></Col>
				</Row>
				<Row>
					<Col span={24} offset={0}>
						<Table columns={columns} dataSource={data} />
					</Col>
				</Row>
          	</Col> 
          </Row>
		<Modal title="新建项目" visible={this.state.visible}
          onOk={this.createProject.bind(this)} onCancel={()=>{this.setState({visible:false})}}
        >
	         <Row>
	         	<Col span={24} className="pro-row-15">
	         		<Form horizontal>
	         			<FormItem
	         				label="项目名称"
	         				labelCol={{span:5}}
	         				wrapperCol={{span:12}}	         				
	         				validateStatus="validating"
	         				help=""
	         				>
	         				<Input placeholder="请录入项目名称" id="validating" />
	         			</FormItem>
	         			
	         			<FormItem
	         				label="项目负责人"
	         				labelCol={{span:5}}
	         				wrapperCol={{span:12}}	         				
	         				validateStatus="validating"
	         				help=""
	         				>
	         				<Input placeholder="请录入项目名称" id="validating" />
	         			</FormItem>
	         			<FormItem
	         				label="项目成员"
	         				labelCol={{span:5}}
	         				wrapperCol={{span:12}}	         				
	         				validateStatus="validating"
	         				help=""
	         				>
	         				<Input placeholder="请录入项目名称" id="validating" />
	         			</FormItem>
	         			<FormItem
	         				label="所属客户"
	         				labelCol={{span:5}}
	         				wrapperCol={{span:12}}	         				
	         				validateStatus="validating"
	         				help=""
	         				>
	         				<Input placeholder="请录入项目名称" id="validating" />
	         			</FormItem>
	         			<FormItem
	         				label="起止时间"
	         				labelCol={{span:5}}        				
	         				help=""
	         				>
	         				<Col span="6">
						        <FormItem validateStatus="" help="">
						          <DatePicker />
						        </FormItem>
						    </Col>
						    <Col span="1">
						        <p className="ant-form-split">-</p>
						    </Col>
						    <Col span="6">
						        <FormItem>
						          <DatePicker />
						        </FormItem>
						    </Col>
	         			</FormItem>
	         		</Form>
	         	</Col>
	         </Row>
        </Modal>
		
          </TabPane>
          <TabPane tab="任务管理" key="2">Content of Tab 2</TabPane>
        </Tabs>
		</div>;
		return <MainUI className="project" component={component}></MainUI>
	}

	createProject(){

	}
}


export default ZmitiValidateUser(ZmitiProject);