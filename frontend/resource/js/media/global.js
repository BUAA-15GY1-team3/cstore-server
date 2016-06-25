/**
 * @param  {全局函数}
 * @return {[type]}
 */
//首页
define(function (require, exports) {
    $(function () {
        // 0.2s之后显示页面渲染之后显示页面
        var boTime = setTimeout(function() {
            $('body').addClass('body_opacity');
            clearTimeout(boTime);
        }, 200);

        // tips标签触发事件
        $('[data-toggle="tooltip"]').tooltip();
    });
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