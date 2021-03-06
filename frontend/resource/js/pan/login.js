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
	});
	$(document).keydown(function (event) {
		switch (event.keyCode) {
			case 13:
				loginSubmit();
			break;
		};
		return true;
	});
})

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
			uname: name,
			pass: pass
		}
		ajaxJsonCall("/api/login", JSON.stringify(data), "POST", true, function(data){
			if (typeof(data) == "string") {
				data = JSON.parse(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}
			}
			console.log(data);
			if (data.errno == 0) {
				setCookie("username", name, 30);
				window.location.href = "index.html?file="
			}else{
				dialog({
	                head:"错误",
	                title:"你出现了错误!",
	                msg:data['errmsg'],
	                icon:"icon",
	                flag:false
	            });
			}
		});
	}
	return true;
}