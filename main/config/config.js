//全局配置

var protocol = location.protocol;

window.baseUrl = protocol + '//h5.wenming.cn/v2/'; //接口地protocol+址//api.zmiti.com/v2/  ||protocol+ //beta.zmiti.com:90/
window.loginUrl = protocol + '//localhost:5000'; //登录地址protocol+.//webapi.zmiti.com/public/zmiti
window.mainUrl = protocol + '//localhost:3000'; //智媒体的首页.
window.isDebug = false; //是否为调试版本
window.adminUrl = './admin/index.html'; //后台首面的地址 线上应该用 ./
window.menuConfigUrl = './config/menuconfig.js';
window.publishBaseUrl = protocol + '//h5.zmiti.com/'; //作品发布后预览的地址 发布后发送到windows服务器上.



window.ajaxType = 'POST'; //ajax请求类型。

window.Role = {
	DEFAULTUSER: 1, //普通用户
	COMPANYUSER: 2, //公司员工
	SUPERADMINUSER: 4, //超级管理员
	NORMALADMINUSER: 3, //系统管理员
	COMPANYADMINUSER: 5, //公司管理员

}

window.workState = {
	PUBLISHSED: 3, //作品状态,0 草稿 1正常 2已删除 3 发布 4 未发布,
	DRAFT: 0
}

window.MEETINGUSERLIST = ['xuchang', 'xinmeiti', 'huangqinghua', 'bmyuan']; //配置两会的页面哪些用户可以访问。

window.LETTERUSERLIST = ['xuchang', 'xinmeiti', 'huangqinghua', 'bmyuan', 'mafazhan']; //配置十九大的页面哪些用户可以访问。

window.BEHINDCHILDUSERLIST = ['xuchang', 'xinmeiti', 'huangqinghua', 'bmyuan', 'mafazhan']; //配置征集留守儿童的页面哪些用户可以访问。
window.WINTEROLMPICSUSERLIST = ['xuchang', 'xinmeiti', 'bmyuan', 'mafazhan']; //配置冬奥会的页面哪些用户可以访问。

window.HOTWORDSLIST = ['xuchang', 'xinmeiti', 'huangqinghua', 'bmyuan', 'mafazhan']; //两会热词


window.WENMING = {
	XCXAPPID: 'wx32e63224f58f2cb5'
}

window.wmMeetingSmsTempConfig = {
	"1":{
		getaddress: '全国宣传干部学院怀柔校区5号楼（教学楼）大厅现场扫描二维码',
		projectname: "2018年第一期地方文明网站建设管理工作培训班",
		getdate: "2018年8月13日20时",
		getcompany: "中国文明网"
	},
	"2": {
		getaddress: '全国宣传干部学院怀柔校区5号楼（教学楼）大厅现场扫描二维码',
		projectname: "2018年地方文明网站建设管理工作第二期培训班",
		getdate: "2018年8月20日20时",
		getcompany: "中国文明网"
	}
}



window.MENUCONFIG = [{
	key: 'wenming',
	VISITUSERS: ['xuchang', 'wenmingzg', 'wmw_yangf', 'bmyuan', 'liuhaijun', 'zl461555626', 'songxian', 'zuimcyr']
}, {
	key: 'tripexpence',
	VISITUSERS: ['zgrmyh']
}, {
	key: 'boardroom',
	VISITUSERS: ['xuchang']
}, {
	key: 'letter',
	VISITUSERS: ['mafazhan', 'xuchang', 'xinmeiti', 'huangqinghua', 'bmyuan']
}];