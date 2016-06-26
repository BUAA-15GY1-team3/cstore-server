/*
*星盘首页
 */
define(function (require, exports) {
	$(document).ready(function(){
		/*点击自动登录*/
		$("#check_agreement").on("click", function(){
			$(this).toggleClass('check_agreement')
		});
		$(".form_item").on("mouseover",function(){
			$(this).addClass("current");
		}).on("mouseout",function(){
			$(this).removeClass("current");
		});
	})
})
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
/**
 * 登录事件
 */
function loginSubmit(){
	var name = $.trim($("#username").val());
	var pass = $.trim($("#password").val());
	var msg = '';
	var err = "#error_tips";
	if (name == "") {
		tips(err,"用户名不能为空",true);
	}else if (pass == "") {
		tips(err,"密码不能为空",true);
	}else{
		tips(err, "", false);
		var data = {
			Uname: name,
			Upass: hex_md5(pass)
		}
		setCookie("username", name, 30);
		window.location.href = "index.html?file="
		/*ajaxJsonCall("/api/login", data, "POST", true, function(data){
			console.log(data);
		});*/
	}
	return true;
}