//模块化配置，基本模块的基础路径,考虑兼容原来代码，先按路径配置,Jquery作为基础组件不包入模块管理
seajs.config({
     base: '/resources/',
     alias: {
        // css
        'styleSearch':'common/css/search/search.css',
        'styleChooseCar':'common/css/chooseCar.css',
        'styleSearchResult':'common/css/search/searchResult.css',
        'styleCity':'common/css/search/city.css',
        'styleList': 'common/css/list.css',
        'stylePage':'common/css/list.page.css',
        'styleScrollbar':'common/js/plugs/scrollbar/perfect-scrollbar.css',
        'styleTips': 'common/css/tips.css',
        'styleCar':'common/css/singleCar.css',
        'styleSlides':'common/css/jquery.slides.css',
        'styleSidebar':'common/css/sp-sidebar.css',
        'styleComCar':'common/css/singleComCar.css',
        'styleWearCar':'common/css/singleWearCar.css',
        'stylePartCate':'common/css/singlePartCate.css',
        'styleAcceBrand': 'common/css/singleAcceBrand.css',
        'styleAutoBrand': 'common/css/singleAutoBrand.css',
        'styleGoodDetail': 'common/css/good/gooddetail.css',
        'styleMall': 'common/css/mall/mall.css',
        'styleMallSlide': 'common/css/mall/slide.css',
        'styleMallAnimate': 'common/css/mall/animate.css',
        'styleMallList': 'common/css/mall/list.css',
        'easydialog': 'common/css/plugs/easydialog.css',
        // 个人信息css
        'styleUser': 'common/css/user/common.css',
        'styleMynew': 'common/css/user/mynew.css',
        'styleMyOrder': 'common/css/user/order.css',
        'styleAddress': 'common/css/user/address.css',
        'styleEnterprise': 'common/css/user/enterprise.css',
        'styleMyUser': 'common/css/user/user.css',
        'styleMyInfo': 'common/css/user/info.css',
        'styleMySecurity': 'common/css/user/security.css',
        'styleApplyOption': 'common/css/user/applyoption.css',
        'styleMessage': 'common/css/user/message.css',
        'styleEvaluation': 'common/css/user/evaluation.css',
        'styleUserRole': 'common/css/user/userrole.css',
        // js
        'spriteLazyload': 'common/js/plugs/jquery.lazyload.min',
        'spriteSlider': 'common/js/plugs/jquery.slides',
        'spriteGlobal': 'common/js/media/global',
        'spriteGlobalSearch': 'common/js/media/search',
        'spriteSiderbar': 'common/js/media/siderBar',
        'spriteChooseCar': 'common/js/plugs/sprite.car',
        'spriteMousewheel':'common/js/plugs/scrollbar/jquery.mousewheel',
        'spriteScrollbar':'common/js/plugs/scrollbar/perfect-scrollbar',
        'spriteJqueryZoom':'common/js/plugs/sprite.jqueryzoom',    // 放大镜
        'spriteScrollTo':'common/js/plugs/jquery.scrollTo',
        'spriteImgScoll':'common/js/plugs/sprite.imgscoll', 
        'spriteEasydialog': 'common/js/plugs/easydialog',
        'spriteGlobalSiteImg':'common/js/plugs/global_site_img',
        'spriteCookie': 'common/js/plugs/jquery.cookie',
        'spriteCity':'common/js/plugs/city/city',
        'spriteCityist':'common/js/plugs/city/SFE.city',
        // 首页
        'spriteIndex': 'app/index/index',
        'spriteImg': 'app/index/img',
        // 单车件
        'spriteCar': 'app/car/car',
        // 通用车件
        'spriteComPart': 'app/car/compart',
        // 易损车件
        'spriteWearCar': 'app/car/wearcar',
        // 大众全车件
        'spritePartCate': 'app/car/partcate',
        // 配件品牌
        'spriteAcceBrand': 'app/car/accebrand',
        // 汽车品牌
        'spriteAutoBrand': 'app/car/autobrand',
        // 商品详情
        'spriteGoodDetail': 'app/good/gooddetail',
        'spritePe': 'app/good/pe',
        // 普通搜索
        'spriteSeacrhResult': 'app/search/searchResult',
        // 积分商城
        'spriteMall': 'app/mall/mall',
        'spriteEasy': 'app/mall/easy',

        // 个人信息
        'spriteLeftNew': 'app/user/myLeftNew',
        'spriteMyNew': 'app/user/myNew',
        'spriteMyOrder': 'app/user/myOrder',
        'spriteAddress': 'app/user/address',
        'spriteMyInfo': 'app/user/info'

     }
 });

 seajs.use('spriteGlobal');
