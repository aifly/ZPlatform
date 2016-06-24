import '../css/richimg.min.css';
import 'babel-polyfill'
!function (window, undefined) {
    window.flyRequire = window.flyRequire || {};
    var g = {};

    var get = function (id) {
        return {
            waitList: [],
            waitCount: 0,
            callback: null,
            definition: null,
            dependencies: null,
            async: null,
            id: id
        }
    }

    var l = function (o) {
        for (var m = 0; m < o.waitList.length; m++) {
            var n = o.waitList[m];
            n.waitCount--;
            if (n.callback && n.waitCount === 0) {
                e(n)
            }
        }

    };

    var e = function (p) {
        var m = [];
        for (var o = 0; o < p.dependencies.length; o++) {
            var n = p.dependencies[o];
            var q = g[n];
            m.push(q.definition)

        }
        if (p.async) {
            m.push(function (s, r) {
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

    flyRequire.define = function (name, requires, fn, async) {
        async = async || false;

        g[name] = g[name] || get(name);

        var s = g[name];

        s.callback = fn;
        s.dependencies = requires;
        s.async = async;

        for (var i = 0; i < requires.length; i++) {
            var item = requires[i];

            !g[item] && ( g[item] = get(item) );

            var r = g[item];
            if (!r.definition) {
                r.waitList.push(s);
                s.waitCount++;
            }
        }

        if (s.callback && s.waitCount === 0) {
            e(s);
        }

    };

    flyRequire.defineAsync = function (name, requires, fn) {
        this.define(name, requires, fn, true)
    }
}(window);


flyRequire.define("namespace", [],
    function () {

        window.__richimage === undefined && ( window.__richimage = {} );

        window.__flyconfig !== undefined && (window.__richimage.config = window.__flyconfig);


        return window.__richimage

    });

flyRequire.define("util", [],
    function () {
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
            return ("https:" == document.location.protocol) ? "https:" : "http:"

        }

        function g(r) {
            if (!r) {
                return ""

            }
            var p = r.indexOf("/", 8);
            var q = r.indexOf("?", 8);
            var o = p < 0 ? q : q < 0 ? p : Math.min(p, q);
            if (o > 0) {
                return r.substring(0, o)

            }
            return r

        }

        function n(p) {
            var o;
            try {
                o = decodeURIComponent(p)

            } catch (r) {
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
            var o = s ? "!important" : "";
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

        var k = (function () {
            return document.documentElement && typeof(document.documentElement.ontouchstart) != "undefined"

        }());

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

flyRequire.define("adMatcher", [],
    function () {
        function b() {
            var c = ["1.\\d+.\\d+.\\d+", "127.0.0.\\d+", "localhost", "46.45.138.126", "abs.twimg.com", "ad.doubleclick.net", "ad.flatmaids.de", "ad.zanox.com", "ad.adriver.ru", "ad.admitad.com", "ad.dumedia.ru", "ad.linksynergy.com", "ad-cdn.technoratimedia.com", "ad\\d.adfarm1.adition.com", "ad1.emediate.dk", "ad.retargeter.com", "adsfac.eu", "adfarm.mediaplex.com", "adfile.tattermedia.com", "admax.quisma.com", "admeta.vo.llnwd.net", "adscale.nuggad.net", "adserver.wesee.com", "ads.foodbuzz.com", "ads.giovannicintolo.com", "ads.guava-affiliate.com", "ads.heias.com", "ads.jetpackdigital.com", "ads.nelly.com", "ads.newtentionassets.net", "ads.studentmedia.ucla.edu", "ads.thinglink.com", "ads.jetpackdigital.com", "adtag.neodatagroup.com", "adtracker.meinungsstudie.de", "aka-cdn-ns.adtech.de", "ads\\d.unitymedia.de", "analytics.sanoma.fi", "analytics.spongecell.com", "api.zanox.ws", "api.here.com", "ariel1.spaceprogram.com", "asn.advolution.de", "as.aug.me", "avatars.scribblelive.com", "b.aol.com", "b.kavanga.ru", "b.thebestlinks.com", "b.scorecardresearch.com", "bid.openx.net", "brandnamic.adclear.net", "brightcove.vo.llnwd.net", "bs.serving-sys.com", "cas.criteo.com", "cepep.co", "cdn.flashtalking.com", "c.statcounter.com", "counters.gigya.com", "cdn\\d*.gigya.com", "counter.rambler.ru", "creatives.klikki.com", "cxpfy.com", "d.shareaholic.com", "delatv.com", "d1.openx.org", "delivery.ctasnet.com", "engine.adzerk.net", "fapp.im", "fraction8.com", "geo.yahoo.com", "getpocket.com", "g.doubleclick.net", "gravatar.com", "\\w+.gmads.mookie1.com", "hits.e.cl", "i-cdn.servedbyopenx.com", "imp\\w?\\w?.tradedoubler.com", "imagesrv.adition.com", "img-cdn.mediaplex.com", "pictela.net", "jptracking.elasticbeanstalk.com", "\\w+.googleapis.com", "khm\\d.google.com", "l.betrad.com", "\\w+.lijit.com", "links.es", "leerya.net", "\\d+.maps.nlp.nokia.com", "mdsad.com", "mt\\d.googleapis.com", "malvin.tv", "maps.googleapis.com", "next.playad.se", "notici.me", "notifreak.com", "networkanalytics.net", "oas.theblondesalad.com", "otile\\d.mqcdn.com", "pagead\\d.googlesyndication.com", "paypal.com", "peliculasid.biz", "pictela.net", "pixel.wp.com", "pulsemaps.com", "readitlaterlist.com", "remnant.fmpub.net", "reports.wizebar.com", "s0.2mdn.net", "s\\d+.adform.net", "s\\d+.addthis.com", "s\\d+.shinystat.com", "stats.wordpress.com", "sitemeter.com", "sm\\d+.sitemeter.com", "tag.admeld.com", "t.qservz.com", "t.socialgrowthtechnologies.com", "tags.bluekai.com", "tessera\\d+.intellicast.com", "tile.openstreetmap.org", "\\w+.tile.openstreetmap.org", "track.adform.net", "track.admaxim.com", "tracking.hubspot.com", "traffic.shareaholic.com", "trk.lqw.me", "trk-\\w+.tidaltv.com", "us-ads.openx.net", "view.adtraxx.de", "videosomg.com", "widgets.kiosked.com", "w.uptolike.com", "www.ftjcfx.com", "www.getfreebacklinks.com", "www.google.com", "www.w3counter.com", "www\\d+.a8.net", "www.divxatope.com", "www.etracker.de", "www.callefina.com", "www.googleadservices.com", "www.google-analytics.com"];
            return new RegExp("//(" + c.join("|").replace(".", "\\.") + ")")

        }

        var a = b();
        return a

    });

flyRequire.define("globalCache", ["jQuery"],
    function (d) {
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

flyRequire.define("config", ["namespace", "util"],
    function (c, d) {
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
                address: "http://www.thinglink.com",
                sslAddress: "https://www.thinglink.com",
                videoAddress: "https://video.thinglink.com",
                sslVideoAddress: "https://video.thinglink.com",
                staticAddress: "//cdn.thinglink.me",
                staticSslAddress: "https://cdn.thinglink.me",
                embedAddress: "//cdn.thinglink.me",
                cssNonce: "334114934665",
                clientId: "310115790974091265",
                fbAppId: "163019823751039",
                wlFbAppId: "448074751917449",
                usePromotionBanner: false,
                minWidth: 130,
                minHeight: 130,
                activateImage: function (l) {
                    $flyJQ(l).tlImage("scrollTo")

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
            return ("https:" == document.location.protocol) ? a.sslAddress : a.address

        }

        function i() {
            return a.sslAddress

        }

        function j() {
            return ("https:" == document.location.protocol) ? a.sslVideoAddress : a.videoAddress

        }

        function f() {
            return ("https:" == document.location.protocol) ? a.staticSslAddress : a.staticAddress

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


flyRequire.define("sceneCache", [],
    function () {
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


flyRequire.define("statusManager", ["namespace", "config", "callbackManager"],
    function (d, c, b) {
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

flyRequire.define("callbackManager", [],
    function () {
        var a = (function () {
            var b = {};
            return {
                runAfter: function (c, d) {
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
                triggerEvent: function (c) {
                    if (b[c]) {
                        while (b[c].length > 0) {
                            (b[c].shift())()

                        }

                    } else {
                        b[c] = []

                    }

                }

            }

        }());

        return a

    });


flyRequire.defineAsync("jQuery", ["init", "util", "statusManager"],
    function (e, b, c, a) {
        var d = (function () {
            var f;

            function i(k) {
                var o = "flyRichImageJQueryScript";
                if (!window.__flyRichImageInitStarted) {
                    window.__flyRichImageInitStarted = true;
                    if (window.$flyJQ || typeof jQuery === "function") {
                        window.$flyJQ = typeof jQuery === "function" && jQuery;
                        k()
                    } else {
                        var l = document.createElement("script");
                        l.type = "text/javascript";
                        l.id = o;
                        var n = function () {
                            window.$flyJQ = jQuery.noConflict(true);
                            k()
                        };
                        if (l.addEventListener) {
                            l.addEventListener("load", n, false)

                        } else {
                            l.onreadystatechange = function () {
                                if (this.readyState == "complete" || this.readyState == "loaded") {
                                    n()
                                }
                            }
                        }

                        l.setAttribute("src", "http://aifly.github.io/zmiti/statices/js/jquery.min.js");
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
                        $flyJQ(document).ready(k)

                    }

                }

            }

            function h(k) {
                i(function () {
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

        }());
        d.initCallback(function () {
            c.setStatus("initcomplete")

        });


        d.loadJQuery(function () {
            c.setStatus("jqueryready");
            a(true, window.$flyJQ)

        })

    });


flyRequire.define("jQueryRichImage", ["jQuery", "adMatcher", "config", "globalCache"],
    function (d, a, c, e) {
        function b() {
            var h = /^data:/;
            var g = /^https?:\/\/mt\d+\.google\.com\//;
            var f = {
                sceneData: function (i) {
                    if (!i) {
                        return this.data("scene")

                    } else {
                        this.data("scene", i)

                    }

                },
                hasSize: function () {
                    if (this.richImage("isLoaded")) {
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
                isLoaded: function () {
                    return (this[0].complete || this[0].readyState === 4)

                },
                isInspectedByThinglink: function () {
                    return e.getQueriedImages().is(this) || this.hasClass("thinglinkImage") || this.hasClass("thinglinkFiltered")

                },
                isWhitelabel: function () {
                    var i = this.tlImage("sceneData");
                    return i.branding !== undefined && i.branding !== "thinglink"

                },
                hasThinglinkBadge: function () {
                    var i = this.tlImage("sceneData");
                    return i.indicator === undefined

                },
                isAlwaysThinglink: function () {
                    var i = this;
                    return i.hasClass("alwaysThinglink")

                },
                isOk: function () {
                    var k = this;
                    if (k.richImage("isAlwaysThinglink")) {
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
                        function (m, n) {
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
                scrollTo: function () {
                    var k = this;
                    var j;
                    if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
                        j = d("body")

                    } else {
                        j = d("html,body")

                    }
                    var i = j.scrollTop();
                    d(window).load(function () {
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
            d.fn.richImage = function (i) {
                return f[i].apply(this, Array.prototype.slice.call(arguments, 1))
            }

        }

        b();
        return d.fn.richImage

    });

flyRequire.define("cssInjector", ["jQuery", "config"],
    function ($, config) {
        function b(i, f, g) {
            var h = "";
            if (g) {
                h = ' media="screen"'

            }
            if ($("head").has("#" + i).length === 0) {
                var e = $('<link id="' + i + '" type="text/css" rel="stylesheet" href="' + f + '"' + h + "></link>").appendTo($("head"));
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

            if (!document.getElementById("flyInjectedCss")) {
                b("flyInjectedCss", "css/richimg.css");
            }

        }

        return {
            injectEmbedCSS: d,//嵌入的css
            addExternalCss: b

        }

    });


flyRequire.define("init", ["namespace", "util", "config", "sceneCache", "statusManager"],
    function (c, a, b, e, d) {

        if (window.console === undefined) {
            window.console = {
                log: function () {
                },
                warn: function () {
                },
                error: function () {
                }

            }

        }
        (function () {
            c.init = function () {
                if (document.all && !document.querySelector) {
                    return

                }

                var j = document.getElementsByTagName("script");
                var g;
                var m = j.length;
                while (m > 0) {
                    m--;
                    var i = j[m].getAttribute("src");
                    if (i && (i.indexOf(".zmiti.com") != -1 || i.indexOf(".zmiti.me") != -1 || i.indexOf("zmiti.local") != -1 || (b.isThinglinkSite() && (i.indexOf("embed") != -1)))) {
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

        }());

        if (c.config.initAfterLoad) {
            c.init();


        }
        return c.init

    });

flyRequire.define("main", ["jQuery", "ltFlyText"], function ($, ltFlyText) {
    //cssInjector.injectEmbedCSS();css通过es6的webpack打包到页面上的html style标签当中。


    var cacheImg = $("#fly-richimg");

    let url = cacheImg.attr('src').split('?')[1];
    let json, tags, imgLoad = false;
    cacheImg.on('load', (e)=> {
        let curParent = cacheImg.parent();
        curParent.append("<div class='richimg-parent'></div>");
        $(".richimg-parent").append(cacheImg);
        //curImg.remove();

        $(".richimg-parent").width(e.currentTarget.clientWidth);
        $(".richimg-parent").height(e.currentTarget.clientHeight);

        if (json && tags) { //先加载json数据
            tags.forEach((tag)=> {
                ltFlyText(tag);
            });
        }
        imgLoad = true;
    }).on('error', ()=> {
        console.log('richimg loaded failed')
    });

    $.getJSON(url + "?callback=" + new Date().getTime(), (data)=> {
        json = data.richImgData;
        tags = json.tags;
        if (imgLoad) { //先加载图片。
            tags.forEach((tag)=> {
                ltFlyText(tag);
            });
        }
    });
});


//标签的基类。
flyRequire.define("ltFlyBaseTag", ["jQuery"], function ($) {

    var FlyBaseTag = function (option, widget) {
        option = option || {};
        var s = this;
        s.id = option.id || "";
        s.name = option.name || "";
        s.type = option.type || "image";
        s.imgSrc = option.imgSrc || '';
        s.videoSrc = option.videoSrc || '';
        s.icon = option.icon || "";//图标的地址。
        s.parent = $("#fly-richimg").parent();
        s.style = option.styles || {
//            width:"24px",
//            height:"24px"
            }

        s.wrapStyles = option.wrapStyles || {};

        s.flyCopy(widget);
    }

    FlyBaseTag.prototype.flyCopy = function (widget) {

        var s = this;

        for (var attr in s) {
            if (typeof attr === "string") {
                widget[attr] = s[attr];
            }
            else if (typeof attr === "object" && attr !== null) {
                arguments.callee(attr);
            }
        }
    };

    return function (option, widget) {
        return new FlyBaseTag(option, widget)
    };

});

flyRequire.define("ltFlyText", ["jQuery", "ltFlyBaseTag"], function ($, baseTag) {
    var FlyText = function (option) {
        var s = this;
        option = option || {};
        s.content = option.content || "";
        s.href = option.href || "#";
        baseTag.call(s, option, s);
        s.create();
    }

    FlyText.prototype.create = function () {

        var s = this;

        var tagHtml = "<div class='lt-fly-text-tag lt-fly-tag'></div>";

        let otherHtml = '',
            imgClass = 'heightAuto';

        if (s.imgSrc) {
            let img = new Image();

            img.onload = function () {
                if (Number.parseFloat(s.wrapStyles.width) / Number.parseFloat(s.wrapStyles.height)
                    > this.width / this.height) {
                    $('.' + imgClass).removeClass().addClass('widthAuto')
                }


            };
            img.src = s.imgSrc;
        }

        if (s.type === 'image' && s.imgSrc.length > 0) { //
            otherHtml = '<img class=' + imgClass + ' src=' + s.imgSrc + ' alt=""/>'
        }
        else if (s.type === 'video' && s.videoSrc.length > 0 && s.videoSrc.endsWith('.mp4')) {
            otherHtml = `
            <video width=${s.wrapStyles.width} height=${s.wrapStyles.height}>
                <source src=${s.videoSrc} type="video/mp4"/>
            </video>
            `
        }

        if (s.href.charAt(0) === "#" && s.href.length === 1) {
            var showHtml = "<div id='" + s.id + "-show' class=' lt-fly-icon-wrapper lt-fly-text-icon-wrapper'>" + otherHtml + s.content + "<div class='triangle'></div></div>"
        }
        else {
            var showHtml = "<div id='" + s.id + "-show' class=' lt-fly-icon-wrapper lt-fly-text-icon-wrapper'><a href='" + s.href + "' target='_blank'>" + otherHtml + s.content + "</a><div class='triangle'></div></div>"
        }


        var container = $("<div id='" + s.id + "-tag-container' class='fly-tag-container'></div>");


        container.append(tagHtml, showHtml);
        s.parent.append(container);


        setTimeout(function () {//加定时器，是为了兼容FF浏览器。

            s.wrapStyles.width += 4;

            var width = parseFloat(s.wrapStyles.width),
                left = parseFloat(s.style.left) / 100 * s.parent.width() - width / 2 + 0,
                height = parseFloat(s.wrapStyles.height),
                top = parseFloat(s.style.top) / 100 * s.parent.height() - height - 28,
                iconLeft = parseFloat(s.style.left) / 100 * s.parent.width(),
                iconWidth = 24;

            var showContent = $("#" + s.id + "-show");

            var style = {left: left+4, top: top};

            if (top < 0) {

                style.top = parseFloat(s.style.top) / 100 * s.parent.height() + iconWidth + 10;
                showContent.find(".triangle").addClass("down");
            }
            else {
                showContent.find(".triangle").addClass("up");
            }


            if (left < 0) {
                style.left = 0;
                showContent.find(".triangle").css({left: iconLeft + iconWidth / 2});
            }

            if (s.parent.width() - left < width) {
                style.left = "auto";
                style.right = 0;
                showContent.find(".triangle").css({left: width - (s.parent.width() - iconLeft) + iconWidth / 2});
            }

            $("#" + s.id + "-show").css(style).css(s.wrapStyles);
            $("#" + s.id + "-tag-container .lt-fly-text-tag").css(s.style).css({
                width: 24,
                height: 24,
                background: "url(" + s.icon + ") no-repeat center"
            });
        }, 1);

    }
    return (option)=> {
        return new FlyText(option);
    }

});

