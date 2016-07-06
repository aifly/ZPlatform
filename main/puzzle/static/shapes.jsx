import 'babel-polyfill';
const ShapeGenerater = {
    renderRectLeftRight(options, fn){//左右两侧的长方形。
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape();
        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / 2 + 1, 0, width / 2 - 1, height);

        let {text,text1} = this.addLoadingHorText(width, height);

        this.bindDblClick({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / 2, y: 0});

        stage.addChild(rect, rect1, text1, text);

        stage.update();
        fn && fn({rect: rect, text: text,x: 0, y: 0}, {rect: rect1, text: text1,x: width / 2, y: 0});

    },
    renderRectUpDown(options, fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape();
        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width, height / 2 - 1);
        rect.name = 'left';

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(0, height / 2 + 1, width, height / 2 - 1);
        rect1.name = 'right';

        let {text,text1}  = this.addLoadingVerText(width, height);

        this.bindDblClick({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:0,y:height/2+1});

        fn && fn({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:0,y:height/2+1});

        stage.addChild(rect, rect1, text, text1);
        stage.update();
    },
    renderRectTilt(options, fn){//
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            scale = 3 / 5;
        rect.graphics.beginFill(colors[0]).moveTo(0, 0).lineTo(width * scale - 1, 0).lineTo(width * (1 - scale), height).lineTo(0, height).closePath();

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).moveTo(width * scale + 1, 0).lineTo(width, 0).lineTo(width, height).lineTo(width * (1 - scale) + 1, height).closePath();


        let {text,text1} = this.addLoadingHorText(width, height);

        this.bindDblClick({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:width * scale + 1,y:0});


        stage.addChild(rect, rect1, text1, text);

        stage.update();
        fn && fn({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:width * scale + 1,y:0});
    },
    renderRectBessel(options, fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            scale = .5;
        rect.graphics.beginFill(colors[0]).moveTo(0, 0).lineTo(0, height * scale - 1).quadraticCurveTo(width * scale, height * (scale + .2), width, height * scale - 1).lineTo(width, 0).endStroke();

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).moveTo(0, height).lineTo(0, height * scale + 1).quadraticCurveTo(width * scale, height * (scale + .2), width, height * scale).lineTo(width, height).endStroke();


        let {text,text1}  = this.addLoadingVerText(width, height);

        this.bindDblClick({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:0,y:height * scale + 1});


        stage.addChild(rect, rect1, text1, text);

        stage.update();
        fn && fn({rect: rect, text: text,x:0,y:0}, {rect: rect1, text: text1,x:0,y:height * scale + 1});
    },
    renderRectThree1(options, fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 3;

        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(width / len*2 + 1, 0, width / len - 1, height);

        let text = new createjs.Text('loading...', "20px Arial", '#fff');

        text.x = width / len /2 - 30;
        text.y = height / 2;
        text.name = 'text';
        text.alpha = 0;

        let text1 = new createjs.Text('loading...', "20px Arial", '#fff');
        text1.x = width / 2 - 30;
        text1.y = height / 2;
        text1.name = 'text1';
        text1.alpha = 0;

        let text2 = new createjs.Text('loading...', "20px Arial", '#fff');
        text2.x = width / len/2 * 5 - 30;
        text2.y = height / 2;
        text2.name = 'text2';
        text2.alpha = 0;

        this.bindDblClick({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / len, y: 0}, {rect: rect2, text: text2, x: width / len*2, y: 0});

        stage.addChild(rect, rect1,rect2, text1, text,text2);

        stage.update();
        fn && fn({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / len, y: 0}, {rect: rect2, text: text2, x: width / len*2, y: 0});
    },
    addLoadingHorText(width, height){
        let text = new createjs.Text('loading...', "20px Arial", '#fff');

        text.x = width / 4 - 30;
        text.y = height / 2;
        text.name = 'text';
        text.alpha = 0;

        let text1 = new createjs.Text('loading...', "20px Arial", '#fff');
        text1.x = width / 4 * 3 - 30;
        text1.y = height / 2;
        text1.name = 'text1';
        text1.alpha = 0;

        return {text, text1};
    },
    addLoadingVerText(width, height){
        let text = new createjs.Text('loading...', "20px Arial", '#fff');

        text.x = width / 2 - 30;
        text.y = height / 4;
        text.name = 'text';
        text.alpha = 0;

        let text1 = new createjs.Text('loading...', "20px Arial", '#fff');
        text1.x = width / 2 - 30;
        text1.y = height / 4 * 3;
        text1.name = 'text1';
        text1.alpha = 0;

        return {text, text1};
    },
    bindDblClick(){
        Array.from(arguments).forEach(r=> {
            r.rect.on('dblclick', ()=> {
                window.showModal({
                    type: 0,
                    id: 'puzzle',
                    target: {rect: r.rect, text: r.text, x: r.x || 0, y: r.y || 0}
                });
            });
        });
    }
}

export default ShapeGenerater;