  export default class Obserable{
	constructor(){
		this.handlers = {};
	}	
	on(type,handler){
		this.handlers[type] =  this.handlers[type] || [];
		this.handlers[type].push(handler);	
	}
	trigger(event){

		if(!event.target){
			event.target=this;
		}
		if(this.handlers[event.type] instanceof Array){
            var handlers=this.handlers[event.type];//检出被观察者注册的观察者
            for(var i=0,len=handlers.length;i<len;i++){
               return handlers[i](event.data);//回调函数执行，也就是观察者更新自己
            }
        }
    }
}
