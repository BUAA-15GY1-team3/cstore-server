/*
*星盘首页
 */
var username = null;
var path = "#/";
var fileList = null;
var dirType = ['folder','bookfolder','mix','picfolder','wordfolder'];
define(function (require, exports) {
	$(document).ready(function(){
        getUrl();
        getUserInfo();
        list();
    });

    /**
     * 获取url，含有hash数值
     */
    function getUrl(){
        var strUrl = decodeURIComponent(location.href);
        try {
            strUrl = getParams(strUrl);
            if(strUrl["file"] || strUrl["file"] == ""){
                path = strUrl["file"] || "#";
            }else{
                window.location.href = "index.html?file=";
            }
            
        } catch (e) {
            path = "#";
        }
    }
    /**
     * 跳转到指定文件夹位置
     * @param  {[type]} hashname [文件夹位置 /a/b/c]
     */
    function goUrl(hashname){
        window.location.hash = encodeURIComponent(hashname);
        getUrl();
        list();
    }
    /**
     * 获取用户名
     */
    function getUserInfo(){
        username = getCookie("username");
        $("#tpUserInfo").attr("title", username);
        $("#uname").html(username);
        return;
    }

    /**
     * 获取文件列表展示
     */
    function list(){
        ajaxJsonCall("/resource/json/list.json", null, "GET", true, function(data){
            if (data.errno == 0) {
                fileList = data.data;
                if (fileList && fileList != null) {
                    isEmpty(false);
                    bindList(path);
                }else{
                    isEmpty(true);
                }
            }else{
                isEmpty(true);
            }
        });
    }
    /**
     * 绑定文件列表
     * @param  {[type]} filepath [description]
     * @return {[type]}          [description]
     */
    function bindList(filepath){
        filepath = filepath.split('#')[1];
        var fileData = null;
        // 面包屑分布
        var crumbpath = $(".crumb-path");
        crumbpath.html(crumbPath(filepath));
        // 绑定文件夹
        if (filepath == "/" || filepath == "") {
            filepath = "/" + filepath;
            fileData = fileList;
        }else{
            var pathArr = filepath.split("/");
            fileData = fileList;
            for (var i = 1; i < pathArr.length; i++) {
                var dir = fileData.dirList;
                for (var j = 0; j < dir.length; j++) {
                    if (dir[j].name == pathArr[i]) {
                        fileData = dir[j];
                        break;
                    };
                };
            };
        }
        $("#list").empty();
        $("#list").append(showList(filepath, fileData));
        handle();
    }
    /**
     * 展示文件列表信息
     * @param  {[type]} filepath [文件的绝对路径]
     * @param  {[type]} filedata [对应的数据原型]
     * @return {[type]}          [description]
     */
    function showList(filepath,filedata){
        var defaults = {
            fileList:[],
            dirList:[],
            name:"文件名称",
            time:"暂未公布",
            size:"0"
        };
        var file = "";
        var fileArr = filedata.fileList;
        var dirArr = filedata.dirList;
        for (var i = 0; i < fileArr.length; i++) {
            var tips = "发布时间:"+fileArr[i]['createtime']+"&#10;"+"文件大小:"+fileArr[i]['file-size'] + "B";
            file +=  '<li class="row filelist-item clearfix" data-file="'+ filepath  + fileArr[i]['file-name'] +'/" data-type="file">'+
                        '<div class="column column-checkbox"><label></label></div>'+
                        '<div class="column column-name" title = "'+tips+'">'+
                            '<span class="ico ico-file ico-'+showFileType(fileArr[i]['file-name'])+'"></span>'+
                            '<span class="text">'+ fileArr[i]['file-name'] +'</span>'+
                        '</div>'+
                        '<div class="column column-size">'+fileArr[i]['file-size']+'B</div>'+
                        '<div class="column column-time">'+fileArr[i]['createtime']+'</div>'+
                    '</li>';
        };
        for (var i = 0; i < dirArr.length; i++) {
            dirArr[i] = $.extend(defaults, dirArr[i]);
            var tips = "发布时间:"+dirArr[i].time+"&#10;"+"文件大小:"+dirArr[i].size + "B";
            file +=  '<li class="row filelist-item clearfix" data-file="'+ filepath  + dirArr[i].name +'/" data-type="folder">'+
                        '<div class="column column-checkbox"><label></label></div>'+
                        '<div class="column column-name"  title="'+tips+'">'+
                            '<span class="ico ico-folder ico-'+showDirType(dirArr[i].name)+'"></span>'+
                            '<span class="text">'+ dirArr[i].name +'</span>'+
                        '</div>'+
                        '<div class="column column-size">'+dirArr[i].size+'B</div>'+
                        '<div class="column column-time">'+dirArr[i].time+'</div>'+
                    '</li>';
        };
        return file;
    }    

    /**
     * 点击事件处理
     */
    function handle(){
        // 文件夹的选项
        var times = null;
        $(".column-name").on("click", function (e) {
            var _this = $(this).parent();
            _this.addClass("active").siblings().removeClass("active");
            e.stopPropagation();  // 阻止事件冒泡
            clearTimeout(times);
        }).on("mouseover, mouseenter", function (e) {
            e.stopPropagation();  // 阻止事件冒泡
            clearTimeout(times);
        }).on("mouseout, mouseleave", function (e) {
            e.stopPropagation();  // 阻止事件冒泡
            times = setTimeout(function () {
                $(this).parent().removeClass("hover");
            }, 100)
        })
        // 双击文件夹触发事件
        $(".filelist-item").on("dblclick", function (e) {
            if ($(this).attr("data-type") == "folder") {
                var file = $(this).attr("data-file");
                goUrl(file);
            }else{
                return false;
            }
        });
        // 点击别处失焦
        $(document).on("click",function(){
            $("#list").find("li").removeClass('active');
        });

        // 面包屑点击
        $(".path-item").on("click", function(){
            if ($(this).hasClass("last-item")) {
                return false;
            }else{
                goUrl($(this).attr("data-file"));
            }
        });
        $(".back").on("click", function(){
            var lastUrl = $(".last-item").prev();
            goUrl(lastUrl.attr("data-file"));
        });
    }

    /**
     * 随机显示文件类型
     * @param  {string} filename [文件名称]
     * @return 文件类型
     */
    function showFileType(filename){
        var file = filename.split('.');
        var type = "file";
        if (file.length >= 2) {
            type = file[file.length - 1];
        }
        return type;
    }

    /**
     * 随机显示文件夹类型
     * @param  {string} dirname [文件夹名称]
     * @return 文件夹类型
     */
    function showDirType(dirname){
        var num = Math.floor(Math.random()*4);
        return dirType[num];
    }
    /**
     * 返回面包屑目录
     * @param  {[type]} filepath [当前路径，需要decode]
     * @return {[type]}          [返回面包屑路径]
     */
    function crumbPath(filepath){
        var str = "";
   
        if (filepath == "/" || filepath == "") {
            str = '<span class="first-item last-item path-item">所有文件</span>';
        }else{
            var arr = filepath.split("/");
            str = '<span class="back">返回上一级</span>';
            str += '<span class="first-item path-item" title="所有文件" data-file="#/">所有文件</span>';
            var path = "/";
            for (var i = 1; i < arr.length - 1; i++) {
                path +=arr[i]+"/";
                if (arr[i] != "" && (i < arr.length-2)) {
                    str += '<span class="path-item" title="'+arr[i]+'" data-file="'+path+'">'+arr[i]+'</span>';
                }else{
                    str += '<span class="last-item path-item" data-href="false" title="'+arr[i]+'">'+arr[i]+'</span>';
                }
            };
        }
        return str;
    }
    /**
     * 是否展示列表：数据是否为空
     * @param  {[type]} flag [true：是空。false:不是空]
     * @return {[type]}      [description]
     */
    function isEmpty(flag){
        var list = $("#list");
        var listhead = $("#fileListHead");
        var empty = $("#emptyTips");
        if (flag) {
            list.hide();
            listhead.hide();
            empty.show();
        }else{
            list.show();
            if (typeList != 'pic') {
                listhead.show();
            };
            empty.hide();
        }
        return true;
    }
})