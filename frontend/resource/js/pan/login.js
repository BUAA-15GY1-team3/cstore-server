/*
*星盘首页
 */
define(function (require, exports) {
	$(window).load(function(){
		

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