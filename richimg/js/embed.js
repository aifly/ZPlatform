(function() {
    window.tlRequire = window.tlRequire || {};
    var d = window.tlRequire;
    var b = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var a = /([^\s,]+)/g;
    function c(g) {
        var f = g.toString().replace(b, "");
        var e = f.slice(f.indexOf("(") + 1, f.indexOf(")")).match(a);

        return e || []

    } (function(k) {
        var g = {};
        var i = function(m) {
            return {
                waitList: [],
                waitCount: 0,
                callback: null,
                definition: null,
                dependencies: null,
                async: null,
                id: m

            }

        };
        var h = function(o, n, m) {
            f(o, n, m, true)

        };
        var f = function(t, q, m, p) {
            p = p || false;
            g[t] = g[t] || i(t);
            var s = g[t];
            s.callback = m;
            s.dependencies = q;
            s.async = p;
            for (var o = 0; o < q.length; o++) {
                var n = q[o];
                if (!g[n]) {
                    g[n] = i(n)

                }
                var r = g[n];
                if (!r.definition) {
                    r.waitList.push(s);
                    s.waitCount++

                }

            }
            if (s.callback && s.waitCount === 0) {
                e(s)
            }

        };
        var j = function(r) {
            var p = c(r),
            o = [];
            for (var n = 0; n < p.length; n++) {
                var m = p[n];
                var q = g[m];
                l(q);
                e(q);
                o.push(q.definition)

            }
            return function() {
                r.apply(undefined, o)

            }

        };
        var l = function(o) {
            for (var m = 0; m < o.waitList.length; m++) {
                var n = o.waitList[m];
                n.waitCount--;
                if (n.callback && n.waitCount === 0) {
                    e(n)

                }

            }

        };
        var e = function(p) {
            var m = [];
            for (var o = 0; o < p.dependencies.length; o++) {
                var n = p.dependencies[o];
                var q = g[n];
                m.push(q.definition)

            }
            if (p.async) {
                m.push(function(s, r) {
                    if (s) {
                        p.definition = r;
                        l(p)

                    }

                });
                p.callback.apply(undefined, m)

            } else {
                p.definition = p.callback.apply(undefined, m);
                l(p)

            }

        };
        k.define = f;
        k.defineAsync = h;
        k.inject = j

    } (d))


} ());

