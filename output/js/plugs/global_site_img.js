var YHD = {
    init: function () {
        if (jQuery("#yhd_pop_win").size() > 0) {
            jQuery("#yhd_pop_win").jqm({
                overlay: 50,
                overlayClass: "jqmOverlay",
                closeClass: "jqmClose",
                trigger: ".jqModal",
                ajax: false,
                ajaxP: false,
                ajaxText: "",
                target: false,
                modal: false,
                toTop: false,
                onShow: false,
                onHide: false,
                onLoad: false
            })
        }
    },
    initPosition: function (d, g, e, f, c) {
        var a = (g == null ? d.width() : g);
        var i = (e == null ? d.height() : e);
        jQuery(d).width(a).height(i);
        if (f && c) {
            jQuery(d).css({
                top: f,
                left: c
            })
        } else {
            if (f != null) {
                jQuery(d).css({
                    top: f
                })
            } else {
                if (c != null) {
                    jQuery(d).css({
                        left: c
                    })
                } else {
                    var b = (jQuery(window).width() - d.width()) / 2 + jQuery(window).scrollLeft() + "px";
                    var j = (jQuery(window).height() - d.height()) / 2 + jQuery(window).scrollTop() + "px";
                    jQuery(d).css("left", b).css("top", j)
                }
            }
        }
        if (g != null && e != null) {
            jQuery(d).jqm({
                onHide: function (h) {
                    h.w.width(0).height(0).hide();
                    if (h.o) {
                        h.o.remove()
                    }
                }
            })
        }
    },
    popwin: function (d, e, f, b, a, g) {
        YHD.init();
        var c = jQuery("#yhd_pop_win");
        if (d != null) {
            jQuery(c).html(d)
        }
        YHD.initPosition(c, e, f, b, a);
        jQuery(c).jqm({
            overlay: 10,
            overlayClass: "pop_win_bg",
            modal: true,
            toTop: true
        }).jqmShow().jqmAddClose(".popwinClose");
        jQuery(".pop_win_bg").bgiframe()
    },
    popwinId: function (b, a, d, e, g, f) {
        var c = jQuery("#" + b);
        YHD.initPosition(c, d, e, g, f);
        c.css("height", "auto");
        c.css("z-index", "1000");
        c.show();
        if (!a) {
            a = "popwinClose"
        }
        jQuery("." + a, c).bind("click", function () {
            c.hide()
        })
    },
    popTitleWin: function (d, g, e, i, c, b, a) {
        var f = '<H3 class="pop_win_title" >' + d + '<img src="' + imagePath + '/icon_close.jpg" class="popwinClose"/></H3>';
        f += '<div class="pop_win_content" class="content">' + g + "</div>";
        f += '<div style="clear:both"></div>';
        YHD.popwin(f, e, i, c, b, a)
    },
    alert: function (d, c, e, a, b) {
        var f = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        f += '<div class="aptab_center" align="center"><p class="pt10">' + d + "</p>";
        f += '<p class="pt5"><input name="submit" class="pop_win_button popwinClose" id="pop_win_ok_btn" type="button"   value="确 定" /></p>';
        f += "</div>";
        f += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (e == null) {
            e = 300
        }
        YHD.popwin(f, e, a, null, null, b);
        if (c) {
            jQuery("#pop_win_ok_btn").click(function () {
                c()
            })
        }
    },
    alertPrescriotion: function (f, i, b, k, c) {
        var g = "";
        if (f == null) {
            g = ""
        } else {
            if (f == 14) {
                g = "本品为处方药，为了用药安全，已经将您的个人信息进行登记，谢谢配合！如需用药指导帮助请联系在线客服！"
            } else {
                if (f == 16 || f == 17 || f == 18) {
                    g = "本品为处方药，不能网络订购；如需购买，请到药店凭处方购买或咨询客服!"
                } else {
                    g = "本品为处方药,请在提交订单前上传处方,如需用药师指导帮助,请联系在线客服！"
                }
            }
        }
        var e = "确定";
        if (f != null && (f == 16 || f == 17 || f == 18)) {
            e = "关闭"
        }
        var a = '<input name="submit" class="pop_win_button popwinClose fl" id="pop_win_ok_btn" type="button"   value="' + e + '" />';
        var j = '<a href="http://vipwebchat.tq.cn/sendmain.jsp?admiuin=8987730&uin=8987730&tag=call&ltype=1&rand=15214019897292372&iscallback=0&agentid=0&comtimes=48&preuin=8987730&buttonsflag=1010011111111&is_appraise=1&color=6&style=1&isSendPreWords=1&welcome_msg=%C4%FA%BA%C3%A3%A1%CE%D2%CA%C7%C6%BD%B0%B2%D2%A9%CD%F8%B5%C4%D6%B4%D0%D0%D2%A9%CA%A6%A3%AC%C7%EB%CE%CA%C4%FA%D0%E8%D2%AA%CA%B2%C3%B4%B0%EF%D6%FA%A3%BF&tq_right_infocard_url=' + imagePath + "/images/yaowang/v2/tq01.jpg&cp_title=%BB%B6%D3%AD%CA%B9%D3%C3%C6%BD%B0%B2%D2%A9%CD%F8%D4%DA%CF%DF%BD%D3%B4%FD%CF%B5%CD%B3&page=" + imagePath + "/&localurl=" + imagePath + "/channel/15694&spage=" + imagePath + '/&nocache=0.6430502517039929" class="pop_win_button fl" style="display:block;">咨询</a>';
        var d = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        d += '<div class="aptab_center" align="center"><p class="pt10">' + g + "</p>";
        d += '<div class="pt5" style="width:160px;">';
        if (f != null && (f == 16 || f == 17 || f == 18)) {
            d += j;
            d += a
        } else {
            d += a;
            d += j
        }
        d += '<div class="clear"></div></div>';
        d += '<p class="pt10 mb10" style="color:#b00000;font-weight:bold;">免费客服热线:400-007-0958</p></div>';
        d += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (b == null) {
            b = 300
        }
        YHD.popwin(d, b, k, null, null, c);
        if (i) {
            if (f != null && f != 16 && f != 17 && f != 18) {
                jQuery("#pop_win_ok_btn").click(function () {
                    i()
                })
            }
        }
    },
    alertForLottery: function (d, c, e, a, b) {
        var f = '<div class="popbox"><div><h2><a href="#" class="popwinClose">关闭</a>温馨提示</h2><dl class="noaward">';
        f += "<dt>" + d + "</dt>";
        f += '</dl><p><button class="btn_go"  id="pop_win_ok_btn">确定</button></p></div></div>';
        if (e == null) {
            e = 300
        }
        YHD.popwin(f, e, a, null, null, b);
        if (c) {
            jQuery("#pop_win_ok_btn").click(function () {
                c()
            })
        }
    },
    confirm: function (b, e, d, c, g, a) {
        var f = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        f += '<div class="aptab_center" align="center"><p class="pt10">' + b + "</p>";
        f += '<div align="center"><input name="submit" class="pop_win_button popwinClose" id="pop_win_ok_btn" type="button"   value="确 定" /><input name="submit"   class="pop_win_button popwinClose" type="button" id="pop_win_cancel_btn" value="返回购物车" /></div>';
        f += "</div>";
        f += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (c == null) {
            c = 300
        }
        YHD.popwin(f, c, g, null, null, a);
        if (e) {
            jQuery("#pop_win_ok_btn").click(function () {
                e()
            })
        }
        if (d) {
            jQuery("#pop_win_cancel_btn").click(function () {
                d()
            })
        }
    },
    confirmToLottery: function (b, e, d, c, g, a) {
        var f = "" + b + "";
        if (c == null) {
            c = 300
        }
        YHD.popwin(f, c, g, null, null, a);
        if (e) {
            jQuery("#pop_win_ok_btn").click(function () {
                e()
            })
        }
        if (d) {
            jQuery("#pop_win_cancel_btn").click(function () {
                d()
            })
        }
    },
    processBar: function (a, b) {
        if (a) {
            YHD.popwin('<img src="' + imagePath + '/loading.gif" />', null, null, null, null, b)
        } else {
            jQuery("#yhd_pop_win").jqmHide()
        }
    },
    ajax: function (f, e, b, g) {
        var c = jQuery("#yhd_pop_win");
        c.jqm({
            ajax: f,
            ajaxP: e,
            ajaxText: '<img src="' + imagePath + '/loading.gif" />',
            onLoad: b,
            modal: true,
            toTop: true,
            closeClass: "popwinClose"
        }).jqmShow();
        var a = (jQuery(window).width() - c.width()) / 2 + jQuery(window).scrollLeft() + "px";
        var d = (jQuery(window).height() - c.height()) / 2 + jQuery(window).scrollTop() + "px";
        jQuery(c).css("left", a).css("top", d)
    },
    ajaxPointAlert: function (f, e, b, g) {
        var c = jQuery("#yhd_pop_win");
        c.jqm({
            ajax: f,
            ajaxP: e,
            ajaxText: '<img src="' + imagePath + '/loading.gif" />',
            onLoad: b,
            modal: true,
            toTop: true,
            closeClass: "popwinClose"
        }).jqmShow();
        var a = "436.5px";
        var d = (jQuery(window).height() - c.height()) / 2 + jQuery(window).scrollTop() + "px";
        jQuery(c).css("left", a).css("top", d)
    },
    pageX: function (a) {
        a = a || window.event;
        return a.pageX || a.clientX + document.body.scrollLeft
    },
    pageY: function (a) {
        a = a || window.event;
        return a.pageY || a.clientY + document.body.scrollTop
    }
};

