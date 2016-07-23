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

/*存储cookie*/
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
//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/*获取url 参数*/
function getParams(url) {
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);

    }
    return paraObj;
}

/*
 *公用ajax模板，调取数据.同步
 *action为调用方法，data为传入数值
 */
function ajaxJsonCall(post_path, data, type, async, callback) {
    $.ajax({
        url: "http://10.99.218.127:8080" + post_path, //实时刷新数据
        timeout: 12000,
        type: type,
        async: async,
        data: data,
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            //TODO: 处理status， http status code，超时 408
            // 注意：如果发生了错误，错误信息（第二个参数）除了得到null之外，还可能
            //是"timeout", "error", "notmodified" 和 "parsererror"。s
            callback && callback(XMLHttpRequest.responseText);
        }, 
        success: function(result, textStatus, jqXHR) {
            callback && callback(result);
        }
    });
};
/*检查错误*/
function dialog(obj, callback){
    var defaults = {
        head:"出错喽",
        title:"报错喽！！",
        msg:"详细信息",
        icon:"icon",
        flag:false
    };
    obj = $.extend(defaults, obj);
    var err =   '<div class="ui-widget-overlay ui-front"></div>' +
                '<div class="ui-dialog ui-widget-content" id="error">' +
                    '<div class="ui-widget-header clearfix">' +
                        '<span id="ui-id-4" class="ui-dialog-title">' + obj.head + '</span>' +
                        '<button type="button" class="ui-button ui-dialog-titlebar-close ui-close" title="关闭">' +
                            '<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="ui-dialog-content ui-widget-content">' +
                        '<div class="ui-dia-msg-box">' +
                            '<div class="ui-dia-msg ui-dia-msg-warning">' +
                                '<i class="icon '+ obj.icon +'"></i>' +
                                '<div class="ui-dia-msg-text">' +
                                    '<p>' + obj.title + ' </p>' +
                                    '<p></p>' +
                                    '<p class="info">' + obj.msg + '</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ui-widget-content ui-dialog-buttonpane">' +
                        '<div class="ui-dialog-buttonset">' +
                        '</div>' +
                    '</div>' +
                '</div>';
    if (!$("#error").length) {
        $("body").append(err);
    };
    var btn = $(".ui-dialog-buttonset");
    $("#error").show();
    $(".ui-widget-overlay").show();
    btn.empty();
    // 存在确定
    if (obj.flag) {
        btn.append('<button type="button" class="ui-button-blue ui-button m-r ui-sure">确 定</button>');
    };
    btn.append('<button type="button"  class="ui-button-default ui-button ui-close">关闭</button>');
    // 其他事件
    $(".ui-close").on("click", function(e){
        $("#error").hide();
        $(".ui-widget-overlay").hide();
        e.stopPropagation();
    });
    $(".ui-sure").on("click", function(e){
        e.stopPropagation();
        callback && callback(e);
    });
}


/**
 * 显示错误框
 * @param  {[type]} ele   [div原型]
 * @param  {[type]} error [错误提醒]
 * @param  {[type]} flag  [是否展示]
 */
function tips(ele,error,flag){
    if (flag) {
        $(ele).html(error);
        $(ele).show();
    }else{
        $(ele).empty();
        $(ele).hide();
    }
}


//上传表单
function UpladFile(obj, callback) {
    var fileObj = document.getElementById('file').files[0]; // 获取文件对象
    if (fileObj == undefined) {
        alert("请选择上传文件");
    }
    else {
        var FileController = "/api/upload?uname="+obj.uname+"&file-path="+obj["file-path"]+"&file-name="+fileObj.name;
        var form = new FormData();                           // 文件对象
        form.append("file", fileObj);
        // XMLHttpRequest 对象

        var xhr = new XMLHttpRequest();

        xhr.open("post", FileController, true);
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                callback && callback(xhr.responseText);
            };
        }
        xhr.send(form);
    }
}