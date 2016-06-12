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
    removeClass(obj,className){
        if(obj.length){
            obj.forEach(o=>{
                o.classList.remove(className);
            })
        }
        else{
            obj.classList.remove(className)
        }

    },
    addClass(obj,className){
        if(obj.length){
            obj.forEach(o=>{
                o.classList.add(className);
            })
        }
        else{
            obj.classList.add(className)
        }

    },
    index(elems, parent, selector) {
        var parent = parent || elems.parentNode,
            cindex = - 1,
            selector = selector || "*";
        Array.from(parent.querySelectorAll (selector)).forEach(function(item,i){
            "use strict";
            if(item === elems){
                cindex = i;
            }
        });
        return cindex;
    },

    ajax(url, fn){
        let xmlhttp = null;
        if (window.XMLHttpRequest) {// code for all new browsers
            xmlhttp = new XMLHttpRequest();
        }
        if (xmlhttp != null) {
            xmlhttp.onreadystatechange = ()=> {
                this.stateChange(xmlhttp, fn)
            };
            xmlhttp.overrideMimeType && xmlhttp.overrideMimeType('text/html');//设置MiME类别
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
        }
    },
    stateChange(xmlhttp, fn){
        if (xmlhttp.readyState == 4) {// 4 = "loaded"
            if (xmlhttp.status == 200) {// 200 = OK
                fn && fn(xmlhttp.responseText)

            }
            else {
                alert("Problem retrieving XML data");
            }
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