// 图片处理事件
var tempWidth;
var tempHeight;
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
var isUpload = false;
var picType = "1";
function selectImg(c, a) {
    tempWidth = c;
    tempHeight = a;
    var b = c / 2 < a / 2 ? c / 2 : a / 2;
    jQuery("#upload_pic").imgAreaSelect({
        x1: 0,
        x2: b,
        y1: 0,
        y2: b,
        aspectRatio: "1:1",
        handles: true,
        minHeight: 30,
        minWidth: 30,
        onSelectChange: previewImg
    })
}
function previewImg(d, g) {
    var j = 150 / (g.width || 1);
    var h = 150 / (g.height || 1);
    jQuery("#size1 img").css({
        width: Math.round(j * tempWidth) + "px",
        height: Math.round(h * tempHeight) + "px",
        marginLeft: "-" + Math.round(j * g.x1) + "px",
        marginTop: "-" + Math.round(h * g.y1) + "px"
    });
    var c = 50 / (g.width || 1);
    var i = 50 / (g.height || 1);
    jQuery("#size2 img").css({
        width: Math.round(c * tempWidth) + "px",
        height: Math.round(i * tempHeight) + "px",
        marginLeft: "-" + Math.round(c * g.x1) + "px",
        marginTop: "-" + Math.round(i * g.y1) + "px"
    });
    var b = 80 / (g.width || 1);
    var f = 80 / (g.height || 1);
    jQuery("#size3 img").css({
        width: Math.round(b * tempWidth) + "px",
        height: Math.round(f * tempHeight) + "px",
        marginLeft: "-" + Math.round(b * g.x1) + "px",
        marginTop: "-" + Math.round(f * g.y1) + "px"
    });
    var a = 30 / (g.width || 1);
    var e = 30 / (g.height || 1);
    jQuery("#size4 img").css({
        width: Math.round(a * tempWidth) + "px",
        height: Math.round(e * tempHeight) + "px",
        marginLeft: "-" + Math.round(a * g.x1) + "px",
        marginTop: "-" + Math.round(e * g.y1) + "px"
    });
    x1 = g.x1;
    x2 = g.x2;
    y1 = g.y1;
    y2 = g.y2
};

