webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(36);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(182);

	var _staticLibsObserableJs = __webpack_require__(245);

	var _staticLibsObserableJs2 = _interopRequireDefault(_staticLibsObserableJs);

	/*browserHistory.push('/user');
	browserHistory.push('./admin/company');*/

	var _homeIndexJsx = __webpack_require__(246);

	var _homeIndexJsx2 = _interopRequireDefault(_homeIndexJsx);

	var _userIndexJsx = __webpack_require__(772);

	var _userIndexJsx2 = _interopRequireDefault(_userIndexJsx);

	var _companyIndexJsx = __webpack_require__(781);

	var _companyIndexJsx2 = _interopRequireDefault(_companyIndexJsx);

	var _systemIndexJsx = __webpack_require__(784);

	var _systemIndexJsx2 = _interopRequireDefault(_systemIndexJsx);

	var _productIndexJsx = __webpack_require__(787);

	var _productIndexJsx2 = _interopRequireDefault(_productIndexJsx);

	var _workorderIndexJsx = __webpack_require__(793);

	var _workorderIndexJsx2 = _interopRequireDefault(_workorderIndexJsx);

	var _editorderIndexJsx = __webpack_require__(796);

	var _editorderIndexJsx2 = _interopRequireDefault(_editorderIndexJsx);

	var _vieworderIndexJsx = __webpack_require__(799);

	var _vieworderIndexJsx2 = _interopRequireDefault(_vieworderIndexJsx);

	var _listorderIndexJsx = __webpack_require__(802);

	var _listorderIndexJsx2 = _interopRequireDefault(_listorderIndexJsx);

	var _datumIndexJsx = __webpack_require__(806);

	var _datumIndexJsx2 = _interopRequireDefault(_datumIndexJsx);

	var App = (function (_React$Component) {
		_inherits(App, _React$Component);

		function App(args) {
			_classCallCheck(this, App);

			_get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, args);
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				var apps = [{ path: '/', app: _homeIndexJsx2['default'] }, { path: '/user/:title', app: _userIndexJsx2['default'] }, { path: '/company/:title', app: _companyIndexJsx2['default'] }, { path: '/system/:title', app: _systemIndexJsx2['default'] }, { path: '/product/', app: _productIndexJsx2['default'] }, { path: '/workorder/:title', app: _workorderIndexJsx2['default'] }, { path: '/editorder/(:id)', app: _editorderIndexJsx2['default'] }, { path: '/vieworder/(:id)', app: _vieworderIndexJsx2['default'] }, { path: '/listorder/:title', app: _listorderIndexJsx2['default'] }, { path: '/datum/', app: _datumIndexJsx2['default'] }];
				return _react2['default'].createElement(
					_reactRouter.Router,
					{ history: _reactRouter.hashHistory },
					apps.map(function (app, i) {
						return _react2['default'].createElement(_reactRouter.Route, { key: i, path: app.path, component: app.app });
					})
				);
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				window.obserable = new _staticLibsObserableJs2['default']();

				window.mainLeftSize = 180;

				window.getCookie = function (cname) {
					var name = cname + "=";
					var ca = document.cookie.split(';');
					for (var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0) == ' ') c = c.substring(1);
						if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
					}
					return "";
				};
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {

				window.addEventListener('resize', function () {
					window.obserable.trigger({ type: 'setAdminMenu' });
					window.obserable.trigger({ type: 'setAdminHeight' });
				});
				/*
	   			window.onresize = function(){
	   					
	   			}*/
			}
		}]);

		return App;
	})(_react2['default'].Component);

	_reactDom2['default'].render(_react2['default'].createElement(App, { isAdmin: true }), document.getElementById('fly-main'));

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var AdminIndex = (function (_Component) {
		_inherits(AdminIndex, _Component);

		function AdminIndex() {
			_classCallCheck(this, AdminIndex);

			_get(Object.getPrototypeOf(AdminIndex.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(AdminIndex, [{
			key: 'render',
			value: function render() {
				var component = _react2['default'].createElement(
					'div',
					null,
					'后台首页'
				);
				return _react2['default'].createElement(_componentsMainJsx2['default'], { component: component });
			}
		}]);

		return AdminIndex;
	})(_react.Component);

	exports['default'] = AdminIndex;
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	__webpack_require__(765);

	var _reactRouter = __webpack_require__(182);

	var _componentsPubHeaderJsx = __webpack_require__(769);

	var _componentsPubHeaderJsx2 = _interopRequireDefault(_componentsPubHeaderJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var SubMenu = _commoncomponentCommonJsx.Menu.SubMenu;

	var MainUI = (function (_Component) {
	    _inherits(MainUI, _Component);

	    function MainUI(props) {
	        _classCallCheck(this, MainUI);

	        _get(Object.getPrototypeOf(MainUI.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            defaultClass: "fly-left-aside",
	            isOpen: true,
	            current: '3',
	            currentAcc: 'iLinten@qq.com',
	            rightWidth: 0,
	            userid: '',
	            getusersigid: ''

	        };
	    }

	    _createClass(MainUI, [{
	        key: 'menuClickHandler',
	        value: function menuClickHandler(e) {
	            /* e.preventDefault();
	               this.setState({
	                 frameSrc:e.target.href
	             });
	            */
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {

	            // this.context.router.replace('/company');

	            //window.location.hash =  'company';
	        }
	    }, {
	        key: 'toggleMenu',
	        value: function toggleMenu() {
	            var _this = this;

	            if (this.state.defaultClass === "fly-left-aside") {
	                window.mainLeftSize = 60;
	                this.setState({ defaultClass: "fly-left-aside unfold", isOpen: false, rightWidth: document.documentElement.clientWidth - window.mainLeftSize });
	            } else {
	                this.setState({ defaultClass: "fly-left-aside" });
	                window.mainLeftSize = 180;
	                setTimeout(function () {
	                    _this.setState({ isOpen: true, rightWidth: document.documentElement.clientWidth - window.mainLeftSize });
	                }, 200);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var params = ''; //this.state.userid+'/'+this.state.getusersigid;

	            this.userManagerMenuConfig = [{
	                "linkTo": "/user/个人账户管理",
	                "key": "user",
	                "title": "个人账户管理",
	                "isIcon": true,
	                "type": "user",
	                "isShow": true
	            }, {
	                "linkTo": "/company/公司账户管理",
	                "key": "company",
	                "title": "公司账户管理",
	                "isIcon": true,
	                "type": "customerservice",
	                "isShow": true
	            }];

	            this.productServiceMenuConfig = [{
	                "linkTo": "/product/",
	                "key": "product",
	                "title": "新增产品",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }, {
	                "linkTo": "/listorder/工单管理",
	                "key": "workorder",
	                "title": "工单管理",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }, {
	                "linkTo": "/datum/",
	                "key": "datum",
	                "title": "资料管理",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }];
	            if (this.usertypesign === 4) {
	                //超级管理员
	                this.userManagerMenuConfig.push({
	                    "linkTo": "/system/系统账户管理",
	                    "key": "system",
	                    "title": "系统账户管理",
	                    "isIcon": true,
	                    "type": "edit",
	                    "isShow": true
	                });
	            }

	            var hash = window.location.hash;
	            var openKey = 'sub5';
	            this.productServiceMenuConfig.forEach(function (item, i) {
	                if (hash.indexOf(item.key) > -1) {
	                    openKey = 'sub6';
	                }
	            });
	            var headerProps = {
	                usertypesign: this.usertypesign,
	                currentAcc: this.state.currentAcc,
	                userid: this.userid,
	                type: 'admin',
	                getusersigid: this.getusersigid,
	                logo: '../static/images/logo.png'
	            };

	            return _react2['default'].createElement(
	                'section',
	                { className: 'main' },
	                _react2['default'].createElement(_componentsPubHeaderJsx2['default'], headerProps),
	                _react2['default'].createElement(
	                    'article',
	                    { className: 'fly-content' },
	                    _react2['default'].createElement(
	                        'section',
	                        { className: this.state.defaultClass },
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'fly-toggle-menu', onClick: this.toggleMenu.bind(this) },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'menu-fold', style: { display: this.state.isOpen ? 'inline-block' : 'none' } }),
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'menu-unfold', style: { display: this.state.isOpen ? 'none' : 'inline-block' } })
	                        ),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'fly-menu-c' },
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Menu,
	                                {
	                                    style: { width: 182 },
	                                    defaultOpenKeys: [openKey],
	                                    selectedKeys: [this.state.current],
	                                    mode: 'inline' },
	                                _react2['default'].createElement(
	                                    SubMenu,
	                                    { key: 'sub5',
	                                        title: _react2['default'].createElement(
	                                            'span',
	                                            null,
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'setting', style: { marginRight: '22px' } }),
	                                            _react2['default'].createElement(
	                                                'span',
	                                                null,
	                                                '用户管理'
	                                            )
	                                        ) },
	                                    this.userManagerMenuConfig.map(function (item) {
	                                        return _react2['default'].createElement(
	                                            _commoncomponentCommonJsx.Menu.Item,
	                                            { key: item.key },
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: item.type, style: { marginRight: '32px' } }),
	                                            _react2['default'].createElement(
	                                                _reactRouter.Link,
	                                                { to: item.linkTo },
	                                                item.title
	                                            )
	                                        );
	                                    })
	                                ),
	                                _react2['default'].createElement(
	                                    SubMenu,
	                                    { key: 'sub6',
	                                        title: _react2['default'].createElement(
	                                            'span',
	                                            null,
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'setting', style: { marginRight: '22px' } }),
	                                            _react2['default'].createElement(
	                                                'span',
	                                                null,
	                                                '操作管理'
	                                            )
	                                        ) },
	                                    this.productServiceMenuConfig.map(function (item) {
	                                        return _react2['default'].createElement(
	                                            _commoncomponentCommonJsx.Menu.Item,
	                                            { key: item.key },
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: item.type, style: { marginRight: '32px' } }),
	                                            _react2['default'].createElement(
	                                                _reactRouter.Link,
	                                                { to: item.linkTo },
	                                                item.title
	                                            )
	                                        );
	                                    })
	                                )
	                            )
	                        )
	                    ),
	                    _react2['default'].createElement(
	                        'section',
	                        { className: 'fly-right-aside', style: { width: this.state.rightWidth } },
	                        this.props.component
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;
	            var resizeLeftMenu = _props.resizeLeftMenu;

	            resizeMainHeight(this, 'setAdminHeight');
	            resizeLeftMenu(this, 'setAdminMenu');

	            var _validateUser = validateUser(function () {

	                loginOut(undefined, undefined, false);
	            });

	            var userid = _validateUser.userid;
	            var getusersigid = _validateUser.getusersigid;
	            var companyid = _validateUser.companyid;
	            var username = _validateUser.username;
	            var isover = _validateUser.isover;
	            var usertypesign = _validateUser.usertypesign;

	            this.userid = userid;
	            this.getusersigid = getusersigid;
	            this.companyid = companyid;
	            this.isover = isover;
	            this.usertypesign = usertypesign;
	            this.loginOut = loginOut;

	            if (this.usertypesign !== window.Role.NORMALADMINUSER && this.usertypesign !== window.Role.SUPERADMINUSER) {

	                loginOut('您没有访问的权限', window.mainUrl, false); //不是hash跳转。location.href跳转
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var hash = window.location.hash;
	            var configs = this.userManagerMenuConfig.concat(this.productServiceMenuConfig);
	            var current = '';
	            configs.forEach(function (item) {
	                if (hash.indexOf('#' + item.linkTo) > -1) {
	                    current = item.key;
	                }
	            });
	            this.setState({
	                current: current,
	                rightWidth: document.documentElement.clientWidth - 180,
	                userid: this.userid,
	                isover: this.isover,
	                getusersigid: this.getusersigid
	            });
	        }
	    }]);

	    return MainUI;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(MainUI);
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "main.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(773);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiUserApp = (function (_Component) {
	  _inherits(ZmitiUserApp, _Component);

	  function ZmitiUserApp(props) {
	    _classCallCheck(this, ZmitiUserApp);

	    _get(Object.getPrototypeOf(ZmitiUserApp.prototype), 'constructor', this).call(this, props);

	    this.state = {
	      current: 0,
	      mainHeight: document.documentElement.clientHeight - 50,
	      selectedIndex: 0,
	      userList: []

	    };
	    this.transFormal = this.transFormal.bind(this);
	    this.disableUser = this.disableUser.bind(this);
	  }

	  _createClass(ZmitiUserApp, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var columns = [{
	        title: '序号',
	        dataIndex: 'key',
	        key: 'xx'
	      }, {
	        title: '用户名',
	        dataIndex: 'username',
	        key: 'username'
	      }, {
	        title: '手机',
	        dataIndex: 'mobile',
	        key: 'mobile'
	      }, {
	        title: '邮箱',
	        dataIndex: 'email',
	        key: 'email'
	      }, {
	        title: '注册日期',
	        dataIndex: 'regDate',
	        key: 'regDate',
	        sorter: function sorter(a, b) {
	          return a.key - b.key;
	        }
	      }, {
	        title: '剩余天数',
	        dataIndex: 'surplusDays',
	        key: 'surplusDays',
	        sorter: function sorter(a, b) {
	          return a.surplusDays - b.surplusDays;
	        }
	      }, {
	        title: '空间使用量',
	        dataIndex: 'userSpace',
	        key: 'userSpace'
	      }];
	      var columns1 = columns.concat({
	        title: '操作',
	        dataIndex: '', key: 'x',
	        width: '30%',
	        render: function render(text, record) {
	          return _react2['default'].createElement(
	            'div',
	            { 'data-userid': record.userid },
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)', 'data-index': '0', style: { color: record.isover === 2 ? '' : 'red' }, onClick: _this.disableUser },
	              record.isover === 2 ? '启用' : '禁用'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)' },
	              '延长试用'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)' },
	              '提升空间'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: _this.transFormal },
	              '转为正式用户'
	            )
	          );
	        } });
	      var columns2 = columns.concat({
	        title: '操作',
	        width: '30%',
	        dataIndex: '', key: 'x',
	        render: function render(text, record) {
	          return _react2['default'].createElement(
	            'div',
	            { 'data-userid': record.userid },
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)', 'data-index': '0', style: { color: record.isover === 2 ? '' : 'red' }, onClick: _this.disableUser },
	              record.isover === 2 ? '启用' : '禁用'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)' },
	              '删除'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascript:void(0)' },
	              '设置权限'
	            )
	          );
	        } });

	      var title = this.props.params.title;
	      var props = {
	        userList: this.state.userList,
	        columns: [columns1, columns2],
	        mainHeight: this.state.mainHeight,
	        title: title,
	        changeAccount: this.changeAccount.bind(this),
	        keyDown: function keyDown(value) {
	          clearTimeout(_this.keyupTimer);
	          _this.defautlUserList === undefined && (_this.defautlUserList = _this.state.userList.concat([]));
	          _this.keyupTimer = setTimeout(function () {
	            var userlists = _this.defautlUserList;
	            var condition = 'username';
	            _this.state.userList = userlists.filter(function (user) {
	              switch (_this.condition * 1) {
	                case 0:
	                  //提问内容
	                  condition = 'username';
	                  break;
	                case 1:
	                  //类型
	                  condition = 'username';
	                  break;
	              }

	              return user[condition].indexOf(value) > -1;
	            });

	            _this.forceUpdate(function () {});
	          }, 350);
	        },
	        selectComponent: _react2['default'].createElement(
	          _commoncomponentCommonJsx.Select,
	          { placeholder: '用户名', onChange: function () {}, style: { width: 120 }, size: 'small' },
	          _react2['default'].createElement(
	            Option,
	            { value: '0' },
	            '用户名'
	          )
	        )
	      };

	      //console.log(this.state.mainHeight);
	      return _react2['default'].createElement(_componentsMainJsx2['default'], { component: _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props) });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props;
	      var resizeMainHeight = _props.resizeMainHeight;
	      var validateUser = _props.validateUser;
	      var loginOut = _props.loginOut;
	      var resizeLeftMenu = _props.resizeLeftMenu;

	      validateUser(function () {
	        loginOut(undefined, undefined, false);
	      }, this);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /*  var {userid,getusersigid} = this.props.params;
	        this.getusersigid = this.getusersigid = getusersigid;
	          this.userid =userid;
	          this.baseUrl = window.baseUrl;*/

	      var _props2 = this.props;
	      var resizeMainHeight = _props2.resizeMainHeight;
	      var validateUser = _props2.validateUser;
	      var loginOut = _props2.loginOut;
	      var resizeLeftMenu = _props2.resizeLeftMenu;

	      resizeMainHeight(this, 'setAdminHeight');

	      var params = {
	        getusersigid: this.getusersigid,
	        userid: this.userid,
	        setusertypesign: 1
	      };
	      var s = this;

	      $.ajax({
	        type: "POST",
	        url: window.baseUrl + "/user/get_userlist/",
	        data: params,
	        success: function success(data) {
	          console.log(data);
	          if (data.getret === 0) {

	            s.setState({
	              userList: data.userlist
	            });
	          } else if (data.getret === -3) {
	            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	            setTimeout(function () {
	              location.href = '/';
	            }, 2000);
	          } else {
	            loginOut(data.getmsg, window.loginUrl, false);
	          }
	        }

	      });
	    }
	  }, {
	    key: 'disableUser',
	    value: function disableUser(e) {
	      e.preventDefault();
	      var userid = e.target.parentNode.getAttribute('data-userid');
	      var isover = -1;

	      this.state.userList.forEach(function (user, i) {
	        if (user.userid === userid) {
	          isover = user.isover;
	        }
	      });
	      if (isover === -1) {
	        return;
	      }

	      var params = {
	        getusersigid: this.getusersigid,
	        userid: this.userid,
	        setuserid: userid,
	        setisover: isover === 2 ? 0 : 2 //0:正式用户，1 试用用户，2禁用用户，3已删除。
	      };
	      var baseUrl = this.props.baseUrl || 'http://api.zmiti.com/v2';
	      var s = this;

	      $.ajax({
	        type: "post",
	        url: baseUrl + 'user/disable_user/',
	        data: params,
	        success: function success(data) {
	          if (data.getret === 0) {
	            _commoncomponentCommonJsx.message.success('操作成功');
	            s.state.userList.forEach(function (user) {
	              if (user.userid === userid) {
	                user.isover = isover === 2 ? 0 : 2;
	              }
	            });
	            s.forceUpdate();
	          } else {
	            _commoncomponentCommonJsx.message.error('操作失败');
	          }
	        }
	      });
	    }
	  }, {
	    key: 'transFormal',
	    value: function transFormal(e) {
	      //转成正式用户

	      var userid = e.target.parentNode.getAttribute('data-userid');
	      var params = {
	        getusersigid: this.getusersigid,
	        userid: this.userid,
	        setuserid: userid,
	        setisover: 0 //0:正式用户，1 试用用户，2禁用用户，3已删除。
	      };
	      var baseUrl = window.baseUrl || 'http://api.zmiti.com/v2';
	      var s = this;

	      $.ajax({
	        type: "post",
	        url: baseUrl + 'user/disable_user/',
	        data: params,
	        success: function success(data) {
	          console.log(data);
	          if (data.getret === 0) {
	            _commoncomponentCommonJsx.message.success('操作成功');
	            s.state.userList.forEach(function (user) {
	              if (user.userid === userid) {
	                user.isover = 0;
	              }
	            });
	            s.forceUpdate();
	          } else {
	            _commoncomponentCommonJsx.message.error('操作失败');
	          }
	        }
	      });
	    }
	  }, {
	    key: 'changeAccount',
	    value: function changeAccount(e) {
	      this.setState({
	        selectedIndex: e
	      });
	    }
	  }]);

	  return ZmitiUserApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiUserApp);

	ZmitiUserApp.defaultProps = {
	  baseUrl: window.baseUrl || 'http://api.zmiti.com/v2/'
	};

	/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(774);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(782);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiCompanyApp = (function (_Component) {
	  _inherits(ZmitiCompanyApp, _Component);

	  function ZmitiCompanyApp(props) {
	    _classCallCheck(this, ZmitiCompanyApp);

	    _get(Object.getPrototypeOf(ZmitiCompanyApp.prototype), 'constructor', this).call(this, props);

	    this.state = {
	      current: 0,
	      mainHeight: document.documentElement.clientHeight - 50,
	      userList: []

	    };
	    this.condition = 0;
	    this.changeAccount = this.changeAccount.bind(this);
	  }

	  _createClass(ZmitiCompanyApp, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var columns = [{
	        title: '序号',
	        dataIndex: 'key',
	        key: 'xx'
	      }, {
	        title: '公司名称',
	        dataIndex: 'companyName',
	        key: 'companyName'
	      }, {
	        title: '负责人账号',
	        dataIndex: 'username',
	        key: 'username'
	      }, {
	        title: '用户总数',
	        dataIndex: 'totalUserNum',
	        key: 'totalUserNum'
	      }, {
	        title: '到期时间',
	        dataIndex: 'expirDate',
	        key: 'expirDate'
	      }, {
	        title: '空间使用量',
	        dataIndex: 'userSpace',
	        key: 'userSpace'
	      }, {
	        title: '负责客服',
	        dataIndex: 'serviceName',
	        key: 'serviceName'
	      }];
	      var columns1 = columns.concat({
	        title: '操作',
	        dataIndex: '', key: 'x',
	        render: function render(text, record) {
	          return _react2['default'].createElement(
	            'div',
	            { 'data-userid': record.userid },
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '延长时间'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '用户'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '提升空间'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)', onClick: _this.regular.bind(_this) },
	              ' 转正'
	            )
	          );
	        } });
	      var columns2 = columns.concat({
	        title: '操作',
	        dataIndex: '', key: 'x',
	        render: function render(text, record) {
	          return _react2['default'].createElement(
	            'div',
	            { 'data-userid': record.userid },
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '延长时间'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '用户'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              '提升空间'
	            ),
	            '    ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'javascrit:void(0)' },
	              ' 设置权限'
	            )
	          );
	        } });
	      var title = this.props.params.title;
	      var props = {
	        userList: this.state.userList,
	        columns: [columns1, columns2],
	        changeAccount: this.changeAccount,
	        tags: ['试用公司账户', '正式公司账户'],
	        mainHeight: this.state.mainHeight,
	        title: title,
	        keyDown: function keyDown(value) {
	          clearTimeout(_this.keyupTimer);
	          _this.defautlUserList === undefined && (_this.defautlUserList = _this.state.userList.concat([]));
	          _this.keyupTimer = setTimeout(function () {
	            var userlists = _this.defautlUserList;
	            var condition = 'companyName';
	            _this.state.userList = userlists.filter(function (user) {
	              switch (_this.condition * 1) {
	                case 0:
	                  //提问内容
	                  condition = 'companyName';
	                  break;
	                case 1:
	                  //类型
	                  condition = 'username';
	                  break;
	              }

	              return user[condition].indexOf(value) > -1;
	            });

	            _this.forceUpdate(function () {});
	          }, 350);
	        },
	        selectComponent: _react2['default'].createElement(
	          _commoncomponentCommonJsx.Select,
	          { placeholder: '公司名称', onChange: function (e) {
	              _this.condition = e;
	            }, style: { width: 120 }, size: 'small' },
	          _react2['default'].createElement(
	            Option,
	            { value: '0' },
	            '公司名称'
	          ),
	          _react2['default'].createElement(
	            Option,
	            { value: '1' },
	            '负责人账号'
	          )
	        )
	      };
	      return _react2['default'].createElement(_componentsMainJsx2['default'], { component: _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props) });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props;
	      var resizeMainHeight = _props.resizeMainHeight;
	      var validateUser = _props.validateUser;
	      var loginOut = _props.loginOut;

	      resizeMainHeight(this);

	      validateUser(function () {
	        loginOut(undefined, undefined, false);
	      }, this);
	    }
	  }, {
	    key: 'regular',
	    value: function regular(e) {
	      //转正
	      var userid = e.target.parentNode.getAttribute('data-userid');
	      var params = {
	        getusersigid: this.getusersigid,
	        userid: this.userid,
	        setuserid: userid,
	        setisover: 0 //0:正式用户，1 试用用户，2禁用用户，3已删除。
	      };
	      var baseUrl = window.baseUrl || 'http://api.zmiti.com/v2';
	      var s = this;

	      $.ajax({
	        type: "post",
	        url: baseUrl + 'user/disable_user/',
	        data: params,
	        success: function success(data) {
	          if (data.getret === 0) {
	            _commoncomponentCommonJsx.message.success('操作成功');
	            s.state.userList.forEach(function (user) {
	              if (user.userid === userid) {
	                user.isover = 0;
	              }
	            });
	            s.forceUpdate();
	          } else {
	            _commoncomponentCommonJsx.message.error('操作失败');
	          }
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      this.baseUrl = window.baseUrl;
	      var _props2 = this.props;
	      var validateUser = _props2.validateUser;
	      var loginOut = _props2.loginOut;

	      var _validateUser = validateUser(function () {
	        loginOut(undefined, undefined, false);
	      }, this);

	      var userid = _validateUser.userid;
	      var getusersigid = _validateUser.getusersigid;
	      var companyid = _validateUser.companyid;
	      var username = _validateUser.username;
	      var isover = _validateUser.isover;
	      var usertypesign = _validateUser.usertypesign;

	      this.userid = userid;
	      this.getusersigid = getusersigid;
	      this.companyid = companyid;
	      this.isover = isover;
	      this.usertypesign = usertypesign;
	      this.loginOut = loginOut;
	      var params = {
	        getusersigid: this.getusersigid,
	        userid: this.userid,
	        setusertypesign: 2
	      };

	      var s = this;
	      $.ajax({
	        type: "POST",
	        url: window.baseUrl + "/user/get_userlist/",
	        data: params,
	        success: function success(data) {
	          if (data.getret === 0) {
	            s.setState({
	              userList: data.userlist
	            });
	          } else if (data.getret === -3) {
	            _commoncomponentCommonJsx.message.error('您没有访问的权限,请重新登录');
	            window.location.href = '/';
	          }
	        }

	      });
	    }
	  }, {
	    key: 'changeAccount',
	    value: function changeAccount(e) {
	      // e : 0  1;
	    }
	  }]);

	  return ZmitiCompanyApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiCompanyApp);

	/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(783);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(785);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiSystemApp = (function (_Component) {
		_inherits(ZmitiSystemApp, _Component);

		function ZmitiSystemApp(props) {
			_classCallCheck(this, ZmitiSystemApp);

			_get(Object.getPrototypeOf(ZmitiSystemApp.prototype), 'constructor', this).call(this, props);

			this.state = {
				current: 0,

				userList: [{
					key: 1,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}, {
					key: 2,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}, {
					key: 3,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}, {
					key: 4,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}, {
					key: 5,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}, {
					key: 6,
					username: 'bmyuan',
					mobile: '13455422525',
					email: '1345542525@163.com',
					sigleUserTotalNum: '13|30',
					companyUserTotalNum: '13|30'
				}]

			};
			this.changeAccount = this.changeAccount.bind(this);
		}

		_createClass(ZmitiSystemApp, [{
			key: 'render',
			value: function render() {
				var _this = this;

				var columns = [{
					title: '序号',
					dataIndex: 'key',
					key: 'xx'
				}, {
					title: '用户名',
					dataIndex: 'username',
					key: 'username'
				}, {
					title: '手机',
					dataIndex: 'mobile',
					key: 'mobile'
				}, {
					title: '邮箱',
					dataIndex: 'email',
					key: 'email'
				}, {
					title: '个人用户数',
					dataIndex: 'sigleUserTotalNum',
					key: 'sigleUserTotalNum'
				}, {
					title: '公司用户数',
					dataIndex: 'companyUserTotalNum',
					key: 'companyUserTotalNum'
				}, {
					title: '操作',
					dataIndex: '', key: 'x',
					render: function render() {
						return _react2['default'].createElement(
							'div',
							null,
							_react2['default'].createElement(
								'a',
								{ href: '#' },
								'转用户'
							),
							'    ',
							_react2['default'].createElement(
								'a',
								{ href: '#' },
								'删除'
							)
						);
					} }];

				var title = this.props.params.title;
				var props = {
					userList: this.state.userList,
					columns: [columns, columns],
					changeAccount: this.changeAccount,
					tags: ['账户管理', '分配用户'],
					mainHeight: this.state.mainHeight,
					title: title,
					keyDown: function keyDown(value) {
						clearTimeout(_this.keyupTimer);
						_this.defautlUserList === undefined && (_this.defautlUserList = _this.state.userList.concat([]));
						_this.keyupTimer = setTimeout(function () {
							var userlists = _this.defautlUserList;
							var condition = 'username';
							_this.state.userList = userlists.filter(function (user) {
								switch (_this.condition * 1) {
									case 0:
										//提问内容
										condition = 'username';
										break;
									case 1:
										//类型
										condition = 'username';
										break;
								}

								return user[condition].indexOf(value) > -1;
							});

							_this.forceUpdate(function () {});
						}, 350);
					},
					selectComponent: _react2['default'].createElement(
						_commoncomponentCommonJsx.Select,
						{ placeholder: '用户名', onChange: function (e) {
								_this.condition = e;
							}, style: { width: 120 }, size: 'small' },
						_react2['default'].createElement(
							Option,
							{ value: '0' },
							'用户名'
						)
					)
				};
				return _react2['default'].createElement(_componentsMainJsx2['default'], { component: _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props) });
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _props = this.props;
				var resizeMainHeight = _props.resizeMainHeight;
				var validateUser = _props.validateUser;
				var loginOut = _props.loginOut;

				resizeMainHeight(this);
				validateUser(function () {
					loginOut(undefined, undefined, false);
				}, this);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'changeAccount',
			value: function changeAccount(e) {
				// e : 0  1;
			}
		}]);

		return ZmitiSystemApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiSystemApp);

	/*ReactDOM.render(<ZmitiSystemApp></ZmitiSystemApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(786);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(788);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _publicValidateUserJsx = __webpack_require__(771);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	__webpack_require__(709);

	var _componentsOrderJsx = __webpack_require__(790);

	var _componentsOrderJsx2 = _interopRequireDefault(_componentsOrderJsx);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	_commoncomponentCommonJsx.moment.locale('zh-cn');
	var FormItem = _commoncomponentCommonJsx.Form.Item;

	var RadioGroup = _commoncomponentCommonJsx.Radio.Group;

	var ZmitiProductApp = (function (_React$Component) {
	  _inherits(ZmitiProductApp, _React$Component);

	  function ZmitiProductApp(args) {
	    _classCallCheck(this, ZmitiProductApp);

	    _get(Object.getPrototypeOf(ZmitiProductApp.prototype), 'constructor', this).apply(this, args);
	    this.state = {
	      visible: false,
	      productlist: [],
	      loading: false,
	      tip: '数据拉取中...',
	      productName: '', //产品名称
	      productShortName: '',
	      productPrice: '0',
	      productLink: '', //产品地址
	      productType: 0, //产品类型 0 基础产品 1付费产品
	      productRemark: '',
	      defaultZmitiIcon: '../public/images/lt-company-ico.png',
	      defaultAntdIcon: 'picture',
	      expireDate: '2099-12-31', //过期时间
	      currentIconType: '', //当前产品的图标,默认用智媒体的图标
	      iconModalVisible: false, //图标对话框是否显示。
	      currentIcon: "" };
	    //当前产品图标。默认为空的
	    this.currentId = -1;
	  }

	  _createClass(ZmitiProductApp, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props;
	      var resizeMainHeight = _props.resizeMainHeight;
	      var validateUser = _props.validateUser;
	      var loginOut = _props.loginOut;
	      var listen = _props.listen;
	      var send = _props.send;
	      var getProductList = _props.getProductList;

	      resizeMainHeight(this);

	      var _validateUser = validateUser(function () {
	        loginOut(undefined, undefined, false);
	      }, this);

	      var username = _validateUser.username;
	      var userid = _validateUser.userid;
	      var getusersigid = _validateUser.getusersigid;

	      this.userid = userid;
	      this.listen = listen;
	      this.send = send;
	      this.getProductList = getProductList;
	      this.getusersigid = getusersigid;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      this.setState({
	        mainHeight: document.documentElement.clientHeight - 50
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var _props2 = this.props;
	      var validateUser = _props2.validateUser;
	      var loginOut = _props2.loginOut;
	      var resizeMainHeight = _props2.resizeMainHeight;

	      var iNow = 0;
	      validateUser(function () {
	        iNow++;
	        loginOut();
	      }, this);
	      // resizeMainHeight(this);

	      if (iNow === 1) {
	        return _react2['default'].createElement('div', null);
	      }

	      var formItemLayout = {
	        labelCol: { span: 6 },
	        wrapperCol: { span: 14 }
	      };

	      var columns = [{
	        title: "序号",
	        dataIndex: 'key',
	        key: 'xx'
	      }, {
	        title: '产品名称',
	        dataIndex: 'productname',
	        key: 'productname'
	      }, {
	        title: '产品简称',
	        dataIndex: 'outline',
	        key: 'outline'
	      }, {
	        title: '产品类型',
	        dataIndex: 'producttypeName',
	        key: 'producttypeName'
	      }, {
	        title: '到期时间',
	        dataIndex: 'endtime',
	        key: 'endtime'
	      }, {
	        title: '产品费用',
	        dataIndex: 'price',
	        key: 'price'
	      }, {
	        title: '产品地址',
	        dataIndex: 'producturl',
	        key: 'producturl'
	      }, {
	        title: '操作',
	        dataIndex: '', key: 'x',
	        width: '10%',
	        render: function render(text, record) {
	          return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	              _commoncomponentCommonJsx.Popconfirm,
	              { placement: 'left', title: '确定要删除吗?', onConfirm: _this.delProduct.bind(_this, record.productid), okText: '确定', cancelText: '取消' },
	              _react2['default'].createElement(
	                _commoncomponentCommonJsx.Button,
	                { className: 'lt-del', type: 'primary' },
	                '删除'
	              )
	            )
	          );
	        } }];

	      var orderProps = {
	        orderList: this.state.productlist,
	        columns: [columns],
	        getProductDetail: function getProductDetail(record, index, e) {

	          _this.currentId = record.productid;
	          if (e.target.nodeName === "SPAN" || e.target.nodeName === 'BUTTON') {
	            return; //如果点击的是删除按钮，则不用弹出产品详情。
	          }
	          _this.setState({
	            visible: true,
	            productName: record.productname, //产品名称
	            productShortName: record.outline,
	            productPrice: record.price,
	            productLink: record.producturl, //产品地址
	            productType: record.producttype, //产品类型 0 基础产品 1付费产品
	            productRemark: record.description,
	            expireDate: '2099-12-31', //过期时间
	            currentIconType: record.isicon ? 'zmiti' : 'antd', //当前产品的图标,默认用智媒体的图标
	            currentIcon: record.producticon });

	          //当前产品图标。默认为空的
	          return false;
	        }
	      };
	      var dateFormat = 'YYYY-MM-DD';
	      var component = _react2['default'].createElement(
	        _commoncomponentCommonJsx.Spin,
	        { tip: this.state.tip, spinning: this.state.loading },
	        _react2['default'].createElement(
	          'div',
	          { className: 'product-main-ui', style: { height: this.state.mainHeight } },
	          _react2['default'].createElement(
	            'header',
	            { className: 'product-header' },
	            _react2['default'].createElement(
	              _commoncomponentCommonJsx.Button,
	              { onClick: function () {
	                  _this.setState({ visible: true });_this.productId = -1;
	                }, type: 'primary' },
	              '新增产品服务'
	            )
	          ),
	          _react2['default'].createElement(_componentsOrderJsx2['default'], orderProps),
	          _react2['default'].createElement(
	            _commoncomponentCommonJsx.Modal,
	            { title: '新增产品服务', visible: this.state.visible,
	              onOk: this.addProduct.bind(this),
	              onCancel: function () {
	                _this.setState({ visible: false });
	              },
	              width: 600
	            },
	            _react2['default'].createElement(
	              _commoncomponentCommonJsx.Form,
	              null,
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品名称'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(_commoncomponentCommonJsx.Input, { ref: 'product-name', value: this.state.productName, placeholder: '要显示的菜单名', onChange: function (e) {
	                    _this.setState({ productName: e.target.value });
	                  } })
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品简称'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(_commoncomponentCommonJsx.Input, { ref: 'product-sort-name', value: this.state.productShortName, placeholder: '产品简称', onChange: function (e) {
	                    _this.setState({ productShortName: e.target.value });
	                  } })
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '到期时间'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(_commoncomponentCommonJsx.DatePicker, {
	                  format: 'YYYY-MM-DD',
	                  onChange: this.changeExpireDate.bind(this),
	                  value: (0, _commoncomponentCommonJsx.moment)(this.state.expireDate, dateFormat),
	                  size: 'default' })
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品类型'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(
	                  RadioGroup,
	                  { onChange: function (e) {
	                      _this.setState({ productType: e.target.value });
	                    }, value: this.state.productType },
	                  _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Radio,
	                    { value: 0 },
	                    '基础产品'
	                  ),
	                  _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Radio,
	                    { value: 1 },
	                    '付费产品'
	                  ),
	                  _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Radio,
	                    { value: 2 },
	                    '默认产品(不需要申请)'
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品图标'
	                  ),
	                  hasFeedback: true
	                }),
	                this.state.currentIcon && this.state.currentIconType === 'zmiti' && _react2['default'].createElement(
	                  'div',
	                  { className: 'product-menu-ico' },
	                  _react2['default'].createElement('img', { src: this.state.currentIcon })
	                ),
	                this.state.currentIcon && this.state.currentIconType === 'antd' && _react2['default'].createElement(
	                  'div',
	                  { className: 'product-menu-ico product-antd-ico' },
	                  _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: this.state.currentIcon })
	                ),
	                _react2['default'].createElement(
	                  RadioGroup,
	                  { onChange: this.onChangeIcon.bind(this), value: this.state.currentIconType },
	                  _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Radio,
	                    { value: 'zmiti' },
	                    '智媒体图标'
	                  ),
	                  _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Radio,
	                    { value: 'antd' },
	                    '组件库图标'
	                  )
	                ),
	                _react2['default'].createElement(
	                  'section',
	                  { className: 'product-ico-C', style: { display: this.state.iconModalVisible ? 'block' : 'none' } },
	                  _react2['default'].createElement(
	                    'section',
	                    { className: 'product-ico-header' },
	                    _react2['default'].createElement(
	                      'div',
	                      null,
	                      '添加产品图标'
	                    ),
	                    _react2['default'].createElement(
	                      'div',
	                      { onClick: function () {
	                          _this.setState({ iconModalVisible: false });
	                        } },
	                      _react2['default'].createElement(
	                        'span',
	                        null,
	                        '×'
	                      )
	                    )
	                  ),
	                  _react2['default'].createElement(
	                    'section',
	                    { className: 'product-ico-list' },
	                    this.state.currentIconType === 'zmiti' && _react2['default'].createElement(
	                      'div',
	                      null,
	                      _react2['default'].createElement(
	                        'ul',
	                        { onClick: this.changeIcon.bind(this) },
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-money-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-msg-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-usergroup-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-user-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement('img', { draggable: 'false', src: '../public/images/lt-company-ico.png' })
	                        )
	                      )
	                    ),
	                    this.state.currentIconType === 'antd' && _react2['default'].createElement(
	                      'div',
	                      null,
	                      _react2['default'].createElement(
	                        'ul',
	                        { onClick: this.changeIcon.bind(this) },
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'lock' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'unlock' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'android' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'apple' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'apple-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'area-chart' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'pie-chart' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'bar-chart' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'dot-chart' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'bars' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'book' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'calendar' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'cloud' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'cloud-download' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'code' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'code-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'copy' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'credit-card' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'desktop' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'edit' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'ellipsis' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'file' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'appstore-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'picture' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'shopping-cart' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'star-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'star' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'hearr-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'camera' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'camera-o' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'team' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'solution' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'customer-service' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'switcher' })
	                        ),
	                        _react2['default'].createElement(
	                          'li',
	                          null,
	                          _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'rocket' })
	                        )
	                      )
	                    )
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品费用'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(_commoncomponentCommonJsx.Input, { ref: 'product-cost', addonAfter: '￥/月', value: this.state.productPrice, onChange: function (e) {
	                    _this.setState({ productPrice: e.target.value });
	                  } })
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    _react2['default'].createElement(
	                      'span',
	                      { style: { color: 'red', marginRight: 4 } },
	                      '*'
	                    ),
	                    '产品地址'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement(_commoncomponentCommonJsx.Input, { ref: 'product-path', value: this.state.productLink, onChange: function (e) {
	                    _this.setState({ productLink: e.target.value });
	                  }, placeholder: '产品存放的项目地址，由超级管理员填写' })
	              ),
	              _react2['default'].createElement(
	                FormItem,
	                _extends({}, formItemLayout, {
	                  label: _react2['default'].createElement(
	                    'span',
	                    null,
	                    '产品说明'
	                  ),
	                  hasFeedback: true
	                }),
	                _react2['default'].createElement('textarea', { ref: 'product-remark', value: this.state.productRemark, style: { width: '100%' }, onChange: function (e) {
	                    _this.setState({ productRemark: e.target.value });
	                  }, placeholder: '产品说明' })
	              )
	            )
	          )
	        )
	      );
	      return _react2['default'].createElement(_componentsMainJsx2['default'], { component: component });
	    }
	  }, {
	    key: 'delProduct',
	    value: function delProduct(id) {
	      ///删除产品

	      var s = this;

	      this.setState({
	        loading: true,
	        tip: '正在删除数据...'
	      });
	      $.ajax({
	        url: window.baseUrl + 'product/del_product/',
	        data: {
	          userid: s.userid,
	          getusersigid: s.getusersigid,
	          productids: id
	        },
	        success: function success(data) {
	          _commoncomponentCommonJsx.message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
	          if (data.getret === 0) {
	            s.loadData();
	          }
	          s.setState({
	            loading: false
	          });
	        }
	      });
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var _this2 = this;

	      this.getProductList({ s: this, fn: function fn(data) {

	          _this2.state.productlist = data.productlist;
	          _this2.state.productlist.forEach(function (item, i) {
	            item.key = i + 1;
	          });
	          _this2.state.loading = false;
	          _this2.forceUpdate();
	        } });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.loadData();
	    }
	  }, {
	    key: 'changeExpireDate',
	    value: function changeExpireDate(value) {

	      this.setState({ expireDate: value.format('YYYY-MM-DD') });
	    }
	  }, {
	    key: 'changeIcon',
	    value: function changeIcon(e) {
	      //选择当前产品图标。
	      switch (this.state.currentIconType) {
	        case 'zmiti':
	          var src = e.target.src || e.target.children[0].src;
	          if (!src) {
	            return;
	          }
	          this.setState({
	            currentIcon: src
	          });
	          break;
	        case 'antd':
	          if (e.target.nodeName === 'I') {
	            var icon = e.target.className.split(' ')[1].substring(8);
	          } else {
	            var icon = e.target.children[0].className.split(' ')[1].substring(8);
	          }
	          console.log(icon);
	          this.setState({
	            currentIcon: icon
	          });
	          // console.log(e.target);
	          break;
	      }
	    }
	  }, {
	    key: 'addProduct',
	    value: function addProduct() {
	      //添加产品

	      //this.state.currentIcon :localhost:3000/public/images/ic.png
	      var src = '';
	      if (this.state.currentIconType === 'zmiti') {
	        if (this.state.currentIcon.split('//').length > 1) {
	          src = this.state.currentIcon.split('//')[1];
	        } else {
	          src = this.state.currentIcon.split('//')[0];
	        }
	        src = src.split('/');
	        src.shift();
	        if (src.indexOf('/main/') <= -1) {
	          src = '/main/' + src.join('/');
	        } else {
	          src = src.join('/');
	        }
	      } else {
	        src = this.state.currentIcon;
	      }
	      var s = this;
	      var params = {
	        producturl: this.state.productLink,
	        productname: this.state.productName,
	        outline: this.state.productShortName,
	        icontype: this.state.currentIconType === 'antd',
	        producticon: src,
	        producttype: this.state.productType,
	        endtime: this.state.expireDate,
	        price: this.state.productPrice,
	        bookingmonthnum: 1, //按月算。
	        description: this.state.productRemark,
	        userid: this.userid,
	        getusersigid: this.getusersigid
	      };

	      if (this.currentId !== -1) {
	        //编辑
	        this.setState({
	          loading: true,
	          tip: '正在修改数据...'
	        });
	        params.productid = this.currentId;
	        $.ajax({
	          type: 'POST',
	          url: window.baseUrl + '/product/edit_product/',
	          data: params,
	          success: function success(data) {
	            _commoncomponentCommonJsx.message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
	            s.setState({
	              visible: false,
	              loading: false
	            });
	            s.loadData();
	          }
	        });
	      } else {
	        s.setState({
	          loading: true,
	          tip: '正在添加数据...'
	        });
	        $.ajax({
	          type: 'POST',
	          url: window.baseUrl + '/product/add_product/',
	          data: params,
	          success: function success(data) {
	            _commoncomponentCommonJsx.message[data.getret === 0 ? 'success' : 'error'](data.getmsg);
	            s.setState({
	              visible: false,
	              loading: false
	            });
	            s.loadData();
	          }
	        });
	      }
	    }
	  }, {
	    key: 'onChangeIcon',
	    value: function onChangeIcon(e) {
	      //切换图标
	      switch (e.target.value) {
	        case 'zmiti':
	          this.setState({
	            currentIcon: this.state.defaultZmitiIcon
	          });
	          break;
	        case 'antd':
	          this.setState({
	            currentIcon: this.state.defaultAntdIcon
	          });
	          break;
	      }
	      this.setState({
	        currentIconType: e.target.value,
	        iconModalVisible: true
	      });
	    }
	  }]);

	  return ZmitiProductApp;
	})(_react2['default'].Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiProductApp);
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(789);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\r\n.product-header {\r\n  width: 100%;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  position: relative; }\r\n  .product-header .ant-btn {\r\n    position: absolute;\r\n    right: 4vw;\r\n    bottom: 0; }\r\n\r\n.product-ico-C {\r\n  position: absolute;\r\n  width: 300px;\r\n  height: 300px;\r\n  background: #fff;\r\n  z-index: 102;\r\n  border: 1px solid #818181;\r\n  box-sizing: border-box;\r\n  border-radius: 6px; }\r\n  .product-ico-C .product-ico-header {\r\n    width: 100%;\r\n    height: 30px;\r\n    line-height: 30px;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    display: -webkit-flex;\r\n    -ms-flex-flow: row;\r\n        flex-flow: row;\r\n    background: #818181;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px; }\r\n    .product-ico-C .product-ico-header div {\r\n      width: 50%;\r\n      color: #fff;\r\n      margin-left: 10px; }\r\n      .product-ico-C .product-ico-header div:nth-of-type(2) {\r\n        text-align: right;\r\n        margin-right: 10px;\r\n        font-size: 20px; }\r\n        .product-ico-C .product-ico-header div:nth-of-type(2) span {\r\n          cursor: pointer;\r\n          padding: 0 5px; }\r\n  .product-ico-C .product-ico-list {\r\n    width: 100%; }\r\n    .product-ico-C .product-ico-list ul {\r\n      display: -webkit-box;\r\n      display: -ms-flexbox;\r\n      display: flex;\r\n      display: -webkit-flex;\r\n      -ms-flex-flow: row;\r\n          flex-flow: row;\r\n      -ms-flex-wrap: wrap;\r\n          flex-wrap: wrap;\r\n      margin: 10px auto; }\r\n      .product-ico-C .product-ico-list ul li {\r\n        width: 30px;\r\n        margin: 0 3px 0 4px;\r\n        text-align: center;\r\n        cursor: pointer;\r\n        box-sizing: border-box; }\r\n        .product-ico-C .product-ico-list ul li img {\r\n          width: 20px; }\r\n\r\n.product-menu-ico {\r\n  position: absolute;\r\n  left: 200px;\r\n  top: 8px; }\r\n\r\n.product-antd-ico {\r\n  top: 0; }\r\n\r\n.product-main-ui .lt-del {\r\n  background: #f81828;\r\n  border-color: #f81828; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(791);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiOrderList = (function (_Component) {
		_inherits(ZmitiOrderList, _Component);

		function ZmitiOrderList(props) {
			_classCallCheck(this, ZmitiOrderList);

			_get(Object.getPrototypeOf(ZmitiOrderList.prototype), 'constructor', this).call(this, props);

			this.state = {
				orderList: [],
				columns: []
			};
		}

		_createClass(ZmitiOrderList, [{
			key: 'render',
			value: function render() {
				var _this = this;

				return _react2['default'].createElement(
					'section',
					{ className: 'order-main-ui', style: { height: this.props.mainHeight } },
					this.props.columns.map(function (col, i) {
						if (i === 0) {
							return _react2['default'].createElement(
								'section',
								{ key: i, className: 'user-list-section' },
								_react2['default'].createElement(_commoncomponentCommonJsx.Table, { bordered: true,
									onRowClick: function (record, index, i) {
										_this.props.getProductDetail(record, index, i);
									},
									dataSource: _this.props.orderList, columns: col }),
								'}'
							);
						}
					})
				);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}]);

		return ZmitiOrderList;
	})(_react.Component);

	exports['default'] = ZmitiOrderList;

	ZmitiOrderList.defaultProps = {};
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "order.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(792);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/.0.23.1@css-loader/index.js!./order-list.css", function() {
				var newContent = require("!!../../../node_modules/.0.23.1@css-loader/index.js!./order-list.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\r\n.order-main-ui table {\r\n  margin-top: 20px; }\r\n  .order-main-ui table td, .order-main-ui table th {\r\n    text-align: center !important; }\r\n  .order-main-ui table a {\r\n    color: #06C; }\r\n\r\n/*# sourceMappingURL=order-list.css.map */", ""]);

	// exports


/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(794);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiWorkOrderApp = (function (_Component) {
		_inherits(ZmitiWorkOrderApp, _Component);

		function ZmitiWorkOrderApp(props) {
			_classCallCheck(this, ZmitiWorkOrderApp);

			_get(Object.getPrototypeOf(ZmitiWorkOrderApp.prototype), 'constructor', this).call(this, props);

			this.state = {
				current: 0,
				mainHeight: document.documentElement.clientHeight - 50,
				userList: []
			};

			this.condition = 0;
		}

		_createClass(ZmitiWorkOrderApp, [{
			key: 'render',
			value: function render() {
				var _this = this;

				var columns = [{
					title: '序号',
					dataIndex: 'key',
					key: 'xx'
				}, {
					title: "工单号",
					dataIndex: 'workorderid',
					key: 'workorderid'
				}, {
					title: '用户名',
					dataIndex: 'username',
					key: 'username'
				}, {
					title: '工单标题',
					dataIndex: 'title',
					key: 'title'
				}, {
					title: '工单内容',
					dataIndex: 'content',
					key: 'content'
				}, {
					title: '处理人',
					dataIndex: 'adminname',
					key: 'adminname'
				}, {
					title: '工单类型',
					dataIndex: 'workordertype',
					key: 'workordertype'
				}, {
					title: '工单状态',
					dataIndex: 'status',
					key: 'status'
				}, {
					title: '创建时间',
					dataIndex: 'createtime',
					key: 'createtime',
					sorter: function sorter(a, b) {
						return a.key - b.key;
					}
				}, {
					title: '修改时间',
					dataIndex: 'operatime',
					key: 'operatime'
				}];
				var columns1 = columns.concat({
					title: '操作',
					width: '20%',
					dataIndex: '', key: 'x',
					render: function render(text, record) {
						return _react2['default'].createElement(
							'div',
							{ 'data-userid': record.userid },
							_react2['default'].createElement(
								'a',
								{ href: 'javascript:void(0)' },
								'审核通过'
							),
							'    ',
							_react2['default'].createElement(
								'a',
								{ href: 'javascript:void(0)' },
								'审核不通过'
							)
						);
					} });
				var columns2 = columns.concat({
					title: '状态',
					dataIndex: '', key: 'x',
					render: function render(text, record) {
						return _react2['default'].createElement(
							'div',
							{ 'data-userid': record.userid },
							_react2['default'].createElement(
								'a',
								{ href: 'javascript:void(0)' },
								'审核已通过'
							)
						);
					} });

				var columns3 = columns.concat({
					title: '状态',
					dataIndex: '', key: 'x',
					render: function render(text, record) {
						return _react2['default'].createElement(
							'div',
							{ 'data-userid': record.userid },
							_react2['default'].createElement(
								'a',
								{ href: 'javascript:void(0)' },
								'审核未通过'
							)
						);
					} });
				var title = this.props.params.title;
				var props = {
					userList: this.state.userList,
					columns: [columns1, columns2, columns3],
					changeAccount: this.changeAccount,
					mainHeight: this.state.mainHeight,
					tags: ['待处理', '已反馈', '已处理', '已关闭'],
					type: 'workorder',
					title: title,
					keyDown: function keyDown(value) {
						clearTimeout(_this.keyupTimer);
						_this.defautlUserList === undefined && (_this.defautlUserList = _this.state.userList.concat([]));
						_this.keyupTimer = setTimeout(function () {
							var userlists = _this.defautlUserList;
							var condition = 'workorderid';
							_this.state.userList = userlists.filter(function (user) {
								switch (_this.condition * 1) {
									case 0:
										//提问内容
										condition = 'workorderid';
										break;
									case 1:
										//类型
										condition = 'username';
										break;
								}

								return user[condition].indexOf(value) > -1;
							});

							_this.forceUpdate(function () {});
						}, 350);
					},
					selectComponent: _react2['default'].createElement(
						_commoncomponentCommonJsx.Select,
						{ placeholder: '工单号', onChange: function (e) {
								_this.condition = e;
							}, style: { width: 120 }, size: 'small' },
						_react2['default'].createElement(
							Option,
							{ value: '0' },
							'工单号'
						),
						_react2['default'].createElement(
							Option,
							{ value: '1' },
							'用户名'
						)
					)

				};

				console.log(props.userList);

				//console.log(this.state.mainHeight);
				return _react2['default'].createElement(_componentsMainJsx2['default'], { component: _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props) });
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _props = this.props;
				var resizeMainHeight = _props.resizeMainHeight;
				var validateUser = _props.validateUser;
				var loginOut = _props.loginOut;
				var resizeLeftMenu = _props.resizeLeftMenu;

				validateUser(function () {
					loginOut(undefined, undefined, false);
				}, this);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				/*  var {userid,getusersigid} = this.props.params;
	     this.getusersigid = this.getusersigid = getusersigid;
	       this.userid =userid;
	       this.baseUrl = window.baseUrl;*/

				var _props2 = this.props;
				var resizeMainHeight = _props2.resizeMainHeight;
				var validateUser = _props2.validateUser;
				var loginOut = _props2.loginOut;
				var resizeLeftMenu = _props2.resizeLeftMenu;

				resizeMainHeight(this, 'setAdminHeight');

				var params = {
					getusersigid: this.getusersigid,
					userid: this.userid,
					setisadmin: 1
				};
				var s = this;

				$.ajax({
					type: "POST",
					url: window.baseUrl + "/user/get_workorder/",
					data: params,
					success: function success(data) {
						console.log(data);

						if (data.getret === 0) {

							s.setState({
								userList: data.workorderinfo
							});
						} else if (data.getret === -3) {
							_commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
							setTimeout(function () {
								location.href = '/';
							}, 2000);
						} else {
							loginOut(data.getmsg, window.loginUrl, false);
						}
					}

				});
			}
		}]);

		return ZmitiWorkOrderApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiWorkOrderApp);

	/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(795);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(797);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var Step = _commoncomponentCommonJsx.Steps.Step;
	var Header = _commoncomponentCommonJsx.Layout.Header;
	var Content = _commoncomponentCommonJsx.Layout.Content;

	var ZmitiEditOrderApp = (function (_Component) {
	    _inherits(ZmitiEditOrderApp, _Component);

	    function ZmitiEditOrderApp(props) {
	        _classCallCheck(this, ZmitiEditOrderApp);

	        _get(Object.getPrototypeOf(ZmitiEditOrderApp.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            current: 0,
	            mainHeight: document.documentElement.clientHeight - 50,
	            uploadData: [],
	            workorderid: "",
	            content: "",
	            createtime: "",
	            status: "",
	            workordertype: "",
	            workordername: "",
	            totalminu: "",
	            statusName: "",
	            getTimestr: "",
	            usericon: "",
	            questionContent: "",
	            isHidden: false,
	            orderoperation: "",
	            workeorderinfo: [],
	            setuserid: '',
	            customername: ''
	        };

	        this.condition = 0;
	    }

	    _createClass(ZmitiEditOrderApp, [{
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var title = '工单管理';
	            var props = {
	                userid: this.userid,
	                changeAccount: this.changeAccount,
	                mainHeight: this.state.mainHeight,
	                tags: ['处理中', '已处理'],
	                type: 'vieworder',
	                title: title,
	                selectedIndex: 0,
	                rightType: "custom",
	                customRightComponent: _react2['default'].createElement(
	                    'div',
	                    { className: 'zmiti-vieworder-main-ui' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'pad-10' },
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Row,
	                            { className: 'zmiti-vieworder-header' },
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Col,
	                                { span: 8, className: 'zmiti-vieworder-header-inner' },
	                                '工单详情'
	                            ),
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Col,
	                                { span: 8, offset: 8, className: 'zmiti-workorder-button-right' },
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Button,
	                                    { type: 'primary', onClick: this.changeAccount.bind(this, 0) },
	                                    '返回列表'
	                                )
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'zmiti-workorder-line' }),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Steps,
	                            { current: this.state.status * 1 },
	                            _react2['default'].createElement(Step, { title: '已受理', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'user' }) }),
	                            _react2['default'].createElement(Step, { title: '已处理', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'solution' }) }),
	                            _react2['default'].createElement(Step, { title: '已确认', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'save' }) }),
	                            _react2['default'].createElement(Step, { title: '已评价', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'smile-o' }) })
	                        ),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'view-questionInfo' },
	                            _react2['default'].createElement(
	                                'div',
	                                { className: 'gutter-example' },
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Row,
	                                    null,
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 24 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '问题标题：'
	                                        ),
	                                        this.state.content
	                                    )
	                                ),
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Row,
	                                    null,
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '工单编号：'
	                                        ),
	                                        this.state.workorderid
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '提交时间：'
	                                        ),
	                                        this.state.createtime
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            ' 状态：'
	                                        ),
	                                        this.state.statusName
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'div',
	                                            { className: 'text-right' },
	                                            _react2['default'].createElement(
	                                                'a',
	                                                { href: 'javasctip:void(0);', onClick: this.getorderoperation.bind(this) },
	                                                this.state.orderoperation
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Layout,
	                            { className: 'workorder-table' },
	                            _react2['default'].createElement(
	                                Header,
	                                null,
	                                this.state.getworkordername
	                            ),
	                            _react2['default'].createElement(
	                                Content,
	                                null,
	                                _react2['default'].createElement(
	                                    'div',
	                                    { className: 'view-questionPane' },
	                                    _react2['default'].createElement(
	                                        'div',
	                                        { className: 'view-questionLists' },
	                                        _react2['default'].createElement(
	                                            'ul',
	                                            null,
	                                            _react2['default'].createElement(
	                                                'li',
	                                                null,
	                                                _react2['default'].createElement(
	                                                    'div',
	                                                    { className: 'view-faceIco' },
	                                                    _react2['default'].createElement('img', { src: this.state.usericon })
	                                                ),
	                                                _react2['default'].createElement(
	                                                    'div',
	                                                    { className: 'view-Infor' },
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        this.state.customername
	                                                    ),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        '问题描述：',
	                                                        this.state.content
	                                                    ),
	                                                    _react2['default'].createElement('div', null),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        this.state.createtime
	                                                    )
	                                                )
	                                            ),
	                                            this.state.workeorderinfo.map(function (item, i) {

	                                                return _react2['default'].createElement(
	                                                    'li',
	                                                    { key: i, className: item.workordertype === 0 && 'messageDiv' },
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        { className: 'view-faceIco' },
	                                                        item.workordertype === 0 && _react2['default'].createElement('img', { src: './static/images/notify.jpg' }),
	                                                        item.workordertype === 1 && _react2['default'].createElement('img', { src: _this.state.usericon })
	                                                    ),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        { className: 'view-Infor' },
	                                                        item.workordertype === 0 && '管理员回复：',
	                                                        item.workordertype === 1 && _this.state.customername,
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            item.content
	                                                        ),
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            '时间：',
	                                                            item.operatime
	                                                        ),
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            item.attachment && item.attachment.split(',').map(function (atta, i) {
	                                                                return _react2['default'].createElement(
	                                                                    'a',
	                                                                    { key: i, href: atta, title: atta },
	                                                                    ' ',
	                                                                    '点击下载'
	                                                                );
	                                                            })
	                                                        )
	                                                    )
	                                                );
	                                            })
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Layout,
	                            { className: 'workorder-table ' },
	                            _react2['default'].createElement(
	                                Header,
	                                null,
	                                '回复'
	                            ),
	                            _react2['default'].createElement(
	                                Content,
	                                null,
	                                _react2['default'].createElement(
	                                    'div',
	                                    { className: 'view-questionPane' },
	                                    _react2['default'].createElement(
	                                        'div',
	                                        { className: 'view-questionForm' },
	                                        _react2['default'].createElement(
	                                            _commoncomponentCommonJsx.Form,
	                                            null,
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Input, { type: 'textarea', placeholder: '此处限定5000字符', onFocus: function () {
	                                                    _this.setState({ questionError: false });
	                                                }, className: "workorderquestion-inputContent " + (this.state.submitWorkorder ? 'error-table' : ''), value: this.state.questionContent, onChange: function (e) {
	                                                    _this.setState({ questionContent: e.target.value });
	                                                } }),
	                                            _react2['default'].createElement('div', { className: 'hr10' }),
	                                            _react2['default'].createElement(
	                                                'p',
	                                                null,
	                                                _react2['default'].createElement(
	                                                    _commoncomponentCommonJsx.Button,
	                                                    {
	                                                        type: 'primary',
	                                                        htmlType: 'submit',
	                                                        onClick: this.submitWorkorder.bind(this)
	                                                    },
	                                                    '提交'
	                                                )
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )

	            };

	            //console.log(this.state.mainHeight);
	            var mainComponent = _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props);

	            return _react2['default'].createElement(_componentsMainJsx2['default'], { component: mainComponent });
	        }
	    }, {
	        key: 'changeAccount',
	        value: function changeAccount(i) {

	            window.location.hash = '#/listorder/工单管理';
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;
	            var resizeLeftMenu = _props.resizeLeftMenu;

	            validateUser(function () {
	                loginOut(undefined, undefined, false);
	            }, this);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //*获取指定工单的所有信息
	            var workorderid = this.props.params.id;

	            var s = this;
	            $.ajax({
	                url: window.baseUrl + 'user/view_workorder',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    setworkorderid: workorderid
	                },
	                success: function success(data) {

	                    if (data.getret === 0) {
	                        s.state.workorderid = data.workinfo.workorderid;
	                        s.state.content = data.workinfo.content;
	                        s.state.createtime = data.workinfo.createtime;
	                        s.state.status = data.workinfo.status;
	                        s.state.totalminu = data.workinfo.totalminu;
	                        s.filterStatus();
	                        s.state.workordertype = data.workinfo.workordertype;
	                        s.state.operauser = data.workinfo.userid;
	                        s.getuserinfo(data.workinfo.userid); //工單用戶信息
	                        s.getworkordername();
	                        s.forceUpdate();
	                    }
	                }

	            });
	            s.getworkorderlist();
	        }

	        //获取用户信息
	    }, {
	        key: 'getuserinfo',
	        value: function getuserinfo(inputValue) {
	            var s = this;

	            $.ajax({
	                url: window.baseUrl + 'user/get_userdetails/',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    isonly: 1,
	                    setuserid: inputValue
	                },
	                success: function success(data) {
	                    if (data.getret === 0) {
	                        s.state.customername = data.getuserinfo.customername; //名称
	                        s.state.usericon = data.getuserinfo.usericon; //头像
	                        s.forceUpdate();
	                    } else if (data.getret === -3) {
	                        _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                        setTimeout(function () {
	                            location.href = '/';
	                        }, 2000);
	                    } else {
	                        loginOut(data.getmsg, window.loginUrl, false);
	                    }
	                }
	            });
	            return inputValue;
	        }

	        //获取工单详细列表（本次工单的所有对话）
	    }, {
	        key: 'getworkorderlist',
	        value: function getworkorderlist() {
	            var s = this;
	            $.ajax({
	                url: window.baseUrl + 'user/view_workorder',
	                data: {
	                    userid: s.userid,
	                    userusername: s.userusername,
	                    getusersigid: s.getusersigid,
	                    setworkorderid: s.props.params.id
	                },
	                success: function success(data) {
	                    //console.log(data)
	                    if (data.getret === 0) {
	                        //data.workinfo.operainfo[0].key = s.props.randomString(8);
	                        s.state.workeorderinfo = data.workinfo.operainfo;
	                        console.log(s.state.workeorderinfo, "工单列表");
	                        s.forceUpdate();
	                    }
	                    /* else if(data.getret === -3){
	                         message.error('您没有访问的权限,2秒后跳转到首页');
	                         setTimeout(()=>{
	                             location.href='/';
	                         },2000)
	                     }
	                     else{
	                         loginOut(data.getmsg,window.loginUrl,false);
	                     }*/
	                }

	            });
	        }

	        //获取工单类型名称
	    }, {
	        key: 'getworkordername',
	        value: function getworkordername() {
	            var s = this;
	            switch (s.state.workordertype) {
	                case 0:
	                    s.state.getworkordername = "财务类工单问题";
	                    break;
	                case 1:
	                    s.state.getworkordername = "会员帐号类工单问题";
	                    break;
	                case 2:
	                    s.state.getworkordername = "定制服务类工单帐号问题";
	                    break;
	                case 3:
	                    s.state.getworkordername = "产品技术类工单问题";

	                    break;
	                case 4:
	                    s.state.getworkordername = "其它类工单问题";

	                    break;
	            }
	        }

	        //获取工单状态
	    }, {
	        key: 'filterStatus',
	        value: function filterStatus() {
	            var s = this;
	            switch (s.state.status) {
	                case 0:
	                    s.state.statusName = "已受理";
	                    s.state.orderoperation = "关闭工单";
	                    break;
	                case 1:
	                    s.state.statusName = "已处理";
	                    s.state.orderoperation = "关闭工单";
	                    break;
	                case 2:
	                    s.state.statusName = "已确认";
	                    s.state.getTimestr = "总计花时：" + s.state.totalminu + "分钟!";
	                    s.setState({
	                        isHidden: true
	                    });
	                    s.state.orderoperation = "删除工单";
	                    break;
	                case 3:
	                    s.state.statusName = "已评价";
	                    s.state.getTimestr = "总计花时：" + s.state.totalminu + "分钟!";
	                    s.setState({
	                        isHidden: true
	                    });
	                    s.state.orderoperation = "删除工单";
	                    break;
	                case 4:
	                    s.state.statusName = _react2['default'].createElement(
	                        'span',
	                        { className: 'red' },
	                        '请您反馈'
	                    );
	                    s.state.getTimestr = "总计花时：" + s.state.totalminu + "分钟!";
	                    s.setState({
	                        isHidden: true
	                    });
	                    s.state.orderoperation = "关闭工单";
	                    break;
	            }

	            // s.forceUpdate();
	        }

	        //操作工单状态
	    }, {
	        key: 'getorderoperation',
	        value: function getorderoperation() {
	            var s = this;
	            if (s.state.orderoperation == "关闭工单") {
	                $.ajax({
	                    url: window.baseUrl + 'user/close_workorder/',
	                    data: {
	                        userid: s.userid,
	                        getusersigid: s.getusersigid,
	                        setworkorderid: s.state.workorderid
	                    },
	                    success: function success(data) {
	                        if (data.getret === 0) {
	                            _commoncomponentCommonJsx.message.success("关闭工单成功");
	                            s.state.orderoperation = "删除工单";
	                            s.setState({
	                                isHidden: true
	                            });
	                            s.forceUpdate();
	                        } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data.getmsg);
	                        }
	                    }
	                });
	            }
	            if (s.state.orderoperation == "删除工单") {
	                $.ajax({

	                    url: window.baseUrl + 'user/del_workorder/',

	                    data: {
	                        userid: s.userid,
	                        getusersigid: s.getusersigid,
	                        setworkorderid: s.state.workorderid

	                    },
	                    success: function success(data) {
	                        if (data.getret === 0) {
	                            _commoncomponentCommonJsx.message.success("删除工单成功");
	                            setTimeout(function () {
	                                window.location.hash = 'listorder/';
	                            }, 2000);
	                        } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data.getmsg);
	                        }
	                    }
	                });
	            }
	        }

	        //追加工单问题
	    }, {
	        key: 'submitWorkorder',
	        value: function submitWorkorder() {
	            var s = this;
	            var isOk = 0;

	            if (s.state.questionContent == "") {
	                s.setState({
	                    questionError: true
	                });
	                isOk = 1;
	            }
	            if (isOk != 0) {
	                return;
	            } else {
	                //判断是否有附件

	                var attachment;
	                if (s.state.uploadData.length > 0) {
	                    attachment = s.state.uploadData[0].datainfourl;
	                    for (var i = 1; i < s.state.uploadData.length; i++) {
	                        attachment = attachment + "," + s.state.uploadData[i].datainfourl;
	                    }
	                }

	                //附件结束
	                $.ajax({
	                    url: window.baseUrl + 'user/opera_workorder',

	                    data: {
	                        userid: s.userid,
	                        getusersigid: s.getusersigid,
	                        setworkorderid: s.state.workorderid,
	                        setcontent: s.state.questionContent,
	                        setattachment: attachment,
	                        setoperatype: 0
	                    },
	                    success: function success(data) {
	                        if (data.getret === 0) {
	                            _commoncomponentCommonJsx.message.success("您已成功回复工单，我们会尽快处理");
	                            setTimeout(function () {
	                                location.hash = 'listorder/工单管理' + s.state.workorderid;
	                            }, 2000);
	                        } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data.getmsg);
	                        }
	                    }
	                });
	            }
	        }
	    }]);

	    return ZmitiEditOrderApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiEditOrderApp);

	/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];
	/*atta.split('/').pop()*/ //判断是否有附件

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(798);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nul, ol, li {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0; }\r\n\r\n.hr10, .hr15 {\r\n  clear: both;\r\n  line-height: 0;\r\n  font-size: 0; }\r\n\r\n.hr10 {\r\n  height: 10px; }\r\n\r\n.hr15 {\r\n  height: 15px; }\r\n\r\n.pad-5 {\r\n  padding: 5px; }\r\n\r\n.pad-10 {\r\n  padding: 10px; }\r\n\r\n.pad-15 {\r\n  padding: 15px; }\r\n\r\n.pad-20 {\r\n  padding: 20px; }\r\n\r\n.zmiti-vieworder-main-ui {\r\n  font-size: 12px;\r\n  overflow: auto; }\r\n  .zmiti-vieworder-main-ui .zmiti-vieworder-header-inner {\r\n    padding-left: 8px;\r\n    margin-top: 10px;\r\n    position: relative; }\r\n    .zmiti-vieworder-main-ui .zmiti-vieworder-header-inner:before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 2px;\r\n      height: 100%;\r\n      background: #88B7E0;\r\n      left: 0;\r\n      -webkit-transform: scale(1, 0.7);\r\n      transform: scale(1, 0.7); }\r\n  .zmiti-vieworder-main-ui .zmiti-workorder-button-right button {\r\n    float: right;\r\n    margin-top: 5px; }\r\n  .zmiti-vieworder-main-ui .zmiti-workorder-line {\r\n    height: 15px;\r\n    overflow: hidden;\r\n    border-bottom: 1px solid #dddddd; }\r\n  .zmiti-vieworder-main-ui .workorder-table {\r\n    border: 1px solid #e1e6eb;\r\n    margin-top: 15px;\r\n    background: #FFffff; }\r\n    .zmiti-vieworder-main-ui .workorder-table .ant-layout-header {\r\n      background: #F5f6FA;\r\n      border-left: 4px solid #6d7781;\r\n      padding-left: 16px;\r\n      height: 38px;\r\n      line-height: 38px;\r\n      overflow: hidden;\r\n      border-bottom: 1px solid #e1e6eb; }\r\n  .zmiti-vieworder-main-ui .questionTitle {\r\n    color: #999; }\r\n  .zmiti-vieworder-main-ui .red {\r\n    color: red; }\r\n  .zmiti-vieworder-main-ui .error-table {\r\n    border: 1px solid red;\r\n    color: red; }\r\n  .zmiti-vieworder-main-ui .workorderquestion-inputContent {\r\n    height: 100px; }\r\n\r\n.text-right {\r\n  text-align: right; }\r\n\r\n.view-questionInfo {\r\n  background-color: #efefef;\r\n  padding: 10px; }\r\n\r\n.gutter-example {\r\n  color: #000;\r\n  line-height: 2; }\r\n  .gutter-example span {\r\n    color: #666; }\r\n\r\n.view-titPane {\r\n  background-color: #efefef;\r\n  border-left: 5px #999 solid;\r\n  border-top: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  line-height: 2;\r\n  padding-left: 10px;\r\n  color: #333; }\r\n\r\n.view-questionLists {\r\n  border-left: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  padding: 0 15px 15px 15px;\r\n  margin: 0; }\r\n  .view-questionLists ul {\r\n    width: 100%;\r\n    overflow: hidden; }\r\n  .view-questionLists li {\r\n    padding: 10px 0 10px 70px;\r\n    min-height: 70px;\r\n    position: relative;\r\n    margin: 0;\r\n    border-bottom: 1px #ccc dashed;\r\n    color: #666;\r\n    width: 100%; }\r\n  .view-questionLists li:last-child {\r\n    border-bottom: none; }\r\n  .view-questionLists li.messageDiv {\r\n    color: #000;\r\n    padding-left: 10px; }\r\n    .view-questionLists li.messageDiv .view-faceIco {\r\n      display: none; }\r\n  .view-questionLists li.questionFinish {\r\n    background-color: #eafbff; }\r\n\r\n.view-faceIco {\r\n  position: absolute;\r\n  left: 10px;\r\n  top: 10px; }\r\n  .view-faceIco img {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%; }\r\n\r\n.view-questionForm {\r\n  border-left: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  padding: 10px 15px;\r\n  margin: 0; }\r\n  .view-questionForm form {\r\n    width: 100%; }\r\n  .view-questionForm .view-tit-label {\r\n    line-height: 24px; }\r\n  .view-questionForm textarea {\r\n    outline: none;\r\n    resize: none;\r\n    border-color: #d9d9d9; }\r\n  .view-questionForm p {\r\n    margin: 10px 0; }\r\n\r\n/*# sourceMappingURL=index.css.map */\r\n", ""]);

	// exports


