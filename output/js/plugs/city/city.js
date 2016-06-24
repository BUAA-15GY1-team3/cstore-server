var sp = {
    provinceId :1,
    cityId: 1,
    provinceName: "北京",
    cityName: "北京",
    provinceData:{},
    cityData:{}
}
var province = {
    init:function(idname){
        console.log(sp);
        this.id = $("#" + idname);
        this.label = this.id.find('.ui-city');
        this.getProvince();
        this.getLable();
    },
    getProvince:function(){
        $.get('/resources/json/city/province.json',function(result){    
            var data = result.province;
            sp.provinceData = data;
            var num = 0;
            for (; num < data.length; num++) {
                if (data[num].provinceId == sp.provinceId) {
                    sp.provinceName = data[num].provinceName;
                    break;
                };
            };
            if (num == data.length && data[num - 1].provinceId != sp.provinceId) {
                sp.provinceId = data[0].provinceId
            };
            province.getCity(sp.provinceId);
        });
    },
    getCity:function(id){
        $.get('/resources/json/city/city.json?proId =' + id,function(result){    
            var data = result.city;
            sp.cityData = data;
            var num = 0;
            for (; num < data.length; num++) {
                if (data[num].cityId == sp.cityId) {
                    sp.cityName = data[num].cityName;
                    break;
                };
            };
            if (num == data.length && data[num - 1].cityId != sp.cityId) {
                sp.cityId = data[0].cityId
            };
        });
    },
    getLable:function(){
        var label = '<a data-proId="'+sp.provinceId +'" data-cityId="'+sp.cityId +'"  href="javascript:;" class="ui-city-toggle">'
                    +  '<em class="address-placement">'
                    +      '<span id="provinceName" class="pr">'+ sp.provinceName +'</span>'
                    +      '<span id="citybName" class="ct">'+ sp.cityName +'</span>'
                    +  '</em>'
                    +  '<b class="arr"></b>'
                    + '</a>';
        this.label.html(label);
        this.hoverTips();
    },
    creteLabel:function(id){
        var plus = this;
        var group = $(".ui-city-group");
        if (!group.length) {
            group = $('<div class="ui-city-group"></div>');
            var a = '<a  class="ui-city-close" href="javascript:;"><i>&gt;</i><i>&lt;</i></a>';
            var groupMain = $('<div class="ui-city-group-content"></div>');
            var tabUl = '<ul class="nav-tabs clearfix">'
                        +    '<li id="provinceShow" class="active">'
                        +        '<p><a href="javascript:;">'+sp.provinceName+'</a><b class="arr"></b></p>'
                        +    '</li>'
                        +    '<li id="citybShow" class="active current">'
                        +        '<p><a href="javascript:;">'+sp.cityName+'</a><b class="arr"></b></p>'
                        +    '</li>'
                        +'</ul>';
            var ul1 = '<div class="tab-content">'
                        +   '<ul class="tab-panel pr-panel tab-province"><li></li></ul>'
                        +   '<ul class="tab-panel ct-panel  tab-city active"><li></li></ul>'
                        + '</div>';
            groupMain.html(tabUl + ul1);
            group.append(a);
            group.append(groupMain);
            plus.label.append(group);
        }
        $("#provinceShow").find("a").html(sp.provinceName);
        $("#citybShow").find("a").html(sp.cityName);
        plus.creteProvince();
        plus.creteCity();
    },
    creteProvince:function(id){
        var pid = id || sp.provinceId;
        var ul = $(".tab-province").find("li");
        ul.empty();
        for (var i = 0; i < sp.provinceData.length; i++) {
            var _str = "";
            if (sp.provinceData[i].provinceId == pid) {
                _str = '<span><a name="'+sp.provinceData[i].provinceId+'" href="javascript:;" class="on">'+sp.provinceData[i].provinceName+'</a></span>';
            }else{
                _str = '<span><a name="'+sp.provinceData[i].provinceId+'" href="javascript:;">'+sp.provinceData[i].provinceName+'</a></span>';
            }    
            ul.append(_str);
        };
    },
    creteCity:function(id){
        var plus = this;
        var cid = id || sp.cityId;
        var ul = $(".tab-city").find("li");
        ul.empty();
        for (var i = 0; i < sp.cityData.length; i++) {
            var _str = "";
            if (sp.cityData[i].cityId == cid) {
                _str = '<span><a name="'+sp.cityData[i].cityId+'" href="javascript:;" class="on">'+sp.cityData[i].cityName+'</a></span>';
            }else{
                _str = '<span><a name="'+sp.cityData[i].cityId+'" href="javascript:;">'+sp.cityData[i].cityName+'</a></span>';
            }    
            ul.append(_str);
        };
        plus.hoverTips();
    },
    hoverTips:function(){
        var plus = this;
        $(".ui-city-toggle").on("click", function(){
            if (plus.label.hasClass('active')) {
                plus.label.removeClass("active");
            }else{
                plus.label.addClass("active");
                plus.creteLabel();
            }
        });
        $(".tab-province").find("li").find("a").on("click", function(){
            var _this = $(this);
            sp.provinceId = _this.attr("name");
            sp.provinceName = _this.html();
            qg.ui.active($(".nav-tabs").find('li').eq(1), 'current');
            qg.ui.active($(".tab-content").find('.tab-panel').eq(1), 'active');
            plus.getCity(sp.provinceId);
        });
        $(".tab-city").find("li").find("a").on("click", function(){
            var _this = $(this);
            sp.cityId = _this.attr("name");
            sp.cityName = _this.html();
            $(".ui-city").removeClass("active");
            plus.getLable();
        });
        $(".nav-tabs").find("li").on("click",function(){
            var _index = $(this).index();
            qg.ui.active($(this), 'current');
            qg.ui.active($(".tab-content").find('.tab-panel').eq(_index), 'active');
        });
        $(".ui-city-close").on("click",function(){
            plus.label.removeClass("active");
        });
    }
}
function setCityInfo() {
    sp.provinceId = $("#searchProvinceId").val();
    sp.cityId = $("#searchCityId").val();
    var provinceIdCookie = getCookie("provinceId");
    var cityIdCookie = getCookie("cityId");
    if (!provinceIdCookie || provinceIdCookie == "") {
        setCookie("provinceId", sp.provinceId, 7);
    }
    if (!cityIdCookie || cityIdCookie == "") {
        setCookie("cityId", sp.cityId, 7);
    }
    province.init("sncity");
};