(function (e) {
    var b = Math.abs,
        a = Math.max,
        d = Math.min,
        c = Math.round;

    function f() {
        return e("<div/>")
    }
    e.imgAreaSelect = function (s, X) {
        var az = e(s),
            Z, av = f(),
            ai = f(),
            K = f().add(f()).add(f()).add(f()),
            ab = f().add(f()).add(f()).add(f()),
            O = e([]),
            V, n, q, aC = {
                left: 0,
                top: 0
            },
            Q, j, C, P = {
                left: 0,
                top: 0
            },
            D = 0,
            ag = "absolute",
            T, S, ad, ac, L, E, U, W, am, Y, N, A, aD, z, aB, y = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                width: 0,
                height: 0
            },
            p = document.documentElement,
            l, au, ap, aj, af, aq, x;

        function J(h) {
            return h + aC.left - P.left
        }

        function I(h) {
            return h + aC.top - P.top
        }

        function H(h) {
            return h - aC.left + P.left
        }

        function B(h) {
            return h - aC.top + P.top
        }

        function ao(h) {
            return h.pageX - P.left
        }

        function al(h) {
            return h.pageY - P.top
        }

        function G(h) {
            var o = h || ad,
                i = h || ac;
            return {
                x1: c(y.x1 * o),
                y1: c(y.y1 * i),
                x2: c(y.x2 * o),
                y2: c(y.y2 * i),
                width: c(y.x2 * o) - c(y.x1 * o),
                height: c(y.y2 * i) - c(y.y1 * i)
            }
        }

        function ah(i, w, h, o, aE) {
            var aG = aE || ad,
                aF = aE || ac;
            y = {
                x1: c(i / aG || 0),
                y1: c(w / aF || 0),
                x2: c(h / aG || 0),
                y2: c(o / aF || 0)
            };
            y.width = y.x2 - y.x1;
            y.height = y.y2 - y.y1
        }

        function ar() {
            if (!az.width()) {
                return
            }
            aC = {
                left: c(az.offset().left),
                top: c(az.offset().top)
            };
            Q = az.innerWidth();
            j = az.innerHeight();
            aC.top += (az.outerHeight() - j) >> 1;
            aC.left += (az.outerWidth() - Q) >> 1;
            E = c(X.minWidth / ad) || 0;
            U = c(X.minHeight / ac) || 0;
            W = c(d(X.maxWidth / ad || 1 << 24, Q));
            am = c(d(X.maxHeight / ac || 1 << 24, j));
            if (e().jquery == "1.3.2" && ag == "fixed" && !p.getBoundingClientRect) {
                aC.top += a(document.body.scrollTop, p.scrollTop);
                aC.left += a(document.body.scrollLeft, p.scrollLeft)
            }
            P = /absolute|relative/.test(C.css("position")) ? {
                left: c(C.offset().left) - C.scrollLeft(),
                top: c(C.offset().top) - C.scrollTop()
            } : ag == "fixed" ? {
                left: e(document).scrollLeft(),
                top: e(document).scrollTop()
            } : {
                left: 0,
                top: 0
            };
            n = J(0);
            q = I(0);
            if (y.x2 > Q || y.y2 > j) {
                ay()
            }
        }

        function aa(h) {
            if (!N) {
                return
            }
            av.css({
                left: J(y.x1),
                top: I(y.y1)
            }).add(ai).width(af = y.width).height(aq = y.height);
            ai.add(K).add(O).css({
                left: 0,
                top: 0
            });
            K.width(a(af - K.outerWidth() + K.innerWidth(), 0)).height(a(aq - K.outerHeight() + K.innerHeight(), 0));
            e(ab[0]).css({
                left: n,
                top: q,
                width: y.x1,
                height: j
            });
            e(ab[1]).css({
                left: n + y.x1,
                top: q,
                width: af,
                height: y.y1
            });
            e(ab[2]).css({
                left: n + y.x2,
                top: q,
                width: Q - y.x2,
                height: j
            });
            e(ab[3]).css({
                left: n + y.x1,
                top: q + y.y2,
                width: af,
                height: j - y.y2
            });
            af -= O.outerWidth();
            aq -= O.outerHeight();
            switch (O.length) {
            case 8:
                e(O[4]).css({
                    left: af >> 1
                });
                e(O[5]).css({
                    left: af,
                    top: aq >> 1
                });
                e(O[6]).css({
                    left: af >> 1,
                    top: aq
                });
                e(O[7]).css({
                    top: aq >> 1
                });
            case 4:
                O.slice(1, 3).css({
                    left: af
                });
                O.slice(2, 4).css({
                    top: aq
                })
            }
            if (h !== false) {
                if (e.imgAreaSelect.keyPress != aw) {
                    e(document).unbind(e.imgAreaSelect.keyPress, e.imgAreaSelect.onKeyPress)
                }
                if (X.keys) {
                    e(document)[e.imgAreaSelect.keyPress](e.imgAreaSelect.onKeyPress = aw)
                }
            }
            if (e.browser.msie && K.outerWidth() - K.innerWidth() == 2) {
                K.css("margin", 0);
                setTimeout(function () {
                    K.css("margin", "auto")
                }, 0)
            }
        }

        function u(h) {
            ar();
            aa(h);
            A = J(y.x1);
            aD = I(y.y1);
            z = J(y.x2);
            aB = I(y.y2)
        }

        function ak(h, i) {
            X.fadeSpeed ? h.fadeOut(X.fadeSpeed, i) : h.hide()
        }

        function F(i) {
            var h = H(ao(i)) - y.x1,
                o = B(al(i)) - y.y1;
            if (!x) {
                ar();
                x = true;
                av.one("mouseout", function () {
                    x = false
                })
            }
            L = "";
            if (X.resizable) {
                if (o <= X.resizeMargin) {
                    L = "n"
                } else {
                    if (o >= y.height - X.resizeMargin) {
                        L = "s"
                    }
                }
                if (h <= X.resizeMargin) {
                    L += "w"
                } else {
                    if (h >= y.width - X.resizeMargin) {
                        L += "e"
                    }
                }
            }
            av.css("cursor", L ? L + "-resize" : X.movable ? "move" : "");
            if (V) {
                V.toggle()
            }
        }

        function an(h) {
            e("body").css("cursor", "");
            if (X.autoHide || y.width * y.height == 0) {
                ak(av.add(ab), function () {
                    e(this).hide()
                })
            }
            e(document).unbind("mousemove", ae);
            av.mousemove(F);
            X.onSelectEnd(s, G())
        }

        function t(h) {
            if (h.which != 1) {
                return false
            }
            ar();
            if (L) {
                e("body").css("cursor", L + "-resize");
                A = J(y[/w/.test(L) ? "x2" : "x1"]);
                aD = I(y[/n/.test(L) ? "y2" : "y1"]);
                e(document).mousemove(ae).one("mouseup", an);
                av.unbind("mousemove", F)
            } else {
                if (X.movable) {
                    T = n + y.x1 - ao(h);
                    S = q + y.y1 - al(h);
                    av.unbind("mousemove", F);
                    e(document).mousemove(g).one("mouseup", function () {
                        X.onSelectEnd(s, G());
                        e(document).unbind("mousemove", g);
                        av.mousemove(F)
                    })
                } else {
                    az.mousedown(h)
                }
            }
            return false
        }

        function r(h) {
            if (Y) {
                if (h) {
                    z = a(n, d(n + Q, A + b(aB - aD) * Y * (z > A || -1)));
                    aB = c(a(q, d(q + j, aD + b(z - A) / Y * (aB > aD || -1))));
                    z = c(z)
                } else {
                    aB = a(q, d(q + j, aD + b(z - A) / Y * (aB > aD || -1)));
                    z = c(a(n, d(n + Q, A + b(aB - aD) * Y * (z > A || -1))));
                    aB = c(aB)
                }
            }
        }

        function ay() {
            A = d(A, n + Q);
            aD = d(aD, q + j);
            if (b(z - A) < E) {
                z = A - E * (z < A || -1);
                if (z < n) {
                    A = n + E
                } else {
                    if (z > n + Q) {
                        A = n + Q - E
                    }
                }
            }
            if (b(aB - aD) < U) {
                aB = aD - U * (aB < aD || -1);
                if (aB < q) {
                    aD = q + U
                } else {
                    if (aB > q + j) {
                        aD = q + j - U
                    }
                }
            }
            z = a(n, d(z, n + Q));
            aB = a(q, d(aB, q + j));
            r(b(z - A) < b(aB - aD) * Y);
            if (b(z - A) > W) {
                z = A - W * (z < A || -1);
                r()
            }
            if (b(aB - aD) > am) {
                aB = aD - am * (aB < aD || -1);
                r(true)
            }
            y = {
                x1: H(d(A, z)),
                x2: H(a(A, z)),
                y1: B(d(aD, aB)),
                y2: B(a(aD, aB)),
                width: b(z - A),
                height: b(aB - aD)
            };
            aa();
            X.onSelectChange(s, G())
        }

        function ae(h) {
            z = /w|e|^$/.test(L) || Y ? ao(h) : J(y.x2);
            aB = /n|s|^$/.test(L) || Y ? al(h) : I(y.y2);
            ay();
            return false
        }

        function R(h, i) {
            z = (A = h) + y.width;
            aB = (aD = i) + y.height;
            e.extend(y, {
                x1: H(A),
                y1: B(aD),
                x2: H(z),
                y2: B(aB)
            });
            aa();
            X.onSelectChange(s, G())
        }

        function g(h) {
            A = a(n, d(T + ao(h), n + Q - y.width));
            aD = a(q, d(S + al(h), q + j - y.height));
            R(A, aD);
            h.preventDefault();
            return false
        }

        function aA() {
            e(document).unbind("mousemove", aA);
            ar();
            z = A;
            aB = aD;
            ay();
            L = "";
            if (!ab.is(":visible")) {
                av.add(ab).hide().fadeIn(X.fadeSpeed || 0)
            }
            N = true;
            e(document).unbind("mouseup", at).mousemove(ae).one("mouseup", an);
            av.unbind("mousemove", F);
            X.onSelectStart(s, G())
        }

        function at() {
            e(document).unbind("mousemove", aA).unbind("mouseup", at);
            ak(av.add(ab));
            ah(H(A), B(aD), H(A), B(aD));
            if (!this instanceof e.imgAreaSelect) {
                X.onSelectChange(s, G());
                X.onSelectEnd(s, G())
            }
        }

        function m(h) {
            if (h.which != 1 || ab.is(":animated")) {
                return false
            }
            ar();
            T = A = ao(h);
            S = aD = al(h);
            e(document).mousemove(aA).mouseup(at);
            return false
        }

        function v() {
            u(false)
        }

        function ax() {
            Z = true;
            M(X = e.extend({
                classPrefix: "imgareaselect",
                movable: true,
                parent: "body",
                resizable: true,
                resizeMargin: 10,
                onInit: function () {},
                onSelectStart: function () {},
                onSelectChange: function () {},
                onSelectEnd: function () {}
            }, X));
            av.add(ab).css({
                visibility: ""
            });
            if (X.show) {
                N = true;
                ar();
                aa();
                av.add(ab).hide().fadeIn(X.fadeSpeed || 0)
            }
            setTimeout(function () {
                X.onInit(s, G())
            }, 0)
        }
        var aw = function (w) {
            var h = X.keys,
                aE, o, i = w.keyCode;
            aE = !isNaN(h.alt) && (w.altKey || w.originalEvent.altKey) ? h.alt : !isNaN(h.ctrl) && w.ctrlKey ? h.ctrl : !isNaN(h.shift) && w.shiftKey ? h.shift : !isNaN(h.arrows) ? h.arrows : 10;
            if (h.arrows == "resize" || (h.shift == "resize" && w.shiftKey) || (h.ctrl == "resize" && w.ctrlKey) || (h.alt == "resize" && (w.altKey || w.originalEvent.altKey))) {
                switch (i) {
                case 37:
                    aE = -aE;
                case 39:
                    o = a(A, z);
                    A = d(A, z);
                    z = a(o + aE, A);
                    r();
                    break;
                case 38:
                    aE = -aE;
                case 40:
                    o = a(aD, aB);
                    aD = d(aD, aB);
                    aB = a(o + aE, aD);
                    r(true);
                    break;
                default:
                    return
                }
                ay()
            } else {
                A = d(A, z);
                aD = d(aD, aB);
                switch (i) {
                case 37:
                    R(a(A - aE, n), aD);
                    break;
                case 38:
                    R(A, a(aD - aE, q));
                    break;
                case 39:
                    R(A + d(aE, Q - H(z)), aD);
                    break;
                case 40:
                    R(A, aD + d(aE, j - B(aB)));
                    break;
                default:
                    return
                }
            }
            return false
        };

        function k(h, i) {
            for (option in i) {
                if (X[option] !== undefined) {
                    h.css(i[option], X[option])
                }
            }
        }

        function M(h) {
            if (h.parent) {
                (C = e(h.parent)).append(av.add(ab))
            }
            e.extend(X, h);
            ar();
            if (h.handles != null) {
                O.remove();
                O = e([]);
                ap = h.handles ? h.handles == "corners" ? 4 : 8 : 0;
                while (ap--) {
                    O = O.add(f())
                }
                O.addClass(X.classPrefix + "-handle").css({
                    position: "absolute",
                    fontSize: 0,
                    zIndex: D + 1 || 1
                });
                if (!parseInt(O.css("width")) >= 0) {
                    O.width(5).height(5)
                }
                if (aj = X.borderWidth) {
                    O.css({
                        borderWidth: aj,
                        borderStyle: "solid"
                    })
                }
                k(O, {
                    borderColor1: "border-color",
                    borderColor2: "background-color",
                    borderOpacity: "opacity"
                })
            }
            ad = X.imageWidth / Q || 1;
            ac = X.imageHeight / j || 1;
            if (h.x1 != null) {
                ah(h.x1, h.y1, h.x2, h.y2);
                h.show = !h.hide
            }
            if (h.keys) {
                X.keys = e.extend({
                    shift: 1,
                    ctrl: "resize"
                }, h.keys)
            }
            av.addClass(X.classPrefix + "-imgdiv");
            ab.addClass(X.classPrefix + "-outer");
            ai.addClass(X.classPrefix + "-selection");
            for (ap = 0; ap++ < 4;) {
                e(K[ap - 1]).addClass(X.classPrefix + "-border" + ap)
            }
            k(ai, {
                selectionColor: "background-color",
                selectionOpacity: "opacity"
            });
            k(K, {
                borderOpacity: "opacity",
                borderWidth: "border-width"
            });
            k(ab, {
                outerColor: "background-color",
                outerOpacity: "opacity"
            });
            if (aj = X.borderColor1) {
                e(K[0]).css({
                    borderStyle: "solid",
                    borderColor: aj
                })
            }
            if (aj = X.borderColor2) {
                e(K[1]).css({
                    borderStyle: "dashed",
                    borderColor: aj
                })
            }
            av.append(ai.add(K).add(V).add(O));
            if (e.browser.msie) {
                if (aj = ab.css("filter").match(/opacity=(\d+)/)) {
                    ab.css("opacity", aj[1] / 100)
                }
                if (aj = K.css("filter").match(/opacity=(\d+)/)) {
                    K.css("opacity", aj[1] / 100)
                }
            }
            if (h.hide) {
                ak(av.add(ab))
            } else {
                if (h.show && Z) {
                    N = true;
                    av.add(ab).fadeIn(X.fadeSpeed || 0);
                    u()
                }
            }
            Y = (au = (X.aspectRatio || "").split(/:/))[0] / au[1];
            az.add(ab).unbind("mousedown", m);
            if (X.disable || X.enable === false) {
                av.unbind("mousemove", F).unbind("mousedown", t);
                e(window).unbind("resize", v)
            } else {
                if (X.enable || X.disable === false) {
                    if (X.resizable || X.movable) {
                        av.mousemove(F).mousedown(t)
                    }
                    e(window).resize(v)
                }
                if (!X.persistent) {
                    az.add(ab).mousedown(m)
                }
            }
            X.enable = X.disable = undefined
        }
        this.remove = function () {
            M({
                disable: true
            });
            av.add(ab).remove()
        };
        this.getOptions = function () {
            return X
        };
        this.setOptions = M;
        this.getSelection = G;
        this.setSelection = ah;
        this.cancelSelection = at;
        this.update = u;
        l = az;
        while (l.length) {
            D = a(D, !isNaN(l.css("z-index")) ? l.css("z-index") : D);
            if (l.css("position") == "fixed") {
                ag = "fixed"
            }
            l = l.parent(":not(body)")
        }
        D = X.zIndex || D;
        if (e.browser.msie) {
            az.attr("unselectable", "on")
        }
        e.imgAreaSelect.keyPress = e.browser.msie || e.browser.safari ? "keydown" : "keypress";
        if (e.browser.opera) {
            V = f().css({
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: D + 2 || 2
            })
        }
        av.add(ab).css({
            visibility: "hidden",
            position: ag,
            overflow: "hidden",
            zIndex: D || "0"
        });
        av.css({
            zIndex: D + 2 || 2
        });
        ai.add(K).css({
            position: "absolute",
            fontSize: 0
        });
        s.complete || s.readyState == "complete" || !az.is("img") ? ax() : az.one("load", ax);
        if (e.browser.msie && e.browser.version >= 7) {
            s.src = s.src
        }
    };
    e.fn.imgAreaSelect = function (g) {
        g = g || {};
        this.each(function () {
            if (e(this).data("imgAreaSelect")) {
                if (g.remove) {
                    e(this).data("imgAreaSelect").remove();
                    e(this).removeData("imgAreaSelect")
                } else {
                    e(this).data("imgAreaSelect").setOptions(g)
                }
            } else {
                if (!g.remove) {
                    if (g.enable === undefined && g.disable === undefined) {
                        g.enable = true
                    }
                    e(this).data("imgAreaSelect", new e.imgAreaSelect(this, g))
                }
            }
        });
        if (g.instance) {
            return e(this).data("imgAreaSelect")
        }
        return this
    }
})(jQuery);