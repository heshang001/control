"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.Menu = function (_control$Base) {
    _inherits(_class, _control$Base);

    /**
     * 菜单(menu)控件
     * @param subItems  控件的子菜单项
     * @param menuType  控件的类型
     * @param eventCycle
     * @example <menu data-control-type="control.Menu" data-menuType="appMenu">
     * @author created by lingyan
     * @Method: addChild(node)
     */
    function _class() {
        var subItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Array();
        var menuType = arguments[1];
        var eventCycle = arguments[2];

        _classCallCheck(this, _class);

        var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this2.name = "Menu"; //控件的名称
        _this2.version = "1.0.0"; //控件的版本
        _this2.author = "lingyan"; //控件的制作人
        _this2._childList = subItems ? subItems : []; //控件的子菜单项
        _this2._menuType = menuType ? menuType : control.Menu.MenuType.APP_MENU; //控件的类型
        _this2._acceleratorKeyDic = new Array(); //初始化快捷键数组
        return _this2;
    }

    /**
     * @private
     * 根据子项获取当前的 html
     */


    _createClass(_class, [{
        key: "_getHtml",
        value: function _getHtml() {
            switch (this._menuType) {
                case control.Menu.MenuType.APP_MENU:
                    this._subDom = $("<ul class=\"lingyan-appMenu\"></ul>");
                    break;
                case control.Menu.MenuType.RIGHT_MENU:
                    this._subDom = $("<ul class=\"lingyan-rightMenu\"></ul>");
                    break;
            }
            this._html = this._subDom;
            this._bindEvent();
        }

        /**
         * @private
         * 绑定menu对应的事件
         */

    }, {
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this = this;
            window.onkeydown = function (event) {
                if (!_this._acceleratorKeyDic) {
                    return;
                }
                var _command = "";
                if (event.altKey) {
                    _command += "alt+";
                }
                if (event.ctrlKey) {
                    _command += "ctrl+";
                }
                if (event.shiftKey) {
                    _command += "shift+";
                }
                _command += event.key.toLowerCase();
                // 触发点击事件
                if (_this._acceleratorKeyDic[_command]) {
                    _this._acceleratorKeyDic[_command].clickFunc();
                }
                // 实现的效果是菜单显示的时候点击相应的按键就能触发点击事件
                var _singleComm = event.key.toLowerCase();
                for (var key in _this._acceleratorKeyDic) {
                    if (key.toLowerCase().includes(_singleComm) && _this._acceleratorKeyDic[key]._parent.showItem) {
                        _this._acceleratorKeyDic[key].clickFunc();
                    }
                }
            };

            // 当失去焦点的时候，所有的子菜单隐藏显示
            this._html.on("blur", function () {
                if (_this._childList) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this._childList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            item.showItem = false;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            });
        }

        /**
         * @private
         * 递归遍历获取所有的快捷键
         * @param subItems
         */

    }, {
        key: "_getAllKeys",
        value: function _getAllKeys(subItems) {
            if (!subItems) {
                return;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = subItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item && item.accelerator) {
                        this._acceleratorKeyDic[item.accelerator.toLowerCase()] = item;
                    }
                    if (item && item.childList) {
                        this._getAllKeys(item.childList);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * 添加子项方法 都要获取快捷键
         * @param node
         */

    }, {
        key: "addChild",
        value: function addChild(node) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "addChild", this).call(this, node);
            this._getAllKeys([node]);
        }

        /**
         * 设置当前的子项
         * @param b
         */

    }, {
        key: "destorySelfProp",


        /**
         * 删除自身的属性
         * */
        value: function destorySelfProp() {
            this._accelerator = null;
            this._subItems = null;
            this._acceleratorKeyDic = null;
            this._menuType = null;
            this._html = null;
            this._childList = null;
            this._subDom = null;
        }

        /**
         *删除自身的事件
         * */

    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {
            this._html.off("blur");
        }

        /**
         * reflex自身属性
         * @param child
         * @param reflex
         */

    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var menuType = utils.Dom.getAttr(child, "menuType");
            if (menuType) {
                this._menuType = menuType;
            }
            this._getHtml();
        }
    }, {
        key: "childList",
        set: function set(b) {
            this._childList = b;
            if (b) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = b[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var item = _step3.value;

                        item._parent = this;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }

        /**
         * 获取整个菜单的快捷键数据结构
         * key:快捷键字符串
         * value:快捷键对应的子项对象实例
         * @returns {快捷键数据}
         */

    }, {
        key: "accelerator",
        get: function get() {
            return this._accelerator;
        }

        /**
         * 设置整个菜单的快捷键数据结构
         * @param k
         */
        ,
        set: function set(k) {
            this._accelerator = k;
        }

        /**
         * 获取当前菜单的dom结构
         * @returns {dom结构}
         */

    }, {
        key: "dom",
        get: function get() {
            if (!this._html) {
                this._getHtml();
            }
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);

/**
 * 当前菜单的类型
 * @type {{NORMAL: string, SEPARATOR: string, SUBMENU: string}}
 */
control.Menu.MeunItemType = {
    NORMAL: "normal",
    SEPARATOR: "separator",
    SUBMENU: "submenu"
};
/**
 * 菜单的类型，目前仅仅支持应用程序菜单和右键菜单
 * @type {{APP_MENU: string, RIGHT_MENU: string}}
 */
control.Menu.MenuType = {
    APP_MENU: "appMenu",
    RIGHT_MENU: "rightMenu"
};

/**
 *菜单栏的快捷键选项
 **/
control.Menu.MeunAccelerator = {
    Command: "Cmd",
    Control: "Ctrl",
    CommandOrControl: "CmdOrCtrl",
    Alt: "Alt",
    Option: "Option",
    AltGr: "AltGr",
    Shift: "Shift",
    Super: "Super"
};