/* main-1.0.11 jQuery.imgScroll.js Date:2015-12-03 20:15:28 */ 
! function(a) {
    a.fn.imgScroll = function(b, c) {
        var d = {
            data: [],
            template: null,
            evtType: "click",
            visible: 1,
            direction: "x",
            next: "#next",
            prev: "#prev",
            disableClass: "disabled",
            disableClassPerfix: !1,
            speed: 300,
            step: 1,
            loop: !1,
            showControl: !1,
            width: null,
            height: null,
            navItems: !1,
            navItmesWrapClass: "scroll-nav-wrap",
            navItemActivedClass: "current",
            status: !1,
            statusWrapSelector: ".scroll-status-wrap"
        };
        var e = a.extend(d, b);
        return this.each(function() {
            var f, b = a(this),
                d = b.find("ul").eq(0),
                g = d.children("li"),
                h = g.length,
                i = null,
                j = null,
                k = "string" == typeof e.next ? a(e.next) : e.next,
                l = "string" == typeof e.prev ? a(e.prev) : e.prev,
                m = 0,
                n = e.step,
                o = e.visible,
                p = Math.ceil((h - o) / n) + 1,
                q = e.loop,
                r = e.direction,
                s = e.evtType,
                t = e.disableClass,
                u = e.disableClassPerfix ? e.disableClassPerfix + "-prev-" + t : t,
                v = e.disableClassPerfix ? e.disableClassPerfix + "-next-" + t : t,
                w = e.navItems,
                x = e.navItmesWrapClass,
                y = a("." + x).length > 0,
                z = e.navItemActivedClass,
                A = e.status,
                B = e.statusWrapSelector,
                C = a(B).length > 0,
                D = !1,
                E = !0,
                F = (h - o) % n === 0,
                G = e.template || '<ul>{for slide in list}<li><a href="${slide.href}" target="_blank"><img src="${slide.src}" alt="${slide.alt}" /></a></li>{/for}</ul>';

            function H(a) {
                q || (h > n && h > o ? (l.addClass(u), k.removeClass(v)) : o >= h && k.addClass(v)), "left" !== g.eq(0).css("float") && g.css("float", "left"), i = e.width || g.eq(0).outerWidth(), j = e.height || g.eq(0).outerHeight(), b.css({
                    position: "static" == b.css("position") ? "relative" : b.css("position"),
                    width: "x" == a ? i * o : i,
                    height: "x" == a ? j : j * o,
                    overflow: "hidden"
                }), d.css({
                    position: "absolute",
                    width: "x" == a ? i * h : i,
                    height: "x" == a ? j : j * h,
                    top: 0,
                    left: 0
                }), "function" == typeof c && c.apply(b, [m, p, g.slice(m * n, m * n + o), g.slice(m * n + o - n, m * n + o)])
            }

            function I() {
                h = e.data.length, d = b.find("ul").eq(0), g = d.children("li"), p = Math.ceil((h - o) / n) + 1, F = (h - o) % n === 0
            }

            function J(a) {
                var c = {
                    list: a
                };
                b.html(G.process(c)), I()
            }

            function K(a, s) {
                if (d.is(":animated")) return !1;
                if (q) E && s && (m = p), D && !s && (m = -1), a = s ? --m : ++m;
                else {
                    if (E && s || D && !s) return !1;
                    a = s ? --m : ++m
                }
                f = "x" == r ? {
                    left: a >= p - 1 ? -(h - o) * i : -a * n * i
                } : {
                    top: a >= p - 1 ? -(h - o) * j : -a * n * j
                };

                function t() {
                    q ? (D = o >= h - a * n ? !0 : !1, E = 0 >= a ? !0 : !1) : (o >= h - a * n ? (k.addClass(v), D = !0) : (k.removeClass(v), D = !1), 0 >= a ? (l.addClass(u), E = !0) : (l.removeClass(u), E = !1)), (w || A) && N(a), "function" == typeof c && c.apply(b, [a, p, g.slice(a * n, a * n + o), g.slice(a * n + o - n, a * n + o)])
                }
                e.speed ? d.animate(f, e.speed, t) : (d.css(f), t())
            }

            function L(c, d) {
                var e = y ? a("." + c).eq(0) : a('<div class="' + c + '"></div>');
                for (var f = 0; p > f; f++) e.append("<em " + (0 === f ? " class=" + d : "") + ' title="' + (f + 1) + '">' + (f + 1) + "</em>");
                y || b.after(e)
            }

            function M() {
                var c = C ? a(B).eq(0) : a('<div class="' + B.replace(".", "") + '"></div>');
                c.html("<b>1</b>/" + p), C || b.after(c)
            }

            function N(b) {
                w && a("." + x).find("em").removeClass(z).eq(b).addClass(z), A && a(B).html("<b>" + (b + 1) + "</b>/" + p)
            }

            function O() {
                l.unbind(s).bind(s, function() {
                    K(m, !0)
                }), k.unbind(s).bind(s, function() {
                    K(m, !1)
                })
            }
            if (e.data.length > 0) {
                if (!e.width || !e.height) return !1;
                J(e.data)
            }
            h > o && o >= n ? (H(r), O(), w && L(x, z), A && M(B)) : (e.showControl ? k.add(l).show() : k.add(l).hide(), l.addClass(u), k.addClass(v))
        })
    }
}(jQuery);