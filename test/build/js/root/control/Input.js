"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 基础的输入对象
 * @param eventCycle 事件生命周期
 *
 * @author create by heshang
 * */
control.Input = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "Input";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        var html = "<span data-guid=\"" + _this.guid + "\">\n                        <input type=\"text\"/>\n                    </span>";
        _this._html = $(html);
        return _this;
    }

    _createClass(_class, [{
        key: "text",
        set: function set(s) {
            this.html.find('input').val(s);
        },
        get: function get() {
            return this.html.find('input').val();
        }
    }, {
        key: "dom",
        get: function get() {
            return this.html[0];
        }
    }]);

    return _class;
}(control.Base);