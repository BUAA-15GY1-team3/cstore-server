$(function () {
	seajs.use('xpanLoginStyle');
	seajs.use(["js/pan/canvas"], function (canvas) {
		var arr = ["18bbff", "#00486b"]
	    new canvas(arr);
	});
    seajs.use('xpanLogin');
});