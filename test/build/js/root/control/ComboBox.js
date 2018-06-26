"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * select级联下拉框
 * @param obj 配置参数
 * @param eventCycle 事件生命周期
 * @example 1.  DOM反射
 * <comboBox
 data-control-type="control.ComboBox"
 data-selectList=[{
                value: 'xx',
                index: 'x',
                name: 'xxx',
                child: []
            }] >
 </comboBox>
 * @example 2. 实例化
 *      new control.ComboBox({
            selectList : [],                                   // 数据
            selectNotFoundText: '无数据',                      // 当没有数据时显示什么             默认显示[无匹配数据]
            defaultIndex : '1',                               // 设置默认当的前选中值，            默认选中第一个
            disUsed: false,                                   // 是否禁用                        默认false
            comboBoxStyle: control.ComboBox.DEFAULT_STYLE,    // 选择定义好的样式,或者是自己定义的class名  默认橙色皮肤
            disScroll: false                                  // 是否隐藏滚动条                   默认false
        });
 * @author create by hehe
 * */
control.ComboBox = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var eventCycle = arguments[1];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "ComboBox";
        _this.version = "1.0.0";
        _this.author = "hehe;";

        _this._html = $("<div class=\"comboBox\"></div>");

        _this.selectionDom = $("<div class=\"comboBox-selection\"></div>");
        _this.selectionPlaceholderDom = $("<span class=\"comboBox-selection-placeholder\">\u8BF7\u9009\u62E9</span> ");
        _this.selectionArrowDom = $('<div><i class="comboBox-selection-arrow"></i></div>');
        _this.selectionDom.append(_this.selectionPlaceholderDom);
        _this.selectionDom.append(_this.selectionArrowDom);

        _this.selectDropDownDom = $("<div class=\"comboBox-dropdown\"></div>");
        _this.selectDropDownNotFoundDom = $("<div class=\"comboBox-dropdown-notfound\">\u65E0\u5339\u914D\u6570\u636E</div> ");
        _this.selectOptionDom = $("<ul class=\"comboBox-dropdown-list\"></ul>");
        _this.selectDropDownLoadDom = $("<div class=\"comboBox-dropdown-loading\">\u52A0\u8F7D\u4E2D...</div>");
        _this.selectDropDownDom.append(_this.selectDropDownNotFoundDom);
        _this.selectDropDownDom.append(_this.selectOptionDom);
        _this.selectDropDownDom.append(_this.selectDropDownLoadDom);

        _this._html.append(_this.selectionDom);
        _this._html.append(_this.selectDropDownDom);
        // 数据
        _this._selectList = obj.selectList || [];
        // 无匹配数据时显示内容
        _this._selectNotFoundText = obj.selectNotFoundText || '无匹配数据';
        // 默认选中
        _this._defaultIndex = obj.defaultIndex || '';
        // 默认样式
        _this._comboBoxStyle = obj.comboBoxStyle || '';
        // 当前选中内容（name value）
        _this._curSelectObj = {};
        // 当前选中的子级
        _this._curSelectChildArr = [];
        _this._disUsed = obj.disUsed || false;
        // 是否隐藏进度条
        _this._disScroll = obj.disScroll || false;
        // 初始化渲染页面
        _this._renderSelectList();
        _this._init();
        return _this;
    }

    _createClass(_class, [{
        key: "_init",
        value: function _init() {
            this.disUsed = this._disUsed;
            this.disScroll = this._disScroll;
            this.comboBoxStyle = this._comboBoxStyle;
        }
    }, {
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this2 = this;

            this._html.on("click", function (e) {
                e.stopPropagation();
                _this2.runEvent(base.EventBase.CLICK);
                // 点击小三角翻转
                $(_this2.selectionDom[0].children[1]).toggleClass('comboBox-transform');
                // 伸缩效果
                _this2.selectDropDownDom.slideToggle();
            });
            $(document).on('click', function () {
                _this2.selectDropDownDom.slideUp();
            });
        }

        /**
         * @returns 返回当前控件是否被禁用
         * */

    }, {
        key: "_renderSelectList",


        //初始化渲染列表
        value: function _renderSelectList() {
            var _this3 = this;

            var valArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._selectList;

            // 1.清空列表
            this.selectOptionDom.empty();
            this.selectDropDownNotFoundDom.text(this._selectNotFoundText);
            this.selectDropDownLoadDom.css('display', 'block');

            if (valArr.length == 0) {
                this.selectDropDownNotFoundDom.css('display', 'block');
                this.selectDropDownLoadDom.css('display', 'none');

                this.selectOptionDom.empty();
                this.curSelectObj = {
                    name: '',
                    value: ''
                };
                this.selectionPlaceholderDom.text('-');
                return;
            }

            this.selectDropDownNotFoundDom.css('display', 'none');

            var flag = true;

            var _loop = function _loop(i) {
                var valChildObj = valArr[i];
                var name = valChildObj.name;
                var val = valChildObj.value;
                var index = valChildObj.index;
                var child = valChildObj.child;
                var liDom = $("<li class=\"comboBox-dropdown-item\" data-val=\"" + val + "\">" + name + "</li>");
                var liArrowDom = $("<span class=\"comboBox-arrow\">></span>");
                if (_this3._defaultIndex) {
                    if (_this3._defaultIndex === index && flag) {
                        _this3.curSelectObj = {
                            name: name,
                            value: val
                        };
                        _this3.curSelectChildArr = child;
                        liDom.addClass('comboBox-selectStyle').siblings().removeClass('comboBox-selectStyle');
                        _this3.selectionPlaceholderDom.text(name);
                        flag = false;
                    }
                } else {
                    if (i == 0) {
                        liDom.addClass('comboBox-selectStyle').siblings().removeClass('comboBox-selectStyle');
                        _this3.selectionPlaceholderDom.text(name);
                        _this3.curSelectObj = {
                            name: name,
                            value: val
                        };
                    }
                }

                _this3.selectOptionDom.append(liDom);
                liDom.on("click", function () {
                    var obj = {
                        name: name,
                        val: val
                    };
                    _this3.curSelectChildArr = child;
                    _this3.curSelectObj = obj;
                    _this3.selectionPlaceholderDom.text(name);
                    _this3.runEvent(base.EventBase.CHANGE);
                    if (name === _this3.curSelectObj.name) {
                        liDom.addClass('comboBox-selectStyle').siblings().removeClass('comboBox-selectStyle');
                    }
                });

                if (i == valArr.length - 1) {
                    _this3.selectDropDownLoadDom.css('display', 'none');
                }
            };

            for (var i = 0; i < valArr.length; i++) {
                _loop(i);
            }
        }

        /**
         * @returns 返回此控件数据列表
         * */

    }, {
        key: "reflexPropSelf",


        // 映射
        value: function reflexPropSelf(child, reflex) {
            var ListVal = utils.Dom.getAttr(child, "selectList");
            var NotFoundTextVal = utils.Dom.getAttr(child, "selectNotFoundText");
            var IndexVal = utils.Dom.getAttr(child, "defaultIndex");
            var StyleVal = utils.Dom.getAttr(child, "defaultStyle");
            var disUsedVal = utils.Dom.getAttr(child, "disUsed");
            var disScrollVal = utils.Dom.getAttr(child, "disScroll");
            this.selectList = eval(ListVal);
            this.selectNotFoundText = eval(NotFoundTextVal);
            this.defaultIndex = eval(IndexVal);
            this.comboBoxStyle = eval(StyleVal);
            this.disUsed = eval(disUsedVal);
            this.disScroll = eval(disScrollVal);
        }

        /**
         * 获取dom的显示对象
         * @returns 获取此控件的jsdom对象
         * */

    }, {
        key: "destroySelfEvent",


        // 销毁事件
        value: function destroySelfEvent() {
            this._html.off("click");
            this._html.off("change");
        }

        // 销毁属性

    }, {
        key: "destroySelfProp",
        value: function destroySelfProp() {
            this._selectList = null;
            this._selectNotFoundText = null;
            this._defaultIndex = null;
            this._comboBoxStyle = null;
            this._curSelectObj = null;
            this._curSelectChildArr = null;
            this._disUsed = null;
            this._disScroll = null;
            this._html = null;
        }
    }, {
        key: "disUsed",
        get: function get() {
            return this._disUsed;
        }

        /**
         * @param valArr 设置当前控件是否被禁用
         * */
        ,
        set: function set(v) {
            if (v) {
                this.selectionDom.addClass('comboBox-disable');
                this.selectionArrowDom.css('display', 'none');
                this.selectOptionDom.css('display', 'none');
                this._html.unbind('click');
            } else {
                this.selectionDom.removeClass('comboBox-disable');
                this.selectionArrowDom.css('display', 'block');
                this.selectOptionDom.css('display', 'block');
                this._html.unbind('click');
                // 绑定点击事件 
                this._bindEvent();
            }
        }

        /**
         * @returns 返回当前控件是否隐藏进度条
         * */

    }, {
        key: "disScroll",
        get: function get() {
            return this._disScroll;
        }

        /**
         * @param valArr 设置当前控件是否隐藏进度条
         * */
        ,
        set: function set(v) {
            if (v) {
                this.selectDropDownDom.css('overflow', 'hidden');
                this.selectOptionDom.css({ 'overflow-y': 'scroll', 'width': '1000px', 'height': '150px' });
            } else {
                this.selectDropDownDom.css('overflow-y', 'auto');
                this.selectOptionDom.css({ 'overflow-y': 'initial' });
            }
        }

        /**
         * @param valArr 设置当前控件皮肤样式
         * */

    }, {
        key: "comboBoxStyle",
        set: function set(v) {
            switch (v) {
                case control.ComboBox.DEFAULT_STYLE:
                    this.html.addClass("comboBox-defaultStyle");
                    break;
                default:
                    if (v) {
                        // 设置的自定义样式
                        this.html.removeClass("comboBox-defaultStyle");
                        this.html.addClass(v);
                    } else {
                        this.html.addClass("comboBox-defaultStyle");
                    }
                    break;
            }
        }

        /**
         * @returns 返回当前控件皮肤样式
         * */
        ,
        get: function get() {
            return this._comboBoxStyle;
        }

        /**
         * @param valArr 设置当前选中内容
         * */

    }, {
        key: "curSelectObj",
        set: function set(v) {
            this._curSelectObj = v;
            this.selectionPlaceholderDom.text(v.name);
        }

        /**
         * @returns 返回当前选中的内容
         * */
        ,
        get: function get() {
            return this._curSelectObj;
        }

        /**
         * @returns 返回当前选中内容的子级
         * */

    }, {
        key: "curSelectChildArr",
        get: function get() {
            return this._curSelectChildArr;
        }

        /**
         * @param valArr 设置当前选中内容的子级
         * */
        ,
        set: function set(v) {
            this._curSelectChildArr = v;
        }
    }, {
        key: "selectList",
        get: function get() {
            return this._selectList;
        }

        /**
         * 设置数据列表
         * @param valArr 对象数组类型的数据列表
         * */
        ,
        set: function set(valArr) {
            this._selectList = [];
            this.selectOptionDom.empty();
            this._selectList = valArr;
            this._renderSelectList();
        }

        /**
         * 设置无匹配内容时显示的内容
         * @param v 无匹配内容时显示的内容
         * */

    }, {
        key: "selectNotFoundText",
        set: function set(v) {
            this._selectNotFoundText = v;
            this.selectDropDownNotFoundDom.text(v);
        }

        /**
         * 获取无匹配内容时显示的内容
         * @returns 返回此控件无匹配内容时显示的内容
         * */
        ,
        get: function get() {
            return this._selectNotFoundText;
        }

        /**
         * 设置默认选中值
         * @param v 默认选中值
         * */

    }, {
        key: "defaultIndex",
        set: function set(v) {
            this._defaultIndex = v;
            this._renderSelectList();
        }

        /**
         * 获取默认选中哪一个值
         * @returns 返回此控件的初始化选中值
         * */
        ,
        get: function get() {
            return this._defaultIndex;
        }
    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);

control.ComboBox.DEFAULT_STYLE = 0;