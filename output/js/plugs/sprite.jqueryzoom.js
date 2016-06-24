! function(a) {
    a.fn.jqueryzoom = function(b) {
        console.log(b);
        var c = {
            xzoom: 200,
            yzoom: 200,
            offset: 10,
            position: "right",
            lens: 1,
            preload: 1
        };
        b && a.extend(c, b);
        var d = "";
        a(this).hover(function() {
            var b = a(this).offset().left;
            var e = a(this).offset().top;
            var f = a(this).find("img").get(0).offsetWidth;
            var g = a(this).find("img").get(0).offsetHeight;
            d = a(this).find("img").attr("alt");
            var h = a(this).find("img").attr("spriteimg");
            a(this).find("img").attr("alt", ""), 0 == a("div.zoomdiv").get().length && (a(this).after("<div class='zoomdiv'><img class='bigimg' src='" + h + "'/></div>"), a(this).append("<div class='jqZoomPup'>&nbsp;</div>"));

            function i(a) {
                this.x = a.pageX, this.y = a.pageY
            }
            a("div.zoomdiv").width(c.xzoom), a("div.zoomdiv").height(c.yzoom), a("div.zoomdiv").show(), c.lens || a(this).css("cursor", "crosshair"), a(document.body).mousemove(function(d) {
                mouse = new i(d);
                var h = a(".bigimg").get(0).offsetWidth;
                var j = a(".bigimg").get(0).offsetHeight;
                var k = "x";
                var l = "y";
                if (isNaN(l) | isNaN(k)) {
                    var l = h / f;
                    var k = j / g;
                    a("div.jqZoomPup").width(c.xzoom / (1 * l)), a("div.jqZoomPup").height(c.yzoom / (1 * k)), c.lens && a("div.jqZoomPup").css("visibility", "visible")
                }
                xpos = mouse.x - a("div.jqZoomPup").width() / 2 - b, ypos = mouse.y - a("div.jqZoomPup").height() / 2 - e, c.lens && (xpos = mouse.x - a("div.jqZoomPup").width() / 2 < b ? 0 : mouse.x + a("div.jqZoomPup").width() / 2 > f + b ? f - a("div.jqZoomPup").width() - 2 : xpos, ypos = mouse.y - a("div.jqZoomPup").height() / 2 < e ? 0 : mouse.y + a("div.jqZoomPup").height() / 2 > g + e ? g - a("div.jqZoomPup").height() - 2 : ypos), c.lens && a("div.jqZoomPup").css({
                    top: ypos,
                    left: xpos
                }), scrolly = ypos, a("div.zoomdiv").get(0).scrollTop = scrolly * k, scrollx = xpos, a("div.zoomdiv").get(0).scrollLeft = scrollx * l
            })
        }, function() {
            a(this).children("img").attr("alt", d), a(document.body).unbind("mousemove"), c.lens && a("div.jqZoomPup").remove(), a("div.zoomdiv").remove()
        }), count = 0, c.preload && (a("body").append("<div style='display:none;' class='jqPreload" + count + "'>360buy</div>"), a(this).each(function() {
            var b = a(this).children("img").attr("spriteimg");
            var c = jQuery("div.jqPreload" + count).html();
            jQuery("div.jqPreload" + count).html(c + '<img src="' + b + '">')
        }))
    }
}(jQuery);