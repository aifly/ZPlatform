//全局配置
window.baseUrl = 'http://api.zmiti.com/v2/';//接口地址http://api.zmiti.com/v2/  || http://beta.zmiti.com:90/
window.loginUrl='http://localhost:5000';//登录地址.http://webapi.zmiti.com/public/zmiti
window.mainUrl = 'http://localhost:3000'; //智媒体的首页.
window.isDebug = false; //是否为调试版本
window.adminUrl = './admin/index.html';//后台首面的地址 线上应该用 ./
window.menuConfigUrl = './config/menuconfig.js';
window.publishBaseUrl = 'http://h5.zmiti.com/';//作品发布后预览的地址 发布后发送到windows服务器上.
window.ajaxType = 'POST';//ajax请求类型。

window.Role = {
	DEFAULTUSER:1,//普通用户
	COMPANYUSER:2,//公司员工
	SUPERADMINUSER:4,//超级管理员
	NORMALADMINUSER:3,//系统管理员
	COMPANYADMINUSER:5,//公司管理员

}

window.workState = {
	PUBLISHSED:3,//作品状态,0 草稿 1正常 2已删除 3 发布 4 未发布,
	DRAFT:0
}

window.MEETINGUSERLIST = ['xuchang','xinmeiti','huangqinghua','bmyuan'];//配置两会的页面哪些用户可以访问。