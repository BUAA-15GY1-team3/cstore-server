$(function () {
	seajs.use('xpanLoginStyle');
	seajs.use(["js/pan/canvas"], function (canvas) {
		var arr = ["#ac0908", "#cd5726"];
	    new canvas(arr);
	});
});