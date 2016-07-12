webpackHotUpdate(0,{

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(46), RootInstanceProvider = __webpack_require__(47), ReactMount = __webpack_require__(36), React = __webpack_require__(3); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	        value: true
	});

	__webpack_require__(283);

	var ShapeGenerater = {
	        renderRectLeftRight: function renderRectLeftRight(options, fn, target) {
	                //左右两侧的长方形。
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height);
	                rect.name = 'rect';

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).drawRect(width / 2 + 1, 0, width / 2 - 1, height);
	                rect1.name = 'rect1';

	                console.log(target);

	                if (target) {
	                        switch (target.name) {
	                                case 'rect':
	                                        rect.graphics.setStrokeStyle(2).beginStroke("#f00").beginFill(colors[0]).drawRect(0, 0, width / 2 - 1, height);
	                                        break;
	                                case 'rect1':
	                                        rect1.graphics.setStrokeStyle(2).beginStroke("#f00").beginFill(colors[1]).drawRect(width / 2 + 1, 0, width / 2 - 1, height);
	                                        break;
	                        }
	                }

	                var _addLoadingHorText = this.addLoadingHorText(width, height);

	                var text = _addLoadingHorText.text;
	                var text1 = _addLoadingHorText.text1;

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / 2, y: 0 });

	                stage.addChild(rect, rect1, text1, text);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / 2, y: 0 });
	        },
	        renderRectUpDown: function renderRectUpDown(options, fn) {
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                rect.graphics.beginFill(colors[0]).drawRect(0, 0, width, height / 2 - 1);
	                rect.name = 'left';

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).drawRect(0, height / 2 + 1, width, height / 2 - 1);
	                rect1.name = 'right';

	                var _addLoadingVerText = this.addLoadingVerText(width, height);

	                var text = _addLoadingVerText.text;
	                var text1 = _addLoadingVerText.text1;

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: 0, y: height / 2 + 1 });

	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: 0, y: height / 2 + 1 });

	                stage.addChild(rect, rect1, text, text1);
	                stage.update();
	        },
	        renderRectTilt: function renderRectTilt(options, fn) {
	                //
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                var scale = 3 / 5;
	                rect.graphics.beginFill(colors[0]).moveTo(0, 0).lineTo(width * scale - 1, 0).lineTo(width * (1 - scale), height).lineTo(0, height).closePath();

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).moveTo(width * scale + 1, 0).lineTo(width, 0).lineTo(width, height).lineTo(width * (1 - scale) + 1, height).closePath();

	                var _addLoadingHorText2 = this.addLoadingHorText(width, height);

	                var text = _addLoadingHorText2.text;
	                var text1 = _addLoadingHorText2.text1;

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width * scale + 1, y: 0 });

	                stage.addChild(rect, rect1, text1, text);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width * scale + 1, y: 0 });
	        },
	        renderRectBessel: function renderRectBessel(options, fn) {
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                var scale = .5;
	                rect.graphics.beginFill(colors[0]).moveTo(0, 0).lineTo(0, height * scale - 1).quadraticCurveTo(width * scale, height * (scale + .2), width, height * scale - 1).lineTo(width, 0).endStroke();

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).moveTo(0, height).lineTo(0, height * scale + 1).quadraticCurveTo(width * scale, height * (scale + .2), width, height * scale).lineTo(width, height).endStroke();

	                var _addLoadingVerText2 = this.addLoadingVerText(width, height);

	                var text = _addLoadingVerText2.text;
	                var text1 = _addLoadingVerText2.text1;

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: 0, y: height * scale + 1 });

	                stage.addChild(rect, rect1, text1, text);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: 0, y: height * scale + 1 });
	        },
	        renderRectThree1: function renderRectThree1(options, fn) {
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                var len = 3;

	                rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height);

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height);

	                var rect2 = new createjs.Shape();
	                rect2.graphics.beginFill(colors[2]).drawRect(width / len * 2 + 2, 0, width / len - 2, height);

	                var text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

	                text.x = width / len / 2 - 60;
	                text.y = height / 2;
	                text.name = 'text';

	                var text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text1.x = width / 2 - 60;
	                text1.y = height / 2;
	                text1.name = 'text1';

	                var text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text2.x = width / len / 2 * 5 - 60;
	                text2.y = height / 2;
	                text2.name = 'text2';

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: width / len * 2, y: 0 });

	                stage.addChild(rect, rect1, rect2, text1, text, text2);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: width / len * 2, y: 0 });
	        },
	        renderRectFour1: function renderRectFour1(options, fn) {
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                var len = 4;

	                rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height);

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height);

	                var rect2 = new createjs.Shape();
	                rect2.graphics.beginFill(colors[2]).drawRect(width / len * 2 + 2, 0, width / len - 2, height);

	                var rect3 = new createjs.Shape();
	                rect3.graphics.beginFill(colors[3]).drawRect(width / len * 3 + 2, 0, width / len - 2, height);

	                var text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

	                text.x = width / len / 2 - 60;
	                text.y = height / 2;
	                text.name = 'text';

	                var text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text1.x = width / len / 2 * 3 - 60;
	                text1.y = height / 2;
	                text1.name = 'text1';

	                var text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text2.x = width / len / 2 * 5 - 60;
	                text2.y = height / 2;
	                text2.name = 'text2';

	                var text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text3.x = width / len / 2 * 7 - 60;
	                text3.y = height / 2;
	                text3.name = 'text2';

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: width / len * 2, y: 0 }, { rect: rect3, text: text3, x: width / len * 3, y: 0 });

	                stage.addChild(rect, rect1, rect2, rect3, text1, text, text2, text3);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: width / len * 2, y: 0 }, { rect: rect3, text: text3, x: width / len * 3, y: 0 });
	        },
	        renderRectFour2: function renderRectFour2(options, fn) {
	                //
	                var stage = options.stage;
	                var colors = options.colors;
	                var width = options.width;
	                var height = options.height;
	                var rect = new createjs.Shape();
	                var len = 2;

	                rect.graphics.beginFill(colors[0]).drawRect(0, 0, width / len - 1, height / len - 1);

	                var rect1 = new createjs.Shape();
	                rect1.graphics.beginFill(colors[1]).drawRect(width / len + 1, 0, width / len - 1, height / len - 1);

	                var rect2 = new createjs.Shape();
	                rect2.graphics.beginFill(colors[2]).drawRect(0, height / len + 1, width / len - 1, height / 2);

	                var rect3 = new createjs.Shape();
	                rect3.graphics.beginFill(colors[3]).drawRect(width / len + 1, height / len + 1, width / len - 2, height / 2);

	                var text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

	                text.x = width / len / 2 - 60;
	                text.y = height / len / 2;

	                var text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text1.x = width / len / 2 * 3 - 60;
	                text1.y = height / 2 / len;

	                var text2 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text2.x = width / len / 2 - 60;
	                text2.y = height / 4 * 3;

	                var text3 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text3.x = width / len / 2 * 3 - 60;
	                text3.y = height / 4 * 3;

	                this.bindDblClick({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: 0, y: height / len }, { rect: rect3, text: text3, x: width / len, y: height / len });

	                stage.addChild(rect, rect1, rect2, rect3, text1, text, text2, text3);

	                stage.update();
	                fn && fn({ rect: rect, text: text, x: 0, y: 0 }, { rect: rect1, text: text1, x: width / len, y: 0 }, { rect: rect2, text: text2, x: 0, y: height / len }, { rect: rect3, text: text3, x: width / len, y: height / len });
	        },
	        addLoadingHorText: function addLoadingHorText(width, height) {
	                var text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

	                text.x = width / 4 - 60;
	                text.y = height / 2;
	                text.name = 'text';

	                var text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text1.x = width / 4 * 3 - 60;
	                text1.y = height / 2;
	                text1.name = 'text1';

	                return { text: text, text1: text1 };
	        },
	        addLoadingVerText: function addLoadingVerText(width, height) {
	                var text = new createjs.Text('双击上传图片', "20px Arial", '#fff');

	                text.x = width / 2 - 60;
	                text.y = height / 4;
	                text.name = 'text';

	                var text1 = new createjs.Text('双击上传图片', "20px Arial", '#fff');
	                text1.x = width / 2 - 60;
	                text1.y = height / 4 * 3;
	                text1.name = 'text1';

	                return { text: text, text1: text1 };
	        },
	        bindDblClick: function bindDblClick() {
	                Array.from(arguments).forEach(function (r) {
	                        r.rect.on('dblclick', function () {
	                                window.showModal({
	                                        type: 0,
	                                        id: 'puzzle',
	                                        target: { rect: r.rect, text: r.text, x: r.x || 0, y: r.y || 0 }
	                                });
	                        });
	                        r.rect.on('mousedown', function (e) {

	                                PubSub.publish('renderCanvas', 'renderRectLeftRight', r.rect);
	                        });
	                });
	        }
	};

	exports['default'] = ShapeGenerater;
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(48); if (makeExportsHot(module, __webpack_require__(3))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "shapes.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)(module)))

/***/ }

})