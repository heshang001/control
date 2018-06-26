"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.CheckGroup = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(name, eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this._selectIndex = [];
        _this._selectItem = [];
        _this._groupName = name;
        _this._html = $("<span></span>");
        return _this;
    }

    _createClass(_class, [{
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var name = utils.Dom.getAttr(child, "groupName");
            reflex.ready(base.Handler.create(function () {
                this.groupName = name;
            }, this));
        }
    }, {
        key: "changeSelectedIndex",
        value: function changeSelectedIndex(item) {
            var checked = item.checked;
            var index = this.childList.indexOf(item);
            var itemIndex = this._selectIndex.indexOf(index);
            if (itemIndex < 0 && checked) {
                this._selectIndex.push(index);
            } else if (!checked && itemIndex >= 0) {
                this._selectIndex.splice(itemIndex, 1);
            }
            this.selectIndex.sort();
            this.runEvent(base.EventBase.CHANGE);
        }
    }, {
        key: "addChildOther",
        value: function addChildOther(node) {
            node.groupName = this.groupName;
        }
    }, {
        key: "selectedBool",
        value: function selectedBool(b) {
            for (var i = 0; i < this.childList.length; i++) {
                this.childList[i].checked = b;
            }
        }
    }, {
        key: "selectRevert",
        value: function selectRevert() {
            for (var i = 0; i < this.childList.length; i++) {
                this.childList[i].checked = !this.childList[i].checked;
            }
        }
    }, {
        key: "dom",
        get: function get() {
            return this._html[0];
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
        key: "groupName",
        set: function set(name) {
            for (var i = 0; i < this.childList.length; i++) {
                this.childList[i].groupName = name;
            }
        },
        get: function get() {
            return this._groupName;
        }
    }, {
        key: "selectIndex",
        get: function get() {
            return this._selectIndex;
        },
        set: function set(b) {
            if (this.debugger) {
                if (!(b instanceof Array)) {
                    console.warn(b + "< is not array");
                    return;
                }
            }
            this._selectIndex = b;
            for (var i = 0; i < b.length; i++) {
                if (this.childList[i]) {
                    this.childList[i].checked = false;
                }
                if (!this.childList[b[i]]) {
                    continue;
                }
                if (this.childList[b[i]]) {
                    this.childList[b[i]].checked = true;
                }
            }
        }
    }]);

    return _class;
}(control.Base);