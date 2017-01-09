import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import Obserable from '../static/libs/obserable.js';
/*browserHistory.push('/user');
browserHistory.push('./admin/company');*/

import AdminIndex from './components/index.jsx';
import ZmitiUserApp from '../user/index.jsx';
import ZmitiCompanyApp from '../company/index.jsx';
import ZmitiSystemApp from '../system/index.jsx';
import ZmitiProductApp from '../product/index.jsx';
import ZmitiWorkOrderApp from '../workorder/index.jsx';


class App extends React.Component{
    constructor(args) {
      super(...args);
  }

 
	render(){
			var apps =  [
				{path:'/',app:AdminIndex},
				{path:'/user/',app:ZmitiUserApp},
				{path:'/company/',app:ZmitiCompanyApp},
				{path:'/system/',app:ZmitiSystemApp},
				{path:'/product/',app:ZmitiProductApp},
				{path:'/workorder/',app:ZmitiWorkOrderApp}
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

		 window.mainLeftSize = 180;
	}

	componentDidMount() {

		window.addEventListener('resize', ()=>{
			window.obserable.trigger({type:'setAdminMenu'});
			window.obserable.trigger({type:'setAdminHeight'});
		});
/*
			window.onresize = function(){
					
			}*/
	}

}

ReactDOM.render(<App isAdmin={true}></App>, document.getElementById('fly-main'));
