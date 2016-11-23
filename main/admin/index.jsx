import React from 'react';
import ReactDOM from 'react-dom';
import Icon from  'antd/lib/icon/index';
import Menu  from  'antd/lib/menu';
import Input from  'antd/lib/input';
import Badge from  'antd/lib/badge';
import 'antd/lib/icon/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/badge/style/css';
import '../static/css/index.css';
import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import Obserable from '../static/libs/obserable.js';
/*browserHistory.push('/user');
browserHistory.push('./admin/company');*/



import AdminIndex from './components/index.jsx';
import ZmitiUserApp from '../user/index.jsx';
import ZmitiCompanyApp from '../company/index.jsx';
import ZmitiSystemApp from '../system/index.jsx';

class App extends React.Component{
    constructor(args) {
      super(...args);
  }

 
	render(){

			var apps =  [
				{path:'/',app:AdminIndex},
				{path:'/user/',app:ZmitiUserApp},
				{path:'/company/',app:ZmitiCompanyApp},
				{path:'/system/',app:ZmitiSystemApp}
			];
    return (
         <Router history={hashHistory} >
         	{apps.map((app,i) =>{
         		return <Route key={i} path={app.path} component={app.app}/>
         	})}
			  </Router>
    );
	}

	componentWillMount() {
		window.obserable = new Obserable();
		window.addEventListener('resize', ()=>{
				obserable.trigger({type:'setMainHeight'});
				obserable.trigger({type:'setMenuWidth'});
		});
		
	}

	componentDidMount() {

	}

}

ReactDOM.render(<App isAdmin={true}></App>, document.getElementById('fly-main'));
