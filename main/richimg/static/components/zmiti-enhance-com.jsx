import React from 'react';


export let ZmitiEnhanceCom = ComponsedComponent => class extends  React.Component{
    constructor(args){
        super(...args);
    }

    static getGuid(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    render(){
        return (
            <ComponsedComponent {...this.state} {...this.props}></ComponsedComponent>
        )
    }
};