//模块化配置，基本模块的基础路径,考虑兼容原来代码，先按路径配置,Jquery作为基础组件不包入模块管理
seajs.config({
     base: '/resource/',
     alias: {
     	// 全局
     	'xpanCommonStyle':'css/common.css',
     	'xpanGlobal': 'js/media/global',
        'xpanMD5': 'js/media/md5',
        // login
        'xpanLoginStyle':'css/login.css',
        'xpanLogin':'js/pan/login',

        // index
        'xpanIndexStyle':'css/index.css',
        'xpanIndexNav':'js/pan/index.nav',
        'xpanIndex':'js/pan/index'
     }
 });
 seajs.use('xpanGlobal');