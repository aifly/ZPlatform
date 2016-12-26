import './static/css/index.css';
import React from 'react';

import {ZmitiValidateUser} from '../public/validate-user.jsx';


import MainUI from '../components/Main.jsx';

 class ZmitiRenewalApp extends React.Component{
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
    

      
        let component =  <div className="home-main" style={{height:this.state.mainHeight}}>
                adasd
            </div>
        return(
            <MainUI component={component}></MainUI>
        )
    }
}

export default ZmitiValidateUser(ZmitiRenewalApp);
 