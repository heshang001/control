"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.CheckBox = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var eventCycle = arguments[2];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this._html = $("<span></span>");
        _this.inputDom = $("<input type='checkbox' value=\"" + val + "\"/>");
        _this.textDom = $("<span>" + name + "</span>");
        _this._html.append(_this.inputDom);
        _this._html.append(_this.textDom);
        _this.value = val;
        _this.controlName = name;
        _this._checked = false;
        _this._groupName = "";
        _this._showType = "";
        _this._text = name;
        _this.bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: "bindEvent",
        value: function bindEvent() {
            var _this2 = this;

            this._html.on("click", function () {
                _this2.runEvent(base.EventBase.CLICK);
                _this2.checked = !_this2.checked;
            });
        }
    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {
            this._html.off("click");
        }
    }, {
        key: "destorySelfProp",
        value: function destorySelfProp() {}
    }, {
        key: "text",
        set: function set(t) {
            this._text = t;
            this.textDom.text(t);
        },
        get: function get() {
            return this._text;
        }
    }, {
        key: "groupName",
        set: function set(n) {
            this._groupName = n;
            this.inputDom.attr("name", n);
        }
    }, {
        key: "change",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CHANGE, handler);
        }
    }, {
        key: "click",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CLICK, handler);
        }
    }, {
        key: "showType",
        set: function set(t) {
            this.inputDom.addClass(t);
            this._showType = t;
        }
    }, {
        key: "checked",
        get: function get() {
            return this._checked;
        },
        set: function set(b) {
            this.inputDom.prop("checked", b);
            this._checked = b;
            if (this._parent) {
                this._parent.changeSelectedIndex(this);
            }
            this.runEvent(base.EventBase.CHANGE);
        }
    }, {
        key: "dom",
        get: function get() {
            //返回原生的js   Dom对象
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);