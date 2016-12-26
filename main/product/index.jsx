import './static/css/index.css';
import React from 'react';

import {ZmitiValidateUser} from '../public/validate-user.jsx';

import MainUI from '../admin/components/main.jsx';

 class ZmitiProductApp extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
        		
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
    

      
        let component =  <div className="p-main-ui" style={{height:this.state.mainHeight}}>
                添加产品
            </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }
}

export default ZmitiValidateUser(ZmitiProductApp);
 