/*
*星盘左侧，头部样式
 */
var typeList = "pic";
define(function (require, exports) {
	$(document).ready(function(){
		setSize();
		topBar();
        // 切换文件夹视图
        var ulList = $("#list");
        var headList = $("#fileListHead");
        $("#tbText").on("click",function(){
        	typeList = 'text';
        	setSize();
        	headList.show();
        	ulList.addClass("list-list").removeClass("ico-list");
        	$(this).addClass('cur').siblings().removeClass("cur");
        });
        $("#tbPic").on("click",function(){
        	typeList = 'pic';
        	setSize();
        	headList.hide();
        	ulList.addClass("ico-list").removeClass("list-list");
        	$(this).addClass('cur').siblings().removeClass("cur");
        });

        // 点击上传文件
        $("#tbUpload").on("click", function(){
        	$(".mask").show();
        	$("#BaseUpload").show();
        });
        $(".close").on("click", function(){
        	$(".mask").hide();
        	$("#BaseUpload").hide();
        });
	})
	$(window).resize(function(){
		setSize();
	});
	function setSize(ele,w,h){
		// 左侧导航
		var winH = h || window.innerHeight;
		$("#leftPanel").css({
			'height': winH - 57,
		})

		//面包屑
		var cru = $("#crumb");
		$(".crumb-path").css({
			"width" : cru.width() - 200 - 35
		})

		//文件内容
		$("#fileListMain").css({
			'height': typeList == 'pic' ?  (winH - 57 - 99) : (winH - 57 - 99 - 37)
		})
	}
	/**
	 * 鼠标放到头像上，出现效果
	 * @return {[type]} [description]
	 */
	function topBar(){
		var e = null;
		$(".user-info-wrap").on("click", function () {
            $(".user-info-wrap").hasClass("user-info-on") || $(".user-info-wrap").addClass("user-info-on"), clearTimeout(e)
        }).on("mouseover, mouseenter", function () {
            clearTimeout(e)
        }).on("mouseout, mouseleave", function () {
            e = setTimeout(function () {
                $(".user-info-wrap").hasClass("user-info-on") && $(".user-info-wrap").removeClass("user-info-on");
            }, 500)
        }), $("#userInfo").on("click", function (e) {
            $(".user-info-wrap").removeClass("user-info-on");
            e.stopPropagation();
        })
	}
})