/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(800);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var Step = _commoncomponentCommonJsx.Steps.Step;
	var Header = _commoncomponentCommonJsx.Layout.Header;
	var Content = _commoncomponentCommonJsx.Layout.Content;

	var ZmitiViewOrderApp = (function (_Component) {
	    _inherits(ZmitiViewOrderApp, _Component);

	    function ZmitiViewOrderApp(props) {
	        _classCallCheck(this, ZmitiViewOrderApp);

	        _get(Object.getPrototypeOf(ZmitiViewOrderApp.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            current: 0,
	            mainHeight: document.documentElement.clientHeight - 50,
	            uploadData: [],
	            workorderid: "",
	            content: "",
	            createtime: "",
	            status: "",
	            workordertype: "",
	            workordername: "",
	            totalminu: "",
	            statusName: "",
	            getTimestr: "",
	            usericon: "",
	            questionContent: "",
	            isHidden: false,
	            orderoperation: "",
	            workeorderinfo: [],
	            setuserid: '',
	            customername: ''
	        };

	        this.condition = 0;
	    }

	    _createClass(ZmitiViewOrderApp, [{
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var title = '工单管理';
	            var props = {
	                userid: this.userid,
	                changeAccount: this.changeAccount,
	                mainHeight: this.state.mainHeight,
	                tags: ['处理中', '已处理'],
	                type: 'vieworder',
	                title: title,
	                selectedIndex: 1,
	                rightType: "custom",
	                customRightComponent: _react2['default'].createElement(
	                    'div',
	                    { className: 'zmiti-vieworder-main-ui' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'pad-10' },
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Row,
	                            { className: 'zmiti-vieworder-header' },
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Col,
	                                { span: 8, className: 'zmiti-vieworder-header-inner' },
	                                '工单详情'
	                            ),
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Col,
	                                { span: 8, offset: 8, className: 'zmiti-workorder-button-right' },
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Button,
	                                    { type: 'primary', onClick: this.changeAccount.bind(this, 1) },
	                                    '返回列表'
	                                )
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'zmiti-workorder-line' }),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Steps,
	                            { current: this.state.status * 1 },
	                            _react2['default'].createElement(Step, { title: '已受理', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'user' }) }),
	                            _react2['default'].createElement(Step, { title: '已处理', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'solution' }) }),
	                            _react2['default'].createElement(Step, { title: '已确认', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'save' }) }),
	                            _react2['default'].createElement(Step, { title: '已评价', icon: _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'smile-o' }) })
	                        ),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'view-questionInfo' },
	                            _react2['default'].createElement(
	                                'div',
	                                { className: 'gutter-example' },
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Row,
	                                    null,
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 24 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '问题描述：'
	                                        ),
	                                        this.state.content
	                                    )
	                                ),
	                                _react2['default'].createElement(
	                                    _commoncomponentCommonJsx.Row,
	                                    null,
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '工单编号：'
	                                        ),
	                                        this.state.workorderid
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            '提交时间：'
	                                        ),
	                                        this.state.createtime
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'span',
	                                            { className: 'questionTitle' },
	                                            ' 状态：'
	                                        ),
	                                        this.state.statusName
	                                    ),
	                                    _react2['default'].createElement(
	                                        _commoncomponentCommonJsx.Col,
	                                        { span: 6 },
	                                        _react2['default'].createElement(
	                                            'div',
	                                            { className: 'text-right' },
	                                            _react2['default'].createElement(
	                                                'a',
	                                                { href: 'javasctip:void(0);', onClick: this.getorderoperation.bind(this) },
	                                                this.state.orderoperation
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'hr10' }),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Layout,
	                            { className: 'workorder-table' },
	                            _react2['default'].createElement(
	                                Header,
	                                null,
	                                this.state.getworkordername
	                            ),
	                            _react2['default'].createElement(
	                                Content,
	                                null,
	                                _react2['default'].createElement(
	                                    'div',
	                                    { className: 'view-questionPane' },
	                                    _react2['default'].createElement(
	                                        'div',
	                                        { className: 'view-questionLists' },
	                                        _react2['default'].createElement(
	                                            'ul',
	                                            null,
	                                            _react2['default'].createElement(
	                                                'li',
	                                                null,
	                                                _react2['default'].createElement(
	                                                    'div',
	                                                    { className: 'view-faceIco' },
	                                                    _react2['default'].createElement('img', { src: this.state.usericon })
	                                                ),
	                                                _react2['default'].createElement(
	                                                    'div',
	                                                    { className: 'view-Infor' },
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        this.state.customername
	                                                    ),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        '问题描述：',
	                                                        this.state.content
	                                                    ),
	                                                    _react2['default'].createElement('div', null),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        null,
	                                                        this.state.createtime
	                                                    )
	                                                )
	                                            ),
	                                            this.state.workeorderinfo.map(function (item, i) {

	                                                return _react2['default'].createElement(
	                                                    'li',
	                                                    { key: i, className: item.workordertype === 0 && 'messageDiv' },
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        { className: 'view-faceIco' },
	                                                        item.workordertype === 0 && _react2['default'].createElement('img', { src: './static/images/notify.jpg' }),
	                                                        item.workordertype === 1 && _react2['default'].createElement('img', { src: _this.state.usericon })
	                                                    ),
	                                                    _react2['default'].createElement(
	                                                        'div',
	                                                        { className: 'view-Infor' },
	                                                        item.workordertype === 0 && '管理员回复：',
	                                                        item.workordertype === 1 && _this.state.customername,
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            '问题描述：',
	                                                            item.content
	                                                        ),
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            item.operatime
	                                                        ),
	                                                        _react2['default'].createElement(
	                                                            'p',
	                                                            null,
	                                                            item.attachment && item.attachment.split(',').map(function (atta, i) {
	                                                                return _react2['default'].createElement(
	                                                                    'a',
	                                                                    { key: i, href: atta, title: atta },
	                                                                    ' ',
	                                                                    '点击下载'
	                                                                );
	                                                            })
	                                                        )
	                                                    )
	                                                );
	                                            })
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )

	            };

	            //console.log(this.state.mainHeight);
	            var mainComponent = _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props);

	            return _react2['default'].createElement(_componentsMainJsx2['default'], { component: mainComponent });
	        }
	    }, {
	        key: 'changeAccount',
	        value: function changeAccount(i) {
	            if (i * 1 === 0) {
	                window.location.hash = '#/listorder/工单管理';
	            } else if (i * 1 === 1) {
	                window.location.hash = '#/listorder/工单管理';
	            }
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;
	            var resizeLeftMenu = _props.resizeLeftMenu;

	            validateUser(function () {
	                loginOut(undefined, undefined, false);
	            }, this);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //*获取指定工单的所有信息
	            var workorderid = this.props.params.id;

	            var s = this;
	            $.ajax({
	                url: window.baseUrl + 'user/view_workorder',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    setworkorderid: workorderid
	                },
	                success: function success(data) {

	                    if (data.getret === 0) {
	                        s.state.workorderid = data.workinfo.workorderid;
	                        s.state.content = data.workinfo.content;
	                        s.state.createtime = data.workinfo.createtime;
	                        s.state.status = data.workinfo.status;
	                        s.state.totalminu = data.workinfo.totalminu;
	                        s.state.operauser = data.workinfo.userid;
	                        s.filterStatus();
	                        s.state.workordertype = data.workinfo.workordertype;
	                        s.getuserinfo(data.workinfo.userid); //工單用戶信息                   
	                        s.getworkordername();
	                        s.forceUpdate();
	                    }
	                }

	            });
	            s.getworkorderlist();
	        }

	        //获取用户信息
	    }, {
	        key: 'getuserinfo',
	        value: function getuserinfo(inputValue) {
	            var s = this;

	            $.ajax({
	                url: window.baseUrl + 'user/get_userdetails/',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    isonly: 1,
	                    setuserid: inputValue
	                },
	                success: function success(data) {
	                    if (data.getret === 0) {
	                        s.state.customername = data.getuserinfo.customername; //名称
	                        s.state.usericon = data.getuserinfo.usericon; //头像
	                        s.forceUpdate();
	                    } else if (data.getret === -3) {
	                        _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                        setTimeout(function () {
	                            location.href = '/';
	                        }, 2000);
	                    } else {
	                        loginOut(data.getmsg, window.loginUrl, false);
	                    }
	                }
	            });
	            return inputValue;
	        }

	        //获取工单详细列表（本次工单的所有对话）
	    }, {
	        key: 'getworkorderlist',
	        value: function getworkorderlist() {
	            var s = this;
	            $.ajax({
	                url: window.baseUrl + 'user/view_workorder',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    setworkorderid: s.props.params.id
	                },
	                success: function success(data) {
	                    console.log(data);
	                    if (data.getret === 0) {
	                        s.state.workeorderinfo = data.workinfo.operainfo;
	                        s.state.setuserid = data.workinfo.operainfo[0].operauser;
	                        s.forceUpdate();
	                    }
	                }

	            });
	        }

	        //获取工单类型名称
	    }, {
	        key: 'getworkordername',
	        value: function getworkordername() {
	            var s = this;
	            switch (s.state.workordertype) {
	                case 0:
	                    s.state.getworkordername = "财务类工单问题";
	                    break;
	                case 1:
	                    s.state.getworkordername = "会员帐号类工单问题";
	                    break;
	                case 2:
	                    s.state.getworkordername = "定制服务类工单帐号问题";
	                    break;
	                case 3:
	                    s.state.getworkordername = "产品技术类工单问题";

	                    break;
	                case 4:
	                    s.state.getworkordername = "其它类工单问题";

	                    break;
	            }
	        }

	        //获取工单状态
	    }, {
	        key: 'filterStatus',
	        value: function filterStatus() {
	            var s = this;
	            switch (s.state.status) {
	                case 0:
	                    s.state.statusName = "已受理";
	                    s.state.orderoperation = "关闭工单";
	                    break;
	                case 1:
	                    s.state.statusName = "已处理";
	                    s.state.orderoperation = "关闭工单";
	                    break;
	                case 2:
	                    s.state.statusName = "已确认";
	                    s.state.getTimestr = "总计花时：" + s.state.totalminu + "分钟!";
	                    s.setState({
	                        isHidden: true
	                    });
	                    s.state.orderoperation = "删除工单";
	                    break;
	                case 3:
	                    s.state.statusName = "已评价";
	                    s.state.getTimestr = "总计花时：" + s.state.totalminu + "分钟!";
	                    s.setState({
	                        isHidden: true
	                    });
	                    s.state.orderoperation = "删除工单";
	                    break;
	            }

	            // s.forceUpdate();
	        }

	        //操作工单状态
	    }, {
	        key: 'getorderoperation',
	        value: function getorderoperation() {
	            var s = this;
	            if (s.state.orderoperation == "关闭工单") {
	                $.ajax({
	                    url: window.baseUrl + 'user/close_workorder/',
	                    data: {
	                        userid: s.userid,
	                        getusersigid: s.getusersigid,
	                        setworkorderid: s.state.workorderid
	                    },
	                    success: function success(data) {
	                        if (data.getret === 0) {
	                            _commoncomponentCommonJsx.message.success("关闭工单成功");
	                            s.state.orderoperation = "删除工单";
	                            s.setState({
	                                isHidden: true
	                            });
	                            s.forceUpdate();
	                        } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data.getmsg);
	                        }
	                    }
	                });
	            }
	            if (s.state.orderoperation == "删除工单") {
	                $.ajax({

	                    url: window.baseUrl + 'user/del_workorder/',

	                    data: {
	                        userid: s.userid,
	                        getusersigid: s.getusersigid,
	                        setworkorderid: s.state.workorderid

	                    },
	                    success: function success(data) {
	                        if (data.getret === 0) {
	                            _commoncomponentCommonJsx.message.success("删除工单成功");
	                            setTimeout(function () {
	                                window.location.hash = 'workorder/';
	                            }, 2000);
	                        } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data.getmsg);
	                        }
	                    }
	                });
	            }
	        }
	    }]);

	    return ZmitiViewOrderApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiViewOrderApp);

	/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];
	/*atta.split('/').pop()*/

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(801);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nul, ol, li {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0; }\r\n\r\n.hr10, .hr15 {\r\n  clear: both;\r\n  line-height: 0;\r\n  font-size: 0; }\r\n\r\n.hr10 {\r\n  height: 10px; }\r\n\r\n.hr15 {\r\n  height: 15px; }\r\n\r\n.pad-5 {\r\n  padding: 5px; }\r\n\r\n.pad-10 {\r\n  padding: 10px; }\r\n\r\n.pad-15 {\r\n  padding: 15px; }\r\n\r\n.pad-20 {\r\n  padding: 20px; }\r\n\r\n.zmiti-vieworder-main-ui {\r\n  font-size: 12px;\r\n  overflow: auto; }\r\n  .zmiti-vieworder-main-ui .zmiti-vieworder-header-inner {\r\n    padding-left: 8px;\r\n    margin-top: 10px;\r\n    position: relative; }\r\n    .zmiti-vieworder-main-ui .zmiti-vieworder-header-inner:before {\r\n      content: '';\r\n      position: absolute;\r\n      width: 2px;\r\n      height: 100%;\r\n      background: #88B7E0;\r\n      left: 0;\r\n      -webkit-transform: scale(1, 0.7);\r\n      transform: scale(1, 0.7); }\r\n  .zmiti-vieworder-main-ui .zmiti-workorder-button-right button {\r\n    float: right;\r\n    margin-top: 5px; }\r\n  .zmiti-vieworder-main-ui .zmiti-workorder-line {\r\n    height: 15px;\r\n    overflow: hidden;\r\n    border-bottom: 1px solid #dddddd; }\r\n  .zmiti-vieworder-main-ui .workorder-table {\r\n    border: 1px solid #e1e6eb;\r\n    margin-top: 15px;\r\n    background: #FFffff; }\r\n    .zmiti-vieworder-main-ui .workorder-table .ant-layout-header {\r\n      background: #F5f6FA;\r\n      border-left: 4px solid #6d7781;\r\n      padding-left: 16px;\r\n      height: 38px;\r\n      line-height: 38px;\r\n      overflow: hidden;\r\n      border-bottom: 1px solid #e1e6eb; }\r\n  .zmiti-vieworder-main-ui .questionTitle {\r\n    color: #999; }\r\n  .zmiti-vieworder-main-ui .red {\r\n    color: red; }\r\n  .zmiti-vieworder-main-ui .error-table {\r\n    border: 1px solid red;\r\n    color: red; }\r\n  .zmiti-vieworder-main-ui .workorderquestion-inputContent {\r\n    height: 100px; }\r\n\r\n.text-right {\r\n  text-align: right; }\r\n\r\n.view-questionInfo {\r\n  background-color: #efefef;\r\n  padding: 10px; }\r\n\r\n.gutter-example {\r\n  color: #000;\r\n  line-height: 2; }\r\n  .gutter-example span {\r\n    color: #666; }\r\n\r\n.view-titPane {\r\n  background-color: #efefef;\r\n  border-left: 5px #999 solid;\r\n  border-top: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  line-height: 2;\r\n  padding-left: 10px;\r\n  color: #333; }\r\n\r\n.view-questionLists {\r\n  border-left: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  padding: 0 15px 15px 15px;\r\n  margin: 0; }\r\n  .view-questionLists ul {\r\n    width: 100%;\r\n    overflow: hidden; }\r\n  .view-questionLists li {\r\n    padding: 10px 0 10px 70px;\r\n    min-height: 70px;\r\n    position: relative;\r\n    margin: 0;\r\n    border-bottom: 1px #ccc dashed;\r\n    color: #666;\r\n    width: 100%; }\r\n  .view-questionLists li:last-child {\r\n    border-bottom: none; }\r\n  .view-questionLists li.messageDiv {\r\n    color: #000;\r\n    padding-left: 10px; }\r\n  .view-questionLists li.questionFinish {\r\n    background-color: #eafbff; }\r\n\r\n.view-faceIco {\r\n  position: absolute;\r\n  left: 10px;\r\n  top: 10px; }\r\n  .view-faceIco img {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 50%; }\r\n\r\n.view-questionForm {\r\n  border-left: 1px #cccccc solid;\r\n  border-right: 1px #cccccc solid;\r\n  border-bottom: 1px #cccccc solid;\r\n  padding: 10px 15px;\r\n  margin: 0; }\r\n  .view-questionForm form {\r\n    width: 100%; }\r\n  .view-questionForm .view-tit-label {\r\n    line-height: 24px; }\r\n  .view-questionForm textarea {\r\n    outline: none;\r\n    resize: none;\r\n    border-color: #d9d9d9; }\r\n  .view-questionForm p {\r\n    margin: 10px 0; }\r\n\r\n/*# sourceMappingURL=index.css.map */\r\n", ""]);

	// exports


/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(803);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	__webpack_require__(709);

	var _reactRouter = __webpack_require__(182);

	var _componentsMainJsx = __webpack_require__(805);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var _jquery = __webpack_require__(770);

	var _jquery2 = _interopRequireDefault(_jquery);

	_commoncomponentCommonJsx.moment.locale('zh-cn');
	var RadioGroup = _commoncomponentCommonJsx.Radio.Group;
	var FormItem = _commoncomponentCommonJsx.Form.Item;
	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiListOrderApp = (function (_Component) {
	    _inherits(ZmitiListOrderApp, _Component);

	    function ZmitiListOrderApp(props) {
	        _classCallCheck(this, ZmitiListOrderApp);

	        _get(Object.getPrototypeOf(ZmitiListOrderApp.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            mainHeight: document.documentElement.clientHeight - 50,
	            dataSource: [],
	            workorderid: '',
	            keyword: '',
	            startDate: null,
	            selectedIndex: 0,
	            endDate: (0, _commoncomponentCommonJsx.moment)(new Date(), 'YYYY-MM-DD')

	        };
	    }

	    _createClass(ZmitiListOrderApp, [{
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var columns = [{
	                title: '工单编号',
	                dataIndex: 'workorderid',
	                key: 'workorderid',
	                width: 100

	            }, {
	                title: '用户名',
	                dataIndex: 'username',
	                key: 'username'
	            }, {
	                title: '问题内容',
	                dataIndex: 'content',
	                key: 'content',
	                render: function render(value, record) {
	                    var getLength = value.length;
	                    if (getLength >= 40) {
	                        return value.substring(0, 40);
	                    } else return value;
	                }

	            }, {
	                title: '工单类型',
	                dataIndex: 'workordertype',
	                key: 'workordertypeName',
	                width: 100,
	                filters: [{
	                    text: '财务类',
	                    value: '0'
	                }, {
	                    text: '会员帐号类',
	                    value: '1'
	                }, {
	                    text: '定制服务类',
	                    value: '2'
	                }, {
	                    text: '产品技术类',
	                    value: '3'
	                }, {
	                    text: '其它类',
	                    value: '4'
	                }],
	                onFilter: function onFilter(value, record) {
	                    return value * 1 === record.workordertype;
	                },
	                sorter: function sorter(a, b) {
	                    return a.workordertype - b.workordertype;
	                },
	                render: function render(value, record) {

	                    switch (value) {
	                        case 0:
	                            return "财务类";
	                        case 1:
	                            return "会员帐号类";
	                        case 2:
	                            return "定制服务类";
	                        case 3:
	                            return "产品技术类";
	                        case 4:
	                            return "其它类";
	                    }
	                }
	            }, {
	                title: '创建时间',
	                dataIndex: 'createtime',
	                key: 'createtime',
	                width: 150
	            }, {
	                title: '工单状态',
	                dataIndex: 'status',
	                key: 'status',
	                width: 100,
	                filters: [{
	                    text: '已受理',
	                    value: '0'
	                }, {
	                    text: '已处理',
	                    value: '1'
	                }, {
	                    text: '已确认',
	                    value: '2'
	                }, {
	                    text: '已评价',
	                    value: '3'
	                }, {
	                    text: '已关闭',
	                    value: '4'
	                }],
	                onFilter: function onFilter(value, record) {
	                    return value * 1 === record.status;
	                },
	                sorter: function sorter(a, b) {
	                    return a.status - b.status;
	                },
	                render: function render(value, record) {

	                    switch (value) {
	                        case 0:
	                            return _react2['default'].createElement(
	                                'div',
	                                { className: 'red' },
	                                '已受理'
	                            );
	                            break;
	                        case 1:
	                            return _react2['default'].createElement(
	                                'div',
	                                { className: 'green' },
	                                '已处理'
	                            );
	                            break;
	                        case 2:
	                            return _react2['default'].createElement(
	                                'div',
	                                { className: 'green' },
	                                '已确认'
	                            );
	                            break;
	                        case 3:
	                            return _react2['default'].createElement(
	                                'div',
	                                { className: 'green' },
	                                '已评价'
	                            );
	                            break;
	                        case 4:
	                            return _react2['default'].createElement(
	                                'div',
	                                { className: 'green' },
	                                '已关闭'
	                            );
	                            break;
	                    }
	                }

	            }, {
	                title: '操作',
	                dataIndex: 'operation',
	                key: 'operation',
	                width: 100,
	                render: function render(text, record, index) {
	                    if (_this.state.selectedIndex === 0) {
	                        return _react2['default'].createElement(
	                            'span',
	                            null,
	                            _react2['default'].createElement(
	                                'a',
	                                { href: '#/editorder/' + record.workorderid },
	                                '处理工单'
	                            )
	                        );
	                    } else {
	                        return _react2['default'].createElement(
	                            'span',
	                            null,
	                            _react2['default'].createElement(
	                                'a',
	                                { href: '#/vieworder/' + record.workorderid },
	                                '查看'
	                            )
	                        );
	                    }
	                }

	            }];

	            var title = this.props.params.title || '工单管理2';
	            var props = {
	                userid: this.userid,
	                changeAccount: this.changeAccount.bind(this),
	                tags: ['处理中', '已处理'],
	                mainHeight: this.state.mainHeight,
	                title: title,
	                type: 'workorder-1',
	                selectedIndex: this.state.selectedIndex,
	                rightType: "custom",
	                customRightComponent: _react2['default'].createElement(
	                    'div',
	                    { className: 'zmiti-listorder-main-ui pad-10' },
	                    _react2['default'].createElement(
	                        _commoncomponentCommonJsx.Row,
	                        { className: 'zmiti-listorder-header' },
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { span: 8, className: 'zmiti-listorder-header-inner' },
	                            '工单管理'
	                        ),
	                        _react2['default'].createElement(_commoncomponentCommonJsx.Col, { span: 8, offset: 8, className: 'zmiti-listorder-button-right' })
	                    ),
	                    _react2['default'].createElement('div', { className: 'zmiti-listorder-line' }),
	                    _react2['default'].createElement(
	                        _commoncomponentCommonJsx.Row,
	                        { gutter: 10, type: 'flex', className: 'listorder-search ' },
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'zmiti-listorder-with70 listorder-heigth30' },
	                            '工单编号：'
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'listorder-heigth30' },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Input, { value: this.state.workorderid, onChange: this.searchByWorkorderid.bind(this), placeholder: '工单编号录入' })
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'zmiti-listorder-with60 listorder-heigth30 rig' },
	                            '时间:'
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'listorder-heigth30 zmiti-listorder-with130 ' },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.DatePicker, { value: this.state.startDate, onChange: function (e) {
	                                    _this.setState({ startDate: e });
	                                } })
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'zmiti-listorder-with30 listorder-heigth30 cen', value: this.state.endDate },
	                            '至:'
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'listorder-heigth30 zmiti-listorder-with130 ' },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.DatePicker, { value: this.state.endDate, onChange: function (e) {
	                                    _this.setState({ endDate: e });
	                                } })
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'zmiti-listorder-with60 listorder-heigth30 rig' },
	                            '关键词:'
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'listorder-heigth30' },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Input, { value: this.state.keyword, placeholder: '关键词', onChange: this.searchByKeyword.bind(this) })
	                        ),
	                        _react2['default'].createElement(
	                            _commoncomponentCommonJsx.Col,
	                            { className: 'listorder-heigth30 lef' },
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Button,
	                                { onClick: this.searchBybutton.bind(this) },
	                                '查询'
	                            )
	                        )
	                    ),
	                    _react2['default'].createElement(_commoncomponentCommonJsx.Table, { dataSource: this.state.dataSource, columns: columns, bordered: true })
	                )
	            };

	            var mainComponent = _react2['default'].createElement(
	                'div',
	                null,
	                _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props)
	            );
	            return _react2['default'].createElement(_componentsMainJsx2['default'], { component: mainComponent });
	        }
	    }, {
	        key: 'gotoView',
	        value: function gotoView(workorderid) {
	            location.href = '#/editorder/' + workorderid;
	        }
	    }, {
	        key: 'searchBybutton',
	        value: function searchBybutton() {
	            var workorderid = this.state.workorderid;
	            var startDate = this.state.startDate.format("YYYY-MM-DD");
	            var endDate = this.state.endDate.format("YYYY-MM-DD");
	            var keyWord = this.state.keyword;
	            var s = this;
	            _jquery2['default'].ajax({
	                url: window.baseUrl + 'user/get_workorder',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    setworkorderid: workorderid,
	                    setstarttime: startDate,
	                    setendtime: endDate,
	                    setkeyword: keyWord,
	                    setisadmin: 1
	                },
	                success: function success(data) {
	                    if (data.getret === 0) {
	                        s.state.dataSource = data.workorderinfo;
	                        //s.forceUpdate();
	                        //170417
	                        var arr = s.state.dataSource.filter(function (item, i) {
	                            return item.status === s.state.selectedIndex;
	                        });
	                        s.setState({
	                            dataSource: arr
	                        });
	                        //170417
	                    } else if (data.getret === -3) {
	                            _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                            setTimeout(function () {
	                                location.href = '/';
	                            }, 2000);
	                        } else {
	                            _commoncomponentCommonJsx.message.error(data);
	                        }
	                }
	            });
	        }
	    }, {
	        key: 'searchByWorkorderid',
	        value: function searchByWorkorderid(e) {
	            var _this2 = this;

	            this.setState({
	                workorderid: e.target.value
	            }, function () {

	                _this2.dataSource = _this2.dataSource || _this2.state.dataSource.concat([]);
	                _this2.state.dataSource = _this2.dataSource.filter(function (item) {

	                    return item.workorderid.indexOf(_this2.state.workorderid) > -1;
	                });
	                _this2.forceUpdate();
	            });
	        }
	    }, {
	        key: 'searchByKeyword',
	        value: function searchByKeyword(e) {
	            var _this3 = this;

	            this.setState({
	                keyword: e.target.value
	            }, function () {
	                _this3.dataSource = _this3.dataSource || _this3.state.dataSource.concat([]);

	                _this3.state.dataSource = _this3.state.dataSource.filter(function (item) {

	                    return item.content.indexOf(_this3.state.keyword) > -1;
	                });
	                if (_this3.state.keyword.length <= 0) {
	                    _this3.state.dataSource = _this3.dataSource.concat([]);
	                }
	                _this3.forceUpdate();
	            });
	        }
	    }, {
	        key: 'bindNewdata',
	        value: function bindNewdata() {
	            var s = this;
	            _jquery2['default'].ajax({
	                url: window.baseUrl + 'user/get_workorder',
	                data: {
	                    userid: s.userid,
	                    getusersigid: s.getusersigid,
	                    setisadmin: 1

	                },
	                success: function success(data) {

	                    if (data.getret === 0) {

	                        //s.state.dataSource = data.workorderinfo;
	                        //s.forceUpdate();
	                        data.workorderinfo.map(function (item, i) {
	                            if (item.status === 0) {
	                                item.status = 0;
	                            } else if (item.status === 1) {
	                                item.status = 1;
	                            } else if (item.status === 2) {
	                                item.status = 2;
	                            } else if (item.status === 3) {
	                                item.status = 3;
	                            } else if (item.status === 4) {
	                                item.status = 4;
	                            }
	                            s.state.dataSource.push(item);
	                        });
	                        s.defaultWorkorderInfo = data.workorderinfo;
	                        s.state.dataSource.forEach(function (item, i) {

	                            switch (item.status) {
	                                case 0:
	                                    item.statusName = '已受理';
	                                    break;
	                                case 1:
	                                    item.statusName = '已处理';
	                                    break;
	                                case 2:
	                                    item.statusName = '已确认';
	                                    break;
	                                case 3:
	                                    item.statusName = '已评价';
	                                    break;
	                                case 4:
	                                    item.statusName = '已关闭';
	                                    break;
	                            }
	                            switch (item.workordertype) {
	                                case 0:
	                                    item.workordertypeName = '财务类';
	                                    break;
	                                case 1:
	                                    item.workordertypeName = '会员帐号类';
	                                    break;
	                                case 2:
	                                    item.workordertypeName = '定制服务类';
	                                    break;
	                                case 3:
	                                    item.workordertypeName = '产品技术类';
	                                    break;
	                                case 4:
	                                    item.workordertypeName = '其它类';
	                                    break;
	                            }
	                        });

	                        var arr = s.state.dataSource.filter(function (item, i) {
	                            return item.status === s.state.selectedIndex;
	                        });
	                        s.setState({
	                            dataSource: arr
	                        });
	                    } else if (data.getret === -3) {
	                        _commoncomponentCommonJsx.message.error('您没有访问的权限,2秒后跳转到首页');
	                        setTimeout(function () {
	                            location.href = '/';
	                        }, 2000);
	                    } else {
	                        _commoncomponentCommonJsx.message.error(data);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'changeAccount',
	        value: function changeAccount(i) {

	            this.state.selectedIndex = i * 1;
	            this.orderList = this.orderList || this.defaultWorkorderInfo.concat([]);
	            this.state.dataSource = this.orderList.filter(function (item) {
	                if (i * 1 === 0) {
	                    return item.status === 0;
	                } else {
	                    return item.status !== 0;
	                }
	            });

	            this.state.keyword = '';

	            this.forceUpdate();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var s = this;
	            s.bindNewdata();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;

	            resizeMainHeight(this);

	            var _validateUser = validateUser(function () {}, this);

	            var username = _validateUser.username;
	            var userid = _validateUser.userid;
	            var getusersigid = _validateUser.getusersigid;

	            this.userid = userid;
	            this.getusersigid = getusersigid;
	        }
	    }]);

	    return ZmitiListOrderApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiListOrderApp);

	/*ReactDOM.render(<ZmitiCompanyApp></ZmitiCompanyApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(804);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n.zmiti-listorder-main-ui {\r\n  font-size: 12px; }\r\n  .zmiti-listorder-main-ui .zmiti-listorder-header-inner {\r\n    padding-left: 8px;\r\n    margin-top: 10px;\r\n    position: relative; }\r\n  .zmiti-listorder-main-ui .zmiti-listorder-header-inner:before {\r\n    content: '';\r\n    position: absolute;\r\n    width: 2px;\r\n    height: 100%;\r\n    background: #88b7e0;\r\n    left: 0;\r\n    -webkit-transform: scale(1, 0.7);\r\n    transform: scale(1, 0.7); }\r\n  .zmiti-listorder-main-ui .listorder-search {\r\n    margin: 15px 0; }\r\n    .zmiti-listorder-main-ui .listorder-search .rig {\r\n      text-align: right; }\r\n    .zmiti-listorder-main-ui .listorder-search .zmiti-listorder-with130 {\r\n      width: 130px; }\r\n    .zmiti-listorder-main-ui .listorder-search .zmiti-listorder-with70 {\r\n      width: 70px; }\r\n    .zmiti-listorder-main-ui .listorder-search .zmiti-listorder-with60 {\r\n      width: 60px; }\r\n    .zmiti-listorder-main-ui .listorder-search .listorder-heigth30 {\r\n      height: 30px;\r\n      line-height: 30px;\r\n      overflow: hidden; }\r\n  .zmiti-listorder-main-ui .zmiti-listorder-line {\r\n    height: 15px;\r\n    overflow: hidden;\r\n    border-bottom: 1px solid #ddd; }\r\n\r\n/*# sourceMappingURL=index.css.map */\r\n", ""]);

	// exports


/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	__webpack_require__(765);

	var _reactRouter = __webpack_require__(182);

	var _componentsPubHeaderJsx = __webpack_require__(769);

	var _componentsPubHeaderJsx2 = _interopRequireDefault(_componentsPubHeaderJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var SubMenu = _commoncomponentCommonJsx.Menu.SubMenu;

	var MainUI = (function (_Component) {
	    _inherits(MainUI, _Component);

	    function MainUI(props) {
	        _classCallCheck(this, MainUI);

	        _get(Object.getPrototypeOf(MainUI.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            defaultClass: "fly-left-aside",
	            isOpen: true,
	            current: '3',
	            currentAcc: 'iLinten@qq.com',
	            rightWidth: 0,
	            userid: '',
	            getusersigid: ''

	        };
	    }

	    _createClass(MainUI, [{
	        key: 'menuClickHandler',
	        value: function menuClickHandler(e) {
	            /* e.preventDefault();
	               this.setState({
	                 frameSrc:e.target.href
	             });
	            */
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {

	            // this.context.router.replace('/company');

	            //window.location.hash =  'company';
	        }
	    }, {
	        key: 'toggleMenu',
	        value: function toggleMenu() {
	            var _this = this;

	            if (this.state.defaultClass === "fly-left-aside") {
	                window.mainLeftSize = 60;
	                this.setState({ defaultClass: "fly-left-aside unfold", isOpen: false, rightWidth: document.documentElement.clientWidth - window.mainLeftSize });
	            } else {
	                this.setState({ defaultClass: "fly-left-aside" });
	                window.mainLeftSize = 180;
	                setTimeout(function () {
	                    _this.setState({ isOpen: true, rightWidth: document.documentElement.clientWidth - window.mainLeftSize });
	                }, 200);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var params = ''; //this.state.userid+'/'+this.state.getusersigid;

	            this.userManagerMenuConfig = [{
	                "linkTo": "/user/个人账户管理",
	                "key": "user",
	                "title": "个人账户管理",
	                "isIcon": true,
	                "type": "user",
	                "isShow": true
	            }, {
	                "linkTo": "/company/公司账户管理",
	                "key": "company",
	                "title": "公司账户管理",
	                "isIcon": true,
	                "type": "customerservice",
	                "isShow": true
	            }];

	            this.productServiceMenuConfig = [{
	                "linkTo": "/product/",
	                "key": "product",
	                "title": "新增产品",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }, {
	                "linkTo": "/listorder/工单管理",
	                "key": "workorder",
	                "title": "工单管理",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }, {
	                "linkTo": "/datum/",
	                "key": "datum",
	                "title": "资料管理",
	                "isIcon": true,
	                "type": "edit",
	                "isShow": true
	            }];
	            if (this.usertypesign === 4) {
	                //超级管理员
	                this.userManagerMenuConfig.push({
	                    "linkTo": "/system/系统账户管理",
	                    "key": "system",
	                    "title": "系统账户管理",
	                    "isIcon": true,
	                    "type": "edit",
	                    "isShow": true
	                });
	            }

	            var hash = window.location.hash;
	            var openKey = 'sub5';
	            this.productServiceMenuConfig.forEach(function (item, i) {
	                if (hash.indexOf(item.key) > -1) {
	                    openKey = 'sub6';
	                }
	            });
	            var headerProps = {
	                usertypesign: this.usertypesign,
	                currentAcc: this.state.currentAcc,
	                userid: this.userid,
	                type: 'admin',
	                getusersigid: this.getusersigid,
	                logo: '../static/images/logo.png'
	            };

	            return _react2['default'].createElement(
	                'section',
	                { className: 'main' },
	                _react2['default'].createElement(_componentsPubHeaderJsx2['default'], headerProps),
	                _react2['default'].createElement(
	                    'article',
	                    { className: 'fly-content' },
	                    _react2['default'].createElement(
	                        'section',
	                        { className: this.state.defaultClass },
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'fly-toggle-menu', onClick: this.toggleMenu.bind(this) },
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'menu-fold', style: { display: this.state.isOpen ? 'inline-block' : 'none' } }),
	                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'menu-unfold', style: { display: this.state.isOpen ? 'none' : 'inline-block' } })
	                        ),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'fly-menu-c' },
	                            _react2['default'].createElement(
	                                _commoncomponentCommonJsx.Menu,
	                                {
	                                    style: { width: 182 },
	                                    defaultOpenKeys: [openKey],
	                                    selectedKeys: [this.state.current],
	                                    mode: 'inline' },
	                                _react2['default'].createElement(
	                                    SubMenu,
	                                    { key: 'sub5',
	                                        title: _react2['default'].createElement(
	                                            'span',
	                                            null,
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'setting', style: { marginRight: '22px' } }),
	                                            _react2['default'].createElement(
	                                                'span',
	                                                null,
	                                                '用户管理'
	                                            )
	                                        ) },
	                                    this.userManagerMenuConfig.map(function (item) {
	                                        return _react2['default'].createElement(
	                                            _commoncomponentCommonJsx.Menu.Item,
	                                            { key: item.key },
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: item.type, style: { marginRight: '32px' } }),
	                                            _react2['default'].createElement(
	                                                _reactRouter.Link,
	                                                { to: item.linkTo },
	                                                item.title
	                                            )
	                                        );
	                                    })
	                                ),
	                                _react2['default'].createElement(
	                                    SubMenu,
	                                    { key: 'sub6',
	                                        title: _react2['default'].createElement(
	                                            'span',
	                                            null,
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: 'setting', style: { marginRight: '22px' } }),
	                                            _react2['default'].createElement(
	                                                'span',
	                                                null,
	                                                '操作管理'
	                                            )
	                                        ) },
	                                    this.productServiceMenuConfig.map(function (item) {
	                                        return _react2['default'].createElement(
	                                            _commoncomponentCommonJsx.Menu.Item,
	                                            { key: item.key },
	                                            _react2['default'].createElement(_commoncomponentCommonJsx.Icon, { type: item.type, style: { marginRight: '32px' } }),
	                                            _react2['default'].createElement(
	                                                _reactRouter.Link,
	                                                { to: item.linkTo },
	                                                item.title
	                                            )
	                                        );
	                                    })
	                                )
	                            )
	                        )
	                    ),
	                    _react2['default'].createElement(
	                        'section',
	                        { className: 'fly-right-aside', style: { width: this.state.rightWidth } },
	                        this.props.component
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;
	            var resizeLeftMenu = _props.resizeLeftMenu;

	            resizeMainHeight(this, 'setAdminHeight');
	            resizeLeftMenu(this, 'setAdminMenu');

	            var _validateUser = validateUser(function () {

	                loginOut(undefined, undefined, false);
	            });

	            var userid = _validateUser.userid;
	            var getusersigid = _validateUser.getusersigid;
	            var companyid = _validateUser.companyid;
	            var username = _validateUser.username;
	            var isover = _validateUser.isover;
	            var usertypesign = _validateUser.usertypesign;

	            this.userid = userid;
	            this.getusersigid = getusersigid;
	            this.companyid = companyid;
	            this.isover = isover;
	            this.usertypesign = usertypesign;
	            this.loginOut = loginOut;

	            if (this.usertypesign !== window.Role.NORMALADMINUSER && this.usertypesign !== window.Role.SUPERADMINUSER) {

	                loginOut('您没有访问的权限', window.mainUrl, false); //不是hash跳转。location.href跳转
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var hash = window.location.hash;
	            var configs = this.userManagerMenuConfig.concat(this.productServiceMenuConfig);
	            var current = '';
	            configs.forEach(function (item) {
	                if (hash.indexOf('#' + item.linkTo) > -1) {
	                    current = item.key;
	                }
	            });
	            this.setState({
	                current: current,
	                rightWidth: document.documentElement.clientWidth - 180,
	                userid: this.userid,
	                isover: this.isover,
	                getusersigid: this.getusersigid
	            });
	        }
	    }]);

	    return MainUI;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(MainUI);
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Main.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\ZPlatform\\main\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(807);

	var _componentsZmitiUserListJsx = __webpack_require__(775);

	var _componentsZmitiUserListJsx2 = _interopRequireDefault(_componentsZmitiUserListJsx);

	var _commoncomponentCommonJsx = __webpack_require__(248);

	var _componentsMainJsx = __webpack_require__(247);

	var _componentsMainJsx2 = _interopRequireDefault(_componentsMainJsx);

	var _publicValidateUserJsx = __webpack_require__(771);

	var Option = _commoncomponentCommonJsx.Select.Option;

	var ZmitiDatumApp = (function (_Component) {
	    _inherits(ZmitiDatumApp, _Component);

	    function ZmitiDatumApp(props) {
	        _classCallCheck(this, ZmitiDatumApp);

	        _get(Object.getPrototypeOf(ZmitiDatumApp.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            current: 0,
	            mainHeight: document.documentElement.clientHeight - 50,
	            selectedIndex: 0,
	            userList: []

	        };
	    }

	    _createClass(ZmitiDatumApp, [{
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var columns = [{
	                title: '序号',
	                dataIndex: 'key',
	                key: 'xx'
	            }, {
	                title: '用户名',
	                dataIndex: 'username',
	                key: 'username'
	            }, {
	                title: '手机',
	                dataIndex: 'mobile',
	                key: 'mobile'
	            }, {
	                title: '邮箱',
	                dataIndex: 'email',
	                key: 'email'
	            }, {
	                title: '注册日期',
	                dataIndex: 'regDate',
	                key: 'regDate',
	                sorter: function sorter(a, b) {
	                    return a.key - b.key;
	                }
	            }, {
	                title: '剩余天数',
	                dataIndex: 'surplusDays',
	                key: 'surplusDays',
	                sorter: function sorter(a, b) {
	                    return a.surplusDays - b.surplusDays;
	                }
	            }, {
	                title: '空间使用量',
	                dataIndex: 'userSpace',
	                key: 'userSpace'
	            }];
	            var columns1 = columns.concat({
	                title: '操作',
	                dataIndex: '', key: 'x',
	                width: '30%',
	                render: function render(text, record) {
	                    return _react2['default'].createElement('div', { 'data-userid': record.userid });
	                } });
	            var columns2 = columns.concat({
	                title: '操作',
	                width: '30%',
	                dataIndex: '', key: 'x',
	                render: function render(text, record) {
	                    return _react2['default'].createElement('div', { 'data-userid': record.userid });
	                } });

	            var title = this.props.params.title;
	            var props = {
	                userList: this.state.userList,
	                columns: [columns1, columns2],
	                mainHeight: this.state.mainHeight,
	                title: title,
	                changeAccount: this.changeAccount.bind(this),
	                keyDown: function keyDown(value) {
	                    clearTimeout(_this.keyupTimer);
	                    _this.defautlUserList === undefined && (_this.defautlUserList = _this.state.userList.concat([]));
	                    _this.keyupTimer = setTimeout(function () {
	                        var userlists = _this.defautlUserList;
	                        var condition = 'username';
	                        _this.state.userList = userlists.filter(function (user) {
	                            switch (_this.condition * 1) {
	                                case 0:
	                                    //提问内容
	                                    condition = 'username';
	                                    break;
	                                case 1:
	                                    //类型
	                                    condition = 'username';
	                                    break;
	                            }

	                            return user[condition].indexOf(value) > -1;
	                        });

	                        _this.forceUpdate(function () {});
	                    }, 350);
	                },
	                selectComponent: _react2['default'].createElement(
	                    _commoncomponentCommonJsx.Select,
	                    { placeholder: '用户名', onChange: function () {}, style: { width: 120 }, size: 'small' },
	                    _react2['default'].createElement(
	                        Option,
	                        { value: '0' },
	                        '用户名'
	                    )
	                )
	            };

	            //console.log(this.state.mainHeight);
	            return _react2['default'].createElement(_componentsMainJsx2['default'], { component: _react2['default'].createElement(_componentsZmitiUserListJsx2['default'], props) });
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _props = this.props;
	            var resizeMainHeight = _props.resizeMainHeight;
	            var validateUser = _props.validateUser;
	            var loginOut = _props.loginOut;
	            var resizeLeftMenu = _props.resizeLeftMenu;

	            validateUser(function () {
	                loginOut(undefined, undefined, false);
	            }, this);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            /*  var {userid,getusersigid} = this.props.params;
	             this.getusersigid = this.getusersigid = getusersigid;
	             this.userid =userid;
	             this.baseUrl = window.baseUrl;*/

	            var _props2 = this.props;
	            var resizeMainHeight = _props2.resizeMainHeight;
	            var validateUser = _props2.validateUser;
	            var loginOut = _props2.loginOut;
	            var resizeLeftMenu = _props2.resizeLeftMenu;

	            resizeMainHeight(this, 'setAdminHeight');
	        }
	    }, {
	        key: 'changeAccount',
	        value: function changeAccount(e) {
	            this.setState({
	                selectedIndex: e
	            });
	        }
	    }]);

	    return ZmitiDatumApp;
	})(_react.Component);

	exports['default'] = (0, _publicValidateUserJsx.ZmitiValidateUser)(ZmitiDatumApp);

	/*ReactDOM.render(<ZmitiUserApp></ZmitiUserApp>,document.getElementById('fly-main'));*/
	module.exports = exports['default'];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\ZPlatform\\main\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(808);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(768)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css", function() {
				var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(767)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden; }\r\n\r\n/*# sourceMappingURL=index.css.map */", ""]);

	// exports


/***/ })

});