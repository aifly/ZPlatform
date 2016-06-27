/**
 created by fly on 2016/2/23 0023
 */

import $ from 'jquery';
import './statices/css/index.min.css';
import cCenter from './statices/images/c-center.png';
import pc from './statices/images/pc.png';
import a from './statices/images/a.png';
import c from './statices/images/c.png';
import i from './statices/images/i.png';
import mobile from './statices/images/mobile.png';
import pad from './statices/images/pad.png';
import t from './statices/images/t.png';
import v from './statices/images/v.png';
import v1 from './statices/images/v1.png';
import zAi from './statices/images/z-ai.png';
import zE from './statices/images/z-e.png';
import zI from './statices/images/z-i.png';
import zM from './statices/images/z-m.png';
import zPs from './statices/images/z-ps.png';
import zT from './statices/images/z-t.png';
//console.log(cCenter,pc,a,c,i,mobile,pad,t,v,v1,zAi,zE,zI,zM,zPs,zT);


window.addEventListener('load', ()=> {
    let doc = document;

    let data = {
        viewWidth: doc.documentElement.clientWidth,
        viewHeight: doc.documentElement.clientHeight,
        loadingImgArr: [],
        main: $('#fly-main'),
        header: $('.fly-header'),
        canvas: $('#fly-stage')[0],
        userCanvas: $("#canvas")[0],
        pwdCanvas: $("#canvas-pwd")[0],
        username: $("input[name='username']"),
        password: $('input[type="password"]'),
        login: $('#login'),
        loginMask: $("#fly-main .fly-login-mask"),
        loginBtn: $(".btn-login"),
        regBtn: $(".btn-reg"),
        btnOK: $('#fly-main .login-btn span'),
        rayen: $(".button--rayen"),
        goToReg: $('#fly-main .go-to-reg'),
        goToLogin: $('#fly-main .go-to-login'),
        regBox: $('#fly-main .fly-reg-box'),
        loginBox: $('#fly-main .fly-login-box'),
        animationEnd: 'onwebkitanimationend' in window ? 'webkitAnimationEnd' : 'animationend',
        transitionEnd: 'onwebkittransitionend' in window ? 'webkitTransitionEnd' : 'transitionend',
        regType: $("#reg-type"),
        baseUrl: 'http://webapi.zmiti.com/v1/'
    };

    let utilMethods = {

        init(){
            let self = this;
            self.setDefault();

            window.addEventListener('resize', ()=> {
                self.setDefault(doc.documentElement.clientWidth);
                let size = self.setSize(doc.documentElement.clientHeight);
            });

            let [size,containerWidth,containerHeight,zHeight,borderRadius,zColor,dashOffset] = [self.setSize(), 600, 600, 100, 50, '#e4dbdc', 4];

            let canvas = document.getElementById('fly-stage'),
                stage = new createjs.Stage(canvas),
                centerContainer = new createjs.Container().set({
                    x: (size.width - containerWidth) / 2,
                    y: (size.height - containerHeight) / 2
                });

            //createjs.Touch.enable(stage);
            stage.enableMouseOver(10);
            //stage.mouseEnabled = true;
            stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

            let z1 = new createjs.Shape();
            z1.graphics.beginFill(zColor).setStrokeStyle(5).beginStroke('#fff').drawRoundRect(0, 0, containerWidth, zHeight, borderRadius).endFill();

            let z1_1 = new createjs.Shape().set({x: z1.x - dashOffset / 2, y: z1.y - dashOffset / 2});
            z1_1.dashCmd = z1_1.graphics.setStrokeDash([14, 10]).command;
            z1_1.graphics.setStrokeStyle(3).beginStroke('#aaaaaa').drawRoundRect(0, 0, containerWidth + dashOffset, zHeight + dashOffset, borderRadius).endFill();

            let z2 = new createjs.Shape().set({x: containerWidth, y: 0});
            z2.graphics.beginFill(zColor).setStrokeStyle(5).beginStroke('#fff').drawRoundRect(0, 0, containerHeight * 1.2, zHeight, borderRadius).endFill();
            z2.regX = containerWidth + 140;
            z2.regY = 50;
            z2.rotation = -45;

            let z2_1 = new createjs.Shape().set({x: z2.x - dashOffset / 2, y: z2.y - dashOffset / 2});
            z2_1.dashCmd = z2_1.graphics.setStrokeDash([14, 10]).command;
            z2_1.graphics.setStrokeStyle(3).beginStroke('#aaaaaa').drawRoundRect(0, 0, containerHeight * 1.2, zHeight + dashOffset, borderRadius).endFill();
            z2_1.regX = z2.regX;
            z2_1.regY = z2.regY;
            z2_1.rotation = -45;

            let z3 = new createjs.Shape().set({x: zHeight / 1.6, y: containerHeight - zHeight * 1.62});
            z3.graphics.beginFill(zColor).setStrokeStyle(5).beginStroke('#fff').drawRoundRect(0, 0, containerWidth, zHeight, borderRadius).endFill();

            let z3_1 = new createjs.Shape().set({x: z3.x - dashOffset / 2, y: z3.y - dashOffset / 2});
            z3_1.dashCmd = z3_1.graphics.setStrokeDash([14, 10]).command;
            z3_1.graphics.setStrokeStyle(3).beginStroke('#aaaaaa').drawRoundRect(0, 0, containerWidth + dashOffset, zHeight + dashOffset, borderRadius).endFill();

            let zFill1 = new createjs.Shape().set({y: 2});
            zFill1.graphics.beginFill(zColor).moveTo(containerWidth - 85, 0).lineTo(containerWidth - 175, zHeight - 6).lineTo(containerWidth - 32, zHeight - 6).lineTo(containerWidth, zHeight / 2).lineTo(containerWidth - 40, 0).endFill();//.drawRoundRect(containerWidth-180,0,150,zHeight-6,0);

            let zFill2 = new createjs.Shape().set({y: 2});
            zFill2.graphics.beginFill(zColor).moveTo(120, z3.y).lineTo(236, z3.y - 1).lineTo(140, z3.y + zHeight - 6).lineTo(120, z3.y + zHeight - 6).endFill();//.drawRect(120,z3.y,120,zHeight-6);

            let zFill3 = new createjs.Shape().set({y: 0});
            zFill3.graphics.beginFill("#fff").drawRect(containerWidth - 80, -1, 20, 3);

            let zFill4 = new createjs.Shape().set({y: 2});
            zFill4.graphics.beginFill("#fff").drawRoundRect(containerWidth - 185, zHeight - 6, 20, 3, 1);

            let zFill5 = new createjs.Shape().set({y: 2});
            zFill5.graphics.beginFill('#fff').drawRoundRect(230, z3.y - 5, 6, 6, 3);

            let zFill6 = new createjs.Shape().set({y: 2});
            zFill6.graphics.beginFill('#fff').drawRoundRect(120, z3.y + zHeight - 6, 20, 4, 0);

            let line1 = new createjs.Shape();
            line1.graphics.beginStroke('#bdb8b8').moveTo(containerWidth - 73, 3).lineTo(containerWidth - 162, zHeight - 6);

            let line2 = new createjs.Shape();
            line2.graphics.beginStroke('#bdb8b8').moveTo(228, z3.y + 3).lineTo(136, z3.y + zHeight - 6);

            let linearGradientRect1 = new createjs.Shape().set({x: 0, y: 35});
            linearGradientRect1.graphics.beginLinearGradientFill(["rgba(255,152,0,1)", "rgba(200,191,107,.1)"], [0, 1], 0, 0, 0, 200).drawRoundRect(0, 0, containerWidth - zHeight, zHeight * 1.1, 45);

            let linearGradientRect2 = new createjs.Shape().set({x: containerWidth + 92, y: -50});
            linearGradientRect2.graphics.beginLinearGradientFill(["rgba(171,157,187,1)", "rgba(156,169,194,.3)"], [0, 1], 0, 0, 0, 740).drawRoundRect(0, 0, containerWidth, zHeight * 1.1, 70);
            linearGradientRect2.regX = z2.regX;
            linearGradientRect2.regY = z2.regY;
            linearGradientRect2.rotation = -45;

            let linearGradientRect3 = new createjs.Shape().set({x: z3.x, y: containerHeight - zHeight - 50});
            linearGradientRect3.graphics.beginLinearGradientFill(["rgba(255,139,0,1)", "rgba(255,139,0,.1)"], [0, 1], 0, 0, 0, 170).drawRoundRect(0, 0, containerWidth, zHeight * 1.4, 45);


            let cloudImg = new createjs.Bitmap(cCenter).set({x: 400, y: 220});
            cloudImg.scaleX = .8;
            cloudImg.scaleY = .8;
            cloudImg.regX = 300;
            cloudImg.regY = 100;
            this.cloudImg = cloudImg;

            let shapeArr = [linearGradientRect1, linearGradientRect2, linearGradientRect3, z1, z1_1, z3, z3_1, z2, z2_1, zFill1, zFill2, zFill3, zFill4, zFill5, zFill6, line1, line2, cloudImg],
                lineArr = [],
                componentsArr = [],
                waitingComArr = [],
                deviceArr = [],
                imgArr = [a, v, i, t, v1, zAi, zE, zI, zM, zPs, zT];
            this.deviceArr = deviceArr,
                shapeArr.forEach(item=> {
                    centerContainer.addChild(item);
                });

            class Z1FlyLine {
                constructor(option) {
                    [this.sx, this.sy, this.height, this.hitX, this.hitY, this.regX, this.regY, this.color, this.index, this.rotation] = [...option];

                    this.draw();
                }

                draw() {
                    let shape = new createjs.Shape();
                    this.shape = shape;
                    shape.graphics.beginStroke(this.color || "#bab4b4").setStrokeStyle(1).moveTo(this.sx, this.sy).lineTo(this.sx, this.sy + this.height).endStroke();
                    [shape.regX, shape.regY, shape.rotation] = [this.regX, this.regY, this.rotation || 0];

                    centerContainer.addChildAt(shape, this.index || 8);
                }

                roll() {
                    if (!this.shape) {
                        return;
                    }
                    this.shape.x = this.shape.x + 1;

                    this.die();
                }

                die() {
                    if (this.shape.x >= this.hitX) {
                        centerContainer.removeChild(this.shape);
                        lineArr.shift();
                        this.shape = null;
                    }
                }
            }

            class Z2FlyLine extends Z1FlyLine {

                constructor(option, step = 1) {
                    super(option);
                    [this.rotation] = [...option];
                    this.name = self.getGuid();
                    this.step = step;
                }

                roll() {
                    if (!this.shape) {
                        return;
                    }
                    this.shape.x = this.shape.x - this.step;
                    this.shape.y = this.shape.y + this.step;

                    this.die()
                }

                delLine() {
                    lineArr.forEach((line, i)=> {
                        line.name === this.name && lineArr.splice(i, 1);
                    })
                }

                die() {
                    if (this.shape.y >= this.hitY) {
                        centerContainer.removeChild(this.shape);
                        this.delLine();
                        this.shape = null;
                    }
                }
            }

            class Components {
                constructor(option) {
                    let s = this;
                    s.src = option.img;
                    s.x = option.x;
                    s.y = option.y;
                    s.scale = option.scale;
                    s.w = 0;
                    s.h = 0;
                    s.regX = option.regX;
                    s.regY = option.regY;
                    let image = new Image();
                    image.onload = function () {
                        s.w = this.width * (s.scale || 1);
                        s.h = this.height * (s.scale || 1);
                    };
                    image.src = s.src;
                    this.image = image;
                    s.container = option.container || centerContainer;
                    s.draw();
                }

                draw() {

                }

                roll() {

                }
            }

            class ProduceCom extends Components {//加工的组件类。
                constructor(option = {x: 0, y: 0, scale: 1}) {
                    super(option);
                }

                draw() {
                    let img = new createjs.Bitmap(this.src).set({x: this.x, y: this.y, scale: 1});
                    this.img = img;
                    centerContainer.addChildAt(img, centerContainer.getChildIndex(cloudImg) - 1);
                }

                roll() {

                    if (!this.img) {
                        return;
                    }
                    centerContainer.setChildIndex(this.img, centerContainer.getChildIndex(cloudImg) - 1);
                    if (this.img.x <= containerWidth - 10 - this.w && !this.back) {
                        this.img.x += 1;
                    }
                    else {//开始转弯
                        this.back = true;
                        this.img.x -= .7;
                        this.img.y += .7;
                        if (this.img.y > 160) {
                            centerContainer.removeChild(this.img);
                            self.produce();
                            componentsArr.shift();
                            this.img = null;
                            this.image = null;
                        }
                    }

                }
            }

            let WaittingForProduceComPos = [
                {x: data.viewWidth * .05, y: data.viewHeight * .2},
                {x: data.viewWidth * .3, y: data.viewHeight * .50},
                {x: data.viewWidth * .22, y: data.viewHeight * .30},
                {x: data.viewWidth * .08, y: data.viewHeight * .50},
                {x: data.viewWidth * .20, y: data.viewHeight * .75},
                {x: data.viewWidth * .5, y: data.viewHeight * .08},
                {x: data.viewWidth * .80, y: data.viewHeight * .15},
                {x: data.viewWidth * .70, y: data.viewHeight * .46},
                {x: data.viewWidth * .93, y: data.viewHeight * .4},
                {x: data.viewWidth * .85, y: data.viewHeight * .75},
                {x: data.viewWidth * .5, y: data.viewHeight * .85},

            ]

            class WaittingForProduceCom extends Components {
                constructor(option) {
                    super(option);
                    let s = this;
                    [s.lifeX, s.lifeY, s.speedX, s.speedY, s.start, s.iNow, s.canMove, s.name, s.angle] =
                        [self.r(80, 100), self.r(60, 80), self.r(.08, .2), self.r(.1, .21), true, 0, false, self.getGuid(), 0];

                    /* s.x = s.left ? self.r(0, centerContainer.x) : self.r(centerContainer.x + containerWidth, data.viewWidth);
                     s.y = self.r(0, data.viewHeight);*/
                    s.left = s.x <= centerContainer.x;
                    s.id = WaittingForProduceCom.comId++;
                    s.iNow1 = 0;


                }


                starting() {

                    this.start = true;
                }

                stop() {
                    this.start = false;
                }

                draw() {
                    var bitMap = new createjs.Bitmap(this.src).set({
                        x: this.x,
                        y: this.y,
                        scaleX: this.scale,
                        scaleY: this.scale
                    });

                    bitMap.cursor = 'pointer';
                    this.img = bitMap;
                    bitMap.on("mousedown", e=> {
                        this.stop();
                        this.canMove = true;
                        bitMap.defaultX = bitMap.x;
                        bitMap.defaultY = bitMap.y;
                    });
                    bitMap.on('pressmove', e=> {
                        if (this.canMove && this.img) {

                            if (!this.one && bitMap.x + this.w > centerContainer.x && bitMap.x < centerContainer.x + zHeight
                                && bitMap.y + this.h > centerContainer.y - 20 && bitMap.y < centerContainer.y + zHeight) {
                                // self.comDanger(bitMap,stage);
                            }

                            let x = e.stageX - this.w / 2,
                                y = e.stageY - this.h / 2;
                            x < 0 && (x = 0);
                            y <= 0 && (y = 0);
                            x > data.viewWidth - this.w / 2 && (x = data.viewWidth - this.w);
                            y > data.viewHeight - this.h / 2 && (y = data.viewHeight - this.h);
                            this.img.x = x;
                            this.img.y = y;
                        }
                    });
                    bitMap.on("rollover", e=> {//鼠标移动到图片上面触发


                        this.stop();
                        bitMap.scaleX += .2;
                        bitMap.scaleY += .2;
                    });
                    bitMap.on("rollout", (e)=> {
                        bitMap.scaleX -= .2;
                        bitMap.scaleY -= .2;
                        this.starting();
                        if (!this.canMove) return;
                        if (bitMap.x + this.w > centerContainer.x && bitMap.x < centerContainer.x + zHeight
                            && bitMap.y + this.h > centerContainer.y - 20 && bitMap.y < centerContainer.y + zHeight) {
                            componentsArr.push(new ProduceCom({
                                img: this.src,
                                x: 0,
                                y: (zHeight - 10 - this.h) / 2,
                                scale: 1
                            }));

                            componentsArr.stop = true;
                            componentsArr.iNow = 0;


                            if (!this.left) {
                                min = containerWidth + containerWidth;
                                maxW = data.viewWidth - 100;
                            }
                            else {
                                min = 0;
                                maxW = centerContainer.x;
                            }

                            waitingComArr.push(new WaittingForProduceCom({
                                img: this.src,
                                x: bitMap.defaultX,
                                y: bitMap.defaultY,
                                scale: .8
                            }));
                            this.stop();
                            this.die(bitMap);

                        }
                        else {
                            this.canMove = false;
                            this.one = false;

                        }


                    });
                    stage.addChild(bitMap);
                }

                die(img) {//死亡
                    waitingComArr.forEach((com, i)=> {
                        com.name = img.name && (waitingComArr.splice(i, 1));
                    });
                    stage.removeChild(img);
                    this.img = null;
                }

                roll() {

                    let s = this;
                    if (!s.img) return;


                    if (s.start) {

                        s.img.x += s.speedX;
                        s.img.y += s.speedY;

                        s.img.x <= 0 && (s.speedX *= -1);
                        s.img.y <= 0 && (s.speedY *= -1);
                        s.img.y >= data.viewHeight - 100 && (s.speedY *= -1);

                        s.img.x > data.viewWidth - 100 && (s.speedX *= -1);

                        s.iNow++;
                        if (s.iNow >= s.lifeX) {
                            // s.life = self.r(s.life, s.life + 150)
                            s.iNow = 0;
                            ( s.speedX *= -1);
                        }
                        s.iNow1++;
                        if (s.iNow1 >= s.lifeY) {
                            s.iNow1 = 0;
                            (s.speedY *= -1);
                        }

                    }
                }
            }

            class DeviceCom extends Components {
                constructor(option) {
                    super(option);
                    [this.speedX, this.speedY, this.isStart] = [-1, 1, false];
                }

                draw() {//
                    let img = new createjs.Bitmap(this.src).set({x: this.x, y: this.y, scale: 1});
                    this.img = img;
                    this.img.regX = this.regX;
                    this.img.regY = this.regY;
                    this.img.scaleX = this.scale;
                    this.img.scaleY = this.scale;

                    centerContainer.addChildAt(img, centerContainer.getChildIndex(cloudImg) + 1);
                }

                ripe() {
                    createjs.Tween.get(this.img)
                        .to({scaleX: 1, scaleY: 1}, 700, createjs.Ease.elasticOut).call(()=> {
                        this.isStart = true;
                    });

                    return this;
                }

                roll() {
                    if (!this.img || !this.isStart) {
                        return;
                    }
                    this.img.x += this.speedX;
                    this.img.y += this.speedY;
                    if (this.img.y > z3.y + 30) {
                        this.speedY = 0;
                        this.speedX = 1;
                        if (this.img.x > containerWidth - 20) {
                            this.speedX = 0;
                            this.die();
                        }
                    }
                }

                die() {
                    centerContainer.removeChild(this.img);
                    this.img = null;
                    deviceArr.shift();
                }
            }
            this.DeviceCom = DeviceCom;

            this.deviceData = [
                {
                    img: pc,
                    x: containerWidth / 2 - 60,
                    y: containerWidth / 2,
                    regX: 60,
                    regY: 20,
                    scale: 0
                },
                {
                    img: pad,
                    x: containerWidth / 2 - 20,
                    y: containerWidth / 2,
                    regX: 30,
                    regY: 20,
                    scale: 0
                },
                {
                    img: mobile,
                    x: containerWidth / 2 - 20,
                    y: containerWidth / 2,
                    scale: 0,
                    regX: 10,
                    regY: 10
                }
            ]


            WaittingForProduceCom.comId = 0;

            for (let i = 2; i >= 0; i--) {
                let index = Math.floor(self.r(0, 10)),
                    height = index > 4 ? 55 : 70;
                componentsArr.push(new ProduceCom({
                    img: imgArr[index],
                    x: (i + 1) * 170,
                    y: (zHeight - 10 - height) / 2,
                    scale: 1
                }));
            }


            ///window.waitingComArr = waitingComArr;

            stage.addChild(centerContainer);


            componentsArr.push(new ProduceCom({
                img: imgArr[0],
                x: 0,
                y: (zHeight - 10 - 70) / 2,
                scale: 1
            }));


            let min = 0,
                maxW = centerContainer.x,
                maxH = data.viewHeight - 100;
            for (let i = 0; i < imgArr.length; i++) {
                if (i % 2 === 1) {
                    min = containerWidth + containerWidth;
                    maxW = data.viewWidth - 100;
                }
                else {
                    min = 0;
                    maxW = centerContainer.x;
                }
                waitingComArr.push(new WaittingForProduceCom({
                    img: imgArr[i],
                    /* x: self.r(min, maxW),
                     y: self.r(0, maxH),*/
                    x: WaittingForProduceComPos[i].x,
                    y: WaittingForProduceComPos[i].y,
                    scale: .8
                }));
            }


            for (let i = 10; i >= 0; i--) {

                lineArr.push(new Z1FlyLine([borderRadius * (i + 1), 4, zHeight - 8, containerWidth - 85 - borderRadius * (i + 1)]));
                lineArr.push(new Z1FlyLine([(borderRadius) * (i + 1) + 20, z3.y + 5, zHeight - 8, containerWidth - 58 - borderRadius * (i + 1) + 20, 4, '', '', '', centerContainer.getChildIndex(z2) - 1]));
            }
            for (let k = 0; k < 16; k++) {
                lineArr.push(new Z2FlyLine([363 - (13 * k) * 4, 374 + (12 * k) / 25, zHeight - 4, 0, z3.y - ( (34 * k)), '', '', '', centerContainer.getChildIndex(cloudImg) - 1, -45]));
            }


            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.on("tick", tick, this);


            let iNow = 0,
                iNow1 = 0;

            componentsArr.iNow = 0;

            function tick(evt) {

                z1_1.dashCmd.offset += 1;
                z2_1.dashCmd.offset += 1.47;
                z3_1.dashCmd.offset += 1;


                deviceArr.forEach(item=>item.roll());

                componentsArr.iNow++;
                if (componentsArr.iNow % 200 === 0 && !componentsArr.stop) {
                    componentsArr.iNow = 0;
                    let index = Math.floor(utilMethods.r(0, 10));
                    let height = index > 4 ? 55 : 70;
                    componentsArr.push(new ProduceCom({
                        img: imgArr[index],
                        x: 0,
                        y: (zHeight - 10 - height) / 2,
                        scale: 1
                    }));
                }
                else {

                    if (componentsArr.iNow % 200 === 0) {
                        componentsArr.stop = false;
                        componentsArr.iNow = 0;
                        let index = Math.floor(utilMethods.r(0, 10));
                        let height = index > 4 ? 55 : 70;
                        componentsArr.push(new ProduceCom({
                            img: imgArr[index],
                            x: 0,
                            y: (zHeight - 10 - height) / 2,
                            scale: 1
                        }));
                    }
                }

                componentsArr.forEach(c=>c.roll());
                waitingComArr.forEach(c=>c.roll());
                lineArr.forEach(item => item.roll());
                iNow++;
                if (iNow % 50 === 0) {
                    iNow = 0;
                    lineArr.push(new Z1FlyLine([borderRadius, 4, zHeight - 8, containerWidth - 85, 4]));
                    lineArr.push(new Z1FlyLine([borderRadius + 20, z3.y + 5, zHeight - 8, containerWidth - 65, 4, '', '', '', centerContainer.getChildIndex(z2) - 1]));
                }
                iNow1++;
                if (iNow1 % 35 === 0) {
                    //iNow1 = 0;
                    if (iNow1 === 35) {
                        this.line = this.line || new Z2FlyLine([363, 376, zHeight - 4, 0, z3.y, '', '', '', centerContainer.getChildIndex(cloudImg) - 1, -45], 1.03);
                        lineArr.push(this.line);
                    }
                    else {
                        iNow1 = 70;
                        lineArr.push(new Z2FlyLine([363, 376, zHeight - 4, 0, z3.y, '', '', null, centerContainer.getChildIndex(cloudImg) - 1, -45]));
                    }
                }
                stage.update(evt);


            }

            //  self.loginAction();
            self.domInit();
        },

        domInit(){


            data.goToReg.on("click", ()=> {
                data.loginBox.addClass('hide');
                data.regBox.addClass('show');
                $('.fly-reg-C').removeClass('active');
            });


            data.goToLogin.on('click', ()=> {
                data.loginBox.removeClass('hide');
                data.regBox.removeClass('show');
            });


            data.btnOK.on('mousedown', (e)=> { //开始登录
                if (data.username.val().length <= 0) {
                    $('.input-box').eq(0).addClass("error");
                    this.removeErrorInfo($('.input-box').eq(0))
                    return false;
                }
                if (data.password.val().length <= 0) {
                    $('.input-box').eq(1).addClass("error");
                    this.removeErrorInfo($('.input-box').eq(1));
                    return false;
                }

                $(e.target).addClass("shadow");

                let self = this;

                $.ajax({
                    url: data.baseUrl + "user/login_user",
                    type: "POST",
                    data: {
                        username: $("input[name='username']").val(),
                        userpwd: $("input[name='pwd']").val(),
                        userlogip: $("#keleyivisitorip").html()
                    },
                    success(d){
                        if (d.getret === 0) {
                            data.loginMask.removeClass('show');

                            document.cookie =  d.getusersigid;

//                            var domain = 'http://localhost:3000';



                          /*  var myPopup = window.open(domain + '/index.html','_self');

                           myPopup.postMessage('asd', domain);
*/


                            var a = document.createElement('a');
                            document.body.appendChild(a);

                            //a.href = 'http://localhost:3000/index.html';
                            a.href = 'http://www.zmiti.com/server/';
                            a.style.position = 'fixed';
                            a.style.zIndex = -1;
                            a.style.opacity = 0;
                            a.click();
                        }
                        else if(d.getret === 1300){
                            $(".login-error-info").addClass("fail");
                            self.removeErrorInfo($(".login-error-info"), "fail");
                            $(e.target).removeClass("shadow").removeClass("hide").parent().find('.loading').removeClass("show");
                        }
                        else if(d.getret === -101){
                            alert('系统错误！');
                        }
                    }
                });

            }).on('mouseup', (e)=> {
                if (data.username.val().length <= 0) {
                    return false;
                }
                if (data.password.val().length <= 0) {
                    return false;
                }
                $(e.target).removeClass("shadow").addClass("hide").parent().find('.loading').addClass("show");
            });

            data.loginBtn.on("click", ()=> {
                data.loginMask.addClass('show');
                setTimeout(()=> {
                    let aSpan = $('.input-box .placeholder');
                    this.triggerSinLine(aSpan);
                    data.username.trigger('focus')
                }, 300);
                data.loginBtn[0].btn = data.loginBtn[0].btn || 1;
                data.goToLogin.trigger("click");
                if (data.loginBtn[0].btn === 1) {
                    data.loginBtn[0].btn = 2;
                    this.loginAction();

                }
            });

            $('#green').on("change", (e)=> {

                successArr[e.target.checked ? 'add' : 'remove']('green');

                $('.btn-begin-reg')[successArr.length === (company === 1 ? 6 : 7) ? "removeClass" : "addClass"]('disabled')
            });

            $('.get-code input').on('blur', e=> {
                successArr[e.target.value.length > 0 ? 'add' : 'remove']('code');
            });


            let company = 1;

            $(".fly-get-code").on("click", ()=> {//发送验证码。
                let reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                if (!reg.test($('input[name="reg-email"]').val())) {
                    $('.fly-reg-input').eq(4).addClass("error");
                    this.removeErrorInfo($('.fly-reg-input').eq(4));
                    return false;
                }
                //开始获取验证码...

            });


            $('.btn-begin-reg').on('click', ()=> {//开始注册。
                let email = $('input[name="reg-email"]'),
                    vType = 'usermobile';

                if (email.val().indexOf('@') > -1) {
                    vType = 'useremail';
                }
                let dd = {
                    username: $('input[name="reg-username"]').val(),
                    userpwd: $('input[name="reg-pass"]').val(),
                    usertypesign: company,
                    companyname: $('input[name="reg-company"]').val()
                };
                dd.useremail = email.val().indexOf('@') > -1 ? email.val() : '';
                dd.usermobile = email.val().indexOf('@') > -1 ? '' : email.val();

                let pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                    reg = /^0?1[3|4|5|8][0-9]\d{8}$/;


                if (dd.username.length <= 0 || dd.username.length > 18) {
                    $(".fly-reg-input").eq(0).addClass('error');
                    this.removeErrorInfo($('.fly-reg-input').eq(0));
                    return;
                }

                if (company === 2 && dd.companyname.length <= 0) {
                    $(".fly-reg-input").eq(1).addClass('error');
                    this.removeErrorInfo($('.fly-reg-input').eq(1));
                    return false;
                }


                if (dd.userpwd.length < 6) {
                    $(".fly-reg-input").eq(2).addClass('error');
                    this.removeErrorInfo($('.fly-reg-input').eq(2));
                    return false;
                }

                if (dd.userpwd !== $('.sure-pass').val()) {
                    $('.fly-reg-input').eq(3).addClass("error");
                    this.removeErrorInfo($('.fly-reg-input').eq(3));
                    return false;
                }


                if (!pattern.test(dd[vType]) && !reg.test(dd[vType])) {

                    $('.fly-reg-input').eq(4).addClass("error");
                    this.removeErrorInfo($('.fly-reg-input').eq(4));
                    return false;
                }


                if (!$('#green')[0].checked) {
                    $('.agree-clause').addClass('error');
                    this.removeErrorInfo($('.agree-clause'));
                    return false;
                }
                ;

                $(".fly-reg-input").eq(2).removeClass('error');

                $(".reg-info").addClass('info').html('开始注册...');

                ///data.baseUrl='http://localhost:23627/v1/'
                $.ajax({
                    url: data.baseUrl + 'user/create_user/',
                    type: "POST",
                    data: dd,
                    success(d){
                        if (d.getret === 0) {//成功
                            //data.loginMask.removeClass('show');
                            data.goToLogin.trigger('click');
                            $(".reg-info").removeClass('info').addClass('success').html('恭喜你，注册成功~~~');
                        }
                        else if (d.getret === -2) {
                            if (d.username === 1) {
                                $(".reg-info").removeClass('success').addClass('info').html('用户名已存在~');
                            }
                            if (d.useremail === 1) {
                                $(".reg-info").removeClass('success').addClass('info').html('邮箱已存在~');
                            }
                            if (d.usermobile === 1) {
                                $(".reg-info").removeClass('success').addClass('info').html('该手机号已经被注册~');
                            }
                        }
                        else {
                            $(".reg-info").removeClass('info').addClass('fail').html(d.getmsg);
                        }
                        setTimeout(()=> {
                            $(".reg-info").removeClass('info success fail');
                        }, 2000)
                    }
                });


            });

            data.regBtn.on("click", ()=> {
                data.loginMask.addClass('show');

                data.regBtn[0].btn = data.regBtn[0].btn || 1;

                data.goToReg.trigger("click");
                $('.fly-reg-C').removeClass('active');
                if (data.regBtn[0].btn === 1) {
                    data.regBtn[0].btn = 2;
                    this.loginAction();
                }
            });

            ///  data.regBtn.trigger('click')


            data.regType.on('click', (e)=> {
                let index = $(e.target).parent('div').index();
                $('.company')[index === 1 ? 'removeClass' : 'addClass']('hide');
                company = index === 1 ? 2 : 1;
                $('div', data.regType).removeClass("active").eq(index).addClass('active');
            });

            $('.fly-reg-next').on('click', (e)=> {
                $('.fly-reg-C').addClass('active');
            });
            // data.regBtn.trigger('click');

            $('.error').on('click', function () {
                $(this).removeClass('error');
                $(this).find('input').trigger('focus');
            });

            $('.reg-input').on('focus', (e)=> {
                let $Target = $(e.target);
                $Target.parents('.fly-reg-input').removeClass('error');
                $Target.val().length <= 0 && $Target.siblings('.mark').addClass('blur')

            });


            $(".reg-input-company").on('blur', (e)=> {
                if ($(e.target).val().trim().length <= 0 || $(e.target).val().trim().length > 18) {
                    $(e.target).parents('.fly-reg-input').addClass("error");
                    this.removeErrorInfo($(e.target).parents('.fly-reg-input'));
                    successArr.remove("company");
                }
                else {
                    successArr.add("company");
                }

                // $(e.target).val().length <= 0 && $(e.target).siblings('.mark').removeClass('blur');
            });

            let successArr = [];
            window.successArr = successArr;
            Array.prototype.remove = function (item) {
                this.forEach((n, i)=> {
                    if (n === item) {
                        this.splice(i, 1);
                        return;
                    }
                })
            };

            Array.prototype.add = function (item) {
                let flag = false;
                this.forEach((n, i)=> {
                    if (n === item) {
                        flag = true;
                    }
                });
                if (!flag) {
                    this.push(item);
                }
            };

            $('input[name="reg-username"]').on('blur', (e)=> {
                if ($(e.target).val().trim().length < 6 || $(e.target).val().trim().length > 18) {
                    $(e.target).parents('.fly-reg-input').addClass("error");
                    this.removeErrorInfo($(e.target).parents('.fly-reg-input'))

                    successArr.remove("username");
                }
                else {
                    successArr.add("username");
                }

                $(e.target).val().length <= 0 && $(e.target).siblings('.mark').removeClass('blur');
            });

            $('input[name="reg-pass"]').on('focus', (e)=> {
                $(e.target).parents('.fly-reg-input').removeClass('error');
                $(e.target).val().length <= 0 && $(e.target).siblings('.mark').addClass('blur');
            }).on('blur', (e)=> {
                if ($(e.target).val().trim().length < 6) {
                    $(e.target).parents('.fly-reg-input').addClass("error");
                    this.removeErrorInfo($(e.target).parents('.fly-reg-input'))

                    successArr.remove("pass");
                }
                else {
                    successArr.add("pass");
                }

                //$(e.target).val().length <= 0 && $(e.target).siblings('.mark').removeClass('blur');
            });

            $('.sure-pass').on('focus', (e)=> {
                $(e.target).parents('.fly-reg-input').removeClass('error');
                $(e.target).val().length <= 0 && $(e.target).siblings('.mark').addClass('blur');
            }).on("blur", (e)=> {
                if ($(e.target).val() === $('input[name="reg-pass"]').val()) {
                    successArr.add("sure-pass");
                }
                else {
                    successArr.remove("sure-pass");
                    $(e.target).parents('.fly-reg-input').addClass("error");
                    this.removeErrorInfo($(e.target).parents('.fly-reg-input'))
                }
            });

            let pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
            $('input[name="reg-email"]').on('focus', (e)=> {
                $(e.target).parents('.fly-reg-input').removeClass('error');
                $(e.target).val().length <= 0 && $(e.target).siblings('.mark').addClass('blur');
            }).on('blur', (e)=> {
                if (!pattern.test($(e.target).val().trim()) && !reg.test($(e.target).val().trim())) {

                    $(e.target).parents('.fly-reg-input').addClass("error");
                    this.removeErrorInfo($(e.target).parents('.fly-reg-input'))
                    successArr.remove("email");
                }
                else {
                    successArr.add("email");
                }
                $(e.target).val().length <= 0 && $(e.target).siblings('.mark').removeClass('blur');
            });


            $(".fly-input").on("blur", ()=> {

                $('.btn-begin-reg')[successArr.length === (company === 1 ? 6 : 7) ? "removeClass" : "addClass"]('disabled')
            });

            $(".close").on('click', ()=> {
                data.loginMask.removeClass('show');
            });

            $(document).on('keydown', e=> {
                e.keyCode === 27 && data.loginMask.removeClass('show');
            });

        },

        checkReg(){

        },

        comDanger(bmp, stage){
            bmp.show = bmp.show || 123;
            if (bmp.show === 123) {
                bmp.show = 1;
                bmp.sourceRect = new createjs.Rectangle(0, 0, 125, 192);
                bmp = bmp.clone();
                //bmp.x += 230;
                let filters = [new createjs.BlurFilter(16, 16, 2)];
                let fx = this.getFXBitmap(bmp, filters, 0, 0, 125, 192);
                var tween = createjs.Tween.get(fx, {loop: true}).to({alpha: 1}, 2500).wait(1000).to({alpha: 0}, 2500);

                tween.on("change", function () {
                    bmp.alpha = 1 - Math.pow(fx.alpha, 3);
                });
                stage.addChild(bmp, fx);

            }


        },
        removeErrorInfo(obj, className = 'error'){
            setTimeout(()=> {
                obj.removeClass(className);
            }, 2000)
        },

        getFXBitmap(source, filters, x, y, w, h) {
            // cache the source, so we can grab a rasterized image of it:
            source.cache(x, y, w, h);

            // create a new Bitmap, using the source's cacheCanvas:
            var bmp = new createjs.Bitmap(source.cacheCanvas);

            // add the filters, and cache to apply them
            bmp.filters = filters;
            bmp.cache(0, 0, w, h);

            // offset the bmp's registration to account for the cache offset:
            bmp.regX = -x;
            bmp.regY = -y;
            bmp.x = source.x;
            bmp.y = source.y;
            bmp.alpha = 0;

            // uncache the source:
            source.uncache();

            return bmp;
        },
        produce(){//开始加工...
            let self = this;
            // self.cueLine.show();
            createjs.MotionGuidePlugin.install(createjs.Tween);
            createjs.Tween.get(this.cloudImg, {loop: false}, false)
                .to({scaleX: .5, scaleY: .5, rotation: 10}, 1200, createjs.Ease.elasticOut)
                .wait(200)
                .call(()=> {
                    createjs.Tween.get(this.cloudImg).to({
                        scaleX: .8,
                        scaleY: .8,
                        rotation: 0
                    }, 1000, createjs.Ease.elasticOut).call(()=> {
                        this.deviceArr.push(new this.DeviceCom(this.deviceData[2]).ripe());
                    });
                });
        },

        r(min, max, name){
            return name ? Math[name](min + (max - min) * Math.random()) : min + (max - min) * Math.random();
        },

        triggerSinLine(aSpan){
            aSpan.eq(0).css('transform', 'scale(.8) translate(-10px,-30px)');
            this.sinLine({
                canvas: data.userCanvas,
                input: data.username
            })
        },

        loginAction(){
            let all = data.login.find("*");
            let aSpan = $('.input-box .placeholder');
            data.username.on("focus", ()=> {
                if (data.username.val().length <= 0) {
                    this.triggerSinLine(aSpan)
                }

            }).on('blur', ()=> {
                if (data.username.val().length <= 0) {
                    aSpan.eq(0).css('transform', 'scale(1) translate(0,0)');
                    this.sinLine({

                        canvas: data.userCanvas,
                        input: data.username,
                        isBack: true
                    })
                }
            });


            data.password.on("focus", ()=> {
                if (data.password.val().length <= 0) {
                    aSpan.eq(1).css('transform', 'scale(.8) translate(-10px,-30px)');
                    this.sinLine({
                        canvas: data.pwdCanvas,
                        input: data.password
                    });
                }
                all.each((i, n)=> {
                    $(n).addClass("password")
                })

            }).on('blur', ()=> {
                all.each((i, n)=> {
                    $(n).removeClass("password")
                })

                if (data.password.val().length <= 0) {
                    aSpan.eq(1).css('transform', 'scale(1) translate(0,0)');
                    this.sinLine({
                        canvas: data.pwdCanvas,
                        input: data.password,
                        isBack: true
                    })
                }
            }).on('keydown', (e)=> {
                if (e.keyCode === 13) {
                    data.btnOK.trigger('mousedown');
                    data.btnOK.trigger('mouseup');
                }
                //data.btnOK.trigger('click');
            });
        },

        getGuid(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        sinLine(option = {isBack: false}){
            let canvas = option.canvas,
                isBack = option.isBack,
                input = option.input;

            canvas.width = $(canvas).parent().width();
            let context = canvas.getContext("2d"),
                width = canvas.width,
                height = canvas.height,
                m = Math,
                scale = 50,
                ang = 0,
                value = height * .6,
                deg = m.ceil(width / m.PI * 4),
                k = isBack ? -10 : 10;
            input.css("borderBottom", 'none');
            let t = setInterval(function () {
                ang += k;
                context.clearRect(0, 0, width, height);
                context.beginPath();
                for (var i = 0; i < deg; i++) {
                    context.lineTo(m.PI * i / 180 * scale, .3 * m.sin(m.PI * (i - ang) / 180) * scale / 2 + value);
                }
                context.stroke();
                if (m.abs(ang) > width) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.beginPath();
                    context.moveTo(0, value);
                    context.lineTo(width, value);
                    context.stroke();
                    clearInterval(t)
                }
            }, 18);
        },

        setSize(height = data.viewHeight, width = data.viewWidth){

            data.main.height(height - data.header.height());
            data.canvas.width = width;
            data.canvas.height = height - data.header.height();

            data.login.css({top: $('.fly-login-box').offset().top - data.login.height() - $('.fly-header').height() + 10})

            data.rayen.css({marginTop: (data.header.height() - 30) / 2});
            return {width, height};
        },
        setDefault(width = data.viewWidth){
            doc.getElementsByTagName('html')[0].style.fontSize = width / 10 + 'px';
        },
        addShadow(obj){
            obj.addClass('shadow');
            setTimeout(()=> {
                obj.removeClass('shadow');
            }, 200);
        }
    };
    utilMethods.init();
});

