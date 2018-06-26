"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.RadioGroup = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(ev) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ev));

        _this.name = "Radio";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        _this._selectIndex = -1;
        _this._selectItem = null;
        var html = $("<span></span>");
        _this._html = html;
        _this._groupName = "";
        return _this;
    }

    _createClass(_class, [{
        key: "disChange",
        value: function disChange() {
            this.runEvent(base.EventBase.CHANGE);
        }
    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var name = utils.Dom.getAttr(child, "name");
            var selectIndex = utils.Dom.getAttr(child, "selectIndex");
            reflex.ready(base.Handler.create(function () {
                this.groupName = name;
                if (selectIndex) {
                    this.selectIndex = selectIndex;
                }
            }, this, "加载完成"));
        }
    }, {
        key: "selectIndex",
        set: function set(index) {
            if (index < this.childList.length) {
                this._selectIndex = index;
                this._selectItem = this.childList[index];
                this.selectItem.selected = true;
            } else if (this.debugger) {
                console.warn("radioGroup guid:" + this.guid + " childList length:" + this.childList.length + ",set index:" + index);
            }
        },
        get: function get() {
            return this._selectIndex;
        }
    }, {
        key: "selectItem",
        set: function set(item) {
            var index = this.childList.indexOf(item);
            if (index >= 0) {
                this.selectIndex = index;
            }
        },
        get: function get() {
            return this._selectItem;
        }
    }, {
        key: "groupName",
        set: function set(n) {
            for (var i = 0; i < this.childList.length; i++) {
                if (this.childList[i] instanceof control.Radio) {
                    this.childList[i].groupName = n;
                }
            }
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
            this._text = t;
        }
    }]);

    return _class;
}(control.Base);