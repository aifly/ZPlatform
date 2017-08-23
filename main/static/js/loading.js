(function() {
	var doc = document;
	var canvas = doc.getElementById('canvas'),
		viewW = doc.documentElement.clientWidth,
		viewH = doc.documentElement.clientHeight;

	function ZmitiPoint(option) {

		this.x = ZmitiUtil.r(100, viewW - 100);
		this.y = ZmitiUtil.r(-500, viewW - 100);
		this.speed = ZmitiUtil.r(1, 5);
		this.opacity = ZmitiUtil.r(.1, .5);
		this.stage = option.stage;
		this.r = ZmitiUtil.r(1, 2);

		this.draw();


	}

	ZmitiPoint.prototype = {
		constructor: ZmitiPoint,
		draw: function() {
			var point = new createjs.Shape();
			point.graphics.beginFill('rgba(255,255,255,' + this.opacity + ')').drawCircle(this.x, this.y, this.r)
			this.stage.addChild(point);
			this.stage.update();
			this.point = point;
			//this.point.shadow = new createjs.Shadow("#fff", 0, -5, 20);

		},
		move: function() {
			this.point.y += this.speed;
			this.stage.update();
		}
	};


	var ZmitiUtil = {
		init: function() {

			this.setSize();

			this.createLines();

			this.initCanvas()


		},
		r: function(m, n) {
			return m + Math.random() * (n - m);
		},
		setSize: function() {
			canvas.width = viewW;
			canvas.height = viewH;

			doc.getElementById('zmiti-dog').style.top = viewH/2 -300 +'px'
			doc.getElementById('zmiti-dog').style.left = viewW/2 -70 +'px'
		},

		createLines: function() {
			var html = '';
			for (var i = 0; i < 10; i++) {
				html += '<div style="animation-delay:' + this.r(1000, 2200) * i + 'ms;animation-duration:' + this.r(2, 4.5) + 's;left:' + (this.r(200, viewW - 200) | 0) + 'px;top:' + (this.r(-110, 20) - 300 | 0) + 'px" class="zmiti-loading-line"></div>'
			}
			doc.getElementById('zmiti-main-loading').innerHTML += html;
			canvas = doc.getElementById('canvas');
		},
		initCanvas: function() {
			var s = this;

			var html = '';

			for (var i = 0; i < 100; i++) {
				html += '<div style="animation-delay:' + this.r(0, 100) + 'ms;animation-duration:' + this.r(4, 8) + 's;opacity:' + this.r(.1, .6) + ';left:' + (this.r(100, viewW - 100) | 0) + 'px;top:' + (this.r(-110, viewH) - 300 | 0) + 'px" class="zmiti-point"></div>'
			}

			doc.getElementById('zmiti-main-loading').innerHTML += html;

			canvas = doc.getElementById('canvas');
			var context = canvas.getContext('2d');


			var img = new Image();
			img.onload = function(argument) {
				// body...
				var i = 0;
				setInterval(() => {
					context.clearRect(0, 0, canvas.width, canvas.height)
					if (i > 8) {
						i = 0
					}
					context.drawImage(img, 84 * i, 0, 84, 222, (viewW-84)/2, (viewH - 222)/2, 84, 222);
					i++;
				}, 40)
			}
			img.src = './static/images/rocket.png';

			return;



			/*	createjs.Ticker.addEventListener("tick", function() {

					points.forEach(function(p) {
						createjs.Tween.get(p.point, {
							loop: true
						}).to({
							y: viewH
						}, s.r(6000, 8000));
					})
					stage.update();
				});*/



		}
	};

	ZmitiUtil.init();



})();