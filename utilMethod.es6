/**
 created by fly on 2016/4/11 0011
 */
const utilMethods = {
    getGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    r(m, n) {
        return (m + Math.random() * (n - m));
    },
    loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        loadimg();
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = ()=> {
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
    },
    getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getStyle(obj){
        return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
    },
    hasClass(obj, className){

        return Array.from(obj.classList).indexOf(className) > -1;

    },
    removeClass(obj, className){
        if (obj.length) {
            obj.forEach(o=> {
                o.classList.remove(className);
            })
        }
        else {
            obj.classList.remove(className)
        }

    },
    addClass(obj, className){
        if (obj.length) {
            obj.forEach(o=> {
                o.classList.add(className);
            })
        }
        else {
            obj.classList.add(className)
        }

    },
    index(elems, parent, selector) {
        var parent = parent || elems.parentNode,
            cindex = -1,
            selector = selector || "*";
        Array.from(parent.querySelectorAll(selector)).forEach(function (item, i) {
            "use strict";
            if (item === elems) {
                cindex = i;
            }
        });
        return cindex;
    },

    ajax: function (opt) {
        var xhr = this.createXhrObject();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            (xhr.status === 200 ?
                opt.success(xhr.responseText, xhr.responseXML) :
                opt.error(xhr.responseText, xhr.status));
        }
        xhr.open(opt.type, opt.url, true);
        if (opt.type !== 'POST')
            opt.data = null;
        else
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        opt.data = this.parseQuery(opt.data);
        xhr.send(opt.data);
    },
    post: function (url, success, data) {
        var popt = {
            url: url,
            type: 'POST',
            data: data,
            success: success,
            error: function (data) {
            }
        }
        this.ajax(popt);
    },
    get: function (url, success) {
        var gopt = {
            url: url,
            type: 'get',
            success: success,
            error: function () {
            }
        }
        this.ajax(gopt);
    },
    createXhrObject: function () {
        var methods = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject('Msxml2.XMLHTTP');
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        ];
        for (var i = 0, len = methods.length; i < len; i++) {
            try {
                methods[i]();
            } catch (e) {
                continue;
            }
            this.createXhrObject = methods[i];
            return methods[i]();
        }
        throw new Error('Could not create an XHR object.');
    },
    parseQuery: function (json) {
        if (typeof json == 'object') {
            var str = '';
            for (var i in json) {
                str += "&" + i + "=" + encodeURIComponent(json[i]);
            }
            return str.length == 0 ? str : str.substring(1);
        } else {
            return json;
        }
    }
}

if (!Array.from) {
    Array.from = (c)=> {
        return Array.prototype.slice.call(c);
    }
}

let _$ = (selector)=> {
    return document.querySelector(selector);
};
let $$ = (selector, parent)=> {
    parent = parent || document;
    return [].slice.call(parent.querySelectorAll(selector));
};


export default {utilMethods, _$, $$};