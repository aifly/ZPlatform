(function() {

	var funParabola = function(d, t, g) {
		var i = {
			speed: 166.67,
			curvature: 0.001,
			progress: function() {},
			complete: function() {}
		};
		var p = {};
		g = g || {};
		for (var v in i) {
			p[v] = g[v] || i[v]
		}
		var u = {
			mark: function() {
				return this
			},
			position: function() {
				return this
			},
			move: function() {
				return this
			},
			init: function() {
				return this
			}
		};
		var e = "margin",
			r = document.createElement("div");
		if ("oninput" in r) {
			["", "ms", "webkit"].forEach(function(b) {
				var a = b + (b ? "T" : "t") + "ransform";
				if (a in r.style) {
					e = a
				}
			})
		}
		var s = p.curvature,
			q = 0,
			o = 0;
		var k = true;
		if (d && t && d.nodeType == 1 && t.nodeType == 1) {
			var n = {},
				j = {};
			var h = {},
				m = {};
			var f = {},
				l = {};
			u.mark = function() {
				if (k == false) {
					return this
				}
				if (typeof f.x == "undefined") {
					this.position()
				}
				d.setAttribute("data-center", [f.x, f.y].join());
				t.setAttribute("data-center", [l.x, l.y].join());
				return this
			};
			u.position = function() {
				if (k == false) {
					return this
				}
				var b = document.documentElement.scrollLeft || document.body.scrollLeft,
					a = document.documentElement.scrollTop || document.body.scrollTop;
				if (e == "margin") {
					d.style.marginLeft = d.style.marginTop = "0px"
				} else {
					d.style[e] = "translate(0, 0)"
				}
				n = d.getBoundingClientRect();
				j = t.getBoundingClientRect();
				h = {
					x: n.left + (n.right - n.left) / 2 + b,
					y: n.top + (n.bottom - n.top) / 2 + a
				};
				m = {
					x: j.left + (j.right - j.left) / 2 + b,
					y: j.top + (j.bottom - j.top) / 2 + a
				};
				f = {
					x: 0,
					y: 0
				};
				l = {
					x: -1 * (h.x - m.x),
					y: -1 * (h.y - m.y)
				};
				q = (l.y - s * l.x * l.x) / l.x;
				return this
			};
			u.move = function() {
				if (k == false) {
					return this
				}
				var a = 0,
					b = l.x > 0 ? 1 : -1;
				var c = function() {
					var z = 2 * s * a + q;
					a = a + b * Math.sqrt(p.speed / (z * z + 1));
					if ((b == 1 && a > l.x) || (b == -1 && a < l.x)) {
						a = l.x
					}
					var w = a,
						A = s * w * w + q * w;
					d.setAttribute("data-center", [Math.round(w), Math.round(A)].join());
					if (e == "margin") {
						d.style.marginLeft = w + "px";
						d.style.marginTop = A + "px"
					} else {
						d.style[e] = "translate(" + [w + "px", A + "px"].join() + ")"
					}
					if (a !== l.x) {
						p.progress(w, A);
						window.requestAnimationFrame(c)
					} else {
						p.complete();
						k = true
					}
				};
				window.requestAnimationFrame(c);
				k = false;
				return this
			};
			u.init = function() {
				this.position().mark().move()
			}
		}
		return u
	};
	(function() {
		var b = 0;
		var c = ["webkit", "moz"];
		for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
			window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
			window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
		}
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(h, e) {
				var d = new Date().getTime();
				var f = Math.max(0, 16.7 - (d - b));
				var g = window.setTimeout(function() {
					h(d + f)
				}, f);
				b = d + f;
				return g
			}
		}
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(d) {
				clearTimeout(d)
			}
		}
	}());


	var doc = document;
	var canvas = doc.getElementById('canvas'),
		viewW = doc.documentElement.clientWidth,
		viewH = doc.documentElement.clientHeight;



	var ZmitiUtil = {
		init: function() {

			this.setSize();

			this.createLines();

			this.initCanvas();
			var dog = doc.getElementById('zmiti-dog');
			var parabola = funParabola(dog, doc.getElementById('zmiti-right-point'), {
				curvature: .001 + (1920 - innerWidth) / 1920 * .002
			});
			setTimeout(function() {
				dog.classList.add('small')
				parabola.init();
			}, 1000)


		},
		r: function(m, n) {
			return m + Math.random() * (n - m);
		},
		setSize: function() {
			canvas.width = viewW;
			canvas.height = viewH;
			var dog = doc.getElementById('zmiti-dog');
			dog.style.top = viewH / 2 - 220 + 'px'
			dog.style.left = viewW / 2 - 60 + 'px'
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
			var img1 = new Image();
			img1.src = './static/images/rocket1.png'
			img.onload = function(argument) {
				// body...
				var i = 0,
					j = 0,
					iNow = 0;

				setInterval(() => {
					context.clearRect(0, 0, canvas.width, canvas.height)
					if (i > 8) {
						i = 0
					}
					if (j > 7) {
						j = 0;
					}
					context.drawImage(img, 84 * i, 0, 84, 222, (viewW - 84) / 2, (viewH - 222) / 2, 84, 222);
					context.drawImage(img1, 168 * j, 0, 168, 206, (viewW - 840) / 2, (viewH - 550) / 2 + iNow, 168, 206);
					//iNow += 5;
					i++;
					j++;
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