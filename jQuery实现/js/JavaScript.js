$(document).ready(function () {
    waterfall();
    var jsonData = {
        'data': [{
            'src': '37.jpg'
        }, {
            'src': '38.jpg'
        }, {
            'src': '39.jpg'
        }, {
            'src': '40.jpg'
        }]
    }; //假设从后台传入数据
    window.onscroll = function () {
        if (check()) {
            // $(jsonData.data).each(function (index, value) {
            //     var $addpin = $('#main').append($("<div class='pin'>"));
            //     var $addbox=$addpin.append($("<div class='box'>"));
            //     $addbox.append($('<img>').attr('src','./images/'+$(value).attr('src'))); //注意这里的value是DOM值，要使用attr（）要转化成jQuery对象
           
            // });
            $(jsonData.data).each(function (index, value) {
                // var $addpin = $('#main').append($("<div class='pin'>"));
                var $addpin = $("<div class='pin'>").appendTo( $( "#main" ) );
                // var $addbox=$addpin.append($("<div class='box'>"));
                var $addbox = $('<div class="box">').appendTo( $addpin );     //换用append用法图片会出现重叠？？
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($addbox);
                // $addbox.append($('<img>').attr('src','./images/'+$(value).attr('src')));
            });
            waterfall();
        };
    }
});

function check() { //检查是否满足加载要求
    var $pins = $('#main>div');
    var lastpin = $pins.last().get(0).offsetTop + Math.floor($pins.last().height() / 2);//get(0)??
    var scrollTop = $(window).scrollTop(); //注意解决兼容性
    var documentHeight = $(document).height(); //页面高度
    return (lastpin < scrollTop + documentHeight) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
}

function waterfall() {
    var $pins = $('#main>div');
    var pinwidth = $pins.eq(0).outerWidth(); // 一个块框pin的宽
    var num = Math.floor($(window).width() / pinwidth); //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    $("#main").css({
        'width': pinwidth * num,
        'margin': '0 auto',
    });
    var pinheights = []; //用于存储 每列中的所有块框相加的高度。
    $pins.each(function (index, value) {
        if (index < num) {
            pinheights[index] = $pins.eq(index).height();
        } else {
            var minH = Math.min.apply(null, pinheights); //数组pinHArr中的最小值minH
            var minHindex = $.inArray(minH, pinheights); //数组pinHArr中的最小值为minH的索引
            $(value).css({
                "position": "absolute",
                "top": minH,
                "left": $pins.eq(minHindex).position().left,
            });
            pinheights[minHindex] = pinheights[minHindex] + $pins.eq(index).height(); //更新添加了块框后的列高
        }

    });

}