tlRequire.define("EventDispatcher", [], 
function() {

    
    var a = function() {
        this._listeners = {}

    };
    a.prototype = {
        constructor: a,
        addListener: function(b, c) {
            if (!this._listeners[b]) {
                this._listeners[b] = []

            }
            this._listeners[b].push(c)

        },
        trigger: function(d, f) {
            var c = this._listeners[d],
            e;
            if (c) {
                e = c.slice(0);
                var b;
                for (b = 0; b < e.length; b++) {
                    e[b].call(this, f)

                }

            }

        },
        removeListener: function(d, e) {
            var c = this._listeners[d];
            if (c) {
                var b;
                for (b = 0; b < c.length; b++) {
                    if (c[b] === e) {
                        c.splice(b, 1);
                        break

                    }

                }

            }

        }

    };
    return a

});
tlRequire.define("abTest", ["hashing"], function(a) {
    var g = {};
    function d() {
        var k = 0;
        try {
            k = localStorage.getItem("tlJsUserId");
            if (!k) {
                k = Math.floor(Math.random() * 100);
                localStorage.setItem("tlJsUserId", k)

            }

        } catch(l) {}
        return k

    }
    var h = function(k, n, o, m) {
        var l = {
            start: n,
            end: o,
            variant: m

        };
        if (!g.hasOwnProperty(k)) {
            g[k] = []

        }
        g[k].push(l)

    };
    var i = function(k, m) {
        var n = g[k];
        var l;
        if (typeof n === "undefined") {
            return null

        }
        for (l = 0; l < n.length; l++) {
            var o = n[l];
            if ((o.start <= m) && (o.end >= m)) {
                return o.variant

            }

        }
        return null

    };
    var e = function(k, m) {
        var l = Math.abs(m ^ a.adler32(k)) % 100;
        return i(k, l)

    };
    var j = function(k) {
        return e(k, d())

    };
    var b = function(m) {
        var k = [];
        var l;
        for (l in g) {
            if (g.hasOwnProperty(l)) {
                var n = e(l, m);
                k.push({
                    testName: l,
                    variant: n

                })

            }

        }
        return k

    };
    var c = function() {
        return b(d())

    };
    var f = function() {
        g = {}

    };
    return {
        addBucket: h,
        variantForUser: j,
        activeTestsForUser: c,
        clear: f,
        internals: {
            variantForUserId: e,
            activeTestsForUserId: b,
            variantForUserBucketPoint: i

        }

    }

});
tlRequire.define("actionLogger", ["jQuery", "config", "eventCallback", "util", "abTest"], 
function(n, s, m, b, i) {
    var j = {};
    var d = {};
    var t = {};
    var k = {};
    var g = b.isTouchDevice;
    var e = (function() {
        var w = null;
        var u = null;
        function v(z, x) {
            var A = true;
            var y = new Date().getTime();
            if (u && !x) {
                if (y - u < 5000) {
                    A = false

                }

            }
            if (s.referer) {
                z.referer = s.referer

            }
            if (A) {
                if (w) {
                    clearTimeout(w);
                    w = null

                }
                w = setTimeout(function() {
                    n.getJSON(s.getApiBaseUrl() + "/api/internal/logActivity?callback=?", z)

                },
                200);
                if (!x) {
                    u = y

                }

            }

        }
        return v

    } ());
    function p(y, x) {
        var v = x[y];
        var u = new Date().getTime();
        var w = (v && (u - v < 5000)) ? false: true;
        return w

    }
    function a(w, u, z, B) {
        var v = p(w, d);
        if (!v) {
            return

        }
        var x = {
            event: "tagClick",
            scene: u,
            tag: w

        };
        m(z, x);
        var A = s.getApiBaseUrl();
        var y = {
            thing: w,
            sceneId: u,
            e: "click",
            referer: s.referer

        };
        n.getJSON(A + "/api/internal/logThingAccess?callback=?", y, B);
        d[w] = new Date().getTime()

    }
    function q(u, v) {
        if (g && !k[u]) {
            k[u] = true;
            return true

        }
        return v

    }
    function f(x, v, y) {
        var w = p(x, j);
        if (!w) {
            return

        }
        t[x] = new Date();
        var z = s.getApiBaseUrl();
        var u = q(v);
        setTimeout(function() {
            n.getJSON(z + "/api/internal/logThingAccess?callback=?", {
                thing: x,
                sceneId: v,
                e: "hover",
                referer: s.referer,
                dwell: u

            });
            var A = {
                event: "tagHover",
                scene: v,
                tag: x

            };
            m(y, A)

        },
        500);
        j[x] = new Date().getTime()

    }
    var l = function(w) {
        var x = w.data("entertime");
        if (x) {
            var y = (new Date()).getTime() - x;
            if (y > 250) {
                var v = w.find("img").attr("tl-scene-id");
                var u = q(v);
                if (v) {
                    setTimeout(function() {
                        n.getJSON(s.getApiBaseUrl() + "/api/internal/logSceneAccess?callback=?", {
                            time: y,
                            sceneId: v,
                            referer: s.referer,
                            dwell: u,
                            event: "scene.hover"

                        })

                    },
                    500)

                }
                w.removeData("entertime")

            }

        }

    };
    var c = function(w, v) {
        var u = w.trackingUrl;
        if (u) {
            u = u.replace("RANDOM", Math.floor(Math.random() * 1000000000));
            u = u.replace("[timestamp]", new Date().getTime());
            v.find("img.tlTracker").remove();
            v.append('<img class="tlTracker" src="' + u + '" style="position:absolute;width:1px;height:1px;top:0;left:0;">')

        }

    };
    var r = function(A) {
        var C = A.width();
        var z = Math.floor(C / 100) * 100;
        var E = Math.floor(A.height() / 100) * 100;
        var x = Math.floor(window.screen.width / 100) * 100;
        var y = Math.floor(window.screen.height / 100) * 100;
        var F = /iPad/.test(navigator.platform);
        var w = /iPhone/.test(navigator.platform);
        var B = F ? "iPad": w ? "iPhone": "unknown";
        var G = i.activeTestsForUser();
        var u = null;
        var v = navigator.userAgent.toLowerCase();
        if (v.indexOf("msie") !== -1) {
            u = "IE" + (parseInt(v.split("msie")[1]).toString())

        }
        G.push({
            testName: "r_imageWidth",
            variant: C.toString()

        });
        G.push({
            testName: "r_imageHeight",
            variant: A.height().toString()

        });
        G.push({
            testName: "r_imageWidthHundred",
            variant: z.toString()

        });
        G.push({
            testName: "r_imageHeightHundred",
            variant: E.toString()

        });
        G.push({
            testName: "r_screenWidth",
            variant: window.screen.width.toString()

        });
        G.push({
            testName: "r_screenHeight",
            variant: window.screen.height.toString()

        });
        G.push({
            testName: "r_screenWidthHundred",
            variant: x.toString()

        });
        G.push({
            testName: "r_screenHeightHundred",
            variant: y.toString()

        });
        G.push({
            testName: "r_mobileDevice",
            variant: B

        });
        G.push({
            testName: "r_ieVersion",
            variant: u

        });
        var D = JSON.stringify(G);
        return D

    };
    var o = function(w) {
        var v = w.find("img.thinglinkImage");
        var u = v.attr("tl-scene-id");
        if (u) {
            var x = v.tlImage("sceneData");
            c(x, w);
            setTimeout(function() {
                n.getJSON(s.getApiBaseUrl() + "/api/internal/logSceneAccess?callback=?", {
                    sceneId: u,
                    referer: s.referer,
                    event: "scene.view",
                    channelId: b.getChannelId(w)

                })

            },
            500)

        }

    };
    var h = function(v, u) {
        var w = t[v];
        if (w) {
            var x = (new Date()).getTime() - w;
            if (x > 250) {
                if (u) {
                    setTimeout(function() {
                        n.getJSON(s.getApiBaseUrl() + "/api/internal/logThingAccess?callback=?", {
                            time: x,
                            sceneId: u,
                            thing: v,
                            e: "hoverend",
                            referer: s.referer

                        })

                    },
                    500)

                }
                t[v] = null

            }

        }

    };
    return {
        calcABTestString: r,
        logActivity: e,
        logHoverTime: l,
        logHoverEnd: h,
        logClick: a,
        logHover: f,
        logSceneView: o,
        installTracker: c

    }

});
tlRequire.define("adMatcher", [], 
function() {
    function b() {
        var c = ["1.\\d+.\\d+.\\d+", "127.0.0.\\d+", "localhost", "46.45.138.126", "abs.twimg.com", "ad.doubleclick.net", "ad.flatmaids.de", "ad.zanox.com", "ad.adriver.ru", "ad.admitad.com", "ad.dumedia.ru", "ad.linksynergy.com", "ad-cdn.technoratimedia.com", "ad\\d.adfarm1.adition.com", "ad1.emediate.dk", "ad.retargeter.com", "adsfac.eu", "adfarm.mediaplex.com", "adfile.tattermedia.com", "admax.quisma.com", "admeta.vo.llnwd.net", "adscale.nuggad.net", "adserver.wesee.com", "ads.foodbuzz.com", "ads.giovannicintolo.com", "ads.guava-affiliate.com", "ads.heias.com", "ads.jetpackdigital.com", "ads.nelly.com", "ads.newtentionassets.net", "ads.studentmedia.ucla.edu", "ads.thinglink.com", "ads.jetpackdigital.com", "adtag.neodatagroup.com", "adtracker.meinungsstudie.de", "aka-cdn-ns.adtech.de", "ads\\d.unitymedia.de", "analytics.sanoma.fi", "analytics.spongecell.com", "api.zanox.ws", "api.here.com", "ariel1.spaceprogram.com", "asn.advolution.de", "as.aug.me", "avatars.scribblelive.com", "b.aol.com", "b.kavanga.ru", "b.thebestlinks.com", "b.scorecardresearch.com", "bid.openx.net", "brandnamic.adclear.net", "brightcove.vo.llnwd.net", "bs.serving-sys.com", "cas.criteo.com", "cepep.co", "cdn.flashtalking.com", "c.statcounter.com", "counters.gigya.com", "cdn\\d*.gigya.com", "counter.rambler.ru", "creatives.klikki.com", "cxpfy.com", "d.shareaholic.com", "delatv.com", "d1.openx.org", "delivery.ctasnet.com", "engine.adzerk.net", "fapp.im", "fraction8.com", "geo.yahoo.com", "getpocket.com", "g.doubleclick.net", "gravatar.com", "\\w+.gmads.mookie1.com", "hits.e.cl", "i-cdn.servedbyopenx.com", "imp\\w?\\w?.tradedoubler.com", "imagesrv.adition.com", "img-cdn.mediaplex.com", "pictela.net", "jptracking.elasticbeanstalk.com", "\\w+.googleapis.com", "khm\\d.google.com", "l.betrad.com", "\\w+.lijit.com", "links.es", "leerya.net", "\\d+.maps.nlp.nokia.com", "mdsad.com", "mt\\d.googleapis.com", "malvin.tv", "maps.googleapis.com", "next.playad.se", "notici.me", "notifreak.com", "networkanalytics.net", "oas.theblondesalad.com", "otile\\d.mqcdn.com", "pagead\\d.googlesyndication.com", "paypal.com", "peliculasid.biz", "pictela.net", "pixel.wp.com", "pulsemaps.com", "readitlaterlist.com", "remnant.fmpub.net", "reports.wizebar.com", "s0.2mdn.net", "s\\d+.adform.net", "s\\d+.addthis.com", "s\\d+.shinystat.com", "stats.wordpress.com", "sitemeter.com", "sm\\d+.sitemeter.com", "tag.admeld.com", "t.qservz.com", "t.socialgrowthtechnologies.com", "tags.bluekai.com", "tessera\\d+.intellicast.com", "tile.openstreetmap.org", "\\w+.tile.openstreetmap.org", "track.adform.net", "track.admaxim.com", "tracking.hubspot.com", "traffic.shareaholic.com", "trk.lqw.me", "trk-\\w+.tidaltv.com", "us-ads.openx.net", "view.adtraxx.de", "videosomg.com", "widgets.kiosked.com", "w.uptolike.com", "www.ftjcfx.com", "www.getfreebacklinks.com", "www.google.com", "www.w3counter.com", "www\\d+.a8.net", "www.divxatope.com", "www.etracker.de", "www.callefina.com", "www.googleadservices.com", "www.google-analytics.com"];
        return new RegExp("//(" + c.join("|").replace(".", "\\.") + ")")

    }
    var a = b();
    return a

});
tlRequire.define("animUtil", ["jQuery"], 
function(b) {
    function a(e, c, d, f) {
        if (f === undefined) {
            f = "easeOutCubic"

        }
        if (d === undefined) {
            d = 100

        }
        if ((c.length > 30) || typeof(document.addEventListener) === "undefined") {
            if (e === "show") {
                c.show()

            } else {
                c.hide()

            }

        } else {
            c.stop(true, true);
            if (e === "show") {
                c.fadeIn(d, f)

            } else {
                c.fadeOut(d, f)

            }

        }

    }
    return {
        variateOpacity: a

    }

});
tlRequire.define("browserFeats", ["jQuery"], 
function(a) {
    var b = (function() {
        var f = null;
        var g = null;
        var e = function(h) {
            var i = false;
            h(function(j) {
                i = true

            });
            return i

        };
        var c = function() {
            if (f === null) {
                f = e(function(h) {
                    var j = a("html"),
                    i = j[0];
                    j.bind("DOMAttrModified", h);
                    i.setAttribute("___test___", true);
                    i.removeAttribute("___test___");
                    j.unbind("DOMAttrModified")

                })

            }
            return f

        };
        var d = function() {
            if (g === null) {
                g = e(function(h) {
                    var i = a("html");
                    i.bind("DOMNodeInserted", h);
                    a("<span />").appendTo(a("body")).remove();
                    i.unbind("DOMNodeInserted")

                })

            }
            return g

        };
        return {
            hasDomAttrModified: c,
            hasDomNodeInserted: d

        }

    } ());
    return b

});
tlRequire.define("bubbleRenderer", ["jQuery", "config", "util", "cssUtil", "postMessageManager", "customization"], 
function(i, b, e, j, g, d) {
    function c(o, q, p) {
        var l;
        if (q.indexOf("<") !== -1) {
            l = i("<p>" + q + "</p>").text().length

        } else {
            l = q.length

        }
        var m = 0;
        if (l < 50) {
            m = 100 + l

        } else {
            m = 100 + (l / 2.5);
            if (m > 350) {
                m = 350

            }
            if (l > 300) {
                o.addClass("tlLongDescription")

            } else {
                if (l > 100) {
                    o.addClass("tlSemiLongDescription")

                }

            }

        }
        var n = j.parseCssText(o.attr("style"), false, false);
        if (p < m) {
            m = p

        }
        n["min-width"] = m + "px";
        o.css({
            cssText: e.mapToCssText(n, true)

        })

    }
    function a(l) {
        return l.charAt(0).toUpperCase() + l.slice(1)

    }
    function h(m) {
        var l = new RegExp("^[\u0000-\u001F\\s]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]");
        return !! m && m.match(l)

    }
    function k(m, q, s, p) {
        var l = new RegExp("([^.]+\\.(?:co\\.)?[a-z]{2,7})$"),
        n,
        u,
        t = (s && s.openlink) || "AUTO";
        try {
            n = l.exec(window.location.hostname)[0]

        } catch(o) {
            n = window.location.hostname

        }
        if (t === "NEW") {
            u = false

        } else {
            if (t === "SAME") {
                u = true

            } else {
                if (t === "NONE") {
                    if (q) {
                        q()

                    }
                    return

                } else {
                    u = new RegExp("(^https?://(?:[^/]*)|&url=http[^&]+)" + n).test(m) || (m.indexOf("://") === -1)

                }

            }

        }
        if (u && p) {
            if (!q) {
                window.location.assign(m)

            } else {
                q(function() {
                    window.location.assign(m)

                })

            }

        } else {
            if (q) {
                q()

            }
            window.open(m)

        }

    }
    function f(x, L, p) {
        var I;
        var P;
        var l;
        var O,
        z;
        var J;
        var u;
        var v = x.thingUrl || "";
        var C = "tl-a-" + x.id;
        var t = i(window).width() - 30;
        var y = i(window).height() - 60;
        var w = t - 15;
        var q = y - 14;
        if (x.productName.indexOf("\n") !== -1) {
            x.productName = x.productName.replace(/\n\n+/g, "\n\n").replace(/\n/g, "<br>")

        }
        var D = h(x.productName) ? "tlRtl": "";
        if (x.theme === "iframe") {
            var H = x.iWidth;
            var s = x.iHeight;
            l = g.prepareAndGetParameters(x.contentUrl);
            P = l.srcPmParams;
            I = l.rtid;
            var M = '<iframe class="tlIframe" allowTransparency="true" name="rmt-' + x.id + '" scrolling="auto" src="' + x.contentUrl + P + '" style="width:' + H + "px !important; height:" + s + "px !important;max-width: " + w + "px!important; max-height:" + q + 'px!important;" frameBorder="0"></iframe>';
            var G;
            if (x.productName != null && x.productName.length > 0) {
                G = '<div class="tlIframeDescription ' + D + '">';
                G += x.productName;
                G += "</div><hr>"

            } else {
                G = ""

            }
            J = i('<div class="tlThingText" id="' + C + '" style="max-width:' + t + "px!important; max-height:" + y + 'px!important;"><div class="tlThingClose"></div><div class="tlThingContent" style="max-width:' + t + "px!important; max-height:" + y + 'px!important;">' + G + '<div class="tlSpinner" style="width:' + H + "px!important;height:" + s + 'px!important;"></div></div><div class="tlArrowWrapper"><div class="tlArrow"></div></div></div>');
            z = function() {
                var S = J.find(".tlThingContent > .tlSpinner");
                var R = S.find(".tlIframe");
                if (R.size() === 0) {
                    R = i(M);
                    R.css("opacity", "0");
                    var Q = H <= w ? H: w;
                    if (S.length === 0) {
                        J.find(".tlThingContent").append(R)

                    } else {
                        if (S.is("div")) {
                            S.append(R)

                        }

                    }
                    J.find(".tlThingContent").css("cssText", "width:" + Q + "px!important;");
                    R.load(function() {
                        J.addClass("iframeLoaded");
                        R.addClass("loaded");
                        S.css({
                            width: R.css("width"),
                            height: R.css("height")

                        });
                        var T = x.styles;
                        if (!x.styles) {
                            T = i("." + C).data("tlStyles") || {}

                        }
                        d.applyNewStyles(J, T, e.getSourceDomain(x.contentUrl));
                        setTimeout(function() {
                            R.fadeTo(300, 1)

                        },
                        300);
                        R.unbind("load")

                    });
                    if (window.ActiveXObject || "ActiveXObject" in window) {
                        R.attr("src", R.attr("src"))

                    }

                }

            };
            O = function(Q, S, R) {
                k(Q, R, x, window.top == window.self)

            }

        } else {
            if (x.theme === "rich") {
                var n = !e.no(x.icon) ? x.icon: "";
                var E = !e.no(x.title) ? x.title: "";
                if (x.productName) {
                    E = x.productName

                } else {
                    if (!e.no(x.title)) {
                        E = x.title

                    } else {
                        E = ""

                    }

                }
                E = '<span class="tlThingTitle">' + E + "</span>";
                if (!x.productName && !e.no(x.subTitle)) {
                    E = '<span class="tlThingSubTitle">' + x.subTitle + "</span><br />" + E

                }
                var o = "";
                var K;
                if (n) {
                    K = '<div class="tlVideoIconWrapper"><img class="tlThingIcon" src="' + n + '"/></div>'

                } else {
                    K = '<div class="tlThingIcon"></div>'

                }
                var B = "";
                if (!e.no(x.site)) {
                    B = x.site;
                    if (!e.no(x.siteUrl)) {
                        B = '<a href="' + x.siteUrl + '">' + B + "</a>"

                    }
                    B = '<div class="tlThingFooter">' + B + "</div>"

                }
                var m = "";
                if ("NONE" === x.openlink) {
                    m = "defaultCursor"

                }
                J = i('<div class="tlThingText" id="' + C + '"><div class="tlThingClose"></div><div class="tlThingContent" style="max-width:' + t + "px!important; max-height:" + y + 'px!important">' + o + '<div class="tlNonplayingContent ' + D + '"style="max-width:' + t + "px!important; max-height:" + y + 'px!important;"><div class="tlThumbnail ' + m + '"style="important;max-width:' + t + "px!important; max-height:" + y + 'px!important;">' + K + '<div class="tlThumbnailOverlay"></div></div><span class="tlCenteringOuter"><span class="tlCenteringMiddle"><span class="tlCenteringInner ' + D + '">' + E + "</span></span></span></div>" + B + '</div><div class="tlArrowWrapper"><div class="tlArrow"></div></div></div>');
                if (x.contentUrl) {
                    l = g.prepareAndGetParameters(x.contentUrl);
                    P = l.srcPmParams;
                    I = l.rtid

                }
                O = function(Q, W, V) {
                    if (V) {
                        V()

                    }
                    if (J.hasClass("whitelabel") && (x.openlink === "AUTO" || x.openlink === "NONE")) {
                        return

                    }
                    if (x.contentUrl && J.find(".tlSpinner").length === 0) {
                        i(".tlThingClose").not(J.find(".tlThingClose")).mouseup();
                        var R = i(window).width();
                        var X = x.iWidth;
                        var U = x.iHeight;
                        if (X > (R - 26)) {
                            var T = X / (R - 26);
                            X = X / T;
                            U = U / T

                        }
                        var S = i('<iframe class="tlSpinner tlRichIframe" webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling="auto" src="' + x.contentUrl + P + '" style="width:' + X.toString() + "px !important; height:" + U.toString() + 'px !important;" frameBorder="0"></iframe>');
                        J.find(".tlThingContent").append(S);
                        J.addClass("tlPlaying tlSticky");
                        p(W);
                        setTimeout(function() {
                            W.closest(".tlImageContainer").addClass("mouseover")

                        },
                        0)

                    } else {
                        J.find(".tlThingClose").mouseup();
                        if (Q.indexOf("http") === 0) {
                            k(Q, false, x, window.top == window.self)

                        } else {
                            window.location = Q

                        }

                    }

                }

            } else {
                var r = !e.no(x.title) ? x.title: "";
                var N = "";
                if (r !== "") {
                    if (x.productName !== "") {
                        N += "<br />"

                    }
                    N += '<a class="tlThingLink" href="' + v + '">' + r + "</a>"

                }
                u = x.productName;
                J = i('<div class="tlThingText" id="' + C + '" style="max-width:' + t + "px!important;max-height:" + y + 'px!important;""><div class="tlThingClose"></div><div class="tlThingContent ' + D + '" style="max-width:' + t + "px!important; max-height:" + y + 'px!important;">' + u + N + '</div><div class="tlArrowWrapper"><div class="tlArrow"></div></div></div>');
                O = function(Q, S, R) {
                    k(Q, R, x, window.top == window.self)

                };
                c(J, u, t)

            }

        }
        var F = "";
        if (!e.no(x.theme)) {
            F += " tlTheme" + a(x.theme) + "Thing"

        }
        if (!e.no(x.variant)) {
            F += " tlVariant" + a(x.variant) + "Thing";
            if (x.variant == "image" && L && v.indexOf(b.getBaseUrl() + "/scene/") != -1) {
                F += " whitelabel"

            }

        }
        J.addClass(F);
        var A = {
            rtid: I,
            clickHandler: O,
            hoverHandler: z

        };
        J.data("bubbledata", A);
        return J

    }
    return {
        render: f,
        setBubbleTagTextStyle: c,
        relocateOrOpen: k

    }

});
tlRequire.define("callbackManager", [], 
function() {
    var a = (function() {
        var b = {};
        return {
            runAfter: function(c, d) {
                if (b[c] && b[c].length === 0) {
                    d()

                } else {
                    if (!b[c]) {
                        b[c] = [d]

                    } else {
                        b[c].push(d)

                    }

                }

            },
            triggerEvent: function(c) {
                if (b[c]) {
                    while (b[c].length > 0) { (b[c].shift())()

                    }

                } else {
                    b[c] = []

                }

            }

        }

    } ());
    return a

});
tlRequire.define("config", ["namespace", "util"], 
function(c, d) {
    function g() {
        var o = "http://thinglink.local:8080/thinglink",
        l = "https://thinglink.local:8443/thinglink",
        n = "https://localhost:8000",
        m = "https://localhost:8000";
        if (a.address.charAt(0) == "@") {
            a.address = o;
            a.clientId = "666666666"

        }
        if (a.videoAddress.charAt(0) == "@") {
            a.videoAddress = n

        }
        if (a.sslVideoAddress.charAt(0) == "@") {
            a.sslVideoAddress = m

        }
        if (a.sslAddress.charAt(0) == "@") {
            a.sslAddress = l

        }
        if (a.embedAddress.charAt(0) == "@") {
            a.embedAddress = o

        }
        if (a.staticAddress.charAt(0) == "@") {
            a.staticAddress = o

        }
        if (a.staticSslAddress.charAt(0) == "@") {
            a.staticSslAddress = l

        }
        if (a.staticAddress.charAt(0) == "/") {
            a.staticAddress = d.getProtocol() + a.staticAddress

        }
        if (a.cssNonce.toString().charAt(0) == "@") {
            a.cssNonce = Math.round(Math.random() * Math.pow(10, 8))

        }

    }
    var a = d.extend({
        address: "http://www.zmiti.com",
        sslAddress: "https://www.zmiti.com",
        videoAddress: "https://video.zmiti.com",
        sslVideoAddress: "https://video.zmiti.com",
        staticAddress: "//cdn.zmiti.me",
        staticSslAddress: "https://cdn.zmiti.me",
        embedAddress: "//cdn.zmiti.me",
        cssNonce: "334114934665",
        clientId: "310115790974091265",
        fbAppId: "163019823751039",
        wlFbAppId: "448074751917449",
        usePromotionBanner: false,
        minWidth: 130,
        minHeight: 130,
        activateImage: function(l) {
            $tlJQ(l).tlImage("scrollTo")

        },
        initAfterLoad: true,
        showPoweredBy: true,
        eventManager: false,
        disableContextMenu: false,
        fourDotsInfo: true,
        vOverflow: null,
        hOverflow: null,
        referer: undefined,
        nubbinSneakPeek: true,
        makeNubbinsSticky: false,
        makeSidebarSticky: false,
        extraSidebarIcons: [],
        preventNavigation: false,
        disableMenuItems: false,
        forceSecure: false,
        initialNubbinShowDuration: 5000,
        eventCallback: null,
        language: null,
        manualViewStats: false,
        highlightCallback: null

    },
    c.config);
    g();
    if (window.location.search.indexOf("thinglinkLocal") !== -1) {
        var k = "www.thinglink.com";
        a.address = "http://" + k;
        a.sslAddress = "https://" + k

    }
    function e() {
        return ("https:" == document.location.protocol) ? a.sslAddress: a.address

    }
    function i() {
        return a.sslAddress

    }
    function j() {
        return ("https:" == document.location.protocol) ? a.sslVideoAddress: a.videoAddress

    }
    function f() {
        return ("https:" == document.location.protocol) ? a.staticSslAddress: a.staticAddress

    }
    function h() {
        var n = e();
        if (window.top !== window) {
            return false

        }
        var m = window.location.href;
        return m.indexOf(n) != -1

    }
    function b(l) {
        if (!a.language && l) {
            a.language = l

        }

    }
    a.getCDNUrl = f;
    a.getBaseUrl = e;
    a.getApiBaseUrl = i;
    a.getBaseVideoUrl = j;
    a.isThinglinkSite = h;
    a.setRequestLanguage = b;
    c.config = a;
    return a

});
tlRequire.define("cssInjector", ["jQuery", "config"], 
function(c, a) {
    function b(i, f, g) {
        var h = "";
        if (g) {
            h = ' media="screen"'

        }
        if (c("head").has("#" + i).length === 0) {
            var e = c('<link id="' + i + '" type="text/css" rel="stylesheet" href="' + f + '"' + h + "></link>").appendTo(c("head"));
            if (typeof(document.addEventListener) === "undefined") {
                e.attr({
                    href: f,
                    rel: "stylesheet",
                    type: "text/css",
                    id: i

                })

            }

        }

    }
    function d() {
        if (!document.getElementById("tlInjectedCss")) {
            b("tlInjectedCss", a.getCDNUrl() + "/jsec/" + a.cssNonce + "/embed.css");
            if (typeof(document.addEventListener) === "undefined") {
                b("tlInjectedIeCss", a.getCDNUrl() + "/jsec/" + a.cssNonce + "/embed-ie.css")

            }

        }

    }
    return {
        injectEmbedCSS: d,
        addExternalCss: b

    }

});
tlRequire.define("cssUtil", ["jQuery", "util"], 
function(d, a) {
    function c(h, k, j) {
        var e = {};
        if (!h) {
            return e

        }
        var g = h.split(";"),
        n,
        p,
        o,
        l,
        f;
        for (n = 0; n < g.length && (g[n] !== false); n++) {
            l = g[n].match(/^ *([^: ]+) *: *(.*)$/);
            if (l) {
                p = l[1];
                if (k) {
                    f = l[2].match(/^([\d.]+) *(?:px *(?:! *important)? *)?$/i);
                    if (f) {
                        o = f[1]

                    }

                }
                if ((k && !f) || !k) {
                    o = d.trim(l[2]);
                    if (k || j) {
                        o = o.replace(/! *important/i, "")

                    }

                }
                p = p.toLowerCase();
                e[p] = o

            }

        }
        return e

    }
    function b(g, f) {
        var e = c(f.style.cssText, false, true);
        e.top = g.t + "px";
        e.left = g.l + "px";
        e.width = g.w + "px";
        e.height = g.h + "px";
        f.style.cssText = a.mapToCssText(e, true)

    }
    return {
        parseCssText: c,
        repositionElement: b

    }

});
tlRequire.define("customization", ["namespace", "util", "config", "jQuery"], 
function(b, e, a, i) {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: "")

    }
    function g() {
        return {
            bubble: {
                backgroundColor: "inherit",
                foregroundColor: "inherit"

            },
            font: {
                size: "inherit",
                family: "inherit",
                source: "default"

            }

        }

    }
    function j(m) {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var l = parseFloat(RegExp.$1);
            if (l <= 9) {
                m = JSON.stringify(m)

            }

        }
        return m

    }
    function h(o, m, l) {
        if (typeof l === "undefined" || l == "undefined") {
            l = window.location.origin

        } else {
            l = decodeURIComponent(l)

        }
        if (o.length > 0 && o.hasClass("loaded")) {
            try {
                m = j(m);
                o[0].contentWindow.postMessage(m, l)

            } catch(n) {
                console.log("failed to send styles")

            }

        }

    }
    function k(l) {
        var n = b.customization.googleFonts || [],
        m;
        for (m = n.length - 1; m >= 0; m--) {
            if (n[m] === l) {
                return true

            }

        }
        return false

    }
    function f(l, o) {
        var n;
        if (document.getElementById("webfontScript") == null) {
            n = document.createElement("script");
            var p = document.scripts[0];
            n.id = "webfontScript";
            n.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js";
            p.parentNode.insertBefore(n, p)

        } else {
            n = document.getElementById("webfontScript")

        }
        function q() {
            WebFont.load({
                google: {
                    families: [l + ":400,400i,700,700i"]

                }

            })

        }
        if (i(n).hasClass("script-loaded")) {
            var m = l.toLowerCase().replace(/ /g, "");
            if (!i("html").hasClass("wf-" + m + "-n4-loading") && !i("html").hasClass("wf-" + m + "-n4-active")) {
                q()

            }

        } else {
            n.onload = function() {
                i(this).addClass("script-loaded");
                q()

            }

        }

    }
    function c(n, o, m) {
        if (typeof(window.addEventListener) === "undefined") {
            return

        }
        var r = {};
        var q = {};
        o = e.extend(g(), o);
        if (o.bubble) {
            if (o.bubble.backgroundColor != "inherit") {
                r["background-color"] = o.bubble.backgroundColor

            } else {
                r["background-color"] = "#ffffff"

            }
            if (o.bubble.foregroundColor != "inherit") {
                r.color = o.bubble.foregroundColor;
                q.color = o.bubble.foregroundColor

            } else {
                r.color = "#000000";
                q.color = "#000000"

            }

        }
        if (o.font) {
            if (o.font.size != "inherit") {
                r["font-size"] = o.font.size + "px";
                q["font-size"] = o.font.size + "px"

            } else {
                r["font-size"] = "";
                q["font-size"] = ""

            }
            if (o.font.family != "inherit") {
                if (o.font.source === "google" || (typeof(o.font.source) === "undefined" && k(o.font.family))) {
                    f(o.font.family, n)

                }
                r["font-family"] = o.font.family + ", sans-serif";
                q["font-family"] = o.font.family + ", sans-serif"

            } else {
                r["font-family"] = "inherit";
                q["font-family"] = "inherit"

            }

        }
        var l = n.find(".tlUpArrow");
        if (l.length > 0) {
            l.css("cssText", l[0].style.cssText + " border-bottom-color: " + r["background-color"] + " !important;")

        }
        var p = n.find(".tlArrow");
        if (p.length > 0) {
            p.css("cssText", p[0].style.cssText + " border-top-color: " + r["background-color"] + " !important;")

        }
        n.find(".tlThingContent, .tlIframeDescription").css(r);
        n.find(".tlThingContent span").attr("style", e.mapToCssText(q, false));
        n.find(".tlThingContent, .tlIframeDescription").find("h3").css({
            color: "inherit"

        });
        n.find(".tlThingContent, .tlIframeDescription").find("b, i, strong, i a, b a, strong a, p").css({
            "font-size": "inherit",
            color: "inherit"

        });
        h(n.find("iframe"), o, m)

    }
    var d = e.extend({
        defaultCustomStyles: g,
        applyNewStyles: c,
        sendStylesToIframe: h

    },
    b.customization);
    b.customization = d;
    return b.customization

});
tlRequire.define("editor", ["jQuery", "namespace", "sceneUtil", "EventDispatcher", "config", "util", "postMessageManager"], 
function(n, g, h, e, f, i, m) {
    function b(t) {
        if (n("#thinglinkColorbox").length === 0) {
            n.thinglinkColorbox.init()

        }
        var r = n(window).width();
        var u = n(window).height();
        var o = r * 0.9;
        var q = u * 0.9;
        var s = n.thinglinkColorbox({
            iframe: true,
            open: false,
            transition: "none",
            width: o,
            height: q,
            opacity: 0.6,
            overlayClose: false,
            scrolling: false,
            onOpen: function() {
                n("html").css({
                    overflow: "hidden"

                })

            },
            onComplete: function() {
                var w = n("#thinglinkColorbox").offset().top,
                v = (n(window).height() - q) / 2,
                x = n(window).scrollTop();
                if (w > n(window).height() + n(window).scrollTop()) {
                    n("#thinglinkColorbox").css({
                        top: x + v

                    })

                }

            },
            onCleanup: function() {
                n("html").css({
                    overflow: ""

                });
                a.trigger("editorClose", t)

            },
            href: function() {
                return l(t)

            }

        });
        var p = n("#thinglinkCBLoadedContent iframe");
        if (typeof(window.InstallTrigger) !== "undefined") {
            p.css("display", "block")

        }
        p.load(function() {
            p.css("background-color", "transparent");
            p.css("height", q + "px")

        })

    }
    function l(p) {
        var o = h.getSceneUrl(p),
        t = f.getApiBaseUrl(),
        v = p.attr("tl-type");
        if (v == "video") {
            var s = p.attr("tl-video-id");
            return f.getBaseVideoUrl() + "/videos/" + s + "/editor"

        }
        var u = p.attr("tl-scene-id");
        if (!u) {
            u = "url=" + o;
            if (!i.no(window.__tlid)) {
                u += "&massId=" + window.__tlid

            }

        } else {
            u = "itemId=" + u

        }
        var r = m.prepareAndGetParameters(t + "/embed/editor").srcPmParams;
        var q;
        if (f.isThinglinkSite()) {
            q = "thinglink_site"

        } else {
            q = "embedded_image"

        }
        var w = Math.floor(Math.random() * 10000000);
        return t + "/embed/editor?x=" + w + "&embed=true&" + u + "&activityOrigin=" + q + r

    }
    function k(r, p) {
        var o = l(r);
        if (p) {
            g.editorPopup = p;
            p.location.href = o

        } else {
            var x = screen.width;
            var t = screen.height;
            var v = x * 0.8;
            var s = t * 0.8;
            var q = (x / 2) - (v / 2);
            var u = (t / 2) - (s / 2);
            g.editorPopup = window.open(o, "editor", "status=0,statusbar=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,height=" + s + ",width=" + v + ",left=" + q + ",top=" + u)

        }

    }
    function d(q, p) {
        if (p) {
            try {
                p.close()

            } catch(o) {}

        }
        if (n("#thinglinkColorBoxScript").length === 0) {
            n.getScript(f.getCDNUrl() + "/jsec/" + f.cssNonce + "/jquery.colorbox.js", 
            function() {
                if (q) {
                    q()

                }

            });
            g.addExternalCss("tlInjectedColorboxCss", f.getCDNUrl() + "/jsec/" + f.cssNonce + "/colorbox.css", true)

        } else {
            if (q) {
                q()

            }

        }

    }
    function c(p, s, r, q) {
        h.closeAllStickyTags();
        if (h.isThinglinkSceneView() && !s) {
            s = function() {
                window.location.reload()

            }

        }
        g.editorCloseCallback = s;
        if (!q && (window.innerWidth < 1025 || window.innerHeight < 585)) {
            k(n(p), r)

        } else {
            if (r) {
                try {
                    r.close()

                } catch(o) {}

            }
            d(function() {
                b(n(p))

            },
            r)

        }

    }
    var j = function() {};
    j.prototype = new e();
    j.prototype.open = c;
    var a = new j();
    return a

});
tlRequire.define("errorReporter", ["namespace", "config", "jQuery"], 
function(e, d, f) {
    var a = 5;
    var c = 0;
    var b = window.onerror;
    window.onerror = function(j, h, g) {
        if (h.indexOf("embed.js") === -1) {
            return

        }
        if (b) {
            b(j, h, g)

        }
        c += 1;
        if (c >= a) {
            return

        }
        var i = d.getApiBaseUrl();
        var k = {
            errorMessage: j,
            file: h,
            lineNumber: g

        };
        f.ajax({
            url: i + "/api/internal/reportJsError",
            data: k,
            dataType: "jsonp"

        })

    };
    return {}

});
tlRequire.define("eventCallback", ["config"], 
function(a) {
    function b(e, f) {
        var c;
        if (e.length > 0) {
            c = e.tlImage("sceneData");
            var d = c.permissions;
            if (a.eventCallback && typeof(d) != "undefined" && d.indexOf("cpm") >= 0) {
                f.image = e[0];
                f.timestamp = (new Date()).getTime();
                a.eventCallback(f)

            }

        }

    }
    return b

});
tlRequire.define("eventDebounce", [], 
function() {
    var a = function(f) {
        var e,
        d = [],
        g = {},
        b = function(h) {
            if (f.after) {
                f.after.call(h, d, g)

            }
            d = [];
            e = null;
            g = {}

        };
        return function c(k) {
            var j = this,
            i = k.type;
            var h = (typeof k.originalEvent === "undefined") ? k.type: k.originalEvent.type;
            g.lastOrigEventType = h;
            if (e) {
                clearTimeout(e)

            } else {
                if (f.before) {
                    f.before.call(j, i, g)

                }

            }
            if (f.everyTime) {
                f.everyTime.call(j, i, g)

            }
            d.push(i);
            e = setTimeout(function() {
                b(j)

            },
            f.threshold || 100);
            if (f.allowPropagation) {
                return true

            } else {
                return false

            }

        }

    };
    return a

});
tlRequire.define("fourDotsButton", ["config", "postMessageManager", "animUtil", "txt", "actionLogger", "abTest"], 
function(d, i, j, f, k, e) {
    var h = false;
    function c() {
        return d.getBaseUrl() + "?buttonSource=badgeButtonBox"

    }
    function b(l, m, n) {
        if ((l.find(".tlFourDotsButton").length === 0) && (l.find(".tlFourDotsBanner").length === 0)) {
            return

        }
        a(l)

    }
    function a(q) {
        q.find(".tlFourDotsButton").remove();
        q.find(".tlFourDotsBanner").remove();
        var o = null;
        var r = q.width();
        var u = 300,
        m = 300;
        if (d.usePromotionBanner && q.width() >= u && q.height() >= m) {
            e.addBucket("bannerType", 0, 49, "bottomWide");
            e.addBucket("bannerType", 50, 99, "bottomWide");
            var p = e.variantForUser("bannerType");
            if (p === "square") {
                o = $tlJQ('<div class="tlFourDotsBanner"><div class="bannerImageAreaWrapper"><img class="bannerImage" src="' + d.getBaseUrl() + '/gfx/banners/banner-fairfield-square.png"  ><a class="homeLink" href="' + d.getBaseUrl() + '?buttonSource=badgeButtonBoxSquareBanner" target="_blank"><a class="promotedLink" href="http://fairfieldinn.thinglink.com/?buttonSource=squareBanner" target=_blank></a></div></div>');
                o.on("mouseover", 
                function() {
                    $tlJQ(this).find("img.bannerImage")[0].src = d.getBaseUrl() + "/gfx/banners/banner-fairfield-square-hover.png"

                });
                o.on("mouseout", 
                function() {
                    $tlJQ(this).find("img.bannerImage")[0].src = d.getBaseUrl() + "/gfx/banners/banner-fairfield-square.png"

                })

            } else {
                var l = "banner-fairfield-bottom-wide-300.png",
                n = "banner300",
                v = 106,
                t = 250;
                if (r >= 800) {
                    l = "banner-fairfield-bottom-wide-800.png";
                    n = "banner800";
                    v = 50;
                    t = 764

                }
                o = $tlJQ('<div class="tlFourDotsBanner tlBottomWideBanner"><div class="backgroundRect"></div><div class="bannerImageAreaWrapper"><img style="width:' + t + "px!important; height:" + v + 'px!important;" class="bannerImage" src="' + d.getBaseUrl() + "/gfx/banners/" + l + '"><a class="homeLink ' + n + '" href="' + d.getBaseUrl() + '?buttonSource=badgeButtonBoxWideBanner" target="_blank"><a class="promotedLink ' + n + '" href="http://fairfieldinn.thinglink.com/?buttonSource=bottomWideBanner" target=_blank></a></div></div>')

            }
            if (!h && (Math.random() < 0.001)) {
                h = true;
                var s = k.calcABTestString(q);
                k.logActivity({
                    name: "showed promotion banner",
                    sceneId: q.find(".thinglinkImage").attr("tl-scene-id"),
                    isThinglinkSite: d.isThinglinkSite(),
                    ABTests: s

                },
                true)

            }

        } else {
            o = $tlJQ('<div class="tlFourDotsButton"><div id="intro">' + f("FourDotsButton.MadeWithOrMakeYourOwn") + '</div><div id="logo"></div><a class="btn" href="' + c() + '" target="_blank"><span class="btnMessageShort">' + f("FourDotsButton.LearnMore") + '</span></a><div class="arrowRight"></div></div>')

        }
        o.appendTo(q);
        o.find("#logo").on("click", 
        function() {
            window.open(c(), "_blank");
            return false

        })

    }
    function g(l, m) {
        if (m.indicator) {
            return

        }
        a(l);
        b(l)

    }
    return {
        setup: g,
        reposition: b

    }

});
tlRequire.define("globalCache", ["jQuery"], 
function(d) {
    var e = d();
    function b(f) {
        e = e.add(f)

    }
    function a() {
        return e

    }
    function c() {
        e = d()

    }
    return {
        addQueriedImage: b,
        getQueriedImages: a,
        clear: c

    }

});
tlRequire.define("hashing", [], 
function() {
    function b(c) {
        return Math.abs(a(c.src)).toString(16)

    }
    function a(f) {
        var g = 65521;
        var d = 1,
        c = 0;
        var e;
        for (e = 0; e < f.length; ++e) {
            d = (d + f.charAt(e).charCodeAt()) % g;
            c = (c + d) % g

        }
        return (c << 16) | d

    }
    return {
        adler32: a,
        generateImageHash: b

    }

});
tlRequire.define("imageEventHandlers", ["jQuery", "callbackManager", "config", "eventDebounce", "jUtil", "animUtil", "actionLogger", "util"], 
function(n, f, c, i, g, k, m, e) {
    var d = false;
    var b = function(p) {
        p.data("entertime", (new Date()).getTime());
        if (!d) {
            n(window).blur(function() {
                n(".tlImageContainer").each(function() {
                    m.logHoverTime(n(this))

                });
                return true

            });
            d = true

        }

    };
    var h = "div.nubbin, .tlFirstseen, .tlSidebar";
    var o = function(q) {
        if (!q.hasClass("tlHover")) {
            b(q);
            q.addClass("tlHover");
            var p = q.find(h);
            k.variateOpacity("show", p)

        }

    },
    l = function() {
        return (c.makeSidebarSticky ? "": ".tlSidebar, ") + ".tlFirstseen" + (c.makeNubbinsSticky ? "": ", div.nubbin.unpinned, div.nubbin .nubbinGlow")

    },
    j = function(p) {
        setTimeout(function() {
            var q = n("#tlTagContainer div.tlThingText.mouseover");
            if (!p.hasClass("mouseover") && q.length === 0) {
                p.removeClass("tlHover");
                m.logHoverTime(p);
                k.variateOpacity("hide", p.find(l()))

            }

        },
        30)

    };
    function a(p) {
        p.removeClass("tlHover");
        p.find(l()).hide();
        var q = function() {
            if (!p.hasClass("mouseover")) {
                p.addClass("mouseover")

            }
            setTimeout(function() {
                n("#tlTagContainer").children("div.tlThingText").mouseleave();
                o(p)

            },
            0)

        };
        p.unbind("mouseenter vclick").bind("mouseenter vclick", i({
            before: q,
            threshold: 50,
            allowPropagation: true

        }));
        p.unbind("mouseleave").bind("mouseleave", 
        function() {
            p.removeClass("mouseover");
            n("#tlTagContainer").children("div.tlThingText").removeClass("mouseover");
            j(p)

        });
        g.checkImageInViewport(p, 
        function() {
            p.unbind("mousemove.temp").bind("mousemove.temp", 
            function() {
                q();
                p.unbind("mousemove.temp")

            })

        })

    }
    f.runAfter("initcomplete", 
    function() {
        if (e.isTouchDevice) {
            n(document).unbind("touchstart.tlNubbinHide").bind("touchstart.tlNubbinHide", 
            function(q) {
                var p = q.target || q.srcElement;
                if (n(p).closest(".tlImageContainer").length > 0 || n(p).closest("#tlTagContainer").length > 0) {
                    return

                }
                var r = new Date().getTime();
                n(document).unbind("touchend.tlNubbinHide").bind("touchend.tlNubbinHide", 
                function() {
                    n(this).unbind("touchend.tlNubbinHide");
                    var s = new Date().getTime() - r;
                    if (s > 200) {
                        return

                    }
                    n(".tlImageContainer.tlHover").each(function() {
                        n(this).trigger("mouseleave")

                    })

                })

            })

        }

    });
    return {
        attach: a,
        showNubbins: o,
        hideNubbins: j

    }

});
tlRequire.define("init", ["namespace", "util", "config", "sceneCache", "statusManager"], 
function(c, a, b, e, d) {
    if (window.console === undefined) {
        window.console = {
            log: function() {},
            warn: function() {},
            error: function() {}

        }

    } (function() {
        c.init = function() {
            if (document.all && !document.querySelector) {
                return

            }
            var j = document.getElementsByTagName("script");
            var g;
            var m = j.length;
            while (m > 0) {
                m--;
                var i = j[m].getAttribute("src");
                if (i && (i.indexOf(".thinglink.com") != -1 || i.indexOf(".thinglink.me") != -1 || i.indexOf("thinglink.local") != -1 || (b.isThinglinkSite() && (i.indexOf("embed") != -1)))) {
                    g = j[m];
                    break

                }

            }
            var o;
            if (g) {
                var n = g.getAttribute("tl-script-loaded");
                if (a.no(n) || n === "null" || n === null) {
                    o = g.src.replace(/^[^\#]+\#?/, "");
                    g.setAttribute("tl-script-loaded", true)

                }

            }
            if (o) {
                if (/^\d+$/.test(o)) {
                    var l = document.getElementsByTagName("img");
                    var k = l[l.length - 1];
                    k.setAttribute("tl-scene-id", o);
                    e.setCacheSceneId(k.src, o)

                } else {
                    var p = g.getAttribute("height", 2);
                    var h = g.getAttribute("width", 2);
                    if (a.no(p) || p === "null" || p === null) {
                        p = null

                    }
                    if (a.no(h) || h === "null" || h === null) {
                        h = null

                    }
                    f(o, p, h, g)

                }

            }
            if (a.browserIsUnsupported()) {
                return

            }

        };
        function f(k, g, j, m) {
            var h = a.extractSceneId(k);
            var l = document.createElement("img");
            l.src = a.extractUrl(k);
            if (h.length > 0 && h !== "0") {
                l.setAttribute("tl-scene-id", h)

            }
            var i = {};
            if (g !== null) {
                i.height = g

            } else {
                i["max-height"] = window.innerHeight + "px"

            }
            if (j !== null) {
                i.width = j

            } else {
                i["max-width"] = "100%"

            }
            l.style.cssText = a.mapToCssText(i, true);
            m.parentNode.insertBefore(l, m)

        }
        d.setStatus("loadcomplete")

    } ());
    if (c.config.initAfterLoad) {
        c.init()

    }
    return c.init

});
tlRequire.defineAsync("jQuery", ["init", "util", "statusManager"], 
function(e, b, c, a) {
    var d = (function() {
        var f;
        function i(k) {
            var o = "thinglinkJQueryScript";
            if (!window.__thinglinkInitStarted) {
                window.__thinglinkInitStarted = true;
                if (window.$tlJQ) {
                    k()

                } else {
                    var l = document.createElement("script");
                    l.type = "text/javascript";
                    l.id = o;
                    var n = function() {
                        window.$tlJQ = jQuery.noConflict(true);
                        k()

                    };
                    if (l.addEventListener) {
                        l.addEventListener("load", n, false)

                    } else {
                        l.onreadystatechange = function() {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                n()

                            }

                        }

                    }
                    l.setAttribute("src", b.getProtocol() + "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js");
                    var m = document.getElementsByTagName("head")[0];
                    m.appendChild(l)

                }

            }

        }
        function j(k) {
            if (f) {
                f()

            }
            if (document.readyState === "interactive") {
                k()

            } else {
                if (typeof(document.documentElement.style.WebkitAppearance) !== "undefined" && document.readyState === "loaded") {
                    k()

                } else {
                    $tlJQ(document).ready(k)

                }

            }

        }
        function h(k) {
            i(function() {
                j(k)

            })

        }
        function g(k) {
            f = k

        }
        return {
            loadJQuery: h,
            initCallback: g

        }

    } ());
    d.initCallback(function() {
        c.setStatus("initcomplete")

    });
    d.loadJQuery(function() {
        c.setStatus("jqueryready");
        a(true, window.$tlJQ)

    })

});
tlRequire.define("jQueryPostMessage", ["jQuery"], 
function(b) {
    /*!
     * jQuery postMessage - v0.5 - 9/11/2009
     * http://benalman.com/projects/jquery-postmessage-plugin/
     *
     * Copyright (c) 2009 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    var a = function(k) {
        var d,
        e,
        l = 1,
        c,
        h = this,
        i = "postMessage",
        f = "addEventListener",
        g,
        j = h[i];
        k[i] = function(m, o, n) {
            if (!o) {
                return

            }
            m = typeof m === "string" ? m: k.param(m);
            n = n || parent;
            if (j) {
                n[i](m, o.replace(/([^:]+:\/\/[^\/]+).*/, "$1"))

            } else {
                if (o) {
                    n.location = o.replace(/#.*$/, "") + "#" + ( + new Date()) + (l++) + "&" + m

                }

            }

        };
        k.receiveMessage = g = function(o, n, m) {
            if (j) {
                if (o) {
                    if (typeof c === "function" && c()) {
                        g()

                    }
                    c = function(p) {
                        if ((typeof n === "string" && p.origin !== n) || (k.isFunction(n) && n(p.origin) === false)) {
                            return false

                        }
                        o(p)

                    }

                }
                if (h[f]) {
                    h[o ? f: "removeEventListener"]("message", c, false)

                } else {
                    h[o ? "attachEvent": "detachEvent"]("onmessage", c)

                }

            } else {
                if (d) {
                    clearInterval(d)

                }
                d = null;
                if (o) {
                    m = typeof n === "number" ? n: typeof m === "number" ? m: 100;
                    d = setInterval(function() {
                        var q = document.location.hash,
                        p = /^#?\d+&/;
                        if (q !== e && p.test(q)) {
                            e = q;
                            o({
                                data: q.replace(p, "")

                            });
                            document.location.hash = ""

                        }

                    },
                    m)

                }

            }

        }

    };
    a(b);
    return b.postMessage

});
tlRequire.define("jQueryTlImage", ["jQuery", "adMatcher", "config", "globalCache"], 
function(d, a, c, e) {
    function b() {
        var h = /^data:/;
        var g = /^https?:\/\/mt\d+\.google\.com\//;
        var f = {
            sceneData: function(i) {
                if (!i) {
                    return this.data("scene")

                } else {
                    this.data("scene", i)

                }

            },
            hasSize: function() {
                if (this.tlImage("isLoaded")) {
                    return true

                } else {
                    var m = (this.height() !== 0) && (this.width() !== 0);
                    var l = !(this.height() === 24 && this.width() === 24);
                    var k = !(this.height() === 0 && this.width() === 0);
                    var j = !(this.height() === 1 && this.width() === 1);
                    var i = !(document.body.attachEvent && window.ActiveXObject && this.width() === 28 && this.height() === 30);
                    return m && l && i && k && j

                }

            },
            isLoaded: function() {
                return (this[0].complete || this[0].readyState === 4)

            },
            isInspectedByThinglink: function() {
                return e.getQueriedImages().is(this) || this.hasClass("thinglinkImage") || this.hasClass("thinglinkFiltered")

            },
            isWhitelabel: function() {
                var i = this.tlImage("sceneData");
                return i.branding !== undefined && i.branding !== "thinglink"

            },
            hasThinglinkBadge: function() {
                var i = this.tlImage("sceneData");
                return i.indicator === undefined

            },
            isAlwaysThinglink: function() {
                var i = this;
                return i.hasClass("alwaysThinglink")

            },
            isOk: function() {
                var k = this;
                if (k.tlImage("isAlwaysThinglink")) {
                    return true

                }
                if (k.closest(".neverThinglink").length) {
                    return false

                }
                if (k.css("display") == "none") {
                    return false

                }
                var j = k.attr("src");
                if (a.test(j) || h.test(j) || g.test(j)) {
                    return false

                }
                var l = ["#lightboxImage", "#lightbox-image", ".cboxPhoto", "#fancybox-img", ".fancybox-image"];
                var i = false;
                d.each(l, 
                function(m, n) {
                    if (k.is(n)) {
                        i = true;
                        return false

                    }

                });
                if (i) {
                    return false

                }
                if (!k.tlImage("hasSize")) {
                    return true

                }
                if (window.screen && (screen.width <= 480)) {
                    return (k.width() > screen.width / 3) && (k.height() > screen.width / 3)

                }
                return (k.height() >= c.minHeight && k.width() >= c.minWidth)

            },
            scrollTo: function() {
                var k = this;
                var j;
                if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
                    j = d("body")

                } else {
                    j = d("html,body")

                }
                var i = j.scrollTop();
                d(window).load(function() {
                    var l = k.offset().top - 40;
                    if (Math.abs(j.scrollTop() - i) < 50) {
                        j.stop().animate({
                            scrollTop: l

                        },
                        "fast")

                    }

                })

            }

        };
        d.fn.tlImage = function(i) {
            return f[i].apply(this, Array.prototype.slice.call(arguments, 1))

        }

    }
    b();
    return d.fn.tlImage

});
tlRequire.define("jQueryVMouse", ["jQuery"], 
function(a) {
    if (a.vmouse) {
        return a.vmouse

    }
    function b(y, H, g) {
        var G = "virtualMouseBindings",
        d = "virtualTouchID",
        c = ["vmouseover", "vmousedown", "vmousemove", "vmouseup", "vclick", "vmouseout", "vmousecancel"],
        x = ["clientX", "clientY", "pageX", "pageY", "screenX", "screenY"],
        D = y.event.mouseHooks ? y.event.mouseHooks.props: [],
        z = y.event.props.concat(D),
        B = {},
        I = 0,
        t = 0,
        s = 0,
        q = false,
        L = [],
        j = false,
        S = false,
        v = (g.addEventListener),
        u = y(g),
        F = 1,
        O = 0,
        e;
        y.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500

        };
        function r(i) {
            while (i && typeof i.originalEvent !== "undefined") {
                i = i.originalEvent

            }
            return i

        }
        function k(U, V) {
            var ad = U.type,
            ae,
            ac,
            W,
            T,
            aa,
            Z,
            Y,
            X,
            ab;
            U = y.Event(U);
            U.type = V;
            ae = U.originalEvent;
            ac = y.event.props;
            if (ad.search(/^(mouse|click)/) > -1) {
                ac = z

            }
            if (ae) {
                for (Y = ac.length, T; Y; Y) {
                    T = ac[--Y];
                    U[T] = ae[T]

                }

            }
            if (ad.search(/mouse(down|up)|click/) > -1 && !U.which) {
                U.which = 1

            }
            if (ad.search(/^touch/) !== -1) {
                W = r(ae);
                ad = W.touches;
                aa = W.changedTouches;
                Z = (ad && ad.length) ? ad[0] : ((aa && aa.length) ? aa[0] : undefined);
                if (Z) {
                    for (X = 0, ab = x.length; X < ab; X++) {
                        T = x[X];
                        U[T] = Z[T]

                    }

                }

            }
            return U

        }
        function Q(V) {
            var T = {},
            i,
            U;
            while (V) {
                i = y.data(V, G);
                for (U in i) {
                    if (i.hasOwnProperty(U)) {
                        if (i[U]) {
                            T[U] = T.hasVirtualBinding = true

                        }

                    }

                }
                V = V.parentNode

            }
            return T

        }
        function C(U, T) {
            var i;
            while (U) {
                i = y.data(U, G);
                if (i && (!T || i[T])) {
                    return U

                }
                U = U.parentNode

            }
            return null

        }
        function K() {
            S = false

        }
        function m() {
            S = true

        }
        function R() {
            O = 0;
            L.length = 0;
            j = false;
            m()

        }
        function p() {
            K()

        }
        function w() {
            A();
            I = setTimeout(function() {
                I = 0;
                R()

            },
            y.vmouse.resetTimerDuration)

        }
        function A() {
            if (I) {
                clearTimeout(I);
                I = 0

            }

        }
        function o(U, V, i) {
            var T;
            if ((i && i[U]) || (!i && C(V.target, U))) {
                T = k(V, U);
                y(V.target).trigger(T)

            }
            return T

        }
        function l(T) {
            var U = y.data(T.target, d);
            if (!j && (!O || O !== U)) {
                var i = o("v" + T.type, T);
                if (i) {
                    if (i.isDefaultPrevented()) {
                        T.preventDefault()

                    }
                    if (i.isPropagationStopped()) {
                        T.stopPropagation()

                    }
                    if (i.isImmediatePropagationStopped()) {
                        T.stopImmediatePropagation()

                    }

                }

            }

        }
        function P(U) {
            var W = r(U).touches,
            V,
            i;
            if (W && W.length === 1) {
                V = U.target;
                i = Q(V);
                if (i.hasVirtualBinding) {
                    O = F++;
                    y.data(V, d, O);
                    A();
                    p();
                    q = false;
                    var T = r(U).touches[0];
                    t = T.pageX;
                    s = T.pageY;
                    o("vmouseover", U, i);
                    o("vmousedown", U, i)

                }

            }

        }
        function J(i) {
            if (S) {
                return

            }
            if (!q) {
                o("vmousecancel", i, Q(i.target))

            }
            q = true;
            w()

        }
        function f(W) {
            if (S) {
                return

            }
            var U = r(W).touches[0],
            T = q,
            V = y.vmouse.moveDistanceThreshold,
            i = Q(W.target);
            q = q || (Math.abs(U.pageX - t) > V || Math.abs(U.pageY - s) > V);
            if (q && !T) {
                o("vmousecancel", W, i)

            }
            o("vmousemove", W, i);
            w()

        }
        function h(V) {
            if (S) {
                return

            }
            m();
            var i = Q(V.target),
            U;
            o("vmouseup", V, i);
            if (!q) {
                var T = o("vclick", V, i);
                if (T && T.isDefaultPrevented()) {
                    U = r(V).changedTouches[0];
                    L.push({
                        touchID: O,
                        x: U.clientX,
                        y: U.clientY

                    });
                    j = true

                }

            }
            o("vmouseout", V, i);
            q = false;
            w()

        }
        function E(T) {
            var U = y.data(T, G),
            i;
            if (U) {
                for (i in U) {
                    if (U.hasOwnProperty(i)) {
                        if (U[i]) {
                            return true

                        }

                    }

                }

            }
            return false

        }
        function N() {}
        function n(i) {
            var T = i.substr(1);
            return {
                setup: function(V, U) {
                    if (!E(this)) {
                        y.data(this, G, {})

                    }
                    var W = y.data(this, G);
                    W[i] = true;
                    B[i] = (B[i] || 0) + 1;
                    if (B[i] === 1) {
                        u.bind(T, l)

                    }
                    y(this).bind(T, N);
                    if (v) {
                        B.touchstart = (B.touchstart || 0) + 1;
                        if (B.touchstart === 1) {
                            u.bind("touchstart", P).bind("touchend", h).bind("touchmove", f).bind("scroll", J)

                        }

                    }

                },
                teardown: function(V, U) {--B[i];
                    if (!B[i]) {
                        u.unbind(T, l)

                    }
                    if (v) {--B.touchstart;
                        if (!B.touchstart) {
                            u.unbind("touchstart", P).unbind("touchmove", f).unbind("touchend", h).unbind("scroll", J)

                        }

                    }
                    var W = y(this),
                    X = y.data(this, G);
                    if (X) {
                        X[i] = false

                    }
                    W.unbind(T, N);
                    if (!E(this)) {
                        W.removeData(G)

                    }

                }

            }

        }
        var M;
        for (M = 0; M < c.length; M++) {
            y.event.special[c[M]] = n(c[M])

        }
        if (v) {
            g.addEventListener("click", 
            function(X) {
                var U = L.length,
                Y = X.target,
                aa,
                Z,
                ab,
                W,
                T,
                V;
                if (U) {
                    aa = X.clientX;
                    Z = X.clientY;
                    e = y.vmouse.clickDistanceThreshold;
                    ab = Y;
                    while (ab) {
                        for (W = 0; W < U; W++) {
                            T = L[W];
                            V = 0;
                            if ((ab === Y && Math.abs(T.x - aa) < e && Math.abs(T.y - Z) < e) || y.data(ab, d) === T.touchID) {
                                X.preventDefault();
                                X.stopPropagation();
                                return

                            }

                        }
                        ab = ab.parentNode

                    }

                }

            },
            true)

        }

    }
    b(a, window, document);
    return a.vmouse

});
tlRequire.define("jUtil", ["jQuery"], 
function(c) {
    function a(h, e) {
        var f = c(window);
        var j = f.scrollLeft(),
        d = f.scrollTop(),
        k = h.offset(),
        g = k.left,
        i = k.top;
        if (i + h.height() > d + 5 && i < d + f.height() - 5 && g + h.width() > j + 5 && g < j + f.width() - 5) {
            e()

        }

    }
    function b(f) {
        var g = c(f);
        var h,
        e;
        var d;
        if (g.hasClass("tlThingText")) {
            e = g;
            d = e.attr("id").match(/tl-a-([0-9]+)/)[1];
            h = c(".tagx.tl-a-" + d)

        } else {
            h = g;
            d = g.attr("tl-thing-id");
            e = c("#tl-a-" + d)

        }
        return {
            nubbin: h,
            bubble: e

        }

    }
    return {
        checkImageInViewport: a,
        getThingPieces: b

    }

});
tlRequire.define("main", ["namespace", "callbackManager", "statusManager", "jQuery", "util", "config", "cssUtil", "tagFetcher", "measure", "txt", "nubbinIconSizeManager", "nodeChangeTracker", "actionLogger", "nubbinRenderer", "eventCallback", "postMessageManager", "sceneUtil", "sceneCache", "touchManager", "hashing", "animUtil", "fourDotsButton", "editor", "sharePopup", "bubbleRenderer", "cssInjector", "jUtil", "imageEventHandlers", "positionThing", "tagEventHandlers", "eventDebounce", "abTest", "errorReporter", "globalCache", "customization"], 
function(w, s, n, C, a, I, u, h, f, y, v, e, x, G, z, k, H, B, j, r, l, t, i, m, g, q, A, F, c, E, b, p, D, d, o) { (function() {
        var ab = ["Edit", "Touch", "Share"];
        var Z = ["Touch", "Share"];
        if (I.disableEditorButton) {
            ab.splice(0, 1)

        }
        function Q(aD, aI) {
            aI = aI || ["imgHash", "scriptHash", "imgAttr"];
            var aC = null,
            aH = null;
            if (C.inArray("imgAttr", aI) !== -1) {
                aC = aD.attr("tl-scene-id");
                aH = aD.attr("tl-passkey")

            }
            if (!aC && C.inArray("scriptHash", aI) !== -1) {
                var aG = aD.next().filter("script").attr("src");
                if (!aG) {
                    aG = aD.closest(".tlImageContainer").nextUntil().filter("script").first().attr("src")

                }
                if ( !! aG && aG.indexOf("zmiti.") !== -1) {
                    aC = aG.replace(/^[^\#]+\#?/, "")

                }

            }
            if (!aC && C.inArray("imgHash", aI) !== -1) {
                var aE = aD.attr("src");
                if ( !! aE) {
                    var aB = aE ? aE.match(/^[^\#]+\#fly-([^;]+);(.*)?$/) : null;
                    if ( !! aB) {
                        var aF = aE.match(/[\?&]tlpasskey=(\w+)/);
                        aC = aB[1];
                        aH = !!aF ? aF[1] : null

                    }

                }

            }
            return {
                id: aC,
                passkey: aH

            }

        }
        function M(aD, aM, aC) {
            if (aM) {
                aD.addClass("thinglinkImage");
                aD.removeClass("thinglinkFiltered");
                if (I.disableMenuItems) {
                    var aF = ab.indexOf("Share");
                    if (aF !== -1) {
                        ab.splice(aF, 1)

                    }
                    var aJ = ab.indexOf("Touch");
                    if (aJ !== -1) {
                        ab.splice(aJ, 1)

                    }

                }
                if (aD.parents(".tlImageContainer").length === 0) {
                    var aB = '<div class="tlSidebar">',
                    aH,
                    aE = "";
                    var aK = [].concat(ab).concat(I.extraSidebarIcons);
                    var aG = a.isTouchDevice ? "": "tlNonTouchDevice";
                    var aL = '<span class="tlMenuItem tlMenuItem:curLabel :touchClass"><a class="tlMenuIcon tlMenu:curLabel" href="#"></a><span class="tlMenuLabel tlMenuLabel:curLabel">:labelText</span></span>';
                    for (aH = 0; aH < aK.length; aH++) {
                        aB += aL.replace(/:curLabel/gi, aK[aH]).replace(":touchClass", aG).replace(":labelText", y("Sidebar." + aK[aH]))

                    }
                    aB += "</div>";
                    aD.wrap('<div class="tlImageContainer">');
                    aD.parent().append('<div class="tlMenuContainer"><span class="tlMenu"></span></div>' + aB + "</div>")

                }

            } else {
                aD.addClass("thinglinkFiltered");
                aD.removeClass("thinglinkImage")

            }
            var aI = aD.parents(".tlImageContainer");
            if (aC) {
                aI.addClass("tlNoTags")

            } else {
                aI.removeClass("tlNoTags")

            }

        }
        function aq(aC) {
            var aD = [];
            var aB = [];
            C("img").each(function() {
                var aG = C(this);
                var aE = Q(aG, ["imgHash"]);
                var aF = aE.id;
                if (aF) {
                    aG.attr("tl-scene-id", aF)

                }
                if (aG.tlImage("isOk")) {
                    if (!aG.tlImage("isInspectedByThinglink")) {
                        var aI = aG.attr("tl-scene-id");
                        var aH = aG.attr("tl-passkey") || aE.passkey;
                        if ((!aI || aI.charAt(0) == "$") && window.__tlid) {
                            aI = H.getSceneUrl(this)

                        }
                        if (aI) {
                            d.addQueriedImage(aG);
                            if (C.inArray(aI, aD) === -1) {
                                aD.push(aI);
                                if (aH) {
                                    aB.push(aH)

                                }

                            }

                        }

                    }

                } else {
                    M(aG, false)

                }

            });
            if (aD.length > 0) {
                h.fetchTags(aD, aB, aC);
                q.injectEmbedCSS()

            }

        }
        w.rebuild = function(aC) {
            if (!aC) {
                C("img.thinglinkFiltered").removeClass("thinglinkFiltered");
                C("img.thinglinkImage").removeClass("thinglinkImage");
                d.clear();
                aq(true)

            } else {
                var aB = a.extractSceneId(aC),
                aD = [];
                if (aB !== "" && aB.charAt(0) !== "$") {
                    aD = C("img[tl-scene-id=" + aB + "]")

                }
                h.finalFetchCompleteCallback(function() {
                    var aE;
                    for (aE = 0; aE < aD.length; aE++) {
                        w.reposition(C(aD[aE]))

                    }
                    n.setStatus("tagfetchcomplete")

                });
                d.addQueriedImage(aD);
                h.fetchTags(aC, null, true);
                q.injectEmbedCSS()

            }

        };
        function ag(aH) {
            if (aH.css("margin-left") == "auto" && aH.css("margin-right") == "auto") {
                return true

            }
            if (!window.addEventListener) {
                return false

            }
            var aG = getComputedStyle(aH[0], null);
            if (aG.getPropertyValue("margin-left") !== "0px" || aG.getPropertyValue("left") !== "auto" || aG.getPropertyValue("right") !== "auto" || aG.getPropertyValue("float") === "left" || aG.getPropertyValue("float") === "right") {
                return false

            }
            var aC = aH.closest(".tlImageContainer").parent(),
            aB = getComputedStyle(aC[0]),
            aE = aH[0].getBoundingClientRect(),
            aD = aC[0].getBoundingClientRect();
            var aF = aE.left - aD.left - parseInt(aB.getPropertyValue("border-left-width"), 10) - parseInt(aB.getPropertyValue("padding-left"), 10) - parseInt(aG.getPropertyValue("margin-left"), 10);
            return aF > 0

        }
        function aa(aH, aC, aE, aI) {
            var aD = aC[0].style.cssText;
            aC.data("tlOriginalCss", aD);
            var aF = u.parseCssText(aD, false, true),
            aB = {};
            aB = a.extend(aB, aE);
            aB.width = aE.rawWidth + "px";
            aB.height = aE.rawHeight + "px";
            aF.padding = "0";
            aF.border = "0";
            aF.margin = "0";
            aB["z-index"] = (aI - 1);
            if (aC.css("display") == "block") {
                aB.display = "block";
                aH.css("display", "block");
                if (ag(aC)) {
                    aB["margin-left"] = "auto";
                    aB["margin-right"] = "auto"

                }

            }
            var aG = aC.css("position");
            if (aG === "absolute" || aG === "relative") {
                aB.position = aG;
                aB.top = aE.top;
                aB.right = aE.right;
                aB.bottom = aE.bottom;
                aB.left = aE.left;
                aF.position = "static";
                if (aG === "absolute") {
                    aB["z-index"] = aI

                }

            }
            var aJ = aC.css("float");
            if (aJ === "left" || aJ === "right") {
                aB["float"] = aJ;
                delete aF["float"]

            }
            if (aF["max-width"] && aF["max-width"] != "none") {
                aB["max-width"] = aF["max-width"];
                aF["max-width"] = "100%"

            }
            aF.width = "100%";
            aF.height = "100%";
            aC.css({
                cssText: a.mapToCssText(aF, true)

            });
            aH.css({
                cssText: a.mapToCssText(aB, true, true)

            });
            var aK = f.getExtent(aC);
            aH.find("div.tlMenuContainer").each(function() {
                C(this).css("cssText", "right:" + aK.r + "px !important; bottom:" + aK.b + "px !important; z-index:" + aI)

            });
            aH.find("div.tlSidebar").each(function() {
                C(this).css("cssText", "right:" + aK.r + "px !important; top:" + aK.t + "px !important; z-index:" + (aI + 1))

            });
            t.reposition(aH, aK, aI);
            if (I.isThinglinkSite()) {
                if (aC.width() < 500 || aC.height() < 500) {
                    aH.addClass("tlSmallNavi")

                } else {
                    aH.removeClass("tlSmallNavi")

                }

            } else {
                if (aC.width() < 800 || aC.height() < 600) {
                    aH.addClass("tlSmallNavi")

                } else {
                    aH.removeClass("tlSmallNavi")

                }

            }
            if (!a.isTouchDevice && (aC.width() < 150 || aC.height() < 300)) {
                aH.addClass("tlVerySmallNavi")

            } else {
                aH.removeClass("tlVerySmallNavi")

            }
            if (aC.width() < 50 || aC.height() < 150) {
                aH.addClass("tlNoBadgeIcon")

            } else {
                aH.removeClass("tlNoBadgeIcon")

            }
            if (I.makeSidebarSticky) {
                aH.find("div.tlSidebar").show()

            }

        }
        w.reposition = function(aC) {
            if (!aC) {
                var aB = C(".tlImageContainer .thinglinkImage"),
                aG;
                for (aG = 0; aG < aB.length; aG++) {
                    w.reposition(aB.eq(aG))

                }

            } else {
                var aI = C(aC).closest(".tlImageContainer"),
                aH = C(aC).parent(),
                aP = aI.find(".tagx"),
                aJ = aI.css("display"),
                aE;
                if (aI.length === 0) {
                    return

                }
                var aN = aI.css("z-index");
                aN++;
                aI[0].style.cssText = "display: none;";
                aI.before(aC);
                aC[0].style.cssText = aC.data("tlOriginalCss");
                var aF = {
                    w: 0,
                    h: 0

                };
                if (aC.tlImage("hasSize")) {
                    aF = f.getDimensions(aC)

                }
                aH.prepend(aC);
                aI.css("display", aJ);
                aa(aI, aC, aF, aN);
                var aD = {
                    l: 0,
                    t: 0

                };
                if (aI.css("box-sizing") === "content-box") {
                    var aL = f.getExtent(aI[0]);
                    aD.l = aL["padding-left"];
                    aD.t = aL["padding-top"]

                }
                var aK,
                aO,
                aM;
                for (aE = 0; aE < aP.length; aE++) {
                    aK = aP.eq(aE);
                    aO = aK.data("thing");
                    aM = f.getThingRect(aC, aO);
                    aM.l = aM.l + aD.l;
                    aM.t = aM.t + aD.t;
                    u.repositionElement(aM, aK[0]);
                    if (aK.hasClass("hovered")) {
                        c(aK)

                    }

                }
                v.resizeAllNubbinsIfTooSmall()

            }

        };
        w.removeTags = function(aC) {
            if (!aC) {
                aC = C("body")

            }
            var aB = C(aC).find(".tlThingContainer");
            C.each(aB, 
            function(aD, aH) {
                var aE = C(aH);
                var aG = aE.find(".tagx");
                var aF = aG.attr("tl-thing-id");
                C("#tl-a-" + aF).remove();
                aE.remove()

            })

        };
        w.renderTag = function(aF, aB) {
            var aC = g.render(aB, null, c);
            aC.appendTo("#tlTagContainer");
            var aD = aC.data("bubbledata");
            var aE = G.render(aF, aB, aD.rtid);
            return {
                hoverHandler: aD.hoverHandler,
                clickHandler: aD.clickHandler,
                template: aE,
                bubble: aC

            }

        };
        w.prepareTagForDisplay = function() {
            E.prepareTagForDisplay.apply(this, arguments)

        };
        w.openEditor = function(aB, aE, aD, aC) {
            i.open(aB, aE, aD, aC)

        };
        w.openShare = function(aG, aE) {
            var aH = C(aG);
            var aD = aE ? C(aE).attr("tl-channel-id") : null;
            var aB = aH.closest(".tlImageContainer");
            if (aD) {
                var aC = {
                    id: aD

                };
                m.setup(aB, aH, aC)

            } else {
                var aF = aH.tlImage("sceneData");
                m.setup(aB, aH, aF)

            }

        };
        w.openTouch = function(aB) {
            C(aB).closest(".tlImageContainer").find(".tlMenuTouch").click()

        };
        w.addExternalCss = q.addExternalCss;
        w.closeAllStickyTags = function() {
            H.closeAllStickyTags()

        };
        w.highlightImage = function(aC) {
            function aI(aK, aN) {
                var aL = aK.find(".nubbin.unpinned");
                var aM = aK.find(".nubbin .nubbinGlow");
                return setTimeout(function() {
                    var aO = 2500;
                    if (!aK.hasClass("tlHover") && !I.makeNubbinsSticky) {
                        l.variateOpacity("hide", aL, aO)

                    }
                    l.variateOpacity("hide", aM, aO / 2);
                    aC.data("hideNubbinsTimeout", 0)

                },
                aN)

            }
            var aE = aC.closest(".tlImageContainer");
            var aF = I.initialNubbinShowDuration;
            if (aC.data("hideNubbinsTimeout")) {
                clearTimeout(aC.data("hideNubbinsTimeout"));
                aC.data("hideNubbinsTimeout", aI(aE, aF))

            } else {
                var aG = aE.find(".nubbin");
                var aH = aG.find(".nubbinGlow");
                l.variateOpacity("show", aH, aF);
                l.variateOpacity("show", aG, 100);
                var aB = aI(aE, aF);
                aC.data("hideNubbinsTimeout", aB)

            }
            if (I.highlightCallback) {
                var aD = aC.tlImage("sceneData");
                if (I.highlightCallback(aD, aE)) {
                    x.logSceneView(aE)

                }

            }
            if (Math.random() < 0.001) {
                var aJ = x.calcABTestString(aE);
                x.logActivity({
                    name: "sampled scene view",
                    sceneId: aE.find(".thinglinkImage").attr("tl-scene-id"),
                    isThinglinkSite: I.isThinglinkSite(),
                    ABTests: aJ

                },
                true)

            }

        };
        function Y(aB, aC) {
            A.checkImageInViewport(aB, 
            function() {
                if (aC.hasClass("tlSneakPeeked")) {
                    return

                }
                aC.addClass("tlSneakPeeked");
                w.highlightImage(aB.find(".thinglinkImage"))

            })

        }
        function at(aE, aD) {
            var aF = aE.parents(".tlImageContainer").find(".tlContextMenu");
            aF.show();
            var aC = aD.pageX - aE.offset().left;
            var aB = aD.pageY - aE.offset().top;
            aF.css("cssText", "display: block; left: " + aC + "px !important; top: " + aB + "px !important; z-index: " + aF.css("z-index"))

        }
        function P(aC) {
            var aD = aC.find(".thinglinkImage");
            if (!I.disableContextMenu) {
                var aB = C(aC).find(".tagx");
                if (aB.length > 0) {
                    C.each([aB, aD], 
                    function(aF, aE) {
                        aE.bind("contextmenu", 
                        function(aG) {
                            if (!I.disableMenuItems) {
                                at(aD, aG)

                            }
                            return false

                        })

                    })

                }

            }

        }
        function ai(aB) {
            setTimeout(function() {
                var aD = aB.find(".nubbin");
                function aC() {
                    setTimeout(function() {
                        Y(aB, aD)

                    },
                    0)

                }
                aC();
                C(window).scroll(b({
                    after: aC,
                    threshold: 80

                }))

            },
            0)

        }
        function av(aG, aD) {
            var aC = false;
            var aE = navigator.userAgent.indexOf("Trident") !== -1;
            var aI = window.location.href.indexOf("/channelcard/") !== -1;
            if (aG && !(aE && aI)) {
                aC = true;
                if (aG.requestFullscreen) {
                    aG.requestFullscreen()

                } else {
                    if (aG.mozRequestFullScreen) {
                        aG.mozRequestFullScreen()

                    } else {
                        if (aG.webkitRequestFullscreen) {
                            aG.webkitRequestFullscreen()

                        } else {
                            if (aG.msRequestFullscreen) {
                                aG.msRequestFullscreen()

                            } else {
                                aC = false

                            }

                        }

                    }

                }

            }
            if (!aC) {
                var aB = C(aG);
                var aF = aB.find(".channelCarousel");
                var aH = "";
                if (window.location.href.indexOf("on=fb") !== -1) {
                    aH = "&on=fb"

                }
                if (aF.length > 0) {
                    window.open(I.getBaseUrl() + "/channelcard/" + aF.attr("tl-channel-id") + "?fullscreen=true" + aH, "_blank")

                } else {
                    window.open(I.getBaseUrl() + "/card/" + aD + "?fullscreen=true" + aH, "_blank")

                }

            }

        }
        function ax(aE, aD) {
            var aB = aE.height(),
            aC = aE.width(),
            aF = false,
            aG = "tlFullscreen";
            return function() {
                var aH = aC / aB;
                if (aF) {
                    C("#tlFullscreenUpsell").hide();
                    aE.attr("height", aB).attr("width", aC);
                    aD.removeClass(aG);
                    aD.closest(".tlFullscreenable").removeClass(aG)

                } else {
                    aE.attr("height", screen.height).attr("width", screen.height * aH);
                    aD.addClass(aG);
                    aD.closest(".tlFullscreenable").addClass(aG);
                    C("#tlFullscreenUpsell").show()

                }
                aF = !aF

            }

        }
        function af(aE, aG, aF) {
            var aC = p.activeTestsForUser();
            var aD = JSON.stringify(aC);
            C(document).off("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange").on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", ax(aG, aE, aF));
            var aB,
            aH = aE.closest(".tlFullscreenable");
            if (aH.length > 0) {
                aB = aH[0]

            }
            av(aB, aF.id);
            x.logActivity({
                name: "clicked in-image fullscreen",
                sceneId: aE.find(".thinglinkImage").attr("tl-scene-id"),
                isThinglinkSite: I.isThinglinkSite(),
                ABTests: aD

            });
            return false

        }
        function N(aC, aF, aE) {
            j.touch(aC, H.isSceneTouched(aE.id));
            aC.find(".tlPopup").hide();
            var aB = p.activeTestsForUser();
            var aD = JSON.stringify(aB);
            x.logActivity({
                name: "clicked in-image touch",
                sceneId: aC.find(".thinglinkImage").attr("tl-scene-id"),
                isThinglinkSite: I.isThinglinkSite(),
                ABTests: aD

            });
            return false

        }
        function ae(aB, aD, aC) {
            m.setup(aB, aD, aC)

        }
        function T(aB, aD, aC) {
            if (typeof(aC.allowEdit) != "undefined" && aC.allowEdit === false) {
                aB.find(".tlMenuEdit").parent().hide()

            } else {
                aB.find(".tlMenuEdit").parent().unbind("click").click(function(aE) {
                    aE.preventDefault();
                    i.open(aD)

                })

            }

        }
        function ak(aE) {
            var aG = aE[0];
            var aD = aE[1];
            var aF = aE[2];
            var aJ = H.findImageContainer(aD).find(".tlMenuItemTouch");
            var aL = aJ.find(".tlMenuLabelTouch");
            var aB;
            if (aG) {
                aB = "Untouch";
                aJ.removeClass("tlTouch").addClass("tlUntouch")

            } else {
                aB = "Touch";
                aJ.removeClass("tlUntouch").addClass("tlTouch")

            }
            if (aF === undefined) {
                aF = 0

            }
            var aK = aL.data("tlTouchCount");
            if (aK) {
                aL.data("tlTouchCount", aK + aF)

            } else {
                aL.data("tlTouchCount", aF)

            }
            aL.text(y("Sidebar." + aB));
            var aC = aL.data("tlTouchCount");
            if (aC == 1) {
                aL.prev().attr("title", aC + " touch")

            } else {
                aL.prev().attr("title", aC + " touches")

            }
            var aI;
            if (aC === 1) {
                aI = y("TouchSidebarButton.TouchesOne")

            } else {
                if (aC === 0) {
                    aI = y("TouchSidebarButton.TouchesNo")

                } else {
                    aI = y("TouchSidebarButton.TouchesOther", aC)

                }

            }
            aL.prev().attr("title", aI);
            if (I.isThinglinkSite()) {
                var aH;
                if (aC === 1) {
                    aH = y("TouchDialog.TouchesOne")

                } else {
                    if (aC === 0) {
                        aH = y("TouchDialog.TouchesNo")

                    } else {
                        aH = y("TouchDialog.TouchesOther", aC)

                    }

                }
                C("#touchCountPhrase").text(" " + aH)

            }
            return aC

        }
        function ad(aC, aG, aF) {
            if (aF.indicator) {
                var aE = I.getCDNUrl() + "/api/nubbin/" + aF.indicator + "/plain";
                var aD = 'background-image: url("' + aE + '") !important;';
                C(aC).find(".tlMenu").css("cssText", aD).parent().addClass("tlMenuCustomIndicatorContainer");
                var aH = new Image();
                var aB = function() {
                    C(aC).find(".tlMenu").css("cssText", aD + ";width:" + aH.width + "px!important;height:" + aH.height + "px!important")

                };
                if ((aH.complete || aH.readyState === 4) && (aH.width > 0)) {
                    aB()

                } else {
                    aH.onload = aB;
                    aH.src = aE

                }

            } else {
                if (aF.branding === "" || !aF.id) {
                    C(aC).find(".tlMenuContainer").remove()

                }

            }

        }
        function an(aB, aI, aH) {
            aB.find(".tlContextMenu").remove();
            var aG = C('<div class="tlContextMenu"></div>');
            aG.css("z-index", aI + 1);
            aG.bind("contextmenu", 
            function() {
                return false

            });
            var aF = function(aJ) {
                return function() {
                    aB.find(".tlMenu" + aJ).click();
                    aG.hide();
                    return false

                }

            };
            var aD,
            aC,
            aE = I.isThinglinkSite();
            for (aD = 0; aD < Z.length; aD++) {
                aC = Z[aD];
                if (!aH[aC.toLowerCase()] || aE) {
                    C('<div class="tlContextMenuItem tlContextMenu' + aC + '">' + y("ContextMenu." + aC) + "</div>").bind("click", aF(aC)).appendTo(aG)

                }

            }
            aB.append(aG);
            aG.attr("unselectable", "on").css("-moz-user-select", "none").each(function() {
                this.onselectstart = function() {
                    return false

                }

            });
            C("body").click(function() {
                if (aG.css("display") !== "none") {
                    aG.hide()

                }

            });
            aG.hide()

        }
        function K(aB) {
            aB = aB.filter(".tlVariantImageThing");
            aB.find("img").bind("load", 
            function() {
                if (aB.is(":visible")) {
                    c(A.getThingPieces(aB).nubbin)

                }

            })

        }
        function aj(aC, aD, aB) {
            o.applyNewStyles(aC, aD, aB)

        }
        function ap(aC, aE, aB, aG, aD, aF) {
            setTimeout(function() {
                var aO = f.getThingRect(aE, aB);
                var aL = {
                    l: 0,
                    t: 0

                };
                if (aC.css("box-sizing") === "content-box") {
                    var aK = f.getExtent(aC[0]);
                    aL.l = aK["padding-left"];
                    aL.t = aK["padding-top"]

                }
                aO.l = aO.l + aL.l;
                aO.t = aO.t + aL.t;
                var aJ = C("#tl-a-" + aB.id);
                if (aJ.length === 0) {
                    aJ = g.render(aB, aD, c);
                    K(aJ);
                    aj(aJ, aB.styles, a.getSourceDomain(aB.contentUrl));
                    aJ.appendTo("#tlTagContainer")

                }
                var aN = aJ.data("bubbledata");
                aC.find(".tl-a-" + aB.id).parent().remove();
                var aI = G.render(aO, aB, aN.rtid);
                aI.appendTo(aC);
                var aH = aI.find(".tl-a-" + aB.id).first();
                aH.data("thing", aB);
                aJ.css("cssText", aJ[0].style.cssText + "z-index: " + (aG + 1) + ";");
                var aM = aH.find(".nubbin").last();
                aM.css("z-index", aG);
                E.attach(aH, aC);
                if (aF) {
                    aF(aB)

                }

            },
            0)

        }
        function U(aB, aC) {
            aB.find(".tagx").each(function() {
                var aH = A.getThingPieces(this);
                var aG = aH.nubbin.attr("tl-thing-id");
                var aF = true;
                var aD,
                aE;
                if ((aC !== undefined)) {
                    for (aD = 0; aD < aC.length; aD++) {
                        aE = aC[aD];
                        if (aG === aE.id) {
                            aF = false;
                            break

                        }

                    }

                }
                if (aF) {
                    aH.bubble.remove();
                    aH.nubbin.remove()

                }

            })

        }
        function am(aS) {
            var a0,
            aL,
            aT;
            if (!aS.tlImage("isOk")) {
                M(aS, false);
                return

            }
            aL = f.getDimensions(aS);
            a0 = aS.tlImage("sceneData");
            if (!a0) {
                if (aS.tlImage("isInspectedByThinglink")) {
                    return

                }
                a0 = {
                    things: [],
                    allowEdit: true

                }

            }
            aT = (a0.things && a0.things.length !== 0);
            M(aS, true, !aT);
            try {
                aS.parents("a").addClass("tlWrappingAnchor");
                if (!a.no(a0.id)) {
                    aS.attr("tl-scene-id", a0.id)

                }
                var a4 = aS.closest(".tlImageContainer");
                var aX = aS.tlImage("isWhitelabel");
                if (!aX && a0.showFourDotsMenu && I.fourDotsInfo) {
                    t.setup(a4, a0);
                    a0.branding = ""

                } else {
                    if (aS.tlImage("hasThinglinkBadge")) {
                        a4.find(".tlMenu").wrap('<a href="https://www.thinglink.com?buttonSource=badgeButtonBoxPro"></a>')

                    }

                }
                var aR = aS.css("z-index") || 0;
                var aM = 1;
                aR = (aR === "auto") ? 1: parseInt(aR, 10) + aM;
                if (a0.titleUrl !== undefined) {
                    var aW = f.getExtent(aS);
                    var aB = a.getDomain(a0.titleUrl);
                    var aZ = C('<div class="tlFirstseen"><a href="' + a0.titleUrl + '">' + y("OriginallyThinglinked", aB) + "</a></div>");
                    a4.append(aZ);
                    aZ.css("cssText", "bottom: " + aW["padding-bottom"] + "px !important; left: " + aW["padding-left"] + "px !important;");
                    aZ.click(function() {
                        window.location = C(this).find("a").attr("href")

                    })

                }
                aa(a4, aS, aL, aR);
                T(a4, aS, a0);
                var aQ = (aL.w < 130 || aL.h < 130);
                var aF = (C(window).width() < 300 || C(window).height() < 140);
                var aD = function() {
                    a4.find(".tlMenuItemShare,.tlMenuItemTouch").hide()

                };
                var aV = I.isThinglinkSite();
                var a3 = a0.hideitems || {
                    touch: false,
                    share: false

                };
                var aH = function() {
                    if (I && I.extraSidebarIcons && I.extraSidebarIcons.indexOf("Post") !== -1) {
                        C.ajax({
                            url: window.contextPath + "/api/user/me/channels?contains=" + a0.id + "&scope=groups",
                            success: function(bc) {
                                var bh = C(".tlMenuItemPost"),
                                bd = bc.results,
                                be = true,
                                bi = function(bm, bl) {
                                    if (bm.title > bl.title) {
                                        return 1

                                    }
                                    if (bm.title < bl.title) {
                                        return - 1

                                    }
                                    return 0

                                };
                                bd.sort(bi);
                                function a5(bl) {
                                    return bl.map(function(bm) {
                                        return '<div id="progress-' + escapeHtml(bm.id) + '" class="channelProgress"></div><div class="channel"><input type="checkbox" class="addToChannel" id="' + escapeHtml(bm.id) + '"' + (bm.contains[a0.id] ? ' checked="true"': "") + '/> <div class="title">' + escapeHtml(bm.title) + '</div><div id="checked-' + escapeHtml(bm.id) + '" class="_icon_checked checked" style="display: ' + (bm.contains[a0.id] ? "inline-block": "none") + '"></div><div id="unchecked-' + escapeHtml(bm.id) + '" class="_icon_unchecked checked" style="display: ' + (bm.contains[a0.id] ? "none": "inline-block") + '"></div></div>'

                                    }).join("")

                                }
                                function a8(bn, bl) {
                                    var bm = [];
                                    if (bn && bn !== " ") {
                                        bl.map(function(bo) {
                                            if (bo.title.toLowerCase().indexOf(bn.toLowerCase()) !== -1) {
                                                bm.push(bo)

                                            }

                                        })

                                    } else {
                                        bm = bl

                                    }
                                    return bm

                                }
                                function bf(bl) {
                                    return '<input dir="auto" id="channelSearch" name="channelSearch" type="text" placeholder="Find or create channel" maxlength="60"/>'.concat('<button style="display:none" id="addChannel" class="btn btn-primary _icon_add"> Create new channel</button>').concat('<div id="channelError" style="display: none"></div>').concat('<div id="channelList">').concat(a5(bl)).concat("</div>")

                                }
                                function bg(bm) {
                                    if (bm) {
                                        var bl = document.getElementById("channelSearch").value;
                                        if (bl && bd.map(function(bn) {
                                            return bn.title.toLowerCase().trim() !== bl.toLowerCase().trim()

                                        }).reduce(function(bn, bo) {
                                            return bn && bo

                                        })) {
                                            document.getElementById("addChannel").setAttribute("style", "display: inline")

                                        } else {
                                            document.getElementById("addChannel").setAttribute("style", "display: none")

                                        }
                                        return bm

                                    } else {
                                        document.getElementById("addChannel").setAttribute("style", "display: inline");
                                        return ""

                                    }

                                }
                                function a6() {
                                    be = true;
                                    bh.popover("hide")

                                }
                                function bk(bm, bl) {
                                    bl.map(function(bn) {
                                        if (bn.id === bm) {
                                            bn.contains[a0.id] = true

                                        }

                                    });
                                    document.getElementById(bm.toString()).checked = true;
                                    document.getElementById("checked-" + bm).setAttribute("style", "display: inline-block");
                                    document.getElementById("unchecked-" + bm).setAttribute("style", "display: none")

                                }
                                function bj(bm, bl) {
                                    bl.map(function(bn) {
                                        if (bn.id === bm) {
                                            bn.contains[a0.id] = false

                                        }

                                    });
                                    document.getElementById("checked-" + bm).setAttribute("style", "display: none");
                                    document.getElementById("unchecked-" + bm).setAttribute("style", "display: inline-block")

                                }
                                function a7(bn, bl) {
                                    var bm = document.getElementById("channelList");
                                    while (bm.firstChild) {
                                        bm.removeChild(bm.firstChild)

                                    }
                                    C(bm).append(bg(a5(a8(bn, bl), bl)))

                                }
                                function bb() {
                                    bh.popover({
                                        container: "body",
                                        placement: "left",
                                        title: '<span class="_icon_images"></span> Post to channel<span id="closeAddChannel" class="_icon_close"></span>',
                                        content: bf(bd),
                                        trigger: "click",
                                        html: true

                                    })

                                }
                                function a9(bm) {
                                    var bl = document.getElementById("channelError");
                                    bl.textContent = JSON.parse(bm.responseText).error.description;
                                    bl.setAttribute("style", "display: block")

                                }
                                bb();
                                bh.on("vclick", 
                                function() {
                                    if (be) {
                                        if (bd.length > 15) {
                                            C("body").addClass("fixPopover")

                                        }
                                        if (! (document.documentElement.hasOwnProperty("ontouchstart"))) {
                                            C("#channelSearch").focus()

                                        }

                                    } else {
                                        bh.popover("destroy");
                                        bb()

                                    }
                                    be = !be

                                });
                                function ba() {
                                    var bm = document.getElementById("channelSearch"),
                                    bl = document.getElementById("addChannel"),
                                    bn = bm.value.trim();
                                    bm.setAttribute("disabled", "true");
                                    bl.setAttribute("disabled", "true");
                                    C.ajax({
                                        url: window.contextPath + "/api/user/me/channels",
                                        type: "POST",
                                        data: {
                                            title: bn

                                        },
                                        success: function(bo) {
                                            bl.setAttribute("style", "display: none");
                                            if (!bo.results.contains) {
                                                bo.results.contains = {};
                                                bo.results.contains[a0.id.toString()] = false

                                            }
                                            if (bn !== bo.results.title) {
                                                bm.value = bo.results.title

                                            }
                                            bd.push(bo.results);
                                            bd.sort(bi);
                                            a7(bm.value, bd)

                                        },
                                        error: function(bo) {
                                            a9(bo)

                                        },
                                        complete: function() {
                                            bm.removeAttribute("disabled");
                                            bl.removeAttribute("disabled")

                                        }

                                    })

                                }
                                C("body").on("vclick", "#addChannel", ba);
                                C("body").on("change", ".addToChannel", 
                                function(bo) {
                                    var bn = bo.target,
                                    bm = bn.id;
                                    bn.setAttribute("disabled", "true");
                                    var bl = document.getElementById("progress-" + bm);
                                    if (document.addEventListener) {
                                        bl.setAttribute("style", "width: 25%")

                                    }
                                    if (bo.target.checked) {
                                        C.ajax({
                                            url: window.contextPath + "/api/channel/" + bm + "/content",
                                            data: {
                                                itemIds: a0.id

                                            },
                                            xhr: function() {
                                                var bp = C.ajaxSettings.xhr();
                                                function bq(br) {
                                                    if (br.lengthComputable) {
                                                        var bs = br.loaded / br.total;
                                                        bl.setAttribute("style", "width: " + bs * 100 + "%")

                                                    }

                                                }
                                                if (bp.addEventListener) {
                                                    bp.addEventListener("progress", bq, false)

                                                }
                                                return bp

                                            },
                                            type: "POST",
                                            success: function() {
                                                bk(bm, bd)

                                            },
                                            error: function(bp) {
                                                a9(bp)

                                            },
                                            complete: function() {
                                                bn.removeAttribute("disabled");
                                                if (bl.classList) {
                                                    bl.classList.add("progressDone");
                                                    setTimeout(function() {
                                                        bl.removeAttribute("style");
                                                        bl.classList.remove("progressDone")

                                                    },
                                                    400)

                                                }

                                            }

                                        })

                                    } else {
                                        C.ajax({
                                            url: window.contextPath + "/api/channel/" + bm + "/content?itemIds=" + a0.id,
                                            type: "DELETE",
                                            xhr: function() {
                                                var bp = C.ajaxSettings.xhr();
                                                function bq(br) {
                                                    if (br.lengthComputable) {
                                                        var bs = br.loaded / br.total;
                                                        bl.setAttribute("style", "width: " + bs * 100 + "%")

                                                    }

                                                }
                                                if (bp.addEventListener) {
                                                    bp.addEventListener("progress", bq, false)

                                                }
                                                return bp

                                            },
                                            success: function() {
                                                bj(bm, bd)

                                            },
                                            error: function(bp) {
                                                a9(bp)

                                            },
                                            complete: function() {
                                                bn.removeAttribute("disabled");
                                                if (bl.classList) {
                                                    bl.classList.add("progressDone");
                                                    setTimeout(function() {
                                                        bl.removeAttribute("style");
                                                        bl.classList.remove("progressDone")

                                                    },
                                                    400)

                                                }

                                            }

                                        })

                                    }

                                });
                                C("body").on("keyup", "#channelSearch", 
                                function(bl) {
                                    document.getElementById("channelError").setAttribute("style", "display: none");
                                    if (bl.keyCode === 13) {
                                        ba(bl)

                                    } else {
                                        if (bl.keyCode === 27) {
                                            a6()

                                        } else {
                                            a7(bl.target.value, bd)

                                        }

                                    }

                                });
                                C("body").on("vclick", "#closeAddChannel", a6);
                                if (!document.documentElement.hasOwnProperty("ontouchstart")) {
                                    C(window).resize(a6)

                                }
                                C(document).on("vclick", 
                                function(bl) {
                                    if (bl.target.className.toLowerCase().indexOf("post") === -1 && !C(bl.target).closest("div.popover").length && C("div.popover").is(":visible")) {
                                        a6()

                                    }

                                })

                            }

                        })

                    }

                };
                if (a0.id) {
                    aH();
                    var aG = function(a5) {
                        return function(a6) {
                            a6.stopPropagation();
                            var a7;
                            if (a5 === "Share") {
                                a7 = ae

                            } else {
                                if (a5 === "Touch") {
                                    a7 = N

                                } else {
                                    if (a5 === "Fullscreen") {
                                        a7 = af

                                    }

                                }

                            }
                            a7(a4, aS, a0, aR);
                            return false

                        }

                    };
                    if (I && I.extraSidebarIcons && I.extraSidebarIcons.indexOf("Fullscreen") !== -1) {
                        a4.find(".tlMenuFullscreen").parent().unbind("vclick").bind("vclick", aG("Fullscreen"))

                    }
                    var aU,
                    aN;
                    for (aU = 0; aU < Z.length; aU++) {
                        aN = Z[aU];
                        if (!a3[aN.toLowerCase()] || aV) {
                            a4.find(".tlMenu" + aN).parent().unbind("vclick").bind("vclick", aG(aN));
                            if (aN === "Touch") {
                                ak([a0.touched, a0.id, a0.touches])

                            }

                        } else {
                            a4.find(".tlMenuItem" + aN).hide()

                        }

                    }
                    if (aQ || aF || a0.visibility === "PRIVATE") {
                        aD()

                    }

                } else {
                    aD()

                }
                ad(a4, aS, a0);
                if (!I.manualViewStats) {
                    x.installTracker(a0, a4)

                }
                if (!I.disableContextMenu && !I.disableMenuItems) {
                    an(a4, aR, a3)

                }
                if (aV) {
                    a4.addClass("tlThinglinkSite")

                }
                var a1 = function(a5) {
                    return function(a6) {
                        var a7 = C(this);
                        if (a6.type === "touchend") {
                            a7.click();
                            return false

                        }
                        if (a6.type === "mouseenter") {
                            a7.addClass(a5)

                        } else {
                            a7.removeClass(a5)

                        }

                    }

                };
                C(".tlSidebar .tlMenuItem").bind("mouseenter mouseleave touchend", a1("tlMenuItemHover"));
                if (a0 && a.no(a0.error)) {
                    F.attach(a4);
                    if (aX) {
                        a4.find(".tlMenuItemTouch").hide()

                    }
                    if (I.makeSidebarSticky) {
                        C(".tlSidebar").show()

                    }
                    var aC = function(a5) {
                        var a7 = ["contentUrl", "icon", "thingUrl"],
                        a6,
                        a8;
                        for (a6 = 0; a6 < a7.length; a6++) {
                            a8 = a7[a6];
                            if (a5[a8] && a5[a8].substring(0, 2) === "//") {
                                a5[a8] = a.getProtocol() + a5[a8]

                            }

                        }

                    };
                    var aO = a0.things,
                    a2,
                    aK;
                    if (aO !== undefined) {
                        var aP = 0;
                        var aE = function(a5) {
                            v.resizeNubbinsForThing(a5.id, a5.nubbin);
                            aP = aP + 1;
                            if (I.nubbinSneakPeek && (aP === aO.length)) {
                                ai(a4);
                                P(a4)

                            } else {
                                if (I.makeNubbinsSticky) {
                                    setTimeout(function() {
                                        l.variateOpacity("show", a4.find("div.nubbin"), 1)

                                    },
                                    1)

                                }

                            }

                        };
                        var aJ;
                        for (a2 = 0; a2 < aO.length; a2++) {
                            aK = aO[a2];
                            aC(aK);
                            if (C.type(aK.styles) != "object") {
                                aJ = "";
                                try {
                                    aJ = aK.styles ? JSON.parse(aK.styles) : {}

                                } catch(aY) {}
                                aK.styles = C.extend(o.defaultCustomStyles(), aJ)

                            }
                            ap(a4, aS, aK, aR, aX, aE)

                        }

                    }
                    U(a4, aO)

                }

            } catch(aI) {
                console.log(aI)

            }

        }
        function R(aB) {
            if (aB.lang) {
                I.setRequestLanguage(aB.lang)

            }
            if (aB.owner === true || aB.owner === false) {
                j.setUserLoggedIn(true)

            }
            d.getQueriedImages().each(function() {
                var aG = C(this);
                var aH = H.getSceneUrl(this);
                var aF = aB[Q(aG).id];
                if (!aF) {
                    aF = aB[aH]

                }
                if (!aF) {
                    aF = aB[a.cleanURIEncoding(aH)]

                }
                if (!aF) {
                    aF = aB[encodeURIComponent(aH)]

                }
                if (!aF) {
                    try {
                        aF = aB[decodeURIComponent(aH)]

                    } catch(aJ) {}

                }
                if (!aF) {
                    aF = null

                }
                var aE = (aF && aF.things && aF.things.length !== 0);
                var aD = (aF && aG.tlImage("isAlwaysThinglink"));
                if (aB.owner || (aF && aF.allowEdit) || aE || aD) {
                    s.triggerEvent("tlScenesFound");
                    aG.parents(".tlImageContainer").find(".tlMenu").show();
                    aG.tlImage("sceneData", aF);
                    if (aG.tlImage("hasSize")) {
                        am(aG)

                    } else {
                        aG.load(function() {
                            am(aG)

                        })

                    }

                } else {
                    if (aF) {
                        var aC = aG.parents(".tlImageContainer");
                        aC.find(".tlMenu, .tlSidebar").hide(200);
                        aC.unbind("mouseenter mouseleave");
                        var aI = {
                            w: 0,
                            h: 0

                        };
                        if (aG.tlImage("hasSize")) {
                            aI = f.getDimensions(aG)

                        }
                        aC.css({
                            cssText: "width:" + aI.w + "px!important; height:" + aI.h + "px!important;"

                        })

                    }

                }

            })

        }
        function az() {
            var aB = window.location.href.replace(/^[^\#]+\#?/, "");
            if (aB.match(/tl[\-\=]/)) {
                aB = aB.slice(3);
                C("img").each(function() {
                    var aD = r.generateImageHash(this);
                    if (aD == aB) {
                        var aC = I.activateImage;
                        if (aC) {
                            aC(C(this))

                        }
                        return false

                    }

                })

            }

        }
        function ar() {
            C.extend(C.easing, {
                easeOutCubic: function(aC, aD, aB, aF, aE) {
                    return aF * ((aD = aD / aE - 1) * aD * aD + 1) + aB

                }

            })

        }
        function ah(aC) {
            if (aC.tlImage("isOk")) {
                d.addQueriedImage(aC);
                var aB = Q(aC).id;
                if (!aB) {
                    if (window.__tlid) {
                        w.rebuild(H.getSceneUrl(aC))

                    } else {
                        var aD = B.getCacheSceneId(H.getSceneUrl(aC));
                        if (aD) {
                            aC.attr("tl-scene-id", aD);
                            w.rebuild(aD)

                        }

                    }

                } else {
                    w.rebuild(aB)

                }

            }

        }
        function O(aD) {
            var aC = C(aD);
            var aB = aC.closest(".tlImageContainer");
            if (aB.length > 0) {
                w.removeTags(aB);
                aC.removeAttr("tl-scene-id");
                aB.find(".tlEmbedPopup, .tlSharePopup").remove()

            }
            ah(aC)

        }
        var ao = function(aH, aG, aD) {
            if (!aH) {
                return

            }
            var aC = aH.attr("tl-thing-id"),
            aF = C("img[tl-scene-id=" + aG + "]").first(),
            aB = J(aC, aF.tlImage("sceneData"));
            var aE = function(aI) {
                x.logClick(aC, aG, aF, aI)

            };
            if (aD) {
                aD = decodeURIComponent(aD);
                g.relocateOrOpen(aD, aE, aB, window.top === window.self)

            } else {
                aE()

            }

        };
        var J = function(aD, aB) {
            var aC;
            if (aB) {
                aB.things.map(function(aE) {
                    if (aE.id === aD) {
                        aC = aE

                    }

                })

            }
            return aC

        };
        var au = function(aF, aC) {
            if (!aF) {
                return

            }
            var aB = aF.attr("tl-thing-id");
            var aE = C("#tl-a-" + aB).find("iframe");
            var aD = aF.data("thing").styles || aF.data("tlStyles") || {};
            aD = a.extend(o.defaultCustomStyles(), aD);
            o.sendStylesToIframe(aE, aD, aC)

        };
        var V = function() {
            C(".tlSharePopup").hide()

        };
        var S = function(aF, aC) {
            if (!aF) {
                return

            }
            aC = decodeURIComponent(aC);
            var aD = A.getThingPieces(aF);
            var aB = aD.bubble.data("bubbledata");
            var aE = aB.rtid;
            k.registerThing(aC, aE)

        };
        var ac = function(aD, aC) {
            if (!aD) {
                return

            }
            if (aC == "true") {
                aC = true

            } else {
                if (aC == "false") {
                    aC = false

                } else {
                    aC = null

                }

            }
            var aB = aD.attr("tl-thing-id");
            C("#tl-a-" + aB).toggleClass("tlPlaying tlSticky", aC)

        };
        var X = function(aC, aB) {
            if (!aC) {
                return

            }
            aB = decodeURIComponent(aB);
            if (/^http:\/\//.test(aB)) {
                aC.attr("href", aB)

            } else {
                aC.removeAttr("href")

            }

        };
        var W = function(aK, aC, aN) {
            if (!aK) {
                return

            }
            var aL = parseInt(aC, 10);
            var aF = parseInt(aN, 10);
            if (isNaN(aL) && isNaN(aF)) {
                return

            }
            var aG = aK.attr("tl-thing-id");
            var aI = C("#tl-a-" + aG).find(".tlThingContent");
            var aM = aI.find(".tlSpinner");
            var aE = aI.find("iframe");
            var aB = u.parseCssText(aE.attr("style"), true, true);
            var aH = aB["max-width"];
            var aO = aB["max-height"];
            if (aL > 0) {
                if (aL < 50) {
                    aL = 50

                } else {
                    if (aL > 800) {
                        aL = 800

                    }

                }
                if (aH && aL > aH) {
                    aL = aH

                }
                aB.width = aL + "px;";
                var aJ = u.parseCssText(aI.attr("style"), false, false);
                aJ.width = aL + "px !important";
                aI.css({
                    cssText: a.mapToCssText(aJ)

                })

            } else {
                aB.width = aE.width() + "px;"

            }
            if (aF > 0) {
                if (aF < 20) {
                    aF = 20

                } else {
                    if (aF > 600) {
                        aF = 600

                    }

                }
                if (aO && aF > aO) {
                    aF = aO

                }
                aB.height = aF + "px;"

            } else {
                aB.height = aE.height() + "px;"

            }
            aB["max-width"] = aB["max-width"] + "px";
            aB["max-height"] = aB["max-height"] + "px";
            var aD = "";
            if (aB.opacity) {
                aD += " opacity: " + aB.opacity + ";";
                aB.opacity = null

            }
            aM.css({
                cssText: a.mapToCssText(aB, true)

            });
            aE.css({
                cssText: a.mapToCssText(aB, true) + aD

            });
            if (aK.hasClass("hovered")) {
                c(aK)

            }

        };
        var aA = function(aB) {
            if (w.editorPopup) {
                w.editorPopup.close();
                w.editorPopup = null

            }
            C("#thinglinkCBClose").click();
            if (w.editorCloseCallback) {
                w.editorCloseCallback.call(this, aB)

            }

        };
        function al(aC) {
            var aE = aC[0];
            var aB = aC[1];
            var aD = aC[2];
            switch (aE) {
                case "resize":
                W(aB, aD[0], aD[1]);
                break;
                case "setSticky":
                ac(aB, aD[0]);
                break;
                case "closeEditor":
                aA(aD[0]);
                break;
                case "setNubbinClickUrl":
                X(aB, aD[0]);
                break;
                case "changeTagContentUrl":
                S(aB, aD[0]);
                break;
                case "touchLogin":
                j.touchLoginCallback(null, aD[0]);
                break;
                case "sharingLinkOpened":
                V(aD[0], aD[1]);
                break;
                case "tagClick":
                ao(aB, aD[0], aD[1]);
                break;
                case "getStyles":
                au(aB, aD[0]);
                break;
                default:
                console.warn("Unknown postmessage command " + aE)

            }

        }
        function ay(aD) {
            if (w.status != "loadcomplete") {
                var aB = aD.parent().parent();
                w.removeTags(aB);
                aB.find(".tlMenuItemShare,.tlMenuItemTouch").show();
                var aC = aD.attr("tl-scene-id");
                var aE = H.getSceneUrl(aD);
                if (!aC) {
                    w.rebuild(aE)

                } else {
                    w.rebuild(aC)

                }

            }

        }
        function L() {
            var aC = true;
            var aD = 0;
            var aF = a.isTouchDevice ? "tlTouchDevice": "";
            var aE = C("#tlTagContainer");
            if (aE.length === 0) {
                aE = C('<div id="tlTagContainer" class="' + aF + '"/>').appendTo("body")

            } else {
                aE.addClass(aF)

            }
            var aB = {
                tagify: function(aP) {
                    var aN = C.extend({
                        complete: null,
                        everyLink: false,
                        maxAge: null

                    },
                    aP);
                    var aH = function() {
                        aD++;
                        return aD

                    };
                    var aL = function(aR, aS) {
                        C.getJSON(I.getApiBaseUrl() + "/api/resolvetag?client_id=" + I.clientId + "&url=" + aR.map(encodeURIComponent).join("|") + (aN.maxAge ? "&maxAge=" + aN.maxAge: "") + (I.isThinglinkSite() ? "": "&callback=?"), aS)

                    };
                    var aO = function(aR, aW, aX) {
                        var aS = ((aW !== undefined) ? aW.content: {});
                        if (C.isEmptyObject(aS) && aR.attr("href") !== "") {
                            aS.title = aR[0].hostname;
                            aS.thingUrl = aR.attr("href")

                        }
                        aS.id = aR.attr("tl-thing-id");
                        aS.productName = aR.attr("title") || "";
                        var aT = aR.attr("data-tagopacity");
                        aS.opacity = (aT == null || aT.length === 0) ? "1.0": parseFloat(aT);
                        aR.data("thing", aS);
                        if (!aX && A.getThingPieces(aR).nubbin[0].offsetLeft > 0) {
                            var aV = g.render(aS, null, c);
                            K(aV);
                            aj(aV, aS.styles, a.getSourceDomain(aS.contentUrl));
                            var aU = aV.data("bubbledata").rtid;
                            aR.addClass("rtid-" + aU);
                            aE.append(aV)

                        }
                        E.attach(aR)

                    };
                    var aK = function(aR) {
                        aR.removeAttr("tl-thing-id").removeClass("tagx");
                        aR[0].className = aR[0].className.replace(/tl-a-000\d+ ?/, "")

                    };
                    var aG = function(aW, aV) {
                        var aT,
                        aS,
                        aX = [];
                        var aU,
                        aR;
                        for (aT in aV) {
                            if (aV.hasOwnProperty(aT)) {
                                aU = aV[aT];
                                for (aS = 0; aS < aU.length; aS++) {
                                    if (!C.isEmptyObject(aW[aT]) || aN.everyTag) {
                                        aR = (aS !== 0);
                                        aO(aU[aS], aW[aT], aR);
                                        aX.push(aU[aS])

                                    } else {
                                        aK(aU[aS])

                                    }

                                }

                            }

                        }
                        if (typeof aN.complete == "function") {
                            aN.complete.call(document, aX)

                        }

                    };
                    if (aC) {
                        aC = false;
                        q.injectEmbedCSS()

                    }
                    var aQ = this.filter("a[href],a[tl-tagify-url]");
                    var aM = {};
                    var aJ = [];
                    aQ.each(function() {
                        var aR = C(this);
                        var aU = aR.attr("tl-tagify-url");
                        var aS = aU || (aR.attr("href") != null ? this.href: "#");
                        var aT;
                        if (aN.everyTag || (aS.length > 5 && aS.substring(0, 1) != "#")) {
                            if (aM[aS]) {
                                aT = aM[aS][0].attr("tl-thing-id");
                                aM[aS].push(aR)

                            } else {
                                aT = "000" + aH();
                                aM[aS] = [aR];
                                aJ.push(aS)

                            }
                            aR.addClass("tl-a-" + aT).addClass("tagx").attr("tl-thing-id", aT)

                        }

                    });
                    var aI = function(aR) {
                        aG(aR, aM)

                    };
                    if (aQ.length > 0) {
                        aL(aJ, aI)

                    }

                },
                isImageTag: function() {
                    var aG = this.attr("tl-thing-id");
                    if (aG.substring(0, 3) == "000") {
                        return false

                    }
                    return true

                },
                reposition: function() {
                    this.each(function() {
                        c(C(this))

                    });
                    return this

                },
                makeNewHair: function(aH, aI, aG) {
                    aj(aH, aI, aG)

                },
                setStyles: function(aG) {
                    this.data("tl-styles", aG);
                    this.each(function() {
                        var aK = C(this);
                        var aH = aK.attr("tl-thing-id");
                        var aI = C("#tl-a-" + aH);
                        var aJ = "";
                        if (aK.data("thing")) {
                            aJ = a.getSourceDomain(aK.data("thing").contentUrl)

                        }
                        aB.makeNewHair(aI, aG, aJ)

                    })

                },
                getStyles: function() {
                    return this.data("tl-styles")

                },
                getRawDescription: function() {
                    return this.data("tl-raw-description")

                },
                setDescription: function(aH, aG) {
                    this.data("tl-raw-description", aH);
                    aH = aH.replace(/\n\n+/g, "\n\n");
                    aH = aH.replace(/\n/g, "<br>");
                    this.each(function() {
                        var aM = C(this);
                        var aK = aM.attr("tl-thing-id");
                        var aL = C("#tl-a-" + aK);
                        if (aL.hasClass("tlThemeIframeThing")) {
                            if (aL.find(".tlIframeDescription").length === 0) {
                                if (aH.length > 0) {
                                    aL.find(".tlThingContent").prepend('<div class="tlIframeDescription" /><hr class="tlHrDescription" />')

                                }

                            } else {
                                if (aH === "") {
                                    aL.find(".tlIframeDescription").remove();
                                    aL.find(".tlHrDescription").remove()

                                }

                            }
                            aL.find(".tlIframeDescription").html(aH)

                        } else {
                            if (aL.hasClass("tlThemeRichThing")) {
                                aL.find(".tlThingTitle").html(aH)

                            } else {
                                var aJ = aL.find(".tlThingContent");
                                aJ.html(aH);
                                g.setBubbleTagTextStyle(aL, aH);
                                if (aG.length > 0) {
                                    if (aH.length > 0) {
                                        aJ.append("<br>")

                                    }
                                    var aI = C('<a class="tlThingLink" href="' + aG + '"></a>');
                                    aI.text(aI[0].hostname);
                                    aJ.append(aI)

                                }

                            }

                        }

                    });
                    return this

                },
                open: function(aG) {
                    this.each(function() {
                        var aH = C(this);
                        if (!aH.hasClass("hovered")) {
                            var aI = aH.attr("tl-thing-id");
                            C("#tl-a-" + aI).addClass(aG ? "tlSticky": "");
                            aH.mouseenter();
                            c(aH)

                        }

                    });
                    return this

                },
                close: function() {
                    this.each(function() {
                        var aG = C(this);
                        var aH = aG.attr("tl-thing-id");
                        aG.removeClass("tlSticky mouseover linked hovered");
                        if (C("#tl-a-" + aH).hide().hasClass("tlPlaying")) {
                            C("#tl-a-" + aH).find(".tlThingClose").click()

                        }

                    });
                    return this

                },
                isOpen: function() {
                    return this.hasClass("hovered")

                }

            };
            C.fn.tlTag = function(aG) {
                return aB[aG].apply(this, Array.prototype.slice.call(arguments, 1))

            }

        }
        function aw() {
            h.finalFetchCompleteCallback(function() {
                n.setStatus("tagfetchcomplete")

            });
            h.dataReceivedCallback(R);
            k.init();
            k.addListener("postMessageCommand", al);
            j.addListener("updateSceneTouchStatus", ak);
            i.addListener("editorClose", ay);
            L();
            var aB = function(aD) {
                ah(C(aD))

            };
            var aC = function(aD) {
                O(C(aD))

            };
            e.track("img", "src", aB, aC);
            C(window).bind("resize", b({
                after: function() {
                    w.reposition()

                },
                threshold: 200,
                allowPropagation: true

            }));
            ar();
            az();
            aq()

        }
        aw()

    } ());
    return w

});
tlRequire.define("measure", ["jQuery", "util"], 
function(c, a) {
    var b = {
        limitSizeHelper: function(f, e, k) {
            var i = 18;
            var h = f[1] - f[0];
            if (h < i) {
                var d = (i - h) / 2;
                f[0] = f[0] - d;
                f[1] = f[1] + d;
                var j = (e - f[0]);
                if (j > 0) {
                    f[0] = e;
                    f[1] = f[1] + j

                }
                var g = (f[1] - k);
                if (g > 0) {
                    f[0] = f[0] - g;
                    f[1] = k

                }

            }
            return f

        },
        getThingRect: function(j, g) {
            var f = c(j);
            if (f.length) {
                var h = b.getExtent(f);
                var i = f.width();
                var e = f.height();
                var d = [Math.round(i * g.x1), Math.round(i * g.x2)];
                var k = [Math.round(e * g.y1), Math.round(e * g.y2)];
                d = b.limitSizeHelper(d, 0, i);
                k = b.limitSizeHelper(k, 0, e);
                return {
                    t: k[0] + h.t,
                    l: d[0] + h.l,
                    w: (d[1] - d[0]),
                    h: (k[1] - k[0])

                }

            } else {
                return {
                    t: 0,
                    l: 0,
                    w: 0,
                    h: 0

                }

            }

        },
        getCoordinates: function(g) {
            var e = c(g);
            if (e.length) {
                var f = b.getExtent(e);
                var d = f.l;
                var h = f.t;
                return {
                    x: d,
                    y: h

                }

            } else {
                return {
                    x: 0,
                    y: 0

                }

            }

        },
        getDimensions: function(i) {
            var f = c(i);
            var e = {
                w: 0,
                h: 0,
                rawWidth: 0,
                rawHeight: 0

            };
            if (f.length) {
                var h = b.getExtent(f);
                e = a.extend(h);
                e.rawWidth = f.width();
                e.rawHeight = f.height();
                var d = e.rawWidth + h.l + h.r;
                var g = e.rawHeight + h.t + h.b;
                e.w = d;
                e.h = g

            }
            return e

        },
        getExtent: function(e, p) {
            var d = c(e);
            if (!p) {
                p = ["margin", "padding", "border"]

            }
            var n = ["box-sizing", "border-left-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-style", "border-top-style", "border-right-style", "border-bottom-style", "border-left-width", "border-top-width", "border-right-width", "border-bottom-width", "padding-left", "padding-top", "padding-right", "padding-bottom", "background-color", "left", "top", "right", "bottom"];
            var k = {
                l: 0,
                t: 0,
                r: 0,
                b: 0

            },
            f,
            g,
            l;
            if (d.length) {
                for (f = 0; f < n.length; f++) {
                    k[n[f]] = d.css(n[f]) || 0

                }
                for (f = 0; f < p.length; f++) {
                    g = p[f];
                    l = (g == "border") ? "-width": "";
                    var h = g + "-left" + l;
                    var m = g + "-top" + l;
                    var j = g + "-right" + l;
                    var o = g + "-bottom" + l;
                    k[h] = parseInt(d.css(h), 10) || 0;
                    k[m] = parseInt(d.css(m), 10) || 0;
                    k[j] = parseInt(d.css(j), 10) || 0;
                    k[o] = parseInt(d.css(o), 10) || 0;
                    k.l += k[h];
                    k.t += k[m];
                    k.r += k[j];
                    k.b += k[o]

                }

            }
            return k

        }

    };
    return b

});
tlRequire.define("namespace", [], 
function() {
    if (window.__thinglink === undefined) {
        window.__thinglink = {}

    }
    if (window.__tlconfig !== undefined) {
        window.__thinglink.config = window.__tlconfig

    }
    return window.__thinglink

});
tlRequire.define("nodeChangeTracker", ["browserFeats"], 
function(e) {
    function a(f, h, g) {
        return f.each(function() {
            var k = this;
            var j = k[h];
            var i = function(m) {
                if (m && m.attrName && m.attrName != h) {
                    return

                }
                var n = k[h];
                if (n != j) {
                    var l = j;
                    j = n;
                    g(k, n, l)

                }

            };
            if (typeof(this.onpropertychange) === "object") {
                $tlJQ(this).unbind("propertychange").bind("propertychange", i)

            } else {
                if (e.hasDomAttrModified()) {
                    $tlJQ(this).unbind("DOMAttrModified").bind("DOMAttrModified", i)

                }

            }

        })

    }
    function b(f, j, i, h) {
        if (!h) {
            h = 1000

        }
        var g = function() {
            $tlJQ(f).each(function() {
                var m = $tlJQ(this);
                var l = this[j];
                var k = m.data("store-value-" + j);
                if (!k) {
                    m.data("store-value-" + j, l)

                } else {
                    if (l != k) {
                        m.data("store-value-" + j, l);
                        i(this, l, k)

                    }

                }

            })

        };
        g();
        setInterval(g, h)

    }
    function d(j, g, h, k, i) {
        if (!i) {
            i = 1000

        }
        var f = function(l) {
            setTimeout(function() {
                var m = $tlJQ(l);
                if (m.closest(".tlImageContainer").length !== 0 && !$tlJQ._data(m.closest(".tlImageContainer").get(0), "events")) {
                    k(l)

                } else {
                    if (!m.tlImage("isInspectedByThinglink") && m.tlImage("isOk")) {
                        if (m.tlImage("hasSize")) {
                            g(l)

                        } else {
                            m.load(function() {
                                g(l)

                            })

                        }

                    }

                }
                if (h) {
                    h(l)

                }

            },
            1)

        };
        if (e.hasDomNodeInserted()) {
            $tlJQ(document).bind("DOMNodeInserted", 
            function(m) {
                var l = $tlJQ(m.target).find(j).each(function() {
                    f(this)

                });
                if (m.target.nodeName.toLowerCase() === j) {
                    f(m.target)

                }

            })

        } else {
            setInterval(function() {
                $tlJQ(j).each(function() {
                    f(this)

                })

            },
            i)

        }

    }
    function c(i, g, f, h) {
        if (e.hasDomAttrModified() || typeof(document.body.onpropertychange) === "object") {
            a($tlJQ(i), g, h);
            d(i, f, 
            function(j) {
                a($tlJQ(j), g, h)

            },
            h)

        } else {
            b(i, g, h);
            d(i, f, null, h)

        }

    }
    return {
        track: c

    }

});
tlRequire.define("nubbinIconSizeManager", ["jQuery", "cssUtil"], 
function(c, b) {
    var a = (function() {
        var f = {};
        var h = function(m, k, j) {
            var i = 0;
            var l = 0;
            var n = false;
            if (f[m]) {
                i = f[m].w;
                l = f[m].h

            }
            if (j.width > i) {
                i = j.width;
                n = true

            }
            if (j.height > l) {
                l = j.height;
                n = true

            }
            if (n) {
                f[m] = {
                    w: i,
                    h: l

                };
                g(c(".tagx.nubbin-" + m), m, i, l)

            }

        };
        var g = function(l, j, i, k) {
            l.each(function() {
                var q = c(this);
                var p = b.parseCssText(q.attr("style"), true, true);
                var m = false;
                if (i > p.width) {
                    m = true;
                    var o = parseInt(p.left, 10) + p.width / 2;
                    p.left = o - i / 2;
                    p.width = i

                }
                if (k > p.height) {
                    m = true;
                    var n = parseInt(p.top, 10) + p.height / 2;
                    p.top = n - k / 2;
                    p.height = k

                }
                if (m) {
                    var r = {
                        l: p.left,
                        t: p.top,
                        w: p.width,
                        h: p.height

                    };
                    b.repositionElement(r, q[0])

                }

            })

        };
        var d = function() {
            var i;
            for (i in f) {
                if (f.hasOwnProperty(i)) {
                    g(c(".tagx.nubbin-" + i), i, f[i].w, f[i].h)

                }

            }

        };
        var e = function(j, i) {
            var k = c(".tagx.tl-a-" + j);
            if (f[i] !== undefined) {
                g(k, i, f[i].w, f[i].h)

            }

        };
        return {
            registerIcon: h,
            resizeAllNubbinsIfTooSmall: d,
            resizeNubbinsForThing: e

        }

    } ());
    return a

});
tlRequire.define("nubbinRenderer", ["nubbinIconSizeManager", "config", "util", "cssUtil"], 
function(c, b, a, e) {
    var d = (function() {
        var i = ["plain", "hover", "hoverlink", "highlight"];
        var h = {};
        function j(k) {
            return b.getCDNUrl() + "/api/nubbin/" + k

        }
        function g(n, m) {
            if (n) {
                var l = j(n) + "/" + m;
                var k = new Image();
                k.onload = function() {
                    c.registerIcon(n, m, this)

                };
                k.src = l;
                return "style=\"background-image: url('" + l + "') !important;\" "

            } else {
                return ""

            }

        }
        return function(n) {
            if (!h[n]) {
                var l = {};
                var k;
                for (k = 0; k < i.length; k++) {
                    var m = i[k];
                    l[m] = g(n, m)

                }
                h[n] = l

            }
            return h[n]

        }

    } ());
    function f(l, n, k) {
        var h = "tl-a-" + n.id;
        var g = n.nubbin ? "nubbin-" + n.nubbin + " ": "";
        var m = $tlJQ('<div class="tagx ' + g + h + '" tl-thing-id="' + n.id + '"></div>');
        e.repositionElement(l, m[0]);
        var o = d(n.nubbin);
        var j = n.thingUrl || "";
        m.attr("href", j);
        var i;
        if (j) {
            i = o.hoverlink

        } else {
            i = o.hover

        }
        var q = $tlJQ('<div class="nubbin"><div class="nubbinGlow" ' + o.highlight + '></div><div class="nubbinIcon" ' + o.plain + '></div><div class="nubbinHoverIcon" ' + i + "></div></div>");
        if ( !! n.pinned) {
            q.addClass("pinned")

        } else {
            q.addClass("unpinned")

        }
        q.appendTo(m);
        var p;
        if (k) {
            p = $tlJQ('<div id="' + k + '" class="tlThingContainer"></div>')

        } else {
            p = $tlJQ('<div class="tlThingContainer" ></div>')

        }
        m.appendTo(p);
        return p

    }
    return {
        render: f

    }

});
tlRequire.define("popup", ["config", "txt"], 
function(b, a) {
    function c(e, g, m, f) {
        var d = $tlJQ(m, e).first();
        if (d.length === 0) {
            var j = $tlJQ.trim(m.replace(/\./g, " "));
            d = $tlJQ('<div class="' + j + ' tlPopup"></div>');
            var l = $tlJQ('<a href="#" class="tlCloseBtn"></a>');
            var k = $tlJQ('<div class="tlPopupInner"></div>');
            l.bind("vmouseup", 
            function(n) {
                d.hide();
                return false

            });
            if (f) {
                f(k)

            }
            if (b.showPoweredBy && !g.tlImage("isWhitelabel")) {
                var i = b.address + "/?buttonSource=" + m;
                var h = $tlJQ('<a href="' + i + '" class="thinglinkInfo">' + a("poweredBy") + "</a>");
                h.click(function(n) {
                    window.open(i)

                });
                k.append(h)

            }
            d.append(k);
            d.append(l);
            e.append(d);
            d.click(function(n) {
                var o = $tlJQ(n.target);
                if (o.hasClass("shareIframeHelpIcon") && o.attr("href").length > 0) {
                    o.click()

                }
                n.stopPropagation();
                return false

            });
            $tlJQ("body").click(function(n) {
                if (d.css("display") !== "none") {
                    d.fadeOut(250)

                }

            })

        }
        e.find(".tlPopup").hide();
        d.show();
        return false

    }
    return {
        setup: c

    }

});
tlRequire.define("positionThing", ["jQuery", "positionThingAlg", "config", "util", "cssUtil", "measure", "sceneUtil"], 
function(h, f, b, a, g, e, d) {
    function c(v) {
        var m = v.attr("tl-thing-id");
        var p = h("#tl-a-" + m);
        var I = p.find(".tlArrow");
        var D = 13;
        var E = p.height();
        var j = Math.round(((v.height() / 2) - E - D));
        var M = v.closest(".tlImageContainer");
        var L;
        if (b.hOverflow !== null) {
            L = b.hOverflow

        } else {
            L = true

        }
        var F;
        if (b.vOverflow !== null) {
            F = b.vOverflow

        } else {
            F = true

        }
        var n = v.offset(),
        N = h(document.body);
        var K = {
            left: 0,
            top: 0

        };
        if (h.inArray(N.css("position"), ["absolute", "relative"]) !== -1) {
            K = a.getOffsetRect(document.body);
            n.left = n.left - K.left;
            n.top = n.top - K.top

        }
        var U = p.find(".tlThingClose").length > 0 ? 17: 5;
        var S = 5;
        var i = function() {
            var aa;
            var W;
            if (F === false) {
                var X = parseInt(v.css("top").replace("px", ""), 10);
                aa = X + j - U;
                var V = M.height();
                var ac = V - X - v.height();
                W = ac + j - S

            } else {
                var ab = h(window).scrollTop() - K.top;
                var Y = h(window).height() + ab;
                aa = n.top + j - U - ab;
                var Z = Y - n.top - v.height();
                W = Z + j - S

            }
            return {
                t: aa,
                b: W

            }

        };
        var A = i();
        var C = p.find(".tlUpArrow");
        var H = p.find(".tlCenterArrow");
        if (A.t < 0) {
            I.css("cssText", "display:none;");
            if (A.b > 0) {
                j = Math.round((v.height() / 2) + 13);
                I = C;
                if (I.length === 0) {
                    I = h('<div class="tlUpArrow"></div>');
                    p.prepend(I)

                }

            } else {
                C.css("cssText", "display:none;");
                j = j - A.t;
                I = H;
                if (I.length === 0) {
                    I = h('<div class="tlCenterArrow"></div>');
                    h(".tlThingContent", p).before(I)

                }

            }

        } else {
            C.css("cssText", "display: none;")

        }
        var z = I[0] ? g.parseCssText(I[0].style.cssText) : {};
        z.display = "";
        I.css("cssText", "");
        var R = p[0] ? g.parseCssText(p[0].style.cssText, true) : {};
        var o = "min-width: " + R["min-width"] + "px !important; z-index: " + p.css("z-index") + "; display: block;";
        if (R["max-width"]) {
            o = o + "max-width: " + R["max-width"] + "px !important;"

        }
        if (R.opacity) {
            o = o + "opacity: " + R.opacity + ";"

        }
        if (R.visibility) {
            o = o + "visibility: " + R.visibility + ";"

        }
        var P = e.getDimensions(p).w;
        var k = (window.ActiveXObject || "ActiveXObject" in window) ? "width: " + P.toString() + "px !important;": "";
        var G = v.width();
        var l = Math.round((G - P) / 2);
        var O = parseInt(v.css("left").replace("px", ""), 10);
        if (M.css("box-sizing") === "content-box") {
            var J = e.getExtent(M[0]);
            var T = J["padding-left"];
            O = O - T

        }
        var y = M.width();
        var t = 5;
        var s = p.find(".tlThingClose").length > 0 ? 17: 5;
        var u = O + l - t;
        var Q = y - s - (O + l + P);
        var x = 0;
        var r;
        if (L === false && u < 0 && Q > 0) {
            x = -u

        } else {
            if (L === false && Q < 0 && u > 0) {
                x = Q

            } else {
                if (window.ActiveXObject || "ActiveXObject" in window) {
                    I.css("cssText", k)

                }

            }

        }
        C = p.find(".tlUpArrow");
        if (C.length && C.css("display") != "none") {
            p.addClass("tlUpArrowInside")

        } else {
            p.removeClass("tlUpArrowInside")

        }
        p.css("cssText", "display:none !important;");
        var w = function() {
            var W = h(window).scrollLeft() - K.left;
            var Z = a.getWindowSize().w + W;
            var Y = (n.left + l + x);
            var V = Y - t - W;
            var X = Z - (Y + P + s);
            return {
                l: V,
                r: X

            }

        };
        var B = w();
        if ((B.l + B.r) < 0) {
            t -= 5;
            s -= 5;
            B = w()

        }
        x = f.applyHorizontalWindowLimitsToDisplacement(x, B, K, p.hasClass("tlPlaying"));
        z.left = ( - x) + "px !important;";
        if (x !== 0) {
            l = l + x

        }
        if (I.length > 0) {
            I.css("cssText", I[0].style.cssText + a.mapToCssText(z))

        }
        var q = {
            left: 0,
            top: 0

        };
        if ((d.isThinglinkSceneView()) || (h("#tlTagContainer").closest(".tlFullscreen").length > 0)) {
            q = h("#tlTagContainer").offset()

        }
        p.css("cssText", o + "top: " + (n.top + j - q.top).toString() + "px !important; left: " + (n.left + l - q.left).toString() + "px !important;")

    }
    return c

});
tlRequire.define("positionThingAlg", ["util"], 
function(b) {
    function a(c, i, k, f) {
        var l = c;
        if (i.l < 0 && i.r > 0) {
            l = l - i.l

        } else {
            if (i.r < 0 && f) {
                var g = 0;
                if (i.l < i.r) {
                    g = i.r - i.l;
                    if (g > 5) {
                        g = 5

                    }

                }
                i.r -= g;
                l = l + i.r

            } else {
                if (i.r < 0 && i.l > 0) {
                    l = l + i.r

                } else {
                    if (i.r < 0 && i.l < 0) {
                        var j = $tlJQ(window).scrollLeft() - k.left;
                        var e = b.getWindowSize().w + j;
                        var m = -k.left;
                        var h = $tlJQ(window).width() + m;
                        var n = j + i.l - m;
                        var d = (h - e) + i.r;
                        if (d < 0) {
                            l = l + d

                        } else {
                            if (n < 0) {
                                l = l - n

                            }

                        }

                    }

                }

            }

        }
        return l

    }
    return {
        applyHorizontalWindowLimitsToDisplacement: a

    }

});
tlRequire.define("postMessageManager", ["namespace", "jQueryPostMessage", "EventDispatcher", "config", "util"], 
function(c, o, a, b, g) {
    var q = c.postMessageManager;
    if (typeof q === "undefined" || typeof q.addListener === "undefined") {
        var e = {};
        var p = {};
        var l = function() {
            e = {};
            p = {}

        };
        var m = function(s, t) {
            var r = g.getSourceDomain(s);
            p[r] = true;
            if (!t) {
                var u = false;
                while (!u) {
                    t = (" " + Math.random()).substr(3);
                    if ($tlJQ("#" + t).length === 0) {
                        u = true

                    }

                }

            }
            e[t] = r;
            return t

        };
        var k = function(r) {
            if (p[r]) {
                return true

            }
            return false

        };
        var h = function(r) {
            return r.replace(/^https?:/, "")

        };
        var d = function(v) {
            var r = v.data;
            if (typeof(r) !== "string") {
                return

            }
            var y = r.split("/");
            var w = y[0];
            var s = y[1];
            var t = y.slice(2);
            var x = v.origin;
            if (x) {
                var u = e[w];
                if (!u || h(x) !== h(u)) {
                    return

                }

            }
            var z = [s, f(w), t];
            q.trigger("postMessageCommand", z)

        };
        var f = function(s) {
            var r = $tlJQ("#" + s);
            var t;
            if (r.length === 0) {
                t = $tlJQ(".rtid-" + s)

            } else {
                t = r.find(".tagx")

            }
            if (t.length === 0) {
                return

            }
            return t

        };
        var j = function() {
            $tlJQ.receiveMessage(d, k)

        };
        var i = function(s) {
            var w = window.location.href.split("#")[0];
            var t = "";
            var v = "";
            var r = "";
            try {
                t = m(s);
                v = encodeURIComponent(w);
                r = "#rtid=" + t + "&target=" + v;
                if ( !! b.referer) {
                    r += "&referer=" + encodeURIComponent(b.referer)

                }
                if (b.preventNavigation) {
                    r += "&preventNavigation=true"

                }
                if (s.indexOf("#") > 0) {
                    r = "&" + r.substring(1)

                }

            } catch(u) {}
            return {
                rtid: t,
                target: v,
                srcPmParams: r

            }

        };
        var n = function() {};
        n.prototype = new a();
        n.prototype.init = j;
        n.prototype.reset = l;
        n.prototype.prepareAndGetParameters = i;
        n.prototype.registerThing = m;
        q = new n();
        c.postMessageManager = q

    }
    return q

});
tlRequire.define("sceneCache", [], 
function() {
    var b = {};
    function a(e, d) {
        b[e] = d

    }
    function c(d) {
        return b[d]

    }
    return {
        getCacheSceneId: c,
        setCacheSceneId: a

    }

});
tlRequire.define("sceneUtil", ["jQuery", "util"], 
function(h, d) {
    function a(j) {
        return h("img[tl-scene-id=" + j + "]").closest(".tlImageContainer")

    }
    function c(j) {
        return j.find("img").attr("tl-scene-id")

    }
    function g(j) {
        return a(j).find(".tlMenuItem").hasClass("tlUntouch")

    }
    function f(j) {
        return a(j).find(".tlMenuLabelTouch").data("tlTouchCount")

    }
    function i(l, j) {
        var k = h(l);
        var m = k[0].src.replace(/#.*$/, "");
        if (j) {
            m = m + ";" + j

        }
        return m

    }
    function b() {
        return h("body").hasClass("permaScene") || h("body").hasClass("permaVideo")

    }
    function e() {
        h(".tlThingClose").mouseup()

    }
    return {
        findImageContainer: a,
        getContainerSceneId: c,
        isSceneTouched: g,
        getSceneTouchCount: f,
        isThinglinkSceneView: b,
        getSceneUrl: i,
        closeAllStickyTags: e

    }

});
tlRequire.define("sharePopup", ["util", "config", "postMessageManager", "popup", "hashing", "sceneUtil", "measure"], 
function(g, d, j, b, c, f, a) {
    function h(k) {
        return d.sslAddress + "/scene/" + k

    }
    function i(n) {
        var r = n.tlImage("sceneData");
        var s = n.closest(".tlImageContainer");
        if (!n) {
            return

        }
        var m = n.attr("tl-scene-id");
        var p = c.generateImageHash(n[0]);
        var k = encodeURIComponent(h(m));
        var o;
        var t = $tlJQ('head meta[name="identifier-URL"]').attr("content");
        if ( !! t) {
            o = t

        }
        if (d.isThinglinkSite() && !o) {
            o = k

        } else {
            if (!o) {
                o = window.location.href

            }
            var q = o.indexOf("#");
            if (q === -1) {
                o = encodeURIComponent(o) + "%23tl-" + p

            } else {
                if (q == o.length - 1 || o.substring(q, q + 4) === "#tl-") {
                    o = encodeURIComponent(o.substring(0, q)) + "%23tl-" + p

                } else {
                    o = encodeURIComponent(o)

                }

            }

        }
        return o

    }
    function e(s, q, v) {
        f.closeAllStickyTags();
        var o = $tlJQ("#tlOverlayContainer");
        if (o.length === 0) {
            o = $tlJQ('<div id="tlOverlayContainer"/>').appendTo("body")

        }
        var n = ".tlShareIframePopup.tl-item-" + v.id;
        var m = $tlJQ(n, o);
        if (m.length > 0) {
            m.show()

        } else {
            b.setup(o, q, ".tlShareIframePopup.tlSharePopup.tl-item-" + v.id, 
            function(z) {
                var y = d.getBaseUrl() + "/embed/share/" + v.id;
                var D = j.prepareAndGetParameters(y).srcPmParams;
                var A = g.getDomain(window.location.href);
                var C = A ? c.adler32(A) : "";
                var B = $tlJQ(document).innerHeight();
                var x = Math.min(B - 50, 400);
                var w = $tlJQ('<iframe id="tlSharingFrame" src="' + y + "?shareUrl=" + i(q) + "&domainHash=" + C + D + '" type="text/html" height="' + x + 'px" + frameBorder="0"></iframe>');
                z.append(w)

            })

        }
        if (m.length === 0) {
            m = $tlJQ(n, o)

        }
        var k = a.getDimensions(q).w;
        var r = q.offset();
        var u = a.getDimensions(m).w;
        var p = parseInt(r.left + (k / 2) - (u / 2), 10);
        var l = $tlJQ(window).width();
        if (p < 0) {
            p = 0

        } else {
            if (p - u > l) {
                p = l - u

            }

        }
        var t = r.top < 13 ? 13: r.top;
        m.css("cssText", m[0].style.cssText + "; left: " + p + "px !important; top: " + t + "px !important;")

    }
    return {
        setup: e

    }

});
tlRequire.define("statusManager", ["namespace", "config", "callbackManager"], 
function(d, c, b) {
    function a(e) {
        d.status = e;
        if (c.eventManager && c.eventManager.trigger) {
            c.eventManager.trigger("statusChanged", e)

        }
        b.triggerEvent(e)

    }
    return {
        setStatus: a

    }

});
tlRequire.define("tagEventHandlers", ["jQuery", "callbackManager", "eventDebounce", "positionThing", "actionLogger", "imageEventHandlers", "config", "jUtil", "util", "cssUtil", "customization"], 
function(o, j, d, c, l, q, t, n, a, k, g) {
    var h = a.isTouchDevice;
    var s = function(w, v, y) {
        var x = w.find(".thinglinkImage").first();
        var u = x.attr("tl-scene-id");
        l.logClick(v, u, x, y)

    },
    b = function(w, v) {
        var x = w.find(".thinglinkImage").first();
        var u = x.attr("tl-scene-id");
        l.logHover(v, u, x)

    },
    p = function(w, v) {
        var x = w.find(".thinglinkImage").first();
        var u = x.attr("tl-scene-id");
        l.logHoverEnd(v, u, x)

    };
    var e = function(z, y, A, w) {
        var v;
        if (z.nubbin.tlTag("isImageTag")) {
            v = function(B) {
                s(w, A.id, B)

            }

        }
        var x = (t.preventNavigation || A.openlink === "NONE") && !(A.theme == "rich" && A.contentUrl && z.bubble.find(".tlSpinner").length === 0);
        if (!x && A.theme == "iframe") {
            x = !z.bubble.hasClass("iframeLoaded")

        }
        var u = z.nubbin.attr("href");
        if (!x) {
            x = !u

        }
        if (!x) {
            y.clickHandler.call(this, u, z.nubbin, v);
            return true

        }
        if (v) {
            v()

        }
        return false

    },
    i = function(u) {
        u = u || n.getThingPieces(this);
        if (!u.bubble.hasClass("tlPlaying")) {
            setTimeout(function() {
                if (!u.bubble.hasClass("mouseover") && !u.nubbin.hasClass("mouseover")) {
                    if (u.nubbin.hasClass("hovered")) {
                        var v = u.nubbin.attr("tl-thing-id");
                        var w = u.nubbin.parents(".tlImageContainer");
                        p(w, v)

                    }
                    u.nubbin.removeClass("linked hovered");
                    u.bubble.hide()

                }

            },
            50)

        }

    },
    r = function(w, u, x) {
        var v = u;
        if (w && w.clientX) {
            v = document.elementFromPoint(w.clientX, w.clientY)

        }
        if (v == x.nubbin.find(".nubbinHoverIcon")[0]) {
            if (!x.nubbin.hasClass("mouseover")) {
                x.nubbin.addClass("mouseover")

            }
            if (!u.hasClass("mouseover")) {
                u.addClass("mouseover")

            }

        } else {
            if ((v === u) || (v == u.find(".thinglinkImage")[0])) {
                if (!u.hasClass("mouseover")) {
                    u.addClass("mouseover")

                }
                i(x)

            } else {
                i(x);
                q.hideNubbins(u)

            }

        }

    };
    j.runAfter("initcomplete", 
    function() {
        if (h) {
            o(document).unbind("vclick.tlBubbleHide").bind("vclick.tlBubbleHide", 
            function(v) {
                var u = v.target || v.srcElement;
                o(".tlImageContainer .tagx.hovered").each(function() {
                    var w = n.getThingPieces(this);
                    w.bubble.mouseleave();
                    if (w.bubble.hasClass("mouseover")) {
                        w.bubble.trigger("mouseleave")

                    }
                    if (w.nubbin.hasClass("mouseover")) {
                        if (o("#tlTagContainer").has(v.target).length === 0) {
                            w.nubbin.removeClass("mouseover");
                            r(v, o(u).closest(".tlImageContainer"), w)

                        }

                    }

                })

            })

        }

    });
    function m(v, z) {
        z = z || n.getThingPieces(this);
        var y = z.bubble.data("bubbledata");
        var A = z.nubbin.data("thing");
        if (y && y.hoverHandler) {
            v = y.hoverHandler

        }
        if (v) {
            v()

        }
        c(z.nubbin);
        var w;
        if (A && typeof(A.styles) !== "undefined") {
            w = A.styles

        } else {
            if (z.nubbin.data("tlStyles")) {
                w = z.nubbin.data("tlStyles")

            }

        }
        var x = a.getSourceDomain(A.contentUrl);
        g.applyNewStyles(z.bubble, w, x);
        var u = (A && typeof(A.opacity) !== "undefined") ? A.opacity: 1;
        if (u > 0.01) {
            z.bubble.show();
            z.bubble.css("opacity", u)

        } else {
            z.bubble.css("visibility", "hidden")

        }
        if (z.nubbin.attr("href")) {
            if (A.openlink !== "NONE" || A.theme === "rich") {
                z.nubbin.addClass("linked")

            }

        }
        z.nubbin.addClass("hovered")

    }
    function f(F, x) {
        var B = n.getThingPieces(F),
        A = B.bubble.data("bubbledata"),
        E = B.nubbin.data("thing"),
        w = false;
        x = x || B.nubbin.closest(".tlImageContainer");
        var y = function(H, G) {
            G = G || B;
            G.nubbin.removeClass("mouseover");
            r(H, x, G)

        };
        var z = {};
        var C = function(H, I) {
            z.hideBubblesForAllExcept(B.nubbin);
            if (!H) {
                var G = null;
                if (A && A.hoverHandler) {
                    G = A.hoverHandler

                }
                m(G, B);
                if (I) {
                    b(x, E.id)

                }

            }
            B.nubbin.addClass("mouseover");
            if (!x.hasClass("mouseover")) {
                x.addClass("mouseover")

            }

        };
        var v = function(G) {
            x.find(".tagx").not(G).each(function() {
                var H = n.getThingPieces(this);
                H.bubble.removeClass("mouseover");
                H.nubbin.removeClass("mouseover");
                i(H)

            })

        };
        z = {
            mouseOverNubbin: C,
            attemptTagClick: e,
            hideBubblesForAllExcept: v

        };
        var D = false;
        var u = false;
        B.nubbin.unbind("vmouseout vmousecancel").bind("vmouseout vmousecancel", d({
            after: function(G, H) {
                D = false

            },
            threshold: 50

        }));
        if (B.nubbin.tlTag("isImageTag")) {
            B.nubbin.unbind("mouseenter vclick").bind("mouseenter vclick", d({
                before: function(G, H) {
                    H.nubbinsVisible = x.hasClass("tlHover");
                    H.bubbleVisible = B.nubbin.hasClass("hovered");
                    D = D || !H.nubbinsVisible;
                    if (!H.nubbinsVisible) {
                        H.nubbinsVisible = (B.nubbin.find(".nubbinGlow").css("display") != "none");
                        q.showNubbins(x)

                    }
                    if (H.nubbinsVisible) {
                        z.mouseOverNubbin(H.bubbleVisible, true)

                    }
                    w = true

                },
                everyTime: function(H, K) {
                    if (H === "mouseenter") {
                        if (h && (!K.bubbleVisible) && (!K.vclickInThisSequence)) {
                            u = true

                        }

                    }
                    if ((H === "vclick") && (K.vclickInThisSequence)) {
                        return

                    }
                    if (H === "vclick") {
                        K.vclickInThisSequence = true

                    }
                    var J = (typeof(E.opacity) !== "undefined") && (E.opacity < 0.01);
                    var G = (!h || !D) && K.nubbinsVisible && K.bubbleVisible;
                    if ((G || J) && !u && (H === "vclick")) {
                        K.vclickInThisSequence = true;
                        var I = z.attemptTagClick(B, A, E, x);
                        if (I) {
                            B.nubbin.trigger("mouseleave")

                        }

                    } else {
                        if (H == "mouseenter") {
                            w = true

                        }

                    }
                    if (K.lastOrigEventType === "touchend") {
                        u = false

                    }

                },
                after: function(H, I) {
                    var G = (typeof w == "function");
                    if (!I.nubbinsVisible && !h && !G) {
                        z.mouseOverNubbin(I.bubbleVisible, true)

                    } else {
                        if (G) {
                            w()

                        }

                    }
                    w = false

                },
                threshold: 70

            }))

        } else {
            B.nubbin.unbind("mouseenter vclick").bind("mouseenter vclick", d({
                before: function(G, H) {
                    H.nubbinsVisible = x.hasClass("tlHover");
                    H.bubbleVisible = B.nubbin.hasClass("hovered");
                    D = D || !H.nubbinsVisible;
                    z.mouseOverNubbin(H.bubbleVisible, false)

                },
                everyTime: function(G, H) {
                    if (H.bubbleVisible && G == "vclick") {
                        z.attemptTagClick(B, A, E, x)

                    }

                },
                threshold: 50

            }))

        }
        B.nubbin.unbind("mouseleave").bind("mouseleave", 
        function(G) {
            if (w) {
                w = y

            } else {
                y(G)

            }

        });
        B.bubble.unbind("mouseenter").bind("mouseenter", 
        function(G) {
            B.bubble.addClass("mouseover")

        });
        B.bubble.unbind("mouseleave").bind("mouseleave", 
        function(G) {
            B.bubble.removeClass("mouseover");
            r(G, x, n.getThingPieces(B.bubble))

        });
        B.bubble.unbind("vmouseup").bind("vmouseup", d({
            before: function(G, H) {
                H.tagBubbleClickHandled = false

            },
            everyTime: function(G, H) {
                if (!H.tagBubbleClickHandled) {
                    z.attemptTagClick(B, A, E, x);
                    H.tagBubbleClickHandled = true

                }

            },
            after: function(G, H) {
                B.bubble.trigger("mouseenter");
                y(null)

            },
            threshold: 20

        }));
        B.bubble.unbind("vclick").bind("vclick", 
        function(G) {
            return false

        });
        B.bubble.find(".tlHashTag").unbind("vmouseup").bind("vmouseup", 
        function(G) {
            window.open(this.href);
            return false

        });
        if (E.theme == "rich") {
            B.bubble.find(".tlThingFooter a").unbind("vmouseup").bind("vmouseup", 
            function(G) {
                window.open(this.href);
                return false

            })

        }
        B.bubble.find(".tlThingClose").bind("vmouseup", 
        function(I) {
            I.preventDefault();
            I.stopPropagation();
            B.bubble.removeClass("tlPlaying iframeLoaded");
            var G = B.bubble.find(".tlRichIframe");
            G.hide().remove();
            var H = B.bubble.find(".tlIframe");
            if (H.length > 0) {
                H.hide().remove();
                B.bubble.find(".tlSpinner").show()

            }
            B.bubble.removeClass("mouseover").hide();
            y(I, B);
            if (h && !x.hasClass("mouseover")) {
                x.addClass("mouseover")

            }
            return false

        });
        return {
            _i: z

        }

    }
    return {
        attach: f,
        prepareTagForDisplay: m

    }

});
tlRequire.define("tagFetcher", ["jQuery", "util", "config"], 
function(d, b, c) {
    var a = function() {
        var n;
        var i;
        function l(u, p) {
            var t = [];
            var s = "",
            q;
            if (u) {
                for (q = 0; q < u.length; q++) {
                    var v = b.cleanURIEncoding(u[q]);
                    if ((s.length + v.length + 2) < p) {
                        if (s.length > 0) {
                            s += "|"

                        }
                        s += v

                    } else {
                        t.push(s);
                        s = v

                    }

                }
                if (s.length > 0) {
                    t.push(s)

                }

            }
            return t

        }
        var g = [];
        var m;
        var o = [];
        function e(r, p, q) {
            g = g.concat(r);
            if (p) {
                o = o.concat(p)

            }
            if (m) {
                clearTimeout(m);
                m = null

            }
            m = setTimeout(function() {
                j(g, {
                    forceSecure: c.forceSecure,
                    referer: c.referer,
                    reload: q,
                    manualViewStats: c.manualViewStats,
                    passkeys: o

                });
                g = [];
                m = null

            },
            80)

        }
        function j(B, s) {
            var A = c.getApiBaseUrl();
            var r = l(B, 1650);
            var t = r.length;
            var z = function(C) {
                if (n) {
                    n(C)

                }
                t = t - 1;
                if (t === 0 && i) {
                    i()

                }

            };
            var v;
            var q = d(window);
            var y = q.width();
            var w = q.height();
            var p = l(s.passkeys, 2000);
            for (v = 0; v < r.length; v++) {
                var x = r[v];
                var u = {
                    url: x,
                    p: v,
                    passkeys: p[0]

                };
                if (y < 700) {
                    u.vw = y

                }
                if (w < 700) {
                    u.vh = w

                }
                if (window.__tlid !== undefined) {
                    u.massId = window.__tlid

                }
                if (s.forceSecure) {
                    u.forceSecure = true

                }
                if (s.referer) {
                    u.referer = s.referer

                }
                if (s.manualViewStats) {
                    u.skipStats = true

                }
                if (s.reload) {
                    u.reloadNonce = Math.floor(Math.random() * 10000000)

                }
                d.ajax({
                    url: A + "/api/tags",
                    data: u,
                    dataType: "jsonp",
                    success: z

                })

            }

        }
        function k(s, q, r) {
            var p = b.extractSceneId(s);
            if (p !== "" && p.charAt(0) !== "$") {
                s = p

            }
            if ((s.length === undefined) || typeof(s) === "string") {
                s = [s]

            } else {
                if (s.length > 1) {
                    s = s.sort()

                }

            }
            e(s, q, r)

        }
        function f(p) {
            i = p

        }
        function h(p) {
            n = p

        }
        return {
            fetchTags: k,
            dataReceivedCallback: h,
            finalFetchCompleteCallback: f,
            listify: l

        }

    };
    return a()

});
tlRequire.define("touchManager", ["config", "txt", "sceneUtil", "postMessageManager", "EventDispatcher"], 
function(s, h, o, c, t) {
    var j;
    var g;
    var d;
    var e;
    function a(v) {
        var u = {
            title: "",
            content: ""

        };
        u.title = h("TouchDialogPreSignup.TitleDoYouLikeThisImage");
        u.content = h("TouchDialogPreSignup.ContentDoYouLikeThisImage", '<a href="#">', "</a>");
        return u

    }
    function r(v, w) {
        var u = o.getContainerSceneId(v);
        if (!v) {
            v = o.findImageContainer(u)

        }
        if (e) {
            b(v, u, w)

        } else {
            f(v, u)

        }

    }
    function q(x, v, u) {
        if (g) {
            clearTimeout(g);
            g = null

        }
        if (u && u > 100) {
            return

        }
        var w;
        if (!u) {
            w = 3000;
            u = 0

        } else {
            if (u < 60) {
                w = 1000

            } else {
                w = 3000

            }
            $tlJQ.ajax({
                url: s.getApiBaseUrl() + "/api/me",
                cache: false,
                dataType: "jsonp",
                success: function(y) {
                    if (y.name) {
                        clearTimeout(g);
                        g = null;
                        if (d) {
                            d.close();
                            d = null

                        }
                        n(x, v)

                    } else {
                        if (!d || (d && d.closed === true)) {
                            clearTimeout(g);
                            g = null

                        }

                    }

                }

            })

        }
        g = setTimeout(function() {
            q(x, v, u + 1)

        },
        w)

    }
    function f(w, v) {
        var z = "tlTouchPreSignupPopup";
        var A = o.getSceneTouchCount(v);
        var B = a(A);
        var u = w.find("." + z).first();
        if (u.length === 0) {
            u = $tlJQ('<div class="' + z + ' tlTouchPopup tlPopup"></div>');
            var D = $tlJQ('<div class="tlPopupInner"><h3></h3><p class="tlTouchPopupContent" style="text-align:center !important;"></p></div>');
            var y = $tlJQ('<a href="#" class="tlCloseBtn"></a>');
            y.bind("vmouseup", 
            function(E) {
                u.hide();
                return false

            });
            u.append(D);
            u.append(y);
            var x = u.find("p.tlTouchPopupContent");
            x.append(B.content);
            x.find("a").click(function() {
                m(w, v)

            });
            w.append(u)

        }
        w.find(".tlPopup").hide();
        var C = u.find("h3");
        C.html(B.title);
        setTimeout(function() {
            u.show()

        },
        10)

    }
    function m(w, u) {
        var A = s.sslAddress + "/embed/touchLogin";
        var x = c.prepareAndGetParameters(A);
        var y = x.rtid;
        var z = x.target;
        var v = s.sslAddress + "/auth/connect?response_type=code&client_id=" + s.clientId + "&state=" + y + "/touchLogin/" + u + ";" + z + "&redirect_uri=" + encodeURIComponent(A);
        d = window.open(v, null, "width=950,height=588,scrollbars=yes");
        q(w, u)

    }
    function b(v, u, w) {
        var x;
        if (w) {
            x = "untouch"

        } else {
            x = "touch"

        }
        $tlJQ.ajax({
            url: s.sslAddress + "/api/scene/" + u + "/touch?method=" + x,
            cache: false,
            dataType: "jsonp",
            success: function(A) {
                var y;
                if (!A.error) {
                    var z;
                    if (!A.results.touched && x === "untouch") {
                        z = -1

                    } else {
                        if (A.results.touched && x === "touch") {
                            z = 1

                        }

                    }
                    i.trigger("updateSceneTouchStatus", [A.results.touched, u, z]);
                    y = o.getSceneTouchCount(u)

                }
                l(v, A, u, y)

            }

        })

    }
    function l(x, w, v, A) {
        var z = "tlTouchStatusPopup";
        if (A < 0) {
            A = 0

        }
        var u = x.find("." + z).first();
        if (u.length === 0) {
            u = $tlJQ('<div class="' + z + ' tlTouchPopup tlPopup"></div>');
            var C = $tlJQ('<div class="tlPopupInner"><h3></h3><p></p><</div>');
            u.append(C);
            x.append(u)

        }
        x.find(".tlPopup").hide();
        var B = u.find("h3");
        var y = u.find("p");
        if (w.error) {
            B.text(h("TouchDialog.TitleError"))

        } else {
            if (w.results.touched) {
                B.text(h("TouchDialog.TitleTouch"))

            } else {
                B.text(h("TouchDialog.TitleUntouch"))

            }
            if (A === 1) {
                y.text(h("TouchDialog.TouchesOne"))

            } else {
                if (A === 0) {
                    y.text(h("TouchDialog.TouchesNo"))

                } else {
                    y.text(h("TouchDialog.TouchesOther", A))

                }

            }

        }
        u.stop(true, true).show();
        if (j) {
            clearTimeout(j);
            j = null

        }
        j = setTimeout(function() {
            u.hide(500);
            j = null

        },
        1300)

    }
    function n(v, u) {
        e = true;
        r(v, o.isSceneTouched(u))

    }
    function k(u) {
        e = u

    }
    var p = function() {};
    p.prototype = new t();
    p.prototype.touch = r;
    p.prototype.touchLoginCallback = n;
    p.prototype.setUserLoggedIn = k;
    var i = new p();
    return i

});
tlRequire.define("txt", ["jQuery", "config"], 
function(d, c) {
    var a = {
        poweredBy: {
            en: "Powered by ThingLink",
            fi: "Teknologiasta vastaa ThingLink",
            ru: "Технология ThingLink",
            pt: "Desenvolvido por ThingLink",
            es: "Ofrecido por ThingLink",
            pl: "Zasilane przez ThingLink",
            it: "Gestito da ThingLink",
            ja: "ThingLink提供",
            fr: "Développé par ThingLink",
            de: "Betrieben von ThingLink",
            hi: "ThingLink द्वारा संचालित",
            zh: "由 ThingLink 提供技术支持",
            sv: "Utvecklat av ThingLink"

        },
        CopyToClipBoard: {
            en: "Copy to clipboard",
            fi: "Kopioi leikekirjaan",
            ru: "в буфер обмена",
            pt: "Copiar para a área de transferência",
            es: "Copiar al portapapeles",
            pl: "Skopiuj do schowka",
            it: "Copia negli appunti",
            ja: "クリップボードにコピー",
            fr: "Copier dans le presse-papiers",
            de: "In Zwischenablage kopieren",
            hi: "क्लिपबोर्ड में कॉपी करें",
            zh: "复制到剪贴板",
            sv: "Kopiera till urklipp"

        },
        Copied: {
            en: "Copied",
            fi: "Kopioitu",
            ru: "Скопировано",
            pt: "Copiado!",
            es: "¡Copiado!",
            pl: "Skopiowano!",
            it: "Copiato!",
            ja: "コピー完了！",
            fr: "Copié!",
            de: "Kopiert!",
            hi: "कॉपी हो गया",
            zh: "已复制",
            sv: "Kopierad"

        },
        "Share.OrJustShareThisAddress": {
            en: "Or just share this address:",
            fi: "Tai jaa tämä osoite:",
            ru: "Или поделиться этой ссылкой:",
            pt: "Ou apenas partilhar este endereço:",
            es: "O comparte solamente esta dirección:",
            pl: "Lub podziel się tylko tym adresem:",
            it: "Oppure condividi solo questo indirizzo:",
            ja: "または次のアドレスのみを共有：",
            fr: "Ou partager seulement cette adresse:",
            de: "Oder nur diese Adresse teilen:",
            hi: "या केवल इस पते को साझा करें:",
            zh: "或仅分享此地址：",
            sv: "Eller dela den här adressen:"

        },
        OriginallyThinglinked: {
            en: "Source {0}",
            de: "Quelle {0}",
            es: "Fuente {0}",
            fi: "Lähde {0}",
            fr: "Source {0}",
            hi: "स्रोत {0}",
            it: "Fonte {0}",
            ja: "ソース {0}",
            pl: "Źródło {0}",
            pt: "Fonte {0}",
            ru: "Источник {0}",
            sv: "Källa {0}",
            zh: "来源 {0}"

        },
        "ContextMenu.Fullscreen": {
            en: "Fullscreen",
            fi: "Esitystila",
            sv: "Helskärm",
            de: "Vollbild",
            es: "Pantalla total",
            fr: "Plein écran",
            hi: "पूर्ण स्क्रीन",
            it: "Tutto schermo",
            ja: "全画面表示",
            pl: "Pełny ekran",
            pt: "Ecrã inteiro",
            ru: "Полный экран",
            zh: "全屏"

        },
        "ContextMenu.Touch": {
            en: "Touch image",
            fi: "Kosketa kuvaa",
            de: "Bild berühren",
            es: "Dar un Toque a la imagen",
            fr: "Touchez l'image",
            hi: "छवि छुएं (टच करें)",
            it: "Tocca l'immagine",
            ja: "イメージをタッチ",
            pl: "Dotknij obraz",
            pt: "Toque na imagem",
            ru: "Коснуться изображения",
            sv: "Peka på bilden",
            zh: "接触图片"

        },
        "ContextMenu.Share": {
            en: "Share image...",
            fi: "Jaa kuva...",
            ru: "Поделиться этим изображением...",
            pt: "Partilhar Imagem...",
            es: "Compartir imagen...",
            pl: "Podziel się obrazkiem...",
            it: "Condividi l'Immagine...",
            ja: "画像の共有...",
            fr: "Partager l'image...",
            de: "Share Image...",
            hi: "छवि साझा करें ...",
            zh: "分享图像...",
            sv: "Dela bilden..."

        },
        "ContextMenu.Embed": {
            en: "Embed image...",
            fi: "Upota kuva...",
            ru: "Встроить это изображение...",
            pt: "Inserir Imagem...",
            es: "Insertar imagen...",
            pl: "Umieść obrazek...",
            it: "Incorpora l'Immagine...",
            ja: "リンク画像...",
            fr: "Image incorporée...",
            de: "Bild einbetten...",
            hi: "छवि एम्बेड करें ...",
            zh: "嵌入图像...",
            sv: "Infoga bilden..."

        },
        "Sidebar.Touch": {
            en: "Touch",
            fi: "Kosketa",
            de: "Berühren",
            es: "Tocar",
            fr: "Toucher",
            hi: "स्पर्श करें",
            it: "Tocca",
            ja: "タッチ",
            pl: "Stuknij",
            pt: "Tocar",
            ru: "Нажать",
            sv: "Peka på",
            zh: "触摸"

        },
        "Sidebar.Untouch": {
            en: "Untouch",
            fi: "Poista kosketus",
            de: "Berührung aufheben",
            es: "No tocar",
            fr: "Dé-Toucher",
            hi: "स्पर्श न करेंं",
            it: "Annulla Tocca",
            ja: "アンタッチ",
            pl: "Odhacz stuknięcie",
            pt: "Intacto",
            ru: "Не нажимать",
            sv: "Peka av",
            zh: "不可触摸"

        },
        "Sidebar.Share": {
            en: "Share",
            fi: "Jaa",
            ru: "Поделиться",
            pt: "Partilhar",
            es: "Compartir",
            pl: "Udostępnij",
            it: "Condividi",
            ja: "共有",
            fr: "Partager",
            de: "Teilen",
            hi: "साझा करें",
            zh: "共享",
            sv: "Dela"

        },
        "Sidebar.Edit": {
            en: "Edit",
            fi: "Muokkaa",
            ru: "Редактировать",
            pt: "Editar",
            es: "Editar",
            pl: "Edytuj",
            it: "Modifica",
            ja: "編集",
            fr: "Éditer",
            de: "Bearbeiten",
            hi: "संपादित करें",
            zh: "编辑",
            sv: "Redigera"

        },
        "Sidebar.Delete": {
            en: "Delete",
            fi: "Poista",
            ru: "Удалить",
            es: "Borrar",
            pt: "Excluir",
            pl: "Usuń",
            it: "Elimina",
            ja: "削除",
            fr: "Effacer",
            de: "Löschen",
            se: "Ta bort",
            hi: "हटाएं",
            zh: "删除"

        },
        "Sidebar.Remix": {
            en: "Remix",
            fi: "Remiksaa",
            ru: "Ремикс",
            es: "Remezclar",
            pt: "Recombinar",
            pl: "Remiksuj",
            it: "Remixa",
            ja: "リミックス",
            fr: "Remixer",
            se: "Blanda igen",
            hi: "रीमिक्स करें",
            zh: "混音"

        },
        "Sidebar.Report": {
            en: "Report",
            fi: "Raportoi",
            ru: "Отчет",
            es: "Informe",
            pt: "Relatar",
            pl: "Zgłoś",
            it: "Riporta",
            ja: "報告",
            fr: "Rapporter",
            de: "Remixen",
            se: "Rapportera",
            hi: "रिपोर्ट करें",
            zh: "报告"

        },
        "Sidebar.Create": {
            en: "Create",
            fi: "Tee uusi",
            ru: "Создать",
            es: "Crear",
            pt: "Criar",
            pl: "Utwórz",
            it: "Crea",
            ja: "作成",
            fr: "Créer",
            de: "Melden",
            se: "Skapa",
            hi: "सृजित करें",
            zh: "创建"

        },
        "Sidebar.Comment": {
            en: "Comment",
            fi: "Kommentoi",
            ru: "Комментарий",
            es: "Cometar",
            pt: "Comentar",
            pl: "Komentuj",
            it: "Commenta",
            ja: "コメント",
            fr: "Commenter",
            de: "Kommentieren",
            se: "Kommentera",
            hi: "टिप्पणी करें",
            zh: "评论"

        },
        "Sidebar.Fullscreen": {
            en: "Fullscreen",
            fi: "Esitystila",
            sv: "Helskärm",
            de: "Vollbild",
            es: "Pantalla total",
            fr: "Plein écran",
            hi: "पूर्ण स्क्रीन",
            it: "Tutto schermo",
            ja: "全画面表示",
            pl: "Pełny ekran",
            pt: "Ecrã inteiro",
            ru: "Полный экран",
            zh: "全屏"

        },
        "Sidebar.Like": {
            en: "Like",
            fi: "Tykkää",
            ru: "Лайк",
            es: "Me gusta",
            pt: "Gostar",
            pl: "Polub",
            it: "Mi piace",
            ja: "いいね",
            fr: "Aimer",
            de: "Liken",
            se: "Gilla",
            hi: "पसंद करें",
            zh: "赞"

        },
        "Sidebar.Stats": {
            en: "Stats",
            fi: "Tilastot",
            ru: "Статистика",
            es: "Estadísticas",
            pt: "Estatísticas",
            pl: "Statystyki",
            it: "Statistiche",
            ja: "統計",
            fr: "Stats",
            de: "Statistiken",
            se: "Statistik",
            hi: "आंकड़ें बताएं",
            zh: "统计"

        },
        "Sidebar.Post": {
            en: "Post",
            fi: "Julkaise",
            ru: "Отправить",
            sv: "Publicera",
            es: "Publicar",
            pt: "Publicar",
            pl: "Prześlij",
            ja: "投稿する",
            de: "Posten",
            hi: "पोस्ट करें",
            it: "Pubblica",
            fr: "Diffuser",
            zh: "发布"

        },
        "TouchDialogPreSignup.ContentOriginal": {
            en: "To touch {0}Sign in!{1} Touching marks the image as a favorite and shares it with those who follow you.",
            fi: "{0}Kirjaudu sisään{1} koskettaaksesi! Kun kosketat kuvaa, se tallentuu itsellesi ja näkyy niille, jotka seuraavat sinua.",
            ru: "{0}Войдите{1}, чтобы нажать! Нажатие помечает изображение как избранное и делится им с теми, кто следует за вами.",
            es: "¡Para tocar {0}Inscríbete!{1} Al tocarla se marca la imagen como favorita y se comparte con aquellos que te siguen.",
            pt: "Para tocar {0}Inicie sessão!{1} Tocar assinala a imagem como favorita e partilha-a com aqueles que o seguem.",
            pl: "Aby stuknąć, {0}zaloguj się!{1} Stuknięcie zaznacza obraz jako ulubiony i udostępnia go tym, którzy Cię obserwują.",
            it: "Per toccare, {0}Accedi!{1} L'immagine toccata verrà aggiunta ai preferiti e verrà condivisa con le persone che ti seguono.",
            ja: "タッチするには{0}サインインしてください{1} タッチすると画像がお気に入りに追加され、フォローしている人々と共有されます。",
            fr: "Pour toucher {0}inscrivez-vous!{1} Le fait de toucher classe l'image dans les favoris et vous la partagez avec ceux qui vous suivent.",
            de: "Zum Berühren {0}anmelden!{1} Durch Berührung wird das Bild als Favorit markiert und mit allen, die dir folgen, geteilt.",
            se: "Peka på {0}Registrera dig!{1} Detta markerar bilden som favorit och delar den med de som följer dig.",
            hi: "स्पर्श करने के लिए {0}साइन इन!{1} स्पर्श करने से छवि पसंदीदा के रूप में चिह्नित हो जाती है और फिर उनके साथ साझा करें जो आपका अनुसरण करते हैं।",
            zh: "触摸{0}登录！{1}触摸图像将其标记为收藏，然后与关注你的好友共享。"

        },
        "TouchDialog.TitleError": {
            en: "Error touching",
            fi: "Kosketus ei onnistunut"

        },
        "TouchDialog.TitleTouch": {
            en: "Touched image",
            fi: "Kosketettu",
            de: "Berührtes Bild",
            es: "Imagen con Toques",
            fr: "Image touchée",
            hi: "छुई गई छवि",
            it: "immagine toccata",
            ja: "タッチされたイメージ",
            pl: "Dotknięty obraz",
            pt: "Imagem tocada",
            ru: "Тронутое изображение",
            sv: "Pekat på bilden",
            zh: "接触了该图片"

        },
        "TouchDialog.TitleUntouch": {
            en: "Untouched image",
            fi: "Kosketus poistettu",
            de: "Unberührtes Bild",
            es: "Imagen sin Toques",
            fr: "Image dé-touchée",
            hi: "अछूती छवि",
            it: "immagine con tolto il tocco",
            ja: "タッチされていないイメージ",
            pl: "Dotknięcie cofnięte",
            pt: "Imagem intocada",
            ru: "Нетронутое изображение",
            sv: "Pekat av bilden",
            zh: "取消接触了图片"

        },
        "TouchDialog.TouchesOne": {
            en: "One touch on the image",
            fi: "Yksi kosketus",
            de: "1 Berührung des Bildes",
            es: "1 Toque en la imagen",
            fr: "1 Touche sur cette image",
            hi: "छवि को 1 व्यक्ति ने छुआ है",
            it: "1 Tocco sull'immagine",
            ja: "このイメージには1件のタッチがあります",
            pl: "1 dotyk na obrazie",
            pt: "1 Toque na imagem",
            ru: "1 касание изображения",
            sv: "1 pekning på bilden",
            zh: "该图片有1个接触"

        },
        "TouchDialog.TouchesNo": {
            en: "No touches on the image",
            fi: "Ei kosketuksia",
            de: "Kein „es gefällt mir” auf dem Bild.",
            es: "La imagen no tiene Toques",
            fr: "Pas de Touche sur cette image",
            hi: "छवि पर कोई स्पर्श नहीं",
            it: "Nessun Tocco sull'immagine",
            ja: "この画像にはタッチがありません",
            pl: "Brak dotyków na obrazie",
            pt: "Sem toques na imagem",
            ru: "Нет касаний изображения",
            sv: "Bilden har inte pekats på",
            zh: "图片未经修饰"

        },
        "TouchDialog.TouchesOther": {
            en: "{0} touches on the image",
            fi: "{0} kosketusta",
            de: "{0} Berührungen des Bildes",
            es: "{0} Toques en la imagen",
            fr: "{0} Touches sur cette image",
            hi: "छवि को {0} व्यक्तियों ने छुआ है",
            it: "{0} Tocchi sull'immagine",
            ja: "このイメージには{0}件のタッチがあります",
            pl: "{0} dotyków na obrazie",
            pt: "{0} Toques na imagem",
            ru: "{0} касания (й) изображения",
            sv: "{0} pekningar på bilden",
            zh: "该图片有{0}个接触"

        },
        "TouchSidebarButton.TouchesOne": {
            en: "One touch on the image",
            fi: "Yksi kosketus",
            de: "1 Berührung des Bildes",
            es: "1 Toque en la imagen",
            fr: "1 Touche sur cette image",
            hi: "छवि को 1 व्यक्ति ने छुआ है",
            it: "1 Tocco sull'immagine",
            ja: "このイメージには1件のタッチがあります",
            pl: "1 dotyk na obrazie",
            pt: "1 Toque na imagem",
            ru: "1 касание изображения",
            sv: "1 pekning på bilden",
            zh: "该图片有1个接触"

        },
        "TouchSidebarButton.TouchesNo": {
            en: "Collect images you like!",
            fi: "Kerää kuvia, joista pidät!",
            de: "Sammle Bilder, die Dir gefallen!",
            es: "¡Colecciona las imágenes que te gusten!",
            fr: "Collectionez les images que vous aimez",
            hi: "अपनी पसंदीदा छवियाँ एकत्र करें!",
            it: "Raccogli le immagini che ti piacciono!",
            ja: "好きな画像を集めましょう！",
            pl: "Zbieraj obrazy, które lubisz!",
            pt: "Recolha imagens de que gosta!",
            ru: "Собирайте изображения, которые вам нравятся!",
            sv: "Samla bilder du gillar!",
            zh: "收集您喜欢的图片！"

        },
        "TouchSidebarButton.TouchesOther": {
            en: "{0} touches on the image",
            fi: "{0} kosketusta",
            de: "{0} Berührungen des Bildes",
            es: "{0} Toques en la imagen",
            fr: "{0} Touches sur cette image",
            hi: "छवि को {0} व्यक्तियों ने छुआ है",
            it: "{0} Tocchi sull'immagine",
            ja: "このイメージには{0}件のタッチがあります",
            pl: "{0} dotyków na obrazie",
            pt: "{0} Toques na imagem",
            ru: "{0} касания (й) изображения",
            sv: "{0} pekningar på bilden",
            zh: "该图片有{0}个接触"

        },
        "TouchDialogPreSignup.TitleDoYouLikeThisImage": {
            en: "Do you like this image? <p style='font-weight: bold !important; display: inline;'>TOUCH it!</p>",
            fi: "Pidätkö tästä kuvasta? <p style='font-weight: bold !important; display: inline;'>KOSKETA sitä!</p>",
            de: "Mögen Sie dieses Bild? <p style='font-weight: bold !important; display: inline;'>Bild berühren</p>",
            es: "¿Te gusta esta imagen? <p style='font-weight: bold !important; display: inline;'>Dar un Toque a la imagen</p>",
            fr: "Aimez vous cette image? <p style='font-weight: bold !important; display: inline;'>Touchez l'image</p>",
            hi: "क्या आपको यह छवि पसंद है? <p style='font-weight: bold !important; display: inline;'>छवि छुएं (टच करें)</p>",
            it: "Ti piace questa immagine? <p style='font-weight: bold !important; display: inline;'>Tocca l'immagine</p>",
            ja: "このイメージが好きですか？ <p style='font-weight: bold !important; display: inline;'>イメージをタッチ</p>",
            pl: "Lubisz ten obraz? <p style='font-weight: bold !important; display: inline;'>Dotknij obraz</p>",
            pt: "Gosta desta imagem? <p style='font-weight: bold !important; display: inline;'>Toque na imagem</p>",
            ru: "Вам нравится это изображение? <p style='font-weight: bold !important; display: inline;'>Коснуться изображения</p>",
            sv: "Gillar du denna bild? <p style='font-weight: bold !important; display: inline;'>Peka på bilden</p>",
            zh: "你喜欢该图片吗？ <p style='font-weight: bold !important; display: inline;'>接触图片</p>"

        },
        "TouchDialogPreSignup.ContentDoYouLikeThisImage": {
            en: "{0}Sign in{1}to ThingLink to create your own interactive images!",
            fi: "{0}Kirjaudu sisään{1}Thinglink-palveluun ja tee omia interaktiivisia kuvia!",
            de: "Bei ThingLink {0}anmelden{1}, um eigene interaktive Bilder zu erstellen!",
            es: "- ¡{0}Regístrate{1} en ThingLink para crear tus propias imágenes interactivas!",
            fr: "{0}Enregistrez vous{1} à ThingLink pour créer vos propres images intéractives",
            hi: "अपनी खुद की इंटरैक्टिव छवियां बनाने के लिए ThingLink पर  {0} साइन इन {1}  करें!",
            it: "{0}Accedi{1} a ThingLink per creare le tue immagini interattive!",
            ja: "ThingLink にサインインして、インタ{0}アクティブ・イメ{1}ジを作ろう！",
            pl: "{0}Zaloguj się{1} do ThingLink, aby tworzyć własne interaktywne obrazy!",
            pt: "{0}Inscreva{1}se- no ThingLink para criar as suas próprias imagens interativas!",
            ru: "{0}Войдите в{1} ThingLink, чтобы создать свои интерактивные изображения!",
            sv: "{0}Logga in{1} till ThingLink för att skapa dina egna interaktiva bilder!",
            zh: "{0}登陆{1} ThingLink创建你的互动图片"

        },
        "FourDotsButton.MadeWithOrMakeYourOwn": {
            en: "Made with",
            fi: "Tee oma",
            ru: "Сделано с помощью",
            pt: "Feito com o",
            es: "Hecho con",
            pl: "Zrób to sam",
            it: "Creato con",
            ja: "自分の作品を作りましょう",
            fr: "Réalisé avec",
            de: "Hergestellt mit",
            hi: "आपका अपना बनाए",
            zh: "制作你自己的",
            sv: "Skapat med"

        },
        "FourDotsButton.SignUpShort": {
            en: "Sign up!",
            fi: "Rekisteröidy!",
            ru: "Зарегистрируйтесь!",
            pt: "Inscrever-se!",
            es: "¡Regístrate!",
            pl: "Zarejestruj się!",
            it: "Registrati!",
            ja: "サインアップ！",
            fr: "S'inscrire!",
            de: "Melde dich an!",
            hi: "साइन अप करें!",
            zh: "注册吧！",
            sv: "Registrera dig!"

        },
        "FourDotsButton.SignUpLong": {
            en: "Sign up, it's free!",
            fi: "Rekisteröidy, se on ilmaista!",
            ru: "Зарегистрируйтесь, это бесплатно!",
            pt: "Inscreva-se, é grátis!",
            es: "Regístrate, ¡es gratis!",
            pl: "Zarejestruj się, jest to darmowe!",
            it: "Registrati, è gratis!",
            ja: "サインアップ、無料です！",
            fr: "Inscrivez-vous, c'est gratuit!",
            de: "Melde dich an, es ist kostenlos!",
            hi: "साइन अप करें, यह मुफ्त है!",
            zh: "注册吧，免费！",
            sv: "Registrera dig, det är gratis!"

        },
        "FourDotsButton.LearnMore": {
            en: "Learn more",
            fi: "Lue lisää",
            ru: "Узнать больше",
            pt: "Saber mais",
            es: "Descubra más",
            pl: "Dowiedz się więcej",
            it: "Per saperne di più",
            ja: "さらに詳しく",
            fr: "En savoir plus",
            de: "Mehr erfahren",
            hi: "अधिक जानें",
            zh: "了解更多",
            sv: "Lär mer"

        }

    };
    var e = "en";
    function b(g) {
        var j = 1,
        f;
        var h = a[g][c.language || e];
        if (!h) {
            h = a[g]["en"];
            if (!h) {
                return "§§§" + g + "§§§"

            }

        }
        for (f = j; f < arguments.length; f++) {
            h = h.replace("{" + (f - j) + "}", arguments[f])

        }
        return h

    }
    return b

});
tlRequire.define("util", [], 
function() {
    function m(o) {
        var q = o.indexOf("://");
        if (q === -1) {
            if (o.substring(0, 2) === "//") {
                q = 2

            } else {
                q = 0

            }

        } else {
            q = q + 3

        }
        var p = o.indexOf("/", q);
        if (p === -1) {
            p = o.indexOf("?", q);
            if (p === -1) {
                p = o.length

            }

        }
        o = o.substring(q, p);
        p = o.indexOf(":");
        if (p != -1) {
            o = o.substring(0, p)

        }
        return o

    }
    function e() {
        return ("https:" == document.location.protocol) ? "https:": "http:"

    }
    function g(r) {
        if (!r) {
            return ""

        }
        var p = r.indexOf("/", 8);
        var q = r.indexOf("?", 8);
        var o = p < 0 ? q: q < 0 ? p: Math.min(p, q);
        if (o > 0) {
            return r.substring(0, o)

        }
        return r

    }
    function n(p) {
        var o;
        try {
            o = decodeURIComponent(p)

        } catch(r) {
            o = null

        }
        return o ? encodeURI(o) : encodeURI(p)

    }
    function c(o) {
        return o.replace(/;\$?\d+$/, "")

    }
    function f(p) {
        p = String(p);
        var o = p.lastIndexOf(";");
        if (o > 0 && o < p.length - 1) {
            var r = p.slice(o + 1);
            return r

        }
        if (/^\d+$/.test(p)) {
            return p

        }
        return ""

    }
    function b(t, s, r) {
        var q = "";
        var o = s ? "!important": "";
        var p,
        u;
        for (p in t) {
            if (t.hasOwnProperty(p)) {
                u = t[p];
                if (r && !isNaN(u) && parseInt(u, 10) !== 0) {
                    u = u + "px"

                }
                q += (p + ":" + u + o + ";")

            }

        }
        return q

    }
    function h() {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var o = parseFloat(RegExp.$1);
            if (o <= 8) {
                return true

            }

        }
        return false

    }
    function d(o) {
        return (o === undefined)

    }
    function l() {
        var o = 0;
        var p = 0;
        if (!window.innerWidth) {
            if (document.documentElement.clientWidth !== 0) {
                o = document.documentElement.clientWidth;
                p = document.documentElement.clientHeight

            } else {
                o = document.body.clientWidth;
                p = document.body.clientHeight

            }

        } else {
            o = window.innerWidth;
            p = window.innerHeight

        }
        return {
            w: o,
            h: p

        }

    }
    function i(r) {
        var u = r.getBoundingClientRect();
        var v = document.body;
        var p = document.documentElement;
        var o = window.pageYOffset || p.scrollTop || v.scrollTop;
        var s = window.pageXOffset || p.scrollLeft || v.scrollLeft;
        var t = p.clientTop || v.clientTop || 0;
        var w = p.clientLeft || v.clientLeft || 0;
        var x = u.top + o - t;
        var q = u.left + s - w;
        return {
            top: Math.round(x),
            left: Math.round(q)

        }

    }
    var k = (function() {
        return document.documentElement && typeof(document.documentElement.ontouchstart) != "undefined"

    } ());
    function j(o) {
        return o.parents("div[tl-channel-id]").attr("tl-channel-id")

    }
    function a(p, o) {
        var q;
        for (q in o) {
            if (o.hasOwnProperty(q)) {
                p[q] = o[q]

            }

        }
        return p

    }
    return {
        cleanURIEncoding: n,
        extractUrl: c,
        extractSceneId: f,
        mapToCssText: b,
        browserIsUnsupported: h,
        no: d,
        getWindowSize: l,
        getOffsetRect: i,
        getDomain: m,
        getProtocol: e,
        getSourceDomain: g,
        isTouchDevice: k,
        getChannelId: j,
        extend: a

    }

});