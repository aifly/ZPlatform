/**
 * Created by linten01 on 2016/4/7 0007.
 */

import $ from 'jquery';

(function ($) {
    $.fn.extend({
        dragAndReize(option){
            let _default = {};
            let setting = $.extend(_default, option);
            this.each((i, n)=> {
                $(n).find('aside').remove();
            });


            return this.each((i, n)=> {

                let aside = $(`<aside style="border:1px solid #eee;width:100%;height:100%;position:absolute;left:0;top:0"></aside>`);
                $(n).append(aside);
                n.isCanMove = false;
                aside.on('mousedown', (e)=> {
                    e.preventDefault();

                    n.disX = e.clientX - $(n).offset().left;
                    n.disY = e.clientY - $(n).offset().top;
                    $(document).on('mousemove', e=> {
                        let parent = $(n).parents('.rm-img-container');

                        let x = e.clientX - parent.offset().left - n.disX,
                            y = e.clientY - parent.offset().top - n.disY;


                        x < 0 && (x = 0);
                        y <= 0 && (y = 0);

                        x > parent.width() - $(n).width() && (x = parent.width() - $(n).width());
                        y > parent.height() - $(n).height() && (y = parent.height() - $(n).height());

                        setting.callback && setting.callback({x, y});

                        ///$(n).css({left: x, top: y});
                    }).on("mouseup", e=> {
                        $(document).off('mousemove mouseup');
                    });


                });


                let point1 = $('<div class="point point1"></div>');
                let point2 = $('<div class="point point2"></div>');
                let point3 = $('<div class="point point3"></div>');
                let point4 = $('<div class="point point4"></div>');

                aside.append(point1, point2, point3, point4);

            });
        },
        showPoint(){
            return this.each((i, n)=> {
                $(n).find('.point').css({opacity: 1});
            });

        },
        hidePoint(){
            return this.each((i, n)=> {
                $(n).find('.point').css({opacity: 0});
            })
        }

    });
})($);