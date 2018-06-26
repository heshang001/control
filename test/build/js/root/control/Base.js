"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  基础的dom结构 把未定义的节点原样构建到本身的dom树中
 *  @param Node 需要遍历的节点
 *  @author create by heshang
 * */
control.Base = function (_base$ControlEventBas) {
    _inherits(_class, _base$ControlEventBas);

    function _class(Node, eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "Base";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        _this._value = null;
        if (Node) {
            _this._html = $(Node.cloneNode(true));
            _this.dom.setAttribute("data-guid", _this.guid);
        } else {
            _this._html = "";
        }
        return _this;
    }

    /**
     *  获取本类的js对象
     * */


    _createClass(_class, [{
        key: "dom",
        get: function get() {
            if (this.html) {
                return this.html[0];
            } else {
                return "";
            }
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        },
        set: function set(v) {
            this._value = v;
        }
    }]);

    return _class;
}(base.ControlEventBase);