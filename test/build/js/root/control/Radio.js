"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @param text 文本对象
 * @param eventCycle 生命周期
 * */
control.Radio = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(text, val, ev) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ev));

        _this.name = "Radio";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        _this._selected = false;
        _this._groupName = "";
        _this.textDom = $("<span>" + _this.text + "</span>");
        _this.inputDom = $("<input type=\"radio\" value=\"" + _this._value + "\"/>");
        var html = $("<span></span>");
        html.append(_this.inputDom);
        html.append(_this.textDom);
        _this._html = html;
        _this.value = val;
        _this.text = text;
        _this._bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this2 = this;

            this.inputDom.on("change", function () {
                _this2.changeParentPro();
            });
        }
    }, {
        key: "changeParentPro",
        value: function changeParentPro() {
            if (this.parent instanceof control.RadioGroup) {
                this.parent.selectIndex = this.parent.childList.indexOf(this);
                this.parent.selectItem = this;

                this.parent.disChange();
            }
        }
    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var val = utils.Dom.getAttr(child, "value");
            this.value = val;
        }
    }, {
        key: "selected",
        set: function set(b) {
            if (b) {
                this.inputDom.attr("checked", "checked");
            } else {
                this.inputDom.removeAttr("checked");
            }
            this._selected = b;
        },
        get: function get() {
            return this._selected;
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        },
        set: function set(v) {
            this.inputDom.val(v);
            this._value = v;
        }
    }, {
        key: "groupName",
        set: function set(n) {
            this.inputDom.attr("name", n);
            this._groupName = n;
        }
    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
        }
    }, {
        key: "text",
        get: function get() {
            return this._text;
        },
        set: function set(t) {
            this.textDom.text(t);
            this._text = t;
        }
    }]);

    return _class;
}(control.Base);