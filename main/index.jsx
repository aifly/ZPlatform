import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';

import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiRichImgListApp from './richimg/list.jsx';
import ZmitiRichImgApp from './richimg/list.jsx';
import ZmitiPuzzleApp from './puzzle/index.jsx';
import ZmitiQaApp from './qa/index.jsx';
import ZmitiUserDepartmentApp from './userdepartment/index.jsx';
import ZmitiPersonalAccApp from './personalAcc/index.jsx';
import ZmitiProject from './project/index.jsx';
import Obserable from './static/libs/obserable.js';
import $ from 'jquery';
class App extends React.Component{
    constructor(args) {
      super(...args);
  }
	render(){
		var apps =  [
				{path:'/',app:ZmitiHomeApp},
				{path:'/richimglist/',app:ZmitiRichImgListApp},
				{path:'/puzzle/',app:ZmitiPuzzleApp},
				{path:'/userdepartment/',app:ZmitiUserDepartmentApp},
				{path:'/personalAcc/',app:ZmitiPersonalAccApp},
				{path:'/richimg/',app:ZmitiRichImgApp},
				{path:'/qa/',app:ZmitiQaApp},
				{path:'/project/',app:ZmitiProject},
			];
    return (
         <Router history={hashHistory} >
         	{apps.map((app,i) =>{
         		return <Route key={i} path={app.path} component={app.app}/>
         	})}
			  </Router>
    )
	}
  
	componentDidMount() {
		   
        window.obserable = new Obserable();
	}

}

$.getJSON(window.menuConfigUrl,(data)=>{
	window.globalMenus = data.routers;
	ReactDOM.render(<App></App>, document.getElementById('fly-main'));
});


