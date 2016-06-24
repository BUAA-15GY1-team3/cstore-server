/**
 * @param  {全局函数,右侧购物车}
 * @return {[type]}
 */
define(function (require, exports) {
    var winH = 0;  // 获取屏幕高度
    var yScoll = 0;  // 获取屏幕滚动高度
    $(function () {
        var body = $("body");

        var siderBarDiv = $('<div class="sp-sidebar" id="sidebar">');
        siderBarDiv.show();

        body.append(siderBarDiv);
        var siderBarBg = $('<div class="sp-sidebar-bg"></div>');
        var siderBarLeft = $('<div class="sp-sidebar-left">');
        var siderBarCode = $('<div class="tab-tip-code-warp" id="sp-sidebar-change-code">');
        siderBarCode.show().css('left',"0");
        siderBarCode.append('<a href="#" name="扫一扫,有惊喜"><img class="tab-tip-code-warp-img" src="http://image.suning.cn/public/v3/images/code-img.jpg"></a>');
        // 添加右侧的背景，左侧导航，以及二维码
        siderBarDiv.append(siderBarBg);
        siderBarDiv.append(siderBarLeft);
        siderBarDiv.append(siderBarCode);

        // 个人信息，购物车，理财，签到，足迹
        var siderBarLeftTab1 = $('<div class="sp-sidebar-tabs sp-sidebar-middle-tabs">');

        // 意见反馈，返回顶部等
        var siderBarLeftTab2 = $('<div class="sp-sidebar-tabs sp-sidebar-bottom-tabs">');

        // 点击展开详情
        var siderBarLeftCon = $('<div class="sp-sidebar-content">')


        var left1 = ''
            + '<div class="sp-sidebar-tabs sp-sidebar-middle-tabs-top">'
            +       '<div class="sp-sidebar-tab sp-sidebar-tab-member sp-sidebar-tab-js" data-type="member">'
            +           '<a href="javascript:;">'
            +               '<i class="tab-icon tab-icon-member"></i>'
            +               '<i class="tab-icon-tip"></i>'
            +           '</a>'
            +       '</div>'
            +       '<div class="sp-sidebar-tab sp-sidebar-tab-cart sp-sidebar-tab-js" data-type="cart">'
            +           '<a href="javascript:;" class="pr">'
            +               '<div class="tab-cart-tip-warp-box pr">'
            +                   '<i class="icon line line-t"></i>'
            +                   '<i class="icon line line-b"></i>'
            +                   '<div class="tab-cart-tip-warp">'
            +                       '<i class="tab-icon  tab-icon-cart"></i>'
            +                       '<i class="tab-icon-tip tab-icon-cart-tip"></i>'
            +                       '<span class="tab-cart-tip">购物车</span>'
            +                       '<span class="tab-cart-num J_cart_total_num">0</span>'
            +                   '</div>'
            +               '</div>'
            +           '</a>'
            +       '</div>'
            +   '</div>'
            +   '<div class="sp-sidebar-tabs sp-sidebar-middle-tabs-bottom">'
            +       '<div class="sp-sidebar-tab sp-sidebar-tab-finance sp-sidebar-tab-js"><a href="javascript:;"><i class="tab-icon tab-icon-finance"></i><i class="tab-icon-tip"></i><span class="tab-tip" style="left: 0px;">理财</span></a>'
            +       '</div>'
            +      '<div class="sp-sidebar-tab sp-sidebar-tab-history sp-sidebar-tab-js"><a href="javascript:;"><i class="tab-icon tab-icon-history"></i><i class="tab-icon-tip"></i><span class="tab-tip" style="left: 0px;">足迹</span></a>'
            +       '</div>'
            +       '<div class="sp-sidebar-tab sp-sidebar-tab-sign sp-sidebar-tab-js"><a href="#" target="_blank"><i class="tab-icon tab-icon-sign"></i><i class="tab-icon-tip"></i><span class="tab-tip" style="left: 0px;">签到</span></a>'
            +       '</div>'
            +   '</div>';
        var left2 = ''
            + '<div class="sp-sidebar-tab sp-sidebar-wider-tab sp-sidebar-wider-tab-sm sp-sidebar-service sp-sidebar-tab-js">'
            +       '<a href="javascript:findpass();"><i class="tab-icon tab-icon-service"></i>'
            +           '<span class="tab-tip tab-tip-wider" style="left: 0px;">在线咨询</span>'
            +       '</a>'
            +   '</div>'
            +   '<div class="sp-sidebar-tab sp-sidebar-wider-tab sp-sidebar-wider-tab-sm sp-sidebar-feedback sp-sidebar-tab-js" id="sp-sidebar-change-feedback">'
            +       '<a href="javascript:void(0);"  class="problem_icon">'
            +           '<i class="tab-icon tab-icon-feedback"></i>'
            +           '<span class="tab-tip tab-tip-wider" style="left: 0px;">问题纠错</span>'
            +       '</a>'
            +   '</div>'
            +   '<div class="sp-sidebar-tab sp-sidebar-wider-tab sp-sidebar-wider-tab-sm sp-sidebar-code sp-sidebar-tab-js">'
            +       '<a href="javascript:;">'
            +           '<i class="tab-icon-tip tab-icon-code-tip"></i>'
            +           '<i class="tab-icon tab-icon-code"></i>'
            +       '</a>'
            +   '</div>'
            +   '<div class="sp-sidebar-tab sp-sidebar-wider-tab sp-sidebar-to-top sp-sidebar-tab-js">'
            +       '<a href="javascript:void(0);">'
            +           '<i class="tab-icon tab-icon-to-top"></i>'
            +           '<span class="tab-tip tab-tip-wider" style="left: 0px;">返回顶部</span>'
            +       '</a>'
            +   '</div>';
        siderBarLeftTab1.append(left1);
        siderBarLeftTab2.append(left2);

        // 购物车以及个人信息详情
        var userInfo = '<div class="mui-mbar-plugin  mui-mbar-plugin-prof"><div class="mui-mbar-plugin-hd"><a class="mui-mbar-plugin-hd-title ">我的特权</a><div class="mui-mbar-plugin-hd-close mui-mbar-iconfont spider_icon" title="关闭"></div></div><div class="mui-mbar-plugin-bd"><div class="mui-mbarp-prof-user-wrap"><div class="mui-mbarp-prof-user"><div class="mui-mbarp-avatar"><img src="/resources/common/images/sidebar/user.jpg" width="80" height="80"><a>编辑</a></div><div class="mui-mbarp-meta"><p class="mui-mbarp-nick"><a>Hi, 莫如522</a></p><p class="mui-mbarp-level m-t-sm"><span>激活成为蜘蛛蜂会员</span></p><span class="mui-mbarp-prof-badge" style="font-size:16px">?</span></div></div><div class="mui-mbarp-prof-privilege"><div class="mui-mbarp-prof-list"><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol daishouhuo"></div><div class="mui-mbarp-prof-title" title="待收货">待收货</div><span class="mui-mbarp-prof-item-num">0</span></a><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol daifahuo"></div><div class="mui-mbarp-prof-title" title="待发货">待发货</div></a><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol daipingjia"></div><div class="mui-mbarp-prof-title" title="待评价">待评价</div></a><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol daifukuan"></div><div class="mui-mbarp-prof-title" title="待付款">待付款</div></a><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol info"></div><div class="mui-mbarp-prof-title" title="个人信息">个人信息</div></a><a class="mui-mbarp-prof-item"><div class="mui-mbarp-prof-symbol super"></div><div class="mui-mbarp-prof-title" title="我的特权">我的特权</div></a></div><div class="mui-mbarp-prof-trigger" data-action="togglePriv@member"></div></div></div></div><div class="mui-mbarp-prof-bg"></div></div>';
        siderBarLeftCon.append(userInfo);
        var cartInfo = ' '
            +   '<div class="mui-mbar-plugin  mui-mbar-plugin-cart">'
            +       '<div class="mui-mbar-plugin-hd">'
            +           '<span class="mui-mbar-plugin-hd-title ">购物车</span>'
            +           '<a title="查看全部" class="mui-mbar-plugin-hd-look-all">查看全部</a>'
            +           '<div class="mui-mbar-plugin-hd-close mui-mbar-iconfont spider_icon" title="关闭"></div>'
            +       '</div>'
            +       '<div class="mui-mbar-plugin-bd cart-bd pr">'
            +           '<div class="mui-mbarp-cart-wrap"></div>'
            +       '</div>'
            +   '</div>';
        siderBarLeftCon.append(cartInfo);
        siderBarLeft.append(siderBarLeftTab1);
        siderBarLeft.append(siderBarLeftTab2);
        siderBarLeft.append(siderBarLeftCon);

        var cartDiv = $(".mui-mbarp-cart-wrap");
        var cartListDiv = $('<div class="mui_cart_show">');
        var cartHtml = "";
        var result = 2;
        switch(result){
            case 0:     // 未登录
                cartListDiv.addClass("none");
                cartHtml = ' '
                    +'<div class="mui_login_tips">'
                    +   '<div class="no_login"></div>'
                    +   '<p>登录才能看得到购物车里的商品哦~</p>'
                    +   '<a href="javascript:void(0);" class="login">登录</a>'
                    +'</div>';
            break;
            case 1:     // 已登录，但是购物车为空
                cartListDiv.addClass("none");
                cartHtml = ' '
                    +'<div class="mui_none_tips">'
                    +   '<span class="mui_none_icon spider_icon"></span>'
                    +   '<p class="mui_none_text">您的购物车里还没有1号店的商品哦~~</p>'
                    +'</div>';
            break;
            case 2:     // 已登录，但是购物车不为空
                cartListDiv.addClass("list");
                cartHtml = ' '
                    +'<div class="spider-mcRoot">'
                    +   '<div class="spider-mcListBox">'
                    +       '<div class="spider-mcListInner">'
                    +           '<div class="spider-mcList"></div>'
                    +       '</div>'
                    +   '</div>'
                    +   '<div class="spider-mcHandler" style="position: fixed;">'
                    +       '<div class="spider-mcCashier-wrap">'
                    +           '<span class="spider-mcTotalFeeWrap">'
                    +               '<span class="spider-mcRmb">¥</span><strong class="spider-mcTotalFee">2133.20</strong></span>'
                    +           '<div class="spider-mcCashier">'
                    +               '<div class="spider-mcGo">结 算<s>(0)</s></div>'
                    +           '</div>'
                    +      ' </div>'
                    +   '</div>';
            break;
        }

        cartListDiv.append(cartHtml);
        cartDiv.append(cartListDiv);
        if (result == 2) {
            var list = $('.spider-mcList');
            var html = '<div class="spider-mcBundle spider-mcBundleB"><div class="spider-mcBundleHeader"><div class="spider-mcChk"><a class="spider-mcElectBundle spider-mcElectBundle-selected" href="javascript:;"></a></div><div class="spider-mcTitle"><span title="黄金田园食品旗舰">黄金田园食品旗舰</span></div><div class="spider-mcCost"><strong class="spider-mcPrice">14.90</strong></div></div><div class="spider-mcBundleList"><div class="spider-mcMainOne"><div class="spider-mcMainHead"><div class="spider-mcMainHeader"><a class="spider-mcMainTitle">满49包邮</a><span class="spider-mcMjzPromo" title="差34.10元,享包邮">差34.10元,享包邮</span></div></div><div class="spider-mcMainList"><div class="spider-mcOrder spider-mcOrderOne spider-mcOrderSelected"><div class="spider-mcChk"><a class="spider-mcElectBundle spider-mcElectBundle-selected" href="javascript:;"></a></div><div class="spider-mcItem"><a class="spider-mcPic"><img height="50" src="/resources/common/images/sidebar/cart.jpg"></a></div><div class="spider-mcSku">&nbsp;</div><div class="spider-mcAmount"><a href="javascript:void(0)" class="spider-mcMinus spider-mcMinusOff" hidefocus="true"><s></s></a><span class="spider-mcQuantity">1</span><a href="javascript:void(0)" class="spider-mcMinus spider-mcPlus" hidefocus="true"><s></s><b></b></a></div><div class="spider-mcCost"><a href="javascript:void(0)" class="spider-mcDel" title="删除" data-tmc="del"></a><strong class="spider-mcPrice">14.90</strong></div></div></div></div></div></div>';
            list.append(html);
        };

        
        // 右侧导航
        var siderbar = $(".sp-sidebar");
        var tips = $(".sp-sidebar-tab-js");
        var coder = $(".tab-tip-code-warp"); // 二维码
        var coderImg = $(".tab-tip-code-warp-img");
        // 鼠标放到tip上显示
        tips.hover(function () {
            if ($(this).hasClass("sp-sidebar-tab-click") || ($(this).hasClass("sp-sidebar-wider-tab"))) {
                $(this).find(".tab-tip").stop().animate({
                    left: "-73px"
                }, "normal")
            }else{
                $(this).find(".tab-tip").stop().animate({
                    left: "-47px"
                }, "normal");
            }
            $(this).addClass("sp-sidebar-tab-hover");
            if ($(this).hasClass("sp-sidebar-code")) {
                coder.stop().show().animate({
                    left: "-131px"
                });
            };
        }, function () {
            $(this).find(".tab-tip").stop().animate({
                left: "0"
            }, "normal"), $(this).removeClass("sp-sidebar-tab-hover"), $(this).hasClass("sp-sidebar-code") && coder.stop().animate({
                left: "0px"
            }, "normal", function () {
                $(this).hide()
            })
        });

        // 鼠标放二维码上去
        coder.hover(function () {
            siderbar.find(".sp-sidebar-code").addClass("sp-sidebar-tab-hover"), $(this).stop().show().animate({
                left: "-131px"
            }, "normal")
        }, function () {
            siderbar.find(".sp-sidebar-code").removeClass("sp-sidebar-tab-hover"), $(this).stop().animate({
                left: "0px"
            }, "normal", function () {
                $(this).hide()
            })
        });

        // 鼠标点击tip上显示
        $(".sp-sidebar-tab-js").live('click', function (event) {
            var _this = $(this);
            if (_this.attr("data-type")) {
                if (_this.hasClass("sp-sidebar-tab-click")) {
                    _this.removeClass("sp-sidebar-tab-click");
                    siderbar.stop().animate({
                        right: "-280px"
                    })
                } else {
                    $(".sp-sidebar-tab-js").removeClass("sp-sidebar-tab-click");
                    _this.addClass("sp-sidebar-tab-click");
                    siderbar.stop().animate({
                        right: "0"
                    })
                    var type = _this.attr("data-type");
                    var userInfo = $(".mui-mbar-plugin-prof");
                    var cartList = $(".mui-mbar-plugin-cart")
                    switch(type){
                        case "member":
                            animateSider(userInfo,cartList);
                            break;
                        case "cart":
                            animateSider(cartList,userInfo);
                            break;
                        default:
                            animateSider(userInfo,cartList);
                            break;
                    }
                }
            } else {
                siderbar.stop(true, false);
            }
            // 取消事件冒泡机制
            event.stopPropagation();
        });
    
        // 点击别处地方，隐藏con
        $(document).click(function () {
            closeSider();
        });

        // 点击关闭
        $(".mui-mbar-plugin-hd-close").click(function (event) {
            closeSider();
            event.stopPropagation();
        })

        // 关闭内容
        function closeSider() {
                siderbar.stop().animate({
                    right: "-280px"
                });
                $(".sp-sidebar-tab-js").removeClass("sp-sidebar-tab-click");
        }
            // 点击内容
        $('.sp-sidebar-content').click(function (event) {
            event.stopPropagation();
        });

        // 动画效果
        function animateSider(showE,hideE){
            showE.css("top",winH + "px");
            showE.stop().animate({
                top: "0"
            },700);
            hideE.css("top","0");
            hideE.addClass("mui-mbar-plugin-scaleDown");
            showE.removeClass("mui-mbar-plugin-scaleDown");
        }
        _judeHide();


        // 返回顶部
        $(".sp-sidebar-to-top").live("click",function(){
            yScoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:0}, yScoll / 5);
        });
        
        // 问题纠错
        _problem();
    });

    // 改变显示器的高度
    $(window).resize(function () {
        _judeHide();
    });


    // 当高度不同的时候，改变高度
    function _judeHide() {
        var siderbar = $(".sp-sidebar-middle-tabs");
        winH = $(window).height();
        yScoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // 隐藏理财，足迹签到
        var siderbarF = $(".sp-sidebar-middle-tabs-bottom");
        var siderbarS = $(".sp-sidebar-wider-tab-sm");
        var siderbarT = $(".sp-sidebar-to-top");

        winH > 450 ? siderbarS.removeClass("hide") : siderbarS.addClass("hide");
        winH > 626 ? siderbarF.removeClass("hide") : siderbarF.addClass("hide");
        winH > 526 ? siderbar.css("top", "178px") : siderbar.css("top", "30%");
        winH > 290 ? siderbarT.removeClass("hide") : siderbarT.addClass("hide");
        winH > 678 ? siderbar.css("height", "357px") : siderbar.css("height", "307px");

        // 绘制头部购物车高度
        _judeCartHide();
    };

    // 修改购物车高度
    function _judeCartHide() {
        var cart = $(".cart-bd");
        cart.css({
            "height": winH - 35 + "px"
        });
    }


    // 问题纠错
    function _problem(){
        // 问题纠错
        $.get('/resources/lib/problem.html',function(result){  
            $('body').append(result);
            var problem =  $("#problem");
            problem.hide();

            $(".problem_icon").on("click",function(){
                $("#problem_content").show();
                $("#problem .lw-success").hide();
                problem.show();
            });
            $(".problem_close").on("click",function(){
                problem.hide();
            });
            $("#problem_submit").on("click",function(){
                $("#problem_content").hide();
                $("#problem .lw-success").show();
            });
            $("#problem_more_msg").on("click",function(){
                $("#problem_content").show();
                $("#problem .lw-success").hide();
            })
        });  
    }
});