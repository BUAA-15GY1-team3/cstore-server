//模块化配置，基本模块的基础路径,考虑兼容原来代码，先按路径配置,Jquery作为基础组件不包入模块管理
seajs.config({
     base: '/resource/',
     alias: {
     	'xpanCommonStyle':'css/common.css',
        // login
        'xpanLoginStyle':'css/login.css',
        'xpanLogin':'js/pan/login'
     }
 });
