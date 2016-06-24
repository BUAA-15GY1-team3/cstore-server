var SFE = SFE || {};
SFE.search = {};
SFE.search = (function ($) {
	var searchFlag = true;
	var searchHisEvent = function () {
        var searchHis = $("#rec_results .history-results");
        searchHis.delegate(".active", "mouseover", function () {
            $(this).addClass("rec_over").siblings().removeClass("rec_over")
        });
    };
    var searchAutoComplete = function(){
    	if ($("#keyWords").size() == 0) {
            return false;
        }

        var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest,
         	obj = $("#keyWords"),
        	delay = 200,
           	timer, 
           	resultBox = $("#ac_results"),
           	rec_results = $("#rec_results");
        if (resultBox.size() == 0) {
            $('<div class="g-ac-results" id="ac_results" style="display:none;"></div>').appendTo(".search-col");
            resultBox = $("#ac_results")
        };
        resultBox.delegate("li", "mouseover", function () {
            if ($(this).find(".action").length > 0) {
                $(this).find(".action").show();
                $(this).find(".tip").hide()
            }
            $(this).addClass("ac_over").siblings().removeClass("ac_over")
        }).delegate("li", "mouseout", function () {
            if ($(this).find(".action").length > 0) {
                $(this).find(".action").hide();
                $(this).find(".tip").show()
            }
        }).delegate("li", "click", function () {
        	// 点击时处理事件
        });
        var resultListCurrentIndex = -1;
        var selectKeywordByKey = function (n) {
        	var resultBox = $("#ac_results"),
                results = resultBox.find("li"),
                maxCount = results.size();
            if (resultBox.is("hidden") || results.size() == 0 || Math.abs(n) != 1) {
                return
            }
            resultListCurrentIndex += n;
            if (resultListCurrentIndex < 0) {
                resultListCurrentIndex = maxCount - 1
            }
            if (resultListCurrentIndex == maxCount) {
                resultListCurrentIndex = 0
            }
            var currentKeywords = results.eq(resultListCurrentIndex);
            ismanual = $(currentKeywords).attr("isManual");
            search_da_djc_index = $(currentKeywords).attr("indexnum");
            nameType = $(currentKeywords).attr("name");
            assWord = $(currentKeywords).attr("assword");
            results.removeClass("ac_over");
            currentKeywords.addClass("ac_over");
            if (currentKeywords.attr("categoryid")) {
                searchCatalogId = currentKeywords.attr("categoryid")
            } else {
                searchCatalogId = false
            }
            if (currentKeywords.hasClass("g-ac-store")) {
                searchStoreFlag = true
            } else {
                searchStoreFlag = false
            }
            obj.val(currentKeywords.find(".keyparam").text());
            return false
        };
        var autoComplateFun = function (keyword) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                $("#rec_results").hide();
                if (keyword.length == 0) {
                    $("#rec_results").show();
                    return false;
                }
                resultBox.show();
            }, delay)
        };
        obj.keyup(function (event) {
            searchFlag = true;
            if (event.which == 13 || event.which == 38 || event.which == 40) {
                return false
            }
            var keyword = $.trim($("#keyWords").val());
            keyword = CtoH(keyword);
            autoComplateFun(keyword);
        }).keydown(function (event) {
            if (event.which == 13) {
                resultBox.hide();
                resultListCurrentIndex = -1;
                $("#searchSubmit").click();
                return false
            }
            if (event.which == 38) {
                selectKeywordByKey(-1)
            }
            if (event.which == 40) {
                selectKeywordByKey(1)
            }
        }).click(function () {
     		searchFlag = true;
            var keyword = $.trim($("#keyWords").val());
            if (keyword.length == 0) {
                $("#rec_results").show();
            } else {
                var keyword = $.trim($("#keyWords").val());
                keyword = CtoH(keyword);
                autoComplateFun(keyword)
            }
            return false;
        });
        $(".g-rec-results").find(".title").find(".spider_close").each(function () {
            $(this).click(function () {
                clearBox();
            })
        })
        $(document).click(function () {
            resultBox.hide();
            resultListCurrentIndex = -1;
            var e = e || window.event || arguments.callee.caller.arguments[0];
            var target = e.target || e.srcElement;
            if ($(target).attr("id") == "rec_results" || $(target).parents("#rec_results").length == 1) {
                return;
            }
            rec_results.hide();
        })
    };
    var searchEvent = function () {
        searchHisEvent();
      	searchAutoComplete();
        keyDown();
    };
    var clearBox = function () {
        $("#ac_results").hide();
        $("#rec_results").hide()
    };
    function CtoH(val) {
        var str = val;
        var result = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) == 12288) {
                result += String.fromCharCode(str.charCodeAt(i) - 12256);
                continue
            }
            if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248)
            } else {
                result += String.fromCharCode(str.charCodeAt(i))
            }
        }
        return result;
    }
    var keyDown = function() {
        $(document).keydown(function (e) {
            var tagName = document.activeElement.tagName;
            if ((e.keyCode == 83 && tagName == "BODY" || tagName == "HTML")) {
                $("#keyWords").focus();
                if (e && e.preventDefault) {
                    e.preventDefault()
                } else {
                    window.event.returnValue = false
                }
                return false
            }
            if (e.keyCode == 27) {
                $("#ac_results").hide();
                $("#rec_results").hide();
                $("#keyWords").blur()
            }
        })
    }
    return {
    	clearBox: clearBox,
        searchEvent: searchEvent
    }
})(jQuery);

$(document).ready(function(){
	SFE.search.searchEvent();
});