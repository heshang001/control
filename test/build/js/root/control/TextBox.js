"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var vaidType = ["number","text","password"]

/**
 * TextBox控件
 * @author likui
 * @example let textBox1 = new control.TextBox("number",123);
 * textBox1.minValue = -10;
 * textBxo1.maxValue = 10;
 * textBox1.change = function(e){
 *      console.log(e);
 * }
 * @example <textbox data-control-type="control.TextBox" data-showType = "number" data-showValue=123 data-minValue=-10 data-maxValue=10></textbox>
 */
control.TextBox = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var showType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "string";
        var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var ev = arguments[2];

        _classCallCheck(this, _class);

        var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ev));

        _this2._val = val;
        if (!control.TextBox.textType[showType]) {
            throw new TypeError("应该输入有效的类型(float,int,string,password,text,number)");
        }
        _this2._regex = "";
        _this2._testReg = false;
        _this2._showType = showType;
        _this2._inputDom = $("<input type='" + control.TextBox.textType[_this2._showType] + "' value='" + _this2._val + "'/>");
        _this2._html = $("<span></span>");
        _this2._html.append(_this2._inputDom);
        _this2._bindEvent();
        return _this2;
    }

    /**
     * @returns 返回当前控件是否要进行正则匹配
     */


    _createClass(_class, [{
        key: "destroySelfEvent",


        /**
         * 删除自身的控件引用
         */
        value: function destroySelfEvent() {
            this._inputDom.off("mousewheel");
            this._inputDom.off("change");
            this._inputDom.off("input propertychange");
        }

        /**
         * 删除自身的属性引用
         */

    }, {
        key: "destroySelfProp",
        value: function destroySelfProp() {
            this._val = null;
            this._regex = null;
            this._showType = null;
        }

        /**
         * 进行事件绑定
         */

    }, {
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this = this;
            this._inputDom.on("mousewheel", function (ev) {
                if (_this._inputDom.attr("type") !== "number") {
                    return;
                }
                var tmpl = parseInt(_this._inputDom.attr("value"));
                _this._inputDom.attr("value", tmpl + parseInt(ev.originalEvent.wheelDeltaY / 120));
            });
            this._inputDom.on("change", function (ev) {
                _this._val = ev.target.value;
                _this.runEvent(base.EventBase.CHANGE, _this);
            });
            this._inputDom.on("input propertychange", function (ev) {
                _this._val = ev.target.value;
                _this.runEvent(base.EventBase.CHANGE, _this);
            });
        }

        /**
         * 
         * @param {*} child 属性反射实现
         * @param {*} reflex 
         */

    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var showType = utils.Dom.getAttr(child, "showType");
            this._inputDom.attr("type", control.TextBox.textType[showType]);

            var showValue = utils.Dom.getAttr(child, "showValue");
            this._inputDom.attr("value", showValue);

            var minValue = utils.Dom.getAttr(child, "minValue");
            this._inputDom.attr("min", minValue);

            var maxValue = utils.Dom.getAttr(child, "maxValue");
            this._inputDom.attr("max", maxValue);

            var testReg = utils.Dom.getAttr(child, "testReg");
            this._testReg = testReg;
        }
        // set change(handler){
        //     if(this._stop){
        //         this._stop = false;
        //     }
        //     this.onEvent(base.EventBase.CHANGE,handler);
        // }

        /**
         * 返回当前的dom值
         * @returns 当前的dom值
         */

    }, {
        key: "testReg",
        get: function get() {
            return this._testReg;
        }

        /**
         * 设置是否进行正则匹配
         * @param isReg 是否进行正则匹配
         */
        ,
        set: function set(isReg) {
            this._testReg = isReg;
        }

        /**
         * @returns 获取正则匹配的字符串
         */

    }, {
        key: "regex",
        get: function get() {
            return this._regex;
        }

        /**
         * 设置正则匹配字符串
         * @param regexStr 设置正则匹配的字符串
         */
        ,
        set: function set(regexStr) {
            this._regex = regexStr;
        }

        /**
         * 获取当前的控件内容的类型
         * @returns 返回当前的控件内容的类型
         */

    }, {
        key: "showType",
        get: function get() {
            return this._showType;
        }

        /**
         * 设置当前的控件内容的数据类型
         * @param showType 
         */
        ,
        set: function set(showType) {
            this._inputDom.attr("type", control.TextBox.textType[showType]);
            this._showType = showType;
        }

        /**
         * 获取TextBox的值
         * @returns 返回控件的显示内容
         */

    }, {
        key: "showValue",
        get: function get() {
            // console.log("this._val is::",this._val);
            return this._val;
        }

        /**
         * 设置控件的显示内容
         * @param val 显示的内容值
         */
        ,
        set: function set(val) {
            this._val = val;
            this._inputDom.attr("value", val);
        }

        /**
         * 获取最小值（仅input type="number"）时有效
         * @returns 返回当前控件的最小值
         */

    }, {
        key: "minValue",
        get: function get() {
            if (this._inputDom.attr("type") !== "number") {
                return NaN;
            }
            return parseInt(this._inputDom.attr("min"));
        }

        /**
         * 设置当前控件的最小值
         * @returns 最小值
         */
        ,
        set: function set(value) {
            if (this._inputDom.attr("type") !== "number") {
                return;
            }
            this._inputDom.attr("min", value);
        }

        /**
         * 返回当前控件的最大值
         * @returns 当前控件的最大值
         */

    }, {
        key: "maxValue",
        get: function get() {
            if (this._inputDom.attr("type") !== "number") {
                return NaN;
            }
            return parseInt(this._inputDom.attr("max"));
        }

        /**
         * 设置当前控件的最大值
         * @param value 设置的控件的值
         */
        ,
        set: function set(value) {
            if (this._inputDom.attr("type") !== "number") {
                return;
            }
            this._inputDom.attr("max", value);
        }
    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);

/**
 * 当前的内容的类型
 */
control.TextBox.textType = {
    float: "number",
    int: "number",
    string: "text",
    password: "password",
    text: "text",
    number: "number"
};