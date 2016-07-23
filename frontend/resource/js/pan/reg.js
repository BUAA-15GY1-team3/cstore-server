/*
*星盘首页
 */
define(function (require, exports) {
	$(document).keydown(function (event) {
		switch (event.keyCode) {
			case 13:
				regSubmit();
			break;
		};
		return true;
	});
})


/**
 * 登录事件
 */
function regSubmit(){
	var name = $.trim($("#username").val());
	var pass = $.trim($("#password").val());
	var npass = $.trim($("#newpassword").val());
	var msg = '';
	var err = "#error_tips";
	if (name == "") {
		tips(err,"用户名不能为空",true);
	}else if (pass == "") {
		tips(err,"密码不能为空",true);
	}else if (npass == "") {
		tips(err,"确认密码不能为空",true);
	}else if (npass !== pass) {
		tips(err,"两个密码不一致",true);
	}else{
		tips(err, "", false);
		var data = {
			uname: name,
			pass: pass
		}
		ajaxJsonCall("/api/register", JSON.stringify(data), "POST", true, function(data){
			if (typeof(data) == "string") {
				data = JSON.parse(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}
			}
			console.log(data);
			if (data.errno == 0) {
				dialog({
	                head:"注册成功",
	                title:"您的注册信息已经成功!",
	                msg:"现在开始登陆?",
	                icon:"icon",
	                flag:true
	            }, function(){
	                window.location.href = "/login.html";
	            });
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