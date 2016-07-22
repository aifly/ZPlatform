'use strict';

/**
 created by fly on 2016/7/21
 */

!function (document) {

    var img = new Image(),
        canvas = null;

    img.onload = function () {

        var data = createCanvas(this.width, this.height),
            context = data.context;
        canvas = data.canvas;
        context.drawImage(this, 0, 0);

        fillText({
            context: canvas.getContext('2d'),
            text: '徐畅',
            x: 98,
            y: -25,
            rotate: 10
        });

        fillText({
            context: canvas.getContext('2d'),
            text: '2016',
            x: 198,
            y: -5,
            rotate: 10
        });

        fillText({
            context: canvas.getContext('2d'),
            text: '7',
            x: 258,
            y: -8,
            rotate: 10
        });

        fillText({
            context: canvas.getContext('2d'),
            text: '23',
            x: 292,
            y: -8,
            rotate: 10
        });
    };

    img.src = './static/images/army1.jpg';

    function fillText(option) {
        var context = option.context || {},
            rotate = option.rotate || 0,
            text = option.text || '',
            x = option.x || 0,
            y = option.y || 0;

        context.save();
        context.rotate(rotate * Math.PI / 180);
        context.translate(x, y); //28 -55
        context.font = "16px 宋体";
        context.fillText(text, 320, 150);
        context.restore();
    }

    function createCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        //document.getElementById('fly-main').appendChild(canvas);
        return { canvas: canvas, context: context };
    }

    $('#create').on('click', function () {

        /*  var formData = new FormData();
            formData.append('file', document.getElementById('file').files[0]);
            $.ajax({
              type:"POST",
              url:'http://localhost:90/thinkphp/Index/Index/upload',
              data:formData,
              contentType: false,
              processData: false,
              success(data){
                  console.log('http://localhost:90'+data);
              }
          });
              return;*/
        if (!canvas) {
            return;
        };

        fillText({
            context: canvas.getContext('2d'),
            text: $('.company').val(),
            x: 28,
            y: -55,
            rotate: 10
        });

        /*  fillText({
              context:canvas.getContext('2d'),
              text:$('.name').val(),
              x:28,
              y:-55,
              rotate:10
          });*/

        //        alert(1);

        //document.write(canvas.toDataURL());

        $.ajax({
            type: "POST",
            url: 'http://localhost:90/thinkphp/Index/Index/base64ToImage',
            data: {
                id: 123,
                img: canvas.toDataURL(),
                name: 'fly'
            },
            success: function success(data) {
                console.log('http://localhost:90' + data);
            }
        });
    });
}(document);

//# sourceMappingURL=index-compiled.js.map