//全局配置
window.baseUrl = 'http://api.zmiti.com/v2/';//接口地址http://api.zmiti.com/v2/  || http://beta.zmiti.com:90/
window.loginUrl='http://localhost:5000';//登录地址.http://webapi.zmiti.com/public/zmiti
window.mainUrl = 'http://localhost:3000'; //智媒体的首页.
window.isDebug = false; //是否为调试版本
window.adminUrl = './admin/index.html';//后台首面的地址 线上应该用 ./
window.menuConfigUrl = './config/menuconfig.js';

window.Role = {
	DEFAULTUSER:1,//普通用户
	COMPANYUSER:2,//公司员工
	SUPERADMINUSER:4,//超级管理员
	NORMALADMINUSER:3,//系统管理员
	COMPANYADMINUSER:5,//公司管理员

}

window.MEETINGUSERLIST = ['xuchang','xinmeiti','huangqinghua','bmyuan'];//配置两会的页面哪些用户可以访问。