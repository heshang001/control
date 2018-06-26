"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 基础的按钮对象
 * @param text  按钮的显示文本
 * @param eventCycle  事件生命周期
 * @example var b = new control.Button(null,"xxxx");
 * @author create by heshang
 * */
control.Button = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var eventCycle = arguments[1];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "Button"; //控件的名称
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        _this._text = text;
        _this._html = $("<button class=\"button\" data-guid=\"" + _this.guid + "\">" + _this.text + "</button>");
        _this._bindClick();
        return _this;
    }

    _createClass(_class, [{
        key: "offClick",
        value: function offClick() {}
    }, {
        key: "_bindClick",
        value: function _bindClick() {
            this._html.on("click", function () {
                this.runEvent(base.EventBase.CLICK, this);
            }.bind(this));
        }

        /**
         * 删除自身的属性
         * */

    }, {
        key: "destorySelfProp",
        value: function destorySelfProp() {
            this._text = null;
        }

        /**
         *删除自身的事件
         * */

    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {
            this._html.off("click");
        }

        /**
         * 获取dom的显示对象
         * @returns 获取此控件的jsdom对象
         * */

    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
        }

        /**
         * 设置按钮的显示文本
         * @param t 按钮上的显示文本
         * */

    }, {
        key: "text",
        set: function set(t) {
            this._text = t;
            this.html.text(this.text);
        },
        get: function get() {
            return this._text;
        }
    }]);

    return _class;
}(control.Base);