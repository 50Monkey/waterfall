window.onload = function () {
    waterfall('main', 'pin');
    var jsonData = {
        'data': [
            { 'src': '37.jpg'}, { 'src': '38.jpg'  }, {  'src': '39.jpg' }, {'src': '40.jpg'
        }]
    }; //假设从后台传入数据
    window.onscroll = function () {
        if (check()) {
            var oparent = document.getElementById("main"); //获取父元素
            for (var i = 0; i < jsonData.data.length; i++) {   //获取后台数据长度
                var addpin = document.createElement("div");
                addpin.className = "pin";
                oparent.appendChild(addpin);
                var addbox = document.createElement("div");
                addbox.className = "box";
                addpin.appendChild(addbox);
                var addimg = document.createElement("img");
                addimg.src = './images/' + jsonData.data[i].src;
                addbox.appendChild(addimg);
            }
        waterfall("main","pin");
        };
    }
}

function check() {
    var oparent = document.getElementById('main'); //获取父元素
    var pins = getClassObj(oparent, 'pin');
    var lastpin = pins[pins.length - 1].offsetTop + Math.floor(pins[pins.length - 1].offsetHeight / 2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastpin < scrollTop + documentHeight) ? true : false;
}

function waterfall(parent, pin) {
    var oparent = document.getElementById(parent); //获取父元素
    // var pins = oparent.getElementsByClassName('pin'); //一些版本低的浏览器不支持getElementsByClassName()写法
    var pins = getClassObj(oparent, pin);
    var pinW = pins[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / pinW); //求得页面可容纳图片的列数
    oparent.style.width = pinW * num + 'px';
    oparent.style.margin = '0 auto ';
    var pinheights = []; //用于存储 每列中的所有块框相加的高度。
    for (var i = 0; i < pins.length; i++) {
        var pinH = pins[i].offsetHeight;
        if (i < num)
            pinheights[i] = pinH; //第一行中的num个块框pin 先添加进数组pinheights
        else {
            var minH = Math.min.apply(null, pinheights); ////找寻数组中的最小值
            for (var j in pinheights) {
                if (pinheights[j] == minH)
                    break;
            }
            var minHindex = j; //获取 pin高度 最小值的索引index
            pins[i].style.position = 'absolute';
            pins[i].style.top = minH + 'px';
            pins[i].style.left = pins[minHindex].offsetLeft + 'px';
            pinheights[minHindex] = pinheights[minHindex] + pins[i].offsetHeight;
        }
    }
}

function getClassObj(parent, className) {
    var obj = parent.getElementsByTagName('*'); //获取 父级的所有子集
    var pinS = []; //创建一个数组 用于收集子元素
    for (var i = 0; i < obj.length; i++) { //遍历子元素、判断类别、压入数组
        if (obj[i].className == className) {
            pinS.push(obj[i]);
        }
    };
    return pinS;
}