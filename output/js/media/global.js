/**
 * @param  {全局函数}
 * @return {[type]}
 */
//首页
define(function (require, exports) {
    require('styleSidebar');
    require('spriteSiderbar'); 
    //延迟加载图片
    require('spriteLazyload');
    require('spriteGlobalSearch');
    $(function () {
        // 获取浏览器版本
        var bower = getBrowserInfo();   

        // 获取url，判断属于哪一个节点
        var url = window.location.href;
        var current = getHost(url);
        //console.log(current);
        qg.ui.active($('.headerNavMain .' + current), 'cur');
        // 0.2s之后显示页面渲染之后显示页面
        var boTime = setTimeout(function() {
            $('body').addClass('body_opacity');
            clearTimeout(boTime);
        }, 200);

        

        // 鼠标放在头部购物车上，绘制高度
        $("#miniCart").hover(function(){
            var cScoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $(".hd_cart_scrollwrap").css("height",$(window).height() + cScoll - 300 + "px");
        });  

        showSearch();  

        // 第二页面时候，隐藏9层
        var par = $("#allSortOuterbox");
        $("#allSortOuterbox").hover(function(){
            if (par.hasClass("allSortOuterbox_node")) {
                par.addClass("allSortOuterbox_hover")
            };
        }, function () {
            if (par.hasClass("allSortOuterbox_node")) {
                par.removeClass("allSortOuterbox_hover")
            };
        }); 

        // 点击close 关闭页面最高图片
        $(".top-close").on("click", function(e){
            if ($(this).hasClass("top-open")) {
                $("#top-banner").show()
                $("#top-banner").animate({
                    height: 80
                }, 400);
                $(this).removeClass("top-open");
            }else{
                $("#top-banner").animate({
                    height: 0
                }, 400, function () {
                    $("#top-banner").hide()
                });
                $(this).addClass("top-open");
            }     
            e.preventDefault();
            e.stopPropagation();
        });

        // 输入框
        $("#keyWords").on("keydown", function(e){
            var _this = $(this);
            var _placeholder = $(".search-combobox-placeholcer");
            if (_this.val() == "") {
                _placeholder.show();
            }else{
                _placeholder.hide();
            }
            e.stopPropagation();
        });
    });

    // 获取浏览器版本信息
    function getBrowserInfo(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
          return "Chrome";
         }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE55) {
                return "IE55";
            }
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }
            return "IE";
        };
    }

    // 获取浏览器homt
    function getHost (url) { 
        var host = null;
        if (typeof url == "undefined"
           || null == url
           )
            url = window.location.href;
        var args = url.split("?"); 

        if(args[0] == "") { 
    　　  return "index"; /*CuPlayer.com提示：无需做任何处理*/ 
    　　} 
        args = args[0].split('/');
        args = args[args.length - 1];
        args == "" ? host = "index" : host = args.split('.')[0];
        return host;
    }
    //楼层导航
    $(window).scroll(function () {
        showSearch();
    });

    function showSearch(){
        var topF1 = $('#hd_header_nav').offset().top;
        var hScoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var logo = $("#logo_img");
        var head = $(".hd_header_wrap"); 
        if (!head.hasClass("hd_header_wrap_no")) {
            if (hScoll >= topF1) {
                head.addClass("hd_header_wrap_fixed");
                logo.attr("/images/logo1.png");
            }else{
                head.removeClass("hd_header_wrap_fixed");
                logo.attr("/images/logo.png");
            }
        };
    }    
    $(".lazy-loading").lazyload();
});

function setCookie(name, value, days) {
    var cookieDays = days || 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60000 * 24 * cookieDays); // 过期时间 30天
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}
function getCookie(name) {
    var arg = name + '=';
    var alen = arg.length;
    var dcookie = document.cookie;
    var clen = dcookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (dcookie.substring(i, j) === arg) {
            var endstr = dcookie.indexOf(';', j);
            if (endstr === -1) {
                endstr = dcookie.length;
            }
            return unescape(dcookie.substring(j, endstr));
        }
        i = dcookie.indexOf(' ', i) + 1;
        if (i === 0) {
            break;
        }
    }
    return null;
};