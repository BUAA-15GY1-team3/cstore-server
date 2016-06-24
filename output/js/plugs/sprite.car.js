var car = {};
var path = '/resources/json/car/';
var carObj = {
	logo:"",
	series:"",
	time:"",
	capacity:"",
	id:"",
    name:""
}
/**
 * 展示车型
 */
car.show = function () {
    car.showTab(0);
	car.hot();
}

/**
 * 获取热点的汽车
 * @return {[type]} [description]
 */
car.hot = function(callback){
	$('#_first_letter_div').show();
    $('#_first_letter_div a').bind('click', function() {
        qg.ui.active(this, 'act');
    });
    $.ajax({
        type: "GET",
        url: path + "hotCar.json",
        success: function(data) {
            car.bindList(data);
        }
    });
}

/**
 * 通过字母获取相对应的车
 */
car.findCarByCode = function(firstLetter) {
	$('#_first_letter_div').show();
    $('#_first_letter_div a').bind('click', function() {
        qg.ui.active(this, 'act');
    });
    $.ajax({
        type: "GET",
        url: path + "codeCar.json",
        data: null,
        success: function(data) {
            car.bindList(data);
        }
    });
};
car.bindList = function(data){
	if (data && data.length > 0) {
        var _data_content = '<div class="type-brand-list"><ul class="fix">';
        $.each(data, function(i, item) {
            _data_content += '<li class="fix">';
            _data_content += '<a href="javascript:;" title="' + item.logoName + '" onclick="car.findCarByLogo(' + item.id + ',' + "'" + item.logoName + "'" + ')">';
            _data_content += '<img alt="" src="' + item.logoUrl + '">';
            _data_content += '<h6>' + item.logoName + '</h6>';
            _data_content += '</a></li>';

        });
        _data_content += '</ul></div>';
        $("#_data_content_div").html(_data_content).parent().show();
        car.showHeight();
    }
}


/**
 * 第二步：车系
 */
car.findCarByLogo = function(carLogoId, carLogoName) {
    carObj.logo = carLogoId
    $("#car_logo").find('.name').html(carLogoName);
    car.showTab(1);
    $.ajax({
        type: "GET",
        url: path + "seriesCar.json",
        data: null,
        success: function(data) {
            if (data && data.length > 0) {
                var div_content = "";
                $.each(data, function(i, item) {
                    div_content += '<div class="type-panel" ><h4 class="type-title3"><em class="spider_icon1"></em>' + item.brandName + '</h4>';
                    div_content += '<div class="type-panel-main fix"><div>';
                    $.each(item.carSeriesVoList, function(i, carSeries) {
                        div_content += '<a href="javascript:;" onclick="car.findCarBySeries(' + carSeries.id + ',' + "'" + carSeries.seriesName + "'" + ')"' + ' title="' + carSeries.seriesName + '"><span>' + carSeries.seriesName + '</span></a>';
                    });
                    div_content += '</div></div></div>';
                });
                $("#_data_content_div").html(div_content).parent().show();
				car.showHeight(80);
            }
        }
    });
};

/**
 * 第三步：时间挑选
 */
car.findCarBySeries = function(carSeriesId, seriesName){
    carObj.series = carSeriesId
    $("#car_series").find('.name').html(seriesName);
    car.showTab(2);
     $.ajax({
        type: "GET",
        url: path + "yearCar.json",
        data: {
            "carSeriesId": carSeriesId
        },
        success: function(data) {
            if (data && data.length > 0) {
                var _data_content = '<div class="type-panel"><div class="type-panel-main specail fix"><div class="fix">';
                $.each(data, function(i, item) {
                    _data_content += '<a href="javascript:;" title="' + item + '" onclick="car.findCarByYear(' + "'" + item + "'" + ')"><span>' + item + '</span></a>';
                });
                _data_content += '</div></div></div>';
                $("#_data_content_div").html(_data_content).parent().show();
                car.showHeight(80);
            }
        }
    });
}

/**
 * 第四步，油量挑选
 */
car.findCarByYear = function(year){
    carObj.time = year;
    $("#car_time").find('.name').html(year);
    car.showTab(3);
     $.ajax({
        type: "GET",
        url: path + "capacityCar.json",
        data: {
            "year": year
        },
        success: function(data) {
           if (data && data.length > 0) {
                var div_content = "";
                $.each(data, function(i, item) {
                    div_content += '<div class="type-panel" ><h4 class="type-title3"><em class="spider_icon1 spider_capacity"></em>' + item.capacity + '</h4>';
                    div_content += '<div class="type-panel-main fix"><div class="wrap-panel-main">';
                    $.each(item.carSeriesVoList, function(i, carSeries) {
                        div_content += '<a href="javascript:;" onclick="car.findCar(this)"' + ' title="' + carSeries.modelName + '" data-id= '+carSeries.id+' data-capacity = '+item.capacity+'><span>' + carSeries.modelName + '</span></a>';
                    });
                    div_content += '</div></div></div>';
                });
                $("#_data_content_div").html(div_content).parent().show();
                car.showHeight(80);
           }
        }
    });
}

/**
 * 最终挑选的car
 * @param  {[type]} carId [description]
 * @return {[type]}       [description]
 */
car.findCar = function(e){
    $('.search_main').stop().animate({
        height: '0'
    }, "normal")
    var _this = $(e);
    carObj.id = _this.attr('data-id');
    carObj.capacity = _this.attr('data-capacity');
    carObj.name = _this.attr('title');
    $('#car').html(carObj.name);
    $('.choose_car').removeClass('choose_car_click');
    $('.search_car').removeClass('search_car_show');
}

/**
 * 重置车辆
 * @return {[type]} [description]
 */
car.clearCar = function(){
    carObj.logo = carObj.series = carObj.time = carObj.capacity = carObj.id = carObj.name = "";
    $('#car').html('您暂未选择任何车辆！');
}
car.showHeight = function(h){
    var h = h || 150;
    var divHeight = $("#_data_content_div").height();
    $('.search_main').stop().animate({
        height: divHeight + h + 'px'
    }, "normal")
}

/**
 * 遍历li
 */
car.showTab = function(num){
	num = parseInt(num, 10);
    if (num > 0) {
        $('.type-brand-logo').hide();
    }else{
        $('.type-brand-logo').show();
    }
	for (var i = 0; i < 6; i++) {
		var tab = $('.car_tab' + i);
		if (i > num) {
			tab.css('display', 'none');
		}else{
			tab.css('display', 'inline-block');
			if (i == num) {
				tab.addClass('active');
			}else{
				tab.removeClass('active');
			}
		}
	};
};

$(document).ready(function(){
    // 单车件中点击
    var carS = $('.search_car');
    var carL = $('.search_main');
    $('.choose_car').live('click',function(){
        var _this = $(this);
        if (_this.hasClass('choose_car_click')) {
            // 隐藏
            carL.stop().animate({
                height: '0'
            }, "normal");
            _this.removeClass('choose_car_click');
            carS.removeClass('search_car_show');
        }else{
            // 展示
            car.show();
            _this.addClass('choose_car_click');
            carS.addClass('search_car_show');   
        }
    });

    $('#car_type').live('click',function(e){
        car.show();
    });
    $('#car_logo').live('click',function(e){
        var name = $("#car_logo").find('.name').html();
        car.findCarByLogo(carObj.logo, name);
    });
    $('#car_series').live('click',function(e){
        var name = $("#car_series").find('.name').html();
        car.findCarBySeries(carObj.series, name);
    });
    $('#car_time').live('click',function(e){
        var name = $("#car_time").find('.name').html();
        car.findCarByYear(carObj.time, name);
    });
});