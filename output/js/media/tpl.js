$(function(){
	var tpl = ["header","footer"];
	for (var i = 0; i < tpl.length; i++) {
		$.ajaxSetup({ 
		    async : false 
		});  
		var idTpl = $("#"+tpl[i]); 
		if (idTpl) {
			$.get('/resources/lib/'+tpl[i]+'.html',function(result){	
				idTpl.html(result);
			});
		};
	};
})