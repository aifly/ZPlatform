import 'babel-polyfill';
const ShapeGenerater = {
    renderRectLeftRight(options, fn){//左右两侧的长方形。
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape();
        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2, height);


        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / 2, 0, width / 2, height);

        this.bindDblClick(rect,rect1);

        stage.addChild(rect, rect1);
        stage.update();

        fn && fn(rect, rect1);

    },
    renderRectUpDown(options,fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape();
        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width, height / 2);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(0, height / 2, width, height / 2);

        this.bindDblClick(rect,rect1);
        fn && fn(rect, rect1);
        stage.addChild(rect, rect1);
        stage.update();
    },
    bindDblClick(){
        Array.from(arguments).forEach(r=>{
            r.on('dblclick', ()=> {
                window.showModal({type: 0, id: 'puzzle',target:r});
            });
        });
    }
}

export default ShapeGenerater;