import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import MainUI from './components/Main.jsx';

import Icon from  'antd/lib/icon/index';
import Menu  from  'antd/lib/menu';
import Input from  'antd/lib/input';
import Badge from  'antd/lib/badge';
import 'antd/lib/icon/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/badge/style/css';
import { Router, Route, hashHistory ,Link ,browserHistory } from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiRichImgListApp from './richimg/list.jsx';
import ZmitiRichImgApp from './richimg/list.jsx';
import ZmitiPuzzleApp from './puzzle/index.jsx';
import ZmitiQaApp from './qa/index.jsx';
import ZmitiUserDepartmentApp from './userdepartment/index.jsx';
import ZmitiPersonalAccApp from './personalAcc/index.jsx';
const SubMenu = Menu.SubMenu;
class App extends React.Component{
    constructor(args) {
      super(...args);
  }

 
	render(){
        return (
             <Router history={hashHistory} >
					    <Route path="/" component={ZmitiHomeApp}/>
					    <Route path="/richimglist/" component={ZmitiRichImgListApp}/>
					    <Route path="/puzzle/" component={ZmitiPuzzleApp}/>
					    <Route path="/userdepartment/" component={ZmitiUserDepartmentApp}/>
					    <Route path="/personalAcc/" component={ZmitiPersonalAccApp}/>
					    <Route path="/richimg/" component={ZmitiRichImgApp}/>
					    <Route path="/qa/" component={ZmitiQaApp}/>
					  </Router>
        )
	}

  
	componentDidMount() {
	}

}

ReactDOM.render(<App isAdmin={true}></App>, document.getElementById('fly-main'));
