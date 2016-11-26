import 'babel-polyfill';
const ShapeGenerater = {
    renderRectLeftRight(options, fn,target){//左右两侧的长方形。
        let {stage,colors,width,height,marginSize} = options,
            rect = new createjs.Shape();
            rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2 - marginSize, height);
            rect.name= 'rect';

        console.log(options)
        let rect1 = new createjs.Shape();
            rect1.graphics.beginFill(colors[1]).drawRect(width / 2 + marginSize, 0, width / 2 - marginSize, height);
            rect1.name= 'rect1';

        
       /*
         if(target){
             switch (target.name){
             case 'rect':
             rect.graphics.setStrokeStyle(2).beginStroke("#f00").beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height);
             break;
             case 'rect1':
             rect1.graphics.setStrokeStyle(2).beginStroke("#f00").beginFill(colors[1]).drawRect(width / 2 + 1, 0, width / 2 - 1, height);
             break;
         }
         }*/


        let {text,text1} = this.addLoadingHorText(width, height);

        this.bindDblClick({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / 2, y: 0});

        stage.addChild(rect, rect1, text1, text);

        fn && fn({rect: rect, text: text,x: 0, y: 0}, {rect: rect1, text: text1,x: width / 2, y: 0});

        stage.update();
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
        rect2.graphics.beginFill(colors[2]).drawRect(width / len*2 + 2, 0, width / len - 2, height);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / len /2 - 60;
        text.y = height / 2;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / 2 - 60;
        text1.y = height / 2;
        text1.name = 'text1';


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / len/2 * 5 - 60;
        text2.y = height / 2;
        text2.name = 'text2';


        this.bindDblClick({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / len, y: 0}, {rect: rect2, text: text2, x: width / len*2, y: 0});

        stage.addChild(rect, rect1,rect2, text1, text,text2);

        stage.update();
        fn && fn({rect: rect, text: text, x: 0, y: 0}, {rect: rect1, text: text1, x: width / len, y: 0}, {rect: rect2, text: text2, x: width / len*2, y: 0});
    },

    renderRectThree2(options, fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 3;

        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height/2-1);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(0, height/2+1, width / 2 - 1, height/2);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(width / 2 +1, 0, width / 2 , height);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / 2 /2 - 60;
        text.y = height / 4;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / 2 /2 - 60;
        text1.y = height / 4*3;
        text1.name = 'text1';


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / 4 * 3 - 60;
        text2.y = height / 2;
        text2.name = 'text2';


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: 0, y: height/2},
            {rect: rect2, text: text2, x: width / 2, y: 0}
            );

        stage.addChild(rect, rect1,rect2, text1, text,text2);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: 0, y: height/2},
            {rect: rect2, text: text2, x: width / 2, y: 0}
        );
    },

    renderRectThree3(options, fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 3;

        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height/2-1);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / 2 + 1,0, width / 2, height/2-1);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(0 , height/2+1, width , height / 2);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / 2 /2 - 60;
        text.y = height / 4;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / 4*3 - 60;
        text1.y = height / 4;
        text1.name = 'text1';


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / 2 - 60;
        text2.y = height / 4*3;
        text2.name = 'text2';


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width/2, y: 0},
            {rect: rect2, text: text2, x:0, y: height/2}
        );

        stage.addChild(rect, rect1,rect2, text1, text,text2);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width/2, y: 0},
            {rect: rect2, text: text2, x: 0, y: height/2}
        );
    },

    renderRectFour1(options,fn){
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 4;

        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(width / len*2 + 2, 0, width / len - 2, height);

        let rect3 = new createjs.Shape();
        rect3.graphics.beginFill(colors[3]).drawRect(width / len * 3 + 2, 0, width / len - 2, height);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / len /2 - 60;
        text.y = height / 2;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / len/ 2 *3 - 60;
        text1.y = height / 2;
        text1.name = 'text1';


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / len/2 * 5 - 60;
        text2.y = height / 2;
        text2.name = 'text2';


        let text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text3.x = width / len/2 * 7 - 60;
        text3.y = height / 2;
        text3.name = 'text2';


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width / len, y: 0},
            {rect: rect2, text: text2, x: width / len*2, y: 0},
            {rect: rect3, text: text3, x: width / len*3, y: 0}
        );

        stage.addChild(rect, rect1,rect2, rect3,text1, text,text2,text3);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width / len, y: 0},
            {rect: rect2, text: text2, x: width / len*2, y: 0},
            {rect: rect3, text: text3, x: width / len*3, y: 0}
        );
    },
    renderRectFour2(options,fn){//
        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 2;

        rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height/len-1);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height/len-1);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(0, height/len +1, width / len - 1, height/2);

        let rect3 = new createjs.Shape();
        rect3.graphics.beginFill(colors[3]).drawRect(width / len + 1, height/len + 1, width / len - 2, height/2);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / len /2  - 60;
        text.y = height /len/ 2;


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / len/ 2 * 3 - 60;
        text1.y = height / 2 /len;


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / len /2  - 60;
        text2.y = height / 4 *3 ;


        let text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text3.x = width / len/ 2 * 3 - 60;
        text3.y = height / 4 *3 ;


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width / len, y: 0},
            {rect: rect2, text: text2, x: 0, y: height/len},
            {rect: rect3, text: text3, x: width / len, y: height/len}
        );

        stage.addChild(rect, rect1,rect2, rect3,text1, text,text2,text3);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x: width / len, y: 0},
            {rect: rect2, text: text2, x: 0, y: height/len},
            {rect: rect3, text: text3, x: width / len, y: height/len}
        );
    },

    renderRectFour3(options,fn){

        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 2;

        rect.graphics.beginFill(colors[0]).drawRect(1, 0, width -1, height/len-1);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(1, height/len+1, width / len - 1, height/len-1);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(width / len + 2, height/len +1, width / len - 1, height/2/2-2);

        let rect3 = new createjs.Shape();
        rect3.graphics.beginFill(colors[3]).drawRect(width / len + 2, height/len /2 *3 + 1, width / len - 2, height/2/2);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / len   - 60;
        text.y = height /len/ 2;


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text1.x = width / len /2  - 60;
        text1.y = height / 4 *3 ;


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / len /2*3  - 60;
        text2.y = height / 2+ height / 8;


        let text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text3.x = width / len/ 2 * 3 - 60;
        text3.y = height / 8 +height / 4*3 ;


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x:0, y: height/2},
            {rect: rect2, text: text2, x: width/2, y: height/len},
            {rect: rect3, text: text3, x: width / len, y: height/len+height/len/2}
        );

        stage.addChild(rect, rect1,rect2, rect3,text1, text,text2,text3);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x:0, y: height/2},
            {rect: rect2, text: text2, x: width/2, y: height/len},
            {rect: rect3, text: text3, x: width / len, y: height/len+height/len/2}
        );
    },

    renderRectFour4(options,fn){

        let {stage,colors,width,height} = options,
            rect = new createjs.Shape(),
            len = 2;

        rect.graphics.beginFill(colors[0]).drawRect(1, 0, width/len -1, height/(len+1)-1);

        let rect1 = new createjs.Shape();
        rect1.graphics.beginFill(colors[1]).drawRect(1,height/(len+1)+1, width / len - 1, height/(len+1)-1);

        let rect2 = new createjs.Shape();
        rect2.graphics.beginFill(colors[2]).drawRect(1, height/(len+1)*2 +1, width / len - 1, height/(len+1)-1);

        let rect3 = new createjs.Shape();
        rect3.graphics.beginFill(colors[3]).drawRect(width / len + 2,0, width / len - 2, height);

        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / len/2   - 60;
        text.y = height /len/ 2-height /len/ 2/2;


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text1.x = width / len/2   - 60;
        text1.y = height / 2 ;


        let text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text2.x = width / len/2   - 60;
        text2.y = height / 6*5;


        let text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text3.x = width / len/ 2 * 3 - 60;
        text3.y = height / 2 ;


        this.bindDblClick(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x:0, y: height/3},
            {rect: rect2, text: text2, x: 0, y: height/3*len},
            {rect: rect3, text: text3, x: width / len, y: 0}
        );

        stage.addChild(rect, rect1,rect2, rect3,text1, text,text2,text3);

        stage.update();
        fn && fn(
            {rect: rect, text: text, x: 0, y: 0},
            {rect: rect1, text: text1, x:0, y: height/3},
            {rect: rect2, text: text2, x: 0, y: height/3*len},
            {rect: rect3, text: text3, x: width / len, y: 0}
        );
    },

    addLoadingHorText(width, height){
        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / 4 - 60;
        text.y = height / 2;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / 4 * 3 - 60;
        text1.y = height / 2;
        text1.name = 'text1';


        return {text, text1};
    },
    addLoadingVerText(width, height){
        let text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

        text.x = width / 2 - 60;
        text.y = height / 4;
        text.name = 'text';


        let text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
        text1.x = width / 2 - 60;
        text1.y = height / 4 * 3;
        text1.name = 'text1';


        return {text, text1};
    },
    bindDblClick(){
        Array.from(arguments).forEach(r=> {
            r.rect.on('dblclick', ()=> {
                window.showModal({
                    type: 0,
                    id: 'puzzle',
                    target: {rect: r.rect, text: r.text, x: r.x ||  0 , y: r.y ||  0}
                });
            });
            r.rect.on('mousedown',e=>{

                PubSub.publish('renderCanvas', 'renderRectLeftRight',r.rect);
            });
        });
    }
}

export default ShapeGenerater;