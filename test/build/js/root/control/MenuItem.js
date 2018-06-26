"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.MenuItem = function (_control$Base) {
    _inherits(_class, _control$Base);

    /**
     * 菜单项的构造方法
     * @param label 当前的标签
     * @param subItems 当前菜单的子项集合
     * @param clickFunc 当前菜单单机触发的事件
     * @param type 当前菜单的类型
     * @param accelerator 当前菜单的快捷键
     * @param icon 当前菜单的图标
     * @param enable 当前菜单是否可用
     * @param eventCycle 当前菜单的周期状态
     * @example <menuItem data-control-type="control.MenuItem" data-label="标准型(T)" data-index="1" data-type="normal" data-accelerator="Alt+1"></menuItem>
     * @author created by lingyan
     */
    function _class(label, index, subItems, clickFunc, type, accelerator, icon) {
        var enable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
        var eventCycle = arguments[8];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "MenuItem"; // 控件的名称
        _this.version = "1.0.0"; // 控件的版本
        _this.author = "lingyan"; // 控件的制作人
        _this._label = label; // 获取当前标签的内容
        _this._index = index ? index : 1; // 获取当前标签的索引，0代表第一级标签，非0代表非一级标签
        _this._childList = subItems ? subItems : []; // 当前菜单的子菜单，这时候子菜单已经初始化完成了
        _this._accelerator = accelerator; // 当前菜单的快捷键
        _this._icon = icon; // 当前菜单需要展示的图标
        _this._enable = enable ? enable : false; // 当前菜单是否可用
        _this._type = type ? type : control.Menu.MeunItemType.NORMAL; // 当前菜单的类型，是app菜单还是右键菜单
        _this._showItem = false; // 默认不显示子菜单
        _this._getFocused = false; // 当前菜单是否处于获取焦点状态，如果处于获取焦点状态，只要经过菜单项就会显示子菜单，否则不显示，点击子菜单获取焦点，再次点击失去焦点，点击非菜单区域失去焦点
        _this._clickFunc = clickFunc;
        _this._getHtml();
        return _this;
    }
    /**
     * 获取当前的html
     * @private
     */


    _createClass(_class, [{
        key: "_getHtml",
        value: function _getHtml() {
            var _this2 = this;

            switch (this._type) {
                //分隔线
                case control.Menu.MeunItemType.SEPARATOR:
                    this._currentDom = $("<li class=\"lingyan-separator-menuItem\"></li>");
                    break;
                //当是正常菜单项的时候 也分两种 一种是初级菜单项 横向显示，另一种是非初级菜单项，纵向显示
                case control.Menu.MeunItemType.NORMAL:
                    // 第一组子项，横向显示
                    if (this._index == 0) {
                        this._currentDom = $("<li class=\"lingyan-normal-menuItem-first\"><span>" + this.label + "</span></li>");
                        this._subDom = $("<ul class=\"lingyan-normal-menu-first\"></ul>");
                    } else {
                        this._currentDom = $("<li class=\"lingyan-normal-menuItem\"></li>");
                        this._initStyle(3);
                        this._subDom = $("<ul class=\"lingyan-normal-menu\"></ul>");
                    }
                    break;
                default:
                    break;
            }
            //如果该菜单项包含子菜单，默认是隐藏的
            if (this._subDom) {
                this._subDom.hide();
                this._currentDom.append(this._subDom);
            }
            this._html = this._currentDom;
            this._bindEvent();

            // 初始化鼠标点击事件
            this.clickFunc = function () {
                if (_this2.index == 0) {
                    _this2._getFocused = !_this2._getFocused;
                }
                if (_this2._clickFunc) {
                    _this2._clickFunc;
                }
                _this2.showItem = !_this2._showItem;
            };
            this._currentDom.on("click", function () {
                _this2.clickFunc();
            });
        }

        /**
         * 根据不同的菜单选项类型初始化样式，可以考虑部分样式的设置是否可以通过属性来设置
         * @param index:代表了当前菜单选项的类型，1表示分隔线，2表示一级菜单项，3代表非一级菜单
         */

    }, {
        key: "_initStyle",
        value: function _initStyle(index) {
            switch (index) {
                case 3:
                    //如果存在图标，将图标添加到html中
                    if (this.icon) {
                        var iconDom = $("<img src=\"" + this.icon + "\"/>");
                        this._currentDom.append(iconDom);
                    }
                    //添加标签
                    this._currentDom.append($("<span class=\"lingyan-normal-menuItem-label\" style=\"left: " + (this.icon ? 40 : 10 + "px") + "\">" + this.label + "</span>"));
                    //如果存在快捷键
                    if (this._accelerator) {
                        this._acceleratorDom = $("<span class=\"lingyan-normal-menuItem-accelerator\">" + this._accelerator + "</span>");
                        // 这个时候该菜单的宽度还没有确定，只有初始化父菜单的时候子菜单的宽度才能确定，所以这里的快捷键的位置
                        // 需要在设置宽度的时候设置
                        this._currentDom.append(this._acceleratorDom);
                    }
                    // 如果存在子菜单列表 应该绘制向右的箭头
                    if (this._childList && this._childList.length > 0) {
                        var rightDom = $("<span class=\"lingyan-normal-menuItem-right\" style=\"vertical-align: middle;\"></span>");
                        this._currentDom.append(rightDom);
                    }
                    break;
            }
        }

        /**
         * @private 绑定事件
         */

    }, {
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this3 = this;

            // 鼠标进图的状态分为两种，一种是初级菜单，另一种是非初级菜单，非初级菜单 鼠标进入除了样式的改变还要显示子菜单项。
            // 初级菜单当获取焦点的时候显示子菜单项，否则不显示
            this._currentDom.on("mouseenter", function () {
                if (_this3.index == 0 && _this3.getFocused || _this3.index > 0) {
                    _this3.showItem = true;
                }
            });
            this._currentDom.on("mouseleave", function () {
                _this3.showItem = false;
            });
        }

        /**
         * 由于控件特殊性，重写addChild方法
         * @param node
         */

    }, {
        key: "addChild",
        value: function addChild(node) {
            this.eventCycle.runEvent(base.EventBase.LOAD_BEFORE);
            node._parent = this;
            this._childList.push(node);
            if (node.dom && this._subDom && this.type != control.Menu.MeunItemType.SEPARATOR) {
                this._subDom.append(node.dom);
                this._subDom.css("width", this.maxWidth + "px");
            }
            node.setControllerItem(node.guid, node.guid);
            this.eventCycle.runEvent(base.EventBase.LOAD_COMPLETE);
        }
    }, {
        key: "destorySelfProp",


        /**
         * 删除自身的属性
         * */
        value: function destorySelfProp() {
            this._text = null;
            this._width = null;
            this._enable = null;
            this._icon = null;
            this._accelerator = null;
            this._type = null;
            this._clickFunc = null;
            this._childList = null;
            this._label = null;
            this._showItem = null;
        }

        /**
         *删除自身的事件
         * */

    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {
            this._currentDom.off("click");
            this._currentDom.off("mouseenter");
            this._currentDom.off("mouseleave");
        }

        /**
         * reflex自己的属性
         * @param child
         * @param reflex
         */

    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var label = utils.Dom.getAttr(child, "label");
            var index = utils.Dom.getAttr(child, "index");
            var accelerator = utils.Dom.getAttr(child, "accelerator");
            var icon = utils.Dom.getAttr(child, "icon");
            var enable = utils.Dom.getAttr(child, "enable");
            var type = utils.Dom.getAttr(child, "type");
            if (label) {
                this.label = label;
            }if (index) {
                this.index = index;
            }if (accelerator) {
                this.accelerator = accelerator;
            }if (icon) {
                this.icon = icon;
            }if (enable) {
                this.enable = enable;
            }if (type) {
                this.type = type;
            }
            this._getHtml();
        }

        /**
         * reflex默认的事件
         * @param child
         * @param reflex
         */

    }, {
        key: "reflexEventDefault",
        value: function reflexEventDefault(child, reflex) {
            var _this4 = this;

            var click = utils.Dom.getEvt(child, "click");
            if (click) {
                this.clickFunc = function () {
                    if (_this4.index == 0) {
                        _this4._getFocused = !_this4._getFocused;
                    }
                    _this4.runEvent(base.EventBase.CLICK);
                    _this4.showItem = !_this4._showItem;
                };
                this._currentDom.on("click", function () {
                    _this4.clickFunc();
                });
            }
        }
    }, {
        key: "getFocused",
        get: function get() {
            return this._getFocused;
        },
        set: function set(b) {
            this._getFocused = b;
        }

        /**
         * 获取当前列表菜单是否显示
         * @returns {boolean|*}
         */

    }, {
        key: "showItem",
        get: function get() {
            return this._showItem;
        }

        /**
         * 设置当前列表菜单是否显示
         * @param b
         */
        ,
        set: function set(b) {
            //如果是一级菜单 只能显示一个子菜单
            if (b && this._index === 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._parent.childList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
            this._showItem = b;
            if (this._subDom) {
                this._showItem ? this._subDom.show() : this._subDom.hide();
            }
        }
        /**
         * 获取当前菜单的标签
         * @returns {*}
         */

    }, {
        key: "index",
        get: function get() {
            return this._index;
        }

        /**
         * 设置当前菜单的标签
         * @param str
         */
        ,
        set: function set(index) {
            this._index = index;
        }

        /**
         * 获取当前菜单的标签
         * @returns {*}
         */

    }, {
        key: "label",
        get: function get() {
            return this._label;
        }

        /**
         * 设置当前菜单的标签
         * @param str
         */
        ,
        set: function set(str) {
            this._label = str;
        }

        /**
         * 设置当前的子项菜单列表
         * @param items
         */

    }, {
        key: "childList",
        set: function set(items) {
            this._childList = items;
            if (!items || items.length <= 0) {
                return;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    item._parent = this;
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
         * 获取当菜单项被点击后的回调方法
         * @returns {*}
         */

    }, {
        key: "clickFunc",
        get: function get() {
            return this._clickFunc;
        }

        /**
         * 设置菜单项被点击后的回调方法
         * @param f
         */
        ,
        set: function set(f) {
            this._clickFunc = f;
        }

        /**
         * 获取当前菜单项的类型，目前只有三种类型，normal，submenu, separator
         * @returns {*}
         */

    }, {
        key: "type",
        get: function get() {
            return this._type;
        }

        /**
         * 设置当前菜单项的类型
         * @param t
         */
        ,
        set: function set(t) {
            this._type = t;
        }

        /**
         * 获取当前菜单的快捷键
         * @returns {*}
         */

    }, {
        key: "accelerator",
        get: function get() {
            return this._accelerator;
        }

        /**
         * 设置当前菜单的快捷键
         * @param commandKey
         */
        ,
        set: function set(commandKey) {
            this._accelerator = commandKey;
        }

        /**
         * 获取当前菜单的图标
         * @returns {*}
         */

    }, {
        key: "icon",
        get: function get() {
            return this._icon;
        }

        /**
         * 设置当前菜单的图标
         * @param i
         */
        ,
        set: function set(i) {
            this._icon = i;
        }

        /**
         * 获取当前菜单是否可用
         * @returns {*}
         */

    }, {
        key: "enable",
        get: function get() {
            return this._enable;
        }

        /**
         * 设置当前菜单是否可用
         * @param e
         */
        ,
        set: function set(e) {
            this._enable = e;
        }

        /**
         * 根据子项获取当前子菜单的宽度
         * @returns {number}
         */

    }, {
        key: "maxWidth",
        get: function get() {
            if (!this._childList || this._childList.length <= 0) {
                return 0;
            }
            var max = 0;
            for (var index = 0; index < this._childList.length; index++) {
                var contentWidth = this._childList[index].label ? this._childList[index].label.length * 15 : 0;
                var iconWidth = this._childList[index].icon ? 30 : 0;
                var acceleratorWidth = this._childList[index].accelerator ? this._childList[index].accelerator.length * 10 : 0;
                var leftWidth = 50;
                var temp = contentWidth + iconWidth + acceleratorWidth + leftWidth;
                if (temp > max) {
                    max = temp;
                }
            }
            for (var _index = 0; _index < this._childList.length; _index++) {
                this._childList[_index].width = max;
            }
            return max;
        }

        /**
         * 获取当前菜单项的宽度
         * @returns {*|null}
         */

    }, {
        key: "width",
        get: function get() {
            return this._width;
        }

        /**
         * 根据当前项的宽度设置样式
         * @param w
         */
        ,
        set: function set(w) {
            this._width = w;
            if (this._index != 0 && this._subDom) {
                this._subDom.css("left", this.width - 40 + "px");
            }
            if (this._index != 0 && this._accelerator) {
                this._acceleratorDom.css("left", this.width - this._accelerator.length * 10 - 15 + "px");
            }
        }

        /**
         * 获取dam树
         * @returns {dam树}
         */

    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);